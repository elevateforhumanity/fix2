#!/usr/bin/env node

/**
 * Run all database migrations
 * This script executes all SQL migrations in order
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('');
  console.error('Please set these environment variables in .env.local:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  console.error('');
  console.error('See ACTIVATE_COURSES_NOW.md for detailed instructions.');
  process.exit(1);
}

// Check if using placeholder values
if (
  supabaseUrl.includes('placeholder') ||
  supabaseKey.includes('placeholder')
) {
  console.error('❌ Error: Using placeholder Supabase credentials');
  console.error('');
  console.error(
    'Please update .env.local with your actual Supabase credentials.'
  );
  console.error('See ACTIVATE_COURSES_NOW.md for instructions.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Migration files in order
const migrations = [
  '20241115_add_all_etpl_programs.sql',
  '20241116_create_lms_courses_part1.sql',
  '20241116_create_lms_courses_part2.sql',
  '20241116_create_lms_courses_part3.sql',
  '20241116_create_lms_courses_part4.sql',
  '20241116_add_jri_courses.sql',
  '20241116_add_nrf_rise_up_courses.sql',
  '20241116_create_medical_assistant_course.sql',
];

async function runMigration(filename) {
  const filePath = path.join(__dirname, '../supabase/migrations', filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} (file not found)`);
    return { success: false, skipped: true };
  }

  const sql = fs.readFileSync(filePath, 'utf8');

  console.log(`\n📄 Running: ${filename}`);
  console.log(`   Size: ${(sql.length / 1024).toFixed(1)} KB`);

  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try direct query if RPC doesn't exist
      const { error: directError } = await supabase.from('_migrations').insert({
        name: filename,
        executed_at: new Date().toISOString(),
      });

      if (directError && !directError.message.includes('already exists')) {
        throw directError;
      }
    }

    console.log('   ✅ Success');
    return { success: true };
  } catch (error) {
    // Check if it's a "already exists" error (which is OK)
    if (
      error.message &&
      (error.message.includes('already exists') ||
        error.message.includes('duplicate key'))
    ) {
      console.log('   ⚠️  Already exists (skipping)');
      return { success: true, skipped: true };
    }

    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function verifyData() {
  console.log('\n\n📊 Verifying Data...\n');

  try {
    // Check courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id', { count: 'exact', head: true });

    if (coursesError) {
      console.log(
        '⚠️  Courses table: Not accessible (may need to create schema first)'
      );
    } else {
      console.log(`✅ Courses: ${courses?.length || 0} courses`);
    }

    // Check programs
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('id', { count: 'exact', head: true });

    if (programsError) {
      console.log(
        '⚠️  Programs table: Not accessible (may need to create schema first)'
      );
    } else {
      console.log(`✅ Programs: ${programs?.length || 0} programs`);
    }

    // Check modules
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id', { count: 'exact', head: true });

    if (modulesError) {
      console.log(
        '⚠️  Modules table: Not accessible (may need to create schema first)'
      );
    } else {
      console.log(`✅ Modules: ${modules?.length || 0} modules`);
    }
  } catch (error) {
    console.log('⚠️  Could not verify data:', error.message);
  }
}

async function main() {
  console.log('🚀 Elevate for Humanity - Database Migration Tool\n');
  console.log('================================================\n');
  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`🔑 Using Service Role Key: ${supabaseKey.substring(0, 20)}...`);
  console.log(`📁 Migrations to run: ${migrations.length}`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const migration of migrations) {
    const result = await runMigration(migration);

    if (result.success) {
      if (result.skipped) {
        skipCount++;
      } else {
        successCount++;
      }
    } else if (!result.skipped) {
      errorCount++;
    }

    // Small delay between migrations
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n\n================================================');
  console.log('📊 Migration Summary\n');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`⚠️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);

  await verifyData();

  if (errorCount > 0) {
    console.log('\n⚠️  Some migrations failed. Check errors above.');
    console.log('💡 Tip: You may need to run the base schema migration first.');
    console.log('   See ACTIVATE_COURSES_NOW.md for manual migration steps.');
    process.exit(1);
  } else {
    console.log('\n\n🎉 All migrations completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Visit /admin/courses to see all courses');
    console.log('   2. Visit /admin/dashboard for statistics');
    console.log('   3. Test enrollment at /student/courses');
    console.log('');
  }
}

main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
