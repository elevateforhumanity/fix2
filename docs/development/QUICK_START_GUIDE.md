# 🚀 QUICK START GUIDE - Get Your Dashboards Live

**Status:** Supabase connected in Vercel ✅ | Need to verify tables and wire dashboards

---

## Step 1: Get Your Supabase Credentials (2 minutes)

You have two options:

### Option A: Pull from Vercel (Easiest)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Pull environment variables
vercel env pull .env.local
```

### Option B: Manual Copy from Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Copy these three values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. Create `.env.local` file in your repo root:
```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
```

---

## Step 2: Verify Database Connection (1 minute)

```bash
# Run the database check script
node check-database.mjs
```

**Expected Output:**
- ✅ Connection successful
- List of existing tables
- List of missing tables (if any)

---

## Step 3: Run Migrations (if needed) (5 minutes)

If the check script shows missing tables:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open file: `supabase/migrations/RUN_ALL_MIGRATIONS.sql`
3. Copy the entire file
4. Paste into Supabase SQL Editor
5. Click **"Run"**
6. Wait for completion (should take 10-30 seconds)
7. Run `node check-database.mjs` again to verify

---

## Step 4: Test Your Live Site (2 minutes)

Your site is already deployed at: **https://www.elevateforhumanity.org**

### Test These URLs:

1. **Homepage**
   ```
   https://www.elevateforhumanity.org
   ```

2. **Student Dashboard** (requires login)
   ```
   https://www.elevateforhumanity.org/student/dashboard
   ```

3. **Admin Dashboard** (requires admin login)
   ```
   https://www.elevateforhumanity.org/admin/dashboard
   ```

4. **Program Holder Dashboard** (requires program holder login)
   ```
   https://www.elevateforhumanity.org/program-holder/dashboard
   ```

5. **Delegate Dashboard** (requires delegate login)
   ```
   https://www.elevateforhumanity.org/delegate/dashboard
   ```

---

## Step 5: Wire Up the 6 Dashboards (30 minutes)

Once tables are verified, you have **ready-to-paste code** for all 6 dashboards:

### ✅ Dashboard 1: Student Dashboard
**File:** `app/student/dashboard/page.tsx`  
**Status:** Code provided ✅  
**Features:**
- My Courses with progress bars
- Due Soon widget
- Stats (completion %, hours, streaks)
- Achievements

### ✅ Dashboard 2: Program Holder Dashboard
**File:** `app/program-holder/dashboard/page.tsx`  
**Status:** Code provided ✅  
**Features:**
- Total learners, programs, revenue
- Programs & courses table
- At-risk learners list

### ✅ Dashboard 3: Delegate/Case Manager Dashboard
**File:** `app/delegate/dashboard/page.tsx`  
**Status:** Code provided ✅  
**Features:**
- Caseload overview (on track/at risk/inactive)
- Full caseload table
- Risk flags

### ✅ Dashboard 4: Admin Compliance Dashboard
**File:** `app/admin/compliance-dashboard/page.tsx`  
**Status:** Code provided ✅  
**Features:**
- Overall compliance stats
- Compliance by program (WRG/WIOA/JRI)
- Highest-risk learners
- Audit exports

### ⏳ Dashboard 5: Admin Operations Dashboard
**File:** `app/admin/operations/page.tsx`  
**Status:** Code provided ✅  
**Features:**
- System stats (users, programs, courses)
- Quick links (manage users, programs, MOUs)
- Recent activity feed

### ⏳ Dashboard 6: Executive Analytics Dashboard
**File:** `app/admin/analytics/page.tsx`  
**Status:** Ready to build  
**Features:**
- KPIs for funders/board
- Completions by program
- Employment outcomes
- Hours trained
- Trend charts

---

## Step 6: Deploy Changes (5 minutes)

Once you've added the dashboard code:

```bash
# Stage changes
git add .

# Commit
git commit -m "Add all 6 enterprise dashboards"

# Push to main (triggers Vercel deployment)
git push origin main
```

Vercel will automatically deploy in 2-3 minutes.

---

## 🎯 What You'll Have After This

### For Students:
- Clean dashboard with courses, progress, achievements
- Due dates and upcoming assignments
- Streak tracking

### For Program Holders:
- Overview of their learners
- Course performance metrics
- At-risk learner alerts
- Revenue tracking

### For Delegates/Case Managers:
- Full caseload view
- Risk flags (on track/at risk/inactive)
- Last activity tracking
- Quick intervention tools

### For Admins:
- Compliance dashboard (WIOA/WRG/JRI)
- Operations dashboard (system management)
- Analytics dashboard (funding metrics)

---

## 🚨 Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution:**
```bash
pnpm install
```

### Issue: "Missing SUPABASE_URL env vars"
**Solution:** Complete Step 1 above (get credentials)

### Issue: "Table 'profiles' does not exist"
**Solution:** Complete Step 3 above (run migrations)

### Issue: "Invalid API key"
**Solution:** 
1. Go to Supabase Dashboard → Settings → API
2. Regenerate keys
3. Update in Vercel → Settings → Environment Variables
4. Redeploy

### Issue: "Connection refused"
**Solution:** Check if Supabase project is paused (free tier pauses after 7 days inactivity)
- Go to Supabase Dashboard
- Click "Resume Project" if paused

---

## 📊 Current Status Checklist

- [ ] Step 1: Get Supabase credentials
- [ ] Step 2: Verify database connection
- [ ] Step 3: Run migrations (if needed)
- [ ] Step 4: Test live site
- [ ] Step 5: Wire up dashboards
- [ ] Step 6: Deploy changes

---

## 🎉 Success Criteria

After completing all steps, you should be able to:

1. ✅ Login as different user types
2. ✅ See real data in dashboards
3. ✅ Navigate between dashboards
4. ✅ View compliance reports
5. ✅ Track learner progress
6. ✅ Monitor at-risk learners

---

## 📞 Next Steps

Once you complete Step 1-4, let me know:
1. Which tables exist (output from `check-database.mjs`)
2. Any errors you encounter
3. Whether you want me to build Dashboard #6 (Executive Analytics)

Then I can provide the exact code adjustments needed for your specific table structure.
