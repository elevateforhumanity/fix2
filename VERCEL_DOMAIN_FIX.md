# Vercel Domain Fix - Ghost Domains Issue

## Problem Identified

The site was deploying to preview URLs instead of www.elevateforhumanity.org because:

1. **GitHub Actions workflow was creating duplicate deployments**
   - `.github/workflows/vercel-hard-refresh.yml` was running on every push to main
   - It used Vercel API to create deployments, which bypasses native domain assignment
   - This created "ghost" preview URLs like `fix2-gpql-94x6zpf48-elevate-48e460c9.vercel.app`

2. **Vercel has two deployment methods:**
   - **Native GitHub Integration** (automatic, assigns production domains correctly)
   - **API Deployments** (manual, creates preview URLs only)

## Solution Applied

### 1. Disabled Automatic Workflow Trigger
- Modified `.github/workflows/vercel-hard-refresh.yml`
- Commented out the `push: branches: - main` trigger
- Workflow can still be run manually via `workflow_dispatch` if needed

### 2. Let Vercel's Native Integration Handle Deployments
- Vercel's GitHub App automatically deploys on push to main
- It properly assigns production domains
- No manual API calls needed

## Required Manual Steps in Vercel Dashboard

You must configure the production domain in Vercel Dashboard:

### Step 1: Verify Production Branch
1. Go to https://vercel.com/dashboard
2. Select project: **fix2-gpql**
3. Go to **Settings** → **Git**
4. Ensure **Production Branch** is set to: `main`
5. Click **Save** if changed

### Step 2: Configure Production Domain
1. Go to **Settings** → **Domains**
2. Add domain: `www.elevateforhumanity.org`
3. Set it as **Production** domain
4. Add redirect: `elevateforhumanity.org` → `www.elevateforhumanity.org`

### Step 3: Verify Deployment Settings
1. Go to **Settings** → **Git**
2. Ensure these are enabled:
   - ✅ **Automatically deploy from GitHub**
   - ✅ **Production Branch: main**
   - ❌ **Preview Deployments** (can be enabled for PRs)

### Step 4: Trigger Fresh Deployment
After configuring domains, push a commit to main:
```bash
git commit --allow-empty -m "chore: trigger production deployment"
git push origin main
```

## Verification

After deployment completes (2-3 minutes):

1. Check https://www.elevateforhumanity.org
2. Should show latest code from main branch
3. Deployment logs should show: "Assigning Custom Domains: ✅ www.elevateforhumanity.org"

## Why This Happened

The `vercel.json` file has `alias` configuration, but:
- The `alias` field is **deprecated** in Vercel
- Domains must be configured via Dashboard or API
- The GitHub Actions workflow was creating API deployments that don't respect domain configuration

## Files Changed

- `.github/workflows/vercel-hard-refresh.yml` - Disabled automatic trigger
- `VERCEL_DOMAIN_FIX.md` - This documentation

## Notes

- The `vercel.json` alias configuration is kept for reference but is not used
- Manual workflow runs via `workflow_dispatch` will still create preview URLs
- For production deployments, always use Vercel's native GitHub integration
