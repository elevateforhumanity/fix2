import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { toError, toErrorMessage } from '@/lib/safe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  try {
    // Fetch sale details
    const { data: sale, error } = await supabase
      .from('marketplace_sales')
      .select(
        `
        *,
        product:marketplace_products(title),
        creator:marketplace_creators(display_name)
      `
      )
      .eq('stripe_session_id', sessionId)
      .single();

    if (error || !sale) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      productTitle: sale.product?.title,
      creatorName: sale.creator?.display_name,
      amount: sale.amount_cents,
      email: sale.buyer_email,
      downloadUrl: sale.download_token
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/download/${sale.download_token}`
        : null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
