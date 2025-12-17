# Multi-Tenant Foundation Migration Instructions

## Prerequisites

1. Get your Supabase Service Role Key:
   - Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
   - Copy the `service_role` key (not the `anon` key)
   - Add to `.env.local.real`: `SUPABASE_SERVICE_ROLE_KEY=your_key_here`

## Apply Migrations

### Option 1: Automated Script (Recommended)

```bash
# Set the service role key first
export SUPABASE_SERVICE_ROLE_KEY="your_key_here"

# Run the migration script
bash scripts/apply-migrations.sh
```

### Option 2: Manual via Supabase Dashboard

1. Go to SQL Editor: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql

2. Apply migrations in this order:

   **Migration 1: Multi-Tenant Foundation**
   - File: `supabase/002_multi_tenant_foundation.sql`
   - Creates: organizations, organization_users, organization_settings tables
   - Adds: organization_id columns to profiles, programs, courses, enrollments

   **Migration 2: Reporting Views**
   - File: `supabase/003_workforce_reporting_views.sql`
   - Creates: reporting_enrollments, reporting_progress, reporting_completions, etc.
   - Conditional: Only creates views if dependencies exist

   **Migration 3: Org Invites**
   - File: `supabase/004_org_invites.sql`
   - Creates: org_invites table with secure RLS
   - Adds: get_invite_by_token() function

   **Migration 4: Subscriptions**
   - File: `supabase/005_org_subscriptions.sql`
   - Creates: organization_subscriptions table
   - Adds: license tracking and billing integration

3. For each migration:
   - Copy the entire file content
   - Paste into SQL Editor
   - Click "Run"
   - Verify no errors

## Verification Checklist

After applying migrations, verify:

### Tables Created

- [ ] `organizations` table exists
- [ ] `organization_users` table exists
- [ ] `organization_settings` table exists
- [ ] `org_invites` table exists
- [ ] `organization_subscriptions` table exists

### Columns Added

- [ ] `profiles.organization_id` exists
- [ ] `programs.organization_id` exists
- [ ] `courses.organization_id` exists
- [ ] `enrollments.organization_id` exists

### RLS Policies

- [ ] All new tables have RLS enabled
- [ ] Org-scoped policies are active
- [ ] Invite policies restrict SELECT to org admins only

### Views Created

- [ ] `reporting_enrollments` view exists
- [ ] `reporting_progress` view exists (if lesson_progress table exists)
- [ ] `reporting_completions` view exists
- [ ] `reporting_credentials` view exists (if certificates table exists)
- [ ] `reporting_funding` view exists

### Functions Created

- [ ] `get_invite_by_token()` function exists

## Troubleshooting

### Migration Fails: "column already exists"

- This is safe - the migration uses `IF NOT EXISTS` and `ADD COLUMN IF NOT EXISTS`
- The migration is idempotent and can be re-run

### Migration Fails: "table does not exist"

- Check that `001_initial_schema.sql` was applied first
- Verify base tables exist: profiles, programs, courses, enrollments

### RLS Policy Errors

- Ensure auth.users table is accessible
- Check that organization_users table was created first

### View Creation Fails

- Check error message for missing columns
- Verify enrollments table has: organization_id, payment_status, funding_details
- Verify profiles table has: full_name, email

## Next Steps After Migration

1. **Build the application:**

   ```bash
   pnpm build
   ```

2. **Test org isolation:**
   - Create two test organizations
   - Verify Org A cannot read Org B data

3. **Test invite flow:**
   - POST to `/api/org/invite` with email and role
   - Verify email sent (if RESEND_API_KEY configured)
   - Accept invite via `/api/org/accept-invite`

4. **Test reporting endpoints:**
   - GET `/api/reports/enrollments`
   - GET `/api/reports/progress`
   - Verify org-scoped data only

## Rollback (if needed)

To rollback migrations:

```sql
-- Drop views
DROP VIEW IF EXISTS reporting_enrollments CASCADE;
DROP VIEW IF EXISTS reporting_progress CASCADE;
DROP VIEW IF EXISTS reporting_completions CASCADE;
DROP VIEW IF EXISTS reporting_credentials CASCADE;
DROP VIEW IF EXISTS reporting_funding CASCADE;
DROP VIEW IF EXISTS reporting_outcomes CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS get_invite_by_token(TEXT);

-- Drop tables (WARNING: This deletes data)
DROP TABLE IF EXISTS organization_subscriptions CASCADE;
DROP TABLE IF EXISTS org_invites CASCADE;
DROP TABLE IF EXISTS organization_settings CASCADE;
DROP TABLE IF EXISTS organization_users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Remove columns (WARNING: This deletes data)
ALTER TABLE profiles DROP COLUMN IF EXISTS organization_id;
ALTER TABLE programs DROP COLUMN IF EXISTS organization_id;
ALTER TABLE courses DROP COLUMN IF EXISTS organization_id;
ALTER TABLE enrollments DROP COLUMN IF EXISTS organization_id;
```
