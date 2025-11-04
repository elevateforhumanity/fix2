# Netlify Configuration & Deployment Guide

## Quick Start: Resubmit Failed Deploys

### Method 1: Netlify Dashboard (Easiest)

1. **Go to Netlify Dashboard**

   ```
   https://app.netlify.com/sites/elevateforhumanityfix2/deploys
   ```

2. **Find Failed Deploys**
   - Look for red "Failed" badges
   - Click on each failed deploy

3. **Retry Deploy**
   - Click "Options" dropdown (top right)
   - Select "Retry deploy"
   - Or click "Trigger deploy" → "Deploy site"

4. **Monitor Build Logs**
   - Watch real-time logs
   - Check for errors
   - Verify completion

### Method 2: Git Push (Automatic)

```bash
# Already done - your latest push should trigger deployment
git log --oneline -3
# 273925c3 - feat: add professional Coming Soon pages
# 66cb50c8 - fix: resolve 3 critical production issues
# 8fe2a70b - fix: resolve deployment failures

# If needed, trigger with empty commit
git commit --allow-empty -m "chore: trigger Netlify deployment"
git push origin main
```

### Method 3: Netlify CLI (Advanced)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site
netlify link

# Trigger manual deploy
netlify deploy --prod

# Or build and deploy
netlify build && netlify deploy --prod
```

---

## Complete Netlify Configuration

### Step 1: Site Settings

**Navigate to:** Site Settings → Build & Deploy → Build Settings

**Build Command:**

```bash
pnpm install && pnpm run build
```

**Publish Directory:**

```
dist
```

**Functions Directory:**

```
netlify/functions
```

**Base Directory:**

```
(leave empty)
```

### Step 2: Environment Variables

**Navigate to:** Site Settings → Environment Variables

**Required Variables:**

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA

# Build Configuration
NODE_VERSION=20.11.1
PNPM_VERSION=9.7.0
NODE_OPTIONS=--max_old_space_size=4096
CI=true
GENERATE_SOURCEMAP=false
```

**Optional Variables (Add Later):**

```bash
# Stripe (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Google Forms (for applications)
VITE_APPLICATION_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
```

### Step 3: Build Settings

**Navigate to:** Site Settings → Build & Deploy → Build Settings

**Build Image:**

```
Ubuntu Focal 20.04 (default)
```

**Node Version:**

```
20.11.1 (set via NODE_VERSION env var)
```

**Package Manager:**

```
pnpm (detected automatically)
```

### Step 4: Deploy Contexts

**Navigate to:** Site Settings → Build & Deploy → Deploy Contexts

**Production Branch:**

```
main
```

**Branch Deploys:**

```
All branches (or specific branches only)
```

**Deploy Previews:**

```
✅ Any pull request against your production branch
```

### Step 5: Domain Settings

**Navigate to:** Site Settings → Domain Management

**Primary Domain:**

```
www.elevateforhumanity.org
```

**Domain Aliases:**

```
elevateforhumanity.org (redirects to www)
elevateforhumanityfix2.netlify.app (Netlify subdomain)
```

**SSL/TLS Certificate:**

```
✅ Automatic HTTPS with Let's Encrypt
```

---

## Troubleshooting Failed Deploys

### Common Issues & Solutions

#### Issue 1: Build Command Failed

**Error:**

```
Build script returned non-zero exit code: 1
```

**Solutions:**

1. Check `package.json` scripts are correct
2. Verify all dependencies are in `package.json`
3. Check for TypeScript errors
4. Review build logs for specific errors

**Fix:**

```bash
# Test build locally first
pnpm install
pnpm build

# If successful, commit and push
git add -A
git commit -m "fix: resolve build errors"
git push origin main
```

#### Issue 2: Environment Variables Missing

**Error:**

```
VITE_SUPABASE_URL is not defined
```

**Solution:**

1. Go to Site Settings → Environment Variables
2. Add missing variables
3. Trigger new deploy

#### Issue 3: Out of Build Minutes

**Error:**

```
Build minutes exceeded for this month
```

**Solution:**

1. Check usage: Site Settings → Usage & Billing
2. Wait until next month (free tier resets)
3. Or upgrade to Personal plan ($9/month)

#### Issue 4: Plugin Errors

**Error:**

```
Plugin "@netlify/plugin-lighthouse" internal error
```

**Solution:**
Already fixed in latest commit - plugin disabled in `netlify.toml`

#### Issue 5: Function Build Errors

**Error:**

```
Error bundling function: programs
```

**Solution:**

1. Check `netlify/functions/` files for syntax errors
2. Verify `@netlify/functions` is in `devDependencies`
3. Check function imports are correct

---

## Deployment Checklist

### Pre-Deployment

- [x] All code committed to Git
- [x] Build passes locally (`pnpm build`)
- [x] All tests pass (`pnpm test`)
- [x] Environment variables documented
- [x] `netlify.toml` configured correctly

### Netlify Configuration

- [ ] Site connected to GitHub repository
- [ ] Build command set: `pnpm install && pnpm run build`
- [ ] Publish directory set: `dist`
- [ ] Environment variables added
- [ ] Domain configured (if applicable)
- [ ] SSL certificate active

### Post-Deployment

- [ ] Build completes successfully
- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Functions working (test API endpoints)
- [ ] Forms submitting correctly
- [ ] Images loading
- [ ] SSL certificate valid

---

## Netlify Configuration Files

### netlify.toml (Already Configured)

```toml
[build]
  command = "pnpm install && pnpm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20.11.1"
  PNPM_VERSION = "9.7.0"
  NODE_OPTIONS = "--max_old_space_size=4096"
  CI = "true"
  GENERATE_SOURCEMAP = "false"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
  [functions."*"]
    timeout = 30

# Redirects for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### \_redirects (Already Configured)

```
# SPA history fallback
/*    /index.html   200

# Legal page aliases
/terms    /legal/terms    301
/privacy  /legal/privacy  301
```

---

## Manual Deployment Steps

### Option 1: Via Netlify Dashboard

1. **Login to Netlify**

   ```
   https://app.netlify.com
   ```

2. **Select Your Site**

   ```
   elevateforhumanityfix2
   ```

3. **Go to Deploys Tab**

   ```
   Click "Deploys" in top navigation
   ```

4. **Trigger Deploy**

   ```
   Click "Trigger deploy" button
   Select "Deploy site"
   ```

5. **Monitor Progress**
   ```
   Watch build logs in real-time
   Wait for "Published" status
   ```

### Option 2: Via Git Push

```bash
# Make sure you're on main branch
git branch

# Check status
git status

# If clean, trigger with empty commit
git commit --allow-empty -m "chore: trigger Netlify rebuild"
git push origin main

# Monitor at: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
```

### Option 3: Via Netlify CLI

```bash
# Install CLI globally
npm install -g netlify-cli

# Login (opens browser)
netlify login

# Link to your site
netlify link
# Select: elevateforhumanityfix2

# Deploy to production
netlify deploy --prod

# Or build and deploy
netlify build
netlify deploy --prod --dir=dist
```

---

## Monitoring Deployments

### Real-Time Logs

**Dashboard:**

```
https://app.netlify.com/sites/elevateforhumanityfix2/deploys
```

**What to Watch:**

1. **Build Start** - Cloning repository
2. **Install Dependencies** - pnpm install
3. **Build Process** - pnpm build
4. **Post-Processing** - Optimizations
5. **Deploy** - Uploading to CDN
6. **Published** - Site live

### Build Log Sections

```
1. Build Environment
   - Node version
   - pnpm version
   - Environment variables

2. Dependency Installation
   - pnpm install output
   - Package count

3. Build Execution
   - Route generation
   - Autopilot checks
   - Vite build
   - Sitemap generation

4. Post-Build
   - Security checks
   - File optimization
   - Function bundling

5. Deploy
   - File upload
   - CDN distribution
   - Cache invalidation
```

---

## Verification Steps

### After Successful Deploy

1. **Check Site Loads**

   ```
   https://www.elevateforhumanity.org
   ```

2. **Test Key Pages**

   ```
   / (home)
   /programs
   /lms/courses
   /donate
   /legal/privacy
   ```

3. **Test Coming Soon Pages**

   ```
   /community
   /sisters/volunteer-opportunities
   /professional-home
   ```

4. **Test API Endpoints**

   ```
   /api/public/programs.json
   /api/public/courses.json
   ```

5. **Check Sitemaps**

   ```
   /sitemap.xml
   /sitemap-static.xml
   /sitemap-programs.xml
   /sitemap-courses.xml
   ```

6. **Verify SSL**
   ```
   Check for green padlock in browser
   Certificate should be valid
   ```

---

## Common Deployment Errors

### Error 1: "Build exceeded maximum allowed runtime"

**Cause:** Build taking longer than 15 minutes (free tier limit)

**Solution:**

- Optimize build process
- Remove unnecessary dependencies
- Disable heavy plugins
- Upgrade to paid plan if needed

### Error 2: "Failed to install dependencies"

**Cause:** pnpm lock file issues or missing packages

**Solution:**

```bash
# Regenerate lock file
rm pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: regenerate pnpm lock file"
git push
```

### Error 3: "Function bundling failed"

**Cause:** TypeScript or import errors in functions

**Solution:**

- Check `netlify/functions/*.ts` for errors
- Verify all imports are correct
- Test functions locally

### Error 4: "Deploy failed: site not found"

**Cause:** Site not properly linked to repository

**Solution:**

1. Go to Site Settings → Build & Deploy
2. Click "Link repository"
3. Select GitHub and your repository
4. Configure build settings

---

## Support Resources

### Netlify Documentation

- **Main Docs:** https://docs.netlify.com
- **Build Settings:** https://docs.netlify.com/configure-builds/overview/
- **Functions:** https://docs.netlify.com/functions/overview/
- **Troubleshooting:** https://docs.netlify.com/configure-builds/troubleshooting-tips/

### Get Help

- **Community Forum:** https://answers.netlify.com
- **Support Email:** support@netlify.com
- **Status Page:** https://www.netlifystatus.com

---

## Quick Reference

### Essential Commands

```bash
# Local build test
pnpm build

# Trigger deploy via Git
git push origin main

# Netlify CLI deploy
netlify deploy --prod

# Check build logs
# Visit: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
```

### Essential URLs

```
Dashboard: https://app.netlify.com/sites/elevateforhumanityfix2
Deploys: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
Settings: https://app.netlify.com/sites/elevateforhumanityfix2/settings
Live Site: https://www.elevateforhumanity.org
```

---

## Next Steps

1. **Check Netlify Dashboard**
   - Review failed deploys
   - Check error messages
   - Verify configuration

2. **Retry Failed Deploys**
   - Click "Retry deploy" on each failed build
   - Or trigger new deploy with Git push

3. **Monitor Build Logs**
   - Watch for errors
   - Verify successful completion
   - Test live site

4. **Verify Everything Works**
   - Test all pages
   - Check functions
   - Verify sitemaps
   - Test forms

---

**Last Updated:** 2025-10-29  
**Status:** Ready for deployment  
**Build Status:** All checks passing locally
