# Migration Sequence - Correct Dependency Order

## Current State

- 230+ migrations in `/supabase/migrations/`
- All use YYYYMMDD format (after Phase B cleanup)
- Alphabetical order = chronological order

## Dependency-Ordered Sequence

### Phase 1: Foundation (No dependencies)

```
20231214000000_create_digital_purchases.sql
20240108000000_create_products_table.sql
20251205082111_create_programs_table.sql
20251203_roles_and_profiles.sql
```

**Creates:**

- Extensions (uuid-ossp, pgcrypto)
- Base tables (programs, products, profiles)
- No foreign keys yet

### Phase 2: Content Structure (Depends on programs)

```
20241209_hybrid_learning_tables.sql (modules, lessons)
20240109000000_create_courses_table.sql
20251205_programs_complete.sql
```

**Creates:**

- modules → programs
- lessons → modules
- courses (alternative structure)

### Phase 3: User Interactions (Depends on auth.users + programs)

```
20251204022427_create_applications_table.sql
20241126_create_enrollments.sql
20251218_student_onboarding.sql
```

**Creates:**

- applications → programs (optional FK)
- enrollments → programs + auth.users
- onboarding flows

### Phase 4: Progress Tracking (Depends on enrollments + lessons)

```
20251116020545_lesson_progress.sql
20251116020748_course_completion_view.sql
20241201_certificates_enhancement.sql
```

**Creates:**

- lesson_progress → enrollments + lessons
- module_progress → enrollments + modules
- certificates → enrollments

### Phase 5: Advanced Features

```
20241213_ai_instructors.sql
20251215_ai_chat.sql
20241118_events_management.sql
20241118_marketing_automation.sql
```

**Creates:**

- AI instructors, conversations, messages
- Events, campaigns, contacts
- Advanced LMS features

### Phase 6: Commerce & Payments

```
20240119_payments.sql
20241214_funding_payments.sql
20251218_drug_testing_orders.sql
```

**Creates:**

- payments, purchases
- Stripe integration
- Drug testing orders (partner feature)

### Phase 7: Partner/Admin Features

```
20241207_program_holders.sql
20251218_shop_partner_portal.sql
20251220_program_holder_documents.sql
```

**Creates:**

- program_holders
- partner portal tables
- document management

### Phase 8: RLS & Security (Must be LAST)

```
20251222_cleanup_migration_conflicts.sql
20251222_resolve_programs_schema_conflict.sql
20251222_fix_rls_public_access.sql
```

**Applies:**

- Schema normalization
- Conflict resolution
- RLS policies (after all tables exist)

## Migration Naming Convention

**Format:** `YYYYMMDD_descriptive_name.sql`

**Rules:**

1. Date = when migration was created
2. Name = what it does (create_X, add_Y, fix_Z)
3. One migration = one logical change
4. Dependencies must have earlier dates

## Conflict Resolution Strategy

When two migrations conflict:

1. **Check dates** - later migration should handle conflict
2. **Check content** - which is more complete?
3. **Merge or archive** - consolidate into one, archive the other
4. **Add cleanup migration** - fix any gaps

## Current Conflicts Resolved

✅ **programs table** - Merged simple + rich schemas (20251222_resolve_programs_schema_conflict.sql)
✅ **RLS policies** - Removed deny-all, added proper policies (20251222_fix_rls_public_access.sql)
✅ **Numbered migrations** - Archived to archive-phase-b/

## Remaining Issues

⚠️ **Multiple lockdown migrations** - 13 files from Dec 19-22

- Keep only: `20251222_fix_rls_public_access.sql`
- Archive others to prevent conflicts

⚠️ **Duplicate seed data** - Programs inserted multiple times

- Consolidate into single seed file
- Use ON CONFLICT DO NOTHING

⚠️ **Inconsistent field names** - Some tables use different names

- `is_active` vs `active`
- `status` vs `is_published`
- `user_id` vs `profile_id`
- Fix in cleanup migration

## Testing Migration Sequence

### On Fresh Database:

```bash
# Reset database
supabase db reset

# Migrations apply in alphabetical order
# Should complete without errors

# Verify tables exist
psql -c "\dt public.*"

# Verify RLS enabled
psql -f VERIFY_RLS_POLICIES.sql

# Verify dependencies
psql -f MAP_DEPENDENCIES.sql
```

### On Production:

```bash
# Check which migrations are applied
psql -f CHECK_APPLIED_MIGRATIONS.sql

# Apply new migrations only
supabase db push

# Verify no breaking changes
# Run smoke tests
```

## Maintenance Process

### Adding New Migration:

1. Create file: `YYYYMMDD_description.sql`
2. Use `CREATE TABLE IF NOT EXISTS`
3. Use `ALTER TABLE IF EXISTS ADD COLUMN IF NOT EXISTS`
4. Test on local database first
5. Commit and push
6. Apply to staging
7. Apply to production

### Fixing Conflicts:

1. Identify conflicting migrations
2. Create new migration to resolve
3. Archive old conflicting files
4. Document in commit message

### Rolling Back:

1. Supabase doesn't support automatic rollback
2. Create reverse migration manually
3. Test thoroughly before applying
4. Document rollback steps

## Next Steps

1. ✅ Archive remaining lockdown migrations
2. ✅ Consolidate seed data
3. ✅ Test clean apply on fresh database
4. ✅ Document any remaining conflicts
5. ✅ Create migration maintenance guide
