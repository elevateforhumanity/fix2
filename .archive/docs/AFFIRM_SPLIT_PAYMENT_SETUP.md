# Affirm Split Payment Configuration

## Payment Flow Overview

### Scenario
Student enrolls in Barber Apprenticeship ($4,890):
- **Vendor Cost (Milady):** $295
- **Elevate for Humanity:** $4,595

### How It Works
```
Student pays Affirm: $4,890
         ↓
Affirm pays:
  → Vendor (Milady): $295
  → Elevate for Humanity: $4,595
```

---

## Implementation Options

### Option 1: Affirm Pays You, You Pay Vendor (Recommended)

**Flow:**
1. Student pays Affirm: $4,890
2. Affirm pays Elevate: $4,890 (minus fees)
3. Elevate pays Milady: $295
4. Elevate keeps: $4,595

**Advantages:**
- ✅ Simple integration
- ✅ You control vendor payments
- ✅ Easier accounting
- ✅ Already implemented

**Implementation:**
```typescript
// Current setup - no changes needed
// Affirm pays you full amount
// You handle vendor payment separately
```

### Option 2: Affirm Split Payment (Complex)

**Flow:**
1. Student pays Affirm: $4,890
2. Affirm splits payment:
   - $295 → Vendor (Milady)
   - $4,595 → Elevate for Humanity

**Advantages:**
- ✅ Automatic vendor payment
- ✅ No manual transfers

**Disadvantages:**
- ❌ Requires Affirm merchant account for vendor
- ❌ Complex setup
- ❌ Vendor must accept Affirm
- ❌ Additional fees

**Implementation:**
```typescript
// Requires Affirm Split Payment API
// Not recommended for your use case
```

---

## Recommended Approach

### Use Current Setup + Automated Vendor Payment

**Step 1: Student Pays via Affirm**
```typescript
// Already implemented in AffirmPaymentButton.tsx
// Student pays $4,890 via Affirm
```

**Step 2: Affirm Pays Elevate**
```
Affirm → Elevate for Humanity: $4,890 (minus 3-6% fee)
Net received: ~$4,645
```

**Step 3: Automatic Vendor Payment**
```typescript
// After enrollment confirmed, trigger vendor payment
// app/api/affirm/transactions/route.ts

async function handleEnrollmentPayment(enrollmentId: string) {
  // Get enrollment details
  const enrollment = await getEnrollment(enrollmentId);
  
  // Calculate split
  const vendorCost = 295; // Milady cost
  const elevateCost = enrollment.amount - vendorCost;
  
  // Pay vendor (Milady)
  await payVendor({
    vendor: 'milady',
    amount: vendorCost,
    enrollmentId,
  });
  
  // Record split in database
  await recordPaymentSplit({
    enrollmentId,
    totalAmount: enrollment.amount,
    vendorAmount: vendorCost,
    elevateAmount: elevateCost,
  });
}
```

---

## Database Schema for Split Payments

### Add Payment Splits Table

```sql
-- Track payment splits
CREATE TABLE IF NOT EXISTS payment_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  total_amount NUMERIC(10, 2) NOT NULL,
  vendor_name TEXT NOT NULL, -- 'milady', 'other'
  vendor_amount NUMERIC(10, 2) NOT NULL,
  elevate_amount NUMERIC(10, 2) NOT NULL,
  vendor_paid_at TIMESTAMPTZ,
  vendor_payment_id TEXT,
  payment_method TEXT, -- 'affirm', 'stripe', etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example data
INSERT INTO payment_splits (
  enrollment_id,
  total_amount,
  vendor_name,
  vendor_amount,
  elevate_amount,
  payment_method
) VALUES (
  'enrollment-uuid',
  4890.00,
  'milady',
  295.00,
  4595.00,
  'affirm'
);
```

---

## Updated Affirm Confirmation Flow

### File: `/app/payment/affirm/confirm/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AffirmConfirmPage() {
  const searchParams = useSearchParams();
  const checkoutToken = searchParams.get('checkout_token');
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    if (!checkoutToken) return;

    async function processPayment() {
      try {
        // 1. Authorize Affirm transaction
        const authResponse = await fetch('/api/affirm/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkout_token: checkoutToken,
            action: 'authorize',
          }),
        });

        const authData = await authResponse.json();

        if (!authData.transaction_id) {
          throw new Error('Authorization failed');
        }

        // 2. Create enrollment
        const enrollResponse = await fetch('/api/enrollments/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_id: authData.transaction_id,
            payment_method: 'affirm',
            amount: authData.amount / 100, // Convert from cents
          }),
        });

        const enrollData = await enrollResponse.json();

        // 3. Process payment split
        await fetch('/api/payments/split', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            enrollment_id: enrollData.enrollment_id,
            total_amount: authData.amount / 100,
            payment_method: 'affirm',
          }),
        });

        setStatus('success');
      } catch (error) {
        console.error('Payment processing error:', error);
        setStatus('error');
      }
    }

    processPayment();
  }, [checkoutToken]);

  if (status === 'processing') {
    return <div>Processing your payment...</div>;
  }

  if (status === 'success') {
    return (
      <div>
        <h1>Payment Successful!</h1>
        <p>Your enrollment is confirmed.</p>
        <p>Vendor payment processed automatically.</p>
      </div>
    );
  }

  return <div>Payment error. Please contact support.</div>;
}
```

---

## Create Payment Split API

### File: `/app/api/payments/split/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  try {
    const { enrollment_id, total_amount, payment_method } = await request.json();

    // Get enrollment details
    const { data: enrollment, error: enrollError } = await supabase
      .from('enrollments')
      .select('*, programs(*)')
      .eq('id', enrollment_id)
      .single();

    if (enrollError || !enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Calculate split based on program
    let vendorAmount = 0;
    let vendorName = '';

    if (enrollment.programs.slug === 'barber-apprenticeship') {
      vendorAmount = 295; // Milady cost
      vendorName = 'milady';
    }
    // Add other programs as needed

    const elevateAmount = total_amount - vendorAmount;

    // Record split
    const { data: split, error: splitError } = await supabase
      .from('payment_splits')
      .insert({
        enrollment_id,
        total_amount,
        vendor_name: vendorName,
        vendor_amount: vendorAmount,
        elevate_amount: elevateAmount,
        payment_method,
      })
      .select()
      .single();

    if (splitError) {
      throw new Error('Failed to record payment split');
    }

    // Trigger vendor payment (if applicable)
    if (vendorAmount > 0) {
      await triggerVendorPayment({
        vendorName,
        amount: vendorAmount,
        enrollmentId: enrollment_id,
        splitId: split.id,
      });
    }

    return NextResponse.json({
      success: true,
      split: {
        total: total_amount,
        vendor: vendorAmount,
        elevate: elevateAmount,
      },
    });

  } catch (error) {
    console.error('Payment split error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment split' },
      { status: 500 }
    );
  }
}

async function triggerVendorPayment(params: {
  vendorName: string;
  amount: number;
  enrollmentId: string;
  splitId: string;
}) {
  // Implement vendor-specific payment logic
  if (params.vendorName === 'milady') {
    // Trigger Milady enrollment API
    await fetch('/api/milady/auto-enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enrollmentId: params.enrollmentId,
        amount: params.amount,
      }),
    });
  }
  
  // Update split record
  const supabase = await createClient();
  await supabase
    .from('payment_splits')
    .update({
      vendor_paid_at: new Date().toISOString(),
      vendor_payment_id: `VENDOR-${Date.now()}`,
    })
    .eq('id', params.splitId);
}
```

---

## Configuration by Program

### File: `/lib/payment-splits.ts`

```typescript
export const PAYMENT_SPLITS = {
  'barber-apprenticeship': {
    vendor: 'milady',
    vendorCost: 295,
    vendorPaymentMethod: 'api', // or 'manual', 'stripe', etc.
  },
  'direct-support-professional': {
    vendor: 'none',
    vendorCost: 0,
    vendorPaymentMethod: null,
  },
  // Add other programs
};

export function getPaymentSplit(programSlug: string, totalAmount: number) {
  const config = PAYMENT_SPLITS[programSlug] || {
    vendor: 'none',
    vendorCost: 0,
    vendorPaymentMethod: null,
  };

  return {
    total: totalAmount,
    vendor: config.vendorCost,
    elevate: totalAmount - config.vendorCost,
    vendorName: config.vendor,
    paymentMethod: config.vendorPaymentMethod,
  };
}
```

---

## Reporting & Tracking

### Payment Split Report

```sql
-- View all payment splits
SELECT 
  ps.id,
  ps.total_amount,
  ps.vendor_name,
  ps.vendor_amount,
  ps.elevate_amount,
  ps.vendor_paid_at,
  ps.payment_method,
  e.id as enrollment_id,
  p.name as program_name,
  u.email as student_email
FROM payment_splits ps
JOIN enrollments e ON e.id = ps.enrollment_id
JOIN programs p ON p.id = e.program_id
JOIN auth.users u ON u.id = e.user_id
ORDER BY ps.created_at DESC;
```

### Revenue Summary

```sql
-- Total revenue breakdown
SELECT 
  payment_method,
  COUNT(*) as transactions,
  SUM(total_amount) as total_revenue,
  SUM(vendor_amount) as vendor_payments,
  SUM(elevate_amount) as elevate_revenue
FROM payment_splits
GROUP BY payment_method;
```

---

## Summary

### Current Setup (Recommended)
1. ✅ Student pays Affirm: $4,890
2. ✅ Affirm pays Elevate: $4,890 (minus fees)
3. ✅ Elevate pays vendor: $295 (automated)
4. ✅ Elevate keeps: $4,595

### What You Need to Do
1. ✅ Use existing Affirm integration (already done)
2. ⏳ Add `payment_splits` table to database
3. ⏳ Create `/api/payments/split` route
4. ⏳ Update confirmation page to trigger split
5. ⏳ Configure vendor payment automation

### Benefits
- ✅ Simple for students (one payment)
- ✅ Automatic vendor payment
- ✅ Clear accounting
- ✅ Flexible for multiple vendors
- ✅ Easy reporting

---

**Status:** Architecture Defined ✅
**Next Step:** Implement payment split tracking
**Complexity:** Medium
**Timeline:** 2-3 hours to implement
