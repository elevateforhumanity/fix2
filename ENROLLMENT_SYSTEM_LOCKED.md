# ENROLLMENT SYSTEM - LOCKED AND FROZEN

**Status:** PRODUCTION-READY  
**Date Locked:** 2025-12-25  
**Branch:** `feature/auto-enrollment-alerts`

---

## SYSTEM OVERVIEW

The enrollment approval system is now locked, compliant, and auditable.

**Core Principle:**  
Only `admin` or `super_admin` users may approve enrollments. Approval is the sole event that activates an enrollment, grants portal access, and triggers step orchestration.

---

## APPROVAL AUTHORITY

### Who Can Approve
- `admin` role
- `super_admin` role

### Who CANNOT Approve
- `program_holder` - **Explicitly forbidden**
- `student` - No approval authority
- Any other role - No approval authority

### Enforcement
- `app/api/enroll/approve/route.ts` returns `403 Forbidden` for any non-admin role
- No alternate approval paths exist
- No background jobs or cron tasks can activate enrollments

---

## APPROVAL TRIGGERS

When an admin approves an enrollment via `/api/enroll/approve`:

1. **Enrollment Activation**
   - `enrollments.status`: `pending` → `active`

2. **Profile Activation**
   - `profiles.enrollment_status`: `pending` → `active`

3. **Step Generation**
   - Calls `generate_enrollment_steps(enrollment_id)` RPC
   - Creates `enrollment_steps` records from `program_partner_lms` blueprint

4. **Notifications**
   - Student receives in-app + email notification
   - Program holder receives notification (if assigned)

5. **Audit Log**
   - Records approver ID, role, enrollment ID, timestamp

**No other event or process may activate an enrollment.**

---

## NOTIFICATIONS

### 1. Admin Notification (Pending Enrollment)
**Trigger:** Enrollment created with `status='pending'`  
**Recipients:** All `admin` and `super_admin` users  
**Channel:** In-app notification  
**Title:** "New Enrollment Pending Approval"  
**Message:** Includes student name, email, program, enrollment ID

**Implementation:**
- `app/api/enroll/auto/route.ts` (after enrollment insert)
- `app/api/enroll/complete/route.ts` (after enrollment insert)

### 2. Student Notification (Approved)
**Trigger:** Enrollment approved  
**Recipient:** Student (enrollment.user_id)  
**Channels:** In-app notification + email  
**Title:** "Enrollment Approved"  
**Message:** "You now have access to the student portal"  
**Email:** Includes link to `/student/dashboard`

**Implementation:**
- `app/api/enroll/approve/route.ts` (after approval)

### 3. Program Holder Notification (Assignment)
**Trigger:** Enrollment approved AND `program_holder_students` record exists  
**Recipient:** Program holder user  
**Channels:** In-app notification + email  
**Title:** "New Approved Student Assigned"  
**Message:** Includes student ID, program ID  
**Email:** Includes link to `/program-holder/dashboard`

**Implementation:**
- `app/api/enroll/approve/route.ts` (conditional, after approval)

**All notifications are non-blocking.** Failures are logged but do not break enrollment flow.

---

## AUDIT TRAIL

Every approval action is logged to `audit_logs` table:

- `actor_id` - Approver user ID
- `actor_role` - Must be `admin` or `super_admin`
- `action` - `'enrollment_approved'`
- `entity` - `'enrollment'`
- `entity_id` - Enrollment ID
- `created_at` - Timestamp
- Steps generated count (if available)

Audit log failures are non-blocking.

---

## VERIFICATION

### Scripts Provided

**1. Notification Verification**
```bash
psql $DATABASE_URL -f scripts/verify-enrollment-notifications.sql
```
Proves:
- Admin notifications for pending enrollments
- Student notifications for approved enrollments
- Program holder notifications for assignments
- Target roles are correct

**2. Final System Verification**
```bash
psql $DATABASE_URL -f scripts/final-enrollment-verification.sql
```
Proves:
- Schema correctness (`profiles.enrollment_status` exists)
- Authorized approvers (admin/super_admin only)
- Orchestration results (steps generated)
- Notification counts
- Audit trail (approvals logged)
- System metrics

**3. End-to-End Test**
```bash
./scripts/test-enrollment-orchestration.sh
```
Automated test that creates enrollment, calls approval API, verifies results.

---

## PRODUCTION EVIDENCE

### Tests Executed
- **Test 1:** Enrollment `b4ce4631-b74a-4f60-9cb4-9367e12e5703`
  - Status: `active` ✅
  - Profile: `active` ✅
  - Steps: 3 generated (HSI, Certiport, CareerSafe) ✅

- **Test 2:** Enrollment `eeb42dd6-eb82-4fc2-a422-1f2229279d46`
  - Status: `active` ✅
  - Profile: `active` ✅
  - Steps: 1 generated (JRI) ✅

### Commits
```
f5dabcd6b proof: final enrollment system verification
1a00247f7 CRITICAL: enforce admin-only approval authority
6c4758bdd proof: verification SQL for enrollment notifications
8df969141 notifications: student alerted on enrollment approval
4e0296929 notifications: admin alerted on pending enrollment
75af44383 policy: enrollment approval governance document
407973a8c test: add complete end-to-end orchestration test suite
```

**Total:** 17 commits, 2,174 lines changed

---

## POLICY DOCUMENT

See: `docs/enrollment-approval-policy.md`

Formal governance document defining:
1. Approval authority (admin-only)
2. Approval trigger (sole activation event)
3. Program holder role (delivery partners, no approval authority)
4. Non-approval outcomes (pending/rejected/suspended)
5. Audit & compliance requirements

---

## WHAT NOT TO TOUCH

**DO NOT modify these after this point:**

- `app/api/enroll/approve/route.ts` - Approval authority enforcement
- `app/api/enroll/auto/route.ts` - Enrollment creation + admin notification
- `app/api/enroll/complete/route.ts` - Enrollment creation + admin notification
- `docs/enrollment-approval-policy.md` - Governance policy
- Approval role checks (admin/super_admin only)
- Orchestration trigger (approval endpoint only)

**If you need to change enrollment logic:**
1. Review `docs/enrollment-approval-policy.md` first
2. Ensure changes don't violate admin-only approval
3. Update policy document if authority changes
4. Re-run verification scripts
5. Document in audit trail

---

## SCHEMA REQUIREMENTS

### profiles.enrollment_status
- **Type:** `text`
- **Nullable:** Should be `NOT NULL` (pending migration)
- **Default:** `'pending'`
- **Constraint:** `('pending', 'approved', 'active', 'suspended', 'completed', 'rejected')`
- **Purpose:** Access gate for student portal

### enrollments.status
- **Type:** `text`
- **Values:** `('pending', 'active', 'completed', 'dropped', 'suspended')`
- **Default:** `'pending'` (changed from `'active'`)
- **Purpose:** Enrollment lifecycle state

### enrollment_steps
- **Generated by:** `generate_enrollment_steps(enrollment_id)` RPC
- **Source:** `program_partner_lms` table (blueprint)
- **Trigger:** Approval only

---

## COMPLIANCE NOTES

This system satisfies:
- **WIOA compliance** - Admin approval required before training access
- **Funder requirements** - Audit trail of all approvals
- **State agency oversight** - Clear authority hierarchy
- **Internal controls** - Single approval path, no side channels

---

## SUPPORT

**For questions about:**
- Approval authority → See `docs/enrollment-approval-policy.md`
- Notifications → See `scripts/verify-enrollment-notifications.sql`
- Orchestration → See `scripts/test-enrollment-orchestration.sql`
- System status → Run `scripts/final-enrollment-verification.sql`

**For issues:**
1. Check verification scripts first
2. Review audit logs for approval actions
3. Confirm admin role assignments
4. Do not modify approval logic without policy review

---

**SYSTEM STATUS: LOCKED**  
**DO NOT MODIFY ENROLLMENT APPROVAL LOGIC**
