-- ============================================================
-- BULK PROGRAM PARTNER CONFIGURATION
-- Configure all programs with appropriate partner sequences
-- ============================================================

-- Available Providers:
-- HSI: ebe7c096-e8bd-4295-ad95-613832dab009
-- Certiport: 0a88ca78-fde3-4662-8789-b415a138d8b4
-- CareerSafe: 5ae93afd-0736-48d8-a9fa-48e3bafdaf82
-- JRI: dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c
-- Milady: cd8cac33-d8e6-451d-a5cb-04d8bac37049

-- ============================================================
-- HEALTHCARE PROGRAMS (HSI + Certiport)
-- ============================================================

-- Certified Nursing Assistant (CNA)
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('ff1d4938-bf48-47cd-aca3-9e76a4ba4768', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('ff1d4938-bf48-47cd-aca3-9e76a4ba4768', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Dental Assistant
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('1fa5b7dc-faf0-4124-b177-d8d2d1149c46', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('1fa5b7dc-faf0-4124-b177-d8d2d1149c46', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Pharmacy Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('79d64b27-466f-431f-b3e9-2f26db59b9c4', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('79d64b27-466f-431f-b3e9-2f26db59b9c4', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Phlebotomy Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('439352ca-4a0e-4256-8391-a0fddf95a2e1', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('439352ca-4a0e-4256-8391-a0fddf95a2e1', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Emergency Medical Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('ced69bbd-c3bf-4b45-91af-08ec560ba36a', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('ced69bbd-c3bf-4b45-91af-08ec560ba36a', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Community Healthcare Worker
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('d315306e-1d18-4364-bbfd-56886213fafa', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1), -- HSI
  ('d315306e-1d18-4364-bbfd-56886213fafa', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- CPR & First Aid
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('7ceffdbe-3ca5-404f-932d-ab2904bd81d1', 'ebe7c096-e8bd-4295-ad95-613832dab009', true, 1) -- HSI only
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- BEAUTY/COSMETOLOGY PROGRAMS (Milady + JRI)
-- ============================================================

-- Barber Apprenticeship (all 4 instances)
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('65310ca8-c7a8-4633-ab9c-d25684090ecc', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('65310ca8-c7a8-4633-ab9c-d25684090ecc', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('0b37e36b-babe-4c2a-93a7-697a74f5423d', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('0b37e36b-babe-4c2a-93a7-697a74f5423d', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('72387e2b-eb61-4b12-badf-821b08cc05e7', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('72387e2b-eb61-4b12-badf-821b08cc05e7', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Esthetician Programs
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('7a7a8ad7-bac8-4883-b0cd-97d8353be94b', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('7a7a8ad7-bac8-4883-b0cd-97d8353be94b', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('a3745382-f6f4-4014-b06d-105ed7dcc22d', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('a3745382-f6f4-4014-b06d-105ed7dcc22d', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('7ea1f76e-36ae-477a-b011-a74c7b318e6f', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('7ea1f76e-36ae-477a-b011-a74c7b318e6f', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Nail Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('96ef60e4-93b4-40be-9cfe-ad57a4683340', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('96ef60e4-93b4-40be-9cfe-ad57a4683340', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('945e6f30-389c-4080-99af-8d79fc88644a', 'cd8cac33-d8e6-451d-a5cb-04d8bac37049', true, 1), -- Milady
  ('945e6f30-389c-4080-99af-8d79fc88644a', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 2)  -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- TECHNICAL/TRADE PROGRAMS (CareerSafe + Certiport)
-- ============================================================

-- HVAC Technician (all 3 instances)
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('ea64e8d6-6693-4507-919f-08c63394fbb7', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('ea64e8d6-6693-4507-919f-08c63394fbb7', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('8736ee23-ab24-445d-83e9-d8258b1cd65b', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('8736ee23-ab24-445d-83e9-d8258b1cd65b', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Automotive Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('a2335052-8fa5-4a26-b71e-bb672f910ebf', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('a2335052-8fa5-4a26-b71e-bb672f910ebf', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Diesel Mechanic
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('cdcb7993-df11-4661-8725-bcba61bf4046', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('cdcb7993-df11-4661-8725-bcba61bf4046', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Manufacturing Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('71ea74f2-339b-4e1b-9d27-3f7d4ca5ffac', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('71ea74f2-339b-4e1b-9d27-3f7d4ca5ffac', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Building Maintenance Technician
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Forklift Operator
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('e8bc1dbb-723a-4f4d-93bd-e07654280dc5', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1) -- CareerSafe only
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Solar Panel Installation
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('8c15e272-fa78-471d-9183-33518c94cb42', '5ae93afd-0736-48d8-a9fa-48e3bafdaf82', true, 1), -- CareerSafe
  ('8c15e272-fa78-471d-9183-33518c94cb42', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- IT/TECH PROGRAMS (Certiport only)
-- ============================================================

-- IT Support Specialist
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('9d443e0b-1c10-4b12-aa40-cd6a80ef81b3', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 1) -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Cybersecurity Analyst
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('4a14ba63-0a69-4106-a7ee-8e0f132763f5', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 1) -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Web Development
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('020c2916-b8c1-4496-8c41-869d8219bf83', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 1) -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Data Analytics
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('7dd013ad-701a-4201-b039-1c028d192e74', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 1) -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- BUSINESS/ADMIN PROGRAMS (JRI + Certiport)
-- ============================================================

-- Administrative Assistant
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('a774b8c6-75fa-4a93-9410-69fdbccec4f6', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- JRI
  ('a774b8c6-75fa-4a93-9410-69fdbccec4f6', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Customer Service Representative
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('d950b0ad-67d8-48f0-a6ac-4e0ff2375f63', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- JRI
  ('d950b0ad-67d8-48f0-a6ac-4e0ff2375f63', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Bookkeeping
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('bd503ebf-d8e1-4c79-9efe-a72c001589b4', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- JRI
  ('bd503ebf-d8e1-4c79-9efe-a72c001589b4', '0a88ca78-fde3-4662-8789-b415a138d8b4', true, 2)  -- Certiport
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Business Start-Up
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('6c983151-c8c6-4ac1-99bf-b96e6cb4a842', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1) -- JRI only
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Entrepreneurship
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('c6cf8528-bd11-4901-a785-bce3ee921988', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1) -- JRI only
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- SPECIALIZED PROGRAMS (JRI only)
-- ============================================================

-- CDL Training (both instances)
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('7ceaca9d-71fa-449e-821b-012a16a6a503', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1) -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1) -- JRI
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Recovery/Support Programs
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('a7b8c9d0-e1f2-4a5b-4c5d-6e7f8a9b0c1d', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Peer Recovery
  ('5ff08854-fb8c-4289-bfcf-4a0022bdabf0', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Peer Support
  ('30595ca5-4889-4b24-aad0-59a37dd0b953', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Recovery Coach
  ('81d43c2e-b485-4e42-a402-37abbf03a414', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Reentry Specialist
  ('a2b16412-8168-46a0-a472-9c7374c11d41', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1)  -- Direct Support
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- Other Specialized
INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
VALUES 
  ('f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Life Coach
  ('f0300a81-ae47-42d0-b338-7f1ee0c48530', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Real Estate
  ('9bd5dfec-dd1e-4674-ab45-3fa708fec5c8', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Insurance Agent
  ('050c67b1-c3cc-44c2-85ea-01a74e8bfb70', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1), -- Tax Preparation
  ('70b5ef8c-15ab-452a-a432-302ba637f950', 'dbc6a4d1-44e4-43a8-8917-d2c20edd1e0c', true, 1)  -- Youth Culinary
ON CONFLICT (program_id, provider_id) DO NOTHING;

-- ============================================================
-- VERIFY CONFIGURATION
-- ============================================================

SELECT 
  p.name,
  COUNT(ppl.id) as partner_count,
  STRING_AGG(plp.provider_name, ' → ' ORDER BY ppl.sequence_order) as partner_sequence
FROM programs p
LEFT JOIN program_partner_lms ppl ON ppl.program_id = p.id AND ppl.is_required = true
LEFT JOIN partner_lms_providers plp ON plp.id = ppl.provider_id
WHERE p.is_active = true
GROUP BY p.id, p.name
ORDER BY partner_count DESC, p.name;
