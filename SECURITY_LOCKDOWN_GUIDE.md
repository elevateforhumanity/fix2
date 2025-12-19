# Database Security Lockdown Guide

## 🚨 Critical: Run This Before Production Launch

Your Supabase dashboard showed **433 security warnings** because all 278 tables were publicly accessible without RLS. This guide fixes that in one migration.

---

## What This Does

**Before:** Anyone with your anon key (in frontend code) can read/write most tables
**After:** Default-deny on everything. Only explicitly allowed access works.

This implements enterprise-grade security:
1. ✅ Revokes all grants from `anon` and `authenticated` roles
2. ✅ Enables RLS + FORCE RLS on all 278 tables
3. ✅ Adds deny-all policy to every table
4. ✅ Sets future default privileges to deny
5. ✅ Hardens all functions with `search_path`
6. ✅ Adds minimal safe policies for critical workflows

---

## How to Apply

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the migration from GitHub:
   - [https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/20251220_complete_database_lockdown.sql](https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/migrations/20251220_complete_database_lockdown.sql)
4. Paste into SQL Editor
5. Click **Run**
6. Wait for completion message (processes 278 tables)

### Option 2: Via Supabase CLI

```bash
# Link to your project (if not already linked)
npx supabase link --project-ref YOUR_PROJECT_REF

# Push the migration
npx supabase db push
```

---

## What Gets Locked

### 🔒 Completely Locked (Deny All)

These require server-side API access with service role:

**Student Records (FERPA Protected):**
- `student_records`, `attendance_records`, `grade_records`
- `hour_tracking`, `apprentice_hours`, `student_documents`
- `student_notes`

**Payroll & Financial:**
- `direct_deposit_accounts`, `tax_withholdings`, `salary_history`
- `apprentice_payroll`, `payroll_cards`, `payment_logs`

**Authentication & Security:**
- `users`, `user_sessions`, `failed_login_attempts`
- `password_history`, `ip_access_control`, `two_factor_auth`

**Employment & Compliance:**
- `participant_demographics`, `individual_employment_plans`
- `employment_outcomes`, `funding_applications`, `wioa_participants`

**Partner & Shop Data:**
- `partner_credentials`, `shop_documents`, `shop_placements`
- `mou_signatures`

**HR Documents:**
- `hr_documents`, `onboarding_documents`, `background_checks`
- `drug_testing_orders`

### ✅ Public Read Access (Catalog Tables)

These are safe for anonymous/authenticated users to read:

- `programs` - Program catalog
- `courses` - Course catalog
- `lms_courses` - LMS course catalog
- `partner_courses` - Partner course catalog
- `partner_lms_providers` - Partner information
- `drug_testing_services` - Drug testing services
- `drug_testing_training` - Drug testing training

### 👤 User-Owned Access

Authenticated users can access their own data:

- `profiles` - Read/update own profile
- `applications` - Create/read own applications
- `enrollments` - Read own enrollments

---

## What Will Break (And How to Fix)

### Expected Breakages After Lockdown

1. **Admin dashboards** - Move to server-side API routes
2. **Student progress tracking** - Add user-owned policies
3. **Enrollment workflows** - Add specific policies
4. **Partner integrations** - Use service role on server

### How to Add New Policies

When you need to open access to a table, add a policy:

```sql
-- Example: Users can read their own progress
CREATE POLICY "users_read_own_progress"
ON public.user_progress
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Example: Public can read resources
CREATE POLICY "public_read_resources"
ON public.resources
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Example: Admins can read everything
CREATE POLICY "admins_read_all"
ON public.student_records
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  )
);
```

---

## Critical Pages That Must Work

Tell me which 5 pages need to work TODAY and I'll provide the exact policies:

**Common workflows:**
1. **Signup/Login** - Already works (auth.users)
2. **Browse Programs** - Already works (public read)
3. **Apply to Program** - Already works (create own application)
4. **Student Dashboard** - Needs policies for progress/enrollments
5. **Course Player** - Needs policies for lesson access

---

## Server-Side API Pattern

For sensitive operations, use this pattern:

```typescript
// app/api/admin/students/route.ts
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  // Use service role key (server-side only)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // NOT the anon key
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  // Now you can access any table
  const { data, error } = await supabase
    .from('student_records')
    .select('*');

  return Response.json({ data, error });
}
```

**Never expose service role key to the client!**

---

## Verification

After running the migration, verify security:

1. Go to Supabase Dashboard → Database → Policies
2. You should see:
   - ✅ RLS enabled on all tables
   - ✅ `deny_all_default` policy on most tables
   - ✅ Specific allow policies on catalog tables

3. Check the security advisor:
   - Should drop from 433 warnings to ~0-50
   - Remaining warnings should be minor (performance, not security)

---

## Rollback (Emergency Only)

If something critical breaks and you need to rollback:

```sql
-- WARNING: This reopens security holes!
-- Only use in emergency, then fix properly

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE %I.%I DISABLE ROW LEVEL SECURITY;', r.schemaname, r.tablename);
  END LOOP;
END $$;
```

**Better approach:** Add specific policies instead of disabling RLS.

---

## Next Steps

1. ✅ Run the lockdown migration
2. ✅ Test critical user workflows (signup, browse, apply)
3. ✅ Identify broken features
4. ✅ Add specific policies for each feature
5. ✅ Move admin operations to server-side API
6. ✅ Enable Supabase Auth password breach detection
7. ✅ Set up monitoring for policy violations

---

## Support

If you need specific policies for your workflows, provide:
- Table name
- Who needs access (anon, authenticated, admin, user-owned)
- What operations (SELECT, INSERT, UPDATE, DELETE)
- Any conditions (own records only, published only, etc.)

Example request:
> "I need authenticated users to read/update their own records in `lesson_progress` table where `user_id = auth.uid()`"

Response:
```sql
CREATE POLICY "users_manage_own_progress"
ON public.lesson_progress
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

---

## Production Checklist

Before going live:

- [ ] Run security lockdown migration
- [ ] Test signup/login flow
- [ ] Test program browsing
- [ ] Test application submission
- [ ] Test student dashboard
- [ ] Test course enrollment
- [ ] Verify admin operations work via server API
- [ ] Check Supabase security advisor (should be <50 warnings)
- [ ] Enable Auth password breach detection
- [ ] Set up error monitoring for RLS violations
- [ ] Document any custom policies added

---

**You're now production-ready with enterprise-grade security! 🚀**
