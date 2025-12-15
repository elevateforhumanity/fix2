# Quick Start: Pull Keys & Setup Stripe Products

## One Command to Do Everything

```bash
npm run check:stripe
```

This will:
1. ✅ Pull all keys from Vercel
2. ✅ Check existing Stripe products
3. ✅ Show you what's missing
4. ✅ Give you the Price IDs to add

---

## Step-by-Step

### 1. Pull Keys from Vercel
```bash
npm run env:pull
```

### 2. Check What You Have in Stripe
```bash
npm run check:stripe
```

### 3. Create Missing Products

Go to: https://dashboard.stripe.com/products

For each missing program, click "+ Add Product" and fill in:

**Example: HVAC Technician**
```
Name: HVAC Technician
Description: HVAC installation and repair certification
Price: $5,000.00
Billing: One time

Payment methods (click "Customize"):
✅ Cards
✅ Klarna
✅ Afterpay / Clearpay
✅ ACH Direct Debit
✅ Cash App Pay
✅ Link
✅ Zip
✅ PayPal
✅ Venmo
❌ Affirm (uncheck - we use standalone)
```

### 4. Copy Price IDs

After creating each product, copy the Price ID (looks like `price_1QRxxxxxxxxx`)

### 5. Add to .env.local

```bash
# Add these lines to .env.local
STRIPE_PRICE_BARBER=price_1QRxxxxxxxxx
STRIPE_PRICE_DSP=price_xxxxx
STRIPE_PRICE_HVAC=price_xxxxx
STRIPE_PRICE_CPR=price_xxxxx
STRIPE_PRICE_EHST=price_xxxxx
STRIPE_PRICE_ESTH=price_xxxxx
STRIPE_PRICE_PRC=price_xxxxx
STRIPE_PRICE_TAX=price_xxxxx
STRIPE_PRICE_BIZ=price_xxxxx
```

### 6. Add to Vercel

```bash
# For each Price ID:
vercel env add STRIPE_PRICE_DSP
vercel env add STRIPE_PRICE_HVAC
vercel env add STRIPE_PRICE_CPR
# ... etc
```

### 7. Tell Me the Price IDs

Send me all 9 Price IDs and I'll update the code to use them!

---

## All 9 Programs to Create

| # | Program Name | Price | Status |
|---|-------------|-------|--------|
| 1 | Barber Apprenticeship | $4,890 | ✅ Done |
| 2 | Direct Support Professional (DSP) | $4,325 | ⏳ Create |
| 3 | HVAC Technician | $5,000 | ⏳ Create |
| 4 | CPR Certification | $575 | ⏳ Create |
| 5 | Emergency Health & Safety Tech | $4,950 | ⏳ Create |
| 6 | Professional Esthetician | $4,575 | ⏳ Create |
| 7 | Peer Recovery Coach | $4,750 | ⏳ Create |
| 8 | Tax Prep & Financial Services | $4,950 | ⏳ Create |
| 9 | Business Startup & Marketing | $4,550 | ⏳ Create |

---

## Quick Reference

```bash
# Pull keys from Vercel
npm run env:pull

# Check Stripe products
npm run check:stripe

# View current keys
grep STRIPE .env.local
```

---

**Next:** Run `npm run check:stripe` and let me know what you see!
