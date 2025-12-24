# Database Proof Results - ACTUAL DATA

**Date:** 2024-12-24  
**Status:** COMPLETE  
**Source:** Production Supabase Database

---

## Query 1: Roles Actually In Use

```json
[
  { "role": "admin", "user_count": 3 },
  { "role": "instructor", "user_count": 1 },
  { "role": "staff", "user_count": 2 },
  { "role": "student", "user_count": 4 }
]
```

**Analysis:**

- ✅ 4 roles in active use: admin, instructor, staff, student
- ❌ NO users have role='partner'
- ❌ NO users have role='program_holder'
- ❌ NO users have role='employer'
- ⚠️ 'staff' is in use (2 users) but NOT in enum definition (see Query 4)

---

## Query 2: Profiles Table Schema

```json
[
  { "column_name": "id", "data_type": "uuid", "is_nullable": "NO" },
  { "column_name": "email", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "full_name", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "role", "data_type": "text", "is_nullable": "YES" },
  {
    "column_name": "enrollment_status",
    "data_type": "text",
    "is_nullable": "YES"
  },
  { "column_name": "phone", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "address", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "city", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "state", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "zip", "data_type": "text", "is_nullable": "YES" },
  { "column_name": "avatar_url", "data_type": "text", "is_nullable": "YES" },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "organization_id",
    "data_type": "uuid",
    "is_nullable": "YES"
  }
]
```

**Analysis:**

- ⚠️ **CRITICAL:** `role` is TEXT, not user_role enum
- This means role can be ANY string value (no database constraint)
- 'staff' works even though it's not in the enum
- 'partner', 'employer', 'super_admin' could be added without migration
- No partner-specific columns exist

---

## Query 3: Enrollments Table Schema

```json
[
  { "column_name": "id", "data_type": "uuid", "is_nullable": "NO" },
  { "column_name": "user_id", "data_type": "uuid", "is_nullable": "NO" },
  { "column_name": "program_id", "data_type": "uuid", "is_nullable": "NO" },
  {
    "column_name": "status",
    "data_type": "character varying",
    "is_nullable": "YES"
  },
  {
    "column_name": "started_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "internal_complete",
    "data_type": "boolean",
    "is_nullable": "YES"
  },
  { "column_name": "state_code", "data_type": "text", "is_nullable": "YES" },
  {
    "column_name": "apprenticeship",
    "data_type": "boolean",
    "is_nullable": "YES"
  },
  {
    "column_name": "rapids_registered",
    "data_type": "boolean",
    "is_nullable": "YES"
  },
  {
    "column_name": "organization_id",
    "data_type": "uuid",
    "is_nullable": "YES"
  },
  {
    "column_name": "billing_lock",
    "data_type": "boolean",
    "is_nullable": "NO"
  },
  {
    "column_name": "billing_lock_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "billing_lock_reason",
    "data_type": "text",
    "is_nullable": "YES"
  },
  { "column_name": "payment_mode", "data_type": "text", "is_nullable": "YES" },
  {
    "column_name": "stripe_checkout_session_id",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "stripe_payment_intent_id",
    "data_type": "text",
    "is_nullable": "YES"
  },
  { "column_name": "payment_status", "data_type": "text", "is_nullable": "NO" },
  {
    "column_name": "amount_paid_cents",
    "data_type": "integer",
    "is_nullable": "NO"
  },
  {
    "column_name": "paid_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES"
  },
  {
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO"
  },
  {
    "column_name": "partner_course_id",
    "data_type": "uuid",
    "is_nullable": "YES"
  }
]
```

**Analysis:**

- ✅ `program_id` exists (NOT course_id)
- ❌ NO `course_id` column (migration 20251224_fix_lms_course_flow.sql NOT applied)
- ⚠️ `partner_course_id` exists (suggests partner concept exists somewhere)
- Enrollments are program-based, not course-based

---

## Query 4: User Role Enum Definition

```json
[
  { "role_value": "student", "sort_order": 1 },
  { "role_value": "admin", "sort_order": 2 },
  { "role_value": "program_holder", "sort_order": 3 },
  { "role_value": "delegate", "sort_order": 4 },
  { "role_value": "instructor", "sort_order": 5 },
  { "role_value": "auditor", "sort_order": 6 }
]
```

**Analysis:**

- ✅ Enum contains: student, admin, program_holder, delegate, instructor, auditor
- ❌ 'staff' NOT in enum (but 2 users have it - see Query 1)
- ❌ 'employer' NOT in enum
- ❌ 'super_admin' NOT in enum
- ❌ 'partner' NOT in enum
- ⚠️ **Migration 20251224_extend_user_role_enum.sql NOT applied**

---

## Query 5: Partner-Related Data Check

```json
[
  { "source": "profiles.role", "count": 0 },
  { "source": "program_holders table exists", "count": 1 },
  { "source": "employers table exists", "count": 1 }
]
```

**Analysis:**

- ✅ NO users have role='partner'
- ✅ `program_holders` table EXISTS
- ✅ `employers` table EXISTS
- 'Partner' is a relationship/table concept, not a role

---

## CRITICAL FINDINGS

### 1. Role is TEXT, Not Enum (MAJOR SCHEMA DRIFT)

**Reality:** `profiles.role` is `TEXT`, not `user_role` enum type.

**Impact:**

- Database does NOT enforce role values
- Any string can be stored in role column
- Migrations that extend user_role enum are IRRELEVANT
- Code can use 'staff', 'employer', 'partner' without migration

**Why This Happened:**

- Schema migration defined enum but didn't apply it to profiles.role
- Column was created as TEXT instead of user_role type

### 2. Migrations NOT Applied

**Evidence:**

- Migration `20251224_extend_user_role_enum.sql` NOT applied (staff/employer/super_admin missing from enum)
- Migration `20251224_fix_lms_course_flow.sql` NOT applied (course_id missing from enrollments)

**Impact:**

- LMS course flow will FAIL (no course_id in enrollments)
- Enum extensions are pointless (role is TEXT anyway)

### 3. Roles Actually In Use vs Code Assumptions

**In Database:**

- admin (3 users)
- instructor (1 user)
- staff (2 users)
- student (4 users)

**In Code (app/dashboard/page.tsx):**

- Handles: admin, staff, instructor, program_holder, partner, employer, board_member, workforce_board
- Missing handlers for: delegate, auditor (which ARE in enum)

**Mismatch:**

- Code routes 'program_holder' but NO users have this role
- Code routes 'employer' but NO users have this role
- Code routes 'partner' but NO users have this role
- Code does NOT route 'delegate' or 'auditor' (which exist in enum)

### 4. Partner Is a Table Relationship, Not a Role

**Evidence:**

- `program_holders` table exists
- `employers` table exists
- `partner_course_id` column exists in enrollments
- NO users have role='partner'

**Correct Model:**

- Users have role='admin', 'staff', etc.
- Users MAY have a record in `program_holders` table (relationship)
- Users MAY have a record in `employers` table (relationship)
- "Partner" is a business label, not a permission role

---

## SAFE DASHBOARD ROUTES (Evidence-Based)

Based on actual roles in use:

```typescript
// app/dashboard/page.tsx - SAFE ROUTING
switch (profile.role) {
  case 'admin':
    redirect('/admin/dashboard');

  case 'staff':
    redirect('/staff-portal/dashboard');

  case 'instructor':
    redirect('/instructor/dashboard');

  case 'student':
  default:
    redirect('/lms/dashboard');
}
```

**DO NOT route:**

- program_holder (0 users)
- employer (0 users)
- partner (0 users)
- board_member (0 users)
- workforce_board (0 users)

---

## BLOCKED WORK

### Cannot Implement (No Users):

- /program-holder/dashboard routing (0 users with this role)
- /employer/dashboard routing (0 users with this role)
- /partner/dashboard routing (0 users with this role)
- /board/dashboard routing (0 users with this role)
- /workforce-board/dashboard routing (0 users with this role)

### Cannot Implement (Migrations Not Applied):

- LMS course flow (needs course_id in enrollments)
- Enum-based role validation (role is TEXT, not enum)

---

## REQUIRED ACTIONS (In Order)

### 1. Apply Missing Migrations (BLOCKER)

```bash
# Apply these migrations to production database:
supabase/migrations/20251224_extend_user_role_enum.sql
supabase/migrations/20251224_fix_lms_course_flow.sql
```

### 2. Fix Schema Drift (CRITICAL)

**Option A: Make role an actual enum (breaking change)**

```sql
-- Convert role from TEXT to user_role enum
ALTER TABLE profiles
ALTER COLUMN role TYPE user_role USING role::user_role;
```

**Option B: Remove the enum entirely (simpler)**

```sql
-- Drop unused enum, keep role as TEXT with CHECK constraint
DROP TYPE user_role;

ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check
CHECK (role IN ('student', 'admin', 'staff', 'instructor', 'program_holder', 'employer', 'delegate', 'auditor'));
```

### 3. Fix Dashboard Router (SAFE NOW)

Only route roles that have actual users:

```typescript
// app/dashboard/page.tsx
switch (profile.role) {
  case 'admin':
    redirect('/admin/dashboard');
  case 'staff':
    redirect('/staff-portal/dashboard');
  case 'instructor':
    redirect('/instructor/dashboard');
  case 'student':
  default:
    redirect('/lms/dashboard');
}
```

### 4. Remove Dead Code

Delete or comment out routing for:

- program_holder
- employer
- partner
- board_member
- workforce_board
- delegate
- auditor

Until users with these roles actually exist.

---

## CONCLUSION

**The dashboard consolidation work was built on false assumptions:**

1. ❌ Assumed role was an enum (it's TEXT)
2. ❌ Assumed migrations were applied (they weren't)
3. ❌ Assumed program_holder/employer/partner users exist (they don't)
4. ❌ Assumed course_id exists in enrollments (it doesn't)

**What's actually safe to implement:**

1. ✅ Route 4 real roles: admin, staff, instructor, student
2. ✅ Redirect legacy routes to these 4 dashboards
3. ✅ Remove navigation links to non-existent dashboards

**What must be frozen:**

1. ❌ All program_holder/employer/partner routing
2. ❌ LMS course flow (until migration applied)
3. ❌ Navigation config with speculative routes
4. ❌ Any dashboard for roles with 0 users

---

**Sign-Off:**

- [x] All 5 queries executed
- [x] Results documented
- [x] Critical findings identified
- [x] Safe actions defined
- [x] Blocked work identified

**Next Step:** Apply migrations, then implement ONLY the 4-role router fix.
