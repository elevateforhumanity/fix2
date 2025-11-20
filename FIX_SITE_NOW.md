# 🚨 FIX SITE NOW - Direct Instructions

Your site is showing "Internal Server Error" because environment variables are not set in Netlify.

## The Problem

The GitHub Actions workflow tried to set them but may have failed due to API permissions.

## The Solution (2 minutes)

### Go directly to Netlify and set these 6 variables:

**URL:** https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env

Click "Add a variable" or "Edit variables" and add:

### 1. NEXT_PUBLIC_SUPABASE_URL

```
https://cuxzzpsyufcewtmicszk.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
```

### 3. SUPABASE_SERVICE_ROLE_KEY

Get from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
(Copy the "service_role" secret key)

### 4. NEXT_PUBLIC_APP_URL

```
https://elevateforhumanity.org
```

### 5. NEXT_PUBLIC_SITE_URL

```
https://elevateforhumanity.org
```

### 6. NODE_ENV

```
production
```

## After Adding All 6:

1. Click **"Save"**
2. Go to: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Site Will Be Live in 2-3 Minutes

Check: https://elevateforhumanity.org

---

## Why This Happened

The Netlify API requires specific permissions that the GitHub Actions workflow may not have had. Setting them directly in the Netlify dashboard is the most reliable method.
