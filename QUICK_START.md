# 🚀 Quick Start Guide - Supabase Migration & Deployment

## ⚡ One-Command Solution

Run this to check your Supabase status and get next steps:

```bash
./scripts/check-and-restore-supabase.sh
```

This will tell you if your Supabase project is:
- ✅ Active and ready (proceed to migrations)
- ⚠️ Paused (needs restoration)
- ❌ Not found (needs creation)

---

## 📋 Step-by-Step Process

### Step 1: Check Supabase Status

```bash
./scripts/check-and-restore-supabase.sh
```

**If Active:** Proceed to Step 2
**If Paused:** Restore it in [Supabase Dashboard](https://supabase.com/dashboard), then proceed
**If Not Found:** Create new project (see below), then proceed

### Step 2: Apply Migrations

**Option A: Interactive Wizard (Recommended)**
```bash
./scripts/apply-migrations-interactive.sh
```

This wizard will:
- Check if Supabase CLI is installed
- Offer to install it if needed
- Guide you through CLI or Dashboard method
- Show you exactly what to do

**Option B: Supabase CLI (Fastest)**
```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref cuxzzpsyufcewtmicszk

# Apply all migrations
supabase db push
```

**Option C: Dashboard (Manual)**
1. Go to: [SQL Editor](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql)
2. Click "New Query"
3. Copy and run each file in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_lms_schema.sql`
   - `supabase/migrations/003_lms_seed_data.sql`
   - `supabase/migrations/004_add_missing_rls_policies.sql` ⭐ NEW

### Step 3: Deploy Everything

```bash
./scripts/autopilot-complete-deployment.sh
```

This will automatically:
- ✅ Build your application
- ✅ Deploy to Cloudflare Pages
- ✅ Set GitHub secrets
- ✅ Commit and push changes

**Done!** Your app is live at: [https://elevateforhumanity.pages.dev](https://elevateforhumanity.pages.dev)

---

## 🆕 Creating New Supabase Project

If your project doesn't exist:

### 1. Create Project
- Go to: [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Click "New Project"
- Name: `elevate-lms`
- Password: (create strong password)
- Region: `us-east-1` (or closest)
- Plan: **Free**
- Wait 2-3 minutes...

### 2. Get Credentials
- Go to: Settings → API
- Copy:
  - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
  - **anon public**: `eyJhbGci...`
  - **service_role**: `eyJhbGci...`

### 3. Update Code

**Update .env:**
```bash
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...
```

**Update src/supabaseClient.js:**
Replace the fallback URL and key with your new values.

**Update GitHub Secrets:**
```bash
gh secret set VITE_SUPABASE_URL -b"https://xxxxxxxxxxxxx.supabase.co"
gh secret set VITE_SUPABASE_ANON_KEY -b"eyJhbGci..."
gh secret set SUPABASE_SERVICE_KEY -b"eyJhbGci..."
```

### 4. Apply Migrations
Run the interactive wizard:
```bash
./scripts/apply-migrations-interactive.sh
```

### 5. Deploy
```bash
./scripts/autopilot-complete-deployment.sh
```

---

## 🔧 Troubleshooting

### "Could not resolve host"
- Your Supabase project is paused or doesn't exist
- Run: `./scripts/check-and-restore-supabase.sh`

### "Permission denied" errors
- You need the service_role key, not just anon key
- Get it from: Settings → API in Supabase Dashboard

### "Table already exists" errors
- Migrations were already applied
- This is OK! Skip to deployment step

### "Supabase CLI not found"
```bash
npm install -g supabase
```

### "GitHub CLI not found"
```bash
# Install from: https://cli.github.com/
# Or manually add secrets in GitHub Settings
```

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `SUPABASE_STATUS.md` | Complete Supabase status and restoration guide |
| `supabase/RLS_POLICIES.md` | Detailed RLS policy documentation |
| `supabase/README.md` | Supabase setup and configuration |
| `CLOUDFLARE_PAGES_SETUP.md` | Cloudflare Pages deployment guide |

---

## 🎯 What Gets Deployed

After running the autopilot:

### Database (Supabase)
- ✅ 8 tables with RLS enabled
- ✅ 30+ RLS policies for security
- ✅ Sample course data
- ✅ Authentication ready

### Frontend (Cloudflare Pages)
- ✅ React SPA with routing
- ✅ Supabase integration
- ✅ LMS features
- ✅ SEO optimized

### Backend (Render)
- ✅ API endpoints
- ✅ Static file serving
- ✅ CORS configured

### CI/CD (GitHub Actions)
- ✅ Auto-deploy on push
- ✅ Environment variables set
- ✅ Build and test pipeline

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Check Supabase status | 30 seconds |
| Restore paused project | 2-3 minutes |
| Create new project | 3-5 minutes |
| Apply migrations (CLI) | 1-2 minutes |
| Apply migrations (Dashboard) | 5-10 minutes |
| Run autopilot deployment | 2-3 minutes |
| **Total (existing project)** | **5-10 minutes** |
| **Total (new project)** | **10-15 minutes** |

---

## 🆘 Need Help?

1. **Check project status:**
   ```bash
   ./scripts/check-and-restore-supabase.sh
   ```

2. **View migration files:**
   ```bash
   ./scripts/apply-migrations-interactive.sh
   # Choose option 3
   ```

3. **Read documentation:**
   - `SUPABASE_STATUS.md` - Complete guide
   - `supabase/RLS_POLICIES.md` - Security policies

4. **Community:**
   - Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)
   - Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] Supabase project is active
- [ ] All 4 migrations applied successfully
- [ ] Tables visible in Supabase Table Editor
- [ ] RLS policies visible in Authentication → Policies
- [ ] Application builds without errors
- [ ] Deployed to Cloudflare Pages
- [ ] GitHub secrets configured
- [ ] Application accessible at deployment URL

**All checked?** You're done! 🚀
