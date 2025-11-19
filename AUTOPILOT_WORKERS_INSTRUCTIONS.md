# 🤖 Autopilot Workers - Course Migration Task

**Status**: ✅ READY FOR EXECUTION  
**Priority**: HIGH  
**Estimated Time**: 5 minutes  
**Difficulty**: Easy

---

## 📋 Task Overview

**What**: Run database migrations to activate 17 courses + 16 programs  
**Why**: Complete the course system activation to 100%  
**When**: NOW (as soon as worker available)  
**Where**: Supabase SQL Editor

---

## 🎯 Quick Start (3 Steps)

### Step 1: Open Supabase SQL Editor
```
https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new
```

### Step 2: Get Migration SQL
```
https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/COMPLETE_MIGRATION.sql
```
- Open this link
- Press Ctrl+A (select all)
- Press Ctrl+C (copy)

### Step 3: Run Migration
- Go back to Supabase SQL Editor
- Press Ctrl+V (paste)
- Click "Run" button
- Wait 30 seconds

---

## ✅ Verification

### Check Database:
```sql
SELECT COUNT(*) FROM programs; -- Should return 16
SELECT COUNT(*) FROM courses;  -- Should return 17
SELECT COUNT(*) FROM modules;  -- Should return 50+
```

### Check Website:
```
https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses
```

**Expected**:
- ✅ NO blue banner
- ✅ 17 courses visible
- ✅ All from database

---

## 📁 Task Files

**Main Task**: `.autopilot/active-tasks/run-course-migrations-NOW.json`  
**Trigger**: `.autopilot/TRIGGER_COURSE_MIGRATIONS`  
**Alert**: `.autopilot/URGENT_TASK_READY.txt`  
**Guide**: `RUN_MIGRATIONS_NOW.md`

---

## 🔧 What This Does

**Creates in Database**:
- 16 Programs (Business, HVAC, Medical, Barber, etc.)
- 17 Courses (all programs + Rise Up Certificate)
- 50+ Modules (course content structure)

**Result on Website**:
- Blue "Mock Data" banner disappears
- Real courses from database display
- Full enrollment functionality active
- Progress tracking works
- Certificates can be generated

---

## 📊 Success Criteria

- [x] Deployment complete (Vercel)
- [ ] Migrations run (Supabase) ← **YOUR TASK**
- [ ] 16 programs in database
- [ ] 17 courses in database
- [ ] Blue banner removed
- [ ] Website shows real courses

---

## ⏱️ Timeline

```
Now:     Task ready for execution
+5 min:  Migrations complete
+6 min:  Website updated
+7 min:  Verification done
+8 min:  Report completion
```

---

## 🚨 If You Encounter Issues

### Error: "relation does not exist"
**Solution**: Tables need to be created first. See troubleshooting in task file.

### Error: "duplicate key"
**Solution**: Migration already run. This is OK! Skip to verification.

### Blue banner still shows
**Solution**: Wait 2-3 minutes, hard refresh browser (Ctrl+Shift+R)

---

## 📞 Report Completion

**When done, report**:
- ✅ Execution time
- ✅ Programs count (should be 16)
- ✅ Courses count (should be 17)
- ✅ Website verification (banner gone?)
- ✅ Any issues encountered
- ✅ Screenshots (optional but helpful)

---

## 🎉 After This Task

**Next Phase**: Remove mock data system
- Another worker will handle this
- Requires code changes
- Will be triggered after your completion

**Your task is just**: Run the migrations!

---

## 📋 Worker Checklist

- [ ] Read this file
- [ ] Open Supabase SQL Editor
- [ ] Copy migration SQL from GitHub
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Wait for completion
- [ ] Run verification queries
- [ ] Check website
- [ ] Take screenshot
- [ ] Report completion

---

**Ready to execute?** Start with Step 1 above! 🚀

---

*Task Created: November 19, 2025 19:45 UTC*  
*Status: ACTIVE*  
*Priority: HIGH*
