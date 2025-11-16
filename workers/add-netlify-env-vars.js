/**
 * Cloudflare Worker: Add Netlify Environment Variables
 *
 * Deploy this worker and POST Supabase keys to automatically
 * configure Netlify environment variables and trigger deployment.
 *
 * Usage:
 * POST https://your-worker.workers.dev/
 * Body: {
 *   "supabase_service_role_key": "eyJhbGci..."
 * }
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const NETLIFY_TOKEN =
      env.NETLIFY_AUTH_TOKEN || 'nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae';
    const SITE_ID = '12f120ab-3f63-419b-bc49-430f043415c1';

    let requestData;
    try {
      requestData = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const {
      supabase_url = 'https://cuxzzpsyufcewtmicszk.supabase.co',
      supabase_anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ',
      supabase_service_role_key,
    } = requestData;

    if (!supabase_service_role_key) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing supabase_service_role_key in request body',
          usage:
            'POST with JSON body: { "supabase_service_role_key": "eyJhbGci..." }',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const envVars = [
      {
        key: 'NEXT_PUBLIC_SUPABASE_URL',
        value: supabase_url,
      },
      {
        key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        value: supabase_anon_key,
      },
      {
        key: 'SUPABASE_SERVICE_ROLE_KEY',
        value: supabase_service_role_key,
      },
      {
        key: 'NEXT_PUBLIC_APP_URL',
        value: 'https://elevateconnectsdirectory.org',
      },
      {
        key: 'NEXT_PUBLIC_SITE_URL',
        value: 'https://elevateconnectsdirectory.org',
      },
      {
        key: 'NODE_ENV',
        value: 'production',
      },
    ];

    const results = [];

    // Add each environment variable
    for (const envVar of envVars) {
      try {
        const response = await fetch(
          `https://api.netlify.com/api/v1/sites/${SITE_ID}/env/${envVar.key}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${NETLIFY_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              context: 'all',
              value: envVar.value,
              scopes: ['builds', 'functions', 'runtime', 'post_processing'],
            }),
          }
        );

        const result = await response.text();
        results.push({
          key: envVar.key,
          status: response.ok ? 'success' : 'failed',
          http_status: response.status,
          response: result,
        });
      } catch (error) {
        results.push({
          key: envVar.key,
          status: 'error',
          error: error.message,
        });
      }
    }

    // Trigger deploy with cache clear
    let deployResult = null;
    let deploySuccess = false;

    try {
      const deployResponse = await fetch(
        `https://api.netlify.com/api/v1/sites/${SITE_ID}/builds`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${NETLIFY_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clear_cache: true }),
        }
      );

      deployResult = await deployResponse.json();
      deploySuccess = deployResponse.ok;
    } catch (error) {
      deployResult = { error: error.message };
    }

    const successCount = results.filter((r) => r.status === 'success').length;
    const allSuccess = successCount === envVars.length;

    return new Response(
      JSON.stringify(
        {
          success: allSuccess && deploySuccess,
          env_vars_added: successCount,
          env_vars_total: envVars.length,
          results: results,
          deploy_triggered: deploySuccess,
          deploy_id: deployResult?.id,
          deploy_url: deploySuccess
            ? `https://app.netlify.com/sites/${SITE_ID}/deploys/${deployResult?.id}`
            : null,
          site_url: 'https://elevateconnectsdirectory.org',
          message:
            allSuccess && deploySuccess
              ? '✅ All environment variables added and deploy triggered successfully!'
              : '⚠️ Some operations failed. Check results for details.',
        },
        null,
        2
      ),
      {
        status: allSuccess && deploySuccess ? 200 : 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  },
};
