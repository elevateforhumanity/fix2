-- ============================================
-- NDS - RESALE MODEL (No API Needed)
-- You purchase training and resell to students
-- ============================================

DO $$
DECLARE
  nds_id UUID;
BEGIN
  SELECT id INTO nds_id FROM partner_lms_providers WHERE provider_type = 'nds';
  
  -- Update NDS provider with resale model
  UPDATE partner_lms_providers
  SET metadata = jsonb_build_object(
    'website', 'https://www.nationaldrugscreening.com',
    'business_model', 'resale',
    'api_available', false,
    'delivery_method', 'scheduled_training',
    'status', 'active',
    'instructions', 'Purchase training from NDS, schedule for students, resell at markup'
  )
  WHERE id = nds_id;
  
  -- Update NDS course with pricing model
  UPDATE partner_courses
  SET 
    description = 'DOT oral fluid collection training and certification - Scheduled training sessions',
    price = 250,  -- Your resale price (adjust as needed)
    metadata = jsonb_build_object(
      'website', 'https://www.nationaldrugscreening.com',
      'delivery_method', 'scheduled_training',
      'business_model', 'resale',
      'wholesale_cost', 200,  -- What you pay NDS (estimate - adjust to actual)
      'retail_price', 250,    -- What you charge students
      'markup', 50,           -- Your profit per student
      'instructions', 'Contact NDS to schedule training session, enroll students, collect payment',
      'booking_process', jsonb_build_array(
        '1. Student enrolls and pays on your platform',
        '2. You purchase training from NDS',
        '3. Schedule training session',
        '4. Student attends training',
        '5. Student receives DOT certification'
      )
    )
  WHERE provider_id = nds_id;
  
END $$;

-- Verify NDS setup
SELECT 
  plp.provider_name,
  pc.course_name,
  pc.price as student_price,
  pc.metadata->>'wholesale_cost' as your_cost,
  pc.metadata->>'markup' as profit_per_student,
  pc.metadata->>'business_model' as model
FROM partner_lms_providers plp
JOIN partner_courses pc ON pc.provider_id = plp.id
WHERE plp.provider_type = 'nds';

-- Show all partner business models
SELECT 
  provider_name,
  metadata->>'business_model' as business_model,
  metadata->>'api_available' as has_api,
  COUNT(pc.id) as courses
FROM partner_lms_providers plp
LEFT JOIN partner_courses pc ON pc.provider_id = plp.id
GROUP BY provider_name, metadata->>'business_model', metadata->>'api_available'
ORDER BY provider_name;
