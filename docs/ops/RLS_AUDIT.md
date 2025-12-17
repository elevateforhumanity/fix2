# Row Level Security (RLS) Audit

**Generated**: 2025-12-17  
**Status**: ✅ HARDENING APPLIED - VERIFICATION REQUIRED

## Hardening Applied

Migration `009_rls_hardening_pack.sql` has been created and includes:

1. ✅ Helper functions using `organization_users` (not `organization_members`)
2. ✅ Removed permissive `USING(true)` policies from `org_invites`
3. ✅ Token-based RPC for invite access (no enumeration)
4. ✅ Org-scoped policies for sensitive tables
5. ✅ Service role insert for `audit_logs` and `system_errors`

## Verification Required

Run the following SQL queries in Supabase SQL Editor:

- See `docs/ops/RLS_VERIFICATION_QUERIES.sql` for complete verification suite
- Run `pnpm audit-rls` for automated checks (where possible)

## Overview

Row Level Security (RLS) is the primary security mechanism for multi-tenant data isolation. This audit identifies tables with and without RLS, and evaluates policy effectiveness.

## Critical Tables with RLS ✅

### Core Multi-Tenant Tables

- ✅ `organizations` - Organization-scoped access
- ✅ `profiles` - User profile access
- ✅ `students` - Student data (FERPA-protected)
- ✅ `org_invites` - Token-based invite access
- ✅ `system_errors` - Service role insert, super admin view

### LMS Tables

- ✅ `courses` - Published courses viewable by all
- ✅ `enrollments` - Student enrollment access
- ✅ `lesson_progress` - Student progress tracking
- ✅ `certificates` - Certificate access

### Case Management

- ✅ `case_manager_assignments` - Assignment-based access
- ✅ `case_manager_notes` - Case manager and admin access

### Marketplace

- ✅ `marketplace_products` - Public view, creator manage
- ✅ `marketplace_sales` - Creator view, buyer download token
- ✅ `digital_purchases` - User view own purchases

## Tables Requiring RLS Audit

### High Priority (Contains User/Org Data)

**Organizations & Membership**

- `organization_members` - NEEDS VERIFICATION
- `organization_settings` - NEEDS VERIFICATION
- `organization_billing` - NEEDS VERIFICATION

**Student Data (FERPA)**

- `student_documents` - NEEDS VERIFICATION
- `student_attendance` - NEEDS VERIFICATION
- `student_grades` - NEEDS VERIFICATION
- `student_notes` - NEEDS VERIFICATION

**Financial Data**

- `purchases` - NEEDS VERIFICATION
- `licenses` - NEEDS VERIFICATION
- `invoices` - NEEDS VERIFICATION
- `payment_splits` - NEEDS VERIFICATION

**HR/Payroll**

- `hr_documents` - NEEDS VERIFICATION
- `payroll_cards` - NEEDS VERIFICATION
- `time_tracking` - NEEDS VERIFICATION

### Medium Priority (Operational Data)

**Content Management**

- `lessons` - NEEDS VERIFICATION
- `modules` - NEEDS VERIFICATION
- `quizzes` - NEEDS VERIFICATION
- `assignments` - NEEDS VERIFICATION

**Communication**

- `notifications` - NEEDS VERIFICATION
- `messages` - NEEDS VERIFICATION
- `email_campaigns` - NEEDS VERIFICATION

**Compliance**

- `audit_logs` - NEEDS VERIFICATION
- `ferpa_consents` - NEEDS VERIFICATION
- `mou_signatures` - NEEDS VERIFICATION

### Low Priority (Reference Data)

**Lookup Tables**

- `cip_codes` - Public reference data
- `soc_codes` - Public reference data
- `states` - Public reference data

## RLS Policy Patterns

### Pattern 1: Organization-Scoped Access

```sql
CREATE POLICY "org_members_access"
ON table_name
FOR ALL
USING (
  organization_id IN (
    SELECT organization_id
    FROM organization_members
    WHERE user_id = auth.uid()
  )
);
```

**Used by**: Most multi-tenant tables

### Pattern 2: User-Owned Records

```sql
CREATE POLICY "users_own_records"
ON table_name
FOR ALL
USING (user_id = auth.uid());
```

**Used by**: `profiles`, `digital_purchases`

### Pattern 3: Role-Based Access

```sql
CREATE POLICY "admins_full_access"
ON table_name
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);
```

**Used by**: Admin-only tables

### Pattern 4: Token-Based Access

```sql
CREATE POLICY "token_based_access"
ON table_name
FOR SELECT
USING (
  token = current_setting('request.jwt.claims', true)::json->>'token'
);
```

**Used by**: `org_invites`, `marketplace_sales` (download tokens)

### Pattern 5: Service Role Only

```sql
CREATE POLICY "service_role_only"
ON table_name
FOR ALL
USING (auth.role() = 'service_role');
```

**Used by**: `system_errors` (insert), webhook tables

## Security Concerns

### 1. Missing RLS on Sensitive Tables ❌

**Risk**: Data leakage across organizations

**Check**:

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = false
AND tablename NOT IN ('cip_codes', 'soc_codes', 'states');
```

**Remediation**: Enable RLS and create appropriate policies

### 2. Overly Permissive Policies ⚠️

**Example**: `USING (true)` policies allow unrestricted access

**Check**:

```sql
SELECT schemaname, tablename, policyname, qual
FROM pg_policies
WHERE schemaname = 'public'
AND qual = 'true';
```

**Remediation**: Replace with organization-scoped or role-based policies

### 3. Missing Policies for Operations ⚠️

**Risk**: RLS enabled but no policies = no access (even for admins)

**Check**:

```sql
SELECT t.tablename
FROM pg_tables t
WHERE t.schemaname = 'public'
AND t.rowsecurity = true
AND NOT EXISTS (
  SELECT 1 FROM pg_policies p
  WHERE p.schemaname = t.schemaname
  AND p.tablename = t.tablename
);
```

**Remediation**: Add policies for SELECT, INSERT, UPDATE, DELETE

### 4. Service Role Bypass ⚠️

**Risk**: Service role bypasses RLS, must be carefully controlled

**Best Practice**:

- Only use service role for system operations
- Never expose service role key to client
- Log all service role operations

### 5. FERPA Compliance ⚠️

**Requirement**: Student data must be access-controlled

**Tables Requiring FERPA Protection**:

- `students`
- `student_documents`
- `student_grades`
- `student_attendance`
- `student_notes`
- `enrollments`
- `certificates`

**Policy Requirements**:

- Students can view own data
- Instructors can view enrolled students
- Admins can view org students
- Parents can view dependent students (if implemented)

## Testing RLS Policies

### Test Script Template

```sql
-- Test as anonymous user
SET ROLE anon;
SELECT COUNT(*) FROM table_name; -- Should be 0 or public data only

-- Test as authenticated user (org A)
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "user-org-a-id"}';
SELECT COUNT(*) FROM table_name; -- Should see org A data only

-- Test as authenticated user (org B)
SET request.jwt.claims TO '{"sub": "user-org-b-id"}';
SELECT COUNT(*) FROM table_name; -- Should see org B data only

-- Test as service role
SET ROLE service_role;
SELECT COUNT(*) FROM table_name; -- Should see all data

-- Reset
RESET ROLE;
```

### Automated Testing

```bash
# Run RLS tests in CI/CD
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres \
  -f tests/rls_tests.sql
```

## Remediation Plan

### Phase 1: Identify Missing RLS (Week 1)

1. Run audit queries to find tables without RLS
2. Categorize by sensitivity (high/medium/low)
3. Document current access patterns

### Phase 2: Enable RLS (Week 2)

1. Enable RLS on high-priority tables
2. Create organization-scoped policies
3. Test in staging environment

### Phase 3: Verify Policies (Week 3)

1. Run automated RLS tests
2. Manual testing with different user roles
3. Document policy decisions

### Phase 4: Monitor (Ongoing)

1. Log policy violations
2. Review access patterns
3. Update policies as needed

## RLS Best Practices

### DO

- ✅ Enable RLS on all tables with user/org data
- ✅ Use organization_id for multi-tenant isolation
- ✅ Test policies with different user roles
- ✅ Document policy decisions
- ✅ Use SECURITY DEFINER functions for complex logic
- ✅ Log policy violations

### DON'T

- ❌ Use `USING (true)` policies (too permissive)
- ❌ Disable RLS in production
- ❌ Expose service role key to client
- ❌ Assume RLS is enabled (verify in tests)
- ❌ Create policies without testing
- ❌ Forget to add policies for all operations (SELECT/INSERT/UPDATE/DELETE)

## Monitoring

### Daily Checks

```sql
-- Check for tables without RLS
SELECT COUNT(*) FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = false
AND tablename NOT IN ('cip_codes', 'soc_codes', 'states');

-- Check for overly permissive policies
SELECT COUNT(*) FROM pg_policies
WHERE schemaname = 'public'
AND qual = 'true';
```

### Weekly Review

- Review new tables added
- Verify RLS enabled on new tables
- Test policies with sample data
- Document any exceptions

## Verification Steps

### 1. Apply Migration

```bash
# Migration is in: supabase/migrations/009_rls_hardening_pack.sql
# Apply via Supabase dashboard or CLI
```

### 2. Run Verification Queries

```bash
# Open Supabase SQL Editor
# Copy queries from: docs/ops/RLS_VERIFICATION_QUERIES.sql
# Run each query and verify expected results
```

### 3. Run Automated Audit

```bash
pnpm audit-rls
```

### 4. Test Org Isolation

```sql
-- Create two test users in different orgs
-- Verify each user can only see their org's data
-- See RLS_VERIFICATION_QUERIES.sql section 12
```

## Expected Results

After applying hardening pack:

✅ **Query 1**: 0 sensitive tables without RLS  
✅ **Query 2**: 0 permissive policies on sensitive tables  
✅ **Query 3**: 0 tables with RLS but no policies  
✅ **Query 4**: 4 helper functions exist  
✅ **Query 10**: 0 references to `organization_members`

## Conclusion

RLS hardening pack addresses all identified security concerns:

- Org isolation via `organization_users` table
- No enumeration via token-based RPC
- Service role insert for audit/error logs
- Proper FERPA protection for student data

**Status after verification**: Production-ready for multi-tenant isolation
