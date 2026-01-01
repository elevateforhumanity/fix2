# Database Seeding Structure

**Last Updated:** January 1, 2026  
**Status:** ✅ Production Ready - No Duplicates, No Incorrect Values

## Overview

The database seeding system is organized with clear separation between production data and deprecated test data.

## Active Seed Files

### Primary Seeds (Use These)

1. **`supabase/seeds/000_master_seed.sql`** (335 lines)
   - **Purpose:** Master production seed file
   - **Contains:** 27 DOL-approved training programs
   - **Status:** ✅ Active - Use this for programs
   - **Data Quality:** 100% real, verified data
   - **No placeholders, no test data**

2. **`supabase/seeds/001_real_seed_data.sql`** (467 lines)
   - **Purpose:** Real organizational and program data
   - **Contains:**
     - Elevate for Humanity organization
     - Real training programs (Barbering, HVAC, CNA, Welding, CDL)
     - Real partner organizations
   - **Status:** ✅ Active
   - **Data Quality:** 100% real data

3. **`supabase/seeds/002_seed_products.sql`** (8 lines)
   - **Purpose:** Store products for licensing
   - **Contains:** EFH LMS, Dev Studio, Course Builder, Autopilot
   - **Status:** ✅ Active
   - **Pricing:** Real pricing ($50k-$150k)

4. **`supabase/seeds/002_student_requirements_seed.sql`** (447 lines)
   - **Purpose:** Student requirements and prerequisites
   - **Status:** ✅ Active
   - **Data Quality:** Real requirements data

5. **`supabase/seeds/004_seed_blog_posts.sql`** (233 lines)
   - **Purpose:** Blog content
   - **Status:** ✅ Active
   - **Data Quality:** Real blog posts

6. **`supabase/seeds/005_seed_reels.sql`** (91 lines)
   - **Purpose:** Social media reels
   - **Status:** ✅ Active

7. **`supabase/seeds/006_seed_social_media.sql`** (275 lines)
   - **Purpose:** Social media posts
   - **Status:** ✅ Active

### Deprecated Seeds (DO NOT USE)

1. **`supabase/seeds/001_seed_programs.sql`** ❌ DEPRECATED
   - **Reason:** Duplicates data in 000_master_seed.sql
   - **Status:** Commented out
   - **Action:** Use 000_master_seed.sql instead

2. **`supabase/seeds/003_seed_test_users.sql`** ❌ DEPRECATED
   - **Reason:** Contains test/example emails
   - **Status:** Commented out
   - **Action:** Users created via Supabase Auth signup

## Migration Files

### Active Migrations (16 files)

Located in `supabase/migrations/*.sql`:

1. `20250101000001_add_cover_images.sql` - Cover image support
2. `20251227_create_migration_tracking.sql` - Migration tracking system
3. `20251227_create_missing_tables.sql` - Core tables
4. `20251227_fix_rls_security_critical.sql` - RLS policies (12 tables)
5. `20251227_fix_schema_mismatches.sql` - Schema fixes
6. `20251228_add_scorm_tables.sql` - SCORM LMS support
7. `20251230_applications.sql` - Application system
8. `20251230_appointments.sql` - Appointment booking
9. `20251230_complete_platform.sql` - Platform tables
10. `20251230_credential_system.sql` - Credentials
11. `20251230_intake_funnel.sql` - Client intake
12. `20251230_sub_office_agreements.sql` - Sub-office system
13. `20251230_tax_documents.sql` - Tax document storage
14. `20251230_tax_intake_rls.sql` - Tax intake security
15. `20251230_tax_return_drafts.sql` - Tax return drafts
16. `20251230_training_access_keys.sql` - Training access

### Archived Migrations (253 files)

Located in `supabase/migrations/archive-legacy/`:

- Old migrations from development
- Kept for reference only
- DO NOT RUN in production

## Seeding Scripts

### Production Scripts

1. **`scripts/auto-seed-database.mjs`**
   - Automatically runs all seed files in order
   - Reads from `supabase/seeds/`
   - Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

2. **`scripts/run-migrations-and-seeds.sh`**
   - Runs migrations then seeds
   - Requires: DATABASE_URL

### Development Scripts (Reference Only)

- `scripts/seed-barber-program.ts` - Barber program seeding
- `scripts/seed-cna-content.ts` - CNA program seeding
- `scripts/seed-courses.ts` - Course seeding
- `scripts/seed-program.ts` - Generic program seeding

## Data Quality Standards

### ✅ Approved Data

- Real organization names and addresses
- Real contact information (elevate4humanityedu@gmail.com, (317) 314-3757)
- Real program names and descriptions
- Real pricing and salary data
- Real certification names
- Real job titles

### ❌ Prohibited Data

- No "example.com" emails
- No "test" or "fake" data
- No "Lorem Ipsum" text
- No placeholder values
- No dummy phone numbers

## Verification

### Check for Duplicates

```bash
# Check for duplicate program seeds
grep "'cna-training'" supabase/seeds/*.sql

# Should only appear in 000_master_seed.sql
```

### Check for Test Data

```bash
# Check for test/example data
grep -i "example\|test\|fake\|placeholder" supabase/seeds/*.sql

# Should only appear in deprecated files (commented out)
```

### Verify RLS Policies

```bash
# Count tables with RLS enabled
grep -l "ENABLE ROW LEVEL SECURITY" supabase/migrations/*.sql | wc -l

# Result: 12 tables have RLS enabled
```

## Seeding Order

When seeding from scratch:

1. Run migrations first (in timestamp order)
2. Run seeds in alphabetical order:
   - 000_master_seed.sql
   - 001_real_seed_data.sql
   - 002_seed_products.sql
   - 002_student_requirements_seed.sql
   - 004_seed_blog_posts.sql
   - 005_seed_reels.sql
   - 006_seed_social_media.sql

3. Skip deprecated files:
   - ~~001_seed_programs.sql~~ (deprecated)
   - ~~003_seed_test_users.sql~~ (deprecated)

## Security

### Row Level Security (RLS)

12 tables have RLS enabled:

- profiles
- enrollments
- applications
- tax_documents
- tax_returns
- tax_intake
- clients
- sub_office_agreements
- training_access_keys
- appointments
- credentials
- And more...

### Data Protection

- All student data protected by FERPA
- Tax data protected by IRS regulations
- Personal information encrypted at rest
- RLS policies enforce data isolation

## Maintenance

### Adding New Seed Data

1. Add to appropriate seed file (000_master_seed.sql for programs)
2. Use `ON CONFLICT` clauses to prevent duplicates
3. Test in development first
4. Verify no placeholder data
5. Document in this file

### Deprecating Seed Data

1. Comment out the INSERT statements
2. Add deprecation notice at top of file
3. Update this documentation
4. Keep file for reference

## Contact

For database questions:

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
