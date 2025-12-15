import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/auth';
import { logAuditEvent, AuditActions, getRequestMetadata } from '@/lib/audit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { session } = await requireAdmin();
    const { creatorId } = await req.json();
    const { ipAddress } = getRequestMetadata(req);

    if (!creatorId) {
      return NextResponse.json(
        { error: 'Creator ID required' },
        { status: 400 }
      );
    }

    // Get total amount being paid out
    const { data: salesData } = await supabase
      .from('marketplace_sales')
      .select('creator_earnings_cents')
      .eq('creator_id', creatorId)
      .eq('paid_out', false);

    const totalAmount =
      salesData?.reduce((sum, sale) => sum + sale.creator_earnings_cents, 0) ||
      0;

    // Mark all unpaid sales for this creator as paid
    const { data, error } = await supabase
      .from('marketplace_sales')
      .update({
        paid_out: true,
        payout_date: new Date().toISOString(),
      })
      .eq('creator_id', creatorId)
      .eq('paid_out', false)
      .select();

    if (error) throw error;

    // Audit log
    await logAuditEvent({
      userId: session.user.id,
      action: AuditActions.MARKETPLACE_PAYOUT_PROCESSED,
      resourceType: 'marketplace_creator',
      resourceId: creatorId,
      metadata: {
        amount_cents: totalAmount,
        sales_count: data?.length || 0,
      },
      ipAddress,
    });

    // TODO: Send payout confirmation email to creator

    return NextResponse.json({
      success: true,
      salesUpdated: data?.length || 0,
    });
  } catch (error: any) {
    // Error: $1
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
