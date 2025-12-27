# Migration Cleanup Plan

## Current Disaster

- **254 migration files**
- **480 unique tables** defined
- **74 tables** created in multiple files
- **661 total CREATE TABLE statements**

Worst offender: `public` table created **76 times**

## Why This Happened

1. **No migration tracking** - No record of what ran
2. **"Complete schema" files** - People kept creating files with ALL tables
3. **Copy-paste development** - Duplicated entire migration files
4. **IF NOT EXISTS** - Masked the problem, last one wins

## The Fix Strategy

### Phase 1: Export Current State (SAFE)
✅ Already done - we have actual database schema

### Phase 2: Create Single Source of Truth

**Option A: Conservative (Recommended)**
1. Keep all existing migration files (don't delete anything)
2. Create new `20251227_consolidated_schema.sql` with actual DB state
3. Add migration tracking table
4. Mark all old migrations as "applied"
5. Future migrations run from clean baseline

**Option B: Nuclear (Risky)**
1. Archive all 254 migration files
2. Create single consolidated migration
3. Requires testing in staging first
4. Risk of data loss if done wrong

### Phase 3: Prevent Future Mess

1. **Add migration tracking table**
```sql
CREATE TABLE schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. **Enforce naming convention**
   - Sequential numbers: `001_initial.sql`, `002_add_users.sql`
   - Or timestamps: `20251227120000_description.sql`

3. **CI/CD checks**
   - Verify migrations run in order
   - Check for duplicate table definitions
   - Validate schema matches TypeScript

## Recommended Action: Conservative Approach

### Step 1: Create Consolidated Schema

Export current database schema as single file:
```sql
-- This represents the ACTUAL current state
-- All 254 previous migrations led to this
```

### Step 2: Add Migration Tracking

```sql
CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  description TEXT
);

-- Mark all existing migrations as applied
INSERT INTO schema_migrations (version, description)
SELECT 
  regexp_replace(filename, '\.sql$', ''),
  'Legacy migration - pre-consolidation'
FROM (
  VALUES 
    ('20231214000000_create_digital_purchases'),
    ('20231214000001_create_marketplace_tables'),
    -- ... all 254 files
) AS t(filename)
ON CONFLICT DO NOTHING;
```

### Step 3: Archive Old Files

```bash
mkdir -p supabase/migrations/archive-pre-consolidation
mv supabase/migrations/2*.sql supabase/migrations/archive-pre-consolidation/
```

### Step 4: Future Migrations

All new migrations:
1. Check `schema_migrations` table first
2. Run only if not already applied
3. Record in tracking table

## What This Achieves

✅ **Preserves history** - Old files archived, not deleted
✅ **Clean slate** - New migrations start from known state
✅ **Prevents duplicates** - Tracking table enforces once-only
✅ **No data loss** - Database unchanged, just better managed

## What NOT To Do

❌ **Don't drop and recreate tables** - Will lose data
❌ **Don't delete migration files** - Lose history
❌ **Don't run all 254 files again** - Will cause conflicts

## Next Steps

1. **Review this plan** - Make sure you understand it
2. **Backup database** - Always backup before major changes
3. **Create consolidated schema** - I can generate this
4. **Test in staging** - If you have one
5. **Apply to production** - Once tested

## Time Estimate

- Generate consolidated schema: 30 minutes
- Create migration tracking: 10 minutes
- Archive old files: 5 minutes
- Test and verify: 1 hour
- **Total: ~2 hours**

## Risk Level

**Conservative approach: LOW RISK**
- No data changes
- No table drops
- Just better organization

**Nuclear approach: HIGH RISK**
- Could lose data
- Requires extensive testing
- Not recommended

