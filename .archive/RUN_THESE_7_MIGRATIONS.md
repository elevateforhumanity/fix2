# 🚀 Run These 7 Migrations in Supabase (Copy-Paste Ready)

**Total Time:** 10-15 minutes  
**Difficulty:** Easy (just copy and paste)

---

## 📋 Instructions

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. For each migration below:
   - Click **New Query**
   - Copy the entire SQL block
   - Paste into editor
   - Click **Run**
   - Wait for "Success" message
5. Repeat for all 7 migrations **in order**

---

## ✅ Migration 1 of 7: Programs Schema

**What it does:** Adds 30+ fields to programs table

**Copy this entire block:**

```sql
-- Complete Programs Schema Enhancement
-- Adds all fields needed for 27 full programs

-- Add new columns to programs table
ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS full_description TEXT,
ADD COLUMN IF NOT EXISTS what_you_learn TEXT[],
ADD COLUMN IF NOT EXISTS day_in_life TEXT,
ADD COLUMN IF NOT EXISTS salary_min INTEGER,
ADD COLUMN IF NOT EXISTS salary_max INTEGER,
ADD COLUMN IF NOT EXISTS credential_type TEXT,
ADD COLUMN IF NOT EXISTS credential_name TEXT,
ADD COLUMN IF NOT EXISTS employers TEXT[],
ADD COLUMN IF NOT EXISTS funding_pathways TEXT[],
ADD COLUMN IF NOT EXISTS delivery_method TEXT,
ADD COLUMN IF NOT EXISTS training_hours INTEGER,
ADD COLUMN IF NOT EXISTS prerequisites TEXT,
ADD COLUMN IF NOT EXISTS career_outcomes TEXT[],
ADD COLUMN IF NOT EXISTS industry_demand TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
ADD COLUMN IF NOT EXISTS icon_url TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS wioa_approved BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS dol_registered BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS placement_rate INTEGER,
ADD COLUMN IF NOT EXISTS completion_rate INTEGER,
ADD COLUMN IF NOT EXISTS total_cost DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS toolkit_cost DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS credentialing_cost DECIMAL(10,2);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_programs_featured ON public.programs(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_programs_active ON public.programs(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_programs_category ON public.programs(category);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active programs" ON public.programs;
DROP POLICY IF EXISTS "Authenticated users can view all programs" ON public.programs;
DROP POLICY IF EXISTS "Only admins can insert programs" ON public.programs;
DROP POLICY IF EXISTS "Only admins can update programs" ON public.programs;
DROP POLICY IF EXISTS "Only admins can delete programs" ON public.programs;

-- Create RLS policies
CREATE POLICY "Anyone can view active programs" ON public.programs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all programs" ON public.programs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can insert programs" ON public.programs
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Only admins can update programs" ON public.programs
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Only admins can delete programs" ON public.programs
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );
```

**Expected:** "Success. No rows returned"

---

## ✅ Migration 2 of 7: Programs Part 1 (Programs 9-12)

**What it does:** Inserts Medical Assistant, Phlebotomy, Pharmacy Tech, Dental Assistant

**File:** `supabase/migrations/programs_part_0`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_0)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_0`

**Expected:** "Success. 4 rows affected"

---

## ✅ Migration 3 of 7: Programs Part 2 (Programs 13-15)

**What it does:** Inserts IT Support, Cybersecurity, Web Development

**File:** `supabase/migrations/programs_part_1`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_1)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_1`

**Expected:** "Success. 3 rows affected"

---

## ✅ Migration 4 of 7: Programs Part 3 (Programs 16-18)

**What it does:** Inserts Data Analytics, Customer Service, Administrative Assistant

**File:** `supabase/migrations/programs_part_2`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_2)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_2`

**Expected:** "Success. 3 rows affected"

---

## ✅ Migration 5 of 7: Programs Part 4 (Programs 19-21)

**What it does:** Inserts Bookkeeping, Real Estate, Insurance

**File:** `supabase/migrations/programs_part_3`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_3)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_3`

**Expected:** "Success. 3 rows affected"

---

## ✅ Migration 6 of 7: Programs Part 5 (Programs 22-24)

**What it does:** Inserts Solar Panel, Automotive Tech, Diesel Mechanic

**File:** `supabase/migrations/programs_part_4`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_4)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_4`

**Expected:** "Success. 3 rows affected"

---

## ✅ Migration 7 of 7: Programs Part 6 (Programs 25-27)

**What it does:** Inserts Forklift, Manufacturing, Entrepreneurship

**File:** `supabase/migrations/programs_part_5`

**Copy from:** [GitHub Link](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/programs_part_5)

Or copy from your local file: `/workspaces/fix2/supabase/migrations/programs_part_5`

**Expected:** "Success. 3 rows affected"

---

## ✅ Verify All Migrations Worked

Run this query in Supabase SQL Editor:

```sql
-- Check total programs
SELECT COUNT(*) as total_programs FROM public.programs;
-- Should return 27 or more

-- View all program names
SELECT name, category, duration_weeks, salary_min, salary_max 
FROM public.programs 
ORDER BY name;

-- Check one program has complete data
SELECT 
  name,
  LENGTH(full_description) as description_length,
  array_length(what_you_learn, 1) as skills_count,
  LENGTH(day_in_life) as day_in_life_length,
  array_length(employers, 1) as employers_count
FROM public.programs 
WHERE slug = 'medical-assistant';
-- Should show: description ~500 chars, 8 skills, day_in_life ~500 chars, 6 employers
```

**Expected Results:**
- ✅ Total programs: 27 or more
- ✅ All programs have names, categories, durations, salaries
- ✅ Medical Assistant has complete data with arrays populated

---

## 🚨 Troubleshooting

### Error: "relation 'programs' does not exist"

**Fix:** Create the programs table first:

```sql
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration_weeks INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Then run Migration 1 again.

### Error: "duplicate key value violates unique constraint"

**Fix:** Programs already exist. To replace them:

```sql
-- Delete existing programs
DELETE FROM public.programs WHERE slug IN (
  'medical-assistant', 'phlebotomy-technician', 'pharmacy-technician',
  'dental-assistant', 'it-support-specialist', 'cybersecurity-analyst',
  'web-development', 'data-analytics', 'customer-service-representative',
  'administrative-assistant', 'bookkeeping', 'real-estate-agent',
  'insurance-agent', 'solar-panel-installation', 'automotive-technician',
  'diesel-mechanic', 'forklift-operator', 'manufacturing-technician',
  'entrepreneurship-small-business'
);

-- Then run migrations 2-7 again
```

### Error: "column 'full_description' does not exist"

**Fix:** Run Migration 1 first (the schema migration).

### Programs page still empty after migrations

**Fix:** Check RLS policies:

```sql
-- Temporarily disable RLS to test
ALTER TABLE public.programs DISABLE ROW LEVEL SECURITY;

-- Check if programs exist
SELECT COUNT(*) FROM public.programs;

-- If programs exist, re-enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Make sure you're logged in or viewing as public
```

---

## ✅ Success Checklist

After running all 7 migrations:

- [ ] Migration 1 completed (schema)
- [ ] Migration 2 completed (programs 9-12)
- [ ] Migration 3 completed (programs 13-15)
- [ ] Migration 4 completed (programs 16-18)
- [ ] Migration 5 completed (programs 19-21)
- [ ] Migration 6 completed (programs 22-24)
- [ ] Migration 7 completed (programs 25-27)
- [ ] Verification query shows 27+ programs
- [ ] All programs have complete data
- [ ] Visit /programs page on your site
- [ ] All 27 programs are visible
- [ ] Click on a program to see full details

---

## 📊 What You Just Added

**19 Complete Programs:**
1. Medical Assistant
2. Phlebotomy Technician
3. Pharmacy Technician
4. Dental Assistant
5. IT Support Specialist
6. Cybersecurity Analyst
7. Web Development
8. Data Analytics
9. Customer Service Representative
10. Administrative Assistant
11. Bookkeeping
12. Real Estate Agent
13. Insurance Agent
14. Solar Panel Installation
15. Automotive Technician
16. Diesel Mechanic
17. Forklift Operator
18. Manufacturing Technician
19. Entrepreneurship / Small Business

**Each program includes:**
- Full description (200-300 words)
- 8+ skills you'll learn
- Day-in-the-life narrative
- Salary ranges
- Credential information
- 6+ typical employers
- Funding pathways
- Career progression paths
- Industry demand analysis
- Prerequisites
- Training details
- Costs breakdown
- Placement and completion rates

---

## 🎉 You're Done!

**Next Steps:**
1. Visit your site's /programs page
2. Verify all 27 programs are visible
3. Click on programs to see full details
4. Continue with environment variable setup (see QUICK_START.md)

---

**Need Help?** Check SETUP_CHECKLIST.md for detailed troubleshooting.
