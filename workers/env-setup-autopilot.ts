/**
 * Environment Setup Autopilot Worker
 * Automatically pulls environment variables from Vercel and sets up .env.local
 * 
 * Deploy to Cloudflare Workers to run independently of Vercel
 */

export interface Env {
  VERCEL_TOKEN: string;
  VERCEL_PROJECT_ID: string;
  VERCEL_TEAM_ID: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
}

interface EnvVariable {
  key: string;
  value: string;
  target: string[];
  type: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      switch (path) {
        case '/setup':
          return await setupEnvironment(env, corsHeaders);
        
        case '/pull':
          return await pullFromVercel(env, corsHeaders);
        
        case '/verify':
          return await verifyEnvironment(env, corsHeaders);
        
        case '/commit':
          return await commitToGitHub(env, corsHeaders, request);
        
        case '/status':
          return await getStatus(env, corsHeaders);
        
        default:
          return new Response(JSON.stringify({ 
            error: 'Not found',
            availableEndpoints: ['/setup', '/pull', '/verify', '/commit', '/status']
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },

  // Scheduled worker - runs every hour to check environment
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log('Running scheduled environment check...');
    
    try {
      // Verify environment variables are still valid
      const verification = await verifyEnvironmentInternal(env);
      
      if (!verification.valid) {
        console.error('Environment verification failed:', verification.errors);
        
        // Attempt auto-fix
        await setupEnvironmentInternal(env);
      } else {
        console.log('Environment verification passed');
      }
    } catch (error) {
      console.error('Scheduled task failed:', error);
    }
  }
};

/**
 * Setup environment by pulling from Vercel
 */
async function setupEnvironment(env: Env, corsHeaders: any): Promise<Response> {
  const result = await setupEnvironmentInternal(env);
  
  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function setupEnvironmentInternal(env: Env) {
  try {
    // 1. Pull environment variables from Vercel
    const vercelVars = await pullVercelEnvironmentVariables(env);
    
    // 2. Generate .env.local content
    const envContent = generateEnvLocalContent(vercelVars, env);
    
    // 3. Commit to GitHub (optional - can be done separately)
    // await commitEnvToGitHub(env, envContent);
    
    return {
      success: true,
      message: 'Environment setup complete',
      variables: Object.keys(vercelVars).length,
      content: envContent,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Pull environment variables from Vercel
 */
async function pullFromVercel(env: Env, corsHeaders: any): Promise<Response> {
  try {
    const variables = await pullVercelEnvironmentVariables(env);
    
    return new Response(JSON.stringify({
      success: true,
      variables: variables,
      count: Object.keys(variables).length
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function pullVercelEnvironmentVariables(env: Env): Promise<Record<string, string>> {
  const url = `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/env`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Vercel API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as { envs: EnvVariable[] };
  
  // Convert to key-value pairs
  const variables: Record<string, string> = {};
  
  for (const envVar of data.envs) {
    // Only get production/development variables
    if (envVar.target.includes('production') || envVar.target.includes('development')) {
      variables[envVar.key] = envVar.value;
    }
  }
  
  return variables;
}

/**
 * Generate .env.local content
 */
function generateEnvLocalContent(vercelVars: Record<string, string>, env: Env): string {
  const timestamp = new Date().toISOString();
  
  let content = `# =============================================================================
# ENVIRONMENT VARIABLES - Auto-generated by Autopilot
# =============================================================================
# Generated: ${timestamp}
# Source: Vercel Project (${env.VERCEL_PROJECT_ID})
# =============================================================================

`;

  // Critical Supabase variables
  content += `# -----------------------------------------------------------------------------
# SUPABASE - Database & Authentication
# -----------------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=${vercelVars.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || 'https://cuxzzpsyufcewtmicszk.supabase.co'}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${vercelVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''}
SUPABASE_SERVICE_ROLE_KEY=${vercelVars.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || ''}

`;

  // Add all other variables from Vercel
  const categorizedVars = categorizeVariables(vercelVars);
  
  for (const [category, vars] of Object.entries(categorizedVars)) {
    if (vars.length > 0) {
      content += `# -----------------------------------------------------------------------------
# ${category}
# -----------------------------------------------------------------------------
`;
      for (const [key, value] of vars) {
        content += `${key}=${value}\n`;
      }
      content += '\n';
    }
  }
  
  return content;
}

/**
 * Categorize variables by prefix
 */
function categorizeVariables(vars: Record<string, string>): Record<string, [string, string][]> {
  const categories: Record<string, [string, string][]> = {
    'STRIPE': [],
    'EMAIL': [],
    'AI SERVICES': [],
    'MONITORING': [],
    'SECURITY': [],
    'OTHER': []
  };
  
  for (const [key, value] of Object.entries(vars)) {
    // Skip Supabase (already handled)
    if (key.includes('SUPABASE')) continue;
    
    if (key.includes('STRIPE')) {
      categories['STRIPE'].push([key, value]);
    } else if (key.includes('RESEND') || key.includes('SENDGRID') || key.includes('EMAIL')) {
      categories['EMAIL'].push([key, value]);
    } else if (key.includes('OPENAI') || key.includes('ELEVENLABS')) {
      categories['AI SERVICES'].push([key, value]);
    } else if (key.includes('SENTRY') || key.includes('GA_')) {
      categories['MONITORING'].push([key, value]);
    } else if (key.includes('NEXTAUTH') || key.includes('SECRET')) {
      categories['SECURITY'].push([key, value]);
    } else {
      categories['OTHER'].push([key, value]);
    }
  }
  
  return categories;
}

/**
 * Verify environment variables
 */
async function verifyEnvironment(env: Env, corsHeaders: any): Promise<Response> {
  const verification = await verifyEnvironmentInternal(env);
  
  return new Response(JSON.stringify(verification), {
    status: verification.valid ? 200 : 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function verifyEnvironmentInternal(env: Env) {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check critical variables
  if (!env.SUPABASE_URL || env.SUPABASE_URL.includes('your-project')) {
    errors.push('SUPABASE_URL is missing or has placeholder value');
  }
  
  if (!env.SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY.includes('your-anon-key')) {
    errors.push('SUPABASE_ANON_KEY is missing or has placeholder value');
  }
  
  if (!env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY.includes('your-service-role')) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY is missing or has placeholder value');
  }
  
  // Test Supabase connection
  if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${env.SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`
        }
      });
      
      if (!response.ok) {
        errors.push(`Supabase connection failed: ${response.status}`);
      }
    } catch (error) {
      errors.push(`Supabase connection error: ${error.message}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    timestamp: new Date().toISOString()
  };
}

/**
 * Commit .env.local to GitHub (as .env.local.example or via PR)
 */
async function commitToGitHub(env: Env, corsHeaders: any, request: Request): Promise<Response> {
  try {
    const { content, message } = await request.json() as { content: string; message: string };
    
    // Create a new branch
    const branchName = `autopilot/env-setup-${Date.now()}`;
    
    // Get main branch SHA
    const mainRef = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/git/ref/heads/main`,
      {
        headers: {
          'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    const mainData = await mainRef.json() as any;
    const mainSha = mainData.object.sha;
    
    // Create new branch
    await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/git/refs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: mainSha
        })
      }
    );
    
    // Create/update file
    const fileContent = btoa(content); // Base64 encode
    
    await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/contents/.env.local.template`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message || 'Update environment template via autopilot',
          content: fileContent,
          branch: branchName
        })
      }
    );
    
    return new Response(JSON.stringify({
      success: true,
      branch: branchName,
      message: 'Environment template committed to new branch'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Get status of environment setup
 */
async function getStatus(env: Env, corsHeaders: any): Promise<Response> {
  const verification = await verifyEnvironmentInternal(env);
  
  return new Response(JSON.stringify({
    status: verification.valid ? 'healthy' : 'unhealthy',
    verification,
    worker: 'env-setup-autopilot',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
