# 🚀 Deploy to Vercel - Complete Guide

**Status:** Ready to deploy with all Stripe keys configured  
**Time Required:** 5-10 minutes

---

## 🎯 Quick Deploy Options

### Option 1: Trigger via GitHub Actions (Recommended)

**Go to:** [GitHub Actions - Vercel Deploy](https://github.com/elevateforhumanity/fix2/actions/workflows/vercel-deploy.yml)

**Steps:**

1. Click **"Run workflow"** button
2. Select branch: `main`
3. Click **"Run workflow"**
4. Wait 3-5 minutes for deployment
5. Check workflow summary for deployment URL

**What it does automatically:**

- ✅ Pulls latest code
- ✅ Installs dependencies
- ✅ Configures environment variables
- ✅ Builds production bundle
- ✅ Deploys to Vercel
- ✅ Verifies deployment
- ✅ Creates deployment report

---

### Option 2: Push to Main Branch (Automatic)

**Trigger deployment by pushing to main:**

```bash
# Make any change or empty commit
git commit --allow-empty -m "Deploy to Vercel with Stripe keys"
git push origin main
```

**Automatic deployment will:**

- Start within seconds
- Complete in 3-5 minutes
- Deploy to production
- Update deployment URL

---

### Option 3: Vercel Dashboard (Manual)

**Go to:** [Vercel Dashboard](https://vercel.com/elevateforhumanitys-projects/fix2)

**Steps:**

1. Click **"Deployments"** tab
2. Find latest deployment
3. Click **"Redeploy"** button
4. Select **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

---

## ⚙️ Required Secrets (Already Configured)

### GitHub Secrets

These should already be set at: [GitHub Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

| Secret Name                   | Status   | Purpose                     |
| ----------------------------- | -------- | --------------------------- |
| `VERCEL_TOKEN`                | ⚠️ Check | Vercel API authentication   |
| `VERCEL_ORG_ID`               | ⚠️ Check | Your Vercel organization ID |
| `VERCEL_PROJECT_ID`           | ⚠️ Check | Project ID for fix2         |
| `VITE_SUPABASE_URL`           | ✅ Set   | Supabase project URL        |
| `VITE_SUPABASE_ANON_KEY`      | ✅ Set   | Supabase public key         |
| `VITE_STRIPE_PUBLISHABLE_KEY` | ✅ Set   | Stripe public key           |
| `VITE_API_URL`                | ⚠️ Check | API endpoint URL            |
| `VITE_SITE_URL`               | ⚠️ Check | Production site URL         |

### Vercel Environment Variables

These will be synced automatically by the workflow, or set manually at: [Vercel Settings](https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables)

| Variable Name                 | Value                                      | Environments                     |
| ----------------------------- | ------------------------------------------ | -------------------------------- |
| `VITE_SUPABASE_URL`           | `https://cuxzzpsyufcewtmicszk.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY`      | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`  | Production, Preview, Development |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_51RvqjzIRNf5vPH3A...`             | Production, Preview, Development |
| `STRIPE_SECRET_KEY`           | `rk_live_51RvqjzIRNf5vPH3A...`             | Production, Preview, Development |
| `STRIPE_WEBHOOK_SECRET`       | `whsec_OKzsSHpywRhxg2wW...`                | Production, Preview, Development |

---

## 🔍 Verify Secrets Are Set

### Check GitHub Secrets

```bash
# If gh CLI is authenticated
gh secret list
```

Or visit: [GitHub Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

**Required secrets:**

- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_STRIPE_PUBLISHABLE_KEY

### Check Vercel Environment Variables

Visit: [Vercel Environment Variables](https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables)

**Should see:**

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

---

## 🚀 Deployment Process

### What Happens During Deployment

1. **Checkout Code** (10 seconds)
   - Pulls latest from main branch
   - Includes all program pages

2. **Setup Environment** (30 seconds)
   - Installs Node.js 20.11.1
   - Installs pnpm 9.7.0
   - Installs Vercel CLI

3. **Configure Vercel** (20 seconds)
   - Pulls Vercel project settings
   - Syncs environment variables
   - Sets production configuration

4. **Build Application** (2-3 minutes)
   - Runs `pnpm install`
   - Runs `vite build`
   - Generates static assets
   - Optimizes bundles

5. **Deploy to Vercel** (30 seconds)
   - Uploads build artifacts
   - Configures routing
   - Assigns production URL
   - Enables CDN

6. **Verify Deployment** (10 seconds)
   - Checks HTTP 200 response
   - Verifies site accessibility
   - Creates deployment report

**Total Time:** 3-5 minutes

---

## ✅ Post-Deployment Verification

### 1. Check Deployment URL

Visit the deployment URL from the workflow summary or Vercel dashboard.

**Expected URL format:**

- Production: `https://fix2-git-main-elevateforhumanitys-projects.vercel.app`
- Or custom domain if configured

### 2. Verify Program Pages

Check that all program pages load:

- [/programs/barber](https://fix2-git-main-elevateforhumanitys-projects.vercel.app/programs/barber)
- [/programs/building-tech](https://fix2-git-main-elevateforhumanitys-projects.vercel.app/programs/building-tech)
- [/programs/healthcare](https://fix2-git-main-elevateforhumanitys-projects.vercel.app/programs/healthcare)
- [/programs/tax-business](https://fix2-git-main-elevateforhumanitys-projects.vercel.app/programs/tax-business)

### 3. Test Stripe Integration

1. Navigate to any program page
2. Click "Enroll Now" or "Apply"
3. Verify Stripe Checkout loads
4. Check for real payment form (not test mode)

**Test card (if in test mode):**

- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### 4. Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors
4. Verify no Stripe key errors

### 5. Verify Environment Variables

Check that environment variables are loaded:

```javascript
// In browser console
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

Should show your actual values, not undefined.

---

## 🔧 Troubleshooting

### Deployment Fails

**Check workflow logs:**

1. Go to [Actions](https://github.com/elevateforhumanity/fix2/actions)
2. Click on failed workflow run
3. Expand failed step
4. Read error message

**Common issues:**

- Missing VERCEL_TOKEN → Add to GitHub Secrets
- Missing VERCEL_ORG_ID → Get from Vercel dashboard
- Missing VERCEL_PROJECT_ID → Get from Vercel dashboard
- Build errors → Check package.json and dependencies

### Site Loads But Stripe Doesn't Work

**Check environment variables:**

1. Go to [Vercel Settings](https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables)
2. Verify all Stripe keys are set
3. Check they're enabled for Production
4. Redeploy after adding variables

### Program Pages 404

**Check routing:**

1. Verify files exist in `src/pages/programs/`
2. Check `src/router/AppRoutes.tsx` has routes
3. Verify build output includes program pages
4. Check Vercel routing configuration

---

## 📊 Deployment Monitoring

### Vercel Dashboard

**Monitor deployments:**

- [Vercel Dashboard](https://vercel.com/elevateforhumanitys-projects/fix2)
- View deployment history
- Check build logs
- Monitor performance metrics

### GitHub Actions

**Track workflow runs:**

- [GitHub Actions](https://github.com/elevateforhumanity/fix2/actions)
- View deployment status
- Download artifacts
- Check workflow logs

### Deployment Reports

**Automatic reports:**

- Created after each deployment
- Committed to repository
- File: `VERCEL_DEPLOYMENT_REPORT.md`
- Includes deployment URL and status

---

## 🤖 Autopilot Integration

### Automatic Deployments

The Vercel deployment is integrated with multiple autopilots:

**Continuous Deploy** (Every 6 hours)

- Workflow: `.github/workflows/continuous-deploy.yml`
- Automatically deploys to Vercel
- Runs tests before deployment

**On Push to Main**

- Workflow: `.github/workflows/vercel-deploy.yml`
- Triggers on every push
- Deploys within minutes

**Master Orchestrator** (Every 30 minutes)

- Coordinates all autopilot systems
- Can trigger deployments
- Monitors deployment health

---

## 📋 Quick Deployment Checklist

### Before Deploying

- [ ] All Stripe keys configured in `.env.production`
- [ ] GitHub Secrets verified
- [ ] Vercel environment variables set
- [ ] Latest code pushed to main branch
- [ ] No build errors locally

### Trigger Deployment

- [ ] Go to [GitHub Actions](https://github.com/elevateforhumanity/fix2/actions/workflows/vercel-deploy.yml)
- [ ] Click "Run workflow"
- [ ] Select branch: main
- [ ] Click "Run workflow"
- [ ] Wait 3-5 minutes

### After Deployment

- [ ] Visit deployment URL
- [ ] Check program pages load
- [ ] Test Stripe integration
- [ ] Verify no console errors
- [ ] Test enrollment flow
- [ ] Check mobile responsiveness

---

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Site loads at production URL
- ✅ All program pages accessible
- ✅ Stripe Checkout loads correctly
- ✅ No console errors
- ✅ Environment variables loaded
- ✅ Payment form displays
- ✅ Mobile responsive
- ✅ Fast page loads

---

## 📚 Related Documentation

- [STRIPE_KEYS_COMPLETE.md](./STRIPE_KEYS_COMPLETE.md) - Stripe configuration
- [PAYMENT_VERIFICATION_CHECKLIST.md](./PAYMENT_VERIFICATION_CHECKLIST.md) - Testing guide
- [COMPLETE_AUTOPILOT_ANALYSIS.md](./COMPLETE_AUTOPILOT_ANALYSIS.md) - Autopilot system
- [Vercel Documentation](https://vercel.com/docs) - Official Vercel docs

---

## 🚀 Deploy Now

**Ready to deploy?**

1. **Click here:** [Deploy to Vercel](https://github.com/elevateforhumanity/fix2/actions/workflows/vercel-deploy.yml)
2. Click **"Run workflow"**
3. Wait 3-5 minutes
4. Visit your live site!

---

**Last Updated:** 2025-11-08 07:10 UTC  
**Status:** ✅ Ready for deployment  
**Estimated Time:** 3-5 minutes
