import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

export async function POST(request: NextRequest) {
  if (!stripe || !supabase) {
    return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_IDENTITY_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle verification session events
  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object as Stripe.Identity.VerificationSession;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error('No user_id in session metadata');
      return NextResponse.json({ error: 'No user_id' }, { status: 400 });
    }

    try {
      // Update verification record
      await supabase
        .from('program_holder_verification')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString(),
        })
        .eq('stripe_verification_session_id', session.id);

      // Update program holder status
      await supabase
        .from('program_holders')
        .update({
          verification_status: 'verified',
          status: 'verified_no_students',
        })
        .eq('user_id', userId);

      // TODO: Send email notification to user

      console.log(`User ${userId} verified successfully`);
    } catch (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Database update failed' },
        { status: 500 }
      );
    }
  }

  // Handle verification session failures
  if (
    event.type === 'identity.verification_session.requires_input' ||
    event.type === 'identity.verification_session.canceled'
  ) {
    const session = event.data.object as Stripe.Identity.VerificationSession;
    const userId = session.metadata?.user_id;

    if (!userId) {
      return NextResponse.json({ error: 'No user_id' }, { status: 400 });
    }

    try {
      // Update verification record
      await supabase
        .from('program_holder_verification')
        .update({
          status: 'failed',
          notes: session.last_error?.reason || 'Verification failed',
        })
        .eq('stripe_verification_session_id', session.id);

      // Update program holder status
      await supabase
        .from('program_holders')
        .update({
          verification_status: 'failed',
        })
        .eq('user_id', userId);

      // TODO: Send email notification to user

      console.log(`User ${userId} verification failed`);
    } catch (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Database update failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
