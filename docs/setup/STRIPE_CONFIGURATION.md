# Stripe Payment System Configuration

## Overview

The Stripe payment system is configured for program enrollments with the following components:

- **Frontend**: React components using `@stripe/stripe-js`
- **Backend**: Netlify Functions for secure payment processing
- **Webhooks**: Automated payment confirmation and enrollment

## Configuration Status

### ✅ Completed

- Stripe packages installed (`stripe`, `@stripe/stripe-js`)
- Frontend payment components created
- Netlify Functions for checkout sessions
- Webhook handler for payment events
- CSP headers updated to allow Stripe domains
- API redirects configured

### ⚠️ Required Setup

You need to add the following environment variables in your Netlify Dashboard:

1. Go to: https://app.netlify.com/sites/YOURSITE/settings/deploys#environment
2. Add these variables:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Getting Stripe Keys

### 1. Create Stripe Account

- Go to https://stripe.com
- Sign up or log in
- Complete account verification

### 2. Get API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3. Set Up Webhook

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://YOURSITE.netlify.app/api/stripe-webhook
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Netlify Functions

### Created Functions

#### 1. `create-checkout-session`

- **Path**: `/.netlify/functions/create-checkout-session`
- **Method**: POST
- **Purpose**: Create Stripe Checkout session for any payment

#### 2. `create-enrollment-session`

- **Path**: `/.netlify/functions/create-enrollment-session`
- **Method**: POST
- **Purpose**: Create enrollment-specific checkout session
- **Note**: Handles free enrollments (price = 0) without Stripe

#### 3. `stripe-webhook`

- **Path**: `/.netlify/functions/stripe-webhook`
- **Method**: POST
- **Purpose**: Handle Stripe webhook events

## Payment Flow

1. User clicks "Enroll" → Frontend calls API
2. Netlify Function creates Stripe Checkout session
3. User redirected to Stripe Checkout
4. User enters payment details
5. Stripe processes payment
6. Webhook confirms payment
7. Enrollment created in Supabase

## Testing

Use Stripe test cards:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Production Checklist

- [ ] Add Stripe API keys to Netlify environment variables
- [ ] Configure webhook in Stripe Dashboard
- [ ] Test payment flow end-to-end
- [ ] Replace test keys with live keys for production

---

**Status**: ✅ Configuration Complete - Awaiting Stripe API Keys
