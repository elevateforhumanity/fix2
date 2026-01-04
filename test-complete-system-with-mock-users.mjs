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

const results = {
  passed: [],
  failed: [],
};

function log(emoji, message) {
  console.log(`${emoji} ${message}`);
}

async function test(name, fn) {
  try {
    await fn();
    results.passed.push(name);
    log('✅', name);
  } catch (error) {
    results.failed.push({ name, error: error.message });
    log('❌', `${name}: ${error.message}`);
  }
}

async function createMockUsers() {
  log('👥', 'Creating mock users...\n');

  const users = [
    { email: 'student@test.com', role: 'student', full_name: 'Test Student' },
    { email: 'partner@test.com', role: 'partner', full_name: 'Test Partner' },
    { email: 'instructor@test.com', role: 'instructor', full_name: 'Test Instructor' },
    { email: 'admin@test.com', role: 'admin', full_name: 'Test Admin' },
  ];

  const createdUsers = {};

  for (const user of users) {
    // Check if user exists
    const { data: existing } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', user.email)
      .single();

    if (existing) {
      createdUsers[user.role] = existing.id;
      log('ℹ️', `User ${user.email} already exists`);
      continue;
    }

    // Create auth user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: 'Test123!@#',
      email_confirm: true,
    });

    if (authError) {
      log('⚠️', `Failed to create ${user.email}: ${authError.message}`);
      continue;
    }

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: user.role,
        full_name: user.full_name,
      })
      .eq('id', authUser.user.id);

    if (profileError) {
      log('⚠️', `Failed to update profile for ${user.email}: ${profileError.message}`);
    } else {
      createdUsers[user.role] = authUser.user.id;
      log('✅', `Created ${user.email} (${user.role})`);
    }
  }

  return createdUsers;
}

async function runTests() {
  console.log('🚀 COMPLETE SYSTEM TEST WITH MOCK USERS\n');
  console.log('='.repeat(60));

  // Create mock users
  const users = await createMockUsers();
  console.log('\n' + '='.repeat(60));
  console.log('🧪 RUNNING TESTS\n');

  // Test 1: Verify all core tables exist
  await test('Core tables exist', async () => {
    const tables = [
      'documents', 'document_requirements', 'document_signatures',
      'program_holder_documents', 'tax_documents', 'payment_records',
      'onboarding_steps', 'messages', 'partner_enrollments',
      'partner_lms_courses', 'partner_lms_enrollments',
      'partner_applications', 'partner_completions'
    ];

    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) throw new Error(`Table ${table} not found: ${error.message}`);
    }
  });

  // Test 2: Verify licensing tables exist
  await test('Licensing tables exist', async () => {
    const tables = ['program_licenses', 'license_usage_log'];
    
    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) throw new Error(`Table ${table} not found: ${error.message}`);
    }
  });

  // Test 3: Verify store tables exist
  await test('Store tables exist', async () => {
    const tables = ['store_instances', 'store_branding'];
    
    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) throw new Error(`Table ${table} not found: ${error.message}`);
    }
  });

  // Test 4: Create a free license for partner
  let testLicenseId;
  await test('Create free license', async () => {
    if (!users.partner) throw new Error('Partner user not created');

    const { data: program } = await supabase
      .from('programs')
      .select('id')
      .limit(1)
      .single();

    if (!program) throw new Error('No programs found');

    const { data: license, error } = await supabase
      .from('program_licenses')
      .insert({
        program_id: program.id,
        license_holder_id: users.partner,
        license_key: `TEST-${Date.now()}`,
        license_type: 'test',
        lms_model: 'external',
        can_create_courses: false,
        can_upload_scorm: false,
        max_enrollments: 5,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create license: ${error.message}`);
    testLicenseId = license.id;
  });

  // Test 5: Test can_user_enroll function
  await test('can_user_enroll function works', async () => {
    if (!users.student) throw new Error('Student user not created');

    const { data: program } = await supabase
      .from('programs')
      .select('id')
      .limit(1)
      .single();

    if (!program) throw new Error('No programs found');

    const { data, error } = await supabase.rpc('can_user_enroll', {
      p_user_id: users.student,
      p_program_id: program.id,
      p_license_key: null,
    });

    if (error) throw new Error(`Function failed: ${error.message}`);
    if (!data || typeof data.can_enroll !== 'boolean') {
      throw new Error('Function returned invalid data');
    }
  });

  // Test 6: Create enrollment with license validation
  let testEnrollmentId;
  await test('Create enrollment with license', async () => {
    if (!users.student) throw new Error('Student user not created');

    const { data: program } = await supabase
      .from('programs')
      .select('id')
      .limit(1)
      .single();

    const { data: license } = await supabase
      .from('program_licenses')
      .select('license_key')
      .eq('id', testLicenseId)
      .single();

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: users.student,
        program_id: program.id,
        license_key: license.license_key,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw new Error(`Enrollment failed: ${error.message}`);
    testEnrollmentId = enrollment.id;
  });

  // Test 7: Verify license usage was tracked
  await test('License usage tracked', async () => {
    const { data: usage, error } = await supabase
      .from('license_usage_log')
      .select('*')
      .eq('license_id', testLicenseId)
      .eq('action', 'enrolled');

    if (error) throw new Error(`Failed to query usage: ${error.message}`);
    if (!usage || usage.length === 0) {
      throw new Error('No usage log found');
    }
  });

  // Test 8: Verify license enrollment count incremented
  await test('License enrollment count incremented', async () => {
    const { data: license, error } = await supabase
      .from('program_licenses')
      .select('current_enrollments')
      .eq('id', testLicenseId)
      .single();

    if (error) throw new Error(`Failed to query license: ${error.message}`);
    if (license.current_enrollments !== 1) {
      throw new Error(`Expected 1 enrollment, got ${license.current_enrollments}`);
    }
  });

  // Test 9: Create document
  let testDocumentId;
  await test('Create document', async () => {
    if (!users.student) throw new Error('Student user not created');

    const { data: document, error } = await supabase
      .from('documents')
      .insert({
        user_id: users.student,
        document_type: 'id_verification',
        file_name: 'test-id.pdf',
        file_size: 1024,
        file_url: 'https://example.com/test.pdf',
        mime_type: 'application/pdf',
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw new Error(`Document creation failed: ${error.message}`);
    testDocumentId = document.id;
  });

  // Test 10: Verify document audit log created
  await test('Document audit log created', async () => {
    const { data: logs, error } = await supabase
      .from('document_audit_log')
      .select('*')
      .eq('document_id', testDocumentId)
      .eq('action', 'uploaded');

    if (error) throw new Error(`Failed to query audit log: ${error.message}`);
    if (!logs || logs.length === 0) {
      throw new Error('No audit log found');
    }
  });

  // Test 11: Update document status and verify notification
  await test('Document status change creates notification', async () => {
    const { error: updateError } = await supabase
      .from('documents')
      .update({ status: 'approved' })
      .eq('id', testDocumentId);

    if (updateError) throw new Error(`Update failed: ${updateError.message}`);

    // Check notification
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', users.student)
      .eq('type', 'document_approved');

    if (error) throw new Error(`Failed to query notifications: ${error.message}`);
    if (!notifications || notifications.length === 0) {
      throw new Error('No notification created');
    }
  });

  // Test 12: Create partner course (should fail without proper license)
  await test('Partner course creation validates license', async () => {
    if (!users.partner) throw new Error('Partner user not created');

    const { error } = await supabase
      .from('partner_lms_courses')
      .insert({
        partner_id: users.partner,
        course_name: 'Test Course',
        description: 'Test description',
      });

    // Should fail because license doesn't allow course creation
    if (!error) {
      throw new Error('Course creation should have failed but succeeded');
    }
    if (!error.message.includes('course')) {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  });

  // Test 13: Create license with course creation permission
  let courseCreationLicenseId;
  await test('Create license with course creation', async () => {
    const { data: program } = await supabase
      .from('programs')
      .select('id')
      .limit(1)
      .single();

    const { data: license, error } = await supabase
      .from('program_licenses')
      .insert({
        program_id: program.id,
        license_holder_id: users.partner,
        license_key: `COURSE-${Date.now()}`,
        license_type: 'internal',
        lms_model: 'internal',
        can_create_courses: true,
        can_upload_scorm: false,
        max_enrollments: 50,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create license: ${error.message}`);
    courseCreationLicenseId = license.id;
  });

  // Test 14: Create partner course with valid license
  await test('Partner course creation succeeds with valid license', async () => {
    const { data: course, error } = await supabase
      .from('partner_lms_courses')
      .insert({
        partner_id: users.partner,
        license_id: courseCreationLicenseId,
        course_name: 'Test Course',
        description: 'Test description',
        duration_hours: 40,
      })
      .select()
      .single();

    if (error) throw new Error(`Course creation failed: ${error.message}`);
  });

  // Test 15: Get user document requirements
  await test('get_user_document_requirements function works', async () => {
    if (!users.student) throw new Error('Student user not created');

    const { data, error } = await supabase.rpc('get_user_document_requirements', {
      p_user_id: users.student,
    });

    if (error) throw new Error(`Function failed: ${error.message}`);
    if (!data || data.length === 0) {
      throw new Error('No requirements returned');
    }
  });

  // Test 16: Get partner license info
  await test('get_partner_license_info function works', async () => {
    if (!users.partner) throw new Error('Partner user not created');

    const { data, error } = await supabase.rpc('get_partner_license_info', {
      p_partner_id: users.partner,
    });

    if (error) throw new Error(`Function failed: ${error.message}`);
    if (!data || data.length === 0) {
      throw new Error('No licenses returned');
    }
  });

  // Test 17: Delete enrollment and verify usage decremented
  await test('Enrollment deletion decrements license usage', async () => {
    const { error: deleteError } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', testEnrollmentId);

    if (deleteError) throw new Error(`Delete failed: ${deleteError.message}`);

    // Check license count
    const { data: license, error } = await supabase
      .from('program_licenses')
      .select('current_enrollments')
      .eq('id', testLicenseId)
      .single();

    if (error) throw new Error(`Failed to query license: ${error.message}`);
    if (license.current_enrollments !== 0) {
      throw new Error(`Expected 0 enrollments, got ${license.current_enrollments}`);
    }

    // Check usage log
    const { data: usage } = await supabase
      .from('license_usage_log')
      .select('*')
      .eq('license_id', testLicenseId)
      .eq('action', 'dropped');

    if (!usage || usage.length === 0) {
      throw new Error('No dropped usage log found');
    }
  });

  // Test 18: Verify document requirements count
  await test('Document requirements configured', async () => {
    const { data, error } = await supabase
      .from('document_requirements')
      .select('role, is_required');

    if (error) throw new Error(`Query failed: ${error.message}`);
    if (!data || data.length < 40) {
      throw new Error(`Expected 40+ requirements, got ${data?.length || 0}`);
    }
  });

  // Cleanup
  console.log('\n' + '='.repeat(60));
  console.log('🧹 CLEANING UP TEST DATA\n');

  // Delete test data
  if (testDocumentId) {
    await supabase.from('documents').delete().eq('id', testDocumentId);
    log('🗑️', 'Deleted test document');
  }

  if (testLicenseId) {
    await supabase.from('program_licenses').delete().eq('id', testLicenseId);
    log('🗑️', 'Deleted test license');
  }

  if (courseCreationLicenseId) {
    await supabase.from('program_licenses').delete().eq('id', courseCreationLicenseId);
    log('🗑️', 'Deleted course creation license');
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY\n');
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📈 Success Rate: ${Math.round((results.passed.length / (results.passed.length + results.failed.length)) * 100)}%`);

  if (results.failed.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.failed.forEach(({ name, error }) => {
      console.log(`   - ${name}: ${error}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  if (results.failed.length === 0) {
    console.log('🎉 ALL TESTS PASSED! SYSTEM IS FULLY OPERATIONAL!\n');
    return true;
  } else {
    console.log('⚠️  SOME TESTS FAILED. CHECK ERRORS ABOVE.\n');
    return false;
  }
}

runTests().then(success => {
  process.exit(success ? 0 : 1);
});
