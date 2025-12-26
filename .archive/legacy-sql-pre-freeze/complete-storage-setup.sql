-- COMPLETE STORAGE SETUP - Run this in Supabase SQL Editor
-- This will create missing buckets, update bucket settings, and add all policies

-- ============================================================================
-- STEP 1: CREATE MISSING BUCKETS
-- ============================================================================

-- Create documents bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  10485760, -- 10MB
  NULL
)
ON CONFLICT (id) DO NOTHING;

-- Create media bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  52428800, -- 50MB
  ARRAY['image/*', 'video/*', 'audio/*']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 2: UPDATE EXISTING BUCKETS TO CORRECT PRIVACY SETTINGS
-- ============================================================================

-- Make certificates bucket PRIVATE
UPDATE storage.buckets
SET public = false
WHERE id = 'certificates';

-- Make course-materials bucket PRIVATE
UPDATE storage.buckets
SET public = false
WHERE id = 'course-materials';

-- ============================================================================
-- STEP 3: DROP EXISTING POLICIES (to avoid conflicts)
-- ============================================================================

-- Drop all existing storage policies (we'll recreate them)
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_record.policyname);
    END LOOP;
END $$;

-- ============================================================================
-- STEP 4: CREATE ALL STORAGE POLICIES
-- ============================================================================

-- AVATARS BUCKET
CREATE POLICY "avatars_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "avatars_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "avatars_owner_update" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "avatars_owner_delete" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- PROFILE-AVATARS BUCKET
CREATE POLICY "profile_avatars_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'profile-avatars');
CREATE POLICY "profile_avatars_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-avatars' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "profile_avatars_owner_update" ON storage.objects FOR UPDATE USING (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "profile_avatars_owner_delete" ON storage.objects FOR DELETE USING (bucket_id = 'profile-avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- PROGRAM-COVERS BUCKET
CREATE POLICY "program_covers_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'program-covers');
CREATE POLICY "program_covers_service_all" ON storage.objects FOR ALL USING (bucket_id = 'program-covers') WITH CHECK (bucket_id = 'program-covers');

-- CERTIFICATES BUCKET (PRIVATE)
CREATE POLICY "certificates_owner_read" ON storage.objects FOR SELECT USING (bucket_id = 'certificates' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "certificates_service_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'certificates');

-- COURSE-MATERIALS BUCKET (PRIVATE)
CREATE POLICY "course_materials_enrolled_read" ON storage.objects FOR SELECT USING (bucket_id = 'course-materials' AND auth.role() = 'authenticated' AND EXISTS (SELECT 1 FROM enrollments WHERE user_id = auth.uid() AND status IN ('active', 'completed')));
CREATE POLICY "course_materials_service_all" ON storage.objects FOR ALL USING (bucket_id = 'course-materials') WITH CHECK (bucket_id = 'course-materials');

-- SCORM-PACKAGES BUCKET
CREATE POLICY "scorm_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'scorm-packages');
CREATE POLICY "scorm_service_all" ON storage.objects FOR ALL USING (bucket_id = 'scorm-packages') WITH CHECK (bucket_id = 'scorm-packages');

-- PORTFOLIO BUCKET
CREATE POLICY "portfolio_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "portfolio_owner_all" ON storage.objects FOR ALL USING (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text) WITH CHECK (bucket_id = 'portfolio' AND (storage.foldername(name))[1] = auth.uid()::text);

-- SHOP-ONBOARDING BUCKET (PRIVATE)
CREATE POLICY "shop_owner_read" ON storage.objects FOR SELECT USING (bucket_id = 'shop-onboarding' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "shop_owner_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'shop-onboarding' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "shop_service_all" ON storage.objects FOR ALL USING (bucket_id = 'shop-onboarding') WITH CHECK (bucket_id = 'shop-onboarding');

-- TAX-DOCUMENTS BUCKET (PRIVATE)
CREATE POLICY "tax_owner_read" ON storage.objects FOR SELECT USING (bucket_id = 'tax-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "tax_owner_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tax-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "tax_service_all" ON storage.objects FOR ALL USING (bucket_id = 'tax-documents') WITH CHECK (bucket_id = 'tax-documents');

-- PROGRAM-HOLDER-DOCUMENTS BUCKET (PRIVATE)
CREATE POLICY "program_holder_owner_read" ON storage.objects FOR SELECT USING (bucket_id = 'program-holder-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "program_holder_owner_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'program-holder-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "program_holder_service_all" ON storage.objects FOR ALL USING (bucket_id = 'program-holder-documents') WITH CHECK (bucket_id = 'program-holder-documents');

-- DOCUMENTS BUCKET (PRIVATE - NEW)
CREATE POLICY "documents_owner_read" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "documents_owner_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "documents_owner_update" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "documents_owner_delete" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- MEDIA BUCKET (PUBLIC - NEW)
CREATE POLICY "media_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media_service_all" ON storage.objects FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');

-- ============================================================================
-- STEP 5: VERIFICATION
-- ============================================================================

-- Check all buckets
SELECT 
  id,
  name,
  public,
  file_size_limit,
  created_at
FROM storage.buckets
ORDER BY name;

-- Check all policies
SELECT 
  bucket_id,
  COUNT(*) as policy_count
FROM (
  SELECT 
    CASE 
      WHEN policyname LIKE 'avatars%' THEN 'avatars'
      WHEN policyname LIKE 'profile_avatars%' THEN 'profile-avatars'
      WHEN policyname LIKE 'program_covers%' THEN 'program-covers'
      WHEN policyname LIKE 'certificates%' THEN 'certificates'
      WHEN policyname LIKE 'course_materials%' THEN 'course-materials'
      WHEN policyname LIKE 'scorm%' THEN 'scorm-packages'
      WHEN policyname LIKE 'portfolio%' THEN 'portfolio'
      WHEN policyname LIKE 'shop%' THEN 'shop-onboarding'
      WHEN policyname LIKE 'tax%' THEN 'tax-documents'
      WHEN policyname LIKE 'program_holder%' THEN 'program-holder-documents'
      WHEN policyname LIKE 'documents%' THEN 'documents'
      WHEN policyname LIKE 'media%' THEN 'media'
      ELSE 'other'
    END as bucket_id
  FROM pg_policies
  WHERE schemaname = 'storage' AND tablename = 'objects'
) policies
GROUP BY bucket_id
ORDER BY bucket_id;

-- List all policies
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;
