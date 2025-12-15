# Affirm Payment to Separate Stripe Account

## Overview
Split Affirm payments so the remaining balance goes to a **separate Stripe account** instead of the main account.

---

## Option 1: Stripe Connect (Recommended)

### How It Works
```
Student pays Affirm: $4,890
         ↓
Affirm pays Main Stripe Account: $4,890
         ↓
Automatic Split:
  → Vendor (Milady): $295
  → Connected Account (Separate): $4,595
```

### Setup Steps

#### Step 1: Create Stripe Connect Account

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/connect/accounts

2. **Click "Create Account"**
   - Account type: Express or Custom
   - Business name: Elevate for Humanity Operations
   - Email: operations@elevateforhumanity.org

3. **Complete Onboarding**
   - Business details
   - Bank account (separate from main account)
   - Tax information

4. **Get Account ID**
   - Format: `acct_xxxxxxxxxxxxx`
   - Save this for configuration

#### Step 2: Configure Environment Variables

```bash
# .env.local

# Main Stripe Account
STRIPE_SECRET_KEY=sk_live_main_account
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_main_account

# Connected Account (for remaining balance)
STRIPE_CONNECTED_ACCOUNT_ID=acct_xxxxxxxxxxxxx

# Affirm Keys
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=19LMXS807MPAI4C2
```

#### Step 3: Update Payment Split API

```typescript
// app/api/payments/split/route.ts

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const CONNECTED_ACCOUNT_ID = process.env.STRIPE_CONNECTED_ACCOUNT_ID;

export async function POST(request: NextRequest) {
  // ... existing code ...

  // After vendor payment, transfer remaining to connected account
  if (elevateAmount > 0 && CONNECTED_ACCOUNT_ID) {
    try {
      // Transfer remaining balance to separate account
      const transfer = await stripe.transfers.create({
        amount: Math.round(elevateAmount * 100), // Convert to cents
        currency: 'usd',
        destination: CONNECTED_ACCOUNT_ID,
        description: `Enrollment balance for ${enrollment.programs.name}`,
        metadata: {
          enrollment_id: enrollment_id,
          student_id: enrollment.user_id,
          program_slug: enrollment.programs.slug,
          total_amount: total_amount,
          vendor_amount: vendorAmount,
        },
      });

      // Update payment split with transfer ID
      await supabase
        .from('payment_splits')
        .update({
          stripe_transfer_id: transfer.id,
          transferred_at: new Date().toISOString(),
        })
        .eq('id', split.id);

      console.log(`✅ Transferred $${elevateAmount} to connected account`);
    } catch (error) {
      console.error('Transfer to connected account failed:', error);
      // Don't throw - enrollment should still succeed
    }
  }

  return NextResponse.json({
    success: true,
    split: {
      total: total_amount,
      vendor: vendorAmount,
      elevate: elevateAmount,
      transferred_to_separate_account: !!CONNECTED_ACCOUNT_ID,
    },
  });
}
```

#### Step 4: Update Database Schema

```sql
-- Add transfer tracking columns
ALTER TABLE payment_splits 
ADD COLUMN IF NOT EXISTS stripe_transfer_id TEXT,
ADD COLUMN IF NOT EXISTS transferred_at TIMESTAMPTZ;

-- Index for transfers
CREATE INDEX IF NOT EXISTS idx_payment_splits_transfer 
  ON payment_splits(stripe_transfer_id);

-- Comment
COMMENT ON COLUMN payment_splits.stripe_transfer_id IS 'Stripe transfer ID to connected account';
COMMENT ON COLUMN payment_splits.transferred_at IS 'When funds were transferred to separate account';
```

---

## Option 2: Separate Stripe Account (Manual)

### How It Works
```
Student pays Affirm: $4,890
         ↓
Affirm pays Account A: $4,890
         ↓
Manual Split:
  → Vendor (Milady): $295 (from Account A)
  → Account B: $4,595 (manual transfer)
```

### Setup Steps

#### Step 1: Create Second Stripe Account

1. **Sign up at Stripe.com**
   - Use different email: operations@elevateforhumanity.org
   - Business name: Elevate for Humanity Operations
   - Different bank account

2. **Get API Keys**
   - Dashboard → Developers → API Keys
   - Save keys separately

#### Step 2: Configure Both Accounts

```bash
# .env.local

# Account A (Main - receives Affirm payments)
STRIPE_SECRET_KEY_MAIN=sk_live_account_a
STRIPE_PUBLISHABLE_KEY_MAIN=pk_live_account_a

# Account B (Operations - receives remaining balance)
STRIPE_SECRET_KEY_OPS=sk_live_account_b
STRIPE_PUBLISHABLE_KEY_OPS=pk_live_account_b

# Affirm
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=19LMXS807MPAI4C2
```

#### Step 3: Manual Transfer Process

```typescript
// app/api/payments/transfer-to-ops/route.ts

import Stripe from 'stripe';

const stripeMain = new Stripe(process.env.STRIPE_SECRET_KEY_MAIN!);
const stripeOps = new Stripe(process.env.STRIPE_SECRET_KEY_OPS!);

export async function POST(request: NextRequest) {
  const { enrollment_id, amount } = await request.json();

  try {
    // 1. Create payout from Account A
    const payout = await stripeMain.payouts.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: `Transfer to operations account`,
      metadata: { enrollment_id },
    });

    // 2. Record transfer
    // You'll need to manually move funds between bank accounts
    // Or use Stripe Treasury for automated transfers

    return NextResponse.json({
      success: true,
      payout_id: payout.id,
      amount,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## Option 3: Stripe Treasury (Advanced)

### How It Works
```
Student pays Affirm: $4,890
         ↓
Affirm pays Stripe: $4,890
         ↓
Automatic Split via Treasury:
  → Financial Account A (Vendor): $295
  → Financial Account B (Operations): $4,595
```

### Requirements
- Stripe Treasury enabled
- Multiple financial accounts
- More complex setup

### Setup
Contact Stripe support to enable Treasury:
- https://stripe.com/treasury
- Requires business verification
- May have minimum volume requirements

---

## Comparison

| Method | Complexity | Cost | Speed | Recommended |
|--------|-----------|------|-------|-------------|
| **Stripe Connect** | Medium | 0.25% + $0.25 per transfer | Instant | ✅ Yes |
| **Separate Accounts** | Low | Standard Stripe fees | Manual | ⚠️ If needed |
| **Stripe Treasury** | High | Custom pricing | Instant | 💰 Enterprise |

---

## Recommended: Stripe Connect

### Why?
- ✅ Automatic transfers
- ✅ Instant settlement
- ✅ Single dashboard view
- ✅ Easy accounting
- ✅ Low fees (0.25%)

### Implementation

```typescript
// Complete implementation with Stripe Connect

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const CONNECTED_ACCOUNT = process.env.STRIPE_CONNECTED_ACCOUNT_ID;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { enrollment_id, total_amount, payment_method } = await request.json();

  // Get enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*, programs(*)')
    .eq('id', enrollment_id)
    .single();

  // Calculate split
  const vendorAmount = 295; // Milady
  const elevateAmount = total_amount - vendorAmount; // $4,595

  // Create payment split record
  const { data: split } = await supabase
    .from('payment_splits')
    .insert({
      enrollment_id,
      total_amount,
      vendor_name: 'milady',
      vendor_amount: vendorAmount,
      elevate_amount: elevateAmount,
      payment_method,
    })
    .select()
    .single();

  // Pay vendor (Milady)
  await payVendor(vendorAmount, enrollment);

  // Transfer remaining to connected account
  if (CONNECTED_ACCOUNT) {
    const transfer = await stripe.transfers.create({
      amount: Math.round(elevateAmount * 100), // $4,595 in cents
      currency: 'usd',
      destination: CONNECTED_ACCOUNT,
      description: `Enrollment: ${enrollment.programs.name}`,
      metadata: {
        enrollment_id,
        student_id: enrollment.user_id,
        program: enrollment.programs.slug,
      },
    });

    // Update split record
    await supabase
      .from('payment_splits')
      .update({
        stripe_transfer_id: transfer.id,
        transferred_at: new Date().toISOString(),
      })
      .eq('id', split.id);

    console.log(`✅ Transferred $${elevateAmount} to separate account`);
  }

  return NextResponse.json({
    success: true,
    split: {
      total: total_amount,
      vendor: vendorAmount,
      separate_account: elevateAmount,
      transfer_id: transfer?.id,
    },
  });
}
```

---

## Testing

### Test Transfer

```bash
# 1. Create test enrollment
curl -X POST http://localhost:3000/api/payments/split \
  -H "Content-Type: application/json" \
  -d '{
    "enrollment_id": "test-uuid",
    "total_amount": 4890,
    "payment_method": "affirm"
  }'

# 2. Check Stripe Dashboard
# Main Account: https://dashboard.stripe.com/balance
# Connected Account: https://dashboard.stripe.com/connect/accounts/acct_xxx

# 3. Verify transfer
# Should see:
# - Main account: +$4,890 (from Affirm)
# - Main account: -$4,595 (transfer out)
# - Connected account: +$4,595 (transfer in)
```

---

## Accounting View

### Main Stripe Account
```
+ $4,890 (Affirm payment)
- $295 (Vendor payment to Milady)
- $4,595 (Transfer to operations account)
= $0 (net balance)
```

### Connected/Separate Account
```
+ $4,595 (Transfer from main account)
- $0 (No expenses)
= $4,595 (available balance)
```

### Database Record
```sql
SELECT 
  total_amount,        -- $4,890
  vendor_amount,       -- $295
  elevate_amount,      -- $4,595
  stripe_transfer_id,  -- 'tr_xxxxx'
  transferred_at       -- timestamp
FROM payment_splits
WHERE enrollment_id = 'xxx';
```

---

## Migration Script

```sql
-- Update payment_splits table for separate account transfers

ALTER TABLE payment_splits 
ADD COLUMN IF NOT EXISTS stripe_transfer_id TEXT,
ADD COLUMN IF NOT EXISTS transferred_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS destination_account TEXT;

CREATE INDEX IF NOT EXISTS idx_payment_splits_transfer 
  ON payment_splits(stripe_transfer_id);

COMMENT ON COLUMN payment_splits.stripe_transfer_id 
  IS 'Stripe transfer ID to separate/connected account';
COMMENT ON COLUMN payment_splits.transferred_at 
  IS 'When funds were transferred to separate account';
COMMENT ON COLUMN payment_splits.destination_account 
  IS 'Stripe account ID that received the transfer';
```

---

## Summary

### Recommended Setup: Stripe Connect

**Steps:**
1. ✅ Create Stripe Connect account
2. ✅ Get connected account ID
3. ✅ Add to environment variables
4. ✅ Update payment split API
5. ✅ Run database migration
6. ✅ Test transfer flow

**Result:**
- Student pays $4,890 via Affirm
- Vendor gets $295 (Milady)
- Separate account gets $4,595 automatically
- Clean accounting with full audit trail

**Cost:**
- Affirm fee: ~5% ($245)
- Stripe transfer fee: 0.25% + $0.25 (~$12)
- Total fees: ~$257
- Net to separate account: $4,583

---

**Status:** Ready to Implement ✅
**Recommended:** Stripe Connect
**Complexity:** Medium
**Timeline:** 1-2 hours setup
