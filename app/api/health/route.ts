import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';
import { toError, toErrorMessage } from '@/lib/safe';
import { getAppVersion } from '@/lib/version/getAppVersion';
import { logger } from '@/lib/logging/logger';

export async function GET() {
  const checks: Record<string, any> = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: getAppVersion(),
    environment: process.env.NODE_ENV || 'production',
    checks: {},
  };

  // Check 1: Environment Variables
  checks.checks.environment = {
    supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    status:
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? 'pass'
        : 'fail',
  };

  // Check 2: Database Connection
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const supabase = createSupabaseClient();

      const { error } = await supabase
        .from('programs')
        .select('count')
        .limit(1);

      checks.checks.database = {
        connected: !error,
        status: error ? 'fail' : 'pass',
        error: error?.message || null,
      };
    } else {
      checks.checks.database = {
        connected: false,
        status: 'fail',
        error: 'Missing Supabase credentials',
      };
    }
  } catch (error: unknown) {
    checks.checks.database = {
      connected: false,
      status: 'fail',
      error: toErrorMessage(error),
    };
  }

  // Check 3: System Resources
  checks.checks.system = {
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB',
    },
    status: 'pass',
  };

  // Check 4: Stripe (optional)
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const response = await fetch(
        'https://api.stripe.com/v1/customers?limit=1',
        {
          headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
        }
      );
      checks.checks.stripe = {
        ok: response.ok,
        status: response.ok ? 'pass' : 'fail',
      };
    } catch (error) {
      checks.checks.stripe = {
        ok: false,
        status: 'fail',
        error: toErrorMessage(error),
      };
    }
  } else {
    checks.checks.stripe = { skipped: true, status: 'pass' };
  }

  // Check 5: Resend (optional)
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      });
      checks.checks.resend = {
        ok: response.ok || response.status === 401,
        status: response.ok || response.status === 401 ? 'pass' : 'fail',
      };
    } catch (error) {
      checks.checks.resend = {
        ok: false,
        status: 'fail',
        error: toErrorMessage(error),
      };
    }
  } else {
    checks.checks.resend = { skipped: true, status: 'pass' };
  }

  // Overall Status
  const allPassed = Object.values(checks.checks).every(
    (check: any) => check.status === 'pass'
  );
  checks.status = allPassed ? 'healthy' : 'degraded';
  checks.overall = allPassed ? 'pass' : 'fail';

  return NextResponse.json(checks, {
    status: allPassed ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
