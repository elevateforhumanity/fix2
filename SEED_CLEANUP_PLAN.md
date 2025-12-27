# Seed Files Cleanup Plan

## Current Mess

**30 seed files** scattered across **6 different locations**

### The Chaos
- 8 files seeding programs/courses (duplicates)
- 5 files seeding content (duplicates)
- 4 orchestration scripts (conflicting)
- Mixed formats: SQL, TypeScript, JSON, shell scripts
- No clear order or documentation

## Clean Structure (Proposed)

```
supabase/seeds/
├── README.md                          # What each seed does
├── 001_core_data.sql                  # Essential: programs, credentials
├── 002_content.sql                    # Blog posts, reels, social media
├── 003_test_users.sql                 # Development test accounts
└── archive-legacy/                    # Old seed files preserved
    ├── scripts/                       # 12 TypeScript/shell scripts
    ├── supabase-root/                 # 3 SQL files from supabase/
    ├── supabase-seed/                 # 2 SQL files from supabase/seed/
    ├── supabase-seeds/                # 9 SQL files from supabase/seeds/
    └── seeds-elevate/                 # 4 JSON files
```

## What Gets Consolidated

### 001_core_data.sql (Combines 8 files)
**Purpose:** Essential data app needs to function

**Sources:**
- `seed-barber-program.ts` → Barber program
- `seed-cna-content.ts` → CNA program  
- `seed-courses.ts` → LMS courses
- `programs_seed.sql` → ETPL programs
- `001_seed_programs.sql` → Program basics
- `seed_funding.sql` → Funding sources
- `002_student_requirements_seed.sql` → Requirements

**Result:** One SQL file with all core data

### 002_content.sql (Combines 5 files)
**Purpose:** Marketing content (blog, reels, social)

**Sources:**
- `seed-rich-content.sql`
- `004_seed_blog_posts.sql`
- `005_seed_reels.sql`
- `006_seed_social_media.sql`

**Result:** One SQL file with all content

### 003_test_users.sql (Combines 3 files)
**Purpose:** Test accounts for development

**Sources:**
- `seed-test-data.sql`
- `003_seed_test_users.sql`
- `001_demo_tenant_seed.sql`

**Result:** One SQL file with test users

## What Gets Archived

### Scripts (12 files → archive)
- TypeScript seed scripts (outdated, replaced by SQL)
- Shell orchestration scripts (no longer needed)
- Auto-seed scripts (replaced by manual seeding)

### Duplicates (15 files → archive)
- Old versions of seed files
- Partial seed files
- Experimental seed files

### JSON configs (4 files → archive)
- elevate.json
- partner_onboarding.json
- social_media.json
- student_onboarding.json

## Benefits

### Before
- ❌ 30 files in 6 locations
- ❌ No idea which to run
- ❌ Duplicates everywhere
- ❌ Mixed formats

### After
- ✅ 3 clean SQL files
- ✅ Clear purpose for each
- ✅ Numbered order
- ✅ All SQL (consistent)
- ✅ Fully documented

## How to Use (After Cleanup)

### Development
```bash
# Seed everything
psql $DATABASE_URL -f supabase/seeds/001_core_data.sql
psql $DATABASE_URL -f supabase/seeds/002_content.sql
psql $DATABASE_URL -f supabase/seeds/003_test_users.sql
```

### Production
```bash
# Only core data (no test users)
psql $DATABASE_URL -f supabase/seeds/001_core_data.sql
psql $DATABASE_URL -f supabase/seeds/002_content.sql
```

### Supabase Dashboard
1. Go to SQL Editor
2. Copy/paste seed file contents
3. Run

## Risk Assessment

**Risk Level:** LOW

**Why:**
- Not deleting anything (archiving)
- Can restore from archive if needed
- Seed data is reference data (not user data)
- Easy to re-run if something breaks

## Time Estimate

- Audit seed files: 30 minutes ✅ (done)
- Consolidate into 3 files: 1 hour
- Test seeds work: 30 minutes
- Archive old files: 15 minutes
- Documentation: 15 minutes
- **Total: ~2 hours**

## Do You Want This?

**Option A:** Yes, consolidate all seed files (2 hours work)

**Option B:** Just document what each current file does (30 minutes)

**Option C:** Leave as-is (it's working, just messy)

Which option?
