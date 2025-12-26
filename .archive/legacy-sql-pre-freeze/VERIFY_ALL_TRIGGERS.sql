-- Comprehensive trigger verification and activation
-- Run this in Supabase SQL Editor to ensure all critical triggers are active

-- ============================================
-- 1. VERIFY CRITICAL TRIGGERS ARE ACTIVE
-- ============================================

SELECT 
  trigger_name,
  event_object_table as table_name,
  action_timing,
  event_manipulation as event,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- ============================================
-- 2. AUTH USER PROFILE CREATION TRIGGER
-- ============================================

-- Ensure handle_new_user function exists
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    role,
    first_name,
    last_name,
    full_name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    'student',
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = COALESCE(EXCLUDED.first_name, profiles.first_name),
    last_name = COALESCE(EXCLUDED.last_name, profiles.last_name),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. UPDATED_AT TIMESTAMP TRIGGERS
-- ============================================

-- Ensure update_updated_at_column function exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to critical tables
DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOR table_name IN 
    SELECT unnest(ARRAY[
      'profiles',
      'students',
      'enrollments',
      'courses',
      'lessons',
      'lesson_progress',
      'applications',
      'programs',
      'employers',
      'orgs',
      'org_members',
      'tenants',
      'tenant_members',
      'certificates',
      'attendance_records',
      'grades',
      'payments',
      'forum_threads',
      'forum_posts',
      'chat_conversations',
      'billing_subscriptions',
      'entitlements'
    ])
  LOOP
    -- Check if table exists
    IF EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = table_name
    ) THEN
      -- Drop existing trigger
      EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I', table_name, table_name);
      
      -- Create trigger
      EXECUTE format(
        'CREATE TRIGGER update_%I_updated_at 
         BEFORE UPDATE ON public.%I 
         FOR EACH ROW 
         EXECUTE FUNCTION update_updated_at_column()',
        table_name, table_name
      );
      
      RAISE NOTICE 'Created trigger for table: %', table_name;
    END IF;
  END LOOP;
END $$;

-- ============================================
-- 4. ENROLLMENT TRIGGERS
-- ============================================

-- Auto-create student record on enrollment
CREATE OR REPLACE FUNCTION public.on_enrollment_create_student()
RETURNS TRIGGER AS $$
BEGIN
  -- Create student record if doesn't exist
  INSERT INTO public.students (
    id,
    user_id,
    email,
    first_name,
    last_name,
    status,
    created_at
  )
  SELECT
    gen_random_uuid(),
    NEW.user_id,
    p.email,
    p.first_name,
    p.last_name,
    'active',
    NOW()
  FROM public.profiles p
  WHERE p.id = NEW.user_id
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_enrollment_create_student ON public.enrollments;
CREATE TRIGGER on_enrollment_create_student
  AFTER INSERT ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.on_enrollment_create_student();

-- ============================================
-- 5. LESSON PROGRESS TRIGGERS
-- ============================================

-- Update course completion on lesson progress
CREATE OR REPLACE FUNCTION public.update_course_completion()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  completion_percentage NUMERIC;
BEGIN
  -- Count total lessons in course
  SELECT COUNT(*) INTO total_lessons
  FROM public.lessons
  WHERE course_id = NEW.course_id;
  
  -- Count completed lessons for this user
  SELECT COUNT(*) INTO completed_lessons
  FROM public.lesson_progress
  WHERE user_id = NEW.user_id
    AND course_id = NEW.course_id
    AND completed = true;
  
  -- Calculate completion percentage
  IF total_lessons > 0 THEN
    completion_percentage := (completed_lessons::NUMERIC / total_lessons::NUMERIC) * 100;
  ELSE
    completion_percentage := 0;
  END IF;
  
  -- Update enrollment progress
  UPDATE public.enrollments
  SET 
    progress = completion_percentage,
    completed_at = CASE 
      WHEN completion_percentage >= 100 THEN NOW()
      ELSE NULL
    END,
    updated_at = NOW()
  WHERE user_id = NEW.user_id
    AND course_id = NEW.course_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS lesson_progress_update_trigger ON public.lesson_progress;
CREATE TRIGGER lesson_progress_update_trigger
  AFTER INSERT OR UPDATE ON public.lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_course_completion();

-- ============================================
-- 6. APPLICATION APPROVAL TRIGGER
-- ============================================

-- Auto-create enrollment on application approval
CREATE OR REPLACE FUNCTION public.on_application_approved()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to approved
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    -- Create enrollment
    INSERT INTO public.enrollments (
      user_id,
      program_id,
      status,
      enrolled_at,
      created_at
    )
    VALUES (
      NEW.user_id,
      NEW.program_id,
      'active',
      NOW(),
      NOW()
    )
    ON CONFLICT (user_id, program_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_application_approved ON public.applications;
CREATE TRIGGER on_application_approved
  AFTER UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.on_application_approved();

-- ============================================
-- 7. CERTIFICATE GENERATION TRIGGER
-- ============================================

-- Auto-generate certificate on course completion
CREATE OR REPLACE FUNCTION public.generate_certificate_on_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if enrollment just completed
  IF NEW.completed_at IS NOT NULL AND (OLD.completed_at IS NULL OR OLD.completed_at != NEW.completed_at) THEN
    -- Generate certificate
    INSERT INTO public.certificates (
      user_id,
      course_id,
      enrollment_id,
      certificate_number,
      issued_at,
      created_at
    )
    VALUES (
      NEW.user_id,
      NEW.course_id,
      NEW.id,
      'CERT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 12)),
      NOW(),
      NOW()
    )
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS generate_certificate_trigger ON public.enrollments;
CREATE TRIGGER generate_certificate_trigger
  AFTER UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_certificate_on_completion();

-- ============================================
-- 8. VERIFY ALL TRIGGERS ARE ACTIVE
-- ============================================

SELECT 
  'CRITICAL TRIGGERS STATUS' as report_section,
  trigger_name,
  event_object_table,
  action_timing || ' ' || event_manipulation as trigger_event,
  CASE 
    WHEN trigger_name IS NOT NULL THEN '✓ ACTIVE'
    ELSE '✗ MISSING'
  END as status
FROM (
  VALUES 
    ('on_auth_user_created', 'auth.users'),
    ('update_profiles_updated_at', 'profiles'),
    ('update_enrollments_updated_at', 'enrollments'),
    ('update_courses_updated_at', 'courses'),
    ('lesson_progress_update_trigger', 'lesson_progress'),
    ('on_application_approved', 'applications'),
    ('generate_certificate_trigger', 'enrollments'),
    ('on_enrollment_create_student', 'enrollments')
) AS expected(trigger_name, table_name)
LEFT JOIN information_schema.triggers t 
  ON t.trigger_name = expected.trigger_name
ORDER BY expected.table_name, expected.trigger_name;

-- ============================================
-- 9. FIX EXISTING USERS WITHOUT PROFILES
-- ============================================

-- Create profiles for any users that don't have them
INSERT INTO public.profiles (id, email, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  'student',
  au.created_at,
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 10. SUMMARY REPORT
-- ============================================

SELECT 
  '=== SYSTEM STATUS ===' as report,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM public.profiles) as total_profiles,
  (SELECT COUNT(*) FROM public.students) as total_students,
  (SELECT COUNT(*) FROM public.enrollments) as total_enrollments,
  (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public') as total_triggers;

-- Show recent users and their profiles
SELECT 
  'Recent Users' as report_section,
  au.email,
  au.created_at as user_created,
  p.role,
  p.first_name,
  p.last_name,
  CASE WHEN p.id IS NOT NULL THEN '✓' ELSE '✗' END as has_profile
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC
LIMIT 10;
