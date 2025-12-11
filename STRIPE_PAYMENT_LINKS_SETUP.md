# Stripe Payment Links Setup

## Overview
The enrollment page now uses direct Stripe Payment Links embedded in iframes. No custom API routes needed for one-time payments.

## How to Create Payment Links in Stripe

1. **Log into Stripe Dashboard**: https://dashboard.stripe.com
2. **Navigate to**: Products → Payment Links
3. **Click**: "Create payment link"
4. **For each program, create a payment link with**:
   - Product name (e.g., "Barber Apprenticeship")
   - Price (e.g., $4,890)
   - Enable payment methods: Affirm, Klarna, Afterpay, PayPal, Venmo, Cash App, ACH, Cards
   - Success URL: `https://elevateforhumanity.org/enroll/success`
   - Cancel URL: `https://elevateforhumanity.org/enroll`

5. **Copy the Payment Link URL** (looks like: `https://buy.stripe.com/XXXXX`)

## Update the Code

Edit `/app/enroll/page.tsx` and replace the placeholder URLs with your actual Stripe Payment Links:

```typescript
const programs = [
  { 
    name: 'Barber Apprenticeship', 
    slug: 'barber-apprentice', 
    price: 4890,
    stripeLink: 'https://buy.stripe.com/YOUR_ACTUAL_LINK_HERE' // ← Replace this
  },
  // ... repeat for all 9 programs
];
```

## Programs to Create Payment Links For

1. **Barber Apprenticeship** - $4,890
2. **Medical Assistant** - $4,325
3. **HVAC Technician** - $5,000
4. **CPR Certification** - $575
5. **Emergency Health & Safety Tech** - $4,950
6. **Professional Esthetician** - $4,575
7. **Peer Recovery Coach** - $4,750
8. **Tax Prep & Financial Services** - $4,950
9. **Business Startup & Marketing** - $4,550

## Benefits of This Approach

✅ **No API routes needed** - Direct Stripe integration
✅ **No server-side code** - Pure client-side
✅ **No environment variables** - Links are public
✅ **Stripe handles everything** - Payment processing, receipts, refunds
✅ **All payment methods** - Affirm, Klarna, PayPal, etc. configured in Stripe
✅ **Mobile optimized** - Stripe's responsive checkout
✅ **PCI compliant** - No payment data touches your server

## How It Works

1. User selects program from dropdown
2. Clicks "Pay Now"
3. Stripe Payment Link loads in iframe
4. User completes payment in iframe
5. Stripe redirects to success page
6. Done!

## Testing

Use Stripe test mode links for development:
- Test card: 4242 4242 4242 4242
- Any future expiry date
- Any 3-digit CVC

## Production

Switch to live mode payment links when ready to accept real payments.
