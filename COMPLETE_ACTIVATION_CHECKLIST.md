# ✅ Complete Course Activation Checklist

**Goal**: 100% Complete - Real courses from database, no mock data  
**Status**: In Progress  
**Updated**: November 19, 2025

---

## 📋 Phase 1: Deployment (DONE ✅)

- [x] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [x] Triggered Vercel redeploy
- [x] Code pushed to GitHub
- [x] Autopilot task created
- [x] Waiting for deployment to complete

**Status**: ✅ Deployment in progress

---

## 📋 Phase 2: Database Migrations (NEXT)

### Step 1: Run Migrations in Supabase

**Action Required**: Manual execution in Supabase SQL Editor

**Instructions**:
1. Open: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new
2. Copy SQL from: https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/COMPLETE_MIGRATION.sql
3. Paste into SQL Editor
4. Click "Run" button
5. Wait 30 seconds

**Expected Result**:
```
✅ 16 programs created
✅ 17 courses created
✅ 50+ modules created
```

**Verification**:
```sql
SELECT COUNT(*) FROM programs; -- Should return 16
SELECT COUNT(*) FROM courses;  -- Should return 17
SELECT COUNT(*) FROM modules;  -- Should return 50+
```

### Step 2: Verify Website

**Check**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

**Expected**:
- [ ] Blue banner is GONE
- [ ] Shows "17 courses in the system"
- [ ] All courses from database
- [ ] Can view course details
- [ ] Can enroll students

---

## 📋 Phase 3: Remove Mock Data (AFTER MIGRATIONS)

### Step 1: Remove Mock Data Files

**Run**:
```bash
# Remove mock courses file
rm lib/mock-courses.ts

# Or use the script
./scripts/remove-mock-data.sh
```

### Step 2: Update Admin Page

**File**: `app/admin/courses/page.tsx`

**Remove**:
- Import of `getMockCourses`
- `usingMockData` variable
- Mock data fallback logic
- Blue banner component

**Keep**:
- Direct Supabase queries
- Error handling
- Course display logic

### Step 3: Update Student Page

**File**: `app/student/courses/page.tsx`

**Remove**:
- Import of `getMockCourses`
- `usingMockData` variable
- Mock data fallback logic

**Keep**:
- Direct Supabase queries
- Enrollment logic
- Course display

### Step 4: Test Locally

```bash
npm run dev
# Visit http://localhost:3000/admin/courses
# Should show real courses, no blue banner
```

### Step 5: Commit and Deploy

```bash
git add -A
git commit -m "Remove mock data system - use real database only

- Remove lib/mock-courses.ts
- Update admin page to use database only
- Update student page to use database only
- Remove blue banner code
- Full production ready

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
```

---

## 📋 Phase 4: Final Verification

### Check Deployment

**Vercel**: https://vercel.com/elevate-48e460c9/fix2-gpql/deployments

**Wait for**:
- [ ] Build completes
- [ ] Deployment succeeds
- [ ] Status shows "Ready"

### Test Live Site

**Admin Courses**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

**Verify**:
- [ ] NO blue banner
- [ ] 17 courses visible
- [ ] All from database
- [ ] Can click to view details
- [ ] No mock data references
- [ ] No console errors

**Student Courses**: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/student/courses

**Verify**:
- [ ] Courses display
- [ ] Can browse courses
- [ ] Enrollment works
- [ ] No mock data

### Test Enrollment Flow

1. [ ] Create test student account
2. [ ] Browse available courses
3. [ ] Enroll in a course
4. [ ] Verify enrollment appears in dashboard
5. [ ] Check progress tracking works
6. [ ] Test module access

---

## 📋 Phase 5: Production Deployment

### Update Production

**Production URL**: https://www.elevateforhumanity.org

**Verify**:
- [ ] Same as preview deployment
- [ ] 17 courses visible
- [ ] No blue banner
- [ ] Full functionality
- [ ] Hard refresh if needed (Ctrl+Shift+R)

---

## ✅ Completion Criteria

### Database:
- [x] Supabase URL configured in Vercel
- [ ] Migrations run successfully
- [ ] 16 programs in database
- [ ] 17 courses in database
- [ ] 50+ modules in database

### Code:
- [x] Mock data system created (temporary)
- [ ] Mock data system removed
- [ ] Admin page uses database only
- [ ] Student page uses database only
- [ ] No fallback to mock data

### Deployment:
- [x] Initial deployment with mock data
- [ ] Migrations completed
- [ ] Final deployment without mock data
- [ ] Production verified
- [ ] All tests passing

### Functionality:
- [ ] Courses display from database
- [ ] No blue banner visible
- [ ] Enrollment works
- [ ] Progress tracking works
- [ ] Certificates generate
- [ ] Admin can manage courses
- [ ] Students can access content

---

## 🎯 Current Status

### Completed:
✅ Phase 1: Deployment (with mock data fallback)
✅ Vercel environment variables configured
✅ Code pushed to GitHub
✅ Autopilot task created

### In Progress:
⏳ Waiting for Vercel deployment to complete

### Next Steps:
1. ⏳ Wait for deployment (2-3 minutes)
2. 🔄 Run database migrations in Supabase
3. ✅ Verify courses in database
4. 🔧 Remove mock data system
5. 🚀 Final deployment
6. ✅ 100% Complete!

---

## 📞 Quick Links

**Vercel Dashboard**:
https://vercel.com/elevate-48e460c9/fix2-gpql

**Supabase SQL Editor**:
https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new

**Migration File**:
https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/COMPLETE_MIGRATION.sql

**Test Site**:
https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app/admin/courses

**Production**:
https://www.elevateforhumanity.org/admin/courses

---

## 🚀 Automation Scripts

**Activate Courses**:
```bash
./scripts/activate-courses.sh
```

**Remove Mock Data** (after migrations):
```bash
./scripts/remove-mock-data.sh
```

---

## ⏱️ Estimated Timeline

```
Now:        Deployment in progress (2-3 min)
+3 min:     Run migrations (5 min)
+8 min:     Remove mock data (2 min)
+10 min:    Final deployment (3 min)
+13 min:    Verification (2 min)
+15 min:    ✅ 100% COMPLETE!
```

---

**Status**: 🔄 **IN PROGRESS**  
**Next Action**: Wait for deployment, then run migrations  
**ETA to 100%**: ~15 minutes

---

*Last Updated: November 19, 2025 19:45 UTC*  
*Document: COMPLETE_ACTIVATION_CHECKLIST.md*
