# Enrollment Approval Policy

## 1. Approval Authority

Only users with role `admin` or `super_admin` may approve enrollments.

Program holders may not approve enrollments under any circumstance.

## 2. Approval Trigger

Approval is the sole event that transitions:

- `enrollments.status` from `pending` to `active`
- `profiles.enrollment_status` from `pending` to `active`
- Execution of enrollment step orchestration via `generate_enrollment_steps()`

No other action or process may activate an enrollment or grant student portal access.

## 3. Program Holder Role

Program holders are delivery partners only.

Program holders gain access to student data after approval, never before.

Program holders have no authority over enrollment gating or approval decisions.

## 4. Non-Approval Outcomes

### Pending Enrollments
Enrollments with status `pending` do not generate steps and do not grant portal access.

### Rejected Enrollments
Enrollments may be marked as rejected by admins. Rejected enrollments do not generate steps and do not grant portal access.

### Suspended Enrollments
Enrollments may be suspended after initial approval. Suspended enrollments retain generated steps but portal access is revoked via `profiles.enrollment_status` set to `suspended`.

Non-approved enrollments never generate steps and never grant access under any circumstance.

## 5. Audit & Compliance

Every approval action is logged to the audit system.

The admin user identity is the authoritative approver of record.

Approval records are retained for compliance review and funding verification.

Audit logs include:
- Approver user ID
- Approver role
- Enrollment ID
- Timestamp of approval
- Steps generated count
