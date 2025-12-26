-- Check which programs have partner sequences configured
SELECT 
  p.id,
  p.name,
  p.is_active,
  COUNT(ppl.id) as partner_count,
  STRING_AGG(plp.provider_name, ' → ' ORDER BY ppl.sequence_order) as partner_sequence
FROM programs p
LEFT JOIN program_partner_lms ppl ON ppl.program_id = p.id AND ppl.is_required = true
LEFT JOIN partner_lms_providers plp ON plp.id = ppl.provider_id
WHERE p.is_active = true
GROUP BY p.id, p.name, p.is_active
ORDER BY partner_count DESC, p.name;
