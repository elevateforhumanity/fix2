-- ============================================
-- AUTOMATIC: Add Partner Modules to ALL WIOA Programs
-- ============================================
-- This automatically finds your WIOA-approved programs and adds
-- the appropriate partner modules based on program type.
-- NO MANUAL ID REPLACEMENT NEEDED!
--
-- Copy this entire file and paste into Supabase SQL Editor
-- Click RUN

-- ============================================
-- 1. Add Milady RISE to Beauty/Barber Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Milady RISE Safety & Sanitation',
  'Milady RISE',
  'milady_rise',
  'hybrid',
  'https://milady.com/rise',
  'State board-aligned safety and sanitation training for beauty professionals',
  8,
  TRUE,
  TRUE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%barber%' 
    OR title ILIKE '%cosmetology%' 
    OR title ILIKE '%beauty%' 
    OR title ILIKE '%esthetic%'
    OR title ILIKE '%hair%'
    OR title ILIKE '%nail%'
    OR slug IN ('barbering', 'cosmetology', 'esthetics')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 2. Add HSI CPR to Healthcare Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi',
  'hybrid',
  'https://hsi.com/courses/cpr-aed',
  'American Heart Association CPR and AED training',
  4,
  TRUE,
  TRUE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%CNA%' 
    OR title ILIKE '%nursing%' 
    OR title ILIKE '%medical%' 
    OR title ILIKE '%health%'
    OR title ILIKE '%home health%'
    OR title ILIKE '%patient care%'
    OR title ILIKE '%phlebotomy%'
    OR slug IN ('cna', 'medical-assistant', 'phlebotomy', 'home-health-aide')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. Add CareerSafe Healthcare Safety to Healthcare Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Healthcare Safety & Bloodborne Pathogens',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-compliant healthcare safety training',
  8,
  TRUE,
  TRUE,
  101
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%CNA%' 
    OR title ILIKE '%nursing%' 
    OR title ILIKE '%medical%' 
    OR title ILIKE '%health%'
    OR title ILIKE '%home health%'
    OR title ILIKE '%patient care%'
    OR slug IN ('cna', 'medical-assistant', 'home-health-aide')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. Add CareerSafe OSHA 10 to Trades Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'OSHA 10-Hour Safety Training',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-compliant workplace safety training',
  10,
  TRUE,
  TRUE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%hvac%' 
    OR title ILIKE '%electrical%' 
    OR title ILIKE '%welding%' 
    OR title ILIKE '%construction%'
    OR title ILIKE '%building%'
    OR title ILIKE '%maintenance%'
    OR title ILIKE '%plumbing%'
    OR title ILIKE '%carpentry%'
    OR slug IN ('hvac', 'electrical', 'welding', 'construction', 'plumbing')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. Add Certiport to IT/Business Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Microsoft Office Specialist Certification',
  'Certiport',
  'certiport',
  'hybrid',
  'https://certiport.com',
  'Industry-recognized Microsoft Office certification',
  40,
  TRUE,
  FALSE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%IT%' 
    OR title ILIKE '%computer%' 
    OR title ILIKE '%office%' 
    OR title ILIKE '%business%'
    OR title ILIKE '%administrative%'
    OR title ILIKE '%customer service%'
    OR slug IN ('it-support', 'microsoft-office', 'administrative-assistant', 'customer-service')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. Add JRI to Janitorial Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Professional Janitorial Training',
  'JRI',
  'jri',
  'hybrid',
  'https://jri.com',
  'Professional cleaning and facility maintenance certification',
  20,
  TRUE,
  TRUE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%janitor%' 
    OR title ILIKE '%custodial%' 
    OR title ILIKE '%cleaning%'
    OR title ILIKE '%facility%'
    OR slug IN ('janitorial-services', 'custodial', 'facility-maintenance')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. Add NRF RISE Up to Retail Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Retail Industry Fundamentals',
  'NRF RISE Up',
  'nrf',
  'hybrid',
  'https://nrf.com/riseup',
  'National Retail Federation customer service and sales training',
  15,
  TRUE,
  TRUE,
  100
FROM programs p
WHERE 
  (wioa_approved = true OR dol_registered = true OR funding_tags @> ARRAY['WIOA']::text[])
  AND (
    title ILIKE '%retail%' 
    OR title ILIKE '%sales%' 
    OR title ILIKE '%customer service%'
    OR slug IN ('retail-management', 'customer-service', 'sales')
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. Add NDS Drug-Free to ALL WIOA Programs
-- ============================================
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours, requires_proof, is_required, sort_order
)
SELECT 
  p.id,
  'Drug-Free Workplace Training',
  'NDS',
  'nds',
  'hybrid',
  'https://nds.com',
  'DOT and workplace drug-free compliance training',
  2,
  TRUE,
  FALSE,
  999
FROM programs p
WHERE 
  wioa_approved = true 
  OR dol_registered = true 
  OR funding_tags @> ARRAY['WIOA']::text[]
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION: See what was added
-- ============================================
SELECT 
  p.title AS program,
  p.category,
  p.wioa_approved,
  p.dol_registered,
  COUNT(epm.id) AS modules_added,
  STRING_AGG(epm.partner_name, ', ' ORDER BY epm.sort_order) AS partners
FROM programs p
LEFT JOIN external_partner_modules epm ON p.id = epm.course_id
WHERE 
  p.wioa_approved = true 
  OR p.dol_registered = true 
  OR p.funding_tags @> ARRAY['WIOA']::text[]
GROUP BY p.id, p.title, p.category, p.wioa_approved, p.dol_registered
ORDER BY p.category, p.title;
