# 🚀 START VERCEL AUTOPILOT - 3 Simple Steps

## Your Supabase keys are ready! Just need Vercel credentials.

---

## Step 1: Get Your Vercel IDs (2 minutes)

### Option A: Use Vercel CLI (Fastest)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# Get your IDs
vercel whoami
# This shows your ORG_ID

# Go to your project directory and run:
vercel link
# This shows your PROJECT_ID
```

### Option B: Use Vercel Dashboard

**VERCELACESSTOKEN**:

1. Go to: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: "Elevate Autopilot"
4. Click "Create"
5. Copy the token

**VERCEL_ORG_ID**:

1. Go to: [https://vercel.com/account](https://vercel.com/account)
2. Click your team name → Settings
3. Copy "Team ID" or "Organization ID"

**VERCEL_PROJECT_ID**:

1. Go to: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Settings → General
4. Copy "Project ID"

---

## Step 2: Add All 5 Secrets to GitHub (3 minutes)

Go to: **[Add GitHub Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new)**

### Copy & Paste These:

#### 1. VERCELACESSTOKEN

```
Name: VERCELACESSTOKEN
Value: [Your token from Step 1]
```

#### 2. VERCEL_ORG_ID

```
Name: VERCEL_ORG_ID
Value: [Your org ID from Step 1]
```

#### 3. VERCEL_PROJECT_ID

```
Name: VERCEL_PROJECT_ID
Value: [Your project ID from Step 1]
```

#### 4. SUPABASE_ANON_KEY

```
Name: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```

#### 5. SUPABASE_SERVICE_ROLE_KEY

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```

---

## Step 3: Run Autopilots (5 minutes)

### 3.1 Validate Secrets

**[Click here to run](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml)**

1. Click "Run workflow" → "Run workflow"
2. Wait 30 seconds
3. Should show: ✅ All 5 secrets present

### 3.2 Sync to Vercel

**[Click here to run](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-vercel-guardian.yml)**

1. Click "Run workflow" → "Run workflow"
2. Wait 3-5 minutes
3. Should show: ✅ Environment variables configured
4. Vercel will automatically deploy

### 3.3 Test Site

**[Click here to run](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml)**

1. Click "Run workflow" → "Run workflow"
2. Wait 1-2 minutes
3. Should show: ✅ All routes functional

---

## ✅ Done! Visit Your Site

**[https://www.elevateforhumanity.org](https://www.elevateforhumanity.org)**

Should now show:

- ✅ Homepage loads
- ✅ No errors
- ✅ Programs work
- ✅ Navigation functional

---

## 🔄 What Happens Next?

Your autopilot system now:

- ✅ Runs nightly checks (2 AM & 10 AM UTC)
- ✅ Tests site on every push
- ✅ Syncs environment variables automatically
- ✅ Monitors for issues

---

## 🆘 Need Help?

**Secrets Validator Failed?**

- Check you added all 5 secrets correctly
- Verify Vercel token hasn't expired

**Vercel Guardian Failed?**

- Verify VERCELACESSTOKEN has correct permissions
- Check VERCEL_PROJECT_ID is correct

**Site Still Shows Error?**

- Wait 5 minutes for Vercel deployment
- Check Vercel deployment logs
- Run Vercel Guardian again

---

## 📚 Full Documentation

- **[VERCEL_AUTOPILOT_SETUP.md](./VERCEL_AUTOPILOT_SETUP.md)** - Detailed setup guide
- **[AUTOPILOT_INDEX.md](./AUTOPILOT_INDEX.md)** - Complete autopilot reference
- **[SECURITY_MFA_SETUP.md](./SECURITY_MFA_SETUP.md)** - Fix MFA warning

---

**Total Time**: 10 minutes  
**Difficulty**: Easy  
**Result**: Fully automated LMS deployment 🚀

Start with Step 1 above!
