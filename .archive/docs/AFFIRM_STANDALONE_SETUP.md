# Affirm Standalone Integration - Complete Setup Guide

## Overview
Affirm is integrated as a **standalone merchant account**, completely separate from Stripe. Students can choose Affirm financing directly through Affirm's checkout, not through Stripe.

---

## ✅ Current Status

### What's Implemented
- ✅ **Standalone Affirm API** - Direct integration with Affirm
- ✅ **Custom checkout flow** - Separate from Stripe
- ✅ **Transaction management** - Authorize, capture, void, refund
- ✅ **Confirmation pages** - Success and cancel flows
- ❌ **Affirm removed from Stripe** - No longer a Stripe payment method

### What You Need
1. **Affirm Merchant Account** (separate from Stripe)
2. **Affirm API Keys** (public + private)
3. **Webhook endpoint** (for transaction updates)

---

## 🔧 Setup Steps

### Step 1: Create Affirm Merchant Account

1. **Sign up at Affirm**
   - Go to: [affirm.com/business](https://affirm.com/business)
   - Click "Get Started"
   - Complete merchant application

2. **Provide Business Information**
   - Business name: Elevate for Humanity
   - Business type: Education/Training
   - Tax ID (EIN)
   - Bank account for settlements

3. **Wait for Approval**
   - Affirm reviews application (1-3 business days)
   - You'll receive approval email
   - Access to merchant dashboard

### Step 2: Get API Keys

1. **Login to Affirm Dashboard**
   - Go to: [dashboard.affirm.com](https://dashboard.affirm.com)

2. **Navigate to API Keys**
   - Dashboard → Settings → API Keys
   - You'll see two environments:
     - **Sandbox** (for testing)
     - **Production** (for live transactions)

3. **Copy Keys**
   ```
   Sandbox:
   - Public Key: aGax1GLWFexjLyW7PCf23rfznLl6YGyI (already in code)
   - Private Key: [Get from Affirm dashboard]
   
   Production:
   - Public Key: [Get from Affirm dashboard]
   - Private Key: [Get from Affirm dashboard]
   ```

### Step 3: Configure Environment Variables

Add to `.env.local`:

```bash
# Affirm Standalone Integration
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI  # Sandbox
AFFIRM_PRIVATE_KEY=your-sandbox-private-key-here
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI

# For Production (when ready)
# AFFIRM_PUBLIC_KEY=your-production-public-key
# AFFIRM_PRIVATE_KEY=your-production-private-key
```

### Step 4: Configure Webhooks (Optional)

1. **In Affirm Dashboard**
   - Settings → Webhooks
   - Add endpoint: `https://your-domain.com/api/affirm/webhook`

2. **Select Events**
   - `charge.authorized`
   - `charge.captured`
   - `charge.refunded`
   - `charge.voided`

---

## 🔄 Payment Flow

### How It Works (Separate from Stripe)

```
1. Student visits enrollment page
   ↓
2. Sees TWO payment options:
   - "Pay with Card/Klarna/Afterpay" → Stripe
   - "Pay with Affirm" → Standalone Affirm
   ↓
3. Student clicks "Pay with Affirm"
   ↓
4. POST /api/affirm/checkout
   {
     amount: 4890,
     courseId: "barber-apprenticeship",
     courseName: "Barber Apprenticeship",
     userEmail: "student@example.com"
   }
   ↓
5. Affirm API creates checkout session
   Returns: checkout_token + redirect_url
   ↓
6. Student redirected to Affirm
   URL: https://affirm.com/checkout/ABC123
   ↓
7. Affirm shows financing options:
   - 3 months: $1,630/month
   - 6 months: $815/month
   - 12 months: $407.50/month
   ↓
8. Student enters info:
   - Name, email, phone
   - DOB, SSN last 4
   ↓
9. Affirm instant approval
   ↓
10. Student confirms purchase
   ↓
11. Affirm redirects back:
    /payment/affirm/confirm?checkout_token=ABC123
   ↓
12. POST /api/affirm/transactions
    { checkout_token: "ABC123", action: "authorize" }
   ↓
13. Affirm authorizes transaction
    Returns: transaction_id
   ↓
14. Create enrollment in database
   ↓
15. Assign AI instructor
   ↓
16. Student sees success page
```

---

## 📁 Implementation Files

### API Routes

**1. Create Checkout**
- **File:** `/app/api/affirm/checkout/route.ts`
- **Method:** POST
- **Purpose:** Create Affirm checkout session
- **Returns:** `checkout_token`, `redirect_url`

**2. Manage Transactions**
- **File:** `/app/api/affirm/transactions/route.ts`
- **Methods:** POST, GET
- **Actions:** authorize, capture, void, refund
- **Purpose:** Manage transaction lifecycle

**3. Webhook Handler** (Optional)
- **File:** `/app/api/affirm/webhook/route.ts`
- **Method:** POST
- **Purpose:** Receive Affirm event notifications

### UI Pages

**1. Confirmation Page**
- **File:** `/app/payment/affirm/confirm/page.tsx`
- **Purpose:** Handle return from Affirm after approval
- **Actions:** Authorize transaction, create enrollment

**2. Cancel Page**
- **File:** `/app/payment/affirm/cancel/page.tsx`
- **Purpose:** Handle cancellation
- **Actions:** Show message, offer to try again

---

## 🧪 Testing

### Test in Sandbox Mode

```bash
# 1. Ensure sandbox keys in .env.local
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-sandbox-private-key

# 2. Run test script
npm run test:affirm

# 3. Or test manually
# Visit: http://localhost:3000/enroll
# Click: "Pay with Affirm"
# Use test credentials (see below)
```

### Test Credentials

**Approved:**
```
Name: John Doe
Email: test@example.com
Phone: 555-555-5555
DOB: 01/01/1990
SSN Last 4: 1234
```

**Declined:**
```
Name: Jane Decline
Email: decline@example.com
Phone: 555-555-5556
DOB: 01/01/1990
SSN Last 4: 5678
```

---

## 💰 Pricing & Fees

### For Students
- **0% APR** on qualifying purchases
- **3, 6, or 12 months** payment plans
- **No hidden fees** (if paid on time)
- **Late fees** apply for missed payments

### For Elevate for Humanity
- **Transaction Fee:** 3-6% per transaction
- **Paid Immediately:** Affirm pays you upfront
- **No Chargebacks:** Affirm assumes risk
- **Settlement:** 2-3 business days

### Example
**Program Cost:** $4,890

**Student Pays (12 months, 0% APR):**
- Monthly: $407.50
- Total: $4,890

**You Receive:**
- Immediate: $4,890 - fees (~$245)
- Net: ~$4,645
- Settlement: 2-3 days

---

## 🎨 UI Integration

### Add Affirm Button to Enrollment Page

```tsx
// app/enroll/page.tsx

export default function EnrollPage() {
  const handleAffirmPayment = async () => {
    const response = await fetch('/api/affirm/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 4890,
        courseId: 'barber-apprenticeship',
        courseName: 'Barber Apprenticeship',
        userEmail: user.email,
        userName: user.name,
      }),
    });

    const { redirect_url } = await response.json();
    window.location.href = redirect_url;
  };

  return (
    <div>
      {/* Stripe Payment Button */}
      <button onClick={handleStripePayment}>
        Pay with Card/Klarna/Afterpay
      </button>

      {/* Affirm Payment Button (Separate) */}
      <button onClick={handleAffirmPayment}>
        Pay with Affirm
        <span>As low as $407/month</span>
      </button>
    </div>
  );
}
```

---

## 📊 Transaction Management

### Authorize Transaction
```bash
curl -X POST http://localhost:3000/api/affirm/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "checkout_token": "ABC123",
    "action": "authorize"
  }'
```

### Capture Transaction
```bash
curl -X POST http://localhost:3000/api/affirm/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "TXID-123",
    "action": "capture"
  }'
```

### Void Transaction
```bash
curl -X POST http://localhost:3000/api/affirm/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "TXID-123",
    "action": "void"
  }'
```

### Refund Transaction
```bash
curl -X POST http://localhost:3000/api/affirm/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "TXID-123",
    "action": "refund",
    "amount": 489000
  }'
```

---

## 🔒 Security

### API Authentication
```typescript
// Basic Auth with public + private keys
const auth = Buffer.from(
  `${AFFIRM_PUBLIC_KEY}:${AFFIRM_PRIVATE_KEY}`
).toString('base64');

headers: {
  'Authorization': `Basic ${auth}`
}
```

### Best Practices
- ✅ Store keys in environment variables
- ✅ Never expose private key in client code
- ✅ Use HTTPS only
- ✅ Verify webhook signatures
- ✅ Log all transactions

---

## 📈 Monitoring

### Affirm Dashboard
Access at: [dashboard.affirm.com](https://dashboard.affirm.com)

**View:**
- Transaction history
- Approval rates
- Settlement reports
- Customer demographics
- Refund tracking

### Key Metrics
- **Approval Rate:** % of applications approved
- **Average Order Value:** Average transaction amount
- **Conversion Rate:** % of checkouts completed
- **Settlement Time:** Days to receive funds

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key"
**Solution:**
1. Verify keys in Affirm dashboard
2. Check environment variables loaded
3. Ensure using correct environment (sandbox vs production)

### Issue: "Checkout Token Expired"
**Solution:**
- Tokens expire after 30 minutes
- Create new checkout session
- Complete approval within time limit

### Issue: "Transaction Already Captured"
**Solution:**
- Check transaction status first
- Each transaction can only be captured once
- Use void if not yet captured

---

## ✅ Pre-Launch Checklist

### Sandbox Testing
- [ ] Create Affirm merchant account
- [ ] Get sandbox API keys
- [ ] Configure environment variables
- [ ] Test checkout creation
- [ ] Test approval flow
- [ ] Test transaction authorization
- [ ] Test enrollment creation
- [ ] Test AI instructor assignment

### Production Setup
- [ ] Switch to production API keys
- [ ] Update environment variables
- [ ] Configure production webhooks
- [ ] Test with real transaction
- [ ] Monitor first settlements
- [ ] Train support staff

---

## 📚 Resources

- **Affirm Merchant Portal:** [dashboard.affirm.com](https://dashboard.affirm.com)
- **Affirm API Docs:** [docs.affirm.com](https://docs.affirm.com)
- **Support:** [affirm.com/business/support](https://affirm.com/business/support)
- **Test Guide:** `AFFIRM_TEST_GUIDE.md`

---

## 🎯 Key Differences from Stripe

| Feature | Stripe + Affirm | Standalone Affirm |
|---------|----------------|-------------------|
| **Account** | Stripe only | Affirm merchant account |
| **API Keys** | Stripe keys | Affirm keys |
| **Checkout** | Stripe Checkout | Affirm Checkout |
| **Webhook** | Stripe webhook | Affirm webhook |
| **Dashboard** | Stripe | Affirm |
| **Settlement** | Stripe | Affirm |
| **Integration** | Automatic | Manual |

---

## 💡 Summary

### What You Have Now
- ✅ Stripe for cards, Klarna, Afterpay, etc.
- ✅ Standalone Affirm for financing
- ✅ Two separate payment flows
- ✅ Two separate merchant accounts

### What You Need
1. **Affirm merchant account**
2. **Affirm API keys**
3. **Update UI** to show both options
4. **Test both flows** independently

### Next Steps
1. Apply for Affirm merchant account
2. Get API keys from Affirm dashboard
3. Add keys to `.env.local`
4. Test with sandbox
5. Launch when approved

---

**Status:** Standalone Integration Ready ✅
**Stripe Integration:** Affirm Removed ✅
**Last Updated:** December 14, 2024
