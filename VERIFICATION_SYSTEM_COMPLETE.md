# Program Holder Verification System - Complete Implementation

## Flow Overview

```
Signup → Onboarding (5 steps) → Identity Verification → Admin Review → Portal Access
```

## 1. Signup (`/program-holder/signup`)

**Automatic Role Assignment** ✅

- User creates account
- Role automatically set to `program_holder`
- Optional document uploads (ID, SSN, credentials, syllabus)
- Email confirmation sent
- Redirected to onboarding

## 2. Onboarding (`/program-holder/onboarding/setup`)

**5-Step Process**:

1. **Organization Information**
   - Organization name
   - Program name

2. **Program Details**
   - Program type
   - Duration
   - Certification offered
   - Delivery method

3. **Upload Syllabus**
   - Course syllabus file
   - Custom student instructions

4. **Banking Information** ✅
   - Account holder name
   - Bank name
   - Account type
   - Routing number
   - Account number
   - Voided check upload (optional)

5. **Review & Submit**
   - Review all information
   - Submit → Redirect to verification

## 3. Identity Verification (`/program-holder/verify-identity`)

**Two Options**:

### Option A: Stripe Identity (Instant) ✅ RECOMMENDED

**Process**:

1. User clicks "Start Instant Verification"
2. API creates Stripe Identity session
3. User redirected to Stripe
4. Takes selfie + photo of ID
5. Stripe verifies automatically
6. Webhook updates database
7. User redirected back with result

**Benefits**:

- Instant verification (minutes)
- Fraud detection
- Liveness check (selfie)
- No manual review needed
- Cost: ~$1.50 per verification

**Files**:

- `/app/program-holder/verify-identity/IdentityVerificationFlow.tsx`
- `/app/api/program-holder/create-verification/route.ts`
- `/app/api/webhooks/stripe-identity/route.ts`

### Option B: Manual Upload (24-48 hours)

**Process**:

1. User uploads ID + SSN photos
2. Documents stored in Supabase Storage
3. Verification record created (status: pending)
4. Admin reviews in dashboard
5. Admin approves/rejects
6. User notified via email

**Files**:

- `/app/program-holder/verify-identity/IdentityVerificationFlow.tsx`
- `/app/admin/program-holders/verification/page.tsx`
- `/app/admin/program-holders/verification/[id]/review/page.tsx`

## 4. Admin Verification Dashboard

**URL**: `/admin/program-holders/verification`

**Features**:

- List of pending verifications
- View uploaded documents
- Review banking information
- Verification history
- Approve/reject workflow
- Add notes

**Review Page**: `/admin/program-holders/verification/[id]/review`

**Actions**:

- ✅ Approve → Set status to `verified`, grant portal access
- ❌ Reject → Set status to `rejected`, notify user
- 📝 Add notes for record keeping

## Database Schema

### program_holders

```sql
ALTER TABLE program_holders ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';
-- Values: 'pending', 'verified', 'rejected', 'failed'
```

### program_holder_documents

```sql
CREATE TABLE IF NOT EXISTS program_holder_documents (
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
CREATE TABLE IF NOT EXISTS program_holder_banking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_holder_id UUID REFERENCES auth.users(id),
  account_holder_name TEXT,
  bank_name TEXT,
  account_type TEXT, -- 'checking', 'savings'
  routing_number TEXT, -- ENCRYPTED
  account_number TEXT, -- ENCRYPTED
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### program_holder_verification

```sql
CREATE TABLE IF NOT EXISTS program_holder_verification (
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

## Stripe Identity Setup

### 1. Enable Stripe Identity

```bash
# Install Stripe
npm install stripe @stripe/stripe-js
```

### 2. Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_IDENTITY_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://yourdomain.com
```

### 3. Configure Webhook

**Stripe Dashboard** → Webhooks → Add Endpoint

**URL**: `https://yourdomain.com/api/webhooks/stripe-identity`

**Events to listen for**:

- `identity.verification_session.verified`
- `identity.verification_session.requires_input`
- `identity.verification_session.canceled`

### 4. Test Mode

Use Stripe test mode for development:

- Test ID documents provided by Stripe
- No actual verification performed
- Free in test mode

## Security

### Banking Data

- **Encryption**: Use Supabase encryption for routing/account numbers
- **Access Control**: Only admins can view full banking details
- **Audit Logging**: Log all access to banking information
- **PCI Compliance**: Follow PCI-DSS guidelines

### Document Storage

- **Bucket**: `program-holder-documents` in Supabase Storage
- **RLS Policies**: Users can only access own documents
- **Retention**: 7 years (compliance requirement)
- **Encryption**: Files encrypted at rest

### Stripe Identity

- **SOC 2 Type II**: Stripe is certified
- **Data Minimization**: Only collect necessary info
- **GDPR Compliance**: Right to deletion, portability
- **Liveness Detection**: Prevents photo spoofing

## User Experience

### Verification Pending State

**URL**: `/program-holder/verify-identity` (when pending)

Shows:

- "Verification Pending" message
- Expected timeline (instant or 24-48 hours)
- Email notification promise
- Link to dashboard (limited access)

### Verification Failed State

Shows:

- "Verification Failed" message
- Reason for failure (if provided)
- "Try Again" button
- Contact support link

### Verification Complete

- Automatic redirect to dashboard
- Full portal access granted
- Welcome email sent

## Testing Checklist

### Signup Flow

- [ ] Create account with automatic role
- [ ] Upload documents during signup (optional)
- [ ] Receive email confirmation
- [ ] Redirect to onboarding

### Onboarding Flow

- [ ] Complete 5 steps
- [ ] Submit banking information
- [ ] Redirect to verification

### Stripe Identity

- [ ] Create verification session
- [ ] Redirect to Stripe
- [ ] Complete verification (test mode)
- [ ] Webhook receives result
- [ ] Database updated correctly
- [ ] User redirected with status

### Manual Upload

- [ ] Upload ID and SSN
- [ ] Documents stored in Supabase
- [ ] Verification record created
- [ ] Admin sees in dashboard
- [ ] Admin can approve/reject
- [ ] User notified of decision

### Admin Dashboard

- [ ] View pending verifications
- [ ] View uploaded documents
- [ ] Review banking information
- [ ] Approve verification
- [ ] Reject verification
- [ ] Add notes

## Cost Analysis

### Stripe Identity

- **Per Verification**: ~$1.50
- **Monthly Volume**: Estimate based on signups
- **Example**: 100 signups/month = $150/month

### Manual Review

- **Cost**: Admin time (15-30 min per review)
- **Scalability**: Limited by admin availability
- **Quality**: Depends on admin training

### Recommendation

- **Start**: Manual review (free, learn patterns)
- **Scale**: Add Stripe Identity when volume increases
- **Hybrid**: Offer both options, track conversion rates

## Deployment Steps

1. **Create Database Tables**

   ```sql
   -- Run migrations for new tables
   ```

2. **Set Up Supabase Storage**

   ```sql
   -- Create bucket
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('program-holder-documents', 'program-holder-documents', false);

   -- Add RLS policies
   ```

3. **Configure Stripe**
   - Enable Stripe Identity in dashboard
   - Add webhook endpoint
   - Copy webhook secret to env vars

4. **Deploy Code**
   - Push to production
   - Verify environment variables
   - Test webhook endpoint

5. **Test End-to-End**
   - Complete signup
   - Complete onboarding
   - Test both verification methods
   - Verify admin dashboard

## Support

**Technical**: Elevate4humanityedu@gmail.com  
**Partnership**: elizabeth@elevateforhumanity.org  
**Phone**: 317-314-3757

## Next Steps

1. ✅ Signup with automatic role (DONE)
2. ✅ 5-step onboarding with banking (DONE)
3. ✅ Identity verification flow (DONE)
4. ✅ Admin verification dashboard (DONE)
5. ✅ Stripe Identity integration (DONE)
6. ⏳ Create database tables
7. ⏳ Set up Supabase Storage bucket
8. ⏳ Configure Stripe webhook
9. ⏳ Add email notifications
10. ⏳ Test end-to-end flow
