# 🦊 Elevate Environment Variables Checklist

## One-Slot Fox Summary

> **Your deploys keep failing because production (Vercel) doesn't have all the environment variables your app expects.**
>
> Once we add these vars into Vercel (and Gitpod), your builds will be way more stable.

---

## 📋 Required Environment Variables for Elevate

Based on scanning your codebase, here are **ALL** the environment variables your app uses:

### ✅ CRITICAL (App won't work without these)

#### Supabase (Database & Auth)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to get:**

1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy URL and both keys

#### Site Configuration

```bash
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_APP_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_BASE_URL=https://elevateconnectsdirectory.org
```

**Note:** These should all be the same - your production domain.

---

### 🔔 PWA Push Notifications

```bash
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

**How to generate:**

```bash
npm run generate:vapid
```

**Note:** `VAPID_PUBLIC_KEY` and `NEXT_PUBLIC_VAPID_PUBLIC_KEY` should be the same value.

---

### 💳 Stripe (Payments) - If Using

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**Where to get:**

1. https://dashboard.stripe.com
2. Developers → API keys
3. For webhook: Developers → Webhooks → Add endpoint

**Skip if:** Not using payments yet.

---

### 📧 Resend (Email) - If Using

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=no-reply@elevateforhumanity.org
MOU_ARCHIVE_EMAIL=archive@elevateforhumanity.org
```

**Where to get:**

1. https://resend.com/api-keys
2. Create new API key

**Skip if:** Not sending emails yet.

---

### 📊 Analytics - Optional

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxxxxxx
NEXT_PUBLIC_FACEBOOK_APP_ID=xxxxxxxxxxxxx
```

**Where to get:**

- Google Analytics: https://analytics.google.com
- Facebook: https://business.facebook.com

**Skip if:** Not tracking analytics yet.

---

### 🎓 xAPI (Learning Records) - If Using

```bash
NEXT_PUBLIC_XAPI_ENDPOINT=https://your-lrs.com/xapi
XAPI_USERNAME=your_username
XAPI_PASSWORD=your_password
```

**Skip if:** Not using xAPI/LRS yet.

---

### 🤖 OpenAI - If Using

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
```

**Where to get:**

1. https://platform.openai.com/api-keys

**Skip if:** Not using AI features yet.

---

### 🎥 Jitsi (Video Conferencing) - If Using

```bash
REACT_APP_JITSI_DOMAIN=meet.jit.si
```

**Skip if:** Not using video meetings yet.

---

### 🔐 Security

```bash
CRON_SECRET=your_random_secret_here
NODE_ENV=production
```

**Generate CRON_SECRET:**

```bash
openssl rand -base64 32
```

---

## 🎯 Minimum Required to Deploy

**For basic functionality, you MUST have:**

1. ✅ `NEXT_PUBLIC_SUPABASE_URL`
2. ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. ✅ `SUPABASE_SERVICE_ROLE_KEY`
4. ✅ `NEXT_PUBLIC_SITE_URL`
5. ✅ `NEXT_PUBLIC_APP_URL`
6. ✅ `NEXT_PUBLIC_BASE_URL`

**Total: 6 variables minimum**

**For PWA push notifications, add:**

7. ✅ `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
8. ✅ `VAPID_PRIVATE_KEY`
9. ✅ `VAPID_SUBJECT`

**Total: 9 variables for full PWA**

---

## 📝 Step-by-Step Setup

### Step 1: Find What You're Missing

Run this in Gitpod:

```bash
./gp-fix.sh
```

Look for lines that say `(not set)` - those are missing.

### Step 2: Add to Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**

3. **Go to Settings → Environment Variables**

4. **Add Each Variable:**
   - Click "Add New"
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

5. **Repeat for ALL variables**

6. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Step 3: Add to Gitpod

**Option A: Gitpod Cloud Variables (Recommended)**

1. Go to https://gitpod.io/user/variables
2. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co`
   - Scope: `elevateforhumanity/fix2`
3. Restart workspace

**Option B: Local .env File**

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site URLs
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_APP_URL=https://elevateconnectsdirectory.org
NEXT_PUBLIC_BASE_URL=https://elevateconnectsdirectory.org

# PWA Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org

# Optional: Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Optional: Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=no-reply@elevateforhumanity.org

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxxxxxx

# Security
CRON_SECRET=your_random_secret_here
NODE_ENV=development
```

---

## 🔍 Verification

### Check What's Missing

```bash
./gp-fix.sh
```

Look for this section:

```
⚠️  The following env vars are NOT set in Gitpod:
  - NEXT_PUBLIC_VAPID_PUBLIC_KEY
  - VAPID_PRIVATE_KEY
```

### Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 - should work without errors.

### Test on Vercel

After adding all vars and redeploying:

1. Visit your production URL
2. Check browser console for errors
3. Test at `/pwa-test`

---

## 🚨 Common Issues

### "Supabase client not initialized"

**Missing:**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Fix:** Add both to Vercel and redeploy.

### "Push notifications not working"

**Missing:**

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_SUBJECT`

**Fix:** Run `npm run generate:vapid` and add all three.

### "Stripe not defined"

**Missing:**

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Fix:** Add Stripe keys or remove Stripe code if not using.

### "Email sending failed"

**Missing:**

- `RESEND_API_KEY`
- `EMAIL_FROM`

**Fix:** Add Resend API key or disable email features.

---

## 📊 Priority Matrix

### Must Have (Deploy will fail without these)

- ✅ Supabase URL
- ✅ Supabase Anon Key
- ✅ Supabase Service Role Key
- ✅ Site URL

### Should Have (Features won't work)

- ⚠️ VAPID keys (push notifications)
- ⚠️ Stripe keys (payments)
- ⚠️ Resend key (emails)

### Nice to Have (Optional features)

- 💡 Analytics IDs
- 💡 OpenAI key
- 💡 xAPI credentials
- 💡 Jitsi domain

---

## 🔧 Update Your gp-fix.sh

Your script already checks these! Just make sure it includes:

```bash
SAFE_ENV_VARS=(
  "NODE_ENV"
  "NEXT_PUBLIC_SITE_URL"
  "NEXT_PUBLIC_APP_URL"
  "NEXT_PUBLIC_BASE_URL"
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY"
  "VAPID_PRIVATE_KEY"
  "VAPID_PUBLIC_KEY"
  "VAPID_SUBJECT"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "RESEND_API_KEY"
  "EMAIL_FROM"
  "MOU_ARCHIVE_EMAIL"
  "NEXT_PUBLIC_GA_MEASUREMENT_ID"
  "NEXT_PUBLIC_FACEBOOK_PIXEL_ID"
  "NEXT_PUBLIC_FACEBOOK_APP_ID"
  "NEXT_PUBLIC_XAPI_ENDPOINT"
  "XAPI_USERNAME"
  "XAPI_PASSWORD"
  "OPENAI_API_KEY"
  "REACT_APP_JITSI_DOMAIN"
  "CRON_SECRET"
  "VERCEL"
  "VERCEL_ENV"
  "VERCEL_URL"
)
```

---

## ✅ Final Checklist

Before deploying to Vercel:

- [ ] Run `./gp-fix.sh` in Gitpod
- [ ] Note all variables marked `(not set)`
- [ ] Add all missing variables to Vercel Dashboard
- [ ] Generate VAPID keys: `npm run generate:vapid`
- [ ] Add VAPID keys to Vercel
- [ ] Redeploy on Vercel
- [ ] Test production URL
- [ ] Test `/pwa-test` page
- [ ] Check browser console for errors
- [ ] Test push notifications
- [ ] Test on mobile devices

---

## 🎉 Summary

**Minimum to deploy:** 6 variables (Supabase + Site URLs)  
**For full PWA:** 9 variables (+ VAPID keys)  
**For all features:** 25+ variables (see full list above)

**Quick check:**

```bash
./gp-fix.sh
```

**This will tell you exactly what's missing!**

---

## 📞 Support

- **Generate VAPID:** `npm run generate:vapid`
- **Check build:** `./gp-fix.sh`
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Full Guide:** `ENV_VARS_GUIDE.md`
