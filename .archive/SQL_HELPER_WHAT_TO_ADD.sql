-- ============================================================================
-- HELPER: WHAT PARTNER MODULES SHOULD I ADD?
-- ============================================================================
-- Run this to see your programs and get recommendations for which partners to add

-- Show all your programs
SELECT 
  id,
  title,
  category,
  CASE 
    -- Healthcare programs
    WHEN title ILIKE '%CNA%' OR title ILIKE '%nursing%' OR title ILIKE '%medical%' OR title ILIKE '%health%' 
      THEN '→ Add: HSI (CPR), CareerSafe (Healthcare Safety), NDS (Drug-Free)'
    
    -- Beauty/Barber programs
    WHEN title ILIKE '%barber%' OR title ILIKE '%cosmetology%' OR title ILIKE '%beauty%' OR title ILIKE '%curvature%'
      THEN '→ Add: Milady RISE (Safety), NDS (Drug-Free)'
    
    -- Trades programs
    WHEN title ILIKE '%hvac%' OR title ILIKE '%building%' OR title ILIKE '%maintenance%' OR title ILIKE '%electrical%'
      THEN '→ Add: CareerSafe (OSHA 10), NDS (Drug-Free)'
    
    -- IT/Business programs
    WHEN title ILIKE '%IT%' OR title ILIKE '%computer%' OR title ILIKE '%customer service%' OR title ILIKE '%business%'
      THEN '→ Add: Certiport (Microsoft Office), NRF (Retail - optional)'
    
    -- Janitorial programs
    WHEN title ILIKE '%janitor%' OR title ILIKE '%custodial%' OR title ILIKE '%cleaning%'
      THEN '→ Add: JRI (Janitorial Training - FREE)'
    
    -- Retail programs
    WHEN title ILIKE '%retail%' OR title ILIKE '%sales%'
      THEN '→ Add: NRF RISE Up (Retail Training - FREE)'
    
    -- CDL/Transportation programs
    WHEN title ILIKE '%CDL%' OR title ILIKE '%driver%' OR title ILIKE '%transport%'
      THEN '→ Add: NDS (DOT/CDL Drug & Alcohol)'
    
    ELSE '→ Add: NDS (Drug-Free Workplace) - works for any program'
  END AS recommended_partners
FROM programs
ORDER BY category, title;

-- Show which programs already have partner modules
SELECT 
  p.title AS program_title,
  COUNT(epm.id) AS modules_added,
  STRING_AGG(epm.partner_name, ', ') AS current_partners
FROM programs p
LEFT JOIN external_partner_modules epm ON epm.course_id = p.id
GROUP BY p.id, p.title
ORDER BY modules_added DESC, p.title;

-- ============================================================================
-- COPY-PASTE TEMPLATES BASED ON YOUR PROGRAMS
-- ============================================================================

-- After running the query above, use these templates:
-- Just replace 'YOUR-PROGRAM-ID' with the actual ID from the results

-- ============================================================================
-- FOR HEALTHCARE PROGRAMS (CNA, Home Health, Medical Assistant, etc.)
-- ============================================================================
/*
-- HSI CPR/First Aid
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi', 'hybrid',
  'https://hsi.com/courses/cpr-aed',
  'American Heart Association CPR and AED training',
  4, TRUE, TRUE, 100
) ON CONFLICT DO NOTHING;

-- CareerSafe Healthcare Safety
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'Healthcare Safety & Bloodborne Pathogens',
  'CareerSafe', 'careersafe', 'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-compliant healthcare safety training',
  8, TRUE, TRUE, 101
) ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- FOR BEAUTY/BARBER PROGRAMS
-- ============================================================================
/*
-- Milady RISE
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'Client Well-Being & Safety',
  'Milady RISE', 'milady', 'link',
  'https://miladytraining.com',
  'Essential safety training. Use promo code: efhcti-rise295',
  3.5, TRUE, TRUE, 100
) ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- FOR TRADES PROGRAMS (HVAC, Building Maintenance, Electrical, etc.)
-- ============================================================================
/*
-- CareerSafe OSHA 10
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'OSHA 10-Hour Safety Training',
  'CareerSafe', 'careersafe', 'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA 10-hour safety training',
  10, TRUE, TRUE, 100
) ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- FOR IT/BUSINESS PROGRAMS
-- ============================================================================
/*
-- Certiport Microsoft Office
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'Microsoft Office Specialist Certification',
  'Certiport (Pearson VUE)', 'certiport', 'hybrid',
  'https://certiport.com/portal',
  'Industry-recognized Microsoft Office certification',
  15, TRUE, TRUE, 100
) ON CONFLICT DO NOTHING;
*/

-- ============================================================================
-- FOR ANY PROGRAM - Drug-Free Workplace Training
-- ============================================================================
/*
-- NDS Drug-Free Workplace (works for ANY program)
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'Drug-Free Workplace Training',
  'National Drug Screening', 'nds', 'hybrid',
  'https://nationaldrugscreening.com',
  'Drug-free workplace compliance training',
  2, TRUE, TRUE, 100
) ON CONFLICT DO NOTHING;
*/
