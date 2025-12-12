/**
 * Template Sync Worker
 * Syncs video templates from GitHub to Cloudflare KV
 * Runs on schedule or webhook trigger
 */

export interface Env {
  GITHUB_TOKEN: string;
  TEMPLATES_KV: KVNamespace;
  STOCK_MEDIA_KV: KVNamespace;
  GITHUB_REPO: string; // e.g., "elevateforhumanity/fix2"
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check
      if (path === '/health') {
        return new Response(
          JSON.stringify({
            status: 'ok',
            service: 'template-sync-worker',
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Sync templates from GitHub
      if (path === '/sync' && request.method === 'POST') {
        await syncTemplates(env);
        await syncStockMedia(env);

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Templates and media synced successfully',
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Get templates
      if (path === '/templates' && request.method === 'GET') {
        const templates = await env.TEMPLATES_KV.get('video-templates');

        if (!templates) {
          return new Response(
            JSON.stringify({
              error: 'Templates not found',
              message: 'Run /sync to fetch templates from GitHub',
            }),
            {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(templates, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get stock media
      if (path === '/stock-media' && request.method === 'GET') {
        const media = await env.STOCK_MEDIA_KV.get('stock-media');

        if (!media) {
          return new Response(
            JSON.stringify({
              error: 'Stock media not found',
              message: 'Run /sync to fetch media from GitHub',
            }),
            {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(media, {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // GitHub webhook handler
      if (path === '/webhook' && request.method === 'POST') {
        const payload = (await request.json()) as any;

        // Check if templates or media files were updated
        const commits = payload.commits || [];
        let shouldSync = false;

        for (const commit of commits) {
          const modified = commit.modified || [];
          const added = commit.added || [];
          const files = [...modified, ...added];

          if (
            files.some(
              (f: string) =>
                f.includes('video-templates.ts') || f.includes('stock-media.ts')
            )
          ) {
            shouldSync = true;
            break;
          }
        }

        if (shouldSync) {
          await syncTemplates(env);
          await syncStockMedia(env);
        }

        return new Response(
          JSON.stringify({
            success: true,
            synced: shouldSync,
            message: shouldSync ? 'Synced' : 'No changes detected',
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          error: 'Not found',
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },

  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Sync templates daily

    try {
      await syncTemplates(env);
      await syncStockMedia(env);
    } catch (error) {
      console.error('Scheduled sync failed:', error);
    }
  },
};

/**
 * Sync templates from GitHub
 */
async function syncTemplates(env: Env): Promise<void> {

  const url = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/src/data/video-templates.ts`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'Cloudflare-Worker',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`);
  }

  const content = await response.text();

  // Extract templates array from TypeScript file
  const templatesMatch = content.match(
    /export const videoTemplates[^=]*=\s*(\[[\s\S]*?\]);/
  );

  if (!templatesMatch) {
    throw new Error('Could not parse templates from file');
  }

  // Store in KV
  await env.TEMPLATES_KV.put('video-templates', templatesMatch[1]);
  await env.TEMPLATES_KV.put('video-templates-raw', content);
  await env.TEMPLATES_KV.put('last-sync', new Date().toISOString());

}

/**
 * Sync stock media from GitHub
 */
async function syncStockMedia(env: Env): Promise<void> {

  const url = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/src/data/stock-media.ts`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'Cloudflare-Worker',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stock media: ${response.statusText}`);
  }

  const content = await response.text();

  // Extract arrays from TypeScript file
  const imagesMatch = content.match(
    /export const stockImages[^=]*=\s*(\[[\s\S]*?\]);/
  );
  const videosMatch = content.match(
    /export const stockVideos[^=]*=\s*(\[[\s\S]*?\]);/
  );
  const musicMatch = content.match(
    /export const backgroundMusic[^=]*=\s*(\[[\s\S]*?\]);/
  );

  if (!imagesMatch || !videosMatch || !musicMatch) {
    throw new Error('Could not parse stock media from file');
  }

  // Store in KV
  await env.STOCK_MEDIA_KV.put('stock-images', imagesMatch[1]);
  await env.STOCK_MEDIA_KV.put('stock-videos', videosMatch[1]);
  await env.STOCK_MEDIA_KV.put('background-music', musicMatch[1]);
  await env.STOCK_MEDIA_KV.put('stock-media-raw', content);
  await env.STOCK_MEDIA_KV.put('last-sync', new Date().toISOString());

}
