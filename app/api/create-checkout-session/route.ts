import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { programName, programSlug, price, paymentType = 'full' } = await request.json();

    let sessionConfig: any = {
      payment_method_types: ['card'],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll/success?session_id={CHECKOUT_SESSION_ID}&program=${programSlug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/micro-classes`,
      metadata: {
        programName,
        programSlug,
        paymentType,
      },
    };

    if (paymentType === 'plan' && price > 500) {
      // Payment plan - 4 monthly installments
      const monthlyAmount = Math.ceil(price / 4);
      
      sessionConfig = {
        ...sessionConfig,
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${programName} - Payment Plan`,
                description: `4-month payment plan for ${programName}`,
              },
              unit_amount: monthlyAmount * 100,
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            programName,
            programSlug,
            totalAmount: price,
            installments: 4,
          },
        },
      };
    } else {
      // One-time payment
      sessionConfig = {
        ...sessionConfig,
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${programName} - Micro Class`,
                description: `Enrollment in ${programName} training program`,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
