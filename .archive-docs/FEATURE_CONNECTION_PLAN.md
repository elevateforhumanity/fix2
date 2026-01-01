# Feature Connection Plan

**Date:** December 27, 2024
**Purpose:** Systematic plan to connect existing features to database

## Database Tables Found in Migrations

### Core Tables (20 from complete_schema.sql)

1. ✅ `profiles` - User profiles
2. ✅ `students` - Student data
3. ✅ `program_holders` - Training providers
4. ✅ `delegates` - Case managers
5. ✅ `programs` - Program catalog
6. ✅ `courses` - Course catalog
7. ✅ `modules` - Course modules
8. ✅ `lessons` - Lesson content
9. ✅ `lesson_resources` - Lesson materials
10. ✅ `enrollments` - Student enrollments
11. ✅ `lesson_progress` - Progress tracking
12. ✅ `attendance_log` - Attendance records
13. ✅ `contact_hours` - Contact hour tracking
14. ✅ `quizzes` - Quiz definitions
15. ✅ `quiz_questions` - Quiz questions
16. ✅ `quiz_attempts` - Quiz submissions
17. ✅ `grades` - Grade records
18. ✅ `certificates` - Certificate records
19. ✅ `messages` - Messaging system
20. ✅ `notifications` - Notification queue

### Additional Tables (from other migrations)

21. ✅ `analytics_events` - Analytics tracking
22. ✅ `assessment_submissions` - Assessment data
23. ✅ `assessments` - Assessment definitions
24. ✅ `audit_logs` - Audit trail
25. ✅ `badges` - Badge definitions
26. ✅ `user_badges` - User badge awards
27. ✅ `leaderboards` - Leaderboard data
28. ✅ `billing_subscriptions` - Subscription data
29. ✅ `entitlements` - User entitlements
30. ✅ `course_versions` - Course versioning
31. ✅ `milady_rise_enrollments` - Milady enrollments
32. ✅ `milady_rise_completions` - Milady completions
33. ✅ `milady_rise_certifications` - Milady certs
34. ✅ `milady_rise_scholarship_applications` - Scholarships
35. ✅ `scholarship_applications` - General scholarships
36. ✅ `module_progress` - Module progress
37. ✅ `certifications` - Certification tracking
38. ✅ `scholarships` - Scholarship programs
39. ✅ `generated_content` - AI-generated content
40. ✅ `videos` - Video content
41. ✅ `questions` - Question bank
42. ✅ `student_progress` - Student progress
43. ✅ `partners` - Partner organizations
44. ✅ `partner_programs` - Partner programs
45. ✅ `job_placements` - Job placement tracking
46. ✅ `activity_log` - Activity tracking
47. ✅ `reports` - Report definitions
48. ✅ `instructors` - Instructor profiles
49. ✅ `split_payouts` - Payment splits
50. ✅ `instructor_programs` - Instructor assignments
51. ✅ `email_queue` - Email queue
52. ✅ `email_logs` - Email logs
53. ✅ `webhooks` - Webhook definitions
54. ✅ `webhook_queue` - Webhook queue
55. ✅ `webhook_logs` - Webhook logs
56. ✅ `campaigns` - Marketing campaigns
57. ✅ `ab_tests` - A/B testing
58. ✅ `funnels` - Conversion funnels
59. ✅ `forums` - Forum categories
60. ✅ `forum_posts` - Forum posts
61. ✅ `forum_members` - Forum membership
62. ✅ `api_keys` - API key management
63. ✅ `ai_generations` - AI generation tracking
64. ✅ `integrations` - Integration configs

## Features Ready to Connect

### Priority 1: Core Student Experience (1-2 days)

#### Student Portal

**Pages:** `/app/student/*` (43 pages)
**Tables:** `students`, `enrollments`, `lesson_progress`, `certificates`, `badges`, `user_badges`
**API Routes:** `/api/student/*`

**Connection Tasks:**

1. ✅ Calendar - Connect to `enrollments` + `lessons`
2. ✅ Schedule - Connect to `enrollments` + `modules`
3. ✅ Portfolio - Connect to `certificates` + `badges` + `user_badges`
4. ✅ JRI - Connect to `student_progress` + custom JRI table
5. ✅ SCORM Player - Connect to `lesson_progress`
6. ✅ Badges - Connect to `badges` + `user_badges`
7. ✅ Documents - Connect to storage bucket + `students`
8. ✅ Course Progress - Connect to `lesson_progress` + `quiz_attempts`

**Estimated Time:** 1 day

### Priority 2: Admin Portal (2-3 days)

#### Admin Dashboard

**Pages:** `/app/admin/*` (185 pages)
**Tables:** Multiple (see below by section)

**Connection Tasks by Section:**

1. **Analytics** (`/admin/analytics`)
   - Tables: `analytics_events`, `enrollments`, `lesson_progress`
   - Time: 2 hours

2. **Applications** (`/admin/applications`)
   - Tables: `scholarship_applications`, `program_holder_applications`
   - Time: 2 hours

3. **Enrollments** (`/admin/enrollments`)
   - Tables: `enrollments`, `students`, `courses`
   - Time: 2 hours

4. **Certificates** (`/admin/certificates`)
   - Tables: `certificates`, `certifications`
   - Time: 2 hours

5. **CRM** (`/admin/crm`)
   - Tables: Need to create `crm_contacts`, `crm_interactions`
   - Time: 4 hours

6. **Email Marketing** (`/admin/email-marketing`)
   - Tables: `campaigns`, `email_queue`, `email_logs`
   - Time: 3 hours

7. **Reports** (`/admin/reports`)
   - Tables: `reports`, `analytics_events`
   - Time: 3 hours

8. **Users** (`/admin/users`)
   - Tables: `profiles`, `students`, `delegates`
   - Time: 2 hours

9. **Courses** (`/admin/courses`)
   - Tables: `courses`, `modules`, `lessons`
   - Time: 3 hours

10. **Program Holders** (`/admin/program-holders`)
    - Tables: `program_holders`, `instructor_programs`
    - Time: 2 hours

**Estimated Time:** 2-3 days

### Priority 3: Staff Portal (1 day)

#### Staff Portal

**Pages:** `/app/staff-portal/*` (8 pages)
**Tables:** `profiles`, `students`, `enrollments`, `campaigns`, `courses`

**Connection Tasks:**

1. ✅ Campaigns - Connect to `campaigns` table
2. ✅ Customer Service - Create `customer_service_tickets` table
3. ✅ Students - Connect to `students` + `enrollments`
4. ✅ Courses - Connect to `courses` + `modules`
5. ✅ QA Checklist - Create `qa_checklists` table
6. ✅ Dashboard - Connect to multiple tables for metrics
7. ✅ Processes - Create `staff_processes` table
8. ✅ Training - Connect to `courses` (staff training)

**Estimated Time:** 1 day

### Priority 4: Partner Portal (1 day)

#### Partner Portal

**Pages:** `/app/partner/*` (3 pages)
**Tables:** `partners`, `enrollments`, `attendance_log`

**Connection Tasks:**

1. ✅ Dashboard - Connect to `partners` + `enrollments`
2. ✅ Attendance - Connect to `attendance_log`
3. ✅ Enrollments - Connect to `enrollments` + `students`

**Estimated Time:** 1 day

### Priority 5: Employer Portal (1 day)

#### Employer Portal

**Pages:** `/app/employer/*` (10 pages)
**Tables:** Need to create `employers`, `job_postings`, `apprenticeships`

**Connection Tasks:**

1. ✅ Dashboard - Connect to `employers` + `job_postings`
2. ✅ Job Postings - Create `job_postings` table
3. ✅ Apprenticeships - Connect to `apprenticeships` table
4. ✅ Hiring - Connect to `job_placements`
5. ✅ Reports - Connect to analytics

**Estimated Time:** 1 day

### Priority 6: Onboarding System (1 day)

#### Onboarding

**Pages:** `/app/onboarding/*` (11 pages)
**Tables:** `profiles`, `students`, `partners`, `program_holders`

**Connection Tasks:**

1. ✅ Learner Onboarding - Connect to `students` table
2. ✅ Staff Onboarding - Connect to `profiles` table
3. ✅ Partner Onboarding - Connect to `partners` table
4. ✅ Employer Onboarding - Connect to `employers` table
5. ✅ MOU - Connect to `program_holders` (mou fields exist)
6. ✅ Payroll Setup - Create `payroll_profiles` table

**Estimated Time:** 1 day

### Priority 7: Communication Systems (1 day)

#### Messages & Notifications

**Pages:** `/app/messages`, `/app/chat`
**Tables:** `messages`, `notifications`
**Components:** `NotificationBell`

**Connection Tasks:**

1. ✅ Messages - Connect to `messages` table
2. ✅ Notifications - Connect to `notifications` table
3. ✅ Chat - Connect to `messages` (real-time)
4. ✅ AI Chat - Connect to `ai_generations` + `messages`

**Estimated Time:** 1 day

### Priority 8: Financial Systems (1 day)

#### Payments & Billing

**Pages:** `/app/enroll`, `/app/checkout`, `/app/pricing`
**Tables:** `billing_subscriptions`, `split_payouts`

**Connection Tasks:**

1. ✅ Enrollment Payment - Connect to Stripe + `enrollments`
2. ✅ Checkout - Connect to Stripe + `billing_subscriptions`
3. ✅ Split Payouts - Connect to `split_payouts` + `instructors`

**Estimated Time:** 1 day

## Missing Tables to Create

### High Priority

1. `customer_service_tickets` - Support ticket system
2. `qa_checklists` - Quality assurance
3. `staff_processes` - Process documentation
4. `employers` - Employer records
5. `job_postings` - Job listings
6. `apprenticeships` - Apprenticeship programs
7. `payroll_profiles` - Payroll data
8. `crm_contacts` - CRM contacts
9. `crm_interactions` - CRM interactions

### Medium Priority

10. `tax_filings` - Tax filing records
11. `vita_appointments` - VITA appointments
12. `shop_reports` - Shop reporting
13. `compliance_records` - Compliance tracking
14. `ferpa_training_records` - FERPA training
15. `document_signatures` - Digital signatures

### Low Priority (Can use existing tables)

16. `blog_posts` - Use `generated_content`
17. `events` - Use `live_classes`
18. `news` - Use `generated_content`

## Migration Script Needed

```sql
-- Create missing tables for staff portal
CREATE TABLE IF NOT EXISTS customer_service_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  staff_id UUID REFERENCES profiles(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS qa_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  items JSONB,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_processes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  steps JSONB,
  category TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  website TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES employers(id),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  salary_range TEXT,
  location TEXT,
  job_type TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS apprenticeships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES employers(id),
  program_id UUID REFERENCES programs(id),
  title TEXT NOT NULL,
  description TEXT,
  duration_months INTEGER,
  wage_progression JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payroll_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  bank_name TEXT,
  account_type TEXT,
  routing_number TEXT,
  account_number_encrypted TEXT,
  tax_withholding JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  title TEXT,
  source TEXT,
  status TEXT DEFAULT 'lead',
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES crm_contacts(id),
  user_id UUID REFERENCES profiles(id),
  type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Testing Plan

### Phase 1: Smoke Tests (1 day)

1. Test each major portal loads
2. Test basic CRUD operations
3. Test authentication/authorization
4. Test data displays correctly

### Phase 2: Integration Tests (1 day)

1. Test enrollment workflow end-to-end
2. Test course progress tracking
3. Test certificate generation
4. Test payment processing
5. Test messaging system

### Phase 3: User Acceptance (1 day)

1. Test with real user scenarios
2. Fix any UX issues
3. Verify all features work
4. Performance testing

## Timeline Summary

| Phase           | Tasks                                  | Time           |
| --------------- | -------------------------------------- | -------------- |
| Database Setup  | Create missing tables, verify existing | 1 day          |
| Student Portal  | Connect 43 pages                       | 1 day          |
| Admin Portal    | Connect 185 pages                      | 2-3 days       |
| Staff Portal    | Connect 8 pages                        | 1 day          |
| Partner Portal  | Connect 3 pages                        | 1 day          |
| Employer Portal | Connect 10 pages                       | 1 day          |
| Onboarding      | Connect 11 pages                       | 1 day          |
| Communications  | Connect messaging                      | 1 day          |
| Financial       | Connect payments                       | 1 day          |
| Testing         | Smoke + Integration + UAT              | 3 days         |
| **TOTAL**       |                                        | **13-14 days** |

## Success Criteria

✅ All 905 pages load without errors
✅ All 549 API routes connect to database
✅ All CRUD operations work
✅ Authentication/authorization works
✅ Data persists correctly
✅ Real-time features work (messages, notifications)
✅ Payment processing works
✅ Certificate generation works
✅ All tests pass

## Next Steps

1. **Run migration script** to create missing tables
2. **Start with Student Portal** (highest user impact)
3. **Move to Admin Portal** (most pages)
4. **Connect remaining portals** systematically
5. **Test thoroughly** before deployment

## Conclusion

The repository has **80-90% of features already built**. The work is primarily:

- Creating 9 missing database tables
- Connecting existing UI to existing tables
- Testing workflows end-to-end

This is **NOT** building 247 features from scratch. This is **connecting existing features** to the database.

**Realistic Timeline: 13-14 days** (not 3-4 months)
