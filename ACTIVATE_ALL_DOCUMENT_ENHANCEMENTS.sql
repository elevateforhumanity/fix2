-- ============================================
-- ACTIVATE ALL DOCUMENT CENTER ENHANCEMENTS
-- Make EIN Letter REQUIRED and add all optional features
-- ============================================

-- ENHANCEMENT 1: Make EIN Letter REQUIRED for employers
UPDATE document_requirements
SET is_required = true
WHERE role = 'employer' AND document_type = 'ein_letter';

-- ENHANCEMENT 2: Add more required documents for all roles

-- Additional Student Documents
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('student', 'transcript', true, 'Academic transcript', 'Upload official transcript from your school or training program', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'social_security_card', true, 'Social Security Card', 'Upload copy of your Social Security card (both sides if applicable)', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('student', 'proof_of_address', true, 'Proof of Address', 'Upload utility bill, lease agreement, or bank statement showing your current address', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'high_school_diploma', false, 'High School Diploma or GED', 'Upload your high school diploma or GED certificate', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('student', 'drug_test_results', false, 'Drug Test Results', 'Upload recent drug test results if required by program', ARRAY['pdf'], 5242880),
  ('student', 'physical_exam', false, 'Physical Examination', 'Upload physical exam results if required by program', ARRAY['pdf'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Additional Program Holder Documents
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('program_holder', 'w9_form', true, 'W-9 Tax Form', 'Upload completed and signed W-9 form', ARRAY['pdf'], 5242880),
  ('program_holder', 'certificate_of_insurance', true, 'Certificate of Insurance', 'Upload current certificate of insurance with required coverage amounts', ARRAY['pdf'], 10485760),
  ('program_holder', 'facility_photos', true, 'Facility Photos', 'Upload photos of your training facility (minimum 5 photos)', ARRAY['jpg', 'jpeg', 'png'], 20971520),
  ('program_holder', 'instructor_credentials', true, 'Instructor Credentials', 'Upload credentials for all instructors who will teach students', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('program_holder', 'curriculum_outline', true, 'Curriculum Outline', 'Upload detailed curriculum outline for your program', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('program_holder', 'safety_plan', true, 'Safety Plan', 'Upload facility safety plan and emergency procedures', ARRAY['pdf'], 10485760),
  ('program_holder', 'accreditation_certificate', false, 'Accreditation Certificate', 'Upload accreditation certificate if applicable', ARRAY['pdf'], 5242880),
  ('program_holder', 'lease_agreement', false, 'Facility Lease Agreement', 'Upload lease agreement or proof of facility ownership', ARRAY['pdf'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Additional Employer Documents
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('employer', 'workers_comp_insurance', true, 'Workers Compensation Insurance', 'Upload current workers compensation insurance certificate', ARRAY['pdf'], 10485760),
  ('employer', 'job_descriptions', true, 'Job Descriptions', 'Upload job descriptions for positions available to students', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('employer', 'company_profile', true, 'Company Profile', 'Upload company profile or overview document', ARRAY['pdf', 'doc', 'docx'], 10485760),
  ('employer', 'safety_certification', false, 'Safety Certification', 'Upload OSHA or other safety certifications', ARRAY['pdf'], 5242880),
  ('employer', 'hiring_agreement', false, 'Hiring Agreement', 'Upload signed hiring agreement or MOU', ARRAY['pdf'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Instructor Documents
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'teaching_certificate', true, 'Teaching Certification', 'Upload valid teaching certificate or license', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('instructor', 'background_check', true, 'Background Check', 'Upload recent background check results (within 6 months)', ARRAY['pdf'], 5242880),
  ('instructor', 'resume', true, 'Professional Resume', 'Upload current resume with teaching experience', ARRAY['pdf', 'doc', 'docx'], 5242880),
  ('instructor', 'references', true, 'Professional References', 'Upload list of professional references with contact information', ARRAY['pdf', 'doc', 'docx'], 5242880),
  ('instructor', 'id_verification', true, 'Government-issued ID', 'Upload government-issued photo ID', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('instructor', 'degree_certificate', false, 'Degree Certificate', 'Upload college degree or relevant certifications', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('instructor', 'cpr_certification', false, 'CPR Certification', 'Upload current CPR/First Aid certification', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Staff Documents
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

-- Partner Documents
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('partner', 'partnership_agreement', true, 'Partnership Agreement', 'Upload signed partnership agreement', ARRAY['pdf'], 10485760),
  ('partner', 'business_license', true, 'Business License', 'Upload current business license', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760),
  ('partner', 'insurance', true, 'Liability Insurance', 'Upload current liability insurance certificate', ARRAY['pdf'], 10485760),
  ('partner', 'w9_form', true, 'W-9 Tax Form', 'Upload completed W-9 form', ARRAY['pdf'], 5242880),
  ('partner', 'ein_letter', true, 'EIN Confirmation Letter', 'Upload EIN confirmation letter from IRS', ARRAY['pdf'], 5242880),
  ('partner', 'bank_information', true, 'Bank Account Information', 'Upload voided check or bank letter for payment processing', ARRAY['pdf', 'jpg', 'jpeg', 'png'], 5242880),
  ('partner', 'references', false, 'Business References', 'Upload list of business references', ARRAY['pdf', 'doc', 'docx'], 5242880)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = EXCLUDED.is_required,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- ENHANCEMENT 3: Create document expiration tracking
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS expiration_reminder_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS expiration_reminder_sent_at TIMESTAMPTZ;

-- ENHANCEMENT 4: Create document versions table
CREATE TABLE IF NOT EXISTS document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(document_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_document_versions_document ON document_versions(document_id);

ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own document versions"
  ON document_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_versions.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all document versions"
  ON document_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT ON document_versions TO authenticated;

-- ENHANCEMENT 5: Create document templates table
CREATE TABLE IF NOT EXISTS document_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_document_templates_type ON document_templates(document_type);
CREATE INDEX IF NOT EXISTS idx_document_templates_active ON document_templates(is_active);

ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active templates"
  ON document_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage templates"
  ON document_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT ON document_templates TO authenticated;

-- ENHANCEMENT 6: Create document audit log
CREATE TABLE IF NOT EXISTS document_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'uploaded', 'viewed', 'approved', 'rejected', 'deleted', 'downloaded'
  performed_by UUID NOT NULL REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_document_audit_document ON document_audit_log(document_id);
CREATE INDEX IF NOT EXISTS idx_document_audit_user ON document_audit_log(performed_by);
CREATE INDEX IF NOT EXISTS idx_document_audit_action ON document_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_document_audit_created ON document_audit_log(created_at DESC);

ALTER TABLE document_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own document audit logs"
  ON document_audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_audit_log.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all audit logs"
  ON document_audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert audit logs"
  ON document_audit_log FOR INSERT
  WITH CHECK (true);

GRANT SELECT, INSERT ON document_audit_log TO authenticated;

-- ENHANCEMENT 7: Add document categories
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general'; -- 'general', 'legal', 'financial', 'academic', 'medical', 'employment'

CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);

-- ENHANCEMENT 8: Add document tags
CREATE TABLE IF NOT EXISTS document_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(document_id, tag)
);

CREATE INDEX IF NOT EXISTS idx_document_tags_document ON document_tags(document_id);
CREATE INDEX IF NOT EXISTS idx_document_tags_tag ON document_tags(tag);

ALTER TABLE document_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own document tags"
  ON document_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_tags.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all tags"
  ON document_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, DELETE ON document_tags TO authenticated;

-- ENHANCEMENT 9: Add bulk upload tracking
CREATE TABLE IF NOT EXISTS document_bulk_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  total_files INTEGER NOT NULL,
  successful_uploads INTEGER DEFAULT 0,
  failed_uploads INTEGER DEFAULT 0,
  status TEXT DEFAULT 'processing', -- 'processing', 'completed', 'failed'
  error_log JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_bulk_uploads_user ON document_bulk_uploads(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_bulk_uploads_status ON document_bulk_uploads(status);

ALTER TABLE document_bulk_uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bulk uploads"
  ON document_bulk_uploads FOR SELECT
  USING (uploaded_by = auth.uid());

CREATE POLICY "Admins can view all bulk uploads"
  ON document_bulk_uploads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT, INSERT, UPDATE ON document_bulk_uploads TO authenticated;

-- ============================================
-- VERIFICATION
-- ============================================

-- Check all document requirements
SELECT 
  role,
  COUNT(*) as total_requirements,
  COUNT(*) FILTER (WHERE is_required = true) as required_count,
  COUNT(*) FILTER (WHERE is_required = false) as optional_count
FROM document_requirements
GROUP BY role
ORDER BY role;

-- Check EIN Letter is now required
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
WHERE document_type = 'ein_letter';

-- Check all new tables
SELECT 
  'document_versions' as table_name,
  COUNT(*) as record_count
FROM document_versions
UNION ALL
SELECT 
  'document_templates',
  COUNT(*)
FROM document_templates
UNION ALL
SELECT 
  'document_audit_log',
  COUNT(*)
FROM document_audit_log
UNION ALL
SELECT 
  'document_tags',
  COUNT(*)
FROM document_tags
UNION ALL
SELECT 
  'document_bulk_uploads',
  COUNT(*)
FROM document_bulk_uploads;

-- Final success message
DO $$
DECLARE
  total_requirements INTEGER;
  required_count INTEGER;
BEGIN
  SELECT COUNT(*), COUNT(*) FILTER (WHERE is_required = true)
  INTO total_requirements, required_count
  FROM document_requirements;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ ALL DOCUMENT ENHANCEMENTS ACTIVATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Document Requirements:';
  RAISE NOTICE '  Total: % requirements', total_requirements;
  RAISE NOTICE '  Required: %', required_count;
  RAISE NOTICE '  Optional: %', total_requirements - required_count;
  RAISE NOTICE '';
  RAISE NOTICE 'New Features Activated:';
  RAISE NOTICE '  ✅ EIN Letter now REQUIRED for employers';
  RAISE NOTICE '  ✅ Document versioning enabled';
  RAISE NOTICE '  ✅ Document templates system';
  RAISE NOTICE '  ✅ Complete audit logging';
  RAISE NOTICE '  ✅ Document tagging system';
  RAISE NOTICE '  ✅ Bulk upload tracking';
  RAISE NOTICE '  ✅ Document categories';
  RAISE NOTICE '  ✅ Expiration reminders';
  RAISE NOTICE '';
  RAISE NOTICE 'Roles with Requirements:';
  RAISE NOTICE '  ✅ Students';
  RAISE NOTICE '  ✅ Program Holders';
  RAISE NOTICE '  ✅ Employers';
  RAISE NOTICE '  ✅ Instructors';
  RAISE NOTICE '  ✅ Staff';
  RAISE NOTICE '  ✅ Partners';
  RAISE NOTICE '';
END $$;
