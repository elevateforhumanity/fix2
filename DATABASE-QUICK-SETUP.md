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

Run this in SQL Editor:

```sql
-- Check migrations applied
SELECT * FROM migration_history ORDER BY applied_at DESC;
-- Should show 5 migrations

-- Check programs created
SELECT COUNT(*) FROM programs;
-- Should return 30+

-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
-- Should show 50+ tables
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

### "relation already exists"
You've already run migrations. Check:
```sql
SELECT * FROM schema_migrations;
```

### "permission denied"
Make sure you're using the service role key, not anon key.

### "syntax error"
Make sure you copied the ENTIRE file, including the first line.

### Programs not showing
Check if they were inserted:
```sql
SELECT id, title, slug FROM programs LIMIT 10;
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
