# 🚀 Deploy Certificate System - Quick Guide

## Step 1: Apply Database Migrations (5 minutes)

### Open Supabase SQL Editor

**Direct Link:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new)

### Copy and Run This SQL

1. Click the link above to open SQL Editor
2. Copy the entire contents of `supabase/migrations/APPLY_ALL_MIGRATIONS.sql`
3. Paste into the SQL Editor
4. Click **Run** (or press Ctrl+Enter)
5. Wait for success message

**Expected Output:**

```
✅ All migrations applied successfully!

Next steps:
1. Create storage bucket: certificates (public)
2. Assign roles to users in user_roles table
3. Test the certificate system
```

---

## Step 2: Create Storage Bucket (2 minutes)

### Open Supabase Storage

**Direct Link:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets)

### Create Bucket

1. Click **New bucket**
2. Name: `certificates`
3. ✅ Check **Public bucket**
4. Click **Create bucket**
5. Verify it appears in the list

---

## Step 3: Assign Your Admin Role (2 minutes)

### Get Your User ID

**Direct Link:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users)

1. Find your user in the list
2. Click on your user
3. Copy the **ID** (UUID format)

### Assign Admin Role

**Direct Link:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new)

Run this SQL (replace `YOUR_USER_ID`):

```sql
-- Make yourself an admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify it worked
SELECT u.email, ur.role
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.id = 'YOUR_USER_ID';
```

**Expected Output:**

```
email                | role
---------------------|-------
your@email.com       | admin
```

---

## Step 4: Build and Deploy (3 minutes)

### Build Locally First

```bash
cd /workspaces/fix2
npm run build
```

**Expected:** Build completes without errors

### Deploy to Production

```bash
# Commit changes
git add .
git commit -m "feat: add role-based access and certificate system

- Magic link authentication
- Role-based access control (student/staff/admin)
- Certificate issuance and verification
- Public certificate verification
- Integration with existing LMS and autopilot

Co-authored-by: Ona <no-reply@ona.com>"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

### Monitor Deployment

**Netlify Deploy:** [https://app.netlify.com/sites/elevateforhumanityfix/deploys](https://app.netlify.com/sites/elevateforhumanityfix/deploys)

Wait for deployment to complete (usually 2-3 minutes)

---

## Step 5: Test Production (5 minutes)

### Test Authentication

1. Visit: [https://portal.elevateforhumanity.org/login](https://portal.elevateforhumanity.org/login)
2. Enter your email
3. Click "Send Magic Link"
4. Check your email
5. Click the magic link
6. Verify you're redirected and authenticated

### Test Staff Panel

1. Visit: [https://portal.elevateforhumanity.org/staff](https://portal.elevateforhumanity.org/staff)
2. Verify you can access (you're admin)
3. Fill in the form:
   - **Learner Email:** Your email
   - **Program ID:** `test-program-101`
   - **Program Name:** `Test Program 101`
   - **PDF:** (optional)
4. Click "Issue Certificate"
5. Copy the verification code

### Test Certificate Viewing

1. Visit: [https://portal.elevateforhumanity.org/my-certificates](https://portal.elevateforhumanity.org/my-certificates)
2. Verify you see the test certificate

### Test Public Verification

1. Visit: `https://portal.elevateforhumanity.org/verify/YOUR_CODE`
2. Verify certificate details are displayed

---

## ✅ Success Checklist

- [ ] Database migrations applied
- [ ] Storage bucket created
- [ ] Admin role assigned
- [ ] Build completed successfully
- [ ] Deployed to production
- [ ] Magic link authentication works
- [ ] Can access staff panel
- [ ] Can issue certificates
- [ ] Can view certificates
- [ ] Public verification works

---

## 🔗 Important Links

### Production URLs

- **Main Site:** [https://portal.elevateforhumanity.org](https://portal.elevateforhumanity.org)
- **Login:** [https://portal.elevateforhumanity.org/login](https://portal.elevateforhumanity.org/login)
- **My Certificates:** [https://portal.elevateforhumanity.org/my-certificates](https://portal.elevateforhumanity.org/my-certificates)
- **Staff Panel:** [https://portal.elevateforhumanity.org/staff](https://portal.elevateforhumanity.org/staff)
- **LMS:** [https://portal.elevateforhumanity.org/lms](https://portal.elevateforhumanity.org/lms)

### Admin Dashboards

- **Supabase:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)
- **Netlify:** [https://app.netlify.com/sites/elevateforhumanityfix](https://app.netlify.com/sites/elevateforhumanityfix)
- **GitHub:** [https://github.com/elevateforhumanity/fix2](https://github.com/elevateforhumanity/fix2)

### Quick Access

- **SQL Editor:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new)
- **Storage:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets)
- **Users:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users)
- **Logs:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/explorer](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/explorer)

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Magic Link Not Working

- Check spam folder
- Verify email in Supabase Auth → Users
- Check Supabase logs

### Cannot Access /staff

```sql
-- Verify role
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your@email.com';
```

### Certificate Upload Fails

- Verify `certificates` bucket exists
- Check bucket is public
- Verify file is PDF

---

## 📚 Documentation

- **Quick Reference:** `QUICK_REFERENCE.md`
- **Full Setup Guide:** `docs/AUTHENTICATION_SETUP.md`
- **Quick Start:** `docs/CERTIFICATES_QUICKSTART.md`
- **Integration Guide:** `docs/AUTOPILOT_LMS_INTEGRATION.md`
- **Visual Guide:** `docs/VISUAL_GUIDE.md`

---

## 🎉 What You Get

### Features

✅ Magic link authentication (passwordless)  
✅ Role-based access (student/staff/admin)  
✅ Certificate issuance system  
✅ Public certificate verification  
✅ PDF upload and storage  
✅ Mobile-responsive design  
✅ Integration with existing LMS  
✅ Integration with autopilot system

### Security

✅ Row-level security (RLS)  
✅ Role-based route protection  
✅ Secure authentication  
✅ Audit trails

### Automation

✅ Auto-generate verification codes  
✅ Auto-upload PDFs to storage  
✅ Auto-send magic links  
✅ Integration with autopilot for course creation

---

**Ready to deploy?** Follow the steps above! 🚀
