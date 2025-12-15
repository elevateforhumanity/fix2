# 📦 SUPABASE STORAGE BUCKETS CHECKLIST

**Date**: December 14, 2024  
**Status**: 5/6 Complete - 1 Missing

---

## ✅ EXISTING BUCKETS (5)

### 1. ✅ **certificates**

- **Status**: Created
- **Public**: Yes
- **Purpose**: Store generated certificates (PDF, PNG, JPEG)
- **Size Limit**: 5MB
- **Location**: `supabase/migrations/20241129_ai_instructor_certificates.sql`

### 2. ✅ **media**

- **Status**: Created
- **Public**: Yes
- **Purpose**: General media files (images, videos)
- **Size Limit**: Default
- **Location**: `supabase/migrations/20240110000000_complete_schema.sql`

### 3. ✅ **documents**

- **Status**: Created
- **Public**: No (Private)
- **Purpose**: Private documents (applications, forms, transcripts)
- **Size Limit**: Default
- **Location**: `supabase/migrations/archive/ALL_IN_ONE__paste_into_dashboard.sql`

### 4. ✅ **agreements**

- **Status**: Created
- **Public**: No (Private)
- **Purpose**: MOUs and legal agreements
- **Size Limit**: Default
- **Location**: `supabase/migrations/archive/20240114_mou_two_step_signing.sql`

### 5. ✅ **mous**

- **Status**: Created
- **Public**: No (Private)
- **Purpose**: Memorandums of understanding
- **Size Limit**: Default
- **Location**: `supabase/migrations/archive/20240113_create_mous_bucket.sql`

---

## ❌ MISSING BUCKET (1)

### 6. ❌ **avatars** (NEEDS TO BE ADDED)

- **Status**: NOT CREATED
- **Public**: Yes
- **Purpose**: User profile pictures and avatars
- **Size Limit**: 2MB
- **Allowed Types**: JPEG, PNG, WebP, GIF
- **Action Required**: Run `STORAGE_BUCKETS_SETUP.sql`

---

## 🚀 HOW TO ADD THE MISSING BUCKET

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Yes
   - **File size limit**: `2097152` (2MB)
   - **Allowed MIME types**:
     - `image/jpeg`
     - `image/png`
     - `image/webp`
     - `image/gif`
5. Click **"Create bucket"**
6. Go to **Policies** tab and add:
   - Upload policy (users can upload their own)
   - Update policy (users can update their own)
   - Delete policy (users can delete their own)
   - Select policy (public read access)

### Option 2: Via SQL Editor

1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of `STORAGE_BUCKETS_SETUP.sql`
3. Paste and run the SQL
4. Verify with the verification query at the bottom

---

## 📋 BUCKET USAGE

### Where Each Bucket Is Used:

**certificates**

- `/api/certificates/generate`
- Student dashboard certificate downloads
- Admin certificate management

**media**

- Course images
- Program videos
- Marketing materials
- Blog post images

**documents**

- Student applications
- Enrollment forms
- Transcripts
- Background checks
- FERPA documents

**agreements**

- Partner MOUs
- Legal contracts
- Service agreements

**mous**

- Memorandums of understanding
- Partnership agreements

**avatars** (missing)

- User profile pictures
- Student photos
- Staff photos
- Instructor photos
- `/app/student/profile`
- `/app/lms/(app)/profile`
- `/app/portal/student/profile`

---

## 🔒 SECURITY POLICIES

### Public Buckets (Anyone can read):

- ✅ certificates
- ✅ media
- ❌ avatars (needs to be added)

### Private Buckets (Auth required):

- ✅ documents
- ✅ agreements
- ✅ mous

### User-Specific Access:

- **avatars**: Users can only manage their own
- **documents**: Users can only access their own
- **agreements**: Admin/partner access only
- **mous**: Admin/partner access only

---

## ✅ VERIFICATION STEPS

After adding the avatars bucket, verify:

```sql
-- Check all buckets exist
SELECT id, name, public, file_size_limit
FROM storage.buckets
ORDER BY name;

-- Should return 6 buckets:
-- 1. agreements
-- 2. avatars ← NEW
-- 3. certificates
-- 4. documents
-- 5. media
-- 6. mous
```

---

## 📊 SUMMARY

**Total Buckets Needed**: 6  
**Currently Created**: 5  
**Missing**: 1 (avatars)

**Action Required**:
Create the `avatars` bucket using the SQL in `STORAGE_BUCKETS_SETUP.sql`

**Impact**:
Without the avatars bucket, users cannot upload profile pictures. This affects:

- Student profiles
- Staff profiles
- Instructor profiles
- User settings pages

**Priority**: Medium (feature works without it, but profile pictures won't upload)

---

## 🎯 NEXT STEPS

1. ✅ Review this checklist
2. ❌ Run `STORAGE_BUCKETS_SETUP.sql` in Supabase
3. ❌ Verify avatars bucket is created
4. ❌ Test profile picture upload
5. ❌ Confirm policies are working

---

**Report Generated**: December 14, 2024  
**Status**: 5/6 Complete  
**Missing**: avatars bucket  
**Action**: Run STORAGE_BUCKETS_SETUP.sql
