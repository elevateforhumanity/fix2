-- ============================================================================
-- COMPLETE DATABASE STATE SCAN
-- Copy and paste this ENTIRE file into Supabase SQL Editor and click RUN
-- This will show you exactly what's in your database right now
-- ============================================================================

-- 1. ALL PUBLIC TABLES
SELECT '=== ALL PUBLIC TABLES ===' as section;
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns c 
   WHERE c.table_name = t.table_name AND c.table_schema = 'public') as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. KEY TABLES STATUS
SELECT '=== KEY TABLES STATUS ===' as section;
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables t
      WHERE t.table_schema = 'public' AND t.table_name = tables.table_name
    ) THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables t
      WHERE t.table_schema = 'public' AND t.table_name = tables.table_name
    ) THEN (
      SELECT COUNT(*)::text FROM information_schema.tables t2
      WHERE t2.table_schema = 'public' AND t2.table_name = tables.table_name
    )
    ELSE '0'
  END as exists_check
FROM (
  VALUES 
    ('programs'),
    ('applications'),
    ('enrollments'),
    ('profiles'),
    ('program_holder_documents'),
    ('organizations'),
    ('_migrations')
) AS tables(table_name)
ORDER BY table_name;

-- 3. PROGRAM_HOLDER_DOCUMENTS TABLE STRUCTURE
SELECT '=== program_holder_documents TABLE STRUCTURE ===' as section;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'program_holder_documents'
ORDER BY ordinal_position;

-- 4. RLS POLICIES ON program_holder_documents
SELECT '=== RLS POLICIES ON program_holder_documents ===' as section;
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies
WHERE tablename = 'program_holder_documents'
ORDER BY policyname;

-- 5. STORAGE BUCKETS
SELECT '=== STORAGE BUCKETS ===' as section;
SELECT 
  id,
  name,
  public,
  file_size_limit / 1024 / 1024 as size_limit_mb,
  created_at
FROM storage.buckets
ORDER BY created_at DESC;

-- 6. STORAGE POLICIES FOR program-holder-documents
SELECT '=== STORAGE POLICIES (program-holder-documents) ===' as section;
SELECT 
  policyname,
  cmd,
  permissive
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname ILIKE '%program-holder%'
ORDER BY policyname;

-- 7. PROFILES TABLE - enrollment_status COLUMN
SELECT '=== PROFILES TABLE - enrollment_status COLUMN ===' as section;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name = 'enrollment_status';

-- 8. ALL PROFILES TABLE COLUMNS
SELECT '=== ALL PROFILES TABLE COLUMNS ===' as section;
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 9. MIGRATION TRACKING
SELECT '=== MIGRATION TRACKING ===' as section;
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = '_migrations'
    ) THEN '✅ _migrations table EXISTS'
    ELSE '❌ _migrations table MISSING'
  END as status;

-- 10. MIGRATION COUNT (if table exists)
SELECT '=== MIGRATION COUNT ===' as section;
SELECT COUNT(*) as total_migrations_executed
FROM _migrations;

-- 11. LAST 20 MIGRATIONS EXECUTED
SELECT '=== LAST 20 MIGRATIONS EXECUTED ===' as section;
SELECT 
  filename,
  executed_at,
  DATE(executed_at) as date
FROM _migrations
ORDER BY executed_at DESC
LIMIT 20;

-- 12. ORGANIZATIONS TABLE CHECK
SELECT '=== ORGANIZATIONS TABLE ===' as section;
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'organizations'
    ) THEN '✅ organizations table EXISTS'
    ELSE '❌ organizations table MISSING'
  END as status;

-- 13. ROW COUNTS FOR KEY TABLES
SELECT '=== ROW COUNTS ===' as section;
SELECT 'programs' as table_name, COUNT(*) as row_count FROM programs
UNION ALL
SELECT 'applications', COUNT(*) FROM applications
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'program_holder_documents', COUNT(*) FROM program_holder_documents
UNION ALL
SELECT '_migrations', COUNT(*) FROM _migrations;

-- 14. SUMMARY - FEATURE READINESS
SELECT '=== FEATURE READINESS SUMMARY ===' as section;
SELECT 
  'Document Upload Table' as feature,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'program_holder_documents'
    ) THEN '✅ READY'
    ELSE '❌ MISSING'
  END as status
UNION ALL
SELECT 
  'Document Storage Bucket',
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM storage.buckets WHERE id = 'program-holder-documents'
    ) THEN '✅ READY'
    ELSE '❌ MISSING'
  END
UNION ALL
SELECT 
  'Enrollment Status Column',
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'enrollment_status'
    ) THEN '✅ READY'
    ELSE '❌ MISSING'
  END
UNION ALL
SELECT 
  'Migration Tracking',
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = '_migrations'
    ) THEN '✅ READY'
    ELSE '❌ MISSING'
  END
UNION ALL
SELECT 
  'Organizations Table',
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'organizations'
    ) THEN '✅ READY'
    ELSE '❌ MISSING'
  END;
