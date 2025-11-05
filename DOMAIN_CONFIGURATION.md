# Domain Configuration Guide

## Current Setup

### Primary Domain (Marketing)
- **Domain:** elevateforhumanity.org
- **Hosting:** Durable.co (Cloudflare/Next.js)
- **Purpose:** Static marketing site with "Get Started" button
- **Status:** ✅ Active

### Application Domain (React SPA)
- **Current URL:** elevateforhumanityfix.netlify.app
- **Hosting:** Netlify
- **Purpose:** Full React application with LMS, programs, certificates
- **Status:** ⚠️ Needs environment variables + redeploy

---

## Recommended Domain Strategy

### Option 1: Keep Current Setup (Recommended for Quick Fix)

**No DNS changes needed.** Just fix the environment variables:

1. **Marketing Site:** elevateforhumanity.org (Durable.co)
   - Keep as-is
   - "Get Started" button links to Netlify app

2. **Application:** elevateforhumanityfix.netlify.app (Netlify)
   - Add environment variables (see NETLIFY_ENV_VARS_REQUIRED.md)
   - Redeploy to fix skeleton pages
   - Update "Get Started" link on Durable site

**Pros:**
- ✅ No DNS changes required
- ✅ Fastest to implement (15 minutes)
- ✅ No downtime
- ✅ Clear separation of concerns

**Cons:**
- ❌ Less professional URL for app
- ❌ Users see different domains

---

### Option 2: Custom Subdomain (Better UX)

**Requires DNS configuration:**

1. **Marketing Site:** elevateforhumanity.org (Durable.co)
   - Keep as-is

2. **Application:** app.elevateforhumanity.org (Netlify)
   - Add custom domain in Netlify
   - Configure DNS CNAME record

**Steps:**

#### A. Add Custom Domain in Netlify
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/domain
2. Click **Add custom domain**
3. Enter: `app.elevateforhumanity.org`
4. Netlify will provide DNS instructions

#### B. Configure DNS
1. Go to your DNS provider (where elevateforhumanity.org is registered)
2. Add CNAME record:
   ```
   Type: CNAME
   Name: app
   Value: elevateforhumanityfix.netlify.app
   TTL: 3600 (or Auto)
   ```
3. Wait for DNS propagation (5-60 minutes)

#### C. Enable HTTPS
1. Netlify will auto-provision SSL certificate
2. Wait for certificate to be issued (usually < 5 minutes)
3. Verify HTTPS works: https://app.elevateforhumanity.org

**Pros:**
- ✅ Professional subdomain
- ✅ Consistent branding
- ✅ Better user experience
- ✅ Easier to remember

**Cons:**
- ❌ Requires DNS access
- ❌ DNS propagation delay
- ❌ More complex setup

---

### Option 3: Full Migration (Most Complex)

**Move everything to Netlify:**

1. **Marketing Site:** elevateforhumanity.org → Netlify (Astro)
2. **Application:** app.elevateforhumanity.org → Netlify (React)

See [IMPLEMENT_SPLIT_ARCHITECTURE.md](./IMPLEMENT_SPLIT_ARCHITECTURE.md) for full implementation.

**Pros:**
- ✅ Single hosting platform
- ✅ Unified deployment pipeline
- ✅ Better performance (SSG for marketing)
- ✅ Professional architecture

**Cons:**
- ❌ Requires building new Astro site
- ❌ 3+ hours of work
- ❌ Migration complexity
- ❌ Potential downtime during migration

---

## Recommended Action Plan

### Phase 1: Quick Fix (Do This First) ⭐

1. **Add environment variables to Netlify** (5 min)
   - See: NETLIFY_ENV_VARS_REQUIRED.md
   
2. **Trigger new deployment** (2 min)
   - Clear cache and deploy
   
3. **Test the app** (5 min)
   - Visit: https://elevateforhumanityfix.netlify.app
   - Verify no skeleton pages
   - Check API calls work

4. **Update Durable.co "Get Started" link** (3 min)
   - Point to: https://elevateforhumanityfix.netlify.app

**Total Time:** ~15 minutes  
**Risk:** Low  
**Impact:** Fixes skeleton pages immediately

---

### Phase 2: Add Custom Subdomain (Optional)

After Phase 1 is working:

1. **Add custom domain in Netlify** (2 min)
2. **Configure DNS CNAME** (5 min)
3. **Wait for DNS propagation** (5-60 min)
4. **Verify HTTPS works** (2 min)
5. **Update Durable.co link** (2 min)

**Total Time:** ~15 minutes + DNS wait  
**Risk:** Low  
**Impact:** Better UX with professional subdomain

---

### Phase 3: Full Architecture Split (Future)

When you have 3+ hours:

1. Build Astro marketing site
2. Migrate content from Durable.co
3. Configure DNS for both domains
4. Test thoroughly
5. Switch DNS to Netlify

See: [IMPLEMENT_SPLIT_ARCHITECTURE.md](./IMPLEMENT_SPLIT_ARCHITECTURE.md)

---

## Current Status

✅ **Code Changes:** Complete  
✅ **CORS/CSP:** Configured  
✅ **Documentation:** Complete  
⚠️ **Environment Variables:** Need to be set in Netlify UI  
⚠️ **Deployment:** Needs to be triggered after env vars  
❌ **Custom Domain:** Not configured (optional)

---

## Next Steps

1. **Immediate:** Set environment variables in Netlify (see NETLIFY_ENV_VARS_REQUIRED.md)
2. **Immediate:** Trigger new deployment
3. **Immediate:** Test the fix
4. **Optional:** Configure custom subdomain (app.elevateforhumanity.org)
5. **Future:** Consider full architecture split

---

## Support

If you need help with:
- **DNS configuration:** Contact your domain registrar
- **Netlify setup:** Check Netlify docs or support
- **Durable.co updates:** Access Durable.co dashboard

---

**Last Updated:** 2025-11-05  
**Recommended:** Start with Phase 1 (Quick Fix)
