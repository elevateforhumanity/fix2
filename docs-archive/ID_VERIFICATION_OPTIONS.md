# ID Verification System Options

**Last Updated:** January 1, 2026  
**Current Status:** ✅ Manual ID verification system exists  
**Location:** `app/program-holder/verify-identity/page.tsx`

---

## Current System (FREE - Manual)

### What's Already Built:

**Pages:**

- `/program-holder/verify-identity` - Identity verification flow
- `/program-holder/verification` - Verification status page

**Database Tables:**

- `program_holder_verification` - Verification records
- `program_holder_documents` - Uploaded ID documents

**Process:**

1. Program Holder uploads ID documents
2. Admin reviews documents manually
3. Admin approves or rejects
4. Status updated in database

**Cost:** FREE (manual labor required)

---

## Free ID Verification Options

### 1. **Manual Document Review (CURRENT - FREE)**

**How It Works:**

- User uploads photo of ID (driver's license, passport, etc.)
- Admin reviews document visually
- Admin verifies information matches application
- Admin approves or rejects

**Pros:**
✅ Completely free
✅ Already implemented
✅ Full control over process
✅ No third-party dependencies

**Cons:**
❌ Time-consuming (5-10 minutes per review)
❌ Requires trained staff
❌ Risk of human error
❌ Not scalable
❌ No fraud detection
❌ No liveness check

**Best For:**

- Low volume (< 50 verifications/month)
- Budget-constrained organizations
- When personal touch is valued

---

### 2. **Stripe Identity (FREE Tier Available)**

**Website:** https://stripe.com/identity  
**Cost:**

- First 500 verifications/month: **FREE**
- After 500: $1.50 per verification

**Features:**

- Government ID verification
- Selfie verification (liveness check)
- Document authenticity check
- Fraud detection
- Instant results
- API integration
- Mobile-friendly

**How It Works:**

```typescript
// Create verification session
const verificationSession = await stripe.identity.verificationSessions.create({
  type: 'document',
  metadata: {
    user_id: userId,
  },
});

// User completes verification via Stripe-hosted page
// Webhook notifies when complete
```

**Pros:**
✅ 500 free verifications/month
✅ Instant automated verification
✅ Liveness detection (prevents fake IDs)
✅ Easy API integration
✅ Mobile-optimized
✅ Fraud detection included
✅ PCI compliant

**Cons:**
❌ Requires Stripe account
❌ Costs $1.50 after 500/month
❌ Dependent on third-party service

**Best For:**

- Organizations already using Stripe
- Need for automated verification
- 50-500 verifications/month

---

### 3. **Social Security Administration (SSA) Verification (FREE)**

**Website:** https://www.ssa.gov/employer/ssnv.htm  
**Cost:** FREE for employers  
**Service:** Social Security Number Verification Service (SSNVS)

**What It Verifies:**

- SSN validity
- Name matches SSN
- Date of birth matches SSN

**How It Works:**

1. Register as employer with SSA
2. Submit SSN + Name + DOB
3. Receive instant verification

**Pros:**
✅ Completely free
✅ Official government source
✅ Instant results
✅ Verifies SSN authenticity

**Cons:**
❌ Only verifies SSN, not identity
❌ Doesn't verify photo ID
❌ Requires SSN (privacy concerns)
❌ Registration process required

**Best For:**

- Verifying SSN for payroll
- Supplement to photo ID verification
- WIOA compliance

---

### 4. **E-Verify (FREE for Employers)**

**Website:** https://www.e-verify.gov/  
**Cost:** FREE  
**Purpose:** Employment eligibility verification

**What It Verifies:**

- Work authorization
- SSN validity
- Immigration status
- Identity documents

**How It Works:**

1. Register as E-Verify employer
2. Employee completes I-9 form
3. Submit to E-Verify system
4. Receive result (authorized/not authorized)

**Pros:**
✅ Completely free
✅ Required for federal contractors
✅ Verifies work authorization
✅ Government-backed

**Cons:**
❌ Only for employment verification
❌ Requires I-9 form
❌ Not for general identity verification
❌ Registration and training required

**Best For:**

- Verifying employees
- Federal contract compliance
- Work authorization checks

---

### 5. **DIY Photo ID Verification (FREE)**

**Manual Process:**

**Step 1: Document Upload**

- User uploads front and back of ID
- User uploads selfie holding ID

**Step 2: Visual Inspection**

- Check ID features (holograms, fonts, layout)
- Verify photo matches selfie
- Check expiration date
- Verify information matches application

**Step 3: Cross-Reference**

- Compare name to application
- Compare address to application
- Compare DOB to application

**Step 4: Document**

- Record verification in database
- Note any discrepancies
- Approve or reject

**Tools to Help:**

- ID verification checklist
- State ID templates for reference
- Fraud detection guide

**Cost:** FREE  
**Time:** 5-10 minutes per verification

---

## Affordable Paid Options

### 6. **Persona (Affordable)**

**Website:** https://withpersona.com  
**Cost:** $1-3 per verification  
**Features:**

- Government ID verification
- Selfie verification
- Document verification
- Database checks
- Fraud detection
- API integration

**Pricing:**

- Pay-as-you-go: $3/verification
- Volume discounts available
- No monthly fees

---

### 7. **Onfido (Mid-Range)**

**Website:** https://onfido.com  
**Cost:** $2-5 per verification  
**Features:**

- AI-powered verification
- Global ID support
- Facial recognition
- Document authentication
- Fraud detection
- Compliance tools

---

### 8. **Jumio (Enterprise)**

**Website:** https://www.jumio.com  
**Cost:** Custom pricing (typically $3-10 per verification)  
**Features:**

- Advanced AI verification
- Liveness detection
- Biometric authentication
- Global coverage
- Compliance management

---

## Recommended Solution for Elevate for Humanity

### **Hybrid Approach:**

#### Phase 1: Manual + SSA (FREE)

**For Program Holders:**

1. Upload photo ID via existing system
2. Verify SSN via SSA SSNVS (free)
3. Manual review of photo ID
4. Cross-reference with application
5. Approve or reject

**Cost:** $0  
**Time:** 10 minutes per verification  
**Scalability:** Up to 50/month

#### Phase 2: Add Stripe Identity (FREE up to 500/month)

**When Volume Increases:**

1. Integrate Stripe Identity API
2. Automated ID + selfie verification
3. Instant results
4. Fraud detection included
5. Manual review only for flagged cases

**Cost:** $0 for first 500/month, then $1.50 each  
**Time:** 2 minutes per verification (mostly automated)  
**Scalability:** Up to 500/month free

#### Phase 3: Dedicated Service (PAID)

**If Volume Exceeds 500/month:**

1. Evaluate Persona or Onfido
2. Negotiate volume pricing
3. Full automation
4. Advanced fraud detection

**Cost:** $1-3 per verification with volume discounts  
**Time:** Fully automated  
**Scalability:** Unlimited

---

## Implementation Guide

### Current System Enhancement (FREE)

**Add to Existing System:**

**1. SSA Verification Integration**

```typescript
// app/api/verify-ssn/route.ts
export async function POST(request: Request) {
  const { ssn, firstName, lastName, dob } = await request.json();

  // Call SSA SSNVS API
  const response = await fetch('https://www.ssa.gov/ssnvs/api', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SSA_API_KEY}`,
    },
    body: JSON.stringify({
      ssn,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
    }),
  });

  const result = await response.json();

  // Save result to database
  await supabase.from('ssn_verifications').insert({
    user_id: userId,
    ssn_verified: result.verified,
    verification_date: new Date(),
  });

  return Response.json(result);
}
```

**2. Enhanced Document Review Checklist**

Add to admin review page:

```typescript
// Verification checklist
const checklist = [
  { item: 'Photo matches selfie', checked: false },
  { item: 'ID not expired', checked: false },
  { item: 'Name matches application', checked: false },
  { item: 'Address matches application', checked: false },
  { item: 'DOB matches application', checked: false },
  { item: 'No signs of tampering', checked: false },
  { item: 'Holograms visible (if applicable)', checked: false },
  { item: 'SSN verified via SSA', checked: false },
];
```

**3. Fraud Detection Flags**

```typescript
// Automatic flags
const flags = [];

// Check if ID is expired
if (new Date(idExpirationDate) < new Date()) {
  flags.push('ID expired');
}

// Check if age matches DOB
const age = calculateAge(dob);
if (age < 18) {
  flags.push('Under 18 years old');
}

// Check if name matches exactly
if (idName.toLowerCase() !== applicationName.toLowerCase()) {
  flags.push('Name mismatch');
}

// Flag for manual review if any issues
if (flags.length > 0) {
  await supabase.from('verification_flags').insert({
    user_id: userId,
    flags: flags,
    requires_review: true,
  });
}
```

---

### Stripe Identity Integration (FREE Tier)

**Step 1: Setup**

```bash
npm install stripe
```

**Step 2: Create Verification Session**

```typescript
// app/api/identity/create-session/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { userId, email } = await request.json();

  const session = await stripe.identity.verificationSessions.create({
    type: 'document',
    metadata: {
      user_id: userId,
    },
    options: {
      document: {
        require_live_capture: true,
        require_matching_selfie: true,
      },
    },
  });

  // Save session to database
  await supabase.from('identity_verifications').insert({
    user_id: userId,
    stripe_session_id: session.id,
    status: 'pending',
  });

  return Response.json({
    client_secret: session.client_secret,
    url: session.url,
  });
}
```

**Step 3: Handle Webhook**

```typescript
// app/api/identity/webhook/route.ts
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature')!;
  const body = await request.text();

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object;

    // Update database
    await supabase
      .from('identity_verifications')
      .update({
        status: 'verified',
        verified_at: new Date(),
      })
      .eq('stripe_session_id', session.id);

    // Update program holder status
    await supabase
      .from('program_holders')
      .update({
        verification_status: 'verified',
      })
      .eq('user_id', session.metadata.user_id);
  }

  return Response.json({ received: true });
}
```

**Step 4: Frontend Integration**

```typescript
// app/program-holder/verify-identity/StripeIdentityFlow.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';

export default function StripeIdentityFlow({ userId }: { userId: string }) {
  const handleVerify = async () => {
    // Create session
    const response = await fetch('/api/identity/create-session', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });

    const { url } = await response.json();

    // Redirect to Stripe Identity
    window.location.href = url;
  };

  return (
    <button onClick={handleVerify}>
      Verify Identity with Stripe
    </button>
  );
}
```

---

## Cost Comparison

### Annual Cost Estimates:

**Scenario 1: 50 Program Holders/Year**

- Manual: $0 (but 8-10 hours staff time)
- Stripe Identity: $0 (under 500/month)
- Persona: $50-150

**Scenario 2: 500 Program Holders/Year**

- Manual: $0 (but 80-100 hours staff time)
- Stripe Identity: $0 (exactly 500/month)
- Persona: $500-1,500

**Scenario 3: 1,000 Program Holders/Year**

- Manual: $0 (but 160-200 hours staff time)
- Stripe Identity: $750 (500 free + 500 × $1.50)
- Persona: $1,000-3,000

**Staff Time Value:**

- If staff time worth $20/hour
- 100 hours = $2,000 in labor cost
- Automation becomes cost-effective at ~100+ verifications/year

---

## Recommendation

### **Start with Enhanced Manual + SSA (FREE)**

**Immediate:**

1. Keep existing manual document upload
2. Add SSA SSN verification (free)
3. Enhance admin review checklist
4. Add automatic fraud flags
5. Document verification process

**Cost:** $0  
**Setup Time:** 1-2 days  
**Ongoing Time:** 10 min/verification

### **Add Stripe Identity When Ready (FREE up to 500/month)**

**Within 3-6 Months:**

1. Integrate Stripe Identity API
2. Offer automated option
3. Keep manual as backup
4. Monitor usage

**Cost:** $0 for first 500/month  
**Setup Time:** 1-2 weeks  
**Ongoing Time:** 2 min/verification

### **Evaluate Paid Service if Needed**

**After 12 Months:**

1. Review verification volume
2. Calculate staff time costs
3. Compare to paid services
4. Make data-driven decision

---

## Summary

**Free Options Available:** ✅ Yes

**Best Free Options:**

1. Manual review (current system)
2. SSA SSN verification
3. Stripe Identity (500/month free)

**Recommendation:**

- Enhance current manual system
- Add SSA verification
- Integrate Stripe Identity when volume justifies
- Budget: $0-750/year for up to 1,000 verifications

**Next Steps:**

1. Register with SSA SSNVS
2. Add SSN verification to system
3. Enhance admin review checklist
4. Add fraud detection flags
5. Evaluate Stripe Identity in 6 months

---

## Contact

**For ID Verification Questions:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**Stripe Identity:**

- Website: https://stripe.com/identity
- Support: https://support.stripe.com
