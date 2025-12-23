# Dashboard Inventory & Architecture Analysis

**Generated:** 2025-12-23  
**Purpose:** Complete mapping of all dashboard routes, components, and data dependencies

---

## Executive Summary

This repository contains **22 distinct dashboard directories** across multiple route segments, with varying levels of implementation, data wiring, and role isolation. The current architecture shows:

- ✅ **Strengths:** State-aware orchestration system, role-based routing, Supabase integration
- ⚠️ **Issues:** Route fragmentation, duplicate/orphaned dashboards, inconsistent navigation patterns
- 🔴 **Critical:** Multiple dashboards for same roles, unclear canonical paths, potential crossed data queries

---

## 1. DASHBOARD ROUTE INVENTORY

### 1.1 Primary Dashboard Routes

| Dashboard          | Current Path                | Status     | Role/Audience     | Data Dependencies                                                                             |
| ------------------ | --------------------------- | ---------- | ----------------- | --------------------------------------------------------------------------------------------- |
| **Main Router**    | `/dashboard`                | ✅ Working | All (router)      | `profiles` table for role detection                                                           |
| **Student (LMS)**  | `/lms/(app)/dashboard`      | ✅ Working | Student           | `profiles`, `enrollments`, `course_progress`, `certifications`, `job_placements`              |
| **Admin**          | `/admin/dashboard`          | ✅ Working | Admin/Super Admin | `profiles`, `enrollments`, `compliance_reports`, `job_postings`, `programs`                   |
| **Program Holder** | `/program-holder/dashboard` | ✅ Working | Program Holder    | `profiles`, `enrollments`, `student_verifications`, `compliance_reports`, `compliance_scores` |
| **Employer**       | `/employer/dashboard`       | ✅ Working | Employer          | `profiles`, `job_postings`, `job_applications`, `apprenticeship_programs`                     |
| **Staff Portal**   | `/staff-portal/dashboard`   | ⚠️ Partial | Staff             | `profiles` (generic query, needs refinement)                                                  |
| **Instructor**     | `/instructor/dashboard`     | ⚠️ Partial | Instructor        | Unknown (needs investigation)                                                                 |

### 1.2 Redirect/Consolidated Routes

| Dashboard          | Current Path                | Status      | Redirects To     | Notes                 |
| ------------------ | --------------------------- | ----------- | ---------------- | --------------------- |
| **Student (Old)**  | `/student/dashboard`        | 🔄 Redirect | `/lms/dashboard` | Consolidated into LMS |
| **Portal Student** | `/portal/student/dashboard` | 🔄 Redirect | `/lms/dashboard` | Duplicate removed     |
| **Portal Staff**   | `/portal/staff/dashboard`   | ❓ Unknown  | Unknown          | Needs investigation   |
| **Portal Parent**  | `/portal/parent/dashboard`  | ❓ Unknown  | Unknown          | Needs investigation   |

### 1.3 Specialized/Nested Dashboards

| Dashboard           | Current Path                       | Status     | Role/Audience   | Notes                         |
| ------------------- | ---------------------------------- | ---------- | --------------- | ----------------------------- |
| **Partner**         | `/partner/dashboard`               | ❓ Unknown | Partner         | Separate from program-holder? |
| **Partners (Alt)**  | `/(partner)/partners/dashboard`    | ❓ Unknown | Partner         | Duplicate route?              |
| **Shop**            | `/shop/dashboard`                  | ❓ Unknown | Unknown         | E-commerce dashboard?         |
| **Creator**         | `/creator/dashboard`               | ❓ Unknown | Content Creator | Course creator portal?        |
| **Delegate**        | `/delegate/dashboard`              | ❓ Unknown | Delegate        | Unknown role                  |
| **Board**           | `/board/dashboard`                 | ❓ Unknown | Board Member    | Governance dashboard?         |
| **Workforce Board** | `/workforce-board/dashboard`       | ❓ Unknown | Workforce Board | Government/oversight?         |
| **Admin Program**   | `/admin/programs/[code]/dashboard` | ❓ Unknown | Admin           | Per-program admin view        |
| **Programs Admin**  | `/programs/admin/dashboard`        | ❓ Unknown | Admin           | Duplicate admin route?        |

### 1.4 Dashboard Progress/Subpages

| Route                    | Parent Dashboard | Status     | Purpose             |
| ------------------------ | ---------------- | ---------- | ------------------- |
| `/dashboard/progress`    | Main             | ❓ Unknown | Progress tracking   |
| `/dashboard/workone`     | Main             | ❓ Unknown | WorkOne integration |
| `/dashboard/recaps`      | Main             | ❓ Unknown | Recap/summary views |
| `/dashboard/recaps/[id]` | Main             | ❓ Unknown | Individual recap    |

### 1.5 API Dashboard Routes

| Route                          | Type | Purpose                       |
| ------------------------------ | ---- | ----------------------------- |
| `/api/cm/dashboard`            | API  | Case management dashboard API |
| `/api/dashboard/student`       | API  | Student dashboard data API    |
| `/api/dashboard/student/goals` | API  | Student goals API             |

### 1.6 Route Group Dashboards

| Route                      | Status     | Purpose               |
| -------------------------- | ---------- | --------------------- |
| `/(dashboard)/org/create`  | ❓ Unknown | Organization creation |
| `/(dashboard)/org/invites` | ❓ Unknown | Organization invites  |

---

## 2. DASHBOARD COMPONENTS INVENTORY

### 2.1 Core Dashboard Components

| Component               | Path                                            | Used By                           | Purpose                                  |
| ----------------------- | ----------------------------------------------- | --------------------------------- | ---------------------------------------- |
| **StateAwareDashboard** | `components/dashboards/StateAwareDashboard.tsx` | Student, Program Holder, Employer | Orchestrated state-based dashboard shell |
| **RoleDashboard**       | `components/dashboards/RoleDashboard.tsx`       | Unknown                           | Role-based dashboard wrapper             |
| **DashboardArchetype**  | `components/archetypes/DashboardArchetype.tsx`  | Unknown                           | Dashboard template/pattern               |
| **DashboardSidebar**    | `components/dashboard/DashboardSidebar.tsx`     | Unknown                           | Sidebar navigation                       |
| **DashboardStatsGrid**  | `components/dashboard/DashboardStatsGrid.tsx`   | Unknown                           | Metrics display                          |
| **DashboardUpload**     | `components/dashboard/DashboardUpload.tsx`      | Unknown                           | File upload widget                       |

### 2.2 Specialized Dashboard Components

| Component                          | Path                                               | Purpose                        |
| ---------------------------------- | -------------------------------------------------- | ------------------------------ |
| **AdminDashboard**                 | `components/admin/AdminDashboard.tsx`              | Admin overview                 |
| **AnalyticsDashboard**             | `components/admin/AnalyticsDashboard.tsx`          | Admin analytics                |
| **WIOAComplianceDashboard**        | `components/admin/WIOAComplianceDashboard.tsx`     | WIOA compliance tracking       |
| **AdminReportingDashboard**        | `components/AdminReportingDashboard.tsx`           | Admin reporting                |
| **LearningAnalyticsDashboard**     | `components/LearningAnalyticsDashboard.tsx`        | Learning metrics               |
| **InstructorPerformanceDashboard** | `components/InstructorPerformanceDashboard.tsx`    | Instructor metrics             |
| **ProgressDashboard**              | `components/ProgressDashboard.tsx`                 | Progress tracking              |
| **ProgressTrackingDashboard**      | `components/ProgressTrackingDashboard.tsx`         | Progress tracking (duplicate?) |
| **ReferralDashboard**              | `components/ReferralDashboard.tsx`                 | Referral tracking              |
| **ModerationDashboard**            | `components/ModerationDashboard.tsx`               | Content moderation             |
| **FERPATrainingDashboard**         | `components/compliance/FERPATrainingDashboard.tsx` | FERPA compliance training      |
| **StudentDashboardAISection**      | `components/student/StudentDashboardAISection.tsx` | AI features for students       |

---

## 3. NAVIGATION & LAYOUT ANALYSIS

### 3.1 Layout Files with Dashboard Context

| Layout                        | Path                                | Provides         | Navigation Component        |
| ----------------------------- | ----------------------------------- | ---------------- | --------------------------- |
| **Admin Layout**              | `app/admin/layout.tsx`              | Sidebar + Header | `AdminNav` component        |
| **LMS Layout**                | `app/lms/(app)/layout.tsx`          | Top nav          | `LMSNavigation` component   |
| **Employer Dashboard Layout** | `app/employer/dashboard/layout.tsx` | Metadata only    | None (needs implementation) |
| **Student Layout**            | `app/student/layout.tsx`            | Unknown          | Unknown                     |
| **Program Holder Layout**     | `app/program-holder/layout.tsx`     | Unknown          | Unknown                     |

### 3.2 Navigation Components

#### AdminNav (`components/AdminNav.tsx`)

**Navigation Structure:**

- Dashboard → `/admin`
- Marketing (Email, Social, Automation)
- Communications (Push, Live Chat)
- HR & Payroll
- Programs (All Programs, Courses)
- Students (All, Onboarding, Attendance, Progress)
- Staff Management
- Program Holders (Partners, MOUs, Portal)
- Documents
- Analytics (Overview, Engagement, Retention, Outcomes)
- Compliance (WIOA Dashboard, Reports)

**Issues:**

- Links to `/admin` not `/admin/dashboard`
- Some links point to non-dashboard routes
- No role-based filtering visible

#### LMSNavigation (`components/lms/LMSNavigation.tsx`)

**Navigation Structure:**

- Dashboard → `/lms/dashboard`
- My Courses → `/lms/courses`
- Certificates → `/lms/certificates`
- Profile → `/lms/profile`

**Status:** ✅ Clean, focused, role-appropriate

---

## 4. DATA DEPENDENCIES & DATABASE WIRING

### 4.1 Core Tables Used by Dashboards

| Table                       | Used By Dashboards             | Purpose                                  |
| --------------------------- | ------------------------------ | ---------------------------------------- |
| **profiles**                | All                            | User identity, role, verification status |
| **enrollments**             | Student, Admin, Program Holder | Course enrollment tracking               |
| **programs**                | Admin, Program Holder          | Program catalog                          |
| **course_progress**         | Student, Admin                 | Learning progress                        |
| **certifications**          | Student, Admin                 | Earned certifications                    |
| **job_postings**            | Employer, Admin                | Job listings                             |
| **job_applications**        | Employer, Admin                | Application tracking                     |
| **job_placements**          | Student, Admin                 | Employment outcomes                      |
| **compliance_reports**      | Program Holder, Admin          | Compliance submissions                   |
| **compliance_scores**       | Program Holder, Admin          | Compliance ratings                       |
| **student_verifications**   | Program Holder                 | Student eligibility checks               |
| **apprenticeship_programs** | Employer                       | Apprenticeship offerings                 |

### 4.2 Dashboard Data Queries

#### Student Dashboard (`/lms/(app)/dashboard/page.tsx`)

```typescript
✅ Real DB Queries:
- profiles (user profile)
- enrollments (with programs join)
- course_progress (progress percentage)
- certifications (earned certs)
- job_placements (employment)

✅ State Machine Integration:
- Uses getStudentState() from lib/orchestration/state-machine.ts
- Enforces progression logic
- Locks sections based on prerequisites
```

#### Admin Dashboard (`/admin/dashboard/page.tsx`)

```typescript
✅ Real DB Queries:
- profiles (students, program holders, employers by role)
- enrollments (active, at-risk, completed counts)
- compliance_reports (overdue reports)
- job_postings (active postings)
- job_placements (placement count)
- programs (total, active)
- compliance_scores (low compliance holders)

✅ Metrics Displayed:
- Total/active/at-risk/completed students
- Program holder verification status
- Employer and job posting counts
- Compliance alerts
```

#### Program Holder Dashboard (`/program-holder/dashboard/page.tsx`)

```typescript
✅ Real DB Queries:
- profiles (verification status)
- enrollments (students by program_holder_id)
- student_verifications (pending verifications)
- compliance_reports (overdue reports)
- compliance_scores (compliance rating)

✅ Gating Logic:
- Checks onboarding status via getProgramHolderOnboardingStatus()
- Redirects to onboarding if incomplete
- Enforces obligation-based workflow

⚠️ Potential Issue:
- enrollments.program_holder_id may not exist in schema
- Needs verification of foreign key relationship
```

#### Employer Dashboard (`/employer/dashboard/page.tsx`)

```typescript
✅ Real DB Queries:
- profiles (verification status)
- job_postings (by employer_id)
- job_applications (pending applications)
- apprenticeship_programs (employer's program)

✅ State Machine Integration:
- Uses getEmployerState() from lib/orchestration/state-machine.ts
- Verification gates all features
- Progressive unlock of hiring tools
```

#### Staff Portal Dashboard (`/staff-portal/dashboard/page.tsx`)

```typescript
⚠️ Weak Implementation:
- Generic profiles query (no specific staff data)
- No staff-specific metrics
- Placeholder hero section
- Needs complete rebuild

❌ Missing:
- Staff role verification
- Staff-specific data queries
- Proper navigation
- Actionable metrics
```

---

## 5. CROSSED DASHBOARDS & CONFLICTS

### 5.1 Identified Conflicts

#### Conflict 1: Multiple Partner/Program Holder Routes

```
/partner/dashboard
/(partner)/partners/dashboard
/program-holder/dashboard
```

**Issue:** Unclear if "partner" and "program-holder" are same role  
**Risk:** Users may access wrong dashboard, data may cross  
**Resolution Needed:** Clarify role taxonomy, consolidate routes

#### Conflict 2: Multiple Admin Dashboard Routes

```
/admin/dashboard
/programs/admin/dashboard
/admin/programs/[code]/dashboard
```

**Issue:** Three different admin dashboard entry points  
**Risk:** Inconsistent navigation, duplicate functionality  
**Resolution Needed:** Define hierarchy (main → program-specific)

#### Conflict 3: Portal vs Direct Routes

```
/student/dashboard → redirects to /lms/dashboard
/portal/student/dashboard → redirects to /lms/dashboard
/portal/staff/dashboard → unknown
/staff-portal/dashboard → active
```

**Issue:** Inconsistent portal naming conventions  
**Risk:** Broken links, user confusion  
**Resolution Needed:** Standardize portal routes

#### Conflict 4: Dashboard vs Dashboards Directory

```
/dashboard (route group with router)
/dashboards (unknown purpose)
```

**Issue:** Singular vs plural naming  
**Risk:** Developer confusion, potential route collision  
**Resolution Needed:** Investigate /dashboards purpose

### 5.2 Orphaned/Unknown Dashboards

| Dashboard                    | Status  | Risk Level | Action Required                   |
| ---------------------------- | ------- | ---------- | --------------------------------- |
| `/shop/dashboard`            | Unknown | Medium     | Investigate purpose or remove     |
| `/creator/dashboard`         | Unknown | Medium     | Verify if used by course creators |
| `/delegate/dashboard`        | Unknown | High       | Unknown role, may be orphaned     |
| `/board/dashboard`           | Unknown | Medium     | Verify board member access        |
| `/workforce-board/dashboard` | Unknown | Medium     | Verify government/oversight role  |
| `/portal/parent/dashboard`   | Unknown | Low        | Parent portal feature?            |

### 5.3 Shared Component Risks

**StateAwareDashboard Component:**

- ✅ Properly designed with props (no hard-coded data)
- ✅ Used by Student, Program Holder, Employer
- ✅ Each dashboard passes its own state machine data

**Potential Risks:**

- Dashboard components in `/components/dashboard/` may have hard-coded queries
- Need to audit: DashboardSidebar, DashboardStatsGrid, DashboardUpload
- Ensure all shared components accept data as props

---

## 6. ROLE-BASED ACCESS CONTROL

### 6.1 Role Detection & Routing

**Main Dashboard Router (`/dashboard/page.tsx`):**

```typescript
✅ Proper Role Routing:
- admin/super_admin/org_admin → /admin/dashboard
- instructor → /instructor/dashboard
- staff → /staff-portal/dashboard
- student (default) → /lms/dashboard

⚠️ Missing Roles:
- program_holder (should route to /program-holder/dashboard)
- employer (should route to /employer/dashboard)
- partner (unclear if different from program_holder)
```

### 6.2 Dashboard-Level Auth Checks

| Dashboard          | Auth Method                                      | Status                |
| ------------------ | ------------------------------------------------ | --------------------- |
| **Student (LMS)**  | `supabase.auth.getUser()`                        | ✅ Basic auth         |
| **Admin**          | `requireAdmin()` helper                          | ✅ Role-based         |
| **Program Holder** | Role check + onboarding gate                     | ✅ Multi-layer        |
| **Employer**       | Role check                                       | ✅ Role-based         |
| **Staff Portal**   | `requireRole(['staff', 'admin', 'super_admin'])` | ✅ Role-based         |
| **Instructor**     | Unknown                                          | ❓ Needs verification |

### 6.3 Missing Role Guards

**Dashboards Needing Auth Verification:**

- `/partner/dashboard`
- `/shop/dashboard`
- `/creator/dashboard`
- `/delegate/dashboard`
- `/board/dashboard`
- `/workforce-board/dashboard`
- `/portal/parent/dashboard`

---

## 7. STATE MACHINE & ORCHESTRATION

### 7.1 State Machine Implementation

**Location:** `lib/orchestration/state-machine.ts`

**Implemented State Functions:**

- ✅ `getStudentState()` - 8 states (not_onboarded → placed)
- ✅ `getProgramHolderState()` - Unknown states (needs investigation)
- ✅ `getEmployerState()` - Unknown states (needs investigation)

**State Machine Features:**

- Dominant action enforcement (one clear next step)
- Section locking based on prerequisites
- Progress percentage calculation
- Alert generation
- Available vs locked sections

### 7.2 Onboarding Gating

**Program Holder:**

- ✅ Uses `getProgramHolderOnboardingStatus()` from `lib/program-holder/onboarding-status.ts`
- ✅ Redirects to onboarding if incomplete
- ✅ Enforces step-by-step progression

**Student:**

- ✅ Orientation completion check
- ✅ Eligibility verification check
- ✅ Enrollment status check
- ✅ Progressive unlock of features

**Employer:**

- ✅ Verification status check
- ✅ Progressive unlock of hiring tools

---

## 8. MISSING FEATURES & GAPS

### 8.1 Dashboard Features Not Implemented

| Dashboard        | Missing Features                                                 |
| ---------------- | ---------------------------------------------------------------- |
| **Staff Portal** | Staff-specific metrics, task management, student oversight tools |
| **Instructor**   | Course management, student progress, grading interface           |
| **Partner**      | Unclear if separate from program-holder                          |
| **Shop**         | E-commerce metrics, order management                             |
| **Creator**      | Course creation tools, content analytics                         |

### 8.2 Navigation Gaps

- ❌ No unified dashboard navigation component (each dashboard has own nav)
- ❌ No breadcrumb navigation
- ❌ No dashboard switcher for multi-role users
- ❌ No "back to main dashboard" link in nested dashboards

### 8.3 Data Gaps

**Missing Tables/Columns (Suspected):**

- `enrollments.program_holder_id` (used by program holder dashboard)
- `enrollments.at_risk` (used by admin dashboard)
- `profiles.orientation_completed` (used by student state machine)
- `profiles.eligibility_verified` (used by student state machine)
- `profiles.verified` (used by program holder/employer dashboards)

**Needs Schema Verification:**

```sql
-- Check if these columns exist
SELECT column_name FROM information_schema.columns
WHERE table_name = 'enrollments'
AND column_name IN ('program_holder_id', 'at_risk');

SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('orientation_completed', 'eligibility_verified', 'verified');
```

---

## 9. RECOMMENDATIONS

### 9.1 Immediate Actions (Critical)

1. **Clarify Role Taxonomy**
   - Document all user roles and their dashboard routes
   - Merge or clearly differentiate partner vs program_holder
   - Update main dashboard router to handle all roles

2. **Audit Unknown Dashboards**
   - Investigate: shop, creator, delegate, board, workforce-board
   - Either implement fully or remove routes
   - Document purpose and data requirements

3. **Verify Database Schema**
   - Check for missing columns used by dashboards
   - Add migrations if columns don't exist
   - Update queries to use actual schema

4. **Fix Staff Portal Dashboard**
   - Implement staff-specific metrics
   - Add proper navigation
   - Wire to staff-relevant data

### 9.2 Short-Term Actions (High Priority)

1. **Consolidate Portal Routes**
   - Standardize naming: `/portal/{role}/dashboard` or `/{role}/dashboard`
   - Remove duplicate routes
   - Update all navigation links

2. **Implement Missing Auth Guards**
   - Add role checks to all unknown dashboards
   - Implement proper error handling
   - Add unauthorized redirects

3. **Create Dashboard Navigation Config**
   - Single source of truth for all dashboard routes
   - Role-based navigation filtering
   - Consistent navigation component

4. **Audit Shared Components**
   - Verify no hard-coded data in shared dashboard components
   - Ensure all components accept data as props
   - Document component usage patterns

### 9.3 Long-Term Actions (Enhancement)

1. **Unified Dashboard Shell**
   - Create consistent layout for all dashboards
   - Shared navigation patterns
   - Consistent metrics display

2. **Dashboard Analytics**
   - Track dashboard usage by role
   - Identify unused features
   - Optimize based on user behavior

3. **Multi-Role Support**
   - Dashboard switcher for users with multiple roles
   - Role-specific views within same dashboard
   - Unified notification system

4. **Progressive Enhancement**
   - Mobile-optimized dashboard views
   - Offline support for critical dashboards
   - Real-time updates via websockets

---

## 10. NEXT STEPS

### Phase 1: Verification (Complete First)

- [ ] Run database schema check for missing columns
- [ ] Test each dashboard route for 404s
- [ ] Verify auth guards on all dashboards
- [ ] Document actual vs expected behavior for unknown dashboards

### Phase 2: Consolidation

- [ ] Merge duplicate routes
- [ ] Standardize portal naming
- [ ] Update main dashboard router
- [ ] Create navigation config file

### Phase 3: Implementation

- [ ] Fix staff portal dashboard
- [ ] Implement or remove unknown dashboards
- [ ] Add missing auth guards
- [ ] Wire all dashboards to real data

### Phase 4: Verification

- [ ] Test all dashboard routes
- [ ] Verify role-based access
- [ ] Check data queries return expected results
- [ ] Confirm no crossed dashboards

---

## APPENDIX A: File Locations

### Dashboard Pages

```
app/dashboard/page.tsx (router)
app/lms/(app)/dashboard/page.tsx (student)
app/admin/dashboard/page.tsx (admin)
app/program-holder/dashboard/page.tsx (program holder)
app/employer/dashboard/page.tsx (employer)
app/staff-portal/dashboard/page.tsx (staff)
app/instructor/dashboard/page.tsx (instructor)
app/partner/dashboard/page.tsx (partner)
app/shop/dashboard/page.tsx (shop)
app/creator/dashboard/page.tsx (creator)
app/delegate/dashboard/page.tsx (delegate)
app/board/dashboard/page.tsx (board)
app/workforce-board/dashboard/page.tsx (workforce board)
app/portal/staff/dashboard/page.tsx (portal staff)
app/portal/student/dashboard/page.tsx (portal student - redirect)
app/portal/parent/dashboard/page.tsx (portal parent)
app/(partner)/partners/dashboard/page.tsx (partners alt)
app/programs/admin/dashboard/page.tsx (programs admin)
app/admin/programs/[code]/dashboard/page.tsx (admin program)
```

### Dashboard Components

```
components/dashboards/StateAwareDashboard.tsx
components/dashboards/RoleDashboard.tsx
components/archetypes/DashboardArchetype.tsx
components/dashboard/DashboardSidebar.tsx
components/dashboard/DashboardStatsGrid.tsx
components/dashboard/DashboardUpload.tsx
components/admin/AdminDashboard.tsx
components/admin/AnalyticsDashboard.tsx
components/admin/WIOAComplianceDashboard.tsx
```

### Navigation Components

```
components/AdminNav.tsx
components/lms/LMSNavigation.tsx
components/AdminHeader.tsx
```

### State Machine

```
lib/orchestration/state-machine.ts
lib/program-holder/onboarding-status.ts
```

---

**End of Inventory**
