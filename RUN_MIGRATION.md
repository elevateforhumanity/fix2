# 🗄️ Database Migration Guide - Partner & SCORM Tables

**File:** `CREATE_PARTNER_SCORM_TABLES.sql`  
**Tables:** 7 new tables + 2 views + 2 triggers  
**Time:** ~2 minutes

---

## 📋 Pre-Migration Checklist

- [ ] Supabase project is accessible
- [ ] You have admin/owner access
- [ ] Database is backed up (optional but recommended)
- [ ] SQL Editor is open in Supabase Dashboard

---

## 🚀 Step-by-Step Migration

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**

### Step 2: Copy SQL Script

```bash
# Option A: Copy from file
cat CREATE_PARTNER_SCORM_TABLES.sql
```

Or open the file `CREATE_PARTNER_SCORM_TABLES.sql` and copy all contents.

### Step 3: Paste and Run

1. Paste the entire SQL script into the SQL Editor
2. Click **Run** (or press Ctrl/Cmd + Enter)
3. Wait for execution to complete (~30 seconds)

### Step 4: Verify Success

You should see output similar to:
```
CREATE EXTENSION
CREATE TABLE
CREATE INDEX
CREATE TABLE
...
Success. No rows returned
```

---

## ✅ Verification Steps

### Verify Tables Created

Run this query in SQL Editor:

```sql
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'scorm_packages',
    'scorm_enrollments',
    'scorm_tracking',
    'partner_course_mappings',
    'external_module_progress',
    'lms_sync_log',
    'partner_credentials'
  )
ORDER BY tablename;
```

**Expected Result:** 7 rows showing all tables

### Verify Views Created

```sql
SELECT 
  schemaname,
  viewname,
  viewowner
FROM pg_views
WHERE schemaname = 'public'
  AND viewname IN (
    'partner_enrollment_summary',
    'scorm_completion_summary'
  )
ORDER BY viewname;
```

**Expected Result:** 2 rows showing both views

### Verify Triggers Created

```sql
SELECT 
  trigger_name,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name IN (
    'trigger_update_scorm_progress',
    'trigger_sync_partner_progress'
  );
```

**Expected Result:** 2 rows showing both triggers

### Test Table Access

```sql
-- Test scorm_packages table
SELECT COUNT(*) FROM scorm_packages;

-- Test scorm_enrollments table
SELECT COUNT(*) FROM scorm_enrollments;

-- Test partner_course_mappings table
SELECT COUNT(*) FROM partner_course_mappings;
```

**Expected Result:** All queries return 0 (empty tables, which is correct)

---

## 🔍 What Was Created

### Tables (7)

1. **scorm_packages**
   - Stores SCORM content packages
   - Fields: title, version, launch_url, passing_score, etc.

2. **scorm_enrollments**
   - Student enrollments in SCORM content
   - Fields: status, progress, score, attempts, cmi_data

3. **scorm_tracking**
   - Detailed SCORM element tracking
   - Fields: element, value, timestamp

4. **partner_course_mappings**
   - Maps partner courses to internal content
   - Fields: partner_course_id, program_id, scorm_package_id

5. **external_module_progress**
   - Tracks external module completion
   - Fields: module_id, status, progress, score

6. **lms_sync_log**
   - Audit trail for LMS synchronization
   - Fields: provider_id, sync_type, status, records_processed

7. **partner_credentials**
   - Partner-issued certificates
   - Fields: credential_name, issued_date, verification_url

### Views (2)

1. **partner_enrollment_summary**
   - Aggregated enrollment data with student info

2. **scorm_completion_summary**
   - SCORM completion statistics

### Triggers (2)

1. **trigger_update_scorm_progress**
   - Auto-updates enrollment when tracking data changes

2. **trigger_sync_partner_progress**
   - Syncs module progress to partner enrollment

---

## 🎯 Post-Migration Tasks

### 1. Grant Permissions (Already Done)

The script automatically grants:
- `SELECT, INSERT, UPDATE` to `authenticated` users
- `ALL` permissions to `service_role`

### 2. Test SCORM Player

Create a test SCORM package:

```sql
INSERT INTO scorm_packages (
  title,
  description,
  version,
  package_url,
  launch_url,
  passing_score,
  is_active
) VALUES (
  'Test SCORM Package',
  'Test package for verification',
  '1.2',
  'https://example.com/scorm/package.zip',
  'https://example.com/scorm/index.html',
  80,
  true
);
```

### 3. Test Partner Course Mapping

```sql
-- First, ensure you have a partner course
SELECT id, course_name FROM partner_courses LIMIT 1;

-- Then create a mapping (replace UUIDs with actual values)
INSERT INTO partner_course_mappings (
  partner_course_id,
  internal_program_id,
  mapping_type,
  is_active
) VALUES (
  'your-partner-course-uuid',
  'your-program-uuid',
  'equivalent',
  true
);
```

---

## 🐛 Troubleshooting

### Error: "relation already exists"

**Solution:** Tables already exist. You can either:
1. Skip migration (tables are already there)
2. Drop and recreate (⚠️ WARNING: This deletes data!)

```sql
-- Only if you want to start fresh (DELETES ALL DATA!)
DROP TABLE IF EXISTS scorm_tracking CASCADE;
DROP TABLE IF EXISTS scorm_enrollments CASCADE;
DROP TABLE IF EXISTS scorm_packages CASCADE;
DROP TABLE IF EXISTS external_module_progress CASCADE;
DROP TABLE IF EXISTS partner_course_mappings CASCADE;
DROP TABLE IF EXISTS lms_sync_log CASCADE;
DROP TABLE IF EXISTS partner_credentials CASCADE;
DROP VIEW IF EXISTS partner_enrollment_summary;
DROP VIEW IF EXISTS scorm_completion_summary;

-- Then run the migration again
```

### Error: "permission denied"

**Solution:** You need admin/owner access to create tables.
- Check your Supabase role
- Contact project owner for access

### Error: "extension does not exist"

**Solution:** Enable extensions first:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

## 📊 Expected Database State After Migration

```
public schema
├── Tables (existing + 7 new)
│   ├── profiles ✓
│   ├── programs ✓
│   ├── courses ✓
│   ├── enrollments ✓
│   ├── partner_lms_providers ✓
│   ├── partner_courses ✓
│   ├── partner_lms_enrollments ✓
│   ├── scorm_packages ✅ NEW
│   ├── scorm_enrollments ✅ NEW
│   ├── scorm_tracking ✅ NEW
│   ├── partner_course_mappings ✅ NEW
│   ├── external_module_progress ✅ NEW
│   ├── lms_sync_log ✅ NEW
│   └── partner_credentials ✅ NEW
│
├── Views (2 new)
│   ├── partner_enrollment_summary ✅ NEW
│   └── scorm_completion_summary ✅ NEW
│
└── Triggers (2 new)
    ├── trigger_update_scorm_progress ✅ NEW
    └── trigger_sync_partner_progress ✅ NEW
```

---

## ✅ Success Indicators

After successful migration, you should be able to:

1. ✅ Query all 7 new tables without errors
2. ✅ Query both views and see column definitions
3. ✅ Insert test data into scorm_packages
4. ✅ See triggers listed in information_schema
5. ✅ Access tables from your application code

---

## 🎓 Next Steps After Migration

1. **Test SCORM Player**
   - Upload a test SCORM package
   - Create enrollment
   - Launch player and verify tracking

2. **Configure Partner Providers**
   - Add partner LMS providers
   - Import partner courses
   - Create course mappings

3. **Test Enrollment Flow**
   - Enroll test user in partner course
   - Verify enrollment record created
   - Check SCORM enrollment if mapped

4. **Monitor Sync Logs**
   - Check lms_sync_log table
   - Verify sync operations logged
   - Review any errors

---

## 📞 Support

If you encounter issues:

1. Check Supabase logs in Dashboard
2. Verify table permissions
3. Review error messages carefully
4. Check existing table conflicts

---

**Migration File:** `CREATE_PARTNER_SCORM_TABLES.sql`  
**Estimated Time:** 2 minutes  
**Rollback:** Drop tables if needed (see Troubleshooting)

---

✅ **Ready to run!** Open Supabase SQL Editor and paste the script.
