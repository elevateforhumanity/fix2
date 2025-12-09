-- ============================================================================
-- STEP 5: CREATE STORAGE BUCKET POLICIES
-- ============================================================================
-- FIRST: Go to Supabase Dashboard → Storage → Create Bucket
--   - Name: external-proof
--   - Public: YES (checked)
-- THEN: Copy this entire file and paste into Supabase SQL Editor, then click RUN

-- Students can upload their own proof
CREATE POLICY "students_can_upload_proof"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'external-proof' AND
  auth.uid()::TEXT = (storage.foldername(name))[2]
);

-- Students can view their own proof
CREATE POLICY "students_can_view_own_proof"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'external-proof' AND
  auth.uid()::TEXT = (storage.foldername(name))[2]
);

-- Admins can view all proof
CREATE POLICY "admins_can_view_all_proof"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'external-proof' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'instructor')
  )
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Step 5 Complete! Storage policies created.';
  RAISE NOTICE '🎉 ALL SETUP COMPLETE!';
  RAISE NOTICE 'Test at: /student/courses/[courseId]/external/[moduleId]';
  RAISE NOTICE 'Admin review at: /admin/external-progress';
END $$;
