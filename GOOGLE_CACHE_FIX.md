# Fix Google Showing Old/Wrong Version

## Problem
- Direct URL (`www.elevateforhumanity.org`) shows correct site ✅
- Google search results show old/different version ❌

## This is a Google Cache Issue

Google has cached an old version of your site and hasn't re-crawled the new one yet.

---

## Immediate Fixes (Do These Now)

### 1. Force Google to Re-Crawl

**Go to Google Search Console:**
1. Visit: https://search.google.com/search-console
2. Add property: `https://www.elevateforhumanity.org` (if not already added)
3. Go to: **URL Inspection** (left sidebar)
4. Enter: `https://www.elevateforhumanity.org`
5. Click: **Request Indexing**
6. Repeat for key pages:
   - `https://www.elevateforhumanity.org/programs`
   - `https://www.elevateforhumanity.org/apply`
   - `https://www.elevateforhumanity.org/about`

### 2. Submit Updated Sitemap

**In Google Search Console:**
1. Go to: **Sitemaps** (left sidebar)
2. Remove any old sitemaps
3. Add new sitemap: `https://www.elevateforhumanity.org/sitemap.xml`
4. Click: **Submit**

### 3. Clear Google Cache

**For each page showing wrong content:**
1. Go to: https://search.google.com/search-console
2. URL Inspection → Enter the URL
3. Click: **Request Indexing**

**OR use this quick method:**
1. Google search: `cache:www.elevateforhumanity.org`
2. This shows you what Google has cached
3. If it's old, request re-indexing

### 4. Check for Old Sitemaps

**Search Google for:**
```
site:elevateforhumanity.org
```

This shows all pages Google has indexed. Look for:
- Old URLs (durable.co, netlify, etc.)
- Duplicate pages
- Wrong domain versions

**Remove old URLs:**
1. Google Search Console → **Removals**
2. Click: **New Request**
3. Enter old URLs to remove
4. Select: **Temporarily remove URL**

---

## Why This Happens

1. **Google crawls slowly** - Can take days/weeks to re-index
2. **Old sitemap cached** - Google still using old sitemap
3. **Multiple domains** - Google indexing wrong domain
4. **CDN caching** - Cloudflare/CDN serving old version

---

## Check These

### A. Verify Current Sitemap
Visit: `https://www.elevateforhumanity.org/sitemap.xml`

**Should show:**
- 5,516 URLs
- All using `www.elevateforhumanity.org`
- Recent lastmod dates

**If it shows old content:**
- Clear browser cache
- Check in incognito mode
- Verify Vercel deployment completed

### B. Check Robots.txt
Visit: `https://www.elevateforhumanity.org/robots.txt`

**Should show:**
```
User-agent: *
Allow: /
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
Disallow: /admin/
Disallow: /api/
...
```

### C. Check Meta Tags
View source on: `https://www.elevateforhumanity.org`

**Should have:**
```html
<link rel="canonical" href="https://www.elevateforhumanity.org" />
<meta property="og:url" content="https://www.elevateforhumanity.org" />
```

---

## Timeline

- **Immediate:** Request indexing (do now)
- **1-2 hours:** Google starts re-crawling
- **1-2 days:** Key pages updated in Google
- **1-2 weeks:** Full site re-indexed
- **2-4 weeks:** Old cached pages replaced

---

## Advanced: Force Cache Bust

If Google still shows old content after 24 hours:

### 1. Add Cache-Busting Header
Already done in code:
```typescript
// next.config.mjs
generateBuildId: async () => {
  return `build-${Date.now()}`;
}
```

### 2. Update All Page Timestamps
Already done - sitemap has current dates

### 3. Ping Google
```bash
curl "https://www.google.com/ping?sitemap=https://www.elevateforhumanity.org/sitemap.xml"
```

---

## Verification Steps

After requesting re-indexing:

1. **Wait 1-2 hours**
2. **Google search:** `site:www.elevateforhumanity.org`
3. **Check if new pages appear**
4. **Click through to verify correct content**
5. **If still wrong, request indexing again**

---

## Common Issues

### Issue: Google shows "elevateforhumanity.org" (no www)
**Fix:** 
- Request indexing for `www.elevateforhumanity.org`
- The redirect (apex → www) will consolidate them

### Issue: Google shows old Durable.co site
**Fix:**
- Request removal in Search Console
- Add redirect from Durable.co to www.elevateforhumanity.org

### Issue: Multiple versions in Google
**Fix:**
- Use "Change of Address" tool in Search Console
- Point all old domains to www.elevateforhumanity.org

---

## Need Immediate Results?

**Paid option:**
- Google Ads can force immediate indexing
- Run a small ad campaign ($10-20)
- Google will crawl your site within hours

**Free but slower:**
- Request indexing (done above)
- Share links on social media (triggers crawl)
- Get backlinks from other sites (triggers crawl)

---

## Status Check

**After 24 hours, verify:**
- [ ] Google search shows correct homepage
- [ ] Sitemap submitted and processed
- [ ] Old URLs requested for removal
- [ ] Meta tags correct (view source)
- [ ] Canonical URLs correct

**If still wrong after 48 hours:**
- Contact me with specific URLs
- We'll investigate DNS/hosting issues
- May need to check Durable.co configuration

---

**Last Updated:** January 2, 2025
**Action Required:** Request indexing in Google Search Console NOW
