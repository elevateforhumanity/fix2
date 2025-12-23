import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { toError, toErrorMessage } from '@/lib/safe';

export const runtime = 'nodejs';

export async function POST() {
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
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  if (!process.env.STRIPE_PRICE_STUDENT) {
    return NextResponse.json(
      { error: 'Student pricing not configured' },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_STUDENT, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/lms/(app)/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      subscription_data: {
        metadata: { user_id: user.id },
      },
      customer_email: user.email ?? undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
