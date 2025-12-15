-- ============================================
-- COURSE COMPLETION FEATURES VERIFICATION
-- ============================================

-- 1. Check completion tracking tables
SELECT 'Completion Tables Check' as section;
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND information_schema.tables.table_name = t.table_name)
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (VALUES 
  ('lesson_progress'),
  ('module_progress'),
  ('course_progress'),
  ('enrollments'),
  ('certificates'),
  ('achievements'),
  ('badges'),
  ('user_badges')
) AS t(table_name);

-- 2. Check lesson_progress structure
SELECT 'Lesson Progress Columns' as section;
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'lesson_progress'
ORDER BY ordinal_position;

-- 3. Check module_progress structure
SELECT 'Module Progress Columns' as section;
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'module_progress'
ORDER BY ordinal_position;

-- 4. Check enrollments completion tracking
SELECT 'Enrollments Completion Tracking' as section;
SELECT 
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'enrollments'
AND column_name IN ('status', 'progress_percentage', 'completed_at', 'certificate_issued_at')
ORDER BY ordinal_position;

-- 5. Sample lesson progress data
SELECT 'Sample Lesson Progress' as section;
SELECT 
  lp.id,
  lp.user_id,
  lp.lesson_id,
  lp.status,
  lp.progress_percentage,
  lp.completed_at,
  l.title as lesson_title
FROM lesson_progress lp
LEFT JOIN lessons l ON lp.lesson_id = l.id
ORDER BY lp.updated_at DESC
LIMIT 10;

-- 6. Sample module progress data
SELECT 'Sample Module Progress' as section;
SELECT 
  mp.id,
  mp.user_id,
  mp.module_id,
  mp.status,
  mp.progress_percentage,
  mp.completed_at,
  m.title as module_title
FROM module_progress mp
LEFT JOIN modules m ON mp.module_id = m.id
ORDER BY mp.updated_at DESC
LIMIT 10;

-- 7. Check certificates issued
SELECT 'Certificates Issued' as section;
SELECT 
  c.id,
  c.user_id,
  c.program_id,
  c.course_id,
  c.certificate_type,
  c.issued_at,
  c.certificate_url,
  p.title as program_title
FROM certificates c
LEFT JOIN programs p ON c.program_id = p.id
ORDER BY c.issued_at DESC
LIMIT 10;

-- 8. Check achievements system
SELECT 'Achievements Summary' as section;
SELECT 
  achievement_type,
  COUNT(*) as achievement_count
FROM achievements
GROUP BY achievement_type
ORDER BY achievement_count DESC;

-- 9. Check user badges
SELECT 'User Badges Summary' as section;
SELECT 
  b.name as badge_name,
  COUNT(ub.id) as users_earned,
  b.badge_type
FROM user_badges ub
JOIN badges b ON ub.badge_id = b.id
GROUP BY b.name, b.badge_type
ORDER BY users_earned DESC
LIMIT 10;

-- 10. Completion statistics
SELECT 'Completion Statistics' as section;
SELECT 
  (SELECT COUNT(*) FROM lesson_progress WHERE status = 'completed') as lessons_completed,
  (SELECT COUNT(*) FROM module_progress WHERE status = 'completed') as modules_completed,
  (SELECT COUNT(*) FROM enrollments WHERE status = 'completed') as courses_completed,
  (SELECT COUNT(*) FROM certificates) as certificates_issued,
  (SELECT COUNT(DISTINCT user_id) FROM certificates) as unique_certificate_holders;

-- 11. Check completion triggers/functions
SELECT 'Completion Functions' as section;
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND (
  routine_name LIKE '%completion%' OR
  routine_name LIKE '%progress%' OR
  routine_name LIKE '%certificate%'
)
ORDER BY routine_name;

-- 12. Check for completion views
SELECT 'Completion Views' as section;
SELECT 
  table_name as view_name,
  view_definition
FROM information_schema.views
WHERE table_schema = 'public'
AND (
  table_name LIKE '%completion%' OR
  table_name LIKE '%progress%'
)
ORDER BY table_name;

-- 13. User completion rates
SELECT 'User Completion Rates' as section;
SELECT 
  e.user_id,
  COUNT(e.id) as total_enrollments,
  COUNT(e.id) FILTER (WHERE e.status = 'completed') as completed_enrollments,
  ROUND(
    COUNT(e.id) FILTER (WHERE e.status = 'completed')::numeric / 
    NULLIF(COUNT(e.id), 0) * 100, 
    2
  ) as completion_rate_percentage
FROM enrollments e
GROUP BY e.user_id
HAVING COUNT(e.id) > 0
ORDER BY completion_rate_percentage DESC
LIMIT 10;

-- 14. Program completion rates
SELECT 'Program Completion Rates' as section;
SELECT 
  p.title as program_title,
  COUNT(e.id) as total_enrollments,
  COUNT(e.id) FILTER (WHERE e.status = 'completed') as completed_enrollments,
  ROUND(
    COUNT(e.id) FILTER (WHERE e.status = 'completed')::numeric / 
    NULLIF(COUNT(e.id), 0) * 100, 
    2
  ) as completion_rate_percentage
FROM enrollments e
JOIN programs p ON e.program_id = p.id
GROUP BY p.id, p.title
HAVING COUNT(e.id) > 0
ORDER BY completion_rate_percentage DESC;
