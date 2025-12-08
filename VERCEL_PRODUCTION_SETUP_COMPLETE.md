# VERCEL PRODUCTION SETUP - COMPLETE GUIDE

**Last Updated:** December 8, 2024  
**Time Required:** 30-60 minutes  
**Cost:** $0 (all free tiers available)

---

## 🎯 QUICK START (30 Minutes)

### Step 1: Email Service (REQUIRED - 10 minutes)

**Option A: Resend (Recommended)**

1. Go to [resend.com](https://resend.com)
2. Sign up with GitHub
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with `re_`)
5. Add to Vercel:

```bash
# Go to: Vercel Dashboard → Settings → Environment Variables
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**Free Tier:** 3,000 emails/month, 100 emails/day

**Option B: SendGrid (Alternative)**

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for free account
3. Settings → API Keys → Create API Key
4. Copy the key (starts with `SG.`)
5. Add to Vercel:

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
```

**Free Tier:** 100 emails/day

**Option C: Gmail SMTP (Backup)**

1. Enable 2FA on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate App Password
4. Add to Vercel:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
SMTP_FROM_NAME=Elevate for Humanity
```

---

### Step 2: Stripe Payments (REQUIRED - 10 minutes)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create account or log in
3. Get API keys: **Developers → API keys**
4. Copy both keys
5. Add to Vercel:

```bash
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
```

6. Create webhook: **Developers → Webhooks → Add endpoint**
   - URL: `https://www.elevateforhumanity.org/api/stripe/webhook`
   - Events to send: Select all `checkout.session.*` and `payment_intent.*`
   - Copy webhook secret

7. Add webhook secret to Vercel:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**Test Mode (for development):**
```bash
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

---

### Step 3: Sentry Error Tracking (RECOMMENDED - 5 minutes)

1. Go to [sentry.io](https://sentry.io)
2. Sign up (free tier: 5,000 errors/month)
3. Create Project → Select "Next.js"
4. Copy DSN
5. Add to Vercel:

```bash
SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/123456
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=fix2
SENTRY_ENVIRONMENT=production
```

---

### Step 4: Partner Integrations (OPTIONAL - 5 minutes each)

**All partners now use direct links (no API keys needed!)**

But if you want API access for advanced features:

#### HSI (Health & Safety Institute)
```bash
HSI_API_KEY=your-hsi-api-key
HSI_API_SECRET=your-hsi-secret
HSI_ORG_ID=your-org-id
```

Contact: [hsi.com/contact](https://www.hsi.com/contact)

#### NRF/ServSafe
```bash
NRF_API_KEY=your-nrf-api-key
NRF_ORG_ID=your-org-id
```

Contact: [servsafe.com/contact](https://www.servsafe.com/contact)

#### JRI/EmployIndy
```bash
JRI_API_KEY=your-jri-api-key
EMPLOYINDY_TOVUTI_URL=https://employindy.tovutilms.com
```

Contact: [employindy.org/contact](https://employindy.org/contact)

#### CareerSafe
```bash
CAREERSAFE_API_KEY=your-careersafe-key
CAREERSAFE_ORG_ID=your-org-id
```

Contact: [careersafeonline.com/contact](https://www.careersafeonline.com/contact)

---

## 📋 COMPLETE ENVIRONMENT VARIABLES CHECKLIST

### ✅ ALREADY SET (Verified Working)
```bash
NEXT_PUBLIC_SUPABASE_URL=✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=✅
SUPABASE_SERVICE_ROLE_KEY=✅
NEXT_PUBLIC_SITE_URL=✅
NEXT_PUBLIC_GA_MEASUREMENT_ID=✅
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=✅
```

### ❌ NEED TO ADD (Critical)
```bash
# Email (Choose ONE)
RESEND_API_KEY=re_xxxxx
# OR
SENDGRID_API_KEY=SG.xxxxx
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Stripe Payments
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Error Tracking
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### ⚠️ OPTIONAL (Nice to Have)
```bash
# Partner APIs (optional - using links instead)
HSI_API_KEY=
NRF_API_KEY=
JRI_API_KEY=
CAREERSAFE_API_KEY=

# Video Hosting (optional)
VIMEO_ACCESS_TOKEN=
YOUTUBE_API_KEY=

# SCORM Cloud (optional)
SCORM_CLOUD_APP_ID=
SCORM_CLOUD_SECRET_KEY=

# Redis (optional - for caching)
REDIS_URL=
```

---

## 🚀 HOW TO ADD TO VERCEL

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** Variable name (e.g., `RESEND_API_KEY`)
   - **Value:** Your API key
   - **Environments:** ✅ Check all (Production, Preview, Development)
6. Click **Save**
7. **IMPORTANT:** Click **Redeploy** after adding variables

### Method 2: Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add variable
vercel env add RESEND_API_KEY production
# Paste your key when prompted

# Add for all environments
vercel env add RESEND_API_KEY preview
vercel env add RESEND_API_KEY development

# Pull to local
vercel env pull .env.local
```

---

## 🧪 TESTING AFTER SETUP

### Test Email Service

1. Trigger a test email (e.g., password reset)
2. Check your inbox
3. If no email, check Vercel logs: `vercel logs`

### Test Stripe Payments

1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Complete checkout
5. Check Stripe dashboard for payment

### Test Sentry

1. Visit your site
2. Open browser console
3. Type: `throw new Error('Test error')`
4. Check Sentry dashboard for error

---

## 📊 PRIORITY ORDER

### Week 1 (Launch Blockers)
- [ ] Email service (Resend/SendGrid/SMTP)
- [ ] Stripe keys (if accepting payments)
- [ ] Verify Supabase keys
- [ ] Test all critical flows

### Week 2 (Important)
- [ ] Sentry error tracking
- [ ] Test email notifications
- [ ] Test payment flow
- [ ] Monitor for issues

### Week 3+ (Optional)
- [ ] Partner API keys (if needed)
- [ ] Video hosting setup
- [ ] SCORM Cloud (if needed)
- [ ] Redis caching

---

## 💰 COST BREAKDOWN

| Service | Free Tier | Paid Plans | Recommended |
|---------|-----------|------------|-------------|
| **Resend** | 3,000/month | $20/month for 50k | ✅ Start free |
| **SendGrid** | 100/day | $15/month for 40k | ✅ Start free |
| **Stripe** | Free | 2.9% + 30¢ per transaction | ✅ Free |
| **Sentry** | 5,000 errors/month | $26/month for 50k | ✅ Start free |
| **Supabase** | 500MB database | $25/month for 8GB | ✅ Start free |
| **Vercel** | 100GB bandwidth | $20/month for 1TB | ✅ Start free |

**Total Monthly Cost (Free Tier):** $0  
**Total Monthly Cost (Paid):** ~$100 (only if you exceed free tiers)

---

## 🔐 SECURITY BEST PRACTICES

### DO:
- ✅ Use environment variables for all secrets
- ✅ Never commit `.env` files to git
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys every 90 days
- ✅ Use Vercel's encrypted storage
- ✅ Enable 2FA on all service accounts

### DON'T:
- ❌ Hardcode API keys in code
- ❌ Share keys in Slack/email
- ❌ Use production keys in development
- ❌ Commit `.env.local` to git
- ❌ Use the same key across multiple projects

---

## 🎯 QUICK COPY-PASTE SETUP

### 1. Create `.env.production` file locally:

```bash
# Email (choose one)
RESEND_API_KEY=re_xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Sentry
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=fix2
```

### 2. Add to Vercel:

```bash
# Option A: Use Vercel CLI
vercel env add < .env.production

# Option B: Copy-paste each line into Vercel Dashboard
```

### 3. Redeploy:

```bash
vercel --prod
```

---

## ✅ FINAL CHECKLIST

Before going live:

- [ ] Email service configured and tested
- [ ] Stripe keys added and payment tested
- [ ] Sentry DSN added and errors tracked
- [ ] All Supabase keys verified
- [ ] Site URL correct in all environments
- [ ] Webhook endpoints configured
- [ ] Test emails sending
- [ ] Test payments processing
- [ ] Test error tracking
- [ ] Monitor logs for missing env vars
- [ ] Document all keys in password manager
- [ ] Set up alerts for critical errors
- [ ] Test on production domain
- [ ] Verify SSL certificate
- [ ] Check all pages load correctly

---

## 🚨 TROUBLESHOOTING

### "Email not sending"
**Solution:**
1. Check `RESEND_API_KEY` or `SENDGRID_API_KEY` is set
2. Verify key format is correct
3. Check Vercel logs: `vercel logs`
4. Test with a simple email first

### "Stripe payment failing"
**Solution:**
1. Verify all 3 Stripe keys are set
2. Check webhook is configured correctly
3. Use test mode first (`sk_test_...`)
4. Check Stripe dashboard for errors

### "Sentry not catching errors"
**Solution:**
1. Verify `SENTRY_DSN` format
2. Redeploy after adding DSN
3. Trigger a test error
4. Check Sentry dashboard

### "Environment variable not found"
**Solution:**
1. Verify variable is added in Vercel
2. Check all environments are selected
3. Redeploy after adding variables
4. Clear build cache if needed

---

## 📞 SUPPORT CONTACTS

### Resend
- Docs: [resend.com/docs](https://resend.com/docs)
- Support: [resend.com/support](https://resend.com/support)

### Stripe
- Docs: [stripe.com/docs](https://stripe.com/docs)
- Support: [support.stripe.com](https://support.stripe.com)

### Sentry
- Docs: [docs.sentry.io](https://docs.sentry.io)
- Support: [sentry.io/support](https://sentry.io/support)

### Vercel
- Docs: [vercel.com/docs](https://vercel.com/docs)
- Support: [vercel.com/support](https://vercel.com/support)

---

## 🎉 YOU'RE READY!

Once you've completed this checklist:

✅ Email notifications will work  
✅ Payments will process  
✅ Errors will be tracked  
✅ Site will be production-ready  

**Estimated Setup Time:** 30-60 minutes  
**Total Cost:** $0 (using free tiers)  
**Impact:** CRITICAL (required for production)

---

## 🚀 NEXT STEPS

1. **Now:** Add email service (10 min)
2. **Now:** Add Stripe keys (10 min)
3. **Now:** Add Sentry DSN (5 min)
4. **Now:** Redeploy and test
5. **This Week:** Monitor logs and errors
6. **This Month:** Optimize based on usage

**Ready to launch!** 🎊
