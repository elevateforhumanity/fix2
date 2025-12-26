# Email Automation System - Complete Guide

## Overview

You have a **fully functional email automation system** built into your platform - complete with drip campaigns, scheduled emails, and workflow automation.

---

## ✅ What's Built

### 1. Email Workflows (Drip Campaigns)
**Location:** `/app/admin/email-marketing/automation`

**Features:**
- Automated email sequences
- Trigger-based workflows
- Multi-step drip campaigns
- Delay scheduling (minutes/hours/days)
- Variable personalization
- Enrollment tracking
- Completion tracking

### 2. Scheduled Campaigns
**Location:** `/app/admin/email-marketing/campaigns`

**Features:**
- Schedule emails for future sending
- One-time campaigns
- Bulk email sending
- Campaign analytics
- Open/click tracking

### 3. Database Tables

```sql
-- Workflow system
email_workflows          # Workflow definitions
workflow_enrollments     # User enrollment tracking
email_logs              # Email sending logs

-- Campaign system
email_campaigns         # Campaign definitions
campaign_templates      # Reusable templates
```

---

## 🔄 Email Workflows (Drip Campaigns)

### Workflow Types

**1. Welcome Series**
- Trigger: New student enrollment
- Emails: 3-5 emails over 7-14 days
- Purpose: Onboard new students

**2. Application Follow-Up**
- Trigger: Abandoned application
- Emails: 2-3 emails over 3-7 days
- Purpose: Convert applicants

**3. Course Completion**
- Trigger: Program completed
- Emails: 2-4 emails over 7-30 days
- Purpose: Gather feedback, promote next steps

**4. Re-engagement**
- Trigger: Inactive for 30 days
- Emails: 2-3 emails over 14 days
- Purpose: Bring back inactive students

### Trigger Events

```typescript
trigger_event: 
  - 'enrollment'    // New student enrolled
  - 'application'   // New application submitted
  - 'completion'    // Program completed
  - 'abandoned'     // Application abandoned (24h)
```

### Workflow Structure

```json
{
  "id": "uuid",
  "name": "Welcome Series",
  "trigger_event": "enrollment",
  "target_audience": "all_students",
  "status": "active",
  "steps": [
    {
      "delay": 0,
      "delayUnit": "minutes",
      "subject": "Welcome to {{programName}}!",
      "customHtml": "<h1>Hi {{firstName}},</h1><p>Welcome!</p>"
    },
    {
      "delay": 3,
      "delayUnit": "days",
      "subject": "Getting Started Guide",
      "customHtml": "<h1>Hi {{firstName}},</h1><p>Here's how to get started...</p>"
    },
    {
      "delay": 7,
      "delayUnit": "days",
      "subject": "Need Help?",
      "customHtml": "<h1>Hi {{firstName}},</h1><p>We're here to help...</p>"
    }
  ]
}
```

### Available Variables

```
{{firstName}}     - Student first name
{{lastName}}      - Student last name
{{email}}         - Student email
{{programName}}   - Program name
{{portalUrl}}     - Student portal URL
{{student_name}}  - Full name
{{dashboard_link}} - Dashboard link
{{support_email}} - Support email
{{support_phone}} - Support phone
```

---

## 📅 Scheduled Campaigns

### Campaign Structure

```json
{
  "id": "uuid",
  "name": "Monthly Newsletter",
  "subject": "December Newsletter",
  "from_name": "Elevate for Humanity",
  "from_email": "noreply@elevateforhumanity.org",
  "reply_to": "support@elevateforhumanity.org",
  "html_content": "<html>...</html>",
  "recipient_list": ["email1@example.com", "email2@example.com"],
  "status": "scheduled",
  "scheduled_for": "2025-12-15T10:00:00Z"
}
```

### Campaign Status

```
- draft      // Being created
- scheduled  // Scheduled for future
- sending    // Currently sending
- sent       // Successfully sent
- failed     // Failed to send
```

---

## 🤖 Automation Processor

### Workflow Processor
**Endpoint:** `/api/email/workflows/processor`
**Schedule:** Every 5 minutes via cron

**What It Does:**
1. Checks for new trigger events
2. Enrolls users in workflows
3. Sends pending workflow emails
4. Updates enrollment status
5. Logs all activity

### Campaign Scheduler
**Endpoint:** `/api/email/scheduler`
**Schedule:** Every 5 minutes via cron

**What It Does:**
1. Finds campaigns scheduled for now
2. Sends campaigns
3. Updates campaign status
4. Tracks results

---

## 🚀 How to Use

### Create a Workflow

**Via Admin UI:**
1. Go to `/admin/email-marketing/automation`
2. Click "Create Workflow"
3. Choose trigger event
4. Add email steps
5. Set delays between emails
6. Activate workflow

**Via API:**
```bash
curl -X POST https://elevateforhumanity.org/api/email/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Welcome Series",
    "trigger_event": "enrollment",
    "target_audience": "all_students",
    "status": "active",
    "steps": [
      {
        "delay": 0,
        "delayUnit": "minutes",
        "subject": "Welcome!",
        "customHtml": "<h1>Welcome {{firstName}}!</h1>"
      }
    ]
  }'
```

### Schedule a Campaign

**Via Admin UI:**
1. Go to `/admin/email-marketing/campaigns/new`
2. Enter subject and content
3. Select recipients
4. Choose "Schedule for later"
5. Pick date and time
6. Save campaign

**Via API:**
```bash
curl -X POST https://elevateforhumanity.org/api/email/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Newsletter",
    "subject": "December Newsletter",
    "html_content": "<html>...</html>",
    "recipient_list": ["email@example.com"],
    "status": "scheduled",
    "scheduled_for": "2025-12-15T10:00:00Z"
  }'
```

### Manual Trigger

Test workflows manually:
```bash
# Process workflows now
curl https://elevateforhumanity.org/api/email/workflows/processor

# Process scheduled campaigns now
curl https://elevateforhumanity.org/api/email/scheduler
```

---

## ⚙️ Setup & Configuration

### 1. Verify Database Tables

Check that tables exist:
```sql
SELECT * FROM email_workflows LIMIT 1;
SELECT * FROM workflow_enrollments LIMIT 1;
SELECT * FROM email_campaigns LIMIT 1;
```

If missing, run migration:
```bash
# Tables are in:
supabase/migrations/20251207_email_workflows.sql
```

### 2. Configure Cron Jobs

**Option A: Vercel Cron (Recommended)**

Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/email/workflows/processor",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/email/scheduler",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Option B: External Cron Service**

Use cron-job.org or similar:
- URL: `https://elevateforhumanity.org/api/email/workflows/processor`
- Schedule: Every 5 minutes
- URL: `https://elevateforhumanity.org/api/email/scheduler`
- Schedule: Every 5 minutes

**Option C: Server Cron**

Add to crontab:
```bash
*/5 * * * * curl https://elevateforhumanity.org/api/email/workflows/processor
*/5 * * * * curl https://elevateforhumanity.org/api/email/scheduler
```

### 3. Verify Email Service

Ensure Resend API key is configured:
```bash
# Check in Vercel
RESEND_API_KEY=re_...
```

---

## 📊 Monitoring & Analytics

### View Workflow Performance

```sql
-- Active workflows
SELECT 
  w.name,
  w.status,
  COUNT(e.id) as total_enrollments,
  COUNT(CASE WHEN e.completed = true THEN 1 END) as completed,
  COUNT(CASE WHEN e.completed = false THEN 1 END) as active
FROM email_workflows w
LEFT JOIN workflow_enrollments e ON w.id = e.workflow_id
GROUP BY w.id, w.name, w.status;
```

### View Campaign Stats

```sql
-- Campaign performance
SELECT 
  name,
  status,
  scheduled_for,
  sent_count,
  open_count,
  click_count,
  (open_count::float / NULLIF(sent_count, 0) * 100) as open_rate,
  (click_count::float / NULLIF(sent_count, 0) * 100) as click_rate
FROM email_campaigns
WHERE status = 'sent'
ORDER BY scheduled_for DESC;
```

### View Email Logs

```sql
-- Recent emails sent
SELECT 
  recipient_email,
  subject,
  status,
  sent_at,
  error_message
FROM email_logs
ORDER BY sent_at DESC
LIMIT 100;
```

---

## 🎯 Pre-Built Workflows

### 1. Welcome Series (Enrollment)

```json
{
  "name": "Welcome Series",
  "trigger_event": "enrollment",
  "steps": [
    {
      "delay": 0,
      "delayUnit": "minutes",
      "subject": "Welcome to {{programName}}!",
      "customHtml": "Welcome email with getting started guide"
    },
    {
      "delay": 3,
      "delayUnit": "days",
      "subject": "Your First Week Checklist",
      "customHtml": "Checklist of tasks to complete"
    },
    {
      "delay": 7,
      "delayUnit": "days",
      "subject": "Need Help? We're Here!",
      "customHtml": "Support resources and contact info"
    }
  ]
}
```

### 2. Application Follow-Up (Abandoned)

```json
{
  "name": "Application Follow-Up",
  "trigger_event": "abandoned",
  "steps": [
    {
      "delay": 0,
      "delayUnit": "minutes",
      "subject": "Complete Your Application",
      "customHtml": "Reminder to finish application"
    },
    {
      "delay": 3,
      "delayUnit": "days",
      "subject": "Questions About Your Application?",
      "customHtml": "Offer help completing application"
    }
  ]
}
```

### 3. Course Completion (Completion)

```json
{
  "name": "Course Completion",
  "trigger_event": "completion",
  "steps": [
    {
      "delay": 0,
      "delayUnit": "minutes",
      "subject": "Congratulations on Completing {{programName}}!",
      "customHtml": "Celebration and certificate info"
    },
    {
      "delay": 7,
      "delayUnit": "days",
      "subject": "Share Your Feedback",
      "customHtml": "Survey request"
    },
    {
      "delay": 14,
      "delayUnit": "days",
      "subject": "What's Next?",
      "customHtml": "Next program recommendations"
    }
  ]
}
```

---

## 🔧 Customization

### Add Custom Trigger

Edit `/app/api/email/workflows/processor/route.ts`:

```typescript
case 'custom_trigger':
  const { data: customUsers } = await supabase
    .from('students')
    .select('id, email, first_name, last_name')
    .eq('custom_field', 'custom_value')
    .gte('created_at', lookbackTime);
  newUsers = customUsers || [];
  break;
```

### Add Custom Variables

Edit processor to include new variables:

```typescript
const variables = {
  firstName: user.first_name || 'there',
  lastName: user.last_name || '',
  customField: user.custom_field || 'default',
  // Add more variables here
};
```

### Custom Email Templates

Create reusable templates:

```sql
INSERT INTO campaign_templates (
  name,
  category,
  subject,
  html_content
) VALUES (
  'Welcome Email',
  'onboarding',
  'Welcome to {{programName}}!',
  '<html>Your HTML here with {{variables}}</html>'
);
```

---

## 🚨 Troubleshooting

### Issue: Workflows not sending

**Check:**
1. Workflow status is "active"
2. Cron job is running every 5 minutes
3. Resend API key is configured
4. Check email_logs table for errors

**Solution:**
```bash
# Manually trigger processor
curl https://elevateforhumanity.org/api/email/workflows/processor

# Check logs
SELECT * FROM email_logs WHERE status = 'failed' ORDER BY created_at DESC LIMIT 10;
```

### Issue: Scheduled campaigns not sending

**Check:**
1. Campaign status is "scheduled"
2. scheduled_for time is in the past
3. Scheduler cron is running
4. Resend API key is configured

**Solution:**
```bash
# Manually trigger scheduler
curl https://elevateforhumanity.org/api/email/scheduler

# Check campaign status
SELECT id, name, status, scheduled_for, error_message 
FROM email_campaigns 
WHERE status IN ('scheduled', 'failed');
```

### Issue: Users not enrolling in workflows

**Check:**
1. Trigger event matches user action
2. User has valid email address
3. User not already enrolled

**Solution:**
```sql
-- Check enrollments
SELECT * FROM workflow_enrollments 
WHERE workflow_id = 'your-workflow-id' 
ORDER BY enrolled_at DESC;

-- Manually enroll user
INSERT INTO workflow_enrollments (
  workflow_id,
  user_id,
  user_email,
  current_step,
  enrolled_at,
  next_email_at
) VALUES (
  'workflow-uuid',
  'user-uuid',
  'user@example.com',
  0,
  NOW(),
  NOW()
);
```

---

## 📈 Best Practices

### 1. Email Timing
- **Welcome emails:** Send immediately (0 delay)
- **Follow-ups:** Wait 3-7 days between emails
- **Re-engagement:** Wait 14-30 days

### 2. Email Content
- Keep subject lines under 50 characters
- Personalize with variables
- Include clear call-to-action
- Mobile-responsive HTML

### 3. Testing
- Test workflows with test users first
- Check all variables render correctly
- Verify links work
- Test on multiple email clients

### 4. Monitoring
- Check email logs daily
- Monitor open/click rates
- Review failed sends
- Adjust timing based on engagement

### 5. Compliance
- Include unsubscribe link
- Honor opt-outs
- Follow CAN-SPAM Act
- GDPR compliance for EU users

---

## 🔐 Security

### Email Sending
- ✅ Server-side only (no client exposure)
- ✅ Rate limiting implemented
- ✅ Spam prevention
- ✅ Bounce handling

### Data Privacy
- ✅ User emails encrypted in transit
- ✅ Opt-out tracking
- ✅ FERPA compliant
- ✅ Audit logging

---

## 💰 Cost Analysis

### Email Sending Costs (Resend)

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Good for testing

**Pro Plan ($20/month):**
- 50,000 emails/month
- $0.80 per 1,000 additional
- Recommended for production

**Example:**
- 1,000 students
- 3 emails per workflow
- 3,000 emails/month
- **Cost: $0** (within free tier)

---

## 📊 Analytics Dashboard

### Key Metrics

**Workflow Performance:**
- Total enrollments
- Completion rate
- Average time to complete
- Drop-off by step

**Campaign Performance:**
- Emails sent
- Open rate
- Click rate
- Conversion rate

**Email Health:**
- Delivery rate
- Bounce rate
- Spam complaints
- Unsubscribe rate

---

## 🚀 Quick Start

### 1. Create Your First Workflow

```bash
# Go to admin panel
https://elevateforhumanity.org/admin/email-marketing/automation

# Click "Create Workflow"
# Choose trigger: "enrollment"
# Add 3 email steps
# Activate workflow
```

### 2. Set Up Cron Jobs

```bash
# Add to vercel.json
{
  "crons": [
    {
      "path": "/api/email/workflows/processor",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### 3. Test the System

```bash
# Manually trigger processor
curl https://elevateforhumanity.org/api/email/workflows/processor

# Check results
SELECT * FROM email_logs ORDER BY sent_at DESC LIMIT 10;
```

---

## 📚 Additional Resources

### Documentation
- Workflow processor: `/app/api/email/workflows/processor/route.ts`
- Campaign scheduler: `/app/api/email/scheduler/route.ts`
- Database schema: `/supabase/migrations/20251207_email_workflows.sql`

### Admin Pages
- Workflows: `/admin/email-marketing/automation`
- Campaigns: `/admin/email-marketing/campaigns`
- Analytics: `/admin/email-marketing/analytics`

---

**Status:** ✅ **FULLY OPERATIONAL**

**Your email automation system is ready to use!**

Just set up the cron jobs and start creating workflows.

---

**Last Updated:** December 26, 2025
**Version:** 1.0 - Complete
**Cost:** $0-$20/month (Resend)
