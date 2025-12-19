# 🚀 Stripe Two-Lane System - Quick Start

**5-minute setup to get both payment systems running.**

---

## ✅ What You Have

**Lane A: Enrollment Payments** (Non-subscription)
- Billing lock prevents double-charges
- Idempotent webhooks
- Complete audit trail
- State machine validation

**Lane B: Store Subscriptions** (Recurring)
- 3 tiers: Pro ($29/mo), VIP ($99/mo), Wholesale ($199/mo)
- Automatic entitlement management
- Customer Portal for self-service
- Webhook-driven activation

---

## 🎯 Setup Steps

### 1. Apply Migrations (2 minutes)

Go to [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor

Run these 3 files in order:

1. `supabase/migrations/20241219_stripe_workflow_final.sql`
2. `supabase/migrations/20241219_enrollment_state_transitions.sql`
3. `supabase/migrations/20241219_store_subscriptions.sql`

**Don't run the 4th file yet** (`20241219_store_subscription_products.sql`) - we need Stripe IDs first.

---

### 2. Create Stripe Products (3 minutes)

Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products) (Test Mode)

**Product 1: Store Pro**
- Name: `Store Pro`
- Monthly: `$29` (7-day trial)
- Yearly: `$290` (7-day trial)
- Copy: `prod_XXXXX` and both `price_XXXXX` IDs

**Product 2: VIP Access**
- Name: `VIP Access`
- Monthly: `$99` (14-day trial)
- Yearly: `$990` (14-day trial)
- Copy: `prod_XXXXX` and both `price_XXXXX` IDs

**Product 3: Wholesale Partner**
- Name: `Wholesale Partner`
- Monthly: `$199` (no trial)
- Yearly: `$1,990` (no trial)
- Copy: `prod_XXXXX` and both `price_XXXXX` IDs

---

### 3. Update Migration with Real IDs (1 minute)

Open: `supabase/migrations/20241219_store_subscription_products.sql`

Find and replace:
- `'prod_store_pro'` → Your Store Pro product ID
- `'price_store_pro_monthly'` → Your Store Pro monthly price ID
- `'price_store_pro_yearly'` → Your Store Pro yearly price ID
- `'prod_vip_access'` → Your VIP product ID
- `'price_vip_monthly'` → Your VIP monthly price ID
- `'price_vip_yearly'` → Your VIP yearly price ID
- `'prod_wholesale_partner'` → Your Wholesale product ID
- `'price_wholesale_monthly'` → Your Wholesale monthly price ID
- `'price_wholesale_yearly'` → Your Wholesale yearly price ID

Run the updated file in Supabase SQL Editor.

---

### 4. Configure Webhooks (2 minutes)

Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)

**Add endpoint:**
```
https://yourdomain.com/api/webhooks/stripe
```

**Select events:**
- `checkout.session.completed`
- `payment_intent.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Copy webhook secret** (`whsec_XXXXX`)

Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXX
```

---

### 5. Enable Customer Portal (1 minute)

Go to [Customer Portal Settings](https://dashboard.stripe.com/test/settings/billing/portal)

Click **"Activate test link"**

Enable:
- ✅ Update payment methods
- ✅ Cancel subscriptions (at period end)
- ✅ Switch plans

Save changes.

---

## 🧪 Test It

### Test Subscription

1. Go to: `http://localhost:3000/store/subscriptions`
2. Click "Subscribe Now" on any plan
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify redirect to success page
6. Check "Manage Subscription" button works

### Verify in Database

```sql
-- Check subscription created
SELECT * FROM store_subscriptions ORDER BY created_at DESC LIMIT 1;

-- Check entitlements activated
SELECT * FROM store_entitlements WHERE is_active = true;

-- Check webhook processed
SELECT * FROM subscription_events ORDER BY created_at DESC LIMIT 5;
```

---

## 📚 Full Documentation

- **Setup Guide:** `/docs/STRIPE_SETUP_GUIDE.md` (detailed instructions)
- **System Architecture:** `/docs/STRIPE_TWO_LANE_SYSTEM.md` (how it works)
- **Entitlements:** `/lib/store-entitlements.ts` (helper functions)

---

## 🆘 Quick Fixes

**Webhook not firing?**
- Check endpoint is publicly accessible
- Verify `STRIPE_WEBHOOK_SECRET` in environment
- Check Stripe Dashboard → Webhooks → Event logs

**Subscription not activating?**
```sql
-- Manually sync entitlements
SELECT sync_subscription_entitlements('SUBSCRIPTION_ID');
```

**Need to test locally?**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## ✅ You're Done!

**Lane A (Enrollments):** Ready for admin to enroll students
**Lane B (Subscriptions):** Ready for customers to subscribe

Both systems are completely separate and won't interfere with each other.

**Next:** Configure in production with live Stripe keys.
