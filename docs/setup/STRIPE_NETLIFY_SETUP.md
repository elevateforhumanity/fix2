# Stripe Setup Guide for Netlify

**Project:** Elevate for Humanity  
**Platform:** Netlify  
**Payment Processor:** Stripe

---

## 🎯 Overview

This guide will help you configure Stripe payment processing in your Netlify deployment for handling donations and program enrollments.

---

## 1. Create Stripe Account

### Step 1: Sign Up for Stripe

1. Go to: [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create your account
3. Complete business verification
4. Activate your account

### Step 2: Get Your API Keys

1. Go to: [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. You'll see two types of keys:
   - **Test keys** (for development)
   - **Live keys** (for production)

**Test Keys (Start Here):**

- Publishable key: `pk_test_...`
- Secret key: `sk_test_...`

**Live Keys (After Testing):**

- Publishable key: `pk_live_...`
- Secret key: `sk_live_...`

---

## 2. Configure Stripe Webhooks

### Step 1: Create Webhook Endpoint

1. Go to: [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter your endpoint URL:
   ```
   https://elevateforhumanity.org/api/stripe-webhook
   ```
   Or for testing:
   ```
   https://[your-netlify-site].netlify.app/api/stripe-webhook
   ```

### Step 2: Select Events to Listen For

Select these events:

- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`

### Step 3: Get Webhook Secret

After creating the webhook:

1. Click on the webhook endpoint
2. Click **"Reveal"** next to "Signing secret"
3. Copy the secret: `whsec_...`

---

## 3. Add Environment Variables to Netlify

### Step 1: Access Netlify Dashboard

1. Go to: [https://app.netlify.com](https://app.netlify.com)
2. Select your site: **elevateforhumanity**
3. Go to: **Site settings** → **Environment variables**

### Step 2: Add Stripe Variables

Click **"Add a variable"** and add these three variables:

#### Variable 1: VITE_STRIPE_PUBLISHABLE_KEY

- **Key:** `VITE_STRIPE_PUBLISHABLE_KEY`
- **Value:** Your Stripe publishable key
  - Test: `pk_test_51...`
  - Live: `pk_live_51...`
- **Scopes:** All scopes

#### Variable 2: STRIPE_SECRET_KEY

- **Key:** `STRIPE_SECRET_KEY`
- **Value:** Your Stripe secret key
  - Test: `sk_test_51...`
  - Live: `sk_live_51...`
- **Scopes:** All scopes
- ⚠️ **Important:** Keep this secret! Never expose in frontend code

#### Variable 3: STRIPE_WEBHOOK_SECRET

- **Key:** `STRIPE_WEBHOOK_SECRET`
- **Value:** Your webhook signing secret
  - Format: `whsec_...`
- **Scopes:** All scopes

### Step 3: Save and Redeploy

1. Click **"Save"** after adding each variable
2. Go to **Deploys** tab
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 4. Verify Configuration

### Check Environment Variables

Your `netlify.toml` should have these commented lines:

```toml
# VITE_STRIPE_PUBLISHABLE_KEY = "pk_test_your_key_here"
# STRIPE_SECRET_KEY = "sk_test_your_key_here"
# STRIPE_WEBHOOK_SECRET = "whsec_your_webhook_secret_here"
```

**Note:** These are just placeholders. Real values are in Netlify dashboard.

### Verify Functions

Your Netlify functions should be at:

- `netlify/functions/create-checkout-session.js`
- `netlify/functions/create-enrollment-session.js`
- `netlify/functions/stripe-webhook.js`

---

## 5. Test Stripe Integration

### Test Mode

1. Use test API keys
2. Use test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - **3D Secure:** `4000 0025 0000 3155`
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits
   - **ZIP:** Any 5 digits

### Test Donation Flow

1. Go to: `https://elevateforhumanity.org/donate
2. Click **"Donate Now"**
3. Enter test card: `4242 4242 4242 4242`
4. Complete checkout
5. Check Stripe dashboard for payment

### Test Enrollment Flow

1. Go to: `https://elevateforhumanity.org/programs/[program-slug]
2. Click **"Enroll Now"**
3. Enter test card
4. Complete enrollment
5. Verify in Stripe dashboard

### Test Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook endpoint
3. Check **"Events"** tab
4. Verify events are being received
5. Check for any errors

---

## 6. Go Live with Stripe

### Before Going Live

- [ ] Complete Stripe account verification
- [ ] Add business information
- [ ] Set up bank account for payouts
- [ ] Review pricing and fees
- [ ] Test all payment flows thoroughly

### Switch to Live Keys

1. Get your live API keys from Stripe dashboard
2. Update Netlify environment variables:
   - Replace `pk_test_...` with `pk_live_...`
   - Replace `sk_test_...` with `sk_live_...`
3. Update webhook endpoint to use live mode
4. Get new webhook secret for live mode
5. Update `STRIPE_WEBHOOK_SECRET` in Netlify
6. Redeploy site

### Post-Launch Checklist

- [ ] Test live payment with real card
- [ ] Verify webhook events are received
- [ ] Check payment appears in Stripe dashboard
- [ ] Verify funds are deposited to bank account
- [ ] Set up email notifications in Stripe
- [ ] Configure receipt emails
- [ ] Set up fraud prevention rules

---

## 7. Stripe Products Configuration

### Create Products in Stripe

1. Go to: [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click **"Add product"**

### Donation Product

**Product Details:**

- **Name:** Donation to Elevate for Humanity
- **Description:** Support workforce development programs
- **Pricing:** Customer chooses amount
- **Type:** One-time payment

### Program Enrollment Products

Create a product for each program:

**Example: Barber Apprenticeship**

- **Name:** Barber Apprenticeship Program Enrollment
- **Description:** 2,000-hour apprenticeship program
- **Price:** $0 (if WIOA funded) or set enrollment fee
- **Type:** One-time payment

**Repeat for all 9 programs:**

1. Barber Apprenticeship
2. Building Services Technician
3. CNA
4. CPR/AED/First Aid
5. Business Start-Up & Marketing
6. Tax Office Startup
7. Esthetician & Client Services
8. Beauty & Career Educator
9. Public Safety Reentry Specialist

---

## 8. Update Frontend Code

### Add Stripe Product IDs

After creating products in Stripe, update your code with product IDs:

**File:** `src/config/stripe.ts` (create if doesn't exist)

```typescript
export const STRIPE_PRODUCTS = {
  donation: 'prod_...', // Your donation product ID
  programs: {
    barber: 'prod_...',
    'building-tech': 'prod_...',
    cna: 'prod_...',
    'cpr-aed-first-aid': 'prod_...',
    'business-startup-marketing': 'prod_...',
    'tax-office-startup': 'prod_...',
    'esthetician-client-services': 'prod_...',
    'beauty-career-educator': 'prod_...',
    'public-safety-reentry': 'prod_...',
  },
};
```

---

## 9. Monitoring & Analytics

### Stripe Dashboard

Monitor these metrics:

- **Payments:** Total revenue
- **Customers:** Number of donors/students
- **Failed Payments:** Track and retry
- **Disputes:** Handle chargebacks
- **Refunds:** Process refund requests

### Set Up Alerts

1. Go to: Settings → Notifications
2. Enable alerts for:
   - Failed payments
   - Disputes
   - Large transactions
   - Unusual activity

### Revenue Reports

1. Go to: Reports → Revenue
2. Set up automated reports
3. Export data for accounting
4. Track by program/donation type

---

## 10. Security Best Practices

### API Key Security

- ✅ Never commit API keys to Git
- ✅ Use environment variables only
- ✅ Rotate keys periodically
- ✅ Use test keys for development
- ✅ Restrict API key permissions

### Webhook Security

- ✅ Verify webhook signatures
- ✅ Use HTTPS only
- ✅ Validate event data
- ✅ Handle idempotency
- ✅ Log all webhook events

### PCI Compliance

- ✅ Never store card numbers
- ✅ Use Stripe.js for card collection
- ✅ Let Stripe handle sensitive data
- ✅ Use Stripe Checkout when possible
- ✅ Keep Stripe.js library updated

---

## 11. Troubleshooting

### Common Issues

**Issue:** "Invalid API key"

- **Solution:** Check key is correct in Netlify environment variables
- **Solution:** Ensure no extra spaces or quotes
- **Solution:** Verify using correct mode (test vs live)

**Issue:** "Webhook signature verification failed"

- **Solution:** Check webhook secret is correct
- **Solution:** Ensure endpoint URL matches exactly
- **Solution:** Verify webhook is enabled

**Issue:** "Payment declined"

- **Solution:** Check card details are correct
- **Solution:** Verify sufficient funds
- **Solution:** Try different card
- **Solution:** Check Stripe radar rules

**Issue:** "Function timeout"

- **Solution:** Optimize function code
- **Solution:** Increase timeout in netlify.toml
- **Solution:** Check Stripe API response time

### Debug Mode

Enable debug logging in functions:

```javascript
// netlify/functions/create-checkout-session.js
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Missing');
console.log('Request body:', JSON.stringify(event.body));
```

---

## 12. Support Resources

### Stripe Documentation

- **Getting Started:** https://stripe.com/docs/payments/quickstart
- **Checkout:** https://stripe.com/docs/payments/checkout
- **Webhooks:** https://stripe.com/docs/webhooks
- **Testing:** https://stripe.com/docs/testing

### Netlify Documentation

- **Functions:** https://docs.netlify.com/functions/overview/
- **Environment Variables:** https://docs.netlify.com/environment-variables/overview/
- **Redirects:** https://docs.netlify.com/routing/redirects/

### Support Channels

- **Stripe Support:** https://support.stripe.com
- **Netlify Support:** https://answers.netlify.com
- **Community:** Stack Overflow (tag: stripe, netlify)

---

## 13. Quick Reference

### Environment Variables Needed

```bash
# Frontend (starts with VITE_)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_...

# Backend (Netlify Functions)
STRIPE_SECRET_KEY=sk_test_... # or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Test Card Numbers

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
Insufficient Funds: 4000 0000 0000 9995
```

### Webhook Events

```
checkout.session.completed
payment_intent.succeeded
payment_intent.payment_failed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
```

---

## 14. Checklist

### Initial Setup

- [ ] Create Stripe account
- [ ] Get test API keys
- [ ] Add keys to Netlify environment variables
- [ ] Create webhook endpoint
- [ ] Add webhook secret to Netlify
- [ ] Deploy site

### Testing

- [ ] Test donation flow with test card
- [ ] Test enrollment flow with test card
- [ ] Verify webhooks are received
- [ ] Check Stripe dashboard for payments
- [ ] Test failed payment scenarios
- [ ] Test refund process

### Go Live

- [ ] Complete Stripe verification
- [ ] Get live API keys
- [ ] Update Netlify environment variables
- [ ] Create live webhook endpoint
- [ ] Update webhook secret
- [ ] Test with real card
- [ ] Monitor for 24 hours

### Ongoing

- [ ] Monitor payments daily
- [ ] Handle disputes promptly
- [ ] Process refunds as needed
- [ ] Review failed payments
- [ ] Update products as needed
- [ ] Check webhook logs weekly

---

**Setup Time:** 30-60 minutes  
**Testing Time:** 15-30 minutes  
**Go Live Time:** 15 minutes

**Status:** Ready to configure - follow steps above

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-26  
**Next Review:** After Stripe configuration
