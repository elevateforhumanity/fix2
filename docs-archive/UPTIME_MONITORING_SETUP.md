# Uptime Monitoring Setup Guide

## Quick Setup Options

### Option 1: UptimeRobot (Recommended - Free)

**Why:** Free for up to 50 monitors, 5-minute checks

**Setup (5 minutes):**

1. Go to https://uptimerobot.com
2. Sign up for free account
3. Click "Add New Monitor"
4. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Elevate for Humanity - Homepage
   - **URL**: `https://www.elevateforhumanity.org`
   - **Monitoring Interval**: 5 minutes
5. Add alert contacts (email, SMS, Slack)
6. Click "Create Monitor"

**Additional Monitors to Add:**
- Apply page: `https://www.elevateforhumanity.org/apply`
- Programs: `https://www.elevateforhumanity.org/programs`
- LMS: `https://www.elevateforhumanity.org/lms`
- API Health: `https://www.elevateforhumanity.org/api/health`

---

### Option 2: Pingdom (Professional)

**Why:** More detailed monitoring, better reporting

**Setup:**

1. Go to https://www.pingdom.com
2. Start free trial (14 days)
3. Add uptime check
4. Configure alerts
5. Set up status page

**Cost:** $10-15/month after trial

---

### Option 3: Better Uptime (Modern)

**Why:** Beautiful interface, incident management

**Setup:**

1. Go to https://betteruptime.com
2. Sign up (free tier available)
3. Add monitor
4. Configure on-call schedule
5. Set up status page

**Cost:** Free for basic, $20/month for team

---

### Option 4: Vercel Built-in (Included)

**Why:** Already included with Vercel

**Setup:**

1. Go to Vercel Dashboard
2. Select your project
3. Click "Monitoring" tab
4. View uptime metrics

**Note:** Basic monitoring only, no alerts

---

## Recommended Setup (Free)

### UptimeRobot Configuration

**Monitors to Create:**

1. **Homepage**
   - URL: `https://www.elevateforhumanity.org`
   - Interval: 5 minutes
   - Alert: Email + SMS

2. **Apply Page**
   - URL: `https://www.elevateforhumanity.org/apply`
   - Interval: 5 minutes
   - Alert: Email

3. **API Health Check**
   - URL: `https://www.elevateforhumanity.org/api/health`
   - Interval: 5 minutes
   - Alert: Email + SMS

4. **LMS Dashboard**
   - URL: `https://www.elevateforhumanity.org/lms`
   - Interval: 5 minutes
   - Alert: Email

**Alert Contacts:**
- Primary email
- Secondary email
- SMS (optional, costs credits)
- Slack webhook (optional)

---

## Health Check Endpoint

Your site already has a health check endpoint:

**URL:** `/api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-02T05:28:00.000Z",
  "uptime": 12345,
  "database": "connected",
  "version": "2.0.0"
}
```

Use this for monitoring.

---

## Status Page Setup

### Option 1: UptimeRobot Public Status Page

1. In UptimeRobot dashboard
2. Click "Public Status Pages"
3. Create new page
4. Select monitors to display
5. Customize branding
6. Get public URL: `https://status.uptimerobot.com/your-page`

### Option 2: Custom Status Page

Create your own at `/status`:

```typescript
// Already exists at app/status/page.tsx
// Shows real-time system status
```

---

## Alert Configuration

### Email Alerts

**When to alert:**
- Site is down (immediate)
- Site is slow (>5s response time)
- SSL certificate expiring (30 days before)
- High error rate (>5% of requests)

**Alert Frequency:**
- First alert: Immediate
- Reminder: Every 30 minutes
- Recovery: Immediate

### SMS Alerts (Optional)

**When to use:**
- Critical downtime only
- After hours
- Multiple failures

**Cost:** Usually $0.01-0.05 per SMS

### Slack Alerts (Recommended)

**Setup:**
1. Create Slack webhook
2. Add to UptimeRobot
3. Get alerts in #alerts channel

**Benefits:**
- Free
- Team visibility
- Easy to track

---

## Monitoring Checklist

### Daily Checks
- [ ] Review uptime percentage
- [ ] Check response times
- [ ] Review any incidents

### Weekly Checks
- [ ] Review uptime trends
- [ ] Check SSL certificate status
- [ ] Review alert history

### Monthly Checks
- [ ] Generate uptime report
- [ ] Review SLA compliance
- [ ] Update monitoring rules

---

## SLA Targets

### Recommended Targets

- **Uptime**: 99.9% (43 minutes downtime/month)
- **Response Time**: <2 seconds
- **Error Rate**: <0.1%

### Current Status

Check at: https://vercel.com/dashboard → Your Project → Analytics

---

## Incident Response Plan

### When Site Goes Down

1. **Immediate (0-5 min)**
   - Check Vercel status
   - Check deployment logs
   - Check database status

2. **Investigation (5-15 min)**
   - Identify root cause
   - Check recent deployments
   - Review error logs

3. **Resolution (15-30 min)**
   - Rollback if needed
   - Fix issue
   - Redeploy

4. **Post-Incident (30-60 min)**
   - Document incident
   - Update team
   - Implement prevention

---

## Monitoring Dashboard

### Recommended Tools

**Free:**
- UptimeRobot dashboard
- Vercel Analytics
- Google Analytics (user impact)

**Paid:**
- Datadog (comprehensive)
- New Relic (APM)
- Sentry (error tracking)

---

## Status

- ✅ Health check endpoint exists
- ⏳ External monitoring not configured
- ⏳ Status page available

**Next Step:** Sign up for UptimeRobot and add monitors.

---

## Quick Start Script

```bash
# Test health check endpoint
curl https://www.elevateforhumanity.org/api/health

# Expected response:
# {"status":"ok","timestamp":"..."}
```

---

## Support

**UptimeRobot Support:** https://uptimerobot.com/support  
**Vercel Support:** https://vercel.com/support  
**Your Health Check:** https://www.elevateforhumanity.org/api/health
