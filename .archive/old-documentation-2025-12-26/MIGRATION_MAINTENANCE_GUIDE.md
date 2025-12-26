# Migration Maintenance Guide

## Overview

This guide defines the strategy and process for managing database migrations in the Elevate for Humanity platform.

## Migration Philosophy

### Core Principles:

1. **Migrations are append-only** - Never edit existing migrations
2. **One migration = one logical change** - Keep migrations focused
3. **Idempotent where possible** - Use IF NOT EXISTS, IF EXISTS
4. **Test before production** - Always test on local/staging first
5. **Document breaking changes** - Clear commit messages

## Naming Convention

### Format:

```
YYYYMMDD_descriptive_name.sql
```

### Examples:

- `20251222_create_programs_table.sql`
- `20251223_add_featured_column_to_programs.sql`
- `20251224_fix_enrollments_foreign_key.sql`

### Rules:

- **Date**: When migration was created (YYYYMMDD format)
- **Name**: What it does (create, add, fix, remove, update)
- **Underscores**: Separate words for readability
- **Lowercase**: All lowercase for consistency

## Migration Types

### 1. Schema Migrations (CREATE, ALTER, DROP)

```sql
-- Create new table
CREATE TABLE IF NOT EXISTS public.new_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add column
ALTER TABLE public.existing_table
  ADD COLUMN IF NOT EXISTS new_column TEXT;

-- Add index
CREATE INDEX IF NOT EXISTS idx_table_column
  ON public.table(column);
```

### 2. Data Migrations (INSERT, UPDATE, DELETE)

```sql
-- Insert seed data
INSERT INTO public.programs (slug, name, is_active)
VALUES ('new-program', 'New Program', true)
ON CONFLICT (slug) DO NOTHING;

-- Update existing data
UPDATE public.programs
SET featured = true
WHERE slug IN ('barber', 'hvac', 'cna');
```

### 3. RLS Policy Migrations

```sql
-- Drop old policy
DROP POLICY IF EXISTS "old_policy_name" ON public.table_name;

-- Create new policy
CREATE POLICY "new_policy_name"
  ON public.table_name
  FOR SELECT
  USING (is_active = true);
```

### 4. Function/Trigger Migrations

```sql
-- Create or replace function
CREATE OR REPLACE FUNCTION public.function_name()
RETURNS TRIGGER AS $$
BEGIN
  -- Function logic
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_name ON public.table_name;
CREATE TRIGGER trigger_name
  BEFORE UPDATE ON public.table_name
  FOR EACH ROW
  EXECUTE FUNCTION public.function_name();
```

## Creating New Migrations

### Step 1: Identify the Change

- What needs to be added/modified/removed?
- Which tables are affected?
- Are there dependencies?

### Step 2: Create Migration File

```bash
# Generate filename with today's date
DATE=$(date +%Y%m%d)
FILENAME="${DATE}_your_description.sql"

# Create file
touch supabase/migrations/$FILENAME
```

### Step 3: Write Migration

```sql
-- Add header comment
-- Description: What this migration does
-- Dependencies: Which tables/migrations it depends on
-- Breaking: Yes/No - Does this break existing functionality?

-- Your SQL here
CREATE TABLE IF NOT EXISTS public.your_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns
);
```

### Step 4: Test Locally

```bash
# Reset local database
supabase db reset

# Verify migration applied
supabase migration list

# Test functionality
psql -f your_test_queries.sql
```

### Step 5: Commit and Deploy

```bash
# Add migration
git add supabase/migrations/$FILENAME

# Commit with clear message
git commit -m "feat(db): add your_table for feature_name

- Creates your_table with columns x, y, z
- Adds indexes for performance
- Enables RLS with public read policy

Closes #123"

# Push to trigger CI/CD
git push origin main
```

## Handling Conflicts

### Scenario 1: Two Migrations Create Same Table

**Problem:** Migration A and Migration B both create `programs` table

**Solution:**

```bash
# Create conflict resolution migration
cat > supabase/migrations/20251223_resolve_programs_conflict.sql << 'SQL'
-- Resolve conflict: merge both definitions

-- Ensure table exists with all columns from both migrations
ALTER TABLE IF EXISTS public.programs
  ADD COLUMN IF NOT EXISTS column_from_migration_a TEXT,
  ADD COLUMN IF NOT EXISTS column_from_migration_b TEXT;

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_from_migration_a ON public.programs(column_a);
CREATE INDEX IF NOT EXISTS idx_from_migration_b ON public.programs(column_b);
SQL

# Archive conflicting migrations
mv supabase/migrations/migration_a.sql supabase/migrations/archive/
mv supabase/migrations/migration_b.sql supabase/migrations/archive/
```

### Scenario 2: Migration Depends on Non-Existent Table

**Problem:** Migration references table that doesn't exist yet

**Solution:**

```sql
-- Check if table exists before referencing
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'dependency_table') THEN
    -- Your migration logic
    ALTER TABLE public.your_table
      ADD COLUMN dependency_id UUID REFERENCES public.dependency_table(id);
  ELSE
    RAISE NOTICE 'Dependency table does not exist yet, skipping';
  END IF;
END $$;
```

### Scenario 3: RLS Policy Conflicts

**Problem:** Multiple migrations create conflicting RLS policies

**Solution:**

```sql
-- Drop all conflicting policies
DROP POLICY IF EXISTS "policy_v1" ON public.table_name;
DROP POLICY IF EXISTS "policy_v2" ON public.table_name;
DROP POLICY IF EXISTS "policy_v3" ON public.table_name;

-- Create single consolidated policy
CREATE POLICY "consolidated_policy"
  ON public.table_name
  FOR ALL
  USING (
    -- Merged logic from all versions
    condition_from_v1 OR condition_from_v2 OR condition_from_v3
  );
```

## Rolling Back Migrations

### Supabase Doesn't Support Automatic Rollback

You must create a reverse migration manually.

### Example:

```sql
-- Original migration: 20251222_add_featured_column.sql
ALTER TABLE public.programs
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Rollback migration: 20251223_remove_featured_column.sql
ALTER TABLE public.programs
  DROP COLUMN IF EXISTS featured;
```

### Rollback Process:

1. Create reverse migration
2. Test on local database
3. Apply to staging
4. Verify functionality
5. Apply to production
6. Monitor for issues

## Common Patterns

### Adding a Column

```sql
ALTER TABLE public.table_name
  ADD COLUMN IF NOT EXISTS column_name TEXT;

-- Set default for existing rows
UPDATE public.table_name
SET column_name = 'default_value'
WHERE column_name IS NULL;

-- Make NOT NULL if required
ALTER TABLE public.table_name
  ALTER COLUMN column_name SET NOT NULL;
```

### Adding a Foreign Key

```sql
-- Ensure referenced table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'referenced_table') THEN
    ALTER TABLE public.table_name
      ADD COLUMN IF NOT EXISTS foreign_key_id UUID REFERENCES public.referenced_table(id);
  END IF;
END $$;
```

### Renaming a Column

```sql
-- Rename column (careful - breaks existing queries)
ALTER TABLE public.table_name
  RENAME COLUMN old_name TO new_name;

-- Better: Add new column, copy data, deprecate old
ALTER TABLE public.table_name
  ADD COLUMN IF NOT EXISTS new_name TEXT;

UPDATE public.table_name
SET new_name = old_name
WHERE new_name IS NULL;

-- Mark old column as deprecated in comments
COMMENT ON COLUMN public.table_name.old_name IS 'DEPRECATED: Use new_name instead';
```

## Testing Checklist

Before deploying a migration:

- [ ] Migration file named correctly (YYYYMMDD_description.sql)
- [ ] Uses IF NOT EXISTS / IF EXISTS for idempotency
- [ ] Tested on local database (supabase db reset)
- [ ] No syntax errors
- [ ] No foreign key violations
- [ ] RLS policies don't block intended access
- [ ] Indexes added for performance
- [ ] Triggers work correctly
- [ ] Data migrations preserve existing data
- [ ] Commit message is clear
- [ ] Breaking changes documented

## Monitoring

### After Deployment:

1. Check Supabase logs for errors
2. Verify tables/columns exist
3. Test critical user flows
4. Monitor performance (slow queries)
5. Check RLS policy effectiveness

### Tools:

```bash
# Check applied migrations
supabase migration list

# View logs
supabase logs

# Connect to database
psql $(supabase db url)

# Run verification queries
psql -f VERIFY_RLS_POLICIES.sql
psql -f MAP_DEPENDENCIES.sql
```

## Emergency Procedures

### Production Migration Fails:

1. **Don't panic** - Database is likely in partial state
2. **Check logs** - Identify exact error
3. **Assess impact** - Is site down? Partially broken?
4. **Rollback if needed** - Restore from backup
5. **Fix migration** - Create corrected version
6. **Test thoroughly** - On staging with production data clone
7. **Re-deploy** - During maintenance window

### Data Loss Prevention:

- Always backup before major migrations
- Test on staging with production data clone
- Use transactions where possible
- Have rollback plan ready

## Best Practices

### DO:

✅ Use descriptive migration names
✅ Add comments explaining complex logic
✅ Test on local database first
✅ Use IF NOT EXISTS / IF EXISTS
✅ Keep migrations focused (one change)
✅ Document breaking changes
✅ Review migrations in PR

### DON'T:

❌ Edit existing migrations
❌ Skip testing
❌ Deploy directly to production
❌ Create circular dependencies
❌ Expose sensitive data in migrations
❌ Use hardcoded IDs (use slugs/names)
❌ Forget to add indexes

## Resources

- [Supabase Migration Docs](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- Project-specific docs:
  - `CONSOLIDATED_SCHEMA.sql` - Current schema
  - `MIGRATION_SEQUENCE.md` - Migration order
  - `DATABASE_DEPENDENCY_MAP.md` - Table dependencies
  - `VERIFY_RLS_POLICIES.sql` - RLS verification queries
