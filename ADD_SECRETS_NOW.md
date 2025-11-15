# 🚀 ADD SECRETS NOW - Copy & Paste Ready

## You have: ✅ VERCEL_TOKEN ✅ SUPABASE_ANON_KEY ✅ SUPABASE_SERVICE_ROLE_KEY

## Still need: VERCEL_ORG_ID and VERCEL_PROJECT_ID

---

## Quick Method: Get IDs from Vercel CLI

If you have Vercel CLI installed:

```bash
# Get Organization ID
vercel whoami

# Get Project ID (run in your project directory)
vercel link
```

---

## Alternative: Get IDs from Vercel Dashboard

### Get VERCEL_ORG_ID:
1. Go to: [https://vercel.com/account](https://vercel.com/account)
2. Look at the URL - it shows your org/team name
3. Or go to Settings → General → find "Team ID" or "Organization ID"

### Get VERCEL_PROJECT_ID:
1. Go to: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (fix2 or elevateconnectsdirectory)
3. Go to Settings → General
4. Find "Project ID" (starts with `prj_`)
5. Copy it

---

## Once You Have Those 2 IDs, Add All 5 Secrets:

Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new](https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new)

### Secret 1: VERCEL_TOKEN ✅ READY
```
Name: VERCEL_TOKEN
Value: CatFXMsC0PPzwulHl0CrRtfI
```
Click "Add secret"

### Secret 2: VERCEL_ORG_ID ⏳ NEED THIS
```
Name: VERCEL_ORG_ID
Value: [Get from Vercel dashboard or CLI]
```
Click "Add secret"

### Secret 3: VERCEL_PROJECT_ID ⏳ NEED THIS
```
Name: VERCEL_PROJECT_ID
Value: [Get from Vercel dashboard or CLI]
```
Click "Add secret"

### Secret 4: SUPABASE_ANON_KEY ✅ READY
```
Name: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```
Click "Add secret"

### Secret 5: SUPABASE_SERVICE_ROLE_KEY ✅ READY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```
Click "Add secret"

---

## After Adding All 5 Secrets:

### Step 1: Validate
[Run Secrets Validator](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml)
- Click "Run workflow" → "Run workflow"
- Should show: ✅ All 5 secrets present

### Step 2: Sync to Vercel
[Run Vercel Guardian](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-vercel-guardian.yml)
- Click "Run workflow" → "Run workflow"
- Syncs environment variables
- Triggers Vercel deployment

### Step 3: Test Site
[Run Readiness Test](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml)
- Click "Run workflow" → "Run workflow"
- Tests all pages

---

## 🎯 What You Need Right Now:

**Option A**: Run these commands locally:
```bash
vercel whoami        # Shows ORG_ID
vercel link          # Shows PROJECT_ID
```

**Option B**: Get from Vercel dashboard:
- ORG_ID: [https://vercel.com/account](https://vercel.com/account) → Settings
- PROJECT_ID: [https://vercel.com/dashboard](https://vercel.com/dashboard) → Your project → Settings

---

**Once you have those 2 IDs, paste them here and I'll give you the final commands to run!**

Or just add all 5 secrets using the values above and run the workflows. 🚀
