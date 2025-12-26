# VERIFICATION CHECKLIST - EXECUTE THIS YOURSELF

**Date:** December 23, 2025  
**Purpose:** Verify production readiness with REAL tests, not assumptions

---

## ⚠️ CRITICAL: I CANNOT VERIFY THESE WITHOUT YOUR CREDENTIALS

I (Ona) have verified the CODE exists. You must verify it WORKS.

---

## PART 1: PUBLIC ROUTES (You Can Test Now)

Open these URLs in incognito window and verify they load:

- [ ] https://www.elevateforhumanity.org/ (homepage)
- [ ] https://www.elevateforhumanity.org/programs
- [ ] https://www.elevateforhumanity.org/apply
- [ ] https://www.elevateforhumanity.org/careers
- [ ] https://www.elevateforhumanity.org/platform
- [ ] https://www.elevateforhumanity.org/employer
- [ ] https://www.elevateforhumanity.org/partner
- [ ] https://www.elevateforhumanity.org/program-holder (landing page)
- [ ] https://www.elevateforhumanity.org/program-holder/apply (application form)
- [ ] https://www.elevateforhumanity.org/contact
- [ ] https://www.elevateforhumanity.org/privacy
- [ ] https://www.elevateforhumanity.org/terms

**Expected:** All return 200 OK, no 404s, no redirect loops

---

## PART 2: CREATE TEST PROGRAM HOLDER ACCOUNT

### Step 1: Create User in Supabase

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Navigate to: **Authentication → Users**
3. Click **"Add User"**
4. Enter:
   - Email: `test-program-holder@example.com`
   - Password: `TestPass123!`
   - Auto-confirm: **Yes**
5. Click **"Create User"**

### Step 2: Set Role to Program Holder

1. Go to: **Database → Table Editor → profiles**
2. Find the user you just created (search by email)
3. Click to edit the row
4. Set `role` = `program_holder`
5. Click **"Save"**

### Step 3: Verify User Created

Run this SQL in Supabase SQL Editor:

```sql
SELECT id, email, role, full_name
FROM profiles
WHERE email = 'test-program-holder@example.com';
```

**Expected:** 1 row returned with `role = 'program_holder'`

---

## PART 3: TEST LOGIN

1. Open: https://www.elevateforhumanity.org/login
2. Enter:
   - Email: `test-program-holder@example.com`
   - Password: `TestPass123!`
3. Click **"Login"**

**Expected:**

- [ ] Login succeeds (no errors)
- [ ] Redirects to `/program-holder/onboarding` (if onboarding incomplete)
- [ ] OR redirects to `/program-holder/dashboard` (if onboarding complete)
- [ ] NO infinite "Loading..." spinner
- [ ] NO blank page

**If login fails:** Take screenshot and note exact error message

---

## PART 4: COMPLETE ONBOARDING (CRITICAL TEST)

### Step 4A: Sign MOU

1. Navigate to: https://www.elevateforhumanity.org/program-holder/mou
2. Read MOU
3. Check "I agree" checkbox
4. Draw signature in signature pad
5. Click **"Sign MOU"**

**Expected:**

- [ ] Signature saves without error
- [ ] Redirects to next step

**Verify in Database:**

```sql
SELECT user_id, signed_at, signature_data IS NOT NULL as has_signature
FROM mou_signatures
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
```

**Expected:** 1 row with `signed_at` timestamp and `has_signature = true`

---

### Step 4B: Acknowledge Handbook

1. Navigate to: https://www.elevateforhumanity.org/program-holder/handbook
2. Scroll through handbook
3. Check "I have read and understand" checkbox
4. Click **"Acknowledge Handbook"**

**Expected:**

- [ ] Acknowledgement saves without error
- [ ] Redirects to next step

**Verify in Database:**

```sql
SELECT user_id, handbook_acknowledged_at
FROM program_holder_acknowledgements
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
```

**Expected:** 1 row with `handbook_acknowledged_at` timestamp

---

### Step 4C: Acknowledge Rights & Responsibilities

1. Navigate to: https://www.elevateforhumanity.org/program-holder/rights-responsibilities
2. Scroll through document
3. Check "I acknowledge" checkbox
4. Click **"Acknowledge"**

**Expected:**

- [ ] Acknowledgement saves without error
- [ ] Redirects to documents page

**Verify in Database:**

```sql
SELECT user_id, handbook_acknowledged_at, rights_acknowledged_at
FROM program_holder_acknowledgements
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
```

**Expected:** Both `handbook_acknowledged_at` AND `rights_acknowledged_at` have timestamps

---

### Step 4D: Upload Documents (MOST CRITICAL)

1. Navigate to: https://www.elevateforhumanity.org/program-holder/documents
2. Click **"Upload Document"** button
3. Select document type: **"Syllabus"**
4. Add description: "Test syllabus upload"
5. Choose a PDF file (any PDF, <10MB)
6. Click **"Upload"**

**Expected:**

- [ ] Upload progress shows
- [ ] Success message appears
- [ ] Document appears in list with "Pending Review" status

**Verify in Database:**

```sql
SELECT id, document_type, file_name, file_url, approved, created_at
FROM program_holder_documents
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com');
```

**Expected:** 1 row with:

- `document_type = 'syllabus'`
- `file_name` = your uploaded filename
- `file_url` = storage path
- `approved = false` (pending)

**Verify in Storage:**

1. Go to: **Supabase → Storage → Buckets**
2. Find bucket: `program-holder-documents`
3. Navigate to folder matching user ID
4. Confirm file exists

**If upload fails:**

- Check browser console for errors
- Check Network tab for failed requests
- Note exact error message

---

### Step 4E: Repeat Upload for Other Documents

Upload 2 more documents:

- Document type: **"Business License"**
- Document type: **"Insurance"**

**Verify in Database:**

```sql
SELECT document_type, file_name, approved
FROM program_holder_documents
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com')
ORDER BY created_at;
```

**Expected:** 3 rows (syllabus, business_license, insurance), all `approved = false`

---

## PART 5: ADMIN REVIEW (SWITCH TO ADMIN ACCOUNT)

### Step 5A: Login as Admin

1. Logout from program holder account
2. Login with your admin credentials
3. Navigate to: https://www.elevateforhumanity.org/admin/program-holder-documents

**Expected:**

- [ ] Page loads without error
- [ ] See "Pending" tab
- [ ] See 3 documents from test program holder

---

### Step 5B: Approve Documents

For each of the 3 documents:

1. Click **"View"** to preview (opens in new tab)
2. Click **"Review"** button
3. Add notes: "Test approval"
4. Click **"Approve"**

**Expected:**

- [ ] Status changes to "Approved"
- [ ] Green checkmark appears

**Verify in Database:**

```sql
SELECT document_type, approved, approved_by, approved_at, approval_notes
FROM program_holder_documents
WHERE user_id = (SELECT id FROM profiles WHERE email = 'test-program-holder@example.com')
ORDER BY document_type;
```

**Expected:** All 3 rows have:

- `approved = true`
- `approved_by` = your admin user ID
- `approved_at` = timestamp
- `approval_notes = 'Test approval'`

---

## PART 6: VERIFY DASHBOARD ACCESS (BACK TO PROGRAM HOLDER)

1. Logout from admin
2. Login as test program holder again
3. Navigate to: https://www.elevateforhumanity.org/program-holder/dashboard

**Expected:**

- [ ] Dashboard loads WITHOUT redirect to onboarding
- [ ] No "Complete onboarding" messages
- [ ] Can access all portal features
- [ ] Documents page shows all 3 documents as "Approved"

---

## PART 7: VERIFY ONBOARDING STATUS

**Run this comprehensive check:**

```sql
-- Complete onboarding verification
SELECT
  p.email,
  p.role,
  (SELECT COUNT(*) FROM mou_signatures WHERE user_id = p.id) as mou_signed,
  (SELECT handbook_acknowledged_at IS NOT NULL FROM program_holder_acknowledgements WHERE user_id = p.id) as handbook_done,
  (SELECT rights_acknowledged_at IS NOT NULL FROM program_holder_acknowledgements WHERE user_id = p.id) as rights_done,
  (SELECT COUNT(*) FROM program_holder_documents WHERE user_id = p.id) as docs_uploaded,
  (SELECT COUNT(*) FROM program_holder_documents WHERE user_id = p.id AND approved = true) as docs_approved
FROM profiles p
WHERE email = 'test-program-holder@example.com';
```

**Expected Results:**

- `role = 'program_holder'`
- `mou_signed = 1`
- `handbook_done = true`
- `rights_done = true`
- `docs_uploaded = 3`
- `docs_approved = 3`

---

## PASS/FAIL MATRIX

| Test                             | Status            | Notes |
| -------------------------------- | ----------------- | ----- |
| Public routes load               | ⬜ PASS / ⬜ FAIL |       |
| Test account created             | ⬜ PASS / ⬜ FAIL |       |
| Login works                      | ⬜ PASS / ⬜ FAIL |       |
| MOU signature saves              | ⬜ PASS / ⬜ FAIL |       |
| Handbook acknowledgement saves   | ⬜ PASS / ⬜ FAIL |       |
| Rights acknowledgement saves     | ⬜ PASS / ⬜ FAIL |       |
| Document upload works            | ⬜ PASS / ⬜ FAIL |       |
| File appears in storage          | ⬜ PASS / ⬜ FAIL |       |
| Admin can view documents         | ⬜ PASS / ⬜ FAIL |       |
| Admin can approve documents      | ⬜ PASS / ⬜ FAIL |       |
| Dashboard unlocks after approval | ⬜ PASS / ⬜ FAIL |       |

---

## GO/NO-GO DECISION

**If ALL tests PASS:** ✅ **GO** - Ready to onboard real program holder

**If ANY test FAILS:** ❌ **NO-GO** - Document exact failure and fix before onboarding

---

## BLOCKERS (Fill in if tests fail)

1. **Blocker:** **********************\_\_\_**********************
   - **Test that failed:** ******************\_******************
   - **Error message:** ******************\_\_\_\_******************
   - **Screenshot:** ********************\_\_\_********************

2. **Blocker:** **********************\_\_\_**********************
   - **Test that failed:** ******************\_******************
   - **Error message:** ******************\_\_\_\_******************
   - **Screenshot:** ********************\_\_\_********************

3. **Blocker:** **********************\_\_\_**********************
   - **Test that failed:** ******************\_******************
   - **Error message:** ******************\_\_\_\_******************
   - **Screenshot:** ********************\_\_\_********************

---

## WHAT I (ONA) VERIFIED

✅ Code exists for all features
✅ Database migrations exist
✅ API routes exist
✅ UI pages exist
✅ Storage bucket configuration exists
✅ RLS policies exist in migrations
✅ Build passes
✅ Public routes return 200

❌ **NOT VERIFIED:** Actual end-to-end flow with real data
❌ **NOT VERIFIED:** Database writes actually work
❌ **NOT VERIFIED:** File uploads actually work
❌ **NOT VERIFIED:** Admin approval actually works

---

**YOU MUST RUN THIS CHECKLIST TO VERIFY PRODUCTION READINESS.**

**Time Required:** 30-45 minutes

**Last Updated:** December 23, 2025
