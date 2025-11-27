# Supabase Authentication Setup Guide

## ✅ What's Already Done

- ✅ Supabase client configured (`lib/supabase/client.ts`)
- ✅ Authentication utilities created (`lib/auth.ts`)
- ✅ Auth hook for client-side (`lib/hooks/useAuth.ts`)
- ✅ Portal login pages connected to Supabase
- ✅ Error handling and loading states

## 🔧 What You Need To Do

### 1. Get Supabase Credentials

1. Go to [https://supabase.com](https://supabase.com)
2. Create a project (or use existing)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### 2. Add Environment Variables

#### For Local Development:

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### For Vercel Deployment:

1. Go to [https://vercel.com/elevateforhumanity/fix2-gpql/settings/environment-variables](https://vercel.com)
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
3. Apply to: **Production, Preview, Development**
4. Redeploy the site

### 3. Set Up Supabase Database

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Configure Supabase Auth Settings

In Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: `https://www.elevateforhumanity.org`
- **Redirect URLs**: Add these:
  - `https://www.elevateforhumanity.org/portal/student/dashboard`
  - `https://www.elevateforhumanity.org/admin/dashboard`
  - `https://www.elevateforhumanity.org/employer/dashboard`

### 5. Create Test Users

In Supabase Dashboard → **Authentication** → **Users** → **Add User**:

**Student Account:**
- Email: `student@test.com`
- Password: `Test123!`
- User Metadata: `{"role": "student", "name": "Test Student"}`

**Staff Account:**
- Email: `staff@test.com`
- Password: `Test123!`
- User Metadata: `{"role": "staff", "name": "Test Staff"}`

**Employer Account:**
- Email: `employer@test.com`
- Password: `Test123!`
- User Metadata: `{"role": "employer", "name": "Test Employer"}`

## 🧪 Testing

1. Go to [https://www.elevateforhumanity.org/portal](https://www.elevateforhumanity.org/portal)
2. Click **Student Portal**
3. Log in with: `student@test.com` / `Test123!`
4. Should redirect to student dashboard

## 🔒 User Roles

The system supports these roles:
- `student` - Learners taking courses
- `staff` - Instructors and case managers
- `employer` - Companies hiring/managing apprentices
- `admin` - Full system access

Roles are stored in `user_metadata.role` and synced to `profiles.role`.

## 📝 Next Steps

After authentication works:

1. **Add role-based redirects** - Check user role and send to correct dashboard
2. **Protect dashboard routes** - Add middleware to check authentication
3. **Add password reset** - Email-based password recovery
4. **Add registration flow** - Let students self-register

## 🆘 Troubleshooting

**"Invalid email or password"**
- Check Supabase credentials are correct
- Verify user exists in Supabase Auth
- Check browser console for errors

**"CORS error"**
- Add your domain to Supabase allowed origins
- Check Site URL is configured correctly

**"User not found"**
- Create test users in Supabase Dashboard
- Verify email confirmation is disabled for testing

## 📚 Documentation

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
