-- ============================================
-- MAKE EMPLOYER DOCUMENTS REQUIRED
-- Make Hiring Agreement and Safety Certification REQUIRED
-- ============================================

-- Make Hiring Agreement REQUIRED for employers
UPDATE document_requirements
SET is_required = true,
    description = 'Hiring Agreement or MOU',
    instructions = 'Upload signed hiring agreement or memorandum of understanding for student placement'
WHERE role = 'employer' AND document_type = 'hiring_agreement';

-- Make Safety Certification REQUIRED for employers
UPDATE document_requirements
SET is_required = true,
    description = 'Safety Certification (OSHA or equivalent)',
    instructions = 'Upload OSHA or other safety certifications. Required for programs with hands-on training and PPE requirements'
WHERE role = 'employer' AND document_type = 'safety_certification';

-- Add PPE Requirements document for program holders with hands-on training
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('program_holder', 'ppe_requirements', true, 'PPE Requirements Document', 
   'Upload document listing all required Personal Protective Equipment (PPE) for hands-on training programs', 
   ARRAY['pdf', 'doc', 'docx'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Add Safety Training Certification for program holders
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('program_holder', 'safety_training_cert', true, 'Safety Training Certification', 
   'Upload safety training certification for instructors conducting hands-on training', 
   ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Add OSHA Compliance document for program holders
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('program_holder', 'osha_compliance', true, 'OSHA Compliance Documentation', 
   'Upload OSHA compliance documentation for facility and training operations', 
   ARRAY['pdf'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Verify all employer requirements
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
WHERE role = 'employer'
ORDER BY is_required DESC, document_type;

-- Verify all program_holder requirements
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
WHERE role = 'program_holder'
ORDER BY is_required DESC, document_type;

-- Count requirements by role
SELECT 
  role,
  COUNT(*) as total_requirements,
  COUNT(*) FILTER (WHERE is_required = true) as required_count,
  COUNT(*) FILTER (WHERE is_required = false) as optional_count
FROM document_requirements
GROUP BY role
ORDER BY role;

-- Success message
DO $$
DECLARE
  employer_required INTEGER;
  program_holder_required INTEGER;
BEGIN
  SELECT COUNT(*) INTO employer_required
  FROM document_requirements
  WHERE role = 'employer' AND is_required = true;
  
  SELECT COUNT(*) INTO program_holder_required
  FROM document_requirements
  WHERE role = 'program_holder' AND is_required = true;

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ EMPLOYER & SAFETY REQUIREMENTS UPDATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'EMPLOYER REQUIREMENTS (% required):', employer_required;
  RAISE NOTICE '  ✅ Business License (REQUIRED)';
  RAISE NOTICE '  ✅ EIN Letter (REQUIRED)';
  RAISE NOTICE '  ✅ Workers Comp Insurance (REQUIRED)';
  RAISE NOTICE '  ✅ Job Descriptions (REQUIRED)';
  RAISE NOTICE '  ✅ Company Profile (REQUIRED)';
  RAISE NOTICE '  ✅ Safety Certification (REQUIRED) ← NOW REQUIRED';
  RAISE NOTICE '  ✅ Hiring Agreement (REQUIRED) ← NOW REQUIRED';
  RAISE NOTICE '';
  RAISE NOTICE 'PROGRAM HOLDER REQUIREMENTS (% required):', program_holder_required;
  RAISE NOTICE '  ✅ Business License (REQUIRED)';
  RAISE NOTICE '  ✅ Liability Insurance (REQUIRED)';
  RAISE NOTICE '  ✅ Background Check (REQUIRED)';
  RAISE NOTICE '  ✅ W-9 Tax Form (REQUIRED)';
  RAISE NOTICE '  ✅ Certificate of Insurance (REQUIRED)';
  RAISE NOTICE '  ✅ Facility Photos (REQUIRED)';
  RAISE NOTICE '  ✅ Instructor Credentials (REQUIRED)';
  RAISE NOTICE '  ✅ Curriculum Outline (REQUIRED)';
  RAISE NOTICE '  ✅ Safety Plan (REQUIRED)';
  RAISE NOTICE '  ✅ Accreditation Certificate (REQUIRED)';
  RAISE NOTICE '  ✅ PPE Requirements (REQUIRED) ← NEW';
  RAISE NOTICE '  ✅ Safety Training Cert (REQUIRED) ← NEW';
  RAISE NOTICE '  ✅ OSHA Compliance (REQUIRED) ← NEW';
  RAISE NOTICE '  ⚪ Facility Lease Agreement (OPTIONAL)';
  RAISE NOTICE '';
  RAISE NOTICE 'Safety & PPE Requirements:';
  RAISE NOTICE '  ✅ All hands-on training programs must have:';
  RAISE NOTICE '     - PPE requirements documented';
  RAISE NOTICE '     - Safety training certifications';
  RAISE NOTICE '     - OSHA compliance documentation';
  RAISE NOTICE '     - Safety certification (employers)';
  RAISE NOTICE '     - Hiring agreements (employers)';
  RAISE NOTICE '';
END $$;
