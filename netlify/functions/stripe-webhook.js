const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify webhook signature
    if (webhookSecret) {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        webhookSecret
      );
    } else {
      // In development without webhook secret
      stripeEvent = JSON.parse(event.body);
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  // Handle the event
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        console.log('Payment successful:', session.id);
        console.log('Customer email:', session.customer_details?.email);
        console.log('Amount:', session.amount_total / 100);
        console.log('Program:', session.metadata?.programName);

        // 1. Create enrollment record in Supabase
        if (session.metadata?.programId) {
          try {
            const response = await fetch(`${process.env.FRONTEND_URL}/.netlify/functions/enrollment-sync`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                first_name: session.customer_details?.name?.split(' ')[0] || 'Unknown',
                last_name: session.customer_details?.name?.split(' ').slice(1).join(' ') || 'Unknown',
                email: session.customer_details?.email,
                phone: session.customer_details?.phone || '',
                program_id: session.metadata.programId,
                program_name: session.metadata.programName,
                funding_source: 'self-pay',
                status: 'active',
                metadata: {
                  payment_intent_id: session.payment_intent,
                  amount_paid: session.amount_total,
                  stripe_session_id: session.id,
                },
              }),
            });
            
            const enrollmentResult = await response.json();
            console.log('Enrollment created:', enrollmentResult);
          } catch (error) {
            console.error('Failed to create enrollment:', error);
          }
        }

        // 2. Trigger split payout
        if (session.payment_intent && session.amount_total > 0) {
          try {
            const payoutResponse = await fetch(`${process.env.FRONTEND_URL}/.netlify/functions/stripe-split-payout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                payment_intent_id: session.payment_intent,
                amount: session.amount_total,
                program_id: session.metadata?.programId,
                instructor_id: session.metadata?.instructorId,
              }),
            });
            
            const payoutResult = await payoutResponse.json();
            console.log('Split payout processed:', payoutResult);
          } catch (error) {
            console.error('Failed to process split payout:', error);
          }
        }

        // 3. Log transaction
        await supabase.from('activity_log').insert({
          entity_type: 'payment',
          entity_id: session.id,
          action: 'completed',
          details: {
            payment_intent: session.payment_intent,
            amount: session.amount_total,
            customer_email: session.customer_details?.email,
            program: session.metadata?.programName,
          },
          created_at: new Date().toISOString(),
        });

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        
        await supabase.from('activity_log').insert({
          entity_type: 'payment_intent',
          entity_id: paymentIntent.id,
          action: 'succeeded',
          details: {
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
          },
          created_at: new Date().toISOString(),
        });
        
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object;
        console.error('Payment failed:', paymentIntent.id);
        
        await supabase.from('activity_log').insert({
          entity_type: 'payment_intent',
          entity_id: paymentIntent.id,
          action: 'failed',
          details: {
            amount: paymentIntent.amount,
            error: paymentIntent.last_payment_error?.message,
          },
          created_at: new Date().toISOString(),
        });
        
        break;
      }

      case 'account.updated': {
        // Stripe Connect account updated
        const account = stripeEvent.data.object;
        console.log('Stripe Connect account updated:', account.id);
        
        if (account.metadata?.instructor_id) {
          await supabase
            .from('instructors')
            .update({
              stripe_account_status: account.charges_enabled ? 'active' : 'pending',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_account_id', account.id);
        }
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook handler failed' }),
    };
  }
};
