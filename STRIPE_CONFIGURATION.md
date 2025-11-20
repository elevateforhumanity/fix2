# Stripe Payment Configuration Guide

## Overview

Stripe handles all payment processing for the LMS platform:

- Course purchases
- Subscription payments
- One-time payments
- Refunds and disputes
- Payment analytics

## Step 1: Access Stripe Dashboard

You mentioned Stripe keys are in GitHub secrets. Let me document how to configure them properly.

### Get Your Stripe Keys

1. Log in to Stripe Dashboard: https://dashboard.stripe.com/
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. You'll see two types of keys:

#### Test Mode Keys (for development)

- **Publishable key**: `pk_test_...` (safe to expose in frontend)
- **Secret key**: `sk_test_...` (keep secret, server-side only)

#### Live Mode Keys (for production)

- **Publishable key**: `pk_live_...` (safe to expose in frontend)
- **Secret key**: `sk_live_...` (keep secret, server-side only)

## Step 2: Configure Environment Variables

### Local Development (.env.local)

```bash
# Stripe Test Keys (for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Production (.env.production or GitHub Secrets)

```bash
# Stripe Live Keys (for production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here
```

## Step 3: Add to GitHub Secrets

Since you mentioned Stripe keys are already in GitHub secrets, verify these exist:

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Verify these secrets exist:
   - `STRIPE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

If they don't exist, add them:

1. Click **New repository secret**
2. Name: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Value: Your Stripe publishable key
4. Click **Add secret**
5. Repeat for other keys

## Step 4: Configure Netlify Environment Variables

1. Go to Netlify Dashboard: https://app.netlify.com/
2. Select your site: **elevateforhumanityfix2**
3. Go to **Site settings** → **Environment variables**
4. Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key_here
STRIPE_SECRET_KEY = sk_live_your_key_here
STRIPE_WEBHOOK_SECRET = whsec_your_webhook_secret_here
```

5. Click **Save**
6. Redeploy site to apply changes

## Step 5: Set Up Stripe Webhooks

Webhooks notify your app about payment events (successful payments, failed payments, refunds, etc.)

### Create Webhook Endpoint

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://www.elevateforhumanity.org/api/webhooks/stripe`
4. Description: `LMS Payment Webhooks`
5. Select events to listen for:
   - `checkout.session.completed` - Payment successful
   - `payment_intent.succeeded` - Payment processed
   - `payment_intent.payment_failed` - Payment failed
   - `customer.subscription.created` - Subscription started
   - `customer.subscription.updated` - Subscription changed
   - `customer.subscription.deleted` - Subscription cancelled
   - `invoice.payment_succeeded` - Invoice paid
   - `invoice.payment_failed` - Invoice payment failed
   - `charge.refunded` - Refund processed
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_`)
8. Add to environment variables as `STRIPE_WEBHOOK_SECRET`

### Create Webhook Handler

The webhook handler should already exist at `app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Fulfill the purchase (enroll user in course)
      await handleCheckoutComplete(session);
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Payment successful
      await handlePaymentSuccess(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      // Payment failed
      await handlePaymentFailure(failedPayment);
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription changes
      await handleSubscriptionChange(subscription);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  // Get course ID from metadata
  const courseId = session.metadata?.courseId;
  const userId = session.metadata?.userId;

  if (!courseId || !userId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Enroll user in course
  // Update database
  // Send confirmation email
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  // Update payment status in database
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  // Notify user of payment failure
  // Send email with retry instructions
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('Subscription changed:', subscription.id);
  // Update subscription status in database
}
```

## Step 6: Test Stripe Integration

### Test Cards (Test Mode Only)

Use these test card numbers in test mode:

**Successful Payment**:

- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Payment Requires Authentication (3D Secure)**:

- Card: `4000 0025 0000 3155`

**Payment Declined**:

- Card: `4000 0000 0000 9995`

**Insufficient Funds**:

- Card: `4000 0000 0000 9995`

### Test Checkout Flow

1. Start development server: `npm run dev`
2. Navigate to a course page
3. Click **Enroll Now** or **Purchase**
4. Enter test card details
5. Complete checkout
6. Verify:
   - Payment successful message
   - User enrolled in course
   - Confirmation email sent
   - Webhook received and processed

### Test Webhook Locally

Use Stripe CLI to forward webhooks to localhost:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger payment_intent.succeeded
```

## Step 7: Stripe Products and Prices

### Create Products in Stripe Dashboard

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. For each course, create a product:

**Example: Workforce Readiness Course**

- Name: `Workforce Readiness Training`
- Description: `Comprehensive workforce readiness program`
- Pricing:
  - One-time payment: $99.00
  - Or subscription: $29.99/month
- Metadata:
  - `course_id`: `workforce-readiness`
  - `course_type`: `certification`

4. Copy the **Price ID** (starts with `price_`)
5. Add to your course configuration

### Update Course Configuration

In your database or config file, add Stripe price IDs:

```typescript
// lib/courses.ts
export const courses = [
  {
    id: 'workforce-readiness',
    title: 'Workforce Readiness Training',
    price: 99.0,
    stripePriceId: 'price_1234567890abcdef', // From Stripe Dashboard
    stripeProductId: 'prod_1234567890abcdef',
  },
  // ... other courses
];
```

## Step 8: Implement Checkout

### Create Checkout Session

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  const { priceId, courseId, userId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=true`,
      metadata: {
        courseId,
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

### Frontend Checkout Button

```typescript
// components/EnrollButton.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function EnrollButton({ courseId, priceId }: { courseId: string; priceId: string }) {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          courseId,
          userId: 'current-user-id', // Get from auth
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Enroll Now'}
    </button>
  );
}
```

## Step 9: Security Best Practices

### 1. Never Expose Secret Keys

- ✅ Only use `NEXT_PUBLIC_` prefix for publishable key
- ✅ Keep secret key server-side only
- ✅ Never commit keys to Git
- ✅ Use environment variables

### 2. Verify Webhook Signatures

- ✅ Always verify webhook signatures
- ✅ Use `stripe.webhooks.constructEvent()`
- ✅ Return 400 for invalid signatures

### 3. Validate Amounts

- ✅ Verify payment amounts match expected prices
- ✅ Check currency is correct
- ✅ Validate metadata (courseId, userId)

### 4. Handle Errors Gracefully

- ✅ Catch and log all errors
- ✅ Show user-friendly error messages
- ✅ Implement retry logic for failed payments

### 5. PCI Compliance

- ✅ Never store card details
- ✅ Use Stripe Elements or Checkout
- ✅ Let Stripe handle sensitive data
- ✅ Use HTTPS for all requests

## Step 10: Go Live Checklist

Before switching to live mode:

- [ ] Complete Stripe account verification
- [ ] Add business details (tax ID, address)
- [ ] Set up bank account for payouts
- [ ] Create products in live mode
- [ ] Update environment variables with live keys
- [ ] Test checkout flow in live mode (with real card)
- [ ] Set up live webhooks
- [ ] Enable fraud detection (Stripe Radar)
- [ ] Configure email receipts
- [ ] Set up refund policy
- [ ] Test refund process
- [ ] Monitor first transactions closely

## Step 11: Monitoring and Analytics

### Stripe Dashboard Metrics

- Total revenue
- Successful payments
- Failed payments
- Refunds
- Disputes/chargebacks
- Customer lifetime value

### Set Up Alerts

1. Go to Stripe Dashboard → **Settings** → **Notifications**
2. Enable alerts for:
   - Failed payments
   - Disputes
   - Unusual activity
   - Webhook failures

### Revenue Reports

1. Go to **Reports** in Stripe Dashboard
2. View:
   - Daily revenue
   - Monthly recurring revenue (MRR)
   - Customer retention
   - Payment success rate

## Step 12: Pricing and Fees

### Stripe Fees (as of 2024)

**Standard Pricing**:

- 2.9% + $0.30 per successful card charge
- No setup fees
- No monthly fees
- No hidden costs

**International Cards**:

- Additional 1.5% for international cards
- Currency conversion fees apply

**Disputes**:

- $15 fee per dispute (refunded if you win)

### Estimated Monthly Cost (1000 students)

- Average course price: $99
- Monthly enrollments: 50 students
- Revenue: $4,950
- Stripe fees: $143.55 (2.9%) + $15 (30 × $0.30)
- **Total fees**: ~$158.55/month (~3.2% of revenue)

## Step 13: Refund Policy

### Implement Refunds

```typescript
// app/api/refunds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  const { paymentIntentId, reason } = await request.json();

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: reason || 'requested_by_customer',
    });

    return NextResponse.json({ refund });
  } catch (error) {
    console.error('Refund error:', error);
    return NextResponse.json(
      { error: 'Failed to process refund' },
      { status: 500 }
    );
  }
}
```

### Refund Policy

- Full refund within 7 days of purchase
- Partial refund (50%) within 30 days
- No refunds after course completion
- Refunds processed within 5-10 business days

## Troubleshooting

### Error: "No such price"

- Verify price ID is correct
- Check you're using the right mode (test vs live)
- Ensure product is active in Stripe Dashboard

### Error: "Invalid API key"

- Check `STRIPE_SECRET_KEY` is set correctly
- Verify you're using the right key for the mode
- Ensure key hasn't been revoked

### Webhook Not Receiving Events

- Verify webhook URL is correct and accessible
- Check webhook signing secret is correct
- Test webhook with Stripe CLI
- Check server logs for errors

### Payment Declined

- User's card was declined by bank
- Insufficient funds
- Card expired or invalid
- Fraud detection triggered

## Next Steps

1. ✅ Verify Stripe keys in GitHub Secrets
2. ✅ Add keys to Netlify environment variables
3. ✅ Create products in Stripe Dashboard
4. ✅ Set up webhooks
5. ✅ Test checkout flow
6. ✅ Implement refund policy
7. ✅ Go live with real payments

## Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Support](https://support.stripe.com/)

---

**Status**: ⚠️ Verify keys in GitHub Secrets and Netlify
**Priority**: High - Required for course payments
**Estimated Setup Time**: 30-45 minutes
