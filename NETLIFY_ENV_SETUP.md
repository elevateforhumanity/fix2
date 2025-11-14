# Netlify Environment Variables Setup - URGENT

## ❌ Build Error

```
project's URL and Key are required to create a Supabase client!
```

## ✅ Solution: Add Supabase Keys to Netlify

### Step 1: Get Supabase Keys

From `SECRETS_CATALOG.md`, we have:
- **SUPABASE_URL**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- **SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ`

You also need the **SERVICE_ROLE_KEY** from Supabase Dashboard.

### Step 2: Add to Netlify

1. Go to: https://app.netlify.com/
2. Select your site (ID: `12f120ab-3f63-419b-bc49-430f043415c1`)
3. Go to: **Site settings** → **Environment variables**
4. Click **Add a variable**

Add these variables:

#### Required Variables

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Scopes: All scopes (or Production)
```

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
Scopes: All scopes (or Production)
```

```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: [GET FROM SUPABASE DASHBOARD]
Scopes: All scopes (or Production)
```

#### How to Get Service Role Key

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Find **Project API keys** section
3. Copy **service_role** key (starts with `eyJ...`)
4. Add to Netlify as `SUPABASE_SERVICE_ROLE_KEY`

#### Application URLs

```
Key: NEXT_PUBLIC_APP_URL
Value: https://www.elevateconnectsdirectory.org
Scopes: Production
```

```
Key: NEXT_PUBLIC_SITE_URL
Value: https://www.elevateconnectsdirectory.org
Scopes: Production
```

```
Key: NODE_ENV
Value: production
Scopes: Production
```

### Step 3: Redeploy

After adding all variables:
1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**
4. Wait 2-3 minutes for build to complete

### Step 4: Verify

Once deployed, check:
- ✅ https://www.elevateconnectsdirectory.org (site loads)
- ✅ https://www.elevateconnectsdirectory.org/sitemap.xml (sitemap works)
- ✅ https://www.elevateconnectsdirectory.org/robots.txt (robots.txt works)

---

## Quick Copy-Paste for Netlify

### Variable 1
```
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
```

### Variable 2
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
```

### Variable 3 (Get from Supabase)
```
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY_HERE]
```

### Variable 4
```
NEXT_PUBLIC_APP_URL=https://www.elevateconnectsdirectory.org
```

### Variable 5
```
NEXT_PUBLIC_SITE_URL=https://www.elevateconnectsdirectory.org
```

### Variable 6
```
NODE_ENV=production
```

---

## Alternative: Use Netlify CLI

If you have Netlify CLI installed:

```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://cuxzzpsyufcewtmicszk.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "YOUR_SERVICE_ROLE_KEY"
netlify env:set NEXT_PUBLIC_APP_URL "https://www.elevateconnectsdirectory.org"
netlify env:set NEXT_PUBLIC_SITE_URL "https://www.elevateconnectsdirectory.org"
netlify env:set NODE_ENV "production"
netlify deploy --prod
```

---

## Troubleshooting

### Error: "Invalid API key"
- Check the anon key is copied correctly (no extra spaces)
- Verify it matches the key in Supabase Dashboard

### Error: "Project not found"
- Check the URL is correct: `https://cuxzzpsyufcewtmicszk.supabase.co`
- Verify project is active in Supabase Dashboard

### Build still failing
- Clear Netlify cache: Deploys → Options → Clear cache and retry deploy
- Check all 6 variables are added
- Verify no typos in variable names (case-sensitive)

---

## Status

**Current**: ❌ Build failing - Missing Supabase environment variables
**Action**: Add 6 environment variables to Netlify
**Time**: 5 minutes
**Priority**: HIGH - Blocking deployment

Once variables are added, the site will deploy successfully! 🚀
