import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  let body: any = {};
  try { body = await req.json(); } catch {}
  const amount = Number(body.amount || body.total || body.price || (body.priceCents ? body.priceCents / 100 : 0));
  const name = String(body.programName || body.productName || body.productTitle || body.description || 'Elevate purchase');
  const program = String(body.programSlug || body.productId || body.programId || body.courseId || 'purchase');
  const params = new URLSearchParams({ name, program, amount: String(amount || 0) });
  return NextResponse.json({ provider: 'commerce', url: '/checkout/payment?' + params.toString(), migrated: true });
}
