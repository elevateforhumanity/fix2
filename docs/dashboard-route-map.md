# Dashboard Route Map

**Generated:** Tue Dec 23 23:40:28 UTC 2025  
**Purpose:** Definitive inventory of all dashboard routes, portals, and links

## Summary

- **Canonical Dashboards:** 8 (all have server-side guards)
- **Legacy Dashboards:** 6 (all have redirects)
- **Disabled Dashboards:** 1 (parent portal - no schema)
- **Unknown Dashboards:** 3 (creator, delegate, shop - need investigation)
- **Links to Legacy Routes:** 115 to `/student/dashboard` (need update)

## Canonical Dashboards

| Route | File Path | Role | Auth Guard | Status |
|-------|-----------|------|------------|--------|
| `/admin/dashboard` | `app/admin/dashboard/page.tsx` | `admin` | requireRole | ✅ CANONICAL |
| `/lms/dashboard` | `app/lms/(app)/dashboard/page.tsx` | `student` | requireRole | ✅ CANONICAL |
| `/program-holder/dashboard` | `app/program-holder/dashboard/page.tsx` | `program_holder` | manual | ✅ CANONICAL |
| `/employer/dashboard` | `app/employer/dashboard/page.tsx` | `employer` | requireRole | ✅ CANONICAL |
| `/staff-portal/dashboard` | `app/staff-portal/dashboard/page.tsx` | `staff` | requireRole | ✅ CANONICAL |
| `/instructor/dashboard` | `app/instructor/dashboard/page.tsx` | `instructor` | requireRole | ✅ CANONICAL |
| `/board/dashboard` | `app/board/dashboard/page.tsx` | `board_member` | requireRole | ✅ CANONICAL |
| `/workforce-board/dashboard` | `app/workforce-board/dashboard/page.tsx` | `workforce_board` | requireRole | ✅ CANONICAL |

## Legacy/Duplicate Dashboards

| Route | File Path | Status | Redirect To | Notes |
|-------|-----------|--------|-------------|-------|
| `/portal/student/dashboard` | `app/portal/student/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/lms/dashboard` | Old student portal |
| `/portal/staff/dashboard` | `app/portal/staff/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/staff-portal/dashboard` | Old staff portal |
| `/student/dashboard` | `app/student/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/lms/dashboard` | Duplicate student route |
| `/partner/dashboard` | `app/partner/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/program-holder/dashboard` | Partner alias |
| `/(partner)/partners/dashboard` | `app/(partner)/partners/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/program-holder/dashboard` | Route group variant |
| `/programs/admin/dashboard` | `app/programs/admin/dashboard/page.tsx` | ✅ EXISTS LEGACY | `/admin/dashboard` | Old admin route |
| `/portal/parent/dashboard` | `app/portal/parent/dashboard/page.tsx` | ✅ EXISTS DISABLED | `N/A` | No schema support |

## Portal Routes (Non-Dashboard)

| Route | File Path | Purpose | Status |
|-------|-----------|---------|--------|
| `/portal` | `app/portal/page.tsx` | Portal landing | ✅ ACTIVE |
| `/portals` | `app/portals/page.tsx` | Portal directory | ✅ ACTIVE |
| `/parent-portal` | `app/parent-portal/page.tsx` | Parent landing | ✅ DISABLED |
| `/student-portal` | `app/student-portal/page.tsx` | Student landing | ✅ REDIRECT |
| `/partners/portal` | `app/partners/portal/page.tsx` | Partner landing | ✅ ACTIVE |
| `/program-holder/portal` | `app/program-holder/portal/page.tsx` | Program holder portal | ✅ ACTIVE |

## Special Dashboards

| Route | File Path | Purpose | Status |
|-------|-----------|---------|--------|
| `/dashboard` | `app/dashboard/page.tsx` | Role router | ✅ ACTIVE |
| `/dashboards` | `app/dashboards/page.tsx` | Dashboard directory | ✅ ACTIVE |
| `/creator/dashboard` | `app/creator/dashboard/page.tsx` | Creator role | ✅ UNKNOWN |
| `/delegate/dashboard` | `app/delegate/dashboard/page.tsx` | Delegate role | ✅ UNKNOWN |
| `/shop/dashboard` | `app/shop/dashboard/page.tsx` | Shop management | ✅ UNKNOWN |
| `/admin/compliance-dashboard` | `app/admin/compliance-dashboard/page.tsx` | WIOA compliance | ✅ ACTIVE |

## Links to Legacy Routes (Need Update)

| Legacy Route | Count | Should Link To | Files Affected |
|--------------|-------|----------------|----------------|
| `/student/dashboard` | 115 | `/lms/dashboard` | `app/student/**`, `app/staff-portal/**`, `app/enroll/**`, `app/shop/**` |
| `/portal/student/dashboard` | 0 | `/lms/dashboard` | None (already updated) |
| `/portal/staff/dashboard` | 0 | `/staff-portal/dashboard` | None (already updated) |

**Action Required:** Update 115 links from `/student/dashboard` to `/lms/dashboard`

## Orphaned Routes (No Incoming Links)

| Route | File Path | Status | Recommendation |
|-------|-----------|--------|----------------|
| `/creator/dashboard` | `app/creator/dashboard/page.tsx` | UNKNOWN | Verify role exists in schema or remove |
| `/delegate/dashboard` | `app/delegate/dashboard/page.tsx` | UNKNOWN | Verify role exists in schema or remove |
| `/shop/dashboard` | `app/shop/dashboard/page.tsx` | UNKNOWN | Verify purpose or consolidate into admin |

**Action Required:** Audit these 3 routes for necessity and schema support

## Database Tables Used by Dashboard

| Dashboard | Primary Tables | Scoping |
|-----------|---------------|---------|
| `/admin/dashboard` | `profiles`, `enrollments`, `programs`, `employers`, `job_postings` | Global (after role check) |
| `/lms/dashboard` | `enrollments`, `courses`, `progress`, `certificates` | `user_id = auth.uid()` |
| `/program-holder/dashboard` | `program_holders`, `enrollments`, `students`, `compliance_reports` | `program_holder_id` |
| `/employer/dashboard` | `employers`, `job_postings`, `applications`, `apprenticeships` | `employer_id` |
| `/staff-portal/dashboard` | `profiles`, `enrollments`, `programs` | Support view (staff role) |
| `/instructor/dashboard` | `courses`, `enrollments`, `profiles` | Instructor assignments |
| `/board/dashboard` | Read-only reports | Board member role |
| `/workforce-board/dashboard` | Compliance reports | Workforce board role |
