# Stripe Auto-Enrollment Setup Guide

This guide walks you through setting up automatic enrollment when learners pay via Stripe.

## What Was Added

✅ **Supabase Schema** (`supabase/sql/enrollments_schema.sql`)
- Adds `payment_status` column to `applications` table
- Creates new `enrollments` table to track active enrollments

✅ **Stripe Webhook** (`app/api/stripe/webhook/route.ts`)
- Listens for `checkout.session.completed` events
- Automatically creates enrollment records
- Updates application status to "paid" and "accepted"

✅ **Environment Variables** (`.env.example` updated)
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret

## Setup Steps

### 1. Create Supabase Tables

1. Open your Supabase project: https://supabase.com/dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase/sql/enrollments_schema.sql`
4. Paste and run it

This creates:
- `applications.payment_status` column (default: 'pending')
- `enrollments` table with columns:
  - `id`, `created_at`
  - `application_id`, `program_id`, `email`
  - `stripe_checkout_session_id`, `stripe_payment_link_id`, `stripe_customer_id`
  - `status` (default: 'active')
  - `source` (default: 'stripe-payment-link')

### 2. Set Environment Variables

Add these to your `.env.local` (development) and Vercel/production environment:

```bash
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_... for production
STRIPE_PUBLIC_KEY=pk_test_...  # or pk_live_... for production

# Get from: https://dashboard.stripe.com/webhooks (after step 3)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Restart your dev server after adding these:**
```bash
npm run dev
```

### 3. Create Stripe Webhook Endpoint

1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Enter your webhook URL:
   - **Production**: `https://www.elevateforhumanity.org/api/stripe/webhook`
   - **Development**: Use your Gitpod preview URL + `/api/stripe/webhook`
4. Select events to listen for:
   - ✅ `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to your environment as `STRIPE_WEBHOOK_SECRET`

### 4. Configure Stripe Payment Links

For each Payment Link you create in Stripe:

1. Go to: https://dashboard.stripe.com/payment-links
2. Edit your payment link (or create a new one)
3. Under **Advanced options** → **Metadata**, add:
   - Key: `programId` → Value: `prog-cna` (or `prog-barber`, etc.)
   - Key: `program_id` → Value: `prog-cna` (backup field name)
4. Make sure **Collect customer email** is enabled
5. Save the payment link

**Important**: The `programId` metadata is how the webhook knows which program to enroll the learner in.

### 5. Update Payment Plans Config

Edit `lms-data/paymentPlans.ts` and replace placeholder URLs with your real Stripe Payment Links:

```typescript
{
  id: "cna-full",
  label: "Pay in Full",
  mode: "full",
  amountUsd: 2200,
  stripePaymentLink: "https://buy.stripe.com/your-real-link-here", // ← Update this
}
```

## How It Works

### Payment Flow

```
1. Learner applies → Application saved to Supabase (status: 'submitted', payment_status: 'pending')
2. Admin reviews → Sends checkout link: /checkout/prog-cna
3. Learner clicks payment button → Redirected to Stripe Payment Link
4. Learner completes payment → Stripe sends webhook to /api/stripe/webhook
5. Webhook handler:
   - Finds matching application by email + programId
   - Creates enrollment record in enrollments table
   - Updates application: payment_status='paid', status='accepted'
6. Admin sees updated status in /admin/applicants-live
```

### Webhook Logic

The webhook (`/api/stripe/webhook/route.ts`) does:

1. **Verify signature** - Ensures request is from Stripe
2. **Extract data** from `checkout.session.completed`:
   - Customer email
   - `metadata.programId` or `metadata.program_id`
   - Session ID, payment link ID, customer ID
3. **Find application** - Query Supabase for matching email + program_id
4. **Create enrollment** - Insert row into `enrollments` table
5. **Update application** - Set `payment_status='paid'` and `status='accepted'`

## Testing

### Test Mode (Recommended First)

1. Use Stripe test keys (`sk_test_...`, `pk_test_...`)
2. Create test Payment Links in Stripe Dashboard
3. Submit a test application at `/apply`
4. Go to `/checkout/prog-cna` and click payment button
5. Use Stripe test card: `4242 4242 4242 4242`, any future date, any CVC
6. Complete payment
7. Check Supabase:
   - `applications` table: `payment_status` should be 'paid'
   - `enrollments` table: New row should exist
8. Check `/admin/applicants-live`: Application should show as accepted

### Debugging

Check logs in:
- **Development**: Terminal where `npm run dev` is running
- **Production**: Vercel logs or your hosting platform
- **Stripe**: Dashboard → Webhooks → Click your endpoint → View events

Look for:
```
[StripeWebhook] Enrollment recorded for email=..., program=..., appId=...
```

## Next Steps

### Option A: Admin Enrollments Page
Create `/admin/enrollments` to view all active enrollments per program.

### Option B: Auto-Grant Course Access
When enrollment is created, automatically assign the learner to the course in your LMS.

### Option C: Email Notifications
Send confirmation emails when enrollment is successful.

## Troubleshooting

### Webhook not receiving events
- Verify webhook URL is correct in Stripe Dashboard
- Check that `STRIPE_WEBHOOK_SECRET` matches the signing secret
- Ensure your server is publicly accessible (not localhost)

### Application not found
- Verify learner applied with the same email used in Stripe checkout
- Check that Payment Link has `programId` metadata set correctly
- Ensure `program_id` in application matches metadata value exactly

### Payment status not updating
- Check Supabase logs for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Ensure `applications` table has `payment_status` column (run SQL schema)

### Enrollment not created
- Check that `enrollments` table exists (run SQL schema)
- Verify RLS policies allow inserts
- Check webhook logs for error messages

## Security Notes

- Never commit `.env.local` or expose secret keys
- Use test keys for development, live keys only in production
- Webhook signature verification prevents unauthorized requests
- Consider adding IP allowlisting for webhook endpoint in production

## Support

For issues or questions:
- Check Stripe webhook logs: https://dashboard.stripe.com/webhooks
- Review Supabase logs: https://supabase.com/dashboard
- Contact: support@elevateforhumanity.org
