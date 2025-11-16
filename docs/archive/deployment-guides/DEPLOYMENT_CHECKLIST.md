# Deployment Checklist - Certificate System

Use this checklist to deploy the role-based access and certificate system to production.

## ✅ Pre-Deployment (Development)

- [ ] Review all code changes
- [ ] Test magic link authentication locally
- [ ] Test role-based access control
- [ ] Test certificate issuance flow
- [ ] Test public verification
- [ ] Verify build passes (`npm run build`)
- [ ] Check for console errors
- [ ] Test on mobile devices

## 🗄️ Database Setup

### Step 1: Run Migrations

- [ ] Open Supabase SQL Editor
- [ ] Run `supabase/migrations/001_user_roles.sql`
- [ ] Verify `user_roles` table created
- [ ] Run `supabase/migrations/002_certificates.sql`
- [ ] Verify `certificates` table created
- [ ] Check RLS policies are enabled

### Step 2: Verify Tables

```sql
-- Check tables exist
SELECT * FROM public.user_roles LIMIT 1;
SELECT * FROM public.certificates LIMIT 1;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('user_roles', 'certificates');
```

- [ ] Both tables exist
- [ ] RLS is enabled on both tables

### Step 3: Test Helper Function

```sql
-- Test get_user_by_email function
SELECT * FROM public.get_user_by_email('test@example.com');
```

- [ ] Function returns user data

## 📦 Storage Setup

### Create Certificates Bucket

- [ ] Go to Supabase Console → Storage
- [ ] Click "New bucket"
- [ ] Name: `certificates`
- [ ] Set to **Public**
- [ ] Click "Create bucket"
- [ ] Verify bucket appears in list

### Test Upload

- [ ] Try uploading a test PDF
- [ ] Get public URL
- [ ] Verify URL is accessible

## 👥 Role Assignment

### Assign Your First Admin

```sql
-- Replace with your actual user ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id-from-auth-users', 'admin');
```

- [ ] Admin role assigned
- [ ] Can access `/staff` route

### Assign Test Staff Member

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('staff-user-id', 'staff');
```

- [ ] Staff role assigned
- [ ] Can access `/staff` route

## 📧 Email Configuration

### Supabase Email Settings

- [ ] Go to Supabase Console → Authentication → Email Templates
- [ ] Review "Magic Link" template
- [ ] Customize branding if needed
- [ ] Test email delivery

### Production Email Provider (Optional)

- [ ] Configure SendGrid, AWS SES, or other provider
- [ ] Update Supabase email settings
- [ ] Test email delivery
- [ ] Verify links work correctly

## 🌐 Site Configuration

### URL Configuration

- [ ] Go to Supabase Console → Authentication → URL Configuration
- [ ] Set Site URL: `https://yoursite.com`
- [ ] Add Redirect URLs:
  - `https://yoursite.com/auth/callback`
  - `http://localhost:5173/auth/callback` (for dev)
- [ ] Save changes

### Environment Variables

- [ ] Verify `VITE_SUPABASE_URL` is set
- [ ] Verify `VITE_SUPABASE_ANON_KEY` is set
- [ ] Check Netlify/Vercel environment variables

## 🧪 Testing in Production

### Test Authentication

- [ ] Visit `/login`
- [ ] Enter email
- [ ] Receive magic link email
- [ ] Click link
- [ ] Redirected to portal
- [ ] User is authenticated

### Test Role-Based Access

- [ ] Sign in as student
- [ ] Can access `/my-certificates` ✅
- [ ] Cannot access `/staff` ❌
- [ ] Sign out

- [ ] Sign in as staff
- [ ] Can access `/staff` ✅
- [ ] Can issue certificates ✅
- [ ] Sign out

### Test Certificate Flow

- [ ] Sign in as staff
- [ ] Go to `/staff`
- [ ] Issue certificate to test student
- [ ] Note verification code
- [ ] Sign out

- [ ] Sign in as student
- [ ] Go to `/my-certificates`
- [ ] Verify certificate appears
- [ ] Download PDF (if uploaded)
- [ ] Sign out

- [ ] Visit `/verify/{code}` (no login)
- [ ] Verify certificate details shown
- [ ] Verify PDF link works

## 🔒 Security Verification

### RLS Policies

- [ ] Students can only see their own certificates
- [ ] Staff can issue certificates
- [ ] Admins have full access
- [ ] Public can verify certificates

### Test Unauthorized Access

- [ ] Try accessing `/staff` as student → redirects to `/not-authorized`
- [ ] Try accessing protected routes without login → redirects to `/login`
- [ ] Try accessing other users' certificates → blocked by RLS

## 📊 Monitoring

### Set Up Monitoring

- [ ] Enable Supabase logging
- [ ] Monitor authentication events
- [ ] Track certificate issuance
- [ ] Set up error alerts

### Analytics

- [ ] Track magic link conversions
- [ ] Monitor certificate views
- [ ] Track verification page visits

## 📝 Documentation

### Update Documentation

- [ ] Add production URLs to docs
- [ ] Document role assignment process
- [ ] Create staff training guide
- [ ] Update user help docs

### Team Training

- [ ] Train staff on certificate issuance
- [ ] Document common issues
- [ ] Create troubleshooting guide

## 🚀 Go Live

### Final Checks

- [ ] All tests passing
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Email delivery working
- [ ] Storage working
- [ ] RLS policies correct

### Deploy

- [ ] Merge to main branch
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test all flows in production

### Post-Deployment

- [ ] Monitor error logs
- [ ] Check email delivery
- [ ] Verify certificate issuance
- [ ] Test verification links
- [ ] Monitor performance

## 🎉 Success Criteria

- ✅ Users can sign in with magic links
- ✅ Roles are properly assigned and enforced
- ✅ Staff can issue certificates
- ✅ Students can view their certificates
- ✅ Public can verify certificates
- ✅ PDFs upload and download correctly
- ✅ No security vulnerabilities
- ✅ Mobile experience is smooth
- ✅ Email delivery is reliable

## 📞 Support Contacts

- **Supabase Issues**: [Supabase Support](https://supabase.com/support)
- **Email Delivery**: Check your email provider docs
- **Code Issues**: Review implementation docs

## 🔄 Rollback Plan

If issues occur:

1. **Database Issues**

   ```sql
   -- Disable RLS temporarily
   ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;
   ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;
   ```

2. **Code Issues**
   - Revert to previous deployment
   - Check error logs
   - Fix and redeploy

3. **Email Issues**
   - Switch back to Supabase default email
   - Verify URL configuration

---

## 📋 Quick Reference

### Important URLs

- Login: `/login`
- Certificates: `/my-certificates`
- Staff Panel: `/staff`
- Verify: `/verify/{code}`

### Important Tables

- `public.user_roles` - User role assignments
- `public.certificates` - Certificate records

### Important Buckets

- `certificates` - PDF storage (public)

### Important Functions

- `get_user_by_email(text)` - Find user by email

---

**Deployment Date**: **\*\***\_**\*\***  
**Deployed By**: **\*\***\_**\*\***  
**Production URL**: **\*\***\_**\*\***  
**Status**: ⬜ Not Started | ⬜ In Progress | ⬜ Complete
