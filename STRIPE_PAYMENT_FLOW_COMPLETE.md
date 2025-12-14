# Stripe Payment Flow - Complete Documentation

## Overview
Complete Stripe payment integration supporting multiple payment methods, funding sources, and automatic enrollment with AI instructor assignment.

---

## 🎯 Payment Methods Supported

### Consumer Payment Methods
1. **Credit/Debit Cards** - Visa, Mastercard, Amex, Discover
2. **Affirm** - 3, 6, 12 month financing
3. **Klarna** - 4 payments, up to $1,000
4. **Afterpay/Clearpay** - 4 payments, up to $1,000
5. **Zip** - 4 payments, up to $1,000
6. **PayPal** - Full payment or PayPal Credit
7. **Venmo** - Up to $5,000
8. **Cash App Pay** - Up to $7,500
9. **US Bank Account** - ACH Direct Debit (lowest fees)
10. **Stripe Link** - One-click checkout

### Sponsor/Funding Payment Methods
- **WIOA** (Workforce Innovation and Opportunity Act)
- **WRG** (Workforce Ready Grant)
- **JRI** (Justice Reinvestment Initiative)
- **OJT** (On-the-Job Training)
- **WEX** (Work Experience)
- **Custom Sponsors**

---

## 📋 Payment Flow Types

### 1. Student Self-Pay Flow
**Endpoint:** `/api/create-checkout-session`
**Used by:** `/enroll/PayNowSection.tsx`

```typescript
// Request
POST /api/create-checkout-session
{
  "programName": "Barber Apprenticeship",
  "programSlug": "barber-apprenticeship",
  "price": 4890,
  "paymentType": "full" // or "plan"
}

// Response
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

**Features:**
- ✅ All 10 payment methods enabled
- ✅ One-time payment or 4-month plan
- ✅ Automatic eligibility detection
- ✅ Mobile-optimized checkout
- ✅ Success/cancel redirects

### 2. Sponsor-Paid Flow (WIOA/WRG/etc.)
**Endpoint:** `/api/funding/create-checkout`
**Used by:** Admin enrollment tools

```typescript
// Request
POST /api/funding/create-checkout
{
  "studentId": "uuid",
  "programId": "uuid",
  "programSlug": "barber-apprenticeship",
  "fundingSource": "WIOA"
}

// Response
{
  "ok": true,
  "url": "https://checkout.stripe.com/c/pay/cs_test_...",
  "sessionId": "cs_test_..."
}
```

**Features:**
- ✅ Sponsor email receives invoice
- ✅ Student metadata attached
- ✅ Audit trail in `funding_payments` table
- ✅ Automatic enrollment on payment
- ✅ AI instructor auto-assignment

---

## 🔄 Complete Payment Flow

### Student Self-Pay Journey

```
1. Student visits /enroll
   ↓
2. Selects program from dropdown
   ↓
3. Clicks "Pay Now" button
   ↓
4. POST /api/create-checkout-session
   ↓
5. Stripe creates checkout session
   ↓
6. Student redirected to Stripe Checkout
   ↓
7. Student chooses payment method
   - Card, Affirm, Klarna, etc.
   ↓
8. Payment processed by Stripe
   ↓
9. Stripe sends webhook: checkout.session.completed
   ↓
10. Webhook handler processes:
    - Creates/activates enrollment
    - Assigns AI instructor
    - Triggers Milady enrollment (if barber)
   ↓
11. Student redirected to success page
   ↓
12. Student sees dashboard with:
    - Active enrollment
    - AI instructor card
    - Milady courses (if applicable)
```

### Sponsor-Paid Journey

```
1. Admin/Case Manager initiates enrollment
   ↓
2. Selects student + program
   ↓
3. POST /api/funding/create-checkout
   ↓
4. Creates funding_payments record (status: created)
   ↓
5. Stripe creates checkout session
   - Customer email: sponsor finance dept
   - Metadata: student info
   ↓
6. Sponsor receives payment link
   ↓
7. Sponsor completes payment
   ↓
8. Stripe sends webhook: checkout.session.completed
   ↓
9. Webhook handler processes:
    - Updates funding_payments (status: paid)
    - Creates/activates enrollment
    - Assigns AI instructor
    - Triggers Milady enrollment (if barber)
   ↓
10. Student notified of enrollment
   ↓
11. Student accesses dashboard
```

---

## 🔧 Webhook Processing

### Endpoint
`/api/stripe/webhook`

### Events Handled

#### 1. `checkout.session.completed`
**Triggers:** Automatic enrollment flow

```typescript
// Metadata required
{
  student_id: "uuid",
  program_id: "uuid", 
  program_slug: "barber-apprenticeship",
  funding_source: "WIOA" // optional
}
```

**Processing Steps:**
1. ✅ Validate webhook signature
2. ✅ Extract metadata
3. ✅ Update funding_payments (if sponsor-paid)
4. ✅ Create/activate enrollment
5. ✅ **Assign AI instructor** (NEW)
6. ✅ Trigger Milady enrollment (if barber)
7. ✅ Log all actions

#### 2. `customer.subscription.*`
**Triggers:** Subscription management (payment plans)

Events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**Processing:**
- Updates user access tier
- Manages subscription status
- Handles cancellations

---

## 💾 Database Schema

### `funding_payments` Table
```sql
CREATE TABLE funding_payments (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES profiles(id),
  program_id UUID REFERENCES programs(id),
  funding_source TEXT DEFAULT 'WIOA',
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'created', -- created, paid, failed
  amount NUMERIC(10, 2),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes:**
- `student_id` - Fast student lookup
- `program_id` - Program payment tracking
- `status` - Payment status queries
- `stripe_checkout_session_id` - Webhook processing

**RLS Policies:**
- Students can view their own payments
- Service role can manage all payments

### `enrollments` Table
```sql
-- Relevant columns
status TEXT, -- active, completed, withdrawn, paused
payment_status TEXT, -- paid, pending, waived
enrolled_at TIMESTAMPTZ,
source TEXT -- application, case_manager, employer, self_enroll
```

---

## 🔐 Security Features

### Webhook Signature Verification
```typescript
const sig = req.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(
  body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

**Prevents:**
- Replay attacks
- Unauthorized webhook calls
- Data tampering

### Environment Variables
```bash
# Required
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Optional
STRIPE_PRICE_STUDENT=price_...
STRIPE_PRICE_CAREER=price_...
SPONSOR_FINANCE_EMAIL=accounting@elevateforhumanity.org
```

### RLS Policies
- Students can only view their own payments
- Enrollments scoped to user
- Service role for webhook processing

---

## 🧪 Testing

### Test Mode
```bash
# Use test keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

### Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

### Test Affirm
```
Approve: Use phone 555-555-5555
Decline: Use phone 555-555-5556
```

### Webhook Testing
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

---

## 📊 Payment Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Student/Sponsor                       │
│                  Initiates Payment                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Create Checkout Session                     │
│  • /api/create-checkout-session (student)                │
│  • /api/funding/create-checkout (sponsor)                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Stripe Checkout                         │
│  • Choose payment method                                 │
│  • Enter payment details                                 │
│  • Complete payment                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Stripe Webhook Fired                        │
│  Event: checkout.session.completed                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│            Webhook Handler Processing                    │
│  1. Verify signature                                     │
│  2. Update funding_payments (if sponsor)                 │
│  3. Create/activate enrollment                           │
│  4. Assign AI instructor ← NEW                           │
│  5. Trigger Milady enrollment (if barber)                │
│  6. Log all actions                                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                Student Dashboard                         │
│  • Active enrollment visible                             │
│  • AI instructor card shown                              │
│  • Milady courses accessible                             │
│  • Chat with AI instructor                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Integration Points

### 1. Enrollment System
**File:** `app/api/stripe/webhook/route.ts`

```typescript
// Create/activate enrollment
await supabase.from('enrollments').insert({
  student_id: studentId,
  program_id: programId,
  status: 'active',
  payment_status: 'paid',
  enrolled_at: new Date().toISOString(),
});
```

### 2. AI Instructor Assignment
**File:** `lib/ai/assign.ts`

```typescript
// Auto-assign instructor
const { assignAIInstructorForProgram } = await import('@/lib/ai/assign');
const result = await assignAIInstructorForProgram({
  studentId,
  programSlug,
});
```

### 3. Milady Enrollment
**Endpoint:** `/api/milady/auto-enroll`

```typescript
// Trigger Milady enrollment
await fetch('/api/milady/auto-enroll', {
  method: 'POST',
  body: JSON.stringify({ studentId, programId }),
});
```

---

## 📈 Monitoring & Analytics

### Key Metrics to Track

**Payment Success Rate:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'paid') * 100.0 / COUNT(*) as success_rate
FROM funding_payments
WHERE created_at > NOW() - INTERVAL '30 days';
```

**Popular Payment Methods:**
```sql
-- Track via Stripe Dashboard
-- Checkout Sessions → Payment Methods
```

**Enrollment Conversion:**
```sql
SELECT 
  COUNT(DISTINCT e.student_id) * 100.0 / COUNT(DISTINCT fp.student_id) as conversion_rate
FROM funding_payments fp
LEFT JOIN enrollments e ON e.student_id = fp.student_id
WHERE fp.status = 'paid';
```

**AI Instructor Assignment Rate:**
```sql
SELECT 
  COUNT(DISTINCT a.student_id) * 100.0 / COUNT(DISTINCT e.student_id) as assignment_rate
FROM enrollments e
LEFT JOIN ai_instructor_assignments a ON a.student_id = e.student_id
WHERE e.status = 'active';
```

---

## 🐛 Troubleshooting

### Payment Not Processing
**Check:**
1. Stripe keys configured correctly
2. Webhook endpoint accessible
3. Webhook secret matches
4. Metadata included in session

**Debug:**
```bash
# Check Stripe logs
stripe logs tail

# Check webhook deliveries
# Stripe Dashboard → Developers → Webhooks
```

### Enrollment Not Created
**Check:**
1. Webhook received successfully
2. Metadata contains student_id + program_id
3. Database connection working
4. RLS policies allow insertion

**Query:**
```sql
-- Check funding payment
SELECT * FROM funding_payments 
WHERE stripe_checkout_session_id = 'cs_test_...';

-- Check enrollment
SELECT * FROM enrollments 
WHERE student_id = 'uuid';
```

### AI Instructor Not Assigned
**Check:**
1. Instructor exists for program
2. Program slug matches exactly
3. Assignment function executed
4. No database errors

**Query:**
```sql
-- Check instructor
SELECT * FROM ai_instructors 
WHERE program_slug = 'barber-apprenticeship' 
AND is_active = true;

-- Check assignment
SELECT * FROM ai_instructor_assignments 
WHERE student_id = 'uuid';
```

---

## 🔄 Webhook Retry Logic

Stripe automatically retries failed webhooks:
- Immediate retry
- 1 hour later
- 3 hours later
- 6 hours later
- 12 hours later
- 24 hours later

**Idempotency:**
- Check if enrollment exists before creating
- Use `maybeSingle()` for lookups
- Update instead of insert when possible

---

## 💰 Pricing Configuration

### Program Pricing
```typescript
const PROGRAMS = [
  { id: 'barber', price: 4890 },
  { id: 'dsp', price: 4325 },
  { id: 'hvac', price: 5000 },
  { id: 'cpr', price: 575 },
  // ...
];
```

### Payment Plans
```typescript
// 4-month installment
const monthlyAmount = Math.ceil(price / 4);

// Create subscription
mode: 'subscription',
recurring: { interval: 'month' }
```

### Sponsor Pricing
```typescript
// Use program.total_cost or default
const amount = program.total_cost 
  ? Math.round(Number(program.total_cost) * 100)
  : 29500; // $295 default for Milady RISE
```

---

## 📝 Success/Cancel URLs

### Success URL
```
/enroll/success?session_id={CHECKOUT_SESSION_ID}&program={programSlug}
```

**Page shows:**
- ✅ Payment confirmation
- 📧 Check email message
- 🎓 Next steps
- 🔗 Dashboard link

### Cancel URL
```
/enroll or /micro-classes
```

**Page shows:**
- ℹ️ Payment cancelled message
- 🔄 Try again button
- 📞 Contact support info

---

## 🎯 Next Steps

### Immediate
1. ✅ Verify webhook endpoint configured in Stripe
2. ✅ Test payment flow end-to-end
3. ✅ Confirm AI instructor assignment works
4. ✅ Monitor first real payments

### Short Term
1. **Add Payment Analytics Dashboard**
   - Success rates
   - Popular payment methods
   - Revenue tracking

2. **Enhance Error Handling**
   - Better error messages
   - Retry logic for failed operations
   - Admin notifications

3. **Add Payment Receipts**
   - Email receipts
   - PDF invoices
   - Payment history page

### Long Term
1. **Subscription Management**
   - Student portal for subscriptions
   - Pause/resume functionality
   - Upgrade/downgrade options

2. **Advanced Reporting**
   - Revenue by program
   - Payment method analysis
   - Sponsor payment tracking

3. **International Payments**
   - Multi-currency support
   - Local payment methods
   - Tax handling

---

## 📚 Related Documentation

- `AI_INSTRUCTOR_IMPLEMENTATION_COMPLETE.md` - AI instructor system
- `AUTOPILOT_ENROLLMENT_TEST_GUIDE.md` - Testing guide
- `STRIPE_SETUP_SIMPLE.md` - Initial Stripe setup

---

## 🔗 External Resources

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Payment Methods](https://stripe.com/docs/payments/payment-methods)
- [Testing Guide](https://stripe.com/docs/testing)

---

**Status:** Production Ready ✅
**Last Updated:** December 14, 2024
**Payment Methods:** 10+ supported
**Auto-Enrollment:** Active with AI instructor assignment
