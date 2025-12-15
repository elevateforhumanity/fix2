-- ============================================
-- COMPLETE TABLE VERIFICATION
-- ============================================

-- Check ALL expected tables exist
WITH expected_tables AS (
  SELECT unnest(ARRAY[
    -- Core tables
    'profiles',
    'programs',
    'courses',
    'modules',
    'lessons',
    'enrollments',
    'applications',
    
    -- Learning Management
    'lesson_progress',
    'module_progress',
    'course_progress',
    'student_enrollments',
    'certificates',
    'achievements',
    'badges',
    'user_badges',
    
    -- Partner Integration
    'partner_courses',
    'partner_enrollments',
    'partner_credentials',
    'external_course_links',
    
    -- Content
    'quizzes',
    'quiz_questions',
    'quiz_attempts',
    'quiz_answers',
    'assignments',
    'assignment_submissions',
    'discussions',
    'discussion_replies',
    'resources',
    
    -- Live Learning
    'cohorts',
    'cohort_members',
    'live_sessions',
    'session_attendance',
    'hybrid_schedules',
    'attendance_records',
    
    -- Admin & Management
    'notifications',
    'audit_logs',
    'user_settings',
    'settings',
    'api_keys',
    
    -- Payments & Funding
    'payments',
    'subscriptions',
    'funding_records',
    'invoices',
    'payment_plans',
    
    -- Support & Communication
    'support_tickets',
    'ticket_messages',
    'feedback',
    'announcements',
    'email_templates',
    'email_logs',
    
    -- HR & Payroll
    'hr_documents',
    'payroll_records',
    'payroll_cards',
    'time_tracking',
    
    -- Program Management
    'program_holders',
    'program_holder_acknowledgements',
    'mou_signatures',
    'contact_requests',
    
    -- Skills & Career
    'skills_tracking',
    'job_postings',
    'job_applications',
    'employer_profiles',
    
    -- Marketing & Referrals
    'referral_codes',
    'referral_rewards',
    'email_campaigns',
    'social_media_posts',
    
    -- Events
    'events',
    'event_registrations',
    
    -- Webhooks & Integrations
    'webhooks',
    'webhook_logs',
    'integrations',
    'sso_connections',
    
    -- Content Moderation
    'content_reports',
    'moderation_actions',
    
    -- Analytics
    'user_activity',
    'learning_streaks',
    'leaderboards',
    'web_vitals',
    
    -- Onboarding
    'onboarding_tutorials',
    'tutorial_progress',
    
    -- Phone System
    'call_requests',
    'call_logs'
  ]) AS table_name
),
actual_tables AS (
  SELECT tablename as table_name
  FROM pg_tables
  WHERE schemaname = 'public'
)
SELECT 
  e.table_name,
  CASE 
    WHEN a.table_name IS NULL THEN '❌ MISSING'
    ELSE '✅ EXISTS'
  END as status,
  CASE 
    WHEN a.table_name IS NULL THEN 'NEEDS MIGRATION'
    ELSE 'OK'
  END as action_needed
FROM expected_tables e
LEFT JOIN actual_tables a ON e.table_name = a.table_name
ORDER BY 
  CASE WHEN a.table_name IS NULL THEN 0 ELSE 1 END,
  e.table_name;

-- Count summary
SELECT 
  COUNT(*) FILTER (WHERE status = '✅ EXISTS') as tables_exist,
  COUNT(*) FILTER (WHERE status = '❌ MISSING') as tables_missing,
  COUNT(*) as total_expected
FROM (
  SELECT 
    CASE 
      WHEN a.table_name IS NULL THEN '❌ MISSING'
      ELSE '✅ EXISTS'
    END as status
  FROM (
    SELECT unnest(ARRAY[
      'profiles', 'programs', 'courses', 'modules', 'lessons', 'enrollments', 
      'applications', 'lesson_progress', 'module_progress', 'course_progress',
      'student_enrollments', 'certificates', 'achievements', 'badges', 'user_badges',
      'partner_courses', 'partner_enrollments', 'partner_credentials', 'external_course_links',
      'quizzes', 'quiz_questions', 'quiz_attempts', 'quiz_answers',
      'assignments', 'assignment_submissions', 'discussions', 'discussion_replies', 'resources',
      'cohorts', 'cohort_members', 'live_sessions', 'session_attendance',
      'hybrid_schedules', 'attendance_records', 'notifications', 'audit_logs',
      'user_settings', 'settings', 'api_keys', 'payments', 'subscriptions',
      'funding_records', 'invoices', 'payment_plans', 'support_tickets',
      'ticket_messages', 'feedback', 'announcements', 'email_templates', 'email_logs',
      'hr_documents', 'payroll_records', 'payroll_cards', 'time_tracking',
      'program_holders', 'program_holder_acknowledgements', 'mou_signatures',
      'contact_requests', 'skills_tracking', 'job_postings', 'job_applications',
      'employer_profiles', 'referral_codes', 'referral_rewards', 'email_campaigns',
      'social_media_posts', 'events', 'event_registrations', 'webhooks',
      'webhook_logs', 'integrations', 'sso_connections', 'content_reports',
      'moderation_actions', 'user_activity', 'learning_streaks', 'leaderboards',
      'web_vitals', 'onboarding_tutorials', 'tutorial_progress', 'call_requests', 'call_logs'
    ]) AS table_name
  ) e
  LEFT JOIN pg_tables a ON e.table_name = a.tablename AND a.schemaname = 'public'
) counts;
