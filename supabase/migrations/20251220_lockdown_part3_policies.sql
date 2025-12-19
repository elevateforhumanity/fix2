-- LOCKDOWN PART 3: Add Day-1 Allow Policies
-- Run this third - opens only essential tables
-- Only creates policies for tables that exist

DO $$
BEGIN
  -- Profiles: Users can read/update their own
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    EXECUTE 'CREATE POLICY "users_read_own_profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id)';
    EXECUTE 'CREATE POLICY "users_update_own_profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id)';
  END IF;

  -- Programs: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'programs') THEN
    EXECUTE 'CREATE POLICY "public_read_programs" ON public.programs FOR SELECT TO anon, authenticated USING (is_active = true)';
  END IF;

  -- Courses: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'courses') THEN
    EXECUTE 'CREATE POLICY "public_read_courses" ON public.courses FOR SELECT TO anon, authenticated USING (is_published = true OR status = ''published'')';
  END IF;

  -- Partner Courses: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'partner_courses') THEN
    EXECUTE 'CREATE POLICY "public_read_partner_courses" ON public.partner_courses FOR SELECT TO anon, authenticated USING (active = true)';
  END IF;

  -- Partner Providers: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'partner_lms_providers') THEN
    EXECUTE 'CREATE POLICY "public_read_partner_providers" ON public.partner_lms_providers FOR SELECT TO anon, authenticated USING (active = true OR is_active = true)';
  END IF;

  -- Drug Testing Services: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'drug_testing_services') THEN
    EXECUTE 'CREATE POLICY "public_read_drug_testing_services" ON public.drug_testing_services FOR SELECT TO anon, authenticated USING (is_active = true)';
  END IF;

  -- Drug Testing Training: Public read
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'drug_testing_training') THEN
    EXECUTE 'CREATE POLICY "public_read_drug_testing_training" ON public.drug_testing_training FOR SELECT TO anon, authenticated USING (is_active = true)';
  END IF;

  -- Applications: Users can create and read their own
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'applications') THEN
    EXECUTE 'CREATE POLICY "users_create_applications" ON public.applications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "users_read_own_applications" ON public.applications FOR SELECT TO authenticated USING (auth.uid() = user_id)';
  END IF;

  -- Enrollments: Users can read their own
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'enrollments') THEN
    EXECUTE 'CREATE POLICY "users_read_own_enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = student_id OR auth.uid() = user_id)';
  END IF;
  
EXCEPTION WHEN OTHERS THEN
  -- If any policy already exists, skip it
  NULL;
END $$;
