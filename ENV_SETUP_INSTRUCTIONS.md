# Environment Variable Setup Instructions

Your `.env.local` file exists but has **placeholder values**. You need real credentials from Vercel.

## 🚀 Quick Setup (Recommended)

### Step 1: Get Your Vercel Token

1. Go to: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it: `Development Environment`
4. Copy the token (starts with `vercel_...`)

### Step 2: Set the Token in Gitpod

```bash
# Set permanently (recommended)
gp env VERCEL_TOKEN='paste-your-token-here'

# Or set for this session only
export VERCEL_TOKEN='paste-your-token-here'
```

### Step 3: Pull Environment Variables

```bash
bash pull-env-from-vercel.sh
```

This will:
- ✅ Pull all real environment variables from Vercel
- ✅ Create/update `.env.local` with real credentials
- ✅ Verify all critical variables are present
- ✅ Backup your existing `.env.local` (if any)

### Step 4: Verify

```bash
# Check that real values are present (not placeholders)
cat .env.local | grep SUPABASE

# Should show real URLs like:
# NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
```

---

## 📋 Alternative: Manual Setup

If you can't access Vercel, you can set up manually:

### Option 1: Use Interactive Script

```bash
bash create-env-local.sh
```

This will guide you through entering credentials manually.

### Option 2: Edit .env.local Directly

1. **Get Supabase credentials:**
   - Go to: [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to: **Settings** → **API**
   - Copy these three values:
     - Project URL
     - anon/public key
     - service_role key

2. **Edit .env.local:**
   ```bash
   nano .env.local
   ```

3. **Replace these lines:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-service-role-key-here
   ```

   With your actual values from Supabase.

---

## 🔍 Verify Your Setup

After setting up environment variables:

```bash
# Check for placeholder values
grep -E "your-project|your-anon-key|your-service-role" .env.local

# If this returns nothing, you're good!
# If it shows matches, you still have placeholders

# Check Supabase URL
grep "^NEXT_PUBLIC_SUPABASE_URL=" .env.local

# Should show a real URL like:
# NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
```

---

## 🎯 Next Steps After Setup

Once you have real credentials in `.env.local`:

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm run dev

# 3. Your website should now work!
```

---

## 🔧 Available Scripts

```bash
# Pull from Vercel (requires VERCEL_TOKEN)
bash pull-env-from-vercel.sh

# Interactive setup
bash create-env-local.sh

# Quick setup from template
npm run env:setup

# Alternative Vercel pull
npm run env:pull
```

---

## ⚠️ Troubleshooting

### "VERCEL_TOKEN not set"

```bash
# Check if token is set
echo $VERCEL_TOKEN

# If empty, set it:
gp env VERCEL_TOKEN='your-token-here'

# Restart your terminal or run:
eval $(gp env -e)
```

### "Failed to pull from Vercel"

1. **Verify token is valid:**
   ```bash
   vercel whoami --token="$VERCEL_TOKEN"
   ```

2. **Check project access:**
   - Go to: [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Verify you can see the `fix2` project

3. **Try manual setup:**
   ```bash
   bash create-env-local.sh
   ```

### "Still seeing placeholder values"

This means Vercel doesn't have the real credentials set.

**To fix:**
1. Go to: [https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2/settings/environment-variables](https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2/settings/environment-variables)
2. Add the missing environment variables in Vercel
3. Run `bash pull-env-from-vercel.sh` again

### "Can't access Vercel or Supabase"

Contact your team admin to:
- Get Vercel project access
- Get Supabase project access
- Or get the credentials directly from them

---

## 📊 What You Need

### Critical (Required):
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

### Optional (for full functionality):
- `STRIPE_SECRET_KEY` - Payment processing
- `RESEND_API_KEY` - Email sending
- `OPENAI_API_KEY` - AI features
- `SENTRY_DSN` - Error tracking

---

## 🔐 Security Notes

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Never share your `.env.local` file
- ✅ Never commit credentials to git
- ✅ Use Vercel for production environment variables

---

## 📞 Need Help?

1. **Check this file:** `GET_REAL_ENV_VARS.md`
2. **Check fixes:** `FIXES_APPLIED.md`
3. **Ask team admin** for Vercel/Supabase access

---

**Quick Command Reference:**

```bash
# Get Vercel token → Set it → Pull variables
gp env VERCEL_TOKEN='your-token'
bash pull-env-from-vercel.sh

# Verify
cat .env.local | grep SUPABASE

# Start app
pnpm install
pnpm run dev
```
