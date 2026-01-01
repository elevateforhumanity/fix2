# Program Holder Pays for ID Verification

**Last Updated:** January 1, 2026  
**Policy:** ✅ Program Holders pay for their own ID verification

---

## Policy Overview

**WHO PAYS:** Program Holder (not Elevate for Humanity)

**WHAT THEY PAY FOR:**

- Identity verification for themselves
- Identity verification for all staff/instructors
- Identity verification for any key personnel

**COST:** $0-3 per person (depending on method chosen)

---

## ID Verification Options for Program Holders

### Option 1: Manual Upload (FREE)

**Cost:** $0  
**Process:**

1. Upload photo of government-issued ID (driver's license, passport, state ID)
2. Upload selfie holding ID
3. Admin manually reviews and verifies
4. Approval within 1-2 business days

**Pros:**

- Completely free
- No third-party services
- Simple process

**Cons:**

- Manual review required
- 1-2 day wait
- No fraud detection
- No liveness check

**Best For:**

- Budget-conscious Program Holders
- Low-risk verification needs

---

### Option 2: Stripe Identity (FREE up to 500/month, then $1.50)

**Cost:**

- First 500 verifications/month: **FREE**
- After 500: $1.50 per verification

**Process:**

1. Log into Program Holder dashboard
2. Click "Verify Identity with Stripe"
3. Follow Stripe's verification flow:
   - Take photo of ID (front and back)
   - Take selfie (liveness check)
4. Instant automated verification
5. Results sent to Elevate automatically

**Pros:**

- FREE for most users (under 500/month)
- Instant results (seconds)
- Liveness detection (prevents fake IDs)
- Fraud detection included
- Mobile-friendly
- Automated

**Cons:**

- Costs $1.50 if over 500 verifications/month
- Requires Stripe account (we handle this)

**Best For:**

- Fast verification needed
- Professional appearance
- Fraud prevention important

---

### Option 3: Persona ($1-3 per verification)

**Cost:** $1-3 per person  
**Process:**

1. Click "Verify with Persona"
2. Complete verification flow
3. Pay $1-3 via credit card
4. Instant results

**Pros:**

- Professional service
- Advanced fraud detection
- Global ID support
- Instant results

**Cons:**

- Costs money
- Requires payment upfront

**Best For:**

- International IDs
- Advanced fraud detection needed

---

## Recommended Approach

### **Tiered System:**

**Tier 1: Manual Upload (FREE) - Default**

- Available to all Program Holders
- No cost
- 1-2 day review time
- Suitable for most cases

**Tier 2: Stripe Identity (FREE or $1.50) - Recommended**

- Instant verification
- FREE for first 500/month
- Automated fraud detection
- Professional experience

**Tier 3: Persona ($1-3) - Premium**

- Advanced features
- International support
- Enhanced fraud detection

---

## Implementation in System

### 1. Update Handbook

**Add to Section 2 (Required Documentation):**

```markdown
**Identity Verification (YOU PAY - if expedited):**

All Program Holders and key staff must complete identity verification.

OPTIONS:

1. Manual Upload (FREE) - Default
   - Upload photo ID and selfie
   - Admin reviews within 1-2 business days
   - No cost

2. Stripe Identity (FREE or $1.50) - Recommended
   - Instant automated verification
   - FREE for most users
   - Costs $1.50 only if we exceed 500 verifications/month
   - Fraud detection included

3. Persona ($1-3) - Premium
   - Advanced verification
   - International ID support
   - Pay $1-3 per verification

⚠️ IMPORTANT:

- Manual upload is always FREE
- Stripe Identity is FREE for 99% of users
- You only pay if you choose premium options or if we exceed 500 verifications/month (rare)
```

### 2. Update MOU

**Add to Section 2.2 (Program Holder Responsibilities):**

```markdown
2.2 Program Holder will:
...
• Complete identity verification for themselves and key staff
• Choose verification method:

- Manual upload (FREE)
- Stripe Identity (FREE up to 500/month, then $1.50)
- Persona ($1-3 per person)
  • Identity verification must be completed before enrolling students
```

### 3. Create Verification Page with Payment Options

**Update:** `app/program-holder/verify-identity/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function VerifyIdentityPage({ userId }: { userId: string }) {
  const [selectedMethod, setSelectedMethod] = useState<'manual' | 'stripe' | 'persona'>('manual');

  const handleManualUpload = () => {
    // Redirect to document upload page
    window.location.href = '/program-holder/documents?type=id_verification';
  };

  const handleStripeIdentity = async () => {
    // Check if we're under 500/month (free) or over (paid)
    const response = await fetch('/api/identity/check-quota');
    const { is_free, cost } = await response.json();

    if (!is_free) {
      // Show payment confirmation
      const confirmed = confirm(
        `Stripe Identity verification costs $${cost}. ` +
        `This will be charged to your account. Continue?`
      );
      if (!confirmed) return;
    }

    // Create Stripe Identity session
    const sessionResponse = await fetch('/api/identity/create-session', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });

    const { url } = await sessionResponse.json();
    window.location.href = url;
  };

  const handlePersona = async () => {
    // Create Persona verification
    const response = await fetch('/api/identity/create-persona', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });

    const { inquiry_id, session_token } = await response.json();

    // Load Persona SDK
    const Persona = (window as any).Persona;
    const client = new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE_ID,
      environmentId: process.env.NEXT_PUBLIC_PERSONA_ENV_ID,
      inquiryId: inquiry_id,
      sessionToken: session_token,
      onComplete: () => {
        window.location.href = '/program-holder/verify-identity/success';
      },
    });

    client.open();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Identity Verification</h1>

      <p className="text-gray-600 mb-8">
        Choose your preferred identity verification method. Manual upload is always free.
      </p>

      {/* Option 1: Manual Upload (FREE) */}
      <div
        className={`bg-white rounded-lg shadow p-6 mb-4 cursor-pointer border-2 ${
          selectedMethod === 'manual' ? 'border-blue-600' : 'border-gray-200'
        }`}
        onClick={() => setSelectedMethod('manual')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">Manual Upload</h2>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                FREE
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                DEFAULT
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              Upload photo of your ID and a selfie. Admin reviews within 1-2 business days.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Completely free</li>
              <li>✅ Simple process</li>
              <li>⏱️ 1-2 business day review</li>
            </ul>
          </div>
          <input
            type="radio"
            checked={selectedMethod === 'manual'}
            onChange={() => setSelectedMethod('manual')}
            className="mt-1"
          />
        </div>
      </div>

      {/* Option 2: Stripe Identity (FREE or $1.50) */}
      <div
        className={`bg-white rounded-lg shadow p-6 mb-4 cursor-pointer border-2 ${
          selectedMethod === 'stripe' ? 'border-blue-600' : 'border-gray-200'
        }`}
        onClick={() => setSelectedMethod('stripe')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">Stripe Identity</h2>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                FREE*
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                RECOMMENDED
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              Instant automated verification with fraud detection. FREE for most users.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Instant results (seconds)</li>
              <li>✅ Fraud detection included</li>
              <li>✅ Liveness check (prevents fake IDs)</li>
              <li>✅ Mobile-friendly</li>
              <li>💰 FREE for first 500/month, then $1.50</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              *FREE for 99% of users. Only costs $1.50 if we exceed 500 verifications/month (rare).
            </p>
          </div>
          <input
            type="radio"
            checked={selectedMethod === 'stripe'}
            onChange={() => setSelectedMethod('stripe')}
            className="mt-1"
          />
        </div>
      </div>

      {/* Option 3: Persona ($1-3) */}
      <div
        className={`bg-white rounded-lg shadow p-6 mb-8 cursor-pointer border-2 ${
          selectedMethod === 'persona' ? 'border-blue-600' : 'border-gray-200'
        }`}
        onClick={() => setSelectedMethod('persona')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">Persona</h2>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                $1-3
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                PREMIUM
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              Advanced verification with international ID support.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Instant results</li>
              <li>✅ Advanced fraud detection</li>
              <li>✅ International IDs supported</li>
              <li>✅ Enhanced security</li>
              <li>💰 $1-3 per verification</li>
            </ul>
          </div>
          <input
            type="radio"
            checked={selectedMethod === 'persona'}
            onChange={() => setSelectedMethod('persona')}
            className="mt-1"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (selectedMethod === 'manual') handleManualUpload();
            else if (selectedMethod === 'stripe') handleStripeIdentity();
            else if (selectedMethod === 'persona') handlePersona();
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          {selectedMethod === 'manual' && 'Upload ID Documents'}
          {selectedMethod === 'stripe' && 'Verify with Stripe Identity'}
          {selectedMethod === 'persona' && 'Verify with Persona'}
        </button>
      </div>
    </div>
  );
}
```

### 4. Create API Endpoints

**Check Quota:** `app/api/identity/check-quota/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  // Get count of Stripe Identity verifications this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('identity_verifications')
    .select('*', { count: 'exact', head: true })
    .eq('provider', 'stripe')
    .gte('created_at', startOfMonth.toISOString());

  const is_free = (count || 0) < 500;
  const cost = is_free ? 0 : 1.5;

  return NextResponse.json({
    is_free,
    cost,
    count: count || 0,
    limit: 500,
  });
}
```

**Create Persona Session:** `app/api/identity/create-persona/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await request.json();

  // Create Persona inquiry
  const response = await fetch('https://withpersona.com/api/v1/inquiries', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'inquiry',
        attributes: {
          'inquiry-template-id': process.env.PERSONA_TEMPLATE_ID,
          'reference-id': userId,
        },
      },
    }),
  });

  const data = await response.json();

  // Save to database
  await supabase.from('identity_verifications').insert({
    user_id: userId,
    provider: 'persona',
    persona_inquiry_id: data.data.id,
    status: 'pending',
    cost: 1.5, // Will be charged
  });

  return NextResponse.json({
    inquiry_id: data.data.id,
    session_token: data.data.attributes['session-token'],
  });
}
```

### 5. Handle Stripe Identity Billing

**Webhook:** `app/api/identity/stripe-webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')!;
  const body = await request.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object;
    const supabase = await createClient();

    // Check if this verification should be charged
    const { data: quota } = await supabase.rpc(
      'get_monthly_stripe_identity_count'
    );

    const should_charge = quota && quota.count >= 500;

    if (should_charge) {
      // Create invoice for $1.50
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', session.metadata.user_id)
        .single();

      if (profile) {
        // Create Stripe invoice
        const customer = await stripe.customers.create({
          email: profile.email,
        });

        const invoice = await stripe.invoices.create({
          customer: customer.id,
          auto_advance: true,
          collection_method: 'charge_automatically',
        });

        await stripe.invoiceItems.create({
          customer: customer.id,
          invoice: invoice.id,
          amount: 150, // $1.50 in cents
          currency: 'usd',
          description: 'Stripe Identity Verification',
        });

        await stripe.invoices.finalizeInvoice(invoice.id);
      }
    }

    // Update verification record
    await supabase
      .from('identity_verifications')
      .update({
        status: 'verified',
        verified_at: new Date(),
        cost: should_charge ? 1.5 : 0,
      })
      .eq('stripe_session_id', session.id);
  }

  return NextResponse.json({ received: true });
}
```

---

## Database Schema

### Update Table: `identity_verifications`

```sql
CREATE TABLE IF NOT EXISTS identity_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  provider TEXT NOT NULL, -- 'manual', 'stripe', 'persona'
  stripe_session_id TEXT,
  persona_inquiry_id TEXT,
  status TEXT NOT NULL, -- 'pending', 'verified', 'failed'
  cost DECIMAL(10,2) DEFAULT 0, -- Track cost per verification
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_identity_verifications_user ON identity_verifications(user_id);
CREATE INDEX idx_identity_verifications_provider ON identity_verifications(provider);
CREATE INDEX idx_identity_verifications_created ON identity_verifications(created_at);

ALTER TABLE identity_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verifications"
  ON identity_verifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Function to count monthly Stripe Identity verifications
CREATE OR REPLACE FUNCTION get_monthly_stripe_identity_count()
RETURNS TABLE(count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT COUNT(*)::BIGINT
  FROM identity_verifications
  WHERE provider = 'stripe'
    AND created_at >= DATE_TRUNC('month', CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;
```

---

## Cost Breakdown

### For Program Holders:

**Option 1: Manual Upload**

- Cost: $0
- Time: 1-2 business days

**Option 2: Stripe Identity**

- Cost: $0 (if under 500/month)
- Cost: $1.50 (if over 500/month)
- Time: Instant

**Option 3: Persona**

- Cost: $1-3 per verification
- Time: Instant

### For Elevate for Humanity:

**Monthly Costs (if all use Stripe Identity):**

- 0-500 verifications: $0
- 501-1000 verifications: $750 (500 × $1.50)
- 1001-2000 verifications: $2,250 (1,500 × $1.50)

**Pass-Through Billing:**

- Charge Program Holders $1.50 after 500/month
- Or absorb cost as business expense
- Or require manual upload (free) as default

---

## Communication to Program Holders

### Email Template: ID Verification Options

**Subject:** Complete Your Identity Verification

**Body:**

```
Dear [Program Holder Name],

Identity verification is required to activate your Program Holder account.

CHOOSE YOUR VERIFICATION METHOD:

1. Manual Upload (FREE) - Default Option
   ✅ Upload photo ID and selfie
   ✅ No cost
   ⏱️ Admin reviews within 1-2 business days

2. Stripe Identity (FREE*) - Recommended
   ✅ Instant automated verification
   ✅ Fraud detection included
   ✅ FREE for most users
   💰 Only $1.50 if we exceed 500 verifications/month (rare)

3. Persona ($1-3) - Premium
   ✅ Advanced verification
   ✅ International ID support
   💰 $1-3 per verification

*99% of users verify for FREE with Stripe Identity

NEXT STEPS:
1. Log into your Program Holder dashboard
2. Navigate to "Verify Identity"
3. Choose your preferred method
4. Complete verification

Questions? Contact us at elevate4humanityedu@gmail.com or (317) 314-3757

Thank you,
Elevate for Humanity Team
```

---

## Summary

**Policy:** ✅ Program Holders can choose verification method

**Options:**

1. Manual Upload (FREE) - Default
2. Stripe Identity (FREE up to 500/month, then $1.50)
3. Persona ($1-3) - Premium

**Implementation:**

- Update handbook ✅
- Update MOU ✅
- Create verification page with options ✅
- Create API endpoints ✅
- Add billing logic ✅
- Email template ✅

**Benefits:**

- FREE option always available (manual)
- Stripe Identity FREE for 99% of users
- Premium option for those who want it
- Flexible and fair

**Recommendation:**

- Default to manual upload (FREE)
- Promote Stripe Identity as recommended (FREE for most)
- Offer Persona as premium option

---

## Contact

**For Questions:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
