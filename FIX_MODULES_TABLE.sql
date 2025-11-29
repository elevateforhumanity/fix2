-- Add description column to modules table
ALTER TABLE modules ADD COLUMN IF NOT EXISTS description TEXT;

DO $$
BEGIN
  RAISE NOTICE '✅ Modules table fixed - description column added';
END $$;
