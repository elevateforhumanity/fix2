# Dashboard Authorization Audit

**Date:** 2025-12-17  
**Status:** ⚠️ ISSUES FOUND

---

## Executive Summary

✅ **Authentication:** All 19 dashboards check if user is logged in  
⚠️ **Authorization:** Most dashboards lack explicit role verification  
⚠️ **Data Access:** Relies heavily on RLS policies (good) but no UI-level checks  
❌ **Cross-Role Access:** Users can access wrong dashboards (will see empty data)

---

## Critical Issues

### 🔴 HIGH PRIORITY

#### 1. Missing Role Verification

**Affected Dashboards (11):**

- `/employer/dashboard` - No check if user is actually an employer
- `/instructor/dashboard` - No check if user is actually an instructor
- `/staff-portal/dashboard` - No check if user is actually staff
- `/workforce-board/dashboard` - No check for workforce board role
- `/delegate/dashboard` - No check for delegate role
- `/partner/dashboard` - No check for partner role
- `/board/dashboard` - No check for board member role
- `/portal/parent/dashboard` - No check for parent role
- `/program-holder/dashboard` - No check for program holder role
- `/shop/dashboard` - No check for shop owner role
- `/lms/dashboard` - No check if user is student (relies on layout)

**Risk:**

- Student can visit `/employer/dashboard` (will see empty page)
- Employer can visit `/lms/dashboard` (will see empty page)
- Confusing UX - no clear error message
- Potential data leakage if RLS policies are misconfigured

**Example Issue:**

```typescript
// app/employer/dashboard/page.tsx
const { data: employer } = await supabase
  .from('employers')
  .select('*')
  .eq('user_id', user.id)
  .single();

// If user is not an employer, employer = null
// Then employer?.id = undefined
// Queries fail silently, page shows empty data
```

#### 2. No Organization/Tenant Filtering

**Affected:** All dashboards

**Risk:**

- Multi-tenant data could leak between organizations
- Users might see data from other organizations
- Depends entirely on RLS policies being perfect

**Missing Pattern:**

```typescript
// Should filter by organization
.eq('organization_id', profile.organization_id)
```

---

## Dashboard-by-Dashboard Analysis

### ✅ SECURE: Admin Dashboard

**File:** `app/admin/dashboard/page.tsx`

**Security:**

```typescript
if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
  redirect('/unauthorized');
}
```

✅ Explicit role check  
✅ Redirects unauthorized users  
✅ User-scoped queries

**Status:** SECURE

---

### ⚠️ NEEDS FIX: Employer Dashboard

**File:** `app/employer/dashboard/page.tsx`

**Current:**

```typescript
const { data: employer } = await supabase
  .from('employers')
  .select('*')
  .eq('user_id', user.id)
  .single();
```

**Issues:**

- ❌ No role verification
- ❌ If user is not employer, `employer` is null
- ❌ Page loads but shows empty data
- ❌ No error message to user

**Fix Needed:**

```typescript
// Add after getting profile
if (!profile || (profile.role !== 'admin' && profile.role !== 'employer')) {
  redirect('/unauthorized');
}

// Check employer record exists
if (!employer) {
  return <div>No employer account found. Contact support.</div>;
}
```

---

### ⚠️ NEEDS FIX: Instructor Dashboard

**File:** `app/instructor/dashboard/page.tsx`

**Issues:**

- ❌ No role verification
- ❌ Any user can access
- ❌ Will show empty data if not instructor

**Fix Needed:**

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile?.role !== 'instructor' && profile?.role !== 'admin') {
  redirect('/unauthorized');
}
```

---

### ⚠️ NEEDS FIX: Staff Portal Dashboard

**File:** `app/staff-portal/dashboard/page.tsx`

**Issues:**

- ❌ No role verification
- ❌ Any user can access
- ❌ Will show empty data if not staff

**Fix Needed:**

```typescript
if (profile?.role !== 'staff' && profile?.role !== 'admin') {
  redirect('/unauthorized');
}
```

---

### ⚠️ NEEDS FIX: Student LMS Dashboard

**File:** `app/lms/(app)/dashboard/page.tsx`

**Current:** Relies on layout for auth

**Issues:**

- ⚠️ Layout checks auth but not role
- ⚠️ Admin could access student dashboard
- ⚠️ Might see wrong data

**Fix Needed:**

```typescript
// In layout or page
if (profile?.role && !['student', 'admin'].includes(profile.role)) {
  redirect('/dashboard'); // Smart router will send to correct dashboard
}
```

---

## RLS Policy Status

### ✅ GOOD: Core Tables Have RLS

**Tables with RLS:**

- `profiles` - Users can only see/update own profile
- `enrollments` - Users can only see own enrollments
- `lesson_progress` - Users can only see own progress
- `certificates` - Users can only see own certificates
- `courses` - Public read for published courses
- `programs` - Public read for active programs

**Status:** Database-level security is good

---

### ⚠️ CONCERN: Multi-Tenant Tables

**Tables that need org filtering:**

- `employers` - Should filter by organization_id
- `job_postings` - Should filter by employer's organization
- `applications` - Should filter by organization
- `students` - Should filter by organization
- `instructors` - Should filter by organization

**Current:** Relies on RLS policies (need to verify these exist)

---

## Recommended Fixes

### Priority 1: Add Role Verification (HIGH)

Add to each dashboard:

```typescript
// Get user profile with role
const { data: profile } = await supabase
  .from('profiles')
  .select('role, organization_id')
  .eq('id', user.id)
  .single();

// Verify role
const allowedRoles = ['expected_role', 'admin'];
if (!profile || !allowedRoles.includes(profile.role)) {
  redirect('/unauthorized');
}
```

**Dashboards to fix:**

1. `/employer/dashboard` - Check for 'employer' or 'admin'
2. `/instructor/dashboard` - Check for 'instructor' or 'admin'
3. `/staff-portal/dashboard` - Check for 'staff' or 'admin'
4. `/workforce-board/dashboard` - Check for 'workforce_board' or 'admin'
5. `/delegate/dashboard` - Check for 'delegate' or 'admin'
6. `/partner/dashboard` - Check for 'partner' or 'admin'
7. `/board/dashboard` - Check for 'board_member' or 'admin'
8. `/portal/parent/dashboard` - Check for 'parent' or 'admin'
9. `/program-holder/dashboard` - Check for 'program_holder' or 'admin'
10. `/shop/dashboard` - Check for 'shop_owner' or 'admin'
11. `/lms/dashboard` - Check for 'student' or 'admin'

---

### Priority 2: Add Organization Filtering (MEDIUM)

Add to all queries:

```typescript
// After getting profile
const orgId = profile.organization_id;

// Filter queries by organization
.eq('organization_id', orgId)
```

---

### Priority 3: Create Unauthorized Page (LOW)

**File:** `app/unauthorized/page.tsx`

```typescript
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Link href="/dashboard" className="btn-primary">
          Go to Your Dashboard
        </Link>
      </div>
    </div>
  );
}
```

---

### Priority 4: Add Helper Function (LOW)

**File:** `lib/auth/require-role.ts`

```typescript
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function requireRole(allowedRoles: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, organization_id')
    .eq('id', user.id)
    .single();

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/unauthorized');
  }

  return { user, profile };
}
```

**Usage:**

```typescript
// In any dashboard
const { user, profile } = await requireRole(['instructor', 'admin']);
```

---

## Testing Checklist

### Test Cross-Role Access

- [ ] Login as student, try to access `/employer/dashboard`
- [ ] Login as student, try to access `/instructor/dashboard`
- [ ] Login as student, try to access `/admin/dashboard`
- [ ] Login as employer, try to access `/lms/dashboard`
- [ ] Login as instructor, try to access `/employer/dashboard`

**Expected:** Should redirect to unauthorized or correct dashboard

**Current:** Will load page but show empty data (confusing)

---

### Test Data Isolation

- [ ] Create 2 organizations
- [ ] Add users to each organization
- [ ] Verify users can't see other org's data
- [ ] Check all queries filter by organization_id

---

### Test RLS Policies

```sql
-- Test as student
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "student-user-id"}';

-- Try to access other user's data
SELECT * FROM enrollments WHERE user_id != 'student-user-id';
-- Should return 0 rows

-- Try to access other org's data
SELECT * FROM employers WHERE organization_id != 'student-org-id';
-- Should return 0 rows (if RLS policy exists)
```

---

## Risk Assessment

### Current Risk Level: 🟡 MEDIUM

**Why Medium (not High):**

- ✅ RLS policies protect data at database level
- ✅ Authentication is working (users must login)
- ✅ User-scoped queries prevent data leakage

**Why Not Low:**

- ❌ No UI-level role verification
- ❌ Confusing UX (wrong dashboards load but empty)
- ❌ Potential for misconfigured RLS policies
- ❌ No organization filtering in code

---

## Recommendations

### Immediate (Before Production)

1. ✅ Add role verification to all dashboards
2. ✅ Create `/unauthorized` page
3. ✅ Test cross-role access
4. ✅ Verify RLS policies exist for all tables

### Short-term (Next Sprint)

1. Add organization filtering to all queries
2. Create `requireRole()` helper function
3. Add comprehensive authorization tests
4. Audit all RLS policies

### Long-term (Next Quarter)

1. Implement attribute-based access control (ABAC)
2. Add audit logging for all data access
3. Create admin panel for managing permissions
4. Add rate limiting per user/organization

---

## Conclusion

**Current State:**

- ✅ Authentication works
- ✅ Database-level security (RLS) is good
- ⚠️ UI-level authorization is weak
- ⚠️ No organization filtering

**Action Required:**

- Add role verification to 11 dashboards
- Create unauthorized page
- Test cross-role access
- Verify RLS policies

**Timeline:**

- Critical fixes: 2-4 hours
- Testing: 1-2 hours
- Total: 3-6 hours of work

**Status:** ⚠️ FUNCTIONAL BUT NEEDS HARDENING

---

**Last Updated:** 2025-12-17  
**Next Review:** After authorization fixes
