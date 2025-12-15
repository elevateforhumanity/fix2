# Stripe Products Setup Guide - All Programs

## Overview
Create Stripe Products and Prices for all 9 programs, then use the actual Price IDs in the payment buttons.

---

## Step 1: Create Products in Stripe Dashboard

### Go to Stripe Dashboard
```
https://dashboard.stripe.com/products
```

### Create Each Product

#### 1. Barber Apprenticeship
```
Product Name: Barber Apprenticeship
Description: Complete barber training with Milady RISE certification
Price: $4,890.00
Billing: One-time
Payment Methods: Enable ALL (Card, Affirm, Klarna, Afterpay, etc.)
```

**After creating, copy the Price ID:**
```
Example: price_1QRxxx...barber
```

#### 2. Direct Support Professional (DSP)
```
Product Name: Direct Support Professional (DSP)
Description: Become a certified Direct Support Professional
Price: $4,325.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 3. HVAC Technician
```
Product Name: HVAC Technician
Description: HVAC installation and repair certification
Price: $5,000.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 4. CPR Certification
```
Product Name: CPR Certification
Description: American Heart Association CPR certification
Price: $575.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 5. Emergency Health & Safety Tech
```
Product Name: Emergency Health & Safety Tech
Description: Emergency medical and safety technician training
Price: $4,950.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 6. Professional Esthetician
```
Product Name: Professional Esthetician
Description: Licensed esthetician training and certification
Price: $4,575.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 7. Peer Recovery Coach
```
Product Name: Peer Recovery Coach
Description: Certified peer recovery specialist training
Price: $4,750.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 8. Tax Prep & Financial Services
```
Product Name: Tax Prep & Financial Services
Description: IRS-certified tax preparer training
Price: $4,950.00
Billing: One-time
Payment Methods: Enable ALL
```

#### 9. Business Startup & Marketing
```
Product Name: Business Startup & Marketing
Description: Launch and grow your business
Price: $4,550.00
Billing: One-time
Payment Methods: Enable ALL
```

---

## Step 2: Enable Payment Methods for Each Product

### For EACH Product:

1. **Click on the Product**
2. **Click on the Price**
3. **Click "Payment methods"**
4. **Enable ALL methods:**
   - ✅ Card
   - ✅ Klarna
   - ✅ Afterpay / Clearpay
   - ✅ ACH Direct Debit
   - ✅ Cash App Pay
   - ✅ Link
   - ✅ Zip
   - ✅ PayPal
   - ✅ Venmo

5. **Save**

---

## Step 3: Copy All Price IDs

After creating all products, you'll have 9 Price IDs:

```
STRIPE_PRICE_BARBER=price_1QRxxx...barber
STRIPE_PRICE_DSP=price_1QRxxx...dsp
STRIPE_PRICE_HVAC=price_1QRxxx...hvac
STRIPE_PRICE_CPR=price_1QRxxx...cpr
STRIPE_PRICE_EHST=price_1QRxxx...ehst
STRIPE_PRICE_ESTH=price_1QRxxx...esth
STRIPE_PRICE_PRC=price_1QRxxx...prc
STRIPE_PRICE_TAX=price_1QRxxx...tax
STRIPE_PRICE_BIZ=price_1QRxxx...biz
```

---

## Step 4: Add to Environment Variables

### Update `.env.local`:

```bash
# Stripe Products - Program Enrollments
STRIPE_PRICE_BARBER=price_1QRxxx...barber
STRIPE_PRICE_DSP=price_1QRxxx...dsp
STRIPE_PRICE_HVAC=price_1QRxxx...hvac
STRIPE_PRICE_CPR=price_1QRxxx...cpr
STRIPE_PRICE_EHST=price_1QRxxx...ehst
STRIPE_PRICE_ESTH=price_1QRxxx...esth
STRIPE_PRICE_PRC=price_1QRxxx...prc
STRIPE_PRICE_TAX=price_1QRxxx...tax
STRIPE_PRICE_BIZ=price_1QRxxx...biz
```

### Also add to Vercel:

```bash
# Deploy to Vercel
vercel env add STRIPE_PRICE_BARBER
vercel env add STRIPE_PRICE_DSP
vercel env add STRIPE_PRICE_HVAC
vercel env add STRIPE_PRICE_CPR
vercel env add STRIPE_PRICE_EHST
vercel env add STRIPE_PRICE_ESTH
vercel env add STRIPE_PRICE_PRC
vercel env add STRIPE_PRICE_TAX
vercel env add STRIPE_PRICE_BIZ
```

---

## Step 5: Update Code to Use Price IDs

I'll create the updated code files for you.

---

## Quick Setup Checklist

- [ ] Go to https://dashboard.stripe.com/products
- [ ] Create 9 products (see details above)
- [ ] Enable ALL payment methods for each
- [ ] Copy all 9 Price IDs
- [ ] Add to `.env.local`
- [ ] Add to Vercel environment variables
- [ ] Update code (I'll do this)
- [ ] Test each program

---

## Expected Result

After setup, when student clicks "Pay Now":
1. Uses actual Stripe Product/Price
2. All payment methods available (Card, Klarna, Afterpay, etc.)
3. Affirm NOT included (standalone)
4. Clean checkout experience
5. Automatic enrollment on payment

---

**Next:** Once you create the products and give me the Price IDs, I'll update all the code to use them.
