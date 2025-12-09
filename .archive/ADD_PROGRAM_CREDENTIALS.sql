-- ============================================
-- ADD CREDENTIALING COURSES TO ALL PROGRAMS
-- Links partner courses to training programs
-- ============================================

-- First, let's create a table to link programs with required partner courses
CREATE TABLE IF NOT EXISTS public.program_required_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  partner_course_id UUID NOT NULL REFERENCES public.partner_courses(id) ON DELETE CASCADE,
  is_required BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_id, partner_course_id)
);

CREATE INDEX IF NOT EXISTS idx_program_required_courses_program ON public.program_required_courses(program_id);
CREATE INDEX IF NOT EXISTS idx_program_required_courses_course ON public.program_required_courses(partner_course_id);

-- ============================================
-- LINK PROGRAMS WITH PARTNER COURSES
-- ============================================

DO $$
DECLARE
  -- Program IDs
  cna_id UUID;
  cdl_id UUID;
  barber_id UUID;
  hvac_id UUID;
  medical_assistant_id UUID;
  phlebotomy_id UUID;
  dental_assistant_id UUID;
  
  -- Partner Course IDs
  jri_comm_id UUID;
  jri_problem_id UUID;
  jri_team_id UUID;
  jri_prof_id UUID;
  jri_career_id UUID;
  jri_digital_id UUID;
  
  hsi_osha10_gi_id UUID;
  hsi_osha30_gi_id UUID;
  hsi_firstaid_id UUID;
  hsi_bbp_id UUID;
  
  milady_dv_id UUID;
  milady_ht_id UUID;
  milady_ic_id UUID;
  
  nrf_css_id UUID;
  nrf_bor_id UUID;
  
  careersafe_osha10_id UUID;
  
  nds_dot_id UUID;
  
BEGIN
  -- Get Program IDs
  SELECT id INTO cna_id FROM programs WHERE slug = 'certified-nursing-assistant' OR name LIKE '%CNA%' LIMIT 1;
  SELECT id INTO cdl_id FROM programs WHERE slug = 'commercial-truck-driving' OR name LIKE '%CDL%' OR name LIKE '%Truck%' LIMIT 1;
  SELECT id INTO barber_id FROM programs WHERE slug = 'barber-apprenticeship' OR name LIKE '%Barber%' LIMIT 1;
  SELECT id INTO hvac_id FROM programs WHERE slug = 'hvac-technician' OR name LIKE '%HVAC%' LIMIT 1;
  SELECT id INTO medical_assistant_id FROM programs WHERE name LIKE '%Medical Assistant%' LIMIT 1;
  SELECT id INTO phlebotomy_id FROM programs WHERE name LIKE '%Phlebotomy%' LIMIT 1;
  SELECT id INTO dental_assistant_id FROM programs WHERE name LIKE '%Dental%' LIMIT 1;
  
  -- Get JRI Course IDs
  SELECT id INTO jri_comm_id FROM partner_courses WHERE course_code = 'JRI-COMM' LIMIT 1;
  SELECT id INTO jri_problem_id FROM partner_courses WHERE course_code = 'JRI-PROBLEM' LIMIT 1;
  SELECT id INTO jri_team_id FROM partner_courses WHERE course_code = 'JRI-TEAM' LIMIT 1;
  SELECT id INTO jri_prof_id FROM partner_courses WHERE course_code = 'JRI-PROF' LIMIT 1;
  SELECT id INTO jri_career_id FROM partner_courses WHERE course_code = 'JRI-CAREER' LIMIT 1;
  SELECT id INTO jri_digital_id FROM partner_courses WHERE course_code = 'JRI-DIGITAL' LIMIT 1;
  
  -- Get HSI Course IDs
  SELECT id INTO hsi_osha10_gi_id FROM partner_courses WHERE course_code = 'HSI-OSHA10-GI' LIMIT 1;
  SELECT id INTO hsi_osha30_gi_id FROM partner_courses WHERE course_code = 'HSI-OSHA30-GI' LIMIT 1;
  SELECT id INTO hsi_firstaid_id FROM partner_courses WHERE course_code = 'HSI-FIRSTAID' LIMIT 1;
  SELECT id INTO hsi_bbp_id FROM partner_courses WHERE course_code = 'HSI-BBP' LIMIT 1;
  
  -- Get Milady Course IDs
  SELECT id INTO milady_dv_id FROM partner_courses WHERE course_code = 'MILADY-DV' LIMIT 1;
  SELECT id INTO milady_ht_id FROM partner_courses WHERE course_code = 'MILADY-HT' LIMIT 1;
  SELECT id INTO milady_ic_id FROM partner_courses WHERE course_code = 'MILADY-IC' LIMIT 1;
  
  -- Get NRF Course IDs
  SELECT id INTO nrf_css_id FROM partner_courses WHERE course_code = 'NRF-CSS' LIMIT 1;
  SELECT id INTO nrf_bor_id FROM partner_courses WHERE course_code = 'NRF-BOR' LIMIT 1;
  
  -- Get CareerSafe Course IDs
  SELECT id INTO careersafe_osha10_id FROM partner_courses WHERE course_code = 'CS-OSHA10-GI' LIMIT 1;
  
  -- Get NDS Course ID
  SELECT id INTO nds_dot_id FROM partner_courses WHERE course_code = 'NDS-DOT-OF' LIMIT 1;
  
  -- ============================================
  -- CNA (Certified Nursing Assistant)
  -- ============================================
  IF cna_id IS NOT NULL THEN
    -- JRI Soft Skills (All 6)
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (cna_id, jri_comm_id, true, 1),
      (cna_id, jri_problem_id, true, 2),
      (cna_id, jri_team_id, true, 3),
      (cna_id, jri_prof_id, true, 4),
      (cna_id, jri_career_id, true, 5),
      (cna_id, jri_digital_id, true, 6)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (cna_id, hsi_firstaid_id, true, 7),
      (cna_id, hsi_bbp_id, true, 8),
      (cna_id, hsi_osha10_gi_id, false, 9)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- CDL (Commercial Truck Driving)
  -- ============================================
  IF cdl_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (cdl_id, jri_comm_id, true, 1),
      (cdl_id, jri_prof_id, true, 2),
      (cdl_id, jri_career_id, true, 3)
    ON CONFLICT DO NOTHING;
    
    -- NDS DOT Training
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (cdl_id, nds_dot_id, true, 4)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (cdl_id, hsi_firstaid_id, true, 5),
      (cdl_id, hsi_osha10_gi_id, false, 6)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- BARBER APPRENTICESHIP
  -- ============================================
  IF barber_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (barber_id, jri_comm_id, true, 1),
      (barber_id, jri_prof_id, true, 2),
      (barber_id, jri_career_id, true, 3)
    ON CONFLICT DO NOTHING;
    
    -- Milady RISE (All 3)
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (barber_id, milady_dv_id, true, 4),
      (barber_id, milady_ht_id, true, 5),
      (barber_id, milady_ic_id, true, 6)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (barber_id, hsi_bbp_id, true, 7)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- HVAC TECHNICIAN
  -- ============================================
  IF hvac_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (hvac_id, jri_comm_id, true, 1),
      (hvac_id, jri_prof_id, true, 2),
      (hvac_id, jri_career_id, true, 3)
    ON CONFLICT DO NOTHING;
    
    -- HSI/CareerSafe OSHA
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (hvac_id, hsi_osha10_gi_id, true, 4),
      (hvac_id, hsi_firstaid_id, false, 5)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- MEDICAL ASSISTANT
  -- ============================================
  IF medical_assistant_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (medical_assistant_id, jri_comm_id, true, 1),
      (medical_assistant_id, jri_prof_id, true, 2),
      (medical_assistant_id, jri_career_id, true, 3)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (medical_assistant_id, hsi_firstaid_id, true, 4),
      (medical_assistant_id, hsi_bbp_id, true, 5),
      (medical_assistant_id, hsi_osha10_gi_id, false, 6)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- PHLEBOTOMY TECHNICIAN
  -- ============================================
  IF phlebotomy_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (phlebotomy_id, jri_comm_id, true, 1),
      (phlebotomy_id, jri_prof_id, true, 2)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (phlebotomy_id, hsi_bbp_id, true, 3),
      (phlebotomy_id, hsi_firstaid_id, false, 4)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- ============================================
  -- DENTAL ASSISTANT
  -- ============================================
  IF dental_assistant_id IS NOT NULL THEN
    -- JRI Soft Skills
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (dental_assistant_id, jri_comm_id, true, 1),
      (dental_assistant_id, jri_prof_id, true, 2)
    ON CONFLICT DO NOTHING;
    
    -- HSI Safety
    INSERT INTO program_required_courses (program_id, partner_course_id, is_required, order_index) VALUES
      (dental_assistant_id, hsi_bbp_id, true, 3),
      (dental_assistant_id, hsi_firstaid_id, false, 4)
    ON CONFLICT DO NOTHING;
  END IF;
  
END $$;

-- ============================================
-- VERIFY PROGRAM CREDENTIALS
-- ============================================

-- Show programs with their required courses
SELECT 
  p.name as program_name,
  COUNT(prc.id) as required_courses,
  COUNT(CASE WHEN prc.is_required THEN 1 END) as mandatory_courses,
  COUNT(CASE WHEN NOT prc.is_required THEN 1 END) as optional_courses
FROM programs p
LEFT JOIN program_required_courses prc ON prc.program_id = p.id
GROUP BY p.name
HAVING COUNT(prc.id) > 0
ORDER BY p.name;

-- Show detailed course requirements for each program
SELECT 
  p.name as program,
  pc.course_name,
  CASE WHEN prc.is_required THEN 'Required' ELSE 'Optional' END as requirement,
  prc.order_index as sequence
FROM programs p
JOIN program_required_courses prc ON prc.program_id = p.id
JOIN partner_courses pc ON pc.id = prc.partner_course_id
ORDER BY p.name, prc.order_index;
