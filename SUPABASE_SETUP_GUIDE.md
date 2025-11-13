# 🔧 SUPABASE SETUP GUIDE

## ⚠️ ERROR: Missing Supabase Credentials

You're seeing this error because the application needs your Supabase project credentials:

```
project's URL and Key are required to create a Supabase client!
```

---

## 🚀 QUICK FIX (5 Minutes)

### Step 1: Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/_/settings/api
   - Or: https://app.supabase.com → Select your project → Settings → API

2. **Copy these values**:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (different long string)

### Step 2: Create `.env.local` File

In the root of your project (`/workspaces/fix2/`), create a file named `.env.local`:

```bash
# Copy this template and fill in your actual values

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://elevateconnectsdirectory.org

# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_SERVICE_ROLE_KEY

# Email (Optional - for notifications)
RESEND_API_KEY=re_your_resend_key_here
EMAIL_FROM=noreply@elevateconnectsdirectory.org

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-EFHWORKFORCE01
```

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 📋 DETAILED SETUP INSTRUCTIONS

### Option A: Using Existing Supabase Project

If you already have a Supabase project:

1. **Login to Supabase**:
   ```
   https://app.supabase.com
   ```

2. **Select Your Project**:
   - Click on your project name
   - Or create a new project if needed

3. **Navigate to API Settings**:
   - Click "Settings" (gear icon) in sidebar
   - Click "API"
   - You'll see:
     - Project URL
     - Project API keys (anon/public and service_role)

4. **Copy Credentials**:
   - Copy the **Project URL**
   - Copy the **anon public** key
   - Copy the **service_role** key (⚠️ Keep this secret!)

5. **Create `.env.local`**:
   ```bash
   cd /workspaces/fix2
   cp .env.local.example .env.local
   nano .env.local  # or use any text editor
   ```

6. **Paste Your Credentials**:
   - Replace `YOUR_PROJECT_REF` with your actual project reference
   - Replace `YOUR_ANON_KEY` with your anon key
   - Replace `YOUR_SERVICE_ROLE_KEY` with your service role key

### Option B: Create New Supabase Project

If you don't have a Supabase project yet:

1. **Sign Up for Supabase**:
   ```
   https://supabase.com
   ```

2. **Create New Project**:
   - Click "New Project"
   - Choose organization (or create one)
   - Enter project details:
     - Name: `elevate-for-humanity`
     - Database Password: (generate strong password)
     - Region: Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get API Credentials**:
   - Once project is ready, go to Settings → API
   - Copy the credentials as described above

4. **Run Database Migration**:
   ```bash
   # Copy the consolidated schema
   cat supabase/migrations/000_CONSOLIDATED_SCHEMA.sql
   
   # Go to Supabase Dashboard → SQL Editor
   # Paste the entire schema
   # Click "Run"
   ```

---

## 🔐 SECURITY NOTES

### ⚠️ NEVER COMMIT THESE FILES:
- `.env.local` (contains secrets)
- `.env` (if you create it)

### ✅ SAFE TO COMMIT:
- `.env.example` (template only)
- `.env.local.example` (template only)

### 🔒 Service Role Key:
- **NEVER** expose this in client-side code
- Only use in API routes (server-side)
- This key bypasses Row Level Security (RLS)

### 🌐 Anon/Public Key:
- Safe to use in client-side code
- Respects Row Level Security (RLS)
- Used for authenticated user operations

---

## 🧪 VERIFY SETUP

After creating `.env.local`, verify it works:

```bash
# 1. Check environment variables are loaded
npm run dev

# 2. Visit the homepage
# Open: http://localhost:3000

# 3. Check browser console for errors
# Should NOT see: "project's URL and Key are required"

# 4. Test authentication
# Try to sign up or login
```

---

## 🐛 TROUBLESHOOTING

### Error: "Invalid API key"
- ✅ Check you copied the full key (very long string)
- ✅ Check for extra spaces or line breaks
- ✅ Verify you're using the correct project

### Error: "Failed to fetch"
- ✅ Check your Supabase project is running
- ✅ Verify the Project URL is correct
- ✅ Check your internet connection

### Error: "Row Level Security policy violation"
- ✅ Run the database migration (000_CONSOLIDATED_SCHEMA.sql)
- ✅ Check RLS policies are created
- ✅ Verify user authentication is working

### Environment variables not loading
- ✅ File must be named exactly `.env.local`
- ✅ File must be in project root (not in subdirectory)
- ✅ Restart dev server after creating file
- ✅ Check file permissions (should be readable)

---

## 📁 FILE STRUCTURE

Your project should have:

```
/workspaces/fix2/
├── .env.local              ← CREATE THIS (your secrets)
├── .env.local.example      ← Template (safe to commit)
├── .env.example            ← Old template (legacy)
├── .gitignore              ← Should include .env.local
├── package.json
├── next.config.mjs
└── supabase/
    └── migrations/
        └── 000_CONSOLIDATED_SCHEMA.sql
```

---

## 🚀 DEPLOYMENT (Netlify)

For production deployment, set environment variables in Netlify:

1. **Go to Netlify Dashboard**:
   - https://app.netlify.com
   - Select your site

2. **Navigate to Environment Variables**:
   - Site settings → Environment variables
   - Or: Build & deploy → Environment

3. **Add Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...
   NEXT_PUBLIC_SITE_URL = https://elevateconnectsdirectory.org
   ```

4. **Redeploy**:
   - Trigger a new deploy
   - Or push to main branch

---

## 📞 NEED HELP?

### Supabase Support:
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

### Project Support:
- Contact: (317) 314-3757
- Email: support@elevateconnectsdirectory.org

---

## ✅ CHECKLIST

Before proceeding, ensure:

- [ ] Created `.env.local` file in project root
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Restarted development server
- [ ] Verified no errors in console
- [ ] Tested authentication flow

---

## 🎯 QUICK REFERENCE

### Minimum Required Variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### Where to Find Them:
```
https://supabase.com/dashboard/project/_/settings/api
```

### How to Use:
1. Copy template from `.env.local.example`
2. Replace placeholders with real values
3. Save as `.env.local`
4. Restart server

---

**Once you've set up your `.env.local` file, the error will disappear and the application will work!** 🎉
