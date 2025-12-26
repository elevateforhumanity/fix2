# TEST PROGRAM HOLDER LOGIN - DO THIS NOW

## PROGRAM HOLDER LOGIN LINK

**Direct Link:** https://www.elevateforhumanity.org/login

**After Login, You'll Be Redirected To:**

- If onboarding incomplete: https://www.elevateforhumanity.org/program-holder/onboarding
- If onboarding complete: https://www.elevateforhumanity.org/program-holder/dashboard

---

## QUICK TEST CHECKLIST

### 1. CREATE TEST ACCOUNT (Admin Task)

**Option A: Via Supabase Dashboard**

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Navigate to: Authentication → Users
3. Click "Add User"
4. Enter:
   - Email: `test-program-holder@example.com`
   - Password: `TestPass123!`
   - Auto-confirm: Yes
5. After user created, go to: Database → Table Editor → `profiles`
6. Find the new user row
7. Set `role` = `program_holder`
8. Save

**Option B: Via SQL (Faster)**

```sql
-- Run in Supabase SQL Editor
-- 1. Create auth user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test-program-holder@example.com',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  ''
);

-- 2. Create profile with program_holder role
INSERT INTO profiles (id, email, role, full_name)
SELECT
  id,
  email,
  'program_holder',
  'Test Program Holder'
FROM auth.users
WHERE email = 'test-program-holder@example.com';
```

---

### 2. LOGIN AS PROGRAM HOLDER

**URL:** https://www.elevateforhumanity.org/login

**Credentials:**

- Email: `test-program-holder@example.com`
- Password: `TestPass123!`

**Expected Result:**

- Login succeeds
- Redirect to `/program-holder/onboarding`
- See onboarding checklist

---

### 3. COMPLETE ONBOARDING STEPS

#### Step 1: Sign MOU

**URL:** https://www.elevateforhumanity.org/program-holder/mou

**Actions:**

1. Read MOU
2. Check "I agree" checkbox
3. Draw signature in signature pad
4. Click "Sign MOU"

**Expected:** Signature saved, redirect to next step

---

#### Step 2: Acknowledge Handbook

**URL:** https://www.elevateforhumanity.org/program-holder/handbook

**Actions:**

1. Scroll through handbook
2. Check "I have read and understand" checkbox
3. Click "Acknowledge Handbook"

**Expected:** Acknowledgement saved, redirect to next step

---

#### Step 3: Acknowledge Rights & Responsibilities

**URL:** https://www.elevateforhumanity.org/program-holder/rights-responsibilities

**Actions:**

1. Scroll through document
2. Check "I acknowledge" checkbox
3. Click "Acknowledge"

**Expected:** Acknowledgement saved, redirect to documents

---

#### Step 4: Upload Documents

**URL:** https://www.elevateforhumanity.org/program-holder/documents

**Required Documents:**

1. **Syllabus** (PDF or image)
2. **Business License** (PDF or image)
3. **Insurance Certificate** (PDF or image)

**Actions for Each Document:**

1. Click "Upload Document"
2. Select document type from dropdown
3. Add description (optional)
4. Choose file
5. Click "Upload"
6. Wait for success message

**Expected:**

- Each file uploads successfully
- Documents appear in list with "Pending Review" status
- After all 3 uploaded, onboarding shows documents step complete

---

### 4. ADMIN REVIEW (Switch to Admin Account)

**URL:** https://www.elevateforhumanity.org/admin/program-holder-documents

**Actions:**

1. Login as admin
2. Navigate to Program Holder Documents
3. Click "Pending" tab
4. For each document:
   - Click "View" to preview
   - Click "Review"
   - Add notes (optional)
   - Click "Approve"

**Expected:**

- Document status changes to "Approved"
- Program holder sees updated status

---

### 5. ACCESS DASHBOARD (Back to Program Holder)

**URL:** https://www.elevateforhumanity.org/program-holder/dashboard

**Expected:**

- Dashboard loads without redirect
- No "complete onboarding" messages
- Full portal access granted

---

## VERIFICATION QUERIES

Run these in Supabase SQL Editor to verify:

```sql
-- 1. Check user exists with correct role
SELECT id, email, role, full_name
FROM profiles
WHERE email = 'test-program-holder@example.com';
-- Expected: 1 row, role = 'program_holder'

-- 2. Check MOU signed
SELECT user_id, signed_at, signature_data IS NOT NULL as has_signature
FROM mou_signatures
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
-- Expected: 1 row with signed_at timestamp

-- 3. Check acknowledgements
SELECT
  user_id,
  handbook_acknowledged_at IS NOT NULL as handbook_done,
  rights_acknowledged_at IS NOT NULL as rights_done
FROM program_holder_acknowledgements
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
-- Expected: Both columns = true

-- 4. Check documents uploaded
SELECT
  document_type,
  file_name,
  approved,
  approval_notes,
  created_at
FROM program_holder_documents
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com')
ORDER BY created_at;
-- Expected: 3 rows (syllabus, business_license, insurance)

-- 5. Check onboarding complete
SELECT
  (SELECT COUNT(*) FROM mou_signatures WHERE user_id = p.id) as mou_signed,
  (SELECT handbook_acknowledged_at IS NOT NULL FROM program_holder_acknowledgements WHERE user_id = p.id) as handbook,
  (SELECT rights_acknowledged_at IS NOT NULL FROM program_holder_acknowledgements WHERE user_id = p.id) as rights,
  (SELECT COUNT(*) FROM program_holder_documents WHERE user_id = p.id AND approved = true) as approved_docs
FROM profiles p
WHERE email = 'test-program-holder@example.com';
-- Expected: mou_signed=1, handbook=true, rights=true, approved_docs=3
```

---

## TROUBLESHOOTING

### Issue: Can't Create User

**Fix:** Use Supabase Dashboard → Authentication → Add User manually

### Issue: Login Fails

**Fix:**

1. Check email is confirmed in Supabase
2. Reset password via Supabase Dashboard
3. Verify user exists in auth.users table

### Issue: Redirects to Wrong Page After Login

**Fix:**

1. Check `profiles.role` is set to `program_holder`
2. Clear browser cookies
3. Try incognito mode

### Issue: Document Upload Fails

**Possible Causes:**

1. Storage bucket doesn't exist
2. File too large (>10MB)
3. Wrong file type
4. RLS policy blocking

**Fix:**

1. Check Supabase Storage → Buckets → `program-holder-docs` exists
2. Verify bucket policies allow authenticated uploads
3. Check browser console for errors
4. Try smaller file (<5MB)

### Issue: Admin Can't See Documents

**Fix:**

1. Verify admin role in profiles table
2. Check RLS policies allow admin SELECT
3. Refresh page

---

## STORAGE BUCKET VERIFICATION

**Check if bucket exists:**

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Look for bucket named: `program-holder-docs`
3. If missing, create it:
   - Name: `program-holder-docs`
   - Public: No (private)
   - File size limit: 10MB
   - Allowed MIME types: `application/pdf,image/jpeg,image/png,image/jpg`

**Bucket Policies (if creating new):**

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'program-holder-docs');

-- Allow users to read their own files
CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'program-holder-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow admins to read all files
CREATE POLICY "Admins can read all files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'program-holder-docs'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);
```

---

## SUCCESS CRITERIA

✅ **Onboarding Complete When:**

1. MOU signed (signature captured)
2. Handbook acknowledged (timestamp recorded)
3. Rights acknowledged (timestamp recorded)
4. 3 documents uploaded (syllabus, license, insurance)
5. All 3 documents approved by admin
6. Dashboard accessible without redirect

---

## QUICK LINKS

- **Program Holder Login:** https://www.elevateforhumanity.org/login
- **Program Holder Dashboard:** https://www.elevateforhumanity.org/program-holder/dashboard
- **Program Holder Documents:** https://www.elevateforhumanity.org/program-holder/documents
- **Admin Document Review:** https://www.elevateforhumanity.org/admin/program-holder-documents
- **Supabase Dashboard:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **Health Check:** https://www.elevateforhumanity.org/api/health

---

**Test Account Credentials:**

- Email: `test-program-holder@example.com`
- Password: `TestPass123!`

**Time to Complete:** 10-15 minutes

**Last Updated:** December 23, 2025
