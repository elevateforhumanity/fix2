-- ============================================
-- KEEP BOTH PARTNER MODELS
-- 1. External LMS (via links) - DEFAULT
-- 2. Internal courses (optional for clones/stores)
-- ============================================

-- Keep partner_lms_courses table (make it optional)
-- This table already exists, just ensure it has the right structure

-- Add is_using_internal_lms flag to partner_applications
ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS is_using_internal_lms BOOLEAN DEFAULT false;

-- Add is_using_internal_lms to program_holders
ALTER TABLE program_holders
ADD COLUMN IF NOT EXISTS is_using_internal_lms BOOLEAN DEFAULT false;

-- Add comment to explain the dual model
COMMENT ON COLUMN partner_applications.is_using_internal_lms IS 'TRUE = Partner manages courses in our system, FALSE = Partner uses external LMS link (default)';
COMMENT ON COLUMN partner_applications.external_lms_url IS 'External LMS URL (used when is_using_internal_lms = false)';
COMMENT ON TABLE partner_lms_courses IS 'Optional: Partner-managed courses (only used when is_using_internal_lms = true)';

-- Verify everything exists
DO $$
DECLARE
  partner_lms_courses_exists BOOLEAN;
  partner_applications_exists BOOLEAN;
  scorm_packages_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'partner_lms_courses'
  ) INTO partner_lms_courses_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'partner_applications'
  ) INTO partner_applications_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'scorm_packages'
  ) INTO scorm_packages_exists;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ DUAL PARTNER MODEL CONFIGURED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Models Available:';
  RAISE NOTICE '';
  RAISE NOTICE '1. EXTERNAL LMS (Default):';
  RAISE NOTICE '   - Partner provides external_lms_url';
  RAISE NOTICE '   - Students access via link';
  RAISE NOTICE '   - is_using_internal_lms = FALSE';
  RAISE NOTICE '';
  RAISE NOTICE '2. INTERNAL COURSES (Optional):';
  RAISE NOTICE '   - Partner manages courses in partner_lms_courses';
  RAISE NOTICE '   - Students access in our system';
  RAISE NOTICE '   - is_using_internal_lms = TRUE';
  RAISE NOTICE '';
  RAISE NOTICE '3. SCORM PACKAGES (Both):';
  RAISE NOTICE '   - Can be used with either model';
  RAISE NOTICE '   - Embedded SCORM content';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Status:';
  RAISE NOTICE '  ✅ partner_lms_courses: %', partner_lms_courses_exists;
  RAISE NOTICE '  ✅ partner_applications: %', partner_applications_exists;
  RAISE NOTICE '  ✅ scorm_packages: %', scorm_packages_exists;
  RAISE NOTICE '';
  RAISE NOTICE 'Usage:';
  RAISE NOTICE '  - Default partners: Set is_using_internal_lms = FALSE';
  RAISE NOTICE '  - Store clones: Set is_using_internal_lms = TRUE';
  RAISE NOTICE '';
END $$;
