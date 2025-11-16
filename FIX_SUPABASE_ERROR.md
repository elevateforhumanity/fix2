# 🔧 FIX: Supabase Configuration Error

## ❌ The Error You're Seeing

```
project's URL and Key are required to create a Supabase client!
Check your Supabase project's API settings to find these values
https://supabase.com/dashboard/project/_/settings/api
```

---

## ✅ QUICK FIX (2 Minutes)

### Option 1: Interactive Setup (Recommended)

```bash
bash scripts/setup-env.sh
```

This will:

1. Prompt you for your Supabase keys
2. Create `.env.local` automatically
3. Validate the keys
4. You're done!

### Option 2: Manual Setup

1. **Copy the template**:

   ```bash
   cp .env.local.example .env.local
   ```

2. **Get your keys** from:
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

3. **Edit `.env.local`** and replace:
   - `your_anon_key_here` with your **anon public** key
   - `your_service_role_key_here` with your **service_role** key

4. **Save and restart**:
   ```bash
   npm run dev
   ```

---

## 🔑 Where to Get Your Keys

### Step 1: Go to Supabase Dashboard

Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

### Step 2: Copy Your Keys

You'll see two keys:

1. **anon public** (starts with `eyJhbGci...`)
   - This is safe to use in client-side code
   - Copy this entire long string

2. **service_role** (starts with `eyJhbGci...`)
   - This is SECRET - never expose in client code
   - Copy this entire long string

### Step 3: Use the Keys

Run the setup script:

```bash
bash scripts/setup-env.sh
```

Paste each key when prompted.

---

## 📋 What Gets Created

The script creates `.env.local` with:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.elevate4humanityedu.org
NEXT_PUBLIC_APP_URL=https://www.elevate4humanityedu.org

# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (your key here)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (your key here)

# Email (Optional)
RESEND_API_KEY=
EMAIL_FROM=noreply@elevate4humanityedu.org

# Stripe (Optional)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-EFHWORKFORCE01
```

---

## 🧪 Verify It Works

```bash
# Start the dev server
npm run dev

# Visit http://localhost:3000
# You should NOT see the Supabase error anymore
```

---

## 🐛 Troubleshooting

### Error: "Invalid API key"

- ✅ Make sure you copied the FULL key (very long string)
- ✅ Check for extra spaces or line breaks
- ✅ Verify you're using keys from the correct project

### Error: "Failed to fetch"

- ✅ Check your internet connection
- ✅ Verify the Supabase project is running
- ✅ Confirm the project URL is correct

### Error: "Row Level Security policy violation"

- ✅ Run the database migration: `supabase/migrations/000_CONSOLIDATED_SCHEMA.sql`
- ✅ Check RLS policies are created
- ✅ Verify user authentication is working

### Keys not loading

- ✅ File must be named exactly `.env.local`
- ✅ File must be in project root (not in subdirectory)
- ✅ Restart dev server after creating file
- ✅ Check file permissions (should be readable)

---

## 🔐 Security Notes

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

## 📞 Still Need Help?

### Option 1: Use the Autopilot

```bash
# Run the GitHub Actions workflow
gh workflow run setup-supabase-keys.yml
```

### Option 2: Contact Support

- **Phone**: (317) 314-3757
- **Email**: support@elevate4humanityedu.org

### Option 3: Check Documentation

- [QUICK_START.md](./QUICK_START.md)
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
- [AUTOPILOT_SUPABASE_SETUP.md](./AUTOPILOT_SUPABASE_SETUP.md)

---

## ✅ Checklist

Before proceeding, ensure:

- [ ] Ran `bash scripts/setup-env.sh`
- [ ] Entered both Supabase keys
- [ ] File `.env.local` exists in project root
- [ ] Restarted development server
- [ ] Verified no errors in console
- [ ] Can access homepage without Supabase error

---

## 🎯 Quick Reference

**Project URL**: https://cuxzzpsyufcewtmicszk.supabase.co  
**Project Ref**: cuxzzpsyufcewtmicszk  
**API Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api  
**Setup Script**: `bash scripts/setup-env.sh`  
**Phone**: (317) 314-3757

---

**Once you've set up your `.env.local` file, the error will disappear!** ✅
