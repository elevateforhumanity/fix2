# 🚀 Deploy Option 2: Everything (4 hours)

**Goal:** Deploy 100% of features for a fully polished, production-ready LMS  
**Time:** 4 hours  
**Result:** 100% feature complete platform

---

## ⏱️ Timeline

- **Phase 1:** Database Setup (30 min)
- **Phase 2:** Dependencies (5 min)
- **Phase 3:** Code Deployment (90 min)
- **Phase 4:** Testing (60 min)
- **Phase 5:** Production Deploy (15 min)

**Total:** 4 hours

---

## 📋 PHASE 1: DATABASE SETUP (30 minutes)

### Step 1.1: Run All Migrations

Open Supabase SQL Editor and run these **9 migrations in order:**

```sql
-- 1. Pack 1: Dashboard & Video Extras
-- File: supabase/migrations/20251123_dashboard_video_extras.sql
-- Copy entire file contents and run

-- 2. Pack 2: Social & Gamification Foundation
-- File: supabase/migrations/20251123_pack2_features.sql
-- Copy entire file contents and run

-- 3. Pack 3: Student Dashboard Extras
-- File: supabase/migrations/20251124_student_dashboard_extras.sql
-- Copy entire file contents and run

-- 4. Pack 4: Course Social Extras
-- File: supabase/migrations/20251124_course_social_extras.sql
-- Copy entire file contents and run

-- 5. Pack 6: Learning Activity & Streaks
-- File: supabase/migrations/20251124_learning_activity_streaks.sql
-- Copy entire file contents and run

-- 6. Pack 6: Achievements RLS
-- File: supabase/migrations/20251124_achievements_rls.sql
-- Copy entire file contents and run

-- 7. Pack 7: Course Outcomes & Skills
-- File: supabase/migrations/20251124_course_outcomes_skills.sql
-- Copy entire file contents and run

-- 8. Pack 8: Lesson Captions
-- File: supabase/migrations/20251124_lesson_captions.sql
-- Copy entire file contents and run

-- 9. Pack 8: Leaderboards Views
-- File: supabase/migrations/20251124_leaderboards_views.sql
-- Copy entire file contents and run
```

**Checklist:**
- [ ] Migration 1 run successfully
- [ ] Migration 2 run successfully
- [ ] Migration 3 run successfully
- [ ] Migration 4 run successfully
- [ ] Migration 5 run successfully
- [ ] Migration 6 run successfully
- [ ] Migration 7 run successfully
- [ ] Migration 8 run successfully
- [ ] Migration 9 run successfully

### Step 1.2: Verify Database

Run this query to verify all tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Expected: 42+ tables including:**
- [ ] achievements
- [ ] certificates
- [ ] course_announcements
- [ ] course_reviews
- [ ] courses
- [ ] daily_streaks
- [ ] discussion_posts
- [ ] discussion_threads
- [ ] enrollments
- [ ] learning_activity
- [ ] learning_goals
- [ ] lesson_answers
- [ ] lesson_bookmarks
- [ ] lesson_captions ← NEW
- [ ] lesson_notes
- [ ] lesson_progress
- [ ] lesson_questions
- [ ] lessons
- [ ] modules
- [ ] notifications
- [ ] profiles
- [ ] study_group_members
- [ ] study_groups
- [ ] video_bookmarks
- [ ] video_progress

### Step 1.3: Verify Views

```sql
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
```

**Expected: 2 views:**
- [ ] course_leaderboard ← NEW
- [ ] global_leaderboard ← NEW

---

## 📋 PHASE 2: DEPENDENCIES (5 minutes)

### Step 2.1: Install Recharts

```bash
cd /workspaces/fix2
npm install recharts
```

**Checklist:**
- [ ] Recharts installed
- [ ] package.json updated
- [ ] No dependency conflicts

### Step 2.2: Verify Installation

```bash
npm list recharts
```

**Expected output:** `recharts@2.x.x`

---

## 📋 PHASE 3: CODE DEPLOYMENT (90 minutes)

### Step 3.1: Verify All Files Exist (10 min)

**API Routes (24 total):**
- [ ] `app/api/video/progress/route.ts`
- [ ] `app/api/activity/watch-tick/route.ts`
- [ ] `app/api/student/streak/route.ts`
- [ ] `app/api/student/goals/route.ts`
- [ ] `app/api/student/achievements/route.ts`
- [ ] `app/api/dashboard/student/route.ts`
- [ ] `app/api/dashboard/student/goals/route.ts`
- [ ] `app/api/courses/[courseId]/reviews/route.ts`
- [ ] `app/api/courses/[courseId]/announcements/route.ts`
- [ ] `app/api/courses/[courseId]/leaderboard/route.ts` ← NEW
- [ ] `app/api/lessons/[lessonId]/bookmarks/route.ts`
- [ ] `app/api/lessons/[lessonId]/notes/route.ts`
- [ ] `app/api/lessons/[lessonId]/qa/route.ts`
- [ ] `app/api/leaderboard/global/route.ts` ← NEW

**Components (23 total):**
- [ ] `components/video/ProfessionalVideoPlayer.tsx` (updated with captions)
- [ ] `components/dashboard/StudentStreakWidget.tsx`
- [ ] `components/dashboard/StudentAchievementsWidget.tsx`
- [ ] `components/dashboard/GlobalLeaderboard.tsx` ← NEW
- [ ] `components/course/CourseMetaPanel.tsx`
- [ ] `components/course/CourseContentAccordion.tsx`
- [ ] `components/course/CourseReviewsSection.tsx`
- [ ] `components/course/CourseLeaderboard.tsx` ← NEW
- [ ] `components/lesson/LessonSidebar.tsx`
- [ ] `components/lesson/ClientVideoWithRef.tsx`
- [ ] `components/instructor/EngagementCharts.tsx` ← NEW

### Step 3.2: Update Lesson Page for Captions (20 min)

Find your lesson page (likely `app/lms/courses/[courseId]/lessons/[lessonId]/page.tsx`)

Add caption fetching:

```typescript
// Add to imports
import { ProfessionalVideoPlayer } from "@/components/video/ProfessionalVideoPlayer";

// In the page component, after fetching lesson:
const { data: captionRows } = await supabase
  .from("lesson_captions")
  .select("*")
  .eq("lesson_id", params.lessonId)
  .order("is_default", { ascending: false });

const captions =
  captionRows?.map((c) => ({
    src: c.src_url,
    label: c.label,
    srclang: c.language_code,
    default: c.is_default,
  })) || [];

// Update ProfessionalVideoPlayer usage:
<ProfessionalVideoPlayer
  src={lesson.video_url}
  poster={lesson.thumbnail_url}
  lessonId={lesson.id}
  captions={captions}  // ← ADD THIS
/>
```

**Checklist:**
- [ ] Captions fetched from database
- [ ] Captions passed to video player
- [ ] TypeScript compiles without errors

### Step 3.3: Add Leaderboard to Course Page (20 min)

Update `app/lms/courses/[slug]/page.tsx`:

```typescript
// Add to imports
import { CourseLeaderboard } from "@/components/course/CourseLeaderboard";

// In the page layout, add to sidebar:
<aside className="space-y-4">
  {/* Existing sidebar content */}
  
  {/* Add leaderboard */}
  <CourseLeaderboard courseId={course.id} />
</aside>
```

**Checklist:**
- [ ] CourseLeaderboard imported
- [ ] Component added to page
- [ ] courseId prop passed correctly
- [ ] TypeScript compiles without errors

### Step 3.4: Add Global Leaderboard to Student Dashboard (20 min)

Update `app/portal/student/dashboard/page.tsx`:

```typescript
// Add to imports
import { GlobalLeaderboard } from "@/components/dashboard/GlobalLeaderboard";

// In the page layout, add to sidebar or bottom:
<aside className="space-y-4">
  {/* Existing sidebar content */}
  
  {/* Add global leaderboard */}
  <GlobalLeaderboard />
</aside>
```

**Checklist:**
- [ ] GlobalLeaderboard imported
- [ ] Component added to page
- [ ] TypeScript compiles without errors

### Step 3.5: Create/Update Instructor Analytics Page (20 min)

Create or update `app/instructor/courses/[slug]/analytics/page.tsx`:

```typescript
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EngagementCharts } from "@/components/instructor/EngagementCharts";

export default async function CourseAnalyticsPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Find course
  const { data: course } = await supabase
    .from("courses")
    .select("id, title, instructor_id")
    .eq("slug", params.slug)
    .single();

  if (!course || course.instructor_id !== user.id) {
    redirect("/instructor/dashboard");
  }

  // Fetch data for charts
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, created_at, user_id")
    .eq("course_id", course.id);

  const { data: certificates } = await supabase
    .from("certificates")
    .select("id, created_at, user_id")
    .eq("course_id", course.id);

  const { data: progressRows } = await supabase
    .from("course_leaderboard")
    .select("user_id, progress_percent")
    .eq("course_id", course.id);

  const summary = {
    enrollments: enrollments?.length || 0,
    completions: certificates?.length || 0,
    avgProgress:
      progressRows && progressRows.length
        ? Math.round(
            progressRows.reduce((a, b) => a + b.progress_percent, 0) /
              progressRows.length
          )
        : 0,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics – {course.title}</h1>
        <p className="text-sm text-slate-600">
          Visualize enrollments, completions, and learner progress over time.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Enrollments" value={summary.enrollments} />
        <StatCard label="Certificates" value={summary.completions} />
        <StatCard label="Avg Progress" value={summary.avgProgress} unit="%" />
      </div>

      {/* Charts */}
      <EngagementCharts
        courseId={course.id}
        enrollments={enrollments || []}
        certificates={certificates || []}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">
        {value}
        {unit && <span className="ml-1 text-sm text-slate-500">{unit}</span>}
      </p>
    </div>
  );
}
```

**Checklist:**
- [ ] Analytics page created/updated
- [ ] EngagementCharts imported
- [ ] Data fetching works
- [ ] TypeScript compiles without errors

---

## 📋 PHASE 4: TESTING (60 minutes)

### Step 4.1: Build & Lint (10 min)

```bash
cd /workspaces/fix2
npm run lint
npm run build
```

**Checklist:**
- [ ] Zero lint errors
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No warnings

### Step 4.2: Test Video Player with Captions (10 min)

1. Navigate to any lesson page
2. Play video
3. Look for CC button next to PiP button
4. Click CC button
5. Verify captions appear (if caption data exists)
6. Click CC again
7. Verify captions disappear

**Checklist:**
- [ ] Video plays correctly
- [ ] CC button appears
- [ ] CC button toggles captions
- [ ] No console errors

### Step 4.3: Test Course Leaderboard (10 min)

1. Navigate to a course page
2. Scroll to sidebar
3. Look for "Leaderboard" section
4. Verify it shows learners or empty state

**Checklist:**
- [ ] Leaderboard section appears
- [ ] Shows data or empty state
- [ ] Progress bars display correctly
- [ ] No console errors

### Step 4.4: Test Global Leaderboard (10 min)

1. Navigate to student dashboard
2. Look for "Top Learners (All Programs)" section
3. Verify it shows learners or empty state
4. Check if current user is highlighted

**Checklist:**
- [ ] Global leaderboard appears
- [ ] Shows data or empty state
- [ ] Current user highlighted (if in top 10)
- [ ] Progress bars display correctly
- [ ] No console errors

### Step 4.5: Test Instructor Analytics Charts (10 min)

1. Navigate to instructor dashboard
2. Click on a course
3. Click "Analytics" link
4. Verify charts render

**Checklist:**
- [ ] Analytics page loads
- [ ] Line chart displays
- [ ] Bar chart displays
- [ ] Stat cards show correct numbers
- [ ] No console errors

### Step 4.6: Cross-Browser Testing (10 min)

Test in multiple browsers:

**Chrome:**
- [ ] All features work
- [ ] No console errors

**Firefox:**
- [ ] All features work
- [ ] No console errors

**Safari (if available):**
- [ ] All features work
- [ ] No console errors

**Mobile (DevTools):**
- [ ] Responsive design works
- [ ] All features accessible

---

## 📋 PHASE 5: PRODUCTION DEPLOY (15 minutes)

### Step 5.1: Final Build

```bash
cd /workspaces/fix2
npm run build
```

**Checklist:**
- [ ] Build succeeds
- [ ] No errors
- [ ] No warnings

### Step 5.2: Deploy to Production

**If using Vercel:**
```bash
vercel deploy --prod
```

**If using other hosting:**
- Follow your hosting provider's deployment process

**Checklist:**
- [ ] Code deployed
- [ ] Environment variables set
- [ ] Database connected
- [ ] Site accessible

### Step 5.3: Smoke Test Production

Test these URLs in production:

1. **Homepage:** `https://your-domain.com`
2. **Student Dashboard:** `https://your-domain.com/portal/student/dashboard`
3. **Course Page:** `https://your-domain.com/lms/courses/[any-course-slug]`
4. **Lesson Page:** `https://your-domain.com/lms/courses/[course]/lessons/[lesson]`
5. **Instructor Dashboard:** `https://your-domain.com/instructor/dashboard`

**Checklist:**
- [ ] All pages load
- [ ] No 500 errors
- [ ] No console errors
- [ ] Features work as expected

### Step 5.4: Monitor Logs

Check for errors in:
- [ ] Vercel/hosting logs
- [ ] Supabase logs
- [ ] Browser console

### Step 5.5: Notify Team

Send notification with:
- [ ] Deployment complete
- [ ] All features live
- [ ] Links to test
- [ ] Known issues (if any)

---

## ✅ COMPLETION CHECKLIST

### Database
- [ ] All 9 migrations run
- [ ] 42+ tables exist
- [ ] 2 views created
- [ ] RLS policies active

### Dependencies
- [ ] Recharts installed
- [ ] No conflicts

### Code
- [ ] All files exist
- [ ] Captions integrated
- [ ] Leaderboards integrated
- [ ] Charts integrated
- [ ] Build succeeds

### Testing
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Video captions work
- [ ] Course leaderboard works
- [ ] Global leaderboard works
- [ ] Analytics charts work
- [ ] Cross-browser tested

### Deployment
- [ ] Deployed to production
- [ ] Smoke tests pass
- [ ] Logs clean
- [ ] Team notified

---

## 🎉 SUCCESS!

**When all checkboxes are complete, you have:**

✅ **100% feature complete LMS**  
✅ **42+ database tables**  
✅ **24+ API endpoints**  
✅ **23+ React components**  
✅ **12+ complete pages**  
✅ **Production deployed**  
✅ **Ready to onboard users**  

**Platform Status:** 🚀 **LIVE & READY**

---

## 📞 Support

**Issues?** Check:
- `DEPLOYMENT_RECIPE.md` - Detailed instructions
- `DEVELOPER_TASK_SHEET.md` - Full checklist
- `FINAL_STATUS_REPORT.md` - Complete overview

**Questions?** Contact:
- Tech Lead
- PM
- Slack: #lms-development

---

**Time to change lives through education!** 💪🎓🚀

---

*Deploy Option 2 Checklist - 100% Feature Complete*  
*Estimated Time: 4 hours*  
*Result: Production-ready, world-class LMS*
