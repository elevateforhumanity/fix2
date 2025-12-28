import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import Stripe from 'stripe';
import { toError, toErrorMessage } from '@/lib/safe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 503 }
      );
    }

    const { items, total } = await request.json();

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(
          items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { err: toErrorMessage(err) || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
