# Vercel Account Configuration Fix

## ⚠️ Issue Detected

Your build log shows:
```
❌ Migration failed: Tenant or user not found
```

This means the Supabase credentials in Vercel are either:
1. Pointing to an old/deleted Supabase project
2. Incorrect or expired
3. From a different account

---

## ✅ Current Vercel Configuration

**Project ID:** `prj_mqHr6z23gRSqM5In6bLXtEo9cMGI`
**Org ID:** `team_wnZ7iyQz1kUNni7yIDVUnhZf`
**Project Name:** `fix2`

**Vercel Dashboard:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2

---

## 🔧 Step 1: Verify Correct Vercel Account

**Check if this is your current account:**

1. Go to: https://vercel.com/
2. Check which account you're logged into
3. Verify the team name matches: `team_wnZ7iyQz1kUNni7yIDVUnhZf`

**If this is the WRONG account:**
- You need to either:
  - A) Switch to the correct Vercel account
  - B) Re-link the repository to the correct account
  - C) Update `.vercel/project.json` with correct IDs

---

## 🔧 Step 2: Update Supabase Credentials in Vercel

### Get Current Supabase Credentials

**Go to Supabase Dashboard:**
1. Visit: https://supabase.com/dashboard
2. Select your project
3. Go to: Settings → API

**Copy these values:**

```
Project URL: https://[your-project-ref].supabase.co
Anon/Public Key: eyJ...
Service Role Key: eyJ...
```

**Also get Database URL:**
1. Go to: Settings → Database
2. Copy "Connection string" → "Transaction mode" (pooler)
3. Should look like: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

---

### Update Environment Variables in Vercel

**Go to:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

**Update these variables:**

#### 1. NEXT_PUBLIC_SUPABASE_URL
- **Current value:** Check if it matches your Supabase project
- **Should be:** `https://[your-project-ref].supabase.co`
- **Example:** `https://cuxzzpsyufcewtmicszk.supabase.co`

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Current value:** Check if it's valid
- **Should be:** Your current anon key from Supabase
- **Starts with:** `eyJ...`

#### 3. SUPABASE_SERVICE_ROLE_KEY
- **Current value:** Check if it's valid
- **Should be:** Your current service role key from Supabase
- **Starts with:** `eyJ...`

#### 4. DATABASE_URL
- **Current value:** Check if it's valid
- **Should be:** Connection pooler URL (NOT direct connection)
- **Format:** `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
- **Important:** Use pooler (port 6543), NOT direct connection (port 5432)

---

## 🔧 Step 3: Verify Other Critical Environment Variables

**Check these are also set correctly:**

### Email (Resend)
```
RESEND_API_KEY=re_...
```

### Stripe
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

### Site URLs
```
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_ORGANIZATION_NAME=Elevate for Humanity
```

### Domain Configuration (NEW - Add these)
```
NEXT_PUBLIC_PUBLIC_DOMAIN=www.elevateforhumanity.org
NEXT_PUBLIC_ADMIN_DOMAIN=www.elevateconnectsdirectory.org
NEXT_PUBLIC_LMS_DOMAIN=www.elevateeducationedu.com

NEXT_PUBLIC_PUBLIC_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_ADMIN_URL=https://www.elevateconnectsdirectory.org
NEXT_PUBLIC_LMS_URL=https://www.elevateeducationedu.com
```

---

## 🔧 Step 4: Update .vercel/project.json (If Needed)

**If you changed Vercel accounts, update this file:**

```json
{
  "projectId": "prj_YOUR_NEW_PROJECT_ID",
  "orgId": "team_YOUR_NEW_ORG_ID",
  "projectName": "fix2",
  "settings": {
    "createdAt": 1766059664987,
    "framework": "nextjs",
    "devCommand": null,
    "installCommand": null,
    "buildCommand": null,
    "outputDirectory": null,
    "rootDirectory": null,
    "directoryListing": false,
    "nodeVersion": "24.x"
  }
}
```

**To get your new IDs:**
1. Go to Vercel project settings
2. Look at the URL: `vercel.com/[orgId]/[projectName]`
3. Or run: `vercel link` in your project directory

---

## 🔧 Step 5: Redeploy

After updating environment variables:

**Option 1: Via Vercel Dashboard**
1. Go to: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2
2. Click "Deployments" tab
3. Click "..." on latest deployment
4. Click "Redeploy"

**Option 2: Via Git Push**
```bash
git commit --allow-empty -m "chore: trigger redeploy with updated credentials"
git push origin main
```

**Option 3: Via Vercel CLI**
```bash
vercel --prod
```

---

## 🔍 How to Verify It's Fixed

### Check Build Logs

After redeploying, check the build logs:

**Should see:**
```
✅ Connected to database
✅ X migrations already executed
✅ Migrations complete!
```

**Should NOT see:**
```
❌ Migration failed: Tenant or user not found
```

### Test the Site

1. Visit: https://www.elevateforhumanity.org
2. Try to login
3. Check if data loads correctly

---

## 🚨 Common Issues

### Issue 1: "Tenant or user not found"

**Cause:** Supabase credentials are wrong or from old project

**Fix:**
1. Get fresh credentials from current Supabase project
2. Update all 4 Supabase variables in Vercel
3. Redeploy

### Issue 2: "ENETUNREACH" or IPv6 errors

**Cause:** Using direct database connection (port 5432) instead of pooler

**Fix:**
1. Get pooler connection string from Supabase
2. Update DATABASE_URL to use port 6543
3. Format: `postgresql://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Issue 3: Build succeeds but site doesn't work

**Cause:** Environment variables not set for all environments

**Fix:**
1. Check each variable is set for: Production, Preview, Development
2. Click "Edit" on each variable
3. Check all 3 checkboxes
4. Save and redeploy

---

## 📋 Quick Checklist

- [ ] Verified correct Vercel account
- [ ] Updated NEXT_PUBLIC_SUPABASE_URL
- [ ] Updated NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Updated SUPABASE_SERVICE_ROLE_KEY
- [ ] Updated DATABASE_URL (using pooler, port 6543)
- [ ] Added domain configuration variables
- [ ] All variables set for Production, Preview, Development
- [ ] Redeployed application
- [ ] Checked build logs (no errors)
- [ ] Tested site (loads correctly)

---

## 🆘 Still Having Issues?

### Get Your Current Supabase Project Info

Run this in your local environment:

```bash
# Check what's in your local .env.local
cat .env.local | grep SUPABASE

# Should show your current project
```

### Get Your Vercel Environment Variables

```bash
# Login to Vercel
vercel login

# Pull environment variables
vercel env pull .env.vercel

# Check what's configured
cat .env.vercel | grep SUPABASE
```

### Compare

If local and Vercel don't match, update Vercel to match local.

---

## 💡 Pro Tip: Use Vercel CLI

**Easier way to update environment variables:**

```bash
# Login
vercel login

# Link project
vercel link

# Add/update variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add DATABASE_URL production

# Deploy
vercel --prod
```

---

## 📊 Expected Result

After fixing, your build should show:

```
🚀 Running Supabase Migrations
📡 Connecting to database...
✅ Connected to database
📦 Found 252 migration files
✅ 252 migrations already executed
✅ Migrations complete!

> efh-autopilot@2.0.0 build
> next build

✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    ...
└ ○ /admin                               ...

○  (Static)  prerendered as static content
```

---

**Last Updated:** December 26, 2025

**Status:** ⚠️ Needs Supabase credentials update in Vercel

**Action Required:** Update environment variables in Vercel dashboard
