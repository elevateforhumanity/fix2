# SQL Files Guide

Quick reference for all SQL files in the repository.

## Setup Files (Run in Order)

### 1. COPY-PASTE-SQL.sql
**Purpose**: Complete database setup with all migrations
**Size**: 1224 lines
**Run**: Once in new database
**Contains**:
- Migration tracking system
- All core tables (50+)
- RLS security policies
- Schema fixes
- SCORM tables

**How to use**:
1. Open Supabase SQL Editor
2. Copy entire file
3. Paste and run
4. Wait for completion (~30 seconds)

---

### 2. COPY-PASTE-PROGRAMS.sql
**Purpose**: Seed all training programs
**Size**: 1169 lines
**Run**: After COPY-PASTE-SQL.sql
**Contains**:
- 30+ training programs
- All program details
- Categories, pricing, credentials
- WIOA approval status

**How to use**:
1. Open Supabase SQL Editor
2. Copy entire file
3. Paste and run
4. Ignore "duplicate key" errors if re-running

---

## Verification Files (Run After Setup)

### 3. VERIFY-AFTER-MIGRATION.sql
**Purpose**: Verify database setup completed successfully
**Run**: After COPY-PASTE-SQL.sql
**Checks**:
- Migration tracking created
- All tables exist (50+)
- RLS policies applied
- Programs table ready

**Expected Output**: "✅ Database setup looks good!"

---

### 4. VERIFY-PROGRAMS-SEEDED.sql
**Purpose**: Verify programs were seeded correctly
**Run**: After COPY-PASTE-PROGRAMS.sql
**Checks**:
- Program count (should be 30+)
- Programs by category
- WIOA-approved programs
- Data completeness

**Expected Output**: "✅ Programs seeded successfully!"

---

## Individual Migration Files (Advanced)

Located in `/supabase/migrations/`

### Core Migrations

1. **20251227_create_migration_tracking.sql**
   - Creates migration tracking system
   - Prevents duplicate migrations
   - Marks legacy migrations as applied

2. **20251227_create_missing_tables.sql**
   - Creates all core tables
   - Profiles, programs, courses, enrollments
   - Marketplace, LMS, applications

3. **20251227_fix_rls_security_critical.sql**
   - Fixes broken RLS policies
   - Adds proper security policies
   - Protects sensitive data

4. **20251227_fix_schema_mismatches.sql**
   - Fixes TypeScript/database mismatches
   - Adds missing columns
   - Adds sync triggers

5. **20251228_add_scorm_tables.sql**
   - Adds SCORM support tables
   - Package management
   - Attempt tracking

### Program Seed Files

- **programs_part_0** through **programs_part_5**
- Split for easier management
- Combined in COPY-PASTE-PROGRAMS.sql
- No `.sql` extension (legacy format)

---

## Quick Start Commands

### For Supabase Dashboard (Recommended)

```
1. Run: COPY-PASTE-SQL.sql
2. Verify: VERIFY-AFTER-MIGRATION.sql
3. Run: COPY-PASTE-PROGRAMS.sql
4. Verify: VERIFY-PROGRAMS-SEEDED.sql
```

### For Command Line

```bash
# Set database URL
export DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Run migrations
psql $DATABASE_URL -f COPY-PASTE-SQL.sql

# Verify migrations
psql $DATABASE_URL -f VERIFY-AFTER-MIGRATION.sql

# Seed programs
psql $DATABASE_URL -f COPY-PASTE-PROGRAMS.sql

# Verify programs
psql $DATABASE_URL -f VERIFY-PROGRAMS-SEEDED.sql
```

---

## Troubleshooting

### "relation does not exist"
**Problem**: Trying to verify before running setup
**Solution**: Run COPY-PASTE-SQL.sql first

### "duplicate key value"
**Problem**: Trying to seed programs twice
**Solution**: This is safe - programs already exist

### "permission denied"
**Problem**: Wrong credentials
**Solution**: Use Supabase SQL Editor or service role key

### "syntax error"
**Problem**: Incomplete copy/paste
**Solution**: Copy ENTIRE file from first to last line

---

## File Sizes

| File | Lines | Purpose |
|------|-------|---------|
| COPY-PASTE-SQL.sql | 1224 | All migrations |
| COPY-PASTE-PROGRAMS.sql | 1169 | All programs |
| VERIFY-AFTER-MIGRATION.sql | 80 | Verify setup |
| VERIFY-PROGRAMS-SEEDED.sql | 70 | Verify programs |

---

## What Gets Created

### Tables (50+)
- User management (profiles, roles)
- Programs & courses
- Enrollments & applications
- LMS (lessons, quizzes, assignments)
- Marketplace (creators, products, sales)
- Partner/program holder management
- SCORM support
- Analytics & reporting

### Views
- migration_history
- Various reporting views

### Functions
- migration_applied()
- record_migration()
- Various helper functions

### Policies
- RLS policies on all tables
- Role-based access control
- Data protection

---

## After Setup

Once database is set up:

1. ✅ Configure environment variables
2. ✅ Deploy application
3. ✅ Test authentication
4. ✅ Test program browsing
5. ✅ Test enrollment flow
6. ✅ Monitor for errors

---

## Support

For issues:
- Check Supabase logs
- Review error messages
- Run verification queries
- Check DATABASE-QUICK-SETUP.md

**Last Updated**: 2025-12-29
