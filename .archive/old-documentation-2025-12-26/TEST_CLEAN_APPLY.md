# Test Clean Apply on Fresh Database

## Prerequisites

- Supabase CLI installed
- Local Supabase instance running OR access to staging database
- Backup of production data (if testing on staging)

## Test Steps

### 1. Reset Database (Local)

```bash
# Start local Supabase
supabase start

# Reset to clean state
supabase db reset

# This will:
# - Drop all tables
# - Apply all migrations in order
# - Run seed.sql if present
```

### 2. Verify Migration Order

```bash
# Check migrations applied
supabase migration list

# Should show all migrations in YYYYMMDD order
# No errors or conflicts
```

### 3. Verify Tables Created

```bash
# Connect to local database
psql postgresql://postgres:postgres@localhost:54322/postgres

# List all tables
\dt public.*

# Expected core tables:
# - programs
# - profiles
# - modules
# - lessons
# - courses
# - enrollments
# - applications
# - lesson_progress
# - module_progress
# - certificates
# - products
# - purchases
# - ai_instructors
# - ai_conversations
```

### 4. Verify RLS Enabled

```bash
# Run verification queries
psql postgresql://postgres:postgres@localhost:54322/postgres -f VERIFY_RLS_POLICIES.sql

# Check output:
# - All core tables have RLS enabled
# - Public catalog tables allow anon SELECT
# - Student progress tables require auth
# - No deny_all policies remain
```

### 5. Verify Dependencies

```bash
# Check foreign keys
psql postgresql://postgres:postgres@localhost:54322/postgres -f MAP_DEPENDENCIES.sql

# Verify:
# - modules → programs
# - lessons → modules
# - enrollments → programs + auth.users
# - lesson_progress → enrollments + lessons
# - No circular dependencies
# - No missing FK targets
```

### 6. Test Public Access (Anon)

```bash
# Test as anonymous user
psql postgresql://postgres:postgres@localhost:54322/postgres << 'SQL'
SET ROLE anon;

-- Should return rows
SELECT COUNT(*) FROM public.programs WHERE is_active = true;

-- Should return rows
SELECT COUNT(*) FROM public.courses;

-- Should fail (no auth)
SELECT COUNT(*) FROM public.enrollments;

RESET ROLE;
SQL
```

### 7. Test Authenticated Access

```bash
# Create test user
psql postgresql://postgres:postgres@localhost:54322/postgres << 'SQL'
-- Insert test user (simulating Supabase Auth)
INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000001', 'test@example.com')
ON CONFLICT DO NOTHING;

-- Create profile
INSERT INTO public.profiles (id, email, full_name, role)
VALUES ('00000000-0000-0000-0000-000000000001', 'test@example.com', 'Test User', 'student')
ON CONFLICT DO NOTHING;

-- Test enrollment
INSERT INTO public.enrollments (user_id, program_id, status)
SELECT '00000000-0000-0000-0000-000000000001', id, 'active'
FROM public.programs
LIMIT 1;

-- Verify
SELECT * FROM public.enrollments WHERE user_id = '00000000-0000-0000-0000-000000000001';
SQL
```

### 8. Check for Errors

```bash
# Check Supabase logs
supabase logs

# Look for:
# - Migration errors
# - RLS policy errors
# - Foreign key violations
# - NULL constraint violations
```

## Expected Results

### ✅ Success Criteria:

- All 200 migrations apply without errors
- All core tables exist
- RLS enabled on all tables
- Public catalog accessible (anon SELECT works)
- Student data protected (auth required)
- Foreign keys valid
- No orphaned tables
- No conflicting policies

### ❌ Failure Indicators:

- Migration fails to apply
- Tables missing
- RLS not enabled
- Public catalog blocked
- Foreign key errors
- NULL constraint violations
- Circular dependencies

## Troubleshooting

### Migration Fails:

```bash
# Check which migration failed
supabase migration list

# View migration content
cat supabase/migrations/FAILED_MIGRATION.sql

# Check for:
# - Missing dependencies (table doesn't exist yet)
# - Duplicate table creation
# - Invalid foreign keys
# - Syntax errors
```

### RLS Blocks Access:

```bash
# Check policies
psql -f VERIFY_RLS_POLICIES.sql

# Look for:
# - deny_all policies
# - Missing SELECT policies for public tables
# - Overly restrictive USING clauses
```

### Foreign Key Errors:

```bash
# Check dependencies
psql -f MAP_DEPENDENCIES.sql

# Verify:
# - Referenced table exists
# - Referenced column exists
# - Data types match
```

## Staging/Production Testing

### Before Applying to Production:

1. ✅ Test on local database (clean apply)
2. ✅ Test on staging database (with production data clone)
3. ✅ Run smoke tests on staging
4. ✅ Verify no breaking changes
5. ✅ Create rollback plan
6. ✅ Schedule maintenance window
7. ✅ Apply to production
8. ✅ Monitor logs for 24 hours

### Rollback Plan:

```bash
# If migrations break production:
# 1. Restore from backup
# 2. Identify failing migration
# 3. Create fix migration
# 4. Test on staging
# 5. Re-apply to production
```

## Automated Testing (Future)

```bash
# Create test script
cat > test_migrations.sh << 'SCRIPT'
#!/bin/bash
set -e

echo "Starting migration test..."

# Reset database
supabase db reset

# Verify tables
psql -c "\dt public.*" | grep -q "programs" || exit 1
psql -c "\dt public.*" | grep -q "enrollments" || exit 1

# Verify RLS
psql -f VERIFY_RLS_POLICIES.sql

# Test anon access
psql -c "SET ROLE anon; SELECT COUNT(*) FROM public.programs;" || exit 1

echo "✅ All tests passed"
SCRIPT

chmod +x test_migrations.sh
./test_migrations.sh
```

## Next Steps

After successful clean apply:

1. Document any remaining issues
2. Create maintenance guide
3. Set up CI/CD for migration testing
4. Schedule regular database audits
