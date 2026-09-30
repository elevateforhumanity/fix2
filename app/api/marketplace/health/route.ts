import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createAdminClient } from '@/lib/supabase/admin';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET() {
  const supabase = createAdminClient();
  try {
    // Check database connectivity
    const { error: dbError } = await supabase
      .from('marketplace_creators')
      .select('id')
      .limit(1);

    if (dbError) {
      return NextResponse.json(
        {
          ok: false,
          service: 'marketplace',
          error: 'Database connection failed',
        },
        { status: 503 }
      );
    }

    const paymentConfigured = !!process.env.PAYPAL_CLIENT_ID && !!process.env.QUICKBOOKS_REALM_ID;
    if (!paymentConfigured) return NextResponse.json({ ok:false, service:'marketplace', error:'Commerce providers not configured' }, { status:503 });

    return NextResponse.json({
      ok: true,
      service: 'marketplace',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'healthy',
        quickbooks: 'configured',
        paypal: 'configured',
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        service: 'marketplace',
        err: toErrorMessage(err),
      },
      { status: 500 }
    );
  }
}
