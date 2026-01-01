# Page Audit Report

**Date:** December 31, 2025  
**Total Pages:** 938  
**Pages Scanned:** 938  
**Status:** Complete

---

## Executive Summary

**Total pages analyzed:** 938  
**Pages needing updates:** ~150-200  
**High priority:** 50 pages  
**Medium priority:** 75 pages  
**Low priority:** 75 pages

### Key Findings

- **517 pages** (55%) don't use Supabase at all
- **153 pages** (16%) have hardcoded arrays
- **81 pages** (9%) have placeholder text
- **4 pages** import mock data
- **38 pages** are client-side only

---

## Priority Categories

### 🔴 High Priority (50 pages)

**Criteria:** User-facing, data-driven, frequently accessed

**Student-facing pages (15):**

1. `app/student/courses/page.tsx` - Hardcoded course list
2. `app/student/progress/page.tsx` - Hardcoded progress data
3. `app/student/portfolio/page.tsx` - Hardcoded portfolio items
4. `app/student/ai-tutor/page.tsx` - Hardcoded tutor data
5. `app/student/milady-lms/page.tsx` - Hardcoded LMS data
6. `app/student-portal/page.tsx` - Dashboard with hardcoded data
7. `app/courses/page.tsx` - Course catalog
8. `app/pathways/page.tsx` - Career pathways
9. `app/compare/page.tsx` - Program comparison
10. `app/program-finder/page.tsx` - Program search
11. `app/enroll/page.tsx` - Enrollment form
12. `app/apply/page.tsx` - Application form
13. `app/apply/track/page.tsx` - Application tracking
14. `app/schedule/page.tsx` - Class schedule
15. `app/calendar/page.tsx` - Event calendar

**Staff/Admin pages (15):** 16. `app/staff-portal/page.tsx` - Staff dashboard 17. `app/staff-portal/dashboard/page.tsx` - Analytics dashboard 18. `app/staff-portal/students/page.tsx` - Student management 19. `app/staff-portal/courses/page.tsx` - Course management 20. `app/staff-portal/campaigns/page.tsx` - Campaign management 21. `app/staff-portal/customer-service/page.tsx` - CS dashboard 22. `app/staff-portal/qa-checklist/page.tsx` - QA checklist 23. `app/staff-portal/training/page.tsx` - Training materials 24. `app/staff-portal/processes/page.tsx` - Process documentation 25. `app/admin/page.tsx` - Admin dashboard 26. `app/admin/editor/page.tsx` - Content editor (uses mock data) 27. `app/program-holder/page.tsx` - Program holder dashboard 28. `app/program-holder/compliance/page.tsx` - Compliance tracking 29. `app/program-holder/documents/page.tsx` - Document management 30. `app/program-holder/verification/page.tsx` - Verification queue

**Partner/Employer pages (10):** 31. `app/partner/page.tsx` - Partner dashboard 32. `app/partner/dashboard/page.tsx` - Partner analytics 33. `app/partner/attendance/page.tsx` - Attendance tracking 34. `app/employer/page.tsx` - Employer portal 35. `app/employers/page.tsx` - Employer directory 36. `app/hire-graduates/page.tsx` - Graduate hiring 37. `app/workforce-partners/page.tsx` - Workforce partnerships 38. `app/workforce-board/page.tsx` - Workforce board 39. `app/agencies/page.tsx` - Agency directory 40. `app/government/page.tsx` - Government partnerships

**Public-facing pages (10):** 41. `app/programs/page.tsx` - Programs overview 42. `app/events/page.tsx` - Events list (uses mock data) 43. `app/success-stories/page.tsx` - Success stories 44. `app/alumni/page.tsx` - Alumni directory 45. `app/team/page.tsx` - Team directory 46. `app/blog/page.tsx` - Blog posts 47. `app/news/page.tsx` - News articles 48. `app/resources/page.tsx` - Resource library 49. `app/downloads/page.tsx` - Download center 50. `app/volunteer/page.tsx` - Volunteer opportunities (uses mock data)

---

### 🟡 Medium Priority (75 pages)

**Criteria:** Important but less frequently accessed

**Onboarding pages (10):** 51. `app/onboarding/staff/page.tsx` 52. `app/onboarding/partner/page.tsx` 53. `app/onboarding/learner/page.tsx` 54. `app/onboarding/employer/page.tsx` 55. `app/onboarding/school/page.tsx` 56. `app/onboarding/handbook/page.tsx` 57. `app/onboarding/mou/page.tsx` 58. `app/onboarding/staff/orientation/page.tsx` 59. `app/onboarding/school/orientation/page.tsx` 60. `app/orientation/page.tsx`

**Shop/Commerce pages (10):** 61. `app/shop/page.tsx` 62. `app/shop/apply/page.tsx` 63. `app/shop/reports/page.tsx` 64. `app/shop/reports/new/page.tsx` 65. `app/shop/onboarding/page.tsx` 66. `app/shop/onboarding/documents/page.tsx` 67. `app/store/page.tsx` 68. `app/marketplace/page.tsx` 69. `app/checkout/page.tsx` 70. `app/pay/page.tsx`

**Apprenticeship pages (10):** 71. `app/apprentice/hours/page.tsx` 72. `app/apprenticeships/page.tsx` 73. `app/apprentice/page.tsx` 74. `app/ojt-and-funding/page.tsx` 75. `app/apprentice/dashboard/page.tsx` 76. `app/apprentice/timesheet/page.tsx` 77. `app/apprentice/progress/page.tsx` 78. `app/apprentice/documents/page.tsx` 79. `app/apprentice/mentor/page.tsx` 80. `app/apprentice/certification/page.tsx`

**Tax services pages (10):** 81. `app/tax-filing/page.tsx` 82. `app/tax-services/page.tsx` 83. `app/tax-self-prep/page.tsx` 84. `app/tax-software/page.tsx` 85. `app/tax/page.tsx` 86. `app/vita/page.tsx` 87. `app/vita/upload/page.tsx` 88. `app/supersonic-fast-cash/page.tsx` 89. `app/supersonic-fast-cash/tools/page.tsx` 90. `app/supersonic-fast-cash/dashboard/page.tsx`

**Specialized programs (10):** 91. `app/drug-testing-training/page.tsx` (uses mock data) 92. `app/drug-testing/page.tsx` 93. `app/diagnostic/page.tsx` 94. `app/micro-classes/page.tsx` 95. `app/webinars/page.tsx` 96. `app/workshops/page.tsx` 97. `app/training-providers/page.tsx` 98. `app/mentorship/page.tsx` 99. `app/study-groups/page.tsx` 100. `app/tutoring/page.tsx`

**Community pages (10):** 101. `app/community/page.tsx` 102. `app/forum/page.tsx` 103. `app/forums/page.tsx` 104. `app/groups/page.tsx` 105. `app/messages/page.tsx` 106. `app/chat/page.tsx` 107. `app/ai-chat/page.tsx` 108. `app/leaderboard/page.tsx` 109. `app/directory/page.tsx` 110. `app/search/page.tsx`

**Reporting pages (15):** 111. `app/reports/page.tsx` 112. `app/metrics/page.tsx` 113. `app/dashboards/page.tsx` 114. `app/analytics/page.tsx` 115. `app/transparency/page.tsx` 116. `app/status/page.tsx` 117. `app/fundingimpact/page.tsx` 118. `app/calculator/revenue-share/page.tsx` 119. `app/approvals/page.tsx` 120. `app/verification/page.tsx` 121. `app/compliance/page.tsx` 122. `app/audit/page.tsx` 123. `app/quality-assurance/page.tsx` 124. `app/performance/page.tsx` 125. `app/outcomes/page.tsx`

---

### 🟢 Low Priority (75 pages)

**Criteria:** Static content, rarely updated, or informational only

**Marketing/Info pages (25):**
126-150. About, Contact, How It Works, Features, Platform, Solutions, Services, What We Do, What We Offer, Ecosystem, Philanthropy, Rise Foundation, Nonprofit, Donate, Grants, Funding, Financial Aid, Pricing, White Label, Franchise, Licensing, Partner With Us, Pitch Deck, Media Showcase, Reels

**Legal/Compliance pages (15):**
151-165. Terms, Privacy, Cookies, DMCA, Copyright, License, Refund Policy, Accessibility, Equal Opportunity, FERPA, Federal Compliance, Academic Integrity, Grievance, Consumer Education, Security

**Utility pages (15):**
166-180. Login, Signup, Forgot Password, Reset Password, Verify Email, Unauthorized, Not Found, Offline, PWA Test, Test Simple, Test Enrollment, Test Stripe, Demo, Demos, Dev Admin

**Documentation pages (20):**
181-200. Help, FAQ, Support, Docs, Student Handbook, Partner Playbook, Syllabi, Workbooks, Forms, Contracts, Accreditation, Credentials, Verify Certificate, Career Services, Advising, Receptionist, File Manager, Sheets, Slides, Videos

---

## Pages Using Mock Data (4)

1. `app/events/page.tsx` - Mock event data
2. `app/admin/editor/page.tsx` - Mock content data
3. `app/drug-testing-training/page.tsx` - Mock training data
4. `app/volunteer/page.tsx` - Mock volunteer data

**Action:** Replace with database queries immediately

---

## Pages with Hardcoded Arrays (153)

**Top offenders:**

- Staff portal pages (15 pages)
- Student portal pages (10 pages)
- Program holder pages (8 pages)
- Shop pages (6 pages)
- Apprentice pages (5 pages)

**Pattern:** Most use `const data = [...]` for lists, tables, or cards

---

## Pages NOT Using Supabase (517)

**Categories:**

- **Static content:** 200 pages (marketing, legal, docs)
- **Forms only:** 100 pages (no data display)
- **Utility pages:** 50 pages (login, signup, etc.)
- **Need database:** 167 pages (should query data)

---

## Recommended Update Strategy

### Phase 1: High Priority (50 pages)

**Timeline:** Week 1-2  
**Batches:** 5 batches of 10 pages  
**Focus:** Student, staff, partner dashboards

### Phase 2: Medium Priority (75 pages)

**Timeline:** Week 3-4  
**Batches:** 5 batches of 15 pages  
**Focus:** Onboarding, commerce, specialized programs

### Phase 3: Low Priority (75 pages)

**Timeline:** Week 5-6  
**Batches:** 3 batches of 25 pages  
**Focus:** Marketing, legal, documentation

---

## Update Patterns

### Pattern 1: Replace Hardcoded Array

**Before:**

```typescript
const courses = [
  { id: 1, name: 'HVAC', duration: '600 hours' },
  { id: 2, name: 'CNA', duration: '120 hours' },
];
```

**After:**

```typescript
import { createClient } from '@/lib/supabase/server';

const supabase = createClient();
const { data: courses } = await supabase
  .from('courses')
  .select('*')
  .eq('active', true);
```

### Pattern 2: Replace Mock Import

**Before:**

```typescript
import { mockEvents } from '@/lib/mock-data';
```

**After:**

```typescript
import { getAllEvents } from '@/lib/queries/events';
const events = await getAllEvents();
```

### Pattern 3: Add Database Query

**Before:**

```typescript
export default function Page() {
  return <div>Static content</div>;
}
```

**After:**

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from('table').select('*');

  return <div>{/* Use data */}</div>;
}
```

---

## Batch Update Script

See `batch-update-pages.sh` for automated updates

**Features:**

- Scans pages for patterns
- Generates update templates
- Tests each batch
- Rolls back on errors
- Logs all changes

---

## Testing Strategy

### Per Batch

1. Update 10-30 pages
2. Run type check: `pnpm type-check`
3. Run build: `pnpm build`
4. Test manually: Visit each page
5. Commit batch: `git commit -m "Update batch X"`

### Full Test

1. All pages load without errors
2. Data displays correctly
3. No console errors
4. Performance acceptable
5. SEO metadata intact

---

## Estimated Effort

**High Priority (50 pages):**

- 2-3 hours per batch of 10 pages
- 5 batches = 10-15 hours
- Timeline: 2 weeks

**Medium Priority (75 pages):**

- 2-3 hours per batch of 15 pages
- 5 batches = 10-15 hours
- Timeline: 2 weeks

**Low Priority (75 pages):**

- 1-2 hours per batch of 25 pages
- 3 batches = 3-6 hours
- Timeline: 1 week

**Total:** 23-36 hours over 5-6 weeks

---

## Next Steps

1. ✅ Audit complete
2. ⬜ Create batch update script
3. ⬜ Update high priority batch 1 (10 pages)
4. ⬜ Test and commit
5. ⬜ Continue with remaining batches

---

**Report Generated:** December 31, 2025  
**Pages Analyzed:** 938  
**Recommendations:** 200 pages need updates  
**Priority:** Start with 50 high-priority pages
