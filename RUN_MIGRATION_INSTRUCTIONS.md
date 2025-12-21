# Run Tenant Licenses Migration

## ⚠️ CRITICAL: This migration must be run before Stripe checkout will work

The `tenant_licenses` table is required for the Stripe integration to function.

## How to Run the Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `/supabase/migrations/20241221_tenant_licenses.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Verify success message appears

### Option 2: Supabase CLI

```bash
# If you have Supabase CLI installed
supabase db push

# Or run the specific migration
supabase migration up
```

### Option 3: Direct SQL

```bash
# If you have psql installed and connection string
psql "your-supabase-connection-string" < supabase/migrations/20241221_tenant_licenses.sql
```

## What This Migration Does

1. **Creates `tenant_licenses` table** - Stores subscription plans and limits
2. **Adds indexes** - For performance on tenant_id and stripe_subscription_id lookups
3. **Enables RLS** - Row-level security for data isolation
4. **Creates policies** - Tenants can view their own license, service role can manage
5. **Adds `license_usage` view** - Real-time monitoring of usage vs limits
6. **Adds triggers** - Auto-updates `updated_at` timestamp

## Verification

After running the migration, verify it worked:

```sql
-- Check table exists
SELECT * FROM tenant_licenses LIMIT 1;

-- Check view exists
SELECT * FROM license_usage LIMIT 1;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'tenant_licenses';
```

## Time Required

⏱️ **2 minutes** - The migration is fast and safe to run

## Rollback (if needed)

If you need to rollback:

```sql
DROP VIEW IF EXISTS license_usage;
DROP TABLE IF EXISTS tenant_licenses CASCADE;
```

## Next Steps

After running this migration:

1. ✅ Stripe checkout will work
2. ✅ License enforcement will activate
3. ✅ Webhooks will update licenses automatically
4. ✅ Usage monitoring will be available

## Support

If you encounter errors:

- Check that `tenants` table exists (required foreign key)
- Check that `employers` and `apprentices` tables exist (for the view)
- Verify you have admin/service_role permissions
