-- Check which partners are actually being used in program configurations
SELECT DISTINCT
  plp.id,
  plp.provider_name,
  plp.provider_type,
  COUNT(DISTINCT ppl.program_id) as program_count
FROM partner_lms_providers plp
LEFT JOIN program_partner_lms ppl ON ppl.provider_id = plp.id
WHERE plp.active = true
GROUP BY plp.id, plp.provider_name, plp.provider_type
HAVING COUNT(DISTINCT ppl.program_id) > 0
ORDER BY program_count DESC, plp.provider_name;
