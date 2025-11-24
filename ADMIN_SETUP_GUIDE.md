# Admin Access Setup Guide

## 🔐 How to Set Up Your Admin Account

### Step 1: Create Your Account

1. Go to [https://www.elevateforhumanity.org/signup](https://www.elevateforhumanity.org/signup)
2. Enter your email and password
3. Click "Sign Up"
4. Verify your email (check spam folder)

### Step 2: Get Your User ID

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on your project
3. Click **"Authentication"** in left sidebar
4. Click **"Users"**
5. Find your email and **copy the User ID** (long UUID like `a1b2c3d4-e5f6-7890...`)

### Step 3: Make Yourself Admin

1. In Supabase, click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Paste this SQL (replace with YOUR info):

```sql
-- Replace these values with YOUR information
INSERT INTO public.profiles (id, email, role, full_name, enrollment_status)
VALUES (
  'YOUR-USER-ID-HERE',  -- Paste your User ID from Step 2
  'your-email@example.com',  -- Your email
  'admin',  -- This makes you an admin
  'Your Name',  -- Your name
  'active'
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  enrollment_status = 'active';
```

4. Click **"Run"** (or Ctrl/Cmd + Enter)
5. You should see "Success. 1 row affected"

### Step 4: Access Admin Portal

1. Go to [https://www.elevateforhumanity.org/admin](https://www.elevateforhumanity.org/admin)
2. Log in with your email and password
3. You should now see the admin dashboard!

---

## 🎓 What You Can Access as Admin:

### Admin Portal
- **URL:** [/admin](https://www.elevateforhumanity.org/admin)
- View applications
- Manage students
- View analytics
- Manage certificates
- 50+ admin features

### Course Creator
- **URL:** [/create-course](https://www.elevateforhumanity.org/create-course)
- Create new courses
- Add modules and lessons
- Publish courses to students

### Course Management
- **URL:** [/admin/courses/manage](https://www.elevateforhumanity.org/admin/courses/manage)
- View all courses
- Edit courses
- Publish/unpublish
- Delete courses

### LMS Builder
- **URL:** [/lms/builder](https://www.elevateforhumanity.org/lms/builder)
- Advanced course builder
- Module organization
- Lesson types

---

## 🔧 Troubleshooting:

### "Unauthorized" Error
- Make sure you ran the SQL in Step 3
- Check that your User ID is correct
- Verify your email matches

### "Profile not found"
- The SQL creates your profile automatically
- If it still doesn't work, check Supabase logs

### Can't log in
- Make sure you verified your email
- Try resetting your password
- Check Supabase Authentication → Users to see if account exists

### Admin page times out
- This means database connection is working but profile doesn't have admin role
- Re-run the SQL from Step 3
- Make sure `role = 'admin'` (not 'student' or 'instructor')

---

## 👥 Adding More Admins:

To make someone else an admin:

1. They sign up at `/signup`
2. Get their User ID from Supabase → Authentication → Users
3. Run this SQL:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'THEIR-USER-ID';
```

---

## 🎯 Role Types:

- **admin** - Full access to everything
- **instructor** - Can create courses, view students
- **staff** - Can view applications, manage students
- **student** - Can enroll in courses, view own progress
- **case_manager** - Can manage student cases
- **employer** - Can view workforce analytics

---

## ✅ Quick Test:

After setup, test these URLs:

1. ✅ [/admin](https://www.elevateforhumanity.org/admin) - Admin dashboard
2. ✅ [/create-course](https://www.elevateforhumanity.org/create-course) - Course creator
3. ✅ [/admin/courses/manage](https://www.elevateforhumanity.org/admin/courses/manage) - Course management
4. ✅ [/lms/builder](https://www.elevateforhumanity.org/lms/builder) - LMS builder

If all 4 work, you're all set! 🎉

---

## 📞 Need Help?

If you're stuck:
1. Check Supabase logs (Dashboard → Logs → API)
2. Verify environment variables are set in Vercel
3. Make sure database migration ran successfully
4. Check that you're using the correct User ID

**Your admin account should be ready in 5 minutes!**
