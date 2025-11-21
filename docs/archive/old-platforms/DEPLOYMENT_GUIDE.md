## Deployment Guide

Complete step-by-step guide to deploy all admin features to production.

## Prerequisites

- Supabase project created
- `.env` file configured with Supabase credentials
- Node.js and npm installed

## Step 1: Authenticate with Supabase

```bash
npx supabase login
```

This will open a browser window for authentication. Follow the prompts to log in.

## Step 2: Run Database Migrations

Run the migration script to create all required tables:

```bash
./run-migrations.sh
```

This will create:

- Email system tables (email_queue, email_logs)
- Webhook tables (webhooks, webhook_queue, webhook_logs)
- Marketing tables (campaigns, ab_tests, funnels)
- Community tables (forums, forum_posts, forum_members)
- Integration tables (api_keys, integrations)
- AI tracking table (ai_generations)

**Alternative: Manual Migration**

If the script doesn't work, you can run migrations manually in the Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20251103_admin_features.sql`
4. Click "Run"
5. Repeat for `supabase/migrations/20251103_admin_features_rls.sql`

## Step 3: Configure Environment Variables

In your Supabase dashboard, go to **Settings > Edge Functions** and add:

### Required for Email Dispatch

Choose ONE email provider:

**Option A: SendGrid**

```
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

**Option B: Resend**

```
RESEND_API_KEY=your_resend_api_key_here
```

### Required for AI Features

Choose ONE AI provider:

**Option A: OpenAI**

```
OPENAI_API_KEY=your_openai_api_key_here
```

**Option B: Anthropic**

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Automatically Available

These are automatically provided by Supabase:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Deploy Edge Functions

Run the deployment script:

```bash
./deploy-edge-functions.sh
```

This will deploy:

- `email-dispatch` - Email sending service
- `webhook-dispatch` - Webhook notification service
- `ai-course-create` - AI course generation
- `grade-ai` - AI-powered grading

**Alternative: Manual Deployment**

Deploy each function individually:

```bash
npx supabase functions deploy email-dispatch --project-ref YOUR_PROJECT_REF
npx supabase functions deploy webhook-dispatch --project-ref YOUR_PROJECT_REF
npx supabase functions deploy ai-course-create --project-ref YOUR_PROJECT_REF
npx supabase functions deploy grade-ai --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with your actual project reference (found in your Supabase URL).

## Step 5: Configure Cron Jobs

In your Supabase dashboard, go to **Database > Cron Jobs** and add:

### Email Queue Processing (Every 5 minutes)

```sql
SELECT cron.schedule(
  'process-email-queue',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOURPROJECTREF.supabase.co/functions/v1/email-dispatch?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    )
  );
  $$
);
```

### Webhook Queue Processing (Every 2 minutes)

```sql
SELECT cron.schedule(
  'process-webhook-queue',
  '*/2 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOURPROJECTREF.supabase.co/functions/v1/webhook-dispatch?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    )
  );
  $$
);
```

### Webhook Retry Failed (Every hour)

```sql
SELECT cron.schedule(
  'retry-failed-webhooks',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOURPROJECTREF.supabase.co/functions/v1/webhook-dispatch?action=retry-failed',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    )
  );
  $$
);
```

### AI Grading Queue Processing (Every 10 minutes)

```sql
SELECT cron.schedule(
  'process-grading-queue',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOURPROJECTREF.supabase.co/functions/v1/grade-ai?action=process-queue',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    )
  );
  $$
);
```

**Note:** Replace `YOUR_PROJECT_REF` with your actual project reference.

## Step 6: Test Edge Functions

Test each function to ensure it's working:

### Test Email Dispatch

```bash
curl -X POST https://YOURPROJECTREF.supabase.co/functions/v1/email-dispatch \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>This is a test email</p>"
  }'
```

### Test Webhook Dispatch

```bash
curl -X POST https://YOURPROJECTREF.supabase.co/functions/v1/webhook-dispatch \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "test.event",
    "data": {"message": "Hello"},
    "orgId": "YOUR_ORG_ID"
  }'
```

### Test AI Course Create

```bash
curl -X POST https://YOURPROJECTREF.supabase.co/functions/v1/ai-course-create \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Introduction to Python",
    "difficulty": "beginner",
    "duration": 5,
    "moduleCount": 3,
    "orgId": "YOUR_ORG_ID",
    "userId": "YOUR_USER_ID"
  }'
```

### Test AI Grading

```bash
curl -X POST https://YOURPROJECTREF.supabase.co/functions/v1/grade-ai \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "YOUR_SUBMISSION_ID",
    "assessmentId": "YOUR_ASSESSMENT_ID",
    "userId": "YOUR_USER_ID",
    "orgId": "YOUR_ORG_ID"
  }'
```

## Step 7: Deploy Frontend

Build and deploy the frontend application:

```bash
npm run build
```

Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.).

## Step 8: Verify Admin Pages

1. Log in to your application
2. Navigate to `/admin`
3. Verify all pages load correctly:
   - Launchpad
   - Dashboard
   - Users
   - Courses
   - Community
   - Marketing
   - Assessments
   - Analytics
   - Integrations
   - Billing
   - Audit Log

## Troubleshooting

### Edge Functions Not Deploying

**Issue:** Authentication error when deploying

**Solution:**

```bash
npx supabase login
```

### Migrations Failing

**Issue:** Table already exists or permission denied

**Solution:**

- Check if tables already exist in Supabase dashboard
- Verify you have admin access to the database
- Try running migrations manually in SQL Editor

### Edge Functions Timing Out

**Issue:** Functions return 504 timeout

**Solution:**

- Check function logs in Supabase dashboard
- Verify environment variables are set correctly
- Ensure external APIs (OpenAI, SendGrid) are accessible

### RLS Policies Blocking Access

**Issue:** Users can't access data

**Solution:**

- Verify user is authenticated
- Check user has correct role in org_members table
- Review RLS policies in Supabase dashboard

### Cron Jobs Not Running

**Issue:** Queue items not being processed

**Solution:**

- Verify cron jobs are created in Supabase dashboard
- Check cron job logs for errors
- Ensure service role key is configured correctly

## Monitoring

### Edge Function Logs

View logs in Supabase dashboard:

1. Go to **Edge Functions**
2. Select a function
3. Click **Logs** tab

### Database Logs

View database logs:

1. Go to **Database**
2. Click **Logs** tab
3. Filter by table or query

### Cron Job Logs

View cron job execution:

1. Go to **Database**
2. Click **Cron Jobs** tab
3. View execution history

## Security Checklist

- [ ] All RLS policies enabled
- [ ] Service role key not exposed in client code
- [ ] API keys stored in Supabase secrets
- [ ] Webhook secrets configured
- [ ] CORS configured for Edge Functions
- [ ] Rate limiting implemented
- [ ] Input validation in all functions

## Rollback Procedure

If something goes wrong:

### Rollback Migrations

```sql
-- Drop tables in reverse order
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

### Rollback Edge Functions

Delete functions in Supabase dashboard:

1. Go to **Edge Functions**
2. Select function
3. Click **Delete**

## Support

For issues or questions:

- Check `EDGE_FUNCTIONS_DEPLOYMENT.md` for detailed function documentation
- Check `IMPLEMENTATION_SUMMARY.md` for feature overview
- Review Supabase documentation: https://supabase.com/docs

## Next Steps After Deployment

1. Set up monitoring and alerting
2. Configure backup strategy
3. Implement rate limiting
4. Add unit and integration tests
5. Set up CI/CD pipeline
6. Document API endpoints
7. Create user documentation
8. Train team on new features

## Deployment Checklist

- [ ] Supabase authentication completed
- [ ] Database migrations run successfully
- [ ] Environment variables configured
- [ ] Edge Functions deployed
- [ ] Cron jobs configured
- [ ] Edge Functions tested
- [ ] Admin pages verified
- [ ] RLS policies working
- [ ] Monitoring set up
- [ ] Team trained
- [ ] Documentation updated
- [ ] Backup strategy in place

---

**Congratulations!** Your admin platform is now deployed and ready to use.
