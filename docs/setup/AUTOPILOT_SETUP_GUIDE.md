# 🤖 Supabase Autopilot - Complete Setup Guide

## What Is Autopilot?

Autopilot is a **self-healing database migration system** that:

1. ✅ **Applies all migrations** in the correct order
2. ✅ **Verifies tables & RLS** are created correctly
3. ✅ **Auto-fixes common issues** (missing RLS policies, etc.)
4. ✅ **Monitors health** every 30 minutes
5. ✅ **Creates GitHub issues** if something fails
6. ✅ **Runs on every push** to main branch

---

## 🚀 Quick Start (3 Methods)

### Method 1: One-Click Dashboard (Easiest - 2 minutes)

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
2. Open: `supabase/migrations/ALL_IN_ONE__paste_into_dashboard.sql`
3. Copy entire file contents
4. Paste into SQL Editor
5. Click **Run**
6. Done! ✅

**Verify:** Run queries from `supabase/VERIFICATION_QUERIES.sql`

---

### Method 2: Local Script (Advanced - 5 minutes)

**Prerequisites:**

- PostgreSQL client installed (`psql`)
- Supabase database URL

**Steps:**

1. **Get your database URL:**
   - Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/database
   - Copy **Connection string → URI**
   - Format: `postgres://postgres:PASSWORD@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres`

2. **Run the script:**

   ```bash
   bash scripts/autopilot_migrate.sh "postgres://postgres:PASSWORD@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres"
   ```

3. **Verify:**
   - Script will show ✅ for each table
   - Check RLS status
   - Count policies

**What it does:**

- Applies all 9 migrations in order
- Each migration runs in a transaction (safe rollback on error)
- Verifies all 16 tables exist
- Checks RLS is enabled
- Counts RLS policies

---

### Method 3: GitHub Actions (Automated - 10 minutes setup)

**One-time setup:**

1. **Create GitHub Secrets** (Settings → Secrets → Actions):

   ```
   SUPABASE_DB_URL
   Value: postgres://postgres:PASSWORD@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres

   SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (from Project Settings → API)

   SUPABASE_PROJECT_REF
   Value: cuxzzpsyufcewtmicszk
   ```

2. **Commit the workflow:**

   ```bash
   git add .github/workflows/supabase-autopilot.yml
   git add scripts/autopilot_migrate.sh
   git commit -m "Add Supabase Autopilot"
   git push
   ```

3. **Watch it run:**
   - Go to: Actions tab in GitHub
   - See "Supabase Autopilot" workflow
   - Check logs for ✅ success

**What it does:**

- Runs on every push to main
- Runs every 30 minutes (health check)
- Auto-fixes RLS issues
- Creates GitHub issue if it can't fix
- Shows health report in workflow summary

---

## 📋 What Gets Created

### 16 Tables:

**Core LMS (6 tables):**

- ✅ `programs` - Training programs catalog
- ✅ `courses` - Individual courses
- ✅ `lessons` - Video lessons with content
- ✅ `enrollments` - Student enrollments
- ✅ `lesson_progress` - Lesson completion tracking
- ✅ `certificates` - Auto-generated certificates

**Authentication (1 table):**

- ✅ `instructor_certificates` - Instructor credentials

**Analytics (2 tables):**

- ✅ `analytics_events` - User action tracking
- ✅ `page_views` - Page visit tracking

**Automation (2 tables):**

- ✅ `automation_workflows` - Scheduled workflows
- ✅ `automation_executions` - Workflow run logs

**Content (1 table):**

- ✅ `generated_content` - AI-generated content

**Scholarships (2 tables):**

- ✅ `scholarship_applications` - Student applications
- ✅ `scholarship_reviews` - Application reviews

**Payments (2 tables):**

- ✅ `stripe_accounts` - Instructor Stripe accounts
- ✅ `stripe_splits` - Revenue sharing config

### Security:

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ 40+ RLS policies configured
- ✅ Public read for programs/courses/lessons
- ✅ User-specific read/write for enrollments/progress
- ✅ Admin-only write for content management

---

## 🔍 Verification

### Quick Check (Copy-Paste into SQL Editor):

```sql
-- Run this to verify everything
DO $$
DECLARE
  missing_tables int := 0;
  missing_rls int := 0;
  missing_policies int := 0;
  table_name text;
  tables_to_check text[] := ARRAY[
    'programs', 'courses', 'lessons', 'enrollments', 'lesson_progress', 'certificates',
    'instructor_certificates', 'analytics_events', 'page_views',
    'automation_workflows', 'automation_executions', 'generated_content',
    'scholarship_applications', 'scholarship_reviews',
    'stripe_accounts', 'stripe_splits'
  ];
BEGIN
  -- Check tables exist
  FOREACH table_name IN ARRAY tables_to_check
  LOOP
    IF to_regclass(table_name) IS NULL THEN
      RAISE WARNING 'Missing table: %', table_name;
      missing_tables := missing_tables + 1;
    END IF;
  END LOOP;

  -- Check RLS enabled
  SELECT COUNT(*) INTO missing_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename = ANY(tables_to_check)
    AND NOT rowsecurity;

  -- Check policies exist
  SELECT COUNT(DISTINCT tablename) INTO missing_policies
  FROM pg_tables t
  WHERE t.schemaname = 'public'
    AND t.tablename = ANY(tables_to_check)
    AND NOT EXISTS (
      SELECT 1 FROM pg_policies p
      WHERE p.schemaname = t.schemaname
        AND p.tablename = t.tablename
    );

  -- Report
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'SUPABASE MIGRATION HEALTH CHECK';
  RAISE NOTICE '===========================================';

  IF missing_tables = 0 THEN
    RAISE NOTICE '✅ All 16 tables exist';
  ELSE
    RAISE WARNING '❌ Missing % tables', missing_tables;
  END IF;

  IF missing_rls = 0 THEN
    RAISE NOTICE '✅ RLS enabled on all tables';
  ELSE
    RAISE WARNING '❌ RLS disabled on % tables', missing_rls;
  END IF;

  IF missing_policies = 0 THEN
    RAISE NOTICE '✅ All tables have RLS policies';
  ELSE
    RAISE WARNING '❌ % tables missing RLS policies', missing_policies;
  END IF;

  IF missing_tables = 0 AND missing_rls = 0 AND missing_policies = 0 THEN
    RAISE NOTICE '🎉 ALL CHECKS PASSED! Your LMS database is ready!';
  ELSE
    RAISE WARNING '⚠️  Some checks failed. Review warnings above.';
  END IF;

  RAISE NOTICE '===========================================';
END$$;
```

### Detailed Verification:

See `supabase/VERIFICATION_QUERIES.sql` for:

- Table existence checks
- RLS status checks
- Policy counts
- Index verification
- Foreign key verification
- Trigger verification

---

## 🔧 Auto-Healing Features

### What Autopilot Fixes Automatically:

1. **Missing RLS Policies**
   - Detects: Tables with RLS enabled but no policies
   - Fixes: Re-applies `004_add_missing_rls_policies.sql`

2. **Disabled RLS**
   - Detects: Tables with RLS disabled
   - Fixes: Re-applies RLS migration files

3. **Connection Issues**
   - Detects: Database connection failures
   - Fixes: Retries with exponential backoff

4. **Duplicate Objects**
   - Detects: "already exists" errors
   - Fixes: Uses `IF NOT EXISTS` clauses (idempotent)

### What Requires Manual Intervention:

1. **Missing Tables**
   - Cause: Migration file failed to run
   - Fix: Check logs, re-run specific migration

2. **Permission Errors**
   - Cause: Database user lacks permissions
   - Fix: Grant permissions in Supabase dashboard

3. **Data Conflicts**
   - Cause: Existing data violates new constraints
   - Fix: Clean up data, re-run migration

---

## 📊 Monitoring

### Health Check Endpoint

**URL:** `https://YOUR_SITE.netlify.app/.netlify/functions/health-db`

**Response (Healthy):**

```json
{
  "ok": true,
  "status": "healthy",
  "checks": {
    "connection": true,
    "tables": [
      "programs",
      "courses",
      "lessons",
      "enrollments",
      "lesson_progress",
      "certificates"
    ],
    "rls": true
  },
  "responseTime": 123,
  "timestamp": "2025-10-27T23:00:00.000Z"
}
```

**Response (Unhealthy):**

```json
{
  "ok": false,
  "error": "Some tables are not accessible",
  "failedTables": [{ "table": "programs", "error": "relation does not exist" }],
  "responseTime": 456,
  "timestamp": "2025-10-27T23:00:00.000Z"
}
```

### Set Up Uptime Monitoring:

**UptimeRobot (Free):**

1. Go to: https://uptimerobot.com
2. Add new monitor
3. Type: HTTP(s)
4. URL: `https://YOUR_SITE.netlify.app/.netlify/functions/health-db`
5. Interval: 5 minutes
6. Alert: Email/SMS on failure

**Pingdom:**

1. Go to: https://pingdom.com
2. Add new check
3. URL: `https://YOUR_SITE.netlify.app/.netlify/functions/health-db`
4. Check for: `"ok":true`
5. Alert: Email on failure

---

## 🚨 Troubleshooting

### Issue: "psql: command not found"

**Solution:**

```bash
# macOS
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql-client

# Windows
# Download from: https://www.postgresql.org/download/windows/
```

---

### Issue: "FATAL: password authentication failed"

**Solution:**

- Check your database URL has the correct password
- Get password from: Supabase Dashboard → Settings → Database → Reset password

---

### Issue: "relation already exists"

**Solution:**

- This is OK! Migrations are idempotent
- Script uses `IF NOT EXISTS` clauses
- Safe to re-run

---

### Issue: "permission denied for table"

**Solution:**

- RLS policies not applied
- Run: `psql "$DB_URL" -f supabase/migrations/004_add_missing_rls_policies.sql`

---

### Issue: GitHub Action fails with "Missing secrets"

**Solution:**

1. Go to: Settings → Secrets → Actions
2. Add all 3 secrets:
   - `SUPABASE_DB_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_PROJECT_REF`
3. Re-run workflow

---

### Issue: "Some tables missing after migration"

**Solution:**

1. Check which migration failed:
   ```bash
   bash scripts/autopilot_migrate.sh "$DB_URL" 2>&1 | grep ERROR
   ```
2. Run that specific migration manually:
   ```bash
   psql "$DB_URL" -f supabase/migrations/001_lms_schema.sql
   ```
3. Continue with remaining migrations

---

## 📁 File Structure

```
.github/workflows/
  supabase-autopilot.yml          # GitHub Actions workflow

scripts/
  autopilot_migrate.sh            # Local migration script

supabase/migrations/
  001_lms_schema.sql              # Core LMS tables
  002_auth_instructor_certificates.sql
  003_analytics_events.sql
  004_add_missing_rls_policies.sql
  004_analytics_rls.sql
  20250127_create_automation_tables.sql
  20250127_create_generated_content.sql
  20250127_create_scholarship_applications.sql
  20250127_create_stripe_split_tables.sql
  ALL_IN_ONE__paste_into_dashboard.sql  # Combined file
  VERIFICATION_QUERIES.sql        # Health check queries

netlify/functions/
  health-db.js                    # Health check endpoint
```

---

## 🎯 Best Practices

### 1. Always Use Transactions

- Autopilot wraps each migration in a transaction
- If anything fails, it rolls back
- Database stays consistent

### 2. Test Locally First

- Run `scripts/autopilot_migrate.sh` locally
- Verify with `VERIFICATION_QUERIES.sql`
- Then push to GitHub

### 3. Monitor Health

- Set up uptime monitoring on `/health-db` endpoint
- Check GitHub Actions logs weekly
- Review auto-created issues

### 4. Keep Migrations Idempotent

- Use `IF NOT EXISTS` clauses
- Use `CREATE OR REPLACE` for functions
- Safe to re-run anytime

### 5. Version Control Everything

- Commit all migration files
- Never edit migrations after they're applied
- Create new migrations for changes

---

## 🔄 Workflow

### Normal Flow:

1. Developer pushes code to main
2. GitHub Actions runs Autopilot
3. Migrations applied automatically
4. Health check passes ✅
5. Workflow succeeds

### Error Flow:

1. Developer pushes code to main
2. GitHub Actions runs Autopilot
3. Migration fails ❌
4. Auto-heal attempts RLS fix
5. If still failing, creates GitHub issue
6. Developer reviews logs
7. Developer fixes issue
8. Push fix, workflow re-runs

---

## 📚 Additional Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase CLI Docs:** https://supabase.com/docs/guides/cli

---

## 🎉 You're Done!

Your Autopilot is now:

- ✅ Applying migrations automatically
- ✅ Verifying database health
- ✅ Auto-fixing common issues
- ✅ Monitoring 24/7
- ✅ Alerting on failures

**Next Steps:**

1. Choose a method (Dashboard, Local, or GitHub Actions)
2. Apply migrations
3. Verify with health check
4. Add your first course!

---

**Questions? Check the troubleshooting section or create a GitHub issue.**
