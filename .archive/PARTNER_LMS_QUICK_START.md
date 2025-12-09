# Partner LMS Integration - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Run Database Migrations (2 minutes)

Copy and paste these files into Supabase SQL Editor **in order**:

1. `supabase/migrations/20241129_partner_lms_integration.sql`
2. `supabase/migrations/20241129_seed_partner_credentials.sql`
3. `supabase/migrations/20241129_all_certiport_programs.sql`
4. `supabase/migrations/20241129_certiport_accurate_pricing.sql`
5. `supabase/migrations/20241129_add_hsi_certifications.sql`
6. `supabase/migrations/20241129_add_jri_integration.sql`
7. `supabase/migrations/20241129_add_nrf_rise_up.sql`
8. `supabase/migrations/20241129_add_certiport_certifications.sql`

---

### Step 2: Add Environment Variables (1 minute)

Add to Vercel:

```bash
# Required for emails
SENDGRID_API_KEY=your_sendgrid_key
# OR
RESEND_API_KEY=your_resend_key

# Required for payments
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

### Step 3: Access Admin Dashboard (30 seconds)

Navigate to:
```
https://your-domain.com/admin/partners/lms-integrations
```

You should see all 6 partner integrations listed.

---

### Step 4: Enroll Your First Student (1 minute)

1. Click "Enroll Student" on any partner card
2. Select a student from the dropdown
3. Check "Send Welcome Email"
4. Click "Enroll Student"

Done! The student will receive a welcome email with access instructions.

---

## 📋 Available Partners

| Partner | Type | Cost | Ready? |
|---------|------|------|--------|
| **Certiport** | Microsoft Office | $150/exam | ✅ Yes |
| **HSI** | CPR/First Aid | $75-$150 | ✅ Yes |
| **JRI** | Janitorial | Free | ✅ Yes |
| **NRF RISE Up** | Retail | Free | ✅ Yes |
| **CareerSafe** | OSHA Safety | $25-$150 | ✅ Yes |
| **Milady RISE** | Cosmetology | TBD | ⚠️ Need details |

---

## 🎯 Common Tasks

### Enroll a Student
1. Go to `/admin/partners/lms-integrations`
2. Click "Enroll Student" on partner card
3. Select student and program
4. Submit

### View Enrollments
1. Go to `/admin/partners/lms-integrations`
2. Click on partner name
3. See all enrollments and progress

### Generate Certificate
Certificates are automatically generated when enrollment status is set to "completed".

### Process Payment
For paid certifications (HSI, CareerSafe):
1. Enroll student
2. System creates Stripe checkout
3. Student completes payment
4. Enrollment automatically activated

---

## ⚠️ Important Notes

### Milady RISE
**Status:** Awaiting course catalog from Jessica Boyd

**What we have:**
- Promo code: `efhcti-rise295`
- Contact: Jessica Boyd

**What we need:**
- Full course catalog
- Pricing structure
- Enrollment process
- Dashboard access

**Action:** Contact Jessica Boyd for details

### API Integrations
**Current:** Manual enrollment only
**Future:** Automated enrollment via partner APIs

To enable API integrations, request credentials from each partner.

---

## 📞 Need Help?

### Documentation
- **Complete Guide:** `PARTNER_LMS_INTEGRATION_COMPLETE.md`
- **Testing Guide:** `PARTNER_LMS_INTEGRATION_TESTING.md`
- **Credentials Needed:** `PARTNER_CREDENTIALS_NEEDED.md`

### Support
- Check Supabase logs for errors
- Verify environment variables are set
- Test with sample student data
- Review email queue for delivery issues

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Can access admin dashboard
- [ ] All 6 partners are listed
- [ ] Can enroll a test student
- [ ] Welcome email is sent
- [ ] Enrollment appears in provider dashboard
- [ ] Payment flow works (for paid partners)
- [ ] Certificate generation works

---

## 🎉 You're Ready!

The system is now operational. You can:
- Enroll students in any of the 6 partners
- Track progress and completions
- Generate certificates
- Process payments
- Send automated emails

**Next Steps:**
1. Contact Jessica Boyd for Milady RISE details
2. Request API credentials from partners
3. Train staff on enrollment process
4. Begin enrolling students!

---

**Questions?** Review the complete documentation in `PARTNER_LMS_INTEGRATION_COMPLETE.md`
