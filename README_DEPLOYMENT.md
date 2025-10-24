# 🚀 Complete Deployment Guide

## ✨ Good News: Your Supabase is ACTIVE!

Your Supabase project is running and accessible. You just need to apply migrations and deploy.

---

## 🎯 ONE-COMMAND SOLUTION

```bash
./GO.sh
```

This single command will:
1. ✅ Check Supabase status
2. ✅ Verify database schema
3. ✅ Install dependencies
4. ✅ Build application
5. ✅ Set GitHub secrets
6. ✅ Deploy to Cloudflare
7. ✅ Commit and push changes

**Time: 3-5 minutes**

---

## 📋 If Migrations Needed

If `./GO.sh` tells you migrations are needed, you have 3 options:

### Option 1: Interactive Wizard (Easiest)
```bash
./scripts/apply-migrations-interactive.sh
```
- Guides you step-by-step
- Offers to install Supabase CLI
- Shows you exactly what to do

### Option 2: Supabase CLI (Fastest - 2 minutes)
```bash
npm install -g supabase
supabase login
supabase link --project-ref cuxzzpsyufcewtmicszk
supabase db push
```

### Option 3: Dashboard (Manual - 5 minutes)
1. Go to: [SQL Editor](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql)
2. Click "New Query"
3. Copy and run each file:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_lms_schema.sql`
   - `supabase/migrations/003_lms_seed_data.sql`
   - `supabase/migrations/004_add_missing_rls_policies.sql` ⭐ NEW

After migrations, run `./GO.sh` again.

---

## 🛠️ Individual Scripts

If you prefer step-by-step control:

### 1. Check Supabase Status
```bash
./scripts/check-and-restore-supabase.sh
```
Shows if your project is active, paused, or needs creation.

### 2. Apply Migrations
```bash
./scripts/apply-migrations-interactive.sh
```
Interactive wizard for applying database migrations.

### 3. Complete Deployment
```bash
./scripts/autopilot-complete-deployment.sh
```
Builds, deploys, and configures everything.

---

## 📊 What Gets Created

### Database Tables (Supabase)
- `profiles` - User profiles
- `courses` - Course catalog
- `modules` - Course modules/lessons
- `enrollments` - Student enrollments
- `module_progress` - Progress tracking
- `certificates` - Issued certificates
- `assignments` - Course assignments
- `submissions` - Student submissions

### Security (RLS Policies)
- 30+ Row Level Security policies
- Students can only see their own data
- Instructors can manage their courses
- Public can view published content

### Deployment Targets
- **Cloudflare Pages**: Frontend (React SPA)
- **Render**: Backend API
- **GitHub Actions**: Auto-deployment

---

## 🔑 Environment Variables

Already configured in code with fallbacks:
```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (already set)
```

Optional (for deployment):
```bash
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

---

## ✅ Success Checklist

After running `./GO.sh`:

- [ ] Supabase shows as "Active"
- [ ] Database tables visible in Supabase Dashboard
- [ ] Application builds without errors
- [ ] GitHub secrets configured
- [ ] Deployed to Cloudflare Pages
- [ ] Application accessible at URL

---

## 🌐 Your URLs

After deployment:

- **Frontend**: [https://elevateforhumanity.pages.dev](https://elevateforhumanity.pages.dev)
- **Backend**: [https://elevateforhumanity.onrender.com](https://elevateforhumanity.onrender.com)
- **Supabase**: [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)
- **GitHub**: [https://github.com/elevateforhumanity/fix2](https://github.com/elevateforhumanity/fix2)

---

## 🆘 Troubleshooting

### "Supabase not accessible"
```bash
./scripts/check-and-restore-supabase.sh
```
Follow the instructions to restore or create project.

### "Migrations failed"
Try the Dashboard method - it's more reliable for first-time setup.

### "Build failed"
```bash
pnpm install
pnpm run build
```
Check for errors in the output.

### "Deployment failed"
Set Cloudflare credentials:
```bash
export CLOUDFLARE_API_TOKEN='your-token'
export CLOUDFLARE_ACCOUNT_ID='your-account-id'
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `QUICK_START.md` | Quick start guide |
| `SUPABASE_STATUS.md` | Supabase troubleshooting |
| `supabase/RLS_POLICIES.md` | Security policies documentation |
| `CLOUDFLARE_PAGES_SETUP.md` | Cloudflare configuration |

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Run `./GO.sh` (no migrations) | 3-5 minutes |
| Apply migrations (CLI) | 2 minutes |
| Apply migrations (Dashboard) | 5-10 minutes |
| **Total** | **5-15 minutes** |

---

## 🎉 That's It!

Your deployment is automated. Just run:

```bash
./GO.sh
```

And you're done! 🚀
