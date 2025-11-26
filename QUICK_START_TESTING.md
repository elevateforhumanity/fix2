# 🚀 Quick Start Testing Guide

## What's Next: Test Your LMS

Your database is loaded with:
- ✅ 10 programs (Barber, CNA, HVAC, CDL, etc.)
- ✅ 22 achievements
- ✅ All 6 dashboards built

**Now you need to test it with real users!**

---

## 📋 Step-by-Step Testing Plan

### Step 1: Create Test Users (5 minutes)

Go to Supabase Auth Dashboard:
[https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users)

Click **"Add User"** and create these 5 users:

| Email | Password | Role |
|-------|----------|------|
| admin@elevateforhumanity.org | Admin123! | Admin |
| student@test.com | Student123! | Student |
| instructor@test.com | Instructor123! | Instructor |
| delegate@test.com | Delegate123! | Delegate |
| programholder@test.com | ProgramHolder123! | Program Holder |

**Important:** After creating each user, copy their UUID (you'll need it in Step 2)

---

### Step 2: Add User Profiles (5 minutes)

1. Open `CREATE_TEST_USERS.sql` file
2. Replace all `REPLACE_WITH_ADMIN_UUID` with actual UUIDs from Step 1
3. Run the script in Supabase SQL Editor

**Quick way to get UUIDs:**
```sql
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;
```

---

### Step 3: Test Each Dashboard (10 minutes)

Login to your app with each test user and verify their dashboard:

#### 1. Admin Dashboard
- Login: `admin@elevateforhumanity.org` / `Admin123!`
- URL: `/admin/operations`
- Should see: System stats, user management, program management

#### 2. Student Dashboard
- Login: `student@test.com` / `Student123!`
- URL: `/student/dashboard`
- Should see: Enrolled courses, progress, achievements, due dates

#### 3. Instructor Dashboard
- Login: `instructor@test.com` / `Instructor123!`
- URL: `/instructor/dashboard`
- Should see: Courses taught, student progress, grading

#### 4. Delegate Dashboard
- Login: `delegate@test.com` / `Delegate123!`
- URL: `/delegate/dashboard`
- Should see: Caseload, at-risk learners, compliance tracking

#### 5. Program Holder Dashboard
- Login: `programholder@test.com` / `ProgramHolder123!`
- URL: `/program-holder/dashboard`
- Should see: Revenue stats, enrollments, course management

#### 6. Compliance Dashboard
- Login: `admin@elevateforhumanity.org` / `Admin123!`
- URL: `/admin/compliance`
- Should see: WIOA compliance metrics, reporting

---

### Step 4: Test Key Features (15 minutes)

**Enrollment Flow:**
1. Login as student
2. Browse programs at `/programs`
3. Click "Enroll" on a program
4. Verify enrollment appears in student dashboard

**Progress Tracking:**
1. Login as student
2. Click into an enrolled course
3. Complete a lesson
4. Verify progress updates

**Achievement System:**
1. Complete various actions (login, complete lesson, etc.)
2. Check if achievements are awarded
3. Verify points are tracked

**Role-Based Access:**
1. Try accessing admin pages as student (should be blocked)
2. Try accessing student pages as admin (should work)
3. Verify middleware is protecting routes

---

### Step 5: Deploy to Production (2 minutes)

Once testing looks good:

```bash
git add .
git commit -m "Add seed data and test users

- 10 workforce programs (Barber, CNA, HVAC, CDL, etc.)
- 22 gamification achievements
- Test user creation scripts
- All 6 dashboards functional

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
```

Vercel will auto-deploy in 2-3 minutes.

---

## 🐛 Troubleshooting

### "Can't see my dashboard"
- Check that user has correct role in `profiles` table
- Verify middleware is allowing access
- Check browser console for errors

### "No programs showing"
- Verify seed data loaded: `SELECT COUNT(*) FROM programs;`
- Check that programs have `is_active = true`
- Verify Supabase RLS policies allow read access

### "Enrollment not working"
- Check that student profile exists in `students` table
- Verify program ID is correct
- Check enrollment status in database

### "Achievements not appearing"
- Verify achievements loaded: `SELECT COUNT(*) FROM achievements;`
- Check that `is_active = true`
- Verify achievement trigger logic is working

---

## 📊 Success Criteria

Your LMS is ready for production when:

- ✅ All 5 test users can login
- ✅ Each role sees their correct dashboard
- ✅ Students can enroll in programs
- ✅ Progress tracking works
- ✅ Achievements are awarded
- ✅ Role-based access control works
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Deployed to production

---

## 🎯 Next Steps After Testing

1. **Add Real Content**
   - Upload course videos
   - Add lesson materials
   - Create quizzes and assessments

2. **Configure Email**
   - Set up email templates
   - Configure SMTP
   - Test enrollment confirmations

3. **Add Payment Processing**
   - Integrate Stripe
   - Set up pricing tiers
   - Test checkout flow

4. **Marketing Site**
   - Add landing pages
   - Create program detail pages
   - Add testimonials

5. **Go Live!**
   - Add real programs
   - Invite real students
   - Train staff on system

---

## 🆘 Need Help?

If you get stuck:
1. Check browser console for errors
2. Check Supabase logs
3. Verify database data with SQL queries
4. Check middleware and RLS policies

---

**You're 95% done! Just need to create test users and verify everything works.** 🚀
