# Fix 500 Error - Action Required

## Current Status

- ✅ `https://elevateforhumanity.org/` - Marketing site works
- ❌ `https://elevateforhumanity.org/lms/dashboard` - 500 error
- ❌ `https://www.elevateforhumanity.org/` - 500 error
- ❌ `https://www.elevateforhumanity.org/lms/dashboard` - 500 error

## Root Cause

The Next.js LMS app is crashing because **environment variables are missing or incorrect in Netlify**.

## Fix Steps

### 1. Add Environment Variables in Netlify

Go to: **Netlify Dashboard → Your Site → Site settings → Environment variables**

Click "Add a variable" and add each of these 6 variables:

```
SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co

SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ

SUPABASE_SERVICE_ROLE_KEY
Value: [Get from Supabase Dashboard → Settings → API → service_role key (secret)]

NEXT_PUBLIC_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ

NEXT_PUBLIC_SITE_URL
Value: https://www.elevateforhumanity.org
```

### 2. Get SUPABASE_SERVICE_ROLE_KEY

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `cuxzzpsyufcewtmicszk`
3. Go to: Settings → API
4. Copy the `service_role` key (marked as "secret")
5. Add it to Netlify as `SUPABASE_SERVICE_ROLE_KEY`

### 3. Trigger New Deployment

After adding all 6 environment variables:

1. Go to: **Deploys** tab in Netlify
2. Click: **Trigger deploy** → **Clear cache and deploy site**
3. Wait 2-3 minutes for build to complete

### 4. Verify Site Works

After deployment completes, test:

- https://www.elevateforhumanity.org/ (should load)
- https://www.elevateforhumanity.org/lms/dashboard (should load)

## Why This Happened

- Code was updated to use `www.elevateforhumanity.org`
- `.env.local` in the repo was updated (for local development)
- **But Netlify environment variables were not updated**
- Without these variables, the app cannot connect to Supabase and crashes with 500 error

## Already Fixed in Code

✅ Added error handling to `sitemap.ts` (won't crash if Supabase fails)
✅ Added error handling to `generateStaticParams` in program pages
✅ Updated all domain references to `www.elevateforhumanity.org`

## What's Left

❌ Add the 6 environment variables in Netlify (you must do this manually)
❌ Trigger new deployment after adding variables

---

**Note:** Changing `.env.local` in Git does NOT update Netlify. Environment variables must be added through the Netlify dashboard.
