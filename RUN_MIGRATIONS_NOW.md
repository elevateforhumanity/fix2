# 🚀 RUN MIGRATIONS NOW - Start Classes Today

**This will load all 16 programs and 50+ courses into your database in 5 minutes**

---

## ⚡ FASTEST METHOD (Copy & Paste)

### Step 1: Go to Supabase SQL Editor

👉 **[CLICK HERE: Open Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql)**

Or manually:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in left sidebar
4. Click "New query"

---

### Step 2: Copy This ENTIRE File

Open this file in the repository:
```
supabase/migrations/RUN_ALL_MIGRATIONS.sql
```

**Or download it here:**
👉 [Download RUN_ALL_MIGRATIONS.sql](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/RUN_ALL_MIGRATIONS.sql)

---

### Step 3: Paste and Run

1. Copy the ENTIRE contents of `RUN_ALL_MIGRATIONS.sql`
2. Paste into Supabase SQL Editor
3. Click **"Run"** button (or press Ctrl+Enter)
4. Wait 30-60 seconds
5. ✅ Done!

---

## 📋 What Gets Loaded

### Programs (16 total):
1. ✅ Barber Apprenticeship
2. ✅ HVAC Technician
3. ✅ CNA Certification
4. ✅ CDL Truck Driving
5. ✅ Medical Assistant
6. ✅ Building Maintenance Technician
7. ✅ Professional Esthetician
8. ✅ Business Start-Up & Marketing
9. ✅ Emergency Health & Safety Technician
10. ✅ Direct Support Professional
11. ✅ Tax Preparation & Financial Services
12. ✅ Public Safety Reentry Specialist
13. ✅ Beauty & Career Educator
14. ✅ Certified Peer Support Professional
15. ✅ Certified Peer Recovery Coach
16. ✅ Certified Community Healthcare Worker

### Courses (50+ total):
- Full curriculum for each program
- Lessons and modules
- Assignments and quizzes
- Course materials
- Completion tracking

---

## ✅ Verify It Worked

After running the migration, check:

```sql
-- Check programs loaded
SELECT COUNT(*) FROM programs;
-- Should return: 16

-- Check courses loaded
SELECT COUNT(*) FROM courses;
-- Should return: 50+

-- See all programs
SELECT slug, title FROM programs ORDER BY title;
```

---

## 🆘 If You Get Errors

### Error: "relation 'programs' does not exist"

**Solution:** Run the base schema first:

1. Open `supabase-schema.sql` in the repository
2. Copy and paste into SQL Editor
3. Run it
4. Then run `RUN_ALL_MIGRATIONS.sql` again

---

### Error: "duplicate key value violates unique constraint"

**Solution:** Data already exists! You're good to go.

To verify:
```sql
SELECT COUNT(*) FROM programs;
```

If it returns 16, you're all set!

---

## 🎯 Quick Copy-Paste Commands

### Check if migrations are needed:
```sql
SELECT COUNT(*) FROM programs;
SELECT COUNT(*) FROM courses;
```

### If tables don't exist, create them:
```sql
-- Copy entire contents of supabase-schema.sql here
```

### Load all data:
```sql
-- Copy entire contents of RUN_ALL_MIGRATIONS.sql here
```

---

## 📱 Alternative: Use Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or run specific migration
supabase db execute --file supabase/migrations/RUN_ALL_MIGRATIONS.sql
```

---

## 🔗 Direct Links

**Supabase Dashboard:**
👉 https://supabase.com/dashboard

**SQL Editor:**
👉 https://supabase.com/dashboard/project/_/sql

**Migration File:**
👉 https://github.com/elevateforhumanity/fix2/blob/main/supabase/migrations/RUN_ALL_MIGRATIONS.sql

---

## ⏱️ Time Estimate

- **Reading this guide:** 2 minutes
- **Opening Supabase:** 30 seconds
- **Copying & pasting:** 1 minute
- **Running migration:** 30-60 seconds
- **Verifying:** 30 seconds

**Total:** ~5 minutes

---

## 🎓 After Migrations Run

Your site will have:
- ✅ All 16 programs visible at `/programs`
- ✅ All 50+ courses available
- ✅ Students can enroll
- ✅ Course pages work
- ✅ Student dashboard shows courses
- ✅ Progress tracking enabled
- ✅ Certificates ready

**You can start classes immediately!**

---

## 📞 Need Help?

**Can't find the file?**
- It's in: `supabase/migrations/RUN_ALL_MIGRATIONS.sql`
- Or view on GitHub: https://github.com/elevateforhumanity/fix2/blob/main/supabase/migrations/RUN_ALL_MIGRATIONS.sql

**Supabase not working?**
- Check you're logged in: https://supabase.com/dashboard
- Verify project is created
- Check you have the correct project selected

**Still stuck?**
- Check `RUN_MIGRATIONS_GUIDE.md` for detailed step-by-step
- Check `MIGRATION_STATUS.md` for full migration list

---

## 🚀 DO THIS NOW

1. Open Supabase SQL Editor
2. Copy `RUN_ALL_MIGRATIONS.sql`
3. Paste and run
4. Verify with `SELECT COUNT(*) FROM programs;`
5. ✅ Start enrolling students!

**That's it! Your LMS is ready to go!** 🎉
