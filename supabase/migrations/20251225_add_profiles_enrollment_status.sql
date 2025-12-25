-- Add enrollment_status to profiles table for access gating
-- This field controls whether a user can access the student portal
-- It is separate from enrollments.status which tracks enrollment lifecycle

ALTER TABLE profiles 
ADD COLUMN enrollment_status TEXT NOT NULL DEFAULT 'pending'
CHECK (enrollment_status IN ('pending', 'approved', 'active', 'suspended', 'completed', 'rejected'));

-- Create index for faster access checks
CREATE INDEX IF NOT EXISTS idx_profiles_enrollment_status ON profiles(enrollment_status);

-- Backfill existing profiles to 'pending' (default handles this)
-- Any profiles with active enrollments should be updated separately via admin action

COMMENT ON COLUMN profiles.enrollment_status IS 'Access gate for student portal. Only active allows full access. Separate from enrollments.status.';
