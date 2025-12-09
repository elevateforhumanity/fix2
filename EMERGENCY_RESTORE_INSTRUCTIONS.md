# 🚨 EMERGENCY: Database Tables Missing

## Current Situation
- **Before**: ~200 tables
- **Now**: 9 tables
- **Missing**: ~191 tables including `applications`, `courses`, `enrollments`, etc.

## ⚠️ STOP - Do Not Run More SQL

## Immediate Actions

### Option 1: Supabase Point-in-Time Recovery (BEST)

1. Go to Supabase Dashboard
2. Click **Database** in left sidebar
3. Click **Backups** tab
4. Look for **Point-in-Time Recovery** or **Daily Backups**
5. Select a backup from **BEFORE today** (yesterday or earlier)
6. Click **Restore**

**This will restore ALL your tables.**

### Option 2: Check if Tables Are in Different Schema

Run this SQL to check:
```sql
SELECT schemaname, COUNT(*) as table_count
FROM pg_tables
GROUP BY schemaname
ORDER BY table_count DESC;
```

Maybe tables moved to a different schema?

### Option 3: Contact Supabase Support

If backups don't work:
1. Go to Supabase Dashboard
2. Click **Support** (bottom left)
3. Create urgent ticket: "Lost 191 tables, need emergency restore"
4. They have transaction logs and can help

## What Likely Happened

**The SQL I provided should NOT have deleted tables.** It only:
- Added columns with `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`
- Updated data with `UPDATE`
- Created policies

**Possible causes:**
1. Someone else ran a migration that dropped tables
2. A migration script had a DROP TABLE command
3. Database was reset/recreated
4. Wrong project was selected

## Check Migration History

Run this to see what migrations ran:
```sql
SELECT * FROM schema_migrations 
ORDER BY version DESC 
LIMIT 20;
```

This shows what SQL was executed recently.

## Remaining Tables (Safe)
These 9 tables still exist:
- certificates
- funding_records
- module_progress
- modules
- profiles
- programs
- scorm_packages
- student_enrollments
- transfer_hours

## Next Steps

1. **FIRST**: Try Point-in-Time Recovery in Supabase
2. **SECOND**: Check schema_migrations table
3. **THIRD**: Contact Supabase support if restore doesn't work

## Prevention

After restore:
1. Enable daily backups
2. Test SQL in staging environment first
3. Review all migration files before running

---

**DO NOT RUN ANY MORE SQL UNTIL TABLES ARE RESTORED**
