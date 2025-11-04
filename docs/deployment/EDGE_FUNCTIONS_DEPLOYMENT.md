# Edge Functions Deployment Guide

This document provides instructions for deploying the Edge Functions to Supabase.

## Prerequisites

1. Supabase CLI installed: `npm install -g supabase`
2. Supabase project linked: `supabase link --project-ref YOUR_PROJECT_REF`
3. Required environment variables configured in Supabase dashboard

## Edge Functions

The following Edge Functions have been created:

### 1. email-dispatch

**Purpose:** Handles automated email sending for campaigns, notifications, and transactional emails

**Location:** `supabase/functions/email-dispatch/`

**Environment Variables Required:**

- `SENDGRID_API_KEY` or `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Deploy:**

```bash
supabase functions deploy email-dispatch
```

**Usage:**

```bash
# Direct send
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/email-dispatch \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Welcome!",
    "html": "<p>Welcome to our platform!</p>"
  }'

# Process queue (for cron)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/email-dispatch?action=process-queue \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 2. webhook-dispatch

**Purpose:** Sends webhook notifications to configured endpoints

**Location:** `supabase/functions/webhook-dispatch/`

**Environment Variables Required:**

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Deploy:**

```bash
supabase functions deploy webhook-dispatch
```

**Usage:**

```bash
# Direct dispatch
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webhook-dispatch \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "user.created",
    "data": {"userId": "123", "email": "user@example.com"},
    "orgId": "org_123"
  }'

# Process queue (for cron)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webhook-dispatch?action=process-queue \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Retry failed (for cron)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webhook-dispatch?action=retry-failed \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 3. ai-course-create

**Purpose:** Generates course content using AI based on topic and requirements

**Location:** `supabase/functions/ai-course-create/`

**Environment Variables Required:**

- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Deploy:**

```bash
supabase functions deploy ai-course-create
```

**Usage:**

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/ai-course-create \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Introduction to Python Programming",
    "description": "Learn Python basics for beginners",
    "targetAudience": "Complete beginners",
    "difficulty": "beginner",
    "duration": 10,
    "moduleCount": 5,
    "includeQuizzes": true,
    "orgId": "org_123",
    "userId": "user_123"
  }'
```

### 4. grade-ai

**Purpose:** Automatically grades assessments using AI for subjective questions

**Location:** `supabase/functions/grade-ai/`

**Environment Variables Required:**

- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Deploy:**

```bash
supabase functions deploy grade-ai
```

**Usage:**

```bash
# Direct grading
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/grade-ai \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "sub_123",
    "assessmentId": "assess_123",
    "userId": "user_123",
    "orgId": "org_123"
  }'

# Process queue (for cron)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/grade-ai?action=process-queue \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Deployment Steps

### 1. Set Environment Variables

In your Supabase dashboard, go to Settings > Edge Functions and add the required environment variables:

```bash
# Email provider (choose one)
SENDGRID_API_KEY=your_sendgrid_key
# OR
RESEND_API_KEY=your_resend_key

# AI provider (choose one)
OPENAI_API_KEY=your_openai_key
# OR
ANTHROPIC_API_KEY=your_anthropic_key

# These are automatically available
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Deploy All Functions

```bash
# Deploy all functions at once
supabase functions deploy email-dispatch
supabase functions deploy webhook-dispatch
supabase functions deploy ai-course-create
supabase functions deploy grade-ai
```

### 3. Verify Deployment

Check the Supabase dashboard under Edge Functions to ensure all functions are deployed and running.

### 4. Test Functions

Use the curl commands above to test each function.

## Database Tables Required

Ensure the following tables exist in your Supabase database:

### email_queue

```sql
CREATE TABLE email_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  campaign_id UUID REFERENCES campaigns(id),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  html TEXT,
  text TEXT,
  template TEXT,
  template_data JSONB,
  from_email TEXT,
  reply_to TEXT,
  status TEXT DEFAULT 'pending',
  message_id TEXT,
  error TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### email_logs

```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  campaign_id UUID REFERENCES campaigns(id),
  recipients TEXT[],
  subject TEXT,
  status TEXT,
  message_id TEXT,
  error TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### webhook_queue

```sql
CREATE TABLE webhook_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  event TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  result JSONB,
  error TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### webhook_logs

```sql
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID REFERENCES webhooks(id),
  event TEXT NOT NULL,
  payload JSONB,
  status TEXT,
  status_code INTEGER,
  error TEXT,
  response_time_ms INTEGER,
  retry_count INTEGER DEFAULT 0,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ai_generations

```sql
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  entity_id UUID,
  prompt TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Cron Jobs

Set up cron jobs in Supabase to process queues automatically:

### Email Queue Processing

```sql
-- Run every 5 minutes
SELECT cron.schedule(
  'process-email-queue',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/email-dispatch?action=process-queue',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
  );
  $$
);
```

### Webhook Queue Processing

```sql
-- Run every 2 minutes
SELECT cron.schedule(
  'process-webhook-queue',
  '*/2 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/webhook-dispatch?action=process-queue',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
  );
  $$
);
```

### Webhook Retry Failed

```sql
-- Run every hour
SELECT cron.schedule(
  'retry-failed-webhooks',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/webhook-dispatch?action=retry-failed',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
  );
  $$
);
```

### AI Grading Queue Processing

```sql
-- Run every 10 minutes
SELECT cron.schedule(
  'process-grading-queue',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT.supabase.co/functions/v1/grade-ai?action=process-queue',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
  );
  $$
);
```

## Monitoring

Monitor Edge Function logs in the Supabase dashboard:

1. Go to Edge Functions
2. Select a function
3. View Logs tab

## Troubleshooting

### Function not responding

- Check environment variables are set correctly
- Verify the function is deployed
- Check logs for errors

### API rate limits

- Implement rate limiting in your application
- Use queue-based processing for bulk operations

### Timeout errors

- Edge Functions have a 30-second timeout
- For long-running tasks, use queue-based processing

## Security

- Never expose service role keys in client-side code
- Use Row Level Security (RLS) policies on all tables
- Validate all inputs in Edge Functions
- Use webhook secrets for webhook verification
- Rotate API keys regularly
