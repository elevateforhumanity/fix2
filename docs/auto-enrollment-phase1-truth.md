# Auto-Enrollment Phase 1 Truth Document

## APPROVAL / GATING TRUTH

### Current Approval Mechanism

The repo uses `profiles.enrollment_status` as a gate for student portal access, but this field does NOT exist in the profiles table schema.

**Evidence from app/student/layout.tsx (lines 44-53):**

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role, enrollment_status')
  .eq('id', session.user.id)
  .single();

const isEnrolled =
  profile?.enrollment_status === 'active' ||
  profile?.enrollment_status === 'enrolled';
```

**Evidence from supabase/migrations/20251203_roles_and_profiles.sql (lines 21-29):**

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
```

No `enrollment_status` column exists in the profiles table DDL. The code attempts to read a field that does not exist in the schema.

**Actual enrollment enforcement locations:**

- app/student/layout.tsx attempts to read profiles.enrollment_status (field does not exist)
- app/api/webhooks/stripe/route.ts sets enrollment_status: 'pending' (unknown destination)
- No server-side API routes enforce enrollment_status before allowing enrollment actions

**Existing enrollment API routes:**

- app/api/enroll/route.ts - creates enrollments via completeEnrollment() function
- app/api/enroll/auto/route.ts - creates auth user, profile, and enrollment record with status='active'
- app/api/enroll/apply/route.ts - application submission
- app/api/enroll/complete/route.ts - finalization logic
- app/api/enroll/checkout/route.ts - Stripe checkout creation

None of these routes check profiles.enrollment_status before proceeding.

## ENROLLMENT SOURCE-OF-TRUTH

### Two Conflicting Tables

The repo has TWO enrollment tables with incompatible schemas:

**Table 1: program_enrollments (supabase/migrations/20241126_create_enrollments.sql, lines 2-11):**

```sql
CREATE TABLE IF NOT EXISTS program_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  program_id TEXT NOT NULL,  -- TEXT, not UUID
  funding_source TEXT NOT NULL CHECK (funding_source IN ('SELF_PAY', 'EMPLOYER', 'WRG', 'WIOA', 'SCHOLARSHIP')),
  status TEXT NOT NULL CHECK (status IN ('INTAKE', 'AWAITING_FUNDING', 'AWAITING_SEATS', 'READY_TO_START', 'IN_PROGRESS', 'COMPLETED', 'SUSPENDED')),
  stripe_ref_id TEXT,
  payment_mode TEXT CHECK (payment_mode IN ('full', 'plan')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Table 2: enrollments (supabase/migrations/20241209_complete_lms_system.sql, lines 129-148):**

```sql
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,  -- UUID with FK
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

**Critical conflict:**

- program_enrollments.program_id is TEXT (likely stores slug or code)
- enrollments.program_id is UUID with foreign key to programs(id)

**Code usage evidence:**

- app/api/enroll/auto/route.ts (line 115) inserts into enrollments table with program.id (UUID)
- app/student/progress/page.tsx (line 28) queries enrollments table
- supabase/migrations/20241221_enrollment_steps.sql (line 7) references enrollments(id) for FK

The enrollments table (UUID-based) is the active source-of-truth. The program_enrollments table (TEXT-based) appears to be legacy or unused.

**Verification command used:**

```bash
grep -rn "program_id.*uuid\|program_id.*TEXT" supabase/migrations/20241126_create_enrollments.sql supabase/migrations/20241209_complete_lms_system.sql
```

## PROGRAM HOLDER ASSIGNMENT TRUTH

### Existing Association Mechanism

Students are linked to program holders via the program_holder_students junction table.

**Evidence from supabase/migrations/20241207_program_holders.sql (lines 31-44):**

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

**Evidence from app/api/program-holder/students/accept/route.ts (lines 56-63):**

```typescript
const { data: enrollment, error: enrollmentError } = await supabase
  .from('program_holder_students')
  .select('*')
  .eq('id', enrollment_id)
  .eq('program_holder_id', programHolder.id)
  .single();
```

**profiles.program_holder_id usage:**

- supabase/migrations/20251203_roles_and_profiles.sql (line 26) defines program_holder_id column
- Used to identify which program holder a user belongs to
- Does NOT automatically link students to program holders

**Current workflow:**

1. Program holder user has profiles.program_holder_id set
2. Students are manually linked via program_holder_students table
3. No automatic assignment of students to program holders on enrollment

No default_program_holder_id mechanism exists in the repo.

## ENROLLMENT STEPS / BLUEPRINT TRUTH

### Steps Automation Infrastructure

The repo has a complete steps automation system that references program_partner_lms as the blueprint source.

**Evidence from supabase/migrations/20241221_enrollment_steps.sql (lines 6-25):**

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

**Evidence from supabase/migrations/20241221_enrollment_steps.sql (lines 79-106):**

```sql
CREATE OR REPLACE FUNCTION generate_enrollment_steps(p_enrollment_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO enrollment_steps (
    enrollment_id,
    provider_id,
    sequence_order,
    status
  )
  SELECT
    p_enrollment_id,
    ppl.provider_id,
    ppl.sequence_order,
    'pending'
  FROM program_partner_lms ppl
  JOIN enrollments e ON e.program_id = ppl.program_id
  WHERE e.id = p_enrollment_id
  AND ppl.is_required = true
  ORDER BY ppl.sequence_order
  ON CONFLICT (enrollment_id, provider_id) DO NOTHING;
```

**Blueprint source table (supabase/migrations/20241129_partner_lms_integration.sql, lines 38-50):**

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

**Function is NOT called anywhere in application code:**

```bash
grep -rn "generate_enrollment_steps" app/ lib/ --include="*.ts" --include="*.tsx"
# No results
```

**Student UI visibility:**

- app/student/progress/page.tsx (lines 28-48) queries enrollment_steps and displays them
- UI exists and is functional
- Steps are displayed with provider name, sequence order, and status
- No code currently calls generate_enrollment_steps() to populate the steps

## NOTIFICATIONS / EMAIL / SMS TRUTH

### Email Infrastructure (Active)

**Resend integration exists and is functional:**

- lib/email/resend.ts exports sendEmail() and sendWelcomeEmail()
- Uses RESEND_API_KEY environment variable
- Evidence from lib/email/resend.ts (lines 1-5):

```typescript
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
```

**Email usage in enrollment flow:**

- app/api/enroll/auto/route.ts (lines 162-172) sends password reset email for new users
- app/api/enroll/complete/route.ts (line 200) imports sendWelcomeEmail
- Multiple API routes use sendEmail() from lib/email/resend.ts

### SMS Infrastructure (Stubbed)

**SMS is disabled and stubbed:**

- lib/notifications/sms.ts exports SMSService class
- All send() methods return true without sending
- Evidence from lib/notifications/sms.ts (lines 20-26):

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

**No SMS consent mechanism exists:**

```bash
grep -rn "consent\|opt.in\|opt_in" supabase/migrations/*.sql | grep -i "sms\|phone\|text"
# No results related to SMS consent
```

### Notifications Table

**Evidence from supabase/migrations/20241214_lms_tables.sql (lines 32-40):**

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

**Schema supports:**

- In-app notifications only
- No email_sent, sms_sent, or delivery tracking columns
- No channel preference columns

**Code attempts to insert notifications but schema may not match:**

- Multiple routes reference notifications table
- No evidence of systematic notification creation on enrollment events

---

## EXISTING PATTERNS TO REUSE

1. **Enrollment creation via enrollments table** - app/api/enroll/auto/route.ts demonstrates complete flow: create auth user, create profile, create enrollment with status='active', send password reset email.

2. **Program holder student linking** - program_holder_students table with accept/decline workflow exists and is functional (app/api/program-holder/students/accept/route.ts).

3. **Email via Resend** - lib/email/resend.ts provides working sendEmail() and sendWelcomeEmail() functions.

4. **Steps display UI** - app/student/progress/page.tsx queries and displays enrollment_steps with provider details.

5. **Steps state machine functions** - generate_enrollment_steps(), mark_step_complete(), advance_to_next_step() exist in database.

## CONFLICTS WE MUST RESOLVE FIRST

1. **profiles.enrollment_status does not exist** - app/student/layout.tsx attempts to read a non-existent column. Must either add the column or remove the check.

2. **Two enrollment tables with incompatible program_id types** - program_enrollments uses TEXT, enrollments uses UUID. Must clarify which is source-of-truth and deprecate the other.

3. **generate_enrollment_steps() is never called** - Function exists but no code invokes it. Must determine when to call it (on enrollment creation, on approval, manually).

4. **No approval gate before enrollment** - app/api/enroll/auto/route.ts creates enrollments with status='active' immediately. No program holder approval step exists in the flow.

5. **Notifications table schema vs code expectations** - Code may attempt to insert fields that don't exist in the notifications table.

## MINIMUM REQUIRED SCHEMA CHANGES

1. **Add profiles.enrollment_status column** - Required for existing gate logic to function. Suggested values: 'pending', 'approved', 'active', 'suspended', 'completed'.

2. **Deprecate program_enrollments table** - Rename to program_enrollments_legacy or drop entirely. All code uses enrollments table.

3. **Add notification delivery tracking** - Add columns: channel (email/sms/in_app), sent_at, delivered_at, error_message to notifications table.

4. **Add program_holder_id to enrollments table** - Link enrollments directly to program holder for faster queries. Denormalize from program_holder_students.

## MINIMUM IMPLEMENTATION SEQUENCE

1. **Gate: Add profiles.enrollment_status column** - Migration to add column with default 'pending'. Update app/student/layout.tsx to check this field.

2. **Enrollment: Modify app/api/enroll/auto/route.ts** - Set enrollment status to 'pending' instead of 'active'. Set profiles.enrollment_status to 'pending'.

3. **Steps: Call generate_enrollment_steps() on enrollment creation** - Add function call in enrollment API after insert. Requires program_partner_lms records to exist for the program.

4. **Notifications: Create notification records on enrollment** - Insert into notifications table with type='system', title='Enrollment Pending Approval', message with program holder contact info.

5. **Proof: Query enrollments, enrollment_steps, notifications tables** - Verify records exist with correct status values and relationships.
