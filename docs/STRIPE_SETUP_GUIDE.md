# Stripe Two-Lane System - Setup Guide

Complete step-by-step guide to configure Stripe and deploy the two-lane payment system.

---

## Phase 1: Apply Database Migrations

### Option A: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Run migrations in this order:

**Migration 1: Stripe Workflow (Enrollment Payments)**
```sql
-- Copy contents of: supabase/migrations/20241219_stripe_workflow_final.sql
-- Paste into SQL Editor and run
```

**Migration 2: Enrollment State Transitions**
```sql
-- Copy contents of: supabase/migrations/20241219_enrollment_state_transitions.sql
-- Paste into SQL Editor and run
```

**Migration 3: Store Subscriptions**
```sql
-- Copy contents of: supabase/migrations/20241219_store_subscriptions.sql
-- Paste into SQL Editor and run
```

**Migration 4: Store Subscription Products (WAIT - Update IDs first)**
```sql
-- DO NOT RUN YET - Update Stripe IDs first (see Phase 2)
-- File: supabase/migrations/20241219_store_subscription_products.sql
```

### Option B: Direct Database Connection

If you have `psql` installed:

```bash
# Set your database URL
export DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Run migrations
psql $DATABASE_URL < supabase/migrations/20241219_stripe_workflow_final.sql
psql $DATABASE_URL < supabase/migrations/20241219_enrollment_state_transitions.sql
psql $DATABASE_URL < supabase/migrations/20241219_store_subscriptions.sql

# Wait to run this one until Phase 2 is complete:
# psql $DATABASE_URL < supabase/migrations/20241219_store_subscription_products.sql
```

### Verify Migrations

Run this query in SQL Editor to verify tables were created:

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

Expected result: 9 tables

---

## Phase 2: Create Stripe Products

### Step 1: Log into Stripe Dashboard

Go to: [https://dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)

(Use test mode for initial setup)

### Step 2: Create Product 1 - Store Pro

1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `Store Pro`
   - **Description:** `Professional store access with premium benefits`
   - **Pricing model:** `Standard pricing`
   - **Price:** `$29.00`
   - **Billing period:** `Monthly`
   - **Free trial:** `7 days`
3. Click **"Save product"**
4. **Copy the Product ID** (starts with `prod_`)
5. **Copy the Price ID** (starts with `price_`)

6. Add yearly price:
   - Click **"Add another price"**
   - **Price:** `$290.00`
   - **Billing period:** `Yearly`
   - **Free trial:** `7 days`
7. Click **"Add price"**
8. **Copy the yearly Price ID**

### Step 3: Create Product 2 - VIP Access

1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `VIP Access`
   - **Description:** `Premium VIP membership with wholesale pricing and exclusive perks`
   - **Pricing model:** `Standard pricing`
   - **Price:** `$99.00`
   - **Billing period:** `Monthly`
   - **Free trial:** `14 days`
3. Click **"Save product"**
4. **Copy the Product ID** and **Price ID**

5. Add yearly price:
   - Click **"Add another price"**
   - **Price:** `$990.00`
   - **Billing period:** `Yearly`
   - **Free trial:** `14 days`
6. Click **"Add price"**
7. **Copy the yearly Price ID**

### Step 4: Create Product 3 - Wholesale Partner

1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `Wholesale Partner`
   - **Description:** `Business-level wholesale access for resellers and bulk buyers`
   - **Pricing model:** `Standard pricing`
   - **Price:** `$199.00`
   - **Billing period:** `Monthly`
   - **Free trial:** `None`
3. Click **"Save product"**
4. **Copy the Product ID** and **Price ID**

5. Add yearly price:
   - Click **"Add another price"**
   - **Price:** `$1,990.00`
   - **Billing period:** `Yearly`
   - **Free trial:** `None`
6. Click **"Add price"**
7. **Copy the yearly Price ID**

### Step 5: Record Your IDs

Create a file to track your IDs:

```
Store Pro:
  Product ID: prod_XXXXXXXXXXXXX
  Monthly Price ID: price_XXXXXXXXXXXXX
  Yearly Price ID: price_XXXXXXXXXXXXX

VIP Access:
  Product ID: prod_XXXXXXXXXXXXX
  Monthly Price ID: price_XXXXXXXXXXXXX
  Yearly Price ID: price_XXXXXXXXXXXXX

Wholesale Partner:
  Product ID: prod_XXXXXXXXXXXXX
  Monthly Price ID: price_XXXXXXXXXXXXX
  Yearly Price ID: price_XXXXXXXXXXXXX
```

---

## Phase 3: Update Migration with Real IDs

### Step 1: Open Migration File

Open: `supabase/migrations/20241219_store_subscription_products.sql`

### Step 2: Replace Placeholder IDs

Find and replace these lines:

**Store Pro Product:**
```sql
stripe_product_id,
'prod_store_pro', -- UPDATE THIS with real Stripe product ID
```
Replace `'prod_store_pro'` with your actual Product ID (keep the quotes)

**Store Pro Monthly Price:**
```sql
stripe_price_id,
'price_store_pro_monthly', -- UPDATE THIS with real Stripe price ID
```
Replace with your actual monthly Price ID

**Store Pro Yearly Price:**
```sql
stripe_price_id,
'price_store_pro_yearly', -- UPDATE THIS with real Stripe price ID
```
Replace with your actual yearly Price ID

**Repeat for VIP Access and Wholesale Partner**

### Step 3: Run Updated Migration

Now run the migration with real IDs:

**Supabase Dashboard:**
```sql
-- Copy entire updated file contents
-- Paste into SQL Editor and run
```

**Or via psql:**
```bash
psql $DATABASE_URL < supabase/migrations/20241219_store_subscription_products.sql
```

### Step 4: Verify Products Loaded

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

Expected: 6 rows (3 products × 2 prices each)

---

## Phase 4: Configure Stripe Webhooks

### Step 1: Get Your Webhook URL

Your webhook endpoint is:
```
https://yourdomain.com/api/webhooks/stripe
```

For local testing with Stripe CLI:
```
http://localhost:3000/api/webhooks/stripe
```

### Step 2: Add Webhook in Stripe Dashboard

1. Go to: [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL:** Enter your webhook URL
4. Click **"Select events"**
5. Select these events:

**Lane A (Enrollment Payments):**
- ✅ `checkout.session.completed`
- ✅ `payment_intent.payment_failed`

**Lane B (Store Subscriptions):**
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

6. Click **"Add events"**
7. Click **"Add endpoint"**

### Step 3: Get Webhook Signing Secret

1. Click on your newly created webhook
2. Click **"Reveal"** under **Signing secret**
3. Copy the secret (starts with `whsec_`)

### Step 4: Add to Environment Variables

Add to your `.env.local` or deployment environment:

```bash
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXX
```

### Step 5: Test Webhook (Optional)

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Other platforms: https://stripe.com/docs/stripe-cli
```

Forward webhooks to local:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Trigger test event:
```bash
stripe trigger checkout.session.completed
```

---

## Phase 5: Enable Stripe Customer Portal

### Step 1: Configure Portal

1. Go to: [https://dashboard.stripe.com/test/settings/billing/portal](https://dashboard.stripe.com/test/settings/billing/portal)
2. Click **"Activate test link"**

### Step 2: Configure Portal Settings

**Business information:**
- Add your business name
- Add support email
- Add terms of service URL (optional)
- Add privacy policy URL (optional)

**Functionality:**
- ✅ **Allow customers to update payment methods**
- ✅ **Allow customers to update billing information**
- ✅ **Allow customers to cancel subscriptions**
  - Cancellation behavior: **Cancel at end of billing period**
- ✅ **Allow customers to switch plans**
  - Proration behavior: **Always invoice immediately**

**Appearance:**
- Choose colors to match your brand
- Upload logo (optional)

### Step 3: Save Configuration

Click **"Save changes"**

---

## Phase 6: Test Complete System

### Test 1: Store Subscription Flow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to subscriptions page:**
   ```
   http://localhost:3000/store/subscriptions
   ```

3. **Log in as test user**

4. **Click "Subscribe Now" on Store Pro**

5. **Use Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

6. **Complete checkout**

7. **Verify redirect to success page**

8. **Check database:**
   ```sql
   -- Check subscription created
   SELECT * FROM store_subscriptions 
   WHERE user_id = 'YOUR_USER_ID' 
   ORDER BY created_at DESC LIMIT 1;

   -- Check entitlements activated
   SELECT * FROM store_entitlements 
   WHERE user_id = 'YOUR_USER_ID' 
   AND is_active = true;
   ```

9. **Test Customer Portal:**
   - Click "Manage Subscription"
   - Verify portal opens
   - Try updating payment method
   - Try canceling subscription

### Test 2: Webhook Idempotency

1. **Trigger same webhook twice:**
   ```bash
   stripe trigger checkout.session.completed
   stripe trigger checkout.session.completed
   ```

2. **Check webhook events:**
   ```sql
   SELECT 
     stripe_event_id,
     status,
     COUNT(*) as count
   FROM stripe_webhook_events
   GROUP BY stripe_event_id, status
   HAVING COUNT(*) > 1;
   ```

   Expected: Second event marked as "duplicate"

### Test 3: Enrollment Payment Flow

1. **Create test enrollment in database:**
   ```sql
   INSERT INTO enrollments (
     user_id,
     program_id,
     status,
     payment_mode,
     amount_cents
   ) VALUES (
     'YOUR_USER_ID',
     'YOUR_PROGRAM_ID',
     'enrolled',
     'self_pay',
     10000
   ) RETURNING id;
   ```

2. **Initiate payment:**
   ```sql
   SELECT initiate_stripe_payment(
     'ENROLLMENT_ID_FROM_ABOVE',
     10000
   );
   ```

3. **Check billing lock:**
   ```sql
   SELECT billing_lock, payment_status 
   FROM enrollments 
   WHERE id = 'ENROLLMENT_ID';
   ```

   Expected: `billing_lock = true`, `payment_status = 'processing'`

4. **Complete payment in Stripe Dashboard**

5. **Verify webhook processed:**
   ```sql
   SELECT * FROM enrollment_events 
   WHERE enrollment_id = 'ENROLLMENT_ID' 
   ORDER BY created_at DESC;
   ```

   Expected: Events for `payment_initiated` and `payment_completed`

---

## Phase 7: Production Deployment

### Step 1: Switch to Live Mode

1. Toggle Stripe Dashboard to **Live mode**
2. Repeat Phase 2-5 in live mode
3. Update environment variables with live keys:
   ```bash
   STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXX
   STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXX
   ```

### Step 2: Update Product IDs

1. Copy live product/price IDs
2. Update migration or directly in database:
   ```sql
   UPDATE store_products 
   SET stripe_product_id = 'prod_live_XXXXX' 
   WHERE name = 'Store Pro';

   UPDATE store_prices 
   SET stripe_price_id = 'price_live_XXXXX' 
   WHERE store_product_id = (
     SELECT id FROM store_products WHERE name = 'Store Pro'
   ) AND interval = 'month';
   ```

### Step 3: Deploy Application

```bash
# Build for production
npm run build

# Deploy to your hosting platform
# (Vercel, Railway, etc.)
```

### Step 4: Verify Production Webhooks

1. Make a real subscription purchase
2. Check webhook delivery in Stripe Dashboard
3. Verify subscription activated in database
4. Verify entitlements granted

---

## Monitoring & Maintenance

### Key Queries

**Active subscriptions:**
```sql
SELECT * FROM active_store_subscriptions;
```

**Failed webhooks:**
```sql
SELECT * FROM stripe_webhook_events 
WHERE status = 'failed' 
ORDER BY created_at DESC;
```

**Enrollment payment status:**
```sql
SELECT 
  status,
  payment_status,
  COUNT(*) 
FROM enrollments 
GROUP BY status, payment_status;
```

**User entitlements:**
```sql
SELECT * FROM user_entitlements_summary 
WHERE user_id = 'USER_ID';
```

### Stripe Dashboard Monitoring

Check daily:
- Failed payments
- Subscription churn
- Webhook delivery status
- Customer disputes

---

## Troubleshooting

### Webhook not firing

1. Check webhook endpoint is publicly accessible
2. Verify webhook secret in environment variables
3. Check Stripe Dashboard → Webhooks → Event logs
4. Verify events are selected in webhook configuration

### Subscription not activating

1. Check `store_subscriptions` table for record
2. Check `subscription_events` for webhook processing
3. Verify product metadata has entitlement keys
4. Manually sync: `SELECT sync_subscription_entitlements('SUBSCRIPTION_ID');`

### Entitlements not working

1. Verify subscription status is `active` or `trialing`
2. Check `store_entitlements.is_active = true`
3. Check `expires_at` is NULL or future date
4. Verify product metadata format:
   ```json
   {
     "entitlements": ["store_pro", "free_shipping"],
     "discount_percentage": 10,
     "tier": "pro"
   }
   ```

### Double-charge on enrollment

1. Check `billing_lock` is TRUE
2. Check `stripe_webhook_events` for duplicate processing
3. Verify `stripe_event_id` is unique
4. Check `enrollment_events` for audit trail

---

## Support

**Documentation:**
- [Stripe API Docs](https://stripe.com/docs/api)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal)

**Internal Docs:**
- `/docs/STRIPE_TWO_LANE_SYSTEM.md` - System architecture
- `/lib/store-entitlements.ts` - Entitlement helpers

---

## Checklist

- [ ] Phase 1: Apply database migrations
- [ ] Phase 2: Create Stripe products (3 products, 6 prices)
- [ ] Phase 3: Update migration with real IDs
- [ ] Phase 4: Configure webhooks (7 events)
- [ ] Phase 5: Enable Customer Portal
- [ ] Phase 6: Test subscription flow
- [ ] Phase 6: Test webhook idempotency
- [ ] Phase 6: Test enrollment payment
- [ ] Phase 7: Deploy to production
- [ ] Phase 7: Switch to live mode
- [ ] Phase 7: Update live product IDs
- [ ] Phase 7: Verify production webhooks

---

**System Status:** Ready for configuration ✅
