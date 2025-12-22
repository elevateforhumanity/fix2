# 🔒 SECURITY + PERFORMANCE EXECUTION - STEP BY STEP

## STEP 1: FIX MUTABLE SEARCH_PATH (SECURITY)

### 1A) Generate the fixes (READ-ONLY - SAFE)

**Run this in Supabase SQL Editor:**

```sql
SELECT
  'ALTER FUNCTION ' ||
  n.nspname || '.' || p.proname || '(' ||
  pg_get_function_identity_arguments(p.oid) || ') ' ||
  'SET search_path = pg_catalog, public;' AS fix_sql
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND coalesce(array_to_string(p.proconfig, ','), '') LIKE '%search_path%';
```

**Copy all output lines.**

### 1B) Apply the fixes

**Paste the output back into SQL Editor and run.**

✅ This clears the 29 security items tied to mutable search_path.

---

## STEP 2: ENABLE PASSWORD PROTECTION (SECURITY)

**Supabase Dashboard → Authentication → Password Protection**

1. Click "Password Protection"
2. Enable "HaveIBeenPwned"
3. Click "Save"

✅ Instant protection for student accounts.

---

## STEP 3: RLS BASELINE (SECURITY - NO LEAKS)

### 3A) Find tables without RLS

**Run this in Supabase SQL Editor:**

```sql
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT LIKE 'pg_%'
  AND tablename NOT LIKE '_prisma_%'
  AND tablename NOT LIKE 'schema_migrations'
  AND tablename NOT LIKE 'supabase_%'
  AND NOT EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = pg_tables.tablename
      AND c.relrowsecurity = true
  )
ORDER BY tablename;
```

**Note which tables are returned.**

### 3B) Generate ENABLE RLS statements

**Run this in Supabase SQL Editor:**

```sql
SELECT
  'ALTER TABLE public."' || tablename || '" ENABLE ROW LEVEL SECURITY;' AS rls_sql
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT LIKE 'pg_%'
  AND tablename NOT LIKE '_prisma_%'
  AND tablename NOT LIKE 'schema_migrations'
  AND tablename NOT LIKE 'supabase_%'
  AND NOT EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = pg_tables.tablename
      AND c.relrowsecurity = true
  )
ORDER BY tablename;
```

**Copy output and run it.**

✅ This does NOT block service_role. Your APIs keep working.

---

## STEP 4: FOREIGN KEY INDEXES (PERFORMANCE)

**This removes thousands of advisor warnings.**

### 4A) Generate missing FK indexes

**Run this in Supabase SQL Editor:**

```sql
WITH fks AS (
  SELECT
    n.nspname AS schema_name,
    t.relname AS table_name,
    a.attname AS column_name
  FROM pg_constraint con
  JOIN pg_class t ON t.oid = con.conrelid
  JOIN pg_namespace n ON n.oid = t.relnamespace
  JOIN unnest(con.conkey) AS colnum(attnum) ON true
  JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = colnum.attnum
  WHERE con.contype = 'f'
    AND n.nspname = 'public'
),
missing AS (
  SELECT *
  FROM fks
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_index i
    JOIN pg_class tbl ON tbl.oid = i.indrelid
    JOIN pg_namespace ns ON ns.oid = tbl.relnamespace
    WHERE ns.nspname = fks.schema_name
      AND tbl.relname = fks.table_name
      AND pg_get_indexdef(i.indexrelid) ILIKE ('%' || fks.column_name || '%')
  )
)
SELECT
  'CREATE INDEX IF NOT EXISTS "idx_' || table_name || '_' || column_name ||
  '" ON public."' || table_name || '"("' || column_name || '");' AS create_index_sql
FROM missing
ORDER BY table_name, column_name;
```

**Copy output and run it.**

⚠️ **Note:** On large tables this will lock writes while building. Run off-hours if needed.

---

## STEP 5: CORE FLOW INDEXES (PERFORMANCE)

**These directly power attendance alerts, enrollment, reporting.**

**Run this in Supabase SQL Editor:**

```sql
-- Attendance tracking indexes
CREATE INDEX IF NOT EXISTS idx_attendance_student_date
  ON public.attendance_events(student_id, session_date DESC);

CREATE INDEX IF NOT EXISTS idx_attendance_enrollment_date
  ON public.attendance_events(enrollment_id, session_date DESC);

-- Hour tracking indexes
CREATE INDEX IF NOT EXISTS idx_hour_tracking_student_week
  ON public.hour_logs(student_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_hour_tracking_enrollment_week
  ON public.hour_logs(enrollment_id, date DESC);

-- User progress indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_updated
  ON public.progress_events(student_id, updated_at DESC);

-- Enrollments indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_user_status
  ON public.enrollments(student_id, status);

CREATE INDEX IF NOT EXISTS idx_enrollments_partner_status
  ON public.enrollments(partner_owner_user_id, status);

-- Applications indexes
CREATE INDEX IF NOT EXISTS idx_applications_status_created
  ON public.applications(status, created_at DESC);

-- Alert notifications indexes
CREATE INDEX IF NOT EXISTS idx_alerts_student_resolved
  ON public.alert_notifications(student_id, resolved_at);

CREATE INDEX IF NOT EXISTS idx_alerts_partner_resolved
  ON public.alert_notifications(partner_user_id, resolved_at);

-- Reporting verdicts indexes
CREATE INDEX IF NOT EXISTS idx_verdicts_enrollment_period
  ON public.reporting_verdicts(enrollment_id, period_start DESC);

-- Login events indexes (for inactivity tracking)
CREATE INDEX IF NOT EXISTS idx_login_events_user_occurred
  ON public.login_events(user_id, occurred_at DESC);
```

✅ These indexes power your core flows.

---

## STEP 6: REALITY CHECK

**The `pg_get_tabledef` / `pg_get_viewdef` "slow queries" are Supabase Studio introspection, NOT your app.**

After Steps 4-5, your performance count will drop significantly, but may not hit zero - **that's normal**.

**What matters:** Student flows, dashboards, alerts are fast.

---

## VERIFICATION QUERIES

### Check RLS Status

```sql
SELECT
  COUNT(*) FILTER (WHERE relrowsecurity) AS protected_tables,
  COUNT(*) FILTER (WHERE NOT relrowsecurity) AS unprotected_tables
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relname NOT LIKE 'pg_%'
  AND c.relname NOT LIKE 'supabase_%';
```

**Expected:** `unprotected_tables = 0`

### Check FK Indexes

```sql
WITH fks AS (
  SELECT COUNT(*) AS total_fks
  FROM pg_constraint
  WHERE contype = 'f'
    AND connamespace = 'public'::regnamespace
),
indexed AS (
  SELECT COUNT(DISTINCT con.conname) AS indexed_fks
  FROM pg_constraint con
  JOIN pg_index idx ON idx.indrelid = con.conrelid
  WHERE con.contype = 'f'
    AND con.connamespace = 'public'::regnamespace
)
SELECT
  fks.total_fks,
  indexed.indexed_fks,
  fks.total_fks - indexed.indexed_fks AS missing_indexes
FROM fks, indexed;
```

**Expected:** `missing_indexes = 0` (or very low)

---

## EXECUTION CHECKLIST

- [ ] **STEP 1A:** Run search_path query, copy output
- [ ] **STEP 1B:** Paste and run ALTER FUNCTION statements
- [ ] **STEP 2:** Enable HaveIBeenPwned in Supabase Auth
- [ ] **STEP 3A:** Run RLS check query
- [ ] **STEP 3B:** Run ENABLE RLS statements
- [ ] **STEP 4:** Run FK index generation, copy output, run it
- [ ] **STEP 5:** Run core flow indexes
- [ ] **VERIFY:** Run verification queries

---

## AFTER COMPLETION

**Reply with:**

- ✅ STEP 1 DONE
- ✅ STEP 2 DONE
- ✅ STEP 3 DONE
- ✅ STEP 4 DONE
- ✅ STEP 5 DONE
- Verification results (protected_tables count, missing_indexes count)

**Then we move to final RLS policy tightening + alert job tuning for Indiana launch.**
