# Program Holder Onboarding System - Complete Guide

## What's in the Onboarding Packet

The program holder onboarding packet includes everything needed to become an Elevate for Humanity training partner:

### 📋 Core Documents

1. **Welcome & Partnership Overview**
   - Mission and platform explanation
   - How the partnership works
   - Benefits of joining the network

2. **Partnership Benefits**
   - Student referrals (pre-screened, funded)
   - Compliance support (WIOA, Apprenticeship documentation)
   - Digital infrastructure (LMS access, tracking tools)
   - Marketing & outreach (co-branded materials, promotion)
   - Financial support (funding assistance, payment processing)

3. **Required Documents Checklist**
   - Business: MOU, W-9, Business License, Insurance, Facility Proof
   - Program: State License, Curriculum, Instructor Credentials, Student Handbook
   - Compliance: Background Check Policy, Safety Procedures, Grievance Policy, Refund Policy, FERPA Statement

4. **Payment & Funding Information**
   - Payment schedule and terms
   - Funding sources (WIOA, WRG, JAG, Apprenticeship)
   - Reporting requirements
   - Completion payment process

5. **Reporting Requirements**
   - Monthly reports (due 5th): Attendance, progress, issues
   - Quarterly reports: Outcomes, satisfaction, improvements
   - Ad-hoc: Incidents, withdrawals, schedule changes

6. **Student Support Expectations**
   - Quality instruction standards
   - Facility requirements
   - Attendance tracking
   - Progress communication
   - Accommodation support
   - Professional standards
   - Certificate issuance

7. **Compliance & Quality Standards**
   - License maintenance
   - Regulatory compliance
   - Qualified instructors
   - Insurance requirements
   - Quality reviews
   - Prohibited activities

8. **Support Team Contacts**
   - Primary: Elizabeth Greene (elizabeth@elevateforhumanity.org)
   - Student Services
   - Compliance & Reporting
   - Technical Support (Elevate4humanityedu@gmail.com)
   - Phone: 317-314-3757

9. **Important Dates & Deadlines**
   - Monthly reports: 5th of each month
   - Quarterly reviews: Mar 15, Jun 15, Sep 15, Dec 15
   - Annual renewal
   - Payment processing: 15th and 30th

10. **Resources & Training**
    - Curriculum templates
    - Reporting forms
    - Marketing materials
    - Student handbook templates
    - Compliance checklists
    - Training videos
    - Partner webinars
    - Community forum

## Digital Onboarding Flow

### Step 1: Signup (`/program-holder/signup`)

**Automatic Role Assignment** ✅

**Form Fields**:

- First Name, Last Name
- Organization Name (optional)
- Email, Password
- **Role**: Automatically set to `program_holder`

**Document Uploads** (Optional during signup):

- Photo ID (Driver's License, Passport)
- Social Security Card
- Teaching Credentials
- Course Syllabus

**Result**: Account created → Email confirmation sent

### Step 2: Email Confirmation

- User clicks confirmation link
- Email verified
- Redirected to onboarding setup

### Step 3: Onboarding Setup (`/program-holder/onboarding/setup`)

**5-Step Process**:

**Step 1: Organization Information**

- Organization Name
- Program Name (appears on certificates)

**Step 2: Program Details**

- Program Type (Healthcare, Skilled Trades, Technology, etc.)
- Program Duration
- Certification Offered
- Delivery Method (Online, Hybrid, In-Person)

**Step 3: Upload Syllabus**

- Course syllabus file
- Custom student instructions
- System analyzes for course matching

**Step 4: Banking Information** ✅ NEW

- Account Holder Name
- Bank Name
- Account Type (Checking/Savings)
- Routing Number (9 digits)
- Account Number
- Upload Voided Check (optional)

**Step 5: Review & Submit**

- Review all information
- Submit for admin review
- Receive confirmation

## Identity Verification

### Phase 1: Manual Verification (Current)

**Process**:

1. Program holder uploads ID + SSN during signup
2. Documents stored in Supabase Storage
3. Admin reviews in verification dashboard
4. Admin approves/rejects with notes
5. Status updated → Program holder notified

**Admin Dashboard**: `/admin/program-holders/verification`

**Verification Checklist**:

- [ ] Photo ID matches name
- [ ] SSN card is valid
- [ ] Credentials are current
- [ ] Syllabus meets standards
- [ ] Banking information complete
- [ ] Background check passed

### Phase 2: Automated Verification (Planned)

**Integration**: Stripe Identity API

**Process**:

1. After signup, redirect to Stripe Identity
2. User takes selfie + uploads ID
3. Stripe verifies automatically
4. Results returned via webhook
5. Auto-approve if verification passes

**Cost**: ~$1.50 per verification

**Benefits**:

- Instant verification
- Fraud detection
- Compliance (KYC/AML)
- Reduced admin workload

## Database Schema

### program_holder_documents

```sql
CREATE TABLE program_holder_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID REFERENCES auth.users(id),
  document_type TEXT, -- 'id', 'ssn', 'credentials', 'syllabus', 'bank_document'
  file_path TEXT,
  file_name TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  notes TEXT
);
```

### program_holder_banking

```sql
CREATE TABLE program_holder_banking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID REFERENCES auth.users(id),
  account_holder_name TEXT,
  bank_name TEXT,
  account_type TEXT,
  routing_number TEXT, -- ENCRYPTED
  account_number TEXT, -- ENCRYPTED
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### program_holder_verification

```sql
CREATE TABLE program_holder_verification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID REFERENCES auth.users(id),
  verification_type TEXT, -- 'manual', 'stripe_identity'
  status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  stripe_verification_session_id TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Security & Compliance

### Banking Data Protection

- **Encryption**: AES-256 encryption at rest
- **Access Control**: Admin-only access to full details
- **Audit Logging**: All access logged
- **PCI Compliance**: Follow PCI-DSS guidelines

### Document Storage

- **Bucket**: `program-holder-documents` in Supabase Storage
- **RLS Policies**: Users can only access own documents
- **Retention**: 7 years (compliance requirement)
- **Encryption**: Files encrypted at rest

### Identity Verification

- **Stripe Identity**: SOC 2 Type II certified
- **Data Minimization**: Only collect necessary info
- **GDPR Compliance**: Right to deletion, portability

## Implementation Status

### ✅ Completed

- Automatic role assignment on signup
- Document upload during signup
- Banking information in onboarding
- 5-step onboarding flow
- Data access policy documentation

### 🔄 In Progress

- Admin verification dashboard
- Document review workflow
- Verification status tracking

### ⏳ Planned

- Stripe Identity integration
- Banking data encryption
- Webhook handlers
- Automated approval workflow
- Email notifications

## Next Steps

1. **Create Admin Verification Dashboard**
   - List pending verifications
   - View uploaded documents
   - Approve/reject workflow
   - Request additional documents

2. **Integrate Stripe Identity**
   - Set up Stripe account
   - Create verification sessions
   - Handle webhooks
   - Update verification status

3. **Add Encryption**
   - Encrypt banking data
   - Secure document storage
   - Implement audit logging

4. **Build Notifications**
   - Email on verification status
   - SMS for urgent updates
   - In-app notifications

5. **Testing**
   - End-to-end signup flow
   - Document upload/review
   - Banking information security
   - Identity verification

## Support

**Technical**: Elevate4humanityedu@gmail.com  
**Partnership**: elizabeth@elevateforhumanity.org  
**Phone**: 317-314-3757  
**Portal**: elevateforhumanity.org/support
