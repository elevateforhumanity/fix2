# 🔍 What You're Missing - Quick Check

Based on your repository analysis, here's what you need to configure:

---

## ✅ What You Already Have

Based on your setup:
- ✅ Vercel deployment configured
- ✅ Cloudflare DNS/CDN
- ✅ Supabase database
- ✅ Partner integrations (CareerSafe, HSI, JRI, NRF)

---

## 🔴 CRITICAL MISSING (App Won't Work Without These)

### 1. Supabase Environment Variables

**Check if you have these in Vercel:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**How to Find:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. Copy all three values

**Add to Vercel:**
1. [Vercel Dashboard](https://vercel.com/dashboard)
2. Your project → Settings → Environment Variables
3. Add each variable
4. Select all environments (Production, Preview, Development)

---

### 2. Site URL

```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

**Add to Vercel:** Same as above

---

### 3. Stripe Payment Keys

**Your build log shows:** `STRIPE_SECRET_KEY not set`

```bash
STRIPE_PUBLIC_KEY=pk_live_... (or pk_test_... for testing)
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Get from:** [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

---

### 4. NextAuth Secret

```bash
NEXTAUTH_SECRET=<generate-random-32-char-string>
NEXTAUTH_URL=https://www.elevateforhumanity.org
```

**Generate secret:**
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

---

## 🟡 RECOMMENDED (App Works But Limited)

### 5. Email Service (Choose One)

**Option A: Resend (Easiest)**
```bash
RESEND_API_KEY=re_...
```
Get from: [Resend Dashboard](https://resend.com/api-keys)

**Option B: SendGrid**
```bash
SENDGRID_API_KEY=SG...
SENDGRID_FROM=noreply@elevateforhumanity.org
```
Get from: [SendGrid Dashboard](https://app.sendgrid.com/settings/api_keys)

---

### 6. Error Tracking

```bash
SENTRY_DSN=https://...@sentry.io/...
SENTRY_ENVIRONMENT=production
```
Get from: [Sentry Dashboard](https://sentry.io)

---

### 7. Slack Notifications

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```
Get from: [Slack API](https://api.slack.com/apps)

---

### 8. OpenAI (AI Features)

```bash
OPENAI_API_KEY=sk-...
```
Get from: [OpenAI Platform](https://platform.openai.com/api-keys)

---

## 🟢 OPTIONAL (Nice to Have)

### 9. Google Analytics
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

### 10. Redis Caching
```bash
REDIS_URL=redis://...
```

### 11. OAuth Providers
```bash
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
```

---

## 📋 Quick Setup Checklist

**Do This Now (30 minutes):**

1. [ ] Get Supabase keys → Add to Vercel
2. [ ] Set NEXT_PUBLIC_SITE_URL → Add to Vercel
3. [ ] Generate NEXTAUTH_SECRET → Add to Vercel
4. [ ] Get Stripe keys → Add to Vercel
5. [ ] Redeploy in Vercel
6. [ ] Run Supabase migrations (see SETUP_CHECKLIST.md)

**Do This Week:**

7. [ ] Set up email service (Resend or SendGrid)
8. [ ] Configure Sentry error tracking
9. [ ] Set up Slack notifications
10. [ ] Add OpenAI API key

---

## 🚀 How to Add Variables to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Settings → Environment Variables
4. Click "Add New"
5. Enter:
   - **Key:** Variable name (e.g., `STRIPE_SECRET_KEY`)
   - **Value:** Your secret value
   - **Environments:** Select all (Production, Preview, Development)
6. Click "Save"
7. Repeat for each variable
8. Go to Deployments → Click ⋯ → Redeploy

### Method 2: Vercel CLI (Faster for Multiple Variables)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add STRIPE_PUBLIC_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production

# Redeploy
vercel --prod
```

---

## 🔍 How to Check What You Have

### Check Vercel Variables:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Look for these critical ones:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXTAUTH_SECRET`
   - `STRIPE_SECRET_KEY`

### Check Build Logs:

1. Vercel Dashboard → Deployments → Latest deployment
2. Click "Building" or "View Function Logs"
3. Look for warnings like:
   - ❌ `STRIPE_SECRET_KEY not set`
   - ❌ `NEXT_PUBLIC_SUPABASE_URL: (not set)`

---

## 🎯 Priority Order

**Must Have (App Won't Work):**
1. Supabase keys (3 variables)
2. Site URL (1 variable)
3. NextAuth secret (2 variables)
4. Stripe keys (3 variables)

**Should Have (Limited Functionality):**
5. Email service (1-2 variables)
6. Error tracking (2 variables)

**Nice to Have:**
7. Slack notifications (1 variable)
8. OpenAI (1 variable)
9. Analytics (1 variable)

---

## 📞 Need Help?

**Can't find a value?**
- Supabase: Settings → API in your Supabase project
- Stripe: Dashboard → Developers → API keys
- NextAuth: Generate new with `openssl rand -base64 32`

**Variables not working after adding?**
- Make sure you redeployed after adding them
- Check you selected the right environment (Production)
- Verify no typos in variable names (case-sensitive)

**Still stuck?**
- Check `/docs/ENVIRONMENT_VARIABLES.md` for detailed setup
- Review `SETUP_CHECKLIST.md` for step-by-step instructions

---

**Next Step:** Add the 9 critical variables to Vercel, then redeploy.
