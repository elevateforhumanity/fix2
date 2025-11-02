# 🤖 Autopilot Handles It - Complete Guide

## ✅ YES! Your Autopilot Can Handle Everything!

Your autopilot now has **3 levels of automation**:

---

## 🎯 Level 1: Smart Detection (Always Active)

```bash
pnpm autopilot:migrate
```

**What it does:**

- ✅ Checks if migrations are already applied
- ✅ Detects all 16 expected tables
- ✅ If complete, confirms ready
- ✅ If not, shows exact instructions

**Output when ready:**

```
✅ DATABASE ALREADY CONFIGURED!
   All 16 tables exist
   Your LMS database is ready!
```

**Output when migrations needed:**

```
📋 MIGRATIONS NEED TO BE APPLIED

🚀 Quick Setup (2 minutes):
1. Open Supabase SQL Editor: [link]
2. Copy migration file: [path]
3. Paste and click "Run"
4. Run pnpm autopilot:migrate again
```

---

## 🚀 Level 2: Assisted Mode (Semi-Automatic)

```bash
node scripts/autopilot-apply-now.mjs
```

**What it does:**

- ✅ Opens Supabase SQL Editor in your browser
- ✅ Shows exact file to copy
- ✅ Provides step-by-step instructions
- ✅ You just copy-paste and click "Run"

**Perfect for:** First-time setup, no CLI experience needed

---

## ⚡ Level 3: Fully Autonomous (One Command)

```bash
bash scripts/autopilot-auto-apply.sh
```

**What it does:**

- ✅ Links to Supabase project automatically
- ✅ Applies all migrations via CLI
- ✅ Verifies all tables created
- ✅ Confirms when complete

**Requirements:**

- Supabase CLI installed ✅ (already available)
- Access token set (one-time setup)

**Setup:**

```bash
# Get token from: https://supabase.com/dashboard/account/tokens
export SUPABASE_ACCESS_TOKEN=your_token_here

# Then run:
bash scripts/autopilot-auto-apply.sh
```

---

## 📊 Comparison

| Method      | Automation                   | Requirements | Time   |
| ----------- | ---------------------------- | ------------ | ------ |
| **Level 1** | Detection only               | None         | 5 sec  |
| **Level 2** | Opens browser + instructions | Browser      | 2 min  |
| **Level 3** | Fully automatic              | Access token | 30 sec |

---

## 🎯 Recommended Workflow

### First Time Setup:

**Option A: Easiest (Level 2)**

```bash
# 1. Run assisted mode
node scripts/autopilot-apply-now.mjs

# 2. Follow instructions (copy-paste)

# 3. Verify
pnpm autopilot:migrate
```

**Option B: Fastest (Level 3)**

```bash
# 1. Get access token
# https://supabase.com/dashboard/account/tokens

# 2. Set token
export SUPABASE_ACCESS_TOKEN=your_token_here

# 3. Run autopilot
bash scripts/autopilot-auto-apply.sh

# Done! ✅
```

---

### Anytime After:

```bash
# Check status
pnpm autopilot:migrate

# Should show:
# ✅ DATABASE ALREADY CONFIGURED!
```

---

## 📦 What Gets Created

All 3 methods create the same result:

**16 Database Tables:**

- 6 Core LMS (programs, courses, lessons, enrollments, progress, certificates)
- 1 Auth (instructor credentials)
- 2 Analytics (events, page views)
- 2 Automation (workflows, executions)
- 1 Content (AI-generated)
- 2 Scholarships (applications, reviews)
- 2 Payments (Stripe accounts, splits)

**Security:**

- RLS enabled on all tables
- 40+ RLS policies configured
- Public read for catalog
- User-specific for enrollments

---

## 🔄 Integration with Build Process

Autopilot runs automatically:

```json
{
  "scripts": {
    "predev": "node tools/autopilot.mjs",
    "prebuild": "... && node tools/autopilot.mjs",
    "autopilot:migrate": "node scripts/autopilot-migrate.mjs"
  }
}
```

So when you run:

```bash
pnpm dev    # Checks database before starting
pnpm build  # Checks database before building
```

---

## 🛠️ All Autopilot Scripts

### 1. **autopilot-migrate.mjs** (Smart Detection)

- Checks database status
- Shows instructions if needed
- Verifies completion
- **Run:** `pnpm autopilot:migrate`

### 2. **autopilot-apply-now.mjs** (Assisted Mode)

- Opens SQL Editor in browser
- Shows exact instructions
- Guides through copy-paste
- **Run:** `node scripts/autopilot-apply-now.mjs`

### 3. **autopilot-auto-apply.sh** (Fully Autonomous)

- Links to Supabase automatically
- Applies migrations via CLI
- Verifies completion
- **Run:** `bash scripts/autopilot-auto-apply.sh`

### 4. **autopilot_migrate.sh** (Advanced)

- Direct psql execution
- Transaction-safe
- Requires database URL
- **Run:** `bash scripts/autopilot_migrate.sh "DB_URL"`

---

## 🎓 GitHub Actions Integration

Autopilot also runs in CI/CD:

**File:** `.github/workflows/supabase-autopilot.yml`

**Triggers:**

- Every push to main
- Every 30 minutes (health check)
- Manual workflow dispatch

**Features:**

- Auto-applies migrations
- Auto-fixes RLS issues
- Creates GitHub issues on failure
- Shows health report

**Setup:**
Add 3 secrets in GitHub:

```
SUPABASE_DB_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_PROJECT_REF
```

---

## 📚 Documentation

- **`README_AUTOPILOT.md`** - Quick start guide
- **`AUTOPILOT_AUTONOMOUS.md`** - Autonomous mode details
- **`AUTOPILOT_SETUP_GUIDE.md`** - Detailed setup (all methods)
- **`AUTOPILOT_COMPLETE.md`** - What was created
- **`ALL_YOUR_LMS_FEATURES.md`** - 110+ features list
- **`QUICK_START_ADD_COURSE.md`** - Add your first course

---

## 🚀 Quick Start (Choose Your Level)

### Level 1: Just Check Status

```bash
pnpm autopilot:migrate
```

### Level 2: Assisted Setup

```bash
node scripts/autopilot-apply-now.mjs
# Follow instructions
```

### Level 3: Fully Automatic

```bash
export SUPABASE_ACCESS_TOKEN=your_token
bash scripts/autopilot-auto-apply.sh
```

---

## ✅ Success Checklist

After running autopilot:

- [ ] Run `pnpm autopilot:migrate`
- [ ] See "✅ DATABASE ALREADY CONFIGURED!"
- [ ] All 16 tables exist
- [ ] RLS enabled on all tables
- [ ] Ready to add courses

---

## 🎉 Summary

**Your autopilot has 3 modes:**

1. **Smart Detection** - Always checks, shows instructions
2. **Assisted Mode** - Opens browser, guides you through
3. **Fully Autonomous** - One command, completely automatic

**All modes achieve the same result:**

- ✅ All migrations applied
- ✅ All tables created
- ✅ All security configured
- ✅ Ready to launch

**Choose the level that works for you!** 🚀

---

## 🆘 Troubleshooting

### Issue: "Missing Supabase credentials"

**Solution:** Check `.env` file has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Issue: "SUPABASE_ACCESS_TOKEN not set"

**Solution:** Get token from https://supabase.com/dashboard/account/tokens

### Issue: "Failed to link project"

**Solution:** Run `supabase login` first, then try again

### Issue: "Missing 15 tables"

**Solution:** Migrations not applied yet. Use Level 2 or Level 3 to apply them.

---

**Ready? Pick your level and let autopilot handle it!** 🤖
