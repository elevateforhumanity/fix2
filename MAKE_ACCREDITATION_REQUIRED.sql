-- ============================================
-- MAKE ACCREDITATION CERTIFICATE REQUIRED
-- ============================================

-- Update document requirements to make accreditation certificate REQUIRED
UPDATE document_requirements
SET is_required = true
WHERE role = 'program_holder' AND document_type = 'accreditation_certificate';

-- Verify the change
SELECT 
  role,
  document_type,
  is_required,
  description
FROM document_requirements
WHERE document_type = 'accreditation_certificate';

-- Show all program_holder requirements
SELECT 
  document_type,
  is_required,
  description
FROM document_requirements
WHERE role = 'program_holder'
ORDER BY is_required DESC, document_type;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ ACCREDITATION CERTIFICATE NOW REQUIRED!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Updated: Accreditation Certificate';
  RAISE NOTICE 'Role: program_holder';
  RAISE NOTICE 'Status: REQUIRED';
  RAISE NOTICE '';
  RAISE NOTICE 'All Program Holder Requirements:';
  RAISE NOTICE '  ✅ Business License (REQUIRED)';
  RAISE NOTICE '  ✅ Liability Insurance (REQUIRED)';
  RAISE NOTICE '  ✅ Background Check (REQUIRED)';
  RAISE NOTICE '  ✅ W-9 Tax Form (REQUIRED)';
  RAISE NOTICE '  ✅ Certificate of Insurance (REQUIRED)';
  RAISE NOTICE '  ✅ Facility Photos (REQUIRED)';
  RAISE NOTICE '  ✅ Instructor Credentials (REQUIRED)';
  RAISE NOTICE '  ✅ Curriculum Outline (REQUIRED)';
  RAISE NOTICE '  ✅ Safety Plan (REQUIRED)';
  RAISE NOTICE '  ✅ Accreditation Certificate (REQUIRED) ← NOW REQUIRED';
  RAISE NOTICE '  ⚪ Facility Lease Agreement (OPTIONAL)';
  RAISE NOTICE '';
  RAISE NOTICE 'Total: 10 required, 1 optional';
  RAISE NOTICE '';
END $$;
