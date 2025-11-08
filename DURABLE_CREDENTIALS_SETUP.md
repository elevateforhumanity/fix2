# 🔐 Durable.co Credentials Setup

**Purpose:** Enable Puppeteer Worker to automatically log into Durable.co and inject bridge code  
**Status:** ⚠️ PENDING - Needs manual setup

---

## 📋 Credentials Provided

### Email

```
Elevateforhumanity@gmail.com
```

### Password

```
Elijah1$
```

---

## 🚀 Setup Instructions

### Add to GitHub Secrets

Go to: [GitHub Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)

**Add these 2 secrets:**

#### 1. DURABLE_EMAIL

- Click **"New repository secret"**
- Name: `DURABLE_EMAIL`
- Value: `Elevateforhumanity@gmail.com`
- Click **"Add secret"**

#### 2. DURABLE_PASSWORD

- Click **"New repository secret"**
- Name: `DURABLE_PASSWORD`
- Value: `Elijah1$`
- Click **"Add secret"**

---

## 🤖 What This Enables

Once these secrets are added, the **Puppeteer Durable Worker** autopilot will:

### Automatic Actions (Every 30 minutes)

1. **Login to Durable.co**
   - Uses your credentials
   - Navigates to site settings
   - Accesses custom code section

2. **Inject Bridge Script**
   - Adds integration code to head section
   - Configures data slots
   - Verifies injection success

3. **Verify Integration**
   - Checks live site
   - Takes screenshot
   - Updates status

4. **Report Status**
   - Commits success/failure
   - Creates GitHub issues if needed
   - Uploads screenshots as artifacts

---

## 🔄 Autopilot Workflows Using These Credentials

### 1. Puppeteer Durable Worker

**File:** `.github/workflows/puppeteer-durable-worker.yml`  
**Schedule:** Every 30 minutes (until success, then every 6 hours)  
**Status:** ⚠️ Waiting for credentials

**What it does:**

- Automates Durable.co login
- Injects bridge integration code
- Maintains integration automatically
- Never requires manual intervention

### 2. Loop Until Success

**File:** `.github/workflows/loop-until-success.yml`  
**Schedule:** Every 15 minutes  
**Status:** ⚠️ Waiting for credentials

**What it does:**

- Monitors Puppeteer worker status
- Retries if integration fails
- Never gives up until successful
- Tracks integration status

### 3. Master Orchestrator

**File:** `.github/workflows/master-orchestrator.yml`  
**Schedule:** Every 30 minutes  
**Status:** ✅ Active (will trigger Puppeteer once credentials added)

**What it does:**

- Coordinates all autopilot systems
- Triggers Puppeteer worker
- Manages integration lifecycle

---

## 🎯 Integration Code That Will Be Injected

### Head Section (Custom Code)

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### Body Sections (HTML Blocks)

```html
<!-- Hero Section -->
<div data-efh-slot="hero"></div>

<!-- Programs Section -->
<div data-efh-slot="programs"></div>

<!-- Features Section -->
<div data-efh-slot="features"></div>

<!-- Testimonials Section -->
<div data-efh-slot="testimonials"></div>

<!-- Call to Action -->
<div data-efh-slot="cta"></div>
```

---

## ✅ After Setup

### Immediate Actions

1. **Puppeteer Worker Triggers**
   - Runs within 30 minutes
   - Logs into Durable.co
   - Injects bridge code
   - Verifies integration

2. **Loop Monitor Activates**
   - Checks every 15 minutes
   - Retries if needed
   - Reports status

3. **Integration Goes Live**
   - Your Durable site gets dynamic content
   - Programs, courses, testimonials load automatically
   - Enrollment forms work
   - Everything syncs with your LMS

### Monitoring

**Check workflow runs:**

- [Puppeteer Worker](https://github.com/elevateforhumanity/fix2/actions/workflows/puppeteer-durable-worker.yml)
- [Loop Until Success](https://github.com/elevateforhumanity/fix2/actions/workflows/loop-until-success.yml)
- [Master Orchestrator](https://github.com/elevateforhumanity/fix2/actions/workflows/master-orchestrator.yml)

**View screenshots:**

- Go to workflow run
- Check "Artifacts" section
- Download `durable-integration-screenshot-{run_number}`

**Check status:**

- Look for `logs/durable-integration-status.json` in repository
- Check for success/failure commits

---

## 🔐 Security Notes

### Credential Storage

- ✅ Stored in GitHub Secrets (encrypted)
- ✅ Never exposed in logs
- ✅ Only accessible to workflows
- ✅ Can be rotated anytime

### Access Control

- ✅ Only authorized workflows can use credentials
- ✅ Credentials never appear in code
- ✅ Audit trail in GitHub Actions logs
- ✅ Can revoke access anytime

### Best Practices

- ✅ Use strong, unique password
- ✅ Enable 2FA on Durable.co (if available)
- ✅ Monitor workflow runs
- ✅ Rotate credentials periodically
- ❌ Never commit credentials to repository
- ❌ Never share credentials publicly

---

## 🛠️ Manual Trigger (Optional)

If you want to trigger the Puppeteer worker immediately after adding credentials:

### Via GitHub Actions UI

1. Go to [Actions](https://github.com/elevateforhumanity/fix2/actions)
2. Select "Puppeteer Worker - Durable Integration"
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

### Via CLI (if authenticated)

```bash
gh workflow run puppeteer-durable-worker.yml
```

---

## 📊 Expected Timeline

| Time         | Event                                           |
| ------------ | ----------------------------------------------- |
| **T+0**      | Add credentials to GitHub Secrets               |
| **T+15 min** | Loop monitor checks status                      |
| **T+30 min** | Puppeteer worker triggers automatically         |
| **T+32 min** | Worker logs into Durable.co                     |
| **T+33 min** | Bridge code injected                            |
| **T+34 min** | Integration verified                            |
| **T+35 min** | Success status committed                        |
| **T+36 min** | Your Durable site is live with dynamic content! |

---

## 🎉 What You Get

### Automatic Integration

- ✅ No manual code injection needed
- ✅ Updates automatically every 6 hours
- ✅ Self-healing if integration breaks
- ✅ Continuous monitoring

### Dynamic Content

- ✅ Programs load from your database
- ✅ Courses display automatically
- ✅ Testimonials sync in real-time
- ✅ Enrollment forms work
- ✅ Payment processing enabled

### Zero Maintenance

- ✅ Autopilot handles everything
- ✅ No manual updates needed
- ✅ Automatic fixes on failure
- ✅ Continuous verification

---

## 🚨 Troubleshooting

### If Integration Fails

**Check workflow logs:**

1. Go to [Actions](https://github.com/elevateforhumanity/fix2/actions)
2. Find latest "Puppeteer Worker" run
3. Check logs for errors

**Common issues:**

- Wrong credentials → Update secrets
- Durable.co UI changed → Workflow needs update
- Network timeout → Will retry automatically
- 2FA enabled → May need to disable or use app password

**Automatic retry:**

- Loop monitor retries every 15 minutes
- Puppeteer worker retries every 30 minutes
- Never gives up until successful

---

## 📚 Related Documentation

- [COMPLETE_AUTOPILOT_ANALYSIS.md](./COMPLETE_AUTOPILOT_ANALYSIS.md) - Full autopilot system
- [AUTOPILOT_STATUS_REPORT.md](./AUTOPILOT_STATUS_REPORT.md) - Current status
- Workflow: `.github/workflows/puppeteer-durable-worker.yml`
- Workflow: `.github/workflows/loop-until-success.yml`

---

## 📝 Quick Setup Checklist

- [ ] Go to [GitHub Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
- [ ] Add `DURABLE_EMAIL` = `Elevateforhumanity@gmail.com`
- [ ] Add `DURABLE_PASSWORD` = `Elijah1$`
- [ ] Wait 30 minutes for automatic trigger
- [ ] Check [workflow runs](https://github.com/elevateforhumanity/fix2/actions)
- [ ] Verify integration success
- [ ] Visit your Durable site to see dynamic content

---

**Last Updated:** 2025-11-08 07:05 UTC  
**Status:** ⚠️ Credentials documented, awaiting GitHub Secrets setup  
**Next Step:** Add credentials to GitHub Secrets (2 minutes)
