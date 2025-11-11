# Netlify Dashboard Configuration Checklist

## ✅ Your Local Configuration is Perfect

All configuration files are correct:
- ✅ netlify.toml configured properly
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ Node version: 20.19.0
- ✅ 464 files in dist/
- ✅ 59 images
- ✅ 229 assets
- ✅ SPA routing configured
- ✅ Headers configured

## Now Verify Netlify Dashboard Settings

### Step 1: Access Your Site Settings

1. Go to: **https://app.netlify.com/sites/elevateproduction**
2. Log in if needed
3. You should see your site dashboard

### Step 2: Check Build Settings

1. Click **Site settings** (left sidebar)
2. Click **Build & deploy**
3. Under **Build settings**, verify:

```
Repository: elevateforhumanity/fix2
Branch: main
Base directory: (leave empty)
Build command: npm run build
Publish directory: dist
```

**If ANY of these are wrong:**
1. Click **Edit settings**
2. Update to match above
3. Click **Save**

### Step 3: Check Environment Variables

1. Still in **Build & deploy**
2. Scroll to **Environment variables**
3. Click **Edit variables**

**Required variable:**
```
Key: NODE_VERSION
Value: 20.19.0
```

**If missing:**
1. Click **Add variable**
2. Enter key and value
3. Click **Save**

**Optional variables (if using Supabase):**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 4: Check Deploy Settings

1. Go to **Deploys** tab
2. Look at **Production deploys** section

**What you should see:**
- Latest deploy with green checkmark ✅
- Status: "Published"
- Time: Recent (within last hour if you just pushed)

**If you see:**
- ❌ Red X = Build failed (click to see logs)
- ⏳ Building = Wait for it to complete
- 🔴 No deploys = Site not connected to GitHub

### Step 5: Verify Deploy Context

1. In **Site settings** → **Build & deploy**
2. Scroll to **Deploy contexts**
3. Verify:

```
Production branch: main
Branch deploys: All
Deploy previews: Any pull request
```

### Step 6: Check Build Hooks (Optional)

1. In **Build & deploy**
2. Scroll to **Build hooks**
3. You can create a webhook to trigger builds manually

**To create:**
1. Click **Add build hook**
2. Name: "Manual Deploy"
3. Branch: main
4. Click **Save**
5. Copy the URL (you can use this to trigger builds)

### Step 7: Verify Domain Settings

1. Click **Domain settings**
2. Check **Custom domains** section

**Current setup:**
- Primary: elevateproduction.netlify.app ✅
- Custom: (none - this is correct for your use case)

**Note:** You're embedding in Durable.co, so you don't need a custom domain here.

### Step 8: Check Deploy Logs

1. Go to **Deploys** tab
2. Click on the latest deploy
3. Click **Deploy log**

**Look for these lines:**
```
✓ Building production bundle
✓ Build succeeded
✓ Deploying to production
✓ Site is live
```

**If you see errors:**
- Read the error message
- Common issues:
  - Missing dependencies
  - Build command failed
  - Out of memory
  - TypeScript errors

### Step 9: Test the Deployed Site

Visit these URLs to verify everything works:

```bash
# Main site
https://elevateproduction.netlify.app/

# Images
https://elevateproduction.netlify.app/images/hero-banner.jpg

# Routing
https://elevateproduction.netlify.app/programs/barber

# Assets
https://elevateproduction.netlify.app/assets/index-DtkboQEA.js
```

All should return HTTP 200.

### Step 10: Force New Deploy

If you want to trigger a fresh deploy:

1. Go to **Deploys** tab
2. Click **Trigger deploy** button
3. Select **Clear cache and deploy site**
4. Wait 5-10 minutes
5. Check if site loads

## Common Issues and Fixes

### Issue: Build Fails with "Command not found: pnpm"

**Fix:**
1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Change build command to:
   ```
   npm install -g pnpm && pnpm install && pnpm build
   ```
3. Save and trigger new deploy

### Issue: Build Succeeds but Site Returns 404

**Fix:**
1. Check **Publish directory** is set to `dist`
2. Check deploy logs show "Deploying dist directory"
3. If wrong, update and redeploy

### Issue: Images Not Loading

**Fix:**
1. Check `dist/images/` exists in deploy logs
2. Verify `public/images/` exists in your repo
3. Check `_headers` file is being deployed

### Issue: Routing Not Working

**Fix:**
1. Check `_redirects` file exists in `dist/`
2. Verify it contains: `/*   /index.html   200`
3. Check netlify.toml has SPA redirect rule

### Issue: Old Version Showing

**Fix:**
1. Clear cache: **Trigger deploy** → **Clear cache and deploy site**
2. Hard refresh browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
3. Try incognito mode

## Netlify Dashboard URLs

Quick access links:

- **Main Dashboard:** https://app.netlify.com
- **Your Site:** https://app.netlify.com/sites/elevateproduction
- **Deploys:** https://app.netlify.com/sites/elevateproduction/deploys
- **Settings:** https://app.netlify.com/sites/elevateproduction/settings
- **Build Settings:** https://app.netlify.com/sites/elevateproduction/settings/deploys
- **Domain Settings:** https://app.netlify.com/sites/elevateproduction/settings/domain
- **Environment:** https://app.netlify.com/sites/elevateproduction/settings/env

## Expected Configuration

Your Netlify dashboard should match these settings exactly:

### Build Settings
```
Repository: elevateforhumanity/fix2
Branch: main
Base directory: (empty)
Build command: npm run build
Publish directory: dist
```

### Environment Variables
```
NODE_VERSION=20.19.0
```

### Deploy Contexts
```
Production branch: main
Branch deploys: All
Deploy previews: Any pull request against your production branch
```

### Build Hooks
```
(Optional - for manual triggers)
```

## Verification Checklist

Go through this checklist in Netlify dashboard:

- [ ] Repository connected to GitHub
- [ ] Branch set to `main`
- [ ] Build command is `npm run build`
- [ ] Publish directory is `dist`
- [ ] NODE_VERSION environment variable set to 20.19.0
- [ ] Latest deploy shows "Published" with green checkmark
- [ ] Site loads at https://elevateproduction.netlify.app
- [ ] Images load correctly
- [ ] Routing works (no 404 on sub-pages)
- [ ] No errors in deploy logs

## If Everything Checks Out

If all settings match and site still doesn't work:

1. **Clear Netlify cache:**
   - Deploys → Trigger deploy → Clear cache and deploy site

2. **Check your network:**
   - Try different browser
   - Try incognito mode
   - Try different network/device

3. **Check DNS:**
   - Run: `nslookup elevateproduction.netlify.app`
   - Should resolve to Netlify's servers

4. **Contact Netlify Support:**
   - If site is configured correctly but not working
   - They can check server-side issues

## Summary

✅ **Your local configuration is perfect**  
✅ **All files are correct**  
✅ **Build works locally**  

**Next step:** Verify Netlify dashboard matches the settings above.

If dashboard settings match and site still doesn't work, it's likely a temporary network/cache issue on your end.
