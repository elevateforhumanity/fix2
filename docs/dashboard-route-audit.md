# Dashboard Route Audit

**Date:** 2025-12-24  
**Purpose:** Verify all navigation links point to existing routes

---

## Summary

**Total hrefs in nav config:** 67  
**Valid routes:** 48  
**Dead links:** 18  
**Invalid syntax:** 1

---

## Dead Links Found

### Board Member Navigation (3 dead links)
- ❌ `/board/compliance` - no page.tsx
- ❌ `/board/metrics` - no page.tsx  
- ❌ `/board/reports` - no page.tsx

**Action:** Remove from nav config (board only has dashboard)

### Employer Navigation (2 dead links)
- ❌ `/employer/apprenticeships` - no page.tsx
- ❌ `/employer/company` - no page.tsx

**Action:** Remove from nav config

### Instructor Navigation (4 dead links)
- ❌ `/instructor/attendance` - no page.tsx
- ❌ `/instructor/courses` - no page.tsx (dynamic route parent exists)
- ❌ `/instructor/grading` - no page.tsx
- ❌ `/instructor/profile` - no page.tsx

**Action:** Remove from nav config (instructor only has dashboard + students)

### LMS/Student Navigation (1 invalid syntax)
- ❌ `/lms/(app)/attendance` - **INVALID ROUTE GROUP SYNTAX**

**Actual route:** `/lms/attendance` (if it exists)  
**Action:** Fix to `/lms/attendance` OR remove if doesn't exist

**Note:** LMS routes under `(app)` route group are valid:
- ✅ `/lms/dashboard` → `app/lms/(app)/dashboard/page.tsx`
- ✅ `/lms/courses` → `app/lms/(app)/courses/page.tsx`
- ❌ `/lms/certificates` - no page.tsx
- ❌ `/lms/profile` - no page.tsx

### Parent Portal Navigation (4 dead links - ENTIRE SECTION)
- ❌ `/parent-portal/dashboard` - no page.tsx
- ❌ `/parent-portal/student-progress` - no page.tsx
- ❌ `/parent-portal/messages` - no page.tsx
- ❌ `/parent-portal/calendar` - no page.tsx

**Action:** Remove entire parent portal section (no schema support)

### Staff Portal Navigation (3 dead links)
- ❌ `/staff-portal/calendar` - no page.tsx
- ❌ `/staff-portal/reports` - no page.tsx
- ❌ `/staff-portal/tasks` - no page.tsx

**Action:** Remove from nav config (staff only has dashboard + students)

### Workforce Board Navigation (3 dead links)
- ❌ `/workforce-board/compliance` - no page.tsx
- ❌ `/workforce-board/outcomes` - no page.tsx
- ❌ `/workforce-board/programs` - no page.tsx

**Action:** Remove from nav config (workforce board only has dashboard + reports)

---

## Valid Routes

### Admin Navigation (21 routes) ✅
- /admin
- /admin/analytics
- /admin/analytics/engagement
- /admin/analytics/learning
- /admin/compliance-dashboard
- /admin/courses
- /admin/docs/mou
- /admin/email-marketing
- /admin/email-marketing/automation
- /admin/hr/employees
- /admin/hr/payroll
- /admin/instructors/performance
- /admin/live-chat
- /admin/notifications
- /admin/outcomes
- /admin/program-holders
- /admin/programs
- /admin/reports
- /admin/retention
- /admin/social-media
- /admin/students

### Board Member Navigation (1 route) ✅
- /board/dashboard

### Employer Navigation (3 routes) ✅
- /employer/dashboard
- /employer/jobs
- /employer/candidates

### Instructor Navigation (2 routes) ✅
- /instructor/dashboard
- /instructor/students

### LMS/Student Navigation (2 routes) ✅
- /lms/dashboard
- /lms/courses

### Program Holder Navigation (6 routes) ✅
- /program-holder/dashboard
- /program-holder/students
- /program-holder/reports
- /program-holder/compliance
- /program-holder/documents
- /program-holder/settings

### Staff Portal Navigation (2 routes) ✅
- /staff-portal/dashboard
- /staff-portal/students

### Workforce Board Navigation (2 routes) ✅
- /workforce-board/dashboard
- /workforce-board/reports

### Shared/Onboarding (4 routes) ✅
- /onboarding
- /onboarding/handbook
- /onboarding/staff
- /privacy-policy

### Other (2 routes) ✅
- /partners/portal
- /admin (duplicate, but valid)

---

## Required Fixes

### 1. Remove Dead Links from Nav Config

**File:** `lib/navigation/dashboard-nav.config.ts`

**Board Member:**
```typescript
// REMOVE:
{ href: '/board/reports', label: 'Reports', icon: FileText },
{ href: '/board/metrics', label: 'Metrics', icon: BarChart3 },
{ href: '/board/compliance', label: 'Compliance', icon: Shield },
```

**Employer:**
```typescript
// REMOVE:
{ href: '/employer/apprenticeships', label: 'Apprenticeships', icon: GraduationCap },
{ href: '/employer/company', label: 'Company Profile', icon: Building2 },
```

**Instructor:**
```typescript
// REMOVE:
{ href: '/instructor/courses', label: 'My Courses', icon: BookOpen },
{ href: '/instructor/grading', label: 'Grading', icon: ClipboardCheck },
{ href: '/instructor/attendance', label: 'Attendance', icon: Calendar },
{ href: '/instructor/profile', label: 'Profile', icon: User },
```

**LMS/Student:**
```typescript
// FIX:
{ href: '/lms/(app)/attendance', ... }  // WRONG
// TO:
// Remove entirely (attendance is admin feature, not student)

// REMOVE:
{ href: '/lms/certificates', ... }  // no page.tsx
{ href: '/lms/profile', ... }  // no page.tsx
```

**Parent Portal:**
```typescript
// REMOVE ENTIRE SECTION:
export const parentNavigation: NavItem[] = [ ... ];
// AND remove from getDashboardNavigation() switch
```

**Staff Portal:**
```typescript
// REMOVE:
{ href: '/staff-portal/tasks', label: 'Tasks', icon: CheckSquare },
{ href: '/staff-portal/reports', label: 'Reports', icon: FileText },
{ href: '/staff-portal/calendar', label: 'Calendar', icon: Calendar },
```

**Workforce Board:**
```typescript
// REMOVE:
{ href: '/workforce-board/programs', label: 'Programs', icon: BookOpen },
{ href: '/workforce-board/outcomes', label: 'Outcomes', icon: Award },
{ href: '/workforce-board/compliance', label: 'Compliance', icon: Shield },
```

---

## Verification After Fixes

After removing dead links, re-run audit:

```bash
grep -o "href: '[^']*'" lib/navigation/dashboard-nav.config.ts | \
  cut -d"'" -f2 | \
  sort -u | \
  while read route; do
    file="app${route}/page.tsx"
    [ -f "$file" ] && echo "✅ $route" || echo "❌ $route"
  done
```

**Expected result:** 0 dead links

---

## Status

- [x] Audit completed
- [ ] Dead links removed from nav config
- [ ] Verification re-run
- [ ] Commit fixes

---

**Next:** Remove all dead links from `lib/navigation/dashboard-nav.config.ts`
