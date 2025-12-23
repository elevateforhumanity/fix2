# Dashboard Canonical Architecture Plan

**Generated:** 2025-12-23  
**Purpose:** Define the single source of truth for dashboard routing and architecture

---

## 1. CANONICAL ROUTING STRUCTURE

### 1.1 Proposed Architecture

All dashboards will be consolidated under `/dashboard/*` with role-based routing:

```
/dashboard                          → Main router (redirects by role)
/dashboard/student                  → Student dashboard (replaces /lms/dashboard)
/dashboard/admin                    → Admin dashboard (replaces /admin/dashboard)
/dashboard/program-holder           → Program holder dashboard
/dashboard/employer                 → Employer dashboard
/dashboard/staff                    → Staff dashboard
/dashboard/instructor               → Instructor dashboard
/dashboard/partner                  → Partner dashboard (if different from program-holder)
/dashboard/board                    → Board member dashboard
/dashboard/workforce-board          → Workforce board dashboard
/dashboard/parent                   → Parent dashboard
```

### 1.2 Specialized Dashboards (Keep Separate)

These dashboards serve specific functions and should remain outside `/dashboard/*`:

```
/admin/*                            → Admin portal with full navigation (keep as-is)
/lms/*                              → Learning management system (keep as-is)
/shop/dashboard                     → E-commerce dashboard (if needed)
/creator/dashboard                  → Content creator dashboard (if needed)
```

### 1.3 Deprecated Routes (Redirect or Remove)

```
/student/dashboard                  → Redirect to /dashboard/student
/portal/student/dashboard           → Redirect to /dashboard/student
/portal/staff/dashboard             → Redirect to /dashboard/staff
/portal/parent/dashboard            → Redirect to /dashboard/parent
/staff-portal/dashboard             → Redirect to /dashboard/staff
/(partner)/partners/dashboard       → Redirect to /dashboard/partner
/programs/admin/dashboard           → Redirect to /admin/dashboard
/delegate/dashboard                 → Remove (orphaned)
```

---

## 2. DECISION: KEEP CURRENT ARCHITECTURE

**After analysis, the current architecture is actually BETTER than consolidation.**

### 2.1 Why Current Architecture Works

1. **Clear Role Separation**
   - `/lms/*` = Student learning environment (focused, distraction-free)
   - `/admin/*` = Admin portal (full system access)
   - `/program-holder/*` = Program holder obligations
   - `/employer/*` = Employer hiring tools
   - Each has its own layout, navigation, and context

2. **Different Navigation Patterns**
   - Students need: Dashboard, Courses, Certificates, Profile
   - Admins need: 100+ admin functions across categories
   - Program holders need: Students, Reports, Compliance, Documents
   - Consolidating would create navigation chaos

3. **Different Layouts**
   - LMS: Top navigation bar (clean, student-friendly)
   - Admin: Sidebar navigation (dense, functional)
   - Program Holder: State-aware dashboard (obligation-driven)
   - Employer: State-aware dashboard (verification-gated)

4. **State Machine Integration**
   - Current dashboards use role-specific state machines
   - Each role has different progression logic
   - Consolidation would complicate state management

### 2.2 Revised Plan: Fix, Don't Consolidate

**Keep the current structure but:**

1. Remove duplicate/orphaned routes
2. Standardize portal naming
3. Fix the main `/dashboard` router
4. Implement missing dashboards
5. Ensure no crossed data queries

---

## 3. CANONICAL DASHBOARD MAPPING

### 3.1 Primary Dashboards (Keep As-Is)

| Role               | Canonical Route             | Status       | Layout Type             |
| ------------------ | --------------------------- | ------------ | ----------------------- |
| **Student**        | `/lms/dashboard`            | ✅ Keep      | Top nav (LMSNavigation) |
| **Admin**          | `/admin/dashboard`          | ✅ Keep      | Sidebar (AdminNav)      |
| **Program Holder** | `/program-holder/dashboard` | ✅ Keep      | State-aware             |
| **Employer**       | `/employer/dashboard`       | ✅ Keep      | State-aware             |
| **Staff**          | `/staff-portal/dashboard`   | ⚠️ Fix       | Needs implementation    |
| **Instructor**     | `/instructor/dashboard`     | ⚠️ Implement | Needs full build        |

### 3.2 Router Dashboard

**Route:** `/dashboard/page.tsx`  
**Purpose:** Role-based routing to appropriate dashboard  
**Status:** ⚠️ Needs update

**Current Implementation:**

```typescript
switch (profile?.role) {
  case 'admin':
  case 'super_admin':
  case 'org_admin':
    redirect('/admin/dashboard');
  case 'instructor':
    redirect('/instructor/dashboard');
  case 'staff':
    redirect('/staff-portal/dashboard');
  case 'student':
  default:
    redirect('/lms/dashboard');
}
```

**Missing Roles:**

- `program_holder` → should redirect to `/program-holder/dashboard`
- `employer` → should redirect to `/employer/dashboard`
- `partner` → needs clarification (same as program_holder?)
- `board_member` → should redirect to `/board/dashboard` (if implemented)
- `workforce_board` → should redirect to `/workforce-board/dashboard` (if implemented)
- `parent` → should redirect to `/parent-portal/dashboard` (if implemented)

### 3.3 Redirect Routes (Maintain for Backward Compatibility)

| Old Route                       | Redirect To                                         | Priority                |
| ------------------------------- | --------------------------------------------------- | ----------------------- |
| `/student/dashboard`            | `/lms/dashboard`                                    | ✅ Already done         |
| `/portal/student/dashboard`     | `/lms/dashboard`                                    | ✅ Already done         |
| `/portal/staff/dashboard`       | `/staff-portal/dashboard`                           | 🔴 Needs implementation |
| `/portal/parent/dashboard`      | `/parent-portal/dashboard`                          | 🔴 Needs implementation |
| `/(partner)/partners/dashboard` | `/partner/dashboard` or `/program-holder/dashboard` | 🔴 Needs clarification  |

### 3.4 Specialized Dashboards (Investigate or Remove)

| Route                        | Decision       | Rationale                     |
| ---------------------------- | -------------- | ----------------------------- |
| `/shop/dashboard`            | ❓ Investigate | May be e-commerce feature     |
| `/creator/dashboard`         | ❓ Investigate | May be course creator portal  |
| `/delegate/dashboard`        | 🗑️ Remove      | Unknown role, likely orphaned |
| `/board/dashboard`           | ❓ Investigate | May be board member oversight |
| `/workforce-board/dashboard` | ❓ Investigate | May be government oversight   |

### 3.5 Nested Dashboards (Keep As-Is)

| Route                              | Purpose                   | Parent       |
| ---------------------------------- | ------------------------- | ------------ |
| `/dashboard/progress`              | WorkOne progress tracking | Main router  |
| `/dashboard/workone`               | WorkOne oversight         | Main router  |
| `/dashboard/recaps`                | Recap summaries           | Main router  |
| `/admin/programs/[code]/dashboard` | Per-program admin view    | Admin portal |

---

## 4. LAYOUT ARCHITECTURE

### 4.1 Layout Hierarchy

```
app/
├── layout.tsx                          # Root layout (global)
├── dashboard/
│   └── page.tsx                        # Router only (no layout)
├── lms/(app)/
│   ├── layout.tsx                      # LMS layout (top nav)
│   └── dashboard/page.tsx              # Student dashboard
├── admin/
│   ├── layout.tsx                      # Admin layout (sidebar)
│   └── dashboard/page.tsx              # Admin dashboard
├── program-holder/
│   ├── layout.tsx                      # Program holder layout (TBD)
│   └── dashboard/page.tsx              # Program holder dashboard
├── employer/
│   ├── dashboard/
│   │   ├── layout.tsx                  # Employer dashboard layout
│   │   └── page.tsx                    # Employer dashboard
└── staff-portal/
    ├── layout.tsx                      # Staff portal layout (TBD)
    └── dashboard/page.tsx              # Staff dashboard
```

### 4.2 Layout Components

| Layout             | Component                           | Navigation           | Status                  |
| ------------------ | ----------------------------------- | -------------------- | ----------------------- |
| **LMS**            | `app/lms/(app)/layout.tsx`          | `LMSNavigation`      | ✅ Implemented          |
| **Admin**          | `app/admin/layout.tsx`              | `AdminNav`           | ✅ Implemented          |
| **Program Holder** | `app/program-holder/layout.tsx`     | ❓ Unknown           | ⚠️ Needs investigation  |
| **Employer**       | `app/employer/dashboard/layout.tsx` | None (metadata only) | ⚠️ Needs implementation |
| **Staff Portal**   | `app/staff-portal/layout.tsx`       | ❓ Unknown           | ⚠️ Needs investigation  |
| **Instructor**     | `app/instructor/layout.tsx`         | ❓ Unknown           | ⚠️ Needs investigation  |

### 4.3 Shared Dashboard Shell

**Component:** `components/dashboards/StateAwareDashboard.tsx`

**Used By:**

- Student dashboard (`/lms/dashboard`)
- Program holder dashboard (`/program-holder/dashboard`)
- Employer dashboard (`/employer/dashboard`)

**Features:**

- Dominant action banner (cannot be missed)
- Progress bar
- Alert system
- Section locking
- State-aware content

**Status:** ✅ Well-designed, properly accepts props

---

## 5. NAVIGATION ARCHITECTURE

### 5.1 Navigation Config Pattern

**Problem:** Each dashboard has its own navigation, no single source of truth

**Solution:** Create role-based navigation configs

**Proposed Structure:**

```typescript
// lib/navigation/dashboard-nav.config.ts

export const dashboardNavigation = {
  student: [
    { href: '/lms/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/lms/courses', label: 'My Courses', icon: BookOpen },
    { href: '/lms/certificates', label: 'Certificates', icon: Award },
    { href: '/lms/profile', label: 'Profile', icon: User },
  ],

  admin: [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    {
      name: 'Programs',
      icon: BookOpen,
      children: [
        { name: 'All Programs', href: '/admin/programs' },
        { name: 'Courses', href: '/admin/courses' },
      ],
    },
    // ... rest of admin nav
  ],

  program_holder: [
    {
      href: '/program-holder/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    { href: '/program-holder/students', label: 'Students', icon: Users },
    { href: '/program-holder/reports', label: 'Reports', icon: FileText },
    { href: '/program-holder/compliance', label: 'Compliance', icon: Shield },
  ],

  employer: [
    { href: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/employer/jobs', label: 'Job Postings', icon: Briefcase },
    { href: '/employer/candidates', label: 'Candidates', icon: Users },
    {
      href: '/employer/apprenticeships',
      label: 'Apprenticeships',
      icon: GraduationCap,
    },
  ],

  staff: [
    {
      href: '/staff-portal/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    { href: '/staff-portal/students', label: 'Students', icon: Users },
    { href: '/staff-portal/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/staff-portal/reports', label: 'Reports', icon: FileText },
  ],

  instructor: [
    {
      href: '/instructor/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    { href: '/instructor/courses', label: 'My Courses', icon: BookOpen },
    { href: '/instructor/students', label: 'Students', icon: Users },
    { href: '/instructor/grading', label: 'Grading', icon: ClipboardCheck },
  ],
};

export function getDashboardNavigation(role: string) {
  return dashboardNavigation[role] || dashboardNavigation.student;
}
```

### 5.2 Navigation Components to Create

| Component          | Purpose                   | Used By               |
| ------------------ | ------------------------- | --------------------- |
| `ProgramHolderNav` | Program holder navigation | Program holder layout |
| `EmployerNav`      | Employer navigation       | Employer layout       |
| `StaffNav`         | Staff navigation          | Staff portal layout   |
| `InstructorNav`    | Instructor navigation     | Instructor layout     |

**Pattern:** Follow `AdminNav.tsx` and `LMSNavigation.tsx` patterns

---

## 6. DATABASE SCHEMA REQUIREMENTS

### 6.1 Required Columns in `profiles` Table

Based on dashboard usage, these columns are required:

```sql
-- Core identity
id UUID PRIMARY KEY
email TEXT UNIQUE NOT NULL
full_name TEXT
first_name TEXT
last_name TEXT

-- Role and permissions
role TEXT NOT NULL CHECK (role IN (
  'student',
  'instructor',
  'staff',
  'admin',
  'super_admin',
  'org_admin',
  'program_holder',
  'employer',
  'partner',
  'board_member',
  'workforce_board',
  'parent'
))

-- Verification and onboarding
verified BOOLEAN DEFAULT false
orientation_completed BOOLEAN DEFAULT false
eligibility_verified BOOLEAN DEFAULT false
onboarding_complete BOOLEAN DEFAULT false

-- Contact
phone TEXT
address TEXT
city TEXT
state TEXT
zip_code TEXT

-- Metadata
avatar_url TEXT
bio TEXT
metadata JSONB DEFAULT '{}'::jsonb

-- Timestamps
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
last_login_at TIMESTAMP WITH TIME ZONE
```

### 6.2 Required Columns in `enrollments` Table

```sql
-- Core enrollment
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
program_id UUID REFERENCES programs(id)

-- Status tracking
status TEXT CHECK (status IN ('pending', 'active', 'completed', 'withdrawn', 'suspended'))
at_risk BOOLEAN DEFAULT false

-- Relationships
program_holder_id UUID REFERENCES profiles(id)  -- Links to program holder
instructor_id UUID REFERENCES profiles(id)      -- Assigned instructor

-- Progress
progress_percentage INTEGER DEFAULT 0
completion_date TIMESTAMP WITH TIME ZONE

-- Timestamps
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

### 6.3 Schema Verification Needed

**Run this query to check for missing columns:**

```sql
-- Check profiles table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN (
  'role',
  'verified',
  'orientation_completed',
  'eligibility_verified',
  'onboarding_complete',
  'first_name',
  'last_name'
)
ORDER BY column_name;

-- Check enrollments table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'enrollments'
AND column_name IN (
  'at_risk',
  'program_holder_id',
  'instructor_id',
  'progress_percentage'
)
ORDER BY column_name;
```

---

## 7. IMPLEMENTATION PLAN

### 7.1 Phase 1: Verification & Cleanup (Week 1)

**Priority: Critical**

1. **Database Schema Verification**
   - [ ] Run schema verification queries
   - [ ] Document missing columns
   - [ ] Create migration for missing columns
   - [ ] Test migrations in development

2. **Route Audit**
   - [ ] Test each dashboard route for 404s
   - [ ] Verify auth guards work
   - [ ] Document actual behavior of unknown dashboards
   - [ ] Identify truly orphaned routes

3. **Main Router Fix**
   - [ ] Update `/dashboard/page.tsx` to handle all roles
   - [ ] Add missing role cases
   - [ ] Add error handling for unknown roles
   - [ ] Test role-based routing

4. **Remove Orphaned Routes**
   - [ ] Remove `/delegate/dashboard` (if confirmed orphaned)
   - [ ] Remove any other confirmed orphaned routes
   - [ ] Update any links pointing to removed routes

### 7.2 Phase 2: Fix Existing Dashboards (Week 2)

**Priority: High**

1. **Staff Portal Dashboard**
   - [ ] Investigate current layout
   - [ ] Design staff-specific metrics
   - [ ] Implement staff data queries
   - [ ] Create StaffNav component
   - [ ] Wire to real data
   - [ ] Test with staff role

2. **Instructor Dashboard**
   - [ ] Investigate current implementation
   - [ ] Design instructor metrics (courses, students, grading)
   - [ ] Implement instructor data queries
   - [ ] Create InstructorNav component
   - [ ] Wire to real data
   - [ ] Test with instructor role

3. **Program Holder Layout**
   - [ ] Check if layout exists
   - [ ] Create ProgramHolderNav component
   - [ ] Implement navigation
   - [ ] Test navigation

4. **Employer Layout**
   - [ ] Create EmployerNav component
   - [ ] Implement navigation
   - [ ] Test navigation

### 7.3 Phase 3: Investigate Unknown Dashboards (Week 3)

**Priority: Medium**

1. **Partner Dashboard**
   - [ ] Clarify if "partner" is same as "program_holder"
   - [ ] If different: document role differences
   - [ ] If same: redirect to program-holder dashboard
   - [ ] Update role taxonomy documentation

2. **Shop Dashboard**
   - [ ] Investigate if e-commerce feature is active
   - [ ] If active: implement fully
   - [ ] If inactive: remove route
   - [ ] Document decision

3. **Creator Dashboard**
   - [ ] Investigate if course creator feature is active
   - [ ] If active: implement fully
   - [ ] If inactive: remove route
   - [ ] Document decision

4. **Board Dashboards**
   - [ ] Investigate board member dashboard purpose
   - [ ] Investigate workforce board dashboard purpose
   - [ ] If needed: implement fully
   - [ ] If not needed: remove routes
   - [ ] Document decisions

5. **Parent Dashboard**
   - [ ] Investigate parent portal feature
   - [ ] If active: implement fully
   - [ ] If inactive: remove route
   - [ ] Document decision

### 7.4 Phase 4: Navigation Consolidation (Week 4)

**Priority: Medium**

1. **Create Navigation Config**
   - [ ] Create `lib/navigation/dashboard-nav.config.ts`
   - [ ] Define navigation for each role
   - [ ] Export helper functions
   - [ ] Document usage

2. **Create Missing Nav Components**
   - [ ] Create ProgramHolderNav
   - [ ] Create EmployerNav
   - [ ] Create StaffNav
   - [ ] Create InstructorNav
   - [ ] Follow AdminNav pattern

3. **Update Layouts**
   - [ ] Update program-holder layout to use ProgramHolderNav
   - [ ] Update employer layout to use EmployerNav
   - [ ] Update staff-portal layout to use StaffNav
   - [ ] Update instructor layout to use InstructorNav

### 7.5 Phase 5: Testing & Verification (Week 5)

**Priority: Critical**

1. **Role-Based Testing**
   - [ ] Test student dashboard (all states)
   - [ ] Test admin dashboard (all metrics)
   - [ ] Test program holder dashboard (all states)
   - [ ] Test employer dashboard (all states)
   - [ ] Test staff dashboard
   - [ ] Test instructor dashboard

2. **Navigation Testing**
   - [ ] Test all navigation links work
   - [ ] Test role-based navigation filtering
   - [ ] Test active state highlighting
   - [ ] Test mobile navigation

3. **Data Query Testing**
   - [ ] Verify no crossed dashboards
   - [ ] Verify all queries use correct user_id/role filters
   - [ ] Verify RLS policies work
   - [ ] Test with multiple roles

4. **Auth Testing**
   - [ ] Test unauthenticated access (should redirect to login)
   - [ ] Test wrong role access (should redirect to unauthorized)
   - [ ] Test multi-role users (if supported)
   - [ ] Test session expiration

---

## 8. SUCCESS CRITERIA

### 8.1 Functional Requirements

- ✅ All dashboard routes return 200 (no 404s)
- ✅ All dashboards have proper auth guards
- ✅ All dashboards query real database data
- ✅ No crossed dashboards (each role sees only their data)
- ✅ Main router handles all roles correctly
- ✅ All navigation links work
- ✅ All dashboards have proper layouts

### 8.2 Code Quality Requirements

- ✅ No hard-coded data in shared components
- ✅ All components accept data as props
- ✅ Consistent error handling
- ✅ Proper TypeScript types
- ✅ No console errors in browser
- ✅ No SQL errors in logs

### 8.3 User Experience Requirements

- ✅ Clear navigation for each role
- ✅ Obvious next actions (dominant action pattern)
- ✅ Proper loading states
- ✅ Helpful error messages
- ✅ Mobile-responsive layouts
- ✅ Consistent design patterns

### 8.4 Documentation Requirements

- ✅ Dashboard inventory complete
- ✅ Canonical architecture documented
- ✅ Navigation config documented
- ✅ Database schema documented
- ✅ Verification checklist complete
- ✅ All decisions documented

---

## 9. RISK MITIGATION

### 9.1 Breaking Changes

**Risk:** Changing routes breaks existing links

**Mitigation:**

- Keep old routes as redirects
- Update all internal links
- Add deprecation warnings
- Communicate changes to users

### 9.2 Data Access Issues

**Risk:** Wrong role sees wrong data

**Mitigation:**

- Test RLS policies thoroughly
- Add role checks in queries
- Use user_id filters consistently
- Audit all data queries

### 9.3 Performance Issues

**Risk:** Dashboard queries are slow

**Mitigation:**

- Add database indexes
- Use count queries for metrics
- Implement caching where appropriate
- Monitor query performance

### 9.4 State Machine Complexity

**Risk:** State machine logic becomes unmaintainable

**Mitigation:**

- Document all states clearly
- Keep state transitions simple
- Test all state paths
- Add state visualization tools

---

## 10. NEXT STEPS

1. **Review this architecture plan** with team
2. **Get approval** on keeping current structure vs consolidation
3. **Run database schema verification** queries
4. **Start Phase 1** (Verification & Cleanup)
5. **Create verification checklist** document

---

**End of Architecture Plan**
