-- Check what partner/LMS tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%partner%' OR table_name LIKE '%lms%'
ORDER BY table_name;
