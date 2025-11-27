# Database Setup Instructions

## Step 1: Access Supabase Dashboard

1. Go to https://supabase.com
2. Sign in to your account
3. Select your Elevate for Humanity project
4. Click "SQL Editor" in the left sidebar

## Step 2: Run Initial Schema (if not done)

Copy and paste the contents of `supabase/001_initial_schema.sql` and click "Run"

## Step 3: Run Course Migration (if not done)

Copy and paste the contents of `QUICK_COURSE_MIGRATION.sql` and click "Run"

## Step 4: Run 100% Feature Parity Migration

Copy and paste the contents of `migrations/100_PERCENT_FEATURE_PARITY.sql` and click "Run"

This will create:
- Forums (4 tables)
- Q&A System (3 tables)
- Assignments (2 tables)
- Gradebook (6 tables)
- Quizzes (5 tables)
- Certificates (2 tables)
- Notifications (2 tables)
- Announcements (2 tables)
- Reviews (2 tables)
- Analytics (2 tables)

## Step 5: Verify Tables Created

Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'forums', 'forum_posts', 'questions', 'answers', 
  'assignments', 'grades', 'quizzes', 'certificates'
)
ORDER BY table_name;
```

You should see all the tables listed.

## Step 6: Create Test Data (Optional)

Run this to create test forums:

```sql
-- Create a test forum
INSERT INTO public.forums (course_id, title, description, order_index)
SELECT 
  id,
  'General Discussion',
  'Discuss anything related to this course',
  1
FROM public.courses
LIMIT 1;
```

Once you've completed these steps, let me know and I'll continue building the UI components!
