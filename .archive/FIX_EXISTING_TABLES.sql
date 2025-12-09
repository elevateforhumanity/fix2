-- ============================================================================
-- FIX EXISTING TABLES - Run this BEFORE the 3-part migration
-- This adds missing columns to existing tables
-- ============================================================================

-- Fix lesson_progress table
DO $$ 
BEGIN
  -- Add status column if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='lesson_progress' AND column_name='status') THEN
    ALTER TABLE lesson_progress ADD COLUMN status TEXT NOT NULL DEFAULT 'not_started';
  END IF;
  
  -- Add description column to lessons if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='lessons' AND column_name='description') THEN
    ALTER TABLE lessons ADD COLUMN description TEXT;
  END IF;
  
  -- Add summary column to modules if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='modules' AND column_name='summary') THEN
    ALTER TABLE modules ADD COLUMN summary TEXT;
  END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_progress_status ON lesson_progress(status);

DO $$
BEGIN
  RAISE NOTICE '✅ Existing tables fixed - now run MIGRATION_PART_1.sql';
END $$;
