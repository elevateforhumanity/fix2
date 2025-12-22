# INDIANA SITE - SLUG & ROUTING AUDIT

## EXECUTIVE SUMMARY

**Status:** ✅ ROUTING IS MOSTLY CORRECT  
**Critical Issues:** 2 found  
**Minor Issues:** 5 found  
**Action Required:** Fix 2 critical issues before go-live

---

## CRITICAL ISSUES (FIX IMMEDIATELY)

### 1. Missing `/micro-classes` Route

**Problem:** Header links to `/micro-classes` but folder doesn't exist  
**Impact:** 404 error for all users clicking "Micro Courses"  
**Fix:** Create `/app/micro-classes/page.tsx` OR change link to existing route

**Current State:**

- Header: `{ href: '/micro-classes', label: 'Micro Courses' }`
- Folder: ❌ DOES NOT EXIST

**Recommended Fix:**

```bash
# Option A: Create the page
mkdir -p app/micro-classes
# Then create page.tsx

# Option B: Update header link
# Change to: { href: '/courses', label: 'Micro Courses' }
```

### 2. Missing `/licensing` Route

**Problem:** Header links to `/licensing` but folder doesn't exist  
**Impact:** 404 error for partner inquiries  
**Fix:** Create page OR redirect to `/platform`

**Current State:**

- Header: `{ href: '/licensing', label: 'Partners' }`
- Folder: ❌ DOES NOT EXIST

**Recommended Fix:**

```bash
# Option A: Create redirect
# app/licensing/page.tsx
export default function LicensingPage() {
  redirect('/platform');
}

# Option B: Update header
# Change to: { href: '/platform', label: 'Partners' }
```

---

## MINOR ISSUES (FIX WHEN POSSIBLE)

### 3. Folders Without page.tsx (Non-Critical)

These folders exist but have no page.tsx. They won't cause 404s unless linked:

- `/app/delegate` - Has API routes only
- `/app/cert` - Has verify subfolder only
- `/app/apprentice` - Has hours subfolder only
- `/app/mentor` - Empty folder
- `/app/instructor` - Empty folder

**Action:** Delete empty folders or add page.tsx if needed

### 4. Dynamic Routes - All Working ✅

**Verified:**

- `/programs/[slug]` - ✅ Has `generateStaticParams()`
- Programs generate from `/app/data/programs.ts`
- All program slugs will build correctly

### 5. Application Routes - All Working ✅

**Verified:**

- `/apply` - ✅ EXISTS
- `/apply/full` - ✅ EXISTS
- `/application-success` - ✅ EXISTS
- API route `/api/apply` - ✅ EXISTS

---

## NAVIGATION AUDIT

### Header Links (components/site/SiteHeader.tsx)

| Link             | Route      | Status     | Action      |
| ---------------- | ---------- | ---------- | ----------- |
| `/programs`      | ✅ EXISTS  | WORKING    | None        |
| `/micro-classes` | ❌ MISSING | **BROKEN** | **FIX NOW** |
| `/funding`       | ✅ EXISTS  | WORKING    | None        |
| `/platform`      | ✅ EXISTS  | WORKING    | None        |
| `/licensing`     | ❌ MISSING | **BROKEN** | **FIX NOW** |
| `/about`         | ✅ EXISTS  | WORKING    | None        |
| `/contact`       | ✅ EXISTS  | WORKING    | None        |
| `/apply`         | ✅ EXISTS  | WORKING    | None        |

**2 out of 8 links are broken**

---

## PROGRAM ROUTES AUDIT

### Main Programs Page

- Route: `/programs`
- File: `/app/programs/page.tsx`
- Status: ✅ EXISTS

### Individual Program Pages

- Route: `/programs/[slug]`
- File: `/app/programs/[slug]/page.tsx`
- Status: ✅ EXISTS with `generateStaticParams()`

### Program Slugs (from data/programs.ts)

All these will build correctly:

- `/programs/barber`
- `/programs/cna`
- `/programs/hvac`
- `/programs/direct-support-professional`
- `/programs/tax-preparation`
- (and all others in programs.ts)

**Status:** ✅ ALL WORKING

---

## APPLICATION FLOW AUDIT

### Application Routes

1. `/apply` - ✅ Quick inquiry form
2. `/apply/full` - ✅ Full application form
3. `/application-success` - ✅ Success page
4. API: `/api/apply` - ✅ Submission endpoint
5. API: `/api/applications` - ✅ Legacy endpoint

**Status:** ✅ ALL WORKING

---

## DASHBOARD ROUTES AUDIT

### Student Dashboard

- `/dashboard` - ✅ EXISTS
- `/dashboard/recaps` - ✅ EXISTS (meeting recaps)
- `/dashboard/progress` - ✅ EXISTS (WorkOne checklist)

### Admin Dashboard

- `/admin` - ✅ EXISTS
- `/admin/applications` - ✅ EXISTS
- `/admin/next-steps` - ✅ EXISTS
- `/admin/export-etpl` - ✅ API EXISTS

**Status:** ✅ ALL WORKING

---

## SCHEDULING & BOOKING AUDIT

### Calendly Integration

- `/schedule` - ✅ EXISTS
- Calendly embed configured via env var
- Status: ✅ WORKING

---

## QUICK FIX CHECKLIST

### Immediate (Before Go-Live)

- [ ] Fix `/micro-classes` route (create page or update link)
- [ ] Fix `/licensing` route (create page or update link)
- [ ] Test both fixes on production

### Soon (Within 7 Days)

- [ ] Delete empty folders (`/app/mentor`, `/app/instructor`)
- [ ] Add 404 page improvements
- [ ] Document all active routes

### Later (Within 30 Days)

- [ ] Create sitemap.xml with all routes
- [ ] Add route monitoring
- [ ] Document slug naming conventions

---

## RECOMMENDED FIXES (COPY-PASTE READY)

### Fix 1: Create /micro-classes Page

```bash
mkdir -p app/micro-classes
```

```typescript
// app/micro-classes/page.tsx
export const metadata = {
  title: 'Micro Courses | Elevate for Humanity',
  description: 'Short, focused training courses',
};

export default function MicroClassesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Micro Courses</h1>
      <p className="mt-4">Coming soon - short, focused training courses.</p>
    </div>
  );
}
```

### Fix 2: Create /licensing Redirect

```typescript
// app/licensing/page.tsx
import { redirect } from 'next/navigation';

export default function LicensingPage() {
  redirect('/platform');
}
```

---

## DEPLOYMENT IMPACT

### Before Fixes

- 2 broken navigation links
- Users see 404 errors
- Bounce rate increases
- Trust decreases

### After Fixes

- 0 broken navigation links
- Clean user experience
- Professional appearance
- Ready for go-live

---

## VERIFICATION STEPS

After applying fixes:

1. **Local Test:**

```bash
npm run dev
# Click every header link
# Verify no 404s
```

2. **Build Test:**

```bash
npm run build
# Check for route errors
# Verify all pages compile
```

3. **Production Test:**

```bash
# After deployment
# Visit each header link
# Verify all load correctly
```

---

## FINAL VERDICT

**Routing System:** ✅ SOLID  
**Dynamic Routes:** ✅ WORKING  
**Application Flow:** ✅ WORKING  
**Critical Issues:** 2 (easy fixes)

**Ready to Deploy After:** Fixing 2 header links

**Estimated Fix Time:** 5 minutes

---

## NEXT STEPS

1. Apply Fix 1 (micro-classes)
2. Apply Fix 2 (licensing)
3. Test locally
4. Deploy
5. Verify on production
6. Lock Indiana routing
7. Then consider Texas/Ohio

**DO NOT expand to other states until Indiana is locked clean.**
