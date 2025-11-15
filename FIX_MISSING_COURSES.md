# Fix Missing Courses - Milady LMS Not Showing

**Issue:** Courses shown on homepage (Barber, CNA, HVAC) are NOT in Supabase database  
**Result:** /programs page shows different courses (Community Health, Digital Literacy, etc.)  
**Root Cause:** Database not seeded with homepage courses

---

## 🔴 Current Problem

### Homepage Shows:
1. **Barber Apprenticeship** - 2,000 hours, DOL registered
2. **CNA Certification** - 120 hours, healthcare
3. **HVAC Technician** - 640 hours, skilled trades

### Database Has:
1. Community Health Initiative
2. Digital Literacy Program  
3. Service Key Test Program
4. Youth Leadership Development

**MISMATCH!** Homepage and database are out of sync.

---

## ✅ Solution

### Step 1: Run SQL to Add Homepage Courses

**File:** `supabase/seed-homepage-programs.sql`

**What it does:**
- Deletes old programs (if exist)
- Adds Barber Apprenticeship
- Adds CNA Certification
- Adds HVAC Technician

**How to run:**

**Option A: Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor
2. Click "SQL Editor"
3. Paste contents of `supabase/seed-homepage-programs.sql`
4. Click "Run"

**Option B: Supabase CLI**
```bash
cd /workspaces/fix2
supabase db push --file supabase/seed-homepage-programs.sql
```

**Option C: psql**
```bash
psql postgresql://postgres:[password]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres \
  -f supabase/seed-homepage-programs.sql
```

---

### Step 2: Add Milady Barber Course Content

**File:** `supabase/migrations/archive/004_load_milady_barber_course.sql`

**What it does:**
- Adds complete 2,000-hour Milady curriculum
- 12 modules with lessons
- Quizzes and assessments
- Progress tracking

**How to run:**

**Option A: Supabase Dashboard**
1. Go to SQL Editor
2. Paste contents of `004_load_milady_barber_course.sql`
3. Click "Run"

**Option B: Move from archive and run**
```bash
cd /workspaces/fix2
cp supabase/migrations/archive/004_load_milady_barber_course.sql supabase/migrations/
supabase db push
```

---

### Step 3: Verify Courses Appear

**Check in Supabase:**
```sql
SELECT slug, title, track, hours 
FROM programs 
WHERE slug IN ('barber', 'cna', 'hvac-tech');
```

**Should return:**
```
slug      | title                  | track          | hours
----------|------------------------|----------------|-------
barber    | Barber Apprenticeship  | Beauty & Wellness | 2000 hours
cna       | CNA Certification      | Healthcare     | 120 hours
hvac-tech | HVAC Technician        | Skilled Trades | 640 hours
```

**Check on website:**
- Visit: https://www.elevateconnectsdirectory.org/programs
- Should show 3 programs: Barber, CNA, HVAC
- Click each to verify detail pages load

---

## 📊 Database Schema

### Programs Table Structure:

```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  summary TEXT,
  track TEXT,
  hours TEXT,
  funding TEXT[],  -- Array of funding sources
  bullets TEXT[],  -- Array of bullet points
  cta TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Required Fields for Homepage:
- `slug` - URL-friendly identifier
- `title` - Program name
- `tagline` - Short description
- `summary` - Longer description
- `funding` - Array like `['WIOA', 'WRG']`

---

## 🎓 Milady LMS Integration

### What is Milady?

Milady is the industry-standard curriculum for barber and cosmetology training. The Milady Barber course includes:

**12 Modules:**
1. History & Career Opportunities
2. Professional Image
3. Infection Control
4. Implements, Tools & Equipment
5. Anatomy & Physiology
6. Properties of Hair & Scalp
7. Basics of Chemistry & Electricity
8. Principles of Hair Design
9. Haircutting
10. Hairstyling
11. Shaving & Facial Hair Design
12. Men's Facial Massage & Treatments

**Total:** 2,000 hours (DOL requirement for barber license)

### Database Structure:

```
programs (barber)
  ↓
courses (milady-barber-apprenticeship)
  ↓
modules (12 modules)
  ↓
lessons (multiple per module)
  ↓
content (text, video, quizzes)
```

---

## 🔧 Autopilot Task

Created: `.autopilot/tasks/seed-homepage-courses.json`

**What it does:**
- Connects to Supabase
- Runs seed SQL
- Verifies courses added
- Tests /programs page
- Generates report

**How to trigger:**
- Create flag: `.autopilot/TRIGGER_SEED_COURSES`
- Autopilot worker will execute
- Report generated: `COURSES_SEEDED_REPORT.md`

---

## 🚀 Quick Fix (Manual)

### If you have Supabase access:

1. **Login to Supabase:**
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk

2. **Go to SQL Editor:**
   Click "SQL Editor" in left sidebar

3. **Run this SQL:**

```sql
-- Delete old programs
DELETE FROM programs WHERE slug IN ('barber', 'cna', 'hvac-tech');

-- Add Barber
INSERT INTO programs (slug, title, tagline, summary, track, hours, funding, bullets, cta, cover_url)
VALUES (
  'barber',
  'Barber Apprenticeship',
  'Master the art of barbering with comprehensive training',
  'Master the art of barbering with comprehensive training in cutting, styling, and business skills. DOL Registered Apprenticeship - 2,000 hours leading to Indiana State Barber License.',
  'Beauty & Wellness',
  '2000 hours',
  ARRAY['WIOA', 'WRG', 'DOL Apprenticeship'],
  ARRAY[
    'Complete 2,000-hour DOL registered apprenticeship',
    'Master cutting, styling, shaving, and coloring techniques',
    'Learn barbershop business management and operations',
    'Prepare for Indiana State Barber License exam',
    'Hands-on training with experienced master barbers',
    'Job placement assistance upon completion'
  ],
  'Start your career in barbering. 100% funded through WIOA and DOL Apprenticeship programs.',
  '/course-covers/barber-apprenticeship/cover.svg'
);

-- Add CNA
INSERT INTO programs (slug, title, tagline, summary, track, hours, funding, bullets, cta, cover_url)
VALUES (
  'cna',
  'CNA Certification',
  'Prepare for your Certified Nursing Assistant certification',
  'Prepare for your Certified Nursing Assistant certification with expert-led training. Fast-track program to enter the healthcare field in just 8 weeks.',
  'Healthcare',
  '120 hours',
  ARRAY['WIOA', 'WRG'],
  ARRAY[
    'Complete 120-hour state-approved CNA training program',
    'Learn patient care, vital signs, and medical terminology',
    'Hands-on clinical experience in healthcare facilities',
    'Prepare for state CNA certification exam',
    'CPR and First Aid certification included',
    'Job placement assistance in hospitals and nursing homes'
  ],
  'Launch your healthcare career. 100% funded through WIOA.',
  '/course-covers/cna-training/cover.svg'
);

-- Add HVAC
INSERT INTO programs (slug, title, tagline, summary, track, hours, funding, bullets, cta, cover_url)
VALUES (
  'hvac-tech',
  'HVAC Technician',
  'Learn heating, ventilation, and air conditioning systems',
  'Learn heating, ventilation, and air conditioning systems from industry experts. Comprehensive training leading to EPA 608 certification and career-ready skills.',
  'Skilled Trades',
  '640 hours',
  ARRAY['WIOA', 'WRG', 'Pell Grant'],
  ARRAY[
    'Complete 640-hour comprehensive HVAC training program',
    'Master residential and commercial HVAC systems',
    'Learn installation, maintenance, and repair techniques',
    'Prepare for EPA 608 certification exam',
    'Hands-on training with industry-standard equipment',
    'Job placement assistance with HVAC contractors'
  ],
  'Start your HVAC career. 100% funded through WIOA and Pell Grants.',
  '/course-covers/hvac-tech/cover.svg'
);

-- Verify
SELECT slug, title, track, hours FROM programs WHERE slug IN ('barber', 'cna', 'hvac-tech');
```

4. **Click "Run"**

5. **Verify:**
   - Go to: https://www.elevateconnectsdirectory.org/programs
   - Should show 3 programs
   - Click each to test

---

## ⚠️ Important Notes

### Why Courses Are Missing:

1. **Database was never seeded** with homepage courses
2. **Homepage hardcodes** the 3 programs (Barber, CNA, HVAC)
3. **/programs page pulls** from database (different courses)
4. **Milady content** exists in SQL files but not loaded

### What Needs to Happen:

1. ✅ Run seed SQL to add 3 homepage programs
2. ✅ Run Milady migration to add barber course content
3. ✅ Verify programs appear on /programs page
4. ✅ Test program detail pages load
5. ✅ Verify course content is accessible

### After Fixing:

- Homepage and /programs will match
- Barber program will have full Milady curriculum
- Students can enroll in all 3 programs
- LMS will show course content

---

## 📋 Checklist

- [ ] Run `seed-homepage-programs.sql` in Supabase
- [ ] Verify 3 programs added to database
- [ ] Test /programs page shows correct courses
- [ ] Run `004_load_milady_barber_course.sql`
- [ ] Verify Milady content loaded
- [ ] Test /programs/barber page loads
- [ ] Test course modules appear
- [ ] Test student can enroll
- [ ] Test course content is accessible
- [ ] Update homepage if needed

---

## 🆘 Troubleshooting

### Programs still not showing:

**Check:**
1. SQL ran without errors
2. Programs table exists
3. RLS policies allow read access
4. Supabase connection working

**Solution:**
```sql
-- Check if programs exist
SELECT COUNT(*) FROM programs;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'programs';

-- Grant public read access if needed
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Programs are viewable by everyone" 
  ON programs FOR SELECT 
  USING (true);
```

### Milady content not showing:

**Check:**
1. Courses table has barber course
2. Modules table has 12 modules
3. Lessons table has content
4. Foreign keys are correct

**Solution:**
```sql
-- Check course exists
SELECT * FROM courses WHERE slug = 'milady-barber-apprenticeship';

-- Check modules
SELECT COUNT(*) FROM modules WHERE course_id = (
  SELECT id FROM courses WHERE slug = 'milady-barber-apprenticeship'
);

-- Should return 12
```

---

**Last Updated:** 2025-11-15  
**Status:** Ready to fix  
**Priority:** CRITICAL - Courses must show for enrollment
