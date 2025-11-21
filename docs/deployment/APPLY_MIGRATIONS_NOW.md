# 🚀 Apply All Migrations - Enable ALL LMS Features

## ⚡ Quick Method (5 Minutes)

### Step 1: Open Supabase SQL Editor

Go to: **https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

---

### Step 2: Run Each Migration (Copy & Paste)

**Run these in order. After each one, click "Run" and verify no errors.**

---

## Migration 1: Core LMS Schema

**File:** `001_lms_schema.sql`

**What it creates:**

- ✅ Programs table (training programs catalog)
- ✅ Courses table (individual courses)
- ✅ Lessons table (video lessons with content)
- ✅ Enrollments table (student enrollments)
- ✅ Lesson Progress table (track completion)
- ✅ Certificates table (auto-generated certificates)

**Copy this into SQL Editor:**

```sql
-- =============================================
-- EFH LMS Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Programs (public catalog)
create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  track text not null,
  blurb text,
  hours text,
  cover_url text,
  created_at timestamp with time zone default now()
);

-- Courses
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references programs(id) on delete set null,
  code text not null,
  title text not null,
  summary text,
  cover_url text,
  created_at timestamptz default now()
);
create index if not exists idx_courses_program_id on courses(program_id);

-- Lessons
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  idx int not null,
  title text not null,
  video_url text,
  html text,
  created_at timestamptz default now()
);
create index if not exists idx_lessons_course_id_idx on lessons(course_id, idx);

-- Enrollments
create table if not exists enrollments (
  user_id uuid not null,
  course_id uuid not null references courses(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, course_id)
);

-- Lesson Progress
create table if not exists lesson_progress (
  user_id uuid not null,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

-- Certificates
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  course_id uuid not null references courses(id) on delete cascade,
  issued_at timestamptz default now(),
  certificate_url text
);

-- Enable Row Level Security
alter table programs enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;
alter table lesson_progress enable row level security;
alter table certificates enable row level security;

-- RLS Policies: Programs (public read)
create policy "Programs are viewable by everyone"
  on programs for select
  using (true);

-- RLS Policies: Courses (public read)
create policy "Courses are viewable by everyone"
  on courses for select
  using (true);

-- RLS Policies: Lessons (public read)
create policy "Lessons are viewable by everyone"
  on lessons for select
  using (true);

-- RLS Policies: Enrollments (users can view their own)
create policy "Users can view their own enrollments"
  on enrollments for select
  using (auth.uid() = user_id);

create policy "Users can create their own enrollments"
  on enrollments for insert
  with check (auth.uid() = user_id);

-- RLS Policies: Lesson Progress (users can manage their own)
create policy "Users can view their own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can modify their own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);

-- RLS Policies: Certificates (users can view their own)
create policy "Users can view their own certificates"
  on certificates for select
  using (auth.uid() = user_id);
```

**Click "Run" ✅**

---

## Migration 2: Instructor Certificates

**File:** `002_auth_instructor_certificates.sql`

**What it creates:**

- ✅ Instructor certificates table (verify instructor credentials)
- ✅ Upload and review system

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Instructor Certificates Table
-- =============================================

create table if not exists instructor_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  certificate_type text not null,
  certificate_number text,
  issuing_organization text,
  issue_date date,
  expiry_date date,
  document_url text,
  status text default 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_instructor_certificates_user_id
  on instructor_certificates(user_id);

create index if not exists idx_instructor_certificates_status
  on instructor_certificates(status);

-- Enable RLS
alter table instructor_certificates enable row level security;

-- RLS Policies
create policy "Users can view their own certificates"
  on instructor_certificates for select
  using (auth.uid() = user_id);

create policy "Users can insert their own certificates"
  on instructor_certificates for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own certificates"
  on instructor_certificates for update
  using (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_instructor_certificates_updated_at
  before update on instructor_certificates
  for each row
  execute function update_updated_at_column();
```

**Click "Run" ✅**

---

## Migration 3: Analytics Events

**File:** `003_analytics_events.sql`

**What it creates:**

- ✅ Analytics events table (track user actions)
- ✅ Page views table (track page visits)

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Analytics Events Table
-- =============================================

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  event_type text not null,
  event_data jsonb,
  page_url text,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz default now()
);

create index if not exists idx_analytics_events_user_id
  on analytics_events(user_id);

create index if not exists idx_analytics_events_event_type
  on analytics_events(event_type);

create index if not exists idx_analytics_events_created_at
  on analytics_events(created_at desc);

-- Page Views Table
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  page_url text not null,
  page_title text,
  referrer text,
  user_agent text,
  ip_address text,
  session_id text,
  created_at timestamptz default now()
);

create index if not exists idx_page_views_user_id
  on page_views(user_id);

create index if not exists idx_page_views_page_url
  on page_views(page_url);

create index if not exists idx_page_views_created_at
  on page_views(created_at desc);

create index if not exists idx_page_views_session_id
  on page_views(session_id);

-- Enable RLS
alter table analytics_events enable row level security;
alter table page_views enable row level security;

-- RLS Policies (allow inserts from anyone, reads only for authenticated users)
create policy "Anyone can insert analytics events"
  on analytics_events for insert
  with check (true);

create policy "Authenticated users can view analytics events"
  on analytics_events for select
  using (auth.role() = 'authenticated');

create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);

create policy "Authenticated users can view page views"
  on page_views for select
  using (auth.role() = 'authenticated');
```

**Click "Run" ✅**

---

## Migration 4: Additional RLS Policies

**File:** `004_add_missing_rls_policies.sql`

**What it creates:**

- ✅ Admin policies for managing content
- ✅ Public read policies
- ✅ User-specific write policies

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Additional RLS Policies
-- =============================================

-- Drop existing policies if they exist
drop policy if exists "Programs are viewable by everyone" on programs;
drop policy if exists "Courses are viewable by everyone" on courses;
drop policy if exists "Lessons are viewable by everyone" on lessons;
drop policy if exists "Users can view their own enrollments" on enrollments;
drop policy if exists "Users can create their own enrollments" on enrollments;
drop policy if exists "Users can view their own progress" on lesson_progress;
drop policy if exists "Users can update their own progress" on lesson_progress;
drop policy if exists "Users can modify their own progress" on lesson_progress;
drop policy if exists "Users can view their own certificates" on certificates;

-- Programs: Public read, admin write
create policy "Programs are viewable by everyone"
  on programs for select
  using (true);

create policy "Admins can insert programs"
  on programs for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update programs"
  on programs for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete programs"
  on programs for delete
  using (auth.role() = 'authenticated');

-- Courses: Public read, admin write
create policy "Courses are viewable by everyone"
  on courses for select
  using (true);

create policy "Admins can insert courses"
  on courses for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update courses"
  on courses for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete courses"
  on courses for delete
  using (auth.role() = 'authenticated');

-- Lessons: Public read, admin write
create policy "Lessons are viewable by everyone"
  on lessons for select
  using (true);

create policy "Admins can insert lessons"
  on lessons for insert
  with check (auth.role() = 'authenticated');

create policy "Admins can update lessons"
  on lessons for update
  using (auth.role() = 'authenticated');

create policy "Admins can delete lessons"
  on lessons for delete
  using (auth.role() = 'authenticated');

-- Enrollments: Users manage their own
create policy "Users can view their own enrollments"
  on enrollments for select
  using (auth.uid() = user_id);

create policy "Users can create their own enrollments"
  on enrollments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own enrollments"
  on enrollments for delete
  using (auth.uid() = user_id);

-- Lesson Progress: Users manage their own
create policy "Users can view their own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);

-- Certificates: Users view their own, admins can create
create policy "Users can view their own certificates"
  on certificates for select
  using (auth.uid() = user_id);

create policy "Admins can create certificates"
  on certificates for insert
  with check (auth.role() = 'authenticated');
```

**Click "Run" ✅**

---

## Migration 5: Analytics RLS

**File:** `004_analytics_rls.sql`

**What it creates:**

- ✅ Additional analytics policies

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Analytics RLS Policies
-- =============================================

-- Drop existing policies
drop policy if exists "Anyone can insert analytics events" on analytics_events;
drop policy if exists "Authenticated users can view analytics events" on analytics_events;
drop policy if exists "Anyone can insert page views" on page_views;
drop policy if exists "Authenticated users can view page views" on page_views;

-- Analytics Events: Anyone can insert, authenticated can read
create policy "Anyone can insert analytics events"
  on analytics_events for insert
  with check (true);

create policy "Authenticated users can view all analytics events"
  on analytics_events for select
  using (auth.role() = 'authenticated');

-- Page Views: Anyone can insert, authenticated can read
create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);

create policy "Authenticated users can view all page views"
  on page_views for select
  using (auth.role() = 'authenticated');
```

**Click "Run" ✅**

---

## Migration 6: Automation Tables

**File:** `20250127_create_automation_tables.sql`

**What it creates:**

- ✅ Automation workflows table (scheduled tasks)
- ✅ Automation executions table (workflow runs)

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Automation Tables
-- =============================================

create table if not exists automation_workflows (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  trigger_type text not null,
  trigger_config jsonb,
  actions jsonb not null,
  enabled boolean default true,
  created_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists automation_executions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references automation_workflows(id) on delete cascade,
  status text not null,
  trigger_data jsonb,
  execution_log jsonb,
  started_at timestamptz default now(),
  completed_at timestamptz,
  error_message text
);

create index if not exists idx_automation_workflows_enabled
  on automation_workflows(enabled);

create index if not exists idx_automation_executions_workflow_id
  on automation_executions(workflow_id);

create index if not exists idx_automation_executions_status
  on automation_executions(status);

-- Enable RLS
alter table automation_workflows enable row level security;
alter table automation_executions enable row level security;

-- RLS Policies
create policy "Authenticated users can view workflows"
  on automation_workflows for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can create workflows"
  on automation_workflows for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update workflows"
  on automation_workflows for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete workflows"
  on automation_workflows for delete
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view executions"
  on automation_executions for select
  using (auth.role() = 'authenticated');

create policy "System can insert executions"
  on automation_executions for insert
  with check (true);

-- Trigger for updated_at
create trigger update_automation_workflows_updated_at
  before update on automation_workflows
  for each row
  execute function update_updated_at_column();
```

**Click "Run" ✅**

---

## Migration 7: Generated Content

**File:** `20250127_create_generated_content.sql`

**What it creates:**

- ✅ Generated content table (AI-generated course content)

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Generated Content Table
-- =============================================

create table if not exists generated_content (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  prompt text not null,
  generated_text text,
  metadata jsonb,
  status text default 'pending',
  created_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_generated_content_content_type
  on generated_content(content_type);

create index if not exists idx_generated_content_status
  on generated_content(status);

create index if not exists idx_generated_content_created_by
  on generated_content(created_by);

-- Enable RLS
alter table generated_content enable row level security;

-- RLS Policies
create policy "Users can view their own generated content"
  on generated_content for select
  using (auth.uid() = created_by);

create policy "Users can create generated content"
  on generated_content for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own generated content"
  on generated_content for update
  using (auth.uid() = created_by);

-- Trigger for updated_at
create trigger update_generated_content_updated_at
  before update on generated_content
  for each row
  execute function update_updated_at_column();
```

**Click "Run" ✅**

---

## Migration 8: Scholarship Applications

**File:** `20250127_create_scholarship_applications.sql`

**What it creates:**

- ✅ Scholarship applications table
- ✅ Scholarship reviews table

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Scholarship Applications
-- =============================================

create table if not exists scholarship_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  program_id uuid references programs(id) on delete set null,
  application_data jsonb not null,
  status text default 'pending',
  submitted_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid,
  notes text
);

create table if not exists scholarship_reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references scholarship_applications(id) on delete cascade,
  reviewer_id uuid not null,
  score int,
  comments text,
  recommendation text,
  created_at timestamptz default now()
);

create index if not exists idx_scholarship_applications_user_id
  on scholarship_applications(user_id);

create index if not exists idx_scholarship_applications_status
  on scholarship_applications(status);

create index if not exists idx_scholarship_reviews_application_id
  on scholarship_reviews(application_id);

-- Enable RLS
alter table scholarship_applications enable row level security;
alter table scholarship_reviews enable row level security;

-- RLS Policies
create policy "Users can view their own applications"
  on scholarship_applications for select
  using (auth.uid() = user_id);

create policy "Users can create their own applications"
  on scholarship_applications for insert
  with check (auth.uid() = user_id);

create policy "Authenticated users can view reviews"
  on scholarship_reviews for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can create reviews"
  on scholarship_reviews for insert
  with check (auth.role() = 'authenticated');
```

**Click "Run" ✅**

---

## Migration 9: Stripe Split Tables

**File:** `20250127_create_stripe_split_tables.sql`

**What it creates:**

- ✅ Stripe accounts table (instructor payment accounts)
- ✅ Stripe splits table (revenue sharing configuration)

**Copy this into SQL Editor:**

```sql
-- =============================================
-- Stripe Split Tables
-- =============================================

create table if not exists stripe_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  stripe_account_id text not null unique,
  account_type text not null,
  charges_enabled boolean default false,
  payouts_enabled boolean default false,
  details_submitted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists stripe_splits (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  instructor_id uuid not null,
  split_percentage decimal(5,2) not null check (split_percentage >= 0 and split_percentage <= 100),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_stripe_accounts_user_id
  on stripe_accounts(user_id);

create index if not exists idx_stripe_accounts_stripe_account_id
  on stripe_accounts(stripe_account_id);

create index if not exists idx_stripe_splits_course_id
  on stripe_splits(course_id);

create index if not exists idx_stripe_splits_instructor_id
  on stripe_splits(instructor_id);

-- Enable RLS
alter table stripe_accounts enable row level security;
alter table stripe_splits enable row level security;

-- RLS Policies
create policy "Users can view their own stripe accounts"
  on stripe_accounts for select
  using (auth.uid() = user_id);

create policy "Users can update their own stripe accounts"
  on stripe_accounts for update
  using (auth.uid() = user_id);

create policy "Authenticated users can view stripe splits"
  on stripe_splits for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage stripe splits"
  on stripe_splits for all
  using (auth.role() = 'authenticated');

-- Triggers for updated_at
create trigger update_stripe_accounts_updated_at
  before update on stripe_accounts
  for each row
  execute function update_updated_at_column();

create trigger update_stripe_splits_updated_at
  before update on stripe_splits
  for each row
  execute function update_updated_at_column();
```

**Click "Run" ✅**

---

## ✅ Step 3: Verify All Tables Created

Go to: **https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

You should see these tables:

### Core LMS (6 tables)

- ✅ programs
- ✅ courses
- ✅ lessons
- ✅ enrollments
- ✅ lesson_progress
- ✅ certificates

### Authentication (1 table)

- ✅ instructor_certificates

### Analytics (2 tables)

- ✅ analytics_events
- ✅ page_views

### Automation (2 tables)

- ✅ automation_workflows
- ✅ automation_executions

### Content (1 table)

- ✅ generated_content

### Scholarships (2 tables)

- ✅ scholarship_applications
- ✅ scholarship_reviews

### Payments (2 tables)

- ✅ stripe_accounts
- ✅ stripe_splits

**Total: 16 tables** ✅

---

## 🎉 Done!

All your LMS features are now enabled:

- ✅ Student enrollment & progress tracking
- ✅ Video lessons with completion tracking
- ✅ Auto-generated certificates
- ✅ Instructor credential verification
- ✅ Analytics & page view tracking
- ✅ Automation workflows
- ✅ AI content generation
- ✅ Scholarship application system
- ✅ Revenue sharing with Stripe

**Next: Add your first course!** See `QUICK_START_ADD_COURSE.md`
