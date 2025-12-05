-- ============================================
-- NRF RISE UP - COMPLETE INTEGRATION
-- You have full access to course materials!
-- ============================================

DO $$
DECLARE
  nrf_id UUID;
BEGIN
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  
  -- Update NRF provider with full access info
  UPDATE partner_lms_providers
  SET 
    metadata = jsonb_build_object(
      'portal_url', 'https://nrffoundation.org/rise-up',
      'status', 'active',
      'access_level', 'full',
      'materials_available', true,
      'has_powerpoint_slides', true,
      'has_exam_previews', true,
      'has_practice_exams', true,
      'has_glossaries', true,
      'has_course_guides', true,
      'latest_release', 'July 2024'
    )
  WHERE id = nrf_id;
  
  -- Clear existing NRF courses to avoid duplicates
  DELETE FROM partner_courses WHERE provider_id = nrf_id;
  
  -- Add all 6 NRF courses with complete metadata
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active, metadata)
  VALUES
    -- Customer Service & Sales
    (nrf_id, 'Customer Service & Sales', 'NRF-CSS', 'Customer service excellence and sales fundamentals with exam preparation', 20, 'beginner', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'blended',
       'release', 'July 2024',
       'materials', jsonb_build_object(
         'powerpoint_slides', jsonb_build_array('Part 1', 'Part 2'),
         'exam_preview', true,
         'practice_exam', true,
         'glossary', true,
         'supplemental_guide', true
       ),
       'instructions', 'Download materials from NRF portal, assign to students, administer exam'
     )),
    
    -- Business of Retail
    (nrf_id, 'Business of Retail: Operations & Profit', 'NRF-BOR', 'Retail operations and business fundamentals with exam preparation', 20, 'beginner', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'blended',
       'release', 'July 2024',
       'materials', jsonb_build_object(
         'powerpoint_slides', jsonb_build_array('Part 1', 'Part 2'),
         'exam_preview', true,
         'practice_exam', true,
         'glossary', true,
         'supplemental_guide', true
       ),
       'instructions', 'Download materials from NRF portal, assign to students, administer exam'
     )),
    
    -- Retail Industry Fundamentals
    (nrf_id, 'Retail Industry Fundamentals', 'NRF-RIF', 'Foundation course covering retail industry basics with exam preparation', 20, 'beginner', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'blended',
       'release', 'July 2024',
       'materials', jsonb_build_object(
         'powerpoint_slides', jsonb_build_array('Part 1', 'Part 2', 'Part 3'),
         'exam_preview', true,
         'practice_exam', true,
         'glossary', true,
         'supplemental_guide', true
       ),
       'instructions', 'Download materials from NRF portal, assign to students, administer exam'
     )),
    
    -- Supply Chain, Inventory & Logistics
    (nrf_id, 'Supply Chain, Inventory & Logistics', 'NRF-SCIL', 'Supply chain management and inventory control with exam preparation', 20, 'intermediate', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'blended',
       'release', 'Current',
       'materials', jsonb_build_object(
         'powerpoint_slides', jsonb_build_array('Part 1', 'Part 2', 'Part 3'),
         'exam_preview', true,
         'practice_exam', true,
         'glossary', true,
         'course_overview', true
       ),
       'instructions', 'Download materials from NRF portal, assign to students, administer exam',
       'note', 'Replaces retired Warehouse, Inventory & Logistics course'
     )),
    
    -- Customer Conflict De-Escalation
    (nrf_id, 'Customer Conflict De-Escalation Training', 'NRF-CCDE', 'Handle difficult customer situations professionally', 10, 'beginner', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'online',
       'instructions', 'Purchase licenses and assign to students via NRF portal'
     )),
    
    -- Welcoming Customers with Disabilities
    (nrf_id, 'Welcoming Customers with Disabilities', 'NRF-WCD', 'Inclusive customer service for customers with disabilities', 5, 'beginner', 'certificate', 0, true,
     jsonb_build_object(
       'portal_url', 'https://nrffoundation.org/rise-up',
       'delivery_method', 'online',
       'instructions', 'Purchase licenses and assign to students via NRF portal'
     ));
  
END $$;

-- Verify NRF courses
SELECT 
  course_name,
  course_code,
  hours,
  metadata->>'release' as release,
  metadata->'materials'->>'powerpoint_slides' as slides,
  CASE 
    WHEN metadata->'materials'->>'exam_preview' = 'true' THEN '✅'
    ELSE '❌'
  END as has_exam
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'nrf')
ORDER BY course_name;

-- Show summary
SELECT 
  'NRF RISE Up - Full Access' as summary,
  COUNT(*) as total_courses,
  COUNT(CASE WHEN metadata->'materials' IS NOT NULL THEN 1 END) as courses_with_materials
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'nrf');
