# 🚨 WORKER: START HERE

## CRITICAL TASK - IMMEDIATE ACTION REQUIRED

**Status**: 🔴 ACTIVE  
**Priority**: CRITICAL  
**Blocking**: Production deployment  
**Time**: 5-10 minutes

---

## 🎯 Your Task

Add environment variables to GitHub and Netlify to fix deployment error.

**Error**: `Missing Supabase environment variables for admin client`  
**Impact**: Site cannot deploy  
**Solution**: Add 6 variables to Netlify

---

## 📖 Instructions

**Read this file first:**

```
WORKER_TASK_ADD_SECRETS.md
```

**Or detailed version:**

```
.autopilot/tasks/secure-add-secrets.json
```

**Active task details:**

```
.autopilot/active-tasks/add-secrets-NOW.json
```

---

## ⚡ Quick Start

### 1. Get Keys (2 min)

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

Copy these 3 values:

- Project URL
- anon public key
- service_role key

### 2. Add to GitHub (2 min)

Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

Add 3 secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Add to Netlify (3 min)

Go to: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env

Add 6 variables:

- `NEXT_PUBLIC_SUPABASE_URL` (from Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase)
- `SUPABASE_SERVICE_ROLE_KEY` (from Supabase)
- `NEXT_PUBLIC_APP_URL` = `https://www.elevateconnectsdirectory.org`
- `NEXT_PUBLIC_SITE_URL` = `https://www.elevateconnectsdirectory.org`
- `NODE_ENV` = `production`

### 4. Deploy (2 min)

In Netlify → Deploys → "Trigger deploy" → "Clear cache and deploy site"

Wait 2-3 minutes for build to complete.

### 5. Verify (1 min)

Open: https://www.elevateconnectsdirectory.org

Site should load without errors. ✅

---

## 📊 Report Completion

After completing:

1. Take screenshot of Netlify deployment (status: Published)
2. Take screenshot of site loading
3. Confirm all variables added
4. Report to team lead

---

## 🆘 Need Help?

- Check: `WORKER_TASK_ADD_SECRETS.md` for detailed steps
- Check: `.autopilot/tasks/secure-add-secrets.json` for troubleshooting
- Contact team lead if you don't have access

---

## ⚠️ Security

- `service_role` key is sensitive - never share it
- Keys are encrypted in GitHub and Netlify
- Don't commit keys to git

---

**START NOW** → Read `WORKER_TASK_ADD_SECRETS.md`
