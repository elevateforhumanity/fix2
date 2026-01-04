-- GRANT ALL PERMISSIONS TO ANON AND AUTHENTICATED
-- This is the final fix - grants table-level permissions

-- Grant all permissions on application tables
GRANT ALL ON student_applications TO anon, authenticated, service_role;
GRANT ALL ON program_holder_applications TO anon, authenticated, service_role;
GRANT ALL ON employer_applications TO anon, authenticated, service_role;
GRANT ALL ON staff_applications TO anon, authenticated, service_role;

-- Grant sequence permissions (for auto-increment IDs)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Verify grants
SELECT 
  grantee,
  table_name,
  privilege_type
FROM information_schema.table_privileges
WHERE table_name IN ('student_applications', 'program_holder_applications', 'employer_applications', 'staff_applications')
  AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee, privilege_type;

-- Success
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ ALL PERMISSIONS GRANTED';
  RAISE NOTICE '========================';
  RAISE NOTICE '';
  RAISE NOTICE 'Granted to: anon, authenticated, service_role';
  RAISE NOTICE 'Tables: All application tables';
  RAISE NOTICE 'Permissions: ALL (SELECT, INSERT, UPDATE, DELETE)';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Test enrollment API now!';
  RAISE NOTICE '';
END $$;
