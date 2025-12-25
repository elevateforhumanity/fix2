# Dashboard Consolidation Migration Instructions

**Migration File:** `supabase/migrations/20241224_dashboard_consolidation.sql`  
**Date:** 2024-12-24  
**Status:** Ready to apply

---

## What This Migration Does

### 1. Fixes Schema Drift

- Converts `profiles.role` from TEXT to `user_role` enum
- Adds missing enum values: staff, employer, super_admin, org_admin, board_member, workforce_board, parent
- Validates all existing role values before conversion

### 2. Adds Missing Columns

- `enrollments.course_id` - For LMS course flow
- `profiles.last_dashboard_visit` - For analytics
- `profiles.preferred_dashboard` - For multi-role users

### 3. Creates Dashboard Analytics

- `dashboard_visits` table - Tracks dashboard usage
- RLS policies for user privacy
- Admin access for analytics

### 4. Creates Redirect Mapping

- `dashboard_redirects` table - Maps legacy routes to canonical routes
- Pre-populated with known redirects:
  - `/portal/staff/dashboard` → `/staff-portal/dashboard`
  - `/portal/student/dashboard` → `/lms/dashboard`
  - `/student/dashboard` → `/lms/dashboard`
  - `/partner/dashboard` → `/program-holder/dashboard`

### 5. Adds Access Control Helper

- `user_can_access_dashboard()` function - Validates role-based access

---

## Pre-Migration Checklist

Before running this migration:

- [ ] **Backup database** - Take a full backup
- [ ] **Verify current state** - Run these queries:

```sql
-- Check current role data type
SELECT data_type FROM information_schema.columns
WHERE table_name='profiles' AND column_name='role';

-- Check existing role values
SELECT DISTINCT role, COUNT(*)
FROM profiles
WHERE role IS NOT NULL
GROUP BY role;

-- Check if any invalid role values exist
SELECT DISTINCT role
FROM profiles
WHERE role IS NOT NULL
  AND role NOT IN (
    'student', 'admin', 'program_holder', 'delegate',
    'instructor', 'auditor', 'staff', 'employer',
    'super_admin', 'org_admin', 'board_member',
    'workforce_board', 'parent'
  );
```

- [ ] **Check for blocking issues**:
  - Are there any role values that aren't in the enum list above?
  - If yes, either add them to the migration or update those users first

---

## How to Apply Migration

### Option 1: Supabase Dashboard (Recommended)

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy entire contents of `supabase/migrations/20241224_dashboard_consolidation.sql`
5. Paste into SQL Editor
6. Click **Run**
7. Check output for any errors or warnings

### Option 2: Supabase CLI

```bash
# From project root
supabase db push

# Or apply specific migration
supabase migration up
```

### Option 3: Direct psql

```bash
psql $DATABASE_URL -f supabase/migrations/20241224_dashboard_consolidation.sql
```

---

## Post-Migration Verification

After running the migration, verify it worked:

### 1. Check Role Type Conversion

```sql
SELECT column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'role';
```

**Expected:** `data_type = 'USER-DEFINED'`, `udt_name = 'user_role'`

### 2. Check Enum Values

```sql
SELECT enumlabel
FROM pg_enum
WHERE enumtypid = 'user_role'::regtype
ORDER BY enumsortorder;
```

**Expected:** All role values listed (student, admin, staff, instructor, etc.)

### 3. Check Role Distribution

```sql
SELECT role, COUNT(*) as user_count
FROM profiles
WHERE role IS NOT NULL
GROUP BY role
ORDER BY user_count DESC;
```

**Expected:** Same counts as before migration

### 4. Check New Columns

```sql
-- Check enrollments.course_id
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'enrollments' AND column_name = 'course_id';

-- Check profiles columns
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'profiles'
AND column_name IN ('last_dashboard_visit', 'preferred_dashboard');
```

**Expected:** All columns exist

### 5. Check New Tables

```sql
-- Check dashboard_visits
SELECT COUNT(*) FROM dashboard_visits;

-- Check dashboard_redirects
SELECT * FROM dashboard_redirects ORDER BY legacy_route;
```

**Expected:** Tables exist, redirects table has 5 rows

### 6. Test Access Control Function

```sql
-- Test with a real user ID (replace with actual UUID)
SELECT user_can_access_dashboard(
  'YOUR_USER_ID_HERE'::uuid,
  '/admin/dashboard'
);
```

**Expected:** Returns true/false based on user's role

---

## Troubleshooting

### Error: "Cannot convert profiles.role to enum"

**Cause:** There are role values in the database that aren't in the enum

**Fix:**

1. Run this query to find invalid values:

```sql
SELECT DISTINCT role
FROM profiles
WHERE role IS NOT NULL
  AND role NOT IN (
    SELECT enumlabel::text FROM pg_enum WHERE enumtypid = 'user_role'::regtype
  );
```

2. Either:
   - Add those values to the enum in the migration, OR
   - Update those users to valid role values first

### Error: "Relation already exists"

**Cause:** Migration was partially applied before

**Fix:**

1. Check what exists:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_name IN ('dashboard_visits', 'dashboard_redirects');
```

2. Either:
   - Comment out the parts that already exist, OR
   - Drop those tables and re-run (if safe)

### Warning: "Found X enrollments with invalid user_id"

**Cause:** Orphaned enrollment records

**Fix:**

```sql
-- Delete orphaned enrollments (CAREFUL - this deletes data)
DELETE FROM enrollments e
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = e.user_id
);
```

---

## Rollback Instructions

If you need to undo this migration:

```sql
-- 1. Convert role back to TEXT
ALTER TABLE profiles ALTER COLUMN role TYPE TEXT;

-- 2. Drop new columns
ALTER TABLE profiles DROP COLUMN last_dashboard_visit;
ALTER TABLE profiles DROP COLUMN preferred_dashboard;
ALTER TABLE enrollments DROP COLUMN course_id;

-- 3. Drop new tables
DROP TABLE dashboard_visits;
DROP TABLE dashboard_redirects;

-- 4. Drop function
DROP FUNCTION user_can_access_dashboard;
```

**WARNING:** Rollback will lose:

- Dashboard visit analytics
- Redirect mappings
- Preferred dashboard settings

---

## Next Steps After Migration

1. **Test Dashboard Routing**
   - Log in as each role type
   - Verify correct dashboard loads
   - Check no 404 errors

2. **Monitor Dashboard Visits**

   ```sql
   SELECT dashboard_route, COUNT(*) as visits
   FROM dashboard_visits
   WHERE visited_at > NOW() - INTERVAL '24 hours'
   GROUP BY dashboard_route
   ORDER BY visits DESC;
   ```

3. **Implement Redirect Pages**
   - Create App Router pages for legacy routes
   - Use `dashboard_redirects` table to determine destinations

4. **Update Application Code**
   - Remove any TEXT-based role checks
   - Use enum values consistently
   - Add dashboard visit tracking

---

## Support

If migration fails or you encounter issues:

1. **Check migration output** - Look for specific error messages
2. **Run verification queries** - Identify what succeeded/failed
3. **Check database logs** - Look for constraint violations
4. **Restore from backup** - If needed, restore and try again with fixes

---

## Migration Metadata

- **Author:** Ona
- **Date Created:** 2024-12-24
- **Database Version:** PostgreSQL 15+
- **Estimated Duration:** 1-2 minutes
- **Downtime Required:** No (migration is non-blocking)
- **Reversible:** Yes (see rollback instructions)

---

## Sign-Off

- [ ] Pre-migration checklist complete
- [ ] Backup taken
- [ ] Migration applied successfully
- [ ] Post-migration verification passed
- [ ] Dashboard routing tested
- [ ] No errors in application logs

**Applied by:** ******\_******  
**Date:** ******\_******  
**Database:** ******\_******  
**Notes:**
