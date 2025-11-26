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

console.log('🔍 Listing ALL Tables in Supabase Database\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listAllTables() {
  try {
    // Query information_schema to get all tables
    const { data, error } = await supabase
      .rpc('exec_sql', {
        query: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      });

    if (error) {
      // If RPC doesn't work, try a different approach
      console.log('Trying alternate method to list tables...\n');
      
      // Get a list of common table names and check each one
      const possibleTables = [
        'profiles', 'users', 'programs', 'courses', 'lessons', 'enrollments',
        'lesson_progress', 'program_holders', 'delegates', 'delegate_assignments',
        'participant_eligibility', 'attendance_records', 'employment_outcomes',
        'learner_compliance', 'achievements', 'user_achievements',
        'learning_activity_streaks', 'program_revenue', 'course_tasks',
        'announcements', 'forums', 'mou_signatures', 'certificates',
        'user_activity', 'notifications', 'messages', 'assignments',
        'quizzes', 'quiz_questions', 'quiz_attempts', 'grades',
        'rubrics', 'feedback', 'discussion_posts', 'discussion_replies',
        'learning_paths', 'competencies', 'skills', 'badges',
        'leaderboards', 'cohorts', 'groups', 'roles', 'permissions',
        'audit_logs', 'system_settings', 'email_templates',
        'file_uploads', 'video_metadata', 'scorm_packages',
        'xapi_statements', 'analytics_events', 'reports'
      ];

      const existingTables = [];
      
      for (const table of possibleTables) {
        const { error: checkError } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (!checkError) {
          existingTables.push(table);
        }
      }

      console.log(`📊 Found ${existingTables.length} tables:\n`);
      existingTables.forEach((table, index) => {
        console.log(`${index + 1}. ${table}`);
      });

      return;
    }

    console.log(`📊 Found ${data?.length || 0} tables:\n`);
    data?.forEach((row, index) => {
      console.log(`${index + 1}. ${row.table_name}`);
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

listAllTables();
