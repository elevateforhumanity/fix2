# Stripe Setup Guide

This guide explains how to create the Stripe products and prices referenced in the codebase.

## Prerequisites

1. Stripe account (sign up at [stripe.com](https://stripe.com))
2. Access to Stripe Dashboard
3. Stripe API keys (found in Dashboard → Developers → API keys)

## Environment Variables

Add these to your `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_...
STRIPE_SECRET_KEY=sk_test_... # or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... # Created when setting up webhook
```

## Creating Products and Prices

### Digital Products (One-Time Purchases)

Navigate to Stripe Dashboard → Products → Add Product

#### 1. Tax Business Toolkit ($49)

- **Name**: Start a Tax Business Toolkit
- **Description**: Step-by-step digital toolkit to launch your tax business
- **Price**: $49.00 (one-time)
- **Price ID**: Copy the generated price ID (starts with `price_`)
- **Update in code**: Replace `price_tax_toolkit_49` in `lib/store/digital-products.ts`

#### 2. Grant Readiness Guide ($29)

- **Name**: Grant Readiness Guide
- **Description**: Complete guide to grant applications and compliance
- **Price**: $29.00 (one-time)
- **Price ID**: Copy and replace `price_grant_guide_29`

#### 3. Fund-Ready Mini Course ($149)

- **Name**: Fund-Ready Mini Course
- **Description**: Short course focused on compliance and positioning
- **Price**: $149.00 (one-time)
- **Price ID**: Copy and replace `price_fund_ready_course_149`

#### 4. Workforce Compliance Checklist ($39)

- **Name**: Workforce Compliance Checklist
- **Description**: Essential compliance checklist for workforce training programs
- **Price**: $39.00 (one-time)
- **Price ID**: Copy and replace `price_workforce_compliance_39`

#### 5. Donation (Custom Amount)

- **Name**: Support Our Mission
- **Description**: Tax-deductible donation
- **Price**: Customer chooses amount
- **Setup**: Use Stripe Checkout with `mode: 'payment'` and `submit_type: 'donate'`
- **Price ID**: Copy and replace `price_donation_custom`

### Platform Licenses

#### 1. EFH Core Platform ($4,999)

- **Name**: EFH Core Workforce Platform
- **Description**: Full workforce-ready LMS, enrollment, payments, and admin system
- **Price**: $4,999.00 (one-time)
- **Product ID**: Copy and replace `prod_efh_core_platform`
- **Price ID**: Copy and replace `price_efh_core_4999`

#### 2. School License ($15,000)

- **Name**: School / Training Provider License
- **Description**: White-label license for schools and workforce providers
- **Price**: $15,000.00 (one-time)
- **Product ID**: Copy and replace `prod_efh_school_license`
- **Price ID**: Copy and replace `price_efh_school_15000`

#### 3. Enterprise License ($50,000)

- **Name**: Enterprise Workforce Solution
- **Description**: Full enterprise deployment with custom integrations
- **Price**: $50,000.00 (one-time)
- **Product ID**: Copy and replace `prod_efh_enterprise`
- **Price ID**: Copy and replace `price_efh_enterprise_50000`

#### 4. Monthly Subscription ($499/month)

- **Name**: Monthly Subscription
- **Description**: Pay-as-you-go access to core platform
- **Price**: $499.00/month (recurring)
- **Billing**: Monthly
- **Product ID**: Copy and replace `prod_efh_monthly_subscription`
- **Price ID**: Copy and replace `price_efh_monthly_499`

## Setting Up Webhooks

Webhooks are required to handle payment confirmations and subscription events.

### Local Development

1. Install Stripe CLI: `brew install stripe/stripe-brew/stripe` (Mac) or download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/store/webhook`
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`

### Production

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your production URL: `https://yourdomain.com/api/store/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Add to production environment variables: `STRIPE_WEBHOOK_SECRET=whsec_...`

## Testing Payments

### Test Mode

Use Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Any future expiry date and any 3-digit CVC will work.

### Live Mode

1. Switch to live mode in Stripe Dashboard
2. Update environment variables with live API keys
3. Test with real payment methods
4. Monitor payments in Dashboard → Payments

## Updating Price IDs in Code

After creating products in Stripe:

1. **Digital Products**: Update `lib/store/digital-products.ts`

   ```typescript
   stripePriceId: 'price_actual_id_from_stripe';
   ```

2. **Platform Licenses**: Update `app/data/store-products.ts`
   ```typescript
   stripeProductId: 'prod_actual_id_from_stripe',
   stripePriceId: 'price_actual_id_from_stripe'
   ```

## Troubleshooting

### Payment Intent Creation Fails

- Check that `STRIPE_SECRET_KEY` is set correctly
- Verify the price amount matches the product price
- Check Stripe Dashboard logs for detailed errors

### Webhook Not Receiving Events

- Verify webhook URL is accessible
- Check webhook signing secret is correct
- Review Stripe Dashboard → Developers → Webhooks → Event logs

### Checkout Session Errors

- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Verify price IDs exist in Stripe
- Check browser console for client-side errors

## Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Use webhook signatures** - Always verify webhook events
3. **Validate amounts server-side** - Don't trust client-submitted prices
4. **Use HTTPS in production** - Required for Stripe
5. **Implement idempotency** - Handle duplicate webhook events

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)
