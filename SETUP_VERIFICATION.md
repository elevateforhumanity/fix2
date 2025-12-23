# Program Holder Verification - Setup Guide

## Quick Start

### 1. Apply Database Migration

```bash
./apply-verification-migration.sh
```

This creates:

- ✅ `program_holder_documents` table
- ✅ `program_holder_banking` table
- ✅ `program_holder_verification` table
- ✅ `program-holder-documents` storage bucket
- ✅ RLS policies for security

### 2. Configure Stripe Identity (Optional but Recommended)

#### A. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

#### B. Enable Stripe Identity

1. In Stripe Dashboard, go to **Identity**
2. Enable Identity verification
3. Configure verification settings:
   - Document types: Driver's License, Passport, ID Card
   - Require live capture: Yes
   - Require matching selfie: Yes

#### C. Set Up Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe-identity`
4. Select events:
   - `identity.verification_session.verified`
   - `identity.verification_session.requires_input`
   - `identity.verification_session.canceled`
5. Copy the **Signing secret** (starts with `whsec_`)

#### D. Add Environment Variables

Add to `.env.local`:

```env
# Stripe Identity
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_IDENTITY_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_URL=https://yourdomain.com
```

### 3. Test the Flow

#### A. Signup

1. Go to `/program-holder/signup`
2. Fill out form
3. Optionally upload documents
4. Confirm email

#### B. Onboarding

1. Complete 5 steps:
   - Organization info
   - Program details
   - Upload syllabus
   - **Banking information** ✅
   - Review & submit
2. Click "Submit Program"

#### C. Identity Verification

1. Redirected to `/program-holder/verify-identity`
2. Choose verification method:
   - **Stripe Identity** (instant, $1.50)
   - **Manual Upload** (24-48 hours, free)

#### D. Stripe Identity Flow

1. Click "Start Instant Verification"
2. Redirected to Stripe
3. Take selfie
4. Photo of ID
5. Stripe verifies automatically
6. Redirected back with result
7. Status updated in database

#### E. Manual Upload Flow

1. Click "Upload Documents"
2. Upload ID photo
3. Upload SSN card photo
4. Submit for review
5. Admin reviews in dashboard
6. Admin approves/rejects
7. User notified

### 4. Admin Verification Dashboard

#### Access

URL: `/admin/program-holders/verification`

#### Features

- View pending verifications
- See uploaded documents
- Review banking information
- Approve/reject applications
- Add verification notes

#### Review Process

1. Click "Review & Verify" on pending application
2. View all uploaded documents
3. Check banking information
4. Use verification checklist:
   - [ ] Photo ID matches name
   - [ ] SSN card is valid
   - [ ] Credentials are current
   - [ ] Syllabus meets standards
   - [ ] Banking info complete
5. Click "Approve & Verify" or "Reject Application"
6. Add notes (optional)
7. Submit decision

## Testing in Development

### Test Stripe Identity (Free in Test Mode)

1. Use test API keys (start with `sk_test_`)
2. Stripe provides test documents
3. No actual verification performed
4. No charges in test mode

### Test Manual Upload

1. Use any image files for ID/SSN
2. Admin can approve/reject in dashboard
3. Test email notifications

## Security Checklist

- [ ] Banking data encrypted at rest
- [ ] RLS policies enabled on all tables
- [ ] Storage bucket is private (not public)
- [ ] Webhook signature verification enabled
- [ ] Admin-only access to sensitive data
- [ ] Audit logging for document access

## Troubleshooting

### Migration Fails

**Error**: Table already exists
**Solution**: Tables already created, safe to ignore

**Error**: Permission denied
**Solution**: Check Supabase service role key

### Stripe Webhook Not Working

**Error**: Signature verification failed
**Solution**: Check `STRIPE_IDENTITY_WEBHOOK_SECRET` is correct

**Error**: 404 on webhook URL
**Solution**: Verify URL is correct and deployed

### Documents Not Uploading

**Error**: Storage bucket not found
**Solution**: Run migration to create bucket

**Error**: Permission denied
**Solution**: Check RLS policies are applied

### Admin Can't See Documents

**Error**: No documents visible
**Solution**: Verify admin role in profiles table

## Production Deployment

### 1. Database

```bash
# Apply migration to production
supabase db push --db-url postgresql://...
```

### 2. Environment Variables

```bash
# Set in Vercel/production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_IDENTITY_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://elevateforhumanity.org
```

### 3. Stripe Webhook

- Update webhook URL to production domain
- Use live mode API keys
- Test with real verification

### 4. Email Notifications

- Configure email service (SendGrid, Resend, etc.)
- Add email templates for:
  - Verification pending
  - Verification approved
  - Verification rejected

## Cost Estimates

### Stripe Identity

- **Per Verification**: $1.50
- **100 signups/month**: $150/month
- **500 signups/month**: $750/month

### Manual Review

- **Cost**: Admin time (15-30 min per review)
- **100 signups/month**: 25-50 hours admin time
- **Scalability**: Limited

### Recommendation

- Start with manual review (free)
- Add Stripe Identity when volume increases
- Offer both options, track conversion rates

## Support

**Technical Issues**: Elevate4humanityedu@gmail.com  
**Partnership Questions**: elizabeth@elevateforhumanity.org  
**Phone**: 317-314-3757

## Documentation

- **Complete System**: `/VERIFICATION_SYSTEM_COMPLETE.md`
- **Onboarding Packet**: `/PROGRAM_HOLDER_ONBOARDING_SYSTEM.md`
- **Data Access Policy**: `/PROGRAM_HOLDER_DATA_ACCESS.md`
- **Portal Access Control**: `/PORTAL_ACCESS_CONTROL.md`
