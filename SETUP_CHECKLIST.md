# 🚀 Complete Setup Checklist for Elevate for Humanity

**Status:** You have Vercel, Cloudflare, and Supabase configured. This guide covers what's missing.

---

## ✅ Already Configured (You Have These)

- ✅ Vercel deployment
- ✅ Cloudflare DNS/CDN
- ✅ Supabase database
- ✅ Environment variables set up

---

## 🔴 CRITICAL - Must Complete Before Launch

### 1. Run Supabase Migrations (ALL 27 PROGRAMS)

**What:** Insert all 27 workforce development programs into your database.

**Why:** Your programs pages will be empty without this data.

**How:**

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the contents of these files **IN ORDER**:

   **File 1:** `supabase/migrations/20241202_complete_programs_schema.sql`
   - Adds 30+ fields to programs table
   - Run this first

   **File 2:** `supabase/migrations/20241202_complete_all_19_programs.sql`
   - Inserts programs 9-27 with full content
   - 1169 lines of professional program data

6. Click **Run** for each file
7. Verify: Run this query to check:
   ```sql
   SELECT COUNT(*) FROM programs;
   -- Should return 27 or more
   ```

**Files Location:** `/workspaces/fix2/supabase/migrations/`

---

### 2. Stripe Payment Setup (REQUIRED FOR ENROLLMENTS)

**What:** Payment processing for course enrollments.

**Current Status:** ⚠️ Build shows "STRIPE_SECRET_KEY not set"

**Setup Steps:**

1. **Create Stripe Account**
   - Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Complete business verification

2. **Get API Keys**
   - Dashboard → Developers → API keys
   - Copy **Publishable key** (starts with `pk_live_` or `pk_test_`)
   - Copy **Secret key** (starts with `sk_live_` or `sk_test_`)

3. **Set Up Webhook**
   - Dashboard → Developers → Webhooks
   - Click **Add endpoint**
   - Endpoint URL: `https://www.elevateforhumanity.org/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy **Signing secret** (starts with `whsec_`)

4. **Add to Vercel Environment Variables**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Settings → Environment Variables
   - Add these:
     ```
     STRIPE_PUBLIC_KEY=pk_live_...
     STRIPE_SECRET_KEY=sk_live_...
     STRIPE_WEBHOOK_SECRET=whsec_...
     ```

5. **Redeploy**
   - Deployments → Click ⋯ → Redeploy

**Test Mode:** Use `pk_test_` and `sk_test_` keys for testing first.

---

### 3. NextAuth Secret (REQUIRED FOR LOGIN)

**What:** Encryption key for user sessions.

**Setup:**

1. **Generate Secret**
   ```bash
   openssl rand -base64 32
   ```
   Or use: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

2. **Add to Vercel**
   - Settings → Environment Variables
   - Add:
     ```
     NEXTAUTH_SECRET=your-generated-secret-here
     NEXTAUTH_URL=https://www.elevateforhumanity.org
     ```

3. **Redeploy**

---

## 🟡 RECOMMENDED - Complete Within 7 Days

### 4. Error Tracking (Sentry)

**What:** Monitor errors and performance in production.

**Setup:**

1. **Create Account**
   - Go to [https://sentry.io/signup](https://sentry.io/signup)
   - Create organization

2. **Create Project**
   - Platform: Next.js
   - Copy DSN (looks like: `https://...@sentry.io/...`)

3. **Add to Vercel**
   ```
   SENTRY_DSN=https://...@sentry.io/...
   SENTRY_ENVIRONMENT=production
   SENTRY_ORG=your-org-slug
   SENTRY_PROJECT=your-project-slug
   ```

4. **Redeploy**

**Cost:** Free tier includes 5,000 errors/month

---

### 5. Email Service (Choose One)

**What:** Send welcome emails, enrollment confirmations, password resets.

**Option A: Resend (Recommended - Easiest)**

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Verify your domain (or use their test domain)
3. API Keys → Create API Key
4. Add to Vercel:
   ```
   RESEND_API_KEY=re_...
   ```

**Cost:** Free tier includes 3,000 emails/month

**Option B: SendGrid**

1. Go to [https://signup.sendgrid.com](https://signup.sendgrid.com)
2. Settings → API Keys → Create API Key
3. Add to Vercel:
   ```
   SENDGRID_API_KEY=SG...
   SENDGRID_FROM=noreply@elevateforhumanity.org
   ```

**Cost:** Free tier includes 100 emails/day

---

### 6. Slack Notifications (Admin Alerts)

**What:** Get notified when students enroll, complete courses, or errors occur.

**Setup:**

1. **Create Slack Workspace** (if you don't have one)
   - [https://slack.com/create](https://slack.com/create)

2. **Create Incoming Webhook**
   - Go to [https://api.slack.com/apps](https://api.slack.com/apps)
   - Click **Create New App** → From scratch
   - Name: "Elevate Notifications"
   - Select your workspace
   - Features → Incoming Webhooks → Activate
   - Add New Webhook to Workspace
   - Select channel (e.g., #admin-alerts)
   - Copy webhook URL

3. **Add to Vercel**
   ```
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   ```

4. **Redeploy**

**Cost:** Free

---

### 7. OpenAI Integration (AI Features)

**What:** Powers AI course builder, chatbot, content generation.

**Setup:**

1. **Create Account**
   - Go to [https://platform.openai.com/signup](https://platform.openai.com/signup)

2. **Add Payment Method**
   - Settings → Billing → Add payment method
   - Set spending limit (recommend $50/month to start)

3. **Create API Key**
   - API keys → Create new secret key
   - Copy key (starts with `sk-`)

4. **Add to Vercel**
   ```
   OPENAI_API_KEY=sk-...
   ```

5. **Redeploy**

**Cost:** Pay-as-you-go (GPT-4: ~$0.03 per 1K tokens)

---

## 🟢 OPTIONAL - Add As Needed

### 8. Google Analytics

**Setup:**
1. [Google Analytics](https://analytics.google.com)
2. Create property
3. Copy Measurement ID (G-...)
4. Add to Vercel: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...`

---

### 9. Redis Caching (Performance)

**What:** Speeds up API responses and reduces database load.

**Recommended Provider: Upstash (Serverless)**

1. Go to [https://upstash.com](https://upstash.com)
2. Create Redis database
3. Copy REST URL
4. Add to Vercel: `REDIS_URL=redis://...`

**Cost:** Free tier includes 10,000 commands/day

---

### 10. OAuth Providers (Optional Login Methods)

**Google OAuth:**
1. [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials → Create OAuth 2.0 Client ID
3. Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`
4. Add to Vercel:
   ```
   GOOGLE_CLIENT_ID=...apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-...
   ```

**Microsoft OAuth:**
1. [Azure Portal](https://portal.azure.com)
2. Azure Active Directory → App registrations → New registration
3. Redirect URI: `https://your-domain.com/api/auth/callback/microsoft`
4. Add to Vercel:
   ```
   MICROSOFT_CLIENT_ID=...
   MICROSOFT_CLIENT_SECRET=...
   ```

---

## 📋 Deployment Monitoring Checklist

### After Each Deployment:

1. **Check Build Status**
   - Vercel Dashboard → Deployments
   - Ensure "Ready" status (not "Error" or "Canceled")

2. **Test Critical Pages**
   - [ ] Homepage: [https://www.elevateforhumanity.org](https://www.elevateforhumanity.org)
   - [ ] Programs: [https://www.elevateforhumanity.org/programs](https://www.elevateforhumanity.org/programs)
   - [ ] Login: [https://www.elevateforhumanity.org/login](https://www.elevateforhumanity.org/login)
   - [ ] Dashboard: [https://www.elevateforhumanity.org/dashboard](https://www.elevateforhumanity.org/dashboard)

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors (red text)
   - Common issues:
     - "Failed to fetch" = API endpoint issue
     - "Unauthorized" = Auth configuration issue
     - "Network error" = CORS or DNS issue

4. **Monitor Vercel Logs**
   - Deployments → Click deployment → Runtime Logs
   - Look for errors or warnings

5. **Test Enrollment Flow**
   - Browse programs
   - Click "Enroll Now"
   - Complete payment (use Stripe test card: 4242 4242 4242 4242)
   - Verify enrollment appears in dashboard

---

## 🚨 Common Issues & Fixes

### Build Fails with "Missing Environment Variables"

**Fix:** Add all required variables to Vercel:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`

### "Stripe not configured" Error

**Fix:** Add Stripe keys to Vercel and redeploy.

### Programs Page is Empty

**Fix:** Run Supabase migrations (see Step 1 above).

### Login Doesn't Work

**Fix:** 
1. Check `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your domain exactly
3. Check Supabase auth is enabled

### Emails Not Sending

**Fix:**
1. Add email service API key (Resend or SendGrid)
2. Verify sender email is verified in email service
3. Check Vercel logs for email errors

---

## 📊 Current Repository Status

### ✅ Complete
- All 27 programs written (1169 lines of SQL)
- All pages functional (no placeholders)
- Middleware with route protection
- Performance monitoring
- 19 integration modules created
- Comprehensive documentation

### ⚠️ Needs Action
- Run Supabase migrations (programs data)
- Configure Stripe (payment processing)
- Set NextAuth secret (user sessions)
- Add email service (notifications)
- Set up error tracking (monitoring)

---

## 🎯 Priority Order

**Do This Week:**
1. ✅ Run Supabase migrations (30 minutes)
2. ✅ Configure Stripe (1 hour)
3. ✅ Set NextAuth secret (5 minutes)
4. ✅ Add email service (30 minutes)
5. ✅ Set up Sentry (30 minutes)

**Do This Month:**
- Slack notifications
- OpenAI integration
- Google Analytics
- Redis caching

**Optional:**
- OAuth providers
- Additional payment gateways
- Video hosting integrations
- CRM integrations

---

## 📞 Support Resources

- **Documentation:** `/docs/ENVIRONMENT_VARIABLES.md`
- **Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **Stripe Docs:** [https://stripe.com/docs](https://stripe.com/docs)
- **Vercel Docs:** [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)

---

## ✅ Final Checklist Before Going Live

- [ ] All 27 programs visible on /programs page
- [ ] Stripe test payment successful
- [ ] User can sign up and log in
- [ ] User can enroll in a course
- [ ] Enrollment appears in dashboard
- [ ] Welcome email received
- [ ] Admin receives Slack notification (if configured)
- [ ] No console errors on homepage
- [ ] Mobile responsive (test on phone)
- [ ] SSL certificate active (https://)
- [ ] DNS pointing to Vercel
- [ ] Sentry receiving error reports

---

**Last Updated:** December 2, 2024  
**Build Status:** ✅ Successful (594 pages generated)  
**Next Step:** Run Supabase migrations to populate programs
