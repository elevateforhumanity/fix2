# Stripe Auto-Enrollment System - Status & Testing Guide

## ✅ System Status: READY FOR PRODUCTION

All code is deployed and ready. The system will automatically enroll students after successful Stripe payment.

---

## Required Environment Variables (Already in Vercel)

```bash
STRIPE_SECRET_KEY=sk_live_...          # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...        # Webhook signing secret
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

---

## How Auto-Enrollment Works

### 1. Student Applies & Pays

- Student fills out application at `/apply/full`
- Clicks payment button
- Redirected to Stripe checkout
- Completes payment

### 2. Stripe Webhook Triggers (Automatic)

- Stripe sends `checkout.session.completed` event
- Webhook endpoint: `https://www.elevateforhumanity.org/api/stripe/webhook`
- System receives payment confirmation

### 3. Auto-Enrollment Happens (< 5 seconds)

```
✅ Application status → 'accepted'
✅ Payment status → 'paid'
✅ Enrollment created with status 'active'
✅ AI instructor assigned (if applicable)
✅ Milady provisioned (for barber program)
✅ Welcome email sent to student
```

### 4. Student Can Start Learning

- Receives welcome email with login link
- Logs in at `/login`
- Sees enrolled courses
- Can start immediately

---

## Webhook Configuration in Stripe Dashboard

**Already configured, but for reference:**

1. **Endpoint URL**: `https://www.elevateforhumanity.org/api/stripe/webhook`
2. **Events to listen for**:
   - `checkout.session.completed` ← **Main event for enrollment**
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. **Webhook signing secret**: Stored in Vercel as `STRIPE_WEBHOOK_SECRET`

---

## Testing Checklist

### Test Mode (Recommended First)

1. **Switch to Stripe Test Mode**
   - Use test keys in Vercel: `sk_test_...`
   - Update webhook to use test endpoint

2. **Create Test Application**
   - Go to `/apply/full`
   - Fill out form with test email
   - Select a program

3. **Complete Test Payment**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

4. **Verify Auto-Enrollment**
   - Check Stripe Dashboard → Webhooks → View events
   - Should see `checkout.session.completed` with 200 response
   - Check database: `applications` table → status should be 'accepted'
   - Check database: `enrollments` table → new record with status 'active'
   - Check email: Welcome email should be sent

5. **Test Student Login**
   - Student logs in at `/login`
   - Should see enrolled program
   - Can access course materials

### Production Testing

1. **Use Live Keys**
   - Ensure `STRIPE_SECRET_KEY` starts with `sk_live_`
   - Ensure webhook is configured for production

2. **Small Test Payment**
   - Create real application
   - Complete payment with real card
   - Verify enrollment happens

3. **Monitor First Few Enrollments**
   - Check Stripe webhook logs
   - Verify emails are sent
   - Confirm students can log in

---

## Troubleshooting

### Webhook Not Receiving Events

**Check:**

- Webhook URL is correct in Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Vercel deployment is live (not in draft)

**View Logs:**

- Stripe Dashboard → Webhooks → Click endpoint → View events
- Vercel Dashboard → Logs → Filter by `/api/stripe/webhook`

### Enrollment Not Created

**Check:**

1. Webhook received event (200 response in Stripe)
2. Metadata includes `student_id`, `program_id`, `program_slug`
3. Database tables exist: `applications`, `enrollments`
4. RLS policies allow inserts

**Debug:**

```sql
-- Check if application was updated
SELECT * FROM applications
WHERE email = 'test@example.com'
ORDER BY created_at DESC LIMIT 1;

-- Check if enrollment was created
SELECT * FROM enrollments
WHERE student_id = 'user-id-here'
ORDER BY created_at DESC LIMIT 1;
```

### Welcome Email Not Sent

**Check:**

- `RESEND_API_KEY` is set in Vercel
- Email API endpoint exists: `/api/email/send`
- Check Vercel logs for email errors

**Note:** Email failure won't prevent enrollment - it's a non-blocking operation

---

## Database Schema

### Applications Table

```sql
applications:
  - id (UUID)
  - first_name, last_name, email, phone
  - program_id (TEXT - program slug)
  - status ('pending', 'accepted', 'rejected', 'pending_payment')
  - payment_status ('pending', 'paid', 'failed', 'refunded')
  - stripe_session_id (TEXT)
  - created_at, updated_at
```

### Enrollments Table

```sql
enrollments:
  - id (UUID)
  - student_id (UUID - references profiles)
  - program_id (UUID - references programs)
  - status ('active', 'completed', 'withdrawn')
  - payment_status ('pending', 'paid')
  - enrolled_at (TIMESTAMPTZ)
  - created_at, updated_at
```

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Conversion Rate**
   - Applications created vs. payments completed
   - Check: `applications` where `payment_status = 'paid'`

2. **Enrollment Success Rate**
   - Payments completed vs. enrollments created
   - Should be 100% if webhook is working

3. **Time to Enrollment**
   - Payment completed → enrollment active
   - Should be < 5 seconds

### Queries for Monitoring

```sql
-- Recent enrollments (last 24 hours)
SELECT
  e.id,
  e.enrolled_at,
  p.full_name as student_name,
  pr.name as program_name,
  e.payment_status
FROM enrollments e
JOIN profiles p ON e.student_id = p.id
JOIN programs pr ON e.program_id = pr.id
WHERE e.enrolled_at > NOW() - INTERVAL '24 hours'
ORDER BY e.enrolled_at DESC;

-- Applications awaiting payment
SELECT
  id,
  first_name,
  last_name,
  email,
  program_id,
  created_at
FROM applications
WHERE status = 'pending_payment'
AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Failed payments (need follow-up)
SELECT
  id,
  first_name,
  last_name,
  email,
  program_id,
  payment_status,
  created_at
FROM applications
WHERE payment_status = 'failed'
ORDER BY created_at DESC;
```

---

## Support & Maintenance

### Regular Checks (Weekly)

1. Review Stripe webhook logs for errors
2. Check for applications stuck in 'pending_payment'
3. Verify enrollment success rate is 100%
4. Monitor welcome email delivery

### If Issues Arise

1. **Check Vercel Logs**
   - Filter by `/api/stripe/webhook`
   - Look for error messages

2. **Check Stripe Dashboard**
   - Webhooks → View events
   - Look for failed deliveries (non-200 responses)

3. **Manual Enrollment (Fallback)**
   - If webhook fails, admin can manually enroll
   - Go to `/admin/enrollments`
   - Create enrollment record manually

---

## Recent Updates (Dec 18, 2024)

✅ Fixed checkout metadata to include `student_id`, `program_id`, `program_slug`
✅ Added `payment_status` column to applications table
✅ Added `stripe_session_id` tracking
✅ Implemented welcome email on enrollment
✅ Added support for both self-pay and funding flows
✅ Created comprehensive error handling
✅ Added idempotency to prevent double-enrollment

---

## Contact

For technical issues or questions:

- Email: support@elevateforhumanity.org
- Phone: 317-314-3757

---

**Status**: ✅ PRODUCTION READY - Auto-enrollment is fully functional and deployed!
