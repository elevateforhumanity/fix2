import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  rateLimit,
  getClientIdentifier,
  RateLimitPresets,
} from '@/lib/rateLimit';
import { logAuditEvent, AuditActions } from '@/lib/audit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const identifier = getClientIdentifier(req.headers);
  const rateLimitResult = rateLimit(identifier, {
    limit: 10,
    window: 60 * 60 * 1000,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many reports. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const { product_id, reporter_email, reason, details } = await req.json();

    if (!product_id || !reason) {
      return NextResponse.json(
        { error: 'Product ID and reason are required' },
        { status: 400 }
      );
    }

    const { data: product } = await supabase
      .from('marketplace_products')
      .select('id')
      .eq('id', product_id)
      .single();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { error } = await supabase.from('product_reports').insert({
      product_id,
      reporter_email: reporter_email || null,
      reason,
      details: details || null,
      status: 'pending',
    });

    if (error) throw error;

    await logAuditEvent({
      action: 'PRODUCT_REPORTED',
      resourceType: 'marketplace_product',
      resourceId: product_id,
      metadata: { reporter_email, reason },
      ipAddress: identifier,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Product report error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit report' },
      { status: 500 }
    );
  }
}
