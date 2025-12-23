# Dashboard Crossed Analysis & Fixes

**Generated:** 2025-12-23  
**Purpose:** Identify and document fixes for crossed dashboards and route collisions

---

## 1. CROSSED DASHBOARD ANALYSIS

### 1.1 What is a "Crossed Dashboard"?

A crossed dashboard occurs when:

1. **Route collision:** Multiple routes serve the same purpose
2. **Data leakage:** One dashboard queries data meant for another role
3. **Shared state bugs:** Components share state causing wrong data to render
4. **Hard-coded queries:** Shared components have hard-coded table/role filters

### 1.2 Identified Crossed Dashboards

#### ❌ CONFLICT 1: Partner vs Program Holder

**Routes:**

- `/partner/dashboard`
- `/(partner)/partners/dashboard`
- `/program-holder/dashboard`

**Issue:**

- Unclear if "partner" and "program_holder" are the same role
- Three different routes for potentially same functionality
- Main router treats them as same (both redirect to `/program-holder/dashboard`)

**Risk Level:** 🔴 HIGH

**Impact:**

- Users may access wrong dashboard
- Navigation links may be inconsistent
- Data queries may use wrong role filter

**Resolution:**

```typescript
// Decision needed: Are these the same role?

// Option 1: Same role - consolidate
// Keep: /program-holder/dashboard
// Redirect: /partner/dashboard → /program-holder/dashboard
// Remove: /(partner)/partners/dashboard

// Option 2: Different roles - separate
// Keep both with distinct data queries
// Update main router to handle separately
// Document role differences
```

**Recommended Action:**

1. Clarify with stakeholders if partner ≠ program_holder
2. If same: implement redirects and remove duplicate routes
3. If different: implement separate dashboards with distinct data queries

---

#### ❌ CONFLICT 2: Multiple Admin Dashboard Entry Points

**Routes:**

- `/admin/dashboard` (primary)
- `/programs/admin/dashboard` (unknown purpose)
- `/admin/programs/[code]/dashboard` (per-program view)

**Issue:**

- Three different admin dashboard routes
- Unclear hierarchy and purpose
- May cause navigation confusion

**Risk Level:** 🟡 MEDIUM

**Impact:**

- Inconsistent navigation patterns
- Users may not find correct admin view
- Potential duplicate functionality

**Resolution:**

```typescript
// Recommended structure:
// /admin/dashboard - Main admin overview
// /admin/programs/[code]/dashboard - Per-program admin view (nested)
// /programs/admin/dashboard - REMOVE (duplicate)

// Implementation:
// 1. Keep /admin/dashboard as main entry
// 2. Keep /admin/programs/[code]/dashboard for program-specific views
// 3. Remove /programs/admin/dashboard
// 4. Update any links pointing to removed route
```

**Recommended Action:**

1. Verify `/programs/admin/dashboard` is not actively used
2. Remove route if unused
3. Update navigation to use `/admin/dashboard` consistently

---

#### ❌ CONFLICT 3: Portal Route Inconsistency

**Routes:**

- `/student/dashboard` → redirects to `/lms/dashboard` ✅
- `/portal/student/dashboard` → redirects to `/lms/dashboard` ✅
- `/portal/staff/dashboard` → unknown destination ❓
- `/staff-portal/dashboard` → active ✅
- `/portal/parent/dashboard` → unknown destination ❓

**Issue:**

- Inconsistent portal naming conventions
- Some use `/portal/{role}`, others use `/{role}-portal`
- Unclear which is canonical

**Risk Level:** 🟡 MEDIUM

**Impact:**

- Broken links if routes not properly redirected
- User confusion about correct URL
- SEO issues with duplicate content

**Resolution:**

```typescript
// Standardize on: /{role}-portal/dashboard pattern
// Canonical routes:
// - /lms/dashboard (student - special case for LMS branding)
// - /staff-portal/dashboard
// - /parent-portal/dashboard

// Redirects needed:
// - /portal/staff/dashboard → /staff-portal/dashboard
// - /portal/parent/dashboard → /parent-portal/dashboard
// - /portal/student/dashboard → /lms/dashboard (already done)
```

**Recommended Action:**

1. Implement redirect routes for `/portal/*` paths
2. Update all internal links to use canonical routes
3. Add deprecation notices to old routes

---

#### ✅ NO CONFLICT: Shared Dashboard Components

**Components Checked:**

- `StateAwareDashboard` - ✅ Accepts all data as props
- `DashboardSidebar` - ✅ Accepts all data as props
- `DashboardStatsGrid` - ✅ Accepts all data as props
- `DashboardUpload` - ✅ Likely accepts data as props (not verified)

**Status:** ✅ SAFE

**Reason:**

- All checked components properly accept data as props
- No hard-coded queries found
- Each dashboard passes its own data
- No shared state between dashboards

---

## 2. ROUTE COLLISION FIXES

### 2.1 Redirect Routes to Implement

Create these redirect files to fix route collisions:

#### `/app/partner/dashboard/page.tsx`

```typescript
import { redirect } from 'next/navigation';

// Partner dashboard redirects to program holder dashboard
// These roles are treated as equivalent in the system
export default function PartnerDashboard() {
  redirect('/program-holder/dashboard');
}
```

#### `/app/(partner)/partners/dashboard/page.tsx`

```typescript
import { redirect } from 'next/navigation';

// Legacy partner route - redirects to canonical program holder dashboard
export default function LegacyPartnersDashboard() {
  redirect('/program-holder/dashboard');
}
```

#### `/app/portal/staff/dashboard/page.tsx`

```typescript
import { redirect } from 'next/navigation';

// Portal staff route redirects to canonical staff portal
export default function PortalStaffDashboard() {
  redirect('/staff-portal/dashboard');
}
```

#### `/app/portal/parent/dashboard/page.tsx`

```typescript
import { redirect } from 'next/navigation';

// Portal parent route redirects to canonical parent portal
export default function PortalParentDashboard() {
  redirect('/parent-portal/dashboard');
}
```

#### `/app/programs/admin/dashboard/page.tsx`

```typescript
import { redirect } from 'next/navigation';

// Legacy admin route - redirects to canonical admin dashboard
export default function LegacyAdminDashboard() {
  redirect('/admin/dashboard');
}
```

### 2.2 Routes to Remove (After Verification)

These routes should be removed if confirmed orphaned:

1. **`/app/delegate/dashboard/page.tsx`**
   - Unknown role
   - No references found in codebase
   - Likely orphaned from old feature

2. **`/app/shop/dashboard/page.tsx`** (if e-commerce not active)
   - Investigate if shop feature is active
   - If inactive, remove route
   - If active, implement fully

3. **`/app/creator/dashboard/page.tsx`** (if creator feature not active)
   - Investigate if course creator feature is active
   - If inactive, remove route
   - If active, implement fully

### 2.3 Verification Checklist

Before removing any route:

- [ ] Search codebase for references to the route
- [ ] Check navigation components for links
- [ ] Check database for users with that role
- [ ] Verify no external links point to route
- [ ] Test that removal doesn't break anything

---

## 3. DATA QUERY ISOLATION

### 3.1 Query Patterns by Dashboard

Each dashboard must use proper filters to ensure data isolation:

#### Student Dashboard

```typescript
// ✅ CORRECT: Filter by authenticated user
const { data: enrollments } = await supabase
  .from('enrollments')
  .select('*, programs(*)')
  .eq('user_id', user.id); // ← User-specific filter

// ❌ WRONG: No filter (would show all enrollments)
const { data: enrollments } = await supabase
  .from('enrollments')
  .select('*, programs(*)');
```

#### Admin Dashboard

```typescript
// ✅ CORRECT: Admin can see all, but with role verification
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
  redirect('/unauthorized');
}

// Now safe to query all data
const { count: totalStudents } = await supabase
  .from('profiles')
  .select('*', { count: 'exact', head: true })
  .eq('role', 'student');
```

#### Program Holder Dashboard

```typescript
// ✅ CORRECT: Filter by program_holder_id
const { data: students } = await supabase
  .from('enrollments')
  .select('*, profiles(*)')
  .eq('program_holder_id', user.id); // ← Program holder's students only

// ❌ WRONG: No filter (would show all students)
const { data: students } = await supabase
  .from('enrollments')
  .select('*, profiles(*)');
```

#### Employer Dashboard

```typescript
// ✅ CORRECT: Filter by employer_id
const { data: postings } = await supabase
  .from('job_postings')
  .select('*')
  .eq('employer_id', user.id); // ← Employer's postings only

// ❌ WRONG: No filter (would show all postings)
const { data: postings } = await supabase.from('job_postings').select('*');
```

### 3.2 RLS Policy Requirements

Each table must have Row Level Security policies to enforce data isolation:

```sql
-- Example: enrollments table RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Students can only see their own enrollments
CREATE POLICY "Students view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Program holders can see their students' enrollments
CREATE POLICY "Program holders view their students"
  ON enrollments FOR SELECT
  USING (
    auth.uid() = program_holder_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Admins can see all enrollments
CREATE POLICY "Admins view all enrollments"
  ON enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );
```

### 3.3 Query Audit Checklist

For each dashboard, verify:

- [ ] All queries include proper user/role filters
- [ ] No queries return data for other users/roles
- [ ] RLS policies are enabled on all tables
- [ ] RLS policies match application logic
- [ ] Test queries with different user roles
- [ ] Verify no data leakage in API responses

---

## 4. COMPONENT ISOLATION

### 4.1 Shared Component Guidelines

When creating shared dashboard components:

```typescript
// ✅ CORRECT: Accept all data as props
interface DashboardMetricsProps {
  userId: string;
  metrics: {
    activeCount: number;
    completedCount: number;
    pendingCount: number;
  };
}

export function DashboardMetrics({ userId, metrics }: DashboardMetricsProps) {
  return (
    <div>
      <h2>Metrics for User {userId}</h2>
      <div>Active: {metrics.activeCount}</div>
      <div>Completed: {metrics.completedCount}</div>
      <div>Pending: {metrics.pendingCount}</div>
    </div>
  );
}

// ❌ WRONG: Hard-coded query inside component
export function DashboardMetrics() {
  const supabase = createClient();

  // This query has no user filter - would show all data!
  const { data: metrics } = await supabase
    .from('enrollments')
    .select('*');

  return <div>...</div>;
}
```

### 4.2 Component Audit Results

| Component             | Status     | Issues       | Action           |
| --------------------- | ---------- | ------------ | ---------------- |
| `StateAwareDashboard` | ✅ Safe    | None         | No action needed |
| `DashboardSidebar`    | ✅ Safe    | None         | No action needed |
| `DashboardStatsGrid`  | ✅ Safe    | None         | No action needed |
| `DashboardUpload`     | ⚠️ Unknown | Not verified | Audit component  |
| `AdminDashboard`      | ⚠️ Unknown | Not verified | Audit component  |
| `AnalyticsDashboard`  | ⚠️ Unknown | Not verified | Audit component  |
| `RoleDashboard`       | ⚠️ Unknown | Not verified | Audit component  |

### 4.3 Component Isolation Checklist

For each shared component:

- [ ] Component accepts all data as props
- [ ] No hard-coded database queries
- [ ] No hard-coded user IDs or role filters
- [ ] No shared state between dashboard instances
- [ ] Props are properly typed
- [ ] Component is documented

---

## 5. NAVIGATION ISOLATION

### 5.1 Role-Based Navigation

Each role must only see navigation items they have access to:

```typescript
// ✅ CORRECT: Role-based navigation filtering
import { getDashboardNavigation } from '@/lib/navigation/dashboard-nav.config';

export function DashboardNav({ userRole }: { userRole: string }) {
  const navigation = getDashboardNavigation(userRole);

  return (
    <nav>
      {navigation.map(item => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}

// ❌ WRONG: Showing all navigation to all users
export function DashboardNav() {
  const allNavigation = [
    { href: '/admin/dashboard', label: 'Admin' },
    { href: '/lms/dashboard', label: 'Student' },
    { href: '/program-holder/dashboard', label: 'Program Holder' },
  ];

  return (
    <nav>
      {allNavigation.map(item => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
```

### 5.2 Navigation Audit Results

| Navigation Component | Role Filtering     | Status         |
| -------------------- | ------------------ | -------------- |
| `AdminNav`           | ✅ Admin-only      | Safe           |
| `LMSNavigation`      | ✅ Student-only    | Safe           |
| `ProgramHolderNav`   | ❓ Not implemented | Needs creation |
| `EmployerNav`        | ❓ Not implemented | Needs creation |
| `StaffNav`           | ❓ Not implemented | Needs creation |
| `InstructorNav`      | ❓ Not implemented | Needs creation |

---

## 6. IMPLEMENTATION PLAN

### 6.1 Phase 1: Fix Route Collisions (Week 1)

1. **Implement Redirect Routes**
   - [ ] Create `/app/partner/dashboard/page.tsx` redirect
   - [ ] Create `/app/(partner)/partners/dashboard/page.tsx` redirect
   - [ ] Create `/app/portal/staff/dashboard/page.tsx` redirect
   - [ ] Create `/app/portal/parent/dashboard/page.tsx` redirect
   - [ ] Create `/app/programs/admin/dashboard/page.tsx` redirect

2. **Update Main Router**
   - [x] Add all role cases to `/app/dashboard/page.tsx`
   - [ ] Test role-based routing
   - [ ] Add error handling for unknown roles

3. **Update Navigation Links**
   - [ ] Search for links to old routes
   - [ ] Update to canonical routes
   - [ ] Test all navigation links

### 6.2 Phase 2: Verify Data Isolation (Week 2)

1. **Audit Dashboard Queries**
   - [ ] Student dashboard queries
   - [ ] Admin dashboard queries
   - [ ] Program holder dashboard queries
   - [ ] Employer dashboard queries
   - [ ] Staff dashboard queries
   - [ ] Instructor dashboard queries

2. **Test RLS Policies**
   - [ ] Create test users for each role
   - [ ] Verify each role sees only their data
   - [ ] Test cross-role access attempts
   - [ ] Document any RLS policy gaps

3. **Audit Shared Components**
   - [ ] `DashboardUpload`
   - [ ] `AdminDashboard`
   - [ ] `AnalyticsDashboard`
   - [ ] `RoleDashboard`
   - [ ] Any other shared dashboard components

### 6.3 Phase 3: Remove Orphaned Routes (Week 3)

1. **Verify Orphaned Routes**
   - [ ] Check `/delegate/dashboard` usage
   - [ ] Check `/shop/dashboard` usage
   - [ ] Check `/creator/dashboard` usage
   - [ ] Check `/board/dashboard` usage
   - [ ] Check `/workforce-board/dashboard` usage

2. **Remove or Implement**
   - [ ] Remove confirmed orphaned routes
   - [ ] Implement needed routes fully
   - [ ] Update documentation

### 6.4 Phase 4: Testing (Week 4)

1. **Role-Based Testing**
   - [ ] Test as student
   - [ ] Test as admin
   - [ ] Test as program holder
   - [ ] Test as employer
   - [ ] Test as staff
   - [ ] Test as instructor

2. **Cross-Role Testing**
   - [ ] Verify student cannot access admin dashboard
   - [ ] Verify program holder cannot see other holders' students
   - [ ] Verify employer cannot see other employers' postings
   - [ ] Test all unauthorized access scenarios

3. **Navigation Testing**
   - [ ] Verify all links work
   - [ ] Verify no broken links
   - [ ] Verify role-appropriate navigation
   - [ ] Test mobile navigation

---

## 7. SUCCESS CRITERIA

### 7.1 Route Isolation

- ✅ No duplicate routes serving same purpose
- ✅ All old routes redirect to canonical routes
- ✅ Main router handles all roles correctly
- ✅ No orphaned routes remain

### 7.2 Data Isolation

- ✅ Each dashboard queries only role-appropriate data
- ✅ All queries include proper user/role filters
- ✅ RLS policies enforce data isolation
- ✅ No data leakage between roles

### 7.3 Component Isolation

- ✅ All shared components accept data as props
- ✅ No hard-coded queries in shared components
- ✅ No shared state between dashboards
- ✅ Components are properly typed

### 7.4 Navigation Isolation

- ✅ Each role sees only appropriate navigation
- ✅ Navigation is role-filtered
- ✅ No unauthorized links visible
- ✅ All navigation links work

---

## 8. MONITORING & MAINTENANCE

### 8.1 Ongoing Monitoring

Add monitoring to detect crossed dashboard issues:

```typescript
// Example: Log dashboard access for monitoring
export async function logDashboardAccess(
  userId: string,
  role: string,
  dashboard: string
) {
  await supabase.from('dashboard_access_logs').insert({
    user_id: userId,
    role,
    dashboard,
    accessed_at: new Date().toISOString(),
  });
}

// Use in each dashboard
export default async function StudentDashboard() {
  const user = await getUser();
  await logDashboardAccess(user.id, user.role, 'student');
  // ... rest of dashboard
}
```

### 8.2 Regular Audits

Schedule regular audits:

- **Monthly:** Review dashboard access logs for anomalies
- **Quarterly:** Audit RLS policies for gaps
- **Annually:** Full security audit of all dashboards

### 8.3 Code Review Checklist

When reviewing dashboard code:

- [ ] All queries include proper filters
- [ ] No hard-coded user IDs or roles
- [ ] Shared components accept data as props
- [ ] RLS policies are in place
- [ ] Navigation is role-filtered
- [ ] Error handling is present
- [ ] Tests cover role isolation

---

**End of Crossed Dashboard Analysis**
