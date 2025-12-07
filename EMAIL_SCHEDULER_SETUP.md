# Email Scheduler Setup Guide

## Overview

The email scheduler automatically sends scheduled campaigns at their designated times. It runs as a cron job that checks for due campaigns every 5 minutes.

## How It Works

1. **Campaign Creation**: Users create campaigns and schedule them for future dates/times
2. **Database Storage**: Campaigns are stored with `status='scheduled'` and `scheduled_for` timestamp
3. **Cron Job**: Runs every 5 minutes, checks for campaigns where `scheduled_for <= NOW()`
4. **Sending**: Processes each due campaign, sends emails, updates status
5. **Logging**: Records all sends, opens, clicks, and failures

## Setup Options

### Option 1: Vercel Cron Jobs (Recommended for Vercel Deployment)

1. Create `vercel.json` in project root:

```json
{
  "crons": [
    {
      "path": "/api/email/scheduler",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

2. Deploy to Vercel - cron jobs are automatically configured
3. Verify in Vercel Dashboard > Project > Cron Jobs

**Pros**: Zero configuration, built-in monitoring, free on Pro plan
**Cons**: Requires Vercel Pro plan ($20/month)

### Option 2: External Cron Service (Free)

Use a free cron service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

1. Sign up for free account
2. Create new cron job:
   - URL: `https://yoursite.com/api/email/scheduler`
   - Schedule: Every 5 minutes (`*/5 * * * *`)
   - Method: GET
3. Enable monitoring/alerts

**Pros**: Free, works with any hosting
**Cons**: External dependency, rate limits on free tier

### Option 3: GitHub Actions (Free)

Create `.github/workflows/email-scheduler.yml`:

```yaml
name: Email Scheduler

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:  # Manual trigger

jobs:
  send-scheduled-emails:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Email Scheduler
        run: |
          curl -X GET https://yoursite.com/api/email/scheduler
```

**Pros**: Free, integrated with GitHub, reliable
**Cons**: Minimum 5-minute interval, requires public repo or GitHub Pro

### Option 4: Server Cron (Self-Hosted)

If self-hosting, add to crontab:

```bash
# Edit crontab
crontab -e

# Add this line
*/5 * * * * curl -X GET https://yoursite.com/api/email/scheduler
```

**Pros**: Full control, no external dependencies
**Cons**: Requires server access, manual setup

## Testing

### Manual Test

Trigger the scheduler manually:

```bash
curl -X POST https://yoursite.com/api/email/scheduler
```

Or visit in browser:
```
https://yoursite.com/api/email/scheduler
```

### Create Test Campaign

1. Go to Admin > Email Marketing
2. Click "Create Campaign"
3. Fill in details
4. Select "Schedule for Later"
5. Set time to 2 minutes from now
6. Save
7. Wait 2-5 minutes
8. Check email logs to verify send

## Monitoring

### Check Scheduler Logs

```sql
-- Recent scheduled campaigns
SELECT id, name, status, scheduled_for, sent_at, total_sent
FROM email_campaigns
WHERE status IN ('scheduled', 'sending', 'sent')
ORDER BY scheduled_for DESC
LIMIT 20;

-- Failed campaigns
SELECT id, name, scheduled_for, error_message
FROM email_campaigns
WHERE status = 'failed'
ORDER BY scheduled_for DESC;

-- Recent sends
SELECT campaign_id, recipient_email, status, sent_at, opened_at
FROM email_logs
ORDER BY sent_at DESC
LIMIT 50;
```

### Dashboard Metrics

View in Admin > Email Marketing > Analytics:
- Total scheduled campaigns
- Successful sends
- Failed sends
- Open rates
- Click rates

## Troubleshooting

### Campaigns Not Sending

1. **Check scheduler is running**:
   ```bash
   curl https://yoursite.com/api/email/scheduler
   ```
   Should return: `{"success": true, "processed": N}`

2. **Check campaign status**:
   ```sql
   SELECT * FROM email_campaigns WHERE id = 'campaign-id';
   ```
   Status should be 'scheduled', not 'draft'

3. **Check scheduled time**:
   ```sql
   SELECT scheduled_for, NOW() FROM email_campaigns WHERE id = 'campaign-id';
   ```
   `scheduled_for` should be <= `NOW()`

4. **Check error logs**:
   ```sql
   SELECT error_message FROM email_campaigns WHERE status = 'failed';
   ```

### High Failure Rate

1. **Check Resend API key**: Verify `RESEND_API_KEY` in environment variables
2. **Check recipient emails**: Ensure valid email addresses
3. **Check rate limits**: Resend free tier: 100 emails/day, 3,000/month
4. **Check email content**: Verify HTML is valid

### Scheduler Not Running

1. **Vercel**: Check Cron Jobs dashboard, verify Pro plan active
2. **External Service**: Check service status, verify URL is correct
3. **GitHub Actions**: Check workflow runs, verify schedule syntax
4. **Server Cron**: Check crontab with `crontab -l`, verify curl installed

## Rate Limits

### Resend (Email Provider)
- **Free**: 100 emails/day, 3,000/month
- **Pro ($20/month)**: 50,000 emails/month
- **Scale ($80/month)**: 100,000 emails/month

### Scheduler
- Runs every 5 minutes
- Processes all due campaigns in single run
- No limit on campaigns per run
- Sends emails sequentially (not parallel)

## Best Practices

1. **Test First**: Always test with small recipient list before full send
2. **Schedule Wisely**: Send during business hours (9 AM - 5 PM EST)
3. **Avoid Spam**: Don't send more than 1 campaign per day to same list
4. **Monitor Opens**: Track open rates, adjust send times accordingly
5. **Clean Lists**: Remove bounced/invalid emails regularly
6. **Personalize**: Use variables ({{firstName}}) for better engagement
7. **A/B Test**: Test subject lines and content with small groups first

## Security

- Scheduler endpoint is public (required for cron)
- No authentication needed (read-only operation)
- Rate limiting recommended (10 requests/minute)
- Monitor for abuse in server logs

## Cost Analysis

### Recommended Setup (Vercel + Resend Pro)
- Vercel Pro: $20/month (includes cron jobs)
- Resend Pro: $20/month (50,000 emails)
- **Total**: $40/month

### Budget Setup (External Cron + Resend Free)
- External Cron: Free (cron-job.org)
- Resend Free: $0 (3,000 emails/month)
- **Total**: $0/month

### Enterprise Setup (Vercel + Resend Scale)
- Vercel Pro: $20/month
- Resend Scale: $80/month (100,000 emails)
- **Total**: $100/month

## Support

For issues or questions:
- Email: elevateforhumanity.edu@gmail.com
- Phone: (317) 314-3757
- Documentation: /docs/email-marketing
