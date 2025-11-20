/**
 * Cloudflare Worker - Vercel Environment Variable Updater
 * Automatically updates Vercel environment variables for domain migration
 */

export interface Env {
  VERCEL_TOKEN: string;
  VERCEL_PROJECT_ID: string;
  VERCEL_TEAM_ID: string;
}

interface EnvVar {
  key: string;
  value: string;
  target: ('production' | 'preview' | 'development')[];
  type: 'plain' | 'secret';
}

const ENV_VARS_TO_UPDATE: EnvVar[] = [
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://www.elevateforhumanity.org',
    target: ['production', 'preview', 'development'],
    type: 'plain',
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    value: 'https://www.elevateforhumanity.org',
    target: ['production', 'preview', 'development'],
    type: 'plain',
  },
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!env.VERCEL_TOKEN || !env.VERCEL_PROJECT_ID) {
      return new Response(
        JSON.stringify({ error: 'Missing Vercel credentials' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      const results = [];

      // Get existing environment variables
      const existingVars = await getEnvironmentVariables(env);

      // Update each variable
      for (const envVar of ENV_VARS_TO_UPDATE) {
        const existing = existingVars.find((v: any) => v.key === envVar.key);

        if (existing) {
          // Delete old variable
          await deleteEnvironmentVariable(env, existing.id);
          results.push({ action: 'deleted', key: envVar.key, id: existing.id });
        }

        // Create new variable with updated value
        const created = await createEnvironmentVariable(env, envVar);
        results.push({ action: 'created', key: envVar.key, ...created });
      }

      // Trigger deployment to apply changes
      const deployment = await triggerDeployment(env);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Environment variables updated successfully',
          results,
          deployment,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: 'Failed to update environment variables',
          details: error.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};

async function getEnvironmentVariables(env: Env) {
  const url = `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/env`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get env vars: ${response.statusText}`);
  }

  const data = await response.json();
  return data.envs || [];
}

async function deleteEnvironmentVariable(env: Env, varId: string) {
  const url = `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/env/${varId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete env var: ${response.statusText}`);
  }

  return response.json();
}

async function createEnvironmentVariable(env: Env, envVar: EnvVar) {
  const url = `https://api.vercel.com/v10/projects/${env.VERCEL_PROJECT_ID}/env`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: envVar.key,
      value: envVar.value,
      target: envVar.target,
      type: envVar.type,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create env var: ${error}`);
  }

  return response.json();
}

async function triggerDeployment(env: Env) {
  const url = 'https://api.vercel.com/v13/deployments';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'fix2-gpql',
      project: env.VERCEL_PROJECT_ID,
      target: 'production',
      gitSource: {
        type: 'github',
        ref: 'main',
        repoId: 'elevateforhumanity/fix2',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to trigger deployment: ${error}`);
  }

  return response.json();
}
