# CRITICAL: Update Vercel Environment Variables

## Domain Migration: elevateconnectsdirectory.org → www.elevateforhumanity.org

You MUST update these environment variables in Vercel dashboard:

### Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables

## Required Updates:

### 1. NEXT_PUBLIC_SITE_URL
**Current:** `https://elevateconnectsdirectory.org` or `https://elevateforhumanity.org`
**Update to:** `https://www.elevateforhumanity.org`

**Environments:** Production, Preview, Development

### 2. NEXT_PUBLIC_APP_URL
**Current:** `https://elevateconnectsdirectory.org` or `https://elevateforhumanity.org`
**Update to:** `https://www.elevateforhumanity.org`

**Environments:** Production, Preview, Development

### 3. EMAIL_FROM (if set)
**Update to:** `Elevate for Humanity <noreply@elevateforhumanity.org>`

### 4. MOU_ARCHIVE_EMAIL (if set)
**Update to:** `agreements@elevateforhumanity.org`

## Additional Vercel Settings:

### Domain Configuration
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/domains
2. Ensure these domains are configured:
   - **Primary:** `www.elevateforhumanity.org` (Production)
   - **Redirect:** `elevateforhumanity.org` → `www.elevateforhumanity.org`

### DNS Settings (Already done by you)
✅ You've already updated DNS on Durable
✅ Point to Vercel's servers

## After Updating Environment Variables:

1. **Redeploy** the application:
   - Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments
   - Click on latest deployment
   - Click "Redeploy"
   - **IMPORTANT:** Uncheck "Use existing Build Cache"

2. **Clear Vercel Edge Cache:**
   - The redeploy will clear edge caches automatically

3. **Verify the changes:**
   - Visit: https://www.elevateforhumanity.org/api/build-info
   - Check that URLs show `www.elevateforhumanity.org`

## Why www is Important:

1. **SEO:** Google treats `www` and non-`www` as different sites
2. **Cookies:** Better cookie management with www subdomain
3. **CDN:** Vercel's CDN works better with www
4. **SSL:** Separate SSL cert for www vs root domain
5. **Analytics:** Consistent tracking across all pages

## Verification Checklist:

- [ ] Updated `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Updated `NEXT_PUBLIC_APP_URL` in Vercel
- [ ] Set `www.elevateforhumanity.org` as primary domain
- [ ] Configured redirect from `elevateforhumanity.org` to `www.elevateforhumanity.org`
- [ ] Redeployed without cache
- [ ] Tested https://www.elevateforhumanity.org
- [ ] Verified API endpoints return correct domain
- [ ] Checked sitemap.xml shows www URLs
- [ ] Confirmed Google Analytics tracking

## Current Status:

✅ Code updated to use `www.elevateforhumanity.org`
✅ Sitemap.xml generated with www URLs
✅ Robots.txt updated
✅ SEO meta tags updated
✅ All documentation updated
⚠️ **PENDING:** Vercel environment variables need manual update
⚠️ **PENDING:** Vercel domain configuration needs verification

---

**Next Step:** Update Vercel environment variables NOW, then redeploy!
