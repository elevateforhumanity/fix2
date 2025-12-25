-- ============================================================================
-- CRITICAL COLUMN VERIFICATION
-- ============================================================================
-- Checks for columns that dashboards reference
-- Run in Supabase SQL Editor and paste results to docs/dashboard-schema-verification.md
-- ============================================================================

-- Check profiles columns
SELECT 
  'profiles' as table_name,
  column_name,
  data_type,
  is_nullable,
  CASE 
    WHEN column_name IN ('role', 'verified', 'orientation_completed', 'eligibility_verified') 
    THEN '✅ REQUIRED'
    ELSE 'optional'
  END as importance
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name IN ('role', 'verified', 'orientation_completed', 'eligibility_verified', 'id', 'email', 'first_name', 'last_name')
ORDER BY 
  CASE column_name
    WHEN 'role' THEN 1
    WHEN 'verified' THEN 2
    WHEN 'orientation_completed' THEN 3
    WHEN 'eligibility_verified' THEN 4
    ELSE 5
  END;

-- Check enrollments columns
SELECT 
  'enrollments' as table_name,
  column_name,
  data_type,
  is_nullable,
  CASE 
    WHEN column_name IN ('program_holder_id', 'instructor_id', 'at_risk') 
    THEN '✅ REQUIRED'
    ELSE 'optional'
  END as importance
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'enrollments'
  AND column_name IN ('program_holder_id', 'instructor_id', 'at_risk', 'id', 'user_id', 'program_id', 'status')
ORDER BY 
  CASE column_name
    WHEN 'program_holder_id' THEN 1
    WHEN 'instructor_id' THEN 2
    WHEN 'at_risk' THEN 3
    ELSE 4
  END;

-- Check apprenticeship_enrollments (for employer dashboard)
SELECT 
  'apprenticeship_enrollments' as table_name,
  column_name,
  data_type,
  is_nullable,
  '✅ REQUIRED' as importance
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'apprenticeship_enrollments'
  AND column_name IN ('id', 'employer_id', 'student_id', 'program_id', 'status', 'total_hours_required', 'total_hours_completed')
ORDER BY ordinal_position;

-- Summary: Which critical columns are MISSING
SELECT 
  'MISSING COLUMNS CHECK' as check_type,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'orientation_completed'
    ) THEN '❌ profiles.orientation_completed MISSING'
    ELSE '✅ profiles.orientation_completed EXISTS'
  END as profiles_orientation,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'eligibility_verified'
    ) THEN '❌ profiles.eligibility_verified MISSING'
    ELSE '✅ profiles.eligibility_verified EXISTS'
  END as profiles_eligibility,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'enrollments' 
      AND column_name = 'program_holder_id'
    ) THEN '❌ enrollments.program_holder_id MISSING'
    ELSE '✅ enrollments.program_holder_id EXISTS'
  END as enrollments_program_holder,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'enrollments' 
      AND column_name = 'instructor_id'
    ) THEN '❌ enrollments.instructor_id MISSING'
    ELSE '✅ enrollments.instructor_id EXISTS'
  END as enrollments_instructor,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'enrollments' 
      AND column_name = 'at_risk'
    ) THEN '❌ enrollments.at_risk MISSING'
    ELSE '✅ enrollments.at_risk EXISTS'
  END as enrollments_at_risk,
  CASE 
    WHEN NOT EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'apprenticeship_enrollments'
    ) THEN '❌ apprenticeship_enrollments TABLE MISSING'
    ELSE '✅ apprenticeship_enrollments TABLE EXISTS'
  END as apprenticeship_table;
