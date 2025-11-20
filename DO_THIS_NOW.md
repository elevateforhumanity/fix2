# 🚨 DO THIS NOW - 3 MINUTES TO FIX DEPLOYMENT

## You Need To Do This Manually (Puppeteer can't run in this environment)

**Time**: 3 minutes  
**What**: Add 6 variables to Netlify  
**Why**: Site cannot deploy without them

---

## STEP 1: Open Netlify (30 seconds)

Click this link: **https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env**

Log in with GitHub if needed.

---

## STEP 2: Add Variables (2 minutes)

Click **"Add a variable"** button 6 times and copy-paste these EXACT values:

### Variable 1:

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Scopes: All scopes
```

### Variable 2:

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
Scopes: All scopes
```

### Variable 3:

```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
Scopes: All scopes
```

### Variable 4:

```
Key: NEXT_PUBLIC_APP_URL
Value: https://www.elevateforhumanity.org
Scopes: Production
```

### Variable 5:

```
Key: NEXT_PUBLIC_SITE_URL
Value: https://www.elevateforhumanity.org
Scopes: Production
```

### Variable 6:

```
Key: NODE_ENV
Value: production
Scopes: Production
```

---

## STEP 3: Deploy (30 seconds)

1. Go to: **https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys**
2. Click **"Trigger deploy"**
3. Click **"Clear cache and deploy site"**
4. Wait 2-3 minutes

---

## STEP 4: Verify (30 seconds)

Open: **https://www.elevateforhumanity.org**

Site should load! ✅

---

## That's It!

**Total time**: 3 minutes  
**Result**: Site deployed and live

This is the ONLY thing blocking launch. Everything else is 100% ready.
