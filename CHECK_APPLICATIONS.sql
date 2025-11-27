-- ============================================================
-- CHECK YOUR APPLICATIONS - Run this in Supabase SQL Editor
-- ============================================================

-- 1. See all applications with key details
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  program_id,
  status,
  heard_about_us,
  created_at,
  CASE 
    WHEN email LIKE '%test%' OR email LIKE '%example%' THEN '🧪 TEST'
    WHEN first_name LIKE '%test%' OR last_name LIKE '%test%' THEN '🧪 TEST'
    ELSE '✅ REAL'
  END as likely_type
FROM applications
ORDER BY created_at DESC;

-- ============================================================

-- 2. Count real vs test applications
SELECT 
  CASE 
    WHEN email LIKE '%test%' OR email LIKE '%example%' 
         OR first_name LIKE '%test%' OR last_name LIKE '%test%' 
    THEN '🧪 Test Data'
    ELSE '✅ Real Applications'
  END as type,
  COUNT(*) as count
FROM applications
GROUP BY type;

-- ============================================================

-- 3. See applications by date (find when they came in)
SELECT 
  DATE(created_at) as application_date,
  COUNT(*) as applications_that_day,
  STRING_AGG(DISTINCT program_id, ', ') as programs
FROM applications
GROUP BY DATE(created_at)
ORDER BY application_date DESC;

-- ============================================================

-- 4. See which programs people are applying for
SELECT 
  program_id,
  COUNT(*) as application_count,
  STRING_AGG(DISTINCT status, ', ') as statuses
FROM applications
GROUP BY program_id
ORDER BY application_count DESC;

-- ============================================================

-- 5. Check enrollments too
SELECT 
  id,
  email,
  program_id,
  status,
  source,
  created_at,
  CASE 
    WHEN email LIKE '%test%' OR email LIKE '%example%' THEN '🧪 TEST'
    ELSE '✅ REAL'
  END as likely_type
FROM enrollments
ORDER BY created_at DESC;

-- ============================================================
-- WHAT TO LOOK FOR:
-- ============================================================
-- 
-- TEST DATA indicators:
-- - Emails like: test@test.com, example@example.com, admin@test.com
-- - Names like: Test User, John Doe, Jane Smith
-- - All created on the same day/time
-- - Same program_id repeated many times
-- 
-- REAL DATA indicators:
-- - Unique email addresses (gmail, yahoo, etc.)
-- - Different names
-- - Created over multiple days
-- - Variety of programs
-- - Phone numbers filled in
-- - Different referral sources
-- 
-- ============================================================
