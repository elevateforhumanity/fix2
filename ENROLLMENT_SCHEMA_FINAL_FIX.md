# Enrollment Schema Final Fix

**Date:** 2025-12-25  
**Status:** Ready to Apply

## Problem Summary

The enrollment system had schema drift and table name mismatches:

1. **profiles.enrollment_status** - Column was nullable with wrong constraint values
2. **Approval endpoint** - Referenced wrong table name (`enrollments` vs `program_enrollments`)
3. **Multiple migrations** - Three stacked migrations trying to fix the same column
4. **Authorization logic** - Used junction table instead of direct `program_holder_id`

## Root Cause

Previous migrations used `IF NOT EXISTS` and discovered the column already existed with different values. Instead of fixing the existing column, they stacked more migrations, creating hybrid state.

## The Fix

### 1. Database Migration

**File:** `supabase/migrations/20251225_fix_enrollment_status_final.sql`

**What it does:**
- Migrates existing data to valid values:
  - `NULL` → `pending`
  - `enrolled` → `active`
  - `withdrawn` → `rejected`
- Drops old constraint with wrong values
- Creates new constraint: `('pending', 'active', 'completed', 'rejected', 'suspended')`
- Enforces `NOT NULL`
- Sets default to `'pending'`

**Safe to run:** Yes - includes data migration and validation checks

### 2. API Endpoint Fix

**File:** `app/api/enroll/approve/route.ts`

**Changes:**
- ✅ Use `program_enrollments` table (not `enrollments`)
- ✅ Use `student_id` column (not `user_id`)
- ✅ Check for pre-approval statuses: `INTAKE`, `AWAITING_FUNDING`, `AWAITING_SEATS`
- ✅ Update to `READY_TO_START` status (not `active`)
- ✅ Use direct `program_holder_id` from enrollment (not junction table)
- ✅ Admin-only authorization (no program holder approval)

### 3. Verification Scripts

**File:** `scripts/lock-enrollment-status-truth.sql`
- Query current schema state
- Show enrollment_status distribution
- List real pending enrollments
- Check authorization data

**File:** `scripts/verify-enrollment-orchestration-real.sql`
- Uses real data (no fake auth.users inserts)
- Shows pending enrollments ready for testing
- Provides manual test instructions

## Schema Truth

### program_enrollments Table

```sql
CREATE TABLE program_enrollments (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,  -- References profiles.id
  program_id TEXT NOT NULL,  -- Program slug
  program_holder_id UUID,    -- References program_holders.id
  status TEXT NOT NULL,      -- INTAKE, AWAITING_FUNDING, AWAITING_SEATS, READY_TO_START, IN_PROGRESS, COMPLETED, SUSPENDED
  funding_source TEXT NOT NULL,
  stripe_ref_id TEXT,
  payment_mode TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

### profiles.enrollment_status Column

```sql
ALTER TABLE profiles 
ADD COLUMN enrollment_status TEXT NOT NULL DEFAULT 'pending'
CHECK (enrollment_status IN ('pending', 'active', 'completed', 'rejected', 'suspended'));
```

**Values:**
- `pending` - Default, no portal access
- `active` - Approved, full portal access
- `completed` - Graduated
- `rejected` - Denied
- `suspended` - Temporary block

**Separate from:** `program_enrollments.status` which tracks individual enrollment lifecycle

## Authorization Model

**Admin Approval:**
- Only `admin` or `super_admin` roles can approve enrollments
- Program holders are explicitly forbidden from approval authority
- Authorization check: `profiles.role IN ('admin', 'super_admin')`

**Program Holder Notification:**
- If enrollment has `program_holder_id`, notify that program holder
- Direct lookup: `program_enrollments.program_holder_id` → `program_holders.id` → `program_holders.user_id`
- No junction table needed

## Approval Flow

```
1. Admin calls POST /api/enroll/approve { enrollment_id }
2. Verify admin role
3. Check enrollment status is pre-approval (INTAKE, AWAITING_FUNDING, AWAITING_SEATS)
4. Update program_enrollments.status → READY_TO_START
5. Update profiles.enrollment_status → active
6. Call generate_enrollment_steps(enrollment_id)
7. Notify student (in-app + email)
8. Notify program holder if assigned (in-app + email)
9. Log audit trail
10. Return proof
```

## Testing Instructions

### Step 1: Apply Migration

```bash
# In Supabase SQL Editor
\i supabase/migrations/20251225_fix_enrollment_status_final.sql
```

### Step 2: Verify Schema

```bash
# In Supabase SQL Editor
\i scripts/lock-enrollment-status-truth.sql
```

**Expected results:**
- `is_nullable` = `NO`
- Constraint values = `pending, active, completed, rejected, suspended`
- All profiles have valid `enrollment_status`

### Step 3: Get Real Pending Enrollment

```bash
# In Supabase SQL Editor
\i scripts/verify-enrollment-orchestration-real.sql
```

Copy an `enrollment_id` from the "PENDING ENROLLMENTS" section.

### Step 4: Test Approval

```bash
# As admin user
curl -X POST https://your-site.com/api/enroll/approve \
  -H "Authorization: Bearer $ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enrollment_id": "PASTE_ENROLLMENT_ID_HERE"}'
```

### Step 5: Verify Orchestration

```sql
-- Check enrollment status
SELECT status FROM program_enrollments WHERE id = 'ENROLLMENT_ID';
-- Expected: READY_TO_START

-- Check profile status
SELECT enrollment_status FROM profiles 
WHERE id = (SELECT student_id FROM program_enrollments WHERE id = 'ENROLLMENT_ID');
-- Expected: active

-- Check steps generated
SELECT COUNT(*) FROM enrollment_steps WHERE enrollment_id = 'ENROLLMENT_ID';
-- Expected: > 0
```

## Files Changed

1. ✅ `supabase/migrations/20251225_fix_enrollment_status_final.sql` - Clean migration
2. ✅ `app/api/enroll/approve/route.ts` - Fixed table name and authorization
3. ✅ `scripts/lock-enrollment-status-truth.sql` - Schema verification
4. ✅ `scripts/verify-enrollment-orchestration-real.sql` - Real data testing

## Previous Migrations (Superseded)

These migrations are superseded by the final fix:
- ❌ `20251225_add_profiles_enrollment_status.sql` - First attempt
- ❌ `20251225_enforce_profiles_enrollment_status_not_null.sql` - Second attempt
- ❌ `20251225_fix_enrollment_status_constraint.sql` - Third attempt

**Do not delete** - They may have already been applied. The final migration handles all cases.

## Next Steps

1. **Apply migration** - Run `20251225_fix_enrollment_status_final.sql` in production
2. **Deploy API fix** - Commit and push approval endpoint changes
3. **Test with real data** - Use verification scripts to test approval flow
4. **Monitor** - Check logs for any enrollment approval attempts

## Support

If migration fails:
1. Check error message
2. Run `scripts/lock-enrollment-status-truth.sql` to see current state
3. Paste output for diagnosis

If approval endpoint fails:
1. Check that `program_enrollments` table exists
2. Verify enrollment has `student_id` column (not `user_id`)
3. Check that enrollment status is pre-approval state
4. Verify admin authentication

## Success Criteria

- ✅ `profiles.enrollment_status` is NOT NULL with correct constraint
- ✅ Approval endpoint uses `program_enrollments` table
- ✅ Admin-only authorization enforced
- ✅ Orchestration generates enrollment steps
- ✅ Notifications sent to student and program holder
- ✅ Audit trail logged
