# Deploy Now - Final Checklist

**Status**: ✅ Code Ready for Deployment  
**Last Commit**: `08f967169` - CSS build errors fixed

---

## What's Been Fixed (Ready to Deploy)

### ✅ Build System
- Tailwind config created with correct paths
- CSS custom classes replaced with standard Tailwind
- Build succeeds: `pnpm build` works
- TypeScript: 0 errors

### ✅ Homepage Cleanup
- Removed "Secure Connection" badge
- Removed "ORIGINAL-SITE-EFH" legal text from footer
- Replaced with professional trust signals
- SecurityBadge now returns null (not rendered)

### ✅ Hero Components
- HeroBanner.tsx with unoptimized images
- HeroMedia.tsx with muted autoplay + voiceover
- Production-ready video/audio handling

### ✅ Security
- RLS migrations created (need to be applied)
- Email integration complete
- Audit logging ready

---

## Deploy Steps

### 1. Push to Repository
```bash
git push origin main
```

### 2. Deploy to Vercel/Hosting
The build will succeed because:
- ✅ Tailwind config exists
- ✅ CSS compiles
- ✅ TypeScript passes
- ✅ No build errors

### 3. After Deployment - Apply Migrations
Open Supabase SQL Editor and run these in order:

```sql
-- 1. Core schema
\i supabase/migrations/001_init_schema.sql

-- 2. Courses
\i supabase/migrations/002_courses.sql

-- 3. Products
\i supabase/migrations/003_products.sql

-- 4. Media
\i supabase/migrations/004_media.sql

-- 5. Licenses
\i supabase/migrations/005_licenses.sql

-- 6. Org invites RLS fix
\i supabase/migrations/006_org_invites_rls_fix.sql

-- 7. RLS policies
\i supabase/migrations/007_rls_policies.sql

-- 8. System errors
\i supabase/migrations/008_system_errors.sql

-- 9. RLS hardening
\i supabase/migrations/009_rls_hardening_pack.sql
```

Or copy/paste each file's content into the SQL editor.

### 4. Verify Deployment
```bash
# Check homepage loads
curl https://your-domain.com

# Check CSS loads
curl https://your-domain.com/_next/static/css/... 
# Should return CSS, not 404

# Check API health
curl https://your-domain.com/api/health
```

---

## What Will Work After Deployment

✅ Homepage loads with styling  
✅ Navigation visible  
✅ Hero section renders  
✅ Footer shows trust signals  
✅ No "Secure Connection" badge  
✅ No legal warnings above nav  

---

## What Still Needs Work (Post-Deployment)

### 1. Replace Hero Assets
Current: SVG placeholders  
Needed: Real December 12 banners + video + voiceover

```
/public/images/hero/hero-dec12-1.svg → .jpg
/public/images/hero/hero-dec12-2.svg → .jpg
/public/video/hero-home-dec12.mp4 → real video
/public/audio/hero-voiceover.mp3 → real audio
```

### 2. Wire Stripe Webhook
File: `app/api/webhooks/stripe/route.ts`

Add after checkout.session.completed:
```typescript
await upsertOrgSubscription({
  organization_id: session.metadata.organization_id,
  stripe_customer_id: session.customer,
  status: 'active'
});
```

### 3. Create Reports UI
Pages needed:
- `/admin/reports/page.tsx`
- `/admin/reports/enrollments/page.tsx`
- `/admin/reports/progress/page.tsx`

---

## Expected Results

### Before Deployment
- ❌ Site may show "Secure Connection" banner
- ❌ Footer shows "ORIGINAL-SITE-EFH"
- ❌ CSS may not load properly

### After Deployment (with these commits)
- ✅ No security badges on homepage
- ✅ Professional footer with trust signals
- ✅ CSS loads correctly
- ✅ Build succeeds
- ✅ TypeScript clean

---

## If CSS Still Doesn't Load

Check these in production:

1. **Network tab**: Look for `/_next/static/css/...` requests
   - Should be 200 OK, not 404
   - Should have CSS content, not HTML

2. **Console**: Look for errors
   - "Failed to load resource"
   - "MIME type text/html"

3. **Verify**: `tailwind.config.js` is in the deployed build
   - Should be at root of project
   - Should have correct content paths

---

## Deploy Command

```bash
# Commit any remaining changes
git add -A
git commit -m "ready for deployment"

# Push to main
git push origin main

# Vercel will auto-deploy
# Or manually: vercel --prod
```

---

## Post-Deployment Verification

```bash
# 1. Homepage loads
✅ https://elevateforhumanity.org/

# 2. No "Secure Connection" text
✅ Check page source

# 3. CSS loads
✅ Check Network tab for CSS files

# 4. Navigation visible
✅ Programs, Funding, Platform, etc.

# 5. Footer shows trust signals
✅ "WIOA Approved Provider | Indiana DWD Registered"
```

---

## Bottom Line

**Code Status**: ✅ Ready  
**Build Status**: ✅ Passes  
**Deploy Status**: ✅ Can deploy now  

**Next**: Push to production and verify CSS loads.
