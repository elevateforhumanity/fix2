# Vercel Deployment Setup

## Target Deployment

**Desired URL**: `fix2-1c7w-git-main-gitpod.vercel.app`

## Current Configuration

The project is currently configured with:
- **Project Name**: fix2-i3z8
- **Organization**: team_Xj2yJdLklcMExBxDPK7I2G4w
- **Project ID**: prj_I89m6xUtwJlmA3qSE8Su7jIF7Xg7

## Option 1: Link to Existing Vercel Project (Recommended)

If `fix2-1c7w` is an existing Vercel project, link this repository to it:

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Link to Existing Project

```bash
vercel link
```

When prompted:
1. Select your team/organization
2. Choose "Link to existing project"
3. Select the project that corresponds to `fix2-1c7w`

This will create a `.vercel` directory with the project configuration.

### Step 4: Deploy

```bash
vercel --prod
```

## Option 2: Create New Vercel Project

If you want to create a new project with a specific name:

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy with Project Name

```bash
vercel --prod --name fix2-1c7w
```

Note: Vercel may append random characters to ensure uniqueness.

## Option 3: Use Vercel Dashboard (Easiest)

### Step 1: Go to Vercel Dashboard

Visit: https://vercel.com/dashboard

### Step 2: Find the Project

Look for the project with URL `fix2-1c7w-git-main-gitpod.vercel.app`

### Step 3: Check Git Integration

1. Go to Project Settings
2. Check "Git" section
3. Verify it's connected to: `github.com/elevateforhumanity/fix2`
4. Verify branch is set to: `main`

### Step 4: Trigger Deployment

Option A: Push to GitHub (automatic deployment)
```bash
git add .
git commit -m "🎨 Add complete PWA implementation"
git push origin main
```

Option B: Manual deployment from dashboard
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment
3. Or click "Deploy" to create new deployment

## Option 4: Update Autopilot Config

If you want to update the autopilot configuration to use the new project:

### Step 1: Get Project Details from Vercel

1. Go to https://vercel.com/dashboard
2. Find project `fix2-1c7w`
3. Go to Settings → General
4. Note the Project ID

### Step 2: Update Config File

Edit `.vercel-autopilot-config.json`:

```json
{
  "vercel_org_id": "team_Xj2yJdLklcMExBxDPK7I2G4w",
  "vercel_project_id": "YOUR_NEW_PROJECT_ID",
  "vercel_project_name": "fix2-1c7w",
  "configured_at": "2025-11-15T10:30:00.000Z"
}
```

## Verifying the Deployment

After deployment, verify:

### 1. Check Deployment URL

Visit: https://fix2-1c7w-git-main-gitpod.vercel.app

Should show the site (not 401 or 404)

### 2. Check PWA Features

Visit: https://fix2-1c7w-git-main-gitpod.vercel.app/pwa-test

Test:
- Service worker registration
- Manifest loading
- Icon display
- Installation prompt

### 3. Check Manifest

Visit: https://fix2-1c7w-git-main-gitpod.vercel.app/manifest.json

Should return valid JSON with:
- 10 icon sizes
- 4 shortcuts
- Share target configuration

### 4. Check Service Worker

Visit: https://fix2-1c7w-git-main-gitpod.vercel.app/sw.js

Should return the service worker JavaScript

## Environment Variables

After linking to the correct project, add these environment variables in Vercel dashboard:

### Required for PWA

```bash
# Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:admin@elevateforhumanity.org
```

### Generate VAPID Keys

```bash
npm run generate:vapid
```

Copy the output and add to Vercel:
1. Go to Project Settings
2. Environment Variables
3. Add each variable
4. Redeploy

## Troubleshooting

### 401 Error

**Problem**: URL returns 401 Unauthorized

**Possible Causes**:
1. Project has password protection enabled
2. Project is in a team with restricted access
3. Deployment is in preview mode (not production)

**Solutions**:
1. Check Project Settings → Security
2. Disable password protection if enabled
3. Ensure you're accessing the production URL
4. Check team permissions

### 404 Error

**Problem**: URL returns 404 Not Found

**Possible Causes**:
1. Project doesn't exist
2. Deployment failed
3. Wrong URL

**Solutions**:
1. Verify project exists in Vercel dashboard
2. Check deployment logs for errors
3. Verify the correct URL from dashboard

### Project Not Found

**Problem**: Can't find project in dashboard

**Solutions**:
1. Check you're logged into correct Vercel account
2. Check correct team/organization is selected
3. Search for project by name: `fix2-1c7w`

## Quick Deploy (Recommended)

If the project is already connected to GitHub:

```bash
# 1. Commit all PWA changes
git add .
git commit -m "🎨 Add complete PWA implementation with mobile optimization

- Add service worker with offline support
- Implement push notifications with VAPID
- Create mobile-optimized UI components
- Add all icon sizes with maskable variants
- Configure app shortcuts and share target
- Add offline functionality with IndexedDB
- Implement background sync
- Create mobile navigation and video player
- Add PWA test page and verification script

PWA Verification: 31/31 checks passed ✅

Co-authored-by: Ona <no-reply@ona.com>"

# 2. Push to GitHub
git push origin main

# 3. Vercel will automatically deploy
# Check deployment status at: https://vercel.com/dashboard
```

## Deployment Checklist

- [ ] Identify correct Vercel project
- [ ] Verify GitHub integration
- [ ] Commit PWA changes
- [ ] Push to GitHub
- [ ] Wait for deployment to complete
- [ ] Add VAPID keys to environment variables
- [ ] Test deployment URL
- [ ] Verify PWA features work
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit

## Support

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Repo**: https://github.com/elevateforhumanity/fix2

---

**Target URL**: fix2-1c7w-git-main-gitpod.vercel.app  
**Status**: Ready to deploy  
**PWA Score**: 31/31 ✅
