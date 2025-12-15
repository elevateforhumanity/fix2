# 🚀 Quick Migration Guide

## Run the Database Migration

### 1️⃣ Open Supabase Dashboard
- Go to your Supabase project
- Click **SQL Editor** in the left sidebar

### 2️⃣ Run Migration Script
- Click **New Query**
- Copy and paste the entire contents of `CREATE_PARTNER_SCORM_TABLES.sql`
- Click **Run** (or Ctrl/Cmd + Enter)
- Wait ~30 seconds for completion

### 3️⃣ Verify Migration
- Copy and paste the contents of `VERIFY_MIGRATION.sql`
- Click **Run**
- Check that all statuses show ✅

## Expected Results

After running the migration, you should see:
- ✅ 7 new tables created
- ✅ 2 views created
- ✅ 2 triggers created
- ✅ All tables accessible

## Files

1. **CREATE_PARTNER_SCORM_TABLES.sql** - Main migration script
2. **VERIFY_MIGRATION.sql** - Verification queries
3. **RUN_MIGRATION.md** - Detailed guide with troubleshooting

## Quick Test

After migration, test with:

```sql
-- Insert test SCORM package
INSERT INTO scorm_packages (
  title,
  launch_url,
  package_url
) VALUES (
  'Test Package',
  'https://example.com/index.html',
  'https://example.com/package.zip'
);

-- Verify insert
SELECT * FROM scorm_packages;
```

## Need Help?

See `RUN_MIGRATION.md` for:
- Detailed step-by-step instructions
- Troubleshooting common errors
- Post-migration tasks
- Testing procedures

---

**Time Required:** 2 minutes  
**Difficulty:** Easy  
**Rollback:** See RUN_MIGRATION.md

✅ Ready to run!
