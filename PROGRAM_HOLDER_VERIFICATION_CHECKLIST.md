# Program Holder Document System - Verification Checklist

**Purpose:** Verify the Program Holder document upload system works end-to-end after the site redirect loop is fixed.

**Prerequisites:**
- Site must be accessible (no redirect loop)
- Database migrations must be applied
- Test program holder account must exist

---

## STEP 1: Database Verification

### Check Table Exists
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'program_holder_documents'
ORDER BY ordinal_position;
```

**Expected:** 17 columns including id, user_id, organization_id, document_type, file_name, file_url, approved, etc.

### Check RLS Policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'program_holder_documents';
```

**Expected:** 4 policies:
- Program holders can view own documents
- Program holders can upload documents
- Admins can view all documents
- Admins can approve documents

---

## STEP 2: Storage Bucket Verification

### Check Bucket Exists
```sql
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'program-holder-documents';
```

**Expected:**
- Bucket exists
- public = false
- file_size_limit = 52428800 (50MB)
- allowed_mime_types includes PDF, images, Word, Excel

### Check Storage Policies
```sql
SELECT policyname, definition
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND policyname LIKE '%program-holder%';
```

**Expected:** 4 policies for upload, view (own), view (admin), delete (admin)

---

## STEP 3: Program Holder Upload Test

### 3.1 Login as Program Holder
1. Navigate to: https://www.elevateforhumanity.org/login
2. Login with test program holder credentials
3. **Verify:** Redirects to program holder dashboard (not admin/student)

### 3.2 Access Documents Page
1. Navigate to: https://www.elevateforhumanity.org/program-holder/documents
2. **Verify:** Page loads without errors
3. **Verify:** Upload form is visible
4. **Verify:** Document type dropdown has 8 options

### 3.3 Upload Test Document
1. Select document type: "license"
2. Choose a test PDF file (< 10MB)
3. Add description: "Test business license upload"
4. Click "Upload Document"
5. **Verify:** Success message appears
6. **Verify:** Document appears in "Your Documents" list
7. **Verify:** Status shows "Pending Review" with clock icon

### 3.4 Verify Database Record
```sql
SELECT id, user_id, organization_id, document_type, file_name, file_url, approved, created_at
FROM program_holder_documents
WHERE document_type = 'license'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected:**
- Row exists
- user_id matches logged-in user
- organization_id is populated
- file_url contains storage path
- approved = false

### 3.5 Verify Storage File
```sql
SELECT name, bucket_id, owner, created_at, metadata
FROM storage.objects
WHERE bucket_id = 'program-holder-documents'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected:**
- File exists in storage
- Path format: `{user_id}/license/{timestamp}.pdf`
- owner matches user_id

### 3.6 Test Download
1. Click "View" link on uploaded document
2. **Verify:** File downloads or opens in new tab
3. **Verify:** File content is correct

---

## STEP 4: Cross-Org Access Test (Security)

### 4.1 Login as Different Program Holder
1. Logout
2. Login as program holder from different organization
3. Navigate to: /program-holder/documents

### 4.2 Verify Isolation
**Expected:**
- Cannot see documents from other organization
- Upload creates records with their own organization_id
- Database query returns 0 rows for other org's documents

---

## STEP 5: Admin Review Test

### 5.1 Login as Admin
1. Logout
2. Login with admin credentials
3. Navigate to: https://www.elevateforhumanity.org/admin/program-holder-documents

### 5.2 Verify Admin View
**Expected:**
- Page loads without errors
- "Pending Review" tab shows uploaded test document
- Document shows program holder name and organization
- "View" link works
- Approve/Reject buttons are visible

### 5.3 Test Approval
1. Add approval notes: "License verified and approved"
2. Click "Approve" button
3. **Verify:** Document moves to "Approved" tab
4. **Verify:** Success feedback appears

### 5.4 Verify Database Update
```sql
SELECT id, approved, approved_by, approved_at, approval_notes
FROM program_holder_documents
WHERE document_type = 'license'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected:**
- approved = true
- approved_by = admin user_id
- approved_at = recent timestamp
- approval_notes = "License verified and approved"

### 5.5 Verify Program Holder Sees Update
1. Logout
2. Login as original program holder
3. Navigate to: /program-holder/documents
4. **Verify:** Document status shows "Approved" with green checkmark
5. **Verify:** Admin notes are visible

---

## STEP 6: Rejection Test

### 6.1 Upload Another Document
1. As program holder, upload another test document
2. Document type: "insurance"

### 6.2 Admin Rejects
1. Login as admin
2. Navigate to: /admin/program-holder-documents
3. Add rejection notes: "Insurance certificate expired, please upload current"
4. Click "Reject"

### 6.3 Verify Rejection
1. Login as program holder
2. **Verify:** Document shows "Rejected" with red X
3. **Verify:** Rejection notes are visible
4. **Verify:** Can upload replacement document

---

## STEP 7: All Document Types Test

Upload one of each type and verify all work:
- [ ] syllabus
- [ ] license
- [ ] insurance
- [ ] accreditation
- [ ] instructor_credentials
- [ ] facility_photos
- [ ] mou
- [ ] other

---

## STEP 8: Error Handling Tests

### 8.1 File Too Large
1. Attempt to upload file > 50MB
2. **Expected:** Error message about file size

### 8.2 Invalid File Type
1. Attempt to upload .exe or .zip file
2. **Expected:** Error message about file type

### 8.3 Missing Required Fields
1. Attempt to upload without selecting document type
2. **Expected:** Error message about required fields

### 8.4 Unauthenticated Access
1. Logout
2. Navigate to: /program-holder/documents
3. **Expected:** Redirect to login

### 8.5 Wrong Role Access
1. Login as student
2. Navigate to: /program-holder/documents
3. **Expected:** 403 Forbidden or redirect

---

## STEP 9: Performance Test

### 9.1 Multiple Uploads
1. Upload 5 documents in quick succession
2. **Verify:** All uploads succeed
3. **Verify:** All appear in list
4. **Verify:** No duplicate records

### 9.2 Large File Upload
1. Upload a 45MB PDF
2. **Verify:** Upload completes (may take 30-60 seconds)
3. **Verify:** File is accessible

---

## STEP 10: Mobile Responsiveness

1. Open /program-holder/documents on mobile device or mobile emulator
2. **Verify:** Upload form is usable
3. **Verify:** Document list is readable
4. **Verify:** Status badges are visible
5. **Verify:** Download links work

---

## SUCCESS CRITERIA

✅ All database tables and policies exist
✅ Storage bucket and policies configured
✅ Program holder can upload documents
✅ Documents are stored with correct paths
✅ Cross-org access is blocked
✅ Admin can view all documents
✅ Admin can approve/reject with notes
✅ Status updates are visible to program holder
✅ All document types work
✅ Error handling works correctly
✅ Mobile interface is usable

---

## VERIFIED RESULTS (Fill in after testing)

**Date Tested:** _____________
**Tester:** _____________

**URLs Tested:**
- [ ] /program-holder/documents
- [ ] /admin/program-holder-documents

**User Roles Tested:**
- [ ] Program Holder (Org 1)
- [ ] Program Holder (Org 2)
- [ ] Admin

**Database Verification:**
- [ ] program_holder_documents table exists
- [ ] RLS policies active
- [ ] Storage bucket exists
- [ ] Storage policies active

**Functional Tests:**
- [ ] Upload works
- [ ] Download works
- [ ] Approval works
- [ ] Rejection works
- [ ] Cross-org isolation works

**Storage Artifacts Created:**
- Bucket: program-holder-documents
- Files uploaded: _____ (count)
- Sample path: _____________________________

**Database Records Created:**
- Table: program_holder_documents
- Rows inserted: _____ (count)
- Sample ID: _____________________________

**Issues Found:**
_____________________________________________
_____________________________________________

**Status:** ⬜ PASS / ⬜ FAIL

**Notes:**
_____________________________________________
_____________________________________________

---

## NEXT STEPS AFTER VERIFICATION

If all tests pass:
1. Document the onboarding flow for program holders
2. Create admin training materials
3. Set up monitoring for failed uploads
4. Configure email notifications for approvals/rejections

If tests fail:
1. Document exact failure points
2. Check browser console for errors
3. Check Supabase logs
4. Review RLS policies
5. Fix and re-test
