import { NextResponse } from 'next/server';
import { sendProductApprovalEmail } from '@/lib/email/resend';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const supabase = await createClient();
    const { productId } = await req.json();

    const { error } = await supabase
      .from('marketplace_products')
      .update({ status: 'approved' })
      .eq('id', productId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
