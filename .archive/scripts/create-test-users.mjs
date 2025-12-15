#!/usr/bin/env node

/**
 * Create Test Users for Elevate for Humanity LMS
 * 
 * This script creates test users in Supabase Auth and adds their profiles
 * Run: node create-test-users.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const testUsers = [
  {
    email: 'admin@elevateforhumanity.org',
    password: 'Admin123!',
    role: 'admin',
    firstName: 'System',
    lastName: 'Administrator'
  },
  {
    email: 'student@test.com',
    password: 'Student123!',
    role: 'student',
    firstName: 'John',
    lastName: 'Student',
    studentData: {
      date_of_birth: '1995-06-15',
      address: '123 Main Street',
      city: 'Indianapolis',
      state: 'IN',
      zip_code: '46204',
      county: 'Marion',
      funding_type: 'wrg',
      eligibility_verified: true
    }
  },
  {
    email: 'instructor@test.com',
    password: 'Instructor123!',
    role: 'instructor',
    firstName: 'Jane',
    lastName: 'Instructor'
  },
  {
    email: 'delegate@test.com',
    password: 'Delegate123!',
    role: 'delegate',
    firstName: 'Sarah',
    lastName: 'Delegate',
    delegateData: {
      organization: 'EmployIndy',
      territory: 'Marion County',
      phone: '317-555-0100'
    }
  },
  {
    email: 'programholder@test.com',
    password: 'ProgramHolder123!',
    role: 'program_holder',
    firstName: 'Mike',
    lastName: 'ProgramHolder',
    programHolderData: {
      name: 'Elite Training Academy',
      contact_name: 'Mike ProgramHolder',
      contact_email: 'programholder@test.com',
      contact_phone: '317-555-0200',
      address: '456 Training Blvd',
      city: 'Indianapolis',
      state: 'IN',
      zip_code: '46220',
      training_focus: 'Healthcare and Trades',
      status: 'approved',
      payout_share: 0.33,
      mou_status: 'fully_executed'
    }
  }
];

async function createTestUsers() {
  console.log('🚀 Creating test users for Elevate for Humanity LMS\n');

  for (const user of testUsers) {
    console.log(`\n📧 Creating ${user.role}: ${user.email}`);

    try {
      // Check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === user.email);

      let userId;

      if (existingUser) {
        console.log(`   ⚠️  User already exists, using existing ID`);
        userId = existingUser.id;
      } else {
        // Create user in Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true
        });

        if (authError) {
          console.error(`   ❌ Auth error:`, authError.message);
          continue;
        }

        userId = authData.user.id;
        console.log(`   ✅ Created auth user: ${userId}`);
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          role: user.role,
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error(`   ❌ Profile error:`, profileError.message);
        continue;
      }
      console.log(`   ✅ Created profile`);

      // Create role-specific data
      if (user.role === 'student' && user.studentData) {
        const { error: studentError } = await supabase
          .from('students')
          .upsert({
            id: userId,
            ...user.studentData,
            updated_at: new Date().toISOString()
          });

        if (studentError) {
          console.error(`   ❌ Student data error:`, studentError.message);
        } else {
          console.log(`   ✅ Created student data`);
        }
      }

      if (user.role === 'delegate' && user.delegateData) {
        const { error: delegateError } = await supabase
          .from('delegates')
          .upsert({
            id: userId,
            ...user.delegateData,
            updated_at: new Date().toISOString()
          });

        if (delegateError) {
          console.error(`   ❌ Delegate data error:`, delegateError.message);
        } else {
          console.log(`   ✅ Created delegate data`);
        }
      }

      if (user.role === 'program_holder' && user.programHolderData) {
        const { error: phError } = await supabase
          .from('program_holders')
          .upsert({
            owner_id: userId,
            ...user.programHolderData,
            updated_at: new Date().toISOString()
          });

        if (phError) {
          console.error(`   ❌ Program holder data error:`, phError.message);
        } else {
          console.log(`   ✅ Created program holder data`);
        }
      }

    } catch (error) {
      console.error(`   ❌ Unexpected error:`, error.message);
    }
  }

  console.log('\n\n✅ Test user creation complete!\n');
  console.log('📋 Test User Credentials:\n');
  testUsers.forEach(user => {
    console.log(`   ${user.role.toUpperCase()}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log('');
  });

  console.log('🎯 Next Steps:');
  console.log('   1. Login with each user to test their dashboard');
  console.log('   2. Create sample enrollments');
  console.log('   3. Test all features');
  console.log('   4. Deploy to production\n');
}

createTestUsers().catch(console.error);
