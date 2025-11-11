# Netlify Deployment Diagnosis

## Current Situation

### Your Netlify Site
- **Site ID:** `12f120ab-3f63-419b-bc49-430f043415c1`
- **Site Name:** `elevateforhumanityfix2`
- **URL:** https://elevateforhumanityfix2.netlify.app
- **Status:** ❌ Returns 404 (Not Found)

### Your Production Domain
- **Domain:** elevateforhumanity.org
- **Current Host:** Durable.co (NOT Netlify)
- **Status:** ✅ Live but showing old Durable.co site

## The Problem

**Your code is pushed to GitHub, but Netlify is returning 404.**

This means one of these issues:

### Issue 1: Netlify Build is Failing
The build might be failing silently, so no site is deployed.

### Issue 2: Netlify Site is Not Connected to GitHub
The Netlify site might not be linked to your GitHub repository.

### Issue 3: Wrong Branch is Configured
Netlify might be watching a different branch (not `main`).

### Issue 4: Build Command is Wrong
The build command in Netlify might not match what's in `netlify.toml`.

## Step-by-Step Fix

### Step 1: Access Netlify Dashboard

1. Go to: https://app.netlify.com
2. Log in with your account
3. Find site: **elevateforhumanityfix2**

### Step 2: Check Build Status

In the Netlify dashboard:

1. Click on your site **elevateforhumanityfix2**
2. Go to **Deploys** tab
3. Look at the latest deploy

**What to look for:**

#### ✅ If you see "Published"
- The build succeeded
- But the site still returns 404
- **Solution:** Check if the `dist/` folder is being published

#### ❌ If you see "Failed"
- Click on the failed deploy
- Read the error logs
- **Common errors:**
  - Missing environment variables
  - Build command failed
  - Out of memory
  - TypeScript errors

#### ⏳ If you see "Building"
- Wait for it to complete
- Check back in 5-10 minutes

#### 🔴 If you see "No deploys"
- The site is not connected to GitHub
- **Solution:** Connect the repository

### Step 3: Verify GitHub Connection

In Netlify dashboard:

1. Go to **Site settings**
2. Click **Build & deploy**
3. Check **Continuous Deployment** section

**Should show:**
- Repository: `elevateforhumanity/fix2`
- Branch: `main`
- Build command: `npm run build` or `pnpm build`
- Publish directory: `dist`

**If NOT connected:**

1. Click **Link repository**
2. Choose **GitHub**
3. Select repository: `elevateforhumanity/fix2`
4. Branch: `main`
5. Build command: `pnpm install && pnpm build`
6. Publish directory: `dist`
7. Click **Deploy site**

### Step 4: Check Build Settings

In Netlify dashboard:

1. Go to **Site settings**
2. Click **Build & deploy**
3. Click **Edit settings**

**Verify these settings:**

```
Build command: pnpm install && pnpm build
Publish directory: dist
```

**Environment variables needed:**
```
NODE_VERSION=20.19.0
```

### Step 5: Trigger Manual Deploy

1. Go to **Deploys** tab
2. Click **Trigger deploy**
3. Select **Deploy site**
4. Wait for build to complete

### Step 6: Check Build Logs

If build fails:

1. Click on the failed deploy
2. Scroll through the logs
3. Look for error messages

**Common errors and fixes:**

#### Error: "Command not found: pnpm"
**Fix:** Change build command to:
```
npm install -g pnpm && pnpm install && pnpm build
```

#### Error: "Module not found"
**Fix:** Clear cache and rebuild:
1. Go to **Site settings** → **Build & deploy**
2. Click **Clear cache and deploy site**

#### Error: "Out of memory"
**Fix:** Add environment variable:
```
NODE_OPTIONS=--max-old-space-size=4096
```

#### Error: TypeScript errors
**Fix:** Check the error and fix in code, then push again

### Step 7: Verify Deployment

Once build succeeds:

1. Visit: https://elevateforhumanityfix2.netlify.app
2. Should show your site (not 404)
3. Check that images load
4. Check that routing works

## Quick Test Commands

Run these to verify your Netlify site:

```bash
# Check if site is accessible
curl -I https://elevateforhumanityfix2.netlify.app/

# Should return: HTTP/2 200 (not 404)

# Check if images work
curl -I https://elevateforhumanityfix2.netlify.app/images/hero-banner.jpg

# Should return: HTTP/2 200

# Check if routing works
curl -I https://elevateforhumanityfix2.netlify.app/programs/barber

# Should return: HTTP/2 200
```

## After Netlify is Working

Once your Netlify site is working (returns 200, not 404):

### Option A: Point Domain to Netlify

1. In Netlify dashboard:
   - Go to **Domain settings**
   - Click **Add custom domain**
   - Enter: `elevateforhumanity.org`
   - Follow DNS instructions

2. Update DNS at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's IP)
   
   Type: CNAME
   Name: www
   Value: elevateforhumanityfix2.netlify.app
   ```

3. Wait 24-48 hours for DNS propagation

### Option B: Keep Durable.co

If you want to keep using Durable.co:
- Your Netlify site will remain at `elevateforhumanityfix2.netlify.app`
- You can use it for testing/staging
- Production stays on Durable.co

## Summary

**Current Status:**
- ✅ Code is in GitHub
- ✅ Netlify site exists
- ❌ Netlify site returns 404
- ❌ Domain points to Durable.co (not Netlify)

**Next Steps:**
1. Log into Netlify dashboard
2. Check if site is connected to GitHub
3. Check build logs for errors
4. Trigger manual deploy
5. Verify site works at `elevateforhumanityfix2.netlify.app`
6. (Optional) Point domain to Netlify

**Need Help?**
Share screenshots of:
1. Netlify Deploys page
2. Latest build logs
3. Site settings → Build & deploy

## Netlify Dashboard URLs

- **Main Dashboard:** https://app.netlify.com
- **Your Site:** https://app.netlify.com/sites/elevateforhumanityfix2
- **Deploys:** https://app.netlify.com/sites/elevateforhumanityfix2/deploys
- **Settings:** https://app.netlify.com/sites/elevateforhumanityfix2/settings

## Alternative: Create New Netlify Site

If the current site is broken beyond repair:

1. Go to https://app.netlify.com
2. Click **Add new site**
3. Choose **Import an existing project**
4. Select **GitHub**
5. Choose repository: `elevateforhumanity/fix2`
6. Configure:
   - Branch: `main`
   - Build command: `pnpm install && pnpm build`
   - Publish directory: `dist`
7. Click **Deploy site**

This will create a new site with a random name like `random-name-123.netlify.app`.

You can then:
- Rename it in settings
- Point your domain to it
- Delete the old broken site
