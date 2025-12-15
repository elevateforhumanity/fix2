-- ============================================================================
-- SUPABASE STORAGE BUCKETS SETUP
-- Complete list of all storage buckets needed for the platform
-- ============================================================================

-- 1. CERTIFICATES BUCKET (Already created)
-- For storing generated certificates
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  true,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

-- 2. MEDIA BUCKET (Already created)
-- For general media files (images, videos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 3. DOCUMENTS BUCKET (Already created)
-- For private documents (applications, forms)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- 4. AVATARS/PROFILES BUCKET (MISSING - NEEDS TO BE ADDED)
-- For user profile pictures and avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 5. AGREEMENTS BUCKET (Already created)
-- For MOUs and legal agreements
INSERT INTO storage.buckets (id, name, public)
VALUES ('agreements', 'agreements', false)
ON CONFLICT (id) DO NOTHING;

-- 6. MOUS BUCKET (Already created)
-- For memorandums of understanding
INSERT INTO storage.buckets (id, name, public)
VALUES ('mous', 'mous', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- AVATARS BUCKET POLICIES
-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to avatars
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- MEDIA BUCKET POLICIES
CREATE POLICY "Authenticated users can upload to media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- DOCUMENTS BUCKET POLICIES
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- CERTIFICATES BUCKET POLICIES
CREATE POLICY "Authenticated users can view certificates"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'certificates');

CREATE POLICY "System can create certificates"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates');

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- Check all buckets are created
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets
ORDER BY name;

-- Expected buckets:
-- 1. agreements (private)
-- 2. avatars (public) ← THIS IS THE MISSING ONE
-- 3. certificates (public)
-- 4. documents (private)
-- 5. media (public)
-- 6. mous (private)

-- ============================================================================
-- SUMMARY
-- ============================================================================

/*
STORAGE BUCKETS STATUS:

✅ certificates - For generated certificates (PDF, PNG, JPEG)
✅ media - For general media files (public)
✅ documents - For private documents (applications, forms)
❌ avatars - For user profile pictures (MISSING - NEEDS TO BE ADDED)
✅ agreements - For MOUs and legal agreements (private)
✅ mous - For memorandums of understanding (private)

ACTION REQUIRED:
Run this SQL in Supabase SQL Editor to create the missing 'avatars' bucket.

The avatars bucket will:
- Store user profile pictures
- Allow 2MB max file size
- Accept JPEG, PNG, WebP, GIF formats
- Be publicly readable
- Allow users to manage their own avatars
*/
