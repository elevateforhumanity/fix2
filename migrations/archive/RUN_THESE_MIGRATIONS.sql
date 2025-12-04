-- ============================================================
-- ELEVATE FOR HUMANITY - REQUIRED DATABASE MIGRATIONS
-- ============================================================
-- Run these in your Supabase SQL Editor in this exact order
-- Copy each section and run separately, checking for success
-- ============================================================

-- ============================================================
-- MIGRATION 1: APPLICATIONS TABLE
-- ============================================================
-- This table stores all program applications from /apply page
-- Run this FIRST

create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,

  program_id text not null,
  preferred_start text,
  heard_about_us text,

  youth boolean default false,
  reentry boolean default false,

  interested_in_jri boolean default true,
  interested_in_wex boolean default false,
  interested_in_ojt boolean default false,

  needs_support jsonb default '[]'::jsonb,

  status text not null default 'submitted'
);

-- Enable Row Level Security
alter table public.applications enable row level security;

-- Create policy to allow all operations (adjust later for security)
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'applications' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.applications
      for all using (true)
      with check (true);
  end if;
end
$$;

-- Create index for faster lookups
create index if not exists applications_email_idx on public.applications(email);
create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_created_at_idx on public.applications(created_at desc);

-- ✅ MIGRATION 1 COMPLETE
-- Verify by running: SELECT * FROM public.applications LIMIT 1;

-- ============================================================
-- MIGRATION 2: ENROLLMENTS TABLE
-- ============================================================
-- This table tracks paid enrollments and Stripe payments
-- Run this SECOND (after applications table exists)

create extension if not exists "pgcrypto";

-- Add payment_status to applications table
alter table if exists public.applications
  add column if not exists payment_status text not null default 'pending';

-- Create enrollments table
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  application_id uuid,
  program_id text not null,
  email text not null,

  stripe_checkout_session_id text,
  stripe_payment_link_id text,
  stripe_customer_id text,

  status text not null default 'active',
  source text default 'stripe-payment-link'
);

-- Enable Row Level Security
alter table public.enrollments enable row level security;

-- Create policy
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'enrollments' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.enrollments
      for all using (true)
      with check (true);
  end if;
end
$$;

-- Create indexes
create index if not exists enrollments_email_idx on public.enrollments(email);
create index if not exists enrollments_program_id_idx on public.enrollments(program_id);
create index if not exists enrollments_status_idx on public.enrollments(status);
create index if not exists enrollments_stripe_session_idx on public.enrollments(stripe_checkout_session_id);

-- ✅ MIGRATION 2 COMPLETE
-- Verify by running: SELECT * FROM public.enrollments LIMIT 1;

-- ============================================================
-- MIGRATION 3: STUDENT COURSES TABLE
-- ============================================================
-- This table controls which courses students can access in LMS
-- Run this THIRD (after applications and enrollments exist)

create extension if not exists "pgcrypto";

create table if not exists public.student_courses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  program_id text not null,
  course_slug text not null,

  enrollment_id uuid,
  source text default 'stripe-webhook',

  unique (email, program_id, course_slug)
);

-- Enable Row Level Security
alter table public.student_courses enable row level security;

-- Create policy
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'student_courses' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.student_courses
      for all using (true)
      with check (true);
  end if;
end
$$;

-- Create indexes
create index if not exists student_courses_email_idx on public.student_courses(email);
create index if not exists student_courses_program_id_idx on public.student_courses(program_id);
create index if not exists student_courses_enrollment_id_idx on public.student_courses(enrollment_id);

-- ✅ MIGRATION 3 COMPLETE
-- Verify by running: SELECT * FROM public.student_courses LIMIT 1;

-- ============================================================
-- VERIFICATION QUERY
-- ============================================================
-- Run this to confirm all 3 tables were created successfully

SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name AND table_schema = 'public') as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('applications', 'enrollments', 'student_courses')
ORDER BY table_name;

-- Expected result: 3 rows showing all tables with their column counts
-- applications: ~15 columns
-- enrollments: ~10 columns  
-- student_courses: ~7 columns

-- ============================================================
-- ✅ ALL MIGRATIONS COMPLETE!
-- ============================================================
-- Your database is now ready for:
-- - Accepting applications via /apply
-- - Processing enrollments via Stripe
-- - Granting LMS course access to students
-- ============================================================
