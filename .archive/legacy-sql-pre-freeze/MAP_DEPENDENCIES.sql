-- Map all database dependencies
-- Run this to understand table relationships and dependency order

-- ============================================================================
-- 1. Foreign Key Dependencies (table → references)
-- ============================================================================
SELECT
  tc.table_schema,
  tc.table_name AS from_table,
  kcu.column_name AS from_column,
  ccu.table_name AS to_table,
  ccu.column_name AS to_column,
  tc.constraint_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- ============================================================================
-- 2. Dependency Tree (which tables must exist first)
-- ============================================================================
WITH RECURSIVE dep_tree AS (
  -- Base tables (no dependencies)
  SELECT 
    t.table_name,
    0 AS level,
    ARRAY[t.table_name] AS path
  FROM information_schema.tables t
  WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
    AND NOT EXISTS (
      SELECT 1 
      FROM information_schema.table_constraints tc
      WHERE tc.table_name = t.table_name
        AND tc.table_schema = 'public'
        AND tc.constraint_type = 'FOREIGN KEY'
    )
  
  UNION
  
  -- Tables with dependencies
  SELECT 
    tc.table_name,
    dt.level + 1,
    dt.path || tc.table_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
  JOIN dep_tree dt
    ON dt.table_name = ccu.table_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
    AND NOT (tc.table_name = ANY(dt.path)) -- Prevent cycles
)
SELECT DISTINCT
  level,
  table_name,
  path
FROM dep_tree
ORDER BY level, table_name;

-- ============================================================================
-- 3. Core LMS Tables and Their Dependencies
-- ============================================================================
SELECT 
  t.table_name,
  COUNT(DISTINCT tc.constraint_name) AS foreign_key_count,
  STRING_AGG(DISTINCT ccu.table_name, ', ') AS references_tables
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc
  ON t.table_name = tc.table_name
  AND tc.table_schema = 'public'
  AND tc.constraint_type = 'FOREIGN KEY'
LEFT JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
  AND t.table_name IN (
    'programs', 'modules', 'lessons', 'courses', 'course_modules',
    'enrollments', 'lesson_progress', 'module_progress',
    'applications', 'profiles', 'certificates'
  )
GROUP BY t.table_name
ORDER BY foreign_key_count, t.table_name;

-- ============================================================================
-- 4. Views (depend on tables)
-- ============================================================================
SELECT 
  table_schema,
  table_name AS view_name,
  view_definition
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- ============================================================================
-- 5. Functions (may depend on tables)
-- ============================================================================
SELECT 
  n.nspname AS schema_name,
  p.proname AS function_name,
  pg_get_function_arguments(p.oid) AS arguments,
  pg_get_functiondef(p.oid) AS definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.prokind = 'f' -- Functions only (not aggregates or procedures)
ORDER BY p.proname;

-- ============================================================================
-- 6. Triggers (depend on tables and functions)
-- ============================================================================
SELECT 
  event_object_schema AS schema_name,
  event_object_table AS table_name,
  trigger_name,
  event_manipulation AS event,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- ============================================================================
-- 7. Critical Path: Programs → Modules → Lessons → Progress
-- ============================================================================
SELECT 
  'programs' AS table_name,
  0 AS dependency_level,
  'Base table - no dependencies' AS notes
UNION ALL
SELECT 
  'modules',
  1,
  'Depends on: programs'
UNION ALL
SELECT 
  'lessons',
  2,
  'Depends on: modules'
UNION ALL
SELECT 
  'enrollments',
  1,
  'Depends on: programs, auth.users'
UNION ALL
SELECT 
  'lesson_progress',
  3,
  'Depends on: enrollments, lessons'
UNION ALL
SELECT 
  'certificates',
  2,
  'Depends on: enrollments or programs'
ORDER BY dependency_level, table_name;
