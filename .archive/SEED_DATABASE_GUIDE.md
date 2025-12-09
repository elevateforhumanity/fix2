# Database Seeding Guide - Elevate For Humanity

## Overview

After applying migrations, you need to seed the database with initial data. We have several seed files available depending on your needs.

## Available Seed Files

### 1. **WORKING_SEED.sql** (Recommended for Testing)
- **Purpose:** Quick test data for development
- **Contains:** 3 courses (CNA, HVAC, Barber)
- **Use When:** You want to test the LMS quickly

```sql
-- Run in Supabase SQL Editor
-- File: WORKING_SEED.sql
```

### 2. **SIMPLE_SEED.sql**
- **Purpose:** Minimal seed data
- **Contains:** Basic programs and courses
- **Use When:** You want a clean start with minimal data

### 3. **COMPLETE_DATABASE_SEED.sql**
- **Purpose:** Full production-ready seed
- **Contains:** All 30+ programs, courses, achievements
- **Use When:** Setting up production or staging environment

### 4. **supabase-schema.sql**
- **Purpose:** Schema + seed data combined
- **Contains:** Tables + initial programs
- **Use When:** Fresh database setup

## Step-by-Step Seeding Process

### Option A: Quick Test Setup (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

2. **Run WORKING_SEED.sql**
   ```sql
   -- Copy and paste contents of WORKING_SEED.sql
   -- This creates 3 test courses
   ```

3. **Verify Data**
   ```sql
   SELECT id, title, slug, moderation_status 
   FROM courses 
   WHERE moderation_status = 'approved';
   ```

   Expected output:
   ```
   | id | title         | slug           | moderation_status |
   |----|---------------|----------------|-------------------|
   | 1  | CNA Training  | cna-training   | approved          |
   | 2  | HVAC Training | hvac-training  | approved          |
   | 3  | Barber Program| barber-program | approved          |
   ```

### Option B: Full Production Setup

1. **Run Complete Seed**
   ```sql
   -- File: COMPLETE_DATABASE_SEED.sql
   -- This takes 2-3 minutes to complete
   ```

2. **Verify All Programs**
   ```sql
   SELECT COUNT(*) as total_programs FROM programs;
   SELECT COUNT(*) as total_courses FROM courses;
   SELECT COUNT(*) as total_achievements FROM achievements;
   ```

## Creating Test Users

After seeding courses, create test users:

```sql
-- Create test student
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  'student@test.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"role": "student", "full_name": "Test Student"}'::jsonb
);

-- Create test instructor
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  'instructor@test.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"role": "instructor", "full_name": "Test Instructor"}'::jsonb
);

-- Create test admin
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  'admin@test.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"role": "admin", "full_name": "Test Admin"}'::jsonb
);
```

## Creating Test Enrollments

Enroll test student in courses:

```sql
-- Get student user ID
DO $$
DECLARE
  student_id UUID;
  course_id UUID;
BEGIN
  -- Get student ID
  SELECT id INTO student_id 
  FROM auth.users 
  WHERE email = 'student@test.com';
  
  -- Get CNA course ID
  SELECT id INTO course_id 
  FROM courses 
  WHERE slug = 'cna-training';
  
  -- Create enrollment
  INSERT INTO enrollments (
    user_id,
    course_id,
    status,
    enrolled_at,
    progress_percentage
  ) VALUES (
    student_id,
    course_id,
    'active',
    NOW(),
    0
  );
  
  RAISE NOTICE 'Enrollment created for student in CNA course';
END $$;
```

## Seeding Programs Data

If you need to add specific programs:

```sql
-- Insert Barber Apprenticeship
INSERT INTO programs (
  slug,
  title,
  tagline,
  description,
  summary,
  bullets,
  funding,
  hero_image,
  is_published
) VALUES (
  'barber-apprenticeship',
  'Barber Apprenticeship',
  'Master the craft of barbering',
  'State-approved apprenticeship program leading to Indiana barber license.',
  'Learn cutting, styling, and business skills in a real barbershop environment.',
  ARRAY[
    'State-approved curriculum',
    '2000 hours of training',
    'Hands-on experience',
    'Business management skills',
    'Prepare for state licensing exam'
  ],
  ARRAY['WIOA', 'WRG', 'JRI', 'Apprenticeship'],
  '/images/programs/barber-hero.jpg',
  true
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_published = EXCLUDED.is_published;

-- Insert CNA Program
INSERT INTO programs (
  slug,
  title,
  tagline,
  description,
  summary,
  bullets,
  funding,
  hero_image,
  is_published
) VALUES (
  'cna',
  'Certified Nursing Assistant (CNA)',
  'Start your healthcare career',
  'State-aligned CNA training with clinicals and WorkOne eligibility.',
  'Become a certified nursing assistant and begin your healthcare journey.',
  ARRAY[
    'State-approved training',
    'Clinical experience',
    'Exam preparation',
    'Job placement assistance',
    'Fast-track to employment'
  ],
  ARRAY['WIOA', 'WRG'],
  '/images/programs/efh-cna-hero.jpg',
  true
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_published = EXCLUDED.is_published;

-- Insert HVAC Program
INSERT INTO programs (
  slug,
  title,
  tagline,
  description,
  summary,
  bullets,
  funding,
  hero_image,
  is_published
) VALUES (
  'hvac',
  'HVAC Technician',
  'Build a career in HVAC',
  'Hands-on HVAC fundamentals with stackable NATE-ready skills.',
  'Learn heating, ventilation, and air conditioning systems from industry experts.',
  ARRAY[
    'EPA certification prep',
    'Hands-on training',
    'NATE-ready curriculum',
    'Industry-recognized credentials',
    'High-demand career path'
  ],
  ARRAY['WIOA', 'WRG'],
  '/images/programs/hvac-hero.jpg',
  true
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_published = EXCLUDED.is_published;
```

## Verification Queries

After seeding, run these to verify:

```sql
-- Check programs
SELECT slug, title, is_published 
FROM programs 
WHERE is_published = true 
ORDER BY title;

-- Check courses
SELECT slug, title, category, level, moderation_status 
FROM courses 
WHERE moderation_status = 'approved' 
ORDER BY title;

-- Check enrollments
SELECT 
  u.email,
  c.title as course_title,
  e.status,
  e.progress_percentage
FROM enrollments e
JOIN auth.users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id;

-- Check achievements
SELECT name, description, points 
FROM achievements 
ORDER BY points DESC;
```

## Common Issues

### Issue: "duplicate key value violates unique constraint"
**Solution:** Data already exists. Either:
- Skip the insert (use `ON CONFLICT DO NOTHING`)
- Update existing data (use `ON CONFLICT DO UPDATE`)
- Clear the table first: `TRUNCATE TABLE programs CASCADE;`

### Issue: "null value in column violates not-null constraint"
**Solution:** Check which columns are required in your schema. Add default values or provide all required fields.

### Issue: "foreign key constraint violation"
**Solution:** Make sure parent records exist first. For example, create programs before courses that reference them.

## Automated Seeding Script

Create a Node.js script to seed programmatically:

```typescript
// scripts/seed-database.ts
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDatabase() {
  console.log('🌱 Starting database seed...');
  
  // Read seed file
  const seedSQL = fs.readFileSync('WORKING_SEED.sql', 'utf-8');
  
  // Execute SQL
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: seedSQL
  });
  
  if (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
  
  console.log('✅ Database seeded successfully!');
  
  // Verify
  const { data: courses } = await supabase
    .from('courses')
    .select('*');
  
  console.log(`📚 Found ${courses?.length} courses`);
}

seedDatabase();
```

Run with: `npx tsx scripts/seed-database.ts`

## Next Steps

After seeding:

1. ✅ Test login with test users
2. ✅ Verify courses appear in LMS
3. ✅ Test enrollment flow
4. ✅ Check student dashboard
5. ✅ Verify course content loads

## Production Seeding Checklist

Before seeding production:

- [ ] Backup existing data
- [ ] Review all seed data for accuracy
- [ ] Test seed script in staging first
- [ ] Verify all images exist
- [ ] Check all URLs are correct
- [ ] Confirm funding sources are accurate
- [ ] Validate program descriptions
- [ ] Test enrollment flows
- [ ] Verify certificate generation
- [ ] Check reporting data

---

**Last Updated:** December 6, 2024
