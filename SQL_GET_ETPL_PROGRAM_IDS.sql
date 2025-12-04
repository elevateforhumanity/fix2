-- ============================================
-- GET YOUR ETPL PROGRAM IDs
-- ============================================
-- Copy this entire file and paste into Supabase SQL Editor
-- Click RUN to see all your ETPL program IDs

SELECT 
  id,
  title,
  slug,
  category,
  created_at
FROM programs
WHERE 
  -- ETPL programs typically have these characteristics
  funding @> ARRAY['WIOA']::text[]
  OR funding @> ARRAY['WRG']::text[]
  OR slug IN (
    'business-startup-marketing',
    'emergency-health-safety-tech',
    'barbering',
    'cosmetology',
    'esthetics',
    'cna',
    'medical-assistant',
    'phlebotomy',
    'hvac',
    'electrical',
    'welding',
    'it-support',
    'microsoft-office',
    'administrative-assistant',
    'culinary-arts',
    'retail-management',
    'janitorial-services'
  )
ORDER BY title;

-- ============================================
-- COPY THE IDs FROM THE RESULTS ABOVE
-- ============================================
-- Then use those IDs in the partner module scripts
