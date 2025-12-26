-- Check which migrations have been applied
SELECT 
  version,
  name,
  executed_at
FROM supabase_migrations.schema_migrations
ORDER BY executed_at DESC
LIMIT 50;
