import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
import { toError, toErrorMessage } from '@/lib/safe';
  rateLimit,
  getClientIdentifier,
  createRateLimitHeaders,
  RateLimitPresets,
} from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Rate limiting: 10 checkouts per minute per IP
  const identifier = getClientIdentifier(req.headers);
  const rateLimitResult = rateLimit(identifier, RateLimitPresets.STRICT);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  try {
    const { productId, creatorId, priceCents, productTitle } = await req.json();

    if (!productId || !creatorId || !priceCents) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: priceCents,
            product_data: {
              name: productTitle || 'Digital Product',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'marketplace',
        product_id: productId,
        creator_id: creatorId,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/product/${productId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    // Error: $1
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
