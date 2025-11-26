import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// Program pricing configuration
const PROGRAMS = {
  cna: {
    id: 'cna',
    name: 'Certified Nursing Assistant (CNA) Career Pathway',
    baseCost: 400,
    salePrice: 600,
    stripeProductId: process.env.STRIPE_PRODUCT_CNA,
    stripePriceIdFull: process.env.STRIPE_PRICE_CNA_FULL,
    stripePriceIdPlan: process.env.STRIPE_PRICE_CNA_PLAN,
  },
  // Add more programs here as needed
};

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'full'; // 'full' or 'plan'
    const programId = searchParams.get('id');

    if (!programId || !PROGRAMS[programId as keyof typeof PROGRAMS]) {
      return NextResponse.json(
        { error: 'Invalid program ID' },
        { status: 400 }
      );
    }

    const program = PROGRAMS[programId as keyof typeof PROGRAMS];

    // Determine which price to use
    const priceId = mode === 'plan' 
      ? program.stripePriceIdPlan 
      : program.stripePriceIdFull;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price not configured for this program' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: mode === 'plan' ? 'subscription' : 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/success?program=${programId}&mode=${mode}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/courses/certified-nursing-assistant`,
      metadata: {
        efh_program_id: programId,
        efh_payment_mode: mode,
        efh_program_name: program.name,
      },
      // Optional: Add customer email if user is logged in
      // customer_email: userEmail,
    });

    // Redirect to Stripe Checkout
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
