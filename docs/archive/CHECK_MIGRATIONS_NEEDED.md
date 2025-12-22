# Migration Check: tenant_licenses Table

## Status: ✅ MIGRATION CREATED

### What Was Added

**File:** `/workspaces/fix2/supabase/migrations/20241221_tenant_licenses.sql`

This migration adds the `tenant_licenses` table needed for Stripe-based subscription management and license enforcement.

---

## What the Migration Does

### 1. Creates `tenant_licenses` Table

Stores subscription data for each tenant:

- `plan` (starter, pro, enterprise)
- `max_employers` (license limit)
- `max_apprentices` (license limit)
- `active` (subscription status)
- `stripe_customer_id` (Stripe customer)
- `stripe_subscription_id` (Stripe subscription)

### 2. Adds Indexes

- `idx_tenant_licenses_tenant` — Fast tenant lookups
- `idx_tenant_licenses_stripe_sub` — Fast Stripe subscription lookups

### 3. Enables RLS (Row Level Security)

- Tenants can view their own license
- Only service role can manage licenses (via webhooks)

### 4. Creates `license_usage` View

Real-time monitoring of:

- Current employers vs. max
- Current apprentices vs. max
- Usage percentages
- Active status

### 5. Adds Triggers

- Auto-update `updated_at` timestamp

---

## How to Run the Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the contents of `/workspaces/fix2/supabase/migrations/20241221_tenant_licenses.sql`
5. Paste into the editor
6. Click **Run**
7. Verify success (should see "Success. No rows returned")

---

### Option 2: Supabase CLI

```bash
cd /workspaces/fix2
supabase db push
```

This will apply all pending migrations including the new `tenant_licenses` table.

---

### Option 3: Manual SQL

If you prefer to run it manually:

```bash
cd /workspaces/fix2
cat supabase/migrations/20241221_tenant_licenses.sql
```

Copy the output and run it in your database client.

---

## How to Verify Migration Ran Successfully

### Check 1: Table Exists

Run this in Supabase SQL Editor:

```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'tenant_licenses'
);
```

**Expected:** `true`

---

### Check 2: View Exists

```sql
SELECT EXISTS (
  SELECT FROM information_schema.views
  WHERE table_schema = 'public'
  AND table_name = 'license_usage'
);
```

**Expected:** `true`

---

### Check 3: Test Query

```sql
SELECT * FROM tenant_licenses LIMIT 1;
```

**Expected:** Empty result (no error)

---

### Check 4: Test View

```sql
SELECT * FROM license_usage LIMIT 1;
```

**Expected:** Empty result (no error)

---

## Dependencies

This migration requires these tables to exist (they already do):

- ✅ `tenants` (created in `20251218_white_label.sql`)
- ✅ `employers` (created in `20251217_employers.sql`)
- ✅ `apprentices` (created in `20241209_complete_lms_system.sql` or `20251215_apprenticeship_hours.sql`)

---

## What Happens After Migration

### 1. Stripe Webhooks Will Work

When a customer completes checkout:

- Webhook creates tenant
- Webhook creates license record
- License limits are enforced

### 2. License Enforcement Works

Before creating employers or apprentices:

```typescript
import { enforceLimits } from '@/lib/license-enforcement';

const check = await enforceLimits(tenantId, 'employer');
if (!check.allowed) {
  throw new Error(check.reason);
}
```

### 3. Usage Monitoring Works

Dashboard can show:

```typescript
import { checkLicenseStatus } from '@/lib/license-enforcement';

const status = await checkLicenseStatus(tenantId);
console.log(status.usage.employers); // { current: 3, max: 5, percentage: 60 }
```

---

## Rollback (If Needed)

If you need to undo this migration:

```sql
-- Drop view
DROP VIEW IF EXISTS license_usage;

-- Drop trigger
DROP TRIGGER IF EXISTS tenant_licenses_updated_at ON tenant_licenses;
DROP FUNCTION IF EXISTS update_tenant_licenses_updated_at();

-- Drop policies
DROP POLICY IF EXISTS "Tenants can view own license" ON tenant_licenses;
DROP POLICY IF EXISTS "Service role can manage licenses" ON tenant_licenses;

-- Drop indexes
DROP INDEX IF EXISTS idx_tenant_licenses_tenant;
DROP INDEX IF EXISTS idx_tenant_licenses_stripe_sub;

-- Drop table
DROP TABLE IF EXISTS tenant_licenses;
```

---

## Next Steps After Migration

### 1. Configure Stripe

Follow `/workspaces/fix2/STRIPE_SETUP.md` to:

- Create products and prices
- Get API keys
- Set up webhook endpoint
- Test checkout flow

### 2. Test License Enforcement

```bash
cd /workspaces/fix2
npm run dev
```

Navigate to `/pricing` and test checkout flow.

### 3. Monitor Usage

Create a dashboard widget to show license usage:

```typescript
const status = await checkLicenseStatus(tenantId);
// Display status.usage.employers and status.usage.apprentices
```

---

## Troubleshooting

### Error: "relation 'tenants' does not exist"

**Solution:** Run the white_label migration first:

```bash
supabase db push
```

### Error: "relation 'employers' does not exist"

**Solution:** Run the employers migration first:

```bash
supabase db push
```

### Error: "relation 'apprentices' does not exist"

**Solution:** Run the apprenticeship_hours migration first:

```bash
supabase db push
```

### Error: "permission denied for table tenant_licenses"

**Solution:** Check RLS policies are enabled and correct.

---

## Summary

✅ **Migration file created:** `20241221_tenant_licenses.sql`  
✅ **Dependencies verified:** tenants, employers, apprentices tables exist  
✅ **Ready to run:** Use Supabase Dashboard SQL Editor  
✅ **Safe to run:** Includes `IF NOT EXISTS` checks  
✅ **Rollback available:** See rollback section above

**Action Required:** Run the migration in Supabase SQL Editor

---

**Created:** 2024-12-21  
**Status:** Ready to deploy  
**Priority:** Required for Stripe checkout to work
