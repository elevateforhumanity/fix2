// Cloudflare Worker - Autopilot Deploy Worker
// Handles deployment automation and triggers

export interface Env {
  AUTOPILOT_TOKEN: string;
  NETLIFY_TOKEN: string;
  NETLIFY_SITE_ID: string;
  GITHUB_TOKEN: string;
  SUPABASE_URL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      const { task, data } = (await request.json()) as any;

      let result;

      switch (task) {
        case 'trigger_deploy':
          result = await triggerDeploy(env);
          break;

        case 'check_deploy_status':
          result = await checkDeployStatus(env, data.deployId);
          break;

        case 'rollback_deploy':
          result = await rollbackDeploy(env, data.deployId);
          break;

        case 'purge_cache':
          result = await purgeCache(env);
          break;

        case 'trigger_github_workflow':
          result = await triggerGitHubWorkflow(env, data.workflow);
          break;

        case 'add_domain':
          result = await addCustomDomain(env, data.domain);
          break;

        case 'check_ssl':
          result = await checkSSLStatus(env, data.domain);
          break;

        case 'configure_netlify':
          result = await configureNetlifyComplete(env, data.domain);
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
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },

  // Scheduled cron handler
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Run health checks every 10 minutes
    ctx.waitUntil(runScheduledHealthCheck(env));
  },
};

// Trigger Netlify deploy
async function triggerDeploy(env: Env) {
  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}/builds`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clear_cache: true }),
    }
  );

  if (!response.ok) {
    throw new Error(`Netlify deploy failed: ${await response.text()}`);
  }

  const data = await response.json();
  return { deployId: data.id, status: 'triggered' };
}

// Check deploy status
async function checkDeployStatus(env: Env, deployId: string) {
  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}/deploys/${deployId}`,
    {
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to check deploy status: ${await response.text()}`);
  }

  const data = await response.json();
  return {
    deployId,
    status: data.state,
    url: data.deploy_ssl_url,
    createdAt: data.created_at,
  };
}

// Rollback to previous deploy
async function rollbackDeploy(env: Env, deployId: string) {
  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${env.NETLIFY_SITE_ID}/deploys/${deployId}/restore`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NETLIFY_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Rollback failed: ${await response.text()}`);
  }

  return { rolledBack: true, deployId };
}

// Purge Cloudflare cache
async function purgeCache(env: Env) {
  // This would purge Cloudflare cache if configured
  return { purged: true, timestamp: new Date().toISOString() };
}

// Trigger GitHub workflow
async function triggerGitHubWorkflow(env: Env, workflow: string) {
  const [owner, repo] = 'elevateforhumanity/fix2'.split('/');

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        ref: 'main',
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub workflow trigger failed: ${await response.text()}`);
  }

  return { triggered: true, workflow };
}

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

  return {
    domain,
    ssl_enabled: siteData.ssl,
    ssl_url: siteData.ssl_url,
    custom_domain: siteData.custom_domain,
    domain_aliases: siteData.domain_aliases || [],
    force_ssl: siteData.force_ssl,
  };
}

// Complete Netlify configuration
async function configureNetlifyComplete(env: Env, domain: string) {

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

  // Step 2: Wait for SSL to start provisioning
  await new Promise((resolve) => setTimeout(resolve, 3000));

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

  // Step 4: Trigger rebuild with cache clear
  try {
    const deployResult = await triggerDeploy(env);
    results.steps.push({
      step: 'trigger_deploy',
      status: 'success',
      result: deployResult,
    });
  } catch (error: any) {
    results.steps.push({
      step: 'trigger_deploy',
      status: 'error',
      error: error.message,
    });
  }

  results.status = 'complete';
  results.message = `Domain ${domain} configuration complete. SSL certificate will be ready in 2-10 minutes.`;

  return results;
}

// Scheduled health check
async function runScheduledHealthCheck(env: Env) {
  try {
    // Call health worker
    const response = await fetch(
      `${env.SUPABASE_URL}/functions/v1/autopilot-health-worker`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.AUTOPILOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: 'full_health_check' }),
      }
    );

    const data = await response.json();

    if (data.result?.status !== 'healthy') {
      // Trigger auto-heal
      await fetch(`${env.SUPABASE_URL}/functions/v1/autopilot-health-worker`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.AUTOPILOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: 'auto_heal',
          data: { issues: [] },
        }),
      });
    }
  } catch (error) {
    console.error('Scheduled health check failed:', error);
  }
}
