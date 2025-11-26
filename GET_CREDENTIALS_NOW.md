# 🔐 Get Your Supabase Credentials - 2 Minute Guide

The automation detected you need to set up credentials. Here's the fastest way:

---

## ⚡ FASTEST METHOD: Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open a browser window. Click "Confirm" to login.

### Step 3: Link Your Project (if needed)
```bash
vercel link
```
Select your project from the list.

### Step 4: Pull Environment Variables
```bash
vercel env pull .env.local
```

### Step 5: Verify It Worked
```bash
node check-database.mjs
```

**Total time:** 2 minutes

---

## 🖱️ ALTERNATIVE: Manual Copy from Vercel Dashboard

If Vercel CLI doesn't work, copy manually:

### Step 1: Go to Vercel Dashboard
Open: https://vercel.com/dashboard

### Step 2: Select Your Project
Click on your "elevateforhumanity" or "fix2" project

### Step 3: Go to Environment Variables
Click: **Settings** → **Environment Variables**

### Step 4: Copy These Three Values

Look for these variables and copy their values:
1. `NEXT_PUBLIC_SUPABASE_URL` - Should look like `https://xxxxx.supabase.co`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Long string starting with `eyJ...`
3. `SUPABASE_SERVICE_ROLE_KEY` - Long string starting with `eyJ...`

### Step 5: Create .env.local File

In your terminal, run this (replace with your actual values):

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
EOF
```

### Step 6: Verify It Worked
```bash
node check-database.mjs
```

**Total time:** 3-5 minutes

---

## ✅ What You Should See After Setup

When you run `node check-database.mjs`, you should see:

```
🔍 Checking Supabase Database Status

Environment:
  URL: ✅ SET
  Key: ✅ SET

✅ Connection successful!

📊 Checking Database Tables

CORE TABLES:
  ✅ profiles - EXISTS
  ✅ programs - EXISTS
  ✅ courses - EXISTS
  ... etc ...
```

---

## 🚨 If You See Errors

### Error: "Table does not exist"
**Solution:** You need to run migrations in Supabase
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/RUN_ALL_MIGRATIONS.sql`
3. Copy entire file
4. Paste into SQL Editor
5. Click "Run"

### Error: "Invalid API key"
**Solution:** Regenerate keys in Supabase
1. Go to Supabase Dashboard → Settings → API
2. Click "Reset" on service_role key
3. Copy new keys
4. Update `.env.local`
5. Update Vercel environment variables

### Error: "Connection refused"
**Solution:** Supabase project might be paused
1. Go to Supabase Dashboard
2. Click "Resume Project" if you see it
3. Wait 30 seconds
4. Try again

---

## 🎯 Once Credentials Are Set

After you have `.env.local` working:

1. ✅ Run `node check-database.mjs` to see tables
2. ✅ Run migrations if tables are missing
3. ✅ I'll wire up all 6 dashboards
4. ✅ Test locally with `pnpm dev`
5. ✅ Deploy to Vercel

---

## 📞 Ready for Next Step

Once you've completed either method above, tell me:
1. Did `node check-database.mjs` work?
2. How many tables exist?
3. Are any tables missing?

Then I'll help you:
- Run any missing migrations
- Wire up all 6 dashboards
- Get everything working end-to-end

---

**Choose your method and let's get this done!** 🚀
