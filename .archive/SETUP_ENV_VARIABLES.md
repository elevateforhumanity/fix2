# 🔐 SETUP ENVIRONMENT VARIABLES - Quick Guide

## 📍 Get Your Supabase Credentials

### Step 1: Go to Supabase Dashboard
**Link:** [https://supabase.com/dashboard](https://supabase.com/dashboard)

### Step 2: Select Your Project
- Click on your project name
- If you don't have a project, click "New Project"

### Step 3: Get API Credentials
1. In the left sidebar, click **Settings** (gear icon at bottom)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** - Copy this
   - **Project API keys** section:
     - `anon` `public` key - Copy this
     - `service_role` key - Click "Reveal" then copy

---

## 💻 Set Up Local Environment Variables (Gitpod)

### Option 1: Quick Command (Recommended)

Run this in Gitpod terminal:

```bash
cd /workspaces/fix2

# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF

# Edit the file with your actual credentials
nano .env.local
```

**In nano editor:**
1. Replace the placeholder values with your actual Supabase credentials
2. Press `Ctrl + X` to exit
3. Press `Y` to save
4. Press `Enter` to confirm

### Option 2: Manual Creation

1. In Gitpod file explorer, right-click on the root folder
2. Select "New File"
3. Name it `.env.local`
4. Paste this content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

5. Replace with your actual credentials from Supabase
6. Save the file (Ctrl+S or Cmd+S)

---

## ✅ Verify Environment Variables

Run this to check if variables are set:

```bash
# Source the .env.local file
export $(cat .env.local | xargs)

# Check if variables are loaded
echo "Supabase URL: $NEXT_PUBLIC_SUPABASE_URL"
echo "Anon Key: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:20}..."
echo "Service Key: ${SUPABASE_SERVICE_ROLE_KEY:0:20}..."
```

**Expected output:**
```
Supabase URL: https://xxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIs...
Service Key: eyJhbGciOiJIUzI1NiIs...
```

---

## 🚀 Restart Dev Server

After setting up environment variables:

```bash
# Kill existing dev server
pkill -f "next dev"

# Start fresh (will automatically load .env.local)
pnpm run dev
```

---

## 🌐 Set Up Production Environment Variables (Vercel)

### Step 1: Go to Vercel Dashboard
**Link:** [https://vercel.com/dashboard](https://vercel.com/dashboard)

### Step 2: Select Your Project
- Click on your project (elevateforhumanity or fix2)

### Step 3: Add Environment Variables
1. Click **Settings** tab
2. Click **Environment Variables** in left sidebar
3. Add each variable:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://your-project-id.supabase.co`
- Environment: Production, Preview, Development (check all)
- Click **Save**

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: Your anon key from Supabase
- Environment: Production, Preview, Development (check all)
- Click **Save**

**Variable 3:**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: Your service role key from Supabase
- Environment: Production, Preview, Development (check all)
- Click **Save**

### Step 4: Redeploy
After adding variables:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache"
5. Click **Redeploy**

---

## 🔍 Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"

**Fix:**
```bash
pnpm install @supabase/supabase-js
```

### Issue: Variables not loading in dev server

**Fix:**
```bash
# Make sure .env.local is in the root directory
ls -la .env.local

# Restart dev server
pkill -f "next dev"
pnpm run dev
```

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Check:**
1. `.env.local` file exists in project root
2. Variable names are spelled correctly (case-sensitive)
3. No extra spaces around `=` sign
4. Dev server was restarted after creating file

### Issue: Apply form shows "Could not save application"

**Check:**
1. Environment variables are set correctly
2. Supabase `applications` table exists
3. RLS policy allows inserts from service role
4. Check browser console for specific error

---

## 📋 Quick Reference

### Supabase Dashboard Links
- **Main Dashboard:** https://supabase.com/dashboard
- **API Settings:** https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
- **Table Editor:** https://supabase.com/dashboard/project/YOUR_PROJECT/editor
- **SQL Editor:** https://supabase.com/dashboard/project/YOUR_PROJECT/sql

### Vercel Dashboard Links
- **Main Dashboard:** https://vercel.com/dashboard
- **Environment Variables:** https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/settings/environment-variables
- **Deployments:** https://vercel.com/YOUR_USERNAME/YOUR_PROJECT/deployments

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `.env.local` file exists in project root
- [ ] All three variables are set with correct values
- [ ] Dev server restarts without errors
- [ ] Can access http://localhost:3000
- [ ] Apply form loads at http://localhost:3000/apply
- [ ] Submitting test application shows success message
- [ ] Application appears in Supabase `applications` table

---

## 🎯 Next Steps After Setup

1. **Test locally:**
   ```bash
   pnpm run dev
   # Visit http://localhost:3000/apply
   # Submit test application
   ```

2. **Check Supabase:**
   - Go to Table Editor
   - Select `applications` table
   - Verify test entry exists

3. **Deploy to production:**
   ```bash
   git add .env.local
   # DON'T commit .env.local!
   git add .gitignore  # Make sure .env.local is in .gitignore
   git commit -m "Ready for production"
   git push
   ```

4. **Test production:**
   - Visit https://www.elevateforhumanity.org/apply
   - Submit test application
   - Verify in Supabase

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs/environment-variables
- Next.js Env Docs: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
