# Stripe Setup Checklist for EFH Platform Store

## Goal
Enable credit cards + BNPL (Affirm, Klarna, Afterpay) on elevateforhumanity.org using Stripe Checkout.

---

## A. Account & Compliance

- [ ] Stripe account fully activated (business details, identity verification, bank account)
- [ ] Live payouts enabled
- [ ] Test mode used first, then Live mode setup repeated

---

## B. Payment Methods (Dashboard)

**Location:** Settings → Payments → Payment methods

### Cards
- [ ] Visa enabled
- [ ] Mastercard enabled
- [ ] American Express enabled
- [ ] Discover enabled

### Buy Now, Pay Later
- [ ] Affirm enabled (PRIMARY for workforce/education)
- [ ] Klarna enabled
- [ ] Afterpay / Clearpay enabled

### Digital Wallets
- [ ] Apple Pay enabled
- [ ] Google Pay enabled

> **Note:** BNPL visibility is automatic and eligibility-based. Do NOT force in code.

---

## C. Products & Prices (Dashboard)

**Location:** Products → Add product

### Products to Create

#### 1. EFH Core Workforce Platform
- [ ] Product created
- [ ] Name: "EFH Core Workforce Platform"
- [ ] Description: "Full workforce-ready LMS, enrollment, payments, and admin system"
- [ ] Price: One-time, USD $4,999
- [ ] Price ID copied: `price_________________`

#### 2. School / Training Provider License
- [ ] Product created
- [ ] Name: "School / Training Provider License"
- [ ] Description: "White-label license for schools, nonprofits, and workforce providers"
- [ ] Price: One-time, USD $15,000
- [ ] Price ID copied: `price_________________`

#### 3. Enterprise Workforce Solution
- [ ] Product created
- [ ] Name: "Enterprise Workforce Solution"
- [ ] Description: "Full enterprise deployment with employer portal, AI tutor, and custom integrations"
- [ ] Price: One-time, USD $50,000
- [ ] Price ID copied: `price_________________`

#### 4. Monthly Subscription
- [ ] Product created
- [ ] Name: "Monthly Subscription"
- [ ] Description: "Pay-as-you-go access to the core platform"
- [ ] Price: Recurring (monthly), USD $499
- [ ] Price ID copied: `price_________________`

---

## D. Code Mapping (Required)

### Update Price IDs in Code

**File:** `lib/stripe/price-map.ts`

```typescript
export const STRIPE_PRICE_IDS: Record<string, string> = {
  "efh-core": "price_________________", // Paste from Stripe Dashboard
  "efh-school-license": "price_________________",
  "efh-enterprise": "price_________________",
  "efh-monthly": "price_________________",
};
```

### Verify Checkout Configuration

**File:** `app/api/stripe/checkout/route.ts`

- [ ] Uses `STRIPE_PRICE_IDS` (not `price_data`)
- [ ] Does NOT set `payment_method_types` (allows auto-detection)
- [ ] Includes proper metadata (productId, licenseType, appsIncluded)

---

## E. Webhooks

**Location:** Developers → Webhooks

### Test Mode Webhook
- [ ] Endpoint created: `https://www.elevateforhumanity.org/api/stripe/webhook`
- [ ] Events enabled:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
  - [ ] `invoice.payment_failed`
- [ ] Webhook secret copied: `whsec_________________`
- [ ] Added to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Live Mode Webhook
- [ ] Endpoint created: `https://www.elevateforhumanity.org/api/stripe/webhook`
- [ ] Same events enabled as Test mode
- [ ] Webhook secret copied: `whsec_________________`
- [ ] Added to production environment variables

---

## F. Environment Variables

### Required Variables

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_... # Use sk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

### Verification
- [ ] Test keys work in development
- [ ] Live keys added to production (Vercel/hosting platform)
- [ ] Webhook secrets match Dashboard

---

## G. Go Live Checklist

### Pre-Launch
- [ ] All products created in Live mode
- [ ] All prices created in Live mode
- [ ] Price IDs updated in code
- [ ] Live webhook endpoint created
- [ ] Live webhook secret updated
- [ ] Live Stripe keys (`sk_live_...`) in production

### Testing
- [ ] Test purchase completed successfully (Test mode)
- [ ] Checkout redirects to `/dashboard/onboarding`
- [ ] Webhook receives `checkout.session.completed` event
- [ ] Metadata (productId, licenseType) captured correctly

### Launch
- [ ] Live purchase completed successfully
- [ ] BNPL options appear (may vary by eligibility)
- [ ] Customer receives confirmation
- [ ] Webhook logs show successful events

---

## H. BNPL Customer-Facing Copy

### Short Version (near price)
```
Flexible payment options available
Pay in full or split your purchase over time with Affirm, Klarna, or Afterpay (subject to eligibility).
```

### Education-Focused Version (recommended for EFH)
```
Affordable access to career training
Elevate for Humanity partners with Stripe to offer flexible payment options.
You may qualify for installment plans through Affirm, or split payments using Klarna or Afterpay, 
in addition to standard credit/debit cards.
Payment options appear securely at checkout and are subject to approval.
```

---

## I. Validation Script (5-Minute Check)

### Test Mode Validation
1. Open Stripe Dashboard → Test Mode
2. Open store product page: `/platform/efh-core-platform`
3. Click "Purchase License"
4. Confirm Stripe Checkout opens
5. Verify:
   - Card option present
   - BNPL options appear (may vary)
6. Complete test payment using test card: `4242 4242 4242 4242`
7. Confirm redirect to `/dashboard/onboarding?session_id=...`
8. Check Stripe Dashboard → Webhooks → event received

### Live Mode Validation
Repeat above steps in Live mode with real payment method (use lowest-price product for testing).

---

## J. Important Rules (DO NOT BREAK)

❌ **DO NOT** force BNPL in code
❌ **DO NOT** restrict payment methods with `payment_method_types`
❌ **DO NOT** assume BNPL shows for everyone
❌ **DO NOT** skip Live-mode product creation
❌ **DO NOT** show misleading "guaranteed" payment claims

✅ **DO** let Stripe handle payment method eligibility automatically
✅ **DO** test thoroughly in Test mode first
✅ **DO** use predefined Price IDs (not `price_data`)
✅ **DO** handle webhooks for post-purchase logic

---

## K. Common Issues & Solutions

### BNPL Not Showing
- Verify account is fully activated
- Check purchase amount is $50+ (BNPL minimum)
- Confirm BNPL enabled in Dashboard
- Ensure `payment_method_types` is NOT set in code
- Test from different browsers/devices (eligibility varies)

### Webhook Not Receiving Events
- Verify endpoint URL is correct and publicly accessible
- Check webhook secret matches code
- Confirm events are enabled in Dashboard
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Price ID Not Found
- Verify Price IDs are copied correctly from Dashboard
- Check `STRIPE_PRICE_IDS` mapping in code
- Ensure using Live Price IDs in production (not Test IDs)

---

## L. Support Resources

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe Docs:** https://stripe.com/docs/payments/checkout
- **BNPL Docs:** https://stripe.com/docs/payments/buy-now-pay-later
- **Webhook Docs:** https://stripe.com/docs/webhooks
- **Test Cards:** https://stripe.com/docs/testing

---

## M. Completion Sign-Off

**Completed by:** ___________________  
**Date:** ___________________  
**Test Purchase Session ID:** ___________________  
**Live Purchase Session ID:** ___________________  

**Verified by:** ___________________  
**Date:** ___________________
