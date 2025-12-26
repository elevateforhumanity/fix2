# Storage Issues Found - Action Required

**Date:** December 26, 2025, 2:25 AM UTC  
**Status:** ⚠️ ISSUES FOUND

---

## Summary

✅ **Good News:**
- 10 storage buckets exist
- Vercel is linked (Project ID: prj_mqHr6z23gRSqM5In6bLXtEo9cMGI)
- GitHub connected (elevateforhumanity/fix2)

❌ **Issues Found:**
- 2 buckets have wrong access settings (should be private, are public)
- 2 required buckets are missing
- 9 out of 10 buckets are empty (need seeding)
- Storage policies not verified

---

## Critical Issues (Fix Immediately)

### 1. ❌ Security Risk: Certificates Bucket is Public

**Current:** `certificates` bucket is PUBLIC  
**Should be:** PRIVATE

**Risk:** Anyone can access user certificates without authentication

**Fix:**
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Storage** → **certificates**
3. Click **Settings** (gear icon)
4. Change **Public bucket** to OFF
5. Click **Save**

---

### 2. ❌ Security Risk: Course Materials Bucket is Public

**Current:** `course-materials` bucket is PUBLIC  
**Should be:** PRIVATE

**Risk:** Anyone can access paid course content without enrollment

**Fix:**
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Storage** → **course-materials**
3. Click **Settings** (gear icon)
4. Change **Public bucket** to OFF
5. Click **Save**

---

### 3. ❌ Missing Buckets

**Missing:**
- `documents` - For user uploaded documents
- `media` - For public media assets

**Fix:**
1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Storage** → **New bucket**
3. Create `documents` bucket:
   - Name: `documents`
   - Public: OFF
   - Click **Create bucket**
4. Create `media` bucket:
   - Name: `media`
   - Public: ON
   - Click **Create bucket**

---

## Current Bucket Status

| Bucket Name | Access | Files | Status |
|-------------|--------|-------|--------|
| avatars | ✅ Public | 0 | ✅ Correct, needs seeding |
| certificates | ❌ Public | 0 | ❌ Should be PRIVATE |
| course-materials | ❌ Public | 0 | ❌ Should be PRIVATE |
| profile-avatars | ✅ Public | 0 | ✅ Correct, needs seeding |
| program-covers | ✅ Public | 0 | ✅ Correct, needs seeding |
| scorm-packages | ✅ Public | 1 | ✅ Correct |
| portfolio | ✅ Public | 0 | ✅ Correct, needs seeding |
| shop-onboarding | ✅ Private | 0 | ✅ Correct, needs seeding |
| tax-documents | ✅ Private | 0 | ✅ Correct, needs seeding |
| program-holder-documents | ✅ Private | 0 | ✅ Correct, needs seeding |
| **documents** | ❌ Missing | - | ❌ Need to create |
| **media** | ❌ Missing | - | ❌ Need to create |

---

## Storage Policies - Need Verification

**I cannot verify policies via API.** You need to check manually:

### Required Policies:

#### avatars bucket:
- ✅ Public read (anyone can view)
- ✅ Authenticated write (logged in users can upload their avatar)
- ✅ Owner delete (users can delete their own avatar)

#### documents bucket (when created):
- ✅ Owner read (users can read their own documents)
- ✅ Owner write (users can upload their own documents)
- ✅ Owner delete (users can delete their own documents)

#### certificates bucket:
- ✅ Owner read (users can read their own certificates)
- ✅ System write (only backend can create certificates)
- ❌ No public access

#### course-materials bucket:
- ✅ Enrolled users read (only enrolled students can access)
- ✅ Admin write (only admins can upload)
- ❌ No public access

#### media bucket (when created):
- ✅ Public read (anyone can view)
- ✅ Admin write (only admins can upload)

---

## How to Verify Policies

1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click **Storage** → **Policies**
3. For each bucket, verify policies exist
4. If missing, click **New Policy** and create them

**Policy Templates:**

### Public Read Policy:
```sql
-- Name: Public read access
-- Allowed operation: SELECT
-- Policy definition:
true
```

### Authenticated Write Policy:
```sql
-- Name: Authenticated users can upload
-- Allowed operation: INSERT
-- Policy definition:
auth.role() = 'authenticated'
```

### Owner Access Policy:
```sql
-- Name: Users can access their own files
-- Allowed operation: SELECT, INSERT, UPDATE, DELETE
-- Policy definition:
auth.uid()::text = (storage.foldername(name))[1]
```

---

## Seeding Empty Buckets

**9 buckets are empty.** You should seed them with:

### avatars:
- Default avatar images (male.png, female.png, neutral.png)

### profile-avatars:
- Same as avatars (may be duplicate bucket?)

### program-covers:
- Cover images for each program (healthcare.jpg, trades.jpg, etc.)

### certificates:
- Certificate templates (template.pdf, template-with-seal.pdf)

### course-materials:
- Sample course files (syllabus.pdf, lesson1.pdf, etc.)

### portfolio:
- Sample portfolio items for students

### shop-onboarding:
- Onboarding documents for shop partners

### tax-documents:
- Tax form templates (W9.pdf, 1099.pdf, etc.)

### program-holder-documents:
- Program holder agreement templates

---

## Vercel Environment Variables

**Need to verify these match:**

Go to https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

Check:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` = `https://cuxzzpsyufcewtmicszk.supabase.co`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (get from Supabase → Settings → API)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGc...` (you already provided this)

---

## Action Checklist

**Do these NOW (5 minutes):**

1. ☐ Fix certificates bucket (make private)
2. ☐ Fix course-materials bucket (make private)
3. ☐ Create documents bucket (private)
4. ☐ Create media bucket (public)
5. ☐ Verify storage policies exist
6. ☐ Verify Vercel environment variables

**Do these SOON (30 minutes):**

7. ☐ Seed avatars bucket with default images
8. ☐ Seed program-covers bucket with program images
9. ☐ Seed certificates bucket with templates
10. ☐ Seed course-materials with sample content

**Do these LATER (optional):**

11. ☐ Seed remaining buckets
12. ☐ Set up automated backups
13. ☐ Configure CDN for public buckets

---

## After Fixing

**Run verification again:**

```bash
cd /workspaces/fix2
node verify-storage.mjs
```

**Expected output:**
```
✅ avatars              Exists, Public ✓
✅ documents            Exists, Private ✓
✅ certificates         Exists, Private ✓
✅ course-materials     Exists, Private ✓
✅ media                Exists, Public ✓
```

---

## Links You Need

- **Supabase Dashboard:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **Vercel Dashboard:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2
- **GitHub Repo:** https://github.com/elevateforhumanity/fix2

---

**Status:** Waiting for you to fix the 4 critical issues above.

**After you fix them, tell me and I'll re-verify everything.**
