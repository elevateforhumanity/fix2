# 🚀 COMPLETE DEPLOYMENT GUIDE

**Platform:** Elevate For Humanity  
**Status:** Ready to Deploy  
**Timeline:** 2-4 hours

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### 1. Code Ready
- [x] All 611 pages built
- [x] Database schema complete
- [x] API routes functional
- [x] Legal pages complete
- [x] Partner integrations documented

### 2. Environment Variables
- [ ] Copy `.env.production.example` to `.env.production`
- [ ] Fill in all required values
- [ ] Test locally with production env

### 3. Database
- [ ] Supabase project created
- [ ] All migrations run
- [ ] RLS policies enabled
- [ ] Seed data loaded (optional)

### 4. Third-Party Services
- [ ] Stripe account set up
- [ ] Email service configured (Resend/SendGrid)
- [ ] Domain purchased
- [ ] SSL certificate (automatic with Vercel)

---

## 🔧 STEP-BY-STEP DEPLOYMENT

### STEP 1: Set Up Supabase (30 minutes)

**1.1 Create Project:**
```bash
# Go to: https://supabase.com/dashboard
# Click "New Project"
# Name: elevate-for-humanity-prod
# Database Password: [SAVE THIS]
# Region: US East (closest to users)
```

**1.2 Run Migrations:**
```sql
-- In Supabase SQL Editor, run these in order:

-- 1. Core schema
migrations/wioa-compliance-full.sql

-- 2. Partner courses
supabase/migrations/20241129_add_all_partner_courses.sql

-- 3. AI instructor
supabase/migrations/20241129_ai_instructor_and_certificates.sql

-- 4. All other migrations in supabase/migrations/
```

**1.3 Get API Keys:**
```bash
# Settings → API
# Copy:
# - Project URL (NEXT_PUBLIC_SUPABASE_URL)
# - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
# - service_role key (SUPABASE_SERVICE_ROLE_KEY)
```

---

### STEP 2: Set Up Vercel (20 minutes)

**2.1 Install Vercel CLI:**
```bash
npm i -g vercel
vercel login
```

**2.2 Link Project:**
```bash
cd /workspaces/fix2
vercel link
# Follow prompts to create new project
```

**2.3 Set Environment Variables:**
```bash
# Option A: Via CLI
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# ... repeat for all vars

# Option B: Via Dashboard
# Go to: https://vercel.com/dashboard
# Select project → Settings → Environment Variables
# Add all variables from .env.production.example
```

---

### STEP 3: Configure Domain (15 minutes)

**3.1 Add Domain to Vercel:**
```bash
# In Vercel Dashboard:
# Project → Settings → Domains
# Add: elevateforhumanity.org
# Add: www.elevateforhumanity.org
```

**3.2 Update DNS:**
```bash
# At your domain registrar (GoDaddy, Namecheap, etc.):
# Add A record:
# Type: A
# Name: @
# Value: 76.76.21.21

# Add CNAME record:
# Type: CNAME
# Name: www
# Value: cname.vercel-dns.com
```

**3.3 Wait for SSL:**
```bash
# Vercel automatically provisions SSL
# Wait 5-10 minutes
# Verify: https://elevateforhumanity.org
```

---

### STEP 4: Set Up Stripe (20 minutes)

**4.1 Create Account:**
```bash
# Go to: https://stripe.com
# Sign up for account
# Complete business verification
```

**4.2 Get API Keys:**
```bash
# Dashboard → Developers → API Keys
# Copy:
# - Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
# - Secret key (STRIPE_SECRET_KEY)
```

**4.3 Set Up Webhooks:**
```bash
# Dashboard → Developers → Webhooks
# Add endpoint: https://elevateforhumanity.org/api/webhooks/stripe
# Select events:
# - checkout.session.completed
# - payment_intent.succeeded
# - payment_intent.payment_failed
# Copy webhook secret (STRIPE_WEBHOOK_SECRET)
```

---

### STEP 5: Set Up Email (15 minutes)

**Option A: Resend (Recommended)**
```bash
# Go to: https://resend.com
# Sign up
# Add domain: elevateforhumanity.org
# Verify DNS records
# Get API key (RESEND_API_KEY)
```

**Option B: SendGrid**
```bash
# Go to: https://sendgrid.com
# Sign up
# Settings → API Keys → Create API Key
# Copy key (SENDGRID_API_KEY)
```

---

### STEP 6: Deploy (10 minutes)

**6.1 Build Locally:**
```bash
cd /workspaces/fix2
pnpm install
pnpm run build
```

**6.2 Test Build:**
```bash
pnpm start
# Visit: http://localhost:3000
# Test key pages:
# - Homepage
# - Programs
# - Enrollment
# - Login
```

**6.3 Deploy to Production:**
```bash
vercel --prod
```

**6.4 Verify Deployment:**
```bash
# Visit: https://elevateforhumanity.org
# Test:
# - Homepage loads
# - Programs page loads
# - Enrollment form works
# - Login works
# - Database connection works
```

---

### STEP 7: Post-Deployment (30 minutes)

**7.1 Test Critical Flows:**
```bash
# 1. User Registration
# - Sign up with test email
# - Verify email received
# - Login works

# 2. Program Enrollment
# - Browse programs
# - Click "Apply Now"
# - Fill enrollment form
# - Submit successfully
# - Confirmation email received

# 3. Admin Access
# - Login as admin
# - View enrollments
# - Access reports
# - Generate certificates
```

**7.2 Set Up Monitoring:**
```bash
# Sentry (Error Tracking)
# Go to: https://sentry.io
# Create project
# Get DSN (NEXT_PUBLIC_SENTRY_DSN)
# Add to Vercel env vars
# Redeploy

# Google Analytics
# Go to: https://analytics.google.com
# Create property
# Get Measurement ID (NEXT_PUBLIC_GA_MEASUREMENT_ID)
# Add to Vercel env vars
# Redeploy
```

**7.3 Configure Backups:**
```bash
# Supabase automatic backups
# Dashboard → Settings → Backups
# Enable daily backups
# Set retention: 7 days minimum
```

---

## 🔒 SECURITY CHECKLIST

### Before Going Live:

- [ ] All environment variables set
- [ ] No secrets in code
- [ ] RLS policies enabled on all tables
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] SQL injection prevention (using Supabase)
- [ ] XSS prevention (React automatic)
- [ ] CSRF protection (Next.js automatic)

---

## 📊 MONITORING SETUP

### Key Metrics to Track:

**1. Uptime:**
```bash
# Use: UptimeRobot or Pingdom
# Monitor: https://elevateforhumanity.org
# Alert if down > 5 minutes
```

**2. Performance:**
```bash
# Vercel Analytics (automatic)
# Track:
# - Page load times
# - Core Web Vitals
# - API response times
```

**3. Errors:**
```bash
# Sentry (configured above)
# Alert on:
# - 500 errors
# - Database errors
# - API failures
```

**4. Business Metrics:**
```bash
# Track in Supabase:
# - New enrollments
# - Active students
# - Course completions
# - Certificate issuance
```

---

## 🚨 TROUBLESHOOTING

### Common Issues:

**Issue: Build fails**
```bash
# Check:
# - All dependencies installed
# - TypeScript errors fixed
# - Environment variables set

# Fix:
pnpm install
pnpm run typecheck
pnpm run build
```

**Issue: Database connection fails**
```bash
# Check:
# - Supabase URL correct
# - API keys correct
# - RLS policies not blocking

# Test:
curl https://your-project.supabase.co/rest/v1/programs \
  -H "apikey: YOUR_ANON_KEY"
```

**Issue: Emails not sending**
```bash
# Check:
# - Email API key correct
# - Domain verified
# - From address configured

# Test:
curl -X POST https://elevateforhumanity.org/api/test-email
```

**Issue: Stripe payments fail**
```bash
# Check:
# - Stripe keys correct (test vs. live)
# - Webhook endpoint configured
# - Webhook secret correct

# Test in Stripe Dashboard:
# Developers → Webhooks → Test webhook
```

---

## ✅ DEPLOYMENT COMPLETE CHECKLIST

### Final Verification:

- [ ] Site loads at https://elevateforhumanity.org
- [ ] SSL certificate active (green padlock)
- [ ] Homepage displays correctly
- [ ] Programs page loads from database
- [ ] Enrollment form submits successfully
- [ ] Confirmation emails send
- [ ] User can login
- [ ] Admin dashboard accessible
- [ ] Database queries work
- [ ] Stripe test payment works
- [ ] All legal pages accessible
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Monitoring active
- [ ] Backups configured

---

## 📞 SUPPORT CONTACTS

### If Issues Arise:

**Vercel Support:**
- Dashboard → Help
- https://vercel.com/support

**Supabase Support:**
- Dashboard → Support
- https://supabase.com/support

**Stripe Support:**
- Dashboard → Help
- https://support.stripe.com

---

## 🎯 POST-LAUNCH TASKS

### Week 1:
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Test all critical flows
- [ ] Fix any bugs found
- [ ] Gather user feedback

### Week 2:
- [ ] Optimize slow pages
- [ ] Add missing content
- [ ] Improve SEO
- [ ] Set up email campaigns
- [ ] Contact workforce boards

### Month 1:
- [ ] Enroll first 10 students
- [ ] Generate first certificates
- [ ] Collect testimonials
- [ ] Refine processes
- [ ] Scale marketing

---

## 💰 COST BREAKDOWN

### Monthly Costs:

**Required:**
- Vercel Pro: $20/mo
- Supabase Pro: $25/mo
- Domain: $12/year ($1/mo)
- **Total: $46/mo**

**Recommended:**
- Stripe: 2.9% + $0.30 per transaction
- Resend: $20/mo (10K emails)
- Sentry: $26/mo (errors)
- **Total: ~$92/mo + transaction fees**

**Optional (for full automation):**
- SCORM Cloud: $99/mo
- ElevenLabs: $22/mo (AI voice)
- OpenAI: ~$50/mo (AI scripts)
- **Total: ~$263/mo**

---

## 🚀 YOU'RE READY TO LAUNCH!

**Everything is prepared:**
- ✅ Code complete
- ✅ Documentation complete
- ✅ Deployment guide complete
- ✅ Environment variables documented
- ✅ Troubleshooting guide included

**Next steps:**
1. Follow this guide step-by-step
2. Deploy to production
3. Test thoroughly
4. Start enrolling students
5. Generate revenue!

**Timeline:** 2-4 hours to fully deployed

**Questions?** Review the troubleshooting section or contact support.

---

*Last Updated: December 2, 2024*  
*Status: Ready for Production Deployment*
