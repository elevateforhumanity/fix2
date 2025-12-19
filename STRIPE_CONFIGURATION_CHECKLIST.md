# Stripe Configuration Checklist

Use this as you configure Stripe. Check off each item as you complete it.

---

## Phase 1: Database Setup

### Apply Migrations in Supabase

Go to: https://supabase.com/dashboard → Your Project → SQL Editor

- [ ] **Migration 1:** Run `20241219_stripe_workflow_final.sql`
  - Creates: enrollment_documents, enrollment_events, stripe_webhook_events
  - Adds: payment fields to enrollments table
  - Creates: payment functions (initiate, complete, fail)

- [ ] **Migration 2:** Run `20241219_enrollment_state_transitions.sql`
  - Creates: state validation triggers
  - Creates: audit logging triggers
  - Creates: helper views

- [ ] **Migration 3:** Run `20241219_store_subscriptions.sql`
  - Creates: store_products, store_prices, customer_billing
  - Creates: store_subscriptions, store_entitlements, subscription_events
  - Creates: subscription functions (upsert, sync)

- [ ] **Verify tables created:**
  ```sql
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN (
    'enrollment_documents',
    'enrollment_events',
    'stripe_webhook_events',
    'store_products',
    'store_prices',
    'customer_billing',
    'store_subscriptions',
    'store_entitlements',
    'subscription_events'
  )
  ORDER BY table_name;
  ```
  Expected: 9 tables

---

## Phase 2: Create Stripe Products

Go to: https://dashboard.stripe.com/test/products

### Product 1: Store Pro

- [ ] Click "+ Add product"
- [ ] Name: `Store Pro`
- [ ] Description: `Professional store access with premium benefits`
- [ ] Price: `$29.00` / Monthly
- [ ] Free trial: `7 days`
- [ ] Click "Save product"
- [ ] **Record Product ID:** `prod_________________`
- [ ] **Record Monthly Price ID:** `price_________________`

- [ ] Click "Add another price"
- [ ] Price: `$290.00` / Yearly
- [ ] Free trial: `7 days`
- [ ] Click "Add price"
- [ ] **Record Yearly Price ID:** `price_________________`

### Product 2: VIP Access

- [ ] Click "+ Add product"
- [ ] Name: `VIP Access`
- [ ] Description: `Premium VIP membership with wholesale pricing and exclusive perks`
- [ ] Price: `$99.00` / Monthly
- [ ] Free trial: `14 days`
- [ ] Click "Save product"
- [ ] **Record Product ID:** `prod_________________`
- [ ] **Record Monthly Price ID:** `price_________________`

- [ ] Click "Add another price"
- [ ] Price: `$990.00` / Yearly
- [ ] Free trial: `14 days`
- [ ] Click "Add price"
- [ ] **Record Yearly Price ID:** `price_________________`

### Product 3: Wholesale Partner

- [ ] Click "+ Add product"
- [ ] Name: `Wholesale Partner`
- [ ] Description: `Business-level wholesale access for resellers and bulk buyers`
- [ ] Price: `$199.00` / Monthly
- [ ] Free trial: None
- [ ] Click "Save product"
- [ ] **Record Product ID:** `prod_________________`
- [ ] **Record Monthly Price ID:** `price_________________`

- [ ] Click "Add another price"
- [ ] Price: `$1,990.00` / Yearly
- [ ] Free trial: None
- [ ] Click "Add price"
- [ ] **Record Yearly Price ID:** `price_________________`

---

## Phase 3: Update Migration with IDs

- [ ] Open: `supabase/migrations/20241219_store_subscription_products.sql`

- [ ] Replace Store Pro IDs:
  - Line ~20: `'prod_store_pro'` → Your Store Pro product ID
  - Line ~45: `'price_store_pro_monthly'` → Your monthly price ID
  - Line ~70: `'price_store_pro_yearly'` → Your yearly price ID

- [ ] Replace VIP Access IDs:
  - Line ~95: `'prod_vip_access'` → Your VIP product ID
  - Line ~120: `'price_vip_monthly'` → Your monthly price ID
  - Line ~145: `'price_vip_yearly'` → Your yearly price ID

- [ ] Replace Wholesale Partner IDs:
  - Line ~170: `'prod_wholesale_partner'` → Your Wholesale product ID
  - Line ~195: `'price_wholesale_monthly'` → Your monthly price ID
  - Line ~220: `'price_wholesale_yearly'` → Your yearly price ID

- [ ] Run updated migration in Supabase SQL Editor

- [ ] **Verify products loaded:**
  ```sql
  SELECT 
    p.name,
    p.stripe_product_id,
    pr.interval,
    pr.amount_cents / 100.0 as price,
    pr.stripe_price_id
  FROM store_products p
  JOIN store_prices pr ON pr.store_product_id = p.id
  ORDER BY pr.amount_cents;
  ```
  Expected: 6 rows

---

## Phase 4: Configure Webhooks

Go to: https://dashboard.stripe.com/test/webhooks

- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
  - For local testing: `http://localhost:3000/api/webhooks/stripe`
- [ ] Click "Select events"

### Select These Events:

**Lane A (Enrollment Payments):**
- [ ] `checkout.session.completed`
- [ ] `payment_intent.payment_failed`

**Lane B (Store Subscriptions):**
- [ ] `customer.subscription.created`
- [ ] `customer.subscription.updated`
- [ ] `customer.subscription.deleted`
- [ ] `invoice.payment_succeeded`
- [ ] `invoice.payment_failed`

- [ ] Click "Add events"
- [ ] Click "Add endpoint"
- [ ] Click "Reveal" under Signing secret
- [ ] **Record Webhook Secret:** `whsec_________________`

### Add to Environment:

- [ ] Add to `.env.local`:
  ```bash
  STRIPE_WEBHOOK_SECRET=whsec_________________
  ```

- [ ] Restart dev server:
  ```bash
  npm run dev
  ```

---

## Phase 5: Enable Customer Portal

Go to: https://dashboard.stripe.com/test/settings/billing/portal

- [ ] Click "Activate test link"

### Configure Settings:

**Business information:**
- [ ] Business name: `Elevate for Humanity`
- [ ] Support email: Your support email
- [ ] Terms of service URL (optional)
- [ ] Privacy policy URL (optional)

**Functionality:**
- [ ] ✅ Allow customers to update payment methods
- [ ] ✅ Allow customers to update billing information
- [ ] ✅ Allow customers to cancel subscriptions
  - Cancellation: "Cancel at end of billing period"
- [ ] ✅ Allow customers to switch plans
  - Proration: "Always invoice immediately"

**Appearance:**
- [ ] Choose brand colors
- [ ] Upload logo (optional)

- [ ] Click "Save changes"

---

## Phase 6: Test Subscription Flow

### Start Dev Server:

- [ ] Run: `npm run dev`
- [ ] Navigate to: `http://localhost:3000/store/subscriptions`

### Test Subscription:

- [ ] Log in as test user
- [ ] Click "Subscribe Now" on Store Pro
- [ ] Use test card:
  - Card: `4242 4242 4242 4242`
  - Expiry: `12/34`
  - CVC: `123`
  - ZIP: `12345`
- [ ] Complete checkout
- [ ] Verify redirect to success page
- [ ] See "Active Subscription" banner

### Verify in Database:

- [ ] Check subscription created:
  ```sql
  SELECT * FROM store_subscriptions 
  ORDER BY created_at DESC LIMIT 1;
  ```

- [ ] Check entitlements activated:
  ```sql
  SELECT * FROM store_entitlements 
  WHERE is_active = true;
  ```

- [ ] Check webhook processed:
  ```sql
  SELECT * FROM subscription_events 
  ORDER BY created_at DESC LIMIT 5;
  ```

### Test Customer Portal:

- [ ] Click "Manage Subscription" button
- [ ] Verify portal opens
- [ ] Try viewing invoice history
- [ ] Try updating payment method
- [ ] Try canceling subscription (don't actually cancel)

---

## Phase 7: Test Webhook Idempotency

### Install Stripe CLI (if not installed):

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login
stripe login
```

### Test Duplicate Webhooks:

- [ ] Forward webhooks to local:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

- [ ] Trigger test event twice:
  ```bash
  stripe trigger checkout.session.completed
  stripe trigger checkout.session.completed
  ```

- [ ] Check webhook events:
  ```sql
  SELECT 
    stripe_event_id,
    status,
    COUNT(*) as count
  FROM stripe_webhook_events
  GROUP BY stripe_event_id, status
  HAVING COUNT(*) > 1;
  ```

- [ ] Verify second event marked as "duplicate"

---

## Phase 8: Production Deployment

### Switch to Live Mode:

- [ ] Toggle Stripe Dashboard to "Live mode"
- [ ] Repeat Phase 2 (create products in live mode)
- [ ] Repeat Phase 3 (update IDs for live)
- [ ] Repeat Phase 4 (configure live webhooks)
- [ ] Repeat Phase 5 (configure live portal)

### Update Environment Variables:

- [ ] Add live keys to production environment:
  ```bash
  STRIPE_SECRET_KEY=sk_live_________________
  STRIPE_WEBHOOK_SECRET=whsec_________________
  ```

### Deploy:

- [ ] Build: `npm run build`
- [ ] Deploy to hosting platform
- [ ] Verify webhook endpoint is publicly accessible
- [ ] Test live subscription purchase

---

## Verification Checklist

- [ ] ✅ All 9 database tables created
- [ ] ✅ 3 Stripe products created (6 prices total)
- [ ] ✅ Product IDs updated in database
- [ ] ✅ Webhook endpoint configured (7 events)
- [ ] ✅ Webhook secret in environment
- [ ] ✅ Customer Portal enabled
- [ ] ✅ Subscription checkout works
- [ ] ✅ Entitlements activate automatically
- [ ] ✅ Customer Portal accessible
- [ ] ✅ Webhook idempotency verified
- [ ] ✅ Production deployment complete

---

## 🎉 You're Done!

**Lane A (Enrollments):** Ready for admin to enroll students
**Lane B (Subscriptions):** Ready for customers to subscribe

Both systems are live and completely separated.

---

## Support

**Issues?** Check:
- `/docs/STRIPE_SETUP_GUIDE.md` - Detailed troubleshooting
- `/docs/STRIPE_TWO_LANE_SYSTEM.md` - System architecture
- Stripe Dashboard → Webhooks → Event logs

**Questions?** Review:
- `/lib/store-entitlements.ts` - Entitlement helpers
- `/app/api/webhooks/stripe/route.ts` - Webhook handler
