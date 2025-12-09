-- ============================================
-- UPDATE JRI COURSES WITH SCORM URLs
-- Run this AFTER uploading SCORM files
-- ============================================

DO $$
DECLARE
  jri_id UUID;
  base_url TEXT := 'https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/scorm-packages/jri/';
BEGIN
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  
  -- Introduction to Job Ready Indy
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '0-jri-_introduction_to_job_ready_indy_(jri)-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-COMM';
  
  -- Badge 1: Mindsets
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '1-jri-_badge_1-_mindsets-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-PROBLEM';
  
  -- Badge 2: Self-Management
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '2-jri-_badge_2-_self-management-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-TEAM';
  
  -- Badge 3: Learning Strategies
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '3-jri-_badge_3-_learning_strategies-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-PROF';
  
  -- Badge 4: Social Skills
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '4-jri-_badge_4-_social_skills-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-CAREER';
  
  -- Badge 5: Workplace Skills
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '5-jri-_badge_5-_workplace_skills-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_code = 'JRI-DIGITAL';
  
  -- Badge 6: Launch a Career (if exists)
  UPDATE partner_courses 
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{scorm_url}',
    to_jsonb(base_url || '6-jri-_badge_6-_launch_a_career-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip')
  )
  WHERE provider_id = jri_id AND course_name LIKE '%Launch%Career%';
  
END $$;

-- ============================================
-- VERIFY SCORM URLs ADDED
-- ============================================

SELECT 
  course_name,
  course_code,
  CASE 
    WHEN metadata->>'scorm_url' IS NOT NULL THEN '✅ URL Added'
    ELSE '❌ Missing URL'
  END as status,
  metadata->>'scorm_url' as scorm_url
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'jri')
ORDER BY course_code;

-- Show summary
SELECT 
  'JRI SCORM Integration' as summary,
  COUNT(*) as total_courses,
  COUNT(CASE WHEN metadata->>'scorm_url' IS NOT NULL THEN 1 END) as configured_courses,
  COUNT(CASE WHEN metadata->>'scorm_url' IS NULL THEN 1 END) as missing_urls
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'jri');
