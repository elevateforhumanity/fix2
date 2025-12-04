-- ============================================================================
-- STEP 3: ADD PARTNER MODULES TO YOUR PROGRAMS
-- ============================================================================
-- BEFORE RUNNING: Replace 'REPLACE-WITH-YOUR-XXX-PROGRAM-ID' with actual UUIDs from Step 2
-- Then copy this entire file and paste into Supabase SQL Editor, then click RUN

-- ============================================================================
-- HEALTHCARE PROGRAMS
-- ============================================================================

-- CNA Program - HSI CPR/First Aid
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'CPR, AED & First Aid Certification',
  'HSI (Health & Safety Institute)',
  'hsi',
  'hybrid',
  'https://hsi.com/solutions/cpr-aed-first-aid-training/elevate-for-humanity-career-training-institute-nts-class-sign-up',
  'CPR-AED-ADULT',
  'American Heart Association CPR, AED, and First Aid certification',
  4,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- CNA Program - CareerSafe Healthcare Safety
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'Healthcare Safety & Bloodborne Pathogens',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'HEALTHCARE-SAFETY',
  'OSHA-compliant healthcare safety training',
  8,
  TRUE,
  TRUE,
  101
) ON CONFLICT DO NOTHING;

-- CNA Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CNA-PROGRAM-ID',
  'Drug-Free Workplace Training for Healthcare',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-HEALTHCARE',
  'Drug-free workplace compliance training',
  4,
  TRUE,
  TRUE,
  102
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- BEAUTY/BARBER PROGRAMS
-- ============================================================================

-- Barbering Program - Milady RISE
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-BARBERING-PROGRAM-ID',
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

-- Barbering Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-BARBERING-PROGRAM-ID',
  'Drug-Free Workplace Training for Barber/Beauty',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-BARBER-BEAUTY',
  'Drug-free workplace compliance training',
  2,
  TRUE,
  TRUE,
  101
) ON CONFLICT DO NOTHING;

-- Cosmetology Program - Milady RISE
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-COSMETOLOGY-PROGRAM-ID',
  'Client Well-Being & Safety',
  'Milady RISE',
  'milady',
  'link',
  'https://miladytraining.com',
  'Essential safety training for cosmetologists. Use promo code: efhcti-rise295',
  3.5,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- SKILLED TRADES PROGRAMS
-- ============================================================================

-- HVAC Program - CareerSafe OSHA 10
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-HVAC-PROGRAM-ID',
  'OSHA 10-Hour Construction Safety',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-10-CONSTRUCTION',
  'OSHA 10-hour safety training for HVAC workers',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- HVAC Program - NDS Drug-Free Workplace
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-HVAC-PROGRAM-ID',
  'Drug-Free Workplace Training for Skilled Trades',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-SKILLED-TRADES',
  'Drug-free workplace compliance training',
  2,
  TRUE,
  TRUE,
  102
) ON CONFLICT DO NOTHING;

-- Building Maintenance Program - CareerSafe OSHA 10
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-BUILDING-MAINTENANCE-PROGRAM-ID',
  'OSHA 10-Hour General Industry',
  'CareerSafe',
  'careersafe',
  'hybrid',
  'https://www.careersafeonline.com/campus/signin',
  'OSHA-10-GENERAL',
  'OSHA 10-hour safety training for building maintenance',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- IT/BUSINESS PROGRAMS
-- ============================================================================

-- IT Support Program - Certiport Microsoft Office
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-IT-PROGRAM-ID',
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

-- Customer Service Program - Certiport Customer Service
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CUSTOMER-SERVICE-PROGRAM-ID',
  'Customer Service Certification',
  'Certiport (Pearson VUE)',
  'certiport',
  'hybrid',
  'https://certiport.com/portal',
  'CUSTOMER-SERVICE-CERT',
  'Professional customer service certification',
  15,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- Customer Service Program - NRF RISE Up (Optional)
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CUSTOMER-SERVICE-PROGRAM-ID',
  'Retail Customer Service Excellence',
  'NRF RISE Up',
  'nrf',
  'hybrid',
  'https://nrf.com/riseup',
  'NRF-CUSTOMER-SERVICE',
  'Customer service skills for retail. Free training from NRF.',
  8,
  TRUE,
  FALSE,
  101
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- JANITORIAL PROGRAMS
-- ============================================================================

-- Janitorial Program - JRI Training
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-JANITORIAL-PROGRAM-ID',
  'Professional Janitorial Training',
  'JRI (Janitorial Resource Institute)',
  'jri',
  'hybrid',
  'https://jri.org',
  'JRI-BASIC',
  'Professional janitorial and custodial training. Free course.',
  8,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- RETAIL PROGRAMS
-- ============================================================================

-- Retail Program - NRF RISE Up
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-RETAIL-PROGRAM-ID',
  'Retail Industry Fundamentals',
  'NRF RISE Up',
  'nrf',
  'hybrid',
  'https://nrf.com/riseup',
  'NRF-FUNDAMENTALS',
  'Retail industry skills and education. Free training from NRF.',
  10,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- CDL/TRANSPORTATION PROGRAMS
-- ============================================================================

-- CDL Program - NDS DOT/CDL Training
INSERT INTO external_partner_modules (
  course_id, title, partner_name, partner_type, delivery_mode,
  launch_url, external_course_code, description, hours,
  requires_proof, is_required, sort_order
) VALUES (
  'REPLACE-WITH-YOUR-CDL-PROGRAM-ID',
  'DOT/CDL Drug & Alcohol Awareness',
  'National Drug Screening',
  'nds',
  'hybrid',
  'https://nationaldrugscreening.com',
  'NDS-DOT-CDL',
  'DOT-required drug and alcohol awareness training',
  3,
  TRUE,
  TRUE,
  100
) ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Step 3 Complete! Partner modules added.';
  RAISE NOTICE 'Next: Run SQL_STEP_4_VERIFY.sql to confirm';
END $$;
