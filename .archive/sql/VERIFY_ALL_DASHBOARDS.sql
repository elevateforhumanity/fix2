-- ============================================
-- DASHBOARD FUNCTIONALITY VERIFICATION
-- ============================================

-- 1. Admin Dashboard - Check required data
SELECT 'Admin Dashboard Data' as section;
SELECT 
  (SELECT COUNT(*) FROM profiles WHERE role = 'admin') as admin_count,
  (SELECT COUNT(*) FROM profiles WHERE role = 'student') as student_count,
  (SELECT COUNT(*) FROM profiles WHERE role = 'instructor') as instructor_count,
  (SELECT COUNT(*) FROM programs) as total_programs,
  (SELECT COUNT(*) FROM courses) as total_courses,
  (SELECT COUNT(*) FROM enrollments) as total_enrollments,
  (SELECT COUNT(*) FROM applications) as total_applications;

-- 2. Student Dashboard - Check required tables
SELECT 'Student Dashboard Tables' as section;
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND information_schema.tables.table_name = t.table_name)
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (VALUES 
  ('enrollments'),
  ('lesson_progress'),
  ('module_progress'),
  ('certificates'),
  ('achievements'),
  ('user_badges'),
  ('learning_streaks')
) AS t(table_name);

-- 3. Program Dashboard - Check program-specific data
SELECT 'Program Dashboard Data' as section;
SELECT 
  p.id,
  p.title,
  p.slug,
  COUNT(DISTINCT c.id) as courses_count,
  COUNT(DISTINCT m.id) as modules_count,
  COUNT(DISTINCT l.id) as lessons_count,
  COUNT(DISTINCT e.id) as enrollments_count
FROM programs p
LEFT JOIN courses c ON c.program_id = p.id
LEFT JOIN modules m ON m.course_id = c.id
LEFT JOIN lessons l ON l.module_id = m.id
LEFT JOIN enrollments e ON e.program_id = p.id
GROUP BY p.id, p.title, p.slug
ORDER BY p.title
LIMIT 10;

-- 4. Instructor Dashboard - Check instructor data
SELECT 'Instructor Dashboard Data' as section;
SELECT 
  (SELECT COUNT(*) FROM profiles WHERE role = 'instructor') as total_instructors,
  (SELECT COUNT(DISTINCT instructor_id) FROM courses WHERE instructor_id IS NOT NULL) as instructors_with_courses,
  (SELECT COUNT(*) FROM courses WHERE instructor_id IS NOT NULL) as courses_with_instructors;

-- 5. Analytics Dashboard - Check analytics tables
SELECT 'Analytics Tables' as section;
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND information_schema.tables.table_name = t.table_name)
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (VALUES 
  ('user_activity'),
  ('web_vitals'),
  ('audit_logs'),
  ('learning_streaks'),
  ('leaderboards')
) AS t(table_name);

-- 6. Check dashboard views exist
SELECT 'Dashboard Views' as section;
SELECT 
  table_name as view_name,
  CASE 
    WHEN table_type = 'VIEW' THEN '✅ VIEW'
    WHEN table_type = 'BASE TABLE' THEN '✅ TABLE'
    ELSE table_type
  END as type
FROM information_schema.tables
WHERE table_schema = 'public'
AND (
  table_name LIKE '%dashboard%' OR
  table_name LIKE '%summary%' OR
  table_name LIKE '%stats%'
)
ORDER BY table_name;

-- 7. Check RLS policies for dashboard tables
SELECT 'Dashboard RLS Policies' as section;
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN (
  'enrollments', 'lesson_progress', 'module_progress', 
  'certificates', 'achievements', 'user_badges',
  'user_activity', 'audit_logs'
)
GROUP BY tablename
ORDER BY tablename;

-- 8. Sample enrollment data for student dashboard
SELECT 'Sample Student Enrollment Data' as section;
SELECT 
  e.id,
  e.user_id,
  e.program_id,
  e.status,
  e.progress_percentage,
  p.title as program_title,
  e.enrolled_at
FROM enrollments e
JOIN programs p ON e.program_id = p.id
ORDER BY e.enrolled_at DESC
LIMIT 5;

-- 9. Sample progress data for dashboards
SELECT 'Sample Progress Data' as section;
SELECT 
  'Lesson Progress' as type,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE status = 'completed') as completed,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress
FROM lesson_progress
UNION ALL
SELECT 
  'Module Progress',
  COUNT(*),
  COUNT(*) FILTER (WHERE status = 'completed'),
  COUNT(*) FILTER (WHERE status = 'in_progress')
FROM module_progress;

-- 10. Check for dashboard API endpoints data
SELECT 'Dashboard API Data Availability' as section;
SELECT 
  'Programs' as endpoint,
  COUNT(*) as record_count,
  COUNT(*) FILTER (WHERE status = 'published') as published_count
FROM programs
UNION ALL
SELECT 
  'Courses',
  COUNT(*),
  COUNT(*) FILTER (WHERE status = 'published')
FROM courses
UNION ALL
SELECT 
  'Enrollments',
  COUNT(*),
  COUNT(*) FILTER (WHERE status = 'active')
FROM enrollments
UNION ALL
SELECT 
  'Applications',
  COUNT(*),
  COUNT(*) FILTER (WHERE status = 'pending')
FROM applications;

-- 11. Check notification system for dashboards
SELECT 'Notification System' as section;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications')
    THEN '✅ Notifications table exists'
    ELSE '❌ Notifications table missing'
  END as notifications_status,
  (SELECT COUNT(*) FROM notifications WHERE read_at IS NULL) as unread_notifications,
  (SELECT COUNT(DISTINCT user_id) FROM notifications) as users_with_notifications;

-- 12. Check settings for dashboard customization
SELECT 'Dashboard Settings' as section;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_settings')
    THEN '✅ User settings table exists'
    ELSE '❌ User settings table missing'
  END as settings_status,
  (SELECT COUNT(*) FROM user_settings) as total_user_settings;

-- 13. Overall dashboard health summary
SELECT 'Dashboard Health Summary' as section;
SELECT 
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('enrollments', 'lesson_progress', 'module_progress', 'certificates', 'achievements')) as critical_tables_exist,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('enrollments', 'lesson_progress', 'certificates')) as critical_policies_exist,
  (SELECT COUNT(*) FROM programs WHERE status = 'published') as active_programs,
  (SELECT COUNT(*) FROM enrollments WHERE status = 'active') as active_enrollments,
  (SELECT COUNT(DISTINCT user_id) FROM enrollments) as unique_enrolled_users;
