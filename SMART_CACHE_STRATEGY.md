# Smart Cache Strategy - Option D

## Overview

This document explains the smart cache strategy implemented for the Elevate for Humanity platform. Instead of disabling all caching (which hurts performance), we use **selective caching** that keeps static assets fast while ensuring HTML is always fresh.

---

## The Problem We're Solving

**Issue:** Users see old content after deployments because of aggressive caching.

**Bad Solution:** Disable all caching with `dynamic = "force-dynamic"` everywhere.

- ❌ Slower page loads
- ❌ Higher server costs
- ❌ No CDN benefits
- ❌ Poor user experience

**Smart Solution:** Cache static assets aggressively, but keep HTML fresh.

- ✅ Fast static asset delivery
- ✅ Always-fresh HTML content
- ✅ Low server costs
- ✅ Great user experience

---

## Cache Strategy Breakdown

### 1. HTML Pages (Always Fresh)

```javascript
{
  source: '/:path((?!_next|api|.*\\.).*)',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=0, must-revalidate',
    },
  ],
}
```

**What this does:**

- HTML pages are cached for 0 seconds
- Browser must revalidate with server on every request
- Ensures users always get the latest content

**Applies to:**

- `/` (homepage)
- `/programs/*`
- `/about`
- All other HTML pages

### 2. Static Assets (Long Cache)

```javascript
{
  source: '/_next/static/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

**What this does:**

- JavaScript and CSS bundles cached for 1 year
- Marked as `immutable` (never changes)
- Next.js uses content hashes in filenames, so new builds get new URLs

**Applies to:**

- `/_next/static/chunks/*.js`
- `/_next/static/css/*.css`
- All webpack-generated assets

### 3. Images (Moderate Cache)

```javascript
{
  source: '/:path*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=86400, stale-while-revalidate=604800',
    },
  ],
}
```

**What this does:**

- Images cached for 24 hours
- Can serve stale images for up to 7 days while revalidating
- Balances freshness with performance

**Applies to:**

- All image files
- Favicons
- SVG icons

---

## Build Marker System

### What It Is

A visible indicator on every page showing which build is currently deployed.

### Implementation

```tsx
<div className="fixed bottom-2 right-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-mono shadow-lg border border-slate-700 z-50">
  <div className="flex items-center gap-2">
    <span className="text-green-400">●</span>
    <span>BUILD: 2025-11-20-10:25</span>
  </div>
</div>
```

### Why It Works

- **Visual proof** of which code is running
- **Eliminates guesswork** about cache issues
- **Works even with aggressive browser caching**
- **Easy to update** before each deployment

### How to Use

1. Before deploying, update the build marker timestamp
2. Deploy to Vercel
3. Check the live site
4. Look for the marker in the bottom-right corner
5. If you see the new timestamp, deployment is live!

---

## Unique Build IDs

### Configuration

```javascript
generateBuildId: async () => {
  return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`;
},
```

### What This Does

- Every build gets a unique ID
- Forces Vercel to treat each build as completely new
- Prevents build cache reuse
- Ensures fresh deployments

---

## Deployment Verification

### Quick Check

```bash
pnpm verify:deployment
```

This script checks:

- ✅ HTTP status codes
- ✅ Cache-Control headers
- ✅ Build markers in HTML
- ✅ Build timestamps

### Manual Check

1. Open the deployment URL
2. Open browser DevTools (F12)
3. Go to Network tab
4. Refresh the page
5. Check the document request:
   - `Cache-Control: public, max-age=0, must-revalidate` ✅
   - Status: 200 ✅
6. Look for build marker in bottom-right corner

---

## Vercel Project Configuration

### Current Setup

- **Project Name:** fix2
- **Project ID:** prj_WSdzX00UNP1rcWNXQ3RrpeuVOkeA
- **Organization:** elevate-48e460c9
- **Password Protection:** Enabled (401 on deployments)

### Deployment URLs

**Latest deployment hash URL:**

```
https://fix2-lujwfkml1-elevate-48e460c9.vercel.app
```

⚠️ This is password protected and is a frozen snapshot

**Production domain (when configured):**

```
https://www.elevateforhumanity.org
```

### Important Notes

1. **No project base URL** - The project doesn't have a public base URL like `fix2.vercel.app`
2. **Password protection** - All deployments return 401 without authentication
3. **Custom domain needed** - To have a public URL, configure a custom domain in Vercel

---

## Performance Benefits

### What We Keep

✅ **Fast static assets** - JS/CSS cached for 1 year
✅ **Image optimization** - Next.js image optimization enabled
✅ **CDN delivery** - Vercel's global CDN serves all assets
✅ **Incremental builds** - Only changed pages rebuild

### What We Fix

✅ **Fresh HTML** - Always get latest content
✅ **No stale pages** - Users never see old versions
✅ **Build verification** - Visual markers confirm deployments
✅ **Predictable behavior** - No mysterious cache issues

---

## Comparison: Smart vs Nuclear

### Nuclear Option (What We Avoided)

```javascript
// ❌ Don't do this
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
```

**Problems:**

- Every request hits the server
- No static optimization
- Slower page loads
- Higher costs
- Poor Lighthouse scores

### Smart Option (What We Implemented)

```javascript
// ✅ Do this instead
// Selective cache headers in next.config.mjs
// Build markers for verification
// Unique build IDs
```

**Benefits:**

- Static assets cached aggressively
- HTML always fresh
- Fast page loads
- Low costs
- Great Lighthouse scores

---

## Troubleshooting

### "I still see old content"

1. **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Check build marker:** Look for timestamp in bottom-right
3. **Clear browser cache:** Settings → Clear browsing data
4. **Check correct URL:** Are you on a custom domain or deployment URL?
5. **Verify deployment:** Run `pnpm verify:deployment`

### "Build marker not updating"

1. **Check if deployed:** Run `npx vercel ls` to see latest deployment
2. **Check deployment status:** Is it still building?
3. **Check password protection:** Deployment might be behind auth
4. **Check custom domain:** Is DNS pointing to latest deployment?

### "Static assets not updating"

This is expected! Static assets use content hashes:

- Old: `main-abc123.js`
- New: `main-xyz789.js`

The HTML will reference the new filename automatically.

---

## Scripts Reference

### Deploy with Smart Cache

```bash
# Clean build + deploy
pnpm deploy:prod

# Or use autopilot
pnpm autopilot:deploy
```

### Verify Deployment

```bash
# Check deployment status
pnpm verify:deployment

# Check Vercel deployments
npx vercel ls
```

### Update Build Marker

```bash
# Automated helper
bash scripts/add-build-marker.sh

# Or manually edit app/page.tsx
# Update the BUILD timestamp
```

---

## Best Practices

### Before Every Deployment

1. ✅ Update build marker timestamp
2. ✅ Test build locally: `pnpm build`
3. ✅ Commit changes: `git commit -am "Update build marker"`
4. ✅ Deploy: `pnpm deploy:prod`
5. ✅ Verify: Check build marker on live site

### After Every Deployment

1. ✅ Hard refresh browser
2. ✅ Check build marker matches
3. ✅ Test critical pages
4. ✅ Check DevTools Network tab for cache headers
5. ✅ Document any issues

### Regular Maintenance

1. ✅ Monitor Vercel analytics
2. ✅ Check Lighthouse scores
3. ✅ Review cache hit rates
4. ✅ Update dependencies
5. ✅ Test on multiple browsers/devices

---

## Summary

**Smart Cache Strategy = Performance + Freshness**

- HTML: Always fresh (max-age=0)
- Static assets: Long cache (max-age=31536000)
- Images: Moderate cache (max-age=86400)
- Build markers: Visual verification
- Unique build IDs: Force fresh builds

This gives you the best of both worlds: fast performance and always-fresh content.

---

**Last Updated:** 2025-11-20  
**Strategy:** Option D (Smart Cache)  
**Status:** ✅ Implemented
