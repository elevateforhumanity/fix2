# Revenue Split Model

**Elevate for Humanity**  
**Last Updated:** January 2025  
**Status:** Active

---

## Overview

This document defines the revenue sharing model for Elevate for Humanity's training programs, including splits between EFH, credentialing partners, and instructors.

---

## Revenue Model by Program Type

### 1. Self-Pay Programs

**Payment Flow:**

1. Student pays full tuition amount
2. **Elevate for Humanity receives 50% FIRST**
3. **Partners receive 50% SECOND** (via Stripe transfer)

**Revenue Split:**

- **50% to Elevate for Humanity (EFH)**
  - Operations and facilities
  - Technology and platform
  - Student support services
  - Marketing and outreach
- **50% to Partners** (Credentialing Partner Organization)
  - Curriculum development
  - Certification processing
  - Quality assurance
  - Partner support

**Instructor Compensation:**

- Instructors receive **NO monetary payment** from revenue split
- Instructors receive **credentialing and professional development**
- Future instructor payment model may be implemented

**Example:**

```
Student pays: $2,000
├─ EFH receives: $1,000 (50%) - PAID FIRST
└─ Partner receives: $1,000 (50%) - PAID SECOND
```

---

### 2. Government-Funded Programs

**Program Types:**

- WIOA (Workforce Innovation and Opportunity Act)
- WRG (Workforce Readiness Grant)
- OJT (On-the-Job Training)

**Payment Flow:**

1. Student enrolls for FREE (no tuition)
2. Government reimburses EFH directly
3. **NO revenue split occurs**

**Revenue Split:**

- **100% to Elevate for Humanity (EFH)**
- **0% to Partners** (no split for government programs)
- **0% to Instructors** (no split for government programs)

**Rationale:**

- Government programs are designed to be FREE to students
- EFH receives reimbursement from government agencies
- Partners and instructors are compensated through other means

**Example:**

```
Student pays: $0 (FREE)
Government reimburses: $3,500
└─ EFH receives: $3,500 (100%) - NO SPLIT
```

---

## Payment Processing

### Stripe Configuration

**Self-Pay Programs:**

1. Payment Intent created for full amount
2. EFH receives payment first (Stripe default behavior)
3. Webhook triggers after successful payment
4. Stripe Transfer sends 50% to Partner Connect account
5. Both parties receive payment confirmation

**Government Programs:**

1. No Stripe payment required (FREE enrollment)
2. Government reimbursement processed separately
3. No automatic splits or transfers

### Technical Implementation

**Files:**

- `scripts/utilities/revenue-split-system.js` - Core split logic
- `scripts/utilities/payment-processing-with-splits.js` - Payment processing
- `netlify/functions/stripe-webhook.js` - Webhook handler

**Key Functions:**

```javascript
// Calculate split (50% EFH, 50% Partners)
const efhRevenue = Math.round(totalAmount * 0.5);
const partnerRevenue = totalAmount - efhRevenue;

// EFH receives payment first (default Stripe behavior)
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount,
  currency: 'usd',
  metadata: {
    efh_revenue: efhRevenue,
    partner_revenue: partnerRevenue,
    payment_order: 'efh_first_then_partner',
  },
});

// After payment succeeds, transfer to partner
await stripe.transfers.create({
  amount: partnerRevenue,
  currency: 'usd',
  destination: partnerConnectAccountId,
});
```

---

## Partner Onboarding

### Stripe Connect Setup

**Requirements:**

1. Partner must have valid business entity
2. Partner must complete Stripe Connect onboarding
3. Partner must provide bank account information
4. Partner must verify identity (KYC)

**Process:**

1. EFH creates Stripe Connect Express account for partner
2. Partner receives onboarding link via email
3. Partner completes identity verification
4. Partner adds bank account for payouts
5. Account activated for automatic transfers

**Files:**

- `netlify/functions/stripe-connect-onboarding.js` - Creates onboarding links

---

## Instructor Compensation (Future)

### Current Status

**Instructors currently receive:**

- Professional credentialing
- Training and development
- Teaching experience
- Portfolio building

**Instructors do NOT receive:**

- Monetary payment from revenue split
- Commission on enrollments
- Performance bonuses

### Future Implementation

**Potential instructor payment model:**

- Hourly rate for teaching time
- Performance bonuses for student outcomes
- Referral bonuses for new students
- Separate from revenue split (paid by EFH directly)

**Infrastructure Ready:**

- `instructors` table in database
- Stripe Connect onboarding for instructors
- Payout tracking and reporting
- Tax reporting (1099-K) capability

**To Activate:**

1. Update `stripe-split-payout.js` to include instructor transfers
2. Configure instructor payout percentages
3. Enable instructor onboarding flow
4. Update documentation and contracts

---

## Reporting & Compliance

### Revenue Tracking

**Database Tables:**

- `split_payouts` - Records all revenue splits
- `instructors` - Instructor information and payout settings
- `instructor_programs` - Program assignments

**Reports Generated:**

- Monthly revenue by program type
- Partner payout summaries
- Government reimbursement tracking
- Tax reporting (1099-K for partners)

### Audit Trail

**All transactions include:**

- Payment Intent ID
- Program ID and type
- Funding source (self-pay vs government)
- Split amounts and percentages
- Transfer IDs and timestamps
- Student information (anonymized)

---

## FAQ

### Why does EFH get paid first?

This is the standard Stripe payment flow. EFH receives the full payment, then transfers the partner share. This ensures:

- EFH has control over payment processing
- Disputes and refunds are handled by EFH
- Partners receive guaranteed transfers
- Compliance with payment regulations

### Why don't instructors receive payment?

Currently, instructors are compensated through credentialing and professional development rather than monetary payment. This model may change in the future as the program scales.

### What happens if a student requests a refund?

- EFH processes the refund to the student
- EFH requests return of partner share (if already transferred)
- Refund policy and partner agreements define the process
- All refunds are tracked in the database

### How are government programs different?

Government programs (WIOA/WRG/OJT) are FREE to students. EFH receives reimbursement directly from government agencies, and no revenue split occurs with partners or instructors.

### Can partners see their revenue in real-time?

Yes, partners can:

- Log into Stripe Connect dashboard
- View pending and completed transfers
- Download payout reports
- Track student enrollments

---

## Contact

**Questions about revenue splits:**

- Email: finance@elevateforhumanity.org
- Phone: (555) 123-4567

**Technical support:**

- Email: tech@elevateforhumanity.org
- Slack: #revenue-splits

**Partner onboarding:**

- Email: partnerships@elevateforhumanity.org
- Portal: https://elevateforhumanity.org/partners

---

## Changelog

**January 2025:**

- Initial documentation created
- 50/50 split model implemented
- Instructor payments disabled (infrastructure ready for future)
- Government program handling clarified
