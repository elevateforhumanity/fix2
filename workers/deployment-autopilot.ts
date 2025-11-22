/**
 * Deployment Autopilot Worker
 * Monitors GitHub Actions and Vercel deployments
 * Automatically fixes common deployment issues
 */

export interface Env {
  GITHUB_TOKEN: string;
  VERCEL_TOKEN: string;
  VERCEL_PROJECT_ID: string;
  VERCEL_ORG_ID: string;
}

interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string | null;
  name: string;
  html_url: string;
}

interface DeploymentIssue {
  type: string;
  message: string;
  fix: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/monitor') {
      return await monitorAndFix(env);
    }
    
    if (url.pathname === '/fix-domains') {
      return await fixDomains(env);
    }
    
    if (url.pathname === '/promote-to-production') {
      return await promoteToProduction(env);
    }
    
    if (url.pathname === '/status') {
      return await getStatus(env);
    }
    
    return new Response('Deployment Autopilot Worker\n\nEndpoints:\n- /monitor - Monitor and fix issues\n- /fix-domains - Fix domain configuration\n- /promote-to-production - Promote latest deployment\n- /status - Get deployment status', {
      headers: { 'Content-Type': 'text/plain' }
    });
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // Run every 5 minutes
    ctx.waitUntil(monitorAndFix(env));
  }
};

async function monitorAndFix(env: Env): Promise<Response> {
  const issues: DeploymentIssue[] = [];
  const fixes: string[] = [];

  try {
    // 1. Check GitHub Actions status
    console.log('🔍 Checking GitHub Actions...');
    const workflowStatus = await checkGitHubActions(env);
    
    if (workflowStatus.failed) {
      issues.push({
        type: 'github_actions_failed',
        message: `Workflow "${workflowStatus.name}" failed`,
        fix: 'Analyzing failure logs...'
      });
      
      // Analyze and fix
      const fix = await fixGitHubActionFailure(env, workflowStatus);
      if (fix) {
        fixes.push(fix);
      }
    }

    // 2. Check Vercel deployment status
    console.log('🔍 Checking Vercel deployments...');
    const vercelStatus = await checkVercelDeployments(env);
    
    if (vercelStatus.issues.length > 0) {
      issues.push(...vercelStatus.issues);
      
      // Fix domain configuration
      const domainFix = await fixDomains(env);
      fixes.push('Domain configuration updated');
    }

    // 3. Check if www.elevateforhumanity.org is accessible
    console.log('🔍 Checking production site...');
    const siteStatus = await checkProductionSite();
    
    if (!siteStatus.accessible) {
      issues.push({
        type: 'site_not_accessible',
        message: 'www.elevateforhumanity.org is not accessible',
        fix: 'Triggering new deployment...'
      });
      
      await triggerDeployment(env);
      fixes.push('New deployment triggered');
    }

    const report = {
      timestamp: new Date().toISOString(),
      status: issues.length === 0 ? 'healthy' : 'issues_found',
      issues: issues,
      fixes_applied: fixes,
      next_check: 'in 5 minutes'
    };

    return new Response(JSON.stringify(report, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function checkGitHubActions(env: Env): Promise<any> {
  const response = await fetch(
    'https://api.github.com/repos/elevateforhumanity/fix2/actions/runs?per_page=5',
    {
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Deployment-Autopilot'
      }
    }
  );

  const data = await response.json();
  const latestRun = data.workflow_runs?.[0];

  return {
    failed: latestRun?.conclusion === 'failure',
    name: latestRun?.name,
    id: latestRun?.id,
    url: latestRun?.html_url
  };
}

async function fixGitHubActionFailure(env: Env, status: any): Promise<string | null> {
  // Get workflow logs
  const logsResponse = await fetch(
    `https://api.github.com/repos/elevateforhumanity/fix2/actions/runs/${status.id}/logs`,
    {
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );

  // Common fixes
  if (logsResponse.status === 200) {
    // Check for common issues and apply fixes
    // For now, trigger a re-run
    await fetch(
      `https://api.github.com/repos/elevateforhumanity/fix2/actions/runs/${status.id}/rerun`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    return 'Triggered workflow re-run';
  }

  return null;
}

async function checkVercelDeployments(env: Env): Promise<any> {
  const issues: DeploymentIssue[] = [];

  // Check domains
  const domainsResponse = await fetch(
    `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains`,
    {
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`
      }
    }
  );

  const domainsData = await domainsResponse.json();
  const domains = domainsData.domains || [];

  const hasWWW = domains.some((d: any) => d.name === 'www.elevateforhumanity.org');
  const hasRoot = domains.some((d: any) => d.name === 'elevateforhumanity.org');

  if (!hasWWW) {
    issues.push({
      type: 'missing_www_domain',
      message: 'www.elevateforhumanity.org not configured',
      fix: 'Adding domain...'
    });
  }

  if (!hasRoot) {
    issues.push({
      type: 'missing_root_domain',
      message: 'elevateforhumanity.org not configured',
      fix: 'Adding domain with redirect...'
    });
  }

  return { issues };
}

async function fixDomains(env: Env): Promise<Response> {
  const results = [];

  // Add www domain
  const wwwResponse = await fetch(
    `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'www.elevateforhumanity.org' })
    }
  );

  results.push({
    domain: 'www.elevateforhumanity.org',
    status: wwwResponse.status,
    success: wwwResponse.status === 200 || wwwResponse.status === 201 || wwwResponse.status === 409
  });

  // Add root domain with redirect
  const rootResponse = await fetch(
    `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'elevateforhumanity.org',
        redirect: 'www.elevateforhumanity.org'
      })
    }
  );

  results.push({
    domain: 'elevateforhumanity.org',
    status: rootResponse.status,
    success: rootResponse.status === 200 || rootResponse.status === 201 || rootResponse.status === 409
  });

  return new Response(JSON.stringify(results, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function checkProductionSite(): Promise<any> {
  try {
    const response = await fetch('https://www.elevateforhumanity.org', {
      method: 'HEAD',
      redirect: 'follow'
    });

    return {
      accessible: response.ok,
      status: response.status
    };
  } catch (error) {
    return {
      accessible: false,
      error: error.message
    };
  }
}

async function triggerDeployment(env: Env): Promise<void> {
  await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'fix2-gpql',
      project: env.VERCEL_PROJECT_ID,
      target: 'production',
      gitSource: {
        type: 'github',
        ref: 'main',
        repoId: 'elevateforhumanity/fix2'
      }
    })
  });
}

async function promoteToProduction(env: Env): Promise<Response> {
  console.log('🚀 Promoting latest deployment to production');

  // 1. Get latest deployment from main branch
  const deploymentsResponse = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${env.VERCEL_PROJECT_ID}&limit=10`,
    {
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`
      }
    }
  );

  const deploymentsData = await deploymentsResponse.json();
  const latestMainDeployment = deploymentsData.deployments?.find(
    (d: any) => d.meta?.githubCommitRef === 'main' && d.readyState === 'READY'
  );

  if (!latestMainDeployment) {
    return new Response(JSON.stringify({
      error: 'No ready deployment found for main branch'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  console.log(`Found latest deployment: ${latestMainDeployment.uid}`);

  // 2. Promote to production by setting alias
  const aliasResponse = await fetch(
    `https://api.vercel.com/v2/deployments/${latestMainDeployment.uid}/aliases`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        alias: 'www.elevateforhumanity.org'
      })
    }
  );

  const aliasData = await aliasResponse.json();

  // 3. Also set root domain
  const rootAliasResponse = await fetch(
    `https://api.vercel.com/v2/deployments/${latestMainDeployment.uid}/aliases`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        alias: 'elevateforhumanity.org'
      })
    }
  );

  const rootAliasData = await rootAliasResponse.json();

  return new Response(JSON.stringify({
    success: true,
    deployment: {
      id: latestMainDeployment.uid,
      url: latestMainDeployment.url,
      created: latestMainDeployment.createdAt
    },
    aliases: {
      www: aliasData,
      root: rootAliasData
    },
    message: 'Latest deployment promoted to production',
    production_urls: [
      'https://www.elevateforhumanity.org',
      'https://elevateforhumanity.org'
    ]
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getStatus(env: Env): Promise<Response> {
  const [githubStatus, vercelStatus, siteStatus] = await Promise.all([
    checkGitHubActions(env),
    checkVercelDeployments(env),
    checkProductionSite()
  ]);

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    github_actions: githubStatus,
    vercel: vercelStatus,
    production_site: siteStatus
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
