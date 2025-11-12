/**
 * Media Download Worker
 * Downloads stock images and videos to Cloudflare R2
 * Provides cached media for faster video generation
 */

export interface Env {
  MEDIA_R2: R2Bucket;
  STOCK_MEDIA_KV: KVNamespace;
  DOWNLOAD_QUEUE: Queue;
}

export interface DownloadJob {
  id: string;
  type: 'image' | 'video' | 'music';
  url: string;
  filename: string;
  metadata: {
    source: string;
    creator: string;
    category: string;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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
        return new Response(JSON.stringify({ 
          status: 'ok',
          service: 'media-download-worker',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Download all media
      if (path === '/download-all' && request.method === 'POST') {
        const stats = await downloadAllMedia(env);
        
        return new Response(JSON.stringify({
          success: true,
          ...stats,
          message: 'Media download queued'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get media from R2
      if (path.startsWith('/media/') && request.method === 'GET') {
        const filename = path.substring(7); // Remove '/media/'
        const object = await env.MEDIA_R2.get(filename);
        
        if (!object) {
          return new Response(JSON.stringify({
            error: 'Media not found'
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('cache-control', 'public, max-age=31536000'); // Cache for 1 year

        return new Response(object.body, { headers });
      }

      // List downloaded media
      if (path === '/media' && request.method === 'GET') {
        const prefix = url.searchParams.get('prefix') || '';
        const limit = parseInt(url.searchParams.get('limit') || '100');
        
        const list = await env.MEDIA_R2.list({ prefix, limit });
        
        return new Response(JSON.stringify({
          objects: list.objects.map(obj => ({
            key: obj.key,
            size: obj.size,
            uploaded: obj.uploaded
          })),
          truncated: list.truncated,
          total: list.objects.length
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Get download stats
      if (path === '/stats' && request.method === 'GET') {
        const stats = await getDownloadStats(env);
        
        return new Response(JSON.stringify(stats), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        error: 'Not found'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async queue(batch: MessageBatch<DownloadJob>, env: Env): Promise<void> {
    // Process media download jobs
    for (const message of batch.messages) {
      const job = message.body;
      
      try {
        console.log(`Downloading: ${job.filename}`);
        
        // Check if already exists
        const existing = await env.MEDIA_R2.head(job.filename);
        if (existing) {
          console.log(`Already exists: ${job.filename}`);
          message.ack();
          continue;
        }

        // Download from source
        const response = await fetch(job.url);
        
        if (!response.ok) {
          throw new Error(`Download failed: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const body = await response.arrayBuffer();

        // Upload to R2
        await env.MEDIA_R2.put(job.filename, body, {
          httpMetadata: {
            contentType: contentType
          },
          customMetadata: {
            source: job.metadata.source,
            creator: job.metadata.creator,
            category: job.metadata.category,
            downloadedAt: new Date().toISOString()
          }
        });

        console.log(`Downloaded: ${job.filename} (${body.byteLength} bytes)`);
        message.ack();
        
      } catch (error) {
        console.error(`Download failed: ${job.filename}`, error);
        message.retry();
      }
    }
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    // Download all media monthly
    console.log('Running scheduled media download');
    
    try {
      await downloadAllMedia(env);
      console.log('Scheduled download complete');
    } catch (error) {
      console.error('Scheduled download failed:', error);
    }
  }
};

/**
 * Queue download jobs for all media
 */
async function downloadAllMedia(env: Env): Promise<{
  imagesQueued: number;
  videosQueued: number;
  musicQueued: number;
}> {
  let imagesQueued = 0;
  let videosQueued = 0;
  let musicQueued = 0;

  // Get stock media from KV
  const imagesData = await env.STOCK_MEDIA_KV.get('stock-images');
  const videosData = await env.STOCK_MEDIA_KV.get('stock-videos');
  const musicData = await env.STOCK_MEDIA_KV.get('background-music');

  // Queue image downloads
  if (imagesData) {
    const images = JSON.parse(imagesData);
    for (const image of images) {
      const job: DownloadJob = {
        id: `img-${image.id}`,
        type: 'image',
        url: image.url,
        filename: `images/${image.id}.jpg`,
        metadata: {
          source: image.source,
          creator: image.photographer,
          category: image.category
        }
      };
      await env.DOWNLOAD_QUEUE.send(job);
      imagesQueued++;
    }
  }

  // Queue video downloads
  if (videosData) {
    const videos = JSON.parse(videosData);
    for (const video of videos) {
      const job: DownloadJob = {
        id: `vid-${video.id}`,
        type: 'video',
        url: video.url,
        filename: `videos/${video.id}.mp4`,
        metadata: {
          source: video.source,
          creator: video.creator,
          category: video.category
        }
      };
      await env.DOWNLOAD_QUEUE.send(job);
      videosQueued++;
    }
  }

  // Queue music downloads
  if (musicData) {
    const music = JSON.parse(musicData);
    for (const track of music) {
      const job: DownloadJob = {
        id: `music-${track.id}`,
        type: 'music',
        url: track.url,
        filename: `music/${track.id}.mp3`,
        metadata: {
          source: 'Free Music Archive',
          creator: track.artist,
          category: track.genre
        }
      };
      await env.DOWNLOAD_QUEUE.send(job);
      musicQueued++;
    }
  }

  return { imagesQueued, videosQueued, musicQueued };
}

/**
 * Get download statistics
 */
async function getDownloadStats(env: Env): Promise<any> {
  const images = await env.MEDIA_R2.list({ prefix: 'images/', limit: 1000 });
  const videos = await env.MEDIA_R2.list({ prefix: 'videos/', limit: 1000 });
  const music = await env.MEDIA_R2.list({ prefix: 'music/', limit: 1000 });

  const totalSize = [...images.objects, ...videos.objects, ...music.objects]
    .reduce((sum, obj) => sum + obj.size, 0);

  return {
    images: {
      count: images.objects.length,
      size: images.objects.reduce((sum, obj) => sum + obj.size, 0)
    },
    videos: {
      count: videos.objects.length,
      size: videos.objects.reduce((sum, obj) => sum + obj.size, 0)
    },
    music: {
      count: music.objects.length,
      size: music.objects.reduce((sum, obj) => sum + obj.size, 0)
    },
    total: {
      count: images.objects.length + videos.objects.length + music.objects.length,
      size: totalSize,
      sizeFormatted: formatBytes(totalSize)
    }
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
