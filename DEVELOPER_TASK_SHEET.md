# 📋 LMS Feature Completion - Developer Task Sheet

**Project:** Elevate For Humanity LMS  
**Goal:** Complete all remaining features from gap analysis  
**Estimated Time:** 3-4 hours  
**Owner:** _____________  
**Due Date:** _____________

---

## ✅ PHASE 1: DATABASE SETUP (30 minutes)

### Task 1.1: Create Social & Gamification Tables Migration

**File:** `supabase/migrations/20251123_lms_social_gamification.sql`

- [ ] Create new migration file
- [ ] Copy SQL from instructions (study_groups, discussion_threads, lesson_questions, learning_goals, daily_streaks, achievements)
- [ ] Verify SQL syntax is correct
- [ ] Save file

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 1.2: Run All Migrations

- [ ] Open Supabase SQL Editor
- [ ] Run migration: `20251123_dashboard_video_extras.sql`
- [ ] Run migration: `20251123_pack2_features.sql`
- [ ] Run migration: `20251124_student_dashboard_extras.sql`
- [ ] Run migration: `20251124_course_social_extras.sql`
- [ ] Run migration: `20251124_learning_activity_streaks.sql`
- [ ] Run migration: `20251124_achievements_rls.sql`
- [ ] Run migration: `20251124_course_outcomes_skills.sql`
- [ ] Run NEW migration: `20251123_lms_social_gamification.sql`
- [ ] Verify no errors in Supabase logs

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 1.3: Verify Database Tables

Run this query in Supabase SQL Editor:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;
```

- [ ] Verify 40+ tables exist
- [ ] Check: `study_groups` exists
- [ ] Check: `discussion_threads` exists
- [ ] Check: `lesson_questions` exists
- [ ] Check: `learning_goals` exists
- [ ] Check: `daily_streaks` exists
- [ ] Check: `achievements` exists
- [ ] Check: RLS is enabled on all tables

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 🔌 PHASE 2: API ENDPOINTS (45 minutes)

### Task 2.1: Course Discussion API

**File:** `app/api/courses/[courseId]/discussion/route.ts`

- [ ] Create folder structure if needed
- [ ] Create route.ts file
- [ ] Copy GET handler code
- [ ] Copy POST handler code
- [ ] Verify imports are correct
- [ ] Test endpoint: `GET /api/courses/TEST_ID/discussion`
- [ ] Test endpoint: `POST /api/courses/TEST_ID/discussion`

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 2.2: Lesson Q&A API

**File:** `app/api/lessons/[lessonId]/questions/route.ts`

- [ ] Create folder structure if needed
- [ ] Create route.ts file
- [ ] Copy GET handler code
- [ ] Copy POST handler code
- [ ] Verify imports are correct
- [ ] Test endpoint: `GET /api/lessons/TEST_ID/questions`
- [ ] Test endpoint: `POST /api/lessons/TEST_ID/questions`

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 2.3: Gamification API

**File:** `app/api/dashboard/student/gamification/route.ts`

- [ ] Create folder structure if needed
- [ ] Create route.ts file
- [ ] Copy GET handler code
- [ ] Copy POST handler code
- [ ] Verify imports are correct
- [ ] Test endpoint: `GET /api/dashboard/student/gamification`
- [ ] Test endpoint: `POST /api/dashboard/student/gamification`

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 2.4: Verify All Existing APIs

- [ ] Check: `/api/video/progress` works
- [ ] Check: `/api/activity/watch-tick` works
- [ ] Check: `/api/student/streak` works
- [ ] Check: `/api/student/goals` works
- [ ] Check: `/api/student/achievements` works
- [ ] Check: `/api/courses/[courseId]/reviews` works
- [ ] Check: `/api/lessons/[lessonId]/bookmarks` works
- [ ] Check: `/api/lessons/[lessonId]/notes` works
- [ ] Check: `/api/lessons/[lessonId]/qa` works

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 🎨 PHASE 3: STUDENT DASHBOARD (30 minutes)

### Task 3.1: Update LMS Dashboard

**File:** `app/lms/dashboard/page.tsx`

- [ ] Backup existing file
- [ ] Replace with new comprehensive version
- [ ] Fix import paths if needed
- [ ] Verify `createClient` import works
- [ ] Verify `getCurrentUser` import works
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run dev` - verify compiles

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 3.2: Test Student Dashboard

**URL:** `http://localhost:3000/lms/dashboard`

- [ ] Page loads without errors
- [ ] Shows "Welcome back" header
- [ ] Shows 4 stat cards (enrollments, progress, certificates, notifications)
- [ ] Shows daily goal card
- [ ] Shows recommendations card
- [ ] Shows "Continue learning" section
- [ ] Shows notifications sidebar
- [ ] Shows activity feed shell
- [ ] Responsive on mobile (test in DevTools)

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 📚 PHASE 4: COURSE PAGE (30 minutes)

### Task 4.1: Update Course Page

**File:** `app/lms/courses/[slug]/page.tsx`

- [ ] Backup existing file
- [ ] Replace with new comprehensive version
- [ ] Fix `profiles` table name if different
- [ ] Fix `metadata.skills` path if different
- [ ] Fix `metadata.what_you_learn` path if different
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run dev` - verify compiles

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 4.2: Test Course Page

**URL:** `http://localhost:3000/lms/courses/TEST_SLUG`

- [ ] Page loads without errors
- [ ] Shows course title and summary
- [ ] Shows difficulty/category badges
- [ ] Shows rating (or "New")
- [ ] Shows learner count
- [ ] Shows instructor info (if available)
- [ ] Shows "What you'll learn" section
- [ ] Shows skills chips
- [ ] Shows curriculum accordion
- [ ] Modules expand/collapse
- [ ] Shows reviews summary
- [ ] Shows discussion card
- [ ] Shows enroll/continue CTA
- [ ] Responsive on mobile

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 🎥 PHASE 5: LESSON PAGE (30 minutes)

### Task 5.1: Update Lesson Page

**File:** `app/lms/courses/[courseId]/lessons/[lessonId]/page.tsx`  
(Or wherever your lesson page lives)

- [ ] Backup existing file
- [ ] Replace with new comprehensive version
- [ ] Verify `ProfessionalVideoPlayer` import path
- [ ] Verify `lesson.video_url` column exists
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run dev` - verify compiles

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 5.2: Test Lesson Page

**URL:** `http://localhost:3000/lms/courses/COURSE_ID/lessons/LESSON_ID`

- [ ] Page loads without errors
- [ ] Shows lesson title
- [ ] Shows lesson description
- [ ] Video player renders
- [ ] Video plays when clicked
- [ ] Shows bookmarks card
- [ ] Shows notes card
- [ ] Shows Q&A card
- [ ] Shows transcript card
- [ ] Responsive on mobile

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 👨‍🏫 PHASE 6: INSTRUCTOR TOOLS (30 minutes)

### Task 6.1: Update Instructor Dashboard

**File:** `app/instructor/dashboard/page.tsx`

- [ ] Backup existing file (if exists)
- [ ] Replace with expanded version
- [ ] Add RBAC guard (requireInstructor)
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run dev` - verify compiles

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 6.2: Create Instructor Sub-Pages

**Files to create (can be simple shells):**

- [ ] `app/instructor/courses/[slug]/students/page.tsx`
- [ ] `app/instructor/courses/[slug]/analytics/page.tsx`
- [ ] `app/instructor/courses/[slug]/announcements/page.tsx`

**Each page should:**
- [ ] Show course title
- [ ] Show placeholder content
- [ ] Have RBAC guard
- [ ] Compile without errors

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 6.3: Test Instructor Dashboard

**URL:** `http://localhost:3000/instructor/dashboard`

- [ ] Page loads without errors
- [ ] Shows list of instructor's courses
- [ ] Shows student counts per course
- [ ] Shows links to analytics
- [ ] Shows links to announcements
- [ ] Links navigate correctly

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 📊 PHASE 7: COMPLIANCE DASHBOARD (15 minutes)

### Task 7.1: Create WIOA Compliance Page

**File:** `app/admin/compliance/wioa/page.tsx`

- [ ] Create folder structure
- [ ] Create page.tsx file
- [ ] Copy WIOA page code
- [ ] Add RBAC guard (requireAdmin)
- [ ] Run `npm run lint` - fix any errors
- [ ] Run `npm run dev` - verify compiles

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 7.2: Test WIOA Page

**URL:** `http://localhost:3000/admin/compliance/wioa`

- [ ] Page loads without errors
- [ ] Shows table header
- [ ] Shows programs list
- [ ] Shows enrollment counts
- [ ] Shows certificate counts
- [ ] Table is readable
- [ ] Responsive on mobile

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 🧪 PHASE 8: FINAL TESTING (30 minutes)

### Task 8.1: Build & Lint

- [ ] Run `npm run lint` - zero errors
- [ ] Run `npm run build` - successful build
- [ ] Run `npm run start` - production build works
- [ ] Check build output for warnings

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 8.2: Feature Verification

**Video & Learning:**
- [ ] Video player works (play, pause, seek)
- [ ] Speed controls work (0.5x - 2x)
- [ ] Skip buttons work (±10s)
- [ ] PiP button works
- [ ] Progress saves automatically
- [ ] Auto-resume works

**Gamification:**
- [ ] Watch 20+ minutes → streak increments
- [ ] Watch 30+ minutes → achievement awarded
- [ ] Dashboard shows streak widget
- [ ] Dashboard shows achievements widget
- [ ] Goal is editable

**Course Pages:**
- [ ] Learning outcomes display
- [ ] Skills chips display
- [ ] Instructor bio shows
- [ ] Curriculum accordion works
- [ ] Reviews display
- [ ] Can submit review

**Social Features:**
- [ ] Discussion API works
- [ ] Q&A API works
- [ ] Can create thread
- [ ] Can ask question

**Dashboards:**
- [ ] Student dashboard shows real data
- [ ] Instructor dashboard shows courses
- [ ] WIOA dashboard shows table

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 8.3: Cross-Browser Testing

- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Mobile Chrome: Responsive
- [ ] Mobile Safari: Responsive

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 8.4: Performance Check

- [ ] Lighthouse score > 80
- [ ] No console errors
- [ ] No console warnings
- [ ] Page load < 3 seconds
- [ ] API responses < 500ms

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 📝 PHASE 9: DOCUMENTATION (15 minutes)

### Task 9.1: Update README

- [ ] Document new features
- [ ] Update setup instructions
- [ ] Add API endpoint list
- [ ] Add testing instructions

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 9.2: Create Deployment Notes

- [ ] List all migrations run
- [ ] List all new files created
- [ ] List all files modified
- [ ] Note any breaking changes
- [ ] Document environment variables needed

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 🚀 PHASE 10: DEPLOYMENT (30 minutes)

### Task 10.1: Pre-Deployment Checklist

- [ ] All tests passing
- [ ] All migrations ready
- [ ] Environment variables set
- [ ] Database backup created
- [ ] Rollback plan documented

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 10.2: Deploy to Staging

- [ ] Run migrations on staging DB
- [ ] Deploy code to staging
- [ ] Smoke test all features
- [ ] Check error logs
- [ ] Verify performance

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

### Task 10.3: Deploy to Production

- [ ] Run migrations on production DB
- [ ] Deploy code to production
- [ ] Smoke test all features
- [ ] Monitor error logs
- [ ] Verify performance
- [ ] Notify team of deployment

**Owner:** _____________ **Status:** ⬜ Not Started / 🟡 In Progress / ✅ Complete

---

## 📊 COMPLETION SUMMARY

### Overall Progress

**Total Tasks:** 50  
**Completed:** _____ / 50  
**In Progress:** _____ / 50  
**Not Started:** _____ / 50  
**Completion:** _____% 

### Time Tracking

**Estimated Time:** 3-4 hours  
**Actual Time:** _____ hours  
**Started:** _____________  
**Completed:** _____________

### Blockers & Issues

| Issue | Description | Owner | Status | Resolution |
|-------|-------------|-------|--------|------------|
| 1. | | | | |
| 2. | | | | |
| 3. | | | | |

### Sign-Off

**Developer:** _____________ **Date:** _____________  
**Reviewer:** _____________ **Date:** _____________  
**PM:** _____________ **Date:** _____________

---

## 🎉 SUCCESS CRITERIA

All tasks complete when:

✅ All 50 checkboxes are checked  
✅ All migrations run successfully  
✅ All API endpoints working  
✅ All pages load without errors  
✅ All features tested and verified  
✅ Build succeeds with zero errors  
✅ Deployed to production  
✅ Team notified  

**Platform Status:** 🚀 **PRODUCTION READY**

---

## 📞 SUPPORT

**Questions?** Check these docs:
- [`DEPLOYMENT_RECIPE.md`](./DEPLOYMENT_RECIPE.md) - Detailed instructions
- [`FEATURE_COMPLETION_CHECKLIST.md`](./FEATURE_COMPLETION_CHECKLIST.md) - Feature status
- [`START_HERE_MASTER_INDEX.md`](./START_HERE_MASTER_INDEX.md) - All documentation

**Stuck?** Contact:
- Tech Lead: _____________
- PM: _____________
- Slack: #lms-development

---

**Print this sheet and check off tasks as you complete them!** ✅
