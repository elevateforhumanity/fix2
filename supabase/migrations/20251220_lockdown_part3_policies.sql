-- LOCKDOWN PART 3: Add Day-1 Allow Policies
-- Run this third - opens only essential tables

-- Profiles: Users can read/update their own
CREATE POLICY "users_read_own_profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "users_update_own_profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Programs: Public read
CREATE POLICY "public_read_programs" ON public.programs
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Courses: Public read
CREATE POLICY "public_read_courses" ON public.courses
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR status = 'published');

-- LMS Courses: Public read
CREATE POLICY "public_read_lms_courses" ON public.lms_courses
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Partner Courses: Public read
CREATE POLICY "public_read_partner_courses" ON public.partner_courses
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Partner Providers: Public read
CREATE POLICY "public_read_partner_providers" ON public.partner_lms_providers
  FOR SELECT TO anon, authenticated
  USING (active = true OR is_active = true);

-- Drug Testing Services: Public read
CREATE POLICY "public_read_drug_testing_services" ON public.drug_testing_services
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Drug Testing Training: Public read
CREATE POLICY "public_read_drug_testing_training" ON public.drug_testing_training
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Applications: Users can create and read their own
CREATE POLICY "users_create_applications" ON public.applications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_read_own_applications" ON public.applications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Enrollments: Users can read their own
CREATE POLICY "users_read_own_enrollments" ON public.enrollments
  FOR SELECT TO authenticated
  USING (auth.uid() = student_id OR auth.uid() = user_id);
