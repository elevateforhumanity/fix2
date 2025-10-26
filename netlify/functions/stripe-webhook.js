const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        console.log('Payment successful:', session.id);
        console.log('Customer email:', session.customer_details?.email);
        console.log('Amount:', session.amount_total / 100);
        console.log('Program:', session.metadata?.programName);

        // TODO: Add logic to:
        // 1. Create enrollment record in Supabase
        // 2. Send confirmation email
        // 3. Grant access to course materials
        // 4. Log transaction

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object;
        console.error('Payment failed:', paymentIntent.id);
        // TODO: Send failure notification
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
