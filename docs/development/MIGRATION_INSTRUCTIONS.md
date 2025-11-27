# Database Migration Instructions

## ✅ Complete LMS + Admin Portal Database Setup

This migration creates all necessary tables for:
- **LMS**: Courses, lessons, enrollments, progress tracking
- **Student Portal**: Dashboard, certificates, badges, gamification
- **Admin Portal**: User management, roles, applications
- **Staff Portal**: Case management, messaging, reporting

---

## 🚀 How to Run the Migration

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Execute the Migration

1. Open the file: `DEPLOY_COMPLETE_DATABASE.sql`
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl/Cmd + Enter)

### Step 3: Verify Success

You should see a success message with:
```
✅ Database migration completed successfully!
📊 Tables created: profiles, programs, courses, lessons, enrollments, certificates, badges, and more
🔒 Row Level Security enabled on all tables
🎓 Sample course data inserted
🚀 LMS is ready for deployment!
```

---

## 📋 What Gets Created

### Core Tables (18 total):

1. **profiles** - User profiles with roles (student, instructor, admin, staff)
2. **programs** - Training pathways (Medical Assistant, Barber, HVAC, etc.)
3. **courses** - LMS courses with metadata
4. **lessons** - Individual lesson content
5. **quizzes** - Quiz questions and configuration
6. **enrollments** - Student course enrollments
7. **lesson_progress** - Per-lesson completion tracking
8. **quiz_attempts** - Quiz submission history
9. **certificates** - Issued certificates with verification
10. **badges** - Achievement badges
11. **student_badges** - Earned badges per student
12. **student_points** - Gamification points and streaks
13. **learning_activity** - Activity log for analytics
14. **applications** - Student applications from website
15. **assignments** - Course assignments
16. **assignment_submissions** - Student assignment submissions
17. **messages** - Student-staff messaging
18. **Sample data** - One program and one course for testing

### Security Features:

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public read access for course catalog
- ✅ Students can only access their own data
- ✅ Proper foreign key constraints
- ✅ Automatic timestamp updates

---

## 🧪 Testing After Migration

### 1. Verify Tables Exist

Run this query in Supabase SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see all 18 tables listed.

### 2. Check Sample Data

```sql
SELECT * FROM public.programs;
SELECT * FROM public.courses;
```

You should see one program and one course.

### 3. Test on Production

1. Visit: [https://www.elevateforhumanity.org/portal/student](https://www.elevateforhumanity.org/portal/student)
2. The login page should load without timeout
3. After creating an account, you should be able to access the dashboard

---

## 🔧 Troubleshooting

### If migration fails:

1. **Check for existing tables**: Some tables might already exist
   - The migration uses `CREATE TABLE IF NOT EXISTS` so it's safe to re-run
   
2. **Permission errors**: Make sure you're using the Supabase SQL Editor as the project owner

3. **Foreign key errors**: If you have existing data, you may need to clean up first:
   ```sql
   -- Only run if you need to start fresh
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   GRANT ALL ON SCHEMA public TO postgres;
   GRANT ALL ON SCHEMA public TO public;
   ```

### If LMS still times out after migration:

1. **Check environment variables in Vercel**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Verify RLS policies**: Make sure authenticated users can read courses:
   ```sql
   SELECT * FROM public.courses WHERE status = 'published';
   ```

3. **Check Supabase logs**: Go to Supabase Dashboard → Logs → API to see any errors

---

## 📞 Support

If you encounter issues:
1. Check the Supabase logs for specific error messages
2. Verify all environment variables are set in Vercel
3. Ensure the Supabase project is not paused (free tier limitation)

---

## ✨ Next Steps After Migration

1. **Create test users**: Sign up through `/portal/student`
2. **Enroll in courses**: Use the admin panel or SQL to enroll users
3. **Add more courses**: Use the course builder or import from CSV
4. **Configure roles**: Assign admin/staff roles to team members

The LMS is now fully deployed and ready to use! 🎉
