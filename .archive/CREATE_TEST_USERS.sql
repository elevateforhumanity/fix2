-- ============================================
-- CREATE TEST USERS FOR ELEVATE FOR HUMANITY LMS
-- ============================================
-- 
-- IMPORTANT: You must create these users in Supabase Auth Dashboard FIRST
-- Then run this script to add their profiles and role-specific data
--
-- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
-- Click "Add User" and create each user with these emails:
--
-- 1. admin@elevateforhumanity.org (password: Admin123!)
-- 2. student@test.com (password: Student123!)
-- 3. instructor@test.com (password: Instructor123!)
-- 4. delegate@test.com (password: Delegate123!)
-- 5. programholder@test.com (password: ProgramHolder123!)
--
-- After creating users in Auth, copy their UUIDs and replace the IDs below
-- ============================================

-- ============================================
-- STEP 1: Get User IDs from Auth
-- ============================================
-- Run this query to see the user IDs that were created:
-- SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- ============================================
-- STEP 2: Create Profiles (Replace UUIDs with actual IDs from Step 1)
-- ============================================

-- Admin Profile
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at)
VALUES (
  'REPLACE_WITH_ADMIN_UUID',
  'admin@elevateforhumanity.org',
  'System',
  'Administrator',
  'admin',
  NOW(),
  NOW()
);

-- Student Profile
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at)
VALUES (
  'REPLACE_WITH_STUDENT_UUID',
  'student@test.com',
  'John',
  'Student',
  'student',
  NOW(),
  NOW()
);

-- Instructor Profile
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at)
VALUES (
  'REPLACE_WITH_INSTRUCTOR_UUID',
  'instructor@test.com',
  'Jane',
  'Instructor',
  'instructor',
  NOW(),
  NOW()
);

-- Delegate Profile
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at)
VALUES (
  'REPLACE_WITH_DELEGATE_UUID',
  'delegate@test.com',
  'Sarah',
  'Delegate',
  'delegate',
  NOW(),
  NOW()
);

-- Program Holder Profile
INSERT INTO profiles (id, email, first_name, last_name, role, created_at, updated_at)
VALUES (
  'REPLACE_WITH_PROGRAM_HOLDER_UUID',
  'programholder@test.com',
  'Mike',
  'ProgramHolder',
  'program_holder',
  NOW(),
  NOW()
);

-- ============================================
-- STEP 3: Create Student-Specific Data
-- ============================================

INSERT INTO students (
  id,
  date_of_birth,
  address,
  city,
  state,
  zip_code,
  county,
  funding_type,
  eligibility_verified,
  created_at,
  updated_at
)
VALUES (
  'REPLACE_WITH_STUDENT_UUID',
  '1995-06-15',
  '123 Main Street',
  'Indianapolis',
  'IN',
  '46204',
  'Marion',
  'wrg',
  true,
  NOW(),
  NOW()
);

-- ============================================
-- STEP 4: Create Delegate-Specific Data
-- ============================================

INSERT INTO delegates (
  id,
  organization,
  territory,
  phone,
  created_at,
  updated_at
)
VALUES (
  'REPLACE_WITH_DELEGATE_UUID',
  'EmployIndy',
  'Marion County',
  '317-555-0100',
  NOW(),
  NOW()
);

-- ============================================
-- STEP 5: Create Program Holder Organization
-- ============================================

INSERT INTO program_holders (
  id,
  owner_id,
  name,
  contact_name,
  contact_email,
  contact_phone,
  address,
  city,
  state,
  zip_code,
  training_focus,
  status,
  payout_share,
  mou_status,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'REPLACE_WITH_PROGRAM_HOLDER_UUID',
  'Elite Training Academy',
  'Mike ProgramHolder',
  'programholder@test.com',
  '317-555-0200',
  '456 Training Blvd',
  'Indianapolis',
  'IN',
  '46220',
  'Healthcare and Trades',
  'approved',
  0.33,
  'fully_executed',
  NOW(),
  NOW()
);

-- ============================================
-- STEP 6: Create Sample Enrollments
-- ============================================

-- Enroll student in Barber Apprenticeship
INSERT INTO enrollments (
  id,
  student_id,
  program_id,
  funding_type,
  status,
  enrolled_at,
  started_at,
  delegate_id,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'REPLACE_WITH_STUDENT_UUID',
  'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', -- Barber Apprenticeship
  'wrg',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '28 days',
  'REPLACE_WITH_DELEGATE_UUID',
  NOW(),
  NOW()
);

-- Enroll student in CNA Training
INSERT INTO enrollments (
  id,
  student_id,
  program_id,
  funding_type,
  status,
  enrolled_at,
  started_at,
  delegate_id,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'REPLACE_WITH_STUDENT_UUID',
  'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', -- CNA Training
  'wioa',
  'active',
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '14 days',
  'REPLACE_WITH_DELEGATE_UUID',
  NOW(),
  NOW()
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check profiles
SELECT id, email, first_name, last_name, role FROM profiles ORDER BY role;

-- Check students
SELECT s.id, p.email, p.first_name, p.last_name, s.funding_type, s.eligibility_verified
FROM students s
JOIN profiles p ON s.id = p.id;

-- Check delegates
SELECT d.id, p.email, p.first_name, p.last_name, d.organization, d.territory
FROM delegates d
JOIN profiles p ON d.id = p.id;

-- Check program holders
SELECT ph.name, ph.status, ph.training_focus, p.email
FROM program_holders ph
LEFT JOIN profiles p ON ph.owner_id = p.id;

-- Check enrollments
SELECT 
  e.id,
  p.email as student_email,
  pr.title as program_title,
  e.funding_type,
  e.status,
  e.enrolled_at
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN profiles p ON s.id = p.id
JOIN programs pr ON e.program_id = pr.id
ORDER BY e.enrolled_at DESC;
