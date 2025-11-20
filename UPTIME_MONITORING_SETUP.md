# 📡 Uptime Monitoring Setup Guide

**Date:** November 16, 2025  
**Status:** READY TO IMPLEMENT  
**Estimated Time:** 15-30 minutes

---

## 🎯 RECOMMENDED MONITORING SERVICES

### Option 1: UptimeRobot (FREE) ⭐ RECOMMENDED
**Best for:** Small to medium sites  
**Cost:** FREE for up to 50 monitors  
**Features:**
- ✅ 5-minute check intervals
- ✅ Email/SMS/Slack alerts
- ✅ Public status page
- ✅ SSL certificate monitoring
- ✅ Keyword monitoring

**Setup:**
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create free account
3. Add monitors:
   - Main site: `https://www.elevateforhumanity.org`
   - API health: `https://www.elevateforhumanity.org/api/health`
   - LMS: `https://www.elevateforhumanity.org/lms`
4. Set alert contacts (email, Slack)
5. Create public status page

**Time:** 10 minutes

---

### Option 2: Better Uptime (FREE)
**Best for:** Modern monitoring with great UX  
**Cost:** FREE for 10 monitors  
**Features:**
- ✅ 30-second check intervals
- ✅ Beautiful status pages
- ✅ Incident management
- ✅ On-call scheduling
- ✅ API monitoring

**Setup:**
1. Go to [betteruptime.com](https://betteruptime.com)
2. Sign up with GitHub
3. Add monitors
4. Configure alerts
5. Share status page

**Time:** 15 minutes

---

### Option 3: Pingdom (PAID)
**Best for:** Enterprise monitoring  
**Cost:** $10/month  
**Features:**
- ✅ 1-minute check intervals
- ✅ Real user monitoring
- ✅ Transaction monitoring
- ✅ Root cause analysis
- ✅ Advanced reporting

---

### Option 4: Vercel Monitoring (FREE with Vercel)
**Best for:** If deploying to Vercel  
**Cost:** FREE (included)  
**Features:**
- ✅ Automatic monitoring
- ✅ Performance insights
- ✅ Error tracking
- ✅ Analytics

**Setup:**
1. Deploy to Vercel
2. Monitoring enabled automatically
3. View in Vercel dashboard

**Time:** 0 minutes (automatic)

---

## 🚀 QUICK SETUP: UptimeRobot (10 minutes)

### Step 1: Create Account (2 min)
1. Go to https://uptimerobot.com
2. Click "Sign Up Free"
3. Enter email and password
4. Verify email

### Step 2: Add Monitors (5 min)

**Monitor 1: Main Website**
- Type: HTTP(S)
- URL: `https://www.elevateforhumanity.org`
- Name: "Elevate Main Site"
- Interval: 5 minutes
- Alert: Email

**Monitor 2: API Health**
- Type: HTTP(S)
- URL: `https://www.elevateforhumanity.org/api/health`
- Name: "Elevate API"
- Interval: 5 minutes
- Alert: Email
- Keyword: "ok" (checks response contains "ok")

**Monitor 3: LMS Portal**
- Type: HTTP(S)
- URL: `https://www.elevateforhumanity.org/lms`
- Name: "Elevate LMS"
- Interval: 5 minutes
- Alert: Email

**Monitor 4: SSL Certificate**
- Type: Port
- URL: `elevateforhumanity.org`
- Port: 443
- Name: "SSL Certificate"
- Interval: 1 day
- Alert: Email (30 days before expiry)

### Step 3: Configure Alerts (2 min)
1. Go to "My Settings" → "Alert Contacts"
2. Add email address
3. Add Slack webhook (optional)
4. Add SMS number (optional)

### Step 4: Create Status Page (1 min)
1. Go to "Status Pages"
2. Click "Add Status Page"
3. Select monitors to display
4. Customize branding
5. Get public URL
6. Share with team/users

---

## 📊 MONITORING ENDPOINTS TO ADD

### Critical Endpoints
```
✅ https://www.elevateforhumanity.org (Homepage)
✅ https://www.elevateforhumanity.org/api/health (API Health)
✅ https://www.elevateforhumanity.org/lms (LMS Portal)
```

### Important Endpoints
```
⚠️ https://www.elevateforhumanity.org/login (Auth)
⚠️ https://www.elevateforhumanity.org/programs (Programs)
⚠️ https://www.elevateforhumanity.org/admin (Admin)
```

### Optional Endpoints
```
○ https://www.elevateforhumanity.org/api/courses (API)
○ https://www.elevateforhumanity.org/api/auth/callback (Auth)
```

---

## 🔔 ALERT CONFIGURATION

### Alert Channels
1. **Email** (Primary)
   - Immediate alerts
   - Daily/weekly summaries

2. **Slack** (Recommended)
   - Real-time notifications
   - Team visibility
   - Quick response

3. **SMS** (Critical only)
   - After-hours alerts
   - Critical downtime only

### Alert Rules
```
Down for 2 minutes → Email
Down for 5 minutes → Slack
Down for 10 minutes → SMS
SSL expires in 30 days → Email
Response time > 5s → Email (daily summary)
```

---

## 📈 MONITORING DASHBOARD

### Key Metrics to Track
- **Uptime %** (Target: 99.9%)
- **Response Time** (Target: < 500ms)
- **SSL Status** (Valid, days until expiry)
- **Incident Count** (Target: < 1/month)
- **MTTR** (Mean Time To Recovery)

### Weekly Review
- Check uptime percentage
- Review incident reports
- Analyze response times
- Plan improvements

---

## 🛠️ HEALTH CHECK ENDPOINT

Your app already has a health check endpoint at `/api/health`.

**Verify it works:**
```bash
curl https://www.elevateforhumanity.org/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-16T10:00:00.000Z"
}
```

**If not working, create it:**
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
}
```

---

## 🎯 STATUS PAGE SETUP

### Public Status Page Benefits
- ✅ Transparency with users
- ✅ Reduces support tickets
- ✅ Shows reliability
- ✅ Professional image

### What to Include
- Current status (operational/degraded/down)
- Uptime percentage (30/90 days)
- Response time graph
- Incident history
- Scheduled maintenance

### Example Status Pages
- [GitHub Status](https://www.githubstatus.com/)
- [Vercel Status](https://www.vercel-status.com/)
- [Stripe Status](https://status.stripe.com/)

---

## 📱 MOBILE APP MONITORING (Optional)

If you have mobile apps:
- Monitor app store availability
- Track crash rates
- Monitor API endpoints from mobile
- Track app version adoption

---

## 🔐 SECURITY MONITORING

### Additional Checks
- SSL certificate expiry
- DNS resolution
- Domain expiry
- Security headers
- Vulnerability scanning

### Tools
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

---

## ✅ POST-SETUP CHECKLIST

After setting up monitoring:

- [ ] Verify all monitors are active
- [ ] Test alert notifications (trigger test alert)
- [ ] Share status page URL with team
- [ ] Add status page to footer/docs
- [ ] Set up weekly review schedule
- [ ] Document incident response process
- [ ] Configure on-call rotation (if needed)

---

## 📞 INCIDENT RESPONSE PLAN

### When Alert Fires

**Step 1: Acknowledge (1 min)**
- Check alert details
- Verify issue is real
- Acknowledge in monitoring tool

**Step 2: Assess (2 min)**
- Check status page
- Review error logs
- Identify affected services

**Step 3: Communicate (3 min)**
- Update status page
- Notify team
- Post in Slack

**Step 4: Fix (varies)**
- Apply fix
- Monitor recovery
- Verify resolution

**Step 5: Post-Mortem (later)**
- Document incident
- Identify root cause
- Plan prevention

---

## 💰 COST COMPARISON

| Service | Free Tier | Paid Tier | Best For |
|---------|-----------|-----------|----------|
| UptimeRobot | 50 monitors | $7/mo | Small sites |
| Better Uptime | 10 monitors | $18/mo | Modern UX |
| Pingdom | Trial only | $10/mo | Enterprise |
| Vercel | Included | Included | Vercel users |

**Recommendation:** Start with UptimeRobot FREE tier

---

## 🎉 BENEFITS OF MONITORING

### For You
- ✅ Know about issues before users
- ✅ Track reliability over time
- ✅ Identify performance trends
- ✅ Sleep better at night

### For Users
- ✅ Transparent communication
- ✅ Faster issue resolution
- ✅ Trust in your service
- ✅ Professional experience

---

## 📚 RESOURCES

- [UptimeRobot Docs](https://uptimerobot.com/help/)
- [Better Uptime Docs](https://docs.betteruptime.com/)
- [Status Page Best Practices](https://www.atlassian.com/incident-management/kpis/status-page-best-practices)

---

## ✅ NEXT STEPS

1. **Today:** Set up UptimeRobot (10 min)
2. **This Week:** Create status page
3. **This Month:** Review first month of data
4. **Ongoing:** Weekly monitoring reviews

---

**Setup Guide Created:** November 16, 2025  
**Estimated Setup Time:** 10-30 minutes  
**Recommended Service:** UptimeRobot (FREE)

**Ready to set up monitoring? Follow the Quick Setup guide above!** 🚀
