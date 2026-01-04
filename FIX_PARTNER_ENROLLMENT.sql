-- ============================================
-- FIX PARTNER ENROLLMENT SYSTEM
-- ============================================

-- FIX 1: Add metadata column to partner_enrollments
ALTER TABLE partner_enrollments
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_metadata ON partner_enrollments USING gin(metadata);

-- FIX 2: Create partner_lms_courses table
CREATE TABLE IF NOT EXISTS partner_lms_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_code TEXT,
  description TEXT,
  duration_hours INTEGER,
  capacity INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_lms_courses_partner ON partner_lms_courses(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_lms_courses_active ON partner_lms_courses(is_active);
CREATE INDEX IF NOT EXISTS idx_partner_lms_courses_code ON partner_lms_courses(course_code);

ALTER TABLE partner_lms_courses ENABLE ROW LEVEL SECURITY;

-- Partners can view their own courses
DROP POLICY IF EXISTS "Partners can view own courses" ON partner_lms_courses;
CREATE POLICY "Partners can view own courses"
  ON partner_lms_courses FOR SELECT
  USING (partner_id = auth.uid());

-- Partners can create their own courses
DROP POLICY IF EXISTS "Partners can create own courses" ON partner_lms_courses;
CREATE POLICY "Partners can create own courses"
  ON partner_lms_courses FOR INSERT
  WITH CHECK (partner_id = auth.uid());

-- Partners can update their own courses
DROP POLICY IF EXISTS "Partners can update own courses" ON partner_lms_courses;
CREATE POLICY "Partners can update own courses"
  ON partner_lms_courses FOR UPDATE
  USING (partner_id = auth.uid());

-- Admins can view all courses
DROP POLICY IF EXISTS "Admins can view all partner courses" ON partner_lms_courses;
CREATE POLICY "Admins can view all partner courses"
  ON partner_lms_courses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Admins can manage all courses
DROP POLICY IF EXISTS "Admins can manage all partner courses" ON partner_lms_courses;
CREATE POLICY "Admins can manage all partner courses"
  ON partner_lms_courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, UPDATE ON partner_lms_courses TO authenticated;

-- FIX 3: Ensure partner_lms_enrollments has proper structure
ALTER TABLE partner_lms_enrollments
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_partner_lms_enrollments_metadata ON partner_lms_enrollments USING gin(metadata);

-- FIX 4: Add partner application tracking table
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
  status TEXT DEFAULT 'pending', -- 'pending', 'under_review', 'approved', 'rejected'
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

-- Applicants can view their own applications
DROP POLICY IF EXISTS "Applicants can view own applications" ON partner_applications;
CREATE POLICY "Applicants can view own applications"
  ON partner_applications FOR SELECT
  USING (applicant_id = auth.uid());

-- Applicants can create applications
DROP POLICY IF EXISTS "Applicants can create applications" ON partner_applications;
CREATE POLICY "Applicants can create applications"
  ON partner_applications FOR INSERT
  WITH CHECK (applicant_id = auth.uid());

-- Applicants can update their pending applications
DROP POLICY IF EXISTS "Applicants can update pending applications" ON partner_applications;
CREATE POLICY "Applicants can update pending applications"
  ON partner_applications FOR UPDATE
  USING (applicant_id = auth.uid() AND status = 'pending');

-- Admins can view all applications
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

-- Admins can manage all applications
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

-- FIX 5: Add partner completion tracking
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

-- Students can view their own completions
DROP POLICY IF EXISTS "Students can view own completions" ON partner_completions;
CREATE POLICY "Students can view own completions"
  ON partner_completions FOR SELECT
  USING (student_id = auth.uid());

-- Partners can view their completions
DROP POLICY IF EXISTS "Partners can view own completions" ON partner_completions;
CREATE POLICY "Partners can view own completions"
  ON partner_completions FOR SELECT
  USING (partner_id = auth.uid());

-- Partners can create completions
DROP POLICY IF EXISTS "Partners can create completions" ON partner_completions;
CREATE POLICY "Partners can create completions"
  ON partner_completions FOR INSERT
  WITH CHECK (partner_id = auth.uid());

-- Admins can view all completions
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

-- Admins can manage all completions
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

-- ============================================
-- VERIFICATION
-- ============================================

-- Check all partner tables
SELECT 
  'partner_enrollments' as table_name,
  COUNT(*) as record_count,
  'Student enrollments via partners' as purpose
FROM partner_enrollments
UNION ALL
SELECT 
  'partner_lms_courses',
  COUNT(*),
  'Partner course catalog'
FROM partner_lms_courses
UNION ALL
SELECT 
  'partner_lms_enrollments',
  COUNT(*),
  'Partner LMS enrollments'
FROM partner_lms_enrollments
UNION ALL
SELECT 
  'partner_applications',
  COUNT(*),
  'Partner applications'
FROM partner_applications
UNION ALL
SELECT 
  'partner_completions',
  COUNT(*),
  'Student completions via partners'
FROM partner_completions
UNION ALL
SELECT 
  'program_holders',
  COUNT(*),
  'Approved program holders'
FROM program_holders;

-- Check programs available
SELECT 
  COUNT(*) as total_programs,
  COUNT(*) FILTER (WHERE is_active = true) as active_programs
FROM programs;

-- Check partner profiles
SELECT 
  role,
  COUNT(*) as count
FROM profiles
WHERE role IN ('partner', 'program_holder')
GROUP BY role;

-- Final success message
DO $$
DECLARE
  partner_tables INTEGER;
BEGIN
  SELECT COUNT(*) INTO partner_tables
  FROM information_schema.tables
  WHERE table_name IN (
    'partner_enrollments',
    'partner_lms_courses',
    'partner_lms_enrollments',
    'partner_applications',
    'partner_completions'
  );

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ PARTNER ENROLLMENT SYSTEM FIXED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Fixed:';
  RAISE NOTICE '  ✅ partner_enrollments (added metadata)';
  RAISE NOTICE '  ✅ partner_lms_courses (created)';
  RAISE NOTICE '  ✅ partner_lms_enrollments (added metadata)';
  RAISE NOTICE '  ✅ partner_applications (created)';
  RAISE NOTICE '  ✅ partner_completions (created)';
  RAISE NOTICE '';
  RAISE NOTICE 'Total Partner Tables: %', partner_tables;
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Flow:';
  RAISE NOTICE '  1. Apply via /program-holder/apply';
  RAISE NOTICE '  2. Upload required documents';
  RAISE NOTICE '  3. Admin reviews application';
  RAISE NOTICE '  4. Partner gets dashboard access';
  RAISE NOTICE '  5. Partner creates courses';
  RAISE NOTICE '  6. Partner enrolls students';
  RAISE NOTICE '  7. Partner tracks progress';
  RAISE NOTICE '  8. Partner submits completions';
  RAISE NOTICE '  9. Elevate issues certificates';
  RAISE NOTICE '';
END $$;
