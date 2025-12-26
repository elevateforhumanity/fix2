-- =====================================================
-- VERIFY ALL MIGRATIONS HAVE RUN
-- Run this in Supabase SQL Editor to check status
-- =====================================================

-- 1. Check if tax_appointments table exists
SELECT 
  'tax_appointments' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'tax_appointments'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 2. Check if tax_document_uploads table exists
SELECT 
  'tax_document_uploads' as table_name,
  CASE WHEN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'tax_document_uploads'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 3. Check if tax-documents bucket exists
SELECT 
  'tax-documents' as bucket_name,
  CASE WHEN EXISTS (
    SELECT FROM storage.buckets 
    WHERE id = 'tax-documents'
  ) THEN '✅ EXISTS' ELSE '❌ MISSING' END as status;

-- 4. Check RLS is enabled
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('tax_appointments', 'tax_document_uploads');

-- 5. Count RLS policies
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('tax_appointments', 'tax_document_uploads')
GROUP BY tablename;

-- 6. Check helper functions exist
SELECT 
  routine_name,
  '✅ EXISTS' as status
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('get_tax_appointment_stats', 'get_tax_document_stats');

-- 7. Check all portal tables exist
SELECT 
  table_name,
  '✅ EXISTS' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'profiles',
  'courses',
  'lessons',
  'enrollments',
  'programs',
  'applications',
  'employers',
  'partners'
)
ORDER BY table_name;

-- 8. Summary Report
SELECT 
  'TOTAL TABLES' as metric,
  COUNT(*)::text as value
FROM information_schema.tables 
WHERE table_schema = 'public'
UNION ALL
SELECT 
  'TOTAL STORAGE BUCKETS' as metric,
  COUNT(*)::text as value
FROM storage.buckets
UNION ALL
SELECT 
  'TOTAL RLS POLICIES' as metric,
  COUNT(*)::text as value
FROM pg_policies 
WHERE schemaname = 'public'
UNION ALL
SELECT 
  'TOTAL FUNCTIONS' as metric,
  COUNT(*)::text as value
FROM information_schema.routines
WHERE routine_schema = 'public';
