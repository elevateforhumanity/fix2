import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
  {
    apiVersion: '2024-11-20.acacia',
  }
);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.user_id;
      const courseId = session.metadata?.course_id;
      const enrollmentId = session.metadata?.enrollment_id;
      const partnerOwedCents = parseInt(session.metadata?.partner_owed_cents || '0');
      const yourRevenueCents = parseInt(session.metadata?.your_revenue_cents || '0');

      if (userId && courseId) {
        // Update enrollment to paid
        if (enrollmentId) {
          await supabase
            .from('enrollments')
            .update({
              status: 'active',
              payment_status: 'paid',
              stripe_payment_intent_id: session.payment_intent as string,
              paid_at: new Date().toISOString(),
              amount_paid_cents: session.amount_total || 0,
              partner_owed_cents: partnerOwedCents,
              your_revenue_cents: yourRevenueCents,
            })
            .eq('id', enrollmentId);
        } else {
          // Create new enrollment
          await supabase
            .from('enrollments')
            .insert({
              user_id: userId,
              course_id: courseId,
              status: 'active',
              payment_status: 'paid',
              stripe_checkout_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              paid_at: new Date().toISOString(),
              amount_paid_cents: session.amount_total || 0,
              enrollment_type: 'standalone',
              funding_source: 'self_pay',
              partner_owed_cents: partnerOwedCents,
              your_revenue_cents: yourRevenueCents,
            });
        }

        // Create partner payment record if applicable
        if (partnerOwedCents > 0) {
          const { data: course } = await supabase
            .from('courses')
            .select('partner_id')
            .eq('id', courseId)
            .single();

          if (course?.partner_id) {
            await supabase
              .from('partner_course_payments')
              .insert({
                enrollment_id: enrollmentId,
                course_id: courseId,
                partner_id: course.partner_id,
                student_paid_cents: session.amount_total || 0,
                partner_owed_cents: partnerOwedCents,
                your_revenue_cents: yourRevenueCents,
                status: 'pending',
                due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              });
          }
        }

        console.log(`✅ Payment processed: user ${userId}, course ${courseId}`);
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
