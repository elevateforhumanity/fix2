# Affirm Payment Testing Guide

## Overview
Complete guide for testing Affirm payment integration including automated tests and manual verification.

---

## 🚀 Quick Start

### Run Automated Test
```bash
# Load environment variables
source .env.local

# Run test script
npm run test:affirm
```

**Expected Output:**
```
🧪 Affirm Payment Test
=====================================

📋 Configuration:
   Supabase URL: https://your-project.supabase.co
   Affirm Public Key: aGax1GLWFexjLyW7PC...
   Site URL: http://localhost:3000

📝 Step 1: Create Affirm Checkout Session
-------------------------------------------
   Creating checkout session...
   Amount: $48.90
   Course: Barber Apprenticeship

✅ Checkout session created successfully!
   Checkout Token: ABC123XYZ...
   Redirect URL: https://sandbox.affirm.com/checkout/ABC123XYZ

📝 Step 2: Test Authorization (Simulated)
-------------------------------------------
   ⚠️  Authorization requires customer approval
   ⚠️  This is expected in test mode

📝 Step 3: Test Stripe + Affirm Integration
-------------------------------------------
✅ Stripe checkout session created!
   Checkout URL: https://checkout.stripe.com/c/pay/cs_test_...
   ℹ️  Affirm is enabled as a payment method

📝 Step 4: Check Database Configuration
-------------------------------------------
✅ Program found in database
   ID: uuid-here
   Name: Barber Apprenticeship

✅ Enrollments table accessible

=====================================
📊 Test Summary
=====================================

Direct Affirm Checkout:
   ✅ PASSED
   Checkout URL: https://sandbox.affirm.com/checkout/...

Affirm Authorization:
   ⚠️ EXPECTED (requires customer approval)

Stripe + Affirm Integration:
   ✅ PASSED
   Checkout URL: https://checkout.stripe.com/...

Database Configuration:
   ✅ PASSED

🎉 All tests passed! Affirm integration is ready.
```

---

## 📋 Prerequisites

### 1. Environment Variables
Ensure `.env.local` contains:
```bash
# Affirm Keys (Sandbox)
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-sandbox-private-key-here
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI

# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Get Affirm Sandbox Keys
1. Go to [affirm.com/business](https://affirm.com/business)
2. Sign up for sandbox account
3. Dashboard → Settings → API Keys
4. Copy sandbox keys to `.env.local`

### 3. Start Development Server
```bash
npm run dev
```

---

## 🧪 Test Scenarios

### Scenario 1: Direct Affirm API Test
**Tests:** Direct integration with Affirm API

**Steps:**
1. Run: `npm run test:affirm`
2. Script creates checkout session
3. Returns checkout URL
4. Verifies API connectivity

**Expected Result:**
- ✅ Checkout session created
- ✅ Checkout token returned
- ✅ Redirect URL generated

### Scenario 2: Stripe + Affirm Integration Test
**Tests:** Affirm as payment method in Stripe Checkout

**Steps:**
1. Run: `npm run test:affirm`
2. Script calls Stripe checkout API
3. Verifies Affirm is enabled
4. Returns Stripe checkout URL

**Expected Result:**
- ✅ Stripe session created
- ✅ Affirm included in payment methods
- ✅ Checkout URL generated

### Scenario 3: Manual Payment Flow Test
**Tests:** Complete end-to-end payment flow

**Steps:**
1. Visit: `http://localhost:3000/enroll`
2. Select "Barber Apprenticeship"
3. Click "Pay Now"
4. Select "Affirm" payment method
5. Complete Affirm approval
6. Verify enrollment created

**Expected Result:**
- ✅ Redirected to Affirm
- ✅ Approval process works
- ✅ Redirected back to site
- ✅ Enrollment activated
- ✅ AI instructor assigned

---

## 🎭 Test Credentials

### Affirm Sandbox Test Data

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

### Stripe Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

---

## 🔍 Manual Testing Steps

### Test 1: Create Checkout Session

**Via API:**
```bash
curl -X POST http://localhost:3000/api/affirm/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 4890,
    "courseId": "barber-apprenticeship",
    "courseName": "Barber Apprenticeship",
    "userEmail": "test@example.com",
    "userName": "John Doe"
  }'
```

**Expected Response:**
```json
{
  "checkout_token": "ABC123XYZ...",
  "redirect_url": "https://sandbox.affirm.com/checkout/ABC123XYZ"
}
```

### Test 2: Complete Payment Flow

**Step-by-Step:**

1. **Start Payment**
   ```
   Visit: http://localhost:3000/enroll
   Select: Barber Apprenticeship ($4,890)
   Click: Pay Now
   ```

2. **Stripe Checkout**
   ```
   Redirected to: Stripe Checkout
   Payment methods shown:
   - Credit Card
   - Affirm ✓
   - Klarna
   - Afterpay
   - etc.
   ```

3. **Select Affirm**
   ```
   Click: Affirm
   Redirected to: Affirm approval page
   ```

4. **Affirm Approval**
   ```
   Enter test credentials (see above)
   Monthly payment shown: $407.50 x 12
   Total: $4,890
   APR: 0%
   Click: Confirm
   ```

5. **Return to Site**
   ```
   Redirected to: /payment/affirm/confirm?checkout_token=...
   Status: Processing...
   Then: Success!
   ```

6. **Verify Enrollment**
   ```
   Check: Student dashboard
   Expected:
   - Active enrollment visible
   - AI instructor assigned
   - Milady courses accessible
   ```

### Test 3: Verify Database

**Check Enrollment:**
```sql
SELECT 
  e.id,
  e.status,
  e.payment_status,
  p.name as program_name,
  u.email
FROM enrollments e
JOIN programs p ON p.id = e.program_id
JOIN auth.users u ON u.id = e.user_id
WHERE u.email = 'test@example.com'
ORDER BY e.created_at DESC
LIMIT 1;
```

**Expected:**
```
status: active
payment_status: paid
program_name: Barber Apprenticeship
```

**Check AI Instructor Assignment:**
```sql
SELECT 
  a.id,
  a.status,
  i.name as instructor_name,
  a.assigned_at
FROM ai_instructor_assignments a
JOIN ai_instructors i ON i.id = a.instructor_id
JOIN auth.users u ON u.id = a.student_id
WHERE u.email = 'test@example.com'
ORDER BY a.assigned_at DESC
LIMIT 1;
```

**Expected:**
```
status: active
instructor_name: EFH Barber Program Instructor
```

---

## 🐛 Troubleshooting

### Issue: "Invalid API Key"
**Symptoms:**
```
❌ Affirm API Error: Invalid public key
```

**Solution:**
1. Verify `AFFIRM_PUBLIC_KEY` in `.env.local`
2. Check key matches Affirm dashboard
3. Ensure using sandbox key for testing
4. Restart dev server after changing keys

### Issue: "Checkout Token Expired"
**Symptoms:**
```
❌ Authorization failed: Token expired
```

**Solution:**
- Tokens expire after 30 minutes
- Create new checkout session
- Complete approval within 30 minutes

### Issue: "Transaction Already Captured"
**Symptoms:**
```
❌ Cannot capture: Already captured
```

**Solution:**
- Check transaction status first
- Use void instead of capture if not captured yet
- Each transaction can only be captured once

### Issue: "Enrollment Not Created"
**Symptoms:**
- Payment successful
- No enrollment in database

**Solution:**
1. Check webhook logs
2. Verify metadata in checkout session
3. Check Stripe webhook endpoint configured
4. Manually trigger webhook in Stripe dashboard

### Issue: "AI Instructor Not Assigned"
**Symptoms:**
- Enrollment created
- No AI instructor assigned

**Solution:**
1. Check instructor exists for program
2. Verify program slug matches exactly
3. Check webhook logs for assignment errors
4. Manually assign via admin panel

---

## 📊 Verification Checklist

### Pre-Test
- [ ] Environment variables configured
- [ ] Affirm sandbox keys obtained
- [ ] Stripe test mode enabled
- [ ] Development server running
- [ ] Database accessible

### During Test
- [ ] Checkout session created
- [ ] Redirect URL generated
- [ ] Affirm approval page loads
- [ ] Test credentials accepted
- [ ] Approval successful
- [ ] Redirected back to site

### Post-Test
- [ ] Enrollment created in database
- [ ] Status set to "active"
- [ ] Payment status set to "paid"
- [ ] AI instructor assigned
- [ ] Audit log entries created
- [ ] Student can access dashboard

---

## 📈 Success Metrics

### API Tests
- ✅ Checkout creation: < 2 seconds
- ✅ Authorization: < 3 seconds
- ✅ Stripe integration: < 2 seconds
- ✅ Database queries: < 500ms

### User Experience
- ✅ Redirect to Affirm: < 1 second
- ✅ Approval process: 2-3 minutes
- ✅ Return to site: < 1 second
- ✅ Enrollment activation: < 5 seconds

### Data Integrity
- ✅ 100% enrollment creation rate
- ✅ 100% AI instructor assignment rate
- ✅ 100% audit log coverage
- ✅ 0% duplicate enrollments

---

## 🔄 Continuous Testing

### Daily Tests
```bash
# Run automated test
npm run test:affirm

# Check for errors
# Verify all steps pass
```

### Weekly Tests
- Complete manual payment flow
- Test all payment methods
- Verify enrollment activation
- Check AI instructor assignment

### Monthly Tests
- Test with production keys (staging)
- Verify webhook handling
- Check refund process
- Test void transactions

---

## 📝 Test Report Template

```markdown
# Affirm Payment Test Report

**Date:** YYYY-MM-DD
**Tester:** Name
**Environment:** Sandbox/Production

## Test Results

### Automated Tests
- [ ] Checkout Creation: PASS/FAIL
- [ ] Stripe Integration: PASS/FAIL
- [ ] Database Check: PASS/FAIL

### Manual Tests
- [ ] Payment Flow: PASS/FAIL
- [ ] Enrollment Creation: PASS/FAIL
- [ ] AI Assignment: PASS/FAIL

## Issues Found
1. Issue description
2. Issue description

## Notes
- Additional observations
- Performance metrics
- Recommendations
```

---

## 🎯 Next Steps

### After Successful Testing

1. **Switch to Production**
   ```bash
   # Update .env.local with production keys
   AFFIRM_PUBLIC_KEY=your-production-public-key
   AFFIRM_PRIVATE_KEY=your-production-private-key
   ```

2. **Configure Webhooks**
   - Affirm Dashboard → Webhooks
   - Add production endpoint
   - Test webhook delivery

3. **Monitor First Transactions**
   - Watch approval rates
   - Check enrollment activation
   - Verify AI assignment
   - Monitor for errors

4. **Train Support Staff**
   - How Affirm works
   - Common issues
   - Refund process
   - Customer support

---

## 📚 Related Documentation

- `AFFIRM_PAYMENT_FLOW_COMPLETE.md` - Complete integration guide
- `STRIPE_PAYMENT_FLOW_COMPLETE.md` - Stripe integration
- `AI_INSTRUCTOR_IMPLEMENTATION_COMPLETE.md` - AI instructor system

---

**Status:** Ready for Testing ✅
**Last Updated:** December 14, 2024
**Test Script:** `npm run test:affirm`
**Support:** See troubleshooting section above
