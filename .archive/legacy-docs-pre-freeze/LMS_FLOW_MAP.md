# LMS Flow Map - Complete Student Journey

## Student Flow: Catalog → Enrollment → Lessons → Completion → Credential → Partner Access

### STEP 1: Browse Catalog (Public)
**Route:** `/programs` or `/courses`
**Component:** `app/programs/page.tsx` or `app/courses/page.tsx`
**Data Source:** Static data (`app/data/programs.ts`) OR database (`public.programs`)
**API:** None (static) OR `supabase.from('programs').select()`
**DB Tables Read:** `programs` (if using database)
**RLS Policy:** Public SELECT on `programs` where `is_active = true`
**Auth Required:** No

**User Action:** Browse available programs/courses

---

### STEP 2: View Program Details (Public)
**Route:** `/programs/[slug]`
**Component:** `app/programs/[slug]/page.tsx`
**Data Source:** Static data OR database
**API:** None OR `supabase.from('programs').select().eq('slug', slug).single()`
**DB Tables Read:** `programs`, `modules`, `lessons`
**RLS Policy:** Public SELECT
**Auth Required:** No

**User Action:** View program details, requirements, outcomes

---

### STEP 3: Apply/Enroll
**Route:** `/apply` or program-specific apply button
**Component:** `app/apply/page.tsx` or `app/apply/ApplyFormClient.tsx`
**API:** `/api/applications` (POST) OR server action
**DB Tables Written:** `applications`
**DB Tables Read:** `programs`
**RLS Policy:** 
- Public INSERT on `applications`
- Public SELECT on `programs`
**Auth Required:** No (can apply before creating account)

**User Action:** Submit application form

**Expected DB Write:**
```sql
INSERT INTO public.applications (
  email, full_name, phone, program_id, status, data
) VALUES (
  'user@example.com', 'John Doe', '555-1234', 
  'program-uuid', 'pending', '{}'::jsonb
);
```

---

### STEP 4: Create Account / Login
**Route:** `/login` or `/signup`
**Component:** `app/login/page.tsx` or Supabase Auth UI
**API:** Supabase Auth API
**DB Tables Written:** `auth.users`, `public.profiles`
**RLS Policy:** 
- `profiles` INSERT with `auth.uid() = id`
**Auth Required:** N/A (this creates auth)

**User Action:** Sign up or sign in

**Expected DB Write:**
```sql
-- Supabase Auth creates user
INSERT INTO auth.users (id, email) VALUES (...);

-- Trigger or manual insert creates profile
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (auth.uid(), 'user@example.com', 'John Doe', 'student');
```

---

### STEP 5: Student Dashboard Landing
**Route:** `/student` or `/student/dashboard`
**Component:** `app/student/page.tsx`
**API:** Multiple queries for dashboard data
**DB Tables Read:** 
- `profiles` (user info)
- `enrollments` (active enrollments)
- `lesson_progress` (recent progress)
- `certificates` (earned credentials)
**RLS Policy:** 
- SELECT where `user_id = auth.uid()`
**Auth Required:** Yes (redirect to `/login` if not authenticated)

**User Action:** View dashboard, see enrolled programs, progress

---

### STEP 6: Enrollment Confirmation (Admin or Auto)
**Route:** Admin panel or automated workflow
**Component:** `app/admin/applications/[id]/page.tsx`
**API:** `/api/enrollments` (POST) OR admin action
**DB Tables Written:** `enrollments`
**DB Tables Read:** `applications`, `programs`
**RLS Policy:** 
- Admin can INSERT into `enrollments`
- Student can SELECT own `enrollments`
**Auth Required:** Yes (admin role)

**User Action:** Admin approves application → creates enrollment

**Expected DB Write:**
```sql
INSERT INTO public.enrollments (
  user_id, program_id, status, enrolled_at
) VALUES (
  'user-uuid', 'program-uuid', 'active', NOW()
);

-- Update application status
UPDATE public.applications
SET status = 'enrolled', reviewed_at = NOW()
WHERE id = 'application-uuid';
```

---

### STEP 7: Access Course Content
**Route:** `/student/courses/[courseId]` or `/student/programs/[slug]`
**Component:** 
- `app/student/courses/[courseId]/page.tsx`
- `app/student/programs/[slug]/page.tsx`
**API:** `supabase.from('courses').select()` or `supabase.from('programs').select()`
**DB Tables Read:**
- `enrollments` (verify student is enrolled)
- `programs` or `courses`
- `modules`
- `lessons`
**RLS Policy:**
- SELECT `enrollments` where `user_id = auth.uid()`
- SELECT `modules` where program is enrolled
- SELECT `lessons` where module is enrolled
**Auth Required:** Yes

**User Action:** View course/program structure, modules, lessons

---

### STEP 8: Complete Lesson
**Route:** `/student/courses/[courseId]/lessons/[lessonId]` or similar
**Component:** Lesson player component
**API:** `/api/progress` (POST) OR server action
**DB Tables Written:** `lesson_progress`
**DB Tables Read:** 
- `enrollments` (verify enrollment)
- `lessons` (lesson content)
**RLS Policy:**
- INSERT/UPDATE `lesson_progress` where enrollment belongs to user
**Auth Required:** Yes

**User Action:** Watch video, read content, complete quiz

**Expected DB Write:**
```sql
INSERT INTO public.lesson_progress (
  enrollment_id, lesson_id, status, completed_at, time_spent_minutes
) VALUES (
  'enrollment-uuid', 'lesson-uuid', 'completed', NOW(), 15
)
ON CONFLICT (enrollment_id, lesson_id) 
DO UPDATE SET 
  status = 'completed',
  completed_at = NOW(),
  time_spent_minutes = lesson_progress.time_spent_minutes + 15;
```

---

### STEP 9: Module Completion
**Route:** Automatic (triggered by lesson completion)
**Component:** Server-side logic or database trigger
**API:** Automatic calculation
**DB Tables Written:** `module_progress`
**DB Tables Read:** `lesson_progress`, `modules`, `lessons`
**RLS Policy:** System/service_role
**Auth Required:** N/A (server-side)

**User Action:** Complete all required lessons in module

**Expected DB Write:**
```sql
-- Check if all required lessons completed
WITH module_lessons AS (
  SELECT COUNT(*) as total
  FROM lessons
  WHERE module_id = 'module-uuid' AND is_required = true
),
completed_lessons AS (
  SELECT COUNT(*) as completed
  FROM lesson_progress lp
  JOIN lessons l ON l.id = lp.lesson_id
  WHERE l.module_id = 'module-uuid'
    AND lp.enrollment_id = 'enrollment-uuid'
    AND lp.status = 'completed'
    AND l.is_required = true
)
INSERT INTO public.module_progress (
  enrollment_id, module_id, status, completed_at
)
SELECT 
  'enrollment-uuid', 'module-uuid', 'completed', NOW()
WHERE (SELECT completed FROM completed_lessons) = (SELECT total FROM module_lessons);
```

---

### STEP 10: Course/Program Completion
**Route:** Automatic (triggered by module completion)
**Component:** Server-side logic
**API:** Automatic calculation
**DB Tables Written:** `enrollments` (update status)
**DB Tables Read:** `module_progress`, `modules`
**RLS Policy:** System/service_role
**Auth Required:** N/A (server-side)

**User Action:** Complete all required modules

**Expected DB Write:**
```sql
-- Check if all modules completed
UPDATE public.enrollments
SET status = 'completed', completed_at = NOW()
WHERE id = 'enrollment-uuid'
  AND (
    SELECT COUNT(*) 
    FROM module_progress 
    WHERE enrollment_id = 'enrollment-uuid' AND status = 'completed'
  ) = (
    SELECT COUNT(*) 
    FROM modules 
    WHERE program_id = (SELECT program_id FROM enrollments WHERE id = 'enrollment-uuid')
  );
```

---

### STEP 11: Certificate Generation
**Route:** Automatic (triggered by completion) OR manual request
**Component:** `/student/certificates` or admin panel
**API:** `/api/certificates` (POST) OR server action
**DB Tables Written:** `certificates`
**DB Tables Read:** `enrollments`, `programs`
**RLS Policy:**
- INSERT `certificates` (system/admin)
- SELECT `certificates` where `user_id = auth.uid()`
**Auth Required:** Yes

**User Action:** View/download certificate

**Expected DB Write:**
```sql
INSERT INTO public.certificates (
  enrollment_id, user_id, program_id, 
  certificate_number, issued_at, pdf_url
) VALUES (
  'enrollment-uuid', 'user-uuid', 'program-uuid',
  'CERT-2024-12345', NOW(), 'https://storage.../cert.pdf'
);
```

---

### STEP 12: Partner Access (External Credentials)
**Route:** `/student/certifications/milady` or partner-specific page
**Component:** `app/student/certifications/milady/page.tsx`
**API:** Partner API integration OR link generation
**DB Tables Read:**
- `enrollments` (verify completion)
- `certificates` (verify credential)
- Partner-specific tables (e.g., `milady_enrollments`)
**RLS Policy:**
- SELECT where `user_id = auth.uid()`
**Auth Required:** Yes

**User Action:** Access partner site, view external credentials

**Expected Flow:**
1. Student completes program
2. Certificate generated
3. Partner access link/code provided
4. Student clicks link → redirected to partner site with SSO or access code
5. Partner site verifies credential and grants access

---

## Critical Tables for LMS Flow

### Must Exist and Work:
1. **programs** - Program catalog
2. **modules** - Course structure
3. **lessons** - Lesson content
4. **applications** - Application submissions
5. **profiles** - User accounts
6. **enrollments** - Active enrollments
7. **lesson_progress** - Progress tracking
8. **module_progress** - Module completion
9. **certificates** - Credential issuance

### Optional but Important:
10. **courses** - Alternative content structure
11. **ai_instructors** - AI guidance
12. **ai_conversations** - AI chat history
13. **products** - Store items (if monetized)
14. **purchases** - Payment records

---

## API Routes Used

### Public:
- `GET /api/programs` - List programs
- `GET /api/programs/[slug]` - Program details
- `POST /api/applications` - Submit application

### Authenticated:
- `GET /api/enrollments` - User's enrollments
- `GET /api/courses/[id]` - Course content
- `POST /api/progress` - Update lesson progress
- `GET /api/certificates` - User's certificates

### Admin:
- `POST /api/enrollments` - Create enrollment
- `POST /api/certificates` - Generate certificate
- `GET /api/applications` - Review applications

---

## RLS Policies Required

### Public Read:
- `programs` (is_active = true)
- `modules` (via programs.is_active)
- `lessons` (via programs.is_active)

### Public Write:
- `applications` (INSERT only)

### Authenticated Read:
- `enrollments` (user_id = auth.uid())
- `lesson_progress` (via enrollments.user_id)
- `module_progress` (via enrollments.user_id)
- `certificates` (user_id = auth.uid())

### Authenticated Write:
- `lesson_progress` (via enrollments.user_id)

### Admin Only:
- `enrollments` (INSERT/UPDATE)
- `certificates` (INSERT)

---

## Verification Queries

### Check if student can enroll:
```sql
SELECT * FROM public.programs WHERE slug = 'barber-apprenticeship' AND is_active = true;
```

### Check if enrollment exists:
```sql
SELECT * FROM public.enrollments 
WHERE user_id = auth.uid() AND program_id = 'program-uuid';
```

### Check lesson progress:
```sql
SELECT lp.*, l.title 
FROM public.lesson_progress lp
JOIN public.lessons l ON l.id = lp.lesson_id
WHERE lp.enrollment_id = 'enrollment-uuid'
ORDER BY l.order_index;
```

### Check completion status:
```sql
SELECT 
  e.status,
  e.completed_at,
  COUNT(DISTINCT mp.id) as modules_completed,
  COUNT(DISTINCT lp.id) as lessons_completed
FROM public.enrollments e
LEFT JOIN public.module_progress mp ON mp.enrollment_id = e.id AND mp.status = 'completed'
LEFT JOIN public.lesson_progress lp ON lp.enrollment_id = e.id AND lp.status = 'completed'
WHERE e.id = 'enrollment-uuid'
GROUP BY e.id;
```

---

## Next Steps (PHASE 2)

1. Verify all tables exist
2. Check for missing foreign keys
3. Verify completion rules are defined
4. Test progress tracking logic
5. Verify certificate generation works
6. Test partner access flow
