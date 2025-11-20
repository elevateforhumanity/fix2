# WORKER TASK: Connect Vercel Project fix2-1c7w

## PRIORITY: HIGH - Costing money on failed builds

## Task Assignment

**Worker Type:** Vercel Deployment Specialist  
**Estimated Time:** 10 minutes  
**Complexity:** Low

## Problem Statement

The GitHub repository `elevateforhumanity/fix2` is currently deploying to the wrong Vercel project. Builds are failing on old commits with deprecated packages, costing money on repeated failed builds.

**Current State:**

- ❌ Deploying to: `fix2-8mig` (wrong project)
- ❌ Building old commit: `3d3bd68` (has deprecated packages)
- ❌ Build logs show 10+ deprecation warnings
- ❌ Builds failing, costing money

**Target State:**

- ✅ Deploy to: `fix2-1c7w` (correct project)
- ✅ Build latest commit: `6669673b` or newer
- ✅ Clean build with no deprecation warnings
- ✅ Site loads successfully

## Your Mission

### Step 1: Access Vercel Dashboard

1. Go to: https://vercel.com/gitpod/fix2-1c7w
2. Log in with Gitpod organization credentials
3. You should see the project dashboard

### Step 2: Connect GitHub Repository

1. Click **Settings** in the left sidebar
2. Click **Git** section
3. Look for "Git Repository" section
4. Click **"Connect Git Repository"** button
5. Select repository: `elevateforhumanity/fix2`
6. Branch: `main`
7. Root Directory: `./` (leave as default)
8. Click **"Connect"** button

### Step 3: Add Environment Variables

1. Still in Settings, click **"Environment Variables"**
2. Click **"Add New"** button
3. Add each of these 6 variables:

**Variable 1:**

```
Key: SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Environment: Production
```

**Variable 2:**

```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
Environment: Production
```

**Variable 3:**

```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: [WORKER: Get this from Supabase - see instructions below]
Environment: Production
```

**Variable 4:**

```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Environment: Production
```

**Variable 5:**

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
Environment: Production
```

**Variable 6:**

```
Key: NEXT_PUBLIC_SITE_URL
Value: https://www.elevateforhumanity.org
Environment: Production
```

### Step 4: Get SUPABASE_SERVICE_ROLE_KEY

1. Open new tab: https://supabase.com/dashboard
2. Log in with project credentials
3. Select project: `cuxzzpsyufcewtmicszk`
4. Click **Settings** (gear icon) in left sidebar
5. Click **API** section
6. Find the `service_role` key (marked as "secret")
7. Click **"Reveal"** button
8. Copy the key
9. Go back to Vercel and paste it as Variable 3

### Step 5: Verify Build Settings

1. In Vercel Settings, click **"General"**
2. Scroll to **"Build & Development Settings"**
3. Verify these settings:
   - Framework Preset: **Next.js** (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node.js Version: **20.x**
4. If any are wrong, click **"Edit"** and fix them
5. Click **"Save"** if you made changes

### Step 6: Trigger Deployment

1. Click **"Deployments"** in left sidebar
2. Click **"Deploy"** button (top right)
3. Or click the three dots on latest commit → **"Redeploy"**
4. **IMPORTANT:** Uncheck "Use existing build cache"
5. Click **"Deploy"**

### Step 7: Monitor Build

1. Watch the build logs in real-time
2. **Expected:** Build should complete in 2-3 minutes
3. **Check for:** NO deprecation warnings (xss-clean, lodash.isequal, etc.)
4. **Success:** Build completes with "✓ Compiled successfully"

### Step 8: Verify Deployment

1. Once deployed, click the deployment URL
2. Test these pages:
   - Homepage: Should load
   - `/lms/dashboard`: Should load (or redirect to login)
   - `/programs`: Should load
   - `/login`: Should load
3. **No 500 errors should appear**

### Step 9: Report Back

Create a file: `/workspaces/fix2/VERCEL_DEPLOYMENT_COMPLETE.md`

```markdown
# Vercel Deployment Complete

## Deployment Details

- Project: fix2-1c7w
- Commit: [paste commit hash from deployment]
- Deployment URL: [paste URL]
- Build Time: [paste duration]
- Status: ✅ Success / ❌ Failed

## Build Logs Summary

- Deprecation Warnings: [count or "None"]
- Build Errors: [count or "None"]
- TypeScript Errors: [count or "None"]

## Site Verification

- [ ] Homepage loads
- [ ] /lms/dashboard loads
- [ ] /programs loads
- [ ] /login loads
- [ ] No 500 errors

## Environment Variables

- [ ] All 6 variables added
- [ ] SUPABASE_SERVICE_ROLE_KEY retrieved from Supabase
- [ ] Variables set to Production environment

## Issues Encountered

[List any problems or "None"]

## Next Steps

[Any recommendations or "Deployment complete, no further action needed"]

Completed by: [Your name]
Date: [Date and time]
```

## Success Criteria

- [ ] Repository connected to fix2-1c7w
- [ ] All 6 environment variables configured
- [ ] Build completes successfully
- [ ] No deprecation warnings in build logs
- [ ] Site loads without 500 errors
- [ ] Deployment URL accessible

## If You Encounter Issues

### Issue: Can't find SUPABASE_SERVICE_ROLE_KEY

**Solution:** Ask the project owner or check password manager for Supabase credentials

### Issue: Build fails with TypeScript errors

**Solution:** Check that you're building the latest commit (6669673b or newer)

### Issue: Site shows 500 errors

**Solution:** Double-check all 6 environment variables are set correctly in Vercel

### Issue: Can't connect repository

**Solution:** Ensure you have admin access to both GitHub repo and Vercel project

### Issue: Old project still deploying

**Solution:** Go to old project settings and disconnect the Git repository

## Important Notes

- ⚠️ Make sure to select **Production** environment for all variables
- ⚠️ Do NOT use existing build cache on first deployment
- ⚠️ Latest commit has all deprecated packages removed
- ⚠️ This will save money by eliminating failed builds

## Estimated Cost Savings

- Current: ~$X per failed build × multiple attempts
- After fix: Clean builds, no wasted compute time
- Savings: Significant reduction in build costs

## Questions?

If you get stuck, document the issue in VERCEL_DEPLOYMENT_COMPLETE.md and mark status as "Blocked"
