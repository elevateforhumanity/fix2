# Stripe Two-Lane System

Complete separation of enrollment payments and store subscriptions to prevent double-charges, wrong access, and messy reporting.

---

## Architecture Overview

### Lane A: Tuition / Enrollment Payments (Non-Subscription)
- **Trigger**: `enrollments.status = 'enrolled'`
- **Stripe Objects**: Checkout Session (mode=payment) or PaymentIntent
- **Result**: Enrollment becomes `active` after webhook success
- **Payment Modes**: 
  - `sponsored` (default) - Elevate pays partner
  - `self_pay` - Student pays directly

### Lane B: Store Subscriptions (Recurring Billing)
- **Trigger**: Customer clicks "Subscribe" in store
- **Stripe Objects**: Checkout Session (mode=subscription) + Prices (recurring)
- **Result**: Store entitlement turns on/off based on subscription status
- **Tiers**: Store Pro, VIP Access, Wholesale Partner

---

## Database Schema

### Lane A Tables (Enrollment Payments)
```sql
enrollments
├── payment_mode (sponsored | self_pay)
├── payment_status (pending | processing | paid | failed)
├── billing_lock (prevents double-charging)
├── stripe_checkout_session_id
├── stripe_payment_intent_id
└── paid_at

enrollment_documents
├── document_type (handbook_signature, background_check, etc.)
├── status (required → pending → submitted → approved)
└── digital_signature

enrollment_events
├── event_type (state_change, payment_initiated, payment_completed)
├── stripe_event_id (for idempotency)
└── audit trail

stripe_webhook_events
├── stripe_event_id (UNIQUE - prevents duplicate processing)
└── enrollment_id
```

### Lane B Tables (Store Subscriptions)
```sql
store_products
├── name (Store Pro, VIP Access, Wholesale Partner)
├── stripe_product_id
├── features (JSONB array)
└── metadata (entitlements, discount_percentage, tier)

store_prices
├── store_product_id
├── stripe_price_id
├── interval (month | year)
├── amount_cents
└── trial_period_days

customer_billing
├── user_id
└── stripe_customer_id (maps users to Stripe customers)

store_subscriptions
├── user_id
├── stripe_subscription_id
├── stripe_price_id
├── status (trialing | active | past_due | canceled | unpaid)
├── cancel_at_period_end
├── current_period_end
└── trial_end

store_entitlements
├── user_id
├── entitlement_key (store_pro, free_shipping, wholesale_pricing, etc.)
├── is_active
├── source (stripe_subscription | manual_grant | promotion)
└── expires_at

subscription_events
├── subscription_id
├── event_type (created, updated, canceled, payment_succeeded, payment_failed)
└── stripe_event_id
```

---

## Payment Flows

### Lane A: Enrollment Payment Flow

1. **Admin enrolls student** → `enrollments.status = 'enrolled'`
2. **Backend calls** `initiate_stripe_payment(enrollment_id, amount_cents)`
   - Sets `billing_lock = TRUE`
   - Sets `payment_status = 'processing'`
   - Locks `payment_mode` (cannot change after this)
3. **Create Stripe Checkout Session** (mode=payment)
   - Metadata: `enrollment_id`, `user_id`
4. **Webhook: `checkout.session.completed`**
   - Calls `complete_stripe_payment()`
   - Checks idempotency via `stripe_event_id`
   - Updates `payment_status = 'paid'`, `status = 'active'`
   - Logs to `enrollment_events`
5. **Student gets access** to enrolled program

**Anti-Double-Charge Protection:**
- `billing_lock` prevents re-initiating payment
- `stripe_event_id` prevents duplicate webhook processing
- State machine validates transitions

### Lane B: Store Subscription Flow

1. **User clicks "Subscribe"** on `/store/subscriptions`
2. **Frontend calls** `/api/store/subscribe`
   - Gets or creates Stripe customer
   - Creates Checkout Session (mode=subscription)
3. **User completes payment** in Stripe Checkout
4. **Webhook: `checkout.session.completed`** (mode=subscription)
   - Logs checkout completion
5. **Webhook: `customer.subscription.created`**
   - Calls `upsert_store_subscription()`
   - Creates/updates subscription record
   - Calls `sync_subscription_entitlements()`
   - Activates entitlements based on product metadata
6. **User gets instant access** to store features

**Ongoing Subscription Management:**
- **`customer.subscription.updated`** - Status changes (active → past_due)
- **`customer.subscription.deleted`** - Cancellation
- **`invoice.payment_succeeded`** - Renewal success
- **`invoice.payment_failed`** - Payment failure

**Entitlement Sync:**
- Subscription status `trialing` or `active` → entitlements ON
- Subscription status `past_due`, `canceled`, `unpaid` → entitlements OFF
- Entitlements expire at `current_period_end` if canceled

---

## API Endpoints

### Lane A: Enrollment Payments
- **Server-side only** - No public endpoints
- Called from admin dashboard when enrolling students
- Uses database functions: `initiate_stripe_payment()`, `complete_stripe_payment()`

### Lane B: Store Subscriptions
```typescript
POST /api/store/subscribe
Body: { priceId, userId, userEmail, userName }
Returns: { sessionId, url }

POST /api/store/customer-portal
Body: { userId }
Returns: { url }
```

### Webhooks (Both Lanes)
```typescript
POST /api/webhooks/stripe
Headers: stripe-signature
Handles:
  - checkout.session.completed (both lanes)
  - payment_intent.payment_failed (Lane A)
  - customer.subscription.created (Lane B)
  - customer.subscription.updated (Lane B)
  - customer.subscription.deleted (Lane B)
  - invoice.payment_succeeded (Lane B)
  - invoice.payment_failed (Lane B)
```

---

## Entitlements System

### Entitlement Keys
```typescript
// Store Pro
'store_pro', 'free_shipping', 'priority_support'

// VIP Access
'vip_access', 'wholesale_pricing', 'exclusive_products', 'expedited_shipping'

// Wholesale Partner
'wholesale_partner', 'bulk_ordering', 'net30_terms', 'account_manager', 
'custom_products', 'white_label'
```

### Checking Entitlements
```typescript
import { hasEntitlement, getSubscriptionStatus } from '@/lib/store-entitlements';

// Check single entitlement
const hasFreeShipping = await hasEntitlement(userId, 'free_shipping');

// Get full status
const status = await getSubscriptionStatus(userId);
// Returns: { hasSubscription, tier, status, entitlements, discount, features }
```

### Using in Components
```typescript
'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function StoreFeature() {
  const [hasAccess, setHasAccess] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.rpc('has_entitlement', {
        p_user_id: user.id,
        p_entitlement_key: 'wholesale_pricing'
      });

      setHasAccess(data === true);
    }
    checkAccess();
  }, []);

  if (!hasAccess) {
    return <div>Upgrade to VIP for wholesale pricing</div>;
  }

  return <div>Wholesale prices shown</div>;
}
```

---

## Subscription Tiers

### Store Pro - $29/month or $290/year
**Entitlements:** `store_pro`, `free_shipping`, `priority_support`
**Features:**
- Free shipping on all orders
- 10% discount on all products
- Priority customer support
- Early access to new products
- Exclusive member-only deals

### VIP Access - $99/month or $990/year
**Entitlements:** `vip_access`, `wholesale_pricing`, `exclusive_products`, `free_shipping`, `priority_support`, `expedited_shipping`
**Features:**
- Everything in Store Pro
- Wholesale pricing (20-40% off)
- Exclusive VIP-only products
- Early access to sales and launches
- Dedicated VIP support line
- Free expedited shipping
- Monthly VIP member gifts

### Wholesale Partner - $199/month or $1,990/year
**Entitlements:** `wholesale_partner`, `bulk_ordering`, `net30_terms`, `account_manager`, `custom_products`, `white_label`
**Features:**
- Everything in VIP Access
- True wholesale pricing (40-60% off)
- Bulk ordering capabilities
- Net-30 payment terms available
- Dedicated account manager
- Custom product requests
- White-label options
- Quarterly business reviews

---

## Testing

### Test Enrollment Payment (Lane A)
1. Create enrollment in database
2. Set `status = 'enrolled'`
3. Call `initiate_stripe_payment(enrollment_id, 10000)` (=$100)
4. Use Stripe test card: `4242 4242 4242 4242`
5. Verify webhook processes correctly
6. Check `enrollment_events` for audit trail
7. Verify `billing_lock` prevents double-charge

### Test Store Subscription (Lane B)
1. Go to `/store/subscriptions`
2. Click "Subscribe Now" on any plan
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify redirect to success page
6. Check `store_subscriptions` table
7. Check `store_entitlements` table
8. Verify features unlock immediately

### Test Webhook Idempotency
1. Use Stripe CLI: `stripe trigger checkout.session.completed`
2. Send same event twice
3. Verify second event logged as "duplicate"
4. Verify no double-processing

---

## Stripe Dashboard Setup

### 1. Create Products
```
Product 1: Store Pro
  - Price 1: $29/month (recurring) - 7 day trial
  - Price 2: $290/year (recurring) - 7 day trial

Product 2: VIP Access
  - Price 1: $99/month (recurring) - 14 day trial
  - Price 2: $990/year (recurring) - 14 day trial

Product 3: Wholesale Partner
  - Price 1: $199/month (recurring) - no trial
  - Price 2: $1,990/year (recurring) - no trial
```

### 2. Update Migration
Copy product IDs (`prod_*`) and price IDs (`price_*`) into:
`supabase/migrations/20241219_store_subscription_products.sql`

### 3. Configure Webhooks
Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

Select events:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `payment_intent.payment_failed`

### 4. Enable Customer Portal
Stripe Dashboard → Settings → Billing → Customer Portal
- Enable portal
- Allow customers to cancel subscriptions
- Allow customers to update payment methods
- Allow customers to switch plans

---

## Security

### Enrollment Payments (Lane A)
- ✅ `billing_lock` prevents double-charging
- ✅ `payment_mode_locked_at` prevents mode switching mid-payment
- ✅ State machine validates transitions
- ✅ Webhook idempotency via `stripe_event_id`
- ✅ Complete audit trail in `enrollment_events`

### Store Subscriptions (Lane B)
- ✅ Webhook idempotency via `stripe_event_id` in `upsert_store_subscription()`
- ✅ Entitlements sync automatically on status change
- ✅ RLS policies protect user data
- ✅ Customer Portal for self-service management
- ✅ Complete audit trail in `subscription_events`

---

## Monitoring

### Key Metrics to Track
```sql
-- Active subscriptions by tier
SELECT 
  sp.name,
  COUNT(*) as active_count,
  SUM(spr.amount_cents) / 100.0 as monthly_revenue
FROM store_subscriptions ss
JOIN store_products sp ON sp.id = ss.store_product_id
JOIN store_prices spr ON spr.stripe_price_id = ss.stripe_price_id
WHERE ss.status IN ('trialing', 'active')
GROUP BY sp.name;

-- Enrollment payment success rate
SELECT 
  payment_status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM enrollments
WHERE status IN ('enrolled', 'active')
GROUP BY payment_status;

-- Failed webhooks
SELECT *
FROM stripe_webhook_events
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Troubleshooting

### Enrollment payment not completing
1. Check `billing_lock` - if TRUE, payment already initiated
2. Check `stripe_webhook_events` for webhook processing
3. Check `enrollment_events` for state transitions
4. Verify Stripe webhook endpoint is reachable
5. Check Stripe Dashboard for payment status

### Subscription not activating
1. Check `store_subscriptions` table for subscription record
2. Check `subscription_events` for webhook processing
3. Check `store_entitlements` for entitlement activation
4. Verify product metadata has correct entitlement keys
5. Check Stripe Dashboard for subscription status

### Entitlements not working
1. Verify subscription status is `trialing` or `active`
2. Check `store_entitlements.is_active = TRUE`
3. Check `expires_at` is NULL or in future
4. Verify product metadata has correct entitlement keys
5. Call `sync_subscription_entitlements(subscription_id)` manually

---

## Migration Checklist

- [x] Create enrollment payment tables
- [x] Create store subscription tables
- [x] Create webhook idempotency tables
- [x] Create state transition triggers
- [x] Create payment functions
- [x] Create subscription functions
- [x] Create entitlement functions
- [x] Update Stripe webhook handler
- [x] Create subscription API endpoints
- [x] Create subscriptions UI page
- [x] Create entitlements helper library
- [ ] Create products in Stripe Dashboard
- [ ] Update product/price IDs in migration
- [ ] Configure Stripe webhooks
- [ ] Enable Stripe Customer Portal
- [ ] Test enrollment payment flow
- [ ] Test subscription flow
- [ ] Test webhook idempotency
- [ ] Deploy to production

---

**System Status:** ✅ Complete and ready for Stripe configuration
