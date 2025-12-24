# Auto-Enrollment Phase 1: Repository Truth

**Branch:** `feature/auto-enrollment-alerts`  
**Date:** 2024-12-24  
**Scope:** Automatic Enrollment + Program Holder Alerts ONLY

---

## 1. APPROVAL / GATING TRUTH

### Existing Approval Mechanism

The repository uses `profiles.enrollment_status` as the enrollment gate. This field is checked in the student portal layout but **NOT enforced on enrollment routes**.

**Evidence:**

**File:** `/app/student/layout.tsx` (lines 44-52)

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

**File:** `/supabase/migrations/20241219_enrollment_payment_final.sql`

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

**Commands used:**

```bash
grep -r "enrollment_status" /workspaces/fix2/app/student/layout.tsx
grep -A 10 "CREATE TYPE enrollment_status" /workspaces/fix2/supabase/migrations/20241219_enrollment_payment_final.sql
```

### Enrollment Routes Requiring Gating

**File:** `/app/api/enroll/route.ts`

- Currently has auth check but NO enrollment_status verification
- Allows any authenticated user to enroll if they have a courseId

**File:** `/app/api/enroll/apply/route.ts`

- Creates `program_enrollments` with status 'INTAKE' for authenticated users
- No approval check before creating enrollment

**File:** `/app/enroll/page.tsx`

- Marketing page, no server-side gating

### No Invite Token System Found

**Commands used:**

```bash
grep -r "invite.*token\|enrollment.*token" /workspaces/fix2/supabase/migrations/*.sql
grep -r "can_enroll\|eligibility\|verified\|approved" /workspaces/fix2/supabase/migrations/*.sql | grep -i "column\|boolean"
```

**Finding:** No invite token tables or token validation logic exists. The only approval-related flag found is `can_enroll_students` on program holders (for program holders enrolling their students, not student self-enrollment).

### Who Sets enrollment_status (Critical Boundary)

**Commands used:**

```bash
grep -r "enrollment_status" app/api --include="*.ts" -B 2 -A 2 | grep -E "update|UPDATE|set|SET"
```

**Finding:** No code in `/app/api` currently sets or modifies `profiles.enrollment_status`. The field is read-only from the enrollment code's perspective.

**Conclusion:** `enrollment_status` is set externally today (manual admin action, staff UI, or external system integration). Enrollment code must treat `enrollment_status` as an immutable gate. Enrollment routes must READ this field to enforce approval, but must NOT modify it except after successful enrollment completion (transition to 'active').

This is a critical boundary: enrollment code does not approve students; it enforces approval decisions made elsewhere.

---

## 2. ENROLLMENT SOURCE-OF-TRUTH (CRITICAL)

### Table Mismatch Identified

**Two enrollment tables exist:**

1. **`program_enrollments`** (used by enrollment API routes)
2. **`enrollments`** (referenced by enrollment_steps functions and student progress UI)

### program_enrollments Table

**File:** `/supabase/migrations/20241126_create_enrollments.sql`

```sql
CREATE TABLE IF NOT EXISTS program_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  program_id TEXT NOT NULL,  -- ⚠️ TEXT, not UUID
  funding_source TEXT NOT NULL CHECK (funding_source IN ('SELF_PAY', 'EMPLOYER', 'WRG', 'WIOA', 'SCHOLARSHIP')),
  status TEXT NOT NULL CHECK (status IN ('INTAKE', 'AWAITING_FUNDING', 'AWAITING_SEATS', 'READY_TO_START', 'IN_PROGRESS', 'COMPLETED', 'SUSPENDED')),
  stripe_ref_id TEXT,
  payment_mode TEXT CHECK (payment_mode IN ('full', 'plan')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Used by:**

- `/app/api/enroll/apply/route.ts` - writes to this table
- Indexed on `program_id` as TEXT

### enrollments Table

**Evidence:** Multiple migrations reference `enrollments` table with `program_id UUID`:

```bash
grep -r "program_id.*UUID" /workspaces/fix2/supabase/migrations/*.sql | grep enrollments
```

**Output shows:**

- `/supabase/migrations/20241124_update_existing_schema.sql`: `ADD COLUMN IF NOT EXISTS program_id UUID REFERENCES programs(id)`
- Multiple other migrations use `program_id UUID REFERENCES programs(id)`

**Used by:**

- `/app/api/enroll/complete/route.ts` - writes to this table
- `/app/api/enroll/finalize-payment/route.ts` - writes to this table
- `/app/student/progress/page.tsx` - reads from this table
- `generate_enrollment_steps()` function - joins on this table

### program_id Type Conflict

**`program_enrollments.program_id`:** TEXT (likely stores slugs like 'barber-apprenticeship')

**`enrollments.program_id`:** UUID (references programs.id)

**`generate_enrollment_steps()` function expects:** UUID join to programs table

**Commands used:**

```bash
grep -B 5 -A 20 "CREATE TABLE.*program_enrollments" /workspaces/fix2/supabase/migrations/20241126_create_enrollments.sql
grep -A 30 "generate_enrollment_steps" /workspaces/fix2/supabase/migrations/20241221_enrollment_steps.sql
```

---

## 3. PROGRAM HOLDER ASSIGNMENT TRUTH

### profiles.program_holder_id Exists

**File:** `/supabase/migrations/20251203_roles_and_profiles.sql`

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  phone text,
  role user_role not null default 'student',
  program_holder_id uuid references program_holders(id),  -- ✅ Link exists
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index profiles_program_holder_idx on profiles(program_holder_id);
```

**RLS Policy:**

```sql
create policy "Program holders can read their learners"
  on profiles for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid()
      and p.role = 'program_holder'
      and p.program_holder_id = profiles.program_holder_id
    )
  );
```

### program_holder_students Table Exists and Is Used

**File:** `/supabase/migrations/20241207_program_holders.sql`

```sql
CREATE TABLE program_holder_students (
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

**Used by:**

- `/app/program-holder/students/page.tsx` - queries this table
- `/app/program-holder/compliance/page.tsx` - queries this table
- `/app/api/program-holder/students/decline/route.ts` - writes to this table

**Commands used:**

```bash
grep -r "program_holder_id" /workspaces/fix2/supabase/migrations/20251203_roles_and_profiles.sql
grep -r "program_holder_students" /workspaces/fix2/app --include="*.tsx" | head -10
```

### No Default Program Holder Per Program

**Commands used:**

```bash
grep -r "programs.*program_holder\|default_program_holder" /workspaces/fix2/supabase/migrations/*.sql
```

**Finding:** The `programs` table does NOT have a `program_holder_id` or `default_program_holder_id` column. Program holders are linked to students via `profiles.program_holder_id`, not to programs.

### program_enrollments Has No program_holder_id

**Finding:** The `program_enrollments` table does NOT store which program holder is responsible for the enrollment. This must be added.

---

## 4. ENROLLMENT STEPS / BLUEPRINT TRUTH

### program_partner_lms Blueprint Exists

**File:** `/supabase/migrations/20241129_partner_lms_integration.sql`

```sql
CREATE TABLE program_partner_lms (
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

**Finding:** This table defines the stacked partner steps for each program.

### generate_enrollment_steps() Function Exists

**File:** `/supabase/migrations/20241221_enrollment_steps.sql`

```sql
CREATE OR REPLACE FUNCTION generate_enrollment_steps(p_enrollment_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO enrollment_steps (enrollment_id, provider_id, sequence_order, status)
  SELECT
    p_enrollment_id,
    ppl.provider_id,
    ppl.sequence_order,
    'pending'
  FROM program_partner_lms ppl
  JOIN enrollments e ON e.program_id = ppl.program_id  -- ⚠️ Joins on enrollments, not program_enrollments
  WHERE e.id = p_enrollment_id
  AND ppl.is_required = true
  ORDER BY ppl.sequence_order
  ON CONFLICT (enrollment_id, provider_id) DO NOTHING;

  -- Mark first step as in_progress
  UPDATE enrollment_steps
  SET status = 'in_progress', started_at = NOW()
  WHERE enrollment_id = p_enrollment_id
  AND sequence_order = (SELECT MIN(sequence_order) FROM enrollment_steps WHERE enrollment_id = p_enrollment_id);

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

**Finding:** Function references `enrollments` table, not `program_enrollments`.

### Function Is Never Called

**Commands used:**

```bash
grep -r "generate_enrollment_steps" /workspaces/fix2/app /workspaces/fix2/lib --include="*.ts" --include="*.tsx"
```

**Output:** No results. The function exists but is never invoked in the enrollment flow.

### Step 1 Visibility in Student UI

**File:** `/app/student/progress/page.tsx`

```typescript
const { data: enrollments } = await supabase
  .from('enrollments') // ⚠️ Queries enrollments, not program_enrollments
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

**Finding:** Student progress page queries `enrollments` table and displays `enrollment_steps`. This is where Step 1 would be visible.

---

## 5. NOTIFICATIONS / EMAIL / SMS TRUTH

### notifications Table Schema

**File:** `/supabase/migrations/20241214_lms_tables.sql`

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('course', 'certificate', 'message', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Finding:**

- ❌ No `idempotency_key` column
- ❌ No `metadata` column (but code tries to insert it)
- ❌ No `action_url` or `action_label` columns (but code tries to insert them)
- ❌ No program holder notification types

### createNotification() Function

**File:** `/lib/notifications/notification-system.ts`

```typescript
export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string; // ⚠️ Not in schema
  actionLabel?: string; // ⚠️ Not in schema
  metadata?: Record<string, any>; // ⚠️ Not in schema
}): Promise<string | null> {
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      action_url: data.actionUrl, // ⚠️ Will fail
      action_label: data.actionLabel, // ⚠️ Will fail
      metadata: data.metadata || {}, // ⚠️ Will fail
      read: false,
    })
    .select('id')
    .single();

  return notification?.id || null;
}
```

**Finding:** Code expects columns that don't exist in the schema.

### Email Provider (Resend)

**File:** `/lib/email.ts`

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

**Finding:** ✅ Resend integration exists and is production-ready.

### SMS Status

**File:** `/lib/notifications/sms.ts`

```typescript
export class SMSService {
  async send(notification: SMSNotification): Promise<boolean> {
    try {
      // SMS notifications disabled - use email or in-app notifications instead
      return true;
    } catch (error) {
      return false;
    }
  }
}
```

**Finding:** ❌ SMS is stubbed out. No actual sending, no provider integration, no feature flags.

### No Program Holder Notification Infrastructure

**Commands used:**

```bash
grep -r "notification_preferences\|delivery_logs" /workspaces/fix2/supabase/migrations/*.sql
```

**Output:** No results.

**Finding:**

- ❌ No `notification_preferences` table
- ❌ No `delivery_logs` table
- ❌ No program holder notification types
- ❌ No email/SMS channel preferences
- ❌ No consent tracking

---

## EXISTING PATTERNS TO REUSE

1. **Approval Gate:** Use `profiles.enrollment_status` (already exists, already checked in student portal)
2. **Program Holder Link:** Use `profiles.program_holder_id` (already exists, already indexed)
3. **Steps Blueprint:** Use `program_partner_lms` table (already exists, already populated)
4. **Steps Generation:** Use `generate_enrollment_steps()` function (exists, needs table reference fix)
5. **Email Sending:** Use Resend via `/lib/email.ts` (production-ready)
6. **In-App Notifications:** Use `createNotification()` function (exists, needs schema alignment)
7. **Step Visibility:** Use `/app/student/progress/page.tsx` pattern (already displays enrollment_steps)

---

## CONFLICTS WE MUST RESOLVE FIRST

1. **Table Mismatch:** `program_enrollments` (TEXT program_id) vs `enrollments` (UUID program_id)
   - Enrollment API routes write to `program_enrollments`
   - Steps function and student UI read from `enrollments`
   - **Decision required:** Migrate to single source of truth

2. **Schema Mismatch:** `notifications` table missing columns that code expects
   - Code inserts `action_url`, `action_label`, `metadata`
   - Schema only has `user_id`, `type`, `title`, `message`, `read`, `created_at`
   - **Decision required:** Add missing columns or update code

3. **program_id Type:** TEXT vs UUID
   - `program_enrollments.program_id` is TEXT (likely slugs)
   - `generate_enrollment_steps()` expects UUID join to `programs.id`
   - **Decision required:** Convert TEXT to UUID or update function logic

4. **No program_holder_id in Enrollments:**
   - `program_enrollments` table has no `program_holder_id` column
   - Cannot assign program holder during enrollment creation
   - **Decision required:** Add column

---

## MINIMUM REQUIRED SCHEMA CHANGES TO MEET ACCEPTANCE CRITERIA

1. **Resolve enrollment table conflict:**
   - Option A: Migrate all routes to use `enrollments` table
   - Option B: Update `generate_enrollment_steps()` to use `program_enrollments`
   - Option C: Create bridge/view between tables

2. **Add `program_holder_id` to enrollment table** (whichever is source of truth)

3. **Fix `notifications` table schema:**
   - Add `action_url TEXT`
   - Add `action_label TEXT`
   - Add `metadata JSONB`
   - Add `idempotency_key TEXT UNIQUE`

4. **Create `notification_preferences` table:**
   - `program_holder_id UUID`
   - `email_enabled BOOLEAN DEFAULT TRUE`
   - `sms_enabled BOOLEAN DEFAULT FALSE`
   - `phone_e164 TEXT`
   - `sms_consent BOOLEAN DEFAULT FALSE`
   - `sms_consent_at TIMESTAMPTZ`
   - `sms_opt_out BOOLEAN DEFAULT FALSE`

5. **Create `delivery_logs` table:**
   - `notification_id UUID`
   - `channel TEXT` (email/sms)
   - `status TEXT` (sent/failed/bounced)
   - `provider_message_id TEXT`
   - `error_message TEXT`
   - `sent_at TIMESTAMPTZ`

6. **Resolve `program_id` type conflict:**
   - If keeping TEXT: Update `generate_enrollment_steps()` to join on slug
   - If converting to UUID: Migrate `program_enrollments.program_id` to UUID

---

## MINIMUM IMPLEMENTATION SEQUENCE

1. **Resolve table conflict** (must be first - everything depends on this)
   - Audit which table is actually used in production
   - Choose single source of truth
   - Update all code paths to use that table

2. **Add server-side enrollment gate**
   - Check `profiles.enrollment_status IN ('approved', 'active', 'enrolled')` before allowing enrollment
   - Return 403 if not approved
   - Apply to `/app/api/enroll/*` routes

3. **Add `program_holder_id` to enrollment creation**
   - Read from `profiles.program_holder_id`
   - Store in enrollment record
   - Fail enrollment if NULL (student must be assigned first)

4. **Wire up enrollment steps generation**
   - Call `generate_enrollment_steps()` after enrollment creation
   - Ensure function references correct table
   - Verify Step 1 is marked `in_progress`

5. **Create program holder notification system**
   - Add missing columns to `notifications` table
   - Create `notification_preferences` table
   - Create `delivery_logs` table
   - Implement idempotent notification creation
   - Send email via Resend (log in delivery_logs)
   - Stub SMS with feature flag

6. **Send student welcome email**
   - Use existing Resend integration
   - Include Step 1 link
   - Log send in delivery_logs

7. **Prove**
   - 403 vs 200 gating
   - Enrollment + steps created exactly once
   - Program holder notification created exactly once
   - Email logged
   - Build succeeds

---

**END OF PHASE 1 EVIDENCE-ONLY AUDIT**
