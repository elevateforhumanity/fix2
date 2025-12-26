# ONBOARD PROGRAM HOLDER TODAY

**Step-by-step instructions for onboarding a Program Holder**

**Date:** December 23, 2025  
**Platform:** https://www.elevateforhumanity.org  
**Prerequisites:** Admin access to platform

---

## ADMIN SETUP (Before Program Holder Starts)

### Step 1: Create Program Holder Account

**URL:** https://www.elevateforhumanity.org/admin/users (or create via Supabase)

**Actions:**

1. Navigate to admin user management
2. Create new user account with:
   - Email: [program holder's email]
   - Role: `program_holder`
   - Full name: [program holder's name]
3. Send invitation email with temporary password

**Expected Outcome:**

- User account created in `auth.users`
- Profile created in `profiles` table with `role = 'program_holder'`
- User receives invitation email

**Verification:**

```sql
-- Check in Supabase SQL Editor
SELECT id, email, role FROM profiles WHERE email = '[email]';
-- Should return 1 row with role = 'program_holder'
```

---

## PROGRAM HOLDER ONBOARDING FLOW

### Step 2: Initial Login

**URL:** https://www.elevateforhumanity.org/login

**Actions (Program Holder):**

1. Open login page
2. Enter email and temporary password
3. Set new password when prompted
4. Click "Login"

**Expected Outcome:**

- Successful authentication
- Redirect to `/program-holder/onboarding`
- Onboarding checklist displayed

**Verification:**

- Program Holder sees onboarding page with progress tracker
- Dashboard link is disabled/grayed out

---

### Step 3: Sign MOU (Memorandum of Understanding)

**URL:** https://www.elevateforhumanity.org/program-holder/mou

**Actions (Program Holder):**

1. Read MOU terms
2. Check "I agree to the terms" checkbox
3. Draw signature in signature pad
4. Click "Sign MOU"

**Expected Outcome:**

- Signature captured and saved
- Record created in `mou_signatures` table
- Onboarding progress updates to show MOU complete
- Redirect to next step

**Verification (Admin):**

```sql
-- Check in Supabase
SELECT * FROM mou_signatures WHERE user_id = '[user_id]';
-- Should return 1 row with signature_data and signed_at timestamp
```

**Troubleshooting:**

- If signature pad doesn't work: Check browser console for errors
- If save fails: Verify RLS policies allow insert for authenticated users

---

### Step 4: Acknowledge Handbook

**URL:** https://www.elevateforhumanity.org/program-holder/handbook

**Actions (Program Holder):**

1. Read Program Holder Handbook
2. Scroll to bottom
3. Check "I have read and understand the handbook" checkbox
4. Click "Acknowledge Handbook"

**Expected Outcome:**

- Record created in `program_holder_acknowledgements` table
- `handbook_acknowledged_at` timestamp set
- Onboarding progress updates
- Redirect to next step

**Verification (Admin):**

```sql
-- Check in Supabase
SELECT * FROM program_holder_acknowledgements WHERE user_id = '[user_id]';
-- Should show handbook_acknowledged_at with timestamp
```

---

### Step 5: Acknowledge Rights & Responsibilities

**URL:** https://www.elevateforhumanity.org/program-holder/rights-responsibilities

**Actions (Program Holder):**

1. Read Rights & Responsibilities document
2. Scroll to bottom
3. Check "I acknowledge my rights and responsibilities" checkbox
4. Click "Acknowledge"

**Expected Outcome:**

- `rights_acknowledged_at` timestamp set in `program_holder_acknowledgements`
- Onboarding progress updates
- Redirect to document upload step

**Verification (Admin):**

```sql
-- Check in Supabase
SELECT * FROM program_holder_acknowledgements WHERE user_id = '[user_id]';
-- Should show both handbook_acknowledged_at AND rights_acknowledged_at
```

---

### Step 6: Upload Required Documents

**URL:** https://www.elevateforhumanity.org/program-holder/documents

**Required Documents:**

1. **Syllabus** - Course curriculum and schedule
2. **Business License** - Valid business license
3. **Insurance Certificate** - Liability insurance proof

**Actions (Program Holder):**

**For each document:**

1. Click "Upload Document" button
2. Select document type from dropdown
3. Add optional description
4. Click "Choose File" and select PDF/image
5. Click "Upload"
6. Wait for upload confirmation

**Expected Outcome:**

- Each file uploaded to Supabase Storage bucket `program-holder-docs`
- Record created in `program_holder_documents` table for each file
- Document appears in "My Documents" list with "Pending Review" status
- After all 3 documents uploaded, onboarding progress shows documents complete

**Verification (Program Holder):**

- See 3 documents in list with "Pending Review" badges
- Onboarding checklist shows documents step as complete

**Verification (Admin):**

```sql
-- Check in Supabase
SELECT document_type, file_name, approved
FROM program_holder_documents
WHERE user_id = '[user_id]';
-- Should return 3 rows (syllabus, business_license, insurance)
-- approved should be NULL (pending)
```

**Troubleshooting:**

- If upload fails: Check file size (<10MB), format (PDF/JPG/PNG)
- If storage error: Verify Supabase storage bucket exists and has correct policies
- If RLS error: Verify user is authenticated and has program_holder role

---

## ADMIN REVIEW & APPROVAL

### Step 7: Review Uploaded Documents

**URL:** https://www.elevateforhumanity.org/admin/program-holder-documents

**Actions (Admin):**

1. Navigate to Program Holder Documents admin page
2. Click "Pending" tab to see documents awaiting review
3. For each document:
   - Click "View" to open document in new tab
   - Review document for completeness and validity
   - Click "Review" button
   - Add notes (optional for approval, required for rejection)
   - Click "Approve" or "Reject"

**Expected Outcome:**

- Document status changes from "Pending" to "Approved" or "Rejected"
- `approved` field set to true/false in database
- `approval_notes` saved if provided
- `approved_at` timestamp set
- Program Holder sees updated status on their documents page

**Verification (Admin):**

```sql
-- Check approval status
SELECT document_type, approved, approval_notes, approved_at
FROM program_holder_documents
WHERE user_id = '[user_id]';
-- All 3 documents should have approved = true
```

**Verification (Program Holder):**

- Refresh documents page
- See "Approved" badges on all 3 documents
- Onboarding checklist shows all steps complete
- Dashboard link becomes active

---

### Step 8: Access Dashboard

**URL:** https://www.elevateforhumanity.org/program-holder/dashboard

**Actions (Program Holder):**

1. Click "Dashboard" in navigation
2. Verify full access granted

**Expected Outcome:**

- Dashboard loads successfully
- No onboarding gate/redirect
- Full program holder features accessible

**Verification:**

- Program Holder can access all portal features
- No "Complete onboarding" messages displayed

---

## VERIFICATION CHECKLIST

Use this checklist to confirm successful onboarding:

### Database Verification (Admin)

```sql
-- 1. User exists with correct role
SELECT id, email, role FROM profiles WHERE email = '[email]';
-- Expected: 1 row, role = 'program_holder'

-- 2. MOU signed
SELECT signed_at FROM mou_signatures WHERE user_id = '[user_id]';
-- Expected: 1 row with timestamp

-- 3. Acknowledgements complete
SELECT handbook_acknowledged_at, rights_acknowledged_at
FROM program_holder_acknowledgements WHERE user_id = '[user_id]';
-- Expected: Both fields have timestamps

-- 4. Documents uploaded and approved
SELECT document_type, approved
FROM program_holder_documents
WHERE user_id = '[user_id]';
-- Expected: 3 rows (syllabus, business_license, insurance), all approved = true

-- 5. Onboarding complete
SELECT * FROM program_holders WHERE user_id = '[user_id]';
-- Expected: onboarding_complete = true (if this column exists)
```

### UI Verification (Program Holder)

- [ ] Can login successfully
- [ ] MOU signature captured
- [ ] Handbook acknowledged
- [ ] Rights/responsibilities acknowledged
- [ ] 3 documents uploaded
- [ ] All documents show "Approved" status
- [ ] Dashboard accessible without redirect
- [ ] Can navigate all program holder portal pages

### Admin Verification

- [ ] User appears in admin user list with program_holder role
- [ ] Documents appear in admin review queue
- [ ] Can approve/reject documents
- [ ] Approval status updates in real-time

---

## TROUBLESHOOTING

### Issue: Program Holder Can't Login

**Symptoms:** Login fails, "Invalid credentials" error

**Causes:**

1. Account not created
2. Wrong email/password
3. Account not confirmed

**Fix:**

1. Verify account exists in Supabase auth.users
2. Reset password via admin panel
3. Check email confirmation status

---

### Issue: Onboarding Steps Don't Mark Complete

**Symptoms:** Completed step still shows as incomplete

**Causes:**

1. Database write failed
2. RLS policy blocking insert
3. API route error

**Fix:**

1. Check browser console for errors
2. Verify RLS policies allow authenticated users to insert
3. Check API route logs in Vercel

**Debug SQL:**

```sql
-- Check what's actually in database
SELECT * FROM mou_signatures WHERE user_id = '[user_id]';
SELECT * FROM program_holder_acknowledgements WHERE user_id = '[user_id]';
SELECT * FROM program_holder_documents WHERE user_id = '[user_id]';
```

---

### Issue: Document Upload Fails

**Symptoms:** Upload button spins forever, error message appears

**Causes:**

1. File too large (>10MB)
2. Storage bucket doesn't exist
3. Storage policy blocks upload
4. Network error

**Fix:**

1. Check file size, compress if needed
2. Verify Supabase storage bucket `program-holder-docs` exists
3. Check storage policies allow authenticated uploads
4. Try different network/browser

**Verify Storage Bucket:**

```sql
-- In Supabase Storage section
-- Bucket: program-holder-docs
-- Public: No
-- File size limit: 10MB
-- Allowed MIME types: application/pdf, image/jpeg, image/png
```

---

### Issue: Dashboard Still Gated After Completion

**Symptoms:** Redirect to onboarding even after all steps complete

**Causes:**

1. Onboarding status not updating
2. Cache issue
3. Missing required document approval

**Fix:**

1. Verify all documents are approved (not just uploaded)
2. Clear browser cache and cookies
3. Check `lib/program-holder/onboarding-status.ts` logic
4. Verify all 3 document types present and approved

**Debug:**

```typescript
// Check onboarding status in browser console
const status = await fetch('/api/program-holder/onboarding-status').then((r) =>
  r.json()
);
console.log(status);
// Should show onboardingComplete: true
```

---

## EXPECTED TIMELINE

**Total Time:** 15-30 minutes

- Step 1 (Admin setup): 2 minutes
- Step 2 (Login): 1 minute
- Step 3 (MOU): 3 minutes
- Step 4 (Handbook): 3 minutes
- Step 5 (Rights): 3 minutes
- Step 6 (Documents): 5-10 minutes
- Step 7 (Admin review): 5-10 minutes
- Step 8 (Dashboard access): 1 minute

---

## POST-ONBOARDING

After successful onboarding, Program Holder can:

1. **Manage Students**
   - View enrolled students
   - Track attendance
   - Submit grades

2. **Upload Course Materials**
   - Syllabi
   - Lesson plans
   - Assignments

3. **Generate Reports**
   - Attendance reports
   - Grade reports
   - Completion certificates

4. **Communicate**
   - Message students
   - Receive admin notifications
   - Submit support tickets

---

## SUPPORT CONTACTS

**Technical Issues:**

- Email: support@elevateforhumanity.org
- Check: https://www.elevateforhumanity.org/api/health

**Admin Questions:**

- Email: admin@elevateforhumanity.org

**Emergency:**

- Check Vercel deployment logs
- Check Supabase logs
- Review browser console errors

---

**Document Version:** 1.0  
**Last Updated:** December 23, 2025  
**Maintained By:** Ona AI Agent
