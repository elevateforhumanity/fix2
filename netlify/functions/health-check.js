/**
 * Netlify Function: Health Check
 *
 * Monitors system health and sends alerts if issues detected.
 * Checks: Database, APIs, scheduled jobs, error rates.
 *
 * Endpoint: GET /.netlify/functions/health-check
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const checks = {
    database: { status: 'unknown', message: '', responseTime: 0 },
    stripe: { status: 'unknown', message: '', responseTime: 0 },
    openai: { status: 'unknown', message: '', responseTime: 0 },
    errorRate: { status: 'unknown', message: '', count: 0 },
  };

  let overallStatus = 'healthy';

  try {
    // Check 1: Database connectivity
    const dbStart = Date.now();
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

      const { data, error } = await supabase
        .from('activity_log')
        .select('id')
        .limit(1);

      checks.database.responseTime = Date.now() - dbStart;

      if (error) {
        checks.database.status = 'error';
        checks.database.message = error.message;
        overallStatus = 'degraded';
      } else {
        checks.database.status = 'healthy';
        checks.database.message = 'Connected';
      }
    } catch (error) {
      checks.database.status = 'error';
      checks.database.message = error.message;
      checks.database.responseTime = Date.now() - dbStart;
      overallStatus = 'unhealthy';
    }

    // Check 2: Stripe API
    const stripeStart = Date.now();
    try {
      if (process.env.STRIPE_SECRET_KEY) {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        await stripe.balance.retrieve();

        checks.stripe.status = 'healthy';
        checks.stripe.message = 'Connected';
        checks.stripe.responseTime = Date.now() - stripeStart;
      } else {
        checks.stripe.status = 'skipped';
        checks.stripe.message = 'Not configured';
      }
    } catch (error) {
      checks.stripe.status = 'error';
      checks.stripe.message = error.message;
      checks.stripe.responseTime = Date.now() - stripeStart;
      overallStatus = 'degraded';
    }

    // Check 3: OpenAI API
    const openaiStart = Date.now();
    try {
      if (process.env.OPENAI_API_KEY) {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        });

        checks.openai.responseTime = Date.now() - openaiStart;

        if (response.ok) {
          checks.openai.status = 'healthy';
          checks.openai.message = 'Connected';
        } else {
          checks.openai.status = 'error';
          checks.openai.message = `HTTP ${response.status}`;
          overallStatus = 'degraded';
        }
      } else {
        checks.openai.status = 'skipped';
        checks.openai.message = 'Not configured';
      }
    } catch (error) {
      checks.openai.status = 'error';
      checks.openai.message = error.message;
      checks.openai.responseTime = Date.now() - openaiStart;
      overallStatus = 'degraded';
    }

    // Check 4: Error rate (last hour)
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

      const { data: errors, error } = await supabase
        .from('activity_log')
        .select('id')
        .eq('action', 'error')
        .gte('created_at', oneHourAgo);

      if (!error) {
        checks.errorRate.count = errors?.length || 0;

        if (checks.errorRate.count > 100) {
          checks.errorRate.status = 'error';
          checks.errorRate.message = 'High error rate';
          overallStatus = 'degraded';
        } else if (checks.errorRate.count > 50) {
          checks.errorRate.status = 'warning';
          checks.errorRate.message = 'Elevated error rate';
        } else {
          checks.errorRate.status = 'healthy';
          checks.errorRate.message = 'Normal';
        }
      }
    } catch (error) {
      checks.errorRate.status = 'unknown';
      checks.errorRate.message = error.message;
    }

    // Send alert if unhealthy
    if (overallStatus === 'unhealthy' && process.env.SLACK_WEBHOOK_URL) {
      await sendSlackAlert(checks);
    }

    return {
      statusCode: overallStatus === 'healthy' ? 200 : 503,
      headers,
      body: JSON.stringify({
        status: overallStatus,
        timestamp: new Date().toISOString(),
        checks,
      }),
    };
  } catch (error) {
    console.error('Health check error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

/**
 * Send Slack alert for unhealthy status
 */
async function sendSlackAlert(checks) {
  try {
    const failedChecks = Object.entries(checks)
      .filter(([_, check]) => check.status === 'error')
      .map(([name, check]) => `• ${name}: ${check.message}`)
      .join('\n');

    const message = {
      text: '🚨 System Health Alert',
      attachments: [
        {
          color: '#ff0000',
          title: 'System Health Check Failed',
          text: `The following checks failed:\n\n${failedChecks}`,
          footer: 'Health Check',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Failed to send Slack alert:', error);
  }
}
