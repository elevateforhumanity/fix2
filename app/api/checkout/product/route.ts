import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { toError, toErrorMessage } from '@/lib/safe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // @ts-expect-error TS2322: Type '"2025-10-29.clover"' is not assignable to type '"2025-10-29.clover"'.
    apiVersion: '2025-10-29.clover',
  });

  try {
    const { priceId, productName } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
      metadata: {
        product_name: productName || 'Digital Product',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
