#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 COMPREHENSIVE TABLE SCAN\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Comprehensive list of possible table names
const possibleTables = [
  // Core
  'profiles', 'users', 'accounts', 'programs', 'courses', 'lessons', 'modules',
  'enrollments', 'lesson_progress', 'course_progress', 'module_progress',
  
  // Workforce
  'program_holders', 'delegates', 'case_managers', 'delegate_assignments',
  'case_manager_assignments', 'mou_signatures', 'mous', 'digital_signatures',
  
  // WIOA
  'participant_eligibility', 'attendance_records', 'employment_outcomes',
  'learner_compliance', 'wioa_participants', 'wioa_outcomes',
  
  // Assessments
  'assignments', 'quizzes', 'quiz_questions', 'quiz_attempts', 'quiz_answers',
  'grades', 'rubrics', 'feedback', 'submissions', 'assignment_submissions',
  
  // Certificates
  'certificates', 'certificate_templates', 'certifications',
  
  // Communication
  'announcements', 'messages', 'notifications', 'forums', 'discussion_posts',
  'discussion_replies', 'comments', 'threads', 'posts', 'replies',
  
  // Gamification
  'achievements', 'user_achievements', 'badges', 'user_badges',
  'learning_activity_streaks', 'streaks', 'points', 'leaderboards',
  'rewards', 'levels',
  
  // Admin
  'program_revenue', 'revenue', 'payments', 'transactions',
  'course_tasks', 'tasks', 'todos', 'reminders',
  'roles', 'permissions', 'user_roles', 'role_permissions',
  
  // Content
  'videos', 'video_metadata', 'files', 'file_uploads', 'documents',
  'resources', 'media', 'assets',
  
  // Learning
  'learning_paths', 'pathways', 'journeys', 'competencies', 'skills',
  'outcomes', 'objectives', 'prerequisites',
  
  // Analytics
  'user_activity', 'activity_logs', 'analytics_events', 'events',
  'xapi_statements', 'scorm_packages', 'scorm_data',
  'reports', 'report_templates',
  
  // System
  'audit_logs', 'system_logs', 'error_logs',
  'system_settings', 'settings', 'configurations',
  'email_templates', 'templates', 'notifications_templates',
  
  // Social
  'groups', 'cohorts', 'teams', 'communities',
  'connections', 'followers', 'following',
  
  // Calendar
  'events', 'calendar_events', 'schedules', 'sessions',
  'appointments', 'bookings',
  
  // Surveys
  'surveys', 'survey_questions', 'survey_responses',
  'polls', 'poll_options', 'poll_votes',
  
  // Integrations
  'integrations', 'webhooks', 'api_keys', 'oauth_tokens',
  
  // Misc
  'tags', 'categories', 'labels', 'metadata',
  'favorites', 'bookmarks', 'notes', 'annotations'
];

async function scanAllTables() {
  const existingTables = [];
  const tableInfo = {};
  
  console.log('Scanning for tables... (this may take a minute)\n');
  
  for (const table of possibleTables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (!error) {
        existingTables.push(table);
        tableInfo[table] = count || 0;
      }
    } catch (err) {
      // Table doesn't exist, skip
    }
  }

  // Sort by name
  existingTables.sort();

  console.log('═'.repeat(60));
  console.log(`📊 FOUND ${existingTables.length} TABLES\n`);
  console.log('═'.repeat(60));
  console.log('');

  // Group tables by category
  const categories = {
    'Core LMS': ['profiles', 'users', 'accounts', 'programs', 'courses', 'lessons', 'modules', 'enrollments', 'lesson_progress', 'course_progress', 'module_progress'],
    'Workforce': ['program_holders', 'delegates', 'case_managers', 'delegate_assignments', 'case_manager_assignments', 'mou_signatures', 'mous', 'digital_signatures'],
    'WIOA Compliance': ['participant_eligibility', 'attendance_records', 'employment_outcomes', 'learner_compliance', 'wioa_participants', 'wioa_outcomes'],
    'Assessments': ['assignments', 'quizzes', 'quiz_questions', 'quiz_attempts', 'quiz_answers', 'grades', 'rubrics', 'feedback', 'submissions', 'assignment_submissions'],
    'Certificates': ['certificates', 'certificate_templates', 'certifications'],
    'Communication': ['announcements', 'messages', 'notifications', 'forums', 'discussion_posts', 'discussion_replies', 'comments', 'threads', 'posts', 'replies'],
    'Gamification': ['achievements', 'user_achievements', 'badges', 'user_badges', 'learning_activity_streaks', 'streaks', 'points', 'leaderboards', 'rewards', 'levels'],
    'Admin/Revenue': ['program_revenue', 'revenue', 'payments', 'transactions', 'course_tasks', 'tasks', 'todos', 'reminders'],
    'Roles/Permissions': ['roles', 'permissions', 'user_roles', 'role_permissions'],
    'Content/Media': ['videos', 'video_metadata', 'files', 'file_uploads', 'documents', 'resources', 'media', 'assets'],
    'Learning Paths': ['learning_paths', 'pathways', 'journeys', 'competencies', 'skills', 'outcomes', 'objectives', 'prerequisites'],
    'Analytics': ['user_activity', 'activity_logs', 'analytics_events', 'events', 'xapi_statements', 'scorm_packages', 'scorm_data', 'reports', 'report_templates'],
    'System': ['audit_logs', 'system_logs', 'error_logs', 'system_settings', 'settings', 'configurations', 'email_templates', 'templates', 'notifications_templates'],
    'Social': ['groups', 'cohorts', 'teams', 'communities', 'connections', 'followers', 'following'],
    'Calendar': ['events', 'calendar_events', 'schedules', 'sessions', 'appointments', 'bookings'],
    'Surveys': ['surveys', 'survey_questions', 'survey_responses', 'polls', 'poll_options', 'poll_votes'],
    'Integrations': ['integrations', 'webhooks', 'api_keys', 'oauth_tokens'],
    'Other': ['tags', 'categories', 'labels', 'metadata', 'favorites', 'bookmarks', 'notes', 'annotations']
  };

  for (const [category, tables] of Object.entries(categories)) {
    const found = tables.filter(t => existingTables.includes(t));
    if (found.length > 0) {
      console.log(`\n${category.toUpperCase()} (${found.length}):`);
      found.forEach(table => {
        const rowCount = tableInfo[table];
        console.log(`  ✅ ${table.padEnd(30)} (${rowCount} rows)`);
      });
    }
  }

  // Show any tables not in categories
  const categorizedTables = Object.values(categories).flat();
  const uncategorized = existingTables.filter(t => !categorizedTables.includes(t));
  
  if (uncategorized.length > 0) {
    console.log(`\n\nUNCATEGORIZED (${uncategorized.length}):`);
    uncategorized.forEach(table => {
      const rowCount = tableInfo[table];
      console.log(`  ✅ ${table.padEnd(30)} (${rowCount} rows)`);
    });
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n📈 TOTAL: ${existingTables.length} tables found`);
  console.log('═'.repeat(60));
  console.log('');
}

scanAllTables();
