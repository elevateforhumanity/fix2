# Database Setup Guide

Complete guide to setting up the Elevate for Humanity database.

## Prerequisites

- Supabase project created
- Database URL available
- `psql` or Supabase SQL Editor access

## Step 1: Run Migrations

Migrations are located in `/supabase/migrations/` and should be run in order:

### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Run each migration file in order:

```sql
-- 1. Create migration tracking system
-- Copy contents of: supabase/migrations/20251227_create_migration_tracking.sql
-- Paste and run

-- 2. Create missing tables
-- Copy contents of: supabase/migrations/20251227_create_missing_tables.sql
-- Paste and run

-- 3. Fix RLS security
-- Copy contents of: supabase/migrations/20251227_fix_rls_security_critical.sql
-- Paste and run

-- 4. Fix schema mismatches
-- Copy contents of: supabase/migrations/20251227_fix_schema_mismatches.sql
-- Paste and run

-- 5. Add SCORM tables
-- Copy contents of: supabase/migrations/20251228_add_scorm_tables.sql
-- Paste and run
```

### Option B: Via Command Line

```bash
# Set your database URL
export DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Run migrations in order
psql $DATABASE_URL -f supabase/migrations/20251227_create_migration_tracking.sql
psql $DATABASE_URL -f supabase/migrations/20251227_create_missing_tables.sql
psql $DATABASE_URL -f supabase/migrations/20251227_fix_rls_security_critical.sql
psql $DATABASE_URL -f supabase/migrations/20251227_fix_schema_mismatches.sql
psql $DATABASE_URL -f supabase/migrations/20251228_add_scorm_tables.sql
```

### Verify Migrations

```sql
-- Check migration history
SELECT * FROM migration_history ORDER BY applied_at DESC;

-- Should show 5 migrations applied
```

## Step 2: Seed Program Data

Program data is split into 6 files for easier management:

### Via Supabase Dashboard

1. Go to **SQL Editor**
2. Run each program seed file in order:

```sql
-- Run these in order:
-- 1. supabase/migrations/programs_part_0
-- 2. supabase/migrations/programs_part_1
-- 3. supabase/migrations/programs_part_2
-- 4. supabase/migrations/programs_part_3
-- 5. supabase/migrations/programs_part_4
-- 6. supabase/migrations/programs_part_5
```

### Via Command Line

```bash
# Seed all programs
for i in {0..5}; do
  psql $DATABASE_URL -f supabase/migrations/programs_part_$i
done
```

### Verify Seeding

```sql
-- Check programs were created
SELECT COUNT(*) FROM programs;
-- Should return 30+ programs

-- Check program details
SELECT id, title, slug, category FROM programs LIMIT 10;
```

## Step 3: Configure Environment Variables

Update your `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (for migrations)
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

# Optional: Email Service (when ready)
# RESEND_API_KEY=your-resend-key

# Optional: Payment Processing
# AFFIRM_PUBLIC_KEY=your-affirm-public-key
# AFFIRM_PRIVATE_KEY=your-affirm-private-key
```

## Step 4: Verify Setup

### Check Tables Exist

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should include:
-- - profiles
-- - programs
-- - courses
-- - lessons
-- - enrollments
-- - applications
-- - marketplace_creators
-- - marketplace_products
-- - marketplace_sales
-- - program_holder_documents
-- - program_holder_verification
-- - scorm_packages
-- - scorm_attempts
-- And many more...
```

### Check RLS Policies

```sql
-- List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Should NOT see any "deny_all" PERMISSIVE policies
-- Should see proper policies like:
-- - users_read_own_profile
-- - admins_read_all_profiles
-- - public_view_approved_products
-- etc.
```

### Test Authentication

```sql
-- Create a test user (via Supabase Auth UI or API)
-- Then verify profile was created:
SELECT * FROM profiles WHERE email = 'test@example.com';
```

## Step 5: Optional - Add Sample Data

For development/testing, you may want to add sample data:

### Sample Users

```sql
-- Note: Users should be created via Supabase Auth
-- This just shows the profile structure

-- Admin user profile (after creating auth user)
UPDATE profiles 
SET role = 'admin', 
    full_name = 'Admin User'
WHERE email = 'admin@example.com';

-- Student user profile
UPDATE profiles 
SET role = 'student',
    full_name = 'Test Student'
WHERE email = 'student@example.com';
```

### Sample Enrollments

```sql
-- Enroll test student in a program
INSERT INTO enrollments (
  user_id,
  program_id,
  status,
  enrolled_at
) VALUES (
  (SELECT id FROM profiles WHERE email = 'student@example.com'),
  (SELECT id FROM programs WHERE slug = 'barber-apprenticeship'),
  'active',
  NOW()
);
```

## Troubleshooting

### Migration Already Applied

If you see "migration already applied" errors:

```sql
-- Check what's been applied
SELECT * FROM schema_migrations;

-- If you need to re-run (DANGER - only in development):
DELETE FROM schema_migrations WHERE version = '20251227_xxx';
```

### RLS Policy Errors

If you get permission denied errors:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Disable RLS temporarily for debugging (DANGER - only in development):
ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;

-- Re-enable after fixing:
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

### Missing Tables

If tables are missing:

```sql
-- Check if migration was applied
SELECT * FROM schema_migrations 
WHERE version = '20251227_create_missing_tables';

-- If not applied, run the migration again
```

### Seeding Errors

If program seeding fails:

```sql
-- Check for existing programs
SELECT COUNT(*) FROM programs;

-- If programs exist and you want to re-seed:
TRUNCATE programs CASCADE;

-- Then re-run seed files
```

## Maintenance

### Backup Database

```bash
# Via pg_dump
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Via Supabase Dashboard
# Go to Database > Backups > Create Backup
```

### Monitor Performance

```sql
-- Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Update Statistics

```sql
-- Analyze all tables for better query planning
ANALYZE;

-- Vacuum to reclaim space
VACUUM ANALYZE;
```

## Next Steps

After database setup:

1. ✅ Verify all migrations applied
2. ✅ Verify programs seeded
3. ✅ Test authentication
4. ✅ Test RLS policies
5. [ ] Deploy application
6. [ ] Test in production
7. [ ] Monitor for errors
8. [ ] Set up automated backups

## Support

For issues:
- Check `migration_history` view
- Review `SITE-AUDIT-REPORT.md`
- Check Supabase logs
- Review `DATABASE_AUDIT_REPORT.md` (if exists)

---

**Last Updated**: 2025-12-29
**Migration Version**: 20251228
**Total Migrations**: 5
**Total Programs**: 30+
