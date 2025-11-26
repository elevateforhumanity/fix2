#!/usr/bin/env node

/**
 * Create Sample Enrollments
 * 
 * This script creates sample enrollments for test students
 * Run: node create-sample-enrollments.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createSampleEnrollments() {
  console.log('🚀 Creating sample enrollments\n');

  // Get student user
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('role', 'student')
    .limit(1);

  if (!profiles || profiles.length === 0) {
    console.log('❌ No student users found. Run create-test-users.mjs first.');
    return;
  }

  const studentId = profiles[0].id;
  console.log(`✅ Found student: ${profiles[0].email} (${studentId})\n`);

  // Get delegate user
  const { data: delegates } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'delegate')
    .limit(1);

  const delegateId = delegates?.[0]?.id || null;

  // Get programs
  const { data: programs } = await supabase
    .from('programs')
    .select('id, slug, title, estimated_hours')
    .eq('is_active', true)
    .limit(3);

  if (!programs || programs.length === 0) {
    console.log('❌ No programs found. Run seed data script first.');
    return;
  }

  console.log(`✅ Found ${programs.length} programs\n`);

  // Create enrollments
  const enrollments = [
    {
      program: programs[0],
      funding_type: 'wrg',
      status: 'active',
      enrolled_days_ago: 30,
      started_days_ago: 28,
      progress: 45
    },
    {
      program: programs[1],
      funding_type: 'wioa',
      status: 'active',
      enrolled_days_ago: 15,
      started_days_ago: 14,
      progress: 20
    }
  ];

  if (programs[2]) {
    enrollments.push({
      program: programs[2],
      funding_type: 'self_pay',
      status: 'pending',
      enrolled_days_ago: 2,
      started_days_ago: null,
      progress: 0
    });
  }

  for (const enrollment of enrollments) {
    console.log(`📚 Enrolling in: ${enrollment.program.title}`);

    const enrolledAt = new Date();
    enrolledAt.setDate(enrolledAt.getDate() - enrollment.enrolled_days_ago);

    const startedAt = enrollment.started_days_ago 
      ? new Date(enrolledAt.getTime() + (2 * 24 * 60 * 60 * 1000))
      : null;

    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        program_id: enrollment.program.id,
        funding_type: enrollment.funding_type,
        status: enrollment.status,
        enrolled_at: enrolledAt.toISOString(),
        started_at: startedAt?.toISOString(),
        delegate_id: delegateId
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        console.log(`   ⚠️  Enrollment already exists`);
      } else {
        console.error(`   ❌ Error:`, error.message);
      }
    } else {
      console.log(`   ✅ Created enrollment (${enrollment.status})`);
      console.log(`   📊 Funding: ${enrollment.funding_type.toUpperCase()}`);
      console.log(`   📅 Enrolled: ${enrollment.enrolled_days_ago} days ago`);
      if (enrollment.started_days_ago) {
        console.log(`   🚀 Started: ${enrollment.started_days_ago} days ago`);
      }
      console.log('');
    }
  }

  // Verify enrollments
  const { data: allEnrollments, error: verifyError } = await supabase
    .from('enrollments')
    .select(`
      id,
      status,
      funding_type,
      enrolled_at,
      programs (title, estimated_hours)
    `)
    .eq('student_id', studentId);

  if (verifyError) {
    console.error('❌ Error verifying enrollments:', verifyError.message);
  } else {
    console.log('\n✅ Enrollment Summary:\n');
    allEnrollments.forEach((e, i) => {
      console.log(`   ${i + 1}. ${e.programs.title}`);
      console.log(`      Status: ${e.status}`);
      console.log(`      Funding: ${e.funding_type.toUpperCase()}`);
      console.log(`      Hours: ${e.programs.estimated_hours}`);
      console.log('');
    });
  }

  console.log('🎯 Next Steps:');
  console.log('   1. Login as student@test.com to see enrollments');
  console.log('   2. Check student dashboard for progress');
  console.log('   3. Login as delegate@test.com to see caseload');
  console.log('   4. Test all dashboards\n');
}

createSampleEnrollments().catch(console.error);
