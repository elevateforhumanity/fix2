-- ============================================
-- CREATE ADMIN USER
-- Run this in Supabase SQL Editor
-- ============================================

-- First, you need to sign up on your site at:
-- https://www.elevateforhumanity.org/signup
-- 
-- After signing up, come back here and:
-- 1. Replace 'YOUR_EMAIL_HERE' with the email you used
-- 2. Run this script in Supabase SQL Editor

-- ============================================
-- STEP 1: Find your user ID
-- ============================================

-- This will show your user ID - copy it
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'YOUR_EMAIL_HERE';

-- ============================================
-- STEP 2: Create/Update your profile as admin
-- ============================================

-- Replace 'YOUR_USER_ID_HERE' with the ID from Step 1
-- Replace 'YOUR_EMAIL_HERE' with your email
-- Replace 'Your Name' with your actual name

INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
)
VALUES (
  'YOUR_USER_ID_HERE',  -- Replace with your user ID from Step 1
  'YOUR_EMAIL_HERE',     -- Replace with your email
  'Your Name',           -- Replace with your name
  'super_admin',         -- This gives you full admin access
  NOW(),
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET
  role = 'super_admin',
  updated_at = NOW();

-- ============================================
-- STEP 3: Verify admin access
-- ============================================

-- This should show your profile with role = 'super_admin'
SELECT id, email, full_name, role, created_at
FROM profiles
WHERE email = 'YOUR_EMAIL_HERE';

-- ============================================
-- SUCCESS!
-- ============================================
-- After running this:
-- 1. Go to https://www.elevateforhumanity.org/admin
-- 2. You should now have full admin access
-- ============================================
