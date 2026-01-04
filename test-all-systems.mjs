#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function testAllSystems() {
  console.log('🔍 TESTING ALL SYSTEMS AFTER SQL RUN...\n');
  console.log('='.repeat(60));

  const results = {
    working: [],
    broken: []
  };

  // Test all tables
  const tables = [
    'documents',
    'document_requirements',
    'document_signatures',
    'program_holder_documents',
    'tax_documents',
    'payment_records',
    'onboarding_steps',
    'messages',
    'partner_enrollments',
    'partner_lms_courses',
    'partner_lms_enrollments',
    'partner_applications',
    'partner_completions'
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        results.broken.push({ table, error: error.message });
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        results.working.push(table);
        console.log(`✅ ${table}: EXISTS`);
      }
    } catch (err) {
      results.broken.push({ table, error: err.message });
      console.log(`❌ ${table}: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`✅ Working: ${results.working.length}/${tables.length}`);
  console.log(`❌ Broken: ${results.broken.length}/${tables.length}`);

  if (results.broken.length > 0) {
    console.log('\n⚠️  BROKEN TABLES:');
    results.broken.forEach(({ table, error }) => {
      console.log(`   ❌ ${table}: ${error}`);
    });
  }

  // Check document requirements count
  console.log('\n' + '='.repeat(60));
  console.log('📋 DOCUMENT REQUIREMENTS\n');
  
  const { data: reqs, error: reqError } = await supabase
    .from('document_requirements')
    .select('role, document_type, is_required');

  if (!reqError && reqs) {
    const byRole = {};
    reqs.forEach(r => {
      if (!byRole[r.role]) byRole[r.role] = { required: 0, optional: 0 };
      if (r.is_required) byRole[r.role].required++;
      else byRole[r.role].optional++;
    });

    Object.keys(byRole).sort().forEach(role => {
      console.log(`${role}: ${byRole[role].required} required, ${byRole[role].optional} optional`);
    });
    console.log(`\nTotal: ${reqs.length} requirements`);
  }

  // Check course modules
  console.log('\n' + '='.repeat(60));
  console.log('📚 COURSE MODULES\n');
  
  const { data: course } = await supabase
    .from('courses')
    .select('id, title')
    .eq('slug', 'intro-hvac')
    .single();

  if (course) {
    const { data: modules } = await supabase
      .from('course_modules')
      .select('title')
      .eq('course_id', course.id);

    console.log(`Course: ${course.title}`);
    console.log(`Modules: ${modules?.length || 0}`);
    if (modules) {
      modules.forEach((m, i) => console.log(`  ${i + 1}. ${m.title}`));
    }
  }

  console.log('\n' + '='.repeat(60));
  
  if (results.broken.length === 0) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL!\n');
    return true;
  } else {
    console.log('⚠️  SOME SYSTEMS NEED ATTENTION\n');
    console.log('YOU NEED TO RUN: MASTER_SQL_COMPLETE.sql\n');
    return false;
  }
}

testAllSystems().then(success => {
  process.exit(success ? 0 : 1);
});
