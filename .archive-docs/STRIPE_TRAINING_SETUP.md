# Stripe Training Courses Setup Guide

## Overview

Your training courses need to be set up in Stripe so customers can purchase them. This guide shows you how to create products and get the Price IDs.

---

## Step 1: Log into Stripe Dashboard

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Log in with your Stripe account
3. Make sure you're in **Test Mode** first (toggle in top right)

---

## Step 2: Create Products

Go to **Products** → **Add Product** for each course:

### Course 1: Tax Preparation Fundamentals

- **Name:** Tax Preparation Fundamentals
- **Description:** Complete beginner course covering everything you need to start preparing tax returns. 12 hours, 24 lessons.
- **Price:** $199.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID** (starts with `price_...`)
- **Update code:** Replace `price_tax_prep_fundamentals` with your actual Price ID

### Course 2: IRS Ethics & Professional Standards

- **Name:** IRS Ethics & Professional Standards
- **Description:** Learn IRS regulations, preparer responsibilities, and ethical standards. 6 hours, 12 lessons.
- **Price:** $149.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_irs_ethics` with your actual Price ID

### Course 3: Advanced Tax Returns

- **Name:** Advanced Tax Returns
- **Description:** Master complex tax situations including rental property, investments, and multi-state returns. 16 hours, 20 lessons.
- **Price:** $199.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_advanced_returns` with your actual Price ID

### Course 4: Small Business Tax Returns

- **Name:** Small Business Tax Returns
- **Description:** Learn to prepare business returns for sole proprietors, partnerships, S-corps, and C-corps. 20 hours, 25 lessons.
- **Price:** $299.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_business_returns` with your actual Price ID

### Course 5: Tax Software Mastery

- **Name:** Tax Software Mastery
- **Description:** Master professional tax software, data entry shortcuts, and e-filing procedures. 10 hours, 15 lessons.
- **Price:** $149.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_software_mastery` with your actual Price ID

### Course 6: Refund Advance Products

- **Name:** Refund Advance Products
- **Description:** Learn to offer and process refund advances, maximizing revenue while helping clients. 4 hours, 8 lessons.
- **Price:** $99.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_refund_advances` with your actual Price ID

### Course 7: Client Service Excellence

- **Name:** Client Service Excellence
- **Description:** Build a successful tax practice with excellent client service, marketing, and retention strategies. 6 hours, 10 lessons.
- **Price:** $79.00 USD
- **Billing:** One-time payment
- **Click "Save product"**
- **Copy the Price ID**
- **Update code:** Replace `price_client_service` with your actual Price ID

---

## Step 3: Create Training Bundles (Optional)

### Bundle 1: Complete Professional Bundle

- **Name:** Complete Professional Bundle
- **Description:** All 7 courses - Everything you need to start a tax business. Save $275!
- **Price:** $799.00 USD
- **Billing:** One-time payment

### Bundle 2: Starter Bundle

- **Name:** Starter Bundle
- **Description:** Tax Prep Fundamentals + IRS Ethics + Software Mastery. Save $198!
- **Price:** $299.00 USD
- **Billing:** One-time payment

### Bundle 3: Advanced Bundle

- **Name:** Advanced Bundle
- **Description:** Advanced Returns + Business Returns + Refund Advances + Client Service. Save $198!
- **Price:** $499.00 USD
- **Billing:** One-time payment

---

## Step 4: Update Code with Price IDs

Open `app/supersonic-fast-cash/careers/training/page.tsx` and replace the placeholder Price IDs:

```typescript
const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'tax-basics',
    title: 'Tax Preparation Fundamentals',
    price: 199,
    stripePriceId: 'price_XXXXXXXXXXXXX', // ← Replace with actual Price ID from Stripe
    // ...
  },
  {
    id: 'irs-regulations',
    title: 'IRS Ethics & Professional Standards',
    price: 149,
    stripePriceId: 'price_XXXXXXXXXXXXX', // ← Replace with actual Price ID from Stripe
    // ...
  },
  // ... etc for all courses
];
```

---

## Step 5: Test the Payment Flow

### In Test Mode:

1. Go to your training page: `/supersonic-fast-cash/careers/training`
2. Click "Enroll for $199" on any course
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
5. Expiry: Any future date
6. CVC: Any 3 digits
7. Complete payment
8. You should be redirected back to training page

### Test Cards:

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0027 6000 3184

---

## Step 6: Set Up Webhooks (Important!)

Webhooks notify your app when a payment succeeds.

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. **Endpoint URL:** `https://yourdomain.com/api/supersonic-fast-cash/stripe-webhook`
4. **Events to send:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. **Copy the Signing Secret** (starts with `whsec_...`)
7. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

---

## Step 7: Go Live

Once everything works in test mode:

1. Toggle to **Live Mode** in Stripe Dashboard
2. Create the same products in Live Mode
3. Copy the **Live Price IDs**
4. Update your code with Live Price IDs
5. Update `.env.local` with Live Stripe keys:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```
6. Deploy to production

---

## Revenue Tracking

### Expected Revenue from Training:

**Individual Course Sales:**

- Tax Prep Fundamentals ($199) × 50 students = $9,950
- IRS Ethics ($149) × 50 students = $7,450
- Advanced Returns ($199) × 30 students = $5,970
- Business Returns ($299) × 20 students = $5,980
- Software Mastery ($149) × 40 students = $5,960
- Refund Advances ($99) × 30 students = $2,970
- Client Service ($79) × 25 students = $1,975

**Bundle Sales:**

- Complete Bundle ($799) × 20 students = $15,980
- Starter Bundle ($299) × 30 students = $8,970
- Advanced Bundle ($499) × 15 students = $7,485

**Total Potential:** $72,690+ per year

**Plus:** Your employees get it FREE, so you save on training costs!

---

## Troubleshooting

### "Price ID not found"

- Make sure you copied the Price ID correctly (starts with `price_`)
- Make sure you're using the correct mode (test vs live)

### "Checkout session failed"

- Check your Stripe Secret Key in `.env.local`
- Make sure it matches the mode (test key for test mode, live key for live mode)

### "Payment succeeded but no access granted"

- Set up the webhook (Step 6)
- Check webhook logs in Stripe Dashboard

---

## Support

**Stripe Documentation:** https://stripe.com/docs/payments/checkout
**Stripe Support:** https://support.stripe.com

---

_Last Updated: December 30, 2024_
