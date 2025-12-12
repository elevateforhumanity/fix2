# 🚀 Production Deployment Guide

## Elevate for Humanity

---

## 📋 Pre-Deployment Checklist

### 1. Database Setup (Supabase)

#### Step 1: Run Production Setup SQL

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open `supabase/PRODUCTION_SETUP.sql`
4. Run the entire script
5. Verify output shows "Database setup complete!"

#### Step 2: Verify Tables Created

Run this query to check:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected tables (20+):

- profiles
- programs
- courses
- enrollments
- applications
- lessons
- assignments
- assignment_submissions
- quizzes
- quiz_questions
- quiz_attempts
- certificates
- partner_lms_providers
- partner_lms_courses
- partner_lms_enrollments
- wioa_participants
- employment_outcomes
- onboarding_submissions
- transactions
- blog_posts
- documents

#### Step 3: Verify RLS Policies

```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

Should show multiple policies for each table.

#### Step 4: Seed Initial Data (Optional)

```sql
-- Insert a test admin user (replace with your email)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-email@example.com'),
  'your-email@example.com',
  'Admin User',
  'super_admin'
);

-- Insert sample programs
INSERT INTO public.programs (name, slug, description, duration_weeks, cost, is_active)
VALUES
  ('Barbering', 'barbering', 'Professional barbering certification program', 12, 4500.00, true),
  ('Cosmetology', 'cosmetology', 'Complete cosmetology training', 16, 6000.00, true),
  ('Esthetics', 'esthetics', 'Skincare and esthetics certification', 10, 3500.00, true);
```

---

### 2. Environment Variables

#### Vercel Dashboard

Go to **Settings → Environment Variables** and verify all are set:

**Critical (Must Have):**

```
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

**Optional (Recommended):**

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
SENTRY_DSN=https://...
```

---

### 3. Stripe Setup

#### Step 1: Webhook Configuration

1. Go to Stripe Dashboard → **Developers → Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://elevateforhumanity.org/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

#### Step 2: Test Payment Flow

1. Use Stripe test mode first
2. Test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any 3-digit CVC
5. Verify webhook receives events

#### Step 3: Switch to Live Mode

1. Get live API keys from Stripe
2. Update environment variables
3. Test with real card (small amount)
4. Verify transaction appears in Stripe dashboard

---

### 4. Email Setup (Resend)

#### Step 1: Verify Domain

1. Go to Resend Dashboard → **Domains**
2. Add domain: `elevateforhumanity.org`
3. Add DNS records to your domain provider:
   - TXT record for verification
   - MX records for receiving
   - DKIM records for authentication
4. Wait for verification (can take up to 48 hours)

#### Step 2: Test Email Sending

```bash
curl -X POST https://elevateforhumanity.org/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "message": "Test message"
  }'
```

Check that email arrives at `elevate4humanityedu@gmail.com`

---

### 5. Build & Deploy

#### Step 1: Final Build Test

```bash
cd /workspaces/fix2
pnpm run build
```

Should complete with no errors.

#### Step 2: Deploy to Vercel

```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

#### Step 3: Monitor Deployment

1. Go to Vercel Dashboard
2. Watch build logs
3. Verify deployment succeeds
4. Check deployment URL

---

### 6. Post-Deployment Verification

#### Test Checklist:

**Public Pages:**

- [ ] Homepage loads
- [ ] About page loads
- [ ] Programs page loads
- [ ] Contact form submits
- [ ] Apply form submits

**Authentication:**

- [ ] Login works
- [ ] Signup works
- [ ] Password reset works
- [ ] Redirects work with `next` parameter

**Protected Pages:**

- [ ] Student dashboard requires login
- [ ] Admin portal requires login
- [ ] LMS requires login
- [ ] Staff portal requires login
- [ ] Workforce board requires login

**Payments:**

- [ ] Stripe checkout works
- [ ] Affirm integration works (if enabled)
- [ ] Webhooks receive events
- [ ] Transactions recorded in database

**Email:**

- [ ] Contact form sends email
- [ ] Application form sends email
- [ ] Welcome emails send
- [ ] Password reset emails send

**Mobile:**

- [ ] Test on iPhone
- [ ] Test on Android
- [ ] All pages responsive
- [ ] Forms work on mobile

**Browsers:**

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

---

### 7. Monitoring & Maintenance

#### Set Up Monitoring:

**Vercel Analytics:**

- Enable in Vercel Dashboard
- Monitor page views, performance

**Sentry (Error Tracking):**

```bash
# Already configured in next.config.js
# Just add SENTRY_DSN to environment variables
```

**Uptime Monitoring:**

- Use UptimeRobot or similar
- Monitor: https://elevateforhumanity.org
- Alert email: elevate4humanityedu@gmail.com

#### Regular Checks:

- [ ] Check error logs daily (first week)
- [ ] Monitor email delivery
- [ ] Check payment processing
- [ ] Review user feedback
- [ ] Monitor database performance

---

### 8. Backup & Recovery

#### Database Backups:

Supabase automatically backs up daily. To manually backup:

1. Go to Supabase Dashboard → **Database**
2. Click **Backups**
3. Download latest backup

#### Code Backups:

- Git repository: https://github.com/elevateforhumanity/fix2
- Vercel maintains deployment history
- Keep local copy of `.env` file (secure location)

---

### 9. Troubleshooting

#### Build Fails:

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm run build
```

#### Database Connection Issues:

- Verify Supabase project is active
- Check environment variables
- Verify RLS policies allow access

#### Email Not Sending:

- Check Resend API key
- Verify domain is verified
- Check spam folder
- Review Resend logs

#### Payment Issues:

- Verify Stripe keys (test vs live)
- Check webhook secret
- Review Stripe logs
- Test with Stripe test cards

---

### 10. Support Contacts

**Technical Issues:**

- Email: elevate4humanityedu@gmail.com
- Phone: 317-314-3757

**Service Providers:**

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Stripe Support: https://support.stripe.com
- Resend Support: https://resend.com/support

---

## 🎉 Launch Checklist

Before announcing to users:

- [ ] All environment variables set
- [ ] Database setup complete
- [ ] RLS policies active
- [ ] Stripe webhooks configured
- [ ] Email domain verified
- [ ] SSL certificate active
- [ ] All pages tested
- [ ] Mobile tested
- [ ] Payments tested
- [ ] Forms tested
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Support contacts updated
- [ ] Team trained on admin portal

---

## 📊 Success Metrics

Track these in first 30 days:

- Page views
- User signups
- Applications submitted
- Payments processed
- Email delivery rate
- Error rate
- Page load times
- Mobile vs desktop usage

---

**Deployment Date:** ******\_******

**Deployed By:** ******\_******

**Production URL:** https://elevateforhumanity.org

**Status:** 🟢 READY FOR PRODUCTION
