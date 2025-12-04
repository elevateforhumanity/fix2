-- ============================================================================
-- STEP 4: VERIFY PARTNER MODULES WERE ADDED
-- ============================================================================
-- Copy this entire file and paste into Supabase SQL Editor, then click RUN

-- See all partner modules by program
SELECT 
  p.title AS program_title,
  epm.title AS module_title,
  epm.partner_name,
  epm.delivery_mode,
  epm.hours,
  epm.is_required
FROM external_partner_modules epm
JOIN programs p ON p.id = epm.course_id
ORDER BY p.title, epm.sort_order;

-- Count modules per program
SELECT 
  p.title AS program_title,
  COUNT(epm.id) AS module_count,
  STRING_AGG(epm.partner_name, ', ') AS partners
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
GROUP BY p.id, p.title
ORDER BY module_count DESC;

-- Total summary
SELECT 
  COUNT(*) AS total_modules,
  COUNT(DISTINCT course_id) AS programs_with_modules,
  COUNT(DISTINCT partner_type) AS unique_partners
FROM external_partner_modules;

-- If you see results above, SUCCESS! ✅
-- Next: Run SQL_STEP_5_STORAGE_POLICIES.sql
