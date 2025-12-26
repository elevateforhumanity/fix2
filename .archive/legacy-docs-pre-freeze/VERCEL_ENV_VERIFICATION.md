# Vercel Environment Variables Verification

**Date:** December 26, 2025  
**Purpose:** Ensure Vercel deployment has correct Supabase credentials

---

## Required Environment Variables

Based on the database audit, your Supabase project is:
- **Project URL:** `https://cuxzzpsyufcewtmicszk.supabase.co`
- **Project Ref:** `cuxzzpsyufcewtmicszk`

---

## Correct Values for Vercel

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://cuxzzpsyufcewtmicszk.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
**To get this:**
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Settings → API
3. Copy the **`anon` `public`** key (starts with `eyJ`)

**Format:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```
✅ This is correct (you already provided this)

### 4. SUPABASE_DB_URL (Optional but recommended)
**To get this:**
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Settings → Database
3. Copy the **Connection string** (URI format)

**Format:** `postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

---

## How to Verify in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your project (elevateforhumanity or fix2)
3. Go to **Settings** → **Environment Variables**

### Step 2: Check Each Variable

| Variable Name | Expected Value | Status |
|---------------|----------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cuxzzpsyufcewtmicszk.supabase.co` | ❓ Check |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` (anon key) | ❓ Check |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` (service_role key) | ❓ Check |

### Step 3: Common Issues

**❌ Wrong Project URL:**
- If you see a different project ref (not `cuxzzpsyufcewtmicszk`)
- This means Vercel is pointing to the wrong Supabase project

**❌ Swapped Keys:**
- If `NEXT_PUBLIC_SUPABASE_ANON_KEY` has the service_role key
- If `SUPABASE_SERVICE_ROLE_KEY` has the anon key
- This is a security risk and will cause auth issues

**❌ Missing Variables:**
- If any of the 3 required variables are missing
- Deployment will fail or features won't work

---

## How to Fix Mismatches

### If Variables Are Wrong:

1. **In Vercel Dashboard:**
   - Settings → Environment Variables
   - Click the **Edit** button next to each variable
   - Update the value
   - Select all environments (Production, Preview, Development)
   - Click **Save**

2. **Redeploy:**
   - Go to Deployments tab
   - Click **...** menu on latest deployment
   - Click **Redeploy**
   - Wait for deployment to complete

### If Variables Are Missing:

1. **In Vercel Dashboard:**
   - Settings → Environment Variables
   - Click **Add New**
   - Enter variable name
   - Enter value
   - Select all environments
   - Click **Save**

2. **Redeploy** (same as above)

---

## Security Check

### ✅ Correct Setup:
```
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...anon...
SUPABASE_SERVICE_ROLE_KEY=eyJ...service_role...
```

### ❌ WRONG - Security Risk:
```
# DO NOT DO THIS:
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...service_role...  ❌ EXPOSED TO CLIENT!
SUPABASE_SERVICE_ROLE_KEY=eyJ...anon...  ❌ WON'T WORK!
```

**Why this matters:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Service role key has full database access
- **NEVER** put service_role key in a `NEXT_PUBLIC_*` variable

---

## Verification Commands

After updating Vercel variables and redeploying, verify:

### 1. Check if site can connect to database:
```bash
curl https://www.elevateforhumanity.org/api/health
```

### 2. Check if auth works:
```bash
# Try to sign up (should work)
curl -X POST https://www.elevateforhumanity.org/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### 3. Check if RLS is working:
```bash
# Try to access protected data without auth (should fail)
curl https://www.elevateforhumanity.org/api/profiles
```

---

## Action Items

**YOU NEED TO:**

1. ✅ Go to Vercel Dashboard
2. ✅ Check environment variables match the values above
3. ✅ Get the `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase dashboard
4. ✅ Update any mismatched variables
5. ✅ Redeploy
6. ✅ Test the site

**I CANNOT:**
- Access your Vercel dashboard
- See your current environment variables
- Update them for you

---

## What to Send Me

After you check Vercel, tell me:

1. **Do the variables match?** (Yes/No)
2. **What's the current `NEXT_PUBLIC_SUPABASE_URL` in Vercel?**
3. **Did you need to update anything?** (Yes/No)

Then I can verify the deployment is using the correct credentials.

---

**Next Step:** Check Vercel environment variables now and report back.
