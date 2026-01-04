-- ============================================
-- MASTER SQL - COMPLETE DATABASE FIX
-- Run this ENTIRE file in Supabase SQL Editor
-- ============================================

-- ============================================
-- PART 1: CREATE MISSING CORE TABLES
-- ============================================

-- Create tax_documents table
CREATE TABLE IF NOT EXISTS tax_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  uploaded_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tax_documents_user_id ON tax_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_documents_year ON tax_documents(tax_year);
CREATE INDEX IF NOT EXISTS idx_tax_documents_type ON tax_documents(document_type);

ALTER TABLE tax_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own tax documents" ON tax_documents;
CREATE POLICY "Users can view own tax documents"
  ON tax_documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload own tax documents" ON tax_documents;
CREATE POLICY "Users can upload own tax documents"
  ON tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all tax documents" ON tax_documents;
CREATE POLICY "Admins can view all tax documents"
  ON tax_documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Admins can update tax documents" ON tax_documents;
CREATE POLICY "Admins can update tax documents"
  ON tax_documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT ON tax_documents TO authenticated;
GRANT UPDATE ON tax_documents TO authenticated;

-- Create payment_records table
CREATE TABLE IF NOT EXISTS payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_records_user ON payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);

ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payment_records_select_own" ON payment_records;
CREATE POLICY "payment_records_select_own" ON payment_records
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT ON payment_records TO authenticated;

-- Create onboarding_steps table
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, step_name)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_user ON onboarding_steps(user_id);

ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "onboarding_select_own" ON onboarding_steps;
CREATE POLICY "onboarding_select_own" ON onboarding_steps
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_insert_own" ON onboarding_steps;
CREATE POLICY "onboarding_insert_own" ON onboarding_steps
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "onboarding_update_own" ON onboarding_steps;
CREATE POLICY "onboarding_update_own" ON onboarding_steps
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON onboarding_steps TO authenticated;

-- ============================================
-- PART 2: FIX EXISTING TABLES
-- ============================================

-- Add missing columns to program_holder_documents
ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id);

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

ALTER TABLE program_holder_documents 
ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add metadata to partner_enrollments
ALTER TABLE partner_enrollments
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_metadata ON partner_enrollments USING gin(metadata);

-- Add metadata to partner_lms_enrollments
ALTER TABLE partner_lms_enrollments
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_partner_lms_enrollments_metadata ON partner_lms_enrollments USING gin(metadata);

-- ============================================
-- PART 3: CREATE PARTNER TABLES
-- ============================================

-- Create partner_lms_courses table
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

DROP POLICY IF EXISTS "Partners can view own courses" ON partner_lms_courses;
CREATE POLICY "Partners can view own courses"
  ON partner_lms_courses FOR SELECT
  USING (partner_id = auth.uid());

DROP POLICY IF EXISTS "Partners can create own courses" ON partner_lms_courses;
CREATE POLICY "Partners can create own courses"
  ON partner_lms_courses FOR INSERT
  WITH CHECK (partner_id = auth.uid());

DROP POLICY IF EXISTS "Partners can update own courses" ON partner_lms_courses;
CREATE POLICY "Partners can update own courses"
  ON partner_lms_courses FOR UPDATE
  USING (partner_id = auth.uid());

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

-- ============================================
-- PART 4: ADD DOCUMENT REQUIREMENTS
-- ============================================

-- Students
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('student', 'transcript', true, 'Academic transcript', 'Upload official transcript from your school or training program', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'social_security_card', true, 'Social Security Card', 'Upload copy of your Social Security card', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('student', 'proof_of_address', true, 'Proof of Address', 'Upload utility bill, lease agreement, or bank statement', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'high_school_diploma', false, 'High School Diploma or GED', 'Upload your high school diploma or GED certificate', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'drug_test_results', false, 'Drug Test Results', 'Upload recent drug test results if required by program', ARRAY['pdf'], 5242880),
  ('student', 'physical_exam', false, 'Physical Examination', 'Upload physical exam results if required by program', ARRAY['pdf'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Program Holders (ONLY hands-on training programs need safety certs)
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('program_holder', 'w9_form', true, 'W-9 Tax Form', 'Upload completed and signed W-9 form', ARRAY['pdf'], 5242880),
  ('program_holder', 'certificate_of_insurance', true, 'Certificate of Insurance', 'Upload current certificate of insurance', ARRAY['pdf'], 10485760),
  ('program_holder', 'facility_photos', true, 'Facility Photos', 'Upload photos of your training facility (minimum 5 photos)', ARRAY['jpg', 'jpeg', 'png'], 20971520),
  ('program_holder', 'instructor_credentials', true, 'Instructor Credentials', 'Upload credentials for all instructors', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('program_holder', 'curriculum_outline', true, 'Curriculum Outline', 'Upload detailed curriculum outline', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('program_holder', 'safety_plan', true, 'Safety Plan', 'Upload facility safety plan and emergency procedures', ARRAY['pdf'], 10485760),
  ('program_holder', 'accreditation_certificate', true, 'Accreditation Certificate', 'Upload accreditation certificate', ARRAY['pdf'], 5242880),
  ('program_holder', 'ppe_requirements', false, 'PPE Requirements (if hands-on training)', 'Upload PPE requirements document. REQUIRED ONLY if you teach hands-on programs with PPE', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('program_holder', 'safety_training_cert', false, 'Safety Training Cert (if hands-on training)', 'Upload safety training certification. REQUIRED ONLY if you teach hands-on programs', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('program_holder', 'osha_compliance', false, 'OSHA Compliance (if hands-on training)', 'Upload OSHA compliance documentation. REQUIRED ONLY if you teach hands-on programs', ARRAY['pdf'], 10485760),
  ('program_holder', 'lease_agreement', false, 'Facility Lease Agreement', 'Upload lease agreement or proof of facility ownership', ARRAY['pdf'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Employers
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('employer', 'workers_comp_insurance', true, 'Workers Compensation Insurance', 'Upload current workers compensation insurance certificate', ARRAY['pdf'], 10485760),
  ('employer', 'job_descriptions', true, 'Job Descriptions', 'Upload job descriptions for positions available to students', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('employer', 'company_profile', true, 'Company Profile', 'Upload company profile or overview document', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('employer', 'safety_certification', true, 'Safety Certification (OSHA)', 'Upload OSHA or other safety certifications. Required for hands-on training with PPE', ARRAY['pdf'], 5242880),
  ('employer', 'hiring_agreement', true, 'Hiring Agreement or MOU', 'Upload signed hiring agreement or memorandum of understanding', ARRAY['pdf'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Make EIN Letter REQUIRED
UPDATE document_requirements
SET is_required = true
WHERE role = 'employer' AND document_type = 'ein_letter';

-- Instructors
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'industry_certifications', true, 'Industry-Specific Certifications', 'Upload industry certifications (ASE, AWS, State Board, etc.)', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('instructor', 'continuing_education', false, 'Continuing Education Credits', 'Upload proof of continuing education credits', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('instructor', 'state_license', true, 'State Teaching or Trade License', 'Upload state teaching license or trade-specific license', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('instructor', 'liability_insurance', true, 'Professional Liability Insurance', 'Upload proof of professional liability insurance', ARRAY['pdf'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Make Degree and CPR REQUIRED for instructors (if course needs it)
UPDATE document_requirements
SET is_required = true,
    description = 'Degree Certificate or Relevant Certifications',
    instructions = 'Upload college degree or relevant certifications. Required if teaching course requires instructor certification'
WHERE role = 'instructor' AND document_type = 'degree_certificate';

UPDATE document_requirements
SET is_required = true,
    description = 'CPR/First Aid Certification',
    instructions = 'Upload current CPR/First Aid certification. Required for healthcare, childcare, fitness programs'
WHERE role = 'instructor' AND document_type = 'cpr_certification';

-- Staff
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('staff', 'id_verification', true, 'Government-issued ID', 'Upload government-issued photo ID', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('staff', 'background_check', true, 'Background Check', 'Upload recent background check results', ARRAY['pdf'], 5242880),
  ('staff', 'w4_form', true, 'W-4 Tax Form', 'Upload completed W-4 form', ARRAY['pdf'], 5242880),
  ('staff', 'direct_deposit_form', true, 'Direct Deposit Form', 'Upload completed direct deposit authorization form', ARRAY['pdf'], 5242880),
  ('staff', 'emergency_contact', true, 'Emergency Contact Information', 'Upload emergency contact form', ARRAY['pdf'], 5242880),
  ('staff', 'resume', false, 'Resume', 'Upload current resume', ARRAY['pdf', 'doc', 'docx'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Partners
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('partner', 'partnership_agreement', true, 'Partnership Agreement', 'Upload signed partnership agreement', ARRAY['pdf'], 10485760),
  ('partner', 'business_license', true, 'Business License', 'Upload current business license', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('partner', 'insurance', true, 'Liability Insurance', 'Upload current liability insurance certificate', ARRAY['pdf'], 10485760),
  ('partner', 'w9_form', true, 'W-9 Tax Form', 'Upload completed W-9 form', ARRAY['pdf'], 5242880),
  ('partner', 'ein_letter', true, 'EIN Confirmation Letter', 'Upload EIN confirmation letter from IRS', ARRAY['pdf'], 5242880),
  ('partner', 'bank_information', true, 'Bank Account Information', 'Upload voided check or bank letter', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('partner', 'references', false, 'Business References', 'Upload list of business references', ARRAY['pdf', 'doc', 'docx'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- ============================================
-- PART 5: ADD COURSE MODULES
-- ============================================

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'HVAC System Components',
  'Understanding the key components of HVAC systems',
  2,
  45,
  'Learn about compressors, condensers, evaporators, and expansion valves.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'Installation and Maintenance',
  'Best practices for HVAC installation and maintenance',
  3,
  60,
  'Proper installation techniques and preventive maintenance schedules.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

INSERT INTO course_modules (course_id, title, description, order_index, duration_minutes, content)
SELECT 
  id,
  'Troubleshooting Common Issues',
  'Diagnosing and fixing common HVAC problems',
  4,
  50,
  'Learn systematic troubleshooting approaches for HVAC systems.'
FROM courses
WHERE slug = 'intro-hvac'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all tables
SELECT 
  'documents' as table_name,
  COUNT(*) as record_count
FROM documents
UNION ALL
SELECT 'document_requirements', COUNT(*) FROM document_requirements
UNION ALL
SELECT 'document_signatures', COUNT(*) FROM document_signatures
UNION ALL
SELECT 'program_holder_documents', COUNT(*) FROM program_holder_documents
UNION ALL
SELECT 'tax_documents', COUNT(*) FROM tax_documents
UNION ALL
SELECT 'payment_records', COUNT(*) FROM payment_records
UNION ALL
SELECT 'onboarding_steps', COUNT(*) FROM onboarding_steps
UNION ALL
SELECT 'messages', COUNT(*) FROM messages
UNION ALL
SELECT 'partner_enrollments', COUNT(*) FROM partner_enrollments
UNION ALL
SELECT 'partner_lms_courses', COUNT(*) FROM partner_lms_courses
UNION ALL
SELECT 'partner_lms_enrollments', COUNT(*) FROM partner_lms_enrollments
UNION ALL
SELECT 'partner_applications', COUNT(*) FROM partner_applications
UNION ALL
SELECT 'partner_completions', COUNT(*) FROM partner_completions;

-- Check document requirements by role
SELECT 
  role,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_required = true) as required,
  COUNT(*) FILTER (WHERE is_required = false) as optional
FROM document_requirements
GROUP BY role
ORDER BY role;

-- Check course modules
SELECT 
  c.title as course,
  COUNT(cm.id) as modules
FROM courses c
LEFT JOIN course_modules cm ON cm.course_id = c.id
WHERE c.slug = 'intro-hvac'
GROUP BY c.id, c.title;

-- Success message
DO $$
DECLARE
  total_tables INTEGER;
  total_requirements INTEGER;
BEGIN
  SELECT COUNT(DISTINCT tablename) INTO total_tables
  FROM pg_tables
  WHERE tablename IN (
    'documents', 'document_requirements', 'document_signatures',
    'program_holder_documents', 'tax_documents', 'payment_records',
    'onboarding_steps', 'messages', 'partner_enrollments',
    'partner_lms_courses', 'partner_lms_enrollments',
    'partner_applications', 'partner_completions'
  );
  
  SELECT COUNT(*) INTO total_requirements FROM document_requirements;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ MASTER SQL COMPLETE!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables Created/Fixed: %', total_tables;
  RAISE NOTICE 'Document Requirements: %', total_requirements;
  RAISE NOTICE '';
  RAISE NOTICE 'Core Tables:';
  RAISE NOTICE '  ✅ documents';
  RAISE NOTICE '  ✅ document_requirements';
  RAISE NOTICE '  ✅ document_signatures';
  RAISE NOTICE '  ✅ program_holder_documents (fixed)';
  RAISE NOTICE '  ✅ tax_documents (created)';
  RAISE NOTICE '  ✅ payment_records (created)';
  RAISE NOTICE '  ✅ onboarding_steps (created)';
  RAISE NOTICE '  ✅ messages';
  RAISE NOTICE '';
  RAISE NOTICE 'Partner Tables:';
  RAISE NOTICE '  ✅ partner_enrollments (fixed)';
  RAISE NOTICE '  ✅ partner_lms_courses (created)';
  RAISE NOTICE '  ✅ partner_lms_enrollments (fixed)';
  RAISE NOTICE '  ✅ partner_applications (created)';
  RAISE NOTICE '  ✅ partner_completions (created)';
  RAISE NOTICE '';
  RAISE NOTICE 'Safety Certifications:';
  RAISE NOTICE '  ⚠️  Program Holders: PPE/Safety/OSHA are OPTIONAL';
  RAISE NOTICE '     (Only required for hands-on training programs)';
  RAISE NOTICE '  ✅ Employers: Safety Cert is REQUIRED';
  RAISE NOTICE '';
  RAISE NOTICE 'Ready for testing!';
  RAISE NOTICE '';
END $$;
