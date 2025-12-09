# Admin Access Guide

## 🔐 How to Access Admin Dashboard

### Option 1: Start Development Server

```bash
npm run dev
```

Then navigate to:
- **Login:** [http://localhost:3000/login](http://localhost:3000/login)
- **Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)

### Option 2: Use Preview Server (Gitpod)

The preview server should already be running. Access via the preview URL.

---

## 📋 Admin Routes Available

### Main Admin Dashboard
- `/admin` - Main admin command center

### User Management
- `/admin/users` - User management
- `/admin/applicants` - View applicants
- `/admin/applications` - Application management
- `/admin/students` - Student management

### Program Management
- `/admin/programs` - Program management
- `/admin/courses` - Course management
- `/admin/enrollments` - Enrollment tracking

### Financial
- `/admin/cash-advances` - Cash advance management
- `/admin/tax-filing` - Tax filing management
- `/admin/payroll` - Payroll management

### Reporting
- `/admin/analytics` - Analytics dashboard
- `/admin/reports` - Report generation
- `/admin/reporting` - Reporting tools

### Operations
- `/admin/control-center` - Control center
- `/admin/dashboard` - Enhanced dashboard
- `/admin/operations` - Operations management

### Content Management
- `/admin/course-builder` - Course builder
- `/admin/course-studio` - Course studio
- `/admin/media-studio` - Media management
- `/admin/video-manager` - Video management

### System
- `/admin/settings` - System settings
- `/admin/security` - Security settings
- `/admin/audit-logs` - Audit logs
- `/admin/system-health` - System health

---

## 🔑 Authentication Requirements

The admin dashboard requires:

1. **Valid Supabase Account**
   - Email and password authentication
   - Or Google OAuth

2. **Admin Role**
   - User profile must have `role = 'admin'` or `role = 'super_admin'`
   - Set in the `profiles` table in Supabase

3. **Active Session**
   - Must be logged in with valid session token

---

## 🚀 Quick Start

### 1. Start the Server

```bash
# Development mode
npm run dev

# Or use the preview
# The preview URL should be provided by Gitpod
```

### 2. Access Login Page

Navigate to `/login` and sign in with your credentials.

### 3. Access Admin

After login, navigate to `/admin` or any admin route.

---

## 🔧 Troubleshooting

### "Redirected to /login"
- You're not authenticated
- Sign in at `/login` first

### "Redirected to /unauthorized"
- Your account doesn't have admin role
- Check your profile in Supabase `profiles` table
- Ensure `role` column is set to `'admin'` or `'super_admin'`

### "Cannot connect to Supabase"
- Check environment variables are set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Login Form Not Showing
- The login page exists at `/login`
- The LoginForm component exists but may need to be added to the page
- You can access admin directly if you have a valid session

---

## 📝 Creating Admin User

If you need to create an admin user in Supabase:

```sql
-- 1. Create user account (via Supabase Auth UI or API)

-- 2. Update profile to admin
UPDATE profiles 
SET role = 'admin'
WHERE email = 'your-email@example.com';

-- Or for super admin
UPDATE profiles 
SET role = 'super_admin'
WHERE email = 'your-email@example.com';
```

---

## 🌐 Production Access

For production deployment:
1. Ensure environment variables are set in Vercel
2. Access via: `https://www.elevateforhumanity.org/admin`
3. Login required with admin credentials

---

## 📞 Need Help?

If you're still having trouble accessing admin:
1. Check if dev server is running
2. Verify Supabase connection
3. Check browser console for errors
4. Verify your user role in database
