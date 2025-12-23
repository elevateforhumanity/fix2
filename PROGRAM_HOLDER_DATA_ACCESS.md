# Program Holder Data Access Policy

## Overview

Program holders have **role-based automatic signup** and can access their portal immediately after email confirmation. However, their access to student data is **restricted to operational information only**.

## Signup Process

**Automatic Role Assignment**: ✅ ENABLED

1. User visits `/program-holder/signup`
2. Fills out form (name, email, password, organization)
3. Account created with `program_holder` role automatically
4. Email confirmation sent
5. After confirmation → immediate portal access

## Data Access Rules

### ✅ ALLOWED: Operational Data

Program holders CAN see these student fields:

**Identity (Operational)**

- `first_name` - For class roster
- `last_name` - For class roster
- `email` - For communication
- `phone` - For contact (optional)

**Program Data**

- `program_name` - Which program student is in
- `enrollment_status` - Active, completed, dropped
- `enrolled_at` - When they started
- `completion_date` - When they finished

**Progress Tracking**

- `attendance_records` - Class attendance
- `course_progress` - Module completion
- `grades` - Assignment scores
- `certifications_earned` - Completed certifications
- `hours_completed` - Training hours logged

**Compliance**

- `verification_status` - Student verification state
- `at_risk_flag` - If student needs intervention
- `last_activity_date` - Recent engagement
- `compliance_status` - Meeting requirements

### ❌ PROHIBITED: Personal Identifiable Information (PII)

Program holders CANNOT see these fields:

**Sensitive Personal Data**

- `ssn` / `social_security_number` - Social Security Number
- `date_of_birth` / `dob` - Date of birth
- `drivers_license` - Driver's license number
- `passport_number` - Passport information

**Financial Data**

- `bank_account` - Banking information
- `routing_number` - Bank routing
- `payment_info` - Payment details
- `salary` - Income information

**Protected Information**

- `medical_records` - Health information
- `disability_status` - Disability information
- `criminal_background` - Background check results
- `credit_score` - Financial history

**Address (Full)**

- `street_address` - Full street address
- `apartment_number` - Unit number
- Note: City/State may be allowed for general location

**Government IDs**

- `voucher_id` - May contain sensitive identifiers
- `case_number` - Government case numbers
- `benefit_id` - Benefit program IDs

## Implementation

### Database Query Pattern

**✅ CORRECT: Explicit Field Selection**

```typescript
const { data: students } = await supabase
  .from('program_holder_students')
  .select(
    `
    *,
    student:profiles!student_id(
      id,
      first_name,
      last_name,
      email,
      phone
    ),
    program:programs(
      name,
      slug
    )
  `
  )
  .eq('program_holder_id', programHolder.id);
```

**❌ WRONG: Select All**

```typescript
// DO NOT USE - Exposes all fields including PII
const { data: students } = await supabase
  .from('profiles')
  .select('*')
  .eq('program_holder_id', programHolder.id);
```

### Row Level Security (RLS)

Database policies should enforce:

```sql
-- Program holders can only see their students
CREATE POLICY "program_holders_see_own_students"
ON program_holder_students
FOR SELECT
USING (
  program_holder_id IN (
    SELECT id FROM program_holders
    WHERE user_id = auth.uid()
  )
);

-- Restrict profile fields via view
CREATE VIEW program_holder_student_view AS
SELECT
  phs.id,
  phs.program_holder_id,
  phs.student_id,
  phs.status,
  phs.enrolled_at,
  p.first_name,
  p.last_name,
  p.email,
  p.phone
FROM program_holder_students phs
JOIN profiles p ON p.id = phs.student_id
-- Explicitly exclude: ssn, dob, address, etc.
```

## Current Status

### ✅ Protected Pages

These pages correctly restrict data access:

- `/app/program-holder/students/page.tsx` - Only selects allowed fields
- Query explicitly lists: `id, first_name, last_name, email, phone`

### ⚠️ Review Needed

Check these areas for potential PII exposure:

1. Student detail pages
2. Report generation
3. Export functionality
4. API endpoints
5. Webhook payloads

## Testing Checklist

- [ ] Verify program holder cannot query SSN field
- [ ] Verify program holder cannot query DOB field
- [ ] Verify program holder cannot query full address
- [ ] Verify program holder cannot access other program holders' students
- [ ] Verify RLS policies block unauthorized queries
- [ ] Test export/download features don't include PII
- [ ] Test API endpoints don't leak PII in responses

## Compliance

This policy ensures compliance with:

- **FERPA** - Family Educational Rights and Privacy Act
- **GDPR** - General Data Protection Regulation (if applicable)
- **State Privacy Laws** - Various state-level privacy requirements
- **Minimum Necessary Standard** - Only access data needed for job function

## Future Enhancements

1. **Field-level encryption** for PII fields
2. **Audit logging** of all student data access
3. **Data masking** for partial SSN display (if needed)
4. **Time-limited access** to sensitive fields with approval
5. **Granular permissions** per program holder role
