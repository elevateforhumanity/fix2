-- Check all partner LMS providers
SELECT 
  id,
  provider_name,
  provider_type,
  active
FROM partner_lms_providers
ORDER BY provider_name;
