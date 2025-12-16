import { NextResponse } from 'next/server';
import { sendProductRejectionEmail } from '@/lib/email/resend';
import { createClient } from '@/utils/supabase/server';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const supabase = await createClient();
    const { productId, reason } = await req.json();

    const { error } = await supabase
      .from('marketplace_products')
      .update({
        status: 'rejected',
        rejection_reason: reason || 'Does not meet marketplace standards',
      })
      .eq('id', productId);

    if (error) throw error;

    // TODO: Send rejection email to creator with reason

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
