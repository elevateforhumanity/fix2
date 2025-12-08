# VERCEL ENVIRONMENT VARIABLES - COMPLETE SETUP GUIDE

**Last Updated:** December 8, 2024  
**Status:** Most keys already in Vercel, some missing

---

## ✅ ALREADY SET IN VERCEL (Working)

These are confirmed working in production:

```bash
# Supabase (REQUIRED - Already Set)
NEXT_PUBLIC_SUPABASE_URL=✅ Set
NEXT_PUBLIC_SUPABASE_ANON_KEY=✅ Set
SUPABASE_SERVICE_ROLE_KEY=✅ Set

# Site Configuration (REQUIRED - Already Set)
NEXT_PUBLIC_SITE_URL=✅ Set (https://www.elevateforhumanity.org)

# Analytics (Already Set)
NEXT_PUBLIC_GA_MEASUREMENT_ID=✅ Set (Google Analytics)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=✅ Set (Facebook Pixel)
```

---

## ❌ MISSING IN VERCEL (Need to Add)

### Priority 1: EMAIL SERVICE (CRITICAL)

**Option A: Resend (Recommended - Easiest)**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**How to get:**
1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 3,000 emails/month)
3. Create API key
4. Add to Vercel: Settings → Environment Variables → Add
5. Set for: Production, Preview, Development

**Option B: SendGrid (Alternative)**
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

**How to get:**
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up (free tier: 100 emails/day)
3. Create API key
4. Add to Vercel

**Option C: SMTP (Gmail/Custom)**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
SMTP_FROM_NAME=Elevate for Humanity
```

**For Gmail:**
1. Enable 2FA on your Google account
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use that password (not your regular password)

---

### Priority 2: STRIPE PAYMENTS (CRITICAL for Donations/Payments)

```bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**How to get:**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get API keys: Developers → API keys
3. Create webhook: Developers → Webhooks → Add endpoint
   - URL: `https://www.elevateforhumanity.org/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret
5. Add all 3 to Vercel

**Test Mode (for development):**
```bash
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

---

### Priority 3: PARTNER INTEGRATIONS (Optional but Recommended)

#### HSI (Health & Safety Institute)
```bash
HSI_API_KEY=❌ Not set
HSI_API_SECRET=❌ Not set
HSI_API_URL=https://api.hsi.com
```

**Status:** Using direct links instead of API (no keys needed)

#### NRF (National Restaurant Foundation)
```bash
NRF_API_KEY=❌ Not set
NRF_API_URL=https://api.restaurant.org
```

**Status:** Using direct links instead of API (no keys needed)

#### JRI (Job Ready Indy) / EmployIndy
```bash
JRI_API_KEY=❌ Not set
EMPLOYINDY_TOVUTI_URL=https://employindy.tovutilms.com
```

**Status:** Using direct Tovuti LMS links (no API needed)

#### CareerSafe
```bash
CAREERSAFE_API_KEY=❌ Not set
CAREERSAFE_API_URL=https://api.careersafe.com
```

**Status:** Using direct links instead of API (no keys needed)

---

### Priority 4: OPTIONAL SERVICES

#### Sentry (Error Tracking)
```bash
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=fix2
```

**How to get:**
1. Go to [sentry.io](https://sentry.io)
2. Create free account
3. Create new project
4. Copy DSN
5. Add to Vercel

#### SCORM Cloud (External Course Content)
```bash
SCORM_CLOUD_APP_ID=❌ Not set
SCORM_CLOUD_SECRET_KEY=❌ Not set
```

**Status:** Optional - only needed if hosting SCORM courses externally

#### Video Hosting (Vimeo)
```bash
VIMEO_ACCESS_TOKEN=❌ Not set
```

**Status:** Optional - only needed if using Vimeo for course videos

---

## 🔧 HOW TO ADD TO VERCEL

### Method 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `fix2`
3. Go to: Settings → Environment Variables
4. Click "Add New"
5. Enter:
   - **Key:** Variable name (e.g., `RESEND_API_KEY`)
   - **Value:** Your API key
   - **Environments:** Check all (Production, Preview, Development)
6. Click "Save"
7. **IMPORTANT:** Redeploy after adding variables

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add RESEND_API_KEY production
# Paste your key when prompted

# Add for all environments
vercel env add RESEND_API_KEY preview
vercel env add RESEND_API_KEY development
```

### Method 3: Bulk Import
1. Create `.env.production` file locally:
```bash
RESEND_API_KEY=re_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

2. Import to Vercel:
```bash
vercel env pull .env.local
# Edit .env.local with your values
vercel env push .env.local production
```

---

## 📋 QUICK SETUP CHECKLIST

### Immediate (Required for Core Functionality)
- [ ] Email service (Resend/SendGrid/SMTP)
- [ ] Stripe keys (if accepting payments/donations)
- [ ] Verify Supabase keys are set
- [ ] Verify site URL is correct

### Short-term (1-2 weeks)
- [ ] Sentry for error tracking
- [ ] Partner API keys (if needed)
- [ ] Video hosting (if using videos)

### Optional (Nice to have)
- [ ] SCORM Cloud
- [ ] Redis for caching
- [ ] CDN configuration

---

## 🚀 RECOMMENDED SETUP (Minimal)

**For immediate production launch, you only need:**

```bash
# Already Set ✅
NEXT_PUBLIC_SUPABASE_URL=✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=✅
SUPABASE_SERVICE_ROLE_KEY=✅
NEXT_PUBLIC_SITE_URL=✅

# Need to Add ❌
RESEND_API_KEY=re_xxxxx  # Get from resend.com (free)
STRIPE_SECRET_KEY=sk_live_xxxxx  # Get from stripe.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Total time to set up:** 30 minutes

---

## 🔍 HOW TO VERIFY WHAT'S SET

### Check in Vercel Dashboard
1. Go to Settings → Environment Variables
2. Look for these keys:
   - `NEXT_PUBLIC_SUPABASE_URL` ✅
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
   - `SUPABASE_SERVICE_ROLE_KEY` ✅
   - `RESEND_API_KEY` ❌
   - `STRIPE_SECRET_KEY` ❌

### Check in Code
```typescript
// Add this to any page to debug
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('Resend Key:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing');
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Missing');
```

---

## 📧 EMAIL SERVICE COMPARISON

| Service | Free Tier | Ease of Use | Recommended |
|---------|-----------|-------------|-------------|
| **Resend** | 3,000/month | ⭐⭐⭐⭐⭐ | ✅ YES |
| **SendGrid** | 100/day | ⭐⭐⭐⭐ | ✅ YES |
| **Gmail SMTP** | 500/day | ⭐⭐⭐ | ⚠️ OK |
| **AWS SES** | 62,000/month | ⭐⭐ | ⚠️ Complex |

**Recommendation:** Use Resend - it's the easiest and has the best free tier.

---

## 🎯 PRIORITY ORDER

### Week 1 (Critical)
1. ✅ Verify Supabase keys (already set)
2. ❌ Add Resend API key (30 min)
3. ❌ Add Stripe keys (30 min)
4. ✅ Verify site URL (already set)

### Week 2 (Important)
1. Add Sentry for error tracking
2. Test email notifications
3. Test payment flow
4. Monitor for issues

### Week 3+ (Optional)
1. Add partner API keys if needed
2. Set up video hosting if needed
3. Configure CDN if needed
4. Add Redis for caching

---

## 🔐 SECURITY BEST PRACTICES

### DO:
- ✅ Use environment variables for all secrets
- ✅ Never commit `.env` files to git
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys every 90 days
- ✅ Use Vercel's encrypted storage

### DON'T:
- ❌ Hardcode API keys in code
- ❌ Share keys in Slack/email
- ❌ Use production keys in development
- ❌ Commit `.env.local` to git
- ❌ Use the same key across multiple projects

---

## 📞 SUPPORT CONTACTS

### Resend Support
- Website: [resend.com/support](https://resend.com/support)
- Docs: [resend.com/docs](https://resend.com/docs)

### Stripe Support
- Website: [support.stripe.com](https://support.stripe.com)
- Docs: [stripe.com/docs](https://stripe.com/docs)

### Vercel Support
- Website: [vercel.com/support](https://vercel.com/support)
- Docs: [vercel.com/docs](https://vercel.com/docs)

---

## ✅ FINAL CHECKLIST

Before launching to production:

- [ ] All Supabase keys verified in Vercel
- [ ] Email service configured (Resend/SendGrid)
- [ ] Stripe keys added (if accepting payments)
- [ ] Test email sending works
- [ ] Test payment flow works
- [ ] Verify site URL is correct
- [ ] Check error tracking (Sentry)
- [ ] Test on production domain
- [ ] Monitor logs for missing env vars
- [ ] Document all keys in password manager

---

## 🎉 QUICK WIN

**To get email working in 5 minutes:**

1. Go to [resend.com](https://resend.com)
2. Sign up with GitHub
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with `re_`)
5. Go to Vercel → Settings → Environment Variables
6. Add: `RESEND_API_KEY` = `re_xxxxx`
7. Check all environments
8. Click "Save"
9. Redeploy your site
10. Test by triggering an email notification

**Done!** Emails will now work. 🎊
