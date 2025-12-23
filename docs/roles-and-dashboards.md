# Roles and Dashboards

**Last Updated:** 2025-12-23

## Overview

This document defines the canonical dashboard route for each role, the authorization mechanism, and key database tables accessed.

## Role → Dashboard Mapping

| Role | Canonical Dashboard | Guard Type | Key DB Tables | Status |
|------|-------------------|------------|---------------|--------|
| `student` | `/lms/dashboard` | `requireRole(['student'])` | `profiles`, `enrollments`, `courses` | ✅ ENABLED |
| `admin` | `/admin/dashboard` | Manual check: `role === 'admin' \|\| 'super_admin'` | All tables (global access) | ✅ ENABLED |
| `super_admin` | `/admin/dashboard` | Manual check: `role === 'admin' \|\| 'super_admin'` | All tables (global access) | ✅ ENABLED |
| `org_admin` | `/admin/dashboard` | Manual check: `role === 'admin' \|\| 'super_admin'` | All tables (scoped to org) | ✅ ENABLED |
| `program_holder` | `/program-holder/dashboard` | Manual check: `role === 'program_holder'` | `profiles`, `program_holders`, `enrollments` (scoped) | ✅ ENABLED |
| `partner` | `/program-holder/dashboard` | **ALIAS** - redirects to program_holder | Same as program_holder | ✅ ALIAS |
| `employer` | `/employer/dashboard` | `requireRole(['employer'])` | `employers`, `job_postings`, `applications` | ✅ ENABLED |
| `staff` | `/staff-portal/dashboard` | `requireRole(['staff', 'admin', 'super_admin'])` | `profiles`, `enrollments` (support view) | ✅ ENABLED |
| `instructor` | `/instructor/dashboard` | `requireRole(['instructor'])` | `courses`, `enrollments`, `profiles` (students) | ✅ ENABLED |
| `board_member` | `/board/dashboard` | `requireRole(['board_member'])` | Read-only reports | ⚠️ MINIMAL |
| `workforce_board` | `/workforce-board/dashboard` | `requireRole(['workforce_board'])` | Read-only compliance reports | ⚠️ MINIMAL |

## Partner = Program Holder Decision

**Decision:** `partner` is an **alias** for `program_holder`, not a distinct role.

**Rationale:**
- No separate `partner` role in `profiles.role` enum
- No distinct RLS policies for `partner`
- `/app/dashboard/page.tsx` already redirects `partner` → `/program-holder/dashboard`
- `/app/(partner)/partners/*` routes exist but are accessed by `program_holder` role users

**Implementation:**
- `getDashboardRoute('partner')` returns `/program-holder/dashboard`
- `getDashboardNavigation('partner')` returns `programHolderNavigation`
- No separate partner dashboard or navigation

**Legacy Routes:**
- `/partner/dashboard` → redirects to `/program-holder/dashboard`
- `/(partner)/partners/*` → active routes for program holders

## Authorization Patterns

### Pattern 1: requireRole() Helper (Recommended)
```typescript
import { requireRole } from '@/lib/auth/require-role';

export default async function Dashboard() {
  const { user, profile } = await requireRole(['staff', 'admin']);
  // ...
}
```

**Used by:**
- `/lms/dashboard`
- `/employer/dashboard`
- `/staff-portal/dashboard`
- `/instructor/dashboard`
- `/board/dashboard`
- `/workforce-board/dashboard`

### Pattern 2: Manual Auth + Role Check
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect('/login');

const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (!profile || profile.role !== 'admin') {
  redirect('/unauthorized');
}
```

**Used by:**
- `/admin/dashboard`
- `/program-holder/dashboard`

## Database Query Scoping

### Student Queries
```typescript
// CORRECT: Scoped to authenticated user
const { data } = await supabase
  .from('enrollments')
  .select('*')
  .eq('user_id', user.id);
```

### Program Holder Queries
```typescript
// CORRECT: Scoped to program holder's organization
const { data } = await supabase
  .from('enrollments')
  .select('*')
  .eq('program_holder_id', profile.program_holder_id);
```

### Employer Queries
```typescript
// CORRECT: Scoped to employer's organization
const { data } = await supabase
  .from('job_postings')
  .select('*')
  .eq('employer_id', profile.employer_id);
```

### Admin Queries
```typescript
// CORRECT: Global access after role check
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('role', 'student');
```

## RLS Policies

All queries are backstopped by Row Level Security policies:

- **113 active RLS policies** enforce tenant isolation
- Policies check `auth.uid()` for user-scoped data
- Policies check `organization_id` / `program_holder_id` / `employer_id` for org-scoped data
- Admin roles have elevated access via policy exceptions

**See:** `supabase/migrations/` for policy definitions

## Roles NOT Enabled

### Parent Portal
**Status:** ❌ NOT ENABLED

**Reason:**
- No `parent` role in `profiles.role` enum
- No RLS policies for parent access
- No real users in production
- No schema support for parent-student relationships

**Action:** Removed from navigation config. If needed in future, requires:
1. Add `parent` to role enum
2. Create `parent_students` junction table
3. Implement RLS policies
4. Create dashboard routes

## Minimal Roles (Flagged for Review)

### Board Member
**Status:** ⚠️ MINIMAL ROUTES

**Routes:** Only `/board/dashboard` exists

**Recommendation:** Verify real users exist in production. If not actively used, consider disabling.

### Workforce Board
**Status:** ⚠️ MINIMAL ROUTES

**Routes:** Only `/board/dashboard` and `/workforce-board/reports` exist

**Recommendation:** Verify real users exist in production. If not actively used, consider disabling.

## Dashboard Router Completeness

`/app/dashboard/page.tsx` handles all real roles:

```typescript
switch (profile.role) {
  case 'admin':
  case 'super_admin':
  case 'org_admin':
    return redirect('/admin/dashboard');
  
  case 'program_holder':
  case 'partner': // ALIAS
    return redirect('/program-holder/dashboard');
  
  case 'employer':
    return redirect('/employer/dashboard');
  
  case 'staff':
    return redirect('/staff-portal/dashboard');
  
  case 'instructor':
    return redirect('/instructor/dashboard');
  
  case 'board_member':
    return redirect('/board/dashboard');
  
  case 'workforce_board':
    return redirect('/workforce-board/dashboard');
  
  case 'student':
  default:
    return redirect('/lms/dashboard');
}
```

**Unknown roles:** Redirect to `/onboarding` with server log

## Security Checklist

- ✅ Every canonical dashboard has server-side auth guard
- ✅ Every canonical dashboard checks role (via `requireRole()` or manual check)
- ✅ All queries are scoped to user/org (except admin with role check)
- ✅ RLS policies backstop all queries
- ✅ Navigation visibility is UI-only (not security)
- ✅ Partner role properly aliased to program_holder

## Next Steps

1. ⚠️ Verify board_member and workforce_board roles have real users in production
2. ⚠️ If minimal roles are unused, consider disabling and removing from router
3. ✅ All other roles are production-ready
