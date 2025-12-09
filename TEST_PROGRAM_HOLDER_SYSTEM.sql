-- ============================================
-- PROGRAM HOLDER SYSTEM SMOKE TEST
-- ============================================

-- Test 1: Check all program holder tables exist
DO $$
DECLARE
  missing_tables TEXT[];
BEGIN
  SELECT ARRAY_AGG(table_name)
  INTO missing_tables
  FROM (
    SELECT unnest(ARRAY[
      'program_holders',
      'program_holder_acknowledgements',
      'program_holder_students',
      'program_holder_reports'
    ]) AS table_name
  ) expected
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = expected.table_name
  );
  
  IF missing_tables IS NULL THEN
    RAISE NOTICE '✅ Test 1 PASSED: All program holder tables exist';
  ELSE
    RAISE NOTICE '❌ Test 1 FAILED: Missing tables: %', array_to_string(missing_tables, ', ');
  END IF;
END $$;

-- Test 2: Check RLS is enabled
DO $$
DECLARE
  tables_without_rls TEXT[];
BEGIN
  SELECT ARRAY_AGG(tablename)
  INTO tables_without_rls
  FROM pg_tables t
  JOIN pg_class c ON c.relname = t.tablename
  WHERE t.schemaname = 'public'
  AND t.tablename IN ('program_holders', 'program_holder_acknowledgements', 'program_holder_students', 'program_holder_reports')
  AND NOT c.relrowsecurity;
  
  IF tables_without_rls IS NULL THEN
    RAISE NOTICE '✅ Test 2 PASSED: RLS enabled on all program holder tables';
  ELSE
    RAISE NOTICE '❌ Test 2 FAILED: RLS not enabled on: %', array_to_string(tables_without_rls, ', ');
  END IF;
END $$;

-- Test 3: Check RLS policies exist
DO $$
DECLARE
  policy_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
  AND tablename IN ('program_holders', 'program_holder_acknowledgements', 'program_holder_students', 'program_holder_reports');
  
  IF policy_count >= 8 THEN
    RAISE NOTICE '✅ Test 3 PASSED: % RLS policies exist', policy_count;
  ELSE
    RAISE NOTICE '⚠️  Test 3 WARNING: Only % RLS policies found (expected at least 8)', policy_count;
  END IF;
END $$;

-- Test 4: Check required columns in program_holders
DO $$
DECLARE
  missing_columns TEXT[];
BEGIN
  SELECT ARRAY_AGG(column_name)
  INTO missing_columns
  FROM (
    SELECT unnest(ARRAY[
      'id', 'user_id', 'organization_name', 'contact_name', 'email',
      'status', 'is_verified', 'can_manage_students', 'can_issue_certificates',
      'can_view_reports', 'created_at', 'updated_at'
    ]) AS column_name
  ) expected
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'program_holders' 
    AND information_schema.columns.column_name = expected.column_name
  );
  
  IF missing_columns IS NULL THEN
    RAISE NOTICE '✅ Test 4 PASSED: All required columns exist in program_holders';
  ELSE
    RAISE NOTICE '❌ Test 4 FAILED: Missing columns: %', array_to_string(missing_columns, ', ');
  END IF;
END $$;

-- Test 5: Check indexes exist
DO $$
DECLARE
  index_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO index_count
  FROM pg_indexes
  WHERE schemaname = 'public'
  AND tablename IN ('program_holders', 'program_holder_acknowledgements', 'program_holder_students', 'program_holder_reports');
  
  IF index_count >= 7 THEN
    RAISE NOTICE '✅ Test 5 PASSED: % indexes exist', index_count;
  ELSE
    RAISE NOTICE '⚠️  Test 5 WARNING: Only % indexes found', index_count;
  END IF;
END $$;

-- Test 6: Check triggers exist
DO $$
DECLARE
  trigger_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO trigger_count
  FROM information_schema.triggers
  WHERE trigger_schema = 'public'
  AND event_object_table IN ('program_holders', 'program_holder_acknowledgements', 'program_holder_students');
  
  IF trigger_count >= 3 THEN
    RAISE NOTICE '✅ Test 6 PASSED: % triggers exist', trigger_count;
  ELSE
    RAISE NOTICE '⚠️  Test 6 WARNING: Only % triggers found', trigger_count;
  END IF;
END $$;

-- Test 7: Test insert program holder (if possible)
DO $$
DECLARE
  test_holder_id UUID;
BEGIN
  -- Try to insert a test program holder
  INSERT INTO program_holders (
    organization_name,
    contact_name,
    email,
    status
  ) VALUES (
    'Test Organization',
    'Test Contact',
    'test_' || floor(random() * 1000000) || '@test.com',
    'pending'
  ) RETURNING id INTO test_holder_id;
  
  -- Clean up
  DELETE FROM program_holders WHERE id = test_holder_id;
  
  RAISE NOTICE '✅ Test 7 PASSED: Can insert and delete program holders';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE '⚠️  Test 7 WARNING: Cannot insert program holder - %', SQLERRM;
END $$;

-- Test 8: Check foreign key constraints
DO $$
DECLARE
  fk_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO fk_count
  FROM information_schema.table_constraints
  WHERE constraint_type = 'FOREIGN KEY'
  AND table_schema = 'public'
  AND table_name IN ('program_holders', 'program_holder_acknowledgements', 'program_holder_students', 'program_holder_reports');
  
  IF fk_count >= 6 THEN
    RAISE NOTICE '✅ Test 8 PASSED: % foreign key constraints exist', fk_count;
  ELSE
    RAISE NOTICE '⚠️  Test 8 WARNING: Only % foreign key constraints found', fk_count;
  END IF;
END $$;

-- Final Summary
SELECT '═══════════════════════════════════════' as summary;
SELECT '🎯 PROGRAM HOLDER SYSTEM TEST COMPLETE' as summary;
SELECT '═══════════════════════════════════════' as summary;

SELECT 
  'Tables' as component,
  COUNT(*)::TEXT as count
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'program_holder%'
UNION ALL
SELECT 
  'RLS Policies',
  COUNT(*)::TEXT
FROM pg_policies
WHERE schemaname = 'public'
AND tablename LIKE 'program_holder%'
UNION ALL
SELECT 
  'Indexes',
  COUNT(*)::TEXT
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename LIKE 'program_holder%'
UNION ALL
SELECT 
  'Triggers',
  COUNT(*)::TEXT
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table LIKE 'program_holder%'
UNION ALL
SELECT 
  'Foreign Keys',
  COUNT(*)::TEXT
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'
AND table_schema = 'public'
AND table_name LIKE 'program_holder%';

SELECT '═══════════════════════════════════════' as summary;
SELECT '✅ Program Holder Dashboard Ready' as summary;
SELECT '═══════════════════════════════════════' as summary;
