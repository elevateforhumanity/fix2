-- ============================================
-- MAKE YOURSELF ORG_ADMIN (RUN IN SUPABASE)
-- ============================================

-- STEP 1: Find your user ID
-- Copy the UUID from the row with YOUR email
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 25;

-- STEP 2: Confirm your organization ID
-- Copy the UUID from the EFH organization
SELECT id, slug, name
FROM public.organizations;

-- STEP 3: Add yourself as org_admin
-- REPLACE THE UUIDs BELOW WITH VALUES FROM STEPS 1 & 2
INSERT INTO public.organization_users (organization_id, user_id, role)
VALUES (
  'PASTE_ORG_UUID_HERE',      -- From Step 2
  'PASTE_YOUR_USER_UUID_HERE', -- From Step 1
  'org_admin'
)
ON CONFLICT (organization_id, user_id) 
DO UPDATE SET role = 'org_admin';

-- STEP 4: Verify it worked
-- You should see your row with org_admin role
SELECT 
  ou.organization_id,
  o.name as org_name,
  ou.user_id,
  u.email,
  ou.role,
  ou.created_at
FROM public.organization_users ou
JOIN public.organizations o ON o.id = ou.organization_id
JOIN auth.users u ON u.id = ou.user_id
ORDER BY ou.created_at DESC;

-- ============================================
-- EXPECTED RESULT:
-- You should see 1 row with:
-- - org_name: "Elevate for Humanity" (or similar)
-- - email: YOUR email
-- - role: org_admin
-- ============================================

-- If you see your row with org_admin, you're ready to deploy!
