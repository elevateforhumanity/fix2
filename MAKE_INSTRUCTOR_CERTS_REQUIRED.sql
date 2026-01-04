-- ============================================
-- MAKE INSTRUCTOR CERTIFICATIONS REQUIRED
-- Make Degree Certificate and CPR Certification REQUIRED
-- (Required if teaching course needs it for certification)
-- ============================================

-- Make Degree Certificate REQUIRED for instructors
UPDATE document_requirements
SET is_required = true,
    description = 'Degree Certificate or Relevant Certifications',
    instructions = 'Upload college degree or relevant certifications. Required if teaching course requires instructor to have specific degree or certification for student certification eligibility'
WHERE role = 'instructor' AND document_type = 'degree_certificate';

-- Make CPR Certification REQUIRED for instructors
UPDATE document_requirements
SET is_required = true,
    description = 'CPR/First Aid Certification',
    instructions = 'Upload current CPR/First Aid certification. Required if teaching course needs it for student certification (e.g., CNA, healthcare, childcare, fitness programs)'
WHERE role = 'instructor' AND document_type = 'cpr_certification';

-- Add additional instructor certifications for specific programs

-- Add Industry Certifications requirement
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'industry_certifications', true, 'Industry-Specific Certifications', 
   'Upload industry certifications required for teaching your specific program (e.g., ASE for automotive, AWS for welding, state board for cosmetology)', 
   ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Add Continuing Education Credits
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'continuing_education', false, 'Continuing Education Credits', 
   'Upload proof of continuing education credits or professional development (if required by your certification body)', 
   ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = false,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Add State License for instructors (if applicable)
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'state_license', true, 'State Teaching License or Trade License', 
   'Upload state teaching license or trade-specific license required for your program (e.g., cosmetology instructor license, nursing instructor license)', 
   ARRAY['pdf', 'jpg', 'jpeg', 'png'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Add Liability Insurance for instructors
INSERT INTO document_requirements (role, document_type, is_required, description, instructions, accepted_formats, max_file_size)
VALUES 
  ('instructor', 'liability_insurance', true, 'Professional Liability Insurance', 
   'Upload proof of professional liability insurance coverage', 
   ARRAY['pdf'], 10485760)
ON CONFLICT (role, document_type) DO UPDATE
SET is_required = true,
    description = EXCLUDED.description,
    instructions = EXCLUDED.instructions;

-- Verify all instructor requirements
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
WHERE role = 'instructor'
ORDER BY is_required DESC, document_type;

-- Count requirements by role
SELECT 
  role,
  COUNT(*) as total_requirements,
  COUNT(*) FILTER (WHERE is_required = true) as required_count,
  COUNT(*) FILTER (WHERE is_required = false) as optional_count
FROM document_requirements
WHERE role = 'instructor'
GROUP BY role;

-- Success message
DO $$
DECLARE
  instructor_required INTEGER;
  instructor_optional INTEGER;
BEGIN
  SELECT 
    COUNT(*) FILTER (WHERE is_required = true),
    COUNT(*) FILTER (WHERE is_required = false)
  INTO instructor_required, instructor_optional
  FROM document_requirements
  WHERE role = 'instructor';

  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ INSTRUCTOR CERTIFICATIONS UPDATED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'INSTRUCTOR REQUIREMENTS (% required, % optional):', instructor_required, instructor_optional;
  RAISE NOTICE '';
  RAISE NOTICE 'REQUIRED DOCUMENTS:';
  RAISE NOTICE '  ✅ Teaching Certificate';
  RAISE NOTICE '  ✅ Background Check';
  RAISE NOTICE '  ✅ Professional Resume';
  RAISE NOTICE '  ✅ Professional References';
  RAISE NOTICE '  ✅ Government-issued ID';
  RAISE NOTICE '  ✅ Degree Certificate ← NOW REQUIRED';
  RAISE NOTICE '     (Required if course needs it for certification)';
  RAISE NOTICE '  ✅ CPR Certification ← NOW REQUIRED';
  RAISE NOTICE '     (Required for healthcare, childcare, fitness programs)';
  RAISE NOTICE '  ✅ Industry Certifications ← NEW';
  RAISE NOTICE '     (ASE, AWS, State Board, etc.)';
  RAISE NOTICE '  ✅ State License ← NEW';
  RAISE NOTICE '     (Teaching or trade-specific license)';
  RAISE NOTICE '  ✅ Liability Insurance ← NEW';
  RAISE NOTICE '     (Professional liability coverage)';
  RAISE NOTICE '';
  RAISE NOTICE 'OPTIONAL DOCUMENTS:';
  RAISE NOTICE '  ⚪ Continuing Education Credits';
  RAISE NOTICE '';
  RAISE NOTICE 'Certification Requirements by Program Type:';
  RAISE NOTICE '  • Healthcare (CNA, MA, Phlebotomy): CPR + Degree + State License';
  RAISE NOTICE '  • Trades (HVAC, Welding, Electrical): Industry Certs + State License';
  RAISE NOTICE '  • Cosmetology/Barbering: State Board License + Instructor License';
  RAISE NOTICE '  • Childcare/Education: CPR + Degree + Teaching Certificate';
  RAISE NOTICE '  • Fitness/Personal Training: CPR + Industry Certs';
  RAISE NOTICE '  • CDL Training: CDL + State Instructor License';
  RAISE NOTICE '';
  RAISE NOTICE 'Total: % required, % optional', instructor_required, instructor_optional;
  RAISE NOTICE '';
END $$;
