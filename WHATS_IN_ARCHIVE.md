# What's in the Archived Files

## Migrations Archive (253 files)

### What They Contain

**Table definitions** - CREATE TABLE statements for:
- Products, purchases, licenses
- Courses, lessons, modules
- Users, profiles, enrollments
- Applications, programs, credentials
- Marketplace (creators, products, sales)
- HR/Payroll systems
- Content (blog, reels, social media)
- Analytics, notifications, webhooks
- And 400+ more tables...

**The Problem:**
- Same tables created multiple times
- Different versions with conflicting schemas
- "Complete schema" files that duplicate everything
- No clear history of what changed when

### Why We Archived Them

1. **Already applied** - All marked in `schema_migrations` table
2. **Won't run again** - Migration tracking prevents duplicates
3. **Preserved history** - Can reference if needed
4. **Out of the way** - Not cluttering active workspace

### What's Actually Running

Only these 3 migrations matter now:
1. `20251227_fix_schema_mismatches.sql` - Schema fixes
2. `20251227_create_migration_tracking.sql` - Tracking system
3. `20251227_fix_rls_security_critical.sql` - Security policies

The 253 archived files already ran (or their effects are in the database).

## Seed Files (30 files)

### What They Contain

**Programs/Courses:**
- Barber training program
- CNA (Certified Nursing Assistant) program
- Various LMS courses
- ETPL (Eligible Training Provider List) programs
- JRI courses, NRF Rise Up courses

**Content:**
- Blog posts about training programs
- Video reels for social media
- Social media posts
- Marketing content

**Test Data:**
- Demo user accounts
- Sample enrollments
- Test applications
- Demo tenant data

**Configuration:**
- Funding sources
- Student requirements
- Credentialing partners
- Program metadata

### The Problem

**8 files** seed programs (duplicates)
**5 files** seed content (duplicates)
**4 files** are orchestration scripts (conflicting)
**Mixed formats** - SQL, TypeScript, JSON, shell scripts

### Example: Barber Program

These files ALL seed barber program data:
- `scripts/seed-barber-program.ts` (7.1K)
- `scripts/seed-barber-program-complete.ts` (13K)
- `supabase/seeds/001_seed_programs.sql` (1.1K)
- `supabase/seed/programs_seed.sql` (13K)

**Which one is correct?** Nobody knows.

### Why Clean Them Up

**Current state:**
- Run one file → might work
- Run another file → might conflict
- Run all files → definitely conflicts
- No documentation on which to use

**After cleanup:**
- `001_core_data.sql` - Run this for programs
- `002_content.sql` - Run this for blog/reels
- `003_test_users.sql` - Run this for test accounts
- Clear, documented, no conflicts

## Can You Delete Them?

### Migrations Archive
**NO - Keep them**
- Historical reference
- Might need to understand old decisions
- Takes minimal space
- Already tucked away

### Seed Files
**MAYBE - After consolidation**
- Once we create the 3 clean seed files
- Test they work
- Then archive the old 30 files
- Keep archive just in case

## Bottom Line

**Migrations archive:** Historical record of how database evolved
**Seed files:** Duplicated reference data that needs consolidation

Neither is "running" or "active" - they're just files. The migrations already ran, the seeds are just data you can re-insert.

Think of it like:
- **Migrations** = Construction blueprints (already built the house)
- **Seeds** = Furniture catalogs (can order furniture anytime)

The archived migrations are old blueprints. The seed files are duplicate catalogs.
