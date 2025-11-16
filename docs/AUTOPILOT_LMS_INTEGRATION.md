# Autopilot & LMS Integration Guide

## Overview

**YES - The Autopilot system and LMS are deeply integrated** through multiple layers, sharing the same database and working together to provide autonomous course management, content generation, and student engagement.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS LAYER                          │
│  Master Orchestrator • Health Checks • Auto-fixes • Deployments │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ LMS FRONTEND │ │   SUPABASE   │ │  AUTOPILOT   │
│ React + Vite │ │   DATABASE   │ │   BACKEND    │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                 │
       └────────────────┴─────────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
       ┌─────────────┐     ┌─────────────┐
       │ LMS SERVICES│◄───►│ AUTOPILOT   │
       │ • Courses   │     │ • AI Gen    │
       │ • Students  │     │ • Content   │
       │ • Assess    │     │ • Engage    │
       └─────────────┘     └─────────────┘
```

---

## 1. Autopilot System Components

### A. Infrastructure Autopilot (GitHub Actions)

**Location:** `.github/workflows/`

**Key Workflows:**

- `autopilot-autonomous.yml` - Auto-fixes code errors every 30 min
- `loop-until-success.yml` - Retries failed operations every 15 min
- `master-orchestrator.yml` - Coordinates all systems every 30 min
- `health-check.yml` - Monitors system health hourly

**Capabilities:**

- ✅ Auto-fix TypeScript/ESLint errors
- ✅ Auto-commit fixes to repository
- ✅ Auto-deploy to production
- ✅ Self-healing on failures
- ✅ Health monitoring and alerts

### B. Database Autopilot (Supabase)

**Location:** `supabase/migrations/007_autopilot_system.sql`

**Task Queue System:**

```sql
create table automation.tasks (
  id uuid primary key,
  kind automation.task_kind,  -- 25+ task types
  payload jsonb,               -- task parameters
  priority int,                -- 1-10 (10 = highest)
  status text,                 -- pending/running/done/failed
  depends_on uuid[],           -- DAG support
  created_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz
);
```

**Task Types:**

- Infrastructure: `db_migrate`, `redeploy`, `cache_purge`
- AI/ML: `ai_features_boot`, `ai_course_create`
- Accessibility: `axe_a11y_scan`, `caption_vod`
- Security: `security_audit`, `compliance_report`
- LMS: `gc_create_course`, `auto_content_gen`

### C. LMS Copilot/Autopilot (JavaScript)

**Location:** `src/lms/copilot-autopilot.js`

**Features:**

```javascript
{
  autoContentGeneration: true,      // Fills missing lessons
  autoStudentEngagement: true,      // Monitors struggling students
  autoPerformanceOptimization: true, // Optimizes delivery
  autoAssessmentCreation: true,     // Creates quizzes
  autoMarketingOptimization: true   // Optimizes campaigns
}
```

**How It Works:**

1. Monitors LMS database for issues
2. Detects content gaps, struggling students, performance issues
3. Auto-generates fixes using templates or AI
4. Applies changes to database
5. Logs actions for audit

---

## 2. LMS Structure

### Frontend (React 19 + Vite 6)

**Location:** `src/`

**Key Components:**

- `src/pages/lms/` - LMS pages (Dashboard, Courses, Lessons)
- `src/components/classroom/` - Classroom components
- `src/services/` - API services layer
- `src/lms/` - Advanced LMS features

**Routes:**

- `/lms` - LMS dashboard
- `/lms/courses` - Course catalog
- `/lms/courses/:id` - Course detail
- `/lms/courses/:courseId/lessons/:lessonId` - Lesson viewer
- `/lms/discussions` - Community discussions
- `/my-certificates` - Student certificates

### Backend (Supabase)

**Location:** `supabase/migrations/`

**Core Tables:**

```
programs → courses → modules → lessons
    ↓
enrollments → progress → assessments
    ↓
certificates ← user_roles
```

**Key Tables:**

- `programs` - Training programs (Barber, HVAC, etc.)
- `courses` - Individual courses within programs
- `modules` - Course sections
- `lessons` - Individual lessons with video/content
- `enrollments` - Student course registrations
- `assessments` - Quizzes and tests
- `certificates` - Earned credentials
- `user_roles` - Student/Staff/Admin roles

---

## 3. Integration Points

### A. Course Creation Integration

**Flow:**

```
Instructor Form → Task Queue → Autopilot Worker → AI Generation → Database → Notification
```

**Code Example:**

```typescript
// src/components/classroom/instructor/CourseCreationForm.tsx
const createCourse = async () => {
  // Queue autopilot task
  const { data } = await supabase.from('automation.tasks').insert({
    kind: 'gc_create_course',
    payload: { name, section, description },
    priority: 7,
    status: 'pending',
  });

  // Autopilot picks up task and generates course
};
```

**What Happens:**

1. Instructor submits course form
2. Task queued in `automation.tasks`
3. Autopilot worker picks up task
4. AI generates course outline (via Edge Function)
5. Creates course, modules, lessons in database
6. Instructor receives notification
7. Course appears in LMS

### B. Content Automation Integration

**Flow:**

```
Course Analysis → Gap Detection → Content Generation → Database Update → Review
```

**Code Example:**

```javascript
// src/lms/copilot-autopilot.js
async autoContentGeneration(courseId) {
  // Fetch course structure
  const { data: course } = await this.supabase
    .from('courses')
    .select('*, modules(*, lessons(*))')
    .eq('id', courseId);

  // Analyze for gaps
  const gaps = await this.analyzeContentGaps(course);

  // Generate missing content
  for (const gap of gaps) {
    if (gap.type === 'missing_lesson') {
      await this.generateLesson(gap, courseId);
    } else if (gap.type === 'missing_quiz') {
      await this.generateQuiz(gap, courseId);
    }
  }
}
```

**What It Does:**

- Detects missing lessons, quizzes, or content
- Generates content using templates or AI
- Inserts into database
- Flags for instructor review

### C. Student Engagement Integration

**Flow:**

```
Student Activity → Analysis → Intervention → Notification → Coach Update
```

**Code Example:**

```javascript
// src/lms/copilot-autopilot.js
async autoStudentEngagement() {
  // Find struggling students
  const { data: students } = await this.supabase
    .from('enrollments')
    .select('*, profiles(*), progress(*)')
    .lt('progress.completion_percent', 30)
    .lt('last_activity', 'now() - interval \'7 days\'');

  // Send encouragement
  for (const student of students) {
    await this.sendEncouragementEmail(student);
    await this.updateCoachPlan(student);
  }
}
```

**What It Does:**

- Monitors student progress and activity
- Identifies struggling or inactive students
- Sends automated encouragement emails
- Updates AI coach recommendations
- Notifies instructors if needed

### D. AI Course Generation Integration

**Flow:**

```
Task Queue → Edge Function → OpenAI/Anthropic → Course Structure → Database
```

**Code Example:**

```typescript
// supabase/functions/ai-course-create/index.ts
async function generateCourseOutline(request: CourseRequest) {
  // Call OpenAI to generate structure
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Generate a course outline for workforce training...'
    }]
  });

  // Parse response and create database records
  const outline = JSON.parse(completion.choices[0].message.content);

  // Insert course
  const { data: course } = await supabase
    .from('courses')
    .insert({ title: outline.title, ... });

  // Insert modules and lessons
  for (const module of outline.modules) {
    await supabase.from('modules').insert({ course_id: course.id, ... });
  }

  return course;
}
```

**What It Does:**

- Uses AI to generate complete course structures
- Creates courses, modules, lessons, quizzes
- Populates with initial content
- Flags for instructor review and customization

### E. Compliance Integration

**Flow:**

```
Scheduled Check → Regulation Fetch → Comparison → Auto-fix → Audit Log
```

**Code Example:**

```typescript
// src/services/ComplianceAutomation.ts
async checkFERPACompliance() {
  // Check privacy policy is up to date
  const policy = await this.fetchPrivacyPolicy();
  const regulations = await this.fetchFERPARegulations();

  // Compare and detect issues
  const issues = this.compareCompliance(policy, regulations);

  // Auto-fix if enabled
  if (this.config.autoFix) {
    for (const issue of issues) {
      await this.fixComplianceIssue(issue);
    }
  }

  // Log for audit
  await this.logComplianceCheck(issues);
}
```

**What It Does:**

- Monitors FERPA, WCAG, DOL, WIOA compliance
- Auto-fixes accessibility issues
- Updates policies automatically
- Maintains audit trail

---

## 4. Key Data Flows

### Course Creation Flow

```
┌─────────────────┐
│ Instructor Form │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Task Queue     │ ← automation.tasks table
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Autopilot Worker│ ← GitHub Actions or Edge Function
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AI Generation   │ ← OpenAI/Anthropic API
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database Insert │ ← courses, modules, lessons tables
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Notification   │ ← Email/In-app notification
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ LMS Dashboard   │ ← Course appears for instructor
└─────────────────┘
```

### Student Engagement Flow

```
┌─────────────────┐
│ Student Activity│ ← Lesson views, quiz attempts
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ LMS Database    │ ← progress, enrollments tables
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Autopilot Monitor│ ← Scheduled check every hour
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Analysis Engine │ ← Detect struggling students
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Auto-send Email │ ← Encouragement messages
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update Coach    │ ← AI coach recommendations
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Instructor Alert│ ← If intervention needed
└─────────────────┘
```

### Content Automation Flow

```
┌─────────────────┐
│ Course Analysis │ ← Scan course structure
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Gap Detection   │ ← Find missing lessons/quizzes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Template Select │ ← Choose appropriate template
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Content Gen     │ ← Generate using AI or templates
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database Update │ ← Insert new content
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Instructor Review│ ← Flag for approval
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Publish         │ ← Make available to students
└─────────────────┘
```

---

## 5. Shared Database Schema

Both systems use the same Supabase database:

```sql
-- LMS Tables
programs
courses
modules
lessons
enrollments
progress
assessments
certificates

-- Autopilot Tables
automation.tasks
automation.health_logs
automation.task_dependencies

-- Shared Tables
profiles (users)
user_roles (student/staff/admin)
```

**Cross-System Queries:**

```sql
-- Autopilot can query LMS data
SELECT c.title, COUNT(e.id) as enrollment_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
WHERE c.created_at > now() - interval '30 days';

-- LMS can trigger autopilot tasks
INSERT INTO automation.tasks (kind, payload, priority)
VALUES ('auto_content_gen', '{"course_id": "123"}', 7);
```

---

## 6. Configuration

### Enable/Disable Autopilot Features

**In Supabase:**

```sql
-- Store autopilot config
INSERT INTO automation.config (key, value)
VALUES
  ('autoContentGeneration', 'true'),
  ('autoStudentEngagement', 'true'),
  ('autoPerformanceOptimization', 'true');
```

**In Code:**

```javascript
// src/lms/copilot-autopilot.js
const config = {
  autoContentGeneration: true, // Enable/disable
  autoStudentEngagement: true,
  autoPerformanceOptimization: true,
  autoAssessmentCreation: false, // Disabled
  autoMarketingOptimization: false,
};
```

### API Keys

Stored securely in Supabase:

```sql
-- Store API keys
INSERT INTO automation.api_keys (service, key_encrypted)
VALUES ('openai', encrypt('sk-...'));
```

---

## 7. Monitoring & Debugging

### View Autopilot Tasks

```sql
-- See all pending tasks
SELECT * FROM automation.tasks
WHERE status = 'pending'
ORDER BY priority DESC, created_at ASC;

-- See failed tasks
SELECT * FROM automation.tasks
WHERE status = 'failed'
ORDER BY created_at DESC;

-- See task history for a course
SELECT * FROM automation.tasks
WHERE payload->>'course_id' = 'your-course-id'
ORDER BY created_at DESC;
```

### View Health Logs

```sql
-- See system health
SELECT * FROM automation.health_logs
ORDER BY checked_at DESC
LIMIT 10;

-- See errors
SELECT * FROM automation.health_logs
WHERE status = 'error'
ORDER BY checked_at DESC;
```

### GitHub Actions Logs

1. Go to repository → Actions tab
2. Click on workflow run
3. View logs for each step

---

## 8. Key Benefits of Integration

1. **Autonomous Operations** - System runs 24/7 with minimal human intervention
2. **Consistent Quality** - Auto-generated content follows templates and best practices
3. **Proactive Engagement** - Identifies and helps struggling students automatically
4. **Compliance Automation** - Stays compliant with regulations automatically
5. **Scalability** - Can handle thousands of courses and students
6. **Self-Healing** - Fixes its own errors and recovers from failures
7. **Audit Trail** - Complete logging for compliance and debugging

---

## 9. Future Enhancements

- [ ] Auto-generate certificate PDFs when course completed
- [ ] Auto-schedule live classes based on enrollment
- [ ] Auto-optimize course content based on student performance
- [ ] Auto-create marketing campaigns for new courses
- [ ] Auto-match students with employers based on skills
- [ ] Auto-generate compliance reports for regulators

---

## Summary

The Autopilot and LMS are **tightly integrated** through:

- **Shared database** (Supabase)
- **Task queue system** for async operations
- **AI-powered automation** for content and engagement
- **GitHub Actions** for infrastructure automation
- **Edge Functions** for serverless compute

This creates a **self-managing, self-healing workforce development platform** that requires minimal human intervention while maintaining high quality and compliance.
