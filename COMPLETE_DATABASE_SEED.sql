-- ============================================
-- COMPLETE DATABASE SEED
-- Run this in Supabase SQL Editor
-- This adds all missing partner courses and data
-- ============================================

-- ============================================
-- PART 1: CREATE PARTNER COURSES TABLE (if not exists)
-- ============================================

CREATE TABLE IF NOT EXISTS public.partner_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.partner_lms_providers (id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_code TEXT,
  external_course_code TEXT,
  description TEXT,
  hours NUMERIC,
  level TEXT,
  credential_type TEXT,
  price NUMERIC DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_courses_provider ON public.partner_courses (provider_id);
CREATE INDEX IF NOT EXISTS idx_partner_courses_active ON public.partner_courses (active);

-- ============================================
-- PART 2: SEED PARTNER COURSES
-- ============================================

-- Get provider IDs
DO $$
DECLARE
  hsi_id UUID;
  jri_id UUID;
  milady_id UUID;
  nrf_id UUID;
  certiport_id UUID;
  careersafe_id UUID;
  nds_id UUID;
BEGIN
  -- Get provider IDs
  SELECT id INTO hsi_id FROM partner_lms_providers WHERE provider_type = 'hsi';
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  SELECT id INTO milady_id FROM partner_lms_providers WHERE provider_type = 'milady';
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  SELECT id INTO certiport_id FROM partner_lms_providers WHERE provider_type = 'certiport';
  SELECT id INTO careersafe_id FROM partner_lms_providers WHERE provider_type = 'careersafe';
  SELECT id INTO nds_id FROM partner_lms_providers WHERE provider_type = 'nds';

  -- HSI Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (hsi_id, 'OSHA 10-Hour General Industry', 'HSI-OSHA10-GI', 'OSHA 10-hour safety training for general industry workers', 10, 'beginner', 'certificate', 75, true),
    (hsi_id, 'OSHA 30-Hour General Industry', 'HSI-OSHA30-GI', 'OSHA 30-hour safety training for supervisors and managers', 30, 'intermediate', 'certificate', 150, true),
    (hsi_id, 'OSHA 10-Hour Construction', 'HSI-OSHA10-CONST', 'OSHA 10-hour safety training for construction workers', 10, 'beginner', 'certificate', 75, true),
    (hsi_id, 'OSHA 30-Hour Construction', 'HSI-OSHA30-CONST', 'OSHA 30-hour safety training for construction supervisors', 30, 'intermediate', 'certificate', 150, true),
    (hsi_id, 'First Aid/CPR/AED', 'HSI-FIRSTAID', 'Basic first aid, CPR, and AED certification', 4, 'beginner', 'certificate', 50, true),
    (hsi_id, 'Bloodborne Pathogens', 'HSI-BBP', 'Bloodborne pathogens awareness and prevention', 1, 'beginner', 'certificate', 25, true),
    (hsi_id, 'Hazard Communication', 'HSI-HAZCOM', 'Hazard communication and GHS training', 2, 'beginner', 'certificate', 30, true)
  ON CONFLICT DO NOTHING;

  -- JRI Courses (Job Readiness Initiative)
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (jri_id, 'Communication Skills', 'JRI-COMM', 'Workplace communication and interpersonal skills', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Problem Solving & Critical Thinking', 'JRI-PROBLEM', 'Problem-solving and decision-making skills', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Teamwork & Collaboration', 'JRI-TEAM', 'Teamwork and collaboration in the workplace', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Professionalism & Work Ethic', 'JRI-PROF', 'Professional behavior and work ethic', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Career Management', 'JRI-CAREER', 'Career planning and job search strategies', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Digital Literacy', 'JRI-DIGITAL', 'Basic computer and digital skills for the workplace', 8, 'beginner', 'certificate', 0, true)
  ON CONFLICT DO NOTHING;

  -- Milady RISE Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (milady_id, 'Domestic Violence Awareness', 'MILADY-DV', 'Recognizing and responding to domestic violence', 2, 'beginner', 'certificate', 0, true),
    (milady_id, 'Human Trafficking Awareness', 'MILADY-HT', 'Identifying and reporting human trafficking', 2, 'beginner', 'certificate', 0, true),
    (milady_id, 'Infection Control & Safety', 'MILADY-IC', 'Infection control and safety in barbering/cosmetology', 4, 'beginner', 'certificate', 0, true)
  ON CONFLICT DO NOTHING;

  -- NRF RISE Up Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (nrf_id, 'Customer Service & Sales', 'NRF-CSS', 'Customer service excellence and sales fundamentals', 20, 'beginner', 'certificate', 0, true),
    (nrf_id, 'Business of Retail', 'NRF-BOR', 'Retail operations and business fundamentals', 20, 'beginner', 'certificate', 0, true)
  ON CONFLICT DO NOTHING;

  -- Certiport Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (certiport_id, 'Microsoft Office Specialist - Word', 'CERT-MOS-WORD', 'Microsoft Word certification', 20, 'beginner', 'exam', 150, true),
    (certiport_id, 'Microsoft Office Specialist - Excel', 'CERT-MOS-EXCEL', 'Microsoft Excel certification', 20, 'beginner', 'exam', 150, true),
    (certiport_id, 'Microsoft Office Specialist - PowerPoint', 'CERT-MOS-PPT', 'Microsoft PowerPoint certification', 20, 'beginner', 'exam', 150, true),
    (certiport_id, 'Microsoft Office Specialist - Outlook', 'CERT-MOS-OUTLOOK', 'Microsoft Outlook certification', 20, 'beginner', 'exam', 150, true),
    (certiport_id, 'Adobe Certified Professional - Photoshop', 'CERT-ACP-PS', 'Adobe Photoshop certification', 30, 'intermediate', 'exam', 180, true),
    (certiport_id, 'Adobe Certified Professional - Illustrator', 'CERT-ACP-AI', 'Adobe Illustrator certification', 30, 'intermediate', 'exam', 180, true),
    (certiport_id, 'QuickBooks Certified User', 'CERT-QB', 'QuickBooks certification', 20, 'beginner', 'exam', 150, true),
    (certiport_id, 'IT Specialist - Python', 'CERT-ITS-PYTHON', 'IT Specialist Python certification', 40, 'intermediate', 'exam', 150, true),
    (certiport_id, 'IT Specialist - JavaScript', 'CERT-ITS-JS', 'IT Specialist JavaScript certification', 40, 'intermediate', 'exam', 150, true),
    (certiport_id, 'IT Specialist - HTML & CSS', 'CERT-ITS-HTML', 'IT Specialist HTML and CSS certification', 40, 'intermediate', 'exam', 150, true),
    (certiport_id, 'Entrepreneurship & Small Business', 'CERT-ESB', 'Entrepreneurship and small business certification', 30, 'beginner', 'exam', 150, true)
  ON CONFLICT DO NOTHING;

  -- CareerSafe Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (careersafe_id, 'OSHA 10-Hour General Industry', 'CS-OSHA10-GI', 'OSHA 10-hour general industry safety training', 10, 'beginner', 'certificate', 75, true),
    (careersafe_id, 'OSHA 10-Hour Construction', 'CS-OSHA10-CONST', 'OSHA 10-hour construction safety training', 10, 'beginner', 'certificate', 75, true),
    (careersafe_id, 'OSHA 30-Hour General Industry', 'CS-OSHA30-GI', 'OSHA 30-hour general industry safety training', 30, 'intermediate', 'certificate', 150, true),
    (careersafe_id, 'OSHA 30-Hour Construction', 'CS-OSHA30-CONST', 'OSHA 30-hour construction safety training', 30, 'intermediate', 'certificate', 150, true)
  ON CONFLICT DO NOTHING;

  -- National Drug Screening Courses
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active)
  VALUES
    (nds_id, 'DOT Oral Fluid Training', 'NDS-DOT-OF', 'DOT oral fluid collection training and certification', 8, 'beginner', 'certificate', 200, true)
  ON CONFLICT DO NOTHING;

END $$;

-- ============================================
-- PART 3: VERIFY SEEDING
-- ============================================

-- Show partner providers
SELECT 
  provider_name,
  provider_type,
  active,
  (SELECT COUNT(*) FROM partner_courses WHERE provider_id = partner_lms_providers.id) as course_count
FROM partner_lms_providers
ORDER BY provider_name;

-- Show total course count
SELECT 
  'Total Partner Courses' as metric,
  COUNT(*) as count
FROM partner_courses;

-- Show courses by provider
SELECT 
  p.provider_name,
  COUNT(c.id) as course_count
FROM partner_lms_providers p
LEFT JOIN partner_courses c ON c.provider_id = p.id
GROUP BY p.provider_name
ORDER BY course_count DESC;
