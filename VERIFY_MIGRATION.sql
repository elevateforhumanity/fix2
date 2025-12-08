-- ============================================
-- MIGRATION VERIFICATION SCRIPT
-- Run this after CREATE_PARTNER_SCORM_TABLES.sql
-- ============================================

-- Check if all tables exist
SELECT 
  '✅ Tables Created' as status,
  COUNT(*) as count,
  STRING_AGG(tablename, ', ') as tables
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
  );

-- Check if views exist
SELECT 
  '✅ Views Created' as status,
  COUNT(*) as count,
  STRING_AGG(viewname, ', ') as views
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'partner_enrollment_summary',
    'scorm_completion_summary'
  );

-- Check if triggers exist
SELECT 
  '✅ Triggers Created' as status,
  COUNT(*) as count,
  STRING_AGG(trigger_name, ', ') as triggers
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name IN (
    'trigger_update_scorm_progress',
    'trigger_sync_partner_progress'
  );

-- Check table structures
SELECT 
  '📊 SCORM Packages Table' as info,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'scorm_packages';

SELECT 
  '📊 SCORM Enrollments Table' as info,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'scorm_enrollments';

-- Test table access
SELECT '🔍 Testing Table Access' as status;

SELECT 'scorm_packages' as table_name, COUNT(*) as row_count FROM scorm_packages
UNION ALL
SELECT 'scorm_enrollments', COUNT(*) FROM scorm_enrollments
UNION ALL
SELECT 'scorm_tracking', COUNT(*) FROM scorm_tracking
UNION ALL
SELECT 'partner_course_mappings', COUNT(*) FROM partner_course_mappings
UNION ALL
SELECT 'external_module_progress', COUNT(*) FROM external_module_progress
UNION ALL
SELECT 'lms_sync_log', COUNT(*) FROM lms_sync_log
UNION ALL
SELECT 'partner_credentials', COUNT(*) FROM partner_credentials;

-- Check indexes
SELECT 
  '📇 Indexes Created' as status,
  COUNT(*) as count
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
    'scorm_packages',
    'scorm_enrollments',
    'scorm_tracking',
    'partner_course_mappings',
    'external_module_progress',
    'lms_sync_log',
    'partner_credentials'
  );

-- Check foreign key constraints
SELECT 
  '🔗 Foreign Keys' as status,
  COUNT(*) as count
FROM information_schema.table_constraints
WHERE constraint_schema = 'public'
  AND constraint_type = 'FOREIGN KEY'
  AND table_name IN (
    'scorm_packages',
    'scorm_enrollments',
    'scorm_tracking',
    'partner_course_mappings',
    'external_module_progress',
    'lms_sync_log',
    'partner_credentials'
  );

-- Final summary
SELECT 
  '🎉 MIGRATION VERIFICATION COMPLETE' as status,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('scorm_packages', 'scorm_enrollments', 'scorm_tracking', 'partner_course_mappings', 'external_module_progress', 'lms_sync_log', 'partner_credentials')) = 7
    THEN '✅ ALL TABLES CREATED'
    ELSE '❌ SOME TABLES MISSING'
  END as tables_status,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_views WHERE schemaname = 'public' AND viewname IN ('partner_enrollment_summary', 'scorm_completion_summary')) = 2
    THEN '✅ ALL VIEWS CREATED'
    ELSE '❌ SOME VIEWS MISSING'
  END as views_status,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public' AND trigger_name IN ('trigger_update_scorm_progress', 'trigger_sync_partner_progress')) = 2
    THEN '✅ ALL TRIGGERS CREATED'
    ELSE '❌ SOME TRIGGERS MISSING'
  END as triggers_status;
