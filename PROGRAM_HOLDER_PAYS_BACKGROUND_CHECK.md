# Program Holder Pays for Background Checks

**Last Updated:** January 1, 2026  
**Policy:** ✅ Program Holders pay for their own background checks

---

## Policy Overview

**WHO PAYS:** Program Holder (not Elevate for Humanity)

**WHAT THEY PAY FOR:**

- Background checks for themselves
- Background checks for all staff/instructors who interact with students
- Background checks for any employees involved in training

**COST:** $18-50 per person (depending on method chosen)

---

## Background Check Options for Program Holders

### Option 1: FBI Background Check (CHEAPEST - $18)

**Cost:** $18 per person  
**Process:**

1. Visit https://www.fbi.gov/how-we-can-help-you/identity-history-summary-checks
2. Submit fingerprints
3. Pay $18 fee
4. Receive results in 3-5 business days
5. Upload results to Elevate platform

**Pros:**

- Cheapest option
- Official FBI records
- Nationwide coverage

**Cons:**

- Requires fingerprinting
- 3-5 day wait
- Results go to individual (must forward to us)

---

### Option 2: Checkr via Elevate Platform (RECOMMENDED - $35-50)

**Cost:** $35-50 per person  
**Process:**

1. Log into Program Holder dashboard
2. Navigate to "Background Checks"
3. Enter staff information
4. Pay via credit card
5. Staff receives email to complete verification
6. Results automatically sent to Elevate
7. Approval within 1-3 business days

**Pros:**

- Fast (1-3 days)
- Automated process
- Results go directly to Elevate
- FCRA compliant
- Fraud detection included

**Cons:**

- More expensive than FBI check
- Requires credit card payment

---

### Option 3: Your Own Provider (VARIES)

**Cost:** Varies by provider  
**Process:**

1. Use your existing background check provider
2. Obtain comprehensive criminal background check
3. Upload results to Elevate platform
4. Must include:
   - Nationwide criminal search
   - Sex offender registry check
   - SSN verification
   - Results dated within last 90 days

**Pros:**

- Use provider you trust
- May have existing relationship/discount

**Cons:**

- Must meet our requirements
- Manual upload required
- May need re-verification if incomplete

---

## Implementation in System

### 1. Update Handbook

**Add to Section 2 (Required Documentation):**

```markdown
**Background Checks (YOU PAY):**

Criminal background checks required for all staff who will interact with students.

⚠️ IMPORTANT: Program Holder is responsible for the cost of background checks.

Cost: $18-50 per person

Options:

1. FBI Background Check ($18) - Obtain yourself and upload results
2. Checkr via our platform ($35-50) - Pay through dashboard, automated
3. Your own provider - Upload results (must meet our requirements)

All background checks must be:

- Nationwide criminal search
- Include sex offender registry
- Dated within last 90 days
- Uploaded to our platform for approval
```

### 2. Update MOU

**Add to Section 2.2 (Program Holder Responsibilities):**

```markdown
2.2 Program Holder will:
...
• Obtain and pay for background checks for all staff who interact with participants
• Background check costs are the responsibility of Program Holder
• Estimated cost: $18-50 per staff member
• Must be completed before staff can work with students
```

### 3. Add Payment Page

**Create:** `app/program-holder/background-checks/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function BackgroundChecksPage() {
  const [staffMembers, setStaffMembers] = useState([
    { name: '', email: '', dob: '', ssn: '' }
  ]);

  const handlePurchaseCheckr = async () => {
    // Create Stripe checkout session
    const response = await fetch('/api/background-check/create-checkout', {
      method: 'POST',
      body: JSON.stringify({
        staff_members: staffMembers,
        provider: 'checkr',
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe checkout
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Background Checks</h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="font-semibold">⚠️ You are responsible for background check costs</p>
        <p className="text-sm mt-2">
          All staff who interact with students must have background checks.
          Cost: $35-50 per person via Checkr, or $18 via FBI (DIY).
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Option 1: Checkr (Recommended)</h2>
        <p className="text-gray-600 mb-4">
          Fast, automated background checks. Results in 1-3 business days.
        </p>

        {staffMembers.map((staff, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="font-semibold mb-2">Staff Member {index + 1}</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-2"
              value={staff.name}
              onChange={(e) => {
                const updated = [...staffMembers];
                updated[index].name = e.target.value;
                setStaffMembers(updated);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              value={staff.email}
              onChange={(e) => {
                const updated = [...staffMembers];
                updated[index].email = e.target.value;
                setStaffMembers(updated);
              }}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full p-2 border rounded mb-2"
              value={staff.dob}
              onChange={(e) => {
                const updated = [...staffMembers];
                updated[index].dob = e.target.value;
                setStaffMembers(updated);
              }}
            />
          </div>
        ))}

        <button
          onClick={() => setStaffMembers([...staffMembers, { name: '', email: '', dob: '', ssn: '' }])}
          className="text-blue-600 mb-4"
        >
          + Add Another Staff Member
        </button>

        <div className="mt-4">
          <p className="font-semibold">Total Cost: ${staffMembers.length * 35} - ${staffMembers.length * 50}</p>
          <button
            onClick={handlePurchaseCheckr}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Purchase Background Checks via Checkr
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Option 2: FBI Background Check (DIY)</h2>
        <p className="text-gray-600 mb-4">
          Cheapest option. You obtain the check yourself and upload results.
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Cost:</strong> $18 per person
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Process:</strong>
        </p>
        <ol className="list-decimal list-inside text-sm text-gray-600 mb-4">
          <li>Visit FBI website: https://www.fbi.gov/identity-history-summary-checks</li>
          <li>Submit fingerprints</li>
          <li>Pay $18 fee</li>
          <li>Receive results in 3-5 days</li>
          <li>Upload results to our Documents page</li>
        </ol>
        <a
          href="https://www.fbi.gov/how-we-can-help-you/identity-history-summary-checks"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Go to FBI Website →
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Option 3: Your Own Provider</h2>
        <p className="text-gray-600 mb-4">
          Use your existing background check provider and upload results.
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Requirements:</strong>
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
          <li>Nationwide criminal search</li>
          <li>Sex offender registry check</li>
          <li>SSN verification</li>
          <li>Dated within last 90 days</li>
        </ul>
        <a
          href="/program-holder/documents"
          className="text-blue-600 hover:underline"
        >
          Upload Results →
        </a>
      </div>
    </div>
  );
}
```

### 4. Create API Endpoint

**Create:** `app/api/background-check/create-checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { staff_members, provider } = await request.json();

  // Calculate total cost
  const pricePerCheck = provider === 'checkr' ? 3500 : 1800; // in cents
  const totalAmount = staff_members.length * pricePerCheck;

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Background Checks (${provider})`,
            description: `${staff_members.length} background check(s)`,
          },
          unit_amount: pricePerCheck,
        },
        quantity: staff_members.length,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/program-holder/background-checks/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/program-holder/background-checks`,
    metadata: {
      user_id: user.id,
      provider: provider,
      staff_count: staff_members.length,
    },
  });

  // Save pending background checks to database
  for (const staff of staff_members) {
    await supabase.from('background_check_requests').insert({
      program_holder_id: user.id,
      staff_name: staff.name,
      staff_email: staff.email,
      staff_dob: staff.dob,
      provider: provider,
      stripe_session_id: session.id,
      status: 'pending_payment',
    });
  }

  return NextResponse.json({ sessionId: session.id });
}
```

### 5. Handle Webhook

**Create:** `app/api/background-check/webhook/route.ts`

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Update background check requests
    const supabase = await createClient();

    const { data: requests } = await supabase
      .from('background_check_requests')
      .select('*')
      .eq('stripe_session_id', session.id);

    if (requests) {
      for (const request of requests) {
        // Update status to paid
        await supabase
          .from('background_check_requests')
          .update({ status: 'paid', paid_at: new Date() })
          .eq('id', request.id);

        // If Checkr, initiate background check
        if (request.provider === 'checkr') {
          await fetch('/api/background-check/initiate-checkr', {
            method: 'POST',
            body: JSON.stringify({
              request_id: request.id,
              name: request.staff_name,
              email: request.staff_email,
              dob: request.staff_dob,
            }),
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## Database Schema

### New Table: `background_check_requests`

```sql
CREATE TABLE background_check_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID REFERENCES profiles(id),
  staff_name TEXT NOT NULL,
  staff_email TEXT NOT NULL,
  staff_dob DATE NOT NULL,
  provider TEXT NOT NULL, -- 'checkr', 'fbi', 'other'
  stripe_session_id TEXT,
  checkr_report_id TEXT,
  status TEXT NOT NULL, -- 'pending_payment', 'paid', 'in_progress', 'completed', 'failed'
  result TEXT, -- 'clear', 'consider', 'suspended'
  report_url TEXT,
  paid_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_background_check_requests_program_holder
  ON background_check_requests(program_holder_id);

ALTER TABLE background_check_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Program holders can view own requests"
  ON background_check_requests
  FOR SELECT TO authenticated
  USING (program_holder_id = auth.uid());
```

---

## Communication to Program Holders

### Email Template: Background Check Requirement

**Subject:** Action Required: Background Checks for Your Staff

**Body:**

```
Dear [Program Holder Name],

As part of your onboarding with Elevate for Humanity, background checks are required for all staff members who will interact with students.

IMPORTANT: You are responsible for the cost of background checks.

COST: $18-50 per staff member

OPTIONS:

1. Checkr via our platform ($35-50 per person) - RECOMMENDED
   - Fast: Results in 1-3 business days
   - Automated: Results sent directly to us
   - Easy: Pay with credit card through your dashboard
   - Link: [Dashboard URL]/background-checks

2. FBI Background Check ($18 per person) - CHEAPEST
   - DIY: You obtain the check yourself
   - Process: Visit FBI website, submit fingerprints, pay $18
   - Upload: Send results to us via Documents page
   - Link: https://www.fbi.gov/identity-history-summary-checks

3. Your Own Provider (varies)
   - Use your existing background check provider
   - Must meet our requirements (nationwide criminal, sex offender, SSN)
   - Upload results via Documents page

NEXT STEPS:
1. Log into your Program Holder dashboard
2. Navigate to "Background Checks"
3. Choose your preferred option
4. Complete background checks for all staff

Questions? Contact us at elevate4humanityedu@gmail.com or (317) 314-3757

Thank you,
Elevate for Humanity Team
```

---

## FAQ for Program Holders

**Q: Why do I have to pay for background checks?**
A: Background checks are a standard business expense for training providers. This ensures you have control over the process and can choose the most cost-effective option for your organization.

**Q: How much does it cost?**
A: $18-50 per person, depending on which option you choose. FBI checks are $18 (cheapest), Checkr is $35-50 (fastest).

**Q: Can I use my own background check provider?**
A: Yes! As long as the results meet our requirements (nationwide criminal search, sex offender registry, SSN verification, dated within 90 days).

**Q: Do I have to pay upfront?**
A: Yes. Background checks must be completed and approved before you can enroll students.

**Q: Can I deduct this as a business expense?**
A: Yes. Background checks are a legitimate business expense and may be tax-deductible. Consult your accountant.

**Q: What if a staff member fails the background check?**
A: They cannot work with students. You'll need to find a replacement and conduct a new background check.

**Q: How often do background checks need to be renewed?**
A: Annually. Background checks must be dated within the last 12 months.

---

## Summary

**Policy:** ✅ Program Holders pay for background checks

**Cost:** $18-50 per person

**Options:**

1. FBI ($18) - DIY
2. Checkr ($35-50) - Automated via platform
3. Own provider (varies) - Upload results

**Implementation:**

- Update Handbook ✅
- Update MOU ✅
- Create payment page ✅
- Create API endpoints ✅
- Add database table ✅
- Email template ✅

**Benefits:**

- Reduces costs for Elevate
- Gives Program Holders control
- Standard industry practice
- Tax-deductible business expense

**Next Steps:**

1. Update handbook and MOU
2. Build payment page
3. Integrate Stripe checkout
4. Communicate policy to Program Holders
5. Monitor compliance

---

## Contact

**For Questions:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
