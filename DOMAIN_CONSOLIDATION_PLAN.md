# Domain Consolidation Plan - Multiple Versions on Google

## Problem Identified

Google is showing multiple versions of the site:
1. `www.elevateforhumanity.org` (correct, primary)
2. `elevateforhumanity.org` (apex, should redirect)
3. `elevateforhumanity.durable.co` (old Durable site)
4. Possibly Vercel preview URLs (`*.vercel.app`)

## Current Status

### ✅ Already Fixed in Code:
- Apex domain redirects to www (308 permanent)
- Vercel preview domains redirect to www (308 permanent)
- All canonical URLs use www
- Sitemap uses www (5,516 URLs)
- Robots.txt references www sitemap

### ❌ Still Need to Fix:

#### 1. DNS/Hosting Level
**Action Required:** You need to configure in your DNS provider:

**Durable.co Site:**
- If `elevateforhumanity.durable.co` still exists, you need to:
  - Delete the Durable site, OR
  - Add a redirect from Durable to `www.elevateforhumanity.org`

**DNS Records:**
Check your DNS provider (Cloudflare, GoDaddy, etc.) and ensure:
- `elevateforhumanity.org` (A record) → Points to Vercel
- `www.elevateforhumanity.org` (CNAME) → Points to Vercel
- NO records pointing to `durable.co`

#### 2. Google Search Console
**Action Required:**

1. **Add all properties:**
   - `https://www.elevateforhumanity.org` (primary)
   - `https://elevateforhumanity.org` (apex)
   - `https://elevateforhumanity.durable.co` (if exists)

2. **Set preferred domain:**
   - In Google Search Console
   - Settings → Change of Address
   - Point old domains to `www.elevateforhumanity.org`

3. **Submit updated sitemap:**
   - URL: `https://www.elevateforhumanity.org/sitemap.xml`
   - Remove old sitemaps from other domains

4. **Request removal of old URLs:**
   - Use "Removals" tool in Search Console
   - Request removal of:
     - `elevateforhumanity.durable.co/*`
     - Any `*.vercel.app` URLs

#### 3. Vercel Configuration
**Action Required in Vercel Dashboard:**

1. **Go to:** https://vercel.com/lizzy6262/fix2/settings/domains

2. **Verify domains listed:**
   - Should have: `www.elevateforhumanity.org` (primary)
   - Should have: `elevateforhumanity.org` (redirects to www)
   - Should NOT have: Any `durable.co` domains

3. **Set primary domain:**
   - Make `www.elevateforhumanity.org` the primary
   - Ensure "Redirect to Primary" is enabled for apex

4. **Remove preview domains from indexing:**
   - Settings → General
   - Ensure "Automatically expose System Environment Variables" is OFF
   - This prevents preview URLs from being indexed

## Immediate Actions You Can Take

### 1. Check Durable.co
- Go to: https://elevateforhumanity.durable.co
- If it loads, you need to delete or redirect it
- Log into Durable.co account and either:
  - Delete the site, OR
  - Add a redirect to `www.elevateforhumanity.org`

### 2. Check DNS
- Log into your DNS provider
- Look for any CNAME or A records pointing to `durable.co`
- Remove them or update to point to Vercel

### 3. Google Search Console
- Go to: https://search.google.com/search-console
- Add `www.elevateforhumanity.org` as primary property
- Submit sitemap: `https://www.elevateforhumanity.org/sitemap.xml`
- Use "Change of Address" tool if you have old domains

### 4. Request URL Removal
In Google Search Console:
- Removals → New Request
- Remove: `elevateforhumanity.durable.co/*`
- Remove: Any `*.vercel.app` URLs you find

## What We've Already Done (Code Level)

✅ **Redirects in place:**
```typescript
// proxy.ts
elevateforhumanity.org → www.elevateforhumanity.org (308)
*.vercel.app → www.elevateforhumanity.org (308)
```

✅ **Canonical URLs:**
```typescript
// All pages use:
canonical: 'https://www.elevateforhumanity.org'
```

✅ **Sitemap:**
```xml
<!-- 5,516 URLs all using www -->
<loc>https://www.elevateforhumanity.org/</loc>
```

✅ **Robots.txt:**
```
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

## Timeline for Consolidation

- **Immediate:** Code-level redirects active (done)
- **1-2 days:** DNS changes propagate (if you make them)
- **1-2 weeks:** Google re-crawls and consolidates
- **2-4 weeks:** Old URLs removed from Google index

## Verification Checklist

After making DNS/hosting changes:

- [ ] `elevateforhumanity.org` redirects to `www.elevateforhumanity.org`
- [ ] `elevateforhumanity.durable.co` is deleted or redirects
- [ ] `*.vercel.app` URLs redirect to production
- [ ] Google Search Console shows `www.elevateforhumanity.org` as primary
- [ ] Sitemap submitted to Google
- [ ] Old URLs requested for removal
- [ ] Wait 1-2 weeks for Google to consolidate

## Need Help?

**What I can do:**
- ✅ Fix code-level redirects (done)
- ✅ Fix canonical URLs (done)
- ✅ Fix sitemap (done)

**What you need to do:**
- ❌ DNS configuration (access to DNS provider)
- ❌ Durable.co site deletion/redirect (access to Durable account)
- ❌ Google Search Console configuration (access to GSC)
- ❌ Vercel domain settings (access to Vercel dashboard)

---

**Status:** Code fixes complete. DNS/hosting changes required by site owner.
