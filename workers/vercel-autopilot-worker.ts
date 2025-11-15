// Cloudflare Worker - Vercel Autopilot Deploy Worker
// Handles deployment automation for Vercel deployments
// Target: fix2-1c7w-git-main-gitpod.vercel.app

export interface Env {
  AUTOPILOT_TOKEN: string;
  VERCEL_TOKEN: string;
  VERCEL_PROJECT_ID: string;
  VERCEL_TEAM_ID: string;
  GITHUB_TOKEN: string;
  SUPABASE_URL: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
          result = await triggerVercelDeploy(env);
          break;

        case 'check_deploy_status':
          result = await checkDeployStatus(env, data.deploymentId);
          break;

        case 'get_deployments':
          result = await getRecentDeployments(env);
          break;

        case 'add_domain':
          result = await addCustomDomain(env, data.domain);
          break;

        case 'check_domain':
          result = await checkDomainStatus(env, data.domain);
          break;

        case 'add_env_vars':
          result = await addEnvironmentVariables(env, data.variables);
          break;

        case 'trigger_github_push':
          result = await triggerGitHubPush(env, data.message);
          break;

        case 'health_check':
          result = await performHealthCheck(env);
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
        JSON.stringify({ error: error.message, stack: error.stack }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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

// Trigger Vercel deployment via GitHub push
async function triggerVercelDeploy(env: Env) {
  console.log('Triggering Vercel deployment via GitHub push');

  // Create a deployment trigger file
  const timestamp = new Date().toISOString();
  const message = `🚀 Autopilot deployment trigger - ${timestamp}`;

  // Trigger GitHub push which will auto-deploy on Vercel
  const result = await triggerGitHubPush(env, message);

  return {
    status: 'triggered',
    method: 'github_push',
    message,
    timestamp,
    github_result: result,
  };
}

// Check deployment status
async function checkDeployStatus(env: Env, deploymentId: string) {
  const url = `https://api.vercel.com/v13/deployments/${deploymentId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to check deployment: ${await response.text()}`);
  }

  const data = await response.json();

  return {
    deploymentId,
    status: data.readyState,
    url: data.url,
    createdAt: data.createdAt,
    buildingAt: data.buildingAt,
    ready: data.ready,
    target: data.target,
  };
}

// Get recent deployments
async function getRecentDeployments(env: Env) {
  const url = `https://api.vercel.com/v6/deployments?projectId=${env.VERCEL_PROJECT_ID}&limit=10`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get deployments: ${await response.text()}`);
  }

  const data = await response.json();

  return {
    deployments: data.deployments.map((d: any) => ({
      id: d.uid,
      url: d.url,
      state: d.readyState,
      createdAt: d.createdAt,
      target: d.target,
    })),
  };
}

// Add custom domain to Vercel
async function addCustomDomain(env: Env, domain: string) {
  console.log(`Adding custom domain: ${domain}`);

  const url = `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: domain,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      return {
        status: 'already_exists',
        domain,
        message: 'Domain already added to Vercel',
      };
    }
    throw new Error(`Failed to add domain: ${JSON.stringify(data)}`);
  }

  return {
    status: 'added',
    domain,
    message: 'Domain added successfully, SSL provisioning started',
    verification: data.verification,
  };
}

// Check domain status
async function checkDomainStatus(env: Env, domain: string) {
  console.log(`Checking domain status: ${domain}`);

  const url = `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains/${domain}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to check domain: ${await response.text()}`);
  }

  const data = await response.json();

  return {
    domain,
    verified: data.verified,
    verification: data.verification,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

// Add environment variables
async function addEnvironmentVariables(env: Env, variables: Record<string, string>) {
  console.log(`Adding ${Object.keys(variables).length} environment variables`);

  const url = `https://api.vercel.com/v10/projects/${env.VERCEL_PROJECT_ID}/env`;

  const results = [];

  for (const [key, value] of Object.entries(variables)) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        value,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    });

    const data = await response.json();

    results.push({
      key,
      status: response.ok ? 'added' : 'failed',
      error: response.ok ? null : data.error?.message,
    });
  }

  return {
    total: Object.keys(variables).length,
    added: results.filter((r) => r.status === 'added').length,
    failed: results.filter((r) => r.status === 'failed').length,
    results,
  };
}

// Trigger GitHub push (which triggers Vercel deployment)
async function triggerGitHubPush(env: Env, message: string) {
  const [owner, repo] = 'elevateforhumanity/fix2'.split('/');

  // Get current main branch SHA
  const refResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`,
    {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!refResponse.ok) {
    throw new Error(`Failed to get ref: ${await refResponse.text()}`);
  }

  const refData = await refResponse.json();
  const currentSha = refData.object.sha;

  // Create a deployment trigger file
  const timestamp = new Date().toISOString();
  const content = Buffer.from(
    JSON.stringify({
      triggered_at: timestamp,
      message,
      triggered_by: 'autopilot',
    })
  ).toString('base64');

  // Update or create trigger file
  const fileResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/workers/DEPLOYMENT_TRIGGER.txt`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message,
        content,
        branch: 'main',
        sha: currentSha, // Required for updates
      }),
    }
  );

  if (!fileResponse.ok) {
    throw new Error(`Failed to push to GitHub: ${await fileResponse.text()}`);
  }

  return {
    triggered: true,
    message,
    timestamp,
    sha: currentSha,
  };
}

// Perform health check
async function performHealthCheck(env: Env) {
  const checks = [];

  // Check Vercel API
  try {
    const response = await fetch(
      `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}`,
      {
        headers: {
          Authorization: `Bearer ${env.VERCEL_TOKEN}`,
        },
      }
    );

    checks.push({
      name: 'vercel_api',
      status: response.ok ? 'healthy' : 'unhealthy',
      statusCode: response.status,
    });
  } catch (error: any) {
    checks.push({
      name: 'vercel_api',
      status: 'error',
      error: error.message,
    });
  }

  // Check GitHub API
  try {
    const response = await fetch(
      'https://api.github.com/repos/elevateforhumanity/fix2',
      {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    checks.push({
      name: 'github_api',
      status: response.ok ? 'healthy' : 'unhealthy',
      statusCode: response.status,
    });
  } catch (error: any) {
    checks.push({
      name: 'github_api',
      status: 'error',
      error: error.message,
    });
  }

  // Check deployment URL
  try {
    const response = await fetch('https://fix2-1c7w-git-main-gitpod.vercel.app', {
      method: 'HEAD',
    });

    checks.push({
      name: 'deployment_url',
      status: response.ok ? 'healthy' : 'unhealthy',
      statusCode: response.status,
    });
  } catch (error: any) {
    checks.push({
      name: 'deployment_url',
      status: 'error',
      error: error.message,
    });
  }

  const allHealthy = checks.every((c) => c.status === 'healthy');

  return {
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  };
}

// Scheduled health check
async function runScheduledHealthCheck(env: Env) {
  try {
    const health = await performHealthCheck(env);

    if (health.status !== 'healthy') {
      console.error('Health check failed:', health);

      // Could trigger alerts or auto-healing here
      // For now, just log
    }
  } catch (error) {
    console.error('Scheduled health check failed:', error);
  }
}
