# Partner LMS Integration - Testing Guide

## Overview
This guide provides step-by-step instructions for testing the complete partner LMS enrollment workflow from course browsing to certificate generation.

## Prerequisites

### 1. Database Setup
Run both SQL migration files in Supabase SQL Editor:
```sql
-- File 1: 20241129_complete_partner_system.sql
-- Creates all tables: providers, courses, enrollments, certificates, etc.

-- File 2: 20241129_add_all_partner_courses.sql
-- Populates 67 sample courses across all 7 partners
```

### 2. Environment Variables
Ensure these are set in `.env.local`:
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Email (Resend)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://...
```

### 3. Stripe Webhook Setup
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy webhook secret to `.env.local`

## Test Scenarios

### Scenario 1: HSI Course Enrollment (Full Workflow)

#### Step 1: Browse Courses
1. Navigate to `/courses/hsi`
2. Verify 4 HSI courses are displayed:
   - Adult CPR/AED ($135)
   - Adult First Aid ($135)
   - Adult CPR/AED + First Aid ($165)
   - BLS for Healthcare Providers ($165)
3. Check "How It Works" and FAQ sections

#### Step 2: Select Course
1. Click "Enroll Now" on any course
2. Should redirect to `/courses/hsi/[courseType]/enroll`
3. Verify course details are displayed correctly
4. Check order summary shows correct pricing

#### Step 3: Complete Enrollment Form
1. Fill in student information:
   - Name: Test Student
   - Email: test@example.com
   - Phone: (555) 123-4567
   - Address: 123 Test St, City, ST 12345
2. Click "Enroll Now" button
3. Should redirect to Stripe Checkout

#### Step 4: Complete Payment
1. Use Stripe test card: `4242 4242 4242 4242`
2. Expiry: Any future date (e.g., 12/25)
3. CVC: Any 3 digits (e.g., 123)
4. ZIP: Any 5 digits (e.g., 12345)
5. Click "Pay"

#### Step 5: Verify Success Page
1. Should redirect to `/courses/hsi/success?session_id=...`
2. Verify enrollment details are displayed
3. Check "What Happens Next" section
4. Verify payment amount matches

#### Step 6: Check Webhook Processing
1. In Stripe CLI, verify webhook received:
   ```
   checkout.session.completed [evt_...]
   ```
2. Check console logs for:
   - "HSI enrollment queued successfully"
   - "HSI payment logged successfully"

#### Step 7: Verify Database Records
Query Supabase to confirm records were created:

```sql
-- Check enrollment queue
SELECT * FROM hsi_enrollment_queue 
WHERE student_email = 'test@example.com' 
ORDER BY created_at DESC LIMIT 1;

-- Check partner enrollment
SELECT * FROM partner_lms_enrollments 
WHERE student_id = '...' 
ORDER BY created_at DESC LIMIT 1;

-- Check payment log
SELECT * FROM payment_logs 
ORDER BY created_at DESC LIMIT 1;
```

#### Step 8: Admin Dashboard
1. Navigate to `/admin/hsi-enrollments`
2. Verify new enrollment appears in "Pending" tab
3. Check all student details are correct
4. Click "Open HSI Enrollment Link" - should open HSI RSV page
5. Click "Mark Enrolled"
6. Enter HSI Student ID (e.g., "HSI-12345")
7. Verify status changes to "Enrolled"

#### Step 9: Email Notifications (Manual Test)
Test the email function:
```bash
curl -X POST http://localhost:3000/api/send-enrollment-email \
  -H "Content-Type: application/json" \
  -d '{
    "enrollmentId": "...",
    "type": "payment_confirmation"
  }'
```

Expected emails:
- Payment confirmation (immediate)
- Enrollment complete (after admin processes)
- Course access reminder (optional)

### Scenario 2: Partner Course Catalog

#### Step 1: Browse All Courses
1. Navigate to `/courses/partners`
2. Verify stats show:
   - 67+ courses available
   - 7 training partners
   - Multiple categories
3. Check course cards display correctly

#### Step 2: Test Search
1. Enter "CPR" in search box
2. Verify only CPR-related courses appear
3. Clear search and verify all courses return

#### Step 3: Test Filters
1. Select "HSI" from Provider dropdown
2. Verify only HSI courses appear (4 courses)
3. Select "Healthcare" from Category dropdown
4. Verify filtered results
5. Test price range filters:
   - Free: Should show NRF RISE Up courses
   - Under $50: CareerSafe, some NRF
   - $50-$150: HSI, Certiport
   - $150-$300: JRI, Milady
   - Over $300: Milady CIMA

#### Step 4: Test Course Details
1. Click on any course card
2. Should navigate to course detail page
3. Verify all information displays correctly

### Scenario 3: Certificate Generation

#### Step 1: Generate Certificate
```bash
curl -X POST http://localhost:3000/api/certificates/generate \
  -H "Content-Type: application/json" \
  -d '{
    "enrollmentId": "...",
    "completionDate": "2024-11-29T00:00:00Z",
    "certificateUrl": "https://example.com/cert.pdf"
  }'
```

#### Step 2: View Certificate
1. Navigate to `/certificates/[certificateNumber]`
2. Verify certificate displays:
   - Student name
   - Course name
   - Certificate number
   - Issue date
   - Expiry date (2 years from issue)
   - Valid status badge
3. Test print functionality
4. Test download PDF link (if provided)

#### Step 3: Verify Database
```sql
SELECT * FROM partner_certificates 
WHERE certificate_number = 'CERT-HSI-...';
```

## Error Scenarios

### Test 1: Invalid Payment
1. Use declined card: `4000 0000 0000 0002`
2. Verify error message appears
3. Confirm no enrollment record created

### Test 2: Duplicate Enrollment
1. Attempt to enroll in same course twice
2. System should allow (no duplicate prevention yet)
3. Admin can see multiple pending enrollments

### Test 3: Expired Certificate
1. Manually update certificate expiry_date to past date
2. View certificate page
3. Verify "Certificate Expired" badge appears

### Test 4: Missing Environment Variables
1. Remove STRIPE_SECRET_KEY from .env.local
2. Attempt checkout
3. Verify graceful error handling

## Performance Tests

### Load Test: Multiple Enrollments
```bash
# Use Apache Bench or similar
ab -n 100 -c 10 http://localhost:3000/courses/partners
```

### Database Query Performance
```sql
-- Test course catalog query
EXPLAIN ANALYZE 
SELECT * FROM partner_courses_catalog 
WHERE is_active = true;

-- Test enrollment queue query
EXPLAIN ANALYZE 
SELECT * FROM hsi_enrollment_queue 
WHERE enrollment_status = 'pending';
```

## Integration Tests

### Stripe Webhook Validation
1. Send test webhook from Stripe Dashboard
2. Verify signature validation works
3. Test with invalid signature - should return 400

### Supabase RLS Policies
1. Test as authenticated user
2. Test as anonymous user
3. Verify proper access controls

### Email Delivery
1. Check Resend dashboard for sent emails
2. Verify email templates render correctly
3. Test with different email providers (Gmail, Outlook, etc.)

## Checklist

Before going live, verify:

- [ ] All database migrations run successfully
- [ ] 67 sample courses populated
- [ ] Stripe webhook endpoint configured
- [ ] Environment variables set in production
- [ ] Email templates tested and working
- [ ] Admin dashboard accessible
- [ ] Certificate generation working
- [ ] Success pages display correctly
- [ ] Error handling graceful
- [ ] Mobile responsive design tested
- [ ] Browser compatibility checked (Chrome, Firefox, Safari)
- [ ] SSL certificate installed
- [ ] Domain configured correctly
- [ ] Backup strategy in place
- [ ] Monitoring/logging configured

## Common Issues

### Issue: Webhook not receiving events
**Solution**: 
- Check Stripe CLI is running
- Verify webhook secret matches
- Check firewall/network settings

### Issue: Database connection errors
**Solution**:
- Verify Supabase credentials
- Check service role key has proper permissions
- Ensure RLS policies allow access

### Issue: Email not sending
**Solution**:
- Verify Resend API key
- Check email domain verification
- Review Resend dashboard for errors

### Issue: Checkout session fails
**Solution**:
- Verify Stripe keys are correct (test vs live)
- Check course exists in database
- Review browser console for errors

## Next Steps

After successful testing:

1. **Purchase HSI Credits**: Email Geoff Albrecht to buy 25 RSV credits ($2,125)
2. **Finalize Partner Pricing**: 
   - Call Milady: 866-848-5143
   - Email National Drug Screening: Sales@nationaldrugscreening.com
3. **Add Remaining Courses**: Import full 1,200+ course catalog
4. **Configure Production**: 
   - Set live Stripe keys
   - Configure production webhook
   - Update environment variables
5. **Launch Marketing**: 
   - Announce new courses
   - Email existing students
   - Update website homepage

## Support

For issues or questions:
- Technical: support@elevateforhumanity.org
- HSI Partnership: Geoff Albrecht (geoff.albrecht@hsi.com)
- Stripe Support: https://support.stripe.com
