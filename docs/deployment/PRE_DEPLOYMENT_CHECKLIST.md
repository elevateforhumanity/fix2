# Pre-Deployment Checklist

## ⚠️ Critical Issues Fixed

### Missing Database Tables

The following tables were referenced in the code but not created in the initial migrations:

- ✅ `analytics_events` - Event tracking
- ✅ `assessment_submissions` - Student submissions
- ✅ `assessments` - Quizzes and exams
- ✅ `audit_logs` - System audit trail
- ✅ `badges` - Achievement badges
- ✅ `user_badges` - User earned badges
- ✅ `leaderboards` - User rankings
- ✅ `billing_subscriptions` - Stripe subscriptions
- ✅ `entitlements` - Feature entitlements
- ✅ `course_versions` - Course version history

**Status:** ✅ Fixed - Created `20251103_missing_tables.sql` and `20251103_missing_tables_rls.sql`

## Migration Files (Run in Order)

1. ✅ `20251103_admin_features.sql` - Core admin tables
2. ✅ `20251103_missing_tables.sql` - Additional required tables
3. ✅ `20251103_admin_features_rls.sql` - RLS policies for admin tables
4. ✅ `20251103_missing_tables_rls.sql` - RLS policies for additional tables
5. ✅ `20251103_cron_jobs.sql` - Automated jobs

## Dependencies Check

### Required Base Tables (Must Exist)

These tables should already exist from previous migrations:

- [ ] `organizations` - Organization data
- [ ] `users` - User accounts
- [ ] `org_members` - Organization membership
- [ ] `courses` - Course data
- [ ] `enrollments` - Course enrollments
- [ ] `modules` - Course modules
- [ ] `lessons` - Course lessons

**Action:** Verify these exist before running new migrations

### Required Functions

- [ ] `update_updated_at_column()` - Trigger function for timestamps
- [ ] `is_org_admin()` - Helper function for RLS policies

**Action:** These are created in the migrations if they don't exist

## Environment Variables Required

### Production Environment

```bash
# Supabase (automatic)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Provider (choose one)
SENDGRID_API_KEY=your-sendgrid-key
# OR
RESEND_API_KEY=your-resend-key

# AI Provider (choose one)
OPENAI_API_KEY=your-openai-key
# OR
ANTHROPIC_API_KEY=your-anthropic-key
```

## Pre-Deployment Verification

### 1. Code Verification

```bash
# Build check
npm run build

# Expected: Build completes without errors
```

### 2. Migration Files Check

```bash
# Verify all migration files exist
ls -la supabase/migrations/20251103_*.sql

# Expected output:
# 20251103_admin_features.sql
# 20251103_admin_features_rls.sql
# 20251103_missing_tables.sql
# 20251103_missing_tables_rls.sql
# 20251103_cron_jobs.sql
```

### 3. Script Permissions

```bash
# Verify scripts are executable
ls -la *.sh

# Expected: All .sh files have execute permission (x)
```

### 4. Dependencies

```bash
# Check Node.js version
node --version
# Expected: v18+ or v20+

# Check npm packages
npm list react react-router-dom
# Expected: No missing peer dependencies
```

## Deployment Order

### Phase 1: Database Setup

1. Authenticate with Supabase
2. Run migrations (in order)
3. Verify tables created
4. Verify RLS policies active

### Phase 2: Edge Functions

1. Configure environment variables
2. Deploy all Edge Functions
3. Test each function
4. Verify logs

### Phase 3: Frontend

1. Build application
2. Deploy to hosting
3. Test admin pages
4. Verify routing

### Phase 4: Automation

1. Configure cron jobs
2. Test queue processing
3. Monitor execution

## Common Issues & Solutions

### Issue: "Table already exists"

**Solution:** This is OK - migrations use `CREATE TABLE IF NOT EXISTS`

### Issue: "Function is_org_admin does not exist"

**Solution:** Run migrations in order - it's created in the RLS migration

### Issue: "Foreign key constraint violation"

**Solution:** Ensure base tables (organizations, users, courses) exist first

### Issue: "Permission denied for table"

**Solution:** Check RLS policies are applied and user has correct role

### Issue: "Edge Function timeout"

**Solution:** Check environment variables are set and external APIs are accessible

## Rollback Plan

If deployment fails, rollback in reverse order:

### 1. Remove Cron Jobs

```sql
SELECT cron.unschedule('process-email-queue');
SELECT cron.unschedule('process-webhook-queue');
SELECT cron.unschedule('retry-failed-webhooks');
SELECT cron.unschedule('process-grading-queue');
SELECT cron.unschedule('cleanup-old-logs');
SELECT cron.unschedule('cleanup-completed-queues');
```

### 2. Drop New Tables

```sql
-- Drop in reverse order of creation
DROP TABLE IF EXISTS course_versions CASCADE;
DROP TABLE IF EXISTS entitlements CASCADE;
DROP TABLE IF EXISTS billing_subscriptions CASCADE;
DROP TABLE IF EXISTS leaderboards CASCADE;
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS assessment_submissions CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS ai_generations CASCADE;
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS forum_members CASCADE;
DROP TABLE IF EXISTS forum_posts CASCADE;
DROP TABLE IF EXISTS forums CASCADE;
DROP TABLE IF EXISTS funnels CASCADE;
DROP TABLE IF EXISTS ab_tests CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS webhook_logs CASCADE;
DROP TABLE IF EXISTS webhook_queue CASCADE;
DROP TABLE IF EXISTS webhooks CASCADE;
DROP TABLE IF EXISTS email_logs CASCADE;
DROP TABLE IF EXISTS email_queue CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
```

### 3. Delete Edge Functions

In Supabase Dashboard:

- Go to Edge Functions
- Delete each function individually

## Testing Checklist

### Database

- [ ] All tables created
- [ ] All indexes created
- [ ] All triggers working
- [ ] RLS policies active
- [ ] Foreign keys valid

### Edge Functions

- [ ] email-dispatch responds
- [ ] webhook-dispatch responds
- [ ] ai-course-create responds
- [ ] grade-ai responds
- [ ] Environment variables set

### Admin Pages

- [ ] Launchpad loads
- [ ] Community loads
- [ ] Marketing loads
- [ ] Assessments loads
- [ ] Analytics loads
- [ ] Integrations loads
- [ ] Navigation works
- [ ] Forms submit

### Cron Jobs

- [ ] Jobs scheduled
- [ ] Jobs executing
- [ ] Logs available
- [ ] No errors

## Security Verification

- [ ] RLS enabled on all tables
- [ ] Admin policies restrict access
- [ ] User policies scope data
- [ ] Service role policies secure
- [ ] API keys not exposed
- [ ] Webhook secrets configured

## Performance Checks

- [ ] Indexes on foreign keys
- [ ] Indexes on frequently queried columns
- [ ] RLS policies optimized
- [ ] Edge Functions respond < 5s
- [ ] Pages load < 3s

## Final Checks Before Going Live

- [ ] All migrations run successfully
- [ ] All Edge Functions deployed
- [ ] All environment variables set
- [ ] All cron jobs configured
- [ ] All admin pages accessible
- [ ] All tests passing
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Team trained
- [ ] Documentation updated

## Post-Deployment Monitoring

### First Hour

- Monitor Edge Function logs
- Check cron job execution
- Verify no RLS errors
- Test critical paths

### First Day

- Review error rates
- Check performance metrics
- Monitor API usage
- Verify data integrity

### First Week

- Analyze usage patterns
- Optimize slow queries
- Adjust cron schedules
- Gather user feedback

## Support Contacts

- **Technical Issues:** Check Supabase dashboard logs
- **Deployment Questions:** Review DEPLOYMENT_GUIDE.md
- **Feature Documentation:** See IMPLEMENTATION_SUMMARY.md
- **Edge Functions:** See EDGE_FUNCTIONS_DEPLOYMENT.md

---

**Status:** ✅ All critical issues resolved
**Ready for Deployment:** Yes
**Last Updated:** 2025-11-03
