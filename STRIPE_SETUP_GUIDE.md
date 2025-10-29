# 💳 Stripe Setup Guide (10 Minutes)

**Last Updated**: 2025-10-29 04:05 UTC  
**Autopilot Version**: 7.0  
**Gets You**: 95% Functionality (Payments + Revenue Sharing)

---

## 🎯 What You'll Get

After adding Stripe keys:

- ✅ Course payment processing
- ✅ Program enrollment payments
- ✅ Revenue sharing (Stripe Connect)
- ✅ Subscription management
- ✅ Refund handling
- ✅ Payment history
- ✅ Instructor payouts

---

## 📋 Prerequisites

1. ✅ Supabase setup complete (80% functionality)
2. ✅ Stripe account created: https://dashboard.stripe.com/register

---

## 🔑 Step 1: Get Stripe API Keys (3 minutes)

### 1.1 Get Publishable and Secret Keys

1. Go to https://dashboard.stripe.com/apikeys
2. You'll see two keys:

#### Publishable Key (starts with `pk_test_` or `pk_live_`)

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- ✅ Safe to expose in frontend
- ✅ Used for Stripe.js initialization
- ✅ Copy this key

#### Secret Key (starts with `sk_test_` or `sk_live_`)

```bash
STRIPE_SECRET_KEY=sk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- ⚠️ **NEVER expose in frontend**
- ⚠️ **Keep this secret**
- ✅ Used for server-side API calls
- ✅ Click "Reveal test key" and copy

---

### 1.2 Get Webhook Secret (5 minutes)

Webhooks notify your app when payments succeed/fail.

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Configure endpoint:

#### Endpoint URL:

```
https://your-domain.netlify.app/api/stripe-webhook
```

Replace `your-domain` with your actual Netlify domain.

#### Events to send:

Select these events (click "Select events"):

- ✅ `checkout.session.completed`
- ✅ `payment_intent.succeeded`
- ✅ `payment_intent.payment_failed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

4. Click **Add endpoint**
5. Click on the newly created endpoint
6. Click **Reveal** under "Signing secret"
7. Copy the webhook secret:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔧 Step 2: Add Keys to Environment

### For Local Development:

Add to `.env` file:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### For Netlify:

1. Go to Netlify Dashboard → Your site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable** and add all 3:

| Key                           | Value            | Scope      |
| ----------------------------- | ---------------- | ---------- |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_51H...` | All scopes |
| `STRIPE_SECRET_KEY`           | `sk_test_51H...` | All scopes |
| `STRIPE_WEBHOOK_SECRET`       | `whsec_...`      | All scopes |

4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## 🧪 Step 3: Test Stripe Integration (2 minutes)

### Test Card Numbers

Stripe provides test cards for development:

#### Successful Payment:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Declined Payment:

```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Requires Authentication (3D Secure):

```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Test the Payment Flow:

1. Start your local dev server:

   ```bash
   pnpm run dev
   ```

2. Navigate to a course page
3. Click "Enroll" or "Purchase"
4. Use test card `4242 4242 4242 4242`
5. Complete payment
6. ✅ You should see success message
7. ✅ Check Stripe Dashboard → Payments for the test payment

---

## 💰 Step 4: Configure Revenue Sharing (Optional)

If you want to split payments with instructors:

### 4.1 Enable Stripe Connect

1. Go to https://dashboard.stripe.com/connect/accounts/overview
2. Click **Get started**
3. Choose **Platform or marketplace**
4. Complete onboarding

### 4.2 Create Connected Accounts

For each instructor:

1. Go to https://dashboard.stripe.com/connect/accounts
2. Click **New account**
3. Choose **Express** (easiest for instructors)
4. Fill in instructor details
5. Copy the connected account ID (starts with `acct_`)
6. Store in database:
   ```sql
   UPDATE profiles
   SET stripe_account_id = 'acct_xxxxxxxxxxxxx'
   WHERE id = 'instructor_user_id';
   ```

### 4.3 Configure Split Percentages

In your database, set revenue split:

```sql
-- Example: 70% to instructor, 30% to platform
UPDATE courses
SET revenue_split_percentage = 70
WHERE instructor_id = 'instructor_user_id';
```

---

## 🔍 Step 5: Verify Setup

Run these checks:

### Check 1: Environment Variables

```bash
# Local
cat .env | grep STRIPE

# Should show:
# VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Check 2: Build

```bash
pnpm run build
```

✅ Should succeed with no errors

### Check 3: Test Payment

1. Run dev server: `pnpm run dev`
2. Try enrolling in a course
3. Use test card: `4242 4242 4242 4242`
4. ✅ Payment should succeed

### Check 4: Webhook

1. Make a test payment
2. Go to https://dashboard.stripe.com/webhooks
3. Click on your endpoint
4. Check **Recent deliveries**
5. ✅ Should show successful deliveries

---

## 📊 What's Enabled Now

With Stripe configured, you now have:

### ✅ Payment Features

- Course purchases
- Program enrollments
- One-time payments
- Subscription billing
- Payment history
- Refund processing

### ✅ Revenue Features

- Automatic payment splitting
- Instructor payouts
- Platform fees
- Revenue tracking
- Financial reporting

### ✅ Customer Features

- Saved payment methods
- Payment history
- Invoice generation
- Receipt emails
- Refund requests

---

## 🚨 Important Notes

### Test vs Live Mode

**Test Mode** (for development):

- Keys start with `pk_test_` and `sk_test_`
- Use test card numbers
- No real money processed
- ✅ Use this for development

**Live Mode** (for production):

- Keys start with `pk_live_` and `sk_live_`
- Real card numbers
- Real money processed
- ⚠️ Only use when ready for production

### Security Best Practices

1. ✅ **NEVER** commit `.env` file to git
2. ✅ **NEVER** expose `STRIPE_SECRET_KEY` in frontend
3. ✅ **ALWAYS** use HTTPS in production
4. ✅ **ALWAYS** verify webhook signatures
5. ✅ **ALWAYS** use environment variables

### Webhook Testing Locally

To test webhooks on localhost:

1. Install Stripe CLI:

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Linux
   wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
   tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
   ```

2. Login:

   ```bash
   stripe login
   ```

3. Forward webhooks:

   ```bash
   stripe listen --forward-to localhost:5173/api/stripe-webhook
   ```

4. Copy the webhook signing secret shown
5. Add to `.env`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

---

## 🆘 Troubleshooting

### Issue: "Invalid API key"

**Solution**:

- Check you copied the full key (starts with `pk_test_` or `sk_test_`)
- Make sure no extra spaces or newlines
- Verify key is for correct Stripe account

### Issue: "Webhook signature verification failed"

**Solution**:

- Check `STRIPE_WEBHOOK_SECRET` is correct
- Make sure webhook endpoint URL matches exactly
- Verify webhook is sending to correct URL

### Issue: "Payment succeeded but enrollment not created"

**Solution**:

- Check webhook is configured correctly
- Check webhook events include `checkout.session.completed`
- Check Stripe Dashboard → Webhooks → Recent deliveries for errors

### Issue: "Connected account not found"

**Solution**:

- Verify instructor has completed Stripe Connect onboarding
- Check `stripe_account_id` is stored correctly in database
- Verify account ID starts with `acct_`

---

## 📈 Next Steps

### To Get 100% Functionality:

Add these API keys (see `API_KEYS_REQUIRED.md`):

- OpenAI (1 key) - AI content generation
- Twitter/X (4 keys) - Social automation
- LinkedIn (2 keys) - Professional network
- Facebook (2 keys) - Social media
- Slack (1 webhook) - Notifications
- Cloudflare (2 keys) - Edge functions

---

## 📞 Support

If you encounter issues:

1. Check Stripe Dashboard → Logs for API errors
2. Check Netlify build logs
3. Check browser console for frontend errors
4. Review webhook delivery logs in Stripe Dashboard
5. Autopilot will monitor and alert on payment failures

---

**Setup Time**: 10 minutes  
**Functionality**: 95% (Full LMS + Payments)  
**Status**: Production Ready  
**Generated by**: Autonomous Autopilot v7.0
