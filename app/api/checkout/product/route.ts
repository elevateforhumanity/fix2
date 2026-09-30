import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount || body.total || body.price || (body.priceCents ? body.priceCents / 100 : 0));
    const name = String(body.programName || body.productName || body.productTitle || body.description || 'Elevate purchase');
    const slug = String(body.programSlug || body.productId || body.programId || 'purchase');
    const params = new URLSearchParams({ name, program: slug, amount: String(amount || 0) });
    return NextResponse.json({ provider: 'quickbooks_paypal', url: '/checkout/payment?' + params.toString(), migrated: true });
  } catch {
    return NextResponse.json({ error: 'Unable to start payment' }, { status: 400 });
  }
}
