# Netlify Deployment Fix Guide

## Problem: Site Returns 404

**URL:** https://elevateforhumanityfix2.netlify.app  
**Status:** HTTP 404  
**Cause:** Site not connected to GitHub OR build failing

## Solution Options

### Option 1: Connect GitHub Repository to Netlify (RECOMMENDED)

#### Step 1: Login to Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign in with your account

#### Step 2: Import from GitHub
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify to access your GitHub account
4. Select repository: `elevateforhumanity/fix2`

#### Step 3: Configure Build Settings
```
Build command: pnpm install --frozen-lockfile && pnpm build
Publish directory: dist
Branch to deploy: main
```

#### Step 4: Add Environment Variables (Optional)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

#### Step 5: Deploy
1. Click "Deploy site"
2. Wait 2-5 minutes for build
3. Site will be live at: `https://[random-name].netlify.app`

#### Step 6: Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Add custom domain: `elevateforhumanityfix2.netlify.app`
3. Or use your own domain

---

### Option 2: Manual Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login
```bash
netlify login
```

#### Step 3: Initialize Site
```bash
cd /workspaces/fix2
netlify init
```

**Select:**
- Create & configure a new site
- Team: Your team
- Site name: elevateforhumanityfix2

#### Step 4: Deploy
```bash
npm run build
netlify deploy --prod
```

---

### Option 3: Deploy via Netlify Drop

#### Step 1: Build Locally
```bash
cd /workspaces/fix2
npm run build
```

#### Step 2: Create Zip
```bash
cd dist
zip -r ../site.zip .
cd ..
```

#### Step 3: Upload to Netlify
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop `site.zip`
3. Site will be deployed instantly

---

## Verification Steps

### After Deployment

#### 1. Check Site is Live
```bash
curl -I https://your-site.netlify.app
```

**Expected:**
```
HTTP/2 200
```

#### 2. Test Routes
- Homepage: `/`
- Programs: `/programs`
- Apply: `/apply`
- Dashboard: `/dashboard`

#### 3. Verify Images
- Logo: `/logo.svg`
- Hero: `/images/hero-training.jpg`
- OG: `/images/og-cover.jpg`
- Partners: `/images/partners/workone.webp`

#### 4. Check Build Logs
1. Go to Netlify dashboard
2. Click on your site
3. Go to "Deploys" tab
4. Click latest deploy
5. Review logs

---

## Common Issues & Fixes

### Issue 1: Build Fails with "pnpm not found"

**Fix:** Update netlify.toml
```toml
[build.environment]
  PNPM_VERSION = "9.7.0"
```

### Issue 2: Build Fails with "lockfile out of sync"

**Fix:** Regenerate lockfile
```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "Update lockfile"
git push
```

### Issue 3: 404 on All Routes

**Fix:** Verify SPA redirect in netlify.toml
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue 4: Images Not Loading

**Fix:** Check dist/ folder
```bash
ls -lh dist/images/
ls -lh dist/logo.svg
```

### Issue 5: Site Not Connected to GitHub

**Fix:** Re-import repository
1. Delete existing site in Netlify
2. Import from GitHub again
3. Configure build settings
4. Deploy

---

## Quick Deploy Script

Save this as `scripts/deploy_netlify.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Deploying to Netlify..."

# Build
echo "📦 Building..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login (if needed)
echo "🔐 Checking authentication..."
netlify status || netlify login

# Deploy
echo "🚀 Deploying to production..."
netlify deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo "🔗 Check your site at: https://app.netlify.com"
```

**Usage:**
```bash
chmod +x scripts/deploy_netlify.sh
bash scripts/deploy_netlify.sh
```

---

## Alternative: Deploy to Vercel

If Netlify continues to have issues, try Vercel:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd /workspaces/fix2
vercel --prod
```

### Step 3: Configure
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install`

---

## Alternative: Deploy to Cloudflare Pages

### Step 1: Login to Cloudflare
1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to Pages

### Step 2: Connect GitHub
1. Click "Create a project"
2. Connect to GitHub
3. Select `elevateforhumanity/fix2`

### Step 3: Configure
```
Build command: pnpm build
Build output directory: dist
Root directory: /
```

### Step 4: Deploy
- Click "Save and Deploy"
- Wait for build
- Site will be live

---

## Debugging Checklist

### Before Deploying
- [ ] Local build succeeds: `npm run build`
- [ ] dist/ folder exists
- [ ] dist/index.html exists
- [ ] Images in dist/images/
- [ ] No TypeScript errors
- [ ] pnpm-lock.yaml up to date

### After Deploying
- [ ] Build logs show success
- [ ] Site returns 200 (not 404)
- [ ] Homepage loads
- [ ] All routes work
- [ ] Images display
- [ ] No console errors

### If Still Broken
1. Check Netlify build logs
2. Test build locally
3. Verify netlify.toml
4. Check GitHub connection
5. Try manual deploy
6. Contact Netlify support

---

## Support Resources

### Netlify Documentation
- [Deploy from GitHub](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git)
- [Build configuration](https://docs.netlify.com/configure-builds/overview/)
- [Troubleshooting](https://docs.netlify.com/configure-builds/troubleshooting-tips/)

### Our Documentation
- `DEPLOYMENT_SUMMARY.md` - Deployment status
- `DEPLOYMENT_STATUS.md` - Detailed diagnostics
- `SUPPORT_BUNDLE_README.md` - Quick start

### Scripts
- `scripts/fix_deployment.sh` - Verify build
- `scripts/deploy_netlify.sh` - Deploy to Netlify

---

## Contact

If you continue to have issues:
1. Check Netlify dashboard for error messages
2. Review build logs
3. Test locally first
4. Try manual deployment
5. Consider alternative platforms (Vercel, Cloudflare)

---

## Summary

**Problem:** Site returns 404

**Most Likely Cause:** GitHub repo not connected to Netlify

**Best Solution:** Import repository from GitHub in Netlify dashboard

**Alternative:** Manual deploy via Netlify CLI or drag-and-drop

**Verification:** Site should return HTTP 200 and display homepage

**Next Steps:** Follow Option 1 above to connect GitHub to Netlify
