# Affirm Payment Flow - Complete Documentation

## Overview
Complete Affirm financing integration allowing students to pay for programs in 3, 6, or 12 monthly installments with 0% APR options.

---

## 🎯 What is Affirm?

**Affirm** is a "Buy Now, Pay Later" (BNPL) service that allows students to:
- Split payments into 3, 6, or 12 monthly installments
- Get instant approval (soft credit check)
- Pay 0% APR on qualifying purchases
- No hidden fees or surprises

**Benefits for Students:**
- ✅ Affordable monthly payments
- ✅ Instant approval decision
- ✅ No impact on credit score (soft pull)
- ✅ Clear payment schedule
- ✅ No prepayment penalties

**Benefits for EFH:**
- ✅ Increased enrollment conversion
- ✅ Higher average order value
- ✅ Immediate payment (Affirm pays upfront)
- ✅ No risk of non-payment
- ✅ Professional financing option

---

## 📋 Integration Architecture

### Two Integration Methods

#### 1. **Stripe Checkout (Recommended)**
**Used in:** `/api/create-checkout-session`

Affirm is enabled as a payment method in Stripe Checkout:
```typescript
payment_method_types: [
  'card',
  'affirm',  // ← Affirm enabled
  'klarna',
  'afterpay_clearpay',
  // ...
]
```

**Advantages:**
- ✅ Unified payment flow
- ✅ Automatic webhook handling
- ✅ Single integration point
- ✅ Stripe handles all complexity

#### 2. **Direct Affirm API (Advanced)**
**Used in:** `/api/affirm/checkout`

Direct integration with Affirm's API for custom flows:
```typescript
POST https://api.affirm.com/checkout
Authorization: Basic {base64(public_key:private_key)}
```

**Advantages:**
- ✅ Full control over checkout experience
- ✅ Custom branding
- ✅ Advanced transaction management
- ✅ Direct refunds/voids

---

## 🔄 Payment Flow (Stripe Method)

### Student Journey

```
1. Student visits /enroll
   ↓
2. Selects program ($4,890)
   ↓
3. Clicks "Pay Now"
   ↓
4. Redirected to Stripe Checkout
   ↓
5. Sees payment options:
   - Credit Card
   - Affirm (3, 6, 12 months)
   - Klarna
   - etc.
   ↓
6. Selects "Affirm"
   ↓
7. Redirected to Affirm
   ↓
8. Affirm shows:
   - Monthly payment amount
   - Payment schedule
   - 0% APR offer (if eligible)
   ↓
9. Student enters:
   - Name
   - Email
   - Phone
   - DOB
   - Last 4 of SSN
   ↓
10. Affirm instant decision:
    - Approved ✅
    - Declined ❌
    - Partial approval (lower amount)
   ↓
11. If approved:
    - Student confirms purchase
    - Affirm pays EFH immediately
    - Student pays Affirm monthly
   ↓
12. Stripe webhook fires
   ↓
13. Enrollment activated
   ↓
14. AI instructor assigned
   ↓
15. Student accesses dashboard
```

---

## 🔄 Payment Flow (Direct API Method)

### Custom Checkout Flow

```
1. Student initiates payment
   ↓
2. POST /api/affirm/checkout
   {
     amount: 4890,
     courseId: "barber-apprenticeship",
     courseName: "Barber Apprenticeship",
     userEmail: "student@example.com",
     userName: "John Doe"
   }
   ↓
3. Server creates Affirm checkout:
   - Merchant info
   - Item details
   - Billing/shipping
   - Metadata
   ↓
4. Affirm returns:
   {
     checkout_token: "ABC123...",
     redirect_url: "https://affirm.com/checkout/..."
   }
   ↓
5. Student redirected to Affirm
   ↓
6. Affirm approval process
   ↓
7. Student redirected back:
   /payment/affirm/confirm?checkout_token=ABC123
   ↓
8. POST /api/affirm/transactions
   {
     checkout_token: "ABC123",
     action: "authorize"
   }
   ↓
9. Affirm authorizes transaction
   ↓
10. Returns transaction_id
   ↓
11. Enrollment activated
   ↓
12. Student sees success page
```

---

## 🔧 API Endpoints

### 1. Create Affirm Checkout
**Endpoint:** `POST /api/affirm/checkout`

**Request:**
```json
{
  "amount": 4890,
  "courseId": "barber-apprenticeship",
  "courseName": "Barber Apprenticeship",
  "userEmail": "student@example.com",
  "userName": "John Doe",
  "userPhone": "555-123-4567",
  "metadata": {
    "program_id": "uuid",
    "student_id": "uuid"
  }
}
```

**Response:**
```json
{
  "checkout_token": "ABC123XYZ...",
  "redirect_url": "https://sandbox.affirm.com/checkout/ABC123XYZ"
}
```

**Usage:**
```typescript
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
```

### 2. Authorize Transaction
**Endpoint:** `POST /api/affirm/transactions`

**Request:**
```json
{
  "checkout_token": "ABC123XYZ",
  "action": "authorize",
  "order_id": "EFH-1234567890"
}
```

**Response:**
```json
{
  "transaction_id": "TXID-ABC123",
  "amount": 489000,
  "currency": "USD",
  "status": "authorized",
  "created": "2024-12-14T10:00:00Z",
  "order_id": "EFH-1234567890"
}
```

### 3. Capture Transaction
**Endpoint:** `POST /api/affirm/transactions`

**Request:**
```json
{
  "transaction_id": "TXID-ABC123",
  "action": "capture",
  "amount": 489000,
  "order_id": "EFH-1234567890"
}
```

**Response:**
```json
{
  "id": "TXID-ABC123",
  "status": "captured",
  "amount": 489000
}
```

### 4. Void Transaction
**Endpoint:** `POST /api/affirm/transactions`

**Request:**
```json
{
  "transaction_id": "TXID-ABC123",
  "action": "void"
}
```

### 5. Refund Transaction
**Endpoint:** `POST /api/affirm/transactions`

**Request:**
```json
{
  "transaction_id": "TXID-ABC123",
  "action": "refund",
  "amount": 489000
}
```

### 6. Get Transaction Details
**Endpoint:** `GET /api/affirm/transactions?transaction_id=TXID-ABC123`

**Response:**
```json
{
  "id": "TXID-ABC123",
  "amount": 489000,
  "currency": "USD",
  "status": "captured",
  "created": "2024-12-14T10:00:00Z",
  "order_id": "EFH-1234567890",
  "details": {
    "billing": {...},
    "shipping": {...}
  }
}
```

---

## 🔐 Configuration

### Environment Variables

```bash
# Affirm API Keys
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-affirm-private-key-here
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI

# Site URL for redirects
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
```

### Affirm Dashboard Setup

1. **Create Affirm Account**
   - Go to [affirm.com/business](https://affirm.com/business)
   - Sign up as merchant
   - Complete verification

2. **Get API Keys**
   - Dashboard → Settings → API Keys
   - Copy Public Key
   - Copy Private Key (keep secure!)

3. **Configure Webhooks** (Optional)
   - Dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/affirm/webhook`
   - Select events: `charge.authorized`, `charge.captured`, `charge.refunded`

4. **Set Redirect URLs**
   - Confirmation URL: `/payment/affirm/confirm`
   - Cancel URL: `/payment/affirm/cancel`

---

## 💰 Pricing & Fees

### For Students
- **0% APR** on qualifying purchases
- **3, 6, or 12 months** payment plans
- **No hidden fees** (if paid on time)
- **Late fees** apply for missed payments

### For EFH (Merchant)
- **Transaction Fee:** ~3-6% per transaction
- **Paid Immediately:** Affirm pays upfront
- **No Chargebacks:** Affirm assumes risk
- **Monthly Statements:** Track all transactions

### Example Breakdown

**Program Cost:** $4,890

**Student Pays (12 months, 0% APR):**
- Monthly: $407.50
- Total: $4,890

**EFH Receives:**
- Immediate: $4,890 - fees (~$245)
- Net: ~$4,645

---

## 🧪 Testing

### Test Mode

```bash
# Use sandbox keys
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-sandbox-private-key
```

### Test Scenarios

#### Approved Transaction
```
Name: John Doe
Email: test@example.com
Phone: 555-555-5555
DOB: 01/01/1990
SSN Last 4: 1234
```

#### Declined Transaction
```
Name: Jane Decline
Email: decline@example.com
Phone: 555-555-5556
DOB: 01/01/1990
SSN Last 4: 5678
```

#### Partial Approval
```
Name: Bob Partial
Email: partial@example.com
Phone: 555-555-5557
DOB: 01/01/1990
SSN Last 4: 9012
```

### Test API Calls

```bash
# Create checkout
curl -X POST https://your-domain.com/api/affirm/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 4890,
    "courseId": "barber-apprenticeship",
    "courseName": "Barber Apprenticeship",
    "userEmail": "test@example.com",
    "userName": "John Doe"
  }'

# Authorize transaction
curl -X POST https://your-domain.com/api/affirm/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "checkout_token": "ABC123",
    "action": "authorize"
  }'
```

---

## 📊 Transaction Lifecycle

### States

1. **Created** - Checkout session created
2. **Authorized** - Affirm approved, funds reserved
3. **Captured** - Funds transferred to merchant
4. **Voided** - Authorization cancelled (before capture)
5. **Refunded** - Funds returned to customer (after capture)

### State Transitions

```
Created
  ↓
Authorized (can void)
  ↓
Captured (can refund)
  ↓
Refunded (final)
```

### Best Practices

**Authorize vs Capture:**
- **Authorize:** Reserve funds, don't charge yet
- **Capture:** Actually charge the customer
- **Use Case:** Authorize on enrollment, capture when course starts

**Void vs Refund:**
- **Void:** Cancel before capture (no fees)
- **Refund:** Return money after capture (fees apply)
- **Use Case:** Void if student cancels before start, refund after

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

### PCI Compliance

- ✅ Affirm handles all sensitive data
- ✅ No credit card info stored
- ✅ No SSN stored
- ✅ Affirm is PCI DSS Level 1 compliant

### Data Protection

- ✅ HTTPS only
- ✅ Environment variables for keys
- ✅ No keys in client-side code
- ✅ Secure webhook verification

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Invalid API Key"
**Cause:** Wrong public/private key
**Fix:** Verify keys in Affirm dashboard

#### 2. "Checkout Token Expired"
**Cause:** Token older than 30 minutes
**Fix:** Create new checkout session

#### 3. "Transaction Already Captured"
**Cause:** Attempting to capture twice
**Fix:** Check transaction status first

#### 4. "Insufficient Funds"
**Cause:** Student's Affirm limit too low
**Fix:** Student needs to contact Affirm

### Debug Mode

```typescript
// Enable detailed logging
logger.info('Affirm checkout created:', {
  checkout_token: data.checkout_token,
  user_id: user.id,
  course_id: courseId,
});
```

### Check Transaction Status

```bash
curl -X GET "https://your-domain.com/api/affirm/transactions?transaction_id=TXID-ABC123"
```

---

## 📈 Analytics & Reporting

### Key Metrics

**Approval Rate:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'authorized') * 100.0 / COUNT(*) as approval_rate
FROM affirm_transactions
WHERE created_at > NOW() - INTERVAL '30 days';
```

**Average Order Value:**
```sql
SELECT AVG(amount) / 100 as avg_order_value
FROM affirm_transactions
WHERE status = 'captured';
```

**Conversion Rate:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'captured') * 100.0 / 
  COUNT(*) FILTER (WHERE status = 'authorized') as conversion_rate
FROM affirm_transactions;
```

### Affirm Dashboard

Access detailed reports:
- Transaction history
- Approval rates
- Customer demographics
- Payment schedules
- Refund tracking

---

## 🚀 Integration Checklist

### Setup
- [ ] Create Affirm merchant account
- [ ] Get API keys (public + private)
- [ ] Add keys to environment variables
- [ ] Configure redirect URLs
- [ ] Test in sandbox mode

### Implementation
- [ ] Enable Affirm in Stripe Checkout
- [ ] Create direct API endpoints (optional)
- [ ] Build confirmation page
- [ ] Build cancel page
- [ ] Add error handling

### Testing
- [ ] Test approved transaction
- [ ] Test declined transaction
- [ ] Test partial approval
- [ ] Test void transaction
- [ ] Test refund transaction

### Production
- [ ] Switch to production keys
- [ ] Update redirect URLs
- [ ] Monitor first transactions
- [ ] Set up alerts
- [ ] Train support staff

---

## 📚 Related Documentation

- [Affirm API Docs](https://docs.affirm.com/)
- [Stripe + Affirm Guide](https://stripe.com/docs/payments/affirm)
- `STRIPE_PAYMENT_FLOW_COMPLETE.md` - Stripe integration
- `AI_INSTRUCTOR_IMPLEMENTATION_COMPLETE.md` - AI instructor system

---

## 🎯 Next Steps

### Immediate
1. ✅ Verify Affirm keys configured
2. ✅ Test checkout flow end-to-end
3. ✅ Confirm enrollment activation works
4. ✅ Monitor first real transactions

### Short Term
1. **Add Affirm Branding**
   - Logo on payment page
   - "As low as $X/month" messaging
   - Payment calculator widget

2. **Enhanced Analytics**
   - Track approval rates by program
   - Monitor average financing terms
   - Analyze conversion by payment method

3. **Customer Support**
   - FAQ about Affirm
   - Payment schedule emails
   - Reminder notifications

### Long Term
1. **Optimize Approval Rates**
   - A/B test messaging
   - Adjust price points
   - Offer alternative terms

2. **Advanced Features**
   - Pre-qualification widget
   - Dynamic pricing based on terms
   - Loyalty rewards for on-time payments

---

**Status:** Production Ready ✅
**Last Updated:** December 14, 2024
**Financing Options:** 3, 6, 12 months
**Integration Method:** Stripe + Direct API
