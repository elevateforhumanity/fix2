-- ============================================
-- MAKE YOURSELF ADMIN
-- ============================================
-- Run this in Supabase SQL Editor
-- Replace 'your-email@example.com' with YOUR email
-- ============================================

-- Option 1: If you know your email
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Option 2: Make the FIRST user admin (if you're the only one)
UPDATE profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM profiles ORDER BY created_at ASC LIMIT 1);

-- Option 3: Make ALL users admin (use carefully!)
-- UPDATE profiles SET role = 'admin';

-- ============================================
-- VERIFY IT WORKED
-- ============================================
-- Run this to check:
SELECT id, email, role, created_at 
FROM profiles 
WHERE role = 'admin';

-- ============================================
-- AFTER RUNNING THIS:
-- 1. Go to /admin-login
-- 2. Login with your email and password
-- 3. You'll have full admin access!
-- ============================================
