# LICENSING FUNNEL TRUTH - CURRENT STATE

## Inventory Before Fixes

**Date:** December 26, 2024  
**Status:** BROKEN - Checkout 404s

---

## LICENSING ENTRY POINTS

### 1. Navigation

- **Main Nav:** "Pricing" → `/pricing`
- **Footer:** "Platform Licensing" → `/pricing/sponsor-licensing`
- **Status:** ✅ Links resolve

### 2. Homepage

- **Hero CTA:** "Get Started" → `/pricing`
- **Platform Section:** "License Platform" → `/pricing/sponsor-licensing`
- **Status:** ✅ Links resolve

### 3. Pricing Pages

- **Main Pricing:** `/pricing` → Shows all options
- **Platform Licensing:** `/pricing/sponsor-licensing` → Detailed tiers
- **Program Holder:** `/pricing/program-holder`
- **Independent:** `/pricing/independent`
- **Status:** ✅ Pages exist

---

## CTA TARGETS (CURRENT STATE)

### Starter Tier

- **CTA:** "Get Started"
- **Target:** `/checkout?plan=starter`
- **Status:** ❌ **404 NOT FOUND**
- **Expected:** Stripe Checkout Session

### Pro Tier

- **CTA:** "Get Started"
- **Target:** `/checkout?plan=pro`
- **Status:** ❌ **404 NOT FOUND**
- **Expected:** Stripe Checkout Session

### Enterprise Tier

- **CTA:** "Contact Sales"
- **Target:** `/contact?topic=licensing-enterprise`
- **Status:** ✅ Works (routes to contact form)

---

## PRICING DEFINITIONS

### Location in Code

```
File: app/pricing/sponsor-licensing/page.tsx
Lines: 15-80 (approximate)

Tiers:
- Starter: $750/month + $1,500 setup
- Pro: $2,500/month + $5,000 setup
- Enterprise: $90K-$180K/year + $25K-$50K setup
```

### Stripe Product IDs

**Status:** ❌ NOT DEFINED YET

Need to create:

- `price_starter_monthly` → $750/month
- `price_pro_monthly` → $2,500/month
- Setup fees handled separately (one-time invoice)

---

## STRIPE INTEGRATION

### Current Files

```
lib/stripe/
├── client.ts (Stripe client initialization)
├── config.ts (Stripe config)
└── webhooks.ts (Webhook handlers)

app/api/stripe/
├── checkout/route.ts (❌ DOES NOT EXIST)
└── webhooks/route.ts (exists)
```

### Environment Variables

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Status:** ⚠️ Keys exist but checkout route missing

---

## SUPABASE TABLES

### Existing Tables

```sql
-- Licenses/subscriptions
CREATE TABLE licenses (
  id UUID PRIMARY KEY,
  organization_id UUID,
  plan TEXT, -- 'starter', 'pro', 'enterprise'
  status TEXT, -- 'active', 'canceled', 'past_due'
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- License leads (before purchase)
CREATE TABLE license_leads (
  id UUID PRIMARY KEY,
  email TEXT,
  organization_name TEXT,
  plan TEXT,
  source TEXT, -- 'website', 'demo', 'contact'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Status:** ⚠️ Tables may need to be created

---

## VERIFICATION COMMANDS (BEFORE FIX)

```bash
# Test Starter checkout
curl -I https://www.elevateforhumanity.org/checkout?plan=starter
# Expected: HTTP/2 404

# Test Pro checkout
curl -I https://www.elevateforhumanity.org/checkout?plan=pro
# Expected: HTTP/2 404

# Test Enterprise (should work)
curl -I https://www.elevateforhumanity.org/contact?topic=licensing-enterprise
# Expected: HTTP/2 200
```

---

## WHAT NEEDS TO BE BUILT

### 1. Checkout Route (CRITICAL)

- [ ] Create `app/checkout/page.tsx`
- [ ] Accept `plan` query param
- [ ] Validate plan server-side
- [ ] Create Stripe Checkout Session
- [ ] Redirect to Stripe
- [ ] Handle success/cancel URLs

### 2. Stripe Products

- [ ] Create Starter product in Stripe
- [ ] Create Pro product in Stripe
- [ ] Create price IDs
- [ ] Add to environment variables

### 3. Database Tables

- [ ] Verify `licenses` table exists
- [ ] Verify `organizations` table exists
- [ ] Create `license_leads` table
- [ ] Add RLS policies

### 4. Success/Cancel Pages

- [ ] Create `/checkout/success` page
- [ ] Create `/checkout/cancel` page
- [ ] Handle Stripe webhook for fulfillment

---

## AFTER FIX VERIFICATION

```bash
# Test Starter checkout (should redirect to Stripe)
curl -I https://www.elevateforhumanity.org/checkout?plan=starter
# Expected: HTTP/2 302 (redirect to checkout.stripe.com)

# Test Pro checkout (should redirect to Stripe)
curl -I https://www.elevateforhumanity.org/checkout?plan=pro
# Expected: HTTP/2 302 (redirect to checkout.stripe.com)

# Test invalid plan (should show error)
curl -I https://www.elevateforhumanity.org/checkout?plan=invalid
# Expected: HTTP/2 400 or redirect to /pricing with error
```

---

## CURRENT BLOCKER

**The checkout route does not exist.**

This is a **SAME-DAY BLOCKER** because:

- Marketing drives traffic to pricing page ✅
- Users click "Get Started" ✅
- Users hit 404 ❌
- **100% conversion loss at payment step**

**Fix Priority:** CRITICAL - Do this first before anything else.
