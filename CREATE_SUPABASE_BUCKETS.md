# 🪣 Create Supabase Storage Buckets

**Status**: ❌ Buckets not created yet  
**Action Required**: Create 4 storage buckets

---

## 🎯 Quick Check

I checked your Supabase project and found:

- ✅ Supabase project exists: `cuxzzpsyufcewtmicszk`
- ✅ Anon key configured
- ❌ **Storage buckets not created yet**

---

## 🚀 Option 1: Create via Supabase Dashboard (Easiest - 2 minutes)

### Step 1: Go to Supabase Dashboard

**Link**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets

### Step 2: Create 4 Buckets

Click **New bucket** for each:

#### Bucket 1: `course-materials`

- **Name**: `course-materials`
- **Public**: ✅ Yes (checked)
- **File size limit**: 50 MB
- **Allowed MIME types**: Leave empty (all types)
- Click **Create bucket**

#### Bucket 2: `certificates`

- **Name**: `certificates`
- **Public**: ✅ Yes (checked)
- **File size limit**: 10 MB
- **Allowed MIME types**: `application/pdf,image/png,image/jpeg`
- Click **Create bucket**

#### Bucket 3: `profile-avatars`

- **Name**: `profile-avatars`
- **Public**: ✅ Yes (checked)
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/png,image/jpeg,image/gif,image/webp`
- Click **Create bucket**

#### Bucket 4: `program-covers`

- **Name**: `program-covers`
- **Public**: ✅ Yes (checked)
- **File size limit**: 10 MB
- **Allowed MIME types**: `image/png,image/jpeg,image/webp`
- Click **Create bucket**

---

## 🤖 Option 2: Create via Script (Automated)

### Prerequisites:

You need your Supabase Service Role Key (not the anon key).

**Get it from**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

Look for **service_role** key (click "Reveal" to see it).

### Run the Script:

```bash
# Set your service role key
export SUPABASE_PROJECT_REF=cuxzzpsyufcewtmicszk
export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Run the automated script
./scripts/setup-supabase-storage.sh
```

---

## ✅ Verify Buckets Created

After creating buckets, verify:

```bash
# Check buckets exist
curl -s "https://cuxzzpsyufcewtmicszk.supabase.co/storage/v1/bucket" \
  -H "Authorization: Bearer YOUR_ANON_KEY" | jq -r '.[].name'
```

Expected output:

```
course-materials
certificates
profile-avatars
program-covers
```

Or visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets

---

## 📊 What Each Bucket Is For

### `course-materials` (50 MB, public)

**Purpose**: Course content files

- PDFs, documents, presentations
- Video files (if not using external hosting)
- Course resources and downloads
- Lesson attachments

### `certificates` (10 MB, public)

**Purpose**: Generated certificates

- PDF certificates
- Certificate images
- Completion badges
- Achievement awards

### `profile-avatars` (5 MB, public)

**Purpose**: User profile pictures

- Student avatars
- Instructor photos
- Admin profile pictures
- User uploaded images

### `program-covers` (10 MB, public)

**Purpose**: Program and course images

- Program cover images
- Course thumbnails
- Marketing images
- Featured program banners

---

## 🔒 Security Settings

All buckets are set to **public** because:

- ✅ Course materials should be accessible to enrolled students
- ✅ Certificates need to be shareable/verifiable
- ✅ Profile avatars are public by design
- ✅ Program covers are marketing materials

**Row Level Security (RLS)** is handled at the database level, not storage level.

---

## 🆘 Troubleshooting

### Issue: "Bucket already exists"

**Solution**: Bucket is already created. This is fine - skip to next bucket.

### Issue: "Permission denied"

**Solution**:

- Make sure you're logged into Supabase Dashboard
- Verify you have admin access to the project
- Try using service role key with the script

### Issue: "Cannot create bucket"

**Solution**:

- Check project is active (not paused)
- Verify you're on the correct project
- Try refreshing the page and creating again

---

## 🎉 After Buckets Are Created

Once buckets are created, your LMS can:

- ✅ Upload course materials
- ✅ Generate and store certificates
- ✅ Store user profile pictures
- ✅ Upload program cover images
- ✅ Manage all file uploads

---

## 📚 Next Steps

After creating buckets:

1. ✅ Buckets created
2. ✅ Add OpenAI API key (see `GET_OPENAI_API_KEY.md`)
3. ✅ Add all API keys to Netlify (see `QUICK_DEPLOY_CHECKLIST.md`)
4. ✅ Deploy to Netlify
5. ✅ Deploy Cloudflare Worker
6. ✅ Test everything

---

## 🔗 Quick Links

**Supabase Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk  
**Storage Buckets**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets  
**API Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api  
**Documentation**: https://supabase.com/docs/guides/storage

---

**Time to Create**: 2 minutes (manual) or 1 minute (script)  
**Buckets Needed**: 4 total  
**Status**: ❌ Not created yet - **CREATE NOW**

---

**🚀 CREATE BUCKETS NOW: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/storage/buckets 🚀**
