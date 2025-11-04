# Deployment Ready Files

All files needed for manual deployment to Supabase.

## ⚠️ IMPORTANT: Execute in Order

The migrations have dependencies. Execute in this exact order:

### Step 1: Prerequisites (FIRST)

Execute: **00-prerequisites.sql**

- Creates base tables: organizations, users, courses, enrollments, assessments
- These tables are required by other migrations

### Step 2: Main Migrations (SECOND)

Execute: **01-all-migrations.sql**

- Creates admin feature tables
- Depends on tables from Step 1

### Step 3: Edge Functions

Deploy the 4 Edge Functions

## Files

1. **00-prerequisites.sql** - Base tables (organizations, users, courses, etc.) - **EXECUTE FIRST**
2. **01-all-migrations.sql** - Complete database setup (all 5 migrations combined) - **EXECUTE SECOND**
3. **02-email-dispatch.ts** - Email dispatch Edge Function
4. **03-webhook-dispatch.ts** - Webhook dispatch Edge Function
5. **04-ai-course-create.ts** - AI course creation Edge Function
6. **05-grade-ai.ts** - AI grading Edge Function

## Deployment Steps

### 1. Deploy Database (2 files, 3 minutes)

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

**STEP 1A: Prerequisites**

1. Open `00-prerequisites.sql`
2. Copy entire contents
3. Paste into SQL Editor
4. Click "Run"
5. ✅ Verify: organizations, users, courses tables created

**STEP 1B: Main Migrations**

1. Open `01-all-migrations.sql`
2. Copy entire contents
3. Paste into SQL Editor
4. Click "Run"
5. ✅ Verify: email_queue, webhooks, campaigns, etc. created

This will create:

- 29 database tables total (5 base + 24 admin)
- 60 RLS policies total (5 base + 55 admin)
- 6 cron jobs

### 2. Deploy Edge Functions (4 files, 5 minutes)

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/functions

For each function:

1. Click "Create a new function"
2. Name it (email-dispatch, webhook-dispatch, ai-course-create, grade-ai)
3. Copy contents from corresponding .ts file
4. Click "Deploy"

### 3. Configure Secrets (optional, 1 minute)

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/secrets

Add:

- OPENAI_API_KEY (for AI features)
- SENDGRID_API_KEY or RESEND_API_KEY (for email)
- ANTHROPIC_API_KEY (optional, for Claude AI)

## Verification

After deployment:

- ✅ Check Database > Tables (should see 29 tables)
- ✅ Check Database > Policies (should see 60 policies)
- ✅ Check Edge Functions (should see 4 functions)
- ✅ Test an Edge Function endpoint

## Troubleshooting

### "syntax error at or near 'migrations'" or "table does not exist"

- **Cause:** Executed files out of order
- **Solution:** Execute 00-prerequisites.sql FIRST, then 01-all-migrations.sql

### "relation already exists"

- **Cause:** Tables already created
- **Solution:** This is OK, the IF NOT EXISTS clause will skip existing tables

### "permission denied"

- **Cause:** RLS policies not configured
- **Solution:** Check that RLS is enabled and policies are created

## Support

If you encounter issues:

1. Check Supabase logs
2. Verify execution order (00-prerequisites.sql first!)
3. Check environment variables
4. Test Edge Functions individually

---

Project: cuxzzpsyufcewtmicszk
Date: 2025-11-03
Updated: Added 00-prerequisites.sql for base tables
