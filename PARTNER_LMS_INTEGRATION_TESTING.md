# Partner LMS Integration Testing Guide

## Overview

This document outlines the testing procedures for all 6 external LMS partner integrations:
- Certiport (Microsoft Office Specialist)
- HSI (Health & Safety Institute)
- JRI (Janitorial Resource Institute)
- NRF RISE Up (Retail Training)
- CareerSafe (OSHA Safety)
- Milady RISE (Cosmetology/Barbering)

## Prerequisites

### Database Setup
1. Run all migration files in order:
   ```sql
   -- In Supabase SQL Editor, run these files:
   supabase/migrations/20241129_partner_lms_integration.sql
   supabase/migrations/20241129_seed_partner_credentials.sql
   supabase/migrations/20241129_all_certiport_programs.sql
   supabase/migrations/20241129_certiport_accurate_pricing.sql
   supabase/migrations/20241129_add_hsi_certifications.sql
   supabase/migrations/20241129_add_jri_integration.sql
   supabase/migrations/20241129_add_nrf_rise_up.sql
   supabase/migrations/20241129_add_certiport_certifications.sql
   ```

### Environment Variables
Add these to your Vercel/Supabase environment:

```bash
# Stripe (for paid certifications)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (SendGrid or Resend)
SENDGRID_API_KEY=SG...
# OR
RESEND_API_KEY=re_...

# Partner API Keys (when available)
CERTIPORT_API_KEY=PARTNER_WILL_PROVIDE
CERTIPORT_API_SECRET=PARTNER_WILL_PROVIDE
HSI_API_KEY=PARTNER_WILL_PROVIDE
JRI_API_KEY=PARTNER_WILL_PROVIDE
NRF_API_KEY=PARTNER_WILL_PROVIDE
CAREERSAFE_API_KEY=PARTNER_WILL_PROVIDE
MILADY_API_KEY=PARTNER_WILL_PROVIDE
```

## Test Scenarios

### 1. Admin Dashboard Access

**Test:** Access LMS Integrations Dashboard
```
URL: /admin/partners/lms-integrations
Expected: See list of all 6 partner integrations
Status: Should show active/inactive status for each
```

**Verification:**
- [ ] All 6 partners are listed
- [ ] Stats show correct enrollment counts
- [ ] Quick action cards are clickable
- [ ] "Add Integration" button works

---

### 2. Student Enrollment Workflow

#### Test 2.1: Certiport Enrollment
```
1. Navigate to /admin/partners/lms-integrations
2. Click "Enroll Student" on Certiport card
3. Select a student from dropdown
4. Select associated program (optional)
5. Check "Send Welcome Email"
6. Submit enrollment
```

**Expected Results:**
- [ ] Enrollment record created in `partner_lms_enrollments`
- [ ] Status set to "pending"
- [ ] Welcome email queued in `email_queue`
- [ ] Student receives email with Certiport access instructions
- [ ] Email includes promo code (if applicable)

#### Test 2.2: HSI Enrollment (Paid)
```
1. Enroll student in HSI certification
2. System should detect payment requirement
3. Redirect to Stripe checkout
4. Complete test payment
5. Verify enrollment activated after payment
```

**Expected Results:**
- [ ] Payment session created
- [ ] Enrollment status: "payment_pending"
- [ ] After payment: status changes to "active"
- [ ] Welcome email sent after payment
- [ ] Payment logged in `payment_logs`

#### Test 2.3: JRI Enrollment
```
1. Enroll student in JRI course
2. Verify welcome email sent
3. Check enrollment dashboard
```

**Expected Results:**
- [ ] Enrollment created successfully
- [ ] Welcome email includes JRI access URL
- [ ] Student appears in provider dashboard

#### Test 2.4: NRF RISE Up Enrollment
```
1. Enroll student in NRF RISE Up
2. Verify promo code included in email
3. Check enrollment status
```

**Expected Results:**
- [ ] Enrollment created
- [ ] Email includes NRF RISE Up promo code
- [ ] Access instructions provided

#### Test 2.5: CareerSafe Enrollment
```
1. Enroll student in CareerSafe OSHA training
2. Verify payment flow (if required)
3. Check welcome email
```

**Expected Results:**
- [ ] Enrollment created
- [ ] Payment processed (if required)
- [ ] OSHA training access provided

#### Test 2.6: Milady RISE Enrollment
```
1. Enroll student in Milady RISE
2. Verify promo code: efhcti-rise295
3. Check welcome email
```

**Expected Results:**
- [ ] Enrollment created
- [ ] Email includes promo code: efhcti-rise295
- [ ] Contact info for Jessica Boyd included

---

### 3. Email Notifications

#### Test 3.1: Welcome Email
```
Trigger: New enrollment created
Template: partner-welcome.ts
```

**Verify Email Contains:**
- [ ] Student name
- [ ] Provider name
- [ ] Enrollment URL (if available)
- [ ] Promo code (if applicable)
- [ ] Login instructions
- [ ] Contact information
- [ ] "What's Next" steps

#### Test 3.2: Completion Email
```
Trigger: Enrollment status changed to "completed"
Template: partner-completion.ts
```

**Verify Email Contains:**
- [ ] Congratulations message
- [ ] Certificate download link
- [ ] Completion date
- [ ] Next steps

#### Test 3.3: Milestone Email
```
Trigger: Progress reaches 25%, 50%, 75%
Template: partner-milestone.ts
```

**Verify Email Contains:**
- [ ] Milestone achievement
- [ ] Progress percentage
- [ ] Progress bar visual
- [ ] Encouragement message

---

### 4. Payment Integration

#### Test 4.1: Create Payment Session
```typescript
import { createPartnerPaymentSession } from '@/lib/partner-workflows/payments';

const result = await createPartnerPaymentSession({
  studentId: 'student-uuid',
  providerId: 'hsi-provider-uuid',
  amount: 150.00,
  successUrl: 'https://elevateforhumanity.org/success',
  cancelUrl: 'https://elevateforhumanity.org/cancel',
});
```

**Expected:**
- [ ] Stripe session created
- [ ] Checkout URL returned
- [ ] Enrollment status: "payment_pending"

#### Test 4.2: Payment Success Webhook
```
1. Complete test payment in Stripe
2. Webhook triggers handlePaymentSuccess()
3. Verify enrollment activated
```

**Expected:**
- [ ] Enrollment status: "active"
- [ ] Payment status: "paid"
- [ ] Welcome email sent
- [ ] Payment logged

#### Test 4.3: Payment Failure
```
1. Use test card that fails
2. Verify enrollment remains "payment_pending"
3. Check error handling
```

**Expected:**
- [ ] Enrollment status: "payment_failed"
- [ ] Error logged
- [ ] Student notified

---

### 5. Certificate Generation

#### Test 5.1: Create Certificate
```typescript
import { createCertificate } from '@/lib/partner-workflows/certificates';

const result = await createCertificate('enrollment-uuid');
```

**Expected:**
- [ ] Certificate record created
- [ ] Unique certificate number generated
- [ ] Completion email sent
- [ ] Certificate linked to enrollment

#### Test 5.2: Verify Certificate
```typescript
import { verifyCertificate } from '@/lib/partner-workflows/certificates';

const result = await verifyCertificate('CERT-ABC123');
```

**Expected:**
- [ ] Certificate found
- [ ] Validity confirmed
- [ ] Expiration checked (if applicable)
- [ ] Student details returned

#### Test 5.3: Certificate Expiration
```
Test providers with expiring certificates:
- HSI: 2 years
- CareerSafe: 3 years
```

**Expected:**
- [ ] Expiration date calculated correctly
- [ ] Expired certificates marked invalid
- [ ] Renewal notifications sent (future feature)

---

### 6. Progress Tracking

#### Test 6.1: View Provider Dashboard
```
URL: /admin/partners/lms-integrations/[provider-id]
```

**Expected:**
- [ ] Provider details displayed
- [ ] Enrollment stats accurate
- [ ] Student list shows all enrollments
- [ ] Progress bars display correctly

#### Test 6.2: Update Progress
```sql
-- Manually update progress for testing
UPDATE partner_lms_enrollments
SET progress_percentage = 50
WHERE id = 'enrollment-uuid';
```

**Expected:**
- [ ] Progress bar updates
- [ ] Milestone email triggered at 50%
- [ ] Dashboard reflects new progress

---

### 7. Bulk Operations

#### Test 7.1: Bulk Enrollment
```typescript
import { bulkEnrollStudents } from '@/lib/partner-workflows/enrollment';

const result = await bulkEnrollStudents(
  ['student1-uuid', 'student2-uuid', 'student3-uuid'],
  'provider-uuid',
  'program-uuid'
);
```

**Expected:**
- [ ] All students enrolled
- [ ] Welcome emails sent to all
- [ ] Success/failure counts accurate

#### Test 7.2: Bulk Certificate Generation
```typescript
import { generateBulkCertificates } from '@/lib/partner-workflows/certificates';

const result = await generateBulkCertificates([
  'enrollment1-uuid',
  'enrollment2-uuid',
  'enrollment3-uuid'
]);
```

**Expected:**
- [ ] Certificates created for all completed enrollments
- [ ] Completion emails sent
- [ ] Results summary accurate

---

## Integration-Specific Tests

### Certiport
- [ ] Microsoft Office Specialist programs listed
- [ ] Pricing accurate ($150 per exam)
- [ ] Pre-test promotion system works
- [ ] Exam voucher codes generated

### HSI
- [ ] CPR/First Aid/AED certifications available
- [ ] Payment integration works
- [ ] 2-year expiration calculated
- [ ] Renewal reminders sent

### JRI
- [ ] Janitorial training courses listed
- [ ] Free enrollment works
- [ ] Course completion tracked

### NRF RISE Up
- [ ] Retail training modules available
- [ ] Promo code applied correctly
- [ ] Industry certifications tracked

### CareerSafe
- [ ] OSHA 10/30 courses available
- [ ] Payment processing works
- [ ] 3-year expiration calculated
- [ ] Safety certifications issued

### Milady RISE
- [ ] Promo code: efhcti-rise295 works
- [ ] Jessica Boyd contact info included
- [ ] Cosmetology/barbering courses available
- [ ] Course catalog complete (PENDING USER INPUT)

---

## Known Issues & Limitations

### Milady RISE - INCOMPLETE
**Status:** ⚠️ Awaiting course catalog and details

**Missing Information:**
1. Full course catalog
2. Pricing structure
3. Enrollment process details
4. Dashboard URL and credentials
5. API documentation

**Action Required:**
Contact Jessica Boyd to obtain:
- Complete course list
- Pricing per course/student
- Enrollment workflow
- Technical integration details

### API Integrations
**Status:** 🔄 Manual enrollment only

All partners currently use manual enrollment workflow. API integrations can be added when partners provide:
- API endpoints
- Authentication credentials
- API documentation
- Webhook URLs

---

## Success Criteria

### Phase 1: Core Functionality ✅
- [x] Database tables created
- [x] Admin dashboard built
- [x] Enrollment workflows implemented
- [x] Email system configured
- [x] Payment integration complete
- [x] Certificate generation working

### Phase 2: Testing (Current)
- [ ] All 6 partners tested
- [ ] Email templates verified
- [ ] Payment flows confirmed
- [ ] Certificate generation validated
- [ ] Progress tracking accurate

### Phase 3: Production Deployment
- [ ] Milady RISE details obtained
- [ ] Partner credentials configured
- [ ] API integrations enabled (when available)
- [ ] Monitoring and alerts set up
- [ ] Documentation complete

---

## Troubleshooting

### Enrollment Fails
1. Check database connection
2. Verify student and provider IDs exist
3. Check email queue for errors
4. Review Supabase logs

### Email Not Sent
1. Verify email provider credentials (SendGrid/Resend)
2. Check `email_queue` table for status
3. Run email dispatch function manually
4. Check spam folder

### Payment Issues
1. Verify Stripe keys are correct
2. Check webhook endpoint configured
3. Review Stripe dashboard for errors
4. Test with Stripe test cards

### Certificate Generation Fails
1. Verify enrollment is "completed"
2. Check certificate doesn't already exist
3. Review certificate generation logs
4. Verify PDF generation function deployed

---

## Next Steps

1. **Complete Milady RISE Integration**
   - Obtain course catalog from Jessica Boyd
   - Configure pricing and enrollment process
   - Test end-to-end workflow

2. **Enable API Integrations**
   - Request API credentials from partners
   - Implement automated enrollment
   - Set up progress sync webhooks

3. **Add Advanced Features**
   - Automated progress tracking
   - Certificate renewal reminders
   - Bulk import from CSV
   - Student self-enrollment portal

4. **Production Deployment**
   - Run all migrations in production
   - Configure environment variables
   - Deploy Edge Functions
   - Enable monitoring and alerts

---

## Support

For issues or questions:
- **Technical:** Review Supabase logs and error messages
- **Partner Credentials:** Contact partner representatives
- **Milady RISE:** Contact Jessica Boyd
- **System Issues:** Check GitHub issues or create new one

---

**Last Updated:** November 29, 2024
**Status:** Phase 1 Complete, Phase 2 In Progress
**Next Review:** After Milady RISE details obtained
