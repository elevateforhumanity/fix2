-- ============================================
-- UPDATE NRF RISE UP WITH PORTAL ACCESS
-- You have access to purchase licenses!
-- ============================================

DO $$
DECLARE
  nrf_id UUID;
BEGIN
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  
  -- Update NRF provider with portal info
  UPDATE partner_lms_providers
  SET metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb),
    '{portal_access}',
    '{"status": "active", "portal_url": "https://nrffoundation.org/rise-up", "can_purchase": true}'::jsonb
  )
  WHERE id = nrf_id;
  
  -- Update existing NRF courses with portal info
  UPDATE partner_courses
  SET 
    metadata = jsonb_set(
      COALESCE(metadata, '{}'::jsonb),
      '{portal_url}',
      '"https://nrffoundation.org/rise-up"'
    ),
    metadata = jsonb_set(
      metadata,
      '{delivery_method}',
      '"external_portal"'
    ),
    metadata = jsonb_set(
      metadata,
      '{status}',
      '"active"'
    ),
    metadata = jsonb_set(
      metadata,
      '{instructions}',
      '"Purchase licenses from NRF portal and assign to students"'
    )
  WHERE provider_id = nrf_id;
  
  -- Add additional NRF courses that are available
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active, metadata)
  VALUES
    (nrf_id, 'Retail Industry Fundamentals', 'NRF-RIF', 'Foundation course covering retail industry basics', 20, 'beginner', 'certificate', 0, true, 
     '{"portal_url": "https://nrffoundation.org/rise-up", "delivery_method": "external_portal", "release": "July 2024"}'::jsonb),
    (nrf_id, 'Supply Chain, Inventory & Logistics', 'NRF-SCIL', 'Supply chain management and inventory control', 20, 'intermediate', 'certificate', 0, true,
     '{"portal_url": "https://nrffoundation.org/rise-up", "delivery_method": "external_portal"}'::jsonb),
    (nrf_id, 'Customer Conflict De-Escalation Training', 'NRF-CCDE', 'Handle difficult customer situations professionally', 10, 'beginner', 'certificate', 0, true,
     '{"portal_url": "https://nrffoundation.org/rise-up", "delivery_method": "external_portal"}'::jsonb),
    (nrf_id, 'Welcoming Customers with Disabilities', 'NRF-WCD', 'Inclusive customer service for customers with disabilities', 5, 'beginner', 'certificate', 0, true,
     '{"portal_url": "https://nrffoundation.org/rise-up", "delivery_method": "external_portal"}'::jsonb)
  ON CONFLICT DO NOTHING;
  
END $$;

-- Verify NRF courses
SELECT 
  course_name,
  course_code,
  hours,
  metadata->>'portal_url' as portal,
  metadata->>'status' as status
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'nrf')
ORDER BY course_name;

-- Show summary
SELECT 
  'NRF RISE Up Integration' as summary,
  COUNT(*) as total_courses,
  COUNT(CASE WHEN metadata->>'portal_url' IS NOT NULL THEN 1 END) as configured
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'nrf');
