# Affirm to Stripe Balance - Simplest Setup

## TL;DR: Use Stripe Balance (Recommended)

### Why It's Easier

| Feature | Stripe Balance | Separate Account |
|---------|---------------|------------------|
| **Setup Time** | ✅ 0 minutes (already done) | ❌ 1-2 hours |
| **Configuration** | ✅ None needed | ❌ Connect account setup |
| **Code Changes** | ✅ None needed | ❌ Transfer API integration |
| **Fees** | ✅ Just Affirm fees (~5%) | ❌ Affirm + Transfer fees (~5.25%) |
| **Accounting** | ✅ Simple | ⚠️ More complex |
| **Payout Control** | ✅ You control schedule | ⚠️ Split between accounts |

---

## Current Setup (Already Working)

### What Happens Now

```
1. Student pays Affirm: $4,890
         ↓
2. Affirm pays Stripe: $4,890
   Affirm fee (5%): -$245
   Net to Stripe: $4,645
         ↓
3. Stripe Balance: $4,645
         ↓
4. You pay vendor separately: -$295 (Milady)
         ↓
5. Remaining in Stripe: $4,350
         ↓
6. Stripe pays out to YOUR bank account
   (on your schedule: daily/weekly/monthly)
```

### What You Need to Do

**NOTHING!** It already works this way.

---

## How to Manage It

### View Stripe Balance

1. **Go to Stripe Dashboard**
   ```
   https://dashboard.stripe.com/balance
   ```

2. **See Your Balance**
   ```
   Available: $4,350
   Pending: $0
   Total: $4,350
   ```

3. **View Transactions**
   - All Affirm payments show up here
   - Filter by payment method: "Affirm"
   - Export for accounting

### Set Payout Schedule

1. **Go to Settings**
   ```
   https://dashboard.stripe.com/settings/payouts
   ```

2. **Choose Schedule**
   - **Daily** - Funds arrive next business day (recommended)
   - **Weekly** - Funds arrive weekly
   - **Monthly** - Funds arrive monthly
   - **Manual** - You trigger payouts when ready

3. **Set Bank Account**
   - Add your bank account
   - Verify with micro-deposits
   - All payouts go here automatically

---

## Vendor Payment (Milady)

### Option 1: Pay Milady Separately (Simplest)

**How it works:**
1. Affirm pays you $4,890
2. You keep $4,890 in Stripe balance
3. Milady bills you monthly/quarterly
4. You pay Milady invoice from bank account

**Advantages:**
- ✅ No additional setup
- ✅ Simple accounting
- ✅ You control timing
- ✅ Milady gets paid their way

**Implementation:**
```typescript
// No code changes needed!
// Just track in database:

await supabase.from('payment_splits').insert({
  enrollment_id,
  total_amount: 4890,
  vendor_name: 'milady',
  vendor_amount: 295,
  elevate_amount: 4595,
  payment_method: 'affirm',
  // Note: vendor_paid_at stays NULL until you pay invoice
});
```

### Option 2: Auto-trigger Milady Enrollment (Current)

**How it works:**
1. Affirm pays you $4,890
2. System triggers Milady API
3. Student gets Milady access immediately
4. Milady bills you later

**Advantages:**
- ✅ Instant student access
- ✅ Automated enrollment
- ✅ No manual work

**Implementation:**
```typescript
// Already implemented in:
// /app/api/milady/auto-enroll

// Triggered automatically after payment
await fetch('/api/milady/auto-enroll', {
  method: 'POST',
  body: JSON.stringify({
    studentId,
    programId,
  }),
});
```

---

## Complete Flow (Recommended)

### Step-by-Step

```
1. Student visits /enroll
   Selects: Barber Apprenticeship ($4,890)
         ↓
2. Student clicks "Pay with Affirm"
   Affirm approves: $4,890 (12 months × $407.50)
         ↓
3. Affirm pays Stripe: $4,890
   Affirm fee: -$245
   Stripe receives: $4,645
         ↓
4. System creates enrollment
   Status: active
   Payment: paid
         ↓
5. System assigns AI instructor
   Student gets: Elizabeth Greene AI
         ↓
6. System triggers Milady enrollment
   Student gets: Milady RISE access
         ↓
7. System records payment split
   Total: $4,890
   Vendor (Milady): $295
   Elevate: $4,595
         ↓
8. Stripe balance: $4,645
   Available for payout
         ↓
9. Stripe pays out to bank
   Schedule: Daily (next business day)
   Amount: $4,645
         ↓
10. You pay Milady invoice
    When: Monthly/Quarterly
    Amount: $295 per student
    Method: Check/ACH/Card
```

---

## Accounting Made Simple

### Track in Database

```sql
-- View all payment splits
SELECT 
  ps.total_amount as student_paid,
  ps.vendor_amount as milady_cost,
  ps.elevate_amount as our_revenue,
  ps.payment_method,
  ps.created_at,
  p.name as program_name,
  u.email as student_email
FROM payment_splits ps
JOIN enrollments e ON e.id = ps.enrollment_id
JOIN programs p ON p.id = e.program_id
JOIN auth.users u ON u.id = e.user_id
WHERE ps.payment_method = 'affirm'
ORDER BY ps.created_at DESC;
```

### Monthly Report

```sql
-- Revenue summary for the month
SELECT 
  COUNT(*) as enrollments,
  SUM(total_amount) as total_revenue,
  SUM(vendor_amount) as vendor_costs,
  SUM(elevate_amount) as net_revenue,
  payment_method
FROM payment_splits
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY payment_method;
```

### Example Output

```
enrollments | total_revenue | vendor_costs | net_revenue | payment_method
------------|---------------|--------------|-------------|---------------
10          | $48,900       | $2,950       | $45,950     | affirm
15          | $73,350       | $4,425       | $68,925     | stripe
```

---

## What You DON'T Need

### ❌ Stripe Connect
- No connected accounts
- No transfer API
- No additional fees
- No complex setup

### ❌ Separate Stripe Account
- No second account
- No manual transfers
- No split dashboards
- No reconciliation headaches

### ❌ Code Changes
- No API updates
- No transfer logic
- No webhook changes
- Already working!

---

## What You DO Need

### ✅ Current Setup (Already Done)
1. Affirm API keys configured
2. Payment button integrated
3. Enrollment creation working
4. AI instructor assignment working
5. Milady auto-enrollment working

### ✅ Database Tracking (Add This)
```bash
# Run migration
psql $DATABASE_URL -f supabase/migrations/20251214_payment_splits.sql

# This adds payment_splits table to track:
# - Total amount student paid
# - Vendor cost (Milady)
# - Your revenue (remaining)
```

### ✅ Stripe Dashboard Access
```
https://dashboard.stripe.com
- View balance
- See transactions
- Export reports
- Manage payouts
```

---

## Comparison: Simple vs Complex

### Simple (Stripe Balance) ✅

**Setup:**
- Time: 0 minutes
- Code: 0 changes
- Config: 0 variables

**Flow:**
```
Affirm → Stripe Balance → Your Bank
```

**Fees:**
- Affirm: 5% ($245)
- Total: $245

**Net Revenue:**
- Receive: $4,645
- Pay Milady: $295
- Keep: $4,350

### Complex (Separate Account) ❌

**Setup:**
- Time: 1-2 hours
- Code: 50+ lines
- Config: 3+ variables

**Flow:**
```
Affirm → Stripe Main → Transfer → Separate Account → Bank
```

**Fees:**
- Affirm: 5% ($245)
- Transfer: 0.25% + $0.25 ($12)
- Total: $257

**Net Revenue:**
- Receive: $4,633
- Pay Milady: $295
- Keep: $4,338

**Difference:** You LOSE $12 per transaction!

---

## Recommendation

### Use Stripe Balance (Current Setup)

**Why:**
1. ✅ **Already working** - No changes needed
2. ✅ **Simpler** - One account, one dashboard
3. ✅ **Cheaper** - No transfer fees
4. ✅ **Faster** - No additional setup
5. ✅ **Cleaner** - Easier accounting

**What to do:**
1. Run payment_splits migration (5 minutes)
2. Test Affirm payment (10 minutes)
3. Verify Stripe balance increases
4. Set payout schedule
5. Done!

---

## Final Answer

### Do You Need Separate Account?

**NO!** Unless you have a specific reason like:
- Legal requirement for separate funds
- Different business entity
- Investor/partner requiring separate accounting
- Tax optimization strategy

### What's Easiest?

**Stripe Balance** (current setup)
- ✅ Zero setup time
- ✅ Zero code changes
- ✅ Zero additional fees
- ✅ Already implemented

---

## Next Steps

### 1. Run Migration (5 minutes)
```bash
psql $DATABASE_URL -f supabase/migrations/20251214_payment_splits.sql
```

### 2. Test Payment (10 minutes)
```bash
# Visit enrollment page
http://localhost:3000/enroll

# Pay with Affirm
# Use test credentials
```

### 3. Check Stripe Balance
```
https://dashboard.stripe.com/balance
```

### 4. Set Payout Schedule
```
https://dashboard.stripe.com/settings/payouts
Recommended: Daily
```

### 5. Done! 🎉

---

**Recommendation:** ✅ Use Stripe Balance
**Setup Time:** 15 minutes
**Code Changes:** None
**Additional Fees:** None
**Complexity:** Minimal
**Status:** Ready to use!
