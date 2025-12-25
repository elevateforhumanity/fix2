# Automatic Enrollment + Program Holder Alerts

**Implementation Date:** 2024-12-24  
**Branch:** `feature/auto-enrollment-alerts`  
**Status:** ✅ IMPLEMENTATION COMPLETE - READY FOR PRODUCTION TESTING

---

## Overview

This system implements automatic enrollment with server-side approval gating and automated program holder notifications. When an approved student enrolls, the system automatically creates the enrollment, assigns the program holder, generates stacked enrollment steps, unlocks Step 1, sends a welcome email, and notifies the program holder.

**Key Commits:**
- `0bda7b03b` - feat: enrollment orchestration (gate, assign, steps, notify)
- `d43dc972c` - docs: phase 2 implementation complete (orchestration wired)
- `85f43e644` - docs: phase 3 proof requirements and verification checklist

---

## Flow

```
Student Submits Enrollment
    ↓
Server checks profiles.enrollment_status
    ↓
If NOT ('approved' OR 'active') → 403 Forbidden
    ↓
If program_holder_id is NULL → 403 Forbidden
    ↓
Create program_enrollments record
    ↓
Call generate_enrollment_steps(enrollment_id)
    ↓
Update student enrollment_status to 'active'
    ↓
Send program holder notification (in-app + email)
    ↓
Send student welcome email
    ↓
Log all deliveries in delivery_logs
```

---

## Server-Side Enforcement

### Enrollment Gate

**File:** `/app/api/enroll/apply/route.ts`

**Checks:**

1. User must be authenticated
2. `profiles.enrollment_status` must be `'approved'` or `'active'`
3. `profiles.program_holder_id` must NOT be NULL

**Response:**

- 403 if not approved
- 403 if no program holder assigned
- 200 + enrollment created if approved

### Idempotency

**Enrollment Creation:**

- Checks for existing enrollment with same `student_id` + `program_id` + status `'IN_PROGRESS'`
- Returns existing enrollment if found (safe to retry)

**Notifications:**

- Uses `idempotency_key` column in `notifications` table
- Format: `enrollment-{enrollmentId}-program-holder`
- Unique constraint prevents duplicates

---

## Database Schema Changes

### Migration: `20241224_auto_enrollment_schema.sql`

**Added:**

1. `program_enrollments.program_holder_id` (UUID, references program_holders)
2. `notifications.action_url` (TEXT)
3. `notifications.action_label` (TEXT)
4. `notifications.metadata` (JSONB)
5. `notifications.idempotency_key` (TEXT UNIQUE)
6. `notification_preferences` table (program holder email/SMS preferences)
7. `delivery_logs` table (audit trail for all deliveries)

**Updated:**

- `generate_enrollment_steps()` function now works with `program_enrollments` table
- Joins on `programs.slug` instead of assuming UUID

---

## Notification System

### In-App Notifications

**Always enabled.** Cannot be disabled.

**Created in:** `notifications` table  
**Visible in:** `/program-holder/notifications`

### Email Notifications

**Default:** ON  
**Configurable:** Yes (via `/program-holder/settings/notifications`)

**Provider:** Resend (`process.env.RESEND_API_KEY`)  
**Logged in:** `delivery_logs` table

### SMS Notifications

**Default:** OFF  
**Requires:**

- `sms_enabled = true`
- `sms_consent = true`
- `sms_opt_out = false`
- Valid `phone_e164`

**Status:** Stubbed (provider not configured)  
**Logged in:** `delivery_logs` table with status `'pending'` and error `'SMS provider not configured'`

---

## Verification Steps

### 1. Test Enrollment Gating (403 vs 200)

**Non-approved user:**

```bash
# Set enrollment_status to 'applied'
psql $DATABASE_URL -c "UPDATE profiles SET enrollment_status = 'applied' WHERE id = '{student_id}';"

# Attempt enrollment
curl -X POST https://your-domain.com/api/enroll/apply \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"Student","email":"test@example.com","preferredProgramId":"barber-apprenticeship"}'

# Expected: 403 Forbidden
```

**Approved user:**

```bash
# Set enrollment_status to 'approved' and assign program holder
psql $DATABASE_URL -c "UPDATE profiles SET enrollment_status = 'approved', program_holder_id = '{program_holder_id}' WHERE id = '{student_id}';"

# Attempt enrollment
curl -X POST https://your-domain.com/api/enroll/apply \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"Student","email":"test@example.com","preferredProgramId":"barber-apprenticeship"}'

# Expected: 200 OK + enrollment created
```

### 2. Verify Enrollment + Steps Created

```sql
-- Check enrollment record
SELECT id, student_id, program_id, program_holder_id, status, created_at
FROM program_enrollments
WHERE student_id = '{student_id}'
ORDER BY created_at DESC
LIMIT 1;

-- Check enrollment steps
SELECT es.id, es.sequence_order, es.status, plp.provider_name
FROM enrollment_steps es
JOIN partner_lms_providers plp ON plp.id = es.provider_id
WHERE es.enrollment_id = '{enrollment_id}'
ORDER BY es.sequence_order;

-- Verify Step 1 is in_progress
SELECT * FROM enrollment_steps
WHERE enrollment_id = '{enrollment_id}'
AND sequence_order = 1
AND status = 'in_progress';
```

### 3. Verify Program Holder Notification

```sql
-- Check in-app notification
SELECT id, user_id, type, title, message, read, idempotency_key, created_at
FROM notifications
WHERE idempotency_key = 'enrollment-{enrollment_id}-program-holder';

-- Check email delivery log
SELECT dl.id, dl.channel, dl.recipient, dl.status, dl.provider_message_id, dl.sent_at
FROM delivery_logs dl
JOIN notifications n ON n.id = dl.notification_id
WHERE n.idempotency_key = 'enrollment-{enrollment_id}-program-holder'
AND dl.channel = 'email';
```

### 4. Verify Student Welcome Email

```sql
-- Check delivery log (no notification_id for welcome emails)
SELECT id, channel, recipient, status, provider_message_id, sent_at
FROM delivery_logs
WHERE channel = 'email'
AND recipient = '{student_email}'
ORDER BY created_at DESC
LIMIT 1;
```

### 5. Test Idempotency

```bash
# Submit enrollment twice with same data
curl -X POST https://your-domain.com/api/enroll/apply ... # First request
curl -X POST https://your-domain.com/api/enroll/apply ... # Second request (retry)

# Verify only ONE enrollment exists
psql $DATABASE_URL -c "SELECT COUNT(*) FROM program_enrollments WHERE student_id = '{student_id}' AND program_id = 'barber-apprenticeship';"
# Expected: 1

# Verify only ONE notification exists
psql $DATABASE_URL -c "SELECT COUNT(*) FROM notifications WHERE idempotency_key = 'enrollment-{enrollment_id}-program-holder';"
# Expected: 1
```

---

## Rollback Steps

### 1. Revert Migration

```bash
# Drop new tables
psql $DATABASE_URL -c "DROP TABLE IF EXISTS delivery_logs CASCADE;"
psql $DATABASE_URL -c "DROP TABLE IF EXISTS notification_preferences CASCADE;"

# Remove new columns
psql $DATABASE_URL -c "ALTER TABLE program_enrollments DROP COLUMN IF EXISTS program_holder_id;"
psql $DATABASE_URL -c "ALTER TABLE notifications DROP COLUMN IF EXISTS action_url, DROP COLUMN IF EXISTS action_label, DROP COLUMN IF EXISTS metadata, DROP COLUMN IF EXISTS idempotency_key;"

# Restore old generate_enrollment_steps function
# (Re-run previous migration or manually restore)
```

### 2. Revert Code Changes

```bash
git checkout main -- app/api/enroll/apply/route.ts
git checkout main -- lib/enrollment/orchestrate-enrollment.ts
rm -rf app/program-holder/settings/notifications
rm -rf app/program-holder/notifications
rm -rf app/api/program-holder/notification-preferences
rm -rf app/api/program-holder/notifications
```

### 3. Clean Up Test Data

```sql
-- Remove test enrollments
DELETE FROM program_enrollments WHERE student_id = '{test_student_id}';

-- Remove test notifications
DELETE FROM notifications WHERE idempotency_key LIKE 'enrollment-%';

-- Reset test student status
UPDATE profiles SET enrollment_status = 'applied', program_holder_id = NULL WHERE id = '{test_student_id}';
```

---

## Phase 2: Switchboard Numbers (Future)

**Not implemented in this workstream.**

### Concept

Each program holder gets a dedicated phone number (monthly subscription) that routes to their preferred contact method.

### Schema Extension (Future)

```sql
ALTER TABLE program_holders
ADD COLUMN switchboard_number TEXT,
ADD COLUMN switchboard_provider TEXT,
ADD COLUMN switchboard_subscription_id TEXT,
ADD COLUMN switchboard_active BOOLEAN DEFAULT FALSE;

CREATE TABLE switchboard_routing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID REFERENCES program_holders(id),
  switchboard_number TEXT NOT NULL,
  route_to_number TEXT,
  route_to_email TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Implementation Notes

- Provision numbers via Twilio or similar
- Store routing preferences in `switchboard_routing`
- Update `delivery_logs` to include switchboard metadata
- Add billing/subscription management

---

## Support

**Questions:** Contact engineering team  
**Rollback:** Follow rollback steps above  
**Monitoring:** Check `delivery_logs` table for failed deliveries

---

**END OF DOCUMENTATION**
