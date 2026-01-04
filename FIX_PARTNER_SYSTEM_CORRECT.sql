-- ============================================
-- FIX PARTNER SYSTEM - CORRECT VERSION
-- Partners use external LMS links + SCORM, NOT their own courses
-- ============================================

-- Remove partner_lms_courses table (not needed - partners use external links)
DROP TABLE IF EXISTS partner_lms_courses CASCADE;

-- Create partner_applications table
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  business_type TEXT,
  license_number TEXT,
  years_in_business INTEGER,
  training_capacity INTEGER,
  programs_offered TEXT[],
  external_lms_url TEXT, -- Partner's external LMS link
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_applications_applicant ON partner_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created ON partner_applications(created_at DESC);

ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Applicants can view own applications" ON partner_applications;
CREATE POLICY "Applicants can view own applications"
  ON partner_applications FOR SELECT
  USING (applicant_id = auth.uid());

DROP POLICY IF EXISTS "Applicants can create applications" ON partner_applications;
CREATE POLICY "Applicants can create applications"
  ON partner_applications FOR INSERT
  WITH CHECK (applicant_id = auth.uid());

DROP POLICY IF EXISTS "Applicants can update pending applications" ON partner_applications;
CREATE POLICY "Applicants can update pending applications"
  ON partner_applications FOR UPDATE
  USING (applicant_id = auth.uid() AND status = 'pending');

DROP POLICY IF EXISTS "Admins can view all applications" ON partner_applications;
CREATE POLICY "Admins can view all applications"
  ON partner_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

DROP POLICY IF EXISTS "Admins can manage all applications" ON partner_applications;
CREATE POLICY "Admins can manage all applications"
  ON partner_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, UPDATE ON partner_applications TO authenticated;

-- Create partner_completions table
CREATE TABLE IF NOT EXISTS partner_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES partner_enrollments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES profiles(id),
  program_id UUID REFERENCES programs(id),
  completion_date DATE NOT NULL,
  hours_completed DECIMAL(10,2),
  grade TEXT,
  certificate_issued BOOLEAN DEFAULT false,
  certificate_number TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_completions_enrollment ON partner_completions(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_partner_completions_student ON partner_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_partner_completions_partner ON partner_completions(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_completions_program ON partner_completions(program_id);
CREATE INDEX IF NOT EXISTS idx_partner_completions_date ON partner_completions(completion_date DESC);

ALTER TABLE partner_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own completions" ON partner_completions;
CREATE POLICY "Students can view own completions"
  ON partner_completions FOR SELECT
  USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Partners can view own completions" ON partner_completions;
CREATE POLICY "Partners can view own completions"
  ON partner_completions FOR SELECT
  USING (partner_id = auth.uid());

DROP POLICY IF EXISTS "Partners can create completions" ON partner_completions;
CREATE POLICY "Partners can create completions"
  ON partner_completions FOR INSERT
  WITH CHECK (partner_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all completions" ON partner_completions;
CREATE POLICY "Admins can view all completions"
  ON partner_completions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

DROP POLICY IF EXISTS "Admins can manage all completions" ON partner_completions;
CREATE POLICY "Admins can manage all completions"
  ON partner_completions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, UPDATE ON partner_completions TO authenticated;

-- Add metadata column to partner_enrollments if missing
ALTER TABLE partner_enrollments
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_metadata ON partner_enrollments USING gin(metadata);

-- Add external_lms_url to partner_enrollments
ALTER TABLE partner_enrollments
ADD COLUMN IF NOT EXISTS external_lms_url TEXT;

-- Verify SCORM tables exist (they should from migration)
DO $$
DECLARE
  scorm_exists BOOLEAN;
  partner_course_mappings_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'scorm_packages'
  ) INTO scorm_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'partner_course_mappings'
  ) INTO partner_course_mappings_exists;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ PARTNER SYSTEM FIXED (CORRECT VERSION)';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Model:';
  RAISE NOTICE '  ✅ Partners use EXTERNAL LMS (via links)';
  RAISE NOTICE '  ✅ Partners use SCORM packages (embedded)';
  RAISE NOTICE '  ❌ Partners do NOT manage their own courses';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables:';
  RAISE NOTICE '  ✅ partner_applications (created)';
  RAISE NOTICE '  ✅ partner_completions (created)';
  RAISE NOTICE '  ✅ partner_enrollments (fixed - added metadata + external_lms_url)';
  RAISE NOTICE '  ✅ scorm_packages: %', scorm_exists;
  RAISE NOTICE '  ✅ partner_course_mappings: %', partner_course_mappings_exists;
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Flow:';
  RAISE NOTICE '  1. Partner applies with external LMS URL';
  RAISE NOTICE '  2. Admin reviews and approves';
  RAISE NOTICE '  3. Students enrolled via partner_enrollments';
  RAISE NOTICE '  4. Students access via external_lms_url OR SCORM';
  RAISE NOTICE '  5. Partner submits completions';
  RAISE NOTICE '  6. Elevate issues certificates';
  RAISE NOTICE '';
END $$;
