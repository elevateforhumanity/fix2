# Stripe Setup - Exact Steps (Match Barber Setup)

## How to Set Up All 9 Programs in Stripe Dashboard

Follow these EXACT steps for each program, matching how you set up Barber:

---

## Step-by-Step for EACH Program

### 1. Go to Stripe Dashboard
```
https://dashboard.stripe.com/products
```

### 2. Click "+ Add Product"

### 3. Fill in Product Details

**For Barber Apprenticeship (Example):**
```
Name: Barber Apprenticeship
Description: Complete barber training with Milady RISE certification
```

**Pricing:**
```
Price: $4,890.00
Billing period: One time
```

**Payment methods:**
- Click "Customize payment methods"
- Enable ALL available methods:
  ✅ Cards
  ✅ Klarna
  ✅ Afterpay / Clearpay  
  ✅ ACH Direct Debit
  ✅ Cash App Pay
  ✅ Link
  ✅ Zip
  ✅ PayPal
  ✅ Venmo
  ❌ Affirm (UNCHECK - we use standalone)

### 4. Click "Add product"

### 5. Copy the Price ID

After creating, you'll see:
```
Price ID: price_1QRxxxxxxxxx
```

**COPY THIS!** You'll need it.

---

## All 9 Programs to Create

### Program 1: Barber Apprenticeship ✅ (Already Done)
```
Name: Barber Apprenticeship
Description: Complete barber training with Milady RISE certification
Price: $4,890.00
Billing: One time
Payment methods: ALL except Affirm
```
**Price ID:** `price_1QRxxxxxxxxx` (you already have this)

---

### Program 2: Direct Support Professional (DSP)
```
Name: Direct Support Professional (DSP)
Description: Become a certified Direct Support Professional
Price: $4,325.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_DSP=price_xxxxx`

---

### Program 3: HVAC Technician
```
Name: HVAC Technician
Description: HVAC installation and repair certification
Price: $5,000.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_HVAC=price_xxxxx`

---

### Program 4: CPR Certification
```
Name: CPR Certification
Description: American Heart Association CPR certification
Price: $575.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_CPR=price_xxxxx`

---

### Program 5: Emergency Health & Safety Tech
```
Name: Emergency Health & Safety Tech
Description: Emergency medical and safety technician training
Price: $4,950.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_EHST=price_xxxxx`

---

### Program 6: Professional Esthetician
```
Name: Professional Esthetician
Description: Licensed esthetician training and certification
Price: $4,575.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_ESTH=price_xxxxx`

---

### Program 7: Peer Recovery Coach
```
Name: Peer Recovery Coach
Description: Certified peer recovery specialist training
Price: $4,750.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_PRC=price_xxxxx`

---

### Program 8: Tax Prep & Financial Services
```
Name: Tax Prep & Financial Services
Description: IRS-certified tax preparer training
Price: $4,950.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_TAX=price_xxxxx`

---

### Program 9: Business Startup & Marketing
```
Name: Business Startup & Marketing
Description: Launch and grow your business
Price: $4,550.00
Billing: One time
Payment methods: ALL except Affirm
```
**After creating, copy Price ID:** `STRIPE_PRICE_BIZ=price_xxxxx`

---

## After Creating All Products

### You'll have 9 Price IDs:

```bash
# Add these to .env.local

# Barber (already have)
STRIPE_PRICE_BARBER=price_1QRxxxxxxxxx

# New ones (replace xxxxx with actual IDs)
STRIPE_PRICE_DSP=price_xxxxx
STRIPE_PRICE_HVAC=price_xxxxx
STRIPE_PRICE_CPR=price_xxxxx
STRIPE_PRICE_EHST=price_xxxxx
STRIPE_PRICE_ESTH=price_xxxxx
STRIPE_PRICE_PRC=price_xxxxx
STRIPE_PRICE_TAX=price_xxxxx
STRIPE_PRICE_BIZ=price_xxxxx
```

---

## Important: Payment Methods Configuration

For EACH product, make sure:

### ✅ ENABLE These:
- Cards (Visa, Mastercard, Amex, Discover)
- Klarna
- Afterpay / Clearpay
- ACH Direct Debit
- Cash App Pay
- Link
- Zip
- PayPal
- Venmo

### ❌ DISABLE This:
- Affirm (we use standalone Affirm, not through Stripe)

---

## Quick Checklist

- [ ] Go to https://dashboard.stripe.com/products
- [ ] Create Product 1: Barber (already done ✅)
- [ ] Create Product 2: DSP
- [ ] Create Product 3: HVAC
- [ ] Create Product 4: CPR
- [ ] Create Product 5: Emergency Health & Safety
- [ ] Create Product 6: Professional Esthetician
- [ ] Create Product 7: Peer Recovery Coach
- [ ] Create Product 8: Tax Prep & Financial
- [ ] Create Product 9: Business Startup & Marketing
- [ ] Copy all 9 Price IDs
- [ ] Add to .env.local
- [ ] Send me the Price IDs
- [ ] I'll update the code to use them

---

## What I'll Do After You Give Me the Price IDs

Once you send me all 9 Price IDs, I will:

1. ✅ Update `.env.local` with all Price IDs
2. ✅ Update enrollment page to use actual Stripe Products
3. ✅ Update payment buttons to use Price IDs
4. ✅ Configure Affirm button separately (standalone)
5. ✅ Test all 9 programs
6. ✅ Verify payment methods work
7. ✅ Confirm automatic enrollment works

---

## Example: What to Send Me

After creating all products, send me this:

```
STRIPE_PRICE_BARBER=price_1QRxxxxxxxxx
STRIPE_PRICE_DSP=price_1QSxxxxxxxxx
STRIPE_PRICE_HVAC=price_1QTxxxxxxxxx
STRIPE_PRICE_CPR=price_1QUxxxxxxxxx
STRIPE_PRICE_EHST=price_1QVxxxxxxxxx
STRIPE_PRICE_ESTH=price_1QWxxxxxxxxx
STRIPE_PRICE_PRC=price_1QXxxxxxxxxx
STRIPE_PRICE_TAX=price_1QYxxxxxxxxx
STRIPE_PRICE_BIZ=price_1QZxxxxxxxxx
```

Then I'll integrate everything!

---

**Time to complete:** ~15 minutes (create all 9 products)
**Next:** Send me the Price IDs and I'll do the rest!
