-- ============================================
-- COMPLETE SETUP: CREATE PROGRAMS + ADD PARTNER MODULES
-- ============================================
-- Use this if you DON'T have program IDs yet
-- This creates sample programs AND adds partner modules to them
-- Copy this entire file and paste into Supabase SQL Editor
-- Click RUN

-- ============================================
-- STEP 1: Create Sample Programs
-- ============================================

INSERT INTO programs (title, description, category, duration_weeks, is_active)
VALUES
  -- Healthcare Programs
  ('Certified Nursing Assistant (CNA)', 'Entry-level healthcare training for nursing assistants', 'Healthcare', 6, true),
  ('Medical Assistant', 'Clinical and administrative medical office training', 'Healthcare', 12, true),
  ('Phlebotomy Technician', 'Blood collection and laboratory procedures', 'Healthcare', 8, true),
  
  -- Beauty & Barber Programs
  ('Barbering', 'Professional barbering and grooming techniques', 'Beauty & Personal Care', 52, true),
  ('Cosmetology', 'Hair, skin, and nail care professional training', 'Beauty & Personal Care', 52, true),
  ('Esthetics', 'Skincare and facial treatment specialist training', 'Beauty & Personal Care', 26, true),
  
  -- Trades Programs
  ('HVAC Technician', 'Heating, ventilation, and air conditioning systems', 'Skilled Trades', 24, true),
  ('Electrical Technician', 'Electrical systems installation and maintenance', 'Skilled Trades', 24, true),
  ('Welding Technology', 'Metal fabrication and welding techniques', 'Skilled Trades', 20, true),
  
  -- IT & Business Programs
  ('IT Support Specialist', 'Computer hardware and software support', 'Information Technology', 16, true),
  ('Microsoft Office Specialist', 'Microsoft Office applications certification', 'Business & Office', 8, true),
  ('Administrative Assistant', 'Office management and administrative skills', 'Business & Office', 12, true),
  
  -- Hospitality & Service Programs
  ('Culinary Arts', 'Professional cooking and kitchen management', 'Hospitality & Culinary', 40, true),
  ('Retail Management', 'Customer service and retail operations', 'Retail & Customer Service', 12, true),
  ('Janitorial Services', 'Professional cleaning and facility maintenance', 'Facility Services', 4, true)
ON CONFLICT (title) DO NOTHING;

-- ============================================
-- STEP 2: Add Partner Modules to Programs
-- ============================================

-- Healthcare Programs → HSI (CPR) + CareerSafe (Healthcare Safety) + NDS (Drug-Free)
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'HSI',
  'cpr_first_aid',
  'external_lti',
  'https://hsi.com/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title IN ('Certified Nursing Assistant (CNA)', 'Medical Assistant', 'Phlebotomy Technician')
ON CONFLICT DO NOTHING;

INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'CareerSafe',
  'safety_training',
  'external_lti',
  'https://careersafe.com/lti/launch',
  true,
  true,
  2
FROM programs p
WHERE p.title IN ('Certified Nursing Assistant (CNA)', 'Medical Assistant', 'Phlebotomy Technician')
ON CONFLICT DO NOTHING;

-- Beauty & Barber Programs → Milady RISE + NDS (Drug-Free)
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'Milady RISE',
  'safety_training',
  'external_lti',
  'https://milady.com/rise/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title IN ('Barbering', 'Cosmetology', 'Esthetics')
ON CONFLICT DO NOTHING;

-- Trades Programs → CareerSafe (OSHA 10) + NDS (Drug-Free)
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'CareerSafe',
  'safety_training',
  'external_lti',
  'https://careersafe.com/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title IN ('HVAC Technician', 'Electrical Technician', 'Welding Technology')
ON CONFLICT DO NOTHING;

-- IT & Business Programs → Certiport + NDS (Drug-Free)
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'Certiport',
  'certification',
  'external_lti',
  'https://certiport.com/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title IN ('IT Support Specialist', 'Microsoft Office Specialist', 'Administrative Assistant')
ON CONFLICT DO NOTHING;

-- Retail Programs → NRF RISE Up
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'NRF RISE Up',
  'certification',
  'external_lti',
  'https://nrf.com/riseup/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title = 'Retail Management'
ON CONFLICT DO NOTHING;

-- Janitorial Programs → JRI
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'JRI',
  'certification',
  'external_lti',
  'https://jri.com/lti/launch',
  true,
  true,
  1
FROM programs p
WHERE p.title = 'Janitorial Services'
ON CONFLICT DO NOTHING;

-- Add NDS (Drug-Free Workplace) to ALL programs
INSERT INTO external_partner_modules (course_id, partner_name, partner_type, delivery_mode, launch_url, requires_proof, is_required, sort_order)
SELECT 
  p.id,
  'NDS',
  'compliance',
  'external_lti',
  'https://nds.com/lti/launch',
  true,
  false,
  99
FROM programs p
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION: See what was created
-- ============================================

SELECT 
  p.title AS program,
  p.category,
  epm.partner_name,
  epm.partner_type,
  epm.is_required,
  epm.sort_order
FROM programs p
LEFT JOIN external_partner_modules epm ON p.id = epm.course_id
ORDER BY p.category, p.title, epm.sort_order;
