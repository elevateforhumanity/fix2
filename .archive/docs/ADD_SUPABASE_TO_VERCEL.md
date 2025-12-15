# 🔧 Add Supabase Credentials to Vercel

Your Vercel project doesn't have Supabase environment variables yet. Here's how to add them:

## Quick Link

**Go directly to your project settings:**
https://vercel.com/elevate-699a5438/fix2/settings/environment-variables

---

## Step-by-Step Guide

### 1. Get Your Supabase Credentials

**Option A: From Supabase Dashboard**

1. Go to: https://app.supabase.com
2. Select your project
3. Click **Settings** (gear icon) → **API**
4. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOi...`)
   - **service_role key** (starts with `eyJhbGciOi...`)

**Option B: If you have them locally**

- Check your old `.env.local` backup
- Or check your Supabase project settings

### 2. Add to Vercel

1. **Go to**: https://vercel.com/elevate-699a5438/fix2/settings/environment-variables

2. **Add these 3 variables:**

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your anon key)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Key: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your service role key)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. **Click "Save"** for each variable

### 3. Pull Variables Again

After adding them to Vercel, pull them locally:

```bash
VERCEL_TOKEN='Be7BCqc1ObnctEO8mMJRten2' npx vercel env pull .env.local --yes
```

### 4. Run Migration

Once you have the credentials:

```bash
node run-migration.js
```

---

## Alternative: Use Vercel Supabase Integration

Vercel has a built-in Supabase integration that can set this up automatically:

1. **Go to**: https://vercel.com/integrations/supabase
2. **Click**: "Add Integration"
3. **Select**: Your Vercel project (fix2)
4. **Connect**: Your Supabase project
5. **Done!** - Environment variables are added automatically

This is the easiest method! ✨

---

## Verify Setup

After adding variables, verify they're set:

```bash
# Pull latest env vars
VERCEL_TOKEN='Be7BCqc1ObnctEO8mMJRten2' npx vercel env pull .env.local --yes

# Check if Supabase vars are present
grep SUPABASE .env.local

# Should show:
# NEXT_PUBLIC_SUPABASE_URL=https://...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
# SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## What Happens After Setup

Once Supabase credentials are in Vercel:

1. ✅ **Automated setup works** - `./automated-setup.sh` will run migrations
2. ✅ **LMS functions** - All database queries work
3. ✅ **Deployments work** - Vercel builds succeed
4. ✅ **Local dev works** - Pull env vars and start coding

---

## Need Help Finding Your Supabase Project?

Check your Vercel deployment logs - they might show the Supabase URL being used.

Or create a new Supabase project:

1. Go to: https://app.supabase.com
2. Click "New Project"
3. Name it: `elevate-lms`
4. Choose region: `East US`
5. Set password and create
6. Copy the credentials to Vercel

---

## Quick Commands

```bash
# Add to Vercel (manual)
https://vercel.com/elevate-699a5438/fix2/settings/environment-variables

# Or use Vercel Integration (automatic)
https://vercel.com/integrations/supabase

# Pull env vars after adding
VERCEL_TOKEN='Be7BCqc1ObnctEO8mMJRten2' npx vercel env pull .env.local --yes

# Run migration
node run-migration.js

# Test locally
pnpm dev
```

---

## Status

- ✅ Vercel token working
- ✅ Can pull environment variables
- ⏳ Need to add Supabase credentials to Vercel
- ⏳ Then migrations can run automatically

**Next step**: Add Supabase credentials to Vercel using one of the methods above! 🚀
