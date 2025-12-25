# PHASE 1 AUDIT REPORT: Automatic Enrollment + Program Holder Alerts

**Branch:** `feature/auto-enrollment-alerts`  
**Date:** 2024-12-24  
**Auditor:** Ona Agent

---

## EXECUTIVE SUMMARY

**Current State:** Enrollment routes exist but lack server-side approval gating. No invite token system. No program holder assignment logic. No automated notification system for program holders. Enrollment steps infrastructure exists but is not triggered automatically.

**Risk Level:** HIGH - Current enrollment flow allows unauthenticated access and has no approval boundary enforcement.

---

## 1. ENROLLMENT ROUTE AUDIT

### Current Routes Found:

- `/app/enroll/page.tsx` - Marketing page with "Apply for Free Training" CTA (links to `/contact`)
- `/app/api/enroll/route.ts` - POST endpoint for enrollment
- `/app/api/enroll/apply/route.ts` - Application submission endpoint
- `/app/student/*` - Student portal (has auth check in layout)

### Current Access Control:

**`/app/enroll/page.tsx`:**

- ❌ No server-side gating
- ❌ No invite token check
- ❌ Public marketing page (anyone can view)
- Links to `/contact` for application

**`/app/api/enroll/route.ts`:**

- ✅ Has auth check: `await supabase.auth.getUser()`
- ❌ No approval verification
- ❌ No invite token validation
- Allows authenticated users to enroll if they have `courseId`
- Falls back to Stripe checkout for non-authenticated users

**`/app/api/enroll/apply/route.ts`:**

- ✅ Has auth check
- ❌ No approval gate
- Creates `program_enrollments` record with status `INTAKE` for authenticated users
- Creates `partner_inquiries` record for non-authenticated users
- No program holder assignment

**`/app/student/layout.tsx`:**

- ✅ Server-side auth check
- ✅ Checks `enrollment_status` in profiles table
- ❌ Not relevant for enrollment gating (this is post-enrollment access)

### CRITICAL FINDING #1: No Invite Token System Exists

- No `enrollment_invites` or `student_invites` table found
- No token validation in any enrollment route
- No approval boundary enforcement

---

## 2. PROGRAM HOLDER ASSIGNMENT AUDIT

### Database Schema Found:

**`program_holders` table** (from `20241207_program_holders.sql`):

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
)
```

**`program_holder_students` table**:

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
)
```

### Current Assignment Logic:

**`program_enrollments` table** (from `20241126_create_enrollments.sql`):

```sql
CREATE TABLE program_enrollments (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  funding_source TEXT NOT NULL,
  status TEXT NOT NULL,
  stripe_ref_id TEXT,
  payment_mode TEXT,
  ...
)
```

### CRITICAL FINDING #2: No Program Holder Assignment Logic

- ❌ `program_enrollments` table has NO `program_holder_id` column
- ❌ No automatic assignment logic exists
- ❌ No link between `program_enrollments` and `program_holders`
- ✅ `program_holder_students` table exists but is not used in enrollment flow
- ❌ No deterministic rule for "which program holder gets this student"

### Gap Analysis:

The system has:

1. A `program_holders` table (organizations)
2. A `program_holder_students` table (many-to-many link)
3. A `program_enrollments` table (student enrollments)

But NO connection between them during enrollment creation.

**Question for Implementation:** How is program_holder_id determined?

- By program? (each program has a default program holder?)
- By geography? (student zip code → program holder territory?)
- By funding source? (WIOA students → WorkOne, WRG → state agency?)
- Manual assignment only?

---

## 3. ENROLLMENT STEPS AUDIT

### Infrastructure Found:

**`enrollment_steps` table** (from `20241221_enrollment_steps.sql`):

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
)
```

**`program_partner_lms` table** (from `20241129_partner_lms_integration.sql`):

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
)
```

**`generate_enrollment_steps()` function** exists:

```sql
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
  WHERE enrollment_id = p_enrollment_id AND sequence_order = (SELECT MIN(sequence_order) ...);

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

### CRITICAL FINDING #3: Steps Infrastructure Exists But Not Triggered

- ✅ `enrollment_steps` table exists
- ✅ `program_partner_lms` blueprint table exists
- ✅ `generate_enrollment_steps()` function exists
- ❌ Function is NEVER called in enrollment flow
- ❌ No automatic step generation on enrollment creation

### Table Mismatch Issue:

- `generate_enrollment_steps()` references `enrollments` table
- Current enrollment flow uses `program_enrollments` table
- These are DIFFERENT tables (naming inconsistency in migrations)

---

## 4. NOTIFICATION & EMAIL AUDIT

### Email Infrastructure:

**`/lib/email.ts`:**

- ✅ Uses Resend API (`process.env.RESEND_API_KEY`)
- ✅ Has `sendEmail()` function
- ✅ Falls back to console logging in dev mode (no API key)
- ✅ FROM_EMAIL: `noreply@elevateforhumanity.org`

**`/lib/notifications/notification-system.ts`:**

- ✅ Has `createNotification()` function
- ✅ Writes to `notifications` table
- ✅ Supports types: info, success, warning, error, requirement, appointment, verification, funding, system
- ❌ No program holder notification types
- ❌ No idempotency key support

**`/lib/notifications/sms.ts`:**

- ✅ SMS service class exists
- ❌ Disabled/stubbed out (logs only, no actual sending)
- ❌ No Twilio/provider integration

**`/lib/notifications/email.ts`:**

- File exists (not reviewed in detail)

### Database Tables:

**`notifications` table** (assumed to exist based on code):

- Used by `notification-system.ts`
- Columns: `user_id`, `type`, `title`, `message`, `action_url`, `action_label`, `read`, `metadata`
- ❌ No `idempotency_key` column
- ❌ No `notification_type` enum for program holder events

### CRITICAL FINDING #4: No Program Holder Notification System

- ❌ No `notification_preferences` table
- ❌ No `delivery_logs` table
- ❌ No program holder notification types defined
- ❌ No email/SMS channel preference system
- ❌ No consent tracking for SMS
- ✅ Email infrastructure exists (Resend)
- ❌ SMS infrastructure stubbed but not implemented

---

## 5. REALITY CHECK

### What Works:

1. ✅ Email sending via Resend (if API key configured)
2. ✅ Basic in-app notifications system
3. ✅ Enrollment steps database schema
4. ✅ Program holder database schema
5. ✅ Program-to-partner mapping (`program_partner_lms`)
6. ✅ Student portal auth gating

### What's Missing:

1. ❌ Invite token system (approval gate)
2. ❌ Server-side enrollment access control
3. ❌ Program holder assignment logic
4. ❌ Automatic enrollment step generation
5. ❌ Program holder notification system
6. ❌ Notification preferences table
7. ❌ Delivery logs table
8. ❌ Idempotency for notifications
9. ❌ Student welcome email on enrollment
10. ❌ Connection between `program_enrollments` and `enrollment_steps`

### Critical Risks:

1. **No approval boundary** - Anyone authenticated can attempt enrollment
2. **Table naming inconsistency** - `program_enrollments` vs `enrollments` (functions reference wrong table)
3. **No program holder assignment rule** - Cannot determine which program holder to notify
4. **No idempotency** - Retries will create duplicate notifications/enrollments

---

## 6. PLAN OF ATTACK

### Phase 2A: Database Schema (Migrations)

1. Create `enrollment_invites` table with token-based approval
2. Add `program_holder_id` column to `program_enrollments` table
3. Create `notification_preferences` table for program holders
4. Create `delivery_logs` table for email/SMS audit trail
5. Add `idempotency_key` to `notifications` table
6. Create function to determine program holder for a program/student
7. Update `generate_enrollment_steps()` to work with `program_enrollments`

### Phase 2B: Server-Side Enforcement

1. Create middleware or server action to validate invite tokens
2. Add token check to `/app/api/enroll/*` routes
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

## 7. OPEN QUESTIONS FOR IMPLEMENTATION

### Q1: Program Holder Assignment Rule

**How do we determine which program_holder_id to assign?**

Options:

- A) Each `programs` row has a `default_program_holder_id` column
- B) Geography-based (student zip → program holder territory table)
- C) Funding source mapping (WIOA → specific program holder)
- D) Manual assignment only (staff picks after enrollment)

**Recommendation:** Option A (simplest, most deterministic)

### Q2: Invite Token Source

**Who creates the invite tokens?**

Options:

- A) Program holders create tokens for their approved students
- B) Admin staff creates tokens after WorkOne approval
- C) External system (WorkOne portal) creates tokens via API
- D) Tokens are generated automatically when student is approved in external system

**Recommendation:** Option B for MVP (admin creates after approval confirmation)

### Q3: Enrollment Table Naming

**Which table is the source of truth?**

Current state:

- `program_enrollments` - used by enrollment API routes
- `enrollments` - referenced by `enrollment_steps` functions

Options:

- A) Migrate everything to `program_enrollments` and update functions
- B) Migrate everything to `enrollments` and update API routes
- C) Keep both and create a view/bridge

**Recommendation:** Option A (keep `program_enrollments`, update functions)

### Q4: Step 1 Visibility

**What does "unlock Step 1" mean?**

Options:

- A) Student sees Step 1 in their dashboard with access link
- B) Student receives email with Step 1 access link
- C) Both A and B
- D) Step 1 auto-enrolls student in partner LMS and sends credentials

**Recommendation:** Option C (dashboard visibility + email)

---

## 8. NEXT ACTIONS

**STOP HERE - DO NOT IMPLEMENT UNTIL:**

1. User confirms program holder assignment rule (Q1)
2. User confirms invite token creation workflow (Q2)
3. User confirms enrollment table strategy (Q3)
4. User confirms Step 1 visibility approach (Q4)

**Once approved, implementation order:**

1. Database migrations (schema changes)
2. Server-side enforcement (token validation)
3. Enrollment orchestration (create + assign + steps)
4. Notification system (in-app + email + SMS stub)
5. Minimal UI (settings + inbox)
6. Documentation + proof

---

## APPENDIX: Key File Locations

**Enrollment Routes:**

- `/app/enroll/page.tsx`
- `/app/api/enroll/route.ts`
- `/app/api/enroll/apply/route.ts`

**Database Migrations:**

- `/supabase/migrations/20241126_create_enrollments.sql`
- `/supabase/migrations/20241207_program_holders.sql`
- `/supabase/migrations/20241221_enrollment_steps.sql`
- `/supabase/migrations/20241129_partner_lms_integration.sql`

**Lib Functions:**

- `/lib/email.ts`
- `/lib/notifications/notification-system.ts`
- `/lib/notifications/sms.ts`
- `/lib/enrollment/complete-enrollment.ts`

**Student Portal:**

- `/app/student/layout.tsx`

---

**END OF PHASE 1 AUDIT**
