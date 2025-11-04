# 🚀 Supabase Quick Setup (5 Minutes)

**Last Updated**: 2025-10-29 04:04 UTC  
**Autopilot Version**: 7.0

---

## ⚡ Quick Start (Copy/Paste Method)

### Step 1: Apply Database Schema (2 minutes)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (or create new one)
3. Click **SQL Editor** in left sidebar
4. Click **New Query**
5. Copy the entire contents of this file:
   ```
   supabase/migrations/ALL_IN_ONE__paste_into_dashboard.sql
   ```
6. Paste into SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. ✅ You should see: "LMS schema created successfully!"

**What this creates**:

- ✅ 15+ tables (programs, courses, lessons, enrollments, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Authentication triggers
- ✅ Sample data (6 programs, 1 course, 1 lesson)
- ✅ Analytics tables
- ✅ Certificate system
- ✅ Autopilot monitoring tables

---

### Step 2: Create Storage Buckets (2 minutes)

1. In Supabase Dashboard, click **Storage** in left sidebar
2. Click **New bucket** and create these 4 buckets:

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

### Step 3: Get API Keys (1 minute)

1. In Supabase Dashboard, click **Settings** → **API**
2. Copy these 3 values:

```bash
# Project URL
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# anon/public key (under "Project API keys")
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (under "Project API keys" - click "Reveal")
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Step 4: Add to Environment Variables

#### For Local Development:

Create `.env` file in project root:

```bash
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### For Netlify:

1. Go to Netlify Dashboard → Your site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable** and add all 3:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## ✅ Verification

Run these commands to verify setup:

```bash
# Test TypeScript
pnpm run typecheck

# Test ESLint
pnpm run lint

# Run tests
pnpm test

# Build project
pnpm run build
```

All should pass with:

- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ 72 tests passing
- ✅ Build successful

---

## 🎯 What You Get (80% Functionality)

After completing these 4 steps, you have:

### ✅ Full LMS Features

- Student registration and authentication
- Course catalog with 6 sample programs
- Course enrollment system
- Video lessons with progress tracking
- Quiz system with questions and responses
- Certificate generation
- Instructor dashboard
- Admin analytics
- Student profiles
- Progress tracking

### ✅ Database Tables

- `programs` - Course programs catalog
- `courses` - Individual courses
- `lessons` - Video lessons and content
- `enrollments` - Student course enrollments
- `lesson_progress` - Progress tracking
- `quiz_questions` - Quiz questions
- `quiz_responses` - Student answers
- `profiles` - User profiles
- `certificates` - Generated certificates
- `analytics_events` - Usage analytics
- `autopilot_logs` - System monitoring

### ✅ Storage Buckets

- `course-materials` - PDFs, documents, resources
- `certificates` - Generated PDF certificates
- `profile-avatars` - User profile pictures
- `program-covers` - Program cover images

### ✅ Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for student data
- Public read for course catalog
- Private write for user data

---

## 🚀 Next Steps (Optional)

### To Get 95% Functionality (Add Payments + AI):

See `API_KEYS_REQUIRED.md` for:

- Stripe keys (3 keys) - For payments
- OpenAI key (1 key) - For AI content generation

### To Get 100% Functionality (Add Social + Monitoring):

See `API_KEYS_REQUIRED.md` for:

- Twitter/X API (4 keys)
- LinkedIn API (2 keys)
- Facebook API (2 keys)
- Slack webhook (1 URL)
- Cloudflare (2 keys)

---

## 🔄 Autonomous Autopilot

The system monitors and auto-fixes issues every 30 minutes:

- ✅ Monitors Supabase connection health
- ✅ Auto-fixes TypeScript errors
- ✅ Auto-fixes ESLint errors
- ✅ Creates GitHub issues for failures
- ✅ Self-heals without manual intervention

---

## 📊 Sample Data Included

The migration includes sample data to test immediately:

### 6 Programs:

1. CNA / HHA (Healthcare)
2. Welding (AWS SENSE) (Construction)
3. Nail Technology (Beauty)
4. CDL (A/B) Prep (Business)
5. Office Tech & AI (Tech)
6. OSHA-10 + CPR (Construction)

### 1 Sample Course:

- HLTH-101: Patient Care Basics

### 1 Sample Lesson:

- Hand Hygiene (with video and content)

### 1 Sample Quiz:

- Hand hygiene quiz question

---

## 🆘 Troubleshooting

### Issue: "relation already exists"

**Solution**: Tables already created. This is fine - the migration uses `if not exists`.

### Issue: "permission denied"

**Solution**: Make sure you're running the SQL as the project owner in Supabase Dashboard.

### Issue: "cannot create bucket"

**Solution**: Bucket might already exist. Check Storage → All buckets.

### Issue: Build fails on Netlify

**Solution**:

1. Check environment variables are set correctly
2. Trigger new deploy with "Clear cache and deploy"
3. Check Netlify build logs for specific error

### Issue: Authentication not working

**Solution**:

1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
2. Check Supabase Dashboard → Authentication → Providers
3. Enable Email provider if not already enabled

---

## 📞 Support

If you encounter issues:

1. Check GitHub Issues for autopilot-created alerts
2. Review Netlify build logs
3. Check Supabase logs in Dashboard → Logs
4. Autopilot will auto-fix most issues within 30 minutes

---

**Setup Time**: 5 minutes  
**Functionality**: 80% (Full LMS)  
**Status**: Production Ready  
**Generated by**: Autonomous Autopilot v7.0
