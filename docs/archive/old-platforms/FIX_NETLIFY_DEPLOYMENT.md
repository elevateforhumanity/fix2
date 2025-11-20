# Fix Netlify Deployment - Step by Step

## Your Goal

✅ **Netlify** hosts your React app at `elevateforhumanityfix2.netlify.app`  
✅ **Durable.co** landing page embeds/links to the Netlify app  
✅ You control the design via this GitHub repo

## Current Problem

❌ **Netlify site returns 404** - Nothing is deployed  
❌ **Your builds are not reaching Netlify**

## Why This is Happening

One of these issues:

1. **Netlify is not connected to GitHub** - No automatic deploys
2. **Builds are failing** - Errors prevent deployment
3. **Wrong publish directory** - Netlify can't find the files
4. **Site was deleted/recreated** - Old site ID doesn't exist

## Step-by-Step Fix

### Step 1: Log into Netlify

1. Go to: **https://app.netlify.com**
2. Log in with your account
3. Look for site: **elevateforhumanityfix2**

### Step 2: Check if Site Exists

**If you see the site:**

- Click on it
- Go to **Step 3**

**If you DON'T see the site:**

- The site was deleted or you're in the wrong account
- Go to **Step 7** (Create New Site)

### Step 3: Check Deploys Tab

Click on **Deploys** tab.

**What do you see?**

#### Option A: "No deploys yet"

**Problem:** Site is not connected to GitHub  
**Solution:** Go to **Step 4**

#### Option B: Failed deploys (red X)

**Problem:** Builds are failing  
**Solution:** Go to **Step 5**

#### Option C: Successful deploys (green checkmark)

**Problem:** Something else is wrong  
**Solution:** Go to **Step 6**

### Step 4: Connect to GitHub

If site is not connected:

1. Click **Site settings**
2. Click **Build & deploy**
3. Under **Continuous Deployment**, click **Link repository**
4. Choose **GitHub**
5. Authorize Netlify if needed
6. Select repository: **elevateforhumanity/fix2**
7. Configure:
   ```
   Branch to deploy: main
   Build command: npm run build
   Publish directory: dist
   ```
8. Click **Deploy site**
9. Wait 5-10 minutes for first build
10. Go to **Step 8** (Verify)

### Step 5: Fix Failed Builds

If builds are failing:

1. Click on the latest failed deploy
2. Click **Deploy log**
3. Scroll to find the error

**Common Errors:**

#### Error: "Command not found: pnpm"

**Fix:** Update build command:

1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Click **Edit settings**
3. Change build command to:
   ```
   npm install -g pnpm && pnpm install && pnpm build
   ```
4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Deploy site**

#### Error: "Module not found" or dependency errors

**Fix:** Clear cache:

1. Go to **Site settings** → **Build & deploy**
2. Scroll to **Build image selection**
3. Click **Clear cache and deploy site**

#### Error: "Out of memory"

**Fix:** Add environment variable:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add:
   ```
   Key: NODE_OPTIONS
   Value: --max-old-space-size=4096
   ```
4. Click **Save**
5. Trigger new deploy

#### Error: TypeScript or build errors

**Fix:** The code has errors. Check the error message and fix in your code, then push to GitHub.

### Step 6: Site Deploys Successfully but Returns 404

If deploys show green checkmark but site returns 404:

**Check publish directory:**

1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Verify **Publish directory** is: `dist`
3. If it's wrong, click **Edit settings** and change it
4. Trigger new deploy

**Check if dist/ folder exists in build:**

1. Click on latest successful deploy
2. Click **Deploy log**
3. Search for "dist" in the logs
4. Should see: "Deploying dist directory"

**If dist/ is not being created:**

The build command might be wrong. Update it to:

```
pnpm install && pnpm build
```

### Step 7: Create New Netlify Site

If the old site doesn't exist or is broken:

1. Go to: https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub**
4. Authorize if needed
5. Select repository: **elevateforhumanity/fix2**
6. Configure:
   ```
   Branch: main
   Build command: npm run build
   Publish directory: dist
   Base directory: (leave empty)
   ```
7. Click **Deploy site**
8. Wait 5-10 minutes
9. You'll get a random URL like: `random-name-123.netlify.app`
10. Go to **Step 8**

**To rename the site:**

1. Go to **Site settings** → **General** → **Site details**
2. Click **Change site name**
3. Enter: `elevateforhumanityfix2` (or any available name)
4. Click **Save**

### Step 8: Verify Deployment

Once build succeeds, test the site:

```bash
# Test if site loads
curl -I https://elevateforhumanityfix2.netlify.app/

# Should return: HTTP/2 200 (not 404)

# Test if images work
curl -I https://elevateforhumanityfix2.netlify.app/images/hero-banner.jpg

# Should return: HTTP/2 200

# Test routing
curl -I https://elevateforhumanityfix2.netlify.app/programs/barber

# Should return: HTTP/2 200
```

Or just visit in browser:

- https://elevateforhumanityfix2.netlify.app

You should see your React app, not a 404 page.

### Step 9: Embed in Durable.co

Once Netlify is working:

**Option A: Full iframe embed**

In Durable.co editor, add:

```html
<iframe
  src="https://elevateforhumanityfix2.netlify.app"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none; min-height: 100vh;"
>
</iframe>
```

**Option B: Link to Netlify app**

In Durable.co, add a button/link:

```html
<a href="https://elevateforhumanityfix2.netlify.app" class="btn btn-primary">
  Launch LMS
</a>
```

**Option C: Redirect specific pages**

In Durable.co, redirect certain pages to Netlify:

- `/lms` → `https://elevateforhumanityfix2.netlify.app/lms`
- `/programs` → `https://elevateforhumanityfix2.netlify.app/programs`

## Quick Diagnostic

Run this to check current status:

```bash
# Check Netlify site
curl -I https://elevateforhumanityfix2.netlify.app/

# Check Durable.co site
curl -I https://www.elevateforhumanity.org/
```

**Expected results:**

- Netlify: `HTTP/2 200` ✅
- Durable.co: `HTTP/2 200` ✅

**Current results:**

- Netlify: `HTTP/2 404` ❌ (This is the problem)
- Durable.co: `HTTP/2 200` ✅

## What You Need to Share

To help you fix this, I need to know:

1. **Do you see the site in Netlify dashboard?**
   - Yes → What does the Deploys tab show?
   - No → We need to create a new site

2. **If you see deploys, what's their status?**
   - Green (success) → Check publish directory
   - Red (failed) → Share the error message
   - None → Site not connected to GitHub

3. **What's your Netlify account email?**
   - To verify you're logged into the right account

## Alternative: Use Vercel Instead

If Netlify is too problematic, we can deploy to Vercel instead:

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import: `elevateforhumanity/fix2`
5. Configure:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
6. Click **Deploy**
7. You'll get: `your-project.vercel.app`

Then embed that URL in Durable.co instead.

## Summary

**Your Setup Should Be:**

```
┌─────────────────────────────────────┐
│ Durable.co (elevateforhumanity.org) │
│ - Landing page                      │
│ - Marketing content                 │
│ - Links/embeds to Netlify           │
└─────────────────────────────────────┘
              │
              │ (iframe or link)
              ▼
┌─────────────────────────────────────┐
│ Netlify (elevateforhumanityfix2)    │
│ - React app (your build)            │
│ - LMS functionality                 │
│ - Full design control               │
└─────────────────────────────────────┘
```

**Current Problem:**

- ❌ Netlify site returns 404
- ❌ Nothing is deployed to Netlify
- ✅ Durable.co works fine

**Fix:**

- Connect Netlify to GitHub
- Ensure builds succeed
- Verify site deploys
- Then embed in Durable.co

## Next Steps

1. Log into Netlify dashboard
2. Find your site (or create new one)
3. Connect to GitHub repo
4. Trigger deploy
5. Verify it works
6. Share the working URL with me
7. I'll help you embed it in Durable.co
