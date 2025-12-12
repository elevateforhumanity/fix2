// Cloudflare Worker - Autopilot Add Custom Domain to Netlify
// Automatically adds custom domain and configures SSL

export interface Env {
  NETLIFY_TOKEN: string;
  NETLIFY_SITE_ID: string;
  AUTOPILOT_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Verify authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.includes(env.AUTOPILOT_TOKEN)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const { task, domain } = (await request.json()) as any;

      let result;

      switch (task) {
        case 'add_domain':
          result = await addCustomDomain(
            env,
            domain || 'elevateforhumanity.org'
          );
          break;

        case 'check_ssl':
          result = await checkSSLStatus(
            env,
            domain || 'elevateforhumanity.org'
          );
          break;

        case 'list_domains':
          result = await listDomains(env);
          break;

        case 'purge_cache':
          result = await purgeCacheAll(env);
          break;

        case 'full_setup':
          result = await fullDomainSetup(
            env,
            domain || 'elevateforhumanity.org'
          );
          break;

        default:
          return new Response(JSON.stringify({ error: 'Unknown task' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }

      return new Response(JSON.stringify({ ok: true, result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: error.message,
          details: error.toString(),
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};

// Add custom domain to Netlify
async function addCustomDomain(env: Env, domain: string) {

  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain_name: domain,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // Check if domain already exists
    if (response.status === 422 && data.message?.includes('already exists')) {
      return {
        status: 'already_exists',
        domain,
        message: 'Domain already added to Netlify',
      };
    }
    throw new Error(`Failed to add domain: ${JSON.stringify(data)}`);
  }

  return {
    status: 'added',
    domain,
    ssl_url: data.ssl_url,
    message: 'Domain added successfully, SSL provisioning started',
  };
}

// Check SSL certificate status
async function checkSSLStatus(env: Env, domain: string) {

  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get site info: ${await response.text()}`);
  }

  const siteData = await response.json();

  // Find the domain in the list
  const domainInfo = siteData.domain_aliases?.find((d: string) => d === domain);

  return {
    domain,
    ssl_enabled: siteData.ssl,
    ssl_url: siteData.ssl_url,
    custom_domain: siteData.custom_domain,
    domain_aliases: siteData.domain_aliases || [],
    force_ssl: siteData.force_ssl,
  };
}

// List all domains
async function listDomains(env: Env) {

  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to list domains: ${await response.text()}`);
  }

  const data = await response.json();

  return {
    primary_domain: data.custom_domain || data.default_domain,
    domain_aliases: data.domain_aliases || [],
    ssl_enabled: data.ssl,
    ssl_url: data.ssl_url,
    force_ssl: data.force_ssl,
  };
}

// Purge all caches
async function purgeCacheAll(env: Env) {

  // Trigger a new build with cache clear
  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}/builds`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clear_cache: true,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to purge cache: ${await response.text()}`);
  }

  const data = await response.json();

  return {
    status: 'cache_purged',
    build_id: data.id,
    message: 'Cache cleared and new build triggered',
  };
}

// Full domain setup (add domain + wait for SSL + purge cache)
async function fullDomainSetup(env: Env, domain: string) {

  const results: any = {
    steps: [],
  };

  // Step 1: Add domain
  try {
    const addResult = await addCustomDomain(env, domain);
    results.steps.push({
      step: 'add_domain',
      status: 'success',
      result: addResult,
    });
  } catch (error: any) {
    results.steps.push({
      step: 'add_domain',
      status: 'error',
      error: error.message,
    });
    return results;
  }

  // Step 2: Wait a moment for SSL to start provisioning
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Step 3: Check SSL status
  try {
    const sslResult = await checkSSLStatus(env, domain);
    results.steps.push({
      step: 'check_ssl',
      status: 'success',
      result: sslResult,
    });
  } catch (error: any) {
    results.steps.push({
      step: 'check_ssl',
      status: 'error',
      error: error.message,
    });
  }

  // Step 4: Purge cache
  try {
    const purgeResult = await purgeCacheAll(env);
    results.steps.push({
      step: 'purge_cache',
      status: 'success',
      result: purgeResult,
    });
  } catch (error: any) {
    results.steps.push({
      step: 'purge_cache',
      status: 'error',
      error: error.message,
    });
  }

  results.status = 'complete';
  results.message = `Domain ${domain} setup initiated. SSL certificate will be ready in 2-10 minutes.`;

  return results;
}
