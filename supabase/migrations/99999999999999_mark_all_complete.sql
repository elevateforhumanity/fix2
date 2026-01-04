-- Mark all migrations as complete
-- This is needed because we ran the SQL manually in Supabase

-- Create migration tracking table if it doesn't exist
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mark all existing migrations as complete
INSERT INTO _migrations (name, executed_at)
SELECT 
  filename,
  NOW()
FROM (
  VALUES 
    ('20250101000001_add_cover_images.sql'),
    ('20251227_create_migration_tracking.sql'),
    ('20251227_create_missing_tables.sql'),
    ('20251227_fix_rls_security_critical.sql'),
    ('20251227_fix_schema_mismatches.sql'),
    ('20251228_add_scorm_tables.sql'),
    ('20251230_applications.sql'),
    ('20251230_appointments.sql'),
    ('20251230_complete_platform.sql'),
    ('20251230_credential_system.sql')
) AS t(filename)
ON CONFLICT (name) DO NOTHING;

-- All migrations are now marked as complete
SELECT 'All migrations marked as complete' AS status;
