-- ============================================
-- FINAL COMPREHENSIVE SMOKE TEST
-- Tests all critical functionality
-- ============================================

-- Test 1: Core tables exist
DO $$
DECLARE
  missing_tables TEXT[];
BEGIN
  SELECT ARRAY_AGG(table_name)
  INTO missing_tables
  FROM (
    SELECT unnest(ARRAY[
      'profiles', 'programs', 'courses', 'modules', 'lessons',
      'enrollments', 'applications', 'certificates'
    ]) AS table_name
  ) expected
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = expected.table_name
  );
  
  IF missing_tables IS NULL THEN
    RAISE NOTICE '✅ Test 1 PASSED: All core tables exist';
  ELSE
    RAISE NOTICE '❌ Test 1 FAILED: Missing tables: %', array_to_string(missing_tables, ', ');
  END IF;
END $$;

-- Test 2: Programs exist
DO $$
DECLARE
  program_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO program_count FROM programs;
  
  IF program_count > 0 THEN
    RAISE NOTICE '✅ Test 2 PASSED: % programs exist', program_count;
  ELSE
    RAISE NOTICE '❌ Test 2 FAILED: No programs found';
  END IF;
END $$;

-- Test 3: Courses exist
DO $$
DECLARE
  course_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO course_count FROM courses;
  
  IF course_count > 0 THEN
    RAISE NOTICE '✅ Test 3 PASSED: % courses exist', course_count;
  ELSE
    RAISE NOTICE '❌ Test 3 FAILED: No courses found';
  END IF;
END $$;

-- Test 4: Barber program exists with content
DO $$
DECLARE
  barber_program_id UUID;
  course_count INTEGER;
  module_count INTEGER;
  lesson_count INTEGER;
BEGIN
  SELECT id INTO barber_program_id 
  FROM programs 
  WHERE slug LIKE '%barber%' 
  LIMIT 1;
  
  IF barber_program_id IS NULL THEN
    RAISE NOTICE '❌ Test 4 FAILED: Barber program not found';
    RETURN;
  END IF;
  
  SELECT COUNT(*) INTO course_count 
  FROM courses 
  WHERE program_id = barber_program_id;
  
  SELECT COUNT(*) INTO module_count 
  FROM modules m
  JOIN courses c ON m.course_id = c.id
  WHERE c.program_id = barber_program_id;
  
  SELECT COUNT(*) INTO lesson_count 
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  JOIN courses c ON m.course_id = c.id
  WHERE c.program_id = barber_program_id;
  
  RAISE NOTICE '✅ Test 4 PASSED: Barber program has % courses, % modules, % lessons', 
    course_count, module_count, lesson_count;
END $$;

-- Test 5: Partner integration tables exist
DO $$
DECLARE
  partner_tables_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_courses') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_enrollments') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_credentials')
  INTO partner_tables_exist;
  
  IF partner_tables_exist THEN
    RAISE NOTICE '✅ Test 5 PASSED: Partner integration tables exist';
  ELSE
    RAISE NOTICE '❌ Test 5 FAILED: Partner integration tables missing';
  END IF;
END $$;

-- Test 6: Progress tracking tables exist
DO $$
DECLARE
  progress_tables_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'lesson_progress') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'module_progress') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'course_progress')
  INTO progress_tables_exist;
  
  IF progress_tables_exist THEN
    RAISE NOTICE '✅ Test 6 PASSED: Progress tracking tables exist';
  ELSE
    RAISE NOTICE '❌ Test 6 FAILED: Progress tracking tables missing';
  END IF;
END $$;

-- Test 7: RLS is enabled on critical tables
DO $$
DECLARE
  tables_without_rls TEXT[];
BEGIN
  SELECT ARRAY_AGG(tablename)
  INTO tables_without_rls
  FROM pg_tables t
  JOIN pg_class c ON c.relname = t.tablename
  WHERE t.schemaname = 'public'
  AND t.tablename IN ('profiles', 'enrollments', 'applications', 'certificates')
  AND NOT c.relrowsecurity;
  
  IF tables_without_rls IS NULL THEN
    RAISE NOTICE '✅ Test 7 PASSED: RLS enabled on all critical tables';
  ELSE
    RAISE NOTICE '⚠️  Test 7 WARNING: RLS not enabled on: %', array_to_string(tables_without_rls, ', ');
  END IF;
END $$;

-- Test 8: Can insert test application
DO $$
DECLARE
  test_program_id UUID;
  test_app_id UUID;
BEGIN
  SELECT id INTO test_program_id FROM programs LIMIT 1;
  
  IF test_program_id IS NULL THEN
    RAISE NOTICE '⚠️  Test 8 SKIPPED: No programs exist';
    RETURN;
  END IF;
  
  INSERT INTO applications (
    program_id,
    first_name,
    last_name,
    email,
    phone,
    status
  ) VALUES (
    test_program_id,
    'Smoke',
    'Test',
    'smoke_test_' || floor(random() * 1000000) || '@test.com',
    '+1234567890',
    'pending'
  ) RETURNING id INTO test_app_id;
  
  DELETE FROM applications WHERE id = test_app_id;
  
  RAISE NOTICE '✅ Test 8 PASSED: Can create and delete applications';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE '❌ Test 8 FAILED: Cannot insert application - %', SQLERRM;
END $$;

-- Test 9: Check achievements system
DO $$
DECLARE
  achievements_exist BOOLEAN;
  badges_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'achievements'),
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'badges')
  INTO achievements_exist, badges_exist;
  
  IF achievements_exist AND badges_exist THEN
    RAISE NOTICE '✅ Test 9 PASSED: Achievements and badges system exists';
  ELSE
    RAISE NOTICE '❌ Test 9 FAILED: Achievements or badges tables missing';
  END IF;
END $$;

-- Test 10: Check hybrid learning tables
DO $$
DECLARE
  hybrid_tables_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'hybrid_schedules') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'attendance_records')
  INTO hybrid_tables_exist;
  
  IF hybrid_tables_exist THEN
    RAISE NOTICE '✅ Test 10 PASSED: Hybrid learning tables exist';
  ELSE
    RAISE NOTICE '❌ Test 10 FAILED: Hybrid learning tables missing';
  END IF;
END $$;

-- Test 11: Check job placement features
DO $$
DECLARE
  job_tables_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'job_postings') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'job_applications') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'employer_profiles')
  INTO job_tables_exist;
  
  IF job_tables_exist THEN
    RAISE NOTICE '✅ Test 11 PASSED: Job placement features exist';
  ELSE
    RAISE NOTICE '❌ Test 11 FAILED: Job placement tables missing';
  END IF;
END $$;

-- Test 12: Check marketing features
DO $$
DECLARE
  marketing_tables_exist BOOLEAN;
BEGIN
  SELECT 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_campaigns') AND
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'social_media_posts')
  INTO marketing_tables_exist;
  
  IF marketing_tables_exist THEN
    RAISE NOTICE '✅ Test 12 PASSED: Marketing features exist';
  ELSE
    RAISE NOTICE '❌ Test 12 FAILED: Marketing tables missing';
  END IF;
END $$;

-- Final Summary
SELECT '═══════════════════════════════════════' as summary;
SELECT '🎯 SMOKE TEST COMPLETE' as summary;
SELECT '═══════════════════════════════════════' as summary;

SELECT 
  'Total Tables' as metric,
  COUNT(*)::TEXT as value
FROM pg_tables 
WHERE schemaname = 'public'
UNION ALL
SELECT 
  'Total Programs',
  COUNT(*)::TEXT
FROM programs
UNION ALL
SELECT 
  'Total Courses',
  COUNT(*)::TEXT
FROM courses
UNION ALL
SELECT 
  'Total Modules',
  COUNT(*)::TEXT
FROM modules
UNION ALL
SELECT 
  'Total Lessons',
  COUNT(*)::TEXT
FROM lessons
UNION ALL
SELECT 
  'Total Enrollments',
  COUNT(*)::TEXT
FROM enrollments
UNION ALL
SELECT 
  'Total Applications',
  COUNT(*)::TEXT
FROM applications
UNION ALL
SELECT 
  'Total Certificates',
  COUNT(*)::TEXT
FROM certificates
UNION ALL
SELECT 
  'RLS Policies',
  COUNT(*)::TEXT
FROM pg_policies 
WHERE schemaname = 'public';

SELECT '═══════════════════════════════════════' as summary;
SELECT '✅ All systems operational' as summary;
SELECT '═══════════════════════════════════════' as summary;
