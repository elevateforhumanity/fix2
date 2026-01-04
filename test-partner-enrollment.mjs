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

async function testPartnerEnrollment() {
  console.log('🔍 Testing Partner Enrollment Flow...\n');

  // Test 1: Check partner_enrollments table
  console.log('1️⃣ Checking partner_enrollments table...');
  const { data: enrollments, error: enrollError } = await supabase
    .from('partner_enrollments')
    .select('*')
    .limit(5);

  if (enrollError) {
    console.log('❌ partner_enrollments:', enrollError.message);
  } else {
    console.log(`✅ partner_enrollments: EXISTS (${enrollments?.length || 0} records)`);
  }

  // Test 2: Check programs table
  console.log('\n2️⃣ Checking programs table...');
  const { data: programs, error: programsError } = await supabase
    .from('programs')
    .select('id, title, slug')
    .limit(5);

  if (programsError) {
    console.log('❌ programs:', programsError.message);
  } else {
    console.log(`✅ programs: EXISTS (${programs?.length || 0} programs)`);
    if (programs && programs.length > 0) {
      programs.forEach(p => console.log(`   - ${p.title} (${p.slug})`));
    }
  }

  // Test 3: Check profiles with partner role
  console.log('\n3️⃣ Checking partner profiles...');
  const { data: partners, error: partnersError } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('role', 'partner')
    .limit(5);

  if (partnersError) {
    console.log('❌ partner profiles:', partnersError.message);
  } else {
    console.log(`✅ partner profiles: ${partners?.length || 0} found`);
    if (partners && partners.length > 0) {
      partners.forEach(p => console.log(`   - ${p.full_name} (${p.email})`));
    }
  }

  // Test 4: Check program_holders table
  console.log('\n4️⃣ Checking program_holders table...');
  const { data: programHolders, error: phError } = await supabase
    .from('program_holders')
    .select('id, organization_name, status')
    .limit(5);

  if (phError) {
    console.log('❌ program_holders:', phError.message);
  } else {
    console.log(`✅ program_holders: EXISTS (${programHolders?.length || 0} records)`);
    if (programHolders && programHolders.length > 0) {
      programHolders.forEach(ph => console.log(`   - ${ph.organization_name} (${ph.status})`));
    }
  }

  // Test 5: Check partner_lms_courses table
  console.log('\n5️⃣ Checking partner_lms_courses table...');
  const { data: partnerCourses, error: pcError } = await supabase
    .from('partner_lms_courses')
    .select('id, course_name, partner_id')
    .limit(5);

  if (pcError) {
    console.log('❌ partner_lms_courses:', pcError.message);
  } else {
    console.log(`✅ partner_lms_courses: EXISTS (${partnerCourses?.length || 0} courses)`);
  }

  // Test 6: Check partner_lms_enrollments table
  console.log('\n6️⃣ Checking partner_lms_enrollments table...');
  const { data: partnerEnrollments, error: peError } = await supabase
    .from('partner_lms_enrollments')
    .select('id, student_id, course_id, status')
    .limit(5);

  if (peError) {
    console.log('❌ partner_lms_enrollments:', peError.message);
  } else {
    console.log(`✅ partner_lms_enrollments: EXISTS (${partnerEnrollments?.length || 0} enrollments)`);
  }

  // Test 7: Test creating a partner enrollment
  console.log('\n7️⃣ Testing partner enrollment creation...');
  
  // Get first student and program
  const { data: student } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'student')
    .limit(1)
    .single();

  const { data: program } = await supabase
    .from('programs')
    .select('id')
    .limit(1)
    .single();

  if (student && program) {
    const { data: newEnrollment, error: createError } = await supabase
      .from('partner_enrollments')
      .insert({
        student_id: student.id,
        program_id: program.id,
        partner_id: null,
        status: 'pending',
        metadata: { test: true, created_by: 'test_script' }
      })
      .select()
      .single();

    if (createError) {
      console.log('❌ Create enrollment failed:', createError.message);
    } else {
      console.log('✅ Partner enrollment created successfully');
      console.log(`   ID: ${newEnrollment.id}`);
      console.log(`   Status: ${newEnrollment.status}`);
      
      // Clean up test enrollment
      await supabase
        .from('partner_enrollments')
        .delete()
        .eq('id', newEnrollment.id);
      console.log('   (Test enrollment cleaned up)');
    }
  } else {
    console.log('⚠️  Skipped: No student or program found for test');
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 PARTNER ENROLLMENT SYSTEM STATUS\n');
  
  const tables = [
    { name: 'partner_enrollments', error: enrollError },
    { name: 'programs', error: programsError },
    { name: 'program_holders', error: phError },
    { name: 'partner_lms_courses', error: pcError },
    { name: 'partner_lms_enrollments', error: peError }
  ];

  const working = tables.filter(t => !t.error).length;
  const broken = tables.filter(t => t.error).length;

  console.log(`✅ Working tables: ${working}/5`);
  console.log(`❌ Broken tables: ${broken}/5`);

  if (broken === 0) {
    console.log('\n🎉 Partner Enrollment System is FULLY OPERATIONAL!\n');
  } else {
    console.log('\n⚠️  Partner Enrollment System has issues:\n');
    tables.filter(t => t.error).forEach(t => {
      console.log(`   ❌ ${t.name}`);
    });
    console.log('');
  }

  // Partner Flow Summary
  console.log('📋 PARTNER ENROLLMENT FLOW:\n');
  console.log('1. Partner applies via /program-holder/apply');
  console.log('2. Partner uploads required documents');
  console.log('3. Admin reviews and approves partner');
  console.log('4. Partner gets dashboard access');
  console.log('5. Partner receives student referrals');
  console.log('6. Partner enrolls students in programs');
  console.log('7. Partner tracks student progress');
  console.log('8. Partner submits completions');
  console.log('9. Elevate issues certificates');
  console.log('');
}

testPartnerEnrollment();
