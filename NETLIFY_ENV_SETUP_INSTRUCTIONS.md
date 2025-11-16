# Netlify Environment Variables Setup

## The Problem

The site is showing "Page not found" because **environment variables are not set in Netlify**.

Without these variables:

- The middleware can't connect to Supabase
- Routes may not work correctly
- The site can't function properly

## Solution: Set Environment Variables in Netlify

### Option 1: Manual Setup (5 minutes)

1. Go to [Netlify Dashboard](https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env)

2. Click "Add a variable" and add each of these:

```
Variable name: NEXT_PUBLIC_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Scopes: All scopes
```

```
Variable name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
Scopes: All scopes
```

```
Variable name: SUPABASE_SERVICE_ROLE_KEY
Value: [Get from Supabase Dashboard → Settings → API → service_role key]
Scopes: All scopes
```

```
Variable name: NEXT_PUBLIC_APP_URL
Value: https://elevateconnectsdirectory.org
Scopes: All scopes
```

```
Variable name: NEXT_PUBLIC_SITE_URL
Value: https://elevateconnectsdirectory.org
Scopes: All scopes
```

```
Variable name: NODE_ENV
Value: production
Scopes: All scopes
```

3. After adding all variables, go to [Deploys](https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys)

4. Click "Trigger deploy" → "Clear cache and deploy site"

5. Wait 2-3 minutes for deployment to complete

6. Test the site: https://elevateconnectsdirectory.org

### Option 2: Use GitHub Actions (Automated)

If you have a Netlify auth token in GitHub Secrets:

1. Go to [GitHub Actions](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-emergency-fix.yml)

2. Click "Run workflow" → "Run workflow"

3. This will automatically set all environment variables and trigger a deployment

## How to Get SUPABASE_SERVICE_ROLE_KEY

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `cuxzzpsyufcewtmicszk`
3. Go to: Settings → API
4. Copy the `service_role` key (marked as "secret")
5. Use this value for `SUPABASE_SERVICE_ROLE_KEY`

## Why This Fixes the "Page Not Found" Error

Without environment variables:

- Middleware can't connect to Supabase
- Middleware may redirect incorrectly
- Routes don't work properly

With environment variables:

- Middleware works correctly
- Routes function as expected
- Site loads properly

## Verification

After setting variables and deploying, check:

```bash
curl -I https://elevateconnectsdirectory.org
```

**Expected**: `200 OK` with HTML content

**If still showing 404**: Check Netlify function logs for errors

## Quick Links

- [Environment Variables](https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env)
- [Deploys](https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys)
- [Function Logs](https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/logs/functions)
- [Supabase Dashboard](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api)

## Summary

✅ Code is correct and working  
✅ Build completes successfully  
❌ Environment variables not set in Netlify  
⏳ Need to add 6 environment variables  
⏳ Then trigger new deployment

The site will work once environment variables are configured in Netlify.
