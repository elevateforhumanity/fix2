# Creator Marketplace Testing Guide

## Overview

This guide covers testing the complete creator marketplace flow from creator application to product purchase and payout tracking.

## Prerequisites

- Supabase database running
- Stripe account configured
- Environment variables set:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_SITE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup

### 1. Run Migrations

```bash
# Apply marketplace migrations
supabase db push

# Or manually run:
# - 20231214000001_create_marketplace_tables.sql
```

### 2. Verify Tables Created

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'marketplace_%';
```

Expected tables:

- `marketplace_creators`
- `marketplace_products`
- `marketplace_sales`

## Testing Flow

### Phase 1: Creator Application

1. **Navigate to Application Page**
   - URL: `/marketplace/apply`
   - Must be logged in

2. **Fill Application Form**
   - Display Name: "Test Creator"
   - Bio: "I create digital products"
   - Product Description: "Templates and guides"
   - Payout Email: test@example.com
   - Payout Method: PayPal
   - Check content ownership box

3. **Submit Application**
   - Should redirect to `/marketplace/apply/success`
   - Check database: `SELECT * FROM marketplace_creators WHERE status = 'pending'`

### Phase 2: Admin Approval

1. **Access Admin Panel**
   - URL: `/admin/marketplace/creators`
   - Requires admin email (contains "admin" or "elevate")

2. **Approve Creator**
   - Click "Approve" button
   - Verify status changes to "approved"
   - Check database: `SELECT * FROM marketplace_creators WHERE status = 'approved'`

3. **Verify Creator Dashboard Access**
   - URL: `/creator/dashboard`
   - Should show empty products and sales

### Phase 3: Product Upload (Manual for MVP)

Since product upload UI isn't built yet, manually insert a test product:

```sql
INSERT INTO marketplace_products (
  creator_id,
  title,
  description,
  price_cents,
  file_url,
  status
) VALUES (
  (SELECT id FROM marketplace_creators WHERE status = 'approved' LIMIT 1),
  'Test Digital Product',
  'A sample digital product for testing',
  2999, -- $29.99
  'https://example.com/test-file.pdf',
  'approved'
);
```

### Phase 4: Marketplace Display

1. **Visit Marketplace**
   - URL: `/marketplace`
   - Should display approved products
   - Should show featured creators

2. **View Product Page**
   - URL: `/marketplace/product/[product-id]`
   - Should show product details
   - Should show "Buy Now" button

### Phase 5: Purchase Flow

1. **Click "Buy Now"**
   - Should redirect to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

2. **Complete Purchase**
   - Should redirect to `/marketplace/thank-you?session_id=...`
   - Should show purchase confirmation

3. **Verify Webhook Processing**
   - Check Stripe webhook logs
   - Verify sale recorded: `SELECT * FROM marketplace_sales`
   - Verify revenue split calculated correctly

### Phase 6: Creator Dashboard

1. **Check Creator Dashboard**
   - URL: `/creator/dashboard`
   - Should show:
     - Total earnings
     - Pending payout
     - Recent sales
     - Product list

2. **Verify Earnings Calculation**
   ```sql
   SELECT
     amount_cents,
     creator_earnings_cents,
     platform_earnings_cents,
     (creator_earnings_cents::float / amount_cents::float) as split_ratio
   FROM marketplace_sales;
   ```

   - Split ratio should be ~0.70 (70%)

### Phase 7: Download Delivery

1. **Check Email (if configured)**
   - Buyer should receive download link
   - Creator should receive sale notification

2. **Test Download Link**
   - URL: `/marketplace/download/[token]`
   - Should allow file download
   - Should expire after 30 days

## Stripe Webhook Setup

### Local Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/marketplace

# Copy webhook signing secret to .env.local
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Production Webhook

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/marketplace`
3. Select events:
   - `checkout.session.completed`
4. Copy signing secret to production environment

## Test Scenarios

### Scenario 1: Successful Purchase

- ✅ Creator approved
- ✅ Product approved
- ✅ Payment succeeds
- ✅ Sale recorded
- ✅ Revenue split correct
- ✅ Download link generated

### Scenario 2: Pending Creator

- ✅ Application submitted
- ✅ Status = pending
- ✅ Dashboard shows "pending" message
- ✅ Cannot upload products

### Scenario 3: Rejected Creator

- ✅ Admin rejects application
- ✅ Creator record deleted
- ✅ (Optional) Rejection email sent

### Scenario 4: Multiple Sales

- ✅ Multiple purchases recorded
- ✅ Earnings accumulate correctly
- ✅ Dashboard shows all sales
- ✅ Payout tracking works

## Common Issues

### Issue: Webhook not receiving events

**Solution:**

- Verify webhook URL is correct
- Check Stripe webhook logs
- Ensure signing secret matches
- Test with Stripe CLI locally

### Issue: Revenue split incorrect

**Solution:**

- Check `revenue_split` column in `marketplace_creators`
- Default should be 0.7 (70%)
- Verify calculation in webhook handler

### Issue: Download link not working

**Solution:**

- Verify `download_token` generated
- Check `download_expires_at` not passed
- Ensure file_url is accessible

### Issue: Creator dashboard empty

**Solution:**

- Verify creator status = 'approved'
- Check RLS policies allow creator to see own data
- Verify user_id matches auth.uid()

## Manual Database Checks

```sql
-- Check creator status
SELECT id, display_name, status, revenue_split
FROM marketplace_creators;

-- Check products
SELECT p.title, p.status, c.display_name as creator
FROM marketplace_products p
JOIN marketplace_creators c ON p.creator_id = c.id;

-- Check sales and earnings
SELECT
  s.created_at,
  p.title,
  s.amount_cents / 100.0 as amount,
  s.creator_earnings_cents / 100.0 as creator_earnings,
  s.platform_earnings_cents / 100.0 as platform_earnings,
  s.paid_out
FROM marketplace_sales s
JOIN marketplace_products p ON s.product_id = p.id
ORDER BY s.created_at DESC;

-- Check total earnings by creator
SELECT
  c.display_name,
  COUNT(s.id) as total_sales,
  SUM(s.creator_earnings_cents) / 100.0 as total_earnings,
  SUM(CASE WHEN s.paid_out THEN s.creator_earnings_cents ELSE 0 END) / 100.0 as paid_out,
  SUM(CASE WHEN NOT s.paid_out THEN s.creator_earnings_cents ELSE 0 END) / 100.0 as pending
FROM marketplace_creators c
LEFT JOIN marketplace_sales s ON c.id = s.creator_id
GROUP BY c.id, c.display_name;
```

## Next Steps After Testing

1. **Email Integration**
   - Implement email sending in webhook handler
   - Use templates from `/lib/emails/marketplace-templates.ts`
   - Configure email service (SendGrid, Resend, etc.)

2. **Product Upload UI**
   - Create `/creator/products/new` page
   - Add file upload to Supabase Storage
   - Implement product approval workflow

3. **Payout Management**
   - Create admin payout dashboard
   - Implement payout processing
   - Track payout history

4. **Stripe Connect Migration**
   - Upgrade to Stripe Connect for automatic splits
   - Migrate existing creators to connected accounts
   - Update webhook handler for Connect events

## Success Criteria

- ✅ Creator can apply and get approved
- ✅ Products display on marketplace
- ✅ Purchases complete successfully
- ✅ Revenue splits calculate correctly (70/30)
- ✅ Creator dashboard shows accurate data
- ✅ Download links work
- ✅ Admin can approve/reject creators
- ✅ Webhook processes sales correctly
