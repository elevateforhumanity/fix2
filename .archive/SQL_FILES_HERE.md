# 📁 SQL Migration Files - Copy These to Supabase

## Location of SQL Files

All migration files are in: `/workspaces/fix2/supabase/migrations/`

---

## File 1: Interactive Learning
**File**: `20241128_critical_lms_features_part1.sql`

**Full Path**: 
```
/workspaces/fix2/supabase/migrations/20241128_critical_lms_features_part1.sql
```

**To copy**:
```bash
cat supabase/migrations/20241128_critical_lms_features_part1.sql
```

---

## File 2: Gamification & Social
**File**: `20241128_critical_lms_features_part2.sql`

**Full Path**: 
```
/workspaces/fix2/supabase/migrations/20241128_critical_lms_features_part2.sql
```

**To copy**:
```bash
cat supabase/migrations/20241128_critical_lms_features_part2.sql
```

---

## File 3: Personalization & Career
**File**: `20241128_critical_lms_features_part3.sql`

**Full Path**: 
```
/workspaces/fix2/supabase/migrations/20241128_critical_lms_features_part3.sql
```

**To copy**:
```bash
cat supabase/migrations/20241128_critical_lms_features_part3.sql
```

---

## File 4: Mobile & Analytics
**File**: `20241128_critical_lms_features_part4.sql`

**Full Path**: 
```
/workspaces/fix2/supabase/migrations/20241128_critical_lms_features_part4.sql
```

**To copy**:
```bash
cat supabase/migrations/20241128_critical_lms_features_part4.sql
```

---

## File 5: Seed Data
**File**: `20241128_seed_feature_data.sql`

**Full Path**: 
```
/workspaces/fix2/supabase/migrations/20241128_seed_feature_data.sql
```

**To copy**:
```bash
cat supabase/migrations/20241128_seed_feature_data.sql
```

---

## How to Run in Supabase

1. Go to your Supabase project
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy contents of File 1 and paste
5. Click **Run**
6. Repeat for Files 2, 3, 4, 5

---

## Quick Copy All Files

```bash
# View File 1
cat supabase/migrations/20241128_critical_lms_features_part1.sql

# View File 2
cat supabase/migrations/20241128_critical_lms_features_part2.sql

# View File 3
cat supabase/migrations/20241128_critical_lms_features_part3.sql

# View File 4
cat supabase/migrations/20241128_critical_lms_features_part4.sql

# View File 5
cat supabase/migrations/20241128_seed_feature_data.sql
```

---

## What Gets Created

### After File 1:
- interactive_quizzes
- quiz_questions
- quiz_attempts
- lesson_resources
- resource_downloads
- video_transcripts
- user_progress
- forum_categories
- forum_threads
- forum_replies
- forum_votes

### After File 2:
- user_points
- point_transactions
- badge_definitions
- user_badges
- leaderboard_entries
- learning_streaks
- daily_activities
- peer_review_assignments
- peer_submissions
- peer_reviews
- study_groups
- study_group_members
- study_group_messages
- instructor_questions
- instructor_answers

### After File 3:
- learning_paths
- user_learning_paths
- course_recommendations
- skill_assessments
- skill_assessment_results
- content_adaptations
- user_learning_preferences
- user_resumes
- resume_templates
- user_portfolios
- portfolio_projects
- learning_goals
- goal_progress
- learning_reminders
- milestones
- user_milestones
- completion_estimates

### After File 4:
- offline_content
- mobile_sync_queue
- push_notifications
- engagement_metrics
- video_analytics
- drop_off_analysis
- instructor_profiles
- instructor_assignments
- instructor_announcements
- bulk_messages
- instructor_analytics
- accessibility_settings
- content_translations
- cohorts
- cohort_members
- cohort_analytics
- content_versions
- ab_tests
- ab_test_assignments
- ab_test_results

### After File 5:
- 6 forum categories
- 15 badge definitions
- 5 learning paths
- 6 milestones
- 4 resume templates

**Total: 50+ new tables + seed data**

---

## Verify It Worked

Run this query in Supabase SQL Editor:

```sql
SELECT COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%quiz%' 
   OR table_name LIKE '%forum%'
   OR table_name LIKE '%badge%'
   OR table_name LIKE '%learning%';
```

Should return 20+ tables.

---

## Need Help?

If you get errors:
1. Make sure you're in Supabase SQL Editor (not a client)
2. Run files in order (1, 2, 3, 4, 5)
3. Check for "relation already exists" - that's OK, skip it
4. Look at the error message - it tells you what's wrong

---

**Files are ready to copy!**
