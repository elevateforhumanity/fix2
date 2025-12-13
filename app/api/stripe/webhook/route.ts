import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ 
      error: 'Payment system not configured' 
    }, { status: 503 });
  }

  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const productId = session.metadata?.productId;
      const licenseType = session.metadata?.licenseType;
      const appsIncluded = session.metadata?.appsIncluded;
      const customerEmail = session.customer_details?.email;

      console.log('✅ Purchase completed:', {
        sessionId: session.id,
        customerEmail,
        productId,
        licenseType,
        appsIncluded,
        amountTotal: session.amount_total,
      });

      // TODO: Implement post-purchase logic:
      // 1. Create/lookup user in Supabase by email
      // 2. Create organization record
      // 3. Assign license type to organization
      // 4. Enable apps from appsIncluded array
      // 5. Store Stripe customer ID and session ID
      // 6. Send welcome email with onboarding link
      // 7. Trigger any webhooks or integrations

      // Example Supabase integration (uncomment when ready):
      /*
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', customerEmail)
        .single();

      if (user) {
        await supabase.from('licenses').insert({
          user_id: user.id,
          product_id: productId,
          license_type: licenseType,
          stripe_session_id: session.id,
          stripe_customer_id: session.customer,
          status: 'active',
          apps_enabled: JSON.parse(appsIncluded || '[]'),
        });
      }
      */

      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      console.log(`Subscription ${event.type}:`, {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
      });

      // TODO: Update subscription status in database
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log('Invoice paid:', {
        invoiceId: invoice.id,
        customerId: invoice.customer,
        amountPaid: invoice.amount_paid,
      });

      // TODO: Handle recurring payment success
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log('Invoice payment failed:', {
        invoiceId: invoice.id,
        customerId: invoice.customer,
      });

      // TODO: Handle payment failure (send email, suspend access, etc.)
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
