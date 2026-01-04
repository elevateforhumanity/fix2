-- ============================================
-- PROGRAM-BASED LMS LICENSING SYSTEM
-- Allow programs to have different LMS models based on license
-- ============================================

-- Add LMS configuration to programs table
ALTER TABLE programs
ADD COLUMN IF NOT EXISTS lms_model TEXT DEFAULT 'external' CHECK (lms_model IN ('external', 'internal', 'hybrid', 'scorm_only'));

ALTER TABLE programs
ADD COLUMN IF NOT EXISTS requires_license BOOLEAN DEFAULT false;

ALTER TABLE programs
ADD COLUMN IF NOT EXISTS license_type TEXT;

ALTER TABLE programs
ADD COLUMN IF NOT EXISTS lms_config JSONB DEFAULT '{}'::jsonb;

-- Add license tracking to enrollments
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS license_key TEXT;

ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS licensed_until DATE;

-- Create program licenses table
CREATE TABLE IF NOT EXISTS program_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  license_holder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  license_key TEXT NOT NULL UNIQUE,
  license_type TEXT NOT NULL, -- 'single', 'multi', 'unlimited', 'partner'
  max_enrollments INTEGER, -- NULL = unlimited
  current_enrollments INTEGER DEFAULT 0,
  lms_model TEXT NOT NULL DEFAULT 'external' CHECK (lms_model IN ('external', 'internal', 'hybrid', 'scorm_only')),
  external_lms_url TEXT,
  can_create_courses BOOLEAN DEFAULT false, -- Can create courses in partner_lms_courses
  can_upload_scorm BOOLEAN DEFAULT false, -- Can upload SCORM packages
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired', 'cancelled')),
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_program_licenses_program ON program_licenses(program_id);
CREATE INDEX IF NOT EXISTS idx_program_licenses_holder ON program_licenses(license_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_licenses_key ON program_licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_program_licenses_status ON program_licenses(status);

ALTER TABLE program_licenses ENABLE ROW LEVEL SECURITY;

-- License holders can view their own licenses
DROP POLICY IF EXISTS "License holders can view own licenses" ON program_licenses;
CREATE POLICY "License holders can view own licenses"
  ON program_licenses FOR SELECT
  USING (license_holder_id = auth.uid());

-- Admins can manage all licenses
DROP POLICY IF EXISTS "Admins can manage all licenses" ON program_licenses;
CREATE POLICY "Admins can manage all licenses"
  ON program_licenses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT ON program_licenses TO authenticated;

-- Create license usage tracking
CREATE TABLE IF NOT EXISTS license_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID NOT NULL REFERENCES program_licenses(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'enrolled', 'completed', 'dropped'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_license_usage_license ON license_usage_log(license_id);
CREATE INDEX IF NOT EXISTS idx_license_usage_student ON license_usage_log(student_id);

ALTER TABLE license_usage_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all usage
DROP POLICY IF EXISTS "Admins can view all usage" ON license_usage_log;
CREATE POLICY "Admins can view all usage"
  ON license_usage_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- License holders can view their usage
DROP POLICY IF EXISTS "License holders can view own usage" ON license_usage_log;
CREATE POLICY "License holders can view own usage"
  ON license_usage_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM program_licenses
      WHERE program_licenses.id = license_usage_log.license_id
      AND program_licenses.license_holder_id = auth.uid()
    )
  );

GRANT SELECT ON license_usage_log TO authenticated;

-- Link partner_lms_courses to licenses
ALTER TABLE partner_lms_courses
ADD COLUMN IF NOT EXISTS license_id UUID REFERENCES program_licenses(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_partner_lms_courses_license ON partner_lms_courses(license_id);

-- Add comments
COMMENT ON TABLE program_licenses IS 'Program licenses that determine LMS access model';
COMMENT ON COLUMN program_licenses.lms_model IS 'external=link only, internal=create courses, hybrid=both, scorm_only=SCORM packages only';
COMMENT ON COLUMN program_licenses.can_create_courses IS 'TRUE = Can create courses in partner_lms_courses table';
COMMENT ON COLUMN program_licenses.can_upload_scorm IS 'TRUE = Can upload and manage SCORM packages';
COMMENT ON COLUMN programs.lms_model IS 'Default LMS model for this program (can be overridden by license)';
COMMENT ON COLUMN programs.lms_config IS 'JSON config for LMS settings per program';

-- Insert example license types
INSERT INTO program_licenses (
  program_id,
  license_holder_id,
  license_key,
  license_type,
  lms_model,
  can_create_courses,
  can_upload_scorm,
  max_enrollments
)
SELECT 
  p.id,
  ph.user_id,
  'DEMO-' || substr(md5(random()::text), 1, 8),
  'demo',
  'external',
  false,
  false,
  10
FROM programs p
CROSS JOIN program_holders ph
WHERE ph.status = 'approved'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Verification
DO $$
DECLARE
  programs_with_lms INTEGER;
  total_licenses INTEGER;
BEGIN
  SELECT COUNT(*) INTO programs_with_lms
  FROM programs
  WHERE lms_model IS NOT NULL;
  
  SELECT COUNT(*) INTO total_licenses
  FROM program_licenses;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ PROGRAM-BASED LMS LICENSING ACTIVATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'License Models Available:';
  RAISE NOTICE '';
  RAISE NOTICE '1. EXTERNAL (Default):';
  RAISE NOTICE '   - Partner provides external_lms_url';
  RAISE NOTICE '   - Students access via link';
  RAISE NOTICE '   - No course creation';
  RAISE NOTICE '';
  RAISE NOTICE '2. INTERNAL (Premium License):';
  RAISE NOTICE '   - can_create_courses = TRUE';
  RAISE NOTICE '   - Partner creates courses in partner_lms_courses';
  RAISE NOTICE '   - Students access in your system';
  RAISE NOTICE '';
  RAISE NOTICE '3. HYBRID (Full License):';
  RAISE NOTICE '   - Both external link AND internal courses';
  RAISE NOTICE '   - can_create_courses = TRUE';
  RAISE NOTICE '   - can_upload_scorm = TRUE';
  RAISE NOTICE '';
  RAISE NOTICE '4. SCORM_ONLY (SCORM License):';
  RAISE NOTICE '   - can_upload_scorm = TRUE';
  RAISE NOTICE '   - Upload and manage SCORM packages';
  RAISE NOTICE '   - No external link needed';
  RAISE NOTICE '';
  RAISE NOTICE 'Database Status:';
  RAISE NOTICE '  Programs configured: %', programs_with_lms;
  RAISE NOTICE '  Active licenses: %', total_licenses;
  RAISE NOTICE '';
  RAISE NOTICE 'Usage:';
  RAISE NOTICE '  1. Create program with lms_model';
  RAISE NOTICE '  2. Partner purchases license';
  RAISE NOTICE '  3. License determines what they can do';
  RAISE NOTICE '  4. System wraps LMS based on license';
  RAISE NOTICE '';
  RAISE NOTICE 'License Types:';
  RAISE NOTICE '  - single: 1 enrollment';
  RAISE NOTICE '  - multi: X enrollments (set max_enrollments)';
  RAISE NOTICE '  - unlimited: No limit';
  RAISE NOTICE '  - partner: Full partner access';
  RAISE NOTICE '';
END $$;
