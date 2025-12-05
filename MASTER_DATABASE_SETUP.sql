-- ============================================
-- MASTER DATABASE SETUP - COMPLETE
-- Copy this ENTIRE file and paste into Supabase SQL Editor
-- This will create all tables and seed all data
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- STEP 1: CREATE ALL TABLES
-- ============================================

-- Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'student',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

-- Programs
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  tagline TEXT,
  summary TEXT,
  description TEXT,
  bullets TEXT[],
  funding TEXT[],
  category TEXT,
  duration_weeks INTEGER,
  duration_hours INTEGER,
  salary_min INTEGER,
  salary_max INTEGER,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs (slug);
CREATE INDEX IF NOT EXISTS idx_programs_category ON public.programs (category);

-- Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  level TEXT,
  duration_hours INTEGER,
  price NUMERIC DEFAULT 0,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_courses_program ON public.courses (program_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses (slug);

-- Modules
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.modules (course_id);

-- Lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  content_type TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons (module_id);

-- Enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  progress_percentage NUMERIC DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments (student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments (course_id);

-- Lesson Progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  progress_percentage NUMERIC DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON public.lesson_progress (student_id);

-- Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE SET NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_name TEXT NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE,
  pdf_url TEXT,
  verification_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_certificates_student ON public.certificates (student_id);

-- Partner LMS Providers
CREATE TABLE IF NOT EXISTS public.partner_lms_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name TEXT NOT NULL,
  provider_type TEXT NOT NULL,
  website_url TEXT,
  support_email TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  api_config JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_partner_lms_providers_type ON public.partner_lms_providers (provider_type);

-- Partner Courses
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

-- Partner LMS Enrollments
CREATE TABLE IF NOT EXISTS public.partner_lms_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.partner_lms_providers (id) ON DELETE RESTRICT,
  student_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.partner_courses (id) ON DELETE RESTRICT,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  progress_percentage NUMERIC DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  external_enrollment_id TEXT NOT NULL,
  external_account_id TEXT,
  external_certificate_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_student ON public.partner_lms_enrollments (student_id);

-- ============================================
-- STEP 2: SEED PARTNER PROVIDERS
-- ============================================

INSERT INTO public.partner_lms_providers (provider_name, provider_type, website_url, support_email, active, metadata)
VALUES
  ('Health & Safety Institute (HSI)', 'hsi', 'https://www.hsi.com', 'support@hsi.com', true, '{"description": "OSHA, First Aid, CPR, Bloodborne Pathogens training"}'::jsonb),
  ('Job Readiness Initiative (JRI)', 'jri', 'https://www.employindy.org', 'info@employindy.org', true, '{"description": "Soft skills and workforce readiness training"}'::jsonb),
  ('Milady RISE', 'milady', 'https://www.milady.com', 'support@milady.com', true, '{"description": "Barber and cosmetology safety training"}'::jsonb),
  ('NRF Foundation RISE Up', 'nrf', 'https://nrffoundation.org/rise-up', 'riseup@nrf.com', true, '{"description": "Customer service and retail credentials"}'::jsonb),
  ('Certiport', 'certiport', 'https://www.certiport.com', 'support@certiport.com', true, '{"description": "Microsoft, Adobe, QuickBooks, IT Specialist certifications"}'::jsonb),
  ('CareerSafe (OSHA)', 'careersafe', 'https://www.careersafeonline.com', 'support@careersafeonline.com', true, '{"description": "OSHA 10 and OSHA 30 training"}'::jsonb),
  ('National Drug Screening', 'nds', 'https://www.nationaldrugscreening.com', 'info@nationaldrugscreening.com', true, '{"description": "DOT oral fluid training"}'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================
-- STEP 3: SEED PARTNER COURSES
-- ============================================

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
  SELECT id INTO hsi_id FROM partner_lms_providers WHERE provider_type = 'hsi';
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  SELECT id INTO milady_id FROM partner_lms_providers WHERE provider_type = 'milady';
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  SELECT id INTO certiport_id FROM partner_lms_providers WHERE provider_type = 'certiport';
  SELECT id INTO careersafe_id FROM partner_lms_providers WHERE provider_type = 'careersafe';
  SELECT id INTO nds_id FROM partner_lms_providers WHERE provider_type = 'nds';

  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active) VALUES
    (hsi_id, 'OSHA 10-Hour General Industry', 'HSI-OSHA10-GI', 'OSHA 10-hour safety training for general industry workers', 10, 'beginner', 'certificate', 75, true),
    (hsi_id, 'OSHA 30-Hour General Industry', 'HSI-OSHA30-GI', 'OSHA 30-hour safety training for supervisors and managers', 30, 'intermediate', 'certificate', 150, true),
    (hsi_id, 'OSHA 10-Hour Construction', 'HSI-OSHA10-CONST', 'OSHA 10-hour safety training for construction workers', 10, 'beginner', 'certificate', 75, true),
    (hsi_id, 'OSHA 30-Hour Construction', 'HSI-OSHA30-CONST', 'OSHA 30-hour safety training for construction supervisors', 30, 'intermediate', 'certificate', 150, true),
    (hsi_id, 'First Aid/CPR/AED', 'HSI-FIRSTAID', 'Basic first aid, CPR, and AED certification', 4, 'beginner', 'certificate', 50, true),
    (hsi_id, 'Bloodborne Pathogens', 'HSI-BBP', 'Bloodborne pathogens awareness and prevention', 1, 'beginner', 'certificate', 25, true),
    (hsi_id, 'Hazard Communication', 'HSI-HAZCOM', 'Hazard communication and GHS training', 2, 'beginner', 'certificate', 30, true),
    (jri_id, 'Communication Skills', 'JRI-COMM', 'Workplace communication and interpersonal skills', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Problem Solving & Critical Thinking', 'JRI-PROBLEM', 'Problem-solving and decision-making skills', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Teamwork & Collaboration', 'JRI-TEAM', 'Teamwork and collaboration in the workplace', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Professionalism & Work Ethic', 'JRI-PROF', 'Professional behavior and work ethic', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Career Management', 'JRI-CAREER', 'Career planning and job search strategies', 8, 'beginner', 'certificate', 0, true),
    (jri_id, 'Digital Literacy', 'JRI-DIGITAL', 'Basic computer and digital skills for the workplace', 8, 'beginner', 'certificate', 0, true),
    (milady_id, 'Domestic Violence Awareness', 'MILADY-DV', 'Recognizing and responding to domestic violence', 2, 'beginner', 'certificate', 0, true),
    (milady_id, 'Human Trafficking Awareness', 'MILADY-HT', 'Identifying and reporting human trafficking', 2, 'beginner', 'certificate', 0, true),
    (milady_id, 'Infection Control & Safety', 'MILADY-IC', 'Infection control and safety in barbering/cosmetology', 4, 'beginner', 'certificate', 0, true),
    (nrf_id, 'Customer Service & Sales', 'NRF-CSS', 'Customer service excellence and sales fundamentals', 20, 'beginner', 'certificate', 0, true),
    (nrf_id, 'Business of Retail', 'NRF-BOR', 'Retail operations and business fundamentals', 20, 'beginner', 'certificate', 0, true),
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
    (certiport_id, 'Entrepreneurship & Small Business', 'CERT-ESB', 'Entrepreneurship and small business certification', 30, 'beginner', 'exam', 150, true),
    (careersafe_id, 'OSHA 10-Hour General Industry', 'CS-OSHA10-GI', 'OSHA 10-hour general industry safety training', 10, 'beginner', 'certificate', 75, true),
    (careersafe_id, 'OSHA 10-Hour Construction', 'CS-OSHA10-CONST', 'OSHA 10-hour construction safety training', 10, 'beginner', 'certificate', 75, true),
    (careersafe_id, 'OSHA 30-Hour General Industry', 'CS-OSHA30-GI', 'OSHA 30-hour general industry safety training', 30, 'intermediate', 'certificate', 150, true),
    (careersafe_id, 'OSHA 30-Hour Construction', 'CS-OSHA30-CONST', 'OSHA 30-hour construction safety training', 30, 'intermediate', 'certificate', 150, true),
    (nds_id, 'DOT Oral Fluid Training', 'NDS-DOT-OF', 'DOT oral fluid collection training and certification', 8, 'beginner', 'certificate', 200, true)
  ON CONFLICT DO NOTHING;
END $$;

-- ============================================
-- STEP 4: VERIFY SETUP
-- ============================================

SELECT 'Database Setup Complete!' as status;
SELECT COUNT(*) as total_programs FROM programs;
SELECT COUNT(*) as total_courses FROM courses;
SELECT COUNT(*) as total_modules FROM modules;
SELECT COUNT(*) as total_lessons FROM lessons;
SELECT COUNT(*) as total_partner_providers FROM partner_lms_providers;
SELECT COUNT(*) as total_partner_courses FROM partner_courses;
