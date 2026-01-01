# Monitoring Quick Start - 30 Minutes

**Goal:** Get production monitoring working in 30 minutes

---

## Option 1: Automated Setup (Recommended)

```bash
# Run the setup wizard
./scripts/setup-monitoring.sh

# Follow the prompts
# It will guide you through each step
```

---

## Option 2: Manual Setup

### Step 1: Sentry (15 minutes)

#### A. Create Account

1. Go to [sentry.io](https://sentry.io)
2. Click "Get Started"
3. Sign up with email or GitHub

#### B. Create Project

1. Click "Create Project"
2. Select platform: **Next.js**
3. Project name: **elevate-for-humanity**
4. Click "Create Project"

#### C. Get DSN

Copy the DSN shown (looks like):

```
https://abc123def456@o123456.ingest.sentry.io/789012
```

#### D. Add to Environment

**Local:**

```bash
# Add to .env.local
echo "NEXT_PUBLIC_SENTRY_DSN=https://abc123@o123.ingest.sentry.io/456" >> .env.local
```

**Vercel:**

```bash
# Via CLI
vercel env add NEXT_PUBLIC_SENTRY_DSN
# Paste your DSN when prompted

# OR via Dashboard
# 1. Go to Project Settings → Environment Variables
# 2. Add: NEXT_PUBLIC_SENTRY_DSN = your-dsn-here
# 3. Select: Production, Preview, Development
```

#### E. Test

```bash
# Start dev server
npm run dev

# Visit site and trigger an error
# Check Sentry dashboard - error should appear
```

---

### Step 2: Uptime Monitoring (10 minutes)

#### A. Create Account

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up (free - 50 monitors)

#### B. Add Monitor

1. Click "Add New Monitor"
2. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Elevate Health Check
   - **URL:** `https://www.elevateforhumanity.org/api/health`
   - **Monitoring Interval:** 5 minutes
3. Click "Create Monitor"

#### C. Add Alert Contact

1. Go to "My Settings" → "Alert Contacts"
2. Add your email
3. Verify email

#### D. Test

1. Stop your server (to simulate downtime)
2. Wait 5 minutes
3. Check email - should receive alert

---

### Step 3: Verify (5 minutes)

#### Check Health Endpoint

```bash
curl https://www.elevateforhumanity.org/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-29T...",
  "version": "build-...",
  "checks": {
    "database": { "status": "pass" },
    "stripe": { "status": "pass" },
    "resend": { "status": "pass" }
  }
}
```

#### Check Sentry

1. Go to Sentry dashboard
2. Should see project created
3. Trigger test error
4. Verify error appears

#### Check UptimeRobot

1. Go to UptimeRobot dashboard
2. Should see monitor created
3. Status should be "Up"

---

## Environment Variables Needed

### Minimum (Required)

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

### Recommended

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=your_auth_token
```

### Optional

```bash
NEXT_PUBLIC_LOGROCKET_ID=your_app_id  # For session replay
```

---

## Quick Commands

### Test Locally

```bash
# Start dev server
npm run dev

# Test health endpoint
curl http://localhost:3000/api/health

# Trigger test error
curl http://localhost:3000/api/test-error
```

### Deploy to Vercel

```bash
# Add env vars
vercel env add NEXT_PUBLIC_SENTRY_DSN

# Deploy
vercel --prod

# Test production
curl https://www.elevateforhumanity.org/api/health
```

### Check Logs

```bash
# Vercel logs
vercel logs

# Or via dashboard
# Vercel → Project → Logs
```

---

## Troubleshooting

### Sentry Not Receiving Errors

**Check:**

```bash
# Verify DSN is set
echo $NEXT_PUBLIC_SENTRY_DSN

# Check .env.local
cat .env.local | grep SENTRY

# Verify in browser console
# Should see: Sentry initialized
```

**Fix:**

```bash
# Make sure DSN has NEXT_PUBLIC_ prefix
NEXT_PUBLIC_SENTRY_DSN=...  # ✅ Correct
SENTRY_DSN=...              # ❌ Wrong
```

### Health Endpoint Returns 503

**This is normal!**

- 503 = degraded (some services not configured)
- 200 = healthy (all services working)

In development without all services, 503 is expected.

### UptimeRobot Not Alerting

**Check:**

1. Email verified?
2. Monitor status is "Up"?
3. Alert contacts configured?
4. Wait 5 minutes for first check

---

## Cost Summary

### Free Tier (Start Here)

- **Sentry:** Free (5,000 errors/month)
- **UptimeRobot:** Free (50 monitors)
- **Vercel Analytics:** Free (included)
- **Total:** $0/month

### Paid Tier (When Scaling)

- **Sentry Team:** $26/month
- **Better Uptime:** $20/month
- **Total:** $46/month

---

## Success Checklist

- [ ] Sentry account created
- [ ] Sentry DSN added to .env.local
- [ ] Sentry DSN added to Vercel
- [ ] Test error sent to Sentry
- [ ] UptimeRobot account created
- [ ] Health endpoint monitor added
- [ ] Email alert configured
- [ ] Health endpoint tested
- [ ] Production deployment verified

---

## What You Get

### With Sentry

- ✅ Real-time error tracking
- ✅ Stack traces
- ✅ User context
- ✅ Performance monitoring
- ✅ Release tracking
- ✅ Email alerts

### With UptimeRobot

- ✅ Uptime monitoring (99.9% SLA)
- ✅ Email alerts
- ✅ SMS alerts (paid)
- ✅ Status page
- ✅ Response time tracking

### With Health Endpoint

- ✅ Database status
- ✅ Service status
- ✅ System resources
- ✅ Version tracking

---

## Next Steps

1. **Today:** Configure Sentry and UptimeRobot (30 min)
2. **Tomorrow:** Monitor for 24 hours
3. **This Week:** Review error patterns
4. **This Month:** Optimize based on data

---

## Support

**Need Help?**

- Read: `MONITORING_SETUP_GUIDE.md` (detailed guide)
- Run: `./scripts/setup-monitoring.sh` (automated setup)
- Check: Sentry docs at [docs.sentry.io](https://docs.sentry.io)

---

**Time Required:** 30 minutes  
**Difficulty:** Easy  
**Impact:** High - Full production visibility

**Let's get monitoring set up! 🚀**
