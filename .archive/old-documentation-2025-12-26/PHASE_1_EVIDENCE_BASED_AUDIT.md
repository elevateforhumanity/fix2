# PHASE 1: EVIDENCE-BASED AUDIT REPORT

## Automatic Enrollment + Program Holder Alerts

**Branch:** `feature/auto-enrollment-alerts`  
**Date:** 2024-12-24  
**Methodology:** Repository pattern discovery before architectural decisions

---

## 1. AUTH + GATING PATTERNS (EXISTING)

### Middleware Auth Check

**File:** `/middleware-backup.ts` (root level)

```typescript
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...);
  const { data: { user } } = await supabase.auth.getUser();

  // Email verification enforcement
  if (user && !user.email_confirmed_at) {
    const protectedPaths = ['/student', '/instructor', '/admin', '/lms'];
    const isProtectedPath = protectedPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    );
    if (isProtectedPath && !request.nextUrl.pathname.startsWith('/auth/verify-email')) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url));
    }
  }
  return response;
}
```

**Finding:** Middleware enforces email verification for protected paths but does NOT check enrollment approval or eligibility.

### Role-Based Access

**File:** `/lib/auth.ts`

```typescript
export async function getCurrentUser() {
  const session = await getSession();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  return { ...session.user, profile };
}

export async function getUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser();
  return user?.profile?.role || null;
}
```

**Roles found in code:**

- `student`
- `program_holder`
- `instructor`
- `admin`
- `staff`
- `vita_staff`
- `supersonic_staff`
- `grant_client`

**File:** `/supabase/migrations/20251203_roles_and_profiles.sql`

```sql
create type user_role as enum (
  'student',
  'program_holder',
  'instructor',
  'admin',
  'vita_staff',
  'supersonic_staff',
  'grant_client'
);

create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  phone text,
  role user_role not null default 'student',
  program_holder_id uuid references program_holders(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Finding:** Role system exists. Students have `role='student'` and can be linked to a `program_holder_id`.

### Student Portal Gating

**File:** `/app/student/layout.tsx`

```typescript
export default async function StudentLayout({ children }) {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirect=/student/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, enrollment_status')
    .eq('id', session.user.id)
    .single();

  const allowedRoles = ['student', 'instructor', 'admin', 'staff'];
  const isEnrolled = profile?.enrollment_status === 'active' ||
                     profile?.enrollment_status === 'enrolled';
  const isStaff = allowedRoles.includes(profile?.role);

  if (!isEnrolled && !isStaff) {
    redirect('/apply?message=You must be enrolled in a program to access student portal');
  }

  return <>{children}</>;
}
```

**Finding:** Student portal checks `enrollment_status` field in profiles table. This is the existing enrollment gate.

### Existing Approval Flags

**File:** `/supabase/migrations/20241207_program_holder_flexible_permissions.sql`

```sql
can_enroll_students BOOLEAN DEFAULT false
```

**Finding:** Program holders have a `can_enroll_students` permission flag, but this is for program holders enrolling their students, not for student self-enrollment approval.

### NO INVITE TOKEN SYSTEM FOUND

- ❌ No `enrollment_invites` table
- ❌ No `student_invites` table
- ❌ No token validation in any enrollment route
- ❌ No `approved_for_enrollment` flag in profiles
- ❌ No `can_enroll` boolean in profiles

**CONCLUSION:** The repo uses `enrollment_status` in profiles as the enrollment gate, NOT invite tokens.

---

## 2. ENROLLMENT ENTRY POINTS (EXISTING)

### Application Flow (Not Enrollment)

**File:** `/app/apply/page.tsx` → redirects to `/app/apply/full`

**File:** `/app/apply/full/page.tsx`

- Renders `WIOAApplicationForm` component
- Submits to `/api/inquiries` (creates inquiry, not enrollment)
- This is pre-approval application, not enrollment

**File:** `/app/apply/ApplyFormClient.tsx`

```typescript
const response = await fetch('/api/inquiries', {
  method: 'POST',
  body: JSON.stringify({ name, email, phone, program, message, state_code }),
});
```

**Finding:** `/apply` routes create inquiries/applications, not enrollments.

### Enrollment Routes

**File:** `/app/enroll/page.tsx`

- Marketing page with "Apply for Free Training" button
- Links to `/contact` (not actual enrollment)
- ❌ No server-side gating

**File:** `/app/api/enroll/route.ts`

```typescript
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user && courseId) {
    const result = await completeEnrollment({
      userId: user.id,
      courseId,
      programId: programCode,
      paymentStatus: 'pending',
    });
    return NextResponse.json({ ok: true, enrollmentId: result.enrollmentId });
  }

  // Non-authenticated: create Stripe checkout
  const checkoutResponse = await fetch('/api/enroll/checkout', { ... });
  return NextResponse.json({ checkoutUrl, sessionId });
}
```

**Finding:**

- Has auth check but NO approval verification
- Allows any authenticated user to enroll if they have a `courseId`
- Falls back to Stripe checkout for non-authenticated users

**File:** `/app/api/enroll/apply/route.ts`

```typescript
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!studentId) {
    // Create partner_inquiries record for leads
    await supabase.from('partner_inquiries').insert({ ... });
  } else {
    // Create program_enrollments record
    await supabase.from('program_enrollments').insert({
      student_id: studentId,
      program_id: body.preferredProgramId,
      funding_source: body.fundingSource || 'WIOA',
      status: 'INTAKE',
    });
  }
}
```

**Finding:** Creates `program_enrollments` with status `INTAKE` for authenticated users. No approval check.

### Program Selection

- Programs are selected via query param: `?program=barber-apprenticeship`
- Or via form field: `preferredProgramId`
- No validation that user is approved for that specific program

**CONCLUSION:** Enrollment routes exist but have NO approval gating. Any authenticated user can enroll.

---

## 3. PROGRAM HOLDER ROUTING (EXISTING)

### Program Holders Table

**File:** `/supabase/migrations/20241207_program_holders.sql`

```sql
CREATE TABLE program_holders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID,
  ...
);
```

### Program Holder to Student Link

**File:** `/supabase/migrations/20241207_program_holders.sql`

```sql
CREATE TABLE program_holder_students (
  id UUID PRIMARY KEY,
  program_holder_id UUID REFERENCES program_holders(id),
  student_id UUID REFERENCES auth.users(id),
  program_id UUID REFERENCES programs(id),
  enrolled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  ...
  UNIQUE(program_holder_id, student_id, program_id)
);
```

### Profiles Link to Program Holder

**File:** `/supabase/migrations/20251203_roles_and_profiles.sql`

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  role user_role not null default 'student',
  program_holder_id uuid references program_holders(id),
  ...
);
```

**Finding:** Students can be linked to a program holder via `profiles.program_holder_id`.

### Programs Table (No Program Holder Link)

**File:** `/supabase/migrations/20241209_complete_lms_system.sql`

```sql
CREATE TABLE programs (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  delivery_mode text DEFAULT 'hybrid',
  location_state text,
  total_hours integer,
  etpl_status text DEFAULT 'not_submitted',
  wrg_eligible boolean DEFAULT false,
  wioa_ita_eligible boolean DEFAULT false,
  apprenticeship_flag boolean DEFAULT false,
  jri_required boolean DEFAULT false,
  is_active boolean DEFAULT true,
  ...
);
```

**Finding:** ❌ Programs table has NO `program_holder_id` or `default_program_holder_id` column.

### Program Enrollments Table (No Program Holder Link)

**File:** `/supabase/migrations/20241126_create_enrollments.sql`

```sql
CREATE TABLE program_enrollments (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  funding_source TEXT NOT NULL,
  status TEXT NOT NULL,
  stripe_ref_id TEXT,
  payment_mode TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
```

**Finding:** ❌ `program_enrollments` table has NO `program_holder_id` column.

### Hybrid Learning System (Has Program Holder Link)

**File:** `/supabase/migrations/20241209_hybrid_learning_tables.sql`

```sql
create table program_holders (
  id uuid primary key,
  program_id uuid references programs(id),
  business_name text not null,
  owner_name text not null,
  email text not null,
  phone text,
  status text not null default 'active',
  ...
);
```

**Finding:** This is a DIFFERENT `program_holders` table (barbershop-specific). It links program_holder to a single program.

### NO AUTOMATIC ASSIGNMENT LOGIC FOUND

- ❌ No function to determine program holder for a student
- ❌ No default program holder per program
- ❌ No geography-based routing
- ❌ No funding source routing

**CONCLUSION:**

- Program holder infrastructure exists
- Students CAN be linked to program holders via `profiles.program_holder_id`
- BUT there is NO automatic assignment logic
- Programs do NOT have a default program holder
- Enrollments do NOT store program_holder_id

**RECOMMENDATION:** Add `program_holder_id` column to `program_enrollments` and populate it from `profiles.program_holder_id` during enrollment creation.

---

## 4. PROGRAM STEPS SYSTEM (EXISTING)

### Enrollment Steps Infrastructure

**File:** `/supabase/migrations/20241221_enrollment_steps.sql`

```sql
CREATE TABLE enrollment_steps (
  id UUID PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id),
  provider_id UUID REFERENCES partner_lms_providers(id),
  sequence_order INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  external_enrollment_id TEXT,
  ...
  UNIQUE(enrollment_id, provider_id)
);

CREATE FUNCTION generate_enrollment_steps(p_enrollment_id UUID)
RETURNS INTEGER AS $$
BEGIN
  INSERT INTO enrollment_steps (enrollment_id, provider_id, sequence_order, status)
  SELECT p_enrollment_id, ppl.provider_id, ppl.sequence_order, 'pending'
  FROM program_partner_lms ppl
  JOIN enrollments e ON e.program_id = ppl.program_id
  WHERE e.id = p_enrollment_id AND ppl.is_required = true
  ORDER BY ppl.sequence_order;

  -- Mark first step as in_progress
  UPDATE enrollment_steps SET status = 'in_progress', started_at = NOW()
  WHERE enrollment_id = p_enrollment_id
  AND sequence_order = (SELECT MIN(sequence_order) FROM enrollment_steps WHERE enrollment_id = p_enrollment_id);

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

**Finding:**

- ✅ `enrollment_steps` table exists
- ✅ `generate_enrollment_steps()` function exists
- ❌ Function references `enrollments` table (not `program_enrollments`)
- ❌ Function is NEVER called in enrollment flow

### Program to Partner Mapping

**File:** `/supabase/migrations/20241129_partner_lms_integration.sql`

```sql
CREATE TABLE program_partner_lms (
  id UUID PRIMARY KEY,
  program_id UUID REFERENCES programs(id),
  provider_id UUID REFERENCES partner_lms_providers(id),
  is_required BOOLEAN DEFAULT true,
  sequence_order INTEGER DEFAULT 1,
  auto_enroll_on_program_start BOOLEAN DEFAULT false,
  send_welcome_email BOOLEAN DEFAULT true,
  ...
  UNIQUE(program_id, provider_id)
);
```

**Finding:** ✅ Blueprint table exists for stacked partner steps per program.

### Partner LMS Providers

**File:** `/supabase/migrations/20241129_partner_lms_integration.sql`

```sql
CREATE TABLE partner_lms_providers (
  id UUID PRIMARY KEY,
  provider_name TEXT NOT NULL,
  provider_type TEXT CHECK (provider_type IN ('milady', 'jri', 'certiport', 'nrf_rise', 'hsi', 'careersafe', 'other')),
  api_endpoint TEXT,
  enrollment_url TEXT,
  promo_code TEXT,
  contact_name TEXT,
  contact_email TEXT,
  is_active BOOLEAN DEFAULT true,
  requires_payment BOOLEAN DEFAULT false,
  ...
);
```

**Finding:** ✅ Partner providers table exists with enrollment URLs.

### Course Modules (Alternative System)

**File:** `/supabase/migrations/20241209_hybrid_learning_tables.sql`

```sql
create table course_modules (
  id uuid primary key,
  program_id uuid references programs(id),
  title text not null,
  short_code text,
  order_index integer not null,
  type text not null, -- 'internal' | 'external_partner'
  partner_name text,
  external_url text,
  required_hours integer,
  requires_proof boolean default false,
  ...
);
```

**Finding:** This is an ALTERNATIVE module system (not using `program_partner_lms`).

### TABLE NAMING INCONSISTENCY

- `enrollment_steps` references `enrollments` table
- Current enrollment flow uses `program_enrollments` table
- These are DIFFERENT tables

**CONCLUSION:**

- Steps infrastructure exists but is disconnected from enrollment flow
- Need to either:
  - A) Update `generate_enrollment_steps()` to work with `program_enrollments`, OR
  - B) Migrate enrollment flow to use `enrollments` table

**RECOMMENDATION:** Option A (update function to use `program_enrollments`).

---

## 5. NOTIFICATIONS + EMAIL (EXISTING)

### Email Provider (Resend)

**File:** `/lib/email.ts`

```typescript
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@elevateforhumanity.org';

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

**Finding:** ✅ Resend email integration exists and is production-ready.

### In-App Notifications

**File:** `/lib/notifications/notification-system.ts`

```typescript
export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}): Promise<string | null> {
  const supabase = await createClient();

  const { data: notification } = await supabase
    .from('notifications')
    .insert({
      user_id: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      action_url: data.actionUrl,
      action_label: data.actionLabel,
      metadata: data.metadata || {},
      read: false,
    })
    .select('id')
    .single();

  return notification?.id || null;
}
```

**File:** `/supabase/migrations/20241214_lms_tables.sql`

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('course', 'certificate', 'message', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Finding:**

- ✅ In-app notifications system exists
- ❌ No `idempotency_key` column
- ❌ No program holder notification types
- ❌ No `metadata` column in table (but code tries to insert it)

### SMS (Stubbed)

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

**Finding:** ❌ SMS is stubbed out, no actual sending.

### NO PROGRAM HOLDER NOTIFICATION SYSTEM

- ❌ No `notification_preferences` table
- ❌ No `delivery_logs` table
- ❌ No program holder notification types
- ❌ No email/SMS channel preferences
- ❌ No consent tracking

**CONCLUSION:**

- Email infrastructure exists (Resend)
- In-app notifications exist but need schema updates
- SMS is stubbed
- No program holder-specific notification system

---

## 6. REALITY CHECK

### What Works:

1. ✅ Email sending via Resend
2. ✅ Role-based auth system (`profiles.role`)
3. ✅ Student portal gating via `enrollment_status`
4. ✅ Program holder tables exist
5. ✅ Enrollment steps schema exists
6. ✅ Program-to-partner mapping exists (`program_partner_lms`)
7. ✅ In-app notifications system exists

### What's Missing:

1. ❌ Enrollment approval gating (no check before enrollment)
2. ❌ Program holder assignment on enrollment
3. ❌ Automatic enrollment step generation
4. ❌ Program holder notification system
5. ❌ Notification preferences table
6. ❌ Delivery logs table
7. ❌ Idempotency for notifications
8. ❌ Student welcome email on enrollment
9. ❌ `program_holder_id` in `program_enrollments` table

### Critical Gaps:

1. **No approval boundary** - `enrollment_status` is checked AFTER enrollment, not before
2. **Table naming mismatch** - `enrollment_steps` references `enrollments`, but routes use `program_enrollments`
3. **No program holder assignment rule** - No logic to determine which program holder gets a student
4. **No idempotency** - Retries will create duplicates

---

## 7. PLAN OF ATTACK (EVIDENCE-BASED)

### DECISION 1: Gating Method

**Recommendation:** Use `enrollment_status` field in `profiles` table (EXISTING PATTERN)

**Rationale:**

- Repo already uses `enrollment_status` for student portal access
- No invite token system exists
- Adding invite tokens would be a new pattern (violates "reuse existing")
- `enrollment_status` can be set by admin/staff when student is approved

**Implementation:**

- Add server-side check in `/app/api/enroll/*` routes
- Require `enrollment_status IN ('approved', 'active', 'enrolled')` before allowing enrollment
- Update `enrollment_status` to `'active'` after successful enrollment

### DECISION 2: Program Holder Assignment

**Recommendation:** Use `profiles.program_holder_id` (EXISTING PATTERN)

**Rationale:**

- `profiles` table already has `program_holder_id` column
- Students are already linked to program holders via this field
- No need for complex routing logic

**Implementation:**

- Add `program_holder_id` column to `program_enrollments` table
- Populate from `profiles.program_holder_id` during enrollment creation
- If `profiles.program_holder_id` is NULL, enrollment fails (student must be assigned first)

### DECISION 3: Enrollment Table Strategy

**Recommendation:** Keep `program_enrollments`, update `generate_enrollment_steps()` function

**Rationale:**

- `program_enrollments` is used by existing enrollment routes
- Less disruptive than migrating to `enrollments` table
- Function update is simpler than route updates

**Implementation:**

- Update `generate_enrollment_steps()` to accept `program_enrollment_id`
- Update function to join on `program_enrollments` instead of `enrollments`
- Call function after `program_enrollments` insert

### DECISION 4: Step 1 Visibility

**Recommendation:** Dashboard visibility + email with link (Option C)

**Rationale:**

- Provides both immediate visibility and email record
- Matches existing notification patterns

**Implementation:**

- Student dashboard queries `enrollment_steps` for their enrollments
- Welcome email includes link to first step
- First step status is `'in_progress'` (unlocked)

---

## 8. IMPLEMENTATION PHASES

### Phase 2A: Database Schema (Migrations)

1. Add `program_holder_id` to `program_enrollments` table
2. Add `idempotency_key` to `notifications` table
3. Add `metadata` JSONB column to `notifications` table
4. Create `notification_preferences` table for program holders
5. Create `delivery_logs` table for email/SMS audit trail
6. Update `generate_enrollment_steps()` to work with `program_enrollments`
7. Add `enrollment_status` values: `'pending'`, `'approved'`, `'active'`, `'completed'`, `'withdrawn'`

### Phase 2B: Server-Side Enforcement

1. Add `enrollment_status` check to `/app/api/enroll/*` routes
2. Return 403 if `enrollment_status NOT IN ('approved', 'active')`
3. Create enrollment orchestration function (idempotent)
4. Wire up `generate_enrollment_steps()` call on enrollment creation

### Phase 2C: Notification System

1. Extend notification types for program holder events
2. Create program holder notification function (idempotent)
3. Create email delivery function with logging
4. Create SMS delivery function (feature-flagged, consent-gated)
5. Create student welcome email function

### Phase 2D: UI Components (Minimal)

1. Program holder settings page for notification preferences
2. Program holder notification inbox/list
3. Mark notification as read endpoint

### Phase 2E: Documentation

1. Flow diagram (approval → enrollment → notifications)
2. Rollback procedures
3. Phase 2 switchboard extension notes

---

## 9. PROOF OF FINDINGS

### Commands to Verify:

```bash
# Check middleware
cat /workspaces/fix2/middleware-backup.ts | grep -A 10 "email_confirmed"

# Check profiles table
grep -A 20 "create table.*profiles" /workspaces/fix2/supabase/migrations/20251203_roles_and_profiles.sql

# Check enrollment routes
ls -la /workspaces/fix2/app/api/enroll/

# Check program_enrollments table
grep -A 15 "CREATE TABLE.*program_enrollments" /workspaces/fix2/supabase/migrations/20241126_create_enrollments.sql

# Check enrollment_steps function
grep -A 30 "generate_enrollment_steps" /workspaces/fix2/supabase/migrations/20241221_enrollment_steps.sql

# Check email integration
grep "RESEND_API_KEY" /workspaces/fix2/lib/email.ts

# Check notifications table
grep -A 10 "CREATE TABLE.*notifications[^_]" /workspaces/fix2/supabase/migrations/20241214_lms_tables.sql
```

---

## 10. NEXT ACTIONS

**STOP - AWAITING USER CONFIRMATION:**

1. ✅ Gating method: Use `enrollment_status` in profiles (not invite tokens)
2. ✅ Program holder assignment: Use `profiles.program_holder_id`
3. ✅ Enrollment table: Keep `program_enrollments`, update function
4. ✅ Step 1 visibility: Dashboard + email

**Once approved, proceed with Phase 2A (Database Migrations).**

---

**END OF PHASE 1 EVIDENCE-BASED AUDIT**
