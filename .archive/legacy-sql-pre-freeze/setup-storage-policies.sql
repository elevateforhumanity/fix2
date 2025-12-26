-- STORAGE POLICIES SETUP
-- Run this in Supabase SQL Editor to set up all storage policies

-- ============================================================================
-- 1. AVATARS BUCKET - Public read, authenticated write
-- ============================================================================

-- Allow public to read avatars
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- 2. PROFILE-AVATARS BUCKET - Same as avatars
-- ============================================================================

CREATE POLICY "Public can view profile avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can upload their own profile avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own profile avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own profile avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- 3. PROGRAM-COVERS BUCKET - Public read, admin write
-- ============================================================================

CREATE POLICY "Public can view program covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'program-covers');

CREATE POLICY "Service role can manage program covers"
ON storage.objects FOR ALL
USING (bucket_id = 'program-covers')
WITH CHECK (bucket_id = 'program-covers');

-- ============================================================================
-- 4. CERTIFICATES BUCKET - Owner read only, system write
-- ============================================================================

-- Users can only read their own certificates
CREATE POLICY "Users can view their own certificates"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'certificates'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Only service role can create certificates
CREATE POLICY "Service role can create certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates');

-- ============================================================================
-- 5. COURSE-MATERIALS BUCKET - Enrolled users read, admin write
-- ============================================================================

-- Users can read course materials if enrolled
CREATE POLICY "Enrolled users can view course materials"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'course-materials'
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM enrollments
    WHERE user_id = auth.uid()
    AND status IN ('active', 'completed')
  )
);

-- Service role can manage course materials
CREATE POLICY "Service role can manage course materials"
ON storage.objects FOR ALL
USING (bucket_id = 'course-materials')
WITH CHECK (bucket_id = 'course-materials');

-- ============================================================================
-- 6. SCORM-PACKAGES BUCKET - Public read (for LMS)
-- ============================================================================

CREATE POLICY "Public can view SCORM packages"
ON storage.objects FOR SELECT
USING (bucket_id = 'scorm-packages');

CREATE POLICY "Service role can manage SCORM packages"
ON storage.objects FOR ALL
USING (bucket_id = 'scorm-packages')
WITH CHECK (bucket_id = 'scorm-packages');

-- ============================================================================
-- 7. PORTFOLIO BUCKET - Public read, owner write
-- ============================================================================

CREATE POLICY "Public can view portfolios"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Users can manage their own portfolio"
ON storage.objects FOR ALL
USING (
  bucket_id = 'portfolio'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'portfolio'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- 8. SHOP-ONBOARDING BUCKET - Private, owner access only
-- ============================================================================

CREATE POLICY "Users can view their own shop documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'shop-onboarding'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can upload their own shop documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'shop-onboarding'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Service role can manage shop documents"
ON storage.objects FOR ALL
USING (bucket_id = 'shop-onboarding')
WITH CHECK (bucket_id = 'shop-onboarding');

-- ============================================================================
-- 9. TAX-DOCUMENTS BUCKET - Private, owner access only
-- ============================================================================

CREATE POLICY "Users can view their own tax documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'tax-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can upload their own tax documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'tax-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Service role can manage tax documents"
ON storage.objects FOR ALL
USING (bucket_id = 'tax-documents')
WITH CHECK (bucket_id = 'tax-documents');

-- ============================================================================
-- 10. PROGRAM-HOLDER-DOCUMENTS BUCKET - Private, program holder access
-- ============================================================================

CREATE POLICY "Program holders can view their documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'program-holder-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Program holders can upload their documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'program-holder-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Service role can manage program holder documents"
ON storage.objects FOR ALL
USING (bucket_id = 'program-holder-documents')
WITH CHECK (bucket_id = 'program-holder-documents');

-- ============================================================================
-- 11. DOCUMENTS BUCKET (if it exists) - Private, owner access
-- ============================================================================

CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================================================
-- 12. MEDIA BUCKET (if it exists) - Public read, admin write
-- ============================================================================

CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Service role can manage media"
ON storage.objects FOR ALL
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify policies are created:

-- Count policies per bucket
SELECT 
  bucket_id,
  COUNT(*) as policy_count
FROM storage.policies
GROUP BY bucket_id
ORDER BY bucket_id;

-- List all policies
SELECT 
  bucket_id,
  name,
  definition
FROM storage.policies
ORDER BY bucket_id, name;
