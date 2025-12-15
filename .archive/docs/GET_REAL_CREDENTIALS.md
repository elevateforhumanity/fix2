# 🔑 Get Real Supabase Credentials from Vercel

Your Supabase is integrated through Vercel. Here's how to get the real credentials:

## Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select project: **fix2-gpql**

2. **Navigate to Environment Variables**
   - Click **Settings** tab
   - Click **Environment Variables** in sidebar

3. **Find Supabase Variables**
   Look for these variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Copy Values**
   - Click the eye icon to reveal each value
   - Copy each value

5. **Update Local .env.local**
   Replace the placeholder values in `.env.local` with the real values from Vercel.

---

## Method 2: Vercel CLI (Automated)

If you have Vercel CLI access:

```bash
# Login to Vercel
npx vercel login

# Pull environment variables
npx vercel env pull .env.local

# This will download all production env vars to .env.local
```

---

## Method 3: Vercel Integration Page

1. **Go to Integrations**
   - Visit: https://vercel.com/integrations/supabase
   - Or in your project: Settings → Integrations

2. **Find Supabase Integration**
   - Click on Supabase integration
   - View connection details
   - Copy credentials

---

## After Getting Credentials

Once you have the real values, update `.env.local`:

```bash
# Replace these lines in .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Then run the migration:

```bash
node run-migration.js
```

---

## Quick Check

Your Vercel project details:
- **Project ID**: `prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO`
- **Project Name**: `fix2-gpql`
- **Org ID**: `team_Ae8f33vVYR36quLOS8HCeROs`

Direct link to your project settings:
https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2-gpql/settings/environment-variables

---

## Alternative: Run Migration Directly in Supabase

If you can't get the credentials easily, you can run the migration directly:

1. **Find Your Supabase Project**
   - The URL in Vercel env vars will tell you which Supabase project
   - Or check: https://app.supabase.com

2. **Run Migration in SQL Editor**
   - Go to your Supabase project
   - Click **SQL Editor**
   - Click **New Query**
   - Copy/paste: `supabase/migrations/20241214_lms_tables.sql`
   - Click **Run**

This creates the tables without needing local credentials!

---

## Need Help?

If you're stuck, you can:
1. Check Vercel deployment logs for the actual Supabase URL
2. Contact your team admin for Vercel access
3. Run the migration directly in Supabase Dashboard (recommended)
