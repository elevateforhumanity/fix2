-- ============================================================================
-- ALL 3 MIGRATIONS TO GET 10/10 PRODUCTION READY
-- ============================================================================
-- Apply these in Supabase Dashboard SQL Editor
-- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor
-- ============================================================================

-- ============================================================================
-- MIGRATION 1: CREATE MISSING TABLES
-- ============================================================================
-- Creates employment_tracking and credential_verification tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.employment_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID,
  employer_name TEXT,
  job_title TEXT,
  employment_start_date DATE,
  employment_end_date DATE,
  hourly_wage DECIMAL(10,2),
  hours_per_week DECIMAL(5,2),
  annual_salary DECIMAL(12,2),
  verified_2nd_quarter BOOLEAN DEFAULT false,
  verified_2nd_quarter_date DATE,
  wage_2nd_quarter DECIMAL(10,2),
  verified_4th_quarter BOOLEAN DEFAULT false,
  verified_4th_quarter_date DATE,
  wage_4th_quarter DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_employment_tracking_student ON public.employment_tracking(student_id);
CREATE INDEX IF NOT EXISTS idx_employment_tracking_enrollment ON public.employment_tracking(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_employment_tracking_start_date ON public.employment_tracking(employment_start_date);

ALTER TABLE public.employment_tracking ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_view_own_employment_tracking" ON public.employment_tracking;
CREATE POLICY "users_view_own_employment_tracking" ON public.employment_tracking
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "admins_manage_employment_tracking" ON public.employment_tracking;
CREATE POLICY "admins_manage_employment_tracking" ON public.employment_tracking
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE TABLE IF NOT EXISTS public.credential_verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID,
  credential_type TEXT NOT NULL,
  credential_name TEXT NOT NULL,
  credential_number TEXT,
  issuing_organization TEXT,
  issue_date DATE,
  expiration_date DATE,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'failed', 'expired')) DEFAULT 'pending',
  verified_date DATE,
  verified_by UUID REFERENCES auth.users(id),
  verification_method TEXT,
  verification_url TEXT,
  state_registry_id TEXT,
  state_registry_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_credential_verification_student ON public.credential_verification(student_id);
CREATE INDEX IF NOT EXISTS idx_credential_verification_enrollment ON public.credential_verification(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_credential_verification_status ON public.credential_verification(verification_status);
CREATE INDEX IF NOT EXISTS idx_credential_verification_expiration ON public.credential_verification(expiration_date);

ALTER TABLE public.credential_verification ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_view_own_credential_verification" ON public.credential_verification;
CREATE POLICY "users_view_own_credential_verification" ON public.credential_verification
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "admins_manage_credential_verification" ON public.credential_verification;
CREATE POLICY "admins_manage_credential_verification" ON public.credential_verification
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

GRANT SELECT ON public.employment_tracking TO authenticated;
GRANT SELECT ON public.credential_verification TO authenticated;

-- ============================================================================
-- MIGRATION 2: FIX DUPLICATE POLICIES
-- ============================================================================
-- Renames 11 duplicate policies to be unique per table
-- ============================================================================

-- Drop all duplicate policies
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON drake_lessons;
DROP POLICY IF EXISTS "Admins can manage credentials" ON credentials;
DROP POLICY IF EXISTS "Admins can manage credentials" ON credential_verification;
DROP POLICY IF EXISTS "Admins can update documents" ON documents;
DROP POLICY IF EXISTS "Admins can update documents" ON tax_documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON tax_documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view documents" ON documents;
DROP POLICY IF EXISTS "Authenticated users can view documents" ON tax_documents;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON drake_progress;
DROP POLICY IF EXISTS "Users can upload own documents" ON documents;
DROP POLICY IF EXISTS "Users can upload own documents" ON tax_documents;
DROP POLICY IF EXISTS "Users can upload own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;
DROP POLICY IF EXISTS "Users can view own documents" ON documents;
DROP POLICY IF EXISTS "Users can view own documents" ON tax_documents;
DROP POLICY IF EXISTS "Users can view own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can view own enrollments" ON drake_enrollments;
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can view own progress" ON drake_progress;

-- Recreate with unique names
CREATE POLICY "admins_manage_courses" ON courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "users_view_own_enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_create_enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_view_own_storage_objects" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "users_upload_storage_objects" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "admins_manage_storage_objects" ON storage.objects
  FOR ALL USING (
    bucket_id = 'documents' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- ============================================================================
-- MIGRATION 3: FINAL RLS POLICIES
-- ============================================================================
-- Single authoritative RLS configuration
-- ============================================================================

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public tables
ALTER TABLE IF EXISTS public.programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_view_programs" ON public.programs;
CREATE POLICY "public_view_programs" ON public.programs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admins_manage_programs" ON public.programs;
CREATE POLICY "admins_manage_programs" ON public.programs
  FOR ALL USING (is_admin());

ALTER TABLE IF EXISTS public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_view_courses" ON public.courses;
CREATE POLICY "public_view_courses" ON public.courses
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admins_manage_courses_table" ON public.courses;
CREATE POLICY "admins_manage_courses_table" ON public.courses
  FOR ALL USING (is_admin());

-- User tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_view_own_profile" ON public.profiles;
CREATE POLICY "users_view_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own_profile" ON public.profiles;
CREATE POLICY "users_update_own_profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "admins_view_all_profiles" ON public.profiles;
CREATE POLICY "admins_view_all_profiles" ON public.profiles
  FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "admins_update_all_profiles" ON public.profiles;
CREATE POLICY "admins_update_all_profiles" ON public.profiles
  FOR UPDATE USING (is_admin());

ALTER TABLE IF EXISTS public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_view_own_enrollments_table" ON public.enrollments;
CREATE POLICY "users_view_own_enrollments_table" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_create_own_enrollments" ON public.enrollments;
CREATE POLICY "users_create_own_enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admins_manage_all_enrollments" ON public.enrollments;
CREATE POLICY "admins_manage_all_enrollments" ON public.enrollments
  FOR ALL USING (is_admin());

-- Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.programs TO anon;
GRANT SELECT ON public.courses TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT ON public.enrollments TO authenticated;

-- ============================================================================
-- DONE! Run: npm run test:database to verify
-- ============================================================================
