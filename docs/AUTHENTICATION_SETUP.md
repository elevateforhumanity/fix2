# Authentication & Role-Based Access Setup

This guide explains how to set up magic link authentication, role-based access control, and the certificate management system.

## Table of Contents

1. [Database Setup](#database-setup)
2. [Role Management](#role-management)
3. [Magic Link Authentication](#magic-link-authentication)
4. [Certificate System](#certificate-system)
5. [Testing](#testing)

---

## Database Setup

### 1. Run Migrations

Apply the SQL migrations to create the necessary tables:

```bash
# In Supabase SQL Editor, run these files in order:
# 1. supabase/migrations/001_user_roles.sql
# 2. supabase/migrations/002_certificates.sql
```

Or use the Supabase CLI:

```bash
supabase db push
```

### 2. Create Storage Bucket

1. Go to Supabase Console → Storage
2. Create a new bucket named `certificates`
3. Set it to **Public** (so certificate PDFs can be accessed via public URLs)
4. Configure RLS policies if needed for additional security

---

## Role Management

### User Roles

The system supports three roles:
- **student** (default) - Can view their own certificates
- **staff** - Can issue certificates to students
- **admin** - Full access to all features

### Assigning Roles

#### Method 1: User Metadata (Quick Setup)

For quick testing, set roles in user metadata:

1. Go to Supabase Console → Authentication → Users
2. Select a user
3. Edit `user_metadata` and add:
   ```json
   {
     "role": "staff"
   }
   ```

#### Method 2: Database Table (Recommended for Production)

Insert roles into the `user_roles` table:

```sql
-- Make a user staff
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'staff');

-- Make a user admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');

-- Update existing role
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id = 'user-uuid-here';
```

**Note:** The `user_roles` table takes precedence over `user_metadata`. If a role exists in the database, it will be used; otherwise, the system falls back to metadata, and finally defaults to 'student'.

---

## Magic Link Authentication

### How It Works

1. User enters their email on the login page
2. System sends a magic link to their email
3. User clicks the link in their email
4. System authenticates them and redirects to the intended page

### Configuration

Magic links are configured in Supabase:

1. Go to Supabase Console → Authentication → Email Templates
2. Customize the "Magic Link" template if needed
3. Ensure your site URL is configured in Authentication → URL Configuration

### Redirect Flow

The magic link redirects to `/auth/callback?returnTo=/intended-page`

The callback page:
- Completes the authentication
- Redirects to the `returnTo` parameter (default: `/student-portal`)

---

## Certificate System

### Issuing Certificates (Staff/Admin)

1. Navigate to `/staff` (requires staff or admin role)
2. Fill in the form:
   - **Learner Email**: The student's registered email
   - **Program ID**: A unique slug (e.g., `digital-literacy-101`)
   - **Program Name**: Display name (e.g., `Digital Literacy 101`)
   - **Certificate PDF**: Optional PDF file to upload
3. Click "Issue Certificate"
4. A verification code is generated automatically
5. The certificate is saved and the PDF (if provided) is uploaded to storage

### Viewing Certificates (Students)

1. Students can view their certificates at `/my-certificates`
2. Each certificate shows:
   - Program name
   - Issue date
   - Download PDF button (if PDF was uploaded)
   - Verification link

### Public Verification

Anyone can verify a certificate at `/verify/{code}`:

1. Navigate to `/verify/ABC12345` (replace with actual code)
2. The page displays:
   - Program name
   - Issue date
   - Verification status
   - Link to PDF (if available)

This allows employers or institutions to verify certificate authenticity.

---

## Testing

### Test Magic Link Authentication

1. Go to `/login`
2. Enter a test email
3. Check your email for the magic link
4. Click the link to complete sign-in

**Development Tip:** In development, Supabase sends emails to the console. Check your terminal or Supabase logs.

### Test Role-Based Access

1. **As Student:**
   - Sign in with a student account
   - Navigate to `/my-certificates` ✅
   - Try to access `/staff` ❌ (should redirect to `/not-authorized`)

2. **As Staff:**
   - Sign in with a staff account
   - Navigate to `/staff` ✅
   - Issue a test certificate
   - Verify the certificate appears in the student's account

3. **As Admin:**
   - Sign in with an admin account
   - Access all routes ✅
   - Manage roles and certificates

### Test Certificate Flow

1. **Issue Certificate:**
   - Sign in as staff/admin
   - Go to `/staff`
   - Issue a certificate to a test student
   - Note the verification code

2. **View Certificate:**
   - Sign in as the student
   - Go to `/my-certificates`
   - Verify the certificate appears

3. **Public Verification:**
   - Sign out (or use incognito)
   - Go to `/verify/{code}`
   - Verify the certificate details are displayed

---

## Troubleshooting

### Magic Link Not Working

- Check Supabase email settings
- Verify site URL configuration
- Check spam folder
- In development, check Supabase logs for email content

### Role Not Showing

- Verify role is set in `user_roles` table or `user_metadata`
- Check browser console for errors
- Ensure user is authenticated
- Try signing out and back in

### Certificate Upload Fails

- Verify `certificates` storage bucket exists
- Check bucket is set to public
- Ensure file is a valid PDF
- Check file size limits

### RLS Errors

- Verify RLS policies are created correctly
- Check user has proper role assigned
- Review Supabase logs for policy violations

---

## Security Considerations

1. **RLS Policies:** All tables have Row Level Security enabled
2. **Role Verification:** Routes check roles before rendering
3. **Public Verification:** Only minimal certificate data is exposed publicly
4. **Storage Security:** PDFs are in a public bucket but have random filenames

---

## Next Steps

- [ ] Customize email templates in Supabase
- [ ] Set up production email provider (SendGrid, etc.)
- [ ] Add certificate PDF generation (jspdf, pdf-lib)
- [ ] Implement certificate revocation
- [ ] Add audit logging for certificate issuance
- [ ] Create admin dashboard for role management

---

## Support

For issues or questions:
- Check Supabase logs
- Review browser console errors
- Contact the development team
