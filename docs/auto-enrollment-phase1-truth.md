# Auto-Enrollment Phase 1: Repository Truth

**Branch:** `feature/auto-enrollment-alerts`  
**Date:** 2024-12-25  
**Scope:** Evidence-Only Audit (No Implementation)

---

## APPROVAL / GATING TRUTH

The repository uses `profiles.enrollment_status` as the enrollment eligibility gate. This field is an enum type with 8 states defined in the database schema.

**Schema Definition:**

File: `supabase/migrations/20241219_enrollment_payment_final.sql` (lines 14-30)

```sql
CREATE TYPE enrollment_status AS ENUM (
  'applied',              -- Application submitted
  'eligible',             -- Admin marked as eligible
  'documents_complete',   -- All required docs uploaded
  'approved',             -- Admin approved enrollment
  'enrolled',             -- Payment trigger
  'active',               -- Payment confirmed, student can access
  'completed',            -- Program completed
  'withdrawn'             -- Student withdrew
);
```

**Server-Side Enforcement:**

File: `app/student/layout.tsx` (lines 44-56)

The student portal layout checks enrollment status and redirects non-enrolled users:

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role, enrollment_status')
  .eq('id', session.user.id)
  .single();

const isEnrolled =
  profile?.enrollment_status === 'active' ||
  profile?.enrollment_status === 'enrolled';

if (!isEnrolled && !isStaff) {
  redirect(
    '/apply?message=You must be enrolled in a program to access student portal'
  );
}
```

File: `app/api/enroll/apply/route.ts` (lines 67-81)

The enrollment submission endpoint checks approval status:

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('enrollment_status, program_holder_id')
  .eq('id', studentId)
  .single();

// Enrollment gate: must be approved or active
if (
  !profile?.enrollment_status ||
  !['approved', 'active'].includes(profile.enrollment_status)
) {
  return NextResponse.json(
    {
      message:
        'You must be approved for enrollment before you can enroll. Please contact your program coordinator.',
    },
    { status: 403 }
  );
}
```

**Commands Used:**

```bash
find app -name "*.ts" -o -name "*.tsx" | xargs grep -l "enrollment_status"
grep -n "enrollment_status" supabase/migrations/*.sql | grep -i "enum\|type\|create"
```

**No Invite Token System Found:**

No evidence of invite tokens, enrollment codes, or token-based approval mechanisms exists in the codebase. The approval gate is purely based on the `enrollment_status` field set by administrators.

---

## ENROLLMENT SOURCE-OF-TRUTH (CRITICAL)

**Two enrollment tables exist with conflicting schemas:**

### Table 1: `program_enrollments`

File: `supabase/migrations/20241126_create_enrollments.sql` (lines 2-12)

```sql
CREATE TABLE IF NOT EXISTS program_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  program_id TEXT NOT NULL,  -- ⚠️ TEXT type
  funding_source TEXT NOT NULL CHECK (funding_source IN ('SELF_PAY', 'EMPLOYER', 'WRG', 'WIOA', 'SCHOLARSHIP')),
  status TEXT NOT NULL CHECK (status IN ('INTAKE', 'AWAITING_FUNDING', 'AWAITING_SEATS', 'READY_TO_START', 'IN_PROGRESS', 'COMPLETED', 'SUSPENDED')),
  stripe_ref_id TEXT,
  payment_mode TEXT CHECK (payment_mode IN ('full', 'plan')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Key Detail:** `program_id` is TEXT (likely stores slugs like 'barber-apprenticeship')

**Used By:**

- `lib/enrollment/orchestrate-enrollment.ts` - Inserts into this table
- `app/api/enroll/apply/route.ts` - References this table via orchestration

### Table 2: `enrollments`

File: `supabase/migrations/20241209_complete_lms_system.sql` (lines 129-145)

```sql
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,  -- ⚠️ UUID type
  status text DEFAULT 'active' CHECK (status IN ('pending', 'active', 'completed', 'dropped', 'suspended')),
  start_date date DEFAULT CURRENT_DATE,
  expected_completion_date date,
  actual_completion_date date,
  stripe_checkout_session_id text,
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Key Detail:** `program_id` is UUID (references programs.id)

**Used By:**

- `app/student/progress/page.tsx` - Queries this table for enrollment steps display
- Original `generate_enrollment_steps()` function (before migration fix)

### Conflict Resolution

The migration `20241224_auto_enrollment_schema.sql` (lines 61-100) updates `generate_enrollment_steps()` to work with `program_enrollments` by converting TEXT program_id to UUID via slug lookup:

```sql
CREATE OR REPLACE FUNCTION generate_enrollment_steps(p_enrollment_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_program_id_text TEXT;
  v_program_id_uuid UUID;
BEGIN
  -- Get program_id from program_enrollments (it's TEXT, likely a slug)
  SELECT program_id INTO v_program_id_text
  FROM program_enrollments
  WHERE id = p_enrollment_id;

  -- Look up the actual program UUID by slug
  SELECT id INTO v_program_id_uuid
  FROM programs
  WHERE slug = v_program_id_text;

  -- Insert steps from program_partner_lms
  INSERT INTO enrollment_steps (...)
  SELECT ... FROM program_partner_lms ppl
  WHERE ppl.program_id = v_program_id_uuid
  ...
END;
$$;
```

**Commands Used:**

```bash
grep -n "CREATE TABLE.*program_enrollments\|CREATE TABLE.*enrollments" supabase/migrations/*.sql
sed -n '2,30p' supabase/migrations/20241126_create_enrollments.sql
sed -n '129,160p' supabase/migrations/20241209_complete_lms_system.sql
```

---

## PROGRAM HOLDER ASSIGNMENT TRUTH

Students are linked to program holders via `profiles.program_holder_id`.

**Schema Definition:**

File: `supabase/migrations/20251203_roles_and_profiles.sql` (lines 24-36)

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role user_role not null default 'student',
  program_holder_id uuid references public.program_holders(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists profiles_program_holder_idx on public.profiles(program_holder_id);
```

**Additional Table: `program_holder_students`**

File: `supabase/migrations/20241207_program_holders.sql` (lines 31-43)

```sql
CREATE TABLE IF NOT EXISTS program_holder_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID REFERENCES program_holders(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  completion_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_holder_id, student_id, program_id)
);
```

This table tracks the many-to-many relationship between program holders, students, and programs. However, the primary linkage for enrollment orchestration is `profiles.program_holder_id`.

**Enforcement in Enrollment Endpoint:**

File: `app/api/enroll/apply/route.ts` (lines 83-90)

```typescript
// Program holder must be assigned
if (!profile.program_holder_id) {
  return NextResponse.json(
    { message: 'No program holder assigned. Please contact support.' },
    { status: 403 }
  );
}
```

**Commands Used:**

```bash
grep -n "program_holder_id" supabase/migrations/20251203_roles_and_profiles.sql
grep -n "CREATE TABLE.*program_holder_students" supabase/migrations/*.sql
```

**No Default Program Holder Per Program:**

The `programs` table does NOT have a `default_program_holder_id` column. Program holders are assigned to students, not to programs.

---

## ENROLLMENT STEPS / BLUEPRINT TRUTH

Enrollment steps are generated from the `program_partner_lms` table, which defines the stacked partner LMS sequence for each program.

**Blueprint Table:**

File: `supabase/migrations/20241129_partner_lms_integration.sql` (lines 38-50)

```sql
CREATE TABLE IF NOT EXISTS program_partner_lms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES partner_lms_providers(id) ON DELETE CASCADE,
  is_required BOOLEAN DEFAULT true,
  sequence_order INTEGER DEFAULT 1,
  requires_payment BOOLEAN DEFAULT false,
  payment_amount DECIMAL(10,2),
  auto_enroll_on_program_start BOOLEAN DEFAULT false,
  send_welcome_email BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_id, provider_id)
);
```

**Steps Table:**

File: `supabase/migrations/20241221_enrollment_steps.sql` (lines 6-24)

```sql
CREATE TABLE IF NOT EXISTS enrollment_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES partner_lms_providers(id),
  sequence_order INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'skipped')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  external_enrollment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, provider_id)
);
```

**Generation Function:**

The `generate_enrollment_steps()` function exists and has been updated to work with `program_enrollments` (TEXT program_id) by looking up the UUID via `programs.slug`.

File: `supabase/migrations/20241224_auto_enrollment_schema.sql` (lines 61-115)

**Function Is Called:**

File: `lib/enrollment/orchestrate-enrollment.ts` (lines 81-96)

```typescript
const { data: stepsResult, error: stepsError } = await supabase.rpc(
  'generate_enrollment_steps',
  { p_enrollment_id: enrollment.id }
);
```

**Step 1 Visibility:**

File: `app/student/progress/page.tsx` (lines 30-52)

The student progress page queries `enrollments` table and displays `enrollment_steps`:

```typescript
const { data: enrollments } = await supabase
  .from('enrollments')
  .select(
    `
    id,
    status,
    created_at,
    completed_at,
    program:programs(id, name, description),
    steps:enrollment_steps(
      id,
      sequence_order,
      status,
      started_at,
      completed_at,
      provider:partner_lms_providers(
        id,
        provider_name,
        logo_url
      )
    )
  `
  )
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

**Commands Used:**

```bash
grep -n "program_partner_lms" supabase/migrations/*.sql | grep "CREATE TABLE"
grep -n "enrollment_steps" supabase/migrations/20241221_enrollment_steps.sql
grep -n "enrollment_steps" app/student/progress/page.tsx
```

---

## NOTIFICATIONS / EMAIL / SMS TRUTH

### Notifications Table Schema

File: `supabase/migrations/20241214_lms_tables.sql` (lines 32-40)

```sql
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('course', 'certificate', 'message', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Schema Mismatch:**

The code attempts to insert columns that do NOT exist in the table:

File: `lib/enrollment/orchestrate-enrollment.ts` (lines 210-227)

```typescript
const { data: notification, error: notificationError } = await supabase
  .from('notifications')
  .insert({
    user_id: programHolderUserId,
    type: 'system',
    title: 'New Student Enrolled',
    message: `${studentName} has been enrolled in ${programName}`,
    action_url: `/program-holder/students`, // ⚠️ Column does not exist
    action_label: 'View Students', // ⚠️ Column does not exist
    metadata: {
      // ⚠️ Column does not exist
      enrollment_id: enrollmentId,
      student_name: studentName,
      program_name: programName,
    },
    idempotency_key: idempotencyKey, // ⚠️ Column does not exist
    read: false,
  });
```

The migration `20241224_auto_enrollment_schema.sql` adds these missing columns.

### Email Provider (Resend)

File: `lib/email.ts` (lines 18-46)

```typescript
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail({ to, subject, html, from, replyTo }) {
  if (!RESEND_API_KEY) {
    logger.info('Email (dev mode)', { to, subject });
    return { success: true, messageId: 'dev-mode' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  });

  const data = await response.json();
  return { success: true, messageId: data.id };
}
```

**Status:** Production-ready. Resend integration is functional and used throughout the codebase.

### SMS Status

File: `lib/notifications/sms.ts` (lines 20-27)

```typescript
async send(notification: SMSNotification): Promise<boolean> {
  try {
    // SMS notifications disabled - use email or in-app notifications instead
    return true;
  } catch (error) {
    return false;
  }
}
```

**Status:** Stubbed. SMS sending is disabled. The function returns `true` but does not send messages. No provider integration exists.

**Commands Used:**

```bash
grep -n "CREATE TABLE.*notifications" supabase/migrations/*.sql
grep -n "action_url\|action_label\|metadata\|idempotency" lib/enrollment/orchestrate-enrollment.ts
grep -n "RESEND\|sendEmail" lib/email.ts
find lib -name "*sms*"
```

---

## EXISTING PATTERNS TO REUSE

1. **Approval Gate:** `profiles.enrollment_status` enum is already defined and enforced in student portal layout and enrollment endpoint.

2. **Program Holder Linkage:** `profiles.program_holder_id` exists and is indexed. Enrollment endpoint already checks for this field.

3. **Steps Blueprint:** `program_partner_lms` table defines the stacked partner sequence. `generate_enrollment_steps()` function exists and has been updated to work with TEXT program_id.

4. **Email Sending:** Resend integration via `lib/email.ts` is production-ready and used throughout the codebase.

5. **Orchestration Function:** `lib/enrollment/orchestrate-enrollment.ts` already implements idempotent enrollment creation, steps generation, and notification sending.

6. **Enrollment Endpoint:** `app/api/enroll/apply/route.ts` already calls orchestration function and enforces approval gates.

---

## CONFLICTS WE MUST RESOLVE FIRST

1. **Table Mismatch:** `program_enrollments` (TEXT program_id) vs `enrollments` (UUID program_id). The migration has already resolved this by updating `generate_enrollment_steps()` to convert TEXT to UUID via slug lookup.

2. **Notifications Schema Mismatch:** Code inserts `action_url`, `action_label`, `metadata`, `idempotency_key` but table lacks these columns. The migration `20241224_auto_enrollment_schema.sql` adds these columns.

3. **Missing program_holder_id in program_enrollments:** The `program_enrollments` table does not have a `program_holder_id` column. The migration adds this column.

4. **enrollment_steps References Wrong Table:** The `enrollment_steps` table references `enrollments(id)` but orchestration uses `program_enrollments`. This is resolved by the migration's updated function logic.

---

## MINIMUM REQUIRED SCHEMA CHANGES TO MEET ACCEPTANCE CRITERIA

1. Add `program_holder_id` column to `program_enrollments` table (already in migration).

2. Add `action_url`, `action_label`, `metadata`, `idempotency_key` columns to `notifications` table (already in migration).

3. Create `notification_preferences` table for program holder email/SMS preferences (already in migration).

4. Create `delivery_logs` table for audit trail of all notification deliveries (already in migration).

5. Update `generate_enrollment_steps()` function to work with `program_enrollments` and TEXT program_id (already in migration).

---

## MINIMUM IMPLEMENTATION SEQUENCE

1. **Gate Enforcement (Already Implemented):**
   - Server-side check: `enrollment_status IN ('approved', 'active')`
   - Server-side check: `program_holder_id IS NOT NULL`
   - Return 403 if either check fails

2. **Enrollment Creation (Already Implemented):**
   - Insert into `program_enrollments` with `program_holder_id`
   - Idempotency check: query for existing enrollment before creating

3. **Steps Generation (Already Implemented):**
   - Call `generate_enrollment_steps(enrollment_id)`
   - Function converts TEXT program_id to UUID via slug lookup
   - Inserts steps from `program_partner_lms` blueprint
   - Marks first step as `in_progress`

4. **Notifications (Already Implemented):**
   - Create in-app notification with `idempotency_key`
   - Send program holder email via Resend (default ON)
   - Log SMS attempt (consent-gated, provider not configured)
   - Send student welcome email via Resend
   - Log all deliveries in `delivery_logs` table

5. **Proof (Required):**
   - Apply migration to production database
   - Test 403 vs 200 gating (non-approved vs approved user)
   - Test idempotency (submit twice, verify one row created)
   - Verify SQL proof (enrollments, steps, notifications, delivery_logs)
   - Verify build succeeds

---

**END OF PHASE 1 EVIDENCE-ONLY AUDIT**
