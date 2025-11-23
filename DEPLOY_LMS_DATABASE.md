# Deploy LMS Database - Complete Guide
## Elevate for Humanity Platform

**Date:** 2025-11-23  
**Status:** ✅ READY TO DEPLOY

---

## Executive Summary

All database schemas and migrations ARE in the repository and ready to deploy. The LMS is fully built - it just needs the database tables created in Supabase.

### What Exists ✅
- ✅ Complete LMS schema (`supabase/001_initial_schema.sql`)
- ✅ All migration files in `migrations/` directory
- ✅ Full LMS UI/UX (all pages built)
- ✅ 11 course videos ready
- ✅ Row Level Security policies defined
- ✅ Indexes for performance
- ✅ Triggers for timestamps

### What's Needed ⏱️
- ⏱️ Run schema in Supabase (5 minutes)
- ⏱️ Populate course content (30 minutes)
- ⏱️ Test with student account (15 minutes)

**Total Time: ~50 minutes to fully functional LMS**

---

## Database Schema Overview

### Core Tables (in `supabase/001_initial_schema.sql`)

1. **profiles** - User profiles (extends auth.users)
2. **programs** - Training programs (HVAC, Medical Assistant, etc.)
3. **courses** - Courses within programs
4. **lessons** - Individual lessons with video content
5. **enrollments** - Student enrollments in programs
6. **lesson_progress** - Track student progress
7. **certificates** - Issued certificates

### Additional Tables (in `migrations/`)

8. **messages** - Student/instructor messaging
9. **assignments** - Course assignments
10. **assignment_submissions** - Student submissions
11. **gradebook** - Grades and assessments
12. **ai_features** - AI-generated content
13. **social_gamification** - Badges, achievements
14. **audit_logs** - System audit trail
15. **wioa_compliance** - WIOA tracking

---

## Step-by-Step Deployment

### Step 1: Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your Elevate for Humanity project
4. Click "SQL Editor" in the left sidebar

### Step 2: Run Initial Schema

**Copy and paste the entire contents of `supabase/001_initial_schema.sql`**

```bash
# View the file
cat supabase/001_initial_schema.sql
```

**In Supabase SQL Editor:**
1. Click "New Query"
2. Paste the entire schema
3. Click "Run" (or press Cmd/Ctrl + Enter)
4. Wait for success message

**Expected Output:**
```
Success. No rows returned
```

**This creates:**
- ✅ 7 core tables
- ✅ All indexes
- ✅ Row Level Security policies
- ✅ Triggers for timestamps

### Step 3: Run Additional Migrations

**Run each migration file in order:**

```sql
-- 1. Messages and Assignments
-- Copy contents of migrations/001_add_messages_and_assignments.sql

-- 2. WIOA Compliance
-- Copy contents of migrations/002_wioa_compliance_tables.sql

-- 3. Gradebook
-- Copy contents of migrations/20251118_gradebook.sql

-- 4. AI Features
-- Copy contents of migrations/20251118_ai_features.sql

-- 5. Social/Gamification
-- Copy contents of migrations/20251118_social_gamification.sql

-- 6. Audit Logs
-- Copy contents of migrations/20251118_audit_logs_portals.sql

-- Continue with remaining migrations as needed...
```

**For each migration:**
1. Open the file
2. Copy entire contents
3. Paste in Supabase SQL Editor
4. Run
5. Verify success

### Step 4: Verify Tables Created

**Run this query to check:**

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Expected tables:**
- assignments
- assignment_submissions
- certificates
- courses
- enrollments
- lessons
- lesson_progress
- messages
- profiles
- programs
- (and more from additional migrations)

---

## Step 5: Populate Course Content

### Option A: Quick Test Data (Recommended First)

```sql
-- 1. Create a test program
INSERT INTO public.programs (slug, name, description, category, duration_weeks, is_active)
VALUES (
  'hvac-tech',
  'HVAC Technician',
  'Complete HVAC training program',
  'Skilled Trades',
  16,
  true
);

-- 2. Create a course
INSERT INTO public.courses (program_id, title, description, duration_hours, is_published)
SELECT 
  id,
  'HVAC Fundamentals',
  'Learn the basics of HVAC systems',
  40,
  true
FROM public.programs WHERE slug = 'hvac-tech';

-- 3. Create lessons
INSERT INTO public.lessons (course_id, title, content, video_url, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Welcome & Safety',
  'Introduction to HVAC and safety protocols',
  '/videos/courses/hvac-technician-10002289.mp4',
  1,
  15,
  true
FROM public.courses c
JOIN public.programs p ON p.id = c.program_id
WHERE p.slug = 'hvac-tech';

-- 4. Create test enrollment (replace with your user ID)
INSERT INTO public.enrollments (user_id, program_id, status)
SELECT 
  auth.uid(),
  id,
  'active'
FROM public.programs WHERE slug = 'hvac-tech';
```

### Option B: Full Course Population

Use the script in `scripts/populate-courses.sql` (if exists) or create one:

```sql
-- Medical Assistant Program
INSERT INTO public.programs (slug, name, description, category, duration_weeks, is_active)
VALUES 
  ('medical-assistant', 'Medical Assistant', 'Clinical and administrative training', 'Healthcare', 20, true),
  ('barber-apprenticeship', 'Barber Apprenticeship', 'State-approved barber training', 'Skilled Trades', 52, true),
  ('hvac-tech', 'HVAC Technician', 'Heating, cooling, and refrigeration', 'Skilled Trades', 16, true),
  ('cna', 'Certified Nursing Assistant', 'Patient care fundamentals', 'Healthcare', 6, true),
  ('cdl', 'CDL / Truck Driving', 'Commercial driver training', 'Transportation', 4, true);

-- Create courses for each program
INSERT INTO public.courses (program_id, title, description, duration_hours, is_published)
SELECT 
  p.id,
  p.name || ' - Complete Course',
  'Full training program for ' || p.name,
  p.duration_weeks * 20,
  true
FROM public.programs p;

-- Create lessons for each course
INSERT INTO public.lessons (course_id, title, video_url, order_index, duration_minutes, is_published)
SELECT 
  c.id,
  'Module 1: Introduction',
  CASE 
    WHEN p.slug = 'medical-assistant' THEN '/videos/courses/medical-assistant-10002419.mp4'
    WHEN p.slug = 'barber-apprenticeship' THEN '/videos/courses/barber-apprenticeship-10002417.mp4'
    WHEN p.slug = 'hvac-tech' THEN '/videos/courses/hvac-technician-10002289.mp4'
    WHEN p.slug = 'cna' THEN '/videos/courses/home-health-aide-10002413.mp4'
    WHEN p.slug = 'cdl' THEN '/videos/courses/emergency-health-safety-technician-10002408.mp4'
  END,
  1,
  15,
  true
FROM public.courses c
JOIN public.programs p ON p.id = c.program_id;
```

---

## Step 6: Test LMS Access

### Create Test Student Account

1. Go to your site: [www.elevateforhumanity.org](https://www.elevateforhumanity.org)
2. Click "Apply" or "Sign Up"
3. Create account with email: `test-student@example.com`
4. Verify email (check Supabase Auth)

### Enroll Test Student

```sql
-- Get the user ID
SELECT id, email FROM auth.users WHERE email = 'test-student@example.com';

-- Enroll in HVAC program
INSERT INTO public.enrollments (user_id, program_id, status)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'test-student@example.com'),
  id,
  'active'
FROM public.programs WHERE slug = 'hvac-tech';
```

### Test Access

1. Log in as test student
2. Go to `/lms/dashboard`
3. Should see enrolled courses
4. Click on course
5. Should see lessons
6. Click on lesson
7. Should see video player

---

## Verification Checklist

### Database
- [ ] All tables created
- [ ] Indexes created
- [ ] RLS policies active
- [ ] Triggers working

### Content
- [ ] Programs populated
- [ ] Courses created
- [ ] Lessons added
- [ ] Videos linked

### Access
- [ ] Test student can log in
- [ ] Dashboard shows courses
- [ ] Can access lessons
- [ ] Videos play
- [ ] Progress tracked

---

## Troubleshooting

### Issue: Tables not created
**Solution:** Check for errors in SQL output. May need to run migrations in specific order.

### Issue: RLS blocking access
**Solution:** Verify user is authenticated and enrolled:
```sql
-- Check enrollment
SELECT * FROM public.enrollments WHERE user_id = auth.uid();

-- Temporarily disable RLS for testing (NOT for production)
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
```

### Issue: Videos not playing
**Solution:** 
- Check video URL paths
- Verify files exist in `/public/videos/courses/`
- Check browser console for errors

### Issue: Dashboard shows "Loading..."
**Solution:**
- Check browser console for errors
- Verify Supabase connection
- Check if user has enrollments

---

## Quick Deploy Script

Create this file: `deploy-lms.sh`

```bash
#!/bin/bash
# Quick LMS Database Deployment

echo "🚀 Deploying LMS Database..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Install: npm install -g supabase"
    exit 1
fi

# Link to project (if not already linked)
echo "🔗 Linking to Supabase project..."
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
echo "📊 Running initial schema..."
supabase db push --file supabase/001_initial_schema.sql

echo "📊 Running migrations..."
for file in migrations/*.sql; do
    echo "  Running: $file"
    supabase db push --file "$file"
done

echo "✅ Database deployment complete!"
echo ""
echo "Next steps:"
echo "1. Populate course content (see DEPLOY_LMS_DATABASE.md)"
echo "2. Create test student account"
echo "3. Test LMS access"
```

---

## Production Deployment Checklist

### Before Deployment
- [ ] Backup existing database
- [ ] Test migrations on staging
- [ ] Review RLS policies
- [ ] Prepare rollback plan

### During Deployment
- [ ] Run schema in transaction
- [ ] Verify each migration
- [ ] Check for errors
- [ ] Test basic queries

### After Deployment
- [ ] Verify all tables exist
- [ ] Test student access
- [ ] Check video playback
- [ ] Monitor error logs
- [ ] Test on mobile devices

---

## Maintenance

### Adding New Courses

```sql
-- 1. Add program
INSERT INTO public.programs (slug, name, description, category, duration_weeks, is_active)
VALUES ('new-program', 'New Program', 'Description', 'Category', 12, true);

-- 2. Add course
INSERT INTO public.courses (program_id, title, description, duration_hours, is_published)
SELECT id, 'Course Title', 'Description', 40, true
FROM public.programs WHERE slug = 'new-program';

-- 3. Add lessons
INSERT INTO public.lessons (course_id, title, video_url, order_index, duration_minutes, is_published)
SELECT id, 'Lesson 1', '/videos/courses/video.mp4', 1, 15, true
FROM public.courses WHERE title = 'Course Title';
```

### Enrolling Students

```sql
-- Enroll student in program
INSERT INTO public.enrollments (user_id, program_id, status)
VALUES ('user-uuid', 'program-uuid', 'active');
```

### Tracking Progress

```sql
-- Mark lesson complete
INSERT INTO public.lesson_progress (user_id, lesson_id, enrollment_id, completed, progress_percentage, completed_at)
VALUES ('user-uuid', 'lesson-uuid', 'enrollment-uuid', true, 100, NOW());
```

---

## Support

### Documentation
- `supabase/001_initial_schema.sql` - Core schema
- `migrations/` - Additional features
- `LMS_COURSE_ACCESS_STATUS.md` - Detailed status
- This file - Deployment guide

### Getting Help
1. Check Supabase dashboard for errors
2. Review browser console logs
3. Check server logs in Vercel
4. Test queries in SQL Editor

---

## Summary

### What You Have ✅
- Complete database schema
- All migrations ready
- Full LMS UI built
- 11 course videos ready
- Documentation complete

### What You Need To Do ⏱️
1. Run `supabase/001_initial_schema.sql` in Supabase (5 min)
2. Run migrations from `migrations/` directory (10 min)
3. Populate course content (30 min)
4. Test with student account (15 min)

**Total: ~1 hour to fully functional LMS**

### Result 🎉
- Students can log in
- Access enrolled courses
- Watch lesson videos
- Track progress
- Earn certificates

---

**Status:** ✅ READY TO DEPLOY  
**Complexity:** LOW (just run SQL files)  
**Time Required:** ~1 hour  
**Risk:** LOW (can rollback if needed)  
**Impact:** HIGH (enables full LMS functionality)

**Recommendation:** Deploy to staging first, test thoroughly, then deploy to production.
