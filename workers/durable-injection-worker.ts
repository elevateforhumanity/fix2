/**
 * Cloudflare Worker - Durable Injection Worker
 * Handles automated injection of enrollment script to Durable.co site
 * Runs on schedule and on-demand
 */

export interface Env {
  DURABLE_EMAIL: string;
  DURABLE_PASSWORD: string;
  AUTOPILOT_TOKEN: string;
  PUPPETEER_ENDPOINT?: string;
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

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'healthy',
          worker: 'durable-injection-worker',
          timestamp: new Date().toISOString(),
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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
      // Trigger injection via Netlify function
      const result = await triggerInjection(env);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: error.message,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },

  // Scheduled cron handler - runs every 6 hours
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    console.log('Scheduled injection check running...');
    ctx.waitUntil(checkAndInject(env));
  },
};

// Trigger injection via Netlify function
async function triggerInjection(env: Env) {
  const netlifyFunctionUrl =
    'https://elevateforhumanityfix2.netlify.app/.netlify/functions/durable-inject';

  const response = await fetch(netlifyFunctionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: env.DURABLE_EMAIL,
      password: env.DURABLE_PASSWORD,
    }),
  });

  const data = await response.json();

  return {
    success: data.success || false,
    message: data.message || data.error,
    timestamp: new Date().toISOString(),
  };
}

// Check if enrollment script is present, inject if not
async function checkAndInject(env: Env) {
  try {
    // Check if enrollment script is present on live site
    const siteResponse = await fetch('https://www.elevateforhumanity.org');
    const html = await siteResponse.text();

    const hasEnrollmentScript =
      html.includes('enrollment-injector.js') ||
      html.includes('Enroll in Our Programs');

    if (!hasEnrollmentScript) {
      console.log('Enrollment script not found, triggering injection...');
      const result = await triggerInjection(env);
      console.log('Injection result:', result);
      return result;
    } else {
      console.log('Enrollment script already present');
      return {
        success: true,
        message: 'Enrollment script already present',
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error: any) {
    console.error('Error in checkAndInject:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
