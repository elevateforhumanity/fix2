# Vercel Deployment Setup Guide

**Status:** ✅ Ready for Deployment  
**Platform:** Vercel (Replacing Netlify)  
**Reason:** More reliable for React/Vite applications

---

## Why Vercel?

Netlify has been experiencing deployment failures. Vercel offers:

- ✅ Better Vite/React support
- ✅ More reliable builds
- ✅ Faster deployments
- ✅ Better environment variable management
- ✅ Automatic HTTPS and CDN
- ✅ Zero-config for most frameworks

---

## Prerequisites

You need these GitHub Secrets configured:

### Required Secrets

| Secret Name                   | Description                 | Where to Get It                                              |
| ----------------------------- | --------------------------- | ------------------------------------------------------------ |
| `VERCEL_TOKEN`                | Vercel API token            | [Vercel Account Settings](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID`               | Your Vercel organization ID | Run `vercel whoami` or check project settings                |
| `VERCEL_PROJECT_ID`           | Your Vercel project ID      | Create project first, then check settings                    |
| `VITE_SUPABASE_URL`           | Supabase project URL        | https://cuxzzpsyufcewtmicszk.supabase.co                     |
| `VITE_SUPABASE_ANON_KEY`      | Supabase anonymous key      | Supabase Dashboard → Settings → API                          |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key      | Stripe Dashboard → Developers → API Keys                     |
| `VITE_API_URL`                | API endpoint URL            | Your backend API URL                                         |
| `VITE_SITE_URL`               | Production site URL         | Will be your Vercel URL                                      |

---

## Step-by-Step Setup

### 1. Create Vercel Account & Project

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link this project to Vercel
vercel link
```

Follow the prompts to create a new project or link to an existing one.

### 2. Get Your Vercel IDs

```bash
# Get your organization and project IDs
vercel whoami

# Or check the .vercel directory after linking
cat .vercel/project.json
```

You'll see output like:

```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

### 3. Create Vercel API Token

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions Deploy`
4. Scope: Full Account
5. Copy the token (you'll only see it once!)

### 4. Add GitHub Secrets

Go to your GitHub repository:

1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret from the table above

**Quick Add Script:**

```bash
# Set these values first
VERCEL_TOKEN="your_token_here"
VERCEL_ORG_ID="team_xxxxx"
VERCEL_PROJECT_ID="prj_xxxxx"

# Add to GitHub (requires gh CLI)
gh secret set VERCEL_TOKEN -b"$VERCEL_TOKEN"
gh secret set VERCEL_ORG_ID -b"$VERCEL_ORG_ID"
gh secret set VERCEL_PROJECT_ID -b"$VERCEL_PROJECT_ID"
```

### 5. Trigger Deployment

Once secrets are configured, deployment happens automatically:

**Option A: Push to main branch**

```bash
git add .
git commit -m "feat: switch to vercel deployment"
git push origin main
```

**Option B: Manual trigger**

1. Go to GitHub Actions
2. Select "Vercel Production Deployment"
3. Click "Run workflow"

**Option C: Emergency fix (if env vars are wrong)**

1. Go to GitHub Actions
2. Select "Emergency - Fix Vercel Environment Variables"
3. Click "Run workflow"
4. Choose whether to redeploy automatically

---

## What Happens During Deployment

### Automatic Workflow Steps

1. **Checkout Code** - Gets latest code from repository
2. **Setup Environment** - Installs Node.js 20.11.1 and pnpm 9.7.0
3. **Install Vercel CLI** - Installs latest Vercel CLI
4. **Configure Environment Variables** - Sets all 6 environment variables
5. **Build Project** - Runs `pnpm build` to create production build
6. **Deploy to Vercel** - Deploys to production
7. **Verify Deployment** - Checks if site is accessible
8. **Create Report** - Generates deployment report
9. **Commit Report** - Commits report back to repository

### Environment Variables Set Automatically

The workflow automatically configures:

- `VITE_SUPABASE_URL` - Database connection
- `VITE_SUPABASE_ANON_KEY` - Database authentication
- `VITE_STRIPE_PUBLISHABLE_KEY` - Payment processing
- `VITE_API_URL` - Backend API endpoint
- `VITE_SITE_URL` - Frontend URL
- `VITE_GA_MEASUREMENT_ID` - Google Analytics (hardcoded: G-EFHWORKFORCE01)

---

## Files Created

### Configuration Files

**`vercel.json`** - Vercel project configuration

- Defines build command: `pnpm build`
- Sets output directory: `dist`
- Configures SPA routing (all routes → index.html)
- Sets security headers
- Configures asset caching

### Workflow Files

**`.github/workflows/vercel-deploy.yml`** - Main deployment workflow

- Triggers on push to main
- Can be manually triggered
- Sets environment variables
- Deploys to production
- Creates deployment report

**`.github/workflows/vercel-fix-env-emergency.yml`** - Emergency fixer

- Manual trigger only
- Forcefully resets all environment variables
- Optional automatic redeployment
- Creates fix report

---

## Monitoring & Verification

### Check Deployment Status

**GitHub Actions:**

- https://github.com/elevateforhumanity/fix2/actions

**Vercel Dashboard:**

- https://vercel.com/dashboard
- View deployments, logs, and analytics

### Verify Environment Variables

```bash
# List all production environment variables
vercel env ls production

# Check specific variable
vercel env pull .env.production.local
cat .env.production.local
```

### Test Deployment

After deployment completes:

1. **Visit the URL** - Check if site loads
2. **Open Console** (F12) - Look for errors
3. **Test Authentication** - Try logging in
4. **Test Payments** - Try checkout flow
5. **Check Analytics** - Verify GA tracking

---

## Troubleshooting

### Build Fails

**Check build logs:**

1. Go to GitHub Actions
2. Click on failed workflow
3. Expand "Build Project Artifacts" step

**Common issues:**

- Missing dependencies → Check package.json
- TypeScript errors → Run `pnpm typecheck` locally
- Environment variables → Check GitHub Secrets

### Environment Variables Not Working

**Run emergency fix:**

1. Go to GitHub Actions
2. Run "Emergency - Fix Vercel Environment Variables"
3. Choose "true" for automatic redeployment

**Manual fix:**

```bash
# Remove and re-add variable
vercel env rm VITE_SUPABASE_URL production
echo "https://cuxzzpsyufcewtmicszk.supabase.co" | vercel env add VITE_SUPABASE_URL production
```

### Site Shows Blank Page

**Possible causes:**

1. Environment variables not set → Run emergency fix
2. Build output incorrect → Check vercel.json outputDirectory
3. Routing not configured → Check vercel.json rewrites

**Debug steps:**

```bash
# Build locally
pnpm build

# Check dist directory
ls -la dist/

# Test locally
pnpm preview
```

### Deployment Succeeds But Site Doesn't Update

**Force redeploy:**

```bash
# Redeploy latest production build
vercel --prod

# Or trigger from GitHub Actions
# Go to Actions → Vercel Production Deployment → Run workflow
```

---

## Comparison: Netlify vs Vercel

| Feature               | Netlify               | Vercel           |
| --------------------- | --------------------- | ---------------- |
| Vite Support          | Good                  | Excellent        |
| Build Reliability     | ⚠️ Issues             | ✅ Stable        |
| Environment Variables | Manual setup          | API-managed      |
| Deployment Speed      | ~2-3 min              | ~1-2 min         |
| Zero Config           | Requires netlify.toml | Works out of box |
| Edge Functions        | Yes                   | Yes (better)     |
| Analytics             | Paid                  | Free tier        |

---

## Migration from Netlify

### What Changes

- ✅ Build process (same: `pnpm build`)
- ✅ Output directory (same: `dist`)
- ✅ Environment variables (same names)
- ✅ Routing (handled by vercel.json)

### What Stays the Same

- ✅ Source code (no changes needed)
- ✅ Build commands
- ✅ Environment variable names
- ✅ Git workflow

### Cleanup (Optional)

After successful Vercel deployment:

```bash
# Remove Netlify configuration
rm netlify.toml
rm -rf netlify/

# Remove Netlify workflows
rm .github/workflows/autonomous-netlify-deploy.yml
rm .github/workflows/netlify-*.yml

# Commit cleanup
git add .
git commit -m "chore: remove netlify configuration"
git push
```

---

## Next Steps

### Immediate Actions

1. ✅ Create Vercel account
2. ✅ Link project with `vercel link`
3. ✅ Get Vercel token and IDs
4. ✅ Add GitHub Secrets
5. ✅ Push to main or run workflow manually

### After First Deployment

1. ✅ Verify site loads correctly
2. ✅ Test all features (auth, payments, etc.)
3. ✅ Update DNS if using custom domain
4. ✅ Configure custom domain in Vercel
5. ✅ Update VITE_SITE_URL secret with final URL

### Optional Enhancements

1. **Custom Domain:**
   - Add domain in Vercel dashboard
   - Update DNS records
   - Update VITE_SITE_URL

2. **Preview Deployments:**
   - Automatic for all branches
   - Test before merging to main

3. **Analytics:**
   - Enable Vercel Analytics
   - Already configured: Google Analytics

4. **Performance:**
   - Enable Vercel Speed Insights
   - Monitor Core Web Vitals

---

## Support

### Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **This Project:** See README.md

### Getting Help

1. Check deployment logs in GitHub Actions
2. Check Vercel dashboard for build logs
3. Review this guide's troubleshooting section
4. Check Vercel community forums

---

## Summary

✅ **Configuration Complete**

- vercel.json created
- Deployment workflow created
- Emergency fix workflow created
- Documentation complete

🚀 **Ready to Deploy**

- Add GitHub Secrets
- Push to main or run workflow
- Monitor deployment in GitHub Actions

📊 **Expected Results**

- Build time: ~1-2 minutes
- Deployment: Automatic
- Environment variables: Auto-configured
- Site: Live and accessible

---

_Last Updated: 2025-11-08_  
_Platform: Vercel_  
_Framework: Vite + React 19_
