# Vercel Environment Variables Setup

## ✅ STATUS: CONNECTED TO GITHUB

**Repository:** https://github.com/elevateforhumanity/fix2.git  
**Vercel Project:** fix2  
**Project ID:** prj_mqHr6z23gRSqM5In6bLXtEo9cMGI  
**Status:** ✅ Connected and ready

---

## 🔧 REQUIRED ENVIRONMENT VARIABLES

### Critical (Must Set)

These are **required** for the site to function:

#### Supabase (Database)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find these:**

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy the values

---

### Optional (Recommended)

#### Stripe (Payment Processing)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Where to find these:**

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your keys

#### Sentry (Error Monitoring)

```
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=your-auth-token
```

**Where to find these:**

1. Go to https://sentry.io/settings/
2. Find your project DSN

#### NextAuth (Authentication)

```
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=https://www.elevateforhumanity.org
```

**Generate secret:**

```bash
openssl rand -base64 32
```

---

## 📋 HOW TO SET VARIABLES IN VERCEL

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Select your project: **fix2**

2. **Navigate to Settings:**
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar

3. **Add Each Variable:**
   - Click "Add New"
   - Enter variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter value
   - Select environments: Production, Preview, Development
   - Click "Save"

4. **Repeat for All Variables**

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (if not already linked)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Redeploy
vercel --prod
```

---

### Method 3: Pull from Vercel (If Already Set)

```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# This creates .env.local with all your Vercel variables
```

---

## 🔍 VERIFY VARIABLES ARE SET

### Check in Vercel Dashboard

1. Go to: https://vercel.com/[your-account]/fix2/settings/environment-variables
2. You should see all variables listed
3. Each should show which environments it's set for

### Check After Deployment

1. Go to your deployed site
2. Open browser console (F12)
3. Type: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
4. Should show your Supabase URL (not undefined)

---

## ⚠️ IMPORTANT NOTES

### Public vs Private Variables

**Public Variables** (start with `NEXT_PUBLIC_`):

- ✅ Accessible in browser
- ✅ Safe to expose to client
- ✅ Example: `NEXT_PUBLIC_SUPABASE_URL`

**Private Variables** (no prefix):

- ❌ Only accessible on server
- ❌ Never exposed to browser
- ✅ Example: `SUPABASE_SERVICE_ROLE_KEY`

### Security

**DO NOT:**

- ❌ Commit `.env` files to git
- ❌ Share service role keys publicly
- ❌ Use test keys in production

**DO:**

- ✅ Use `.env.example` as template
- ✅ Set variables in Vercel dashboard
- ✅ Use different keys for dev/prod

---

## 🚀 DEPLOYMENT WORKFLOW

### After Setting Variables

1. **Trigger Deployment:**

   ```bash
   git push origin main
   ```

2. **Or Redeploy in Vercel:**
   - Go to Deployments tab
   - Click "Redeploy" on latest

3. **Wait for Build:**
   - Takes 2-3 minutes
   - Check build logs for errors

4. **Verify Site:**
   - Visit: https://www.elevateforhumanity.org
   - Test database connection
   - Test authentication
   - Test payment flow

---

## 🔧 CURRENT CONFIGURATION

### What's Already Set

**In vercel.json:**

```json
{
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=4096",
    "VERCEL_FORCE_NO_BUILD_CACHE": "1",
    "NEXT_PRIVATE_SKIP_CACHE": "1"
  }
}
```

These are build-time variables and are already configured.

### What You Need to Add

**In Vercel Dashboard:**

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- (Optional) Stripe keys
- (Optional) Sentry DSN

---

## 📊 VARIABLE CHECKLIST

### Before Deployment

- [ ] Supabase URL set
- [ ] Supabase Anon Key set
- [ ] Supabase Service Role Key set
- [ ] Variables set for Production environment
- [ ] Variables set for Preview environment (optional)

### After Deployment

- [ ] Site loads without errors
- [ ] Database connection works
- [ ] Authentication works
- [ ] No "undefined" errors in console

---

## 🆘 TROUBLESHOOTING

### Site Shows "Database Connection Error"

**Problem:** Supabase variables not set  
**Solution:** Add Supabase variables in Vercel dashboard and redeploy

### Build Fails with "Missing Environment Variable"

**Problem:** Required variable not set  
**Solution:** Check build logs for which variable is missing, add it, redeploy

### Variables Not Taking Effect

**Problem:** Need to redeploy after adding variables  
**Solution:** Trigger new deployment (git push or manual redeploy)

### Can't Find Vercel Dashboard

**URL:** https://vercel.com/[your-account]/fix2/settings/environment-variables

Replace `[your-account]` with your Vercel username or team name

---

## 📋 QUICK START GUIDE

### Minimum Setup (5 minutes)

1. **Get Supabase Keys:**
   - Go to Supabase dashboard
   - Copy URL, Anon Key, Service Role Key

2. **Add to Vercel:**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Add all 3 Supabase variables

3. **Redeploy:**
   - Deployments → Redeploy latest

4. **Test:**
   - Visit site
   - Check if database works

---

## ✅ VERIFICATION

### Your Setup Status

- ✅ **GitHub Connected:** https://github.com/elevateforhumanity/fix2.git
- ✅ **Vercel Project Linked:** fix2 (prj_mqHr6z23gRSqM5In6bLXtEo9cMGI)
- ✅ **Latest Commit Pushed:** 74ecf8378
- ⚠️ **Environment Variables:** Need to be set in Vercel dashboard

### Next Steps

1. Set Supabase environment variables in Vercel
2. Redeploy the project
3. Test the site
4. Monitor for errors

---

**Your project is connected and ready. Just need to add environment variables in Vercel dashboard!**
