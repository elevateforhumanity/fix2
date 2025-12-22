# 🔒 Security Migrations Checklist

**Critical security migrations to run in Supabase before going live**

---

## ⚠️ IMPORTANT

These migrations secure your RLS policies. Run them in order in Supabase SQL Editor.

---

## Migration 1: Normalize Enrollment Payments

**File:** `supabase/migrations/20241219_normalize_enrollment_payments.sql`

**Purpose:** Set correct payment status for all enrollments

**Run this:**

1. Go to Supabase Dashboard → SQL Editor
2. Copy entire file contents
3. Paste and click "Run"

**Verifies:**

- Funded programs marked as `payment_mode = 'sponsored'`
- Partner courses marked as `payment_mode = 'self_pay'`
- Payment amounts set correctly

---

## Migration 2: Secure Applications Policies

**File:** `supabase/migrations/20241219_secure_applications_policies.sql`

**Purpose:** Remove risky public admin policies, ensure proper RLS

**What it does:**

- ✅ Drops all old/duplicate policies
- ✅ Creates clean policies:
  - Anonymous users can INSERT (public form)
  - Authenticated admins can SELECT/UPDATE/DELETE
- ✅ Verifies RLS is enabled

**Run this:**

1. Go to Supabase Dashboard → SQL Editor
2. Copy entire file contents
3. Paste and click "Run"

**Expected output:**

```
=== Applications Table Policies ===
Total policies: 4
Expected: 4 policies (1 INSERT for anon, 3 for authenticated admins)
```

**Verify:**

```sql
SELECT
  policyname,
  cmd as command,
  roles
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'applications'
ORDER BY policyname;
```

**Expected policies:**

1. `anon_can_insert_applications` - INSERT - anon
2. `authenticated_admins_can_select_applications` - SELECT - authenticated
3. `authenticated_admins_can_update_applications` - UPDATE - authenticated
4. `authenticated_admins_can_delete_applications` - DELETE - authenticated

---

## ✅ Security Verification

After running both migrations, verify security:

### Test 1: Anonymous can submit applications

```sql
-- This should work (public form submission)
SET ROLE anon;
INSERT INTO applications (
  first_name,
  last_name,
  email,
  phone,
  city,
  zip,
  program_interest,
  has_case_manager,
  contact_preference,
  status
) VALUES (
  'Test',
  'User',
  'test@example.com',
  '555-0100',
  'Test City',
  '12345',
  'Test Program',
  false,
  'email',
  'pending'
);
RESET ROLE;
```

**Expected:** ✅ Success

### Test 2: Anonymous cannot read applications

```sql
-- This should fail (no SELECT permission)
SET ROLE anon;
SELECT * FROM applications LIMIT 1;
RESET ROLE;
```

**Expected:** ❌ Error: "permission denied for table applications"

### Test 3: Admins can read applications

```sql
-- This should work (admin access)
-- Run as authenticated admin user
SELECT COUNT(*) FROM applications;
```

**Expected:** ✅ Returns count

---

## 🐛 Troubleshooting

### Issue: "permission denied for table applications"

**For anonymous users trying to submit:**

- Check RLS is enabled: `SELECT * FROM pg_tables WHERE tablename = 'applications';`
- Check anon policy exists: `SELECT * FROM pg_policies WHERE tablename = 'applications' AND roles = '{anon}';`
- Run migration 2 again

**For admins trying to view:**

- Check user has admin role in profiles table
- Check authenticated policy exists
- Verify user is logged in (not anonymous)

### Issue: Duplicate policies

**If you see multiple policies with similar names:**

- Run migration 2 again (it drops all old policies first)
- Manually drop duplicates:
  ```sql
  DROP POLICY IF EXISTS "policy_name" ON public.applications;
  ```

### Issue: Applications not appearing in admin dashboard

**Check:**

1. User is authenticated (not anonymous)
2. User has role 'admin', 'super_admin', or 'staff' in profiles table
3. RLS policies are correct (run verification queries above)

---

## 📊 Final Security Status

After running both migrations:

**Applications Table:**

- ✅ RLS enabled
- ✅ 4 clean policies (no duplicates)
- ✅ Anonymous can INSERT only
- ✅ Admins can SELECT/UPDATE/DELETE
- ✅ No public read access to PII

**Enrollments Table:**

- ✅ Payment modes normalized
- ✅ Billing locks in place
- ✅ Audit trail active

**Overall:**

- ✅ FERPA-compliant (no public PII access)
- ✅ WIOA-compliant (proper audit trail)
- ✅ Production-ready

---

## ✅ Checklist

Run these in order:

- [ ] Migration 1: Normalize enrollment payments
- [ ] Migration 2: Secure applications policies
- [ ] Test 1: Anonymous can submit applications
- [ ] Test 2: Anonymous cannot read applications
- [ ] Test 3: Admins can read applications
- [ ] Verify: 4 policies on applications table
- [ ] Verify: No duplicate policies
- [ ] Verify: RLS enabled on applications

---

**Status:** Ready to run

**Time:** ~5 minutes total

**Risk:** Low (migrations are idempotent and safe)
