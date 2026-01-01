# White-Label Migrations - Run Instructions

**Date:** December 26, 2025  
**Status:** ⚠️ READY TO RUN  
**Migrations:** 9 files

---

## Quick Start

### Option 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Run each migration in order (copy/paste from files below)

### Option 2: Command Line (if DATABASE_URL is set)

```bash
cd /workspaces/fix2
psql "$DATABASE_URL" -f /tmp/run_white_label_migrations.sql
```

---

## Migrations to Run (In Order)

### 1. Add Tenant ID Columns

**File:** `supabase/migrations/20251223_add_tenant_id_columns.sql`  
**Purpose:** Add tenant_id to all business tables for multi-tenant isolation

```sql
-- Copy contents of: supabase/migrations/20251223_add_tenant_id_columns.sql
```

---

### 2. Create Licenses Table

**File:** `supabase/migrations/20251223_licenses.sql`  
**Purpose:** License management system for white-label customers

```sql
-- Copy contents of: supabase/migrations/20251223_licenses.sql
```

---

### 3. Create Tenant Branding

**File:** `supabase/migrations/20251223_tenant_branding.sql`  
**Purpose:** Custom branding per tenant (logo, colors, etc.)

```sql
-- Copy contents of: supabase/migrations/20251223_tenant_branding.sql
```

---

### 4. Create Tenant Domains

**File:** `supabase/migrations/20251223_tenant_domains.sql`  
**Purpose:** Custom domain mapping for tenants

```sql
-- Copy contents of: supabase/migrations/20251223_tenant_domains.sql
```

---

### 5. Create Demo Tenant

**File:** `supabase/migrations/20251223_demo_tenant.sql`  
**Purpose:** Demo tenant for testing

```sql
-- Copy contents of: supabase/migrations/20251223_demo_tenant.sql
```

---

### 6. Backfill Default Tenant

**File:** `supabase/migrations/20251223_backfill_default_tenant.sql`  
**Purpose:** Assign existing data to default tenant (Elevate for Humanity)

```sql
-- Copy contents of: supabase/migrations/20251223_backfill_default_tenant.sql
```

---

### 7. Create Employer Applications

**File:** `supabase/migrations/20251223_employer_applications.sql`  
**Purpose:** Employer application form submissions

```sql
-- Copy contents of: supabase/migrations/20251223_employer_applications.sql
```

---

### 8. Create Staff Applications

**File:** `supabase/migrations/20251223_staff_applications.sql`  
**Purpose:** Staff application form submissions

```sql
-- Copy contents of: supabase/migrations/20251223_staff_applications.sql
```

---

### 9. Setup Tenant RLS Policies

**File:** `supabase/migrations/20251223_tenant_rls_policies.sql`  
**Purpose:** Row-level security for tenant isolation

```sql
-- Copy contents of: supabase/migrations/20251223_tenant_rls_policies.sql
```

---

## Verification

After running all migrations, verify:

```sql
-- Check tenant_id columns exist
SELECT column_name, table_name
FROM information_schema.columns
WHERE column_name = 'tenant_id'
ORDER BY table_name;

-- Check licenses table exists
SELECT * FROM licenses LIMIT 1;

-- Check tenant_branding table exists
SELECT * FROM tenant_branding LIMIT 1;

-- Check tenant_domains table exists
SELECT * FROM tenant_domains LIMIT 1;

-- Check employer_applications table exists
SELECT * FROM employer_applications LIMIT 1;

-- Check staff_applications table exists
SELECT * FROM staff_applications LIMIT 1;

-- Check default tenant exists
SELECT * FROM tenants WHERE slug = 'elevate-for-humanity';

-- Check RLS policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE policyname LIKE '%tenant%';
```

---

## What These Migrations Do

### Multi-Tenant Architecture

- Adds `tenant_id` to 13 core tables
- Creates indexes for performance
- Enables data isolation per tenant

### License Management

- Tracks active licenses
- Manages license tiers (basic, pro, enterprise)
- Handles license expiration

### Tenant Branding

- Custom logos per tenant
- Custom color schemes
- Custom domain names

### Application Forms

- Employer application submissions
- Staff application submissions
- Student applications (already existed)

### Security

- Row-level security (RLS) policies
- Tenant data isolation
- Prevents cross-tenant data access

---

## Tables Created

| Table                   | Purpose                    |
| ----------------------- | -------------------------- |
| `licenses`              | License management         |
| `tenant_branding`       | Custom branding per tenant |
| `tenant_domains`        | Custom domain mapping      |
| `employer_applications` | Employer form submissions  |
| `staff_applications`    | Staff form submissions     |

---

## Columns Added

| Table                   | Column Added |
| ----------------------- | ------------ |
| `courses`               | `tenant_id`  |
| `course_progress`       | `tenant_id`  |
| `certifications`        | `tenant_id`  |
| `job_postings`          | `tenant_id`  |
| `job_applications`      | `tenant_id`  |
| `job_placements`        | `tenant_id`  |
| `compliance_reports`    | `tenant_id`  |
| `compliance_scores`     | `tenant_id`  |
| `student_verifications` | `tenant_id`  |
| `employers`             | `tenant_id`  |
| `program_holders`       | `tenant_id`  |
| `apprentices`           | `tenant_id`  |
| `apprenticeships`       | `tenant_id`  |

---

## Next Steps After Running

1. ✅ Verify all migrations ran successfully
2. ✅ Check that default tenant exists
3. ✅ Test tenant isolation (create test tenant)
4. ✅ Test license management
5. ✅ Test application forms

---

## Rollback (If Needed)

If you need to rollback these migrations:

```sql
-- WARNING: This will delete all tenant data!

-- Drop RLS policies
DROP POLICY IF EXISTS tenant_isolation ON courses;
DROP POLICY IF EXISTS tenant_isolation ON course_progress;
-- ... (drop all tenant policies)

-- Drop tables
DROP TABLE IF EXISTS staff_applications;
DROP TABLE IF EXISTS employer_applications;
DROP TABLE IF EXISTS tenant_domains;
DROP TABLE IF EXISTS tenant_branding;
DROP TABLE IF EXISTS licenses;

-- Remove tenant_id columns
ALTER TABLE courses DROP COLUMN IF EXISTS tenant_id;
ALTER TABLE course_progress DROP COLUMN IF EXISTS tenant_id;
-- ... (drop all tenant_id columns)
```

---

## Support

If you encounter issues:

1. Check Supabase logs
2. Verify DATABASE_URL is correct
3. Ensure you have admin permissions
4. Contact support: licensing@elevateforhumanity.org
