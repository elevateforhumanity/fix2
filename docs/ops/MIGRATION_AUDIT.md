# Migration Audit Report

**Generated**: 2025-12-17  
**Total Migrations**: 200+  
**Status**: ⚠️ NEEDS CONSOLIDATION

## Issues Identified

### 1. Duplicate Migration Numbers

Multiple migrations share the same timestamp prefix, causing ordering ambiguity:

- `006_org_invites_rls_fix.sql` and `006_purchases.sql`
- `007_reporting_views_safe.sql` and `007_rls_policies.sql`
- Multiple `20241129_*` migrations (15+ files)
- Multiple `20241116_*` migrations (7+ files)
- Multiple `20251218_*` migrations (8+ files)

**Risk**: Undefined execution order, potential dependency failures.

### 2. Naming Inconsistencies

Three different naming patterns in use:

- **Sequential**: `001_init_schema.sql`, `002_courses.sql`
- **Timestamp**: `20231214000000_create_digital_purchases.sql`
- **Descriptive**: `applications_table.sql`, `create_mou_signatures.sql`

**Risk**: Difficult to determine execution order, maintenance confusion.

### 3. Archive Directory

`supabase/migrations/archive/` contains 30+ old migrations that may conflict with active migrations.

**Risk**: Accidental execution, schema conflicts.

### 4. Mega-Migration Files

Several files appear to be consolidations:

- `RUN_ALL_MIGRATIONS.sql`
- `archive/ALL_IN_ONE__paste_into_dashboard.sql`
- `archive/APPLY_ALL_MIGRATIONS.sql`
- `archive/000_CONSOLIDATED_SCHEMA.sql`

**Risk**: These may duplicate active migrations, causing constraint violations.

### 5. Missing Rollback Scripts

No corresponding rollback/down migrations found.

**Risk**: Cannot safely revert changes in production.

## Recommendations

### Immediate Actions

1. **Freeze New Migrations**
   - No new migrations until consolidation complete
   - Document all pending schema changes

2. **Audit Active Migrations**

   ```bash
   # Check which migrations have been applied
   psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres -c \
     "SELECT * FROM supabase_migrations.schema_migrations ORDER BY version;"
   ```

3. **Create Consolidated Schema**
   - Export current production schema as baseline
   - Create single `000_baseline_schema.sql`
   - Archive all pre-consolidation migrations

### Long-Term Strategy

1. **Adopt Timestamp Naming**
   - Format: `YYYYMMDDHHMMSS_descriptive_name.sql`
   - Ensures chronological ordering
   - Prevents collisions

2. **Implement Migration Checklist**
   - [ ] Migration is idempotent (safe to run multiple times)
   - [ ] Migration is additive-only (no breaking changes)
   - [ ] Migration includes rollback script
   - [ ] Migration tested in staging
   - [ ] Migration documented in changelog

3. **Automated Validation**
   - Add pre-commit hook to validate migration naming
   - Check for duplicate timestamps
   - Verify idempotency patterns (IF NOT EXISTS, etc.)

4. **Migration Review Process**
   - All migrations require code review
   - Staging deployment required before production
   - Document breaking changes in CHANGELOG.md

## Migration Consolidation Plan

### Phase 1: Baseline (Week 1)

1. Export current production schema
2. Create `000_baseline_schema.sql`
3. Move all existing migrations to `archive/pre_consolidation/`
4. Update `supabase_migrations.schema_migrations` table

### Phase 2: New Migration System (Week 2)

1. Implement timestamp-based naming
2. Add migration validation script
3. Create migration template
4. Document migration guidelines

### Phase 3: Cleanup (Week 3)

1. Remove duplicate/conflicting migrations from archive
2. Document schema evolution in `docs/SCHEMA_HISTORY.md`
3. Create rollback scripts for critical tables

## Current State Analysis

### Core Tables (Verified Present)

- ✅ `organizations` - Multi-tenant root
- ✅ `profiles` - User profiles
- ✅ `students` - Student records
- ✅ `courses` - Course catalog
- ✅ `enrollments` - Student enrollments
- ✅ `org_invites` - Organization invitations
- ✅ `system_errors` - Error logging

### RLS Policies (Verified Present)

- ✅ Organization-scoped access
- ✅ Token-based invite access
- ✅ Service role error logging

### Potential Conflicts

- Multiple `courses` table definitions across migrations
- Multiple `programs` table definitions
- Duplicate RLS policy definitions

## Action Items

### For Buyer Handoff

1. **Document Current Schema**
   - Export full schema with comments
   - Create ER diagram
   - Document all RLS policies

2. **Provide Migration Guide**
   - How to create new migrations
   - How to test migrations
   - How to rollback if needed

3. **Clean Up Archive**
   - Remove unused migrations
   - Document what was archived and why

### For Production Stability

1. **Verify Applied Migrations**

   ```sql
   SELECT version, name, inserted_at
   FROM supabase_migrations.schema_migrations
   ORDER BY version DESC
   LIMIT 50;
   ```

2. **Test Idempotency**
   - Re-run all active migrations in staging
   - Verify no errors or conflicts

3. **Create Emergency Rollback Plan**
   - Document critical tables
   - Prepare rollback scripts
   - Test restore from backup

## Migration Best Practices

### DO

- ✅ Use `IF NOT EXISTS` for all CREATE statements
- ✅ Use `IF EXISTS` for all DROP statements
- ✅ Add indexes after data population
- ✅ Use transactions for multi-statement migrations
- ✅ Test in staging before production
- ✅ Document breaking changes

### DON'T

- ❌ Drop tables without backup
- ❌ Modify existing columns (add new ones instead)
- ❌ Remove RLS policies without replacement
- ❌ Use `CASCADE` without careful consideration
- ❌ Assume migration order
- ❌ Skip testing

## Monitoring

### Post-Migration Checks

```sql
-- Verify table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'your_table'
);

-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'your_table';

-- Verify policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'your_table';

-- Check for missing indexes
SELECT schemaname, tablename, attname
FROM pg_stats
WHERE schemaname = 'public'
AND n_distinct > 100
AND tablename NOT IN (
  SELECT tablename FROM pg_indexes WHERE schemaname = 'public'
);
```

## Conclusion

The migration system requires consolidation before production handoff. Current state is functional but not maintainable. Recommend completing consolidation plan before buyer handoff to ensure clean, documented schema evolution.
