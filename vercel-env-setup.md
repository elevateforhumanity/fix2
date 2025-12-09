# Vercel Environment Variables Setup

Go to your Vercel project settings:
https://vercel.com/elevateforhumanity/fix2/settings/environment-variables

(Or find your project in Vercel dashboard → Settings → Environment Variables)

## Add These 3 Variables:

### 1. NEXT_PUBLIC_SUPABASE_URL
**Value:**
```
https://cuxzzpsyufcewtmicszk.supabase.co
```
**Environments:** Production, Preview, Development (check all 3)

---

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```
**Environments:** Production, Preview, Development (check all 3)

---

### 3. SUPABASE_SERVICE_ROLE_KEY
**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```
**Environments:** Production, Preview, Development (check all 3)

---

### 4. NEXT_PUBLIC_SITE_URL (Optional but recommended)
**Value:**
```
https://www.elevateforhumanity.org
```
**Environments:** Production, Preview, Development (check all 3)

---

## After Adding Variables:

1. Click "Save" for each variable
2. Go to Deployments tab
3. Click "..." menu on latest deployment
4. Click "Redeploy"
5. Check "Use existing Build Cache" is UNCHECKED
6. Click "Redeploy"

This forces Vercel to rebuild with the new environment variables.
