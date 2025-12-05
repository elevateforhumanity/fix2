-- ============================================
-- CREATE ALL CRITICAL TABLES
-- Run this FIRST before seeding
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PROFILES TABLE
-- ============================================
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

-- ============================================
-- PROGRAMS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_programs_featured ON public.programs (featured);
CREATE INDEX IF NOT EXISTS idx_programs_active ON public.programs (is_active);

-- ============================================
-- COURSES TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_courses_active ON public.courses (is_active);

-- ============================================
-- MODULES TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_modules_order ON public.modules (order_index);

-- ============================================
-- LESSONS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons (order_index);

-- ============================================
-- ENROLLMENTS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments (status);

-- ============================================
-- LESSON PROGRESS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress (lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment ON public.lesson_progress (enrollment_id);

-- ============================================
-- CERTIFICATES TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_certificates_number ON public.certificates (certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON public.certificates (course_id);

-- ============================================
-- PARTNER LMS PROVIDERS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_partner_lms_providers_active ON public.partner_lms_providers (active);

-- ============================================
-- PARTNER COURSES TABLE
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
CREATE INDEX IF NOT EXISTS idx_partner_courses_code ON public.partner_courses (course_code);

-- ============================================
-- PARTNER LMS ENROLLMENTS TABLE
-- ============================================
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
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_status ON public.partner_lms_enrollments (status);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_provider ON public.partner_lms_enrollments (provider_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_course ON public.partner_lms_enrollments (course_id);

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'profiles',
    'programs',
    'courses',
    'modules',
    'lessons',
    'enrollments',
    'lesson_progress',
    'certificates',
    'partner_lms_providers',
    'partner_courses',
    'partner_lms_enrollments'
  )
ORDER BY tablename;
