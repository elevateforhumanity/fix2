# 📋 Copy/Paste SQL Migrations

Apply these 3 SQL scripts in order via Supabase Dashboard.

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

---

## Migration 1: Create Missing Tables

**File:** `supabase/migrations/20260102_ensure_tracking_tables.sql`

**What it does:** Creates `employment_tracking` and `credential_verification` tables

**Copy/paste this:**

```sql
-- See file: supabase/migrations/20260102_ensure_tracking_tables.sql
-- (File is too large to display here - 150 lines)
```

**To get the SQL:**
```bash
cat supabase/migrations/20260102_ensure_tracking_tables.sql
```

---

## Migration 2: Fix Duplicate Policies

**File:** `supabase/migrations/20260102_fix_duplicate_policies.sql`

**What it does:** Renames 11 duplicate policies to be unique

**Copy/paste this:**

```sql
-- See file: supabase/migrations/20260102_fix_duplicate_policies.sql
-- (File is too large to display here - 300+ lines)
```

**To get the SQL:**
```bash
cat supabase/migrations/20260102_fix_duplicate_policies.sql
```

---

## Migration 3: Final RLS Policies

**File:** `supabase/migrations/20260102_final_rls_policies.sql`

**What it does:** Sets up clean, authoritative RLS configuration

**Copy/paste this:**

```sql
-- See file: supabase/migrations/20260102_final_rls_policies.sql
-- (File is too large to display here - 400+ lines)
```

**To get the SQL:**
```bash
cat supabase/migrations/20260102_final_rls_policies.sql
```

---

## Quick Access

The files are located at:
- `supabase/migrations/20260102_ensure_tracking_tables.sql`
- `supabase/migrations/20260102_fix_duplicate_policies.sql`
- `supabase/migrations/20260102_final_rls_policies.sql`

**To view in terminal:**
```bash
# Migration 1
cat supabase/migrations/20260102_ensure_tracking_tables.sql

# Migration 2
cat supabase/migrations/20260102_fix_duplicate_policies.sql

# Migration 3
cat supabase/migrations/20260102_final_rls_policies.sql
```

**To copy to clipboard (if you have xclip):**
```bash
cat supabase/migrations/20260102_ensure_tracking_tables.sql | xclip -selection clipboard
```

---

## Alternative: Use Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db push
```

This will automatically apply all pending migrations.

---

## Verify After Applying

```bash
npm run test:database
```

Expected: 23/23 tests passing ✅
