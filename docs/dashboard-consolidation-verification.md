# Dashboard Consolidation Verification

**Date:** 2025-12-23  
**Status:** IN PROGRESS

---

## Dashboard Router Analysis

### Expected Behavior

The `/dashboard` route should intelligently redirect users to their role-appropriate dashboard based on their `profiles.role` value.

### Role Mapping

| Role | Canonical Dashboard | Status |
|------|-------------------|--------|
| `student` | `/lms/dashboard` | ✅ Exists |
| `admin` | `/admin/dashboard` | ✅ Exists |
| `super_admin` | `/admin/dashboard` | ✅ Exists |
| `org_admin` | `/admin/dashboard` | ⚠️ Verify |
| `staff` | `/staff-portal/dashboard` | ⚠️ Needs verification |
| `instructor` | `/instructor/dashboard` | ✅ Exists |
| `program_holder` | `/program-holder/dashboard` | ✅ Exists |
| `partner` | `/program-holder/dashboard` | ⚠️ Redirect needed |
| `employer` | `/employer/dashboard` | ✅ Exists |

---

## Dashboard Routes Inventory

### Verified Dashboards

#### 1. LMS Dashboard (Student)
- **Route:** `/lms/dashboard`
- **File:** `app/lms/(app)/dashboard/page.tsx`
- **Auth:** `requireRole` + `getStudentState`
- **Features:** State-aware orchestrated dashboard
- **Empty State:** ✅ Has actionable CTAs
- **Status:** ✅ VERIFIED

#### 2. Admin Dashboard
- **Route:** `/admin/dashboard`
- **File:** `app/admin/dashboard/page.tsx`
- **Auth:** `requireAdmin()`
- **Features:** Admin overview and controls
- **Status:** ⚠️ NEEDS VERIFICATION

#### 3. Program Holder Dashboard
- **Route:** `/program-holder/dashboard`
- **File:** `app/program-holder/dashboard/page.tsx`
- **Auth:** Role-based
- **Features:** Program holder management
- **Status:** ⚠️ NEEDS VERIFICATION

#### 4. Employer Dashboard
- **Route:** `/employer/dashboard`
- **File:** `app/employer/dashboard/page.tsx`
- **Auth:** `requireRole`
- **Features:** Job postings and applications
- **Status:** ⚠️ NEEDS VERIFICATION

#### 5. Instructor Dashboard
- **Route:** `/instructor/dashboard`
- **File:** `app/instructor/dashboard/page.tsx`
- **Auth:** `requireRole`
- **Features:** Course management
- **Status:** ⚠️ NEEDS VERIFICATION

---

## Partner vs Program Holder Ambiguity

### Issue Identified

The codebase has both `/partners/*` and `/program-holder/*` routes, suggesting potential role confusion.

### Investigation Required

1. **Check `profiles.role` enum values:**
   - Does `partner` exist as a role?
   - Is `program_holder` the canonical role?
   - Are they aliases for the same role?

2. **Check route usage:**
   - Which routes are actively used?
   - Which are legacy redirects?

3. **Check database references:**
   - `program_holders` table exists
   - `partners` table exists?
   - Relationship between tables?

### Proposed Resolution

**Default Behavior (until verified):**
- `partner` role → redirect to `/program-holder/dashboard`
- Add explicit note in `docs/roles-and-dashboards.md`
- Document in code comments

---

## Navigation Link Verification

### Critical Nav Links to Test

For each role, verify these nav links return 200 and match access rules:

#### Student Nav
- [ ] `/lms/dashboard` - Dashboard home
- [ ] `/lms/courses` - Course list
- [ ] `/lms/calendar` - Calendar
- [ ] `/lms/assignments` - Assignments
- [ ] `/lms/certificates` - Certificates

#### Program Holder Nav
- [ ] `/program-holder/dashboard` - Dashboard home
- [ ] `/program-holder/students` - Student management
- [ ] `/program-holder/reports` - Reports
- [ ] `/program-holder/documents` - Documents

#### Employer Nav
- [ ] `/employer/dashboard` - Dashboard home
- [ ] `/employer/jobs` - Job postings
- [ ] `/employer/applications` - Applications
- [ ] `/employer/students` - Hired students

#### Admin Nav
- [ ] `/admin/dashboard` - Dashboard home
- [ ] `/admin/users` - User management
- [ ] `/admin/programs` - Program management
- [ ] `/admin/applications` - Application review
- [ ] `/admin/enrollments` - Enrollment management

---

## Dead Link Detection

### Method

1. Extract all `<Link href="...">` and `<a href="...">` from dashboard files
2. Verify each href resolves to an existing route
3. Test auth requirements match user role

### Common Dead Link Patterns

- Links to removed/renamed routes
- Links to unimplemented features
- Links without proper auth gates
- Links to legacy portal pages

---

## Empty State Verification

### Requirements

Every dashboard must handle empty states with:
- ✅ Clear explanation of why empty
- ✅ Actionable CTA (not just "No data")
- ✅ CTA leads to real action (not placeholder)

### Dashboards to Check

- [ ] LMS Dashboard (no enrollments)
- [ ] Program Holder Dashboard (no students)
- [ ] Employer Dashboard (no job postings)
- [ ] Admin Dashboard (no pending items)

---

## Role-Based Access Testing

### Test Matrix

| Route | Student | Program Holder | Employer | Admin | Expected |
|-------|---------|---------------|----------|-------|----------|
| `/lms/dashboard` | ✅ | ❌ | ❌ | ✅ | Student or Admin |
| `/program-holder/dashboard` | ❌ | ✅ | ❌ | ✅ | Program Holder or Admin |
| `/employer/dashboard` | ❌ | ❌ | ✅ | ✅ | Employer or Admin |
| `/admin/dashboard` | ❌ | ❌ | ❌ | ✅ | Admin only |

### Testing Method

1. Create test account for each role
2. Attempt to access each dashboard
3. Verify proper redirect or 403 for unauthorized access
4. Confirm admin can access all dashboards

---

## Dashboard Router Implementation

### Current State

✅ **VERIFIED:** `/dashboard` route exists at `app/dashboard/page.tsx` and handles comprehensive role-based routing.

### Expected Implementation

```typescript
// app/dashboard/page.tsx
export default async function DashboardRouter() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  switch (profile?.role) {
    case 'student':
      redirect('/lms/dashboard');
    case 'program_holder':
    case 'partner':
      redirect('/program-holder/dashboard');
    case 'employer':
      redirect('/employer/dashboard');
    case 'instructor':
      redirect('/instructor/dashboard');
    case 'admin':
    case 'super_admin':
    case 'org_admin':
      redirect('/admin/dashboard');
    default:
      redirect('/login');
  }
}
```

---

## Next Steps

1. **Verify `/dashboard` router exists and works**
2. **Test each dashboard with appropriate role**
3. **Document partner vs program_holder resolution**
4. **Extract and verify all nav links**
5. **Test empty states**
6. **Create `docs/roles-and-dashboards.md`**

---

## Status: ⚠️ VERIFICATION IN PROGRESS

Manual testing with role-specific accounts required.
