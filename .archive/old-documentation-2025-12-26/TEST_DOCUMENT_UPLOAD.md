# Test Document Upload - Verification Script

**Purpose:** Verify Program Holder document upload system works end-to-end  
**Prerequisites:** Database migrations must be applied first

---

## Manual Test Steps

### 1. Create Test Program Holder Account

```sql
-- In Supabase SQL Editor
-- Create test user (if not exists)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES (
  gen_random_uuid(),
  'test-program-holder@example.com',
  crypt('TestPassword123!', gen_salt('bf')),
  NOW()
)
ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Create profile
INSERT INTO profiles (id, email, role, full_name, organization_id)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'test-program-holder@example.com'),
  'test-program-holder@example.com',
  'program_holder',
  'Test Program Holder',
  (SELECT id FROM organizations LIMIT 1)
)
ON CONFLICT (id) DO NOTHING;
```

### 2. Test Upload Flow

1. **Login:**
   - Go to: https://www.elevateforhumanity.org/login
   - Email: test-program-holder@example.com
   - Password: TestPassword123!

2. **Navigate to Documents:**
   - Go to: https://www.elevateforhumanity.org/program-holder/documents
   - Should see upload interface

3. **Upload Test Document:**
   - Select document type: "license"
   - Choose a test PDF file (< 10MB)
   - Add description: "Test business license"
   - Click "Upload Document"
   - Should see success message

4. **Verify Upload:**
   - Document should appear in "Your Documents" list
   - Status should show "Pending Review"
   - Should be able to download/view the file

### 3. Test Admin Review

1. **Login as Admin:**
   - Logout from program holder account
   - Login with admin credentials

2. **Navigate to Review:**
   - Go to: https://www.elevateforhumanity.org/admin/program-holder-documents
   - Should see uploaded test document

3. **Approve Document:**
   - Add approval notes: "Test approval"
   - Click "Approve"
   - Document should move to "Approved" tab

4. **Verify Program Holder Sees Update:**
   - Logout from admin
   - Login as test program holder
   - Go to documents page
   - Should see "Approved" status with green checkmark

---

## Automated Verification (After Manual Test)

```javascript
// Run in browser console on /program-holder/documents page
async function verifyUpload() {
  const response = await fetch('/api/program-holder/documents/upload', {
    method: 'POST',
    body: new FormData(document.querySelector('form')),
  });

  const result = await response.json();
  console.log('Upload result:', result);

  if (result.success) {
    console.log('✅ Upload successful');
    console.log('Document ID:', result.document.id);
    console.log('File URL:', result.document.file_url);
  } else {
    console.error('❌ Upload failed:', result.error);
  }
}
```

---

## Database Verification Queries

```sql
-- Check uploaded documents
SELECT
  id,
  user_id,
  organization_id,
  document_type,
  file_name,
  approved,
  created_at
FROM program_holder_documents
ORDER BY created_at DESC
LIMIT 10;

-- Check storage files
SELECT
  name,
  bucket_id,
  owner,
  created_at,
  metadata
FROM storage.objects
WHERE bucket_id = 'program-holder-documents'
ORDER BY created_at DESC
LIMIT 10;

-- Verify RLS is working
-- (Run as program holder user - should only see own docs)
SELECT COUNT(*) FROM program_holder_documents;

-- (Run as admin - should see all docs)
SELECT COUNT(*) FROM program_holder_documents;
```

---

## Expected Results

### ✅ Success Criteria

1. **Upload:**
   - File uploads without errors
   - Database record created
   - Storage file created
   - Correct organization_id set

2. **Security:**
   - Program holder can only see own documents
   - Admin can see all documents
   - Cross-org access blocked

3. **Approval:**
   - Admin can approve/reject
   - Status updates visible to program holder
   - Approval notes saved

4. **Performance:**
   - Upload completes in < 10 seconds
   - Page loads in < 2 seconds
   - No console errors

### ❌ Failure Indicators

- 403 Forbidden errors
- "Table does not exist" errors
- "Bucket does not exist" errors
- Files not appearing in storage
- Cross-org data leakage
- Slow upload (> 30 seconds)

---

## Troubleshooting

### "Table does not exist"

→ Migrations not applied. See MIGRATIONS_READY_TO_APPLY.md

### "Bucket does not exist"

→ Storage migration not applied. Run migration 2.

### "Permission denied"

→ RLS policies not applied or user role incorrect.

### Upload fails silently

→ Check browser console for errors
→ Check Supabase logs
→ Verify API endpoint is accessible

### File size too large

→ Bucket limit is 50MB
→ Check file size before upload

---

## Cleanup After Testing

```sql
-- Remove test documents
DELETE FROM program_holder_documents
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'test-program-holder@example.com');

-- Remove test files from storage
-- (Do this in Supabase Dashboard → Storage → program-holder-documents)

-- Optionally remove test user
DELETE FROM profiles WHERE email = 'test-program-holder@example.com';
DELETE FROM auth.users WHERE email = 'test-program-holder@example.com';
```

---

## Status

**Code:** ✅ Complete  
**Migrations:** ⚠️ Ready to apply  
**Testing:** ⏳ Awaiting migration application

Once migrations are applied, run this test to verify 100% functionality.
