# Complete Dashboard Inventory

## Summary

**Total Dashboards Found:** 21 active dashboards + 3 API endpoints + 2 without pages

### Dashboard Categories

1. **Student Dashboards** (4)
2. **Admin/Staff Dashboards** (6)
3. **Partner/External Dashboards** (7)
4. **Specialized Dashboards** (4)
5. **API Endpoints** (3)
6. **Incomplete/Missing** (2)

---

## 1. STUDENT DASHBOARDS

### `/lms/dashboard` ✅ PRIMARY STUDENT DASHBOARD

- **File:** `app/lms/(app)/dashboard/page.tsx`
- **URL:** `/lms/dashboard` (route group `(app)` doesn't appear in URL)
- **Auth:** ✓ Protected by `app/lms/(app)/layout.tsx`
- **Purpose:** Main student learning management system dashboard
- **Features:** Course progress, assignments, grades, calendar
- **Status:** ✅ ACTIVE - This is the correct student portal

### `/student/dashboard` ⚠️ DUPLICATE/LEGACY

- **File:** `app/student/dashboard/page.tsx`
- **URL:** `/student/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Legacy student dashboard (may be duplicate)
- **Status:** ⚠️ REVIEW - May need to redirect to `/lms/dashboard`

### `/portal/student/dashboard` ⚠️ DUPLICATE

- **File:** `app/portal/student/dashboard/page.tsx`
- **URL:** `/portal/student/dashboard`
- **Auth:** ✓ Protected by parent layout
- **Purpose:** Another student portal variant
- **Status:** ⚠️ REVIEW - Consolidate with main LMS dashboard

### `/dashboard` ❌ INCOMPLETE

- **File:** `app/dashboard/` (directory exists)
- **URL:** `/dashboard`
- **Auth:** Parent layout exists
- **Purpose:** Unknown - has subdirectories (progress, recaps) but no main page
- **Status:** ❌ MISSING PAGE - Has `/dashboard/progress` and `/dashboard/recaps` but no index

---

## 2. ADMIN/STAFF DASHBOARDS

### `/admin/dashboard` ✅ PRIMARY ADMIN DASHBOARD

- **File:** `app/admin/dashboard/page.tsx`
- **URL:** `/admin/dashboard`
- **Auth:** ✓ Protected by `app/admin/layout.tsx`
- **Purpose:** Main administrative dashboard
- **Features:** User management, analytics, system settings
- **Status:** ✅ ACTIVE

### `/admin/compliance-dashboard` ✅ SPECIALIZED ADMIN

- **File:** `app/admin/compliance-dashboard/page.tsx`
- **URL:** `/admin/compliance-dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Compliance monitoring and reporting
- **Status:** ✅ ACTIVE

### `/admin/programs/[code]/dashboard` ✅ PROGRAM-SPECIFIC

- **File:** `app/admin/programs/[code]/dashboard/page.tsx`
- **URL:** `/admin/programs/{program-code}/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Individual program management dashboard
- **Status:** ✅ ACTIVE

### `/staff-portal/dashboard` ✅ STAFF DASHBOARD

- **File:** `app/staff-portal/dashboard/page.tsx`
- **URL:** `/staff-portal/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Staff member dashboard (non-admin)
- **Status:** ✅ ACTIVE

### `/portal/staff/dashboard` ⚠️ DUPLICATE STAFF

- **File:** `app/portal/staff/dashboard/page.tsx`
- **URL:** `/portal/staff/dashboard`
- **Auth:** ✓ Protected by parent layout
- **Purpose:** Alternative staff portal
- **Status:** ⚠️ REVIEW - May be duplicate of `/staff-portal/dashboard`

### `/programs/admin/dashboard` ✅ PROGRAM ADMIN

- **File:** `app/programs/admin/dashboard/page.tsx`
- **URL:** `/programs/admin/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Program-level administration
- **Status:** ✅ ACTIVE

---

## 3. PARTNER/EXTERNAL DASHBOARDS

### `/workforce-board/dashboard` ✅ WORKFORCE BOARD

- **File:** `app/workforce-board/dashboard/page.tsx`
- **URL:** `/workforce-board/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Workforce development board partner dashboard
- **Status:** ✅ ACTIVE

### `/delegate/dashboard` ✅ DELEGATE PORTAL

- **File:** `app/delegate/dashboard/page.tsx`
- **URL:** `/delegate/dashboard`
- **Auth:** ✓ Protected by `app/delegate/layout.tsx`
- **Purpose:** Delegate/representative dashboard
- **Status:** ✅ ACTIVE

### `/partner/dashboard` ✅ PARTNER PORTAL

- **File:** `app/partner/dashboard/page.tsx`
- **URL:** `/partner/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Training partner dashboard
- **Status:** ✅ ACTIVE

### `/employer/dashboard` ❌ INCOMPLETE

- **File:** `app/employer/dashboard/` (directory exists)
- **URL:** `/employer/dashboard`
- **Auth:** Has layout.tsx but no page
- **Purpose:** Employer partner dashboard
- **Status:** ❌ MISSING PAGE - Layout exists but no page.tsx

### `/board/dashboard` ✅ BOARD MEMBER

- **File:** `app/board/dashboard/page.tsx`
- **URL:** `/board/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Board member dashboard
- **Status:** ✅ ACTIVE

### `/portal/parent/dashboard` ✅ PARENT PORTAL

- **File:** `app/portal/parent/dashboard/page.tsx`
- **URL:** `/portal/parent/dashboard`
- **Auth:** ✓ Protected by parent layout
- **Purpose:** Parent/guardian dashboard for student oversight
- **Status:** ✅ ACTIVE

### `/program-holder/dashboard` ✅ PROGRAM HOLDER

- **File:** `app/program-holder/dashboard/page.tsx`
- **URL:** `/program-holder/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Program license holder dashboard
- **Status:** ✅ ACTIVE

---

## 4. SPECIALIZED DASHBOARDS

### `/instructor/dashboard` ✅ INSTRUCTOR PORTAL

- **File:** `app/instructor/dashboard/page.tsx`
- **URL:** `/instructor/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Instructor/teacher dashboard
- **Features:** Course management, grading, student progress
- **Status:** ✅ ACTIVE

### `/creator/dashboard` ⚠️ CREATOR PORTAL

- **File:** `app/creator/dashboard/page.tsx`
- **URL:** `/creator/dashboard`
- **Auth:** ⚠️ No obvious auth check
- **Purpose:** Content creator dashboard
- **Status:** ⚠️ NEEDS AUTH - Missing authentication

### `/shop/dashboard` ✅ SHOP PORTAL

- **File:** `app/shop/dashboard/page.tsx`
- **URL:** `/shop/dashboard`
- **Auth:** ✓ Has auth check
- **Purpose:** Barber shop/apprenticeship location dashboard
- **Status:** ✅ ACTIVE

### `/(dashboard)/org/...` ✅ ORG MANAGEMENT

- **Files:**
  - `app/(dashboard)/org/create/page.tsx`
  - `app/(dashboard)/org/invites/page.tsx`
- **URLs:** `/org/create`, `/org/invites`
- **Auth:** Route group suggests shared auth
- **Purpose:** Organization creation and management
- **Status:** ✅ ACTIVE

---

## 5. API ENDPOINTS (Not User-Facing)

### `/api/dashboard`

- **File:** `app/api/dashboard/` (directory exists)
- **Purpose:** Dashboard data API endpoint
- **Status:** API route, not a user dashboard

### `/api/cm/dashboard`

- **File:** `app/api/cm/dashboard/` (directory exists)
- **Purpose:** Case manager dashboard API
- **Status:** API route, not a user dashboard

### `/api/dashboard/student`

- **Purpose:** Student dashboard data API
- **Status:** API route

---

## 6. RELATED PAGES (Not Dashboards)

### `/orientation/dashboard-guide`

- **File:** `app/orientation/dashboard-guide/page.tsx`
- **Purpose:** Tutorial/guide for using dashboards
- **Status:** Documentation page, not a dashboard

### `/dashboard/progress`

- **File:** `app/dashboard/progress/page.tsx`
- **Purpose:** Progress tracking page
- **Status:** Sub-page without parent dashboard

### `/dashboard/recaps`

- **File:** `app/dashboard/recaps/page.tsx`
- **Purpose:** Learning recaps/summaries
- **Status:** Sub-page without parent dashboard

---

## ISSUES FOUND

### ❌ Critical Issues

1. **`/employer/dashboard`** - Has layout but no page.tsx
2. **`/dashboard`** - Has subdirectories but no main page
3. **`/creator/dashboard`** - Missing authentication

### ⚠️ Potential Duplicates

1. **Student Dashboards:**
   - `/lms/dashboard` (PRIMARY)
   - `/student/dashboard` (LEGACY?)
   - `/portal/student/dashboard` (DUPLICATE?)

2. **Staff Dashboards:**
   - `/staff-portal/dashboard` (PRIMARY)
   - `/portal/staff/dashboard` (DUPLICATE?)

### 🔄 Redirect Recommendations

All student login/signup should redirect to: **`/lms/dashboard`**

Consider redirecting:

- `/student/dashboard` → `/lms/dashboard`
- `/portal/student/dashboard` → `/lms/dashboard`
- `/portal/staff/dashboard` → `/staff-portal/dashboard`

---

## AUTHENTICATION STATUS

### ✅ Properly Protected (17)

- `/admin/dashboard`
- `/admin/compliance-dashboard`
- `/admin/programs/[code]/dashboard`
- `/staff-portal/dashboard`
- `/programs/admin/dashboard`
- `/workforce-board/dashboard`
- `/delegate/dashboard`
- `/partner/dashboard`
- `/board/dashboard`
- `/portal/parent/dashboard`
- `/portal/staff/dashboard`
- `/portal/student/dashboard`
- `/program-holder/dashboard`
- `/instructor/dashboard`
- `/shop/dashboard`
- `/lms/dashboard`
- `/student/dashboard`

### ⚠️ Missing/Unclear Auth (1)

- `/creator/dashboard` - No obvious auth check

### ❌ No Page to Protect (2)

- `/employer/dashboard` - No page.tsx
- `/dashboard` - No page.tsx

---

## ROLE-BASED ACCESS MATRIX

| Dashboard                    | Student | Instructor | Admin | Staff | Partner | Employer | Parent |
| ---------------------------- | ------- | ---------- | ----- | ----- | ------- | -------- | ------ |
| `/lms/dashboard`             | ✓       |            |       |       |         |          |        |
| `/student/dashboard`         | ✓       |            |       |       |         |          |        |
| `/instructor/dashboard`      |         | ✓          |       |       |         |          |        |
| `/admin/dashboard`           |         |            | ✓     |       |         |          |        |
| `/staff-portal/dashboard`    |         |            |       | ✓     |         |          |        |
| `/partner/dashboard`         |         |            |       |       | ✓       |          |        |
| `/employer/dashboard`        |         |            |       |       |         | ✓        |        |
| `/portal/parent/dashboard`   |         |            |       |       |         |          | ✓      |
| `/workforce-board/dashboard` |         |            |       |       | ✓       |          |        |
| `/delegate/dashboard`        |         |            |       |       | ✓       |          |        |
| `/board/dashboard`           |         |            | ✓     |       |         |          |        |
| `/shop/dashboard`            |         |            |       |       | ✓       | ✓        |        |
| `/program-holder/dashboard`  |         |            |       |       | ✓       |          |        |
| `/creator/dashboard`         |         | ✓          |       |       |         |          |        |

---

## RECOMMENDATIONS

### Immediate Actions

1. **Fix `/employer/dashboard`** - Create page.tsx or remove directory
2. **Fix `/dashboard`** - Create main page or move subdirectories
3. **Add auth to `/creator/dashboard`**
4. **Consolidate student dashboards** - Pick one primary, redirect others
5. **Update all login/signup redirects** - Use `/lms/dashboard` for students

### Code Changes Needed

```typescript
// Update login redirects
if (profile?.role === 'student') {
  router.push('/lms/dashboard'); // ✓ Correct
}

// Add redirects for legacy routes
// app/student/dashboard/page.tsx
redirect('/lms/dashboard');

// app/portal/student/dashboard/page.tsx
redirect('/lms/dashboard');
```

### Documentation Needed

1. Create dashboard access guide for each role
2. Document which dashboard each user type should use
3. Update onboarding to point to correct dashboards

---

## TESTING CHECKLIST

- [ ] Test student login → redirects to `/lms/dashboard`
- [ ] Test admin login → redirects to `/admin/dashboard`
- [ ] Test instructor login → redirects to `/instructor/dashboard`
- [ ] Verify all 17 dashboards are accessible with correct role
- [ ] Verify `/creator/dashboard` has auth
- [ ] Fix or remove `/employer/dashboard`
- [ ] Fix or remove `/dashboard`
- [ ] Test legacy redirects work
- [ ] Verify no 404s on dashboard routes
- [ ] Check mobile responsiveness of all dashboards

---

## FILES TO REVIEW

### High Priority

1. `app/employer/dashboard/layout.tsx` - Has layout but no page
2. `app/creator/dashboard/page.tsx` - Missing auth
3. `app/dashboard/` - Incomplete structure
4. `app/student/dashboard/page.tsx` - Potential duplicate
5. `app/portal/student/dashboard/page.tsx` - Potential duplicate

### Medium Priority

6. `app/portal/staff/dashboard/page.tsx` - Potential duplicate
7. All dashboard layouts - Verify consistent auth patterns
8. Login/signup flows - Ensure correct redirects

---

**Last Updated:** 2025-12-17
**Total Dashboards:** 21 active + 2 incomplete + 3 API endpoints = 26 total
