# Database Migration Guide - Elevate for Humanity LMS

## Quick Start

### Run All Migrations at Once

The easiest way to set up your database is to run the comprehensive migration script:

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to: **SQL Editor** (left sidebar)

2. **Copy and Paste the Migration Script**
   - Open: `supabase/migrations/RUN_ALL_MIGRATIONS.sql`
   - Copy the entire contents
   - Paste into Supabase SQL Editor

3. **Execute the Script**
   - Click **Run** button
   - Wait for completion (should take 5-10 seconds)
   - Check for success message

4. **Verify Installation**
   ```sql
   -- Check programs were created
   SELECT COUNT(*) FROM programs;
   -- Should return: 16
   
   -- Check lesson_progress table exists
   SELECT * FROM lesson_progress LIMIT 1;
   
   -- Check view exists
   SELECT * FROM course_completion_status LIMIT 1;
   ```

---

## What Gets Created

### Tables

#### 1. **programs** (16 ETPL Programs)
All California ETPL-approved workforce training programs:
- Barber Apprenticeship
- Certified Nursing Assistant (CNA)
- Dental Assistant
- Electrician Apprenticeship
- Emergency Medical Technician (EMT)
- HVAC Technician
- Medical Assistant
- Phlebotomy Technician
- Plumber Apprenticeship
- Solar Panel Installer
- Truck Driving (CDL Class A)
- Veterinary Assistant
- Welder
- Pharmacy Technician
- Real Estate Agent
- Cosmetology

Each program includes:
- Title, slug, tagline, summary, description
- CIP Code (Classification of Instructional Programs)
- SOC Code (Standard Occupational Classification)
- Funding eligibility arrays (WIOA, Pell Grant, CalWORKs, etc.)
- Bullet points with key features
- Hero images

#### 2. **lesson_progress** Table
Tracks student progress through lessons:
- `user_id` - Student identifier
- `lesson_id` - Lesson being tracked
- `status` - 'not_started', 'in_progress', 'completed'
- `progress_percentage` - 0-100
- `time_spent_seconds` - Total time on lesson
- `last_accessed_at` - Last activity timestamp
- `completed_at` - Completion timestamp

**Features:**
- Unique constraint: One progress record per user per lesson
- Automatic timestamps (created_at, updated_at)
- Indexes for fast queries

#### 3. **course_completion_status** View
Aggregated view of course completion:
- `user_id` - Student
- `course_id` - Course
- `total_lessons` - Total lessons in course
- `completed_lessons` - Lessons marked complete
- `completion_percentage` - Overall progress
- `last_activity` - Most recent lesson access

**Use Cases:**
- Dashboard progress bars
- Course completion certificates
- Student analytics
- Progress reports

---

## Migration Script Features

### Idempotent Execution
The script uses `ON CONFLICT DO UPDATE` which means:
- ✅ Safe to run multiple times
- ✅ Updates existing records instead of failing
- ✅ Won't create duplicates
- ✅ Can be used to update program data

### Example:
```sql
INSERT INTO programs (slug, title, ...)
VALUES ('barber', 'Barber Apprenticeship', ...)
ON CONFLICT (slug) 
DO UPDATE SET
  title = EXCLUDED.title,
  updated_at = NOW();
```

### Transaction Safety
Entire script runs in a transaction:
- All changes succeed together, or
- All changes roll back on error
- Database stays consistent

---

## Individual Migration Files

If you prefer to run migrations separately:

### 1. Programs Migration
**File:** `supabase/migrations/20240101000000_add_all_etpl_programs.sql`

Creates all 16 ETPL programs with complete metadata.

```bash
# Run in Supabase SQL Editor
```

### 2. Lesson Progress Migration
**File:** `supabase/migrations/20240101000001_add_lesson_progress.sql`

Creates lesson_progress table and course_completion_status view.

```bash
# Run in Supabase SQL Editor
```

---

## Verification Queries

### Check Programs
```sql
-- List all programs
SELECT slug, title, cip_code, soc_code 
FROM programs 
ORDER BY title;

-- Check funding eligibility
SELECT title, funding_eligibility 
FROM programs 
WHERE 'WIOA' = ANY(funding_eligibility);

-- Count programs
SELECT COUNT(*) as total_programs FROM programs;
```

### Check Lesson Progress
```sql
-- Check table structure
\d lesson_progress

-- Test insert
INSERT INTO lesson_progress (user_id, lesson_id, status, progress_percentage)
VALUES ('test-user-id', 'test-lesson-id', 'in_progress', 50);

-- View progress
SELECT * FROM lesson_progress WHERE user_id = 'test-user-id';
```

### Check Course Completion View
```sql
-- View structure
\d course_completion_status

-- Test query
SELECT * FROM course_completion_status 
WHERE user_id = 'test-user-id';
```

---

## Troubleshooting

### Error: "relation already exists"
**Solution:** The table already exists. Either:
1. Use the `RUN_ALL_MIGRATIONS.sql` script (handles conflicts)
2. Drop the table first: `DROP TABLE IF EXISTS programs CASCADE;`

### Error: "duplicate key value"
**Solution:** Program with that slug already exists. Either:
1. Use the `RUN_ALL_MIGRATIONS.sql` script (updates existing)
2. Delete existing: `DELETE FROM programs WHERE slug = 'barber';`

### Error: "column does not exist"
**Solution:** Your programs table might be missing columns. Run:
```sql
-- Add missing columns
ALTER TABLE programs ADD COLUMN IF NOT EXISTS cip_code TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS soc_code TEXT;
ALTER TABLE programs ADD COLUMN IF NOT EXISTS funding_eligibility TEXT[];
```

### Error: "permission denied"
**Solution:** You need database admin access. Check:
1. You're logged into correct Supabase project
2. Your user has proper permissions
3. You're using the SQL Editor (not API)

---

## Next Steps After Migration

### 1. Verify Data
```sql
-- Check all programs loaded
SELECT COUNT(*) FROM programs;
-- Expected: 16

-- Check sample program
SELECT * FROM programs WHERE slug = 'barber';
```

### 2. Test Lesson Progress
```sql
-- Create test progress record
INSERT INTO lesson_progress (user_id, lesson_id, status, progress_percentage)
VALUES ('test-user', 'test-lesson', 'in_progress', 75);

-- Check it appears in view
SELECT * FROM course_completion_status WHERE user_id = 'test-user';
```

### 3. Update Application
Your Next.js app should now be able to:
- Load all 16 programs from database
- Display program details with CIP/SOC codes
- Show funding eligibility badges
- Track lesson progress
- Display course completion percentages

### 4. Test in Browser
```bash
# Start dev server
npm run dev

# Visit pages:
# - http://localhost:3000/programs (all programs)
# - http://localhost:3000/programs/barber (program detail)
# - http://localhost:3000/student/dashboard (progress tracking)
```

---

## Database Schema Reference

### programs Table
```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  summary TEXT,
  description TEXT,
  bullets TEXT[],
  funding TEXT[],
  hero_image TEXT,
  cip_code TEXT,
  soc_code TEXT,
  funding_eligibility TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### lesson_progress Table
```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
```

### course_completion_status View
```sql
CREATE VIEW course_completion_status AS
SELECT 
  lp.user_id,
  l.course_id,
  COUNT(l.id) as total_lessons,
  COUNT(CASE WHEN lp.status = 'completed' THEN 1 END) as completed_lessons,
  ROUND(
    (COUNT(CASE WHEN lp.status = 'completed' THEN 1 END)::NUMERIC / 
     COUNT(l.id)::NUMERIC) * 100, 
    2
  ) as completion_percentage,
  MAX(lp.last_accessed_at) as last_activity
FROM lesson_progress lp
JOIN lessons l ON l.id = lp.lesson_id
GROUP BY lp.user_id, l.course_id;
```

---

## Funding Eligibility Reference

Programs support these funding sources:
- **WIOA** - Workforce Innovation and Opportunity Act
- **Pell Grant** - Federal student aid
- **CalWORKs** - California Work Opportunity and Responsibility to Kids
- **TANF** - Temporary Assistance for Needy Families
- **Trade Adjustment Assistance** - For workers affected by foreign trade
- **Vocational Rehabilitation** - For individuals with disabilities
- **Veterans Benefits** - GI Bill, VR&E
- **Employer-Sponsored** - Company-paid training

### Query by Funding Type
```sql
-- Find all WIOA-eligible programs
SELECT title, slug 
FROM programs 
WHERE 'WIOA' = ANY(funding_eligibility);

-- Find programs with multiple funding options
SELECT title, array_length(funding_eligibility, 1) as funding_count
FROM programs
ORDER BY funding_count DESC;
```

---

## CIP/SOC Code Reference

### CIP Codes (Classification of Instructional Programs)
Used for educational program classification:
- `12.0402` - Barbering/Barber
- `51.3902` - Nursing Assistant/Aide
- `46.0201` - Electrician
- `47.0201` - HVAC Technician
- And more...

### SOC Codes (Standard Occupational Classification)
Used for job/occupation classification:
- `39-5011` - Barbers
- `31-1014` - Nursing Assistants
- `47-2111` - Electricians
- `49-9021` - HVAC Mechanics
- And more...

### Query by Code
```sql
-- Find programs by CIP code
SELECT title FROM programs WHERE cip_code = '12.0402';

-- Find programs by SOC code
SELECT title FROM programs WHERE soc_code = '39-5011';
```

---

## Support

### Need Help?
1. Check Supabase logs for error details
2. Verify your database connection
3. Ensure you have admin permissions
4. Review the troubleshooting section above

### Common Issues
- **Slow queries?** Add indexes on frequently queried columns
- **Missing data?** Re-run the migration script (it's idempotent)
- **Permission errors?** Check RLS policies in Supabase

### Resources
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [ETPL Program List](https://www.edd.ca.gov/jobs_and_training/Eligible_Training_Provider_List.htm)

---

## Summary

✅ **One-Command Setup:** Run `RUN_ALL_MIGRATIONS.sql` in Supabase SQL Editor

✅ **16 ETPL Programs:** All California-approved workforce training programs

✅ **Progress Tracking:** lesson_progress table + course_completion_status view

✅ **Idempotent:** Safe to run multiple times

✅ **Complete Metadata:** CIP codes, SOC codes, funding eligibility

✅ **Production Ready:** Transaction-safe, indexed, optimized

**Next:** Run the migration, verify with queries above, then test your app!
