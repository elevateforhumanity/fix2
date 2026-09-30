export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const programName = body.programName;
    const programSlug = body.programSlug;
    const price = Number(body.price || 0);
    const paymentType = body.paymentType || 'full';
    if (!programName || !programSlug || price <= 0) return NextResponse.json({ error: 'Program and price are required' }, { status: 400 });
    const amount = paymentType === 'plan' ? Math.ceil(price / 4) : price;
    const params = new URLSearchParams({ program: programSlug, name: programName, amount: String(amount), paymentType });
    return NextResponse.json({ provider: 'quickbooks_paypal', url: '/checkout/payment?' + params.toString(), amount });
  } catch {
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
