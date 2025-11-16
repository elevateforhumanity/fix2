# 🔑 Environment Variables Guide

## Complete List of Environment Variables

This is every environment variable your Elevate LMS project needs.

---

## Required for Supabase (Database & Auth)

```bash
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Supabase Anonymous Key (safe to expose to client)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (KEEP SECRET - server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to get these:**

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy URL and keys

---

## Required for PWA Push Notifications

```bash
# VAPID Public Key (safe to expose to client)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# VAPID Private Key (KEEP SECRET - server-side only)
VAPID_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# VAPID Subject (your contact email)
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

**How to generate:**

```bash
npm run generate:vapid
```

This will output all three values. Copy them exactly.

---

## Optional: Stripe (Payment Processing)

```bash
# Stripe Publishable Key (safe to expose to client)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx

# Stripe Secret Key (KEEP SECRET - server-side only)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Stripe Webhook Secret (for webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**Where to get these:**

1. Go to https://dashboard.stripe.com
2. Go to Developers → API keys
3. Copy publishable and secret keys
4. For webhook secret: Developers → Webhooks → Add endpoint

---

## Optional: Resend (Email Service)

```bash
# Resend API Key (KEEP SECRET - server-side only)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**Where to get this:**

1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy the key (shown only once)

---

## Optional: Analytics

```bash
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel ID
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxxxxxx

# Facebook App ID (for social features)
NEXT_PUBLIC_FACEBOOK_APP_ID=xxxxxxxxxxxxx
```

**Where to get these:**

- **Google Analytics**: https://analytics.google.com → Admin → Data Streams
- **Facebook Pixel**: https://business.facebook.com → Events Manager
- **Facebook App**: https://developers.facebook.com → My Apps

---

## Optional: Site Configuration

```bash
# Your site URL (for SEO and redirects)
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org

# API URL (if separate from main site)
NEXT_PUBLIC_API_URL=https://api.elevateconnectsdirectory.org

# Environment (usually set by Vercel automatically)
NODE_ENV=production
```

---

## Vercel-Specific (Auto-Set)

These are automatically set by Vercel, you don't need to add them:

```bash
VERCEL=1
VERCEL_ENV=production
VERCEL_URL=your-project.vercel.app
VERCEL_GIT_COMMIT_SHA=abc123...
VERCEL_GIT_COMMIT_MESSAGE=Your commit message
```

---

## How to Add to Vercel

### Method 1: Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**

3. **Go to Settings → Environment Variables**

4. **For Each Variable:**
   - Click "Add New"
   - **Name**: `VARIABLE_NAME` (exact name from above)
   - **Value**: Your actual value
   - **Environment**:
     - ✅ Production (always)
     - ✅ Preview (recommended)
     - ✅ Development (optional)
   - Click "Save"

5. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Add environment variable
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste value when prompted

# Repeat for each variable
```

### Method 3: .env File (Local Development Only)

Create `.env.local` in your project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PWA Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org

# Stripe (if using)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

# Resend (if using)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Analytics (if using)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxxxxxx

# Site Config
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: `.env.local` is gitignored and won't be deployed to Vercel.

---

## Security Best Practices

### Public vs Private Keys

**Public Keys** (safe to expose to client):

- Start with `NEXT_PUBLIC_`
- Can be seen in browser
- Examples: Supabase URL, Stripe publishable key, VAPID public key

**Private Keys** (MUST keep secret):

- No `NEXT_PUBLIC_` prefix
- Only used on server
- Examples: Supabase service role, Stripe secret, VAPID private key

### Never Commit Secrets

Add to `.gitignore`:

```
.env
.env.local
.env.production
.env.development
```

### Rotate Keys Regularly

- Change keys every 90 days
- Immediately rotate if exposed
- Use different keys for dev/staging/production

---

## Troubleshooting

### "Environment variable not found"

**Problem**: Code can't find an env var

**Solutions**:

1. Check spelling matches exactly
2. Restart dev server after adding to `.env.local`
3. For Vercel: Redeploy after adding variables

### "Invalid API key"

**Problem**: Key is rejected by service

**Solutions**:

1. Verify key is copied correctly (no extra spaces)
2. Check key hasn't expired
3. Verify key has correct permissions
4. Try regenerating the key

### "Build succeeds locally but fails on Vercel"

**Problem**: Missing env vars on Vercel

**Solutions**:

1. Run `./gp-fix.sh` to see which vars are missing
2. Add all missing vars to Vercel Dashboard
3. Redeploy

---

## Quick Reference

### Minimum Required (Core Functionality)

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Add for PWA Push Notifications

```bash
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

### Add for Payments

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
```

### Add for Email

```bash
RESEND_API_KEY=...
```

### Add for Analytics

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=...
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=...
```

---

## Verification

### Check Local Setup

```bash
# Run the fix script
./gp-fix.sh

# Look for "not set" in the output
# Add any missing variables to .env.local
```

### Check Vercel Setup

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Verify all required variables are present
4. Check they're enabled for Production

### Test After Adding

```bash
# Local
npm run dev
# Visit http://localhost:3000

# Vercel
# Redeploy and visit production URL
```

---

## Support

- **Generate VAPID Keys**: `npm run generate:vapid`
- **Check Build**: `./gp-fix.sh`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## Summary

**Minimum to get started:**

1. Supabase keys (3 variables)
2. VAPID keys (3 variables)

**Total: 6 environment variables**

**Optional but recommended:**

- Stripe (3 variables) - if using payments
- Resend (1 variable) - if sending emails
- Analytics (2-3 variables) - if tracking users

Run `./gp-fix.sh` to see exactly which ones you're missing!
