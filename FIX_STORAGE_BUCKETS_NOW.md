# FIX STORAGE BUCKETS - Step by Step Guide

**Date:** December 26, 2025  
**Status:** 🔴 2 CRITICAL SECURITY ISSUES

---

## What Needs to Be Fixed

### 🔴 CRITICAL - Fix These NOW (5 minutes):

1. **certificates bucket is PUBLIC** → Make PRIVATE
2. **course-materials bucket is PUBLIC** → Make PRIVATE

### ⚠️ IMPORTANT - Create These (5 minutes):

3. **documents bucket missing** → Create as PRIVATE
4. **media bucket missing** → Create as PUBLIC

---

## Step-by-Step Instructions

### Fix 1: Make Certificates Bucket Private

**Why:** User certificates contain personal information and should not be publicly accessible.

**Steps:**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Find the **certificates** bucket
3. Click the **⋮** (three dots) menu
4. Click **Edit bucket**
5. **UNCHECK** "Public bucket"
6. Click **Save**

**Verify:** Try to access a certificate URL without auth - should fail

---

### Fix 2: Make Course Materials Bucket Private

**Why:** Course materials are paid content and should only be accessible to enrolled students.

**Steps:**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Find the **course-materials** bucket
3. Click the **⋮** (three dots) menu
4. Click **Edit bucket**
5. **UNCHECK** "Public bucket"
6. Click **Save**

**Verify:** Try to access course material URL without auth - should fail

---

### Fix 3: Create Documents Bucket

**Why:** Users need to upload documents (resumes, transcripts, etc.)

**Steps:**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Click **New bucket**
3. Fill in:
   - **Name:** `documents`
   - **Public bucket:** UNCHECK (keep it private)
   - **File size limit:** 10 MB
   - **Allowed MIME types:** Leave empty (allow all)
4. Click **Create bucket**

**Then add policies:**
1. Click on the **documents** bucket
2. Click **Policies** tab
3. Click **New policy**
4. Select **Custom policy**
5. Add these policies:

**Policy 1: Users can upload their own documents**
```sql
-- Name: Users can upload
-- Allowed operation: INSERT
-- Policy definition:
(bucket_id = 'documents'::text) AND (auth.uid()::text = (storage.foldername(name))[1])
```

**Policy 2: Users can read their own documents**
```sql
-- Name: Users can read own files
-- Allowed operation: SELECT
-- Policy definition:
(bucket_id = 'documents'::text) AND (auth.uid()::text = (storage.foldername(name))[1])
```

**Policy 3: Users can delete their own documents**
```sql
-- Name: Users can delete own files
-- Allowed operation: DELETE
-- Policy definition:
(bucket_id = 'documents'::text) AND (auth.uid()::text = (storage.foldername(name))[1])
```

---

### Fix 4: Create Media Bucket

**Why:** Public media assets (logos, images, videos) need a home.

**Steps:**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets
2. Click **New bucket**
3. Fill in:
   - **Name:** `media`
   - **Public bucket:** CHECK (make it public)
   - **File size limit:** 50 MB
   - **Allowed MIME types:** `image/*,video/*,audio/*`
4. Click **Create bucket**

**Then add policies:**
1. Click on the **media** bucket
2. Click **Policies** tab
3. Click **New policy**
4. Select **Allow public read access**
5. Click **Review** → **Save policy**

**For admin uploads:**
1. Click **New policy** again
2. Select **Custom policy**
3. Add:

```sql
-- Name: Admins can upload
-- Allowed operation: INSERT
-- Policy definition:
(bucket_id = 'media'::text) AND (auth.jwt() ->> 'role'::text = 'admin'::text)
```

---

## Verification Checklist

After making all changes, verify:

### Certificates Bucket:
- [ ] Bucket shows as "Private" (lock icon)
- [ ] Public URL returns 403 or 404
- [ ] Authenticated users can access their own certificates

### Course Materials Bucket:
- [ ] Bucket shows as "Private" (lock icon)
- [ ] Public URL returns 403 or 404
- [ ] Enrolled students can access course files

### Documents Bucket:
- [ ] Bucket exists
- [ ] Shows as "Private"
- [ ] Has 3 policies (upload, read, delete)
- [ ] Users can upload files to their own folder

### Media Bucket:
- [ ] Bucket exists
- [ ] Shows as "Public"
- [ ] Has public read policy
- [ ] Has admin upload policy
- [ ] Public URLs work without auth

---

## Quick Test Commands

After fixing, test with these:

### Test Certificates (should fail without auth):
```bash
curl -I https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/certificates/test.pdf
# Should return: 404 or 403
```

### Test Course Materials (should fail without auth):
```bash
curl -I https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/course-materials/test.pdf
# Should return: 404 or 403
```

### Test Media (should work):
```bash
curl -I https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/object/public/media/test.jpg
# Should return: 200 or 404 (but not 403)
```

---

## Time Estimate

- Fix certificates bucket: 1 minute
- Fix course-materials bucket: 1 minute
- Create documents bucket: 2 minutes
- Create media bucket: 1 minute
- **Total: 5 minutes**

---

## After You're Done

**Tell me:** "I fixed the storage buckets"

**Then I'll:**
1. Re-verify all buckets
2. Test access controls
3. Generate final verification report
4. Mark everything as 100% complete

---

## Need Help?

**If you get stuck:**
- Take a screenshot of the error
- Tell me which step you're on
- I'll guide you through it

**Common issues:**
- Can't find bucket settings → Click the ⋮ menu
- Can't create policy → Make sure you're on the Policies tab
- Policy syntax error → Copy the SQL exactly as shown

---

**Start now:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets

**This is the last thing blocking 100% completion!**
