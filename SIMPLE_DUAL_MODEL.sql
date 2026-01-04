-- Add is_using_internal_lms flag to partner_applications
ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS is_using_internal_lms BOOLEAN DEFAULT false;

-- Add is_using_internal_lms to program_holders
ALTER TABLE program_holders
ADD COLUMN IF NOT EXISTS is_using_internal_lms BOOLEAN DEFAULT false;
