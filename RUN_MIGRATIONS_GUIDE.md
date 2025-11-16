# 🗄️ Database Migrations Guide

**Run These in Supabase SQL Editor**

---

## ⚠️ CRITICAL: Without these migrations, your site will have NO courses or programs!

---

## 📋 Step-by-Step Instructions

### **Step 1: Access Supabase SQL Editor**

1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"** button

---

### **Step 2: Run Migrations in Order**

Copy and paste each file's contents into the SQL Editor and click **"Run"**.

**⚠️ IMPORTANT: Run in this exact order!**

---

## 📁 Migration 1: Programs Table (16 Programs)

**File:** `supabase/migrations/20241115_add_all_etpl_programs.sql`

**What it does:**

- Creates/updates 16 programs in the programs table
- Includes all ETPL data, funding sources, descriptions

**Programs added:**

1. Business Start-Up & Marketing
2. Emergency Health & Safety Technician
3. HVAC Technician
4. Direct Support Professional
5. Professional Esthetician
6. Tax Preparation & Financial Services
7. Public Safety Reentry Specialist
8. Barber Apprenticeship
9. Beauty & Career Educator
10. Certified Peer Support Professional
11. Certified Peer Recovery Coach
12. CPR Certification
13. Certified Community Healthcare Worker
14. Rise Up Certificate
15. OSHA 10 Certification
16. Medical Assistant

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241115_add_all_etpl_programs.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Successfully added/updated 16 ETPL programs and certifications
```

---

## 📁 Migration 2: LMS Courses Part 1

**File:** `supabase/migrations/20241116_create_lms_courses_part1.sql`

**What it does:**

- Creates Business Start-Up & Marketing course
- Creates Emergency Health & Safety Technician course
- Creates Direct Support Professional course
- Adds modules for each course

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_create_lms_courses_part1.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Part 1 Complete: Created 3 LMS courses
```

---

## 📁 Migration 3: LMS Courses Part 2

**File:** `supabase/migrations/20241116_create_lms_courses_part2.sql`

**What it does:**

- Creates Beauty & Career Educator course
- Creates Professional Esthetician course
- Creates Tax Preparation & Financial Services course
- Adds modules for each course

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_create_lms_courses_part2.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Part 2 Complete: Created 3 more LMS courses
```

---

## 📁 Migration 4: LMS Courses Part 3

**File:** `supabase/migrations/20241116_create_lms_courses_part3.sql`

**What it does:**

- Creates Barber Apprenticeship course
- Creates Public Safety Reentry Specialist course
- Creates HVAC Technician course
- Adds modules for each course

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_create_lms_courses_part3.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Part 3 Complete: Created 3 more LMS courses
```

---

## 📁 Migration 5: LMS Courses Part 4 (Certifications)

**File:** `supabase/migrations/20241116_create_lms_courses_part4.sql`

**What it does:**

- Creates CPR Certification course
- Creates OSHA 10 Certification course
- Creates Rise Up Certificate course
- Creates Certified Peer Support Professional course
- Creates Certified Peer Recovery Coach course
- Creates Certified Community Healthcare Worker course
- Adds modules for each course

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_create_lms_courses_part4.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Part 4 Complete: Created 6 certification courses
```

---

## 📁 Migration 6: Medical Assistant Course

**File:** `supabase/migrations/20241116_create_medical_assistant_course.sql`

**What it does:**

- Creates Medical Assistant course
- Adds to programs table
- Adds modules

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_create_medical_assistant_course.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Medical Assistant course and program created successfully
```

---

## 📁 Migration 7: JRI Courses (7 Courses)

**File:** `supabase/migrations/20241116_add_jri_courses.sql`

**What it does:**

- Creates 6 JRI badge courses
- Creates JRI Complete Series course
- Links to EmployIndy platform

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_add_jri_courses.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Added 7 Job Ready Indy (JRI) courses to LMS
```

---

## 📁 Migration 8: NRF RISE Up Courses (6 Courses)

**File:** `supabase/migrations/20241116_add_nrf_rise_up_courses.sql`

**What it does:**

- Creates 5 NRF RISE Up courses
- Creates NRF RISE Up Complete Series
- Links to Kaleido Learning platform

**Run this:**

```sql
-- Copy entire contents of supabase/migrations/20241116_add_nrf_rise_up_courses.sql
-- Paste here and click Run
```

**Expected output:**

```
✅ Added 6 NRF Foundation RISE Up courses to LMS
```

---

## ✅ Verification Queries

After running all migrations, verify the data:

### **Check Programs:**

```sql
SELECT slug, title, array_length(funding, 1) as funding_count
FROM programs
ORDER BY title;
```

**Expected:** 16 rows

### **Check Courses:**

```sql
SELECT slug, title, duration_hours
FROM courses
ORDER BY title;
```

**Expected:** 29 rows

### **Check Modules:**

```sql
SELECT c.title as course, COUNT(m.id) as module_count
FROM courses c
LEFT JOIN modules m ON m.course_id = c.id
GROUP BY c.title
ORDER BY c.title;
```

**Expected:** Each course should have modules

---

## 🚨 Troubleshooting

### **Error: relation "programs" does not exist**

**Solution:** Create the programs table first:

```sql
CREATE TABLE IF NOT EXISTS public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  tagline text,
  description text,
  summary text,
  bullets text[],
  funding text[],
  hero_image text,
  cta text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### **Error: relation "courses" does not exist**

**Solution:** Create the courses table first:

```sql
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  level text DEFAULT 'beginner',
  duration_hours integer,
  status text DEFAULT 'draft',
  is_free boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### **Error: relation "modules" does not exist**

**Solution:** Create the modules table first:

```sql
CREATE TABLE IF NOT EXISTS public.modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(course_id, order_index)
);
```

### **Error: duplicate key value violates unique constraint**

**Solution:** The migration uses `ON CONFLICT DO UPDATE`, so this shouldn't happen. If it does, the data already exists and you can skip that migration.

---

## 📊 Expected Final State

After all migrations:

| Table        | Count | Description            |
| ------------ | ----- | ---------------------- |
| **programs** | 16    | All ETPL programs      |
| **courses**  | 29    | All LMS courses        |
| **modules**  | 100+  | Course modules/lessons |

---

## 🎯 Next Steps After Migrations

1. ✅ Verify data with queries above
2. ✅ Visit `/programs` page - should show all 16 programs
3. ✅ Visit `/lms/courses` - should show all 29 courses
4. ✅ Click on a program - should show details
5. ✅ Test enrollment flow

---

## 📞 Need Help?

If you encounter errors:

1. Check the error message carefully
2. Verify tables exist (use troubleshooting section)
3. Check for typos in SQL
4. Ensure you're running migrations in order
5. Try running the verification queries

---

**Document Version:** 1.0  
**Last Updated:** November 16, 2024  
**Total Migrations:** 8  
**Total Programs:** 16  
**Total Courses:** 29
