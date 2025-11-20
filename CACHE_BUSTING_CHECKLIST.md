# 🎯 Cache-Busting Implementation Checklist

## ✅ COMPLETED

- [x] Autopilot hard refresh script created
- [x] GitHub Action configured
- [x] Admin API endpoint created
- [x] `/programs` marked as force-dynamic
- [x] `/admin/courses` marked as force-dynamic

---

## 📋 TODO: Mark Pages as Dynamic or ISR

### A. FORCE-DYNAMIC (No Cache) - Dashboards & Portals

**Priority: HIGH - Do these first**

#### LMS Pages

- [ ] `app/lms/dashboard/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/lms/courses/[courseId]/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/lms/assignments/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/lms/certificates/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### Admin Pages

- [ ] `app/admin/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/admin/contacts/page.tsx` (already has it)

- [ ] `app/admin/users/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### Student Dashboard

- [ ] `app/student/dashboard/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/student/courses/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/student/assignments/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/student/certificates/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/student/grades/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### Program Holder Dashboard

- [ ] `app/program-holder/dashboard/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/program-holder/students/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### Delegates/Case Management

- [ ] `app/delegates/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/delegates/cases/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### WIOA Pages

- [ ] `app/wioa/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/wioa/cases/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/wioa/reports/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

#### HR Pages (Phase 1)

- [ ] `app/hr/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/hr/employees/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/hr/payroll/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/hr/time/page.tsx`

  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

- [ ] `app/hr/leave/page.tsx`
  ```typescript
  export const dynamic = 'force-dynamic';
  export const fetchCache = 'force-no-store';
  ```

---

### B. ISR (Cached with Revalidation) - Marketing/Public Pages

**Priority: MEDIUM - Do after force-dynamic pages**

#### Homepage

- [ ] `app/page.tsx`
  ```typescript
  export const revalidate = 300; // 5 minutes
  ```

#### Programs

- [ ] `app/programs/page.tsx` (already has force-dynamic, change to ISR)

  ```typescript
  export const revalidate = 300; // 5 minutes
  ```

- [ ] `app/programs/[slug]/page.tsx`
  ```typescript
  export const revalidate = 300; // 5 minutes
  ```

#### About/Info Pages

- [ ] `app/about/page.tsx`

  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

- [ ] `app/contact/page.tsx`

  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

- [ ] `app/faq/page.tsx`

  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

- [ ] `app/partners/page.tsx`

  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

- [ ] `app/employers/page.tsx`
  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

#### Blog

- [ ] `app/blog/page.tsx`

  ```typescript
  export const revalidate = 600; // 10 minutes
  ```

- [ ] `app/blog/[slug]/page.tsx`
  ```typescript
  export const revalidate = 600; // 10 minutes
  ```

#### Success Stories

- [ ] `app/success-stories/page.tsx`
  ```typescript
  export const revalidate = 3600; // 1 hour
  ```

---

### C. API Routes - No Cache Headers

**Priority: HIGH - Critical for dashboards**

Add to all critical API routes:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.json({
    /* your data */
  });

  res.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');

  return res;
}
```

#### HR APIs

- [ ] `app/api/hr/employees/route.ts`
- [ ] `app/api/hr/payroll/route.ts`
- [ ] `app/api/hr/time-entries/route.ts`
- [ ] `app/api/hr/leave-requests/route.ts`
- [ ] `app/api/hr/benefits-plans/route.ts`
- [ ] `app/api/hr/performance-reviews/route.ts`

#### LMS APIs

- [ ] `app/api/lms/courses/route.ts`
- [ ] `app/api/lms/enrollments/route.ts`
- [ ] `app/api/lms/assignments/route.ts`
- [ ] `app/api/lms/progress/route.ts`

#### WIOA APIs

- [ ] `app/api/wioa/cases/route.ts`
- [ ] `app/api/wioa/participants/route.ts`
- [ ] `app/api/wioa/reports/route.ts`

#### Admin APIs

- [ ] `app/api/admin/users/route.ts`
- [ ] `app/api/admin/courses/route.ts`
- [ ] `app/api/admin/analytics/route.ts`

---

## 🔄 Revalidation on Data Changes

When data changes in admin, revalidate the public pages:

### Example: When updating a program

```typescript
// app/api/admin/programs/[id]/route.ts
import { revalidatePath } from 'next/cache';

export async function PATCH(req: Request, { params }) {
  // ... update program in database

  // Revalidate public pages
  revalidatePath('/programs');
  revalidatePath(`/programs/${params.id}`);

  return NextResponse.json({ success: true });
}
```

#### Add revalidation to:

- [ ] Program updates → revalidate `/programs` and `/programs/[slug]`
- [ ] Course updates → revalidate `/admin/courses`
- [ ] Blog posts → revalidate `/blog` and `/blog/[slug]`
- [ ] Success stories → revalidate `/success-stories`

---

## 📝 Implementation Steps

### Step 1: Force-Dynamic Pages (Day 1)

1. Open each file in the "Force-Dynamic" section
2. Add the two export lines at the top (after imports)
3. Save and commit: `git commit -m "Add force-dynamic to [page name]"`

### Step 2: ISR Pages (Day 2)

1. Open each file in the "ISR" section
2. Add the revalidate export at the top
3. Save and commit: `git commit -m "Add ISR revalidation to [page name]"`

### Step 3: API No-Cache Headers (Day 3)

1. Open each API route file
2. Add the cache headers to the response
3. Save and commit: `git commit -m "Add no-cache headers to [api name]"`

### Step 4: Revalidation Hooks (Day 4)

1. Add revalidatePath calls to admin update APIs
2. Test that public pages refresh after admin changes
3. Commit: `git commit -m "Add revalidation hooks to admin APIs"`

### Step 5: Test & Deploy (Day 5)

1. Run `npm run autopilot:vercel:hard-refresh`
2. Test all dashboards load fresh data
3. Test public pages cache properly
4. Verify no stale content

---

## ✅ Verification Checklist

After implementation, verify:

- [ ] LMS dashboard shows real-time data
- [ ] Admin pages show latest changes immediately
- [ ] Student dashboard updates instantly
- [ ] Program holder dashboard is always fresh
- [ ] Public pages load fast (cached)
- [ ] Public pages update within 5 minutes of admin changes
- [ ] No 8-hour-old cache on any dashboard
- [ ] Hard refresh script works from GitHub Actions
- [ ] Hard refresh script works from command line

---

## 🚀 Quick Commands

```bash
# Force new deployment
npm run autopilot:vercel:hard-refresh

# Or via GitHub Actions
# Go to: https://github.com/elevateforhumanity/fix2/actions
# Click: "Autopilot – Vercel Hard Refresh"
# Click: "Run workflow"
```

---

## 📊 Expected Results

**Before:**

- ❌ Dashboards show 8-hour-old data
- ❌ Admin changes don't appear for hours
- ❌ Students see stale course info
- ❌ Program holders see outdated student lists

**After:**

- ✅ Dashboards always show current data
- ✅ Admin changes appear immediately
- ✅ Students see real-time updates
- ✅ Program holders see live student data
- ✅ Public pages still load fast (cached)
- ✅ Can force refresh anytime

---

## 🎯 Success Metrics

- **Dashboard freshness:** < 1 second
- **Public page speed:** < 2 seconds
- **Cache hit rate:** > 80% on public pages
- **Cache hit rate:** 0% on dashboards (always fresh)
- **Deployment time:** < 5 minutes
- **Hard refresh time:** < 10 minutes

---

**Ready to implement? Start with Step 1 and work through systematically!** 🚀
