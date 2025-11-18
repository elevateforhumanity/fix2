-- Add status column to programs table for sitemap generation
-- Migration: 20251118_fix_programs_status

-- Add status column if it doesn't exist
ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft', 'archived'));

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);

-- Update existing programs to have active status
UPDATE programs SET status = 'active' WHERE status IS NULL;
