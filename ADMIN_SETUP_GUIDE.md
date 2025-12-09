# 🔐 Admin Access Setup Guide

## Quick Setup (5 minutes)

### Step 1: Sign Up on Your Site

Go to: **https://www.elevateforhumanity.org/signup**

Create an account with:
- Your email
- A password
- Your name

### Step 2: Get Your User ID

1. Go to Supabase SQL Editor:
   **https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor**

2. Run this query (replace YOUR_EMAIL with your actual email):

```sql
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'YOUR_EMAIL@example.com';
```

3. **Copy the `id`** value (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 3: Make Yourself Admin

In the same SQL Editor, run this (replace the values):

```sql
INSERT INTO profiles (
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
)
VALUES (
  'PASTE_YOUR_USER_ID_HERE',  -- From Step 2
  'your.email@example.com',    -- Your email
  'Your Full Name',            -- Your name
  'super_admin',               -- Admin role
  NOW(),
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET
  role = 'super_admin',
  updated_at = NOW();
```

### Step 4: Verify It Worked

Run this query:

```sql
SELECT id, email, full_name, role 
FROM profiles 
WHERE email = 'your.email@example.com';
```

You should see your profile with `role = 'super_admin'`

### Step 5: Access Admin Dashboard

Go to: **https://www.elevateforhumanity.org/admin**

You should now have full admin access! 🎉

---

## Alternative: Quick Admin Creation (If You Already Have an Account)

If you already signed up, just run this in Supabase SQL Editor:

```sql
-- Find your user
SELECT id, email FROM auth.users WHERE email = 'YOUR_EMAIL';

-- Make yourself admin (replace the ID and email)
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
  'YOUR_USER_ID',
  'YOUR_EMAIL',
  'Your Name',
  'super_admin',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET role = 'super_admin', updated_at = NOW();
```

---

## Troubleshooting

### "Table profiles does not exist"

Run this to create the profiles table:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );
```

### "Can't access /admin"

1. Make sure you're logged in
2. Check your profile has `role = 'super_admin'`
3. Clear browser cache and try again
4. Check browser console for errors

### "Application form not working"

Check if the applications table exists:

```sql
SELECT COUNT(*) FROM applications;
```

If error, the table might be missing. Let me know and I'll create it.

---

## Need Help?

If you run into issues:
1. Check Supabase logs
2. Check browser console for errors
3. Verify you're logged in
4. Make sure your profile role is set correctly

---

**Once you're set up as admin, you'll have access to:**
- Admin Dashboard
- User Management
- Application Reviews
- Course Management
- Reports & Analytics
- System Settings
