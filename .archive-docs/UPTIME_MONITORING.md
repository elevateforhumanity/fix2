# Uptime Monitoring - Quick Setup

## Option 1: UptimeRobot (Recommended - Free)

### Setup (5 minutes)

1. **Create Account**
   - Go to [uptimerobot.com](https://uptimerobot.com)
   - Sign up (free account includes 50 monitors)

2. **Add Monitors**

   **Monitor 1: Main Website**
   - Name: `Elevate for Humanity - Main`
   - URL: `https://www.elevateforhumanity.org`
   - Type: HTTP(s)
   - Monitoring Interval: 5 minutes
   - Alert Contacts: Your email

   **Monitor 2: LMS Portal**
   - Name: `Elevate - LMS Portal`
   - URL: `https://www.elevateeducationedu.com`
   - Type: HTTP(s)
   - Monitoring Interval: 5 minutes
   - Alert Contacts: Your email

   **Monitor 3: Admin Portal**
   - Name: `Elevate - Admin Portal`
   - URL: `https://www.elevateconnectsdirectory.org`
   - Type: HTTP(s)
   - Monitoring Interval: 5 minutes
   - Alert Contacts: Your email

3. **Configure Alerts**
   - Email: Enabled by default
   - SMS: Optional (paid feature)
   - Webhook: Optional (for Slack/Discord)

4. **Done!**
   - You'll receive email alerts if any site goes down
   - Check dashboard for uptime statistics

## Option 2: Vercel Built-in Monitoring

Already included with your Vercel deployment:

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Click "Analytics" tab
4. View:
   - Real-time traffic
   - Response times
   - Error rates
   - Geographic distribution

**Note:** Vercel doesn't send downtime alerts by default. Use UptimeRobot for alerts.

## Health Check Endpoint

Your site has a health check endpoint at:

```
https://www.elevateforhumanity.org/api/health
```

This endpoint checks:

- Database connectivity
- Auth service status
- Overall system health

Returns:

- `200 OK` - All systems operational
- `503 Service Unavailable` - System degraded or unhealthy

### Monitor the Health Endpoint

In UptimeRobot, add a fourth monitor:

- Name: `Elevate - Health Check`
- URL: `https://www.elevateforhumanity.org/api/health`
- Type: HTTP(s)
- Expected Status: 200
- Monitoring Interval: 5 minutes

## Quick Verification

Test your monitoring setup:

1. **Check monitors are active**
   - Log into UptimeRobot
   - All monitors should show green "Up"

2. **Test alert system**
   - In UptimeRobot, click a monitor
   - Click "Pause Monitoring"
   - Wait 5 minutes
   - You should receive a "Down" alert
   - Resume monitoring
   - You should receive an "Up" alert

3. **Verify health endpoint**
   ```bash
   curl https://www.elevateforhumanity.org/api/health
   ```
   Should return JSON with `"status": "healthy"`

## Alert Response Plan

When you receive a downtime alert:

1. **Verify the issue**
   - Visit the URL in your browser
   - Check if it's actually down or a false positive

2. **Check Vercel status**
   - Go to Vercel dashboard
   - Check deployment status
   - Review error logs

3. **Check Sentry**
   - Look for recent errors
   - Identify the cause

4. **Take action**
   - If deployment issue: Rollback in Vercel
   - If code issue: Fix and redeploy
   - If infrastructure: Contact Vercel support

5. **Monitor recovery**
   - Wait for "Up" alert from UptimeRobot
   - Verify site is accessible
   - Check error rates in Sentry

## Status Page (Optional)

Create a public status page:

1. In UptimeRobot, go to "Status Pages"
2. Create new status page
3. Add your monitors
4. Customize branding
5. Share URL with users

Example: `https://status.elevateforhumanity.org`

## Success Metrics

Target uptime: **99.9%** (43 minutes downtime per month)

Monitor these metrics:

- Uptime percentage
- Average response time
- Number of incidents
- Mean time to recovery (MTTR)

## Cost

**Free Tier:**

- UptimeRobot: 50 monitors, 5-minute intervals
- Vercel Analytics: Included with hosting

**Paid Options (if needed):**

- UptimeRobot Pro: $7/month (1-minute intervals, SMS alerts)
- Better Uptime: $18/month (advanced features, status pages)

## ✅ Setup Complete

Once configured:

- ✅ All sites monitored
- ✅ Email alerts enabled
- ✅ Health check monitored
- ✅ Response plan documented

You'll be notified immediately if any site goes down!
