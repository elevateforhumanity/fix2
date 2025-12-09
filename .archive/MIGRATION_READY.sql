
-- Quick Migration Script
-- Copy and paste this entire block into Supabase SQL Editor

-- ============================================
-- PARTNER COURSES & SCORM INTEGRATION TABLES
-- Complete database schema for partner LMS and SCORM content
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- SCORM PACKAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.scorm_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.2',
  package_url TEXT NOT NULL,
  manifest_url TEXT,
  launch_url TEXT NOT NULL,
  duration_minutes INTEGER,
  passing_score INTEGER DEFAULT 80,
  max_attempts INTEGER,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scorm_packages_active ON public.scorm_packages (is_active);

-- ============================================
-- SCORM ENROLLMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.scorm_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scorm_package_id UUID NOT NULL REFERENCES public.scorm_packages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'not_attempted',
  progress_percentage NUMERIC DEFAULT 0,
  score NUMERIC,
  attempts INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  suspend_data JSONB DEFAULT '{}'::jsonb,
  cmi_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(scorm_package_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_scorm_enrollments_user ON public.scorm_enrollments (user_id);
CREATE INDEX IF NOT EXISTS idx_scorm_enrollments_package ON public.scorm_enrollments (scorm_package_id);
CREATE INDEX IF NOT EXISTS idx_scorm_enrollments_status ON public.scorm_enrollments (status);

-- ============================================
-- SCORM TRACKING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.scorm_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scorm_enrollment_id UUID NOT NULL REFERENCES public.scorm_enrollments(id) ON DELETE CASCADE,
  element TEXT NOT NULL,
  value TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scorm_tracking_enrollment ON public.scorm_tracking (scorm_enrollment_id);
CREATE INDEX IF NOT EXISTS idx_scorm_tracking_element ON public.scorm_tracking (element);

-- ============================================
-- PARTNER COURSE MAPPINGS TABLE
-- Link partner courses to internal programs/courses
-- ============================================
CREATE TABLE IF NOT EXISTS public.partner_course_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_course_id UUID NOT NULL REFERENCES public.partner_courses(id) ON DELETE CASCADE,
  internal_program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  internal_course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  scorm_package_id UUID REFERENCES public.scorm_packages(id) ON DELETE SET NULL,
  mapping_type TEXT NOT NULL DEFAULT 'equivalent',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_mappings_partner ON public.partner_course_mappings (partner_course_id);
CREATE INDEX IF NOT EXISTS idx_partner_mappings_program ON public.partner_course_mappings (internal_program_id);
CREATE INDEX IF NOT EXISTS idx_partner_mappings_course ON public.partner_course_mappings (internal_course_id);
CREATE INDEX IF NOT EXISTS idx_partner_mappings_scorm ON public.partner_course_mappings (scorm_package_id);

-- ============================================
-- EXTERNAL MODULE PROGRESS TABLE
-- Track progress for external/partner modules
-- ============================================
CREATE TABLE IF NOT EXISTS public.external_module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  partner_enrollment_id UUID REFERENCES public.partner_lms_enrollments(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_name TEXT,
  status TEXT DEFAULT 'not_started',
  progress_percentage NUMERIC DEFAULT 0,
  score NUMERIC,
  time_spent_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_external_progress_user ON public.external_module_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_external_progress_enrollment ON public.external_module_progress (partner_enrollment_id);
CREATE INDEX IF NOT EXISTS idx_external_progress_status ON public.external_module_progress (status);

-- ============================================
-- LMS SYNC LOG TABLE
-- Track synchronization with partner LMS systems
-- ============================================
CREATE TABLE IF NOT EXISTS public.lms_sync_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.partner_lms_providers(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL,
  records_processed INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  error_message TEXT,
  sync_data JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lms_sync_provider ON public.lms_sync_log (provider_id);
CREATE INDEX IF NOT EXISTS idx_lms_sync_status ON public.lms_sync_log (status);
CREATE INDEX IF NOT EXISTS idx_lms_sync_type ON public.lms_sync_log (sync_type);

-- ============================================
-- PARTNER CREDENTIALS TABLE
-- Store credentials/certificates from partner systems
-- ============================================
CREATE TABLE IF NOT EXISTS public.partner_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  partner_enrollment_id UUID REFERENCES public.partner_lms_enrollments(id) ON DELETE SET NULL,
  provider_id UUID NOT NULL REFERENCES public.partner_lms_providers(id) ON DELETE CASCADE,
  credential_name TEXT NOT NULL,
  credential_type TEXT,
  credential_number TEXT,
  external_credential_id TEXT,
  issued_date DATE,
  expiration_date DATE,
  verification_url TEXT,
  certificate_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_credentials_user ON public.partner_credentials (user_id);
CREATE INDEX IF NOT EXISTS idx_partner_credentials_provider ON public.partner_credentials (provider_id);
CREATE INDEX IF NOT EXISTS idx_partner_credentials_enrollment ON public.partner_credentials (partner_enrollment_id);

-- ============================================
-- FUNCTIONS FOR SCORM TRACKING
-- ============================================

-- Function to update SCORM progress
CREATE OR REPLACE FUNCTION update_scorm_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update enrollment progress based on tracking data
  UPDATE scorm_enrollments
  SET 
    progress_percentage = CASE 
      WHEN NEW.element = 'cmi.core.lesson_status' AND NEW.value = 'completed' THEN 100
      WHEN NEW.element = 'cmi.core.score.raw' THEN COALESCE(NEW.value::numeric, progress_percentage)
      ELSE progress_percentage
    END,
    status = CASE 
      WHEN NEW.element = 'cmi.core.lesson_status' THEN NEW.value
      ELSE status
    END,
    score = CASE 
      WHEN NEW.element = 'cmi.core.score.raw' THEN NEW.value::numeric
      ELSE score
    END,
    completed_at = CASE 
      WHEN NEW.element = 'cmi.core.lesson_status' AND NEW.value = 'completed' THEN NOW()
      ELSE completed_at
    END,
    last_accessed_at = NOW(),
    updated_at = NOW()
  WHERE id = NEW.scorm_enrollment_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for SCORM progress updates
DROP TRIGGER IF EXISTS trigger_update_scorm_progress ON scorm_tracking;
CREATE TRIGGER trigger_update_scorm_progress
  AFTER INSERT ON scorm_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_scorm_progress();

-- Function to sync partner enrollment progress
CREATE OR REPLACE FUNCTION sync_partner_enrollment_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update partner enrollment when external module progress changes
  IF NEW.partner_enrollment_id IS NOT NULL THEN
    UPDATE partner_lms_enrollments
    SET 
      progress_percentage = (
        SELECT AVG(progress_percentage)
        FROM external_module_progress
        WHERE partner_enrollment_id = NEW.partner_enrollment_id
      ),
      status = CASE 
        WHEN (SELECT AVG(progress_percentage) FROM external_module_progress WHERE partner_enrollment_id = NEW.partner_enrollment_id) >= 100 THEN 'completed'
        WHEN (SELECT AVG(progress_percentage) FROM external_module_progress WHERE partner_enrollment_id = NEW.partner_enrollment_id) > 0 THEN 'in_progress'
        ELSE 'pending'
      END,
      completed_at = CASE 
        WHEN (SELECT AVG(progress_percentage) FROM external_module_progress WHERE partner_enrollment_id = NEW.partner_enrollment_id) >= 100 THEN NOW()
        ELSE completed_at
      END,
      updated_at = NOW()
    WHERE id = NEW.partner_enrollment_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for partner enrollment sync
DROP TRIGGER IF EXISTS trigger_sync_partner_progress ON external_module_progress;
CREATE TRIGGER trigger_sync_partner_progress
  AFTER INSERT OR UPDATE ON external_module_progress
  FOR EACH ROW
  EXECUTE FUNCTION sync_partner_enrollment_progress();

-- ============================================
-- VIEWS FOR REPORTING
-- ============================================

-- View for partner course enrollment summary
CREATE OR REPLACE VIEW partner_enrollment_summary AS
SELECT 
  ple.id,
  ple.student_id,
  p.full_name as student_name,
  p.email as student_email,
  pc.course_name,
  plp.provider_name,
  ple.status,
  ple.progress_percentage,
  ple.enrolled_at,
  ple.completed_at,
  COUNT(emp.id) as module_count,
  AVG(emp.progress_percentage) as avg_module_progress
FROM partner_lms_enrollments ple
JOIN profiles p ON ple.student_id = p.id
JOIN partner_courses pc ON ple.course_id = pc.id
JOIN partner_lms_providers plp ON ple.provider_id = plp.id
LEFT JOIN external_module_progress emp ON emp.partner_enrollment_id = ple.id
GROUP BY ple.id, p.full_name, p.email, pc.course_name, plp.provider_name, 
         ple.status, ple.progress_percentage, ple.enrolled_at, ple.completed_at;

-- View for SCORM completion tracking
CREATE OR REPLACE VIEW scorm_completion_summary AS
SELECT 
  se.id,
  se.user_id,
  p.full_name as student_name,
  p.email as student_email,
  sp.title as scorm_title,
  se.status,
  se.progress_percentage,
  se.score,
  se.attempts,
  se.time_spent_seconds / 60 as time_spent_minutes,
  se.started_at,
  se.completed_at
FROM scorm_enrollments se
JOIN profiles p ON se.user_id = p.id
JOIN scorm_packages sp ON se.scorm_package_id = sp.id;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.scorm_packages TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.scorm_enrollments TO authenticated;
GRANT SELECT, INSERT ON public.scorm_tracking TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.partner_course_mappings TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.external_module_progress TO authenticated;
GRANT SELECT ON public.lms_sync_log TO authenticated;
GRANT SELECT ON public.partner_credentials TO authenticated;
GRANT SELECT ON partner_enrollment_summary TO authenticated;
GRANT SELECT ON scorm_completion_summary TO authenticated;

-- Grant admin access
GRANT ALL ON public.scorm_packages TO service_role;
GRANT ALL ON public.scorm_enrollments TO service_role;
GRANT ALL ON public.scorm_tracking TO service_role;
GRANT ALL ON public.partner_course_mappings TO service_role;
GRANT ALL ON public.external_module_progress TO service_role;
GRANT ALL ON public.lms_sync_log TO service_role;
GRANT ALL ON public.partner_credentials TO service_role;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'scorm_packages',
    'scorm_enrollments',
    'scorm_tracking',
    'partner_course_mappings',
    'external_module_progress',
    'lms_sync_log',
    'partner_credentials'
  )
ORDER BY tablename;

-- Show views
SELECT 
  schemaname,
  viewname,
  viewowner
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'partner_enrollment_summary',
    'scorm_completion_summary'
  )
ORDER BY viewname;

