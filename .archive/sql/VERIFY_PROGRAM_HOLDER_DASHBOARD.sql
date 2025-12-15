-- ============================================
-- PROGRAM HOLDER DASHBOARD VERIFICATION
-- ============================================

-- 1. Check program_holders table exists
SELECT 'Program Holders Table Check' as section;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'program_holders')
    THEN '✅ program_holders table exists'
    ELSE '❌ program_holders table missing'
  END as status;

-- 2. Check program_holders table structure
SELECT 'Program Holders Table Structure' as section;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'program_holders'
ORDER BY ordinal_position;

-- 3. Check program_holder_acknowledgements table
SELECT 'Program Holder Acknowledgements Table' as section;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'program_holder_acknowledgements')
    THEN '✅ program_holder_acknowledgements table exists'
    ELSE '❌ program_holder_acknowledgements table missing'
  END as status;

-- 4. Check program_holder_acknowledgements structure
SELECT 'Acknowledgements Table Structure' as section;
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'program_holder_acknowledgements'
ORDER BY ordinal_position;

-- 5. Count program holders
SELECT 'Program Holder Statistics' as section;
SELECT 
  COUNT(*) as total_program_holders,
  COUNT(*) FILTER (WHERE status = 'active') as active_holders,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_holders,
  COUNT(*) FILTER (WHERE is_verified = true) as verified_holders
FROM program_holders;

-- 6. Sample program holder data
SELECT 'Sample Program Holders' as section;
SELECT 
  id,
  organization_name,
  contact_name,
  email,
  status,
  is_verified,
  created_at
FROM program_holders
ORDER BY created_at DESC
LIMIT 10;

-- 7. Check program holder acknowledgements
SELECT 'Acknowledgements Summary' as section;
SELECT 
  COUNT(*) as total_acknowledgements,
  COUNT(DISTINCT program_holder_id) as holders_with_acknowledgements,
  COUNT(*) FILTER (WHERE acknowledged_at IS NOT NULL) as completed_acknowledgements
FROM program_holder_acknowledgements;

-- 8. Check program holder permissions
SELECT 'Program Holder Permissions' as section;
SELECT 
  ph.id,
  ph.organization_name,
  ph.permissions,
  ph.can_manage_students,
  ph.can_issue_certificates,
  ph.can_view_reports
FROM program_holders ph
WHERE ph.status = 'active'
LIMIT 10;

-- 9. Check RLS policies for program holders
SELECT 'Program Holder RLS Policies' as section;
SELECT 
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('program_holders', 'program_holder_acknowledgements')
ORDER BY tablename, policyname;

-- 10. Check program holder enrollments/students
SELECT 'Program Holder Students' as section;
SELECT 
  ph.organization_name,
  COUNT(DISTINCT e.id) as total_enrollments,
  COUNT(DISTINCT e.user_id) as unique_students,
  COUNT(DISTINCT e.program_id) as programs_offered
FROM program_holders ph
LEFT JOIN enrollments e ON e.program_holder_id = ph.id
GROUP BY ph.id, ph.organization_name
ORDER BY total_enrollments DESC
LIMIT 10;

-- 11. Check program holder programs relationship
SELECT 'Program Holder Programs' as section;
SELECT 
  ph.organization_name,
  p.title as program_title,
  COUNT(e.id) as enrollments
FROM program_holders ph
LEFT JOIN programs p ON p.program_holder_id = ph.id
LEFT JOIN enrollments e ON e.program_id = p.id
GROUP BY ph.id, ph.organization_name, p.id, p.title
ORDER BY enrollments DESC
LIMIT 10;

-- 12. Check MOU signatures for program holders
SELECT 'MOU Signatures' as section;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'mou_signatures')
    THEN '✅ mou_signatures table exists'
    ELSE '❌ mou_signatures table missing'
  END as mou_table_status,
  (SELECT COUNT(*) FROM mou_signatures WHERE signer_type = 'program_holder') as program_holder_signatures;

-- 13. Check program holder dashboard data availability
SELECT 'Dashboard Data Availability' as section;
SELECT 
  'Program Holders' as data_type,
  COUNT(*) as record_count,
  COUNT(*) FILTER (WHERE status = 'active') as active_count
FROM program_holders
UNION ALL
SELECT 
  'Acknowledgements',
  COUNT(*),
  COUNT(*) FILTER (WHERE acknowledged_at IS NOT NULL)
FROM program_holder_acknowledgements
UNION ALL
SELECT 
  'MOU Signatures',
  COUNT(*),
  COUNT(*) FILTER (WHERE signed_at IS NOT NULL)
FROM mou_signatures
WHERE signer_type = 'program_holder';

-- 14. Check for missing columns in program_holders
SELECT 'Required Columns Check' as section;
SELECT 
  column_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'program_holders' 
      AND information_schema.columns.column_name = expected.column_name
    )
    THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM (VALUES 
  ('id'),
  ('organization_name'),
  ('contact_name'),
  ('email'),
  ('phone'),
  ('status'),
  ('is_verified'),
  ('permissions'),
  ('can_manage_students'),
  ('can_issue_certificates'),
  ('can_view_reports'),
  ('created_at'),
  ('updated_at')
) AS expected(column_name);

-- 15. Overall program holder system health
SELECT 'System Health Summary' as section;
SELECT 
  (SELECT COUNT(*) FROM program_holders) as total_holders,
  (SELECT COUNT(*) FROM program_holders WHERE status = 'active') as active_holders,
  (SELECT COUNT(*) FROM program_holder_acknowledgements) as total_acknowledgements,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'program_holders') as rls_policies,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'program_holders')
    THEN '✅ Ready'
    ELSE '❌ Not Ready'
  END as dashboard_status;
