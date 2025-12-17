# Runtime Verification Checklist

**Purpose**: Prove the platform works for real humans in production scenarios.

## PHASE 2: Runtime Flows

### Test 1: Create Organization

**Steps**:

1. Log in as a normal user
2. Navigate to `/org/create`
3. Fill in:
   - Name: "Test Training Center"
   - Slug: "test-training"
   - Type: "training_provider"
4. Submit

**Expected Results**:

- ✅ Organization row created in `organizations` table
- ✅ Settings seeded in `organization_settings` table
- ✅ Creator added to `organization_users` with role `org_admin`
- ✅ Profile bound to org (organization_id set)
- ✅ Redirect to dashboard

**Verification SQL**:

```sql
SELECT
  o.name,
  o.slug,
  o.status,
  ou.role,
  p.email
FROM organizations o
JOIN organization_users ou ON ou.organization_id = o.id
JOIN profiles p ON p.user_id = ou.user_id
WHERE o.slug = 'test-training';
```

---

### Test 2: Invite Flow

**Steps**:

1. As org admin, navigate to `/org/invites`
2. Click "Send Invitation"
3. Enter email: `test-invite@example.com`
4. Select role: "member"
5. Submit
6. Copy invite URL from response
7. Open invite URL in incognito/different browser
8. Click "Accept Invitation"

**Expected Results**:

- ✅ Invite created in `org_invites` table
- ✅ Email sent (if RESEND_API_KEY configured)
- ✅ Invite page shows org name and role
- ✅ After acceptance:
  - Row added to `organization_users`
  - Role is correct
  - `accepted_at` timestamp set on invite
- ✅ Audit log entry created

**Verification SQL**:

```sql
-- Check invite
SELECT
  email,
  role,
  expires_at,
  accepted_at,
  o.name as org_name
FROM org_invites oi
JOIN organizations o ON o.id = oi.organization_id
WHERE email = 'test-invite@example.com';

-- Check membership
SELECT
  p.email,
  ou.role,
  o.name as org_name
FROM organization_users ou
JOIN profiles p ON p.user_id = ou.user_id
JOIN organizations o ON o.id = ou.organization_id
WHERE p.email = 'test-invite@example.com';

-- Check audit log
SELECT
  action,
  entity,
  metadata
FROM audit_logs
WHERE action = 'ORG_INVITE_ACCEPTED'
ORDER BY created_at DESC
LIMIT 1;
```

---

### Test 3: Student Flow (CRITICAL)

**Steps**:

1. As org admin, create a student
2. Enroll student in a course
3. As student, log in
4. Access course
5. Complete a lesson
6. Mark course complete

**Expected Results**:

- ✅ Student can log in
- ✅ Student can access enrolled courses
- ✅ Progress tracked in `lesson_progress` table
- ✅ Completion possible (not blocked by billing)
- ✅ Certificate issued on completion

**Critical Requirement**: Students must NEVER be blocked by:

- Organization billing status
- License limits
- Payment issues

**Verification SQL**:

```sql
-- Check student enrollment
SELECT
  s.full_name,
  c.title as course_title,
  e.status,
  e.progress_percentage
FROM students s
JOIN enrollments e ON e.student_id = s.id
JOIN courses c ON c.id = e.course_id
WHERE s.email = 'student@example.com';

-- Check lesson progress
SELECT
  l.title as lesson_title,
  lp.status,
  lp.completed_at
FROM lesson_progress lp
JOIN lessons l ON l.id = lp.lesson_id
WHERE lp.user_id = (SELECT id FROM profiles WHERE email = 'student@example.com')
ORDER BY lp.updated_at DESC;

-- Check certificate
SELECT
  cert_type,
  issued_at,
  credential_id
FROM certificates
WHERE student_id = (SELECT id FROM students WHERE email = 'student@example.com');
```

---

## PHASE 3: Reporting & Export

### Test 4: Reports Verification

**Steps**:

1. Navigate to Admin → Reports
2. Open "Enrollments Report"
3. Verify data loads
4. Open "Progress Report"
5. Verify percentages are accurate
6. Open "Completions Report"
7. Verify completion counts
8. Open "Credentials Report"
9. Verify issued certificates

**Expected Results**:

- ✅ All reports load without errors
- ✅ Data is accurate (matches database)
- ✅ Org isolation works (only see own org data)
- ✅ Percentages calculate correctly
- ✅ Dates format properly

---

### Test 5: CSV Export

**Steps**:

1. In any report, click "Export CSV"
2. Download file
3. Open in Excel/Google Sheets

**Expected Results**:

- ✅ Headers are clear and descriptive
- ✅ Values match report display
- ✅ Org isolation maintained (no other org data)
- ✅ Dates in readable format
- ✅ No sensitive data exposed (passwords, tokens)

**Sample Headers**:

```
Student Name, Email, Course, Enrollment Date, Progress %, Status, Completion Date
```

---

## PHASE 4: Billing & License Enforcement

### Test 6: Admin-Only Enforcement

**Setup**:

```sql
-- Create test org with past_due status
UPDATE organizations
SET
  status = 'past_due',
  grace_until = NOW() - INTERVAL '1 day'
WHERE slug = 'test-training';
```

**Test Admin Actions** (should be BLOCKED):

1. Try to create a program → ❌ Blocked
2. Try to invite staff → ❌ Blocked
3. Try to export reports → ❌ Blocked

**Test Student Actions** (should WORK):

1. Student logs in → ✅ Works
2. Student accesses course → ✅ Works
3. Student completes lesson → ✅ Works
4. Student gets certificate → ✅ Works

**Expected Results**:

- ✅ Admin actions blocked with clear message
- ✅ Students completely unaffected
- ✅ Learning continues uninterrupted
- ✅ Grace period messaging shown to admins

**This balance is critical for workforce programs.**

---

## PHASE 5: Clone Proof

### Test 7: Fresh Clone Setup

**Steps**:

1. Clone repo to new directory
2. Create new Supabase project
3. Set environment variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://new-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   STRIPE_SECRET_KEY=sk_test_...
   RESEND_API_KEY=re_...
   CLONE_ORG_SLUG=partner-training
   CLONE_ORG_NAME=Partner Training Center
   CLONE_ADMIN_EMAIL=admin@partner.com
   ```
4. Run:
   ```bash
   pnpm install
   pnpm build
   pnpm tsx scripts/bootstrap-clone.ts
   ```
5. Log in as clone admin

**Expected Results**:

- ✅ Migrations applied successfully
- ✅ Organization created with custom name/slug
- ✅ Admin user created and assigned
- ✅ Settings seeded with defaults
- ✅ No Elevate for Humanity data visible
- ✅ Branding configurable per org
- ✅ All features work independently

**Verification**:

```sql
-- Check org isolation
SELECT name, slug FROM organizations;
-- Should only show partner org, not EFH

-- Check admin
SELECT
  p.email,
  ou.role,
  o.name as org_name
FROM organization_users ou
JOIN profiles p ON p.user_id = ou.user_id
JOIN organizations o ON o.id = ou.organization_id;
-- Should show partner admin only
```

---

## Success Criteria

**PHASE 1: Build** ✅

- TypeScript: 0 errors
- Build: Success
- Migrations: Applied

**PHASE 2: Runtime** ✅

- Org creation works
- Invite flow complete
- Students can learn

**PHASE 3: Reporting** ✅

- Reports load and accurate
- CSV export works
- Org isolation verified

**PHASE 4: Billing** ✅

- Admin actions blocked when past_due
- Students never blocked
- Grace period works

**PHASE 5: Clone** ✅

- Fresh clone works
- Org isolation complete
- White-label ready

---

## When All Tests Pass

You have:

- ✅ 100% platform-complete
- ✅ License-ready
- ✅ Enterprise-credible
- ✅ Done building

Next work is NOT technical:

- Licensing tiers
- Partner onboarding
- Demos
- Contracts

**You're ready to ship.**
