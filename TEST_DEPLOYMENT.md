# Test Deployment - Certificate System

## Step 1: Apply Database Migrations ✅

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/migrations/APPLY_ALL_MIGRATIONS.sql`
5. Click **Run** (or press Ctrl+Enter)
6. Verify you see success messages at the bottom

**Expected Output:**

```
✅ All migrations applied successfully!

Next steps:
1. Create storage bucket: certificates (public)
2. Assign roles to users in user_roles table
3. Test the certificate system
```

## Step 2: Create Storage Bucket ✅

1. In Supabase Dashboard, click **Storage** in the left sidebar
2. Click **New bucket**
3. Enter bucket name: `certificates`
4. Set **Public bucket**: ✅ (checked)
5. Click **Create bucket**
6. Verify the bucket appears in the list

## Step 3: Assign Test Roles ✅

### Get Your User ID

1. In Supabase Dashboard, click **Authentication** → **Users**
2. Find your user and copy the **ID** (UUID)

### Assign Admin Role

1. Go to **SQL Editor**
2. Run this query (replace `YOUR_USER_ID`):

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

## Step 4: Test Locally ✅

### Start Dev Server

```bash
npm run dev
```

### Test Magic Link Authentication

1. Open browser to `http://localhost:5173/login`
2. Enter your email
3. Click "Send Magic Link"
4. Check your email (or Supabase logs in dev)
5. Click the magic link
6. Verify you're redirected and authenticated

**Expected:**

- ✅ Email sent successfully
- ✅ Magic link received
- ✅ Redirected to `/student-portal` or intended page
- ✅ Navigation shows your role badge

### Test Staff Panel Access

1. Navigate to `http://localhost:5173/staff`
2. Verify you can access the page (you're admin)
3. Fill in the form:
   - **Learner Email**: Your email (for testing)
   - **Program ID**: `test-program-101`
   - **Program Name**: `Test Program 101`
   - **PDF**: (optional) Upload a test PDF
4. Click "Issue Certificate"

**Expected:**

- ✅ Form submits successfully
- ✅ Success message with verification code
- ✅ Certificate saved to database

### Test Certificate Viewing

1. Navigate to `http://localhost:5173/my-certificates`
2. Verify you see the test certificate you just issued

**Expected:**

- ✅ Certificate appears in list
- ✅ Shows program name
- ✅ Shows issue date
- ✅ Download PDF button (if uploaded)
- ✅ Verification link

### Test Public Verification

1. Copy the verification code from the certificate
2. Navigate to `http://localhost:5173/verify/YOUR_CODE`
3. Verify certificate details are displayed

**Expected:**

- ✅ Certificate verified message
- ✅ Program name displayed
- ✅ Issue date displayed
- ✅ PDF link (if uploaded)

### Test Role-Based Access

1. Sign out
2. Create a new test user (or use existing student account)
3. Sign in as student
4. Try to access `/staff`

**Expected:**

- ❌ Redirected to `/not-authorized`
- ✅ Can access `/my-certificates`
- ✅ Navigation doesn't show "Staff Panel" link

## Step 5: Deploy to Production ✅

### Build for Production

```bash
npm run build
```

**Expected:**

- ✅ Build completes without errors
- ✅ No TypeScript errors
- ✅ No linting errors

### Deploy to Netlify

```bash
# If using Netlify CLI
netlify deploy --prod

# Or push to main branch for auto-deploy
git add .
git commit -m "feat: add role-based access and certificate system"
git push origin main
```

### Verify Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Verify these are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Step 6: Test Production ✅

### Test Authentication

1. Visit your production URL: `https://yoursite.netlify.app/login`
2. Enter email and send magic link
3. Check email and click link
4. Verify authentication works

### Test Certificate Flow

1. Sign in as admin/staff
2. Go to `/staff`
3. Issue a test certificate
4. Sign out
5. Sign in as student
6. Go to `/my-certificates`
7. Verify certificate appears
8. Test verification link

### Test Mobile

1. Open site on mobile device
2. Test authentication
3. Test navigation menu
4. Test certificate viewing
5. Verify responsive design

## Troubleshooting 🔧

### Magic Link Not Working

**Problem:** Email not received

**Solutions:**

- Check spam folder
- Verify Supabase email settings
- Check Supabase logs: Dashboard → Logs → Auth
- In development, check terminal for email content

### Cannot Access /staff

**Problem:** Redirected to /not-authorized

**Solutions:**

- Verify role is assigned in database:
  ```sql
  SELECT * FROM public.user_roles WHERE user_id = 'YOUR_USER_ID';
  ```
- Sign out and back in
- Check browser console for errors

### Certificate Upload Fails

**Problem:** Error uploading PDF

**Solutions:**

- Verify `certificates` bucket exists
- Check bucket is set to public
- Verify file is a valid PDF
- Check file size (max 50MB by default)

### RLS Policy Errors

**Problem:** "new row violates row-level security policy"

**Solutions:**

- Verify RLS policies were created:
  ```sql
  SELECT * FROM pg_policies
  WHERE tablename IN ('user_roles', 'certificates');
  ```
- Check user has correct role assigned
- Review Supabase logs for details

### Build Errors

**Problem:** Build fails with TypeScript errors

**Solutions:**

- Run `npm run build` locally first
- Check for missing imports
- Verify all files are committed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Success Checklist ✅

- [ ] Database migrations applied
- [ ] Storage bucket created
- [ ] Admin role assigned
- [ ] Magic link authentication works
- [ ] Can issue certificates as staff
- [ ] Can view certificates as student
- [ ] Public verification works
- [ ] Role-based access enforced
- [ ] Mobile responsive
- [ ] Production deployed
- [ ] Production tested

## Performance Checks 📊

### Database Performance

```sql
-- Check query performance
EXPLAIN ANALYZE
SELECT * FROM public.certificates
WHERE user_id = 'YOUR_USER_ID';

-- Should use index: idx_certificates_user_id
```

### Storage Performance

- Test PDF download speed
- Verify CDN is serving files
- Check file sizes are reasonable

### Page Load Times

- Login page: < 2s
- My Certificates: < 3s
- Staff Panel: < 2s
- Verify page: < 2s

## Monitoring 📈

### Set Up Alerts

1. Supabase Dashboard → **Logs**
2. Monitor for:
   - Authentication failures
   - RLS policy violations
   - Storage errors
   - Function errors

### Analytics

Track these metrics:

- Magic link conversion rate
- Certificate issuance rate
- Verification page views
- User role distribution

## Next Steps 🚀

After successful deployment:

1. **Train Staff**
   - How to issue certificates
   - How to handle errors
   - Support procedures

2. **User Documentation**
   - How to sign in
   - How to view certificates
   - How to share verification links

3. **Enhancements**
   - Auto-generate certificate PDFs
   - Email notifications
   - Certificate templates
   - Bulk issuance

---

**Test Date:** **\*\***\_**\*\***  
**Tested By:** **\*\***\_**\*\***  
**Status:** ⬜ Pass | ⬜ Fail  
**Notes:** **\*\***\_**\*\***
