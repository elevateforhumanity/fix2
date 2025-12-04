import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia' as any,
}) : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe || !supabase) {
    return NextResponse.json(
      { error: 'Stripe or Supabase not configured' },
      { status: 503 }
    );
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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Check if this is a partner course enrollment (new system)
      if (session.metadata?.course_id && session.metadata?.provider_id) {
        try {
          // Create partner enrollment record
          const { error: enrollmentError } = await supabase
            .from('partner_lms_enrollments')
            .insert({
              provider_id: session.metadata.provider_id,
              student_id: session.metadata.student_id,
              course_id: session.metadata.course_id,
              status: 'active',
              payment_status: 'paid',
              payment_amount: (session.amount_total || 0) / 100,
              payment_session_id: session.id,
              payment_completed_at: new Date().toISOString(),
              course_name: session.metadata.course_code,
              metadata: {
                wholesale_cost: session.metadata.wholesale_cost,
                retail_price: session.metadata.retail_price,
                profit_margin: session.metadata.profit_margin,
                course_url: session.metadata.course_url,
              },
            });

          if (enrollmentError) {
            console.error('Error creating partner enrollment:', enrollmentError);
          } else {
          }

          // Log payment
          await supabase
            .from('payment_logs')
            .insert({
              stripe_session_id: session.id,
              stripe_payment_id: session.payment_intent as string,
              amount: (session.amount_total || 0) / 100,
              currency: 'usd',
              status: 'completed',
              metadata: session.metadata,
            });

        } catch (err: any) {
          console.error('Error processing partner course enrollment:', err);
        }
        break;
      }
      
      // Check if this is an HSI enrollment (legacy system)
      if (session.metadata?.provider === 'hsi') {
        try {
          // Get course details
          const { data: course } = await supabase
            .from('hsi_course_products')
            .select('*')
            .eq('course_type', session.metadata.course_type)
            .single();

          if (!course) {
            console.error('HSI course not found:', session.metadata.course_type);
            break;
          }

          // Create enrollment queue entry
          const { error: queueError } = await supabase
            .from('hsi_enrollment_queue')
            .insert({
              student_id: session.metadata.student_id,
              course_type: session.metadata.course_type,
              stripe_payment_id: session.payment_intent as string,
              stripe_session_id: session.id,
              amount_paid: (session.amount_total || 0) / 100,
              student_email: session.metadata.student_email,
              student_name: session.metadata.student_name,
              student_phone: session.metadata.student_phone || '',
              student_address: session.metadata.student_address || '',
              hsi_enrollment_link: course.hsi_enrollment_link,
              enrollment_status: 'pending',
            });

          if (queueError) {
            console.error('Error creating HSI enrollment queue:', queueError);
          } else {
          }

          // Create partner enrollment record
          const { data: provider } = await supabase
            .from('partner_lms_providers')
            .select('id')
            .eq('provider_type', 'hsi')
            .single();

          if (provider) {
            await supabase
              .from('partner_lms_enrollments')
              .insert({
                provider_id: provider.id,
                student_id: session.metadata.student_id,
                status: 'payment_pending',
                payment_status: 'paid',
                payment_amount: (session.amount_total || 0) / 100,
                payment_session_id: session.id,
                payment_completed_at: new Date().toISOString(),
                course_name: course.course_name,
              });
          }

          // Log payment
          await supabase
            .from('payment_logs')
            .insert({
              stripe_session_id: session.id,
              stripe_payment_id: session.payment_intent as string,
              amount: (session.amount_total || 0) / 100,
              currency: 'usd',
              status: 'completed',
              metadata: session.metadata,
            });

        } catch (err: any) {
          console.error('Error processing HSI enrollment:', err);
        }
        break;
      }
      
      // Handle regular course enrollments
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

      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      break;
    }

    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      break;
    }

    default:
  }

  return NextResponse.json({ received: true });
}
