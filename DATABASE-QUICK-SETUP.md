# Database Quick Setup Guide

**Fast setup for Elevate for Humanity database**

## Step 1: Run Main Migrations (Required)

1. Open your Supabase project
2. Go to **SQL Editor**
3. Open the file: `COPY-PASTE-SQL.sql`
4. Copy the ENTIRE contents
5. Paste into Supabase SQL Editor
6. Click **Run**

This will:
- Create migration tracking system
- Create all required tables
- Set up RLS security policies
- Fix schema mismatches
- Add SCORM support

**Expected Result**: "Success. No rows returned"

## Step 2: Seed Program Data (Required)

1. Still in **SQL Editor**
2. Open the file: `COPY-PASTE-PROGRAMS.sql`
3. Copy the ENTIRE contents
4. Paste into Supabase SQL Editor
5. Click **Run**

This will add 30+ training programs to your database.

**Expected Result**: Multiple INSERT statements succeed

## Step 3: Verify Setup

1. Open the file: `VERIFY-AFTER-MIGRATION.sql`
2. Copy the ENTIRE contents
3. Paste into Supabase SQL Editor
4. Click **Run**

This will check:
- ✅ Migration tracking created
- ✅ All tables created (should be 50+)
- ✅ RLS policies applied
- ✅ Programs table ready for seeding

**Expected Output**: Summary showing "✅ Database setup looks good!"

### Quick Verification (Alternative)

```sql
-- Check tables created
SELECT COUNT(*) as total_tables
FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return 50+

-- Check if ready for programs
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'programs';
-- Should return 'programs'
```

## Step 4: Configure Environment Variables

Add to your `.env.local`:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Service (Optional - for notifications)
RESEND_API_KEY=re_xxx

# Payment Processing (Optional - for Affirm)
AFFIRM_PUBLIC_KEY=your-affirm-public-key
AFFIRM_PRIVATE_KEY=your-affirm-private-key

# Stripe (Optional - for license sales)
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Troubleshooting

### "relation 'migration_history' does not exist"
**Cause**: You're trying to verify before running migrations.

**Fix**: 
1. First run `COPY-PASTE-SQL.sql` 
2. Then run `VERIFY-AFTER-MIGRATION.sql`

### "relation already exists"
**Cause**: You've already run migrations.

**Fix**: Check what's been applied:
```sql
SELECT * FROM schema_migrations ORDER BY applied_at DESC;
```

### "permission denied"
**Cause**: Using wrong credentials.

**Fix**: 
- Use Supabase SQL Editor (recommended)
- Or use service role key, not anon key

### "syntax error"
**Cause**: Incomplete copy/paste.

**Fix**: 
- Copy the ENTIRE file from first line to last
- Don't copy just a section

### Programs not showing after seeding
**Cause**: Seeding failed or not run.

**Fix**: Check if programs exist:
```sql
SELECT COUNT(*) FROM programs;
-- Should return 30+

-- If 0, re-run COPY-PASTE-PROGRAMS.sql
```

### Tables missing
**Cause**: Migration failed partway through.

**Fix**: Check error messages in Supabase logs, then:
```sql
-- See what tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- If very few tables, may need to drop and re-run
-- DANGER: Only in development!
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- Then re-run COPY-PASTE-SQL.sql
```

## What's Next?

After database setup:

1. ✅ Deploy your application
2. ✅ Test authentication (sign up/login)
3. ✅ Test program browsing
4. ✅ Test application submission
5. [ ] Add email service (optional)
6. [ ] Add payment processing (optional)
7. [ ] Monitor for errors

## Files Reference

- `COPY-PASTE-SQL.sql` - All migrations (1224 lines)
- `COPY-PASTE-PROGRAMS.sql` - Program seed data (1169 lines)
- `DATABASE-SETUP-GUIDE.md` - Detailed guide
- `SITE-AUDIT-REPORT.md` - Site status
- `FEATURE-STATUS.md` - Feature completeness

## Support

If you encounter issues:
1. Check Supabase logs
2. Review error messages carefully
3. Verify you're in the correct project
4. Check that RLS is enabled on tables

---

**Total Setup Time**: 5-10 minutes
**Difficulty**: Easy (copy/paste)
**Prerequisites**: Supabase project created
