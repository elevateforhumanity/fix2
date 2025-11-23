# 🚀 Run Database Migrations - 2 Minutes

## Quick Steps

### 1. Open Supabase SQL Editor
**Direct Link:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

### 2. Copy the Migration File
Open this file in your code editor:
```
deployment-ready/01-all-migrations-clean.sql
```

**Select All (Ctrl+A / Cmd+A)** and **Copy (Ctrl+C / Cmd+C)**

### 3. Paste into SQL Editor
- Paste the entire SQL into the Supabase SQL Editor
- Click the green **"Run"** button (bottom right)
- Wait 10-30 seconds for it to complete

### 4. Verify Tables Created
After running, click **"Table Editor"** in the sidebar.

You should now see these tables:
- ✅ `courses` - All course content
- ✅ `modules` - Course modules/sections
- ✅ `lessons` - Individual lessons
- ✅ `enrollments` - Student enrollments
- ✅ `lesson_progress` - Progress tracking
- ✅ `certificates` - Earned certificates
- ✅ `quizzes` - Quiz content
- ✅ `quiz_attempts` - Quiz submissions
- ✅ And many more...

---

## ✅ After Migration Completes

Tell me and I'll:
1. **Connect the student dashboard** to show REAL courses
2. **Enroll the test student** in some courses
3. **Show actual progress** instead of fake data
4. **Display real certificates**

---

## 🆘 If You Get Errors

**"relation already exists"** - Some tables already exist, that's OK! The migration uses `IF NOT EXISTS` so it won't break anything.

**"permission denied"** - Make sure you're using the service role key (you are).

**"syntax error"** - Copy the ENTIRE file, don't miss any lines.

---

## 📝 What This Migration Does

- Creates 50+ database tables
- Sets up Row Level Security policies
- Creates indexes for performance
- Inserts sample course data (CDL, Healthcare, Barber, HVAC, etc.)
- Sets up triggers and functions
- Configures authentication

---

**Run it now and let me know when it's done!** 🚀
