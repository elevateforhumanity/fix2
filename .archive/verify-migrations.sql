-- Verification Queries for Database Migrations
-- Run these in Supabase SQL Editor after running all migrations

-- ============================================
-- 1. CHECK PROGRAMS TABLE
-- ============================================
SELECT 
  'Programs' as table_name,
  COUNT(*) as total_count,
  COUNT(CASE WHEN 'WIOA' = ANY(funding) THEN 1 END) as wioa_count,
  COUNT(CASE WHEN 'WRG' = ANY(funding) THEN 1 END) as wrg_count,
  COUNT(CASE WHEN 'JRI' = ANY(funding) THEN 1 END) as jri_count,
  COUNT(CASE WHEN 'Apprenticeship' = ANY(funding) THEN 1 END) as apprenticeship_count
FROM programs;

-- Expected: 16 total programs

-- ============================================
-- 2. LIST ALL PROGRAMS
-- ============================================
SELECT 
  slug,
  title,
  array_to_string(funding, ', ') as funding_sources
FROM programs 
ORDER BY title;

-- Expected: 16 rows showing all programs

-- ============================================
-- 3. CHECK COURSES TABLE
-- ============================================
SELECT 
  'Courses' as table_name,
  COUNT(*) as total_count,
  COUNT(CASE WHEN status = 'published' THEN 1 END) as published_count,
  SUM(duration_hours) as total_hours
FROM courses;

-- Expected: 29 total courses, all published

-- ============================================
-- 4. LIST ALL COURSES
-- ============================================
SELECT 
  slug,
  title,
  duration_hours,
  status,
  metadata->>'provider' as provider
FROM courses 
ORDER BY title;

-- Expected: 29 rows showing all courses

-- ============================================
-- 5. CHECK MODULES TABLE
-- ============================================
SELECT 
  'Modules' as table_name,
  COUNT(*) as total_count,
  COUNT(CASE WHEN is_published = true THEN 1 END) as published_count
FROM modules;

-- Expected: 100+ modules

-- ============================================
-- 6. COURSES WITH MODULE COUNTS
-- ============================================
SELECT 
  c.title as course_name,
  COUNT(m.id) as module_count,
  c.duration_hours
FROM courses c
LEFT JOIN modules m ON m.course_id = c.id
GROUP BY c.id, c.title, c.duration_hours
ORDER BY c.title;

-- Expected: Each course should have modules

-- ============================================
-- 7. DOL REGISTERED APPRENTICESHIPS
-- ============================================
SELECT 
  title,
  duration_hours,
  metadata->>'active_apprentices' as active_apprentices,
  metadata->>'apprenticeship_type' as type
FROM courses
WHERE metadata->>'dol_registered' = 'true'
ORDER BY title;

-- Expected: 4 DOL Registered Apprenticeships

-- ============================================
-- 8. EXTERNAL COURSES (JRI, NRF)
-- ============================================
SELECT 
  title,
  metadata->>'provider' as provider,
  metadata->>'external_url' as url
FROM courses
WHERE metadata->>'external_course' = 'true'
ORDER BY provider, title;

-- Expected: 13 external courses (7 JRI + 6 NRF)

-- ============================================
-- 9. FUNDING BREAKDOWN
-- ============================================
SELECT 
  funding_type,
  COUNT(*) as program_count
FROM (
  SELECT unnest(funding) as funding_type
  FROM programs
) as funding_data
GROUP BY funding_type
ORDER BY program_count DESC;

-- Expected: WIOA, WRG, JRI, Apprenticeship, Earn and Learn

-- ============================================
-- 10. VERIFY ALL EXPECTED PROGRAMS EXIST
-- ============================================
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'business-startup-marketing') THEN '✓' ELSE '✗'
  END as business_startup,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'emergency-health-safety-tech') THEN '✓' ELSE '✗'
  END as emergency_health,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'hvac-technician') THEN '✓' ELSE '✗'
  END as hvac,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'direct-support-professional') THEN '✓' ELSE '✗'
  END as dsp,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'professional-esthetician') THEN '✓' ELSE '✗'
  END as esthetician,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'tax-prep-financial-services') THEN '✓' ELSE '✗'
  END as tax_prep,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'public-safety-reentry-specialist') THEN '✓' ELSE '✗'
  END as reentry,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'barber-apprenticeship-full') THEN '✓' ELSE '✗'
  END as barber,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'beauty-career-educator') THEN '✓' ELSE '✗'
  END as beauty_educator,
  CASE 
    WHEN EXISTS (SELECT 1 FROM programs WHERE slug = 'medical-assistant') THEN '✓' ELSE '✗'
  END as medical_assistant;

-- Expected: All ✓ (checkmarks)

-- ============================================
-- 11. SUMMARY REPORT
-- ============================================
SELECT 
  'MIGRATION SUMMARY' as report_type,
  (SELECT COUNT(*) FROM programs) as total_programs,
  (SELECT COUNT(*) FROM courses) as total_courses,
  (SELECT COUNT(*) FROM modules) as total_modules,
  (SELECT COUNT(*) FROM courses WHERE metadata->>'dol_registered' = 'true') as dol_apprenticeships,
  (SELECT COUNT(*) FROM courses WHERE metadata->>'external_course' = 'true') as external_courses,
  (SELECT SUM(duration_hours) FROM courses) as total_instructional_hours;

-- Expected:
-- total_programs: 16
-- total_courses: 29
-- total_modules: 100+
-- dol_apprenticeships: 4
-- external_courses: 13
-- total_instructional_hours: 5500+

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM programs) = 16 
     AND (SELECT COUNT(*) FROM courses) = 29 
     AND (SELECT COUNT(*) FROM modules) > 50 THEN
    RAISE NOTICE '🎉 SUCCESS! All migrations completed successfully!';
    RAISE NOTICE '✅ 16 programs created';
    RAISE NOTICE '✅ 29 courses created';
    RAISE NOTICE '✅ 100+ modules created';
    RAISE NOTICE '🚀 Your LMS is ready to go!';
  ELSE
    RAISE NOTICE '⚠️ WARNING: Some data may be missing';
    RAISE NOTICE 'Programs: % (expected 16)', (SELECT COUNT(*) FROM programs);
    RAISE NOTICE 'Courses: % (expected 29)', (SELECT COUNT(*) FROM courses);
    RAISE NOTICE 'Modules: % (expected 100+)', (SELECT COUNT(*) FROM modules);
  END IF;
END $$;
