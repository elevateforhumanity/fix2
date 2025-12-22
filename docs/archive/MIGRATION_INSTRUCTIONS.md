# Database Migration Instructions

## Migration File

`supabase/migrations/20241221_enrollment_steps.sql`

## Method 1: Supabase Dashboard (Recommended)

### Steps:

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase/migrations/20241221_enrollment_steps.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Ctrl+Enter)
8. Wait for success confirmation

### Verification:

```sql
-- Check table exists
SELECT * FROM enrollment_steps LIMIT 1;

-- Check functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%enrollment_step%';

-- Expected functions:
-- 1. generate_enrollment_steps
-- 2. get_current_step
-- 3. advance_to_next_step
-- 4. mark_step_complete
-- 5. is_enrollment_complete
```

## Method 2: Supabase CLI

### Install CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Or using Homebrew (Mac)
brew install supabase/tap/supabase
```

### Link Project:

```bash
cd /workspaces/fix2
supabase link --project-ref <your-project-ref>
```

### Apply Migration:

```bash
supabase db push
```

## Method 3: Direct SQL Connection

If you have direct database access:

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" \
  -f supabase/migrations/20241221_enrollment_steps.sql
```

## What This Migration Does

### Creates:

1. **Table**: `enrollment_steps`
   - Tracks student progress through partner sequence
   - Fields: enrollment_id, provider_id, sequence_order, status, timestamps

2. **Functions**:
   - `generate_enrollment_steps(enrollment_id)` - Auto-creates steps
   - `get_current_step(enrollment_id)` - Returns active step
   - `advance_to_next_step(enrollment_id)` - Moves to next partner
   - `mark_step_complete(step_id, external_id)` - Completes and advances
   - `is_enrollment_complete(enrollment_id)` - Checks if all done

3. **RLS Policies**:
   - Students can view own steps
   - Admins can view all steps
   - Service role can modify steps

4. **Indexes**:
   - enrollment_id, status, sequence_order, provider_id

## After Migration

### Test the Functions:

```sql
-- Find a test enrollment
SELECT id FROM enrollments LIMIT 1;

-- Generate steps (replace <enrollment_id>)
SELECT generate_enrollment_steps('<enrollment_id>');

-- View created steps
SELECT * FROM enrollment_steps
WHERE enrollment_id = '<enrollment_id>'
ORDER BY sequence_order;

-- Get current step
SELECT * FROM get_current_step('<enrollment_id>');

-- Check if complete
SELECT is_enrollment_complete('<enrollment_id>');
```

## Troubleshooting

### Error: "relation already exists"

The table already exists. Safe to ignore or drop first:

```sql
DROP TABLE IF EXISTS enrollment_steps CASCADE;
```

### Error: "function already exists"

Functions already exist. Safe to ignore or use `CREATE OR REPLACE`.

### Error: "permission denied"

You need admin/owner access to the database. Use the Supabase Dashboard method.

### Error: "foreign key constraint"

Ensure these tables exist first:

- `enrollments`
- `partner_lms_providers`
- `program_partner_lms`

## Rollback

If you need to undo the migration:

```sql
-- Drop functions
DROP FUNCTION IF EXISTS generate_enrollment_steps CASCADE;
DROP FUNCTION IF EXISTS get_current_step CASCADE;
DROP FUNCTION IF EXISTS advance_to_next_step CASCADE;
DROP FUNCTION IF EXISTS mark_step_complete CASCADE;
DROP FUNCTION IF EXISTS is_enrollment_complete CASCADE;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_enrollment_steps_updated_at CASCADE;

-- Drop table
DROP TABLE IF EXISTS enrollment_steps CASCADE;
```

## Next Steps

After successful migration:

1. ✅ Test step generation
2. ✅ Test webhook integration
3. ✅ Verify student progress UI
4. ✅ Verify admin pipeline view
5. ✅ Configure partner webhooks
6. 🚀 Launch!
