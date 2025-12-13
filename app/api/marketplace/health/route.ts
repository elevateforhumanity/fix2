import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
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

    // Check Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          ok: false,
          service: 'marketplace',
          error: 'Stripe not configured',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      service: 'marketplace',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'healthy',
        stripe: 'configured',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        service: 'marketplace',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
