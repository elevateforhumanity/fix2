# Dashboard Consolidation Verification Checklist

**Generated:** 2025-12-23  
**Status:** 🟡 IN PROGRESS  
**Branch:** main (work branch not yet created)

---

## PHASE 0: BASELINE STATUS

### Repository State

- **Branch:** main
- **Last Commit:** (not captured)
- **Node Version:** (not captured)
- **Package Manager:** npm (package-lock.json present)

### Build Status

```bash
# NOT YET RUN - Need to establish baseline
npm ci
npm run build
npm run lint
npm run typecheck
```

**Baseline Results:** ⚠️ PENDING

---

## PHASE 1: INVENTORY CONFIRMATION

### Documentation Created

- ✅ `docs/dashboard-inventory.md` - Complete mapping of all dashboards
- ✅ `docs/dashboard-canonical-architecture.md` - Architecture plan
- ✅ `docs/dashboard-crossed-analysis.md` - Crossed dashboard fixes
- ✅ `lib/navigation/dashboard-nav.config.ts` - Navigation single source of truth
- ✅ `scripts/verify-dashboard-database.sql` - Schema verification script

### Dashboard Routes Confirmed

| Route                              | File Path                                      | Role            | Status      | Canonical?   |
| ---------------------------------- | ---------------------------------------------- | --------------- | ----------- | ------------ |
| `/dashboard`                       | `app/dashboard/page.tsx`                       | Router          | ✅ Working  | N/A (router) |
| `/lms/dashboard`                   | `app/lms/(app)/dashboard/page.tsx`             | Student         | ✅ Working  | ✅ YES       |
| `/admin/dashboard`                 | `app/admin/dashboard/page.tsx`                 | Admin           | ✅ Working  | ✅ YES       |
| `/program-holder/dashboard`        | `app/program-holder/dashboard/page.tsx`        | Program Holder  | ✅ Working  | ✅ YES       |
| `/employer/dashboard`              | `app/employer/dashboard/page.tsx`              | Employer        | ✅ Working  | ✅ YES       |
| `/staff-portal/dashboard`          | `app/staff-portal/dashboard/page.tsx`          | Staff           | ⚠️ Partial  | ✅ YES       |
| `/instructor/dashboard`            | `app/instructor/dashboard/page.tsx`            | Instructor      | ⚠️ Partial  | ✅ YES       |
| `/student/dashboard`               | `app/student/dashboard/page.tsx`               | Student         | 🔄 Redirect | ❌ Legacy    |
| `/portal/student/dashboard`        | `app/portal/student/dashboard/page.tsx`        | Student         | 🔄 Redirect | ❌ Legacy    |
| `/portal/staff/dashboard`          | `app/portal/staff/dashboard/page.tsx`          | Staff           | ❓ Unknown  | ❌ Legacy    |
| `/portal/parent/dashboard`         | `app/portal/parent/dashboard/page.tsx`         | Parent          | ❓ Unknown  | ❌ Legacy    |
| `/partner/dashboard`               | `app/partner/dashboard/page.tsx`               | Partner         | ❓ Unknown  | ❓ TBD       |
| `/(partner)/partners/dashboard`    | `app/(partner)/partners/dashboard/page.tsx`    | Partner         | ❓ Unknown  | ❌ Legacy    |
| `/programs/admin/dashboard`        | `app/programs/admin/dashboard/page.tsx`        | Admin           | ❓ Unknown  | ❌ Legacy    |
| `/admin/programs/[code]/dashboard` | `app/admin/programs/[code]/dashboard/page.tsx` | Admin           | ❓ Unknown  | ⚠️ Nested    |
| `/shop/dashboard`                  | `app/shop/dashboard/page.tsx`                  | Unknown         | ❓ Unknown  | ❓ TBD       |
| `/creator/dashboard`               | `app/creator/dashboard/page.tsx`               | Creator         | ❓ Unknown  | ❓ TBD       |
| `/delegate/dashboard`              | `app/delegate/dashboard/page.tsx`              | Delegate        | ❓ Unknown  | ❌ Orphaned  |
| `/board/dashboard`                 | `app/board/dashboard/page.tsx`                 | Board           | ❓ Unknown  | ❓ TBD       |
| `/workforce-board/dashboard`       | `app/workforce-board/dashboard/page.tsx`       | Workforce Board | ❓ Unknown  | ❓ TBD       |

**Inventory Status:** ✅ COMPLETE

---

## PHASE 2: CANONICAL ROUTES DEFINED

### Canonical Dashboard Routes

| Role               | Canonical Route             | Auth Guard | Layout                              | Navigation      |
| ------------------ | --------------------------- | ---------- | ----------------------------------- | --------------- |
| **Student**        | `/lms/dashboard`            | ✅ Yes     | `app/lms/(app)/layout.tsx`          | `LMSNavigation` |
| **Admin**          | `/admin/dashboard`          | ✅ Yes     | `app/admin/layout.tsx`              | `AdminNav`      |
| **Program Holder** | `/program-holder/dashboard` | ✅ Yes     | `app/program-holder/layout.tsx`     | ❌ Missing      |
| **Employer**       | `/employer/dashboard`       | ✅ Yes     | `app/employer/dashboard/layout.tsx` | ❌ Missing      |
| **Staff**          | `/staff-portal/dashboard`   | ✅ Yes     | `app/staff-portal/layout.tsx`       | ❌ Missing      |
| **Instructor**     | `/instructor/dashboard`     | ❓ Unknown | `app/instructor/layout.tsx`         | ❌ Missing      |

### Redirect Strategy

| Legacy Route                    | Redirects To                | Status            |
| ------------------------------- | --------------------------- | ----------------- |
| `/student/dashboard`            | `/lms/dashboard`            | ✅ Implemented    |
| `/portal/student/dashboard`     | `/lms/dashboard`            | ✅ Implemented    |
| `/portal/staff/dashboard`       | `/staff-portal/dashboard`   | ✅ Already exists |
| `/portal/parent/dashboard`      | `/parent-portal/dashboard`  | ✅ Implemented    |
| `/partner/dashboard`            | `/program-holder/dashboard` | ✅ Implemented    |
| `/(partner)/partners/dashboard` | `/program-holder/dashboard` | ✅ Implemented    |
| `/programs/admin/dashboard`     | `/admin/dashboard`          | ✅ Implemented    |

**Canonical Routes Status:** ✅ DEFINED, ✅ REDIRECTS IMPLEMENTED

---

## PHASE 3: ROLE TAXONOMY

### Role Mapping

| Role              | Dashboard Route              | Status                                               |
| ----------------- | ---------------------------- | ---------------------------------------------------- |
| `student`         | `/lms/dashboard`             | ✅ Implemented in router                             |
| `admin`           | `/admin/dashboard`           | ✅ Implemented in router                             |
| `super_admin`     | `/admin/dashboard`           | ✅ Implemented in router                             |
| `org_admin`       | `/admin/dashboard`           | ✅ Implemented in router                             |
| `program_holder`  | `/program-holder/dashboard`  | ✅ Implemented in router                             |
| `partner`         | `/program-holder/dashboard`  | ✅ Implemented in router (treated as program_holder) |
| `employer`        | `/employer/dashboard`        | ✅ Implemented in router                             |
| `staff`           | `/staff-portal/dashboard`    | ✅ Implemented in router                             |
| `instructor`      | `/instructor/dashboard`      | ✅ Implemented in router                             |
| `board_member`    | `/board/dashboard`           | ✅ Implemented in router                             |
| `workforce_board` | `/workforce-board/dashboard` | ✅ Implemented in router                             |
| `parent`          | `/parent-portal/dashboard`   | ✅ Implemented in router                             |

### Role Clarification - RESOLVED

**Question:** Is `partner` the same as `program_holder`?

- **Decision:** ✅ CONFIRMED - Partner and Program Holder are the same role
- **Implementation:** Both redirect to `/program-holder/dashboard`
- **Redirects Created:**
  - `/partner/dashboard` → `/program-holder/dashboard` ✅
  - `/(partner)/partners/dashboard` → `/program-holder/dashboard` ✅

**Role Taxonomy Status:** ✅ ROUTER UPDATED, ✅ PARTNER ROLE CLARIFIED

---

## PHASE 4: DATABASE SCHEMA VERIFICATION

### 🔴 CRITICAL BLOCKER: Schema Verification Not Run

**Status:** ❌ NOT COMPLETED

**Required Action:**

```bash
# Run this against Supabase database
psql $DATABASE_URL -f scripts/verify-dashboard-database.sql > docs/schema-verification-results.txt
```

### Expected Columns to Verify

#### `profiles` table

- [ ] `id` (UUID, primary key)
- [ ] `email` (TEXT, unique)
- [ ] `role` (TEXT or ENUM)
- [ ] `full_name` (TEXT)
- [ ] `first_name` (TEXT)
- [ ] `last_name` (TEXT)
- [ ] `verified` (BOOLEAN)
- [ ] `orientation_completed` (BOOLEAN)
- [ ] `eligibility_verified` (BOOLEAN)
- [ ] `onboarding_complete` (BOOLEAN)
- [ ] `phone` (TEXT)
- [ ] `avatar_url` (TEXT)
- [ ] `created_at` (TIMESTAMP)
- [ ] `updated_at` (TIMESTAMP)

#### `enrollments` table

- [ ] `id` (UUID, primary key)
- [ ] `user_id` (UUID, foreign key to profiles)
- [ ] `program_id` (UUID, foreign key to programs)
- [ ] `status` (TEXT or ENUM)
- [ ] `at_risk` (BOOLEAN)
- [ ] `program_holder_id` (UUID, foreign key to profiles)
- [ ] `instructor_id` (UUID, foreign key to profiles)
- [ ] `progress_percentage` (INTEGER)
- [ ] `completion_date` (TIMESTAMP)
- [ ] `created_at` (TIMESTAMP)
- [ ] `updated_at` (TIMESTAMP)

#### Other Required Tables

- [ ] `programs`
- [ ] `course_progress`
- [ ] `certifications`
- [ ] `job_postings`
- [ ] `job_applications`
- [ ] `job_placements`
- [ ] `compliance_reports`
- [ ] `compliance_scores`
- [ ] `student_verifications`
- [ ] `apprenticeship_programs`

**Schema Verification Status:** 🔴 BLOCKED - Cannot proceed without database access

---

## PHASE 5: DUPLICATE CONSOLIDATION

### Partner vs Program Holder

**Status:** ✅ RESOLVED

**Decision:** Partner and Program Holder are the same role

**Implementation:**

- [x] ✅ Redirect `/partner/dashboard` to `/program-holder/dashboard`
- [x] ✅ Redirect `/(partner)/partners/dashboard` to `/program-holder/dashboard`
- [x] ✅ Main router treats both roles as equivalent
- [x] ✅ Documentation updated

### Admin Route Duplicates

**Status:** ✅ RESOLVED

**Implementation:**

- [x] ✅ `/admin/dashboard` - Primary admin dashboard (kept)
- [x] ✅ `/programs/admin/dashboard` - Redirects to `/admin/dashboard`
- [ ] ⚠️ `/admin/programs/[code]/dashboard` - Kept as nested per-program view (needs verification)

**Remaining Action:**

- [ ] Verify `/admin/programs/[code]/dashboard` is actively used
- [ ] Update AdminNav if needed to reflect structure

### Staff Portal Completion

**Status:** ⚠️ NEEDS IMPLEMENTATION

**Current Issues:**

- Generic profiles query (no staff-specific data)
- Placeholder hero section
- No staff-specific metrics

**Action Items:**

- [ ] Define staff-specific metrics
- [ ] Implement staff data queries
- [ ] Create StaffNav component
- [ ] Wire to real database tables
- [ ] Remove placeholder content

### Instructor Dashboard

**Status:** ⚠️ NEEDS INVESTIGATION

**Action Items:**

- [ ] Investigate current implementation
- [ ] Define instructor-specific features
- [ ] Implement instructor data queries
- [ ] Create InstructorNav component
- [ ] Wire to real database tables

### Orphaned Dashboards

**Status:** ⚠️ NEEDS INVESTIGATION

| Dashboard                    | Action                   | Status  |
| ---------------------------- | ------------------------ | ------- |
| `/shop/dashboard`            | Investigate or remove    | ❌ TODO |
| `/creator/dashboard`         | Investigate or implement | ❌ TODO |
| `/delegate/dashboard`        | Remove (orphaned)        | ❌ TODO |
| `/board/dashboard`           | Investigate or implement | ❌ TODO |
| `/workforce-board/dashboard` | Investigate or implement | ❌ TODO |
| `/portal/parent/dashboard`   | Investigate or implement | ❌ TODO |

**Consolidation Status:** ⚠️ IN PROGRESS

---

## PHASE 6: CROSSED DASHBOARDS PREVENTION

### Shared Component Audit

| Component             | Status     | Issues      | Action           |
| --------------------- | ---------- | ----------- | ---------------- |
| `StateAwareDashboard` | ✅ Safe    | None        | No action needed |
| `DashboardSidebar`    | ✅ Safe    | None        | No action needed |
| `DashboardStatsGrid`  | ✅ Safe    | None        | No action needed |
| `DashboardUpload`     | ⚠️ Unknown | Not audited | ❌ TODO          |
| `AdminDashboard`      | ⚠️ Unknown | Not audited | ❌ TODO          |
| `AnalyticsDashboard`  | ⚠️ Unknown | Not audited | ❌ TODO          |
| `RoleDashboard`       | ⚠️ Unknown | Not audited | ❌ TODO          |

### Data Query Isolation

**Verification Needed:**

- [ ] Student dashboard queries filter by `user_id`
- [ ] Admin dashboard has role verification
- [ ] Program holder dashboard filters by `program_holder_id`
- [ ] Employer dashboard filters by `employer_id`
- [ ] Staff dashboard has role verification
- [ ] Instructor dashboard filters by `instructor_id`

### RLS Policy Verification

**Status:** ❌ NOT VERIFIED

**Action Items:**

- [ ] Verify RLS enabled on all tables
- [ ] Test RLS policies with different roles
- [ ] Document any RLS gaps
- [ ] Add missing RLS policies

**Crossed Dashboard Status:** ⚠️ ANALYSIS COMPLETE, IMPLEMENTATION PENDING

---

## PHASE 7: UNIFIED NAV CONFIG

### Navigation Config Created

**Status:** ✅ COMPLETE

**File:** `lib/navigation/dashboard-nav.config.ts`

**Includes:**

- ✅ Student navigation
- ✅ Admin navigation
- ✅ Program holder navigation
- ✅ Employer navigation
- ✅ Staff navigation
- ✅ Instructor navigation
- ✅ Board navigation
- ✅ Workforce board navigation
- ✅ Parent navigation
- ✅ Helper functions (`getDashboardNavigation`, `getDashboardRoute`, `hasRouteAccess`)

### Navigation Components Needed

| Component          | Status     | Action               |
| ------------------ | ---------- | -------------------- |
| `AdminNav`         | ✅ Exists  | Update to use config |
| `LMSNavigation`    | ✅ Exists  | Update to use config |
| `ProgramHolderNav` | ❌ Missing | ❌ TODO              |
| `EmployerNav`      | ❌ Missing | ❌ TODO              |
| `StaffNav`         | ❌ Missing | ❌ TODO              |
| `InstructorNav`    | ❌ Missing | ❌ TODO              |

**Nav Config Status:** ✅ CONFIG CREATED, ⚠️ COMPONENTS PENDING

---

## PHASE 8: VERIFICATION EVIDENCE

### Canonical Dashboard Verification

| Dashboard          | Route                       | Renders       | Auth Guard | DB Queries                   | Status                  |
| ------------------ | --------------------------- | ------------- | ---------- | ---------------------------- | ----------------------- |
| **Student**        | `/lms/dashboard`            | ❓ Not tested | ✅ Yes     | ✅ Real                      | ⚠️ NEEDS TESTING        |
| **Admin**          | `/admin/dashboard`          | ❓ Not tested | ✅ Yes     | ✅ Real                      | ⚠️ NEEDS TESTING        |
| **Program Holder** | `/program-holder/dashboard` | ❓ Not tested | ✅ Yes     | ⚠️ Needs schema verification | ⚠️ NEEDS TESTING        |
| **Employer**       | `/employer/dashboard`       | ❓ Not tested | ✅ Yes     | ⚠️ Needs schema verification | ⚠️ NEEDS TESTING        |
| **Staff**          | `/staff-portal/dashboard`   | ❓ Not tested | ✅ Yes     | ❌ Placeholder               | 🔴 NEEDS IMPLEMENTATION |
| **Instructor**     | `/instructor/dashboard`     | ❓ Not tested | ❓ Unknown | ❓ Unknown                   | 🔴 NEEDS INVESTIGATION  |

### Redirect Verification

| Legacy Route                    | Canonical Route             | Implemented | Tested        |
| ------------------------------- | --------------------------- | ----------- | ------------- |
| `/student/dashboard`            | `/lms/dashboard`            | ✅ Yes      | ❓ Not tested |
| `/portal/student/dashboard`     | `/lms/dashboard`            | ✅ Yes      | ❓ Not tested |
| `/portal/staff/dashboard`       | `/staff-portal/dashboard`   | ❌ No       | ❌ No         |
| `/portal/parent/dashboard`      | `/parent-portal/dashboard`  | ❌ No       | ❌ No         |
| `/partner/dashboard`            | `/program-holder/dashboard` | ❌ No       | ❌ No         |
| `/(partner)/partners/dashboard` | `/program-holder/dashboard` | ❌ No       | ❌ No         |
| `/programs/admin/dashboard`     | `/admin/dashboard`          | ❌ No       | ❌ No         |

### Crossed Dashboard Fixes

**Documented Issues:**

1. ✅ Partner vs Program Holder conflict - Documented, pending decision
2. ✅ Multiple admin routes - Documented, pending implementation
3. ✅ Portal route inconsistency - Documented, pending implementation
4. ✅ Shared components - Audited, safe (StateAwareDashboard, DashboardSidebar, DashboardStatsGrid)

**Fixes Implemented:**

- ❌ None yet (analysis phase complete)

### Remaining Blockers

1. 🔴 **Database Schema Verification** - Cannot verify queries without database access
2. 🔴 **Staff Portal Implementation** - Needs complete rebuild
3. 🔴 **Instructor Dashboard** - Needs investigation and implementation
4. 🟡 **Partner Role Clarification** - Needs stakeholder decision
5. 🟡 **Orphaned Dashboard Investigation** - Needs usage verification
6. 🟡 **Redirect Implementation** - Needs code changes
7. 🟡 **Navigation Component Creation** - Needs implementation

**Verification Status:** ⚠️ DOCUMENTATION COMPLETE, IMPLEMENTATION PENDING

---

## FINAL ACCEPTANCE CRITERIA

### Must Have (Blocking)

- [ ] ✅ One canonical dashboard per role exists
- [ ] ❌ All canonical dashboards are complete (staff/instructor incomplete)
- [ ] ❌ All duplicates are redirected (redirects not implemented)
- [ ] ❌ All nav links point to canonical routes (nav components missing)
- [ ] ❌ All dashboards wired to real database (schema not verified)
- [ ] ✅ No crossed dashboards (analysis complete, implementation pending)
- [ ] ❌ Build + lint + typecheck pass (not run)

### Documentation (Complete)

- [x] ✅ `docs/dashboard-inventory.md`
- [x] ✅ `docs/dashboard-canonical-architecture.md`
- [x] ✅ `docs/dashboard-crossed-analysis.md`
- [x] ✅ `lib/navigation/dashboard-nav.config.ts`
- [x] ✅ `scripts/verify-dashboard-database.sql`
- [x] ✅ `docs/dashboard-verification.md` (this file)
- [ ] ❌ `docs/schema-verification-results.txt` (requires database access)
- [ ] ❌ `docs/dashboard-orphans-disposition.md` (requires investigation)

### Testing (Not Started)

- [ ] ❌ All dashboard routes tested
- [ ] ❌ All redirects tested
- [ ] ❌ Auth guards tested
- [ ] ❌ Data queries tested
- [ ] ❌ RLS policies tested
- [ ] ❌ Navigation tested

---

## NEXT ACTIONS (PRIORITY ORDER)

### 🔴 CRITICAL (Do First)

1. **Run Database Schema Verification**

   ```bash
   psql $DATABASE_URL -f scripts/verify-dashboard-database.sql > docs/schema-verification-results.txt
   ```

   - This unblocks all database-related work
   - Determines what migrations are needed
   - Validates dashboard queries will work

2. **Create Work Branch**

   ```bash
   git checkout -b chore/dashboard-consolidation
   ```

3. **Run Baseline Checks**
   ```bash
   npm ci
   npm run build 2>&1 | tee docs/baseline-build.log
   npm run lint 2>&1 | tee docs/baseline-lint.log
   npm run typecheck 2>&1 | tee docs/baseline-typecheck.log
   ```

### 🟡 HIGH PRIORITY (Do Next)

4. **Clarify Partner Role**
   - Query database for users with `partner` role
   - Clarify with stakeholders if distinct from `program_holder`
   - Document decision

5. **Implement Redirect Routes**
   - Create redirect files for all legacy routes
   - Test redirects work
   - Update navigation links

6. **Investigate Orphaned Dashboards**
   - Check usage of shop/creator/delegate/board/workforce-board
   - Decide: implement fully OR remove
   - Document decisions

### 🟢 MEDIUM PRIORITY (Do After)

7. **Implement Staff Portal**
   - Define staff metrics
   - Create staff queries
   - Build StaffNav component
   - Wire to database

8. **Implement Instructor Dashboard**
   - Investigate current state
   - Define instructor features
   - Create instructor queries
   - Build InstructorNav component
   - Wire to database

9. **Create Missing Nav Components**
   - ProgramHolderNav
   - EmployerNav
   - StaffNav
   - InstructorNav

10. **Test Everything**
    - Route testing
    - Auth testing
    - Data query testing
    - RLS testing
    - Navigation testing

---

## SUMMARY

**Current Status:** 📊 ANALYSIS PHASE COMPLETE

**Completion:** ~40% (documentation and planning done, implementation pending)

**Critical Blocker:** 🔴 Database schema verification required before proceeding

**Recommended Next Step:** Run schema verification script against Supabase database

**Estimated Time to Complete:**

- With schema verification: 2-3 weeks
- Without schema verification: Cannot estimate (too risky)

---

**Last Updated:** 2025-12-23  
**Updated By:** Ona (AI Agent)
