# Vercel: Single Source of Truth Configuration

**Date**: November 16, 2025  
**Purpose**: Ensure only ONE Vercel project exists for this repository  
**Status**: Action Required

---

## 🎯 GOAL

**ONE repository → ONE Vercel project → ONE production deployment**

No duplicates. No confusion. One source of truth.

---

## ✅ CORRECT SETUP

```
GitHub Repository:
└─ elevateforhumanity/fix2
   └─ Connected to →
      └─ Vercel Project: fix2-one (or similar)
         ├─ Production: www.elevateconnectsdirectory.org
         ├─ Preview: *.vercel.app
         └─ Environment Variables: ✅ All configured
```

---

## ❌ INCORRECT SETUP (What to Avoid)

```
GitHub Repository:
└─ elevateforhumanity/fix2
   ├─ Connected to → Vercel Project: fix2-one ❌
   ├─ Connected to → Vercel Project: fix2-i3z8 ❌
   ├─ Connected to → Vercel Project: fix2-1c7w ❌
   └─ Connected to → Vercel Project: fix2-tlr1 ❌

Problem: Multiple projects = confusion, wasted resources, missing variables
```

---

## 🔍 HOW TO CHECK

### Step 1: Check Your Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Count projects related to "fix2" or "elevate"
3. Expected: **1 project**
4. If you see more: **Follow cleanup guide below**

### Step 2: Verify GitHub Connection

1. Go to your Vercel project
2. Click Settings → Git
3. Verify:
   - Repository: `elevateforhumanity/fix2`
   - Production Branch: `main`
   - Auto-deploy: Enabled

### Step 3: Check Environment Variables

1. Go to Settings → Environment Variables
2. Verify ALL 6 critical variables exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Each should be set for ALL 3 environments:
   - Production
   - Preview
   - Development

---

## 🚀 QUICK CHECK SCRIPT

Run this to verify your setup:

```bash
./scripts/workers/check-vercel-duplicates.sh
```

This will:
- Count your Vercel projects
- Identify duplicates
- Guide you through cleanup
- Verify environment variables

---

## 🧹 CLEANUP PROCESS (If You Have Duplicates)

### Identify Which Project to Keep

**Keep the project that has:**
1. ✅ Custom domain (www.elevateconnectsdirectory.org)
2. ✅ Most recent successful deployment
3. ✅ All environment variables configured
4. ✅ Connected to elevateforhumanity/fix2

**Delete all others**

### How to Delete a Project

1. Go to: https://vercel.com/dashboard
2. Click on the project to DELETE
3. Click Settings (left sidebar)
4. Scroll to bottom → Advanced
5. Click "Delete Project"
6. Type project name to confirm
7. Click Delete

⚠️ **WARNING**: This is permanent! Make sure you're deleting the right one.

### After Deletion

1. Verify only 1 project remains
2. Check environment variables are present
3. Test deployment
4. Update documentation

---

## 📋 ENVIRONMENT VARIABLES CHECKLIST

Your single Vercel project MUST have these variables:

### Critical (Required):
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (all 3 envs)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (all 3 envs)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (all 3 envs)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (all 3 envs)
- [ ] `STRIPE_SECRET_KEY` (all 3 envs)
- [ ] `NEXT_PUBLIC_SITE_URL` (all 3 envs)

### Optional (Recommended):
- [ ] `RESEND_API_KEY`
- [ ] `EMAIL_FROM`
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] `MOU_ARCHIVE_EMAIL`

### How to Add Missing Variables

If variables are missing, run:
```bash
./scripts/workers/get-vercel-credentials.sh
```

This will guide you through adding all required variables.

---

## 🎯 VERIFICATION CHECKLIST

After ensuring single project, verify:

### Vercel Dashboard:
- [ ] Only 1 project visible for this repo
- [ ] Project has clear name
- [ ] Latest deployment successful
- [ ] Custom domain configured
- [ ] All environment variables present

### Production Site:
- [ ] https://www.elevateconnectsdirectory.org loads
- [ ] Homepage displays correctly
- [ ] Login/signup works
- [ ] No console errors
- [ ] Images load properly

### GitHub Integration:
- [ ] Pushes to main trigger deployments
- [ ] Pull requests create preview deployments
- [ ] Deployment status shows in GitHub PRs

### Team Alignment:
- [ ] Team knows which project to use
- [ ] Documentation updated
- [ ] No confusion about "which Vercel"

---

## 📊 CURRENT STATUS

Based on repository files, you may have:

**Configured Project**: `fix2-i3z8`  
**Mentioned Projects**: 
- fix2-one (in README as live URL)
- fix2-1c7w (in VERCEL_ENV_AUDIT_CHECKLIST.md)
- fix2-tlr1 (in VERCEL_CLEANUP_GUIDE.md)

**Action Required**: 
1. Run `./scripts/workers/check-vercel-duplicates.sh`
2. Identify which project is production
3. Delete duplicates
4. Update documentation

---

## 🔧 AUTOMATION

### Check for Duplicates:
```bash
./scripts/workers/check-vercel-duplicates.sh
```

### Add Environment Variables:
```bash
./scripts/workers/get-vercel-credentials.sh
```

### Verify Supabase Connection:
```bash
./scripts/workers/get-supabase-credentials.sh
```

---

## 📚 RELATED DOCUMENTATION

- **VERCEL_DUPLICATE_CHECK_REPORT.md** - Detailed analysis
- **VERCEL_CLEANUP_GUIDE.md** - Step-by-step cleanup
- **VERCEL_ENV_AUDIT_CHECKLIST.md** - Environment variable checklist
- **scripts/workers/check-vercel-duplicates.sh** - Automation script

---

## 🎉 SUCCESS CRITERIA

You'll know you have the correct setup when:

1. ✅ **ONE** Vercel project in dashboard
2. ✅ Project connected to `elevateforhumanity/fix2`
3. ✅ All 6 critical environment variables present
4. ✅ Custom domain configured
5. ✅ Latest deployment successful
6. ✅ Team knows which project to use
7. ✅ No confusion or duplicates

---

## 🚨 RED FLAGS

Watch out for these issues:

- 🚩 Multiple projects with similar names
- 🚩 Environment variables in one project but not another
- 🚩 Team members deploying to different projects
- 🚩 Confusion about "which Vercel project is production"
- 🚩 Failed deployments due to missing variables
- 🚩 Multiple custom domains on different projects

If you see any of these, run the cleanup process immediately.

---

## 💡 BEST PRACTICES

### Going Forward:

1. **One Project Rule**: Never create duplicate Vercel projects
2. **Clear Naming**: Use descriptive project names (e.g., "elevate-lms-production")
3. **Document**: Keep this file updated with current project name
4. **Team Communication**: Ensure everyone knows which project to use
5. **Regular Audits**: Check monthly for duplicates or issues

### When Creating New Projects:

1. Check if project already exists
2. Use consistent naming
3. Configure all environment variables immediately
4. Document in team wiki/docs
5. Set up custom domain right away

---

## 📞 NEED HELP?

### If You're Unsure:

1. Run: `./scripts/workers/check-vercel-duplicates.sh`
2. Follow the prompts
3. When in doubt, keep the project with the custom domain
4. Backup environment variables before deleting anything

### If You Made a Mistake:

- Vercel keeps deleted projects for 7 days
- Contact Vercel support to restore
- Or reconfigure from scratch using worker scripts

---

## 🎯 ACTION ITEMS

### Right Now:

1. [ ] Run `./scripts/workers/check-vercel-duplicates.sh`
2. [ ] Count your Vercel projects
3. [ ] If more than 1, follow cleanup process
4. [ ] Verify environment variables
5. [ ] Test production deployment
6. [ ] Update this document with correct project name

### This Week:

1. [ ] Notify team of correct project
2. [ ] Update all documentation
3. [ ] Remove references to old projects
4. [ ] Set up monitoring/alerts
5. [ ] Document deployment process

---

## 📝 CURRENT CONFIGURATION

**Update this section after cleanup:**

```
Repository: elevateforhumanity/fix2
Vercel Project: [UPDATE WITH ACTUAL PROJECT NAME]
Production URL: https://www.elevateconnectsdirectory.org
Preview URL: https://[project-name].vercel.app
Last Verified: [UPDATE DATE]
Environment Variables: [✅ Complete / ⚠️ Incomplete]
```

---

**Start Here**: https://vercel.com/dashboard

**Run This**: `./scripts/workers/check-vercel-duplicates.sh`

**Goal**: ONE project, ONE source of truth, ZERO confusion
