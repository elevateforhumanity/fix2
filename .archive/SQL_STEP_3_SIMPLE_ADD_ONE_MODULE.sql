-- ============================================================================
-- STEP 3 SIMPLE: ADD ONE PARTNER MODULE AT A TIME
-- ============================================================================
-- Use this if you want to add modules one at a time to specific programs
-- Replace 'YOUR-PROGRAM-ID-HERE' with the actual UUID from Step 2

-- ============================================================================
-- EXAMPLE: Add Milady RISE to Barbering Program
-- ============================================================================

INSERT INTO external_partner_modules (
  course_id,
  title,
  partner_name,
  partner_type,
  delivery_mode,
  launch_url,
  description,
  hours,
  requires_proof,
  is_required,
  sort_order
) VALUES (
  'YOUR-PROGRAM-ID-HERE',  -- Replace with your Barbering program ID
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Essential safety training for barbers. Use promo code: efhcti-rise295',
  3.5,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSTRUCTIONS:
-- ============================================================================
-- 1. Copy the INSERT statement above
-- 2. Replace 'YOUR-PROGRAM-ID-HERE' with your actual program ID
-- 3. Paste into Supabase SQL Editor
-- 4. Click RUN
-- 5. Repeat for each program you want to add modules to

-- ============================================================================
-- MORE EXAMPLES - Copy and modify as needed:
-- ============================================================================

-- Add HSI CPR to ANY healthcare program (CNA, Home Health, Medical Assistant, etc.)
/*
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'YOUR-HEALTHCARE-PROGRAM-ID',
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi',
  'hybrid',
  'https://hsi.com/courses/cpr-aed',
  'CPR-AED-ADULT',
  'American Heart Association CPR and AED training',
  4,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;
*/

-- Add CareerSafe OSHA to ANY trades program (HVAC, Building Maintenance, etc.)
/*
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'YOUR-TRADES-PROGRAM-ID',
  'OSHA 10-Hour Safety Training',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-10-CONSTRUCTION',
  'OSHA 10-hour safety training',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;
*/

-- Add Certiport to ANY IT/Business program
/*
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'YOUR-IT-PROGRAM-ID',
  'Microsoft Office Specialist Certification',
  'Certiport (Pearson VUE)',
  'certiport',
  'hybrid',
  'https://certiport.com/portal',
  'MOS-WORD-2019',
  'Industry-recognized Microsoft Office certification',
  15,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;
*/

-- Add NDS Drug-Free Workplace to ANY program
/*
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'YOUR-PROGRAM-ID',
  'Drug-Free Workplace Training',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-GENERAL',
  'Drug-free workplace compliance training',
  2,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;
*/

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Partner module added!';
  RAISE NOTICE 'Run SQL_STEP_4_VERIFY.sql to confirm';
END $$;
