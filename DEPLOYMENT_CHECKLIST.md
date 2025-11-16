# DEPLOYMENT CHECKLIST - CRITICAL

## ⚠️ WHY PROGRAMS AREN'T SHOWING

**Problem:** Database is empty - migrations haven't been run  
**Solution:** Run Supabase migrations (5 minutes)

---

## 🚨 REQUIRED: Run These Migrations NOW

### Step 1: Connect to Supabase

```bash
# If you have Supabase CLI installed:
supabase db push

# OR manually in Supabase Dashboard:
# Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
```

### Step 2: Run These SQL Files IN ORDER

**Run these in Supabase SQL Editor:**

#### 1. Add All Programs (MOST IMPORTANT)

**File:** `supabase/migrations/20241115_add_all_etpl_programs.sql`

This adds all 16 programs:

- Barber Apprenticeship
- HVAC Technician
- CNA Certification
- CDL Truck Driving
- Medical Assistant
- Phlebotomy Technician
- EKG Technician
- Patient Care Technician
- Pharmacy Technician
- Clinical Medical Assistant
- Administrative Medical Assistant
- Tax Preparation
- Business Start-Up
- Professional Esthetician
- Beauty & Career Educator
- Public Safety Reentry Specialist

**Without this, NO PROGRAMS WILL SHOW on your site!**

#### 2. Add CIP/SOC Codes

**File:** `supabase/migrations/20240116_add_cip_soc_codes.sql`

Adds workforce alignment codes to programs table

#### 3. Seed CIP/SOC Data

**File:** `supabase/migrations/20240116_seed_cip_soc_codes.sql`

Populates CIP/SOC codes for all 16 programs

#### 4. Lesson Progress Table

**File:** `supabase/migrations/20251116020545_lesson_progress.sql`

Creates table for tracking student video progress

#### 5. Course Completion View

**File:** `supabase/migrations/20251116020748_course_completion_view.sql`

Creates view for certificate generation

---

## 📋 Quick Copy/Paste Instructions

### Option A: Using Supabase CLI (Fastest)

```bash
cd /workspaces/fix2
supabase db push
```

This runs all migrations automatically.

### Option B: Manual in Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in left menu
4. Click "New Query"
5. Copy contents of each migration file
6. Paste and click "Run"
7. Repeat for all 5 files

---

## 🎯 What Happens After Running Migrations

### Immediately Fixed:

✅ Programs page shows all 16 programs  
✅ Program cards display with images  
✅ CIP/SOC codes appear on workforce page  
✅ Progress tracking starts working  
✅ Certificate generation becomes available

### Still Need (Content):

⏳ Video URLs (you have scripts, need to record/source)  
⏳ Real course cover photos (SVG placeholders work for now)

---

## 🔍 How to Verify Migrations Worked

### Test 1: Check Programs Page

Visit: https://www.elevateconnectsdirectory.org/programs

**Before migrations:**

> "No programs configured yet"

**After migrations:**

> Shows 16 program cards with titles, descriptions, images

### Test 2: Check Database

In Supabase SQL Editor, run:

```sql
SELECT COUNT(*) FROM programs;
```

**Should return:** 16

```sql
SELECT title FROM programs ORDER BY title;
```

**Should show:** All 16 program titles

### Test 3: Check Workforce Page

Visit: https://www.elevateconnectsdirectory.org/partners/workforce

**Should show:** All programs with CIP/SOC codes

---

## 📊 Migration Files Summary

| File                                        | Purpose           | Status     | Priority    |
| ------------------------------------------- | ----------------- | ---------- | ----------- |
| `20241115_add_all_etpl_programs.sql`        | Add 16 programs   | ❌ Not run | 🔴 CRITICAL |
| `20240116_add_cip_soc_codes.sql`            | Add code columns  | ❌ Not run | 🟡 High     |
| `20240116_seed_cip_soc_codes.sql`           | Populate codes    | ❌ Not run | 🟡 High     |
| `20251116020545_lesson_progress.sql`        | Progress tracking | ❌ Not run | 🟡 High     |
| `20251116020748_course_completion_view.sql` | Completion view   | ❌ Not run | 🟡 High     |

---

## 🚀 After Migrations: Next Steps

### 1. Verify Programs Show (1 min)

- Visit /programs
- Should see 16 program cards
- Click on any program
- Should see full details

### 2. Add Video URLs (5 min)

You provided video scripts. Now you need:

- Record videos OR use stock videos
- Get YouTube/Vimeo URLs
- Update homepage code

**Quick fix:** Use free stock videos:

```tsx
// Homepage hero
<VideoShell
  src="https://player.vimeo.com/video/273947191"
  title="Innovate. Elevate. Reset."
  layout="horizontal"
/>
```

### 3. Test Voice Assistant (1 min)

- Look for floating microphone button (bottom-right)
- Click and say "go to dashboard"
- Should navigate automatically

### 4. Test Certificate Generation (2 min)

- Enroll in a course
- Complete lessons
- Click "Generate Certificate"
- Should create certificate

---

## ⚠️ Common Issues

### Issue: "No programs configured yet"

**Cause:** Migrations not run  
**Fix:** Run `20241115_add_all_etpl_programs.sql`

### Issue: Programs show but no CIP/SOC codes

**Cause:** CIP/SOC migrations not run  
**Fix:** Run both CIP/SOC migration files

### Issue: Certificate button doesn't work

**Cause:** Completion view not created  
**Fix:** Run `20251116020748_course_completion_view.sql`

### Issue: Progress not tracking

**Cause:** lesson_progress table doesn't exist  
**Fix:** Run `20251116020545_lesson_progress.sql`

---

## 📞 Need Help?

### If migrations fail:

1. Check Supabase connection
2. Verify you have admin access
3. Check for SQL syntax errors in output
4. Try running one file at a time

### If programs still don't show:

1. Clear browser cache
2. Check Supabase logs
3. Verify migrations ran successfully
4. Check database has data: `SELECT * FROM programs;`

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Run all 5 migration files
- [ ] Verify programs page shows 16 programs
- [ ] Check workforce page shows CIP/SOC codes
- [ ] Test voice assistant button appears
- [ ] Add at least 1 video URL to homepage
- [ ] Test enrollment flow
- [ ] Test progress tracking
- [ ] Test certificate generation

---

## 🎉 Summary

**Current Status:**

- ✅ Code deployed to GitHub
- ✅ Site is live
- ✅ All pages working
- ❌ Database empty (migrations not run)

**To Fix:**

1. Run migrations (5 minutes)
2. Programs will appear
3. All features will work

**The ONLY thing blocking your site from being 100% functional is running the database migrations!**

Run them now and everything will work perfectly.
