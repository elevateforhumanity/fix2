# 🚀 Vercel Autopilot Setup - Complete Guide

## Quick Setup (10 Minutes)

Your Supabase keys are ready. Just need to add Vercel credentials.

---

## ✅ Step 1: Get Vercel Credentials (5 minutes)

### 1.1 Get VERCEL_TOKEN

1. Go to: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: "Elevate Autopilot"
4. Scope: "Full Account"
5. Expiration: "No Expiration" (or 1 year)
6. Click "Create"
7. **Copy the token immediately** (you'll only see it once!)

### 1.2 Get VERCEL_ORG_ID

1. Go to: [https://vercel.com/account](https://vercel.com/account)
2. Click on your team/organization name
3. Go to "Settings"
4. Look for "Organization ID" or "Team ID"
5. Copy the ID (looks like: `team_xxxxxxxxxxxxx`)

**Alternative method**:
```bash
# If you have Vercel CLI installed locally
vercel whoami
# Shows your org ID
```

### 1.3 Get VERCEL_PROJECT_ID

1. Go to: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project (fix2 or elevateconnectsdirectory)
3. Go to "Settings"
4. Scroll to "General"
5. Find "Project ID"
6. Copy the ID (looks like: `prj_xxxxxxxxxxxxx`)

---

## ✅ Step 2: Add GitHub Secrets (5 minutes)

Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new](https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new)

### Add These 5 Secrets:

#### 1️⃣ VERCEL_TOKEN
```
Name: VERCEL_TOKEN
Value: [Paste token from Step 1.1]
```
Click "Add secret" ✅

#### 2️⃣ VERCEL_ORG_ID
```
Name: VERCEL_ORG_ID
Value: [Paste org ID from Step 1.2]
```
Click "Add secret" ✅

#### 3️⃣ VERCEL_PROJECT_ID
```
Name: VERCEL_PROJECT_ID
Value: [Paste project ID from Step 1.3]
```
Click "Add secret" ✅

#### 4️⃣ SUPABASE_ANON_KEY
```
Name: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```
Click "Add secret" ✅

#### 5️⃣ SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```
Click "Add secret" ✅

---

## ✅ Step 3: Verify Secrets

Check: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

You should see all 5 secrets:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID
- ✅ VERCEL_PROJECT_ID
- ✅ SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY

---

## ✅ Step 4: Run Autopilot Workflows

### 4.1 Validate Secrets
**Link**: [https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml)

1. Click "Run workflow"
2. Click "Run workflow" again
3. Wait 30 seconds
4. Check summary - should show ✅ for all 5 secrets

**Expected**: "✅ All required secrets present"

---

### 4.2 Sync Environment to Vercel
**Link**: [https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-vercel-guardian.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-vercel-guardian.yml)

1. Click "Run workflow"
2. Leave `force_redeploy` as `false`
3. Click "Run workflow"
4. Wait 3-5 minutes
5. Check summary

**Expected**: 
- "✅ All environment variables configured"
- "✅ Deployment triggered successfully"

---

### 4.3 Test Production Site
**Link**: [https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml)

1. Click "Run workflow"
2. Leave `base_url` as default
3. Click "Run workflow"
4. Wait 1-2 minutes
5. Check summary

**Expected**: "✅ All critical routes are functional"

---

## ✅ Step 5: Visit Your Live Site

### Open Your Site
**Link**: [https://elevateconnectsdirectory.org](https://elevateconnectsdirectory.org)

### Check These Pages:
- ✅ Homepage loads
- ✅ No "Internal Server Error"
- ✅ Programs page works
- ✅ HVAC, Barber, CNA programs load
- ✅ Navigation functional

---

## 🎯 Success Checklist

After completing all steps:

### GitHub Secrets
- [x] All 5 secrets added
- [x] Secrets validator passed

### Autopilot System
- [x] Vercel Guardian synced environment
- [x] Readiness Tester passed all checks

### Production Site
- [x] Homepage loads without errors
- [x] Programs pages work
- [x] No "Internal Server Error"

---

## 🔄 Automated Monitoring

Your autopilot system now runs:

### Daily Checks
- **2 AM UTC**: Secrets Validator
- **10 AM UTC**: Readiness Tester

### On Every Push
- Readiness Tester validates site
- All checks must pass

---

## 🆘 Troubleshooting

### "VERCEL_TOKEN authentication failed"
**Solution**:
1. Verify token is correct
2. Check token hasn't expired
3. Generate new token if needed
4. Update GitHub Secret

### "Cannot find project"
**Solution**:
1. Verify VERCEL_PROJECT_ID is correct
2. Check you have access to the project
3. Ensure project exists in Vercel dashboard

### "Site still shows error"
**Solution**:
1. Wait 5 minutes for Vercel to deploy
2. Run Vercel Guardian again
3. Check Vercel deployment logs
4. Clear browser cache

---

## 📚 Documentation

- **AUTOPILOT_INDEX.md** - Complete autopilot reference
- **SECURITY_MFA_SETUP.md** - MFA setup guide
- **SECURITY.md** - Security policy

---

## 🚀 What's Next?

After activation:

1. Test all program pages
2. Verify student signup flow
3. Check partner application
4. Run Page Auditor for issues
5. Run Schema Guardian for database docs

---

**Start with Step 1 above** and you'll be live in 10 minutes!

🤖 *Vercel Autopilot - Keeping your LMS running smoothly.*
