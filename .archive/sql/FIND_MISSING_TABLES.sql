-- Get list of tables you currently have
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
