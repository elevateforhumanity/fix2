-- ============================================================================
-- STEP 2: GET YOUR PROGRAM IDs
-- ============================================================================
-- Copy this entire file and paste into Supabase SQL Editor, then click RUN
-- SAVE THE RESULTS - you'll need these IDs for Step 3!

SELECT 
  id,
  slug,
  title,
  category
FROM programs
ORDER BY category, title;

-- Copy the IDs from the results and use them in SQL_STEP_3_ADD_PARTNER_MODULES.sql
