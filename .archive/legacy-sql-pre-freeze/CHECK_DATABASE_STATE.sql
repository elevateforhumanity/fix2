-- ============================================================================
-- DATABASE STATE VERIFICATION
-- Run this in Supabase SQL Editor to see what's actually in your database
-- ============================================================================

-- 1. Check if program_holder_documents table exists
SELECT 
  'program_holder_documents' as table_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'program_holder_documents'
    ) THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status;

-- 2. Check table structure if it exists
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'program_holder_documents'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'program_holder_documents'
ORDER BY policyname;

-- 4. Check storage bucket
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'program-holder-documents';

-- 5. Check storage policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname ILIKE '%program-holder%'
ORDER BY policyname;

-- 6. Check if profiles table has enrollment_status column
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name = 'enrollment_status';

-- 7. Check core tables exist
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables t
      WHERE t.table_schema = 'public' 
      AND t.table_name = tables.table_name
    ) THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (
  VALUES 
    ('programs'),
    ('applications'),
    ('enrollments'),
    ('profiles'),
    ('program_holder_documents')
) AS tables(table_name)
ORDER BY table_name;

-- 8. Check if _migrations tracking table exists
SELECT 
  '_migrations' as table_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = '_migrations'
    ) THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status;

-- 9. If _migrations exists, show recent migrations
SELECT 
  filename,
  executed_at
FROM _migrations
ORDER BY executed_at DESC
LIMIT 20;
