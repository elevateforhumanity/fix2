# Zapier Integration for Durable Bridge Autopilot

**Automated alerts via Zapier webhook when tests fail**

---

## 🔔 Overview

The Durable Bridge Autopilot can send alerts to Zapier when:

- Health checks fail
- Tests fail
- Auto-heal is unsuccessful
- Manual intervention is needed

Zapier can then:

- Send emails
- Post to Slack/Discord/Teams
- Create tickets in Jira/Asana
- Send SMS via Twilio
- Trigger any Zapier integration

---

## 🚀 Quick Setup

### Step 1: Create Zapier Webhook

1. Go to [Zapier](https://zapier.com)
2. Create a new Zap
3. Choose **Webhooks by Zapier** as trigger
4. Select **Catch Hook**
5. Copy the webhook URL (looks like: `https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/`)

### Step 2: Configure Environment Variable

**Option A: Local (.env file)**

```bash
echo "ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/" >> .env
```

**Option B: GitHub Secrets**

```bash
gh secret set ZAPIER_WEBHOOK_URL --body "https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/"
```

**Option C: Netlify Environment**

```bash
netlify env:set ZAPIER_WEBHOOK_URL "https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/"
```

### Step 3: Test the Integration

```bash
# Test alert
./scripts/zapier-alert.sh "test" "Testing Zapier integration" "low"

# Check Zapier dashboard for the webhook data
```

---

## 📊 Alert Payload

When an alert is sent, Zapier receives this JSON payload:

```json
{
  "alert_type": "test_failure",
  "severity": "high",
  "message": "Durable Bridge tests failed: 2/10 tests failed",
  "timestamp": "2025-10-31T13:00:00Z",
  "system": {
    "hostname": "gitpod-workspace",
    "repository": "elevateforhumanity/fix2",
    "branch": "main",
    "commit": "abc1234"
  },
  "urls": {
    "bridge_script": "https://elevateforhumanityfix2.netlify.app/efh-bridge.js",
    "config": "https://elevateforhumanityfix2.netlify.app/api/efh-config.json",
    "github_actions": "https://github.com/elevateforhumanity/fix2/actions",
    "netlify_dashboard": "https://app.netlify.com/sites/elevateforhumanityfix2"
  },
  "bridge_status": {
    "status": "degraded",
    "issues_found": 2,
    "fixes_applied": 0,
    "programs_count": 6,
    "features_count": 6,
    "testimonials_count": 4,
    "response_time_ms": 245
  },
  "test_report": {
    "total_tests": 10,
    "passed": 8,
    "failed": 2,
    "success_rate": 80.0,
    "status": "failed"
  }
}
```

---

## 🎯 Alert Types

### test_failure

**When:** Automated tests fail  
**Severity:** High  
**Triggered by:** `scripts/test-durable-bridge.sh`

### health_check_failed

**When:** Health check finds issues that can't be auto-healed  
**Severity:** High  
**Triggered by:** `scripts/durable-bridge-health-check.sh`

### auto_heal_failed

**When:** Auto-heal attempts fail  
**Severity:** Critical  
**Triggered by:** GitHub Actions workflow

### deployment_failed

**When:** Deployment to Netlify fails  
**Severity:** High  
**Triggered by:** GitHub Actions workflow

---

## 📧 Example Zapier Workflows

### 1. Email Alert

**Trigger:** Webhook (Catch Hook)  
**Action:** Gmail (Send Email)

**Email Template:**

```
Subject: 🚨 Durable Bridge Alert: {{alert_type}}

Severity: {{severity}}
Message: {{message}}
Time: {{timestamp}}

System:
- Repository: {{system__repository}}
- Branch: {{system__branch}}
- Commit: {{system__commit}}

Status:
- Issues Found: {{bridge_status__issues_found}}
- Fixes Applied: {{bridge_status__fixes_applied}}
- Tests Passed: {{test_report__passed}}/{{test_report__total_tests}}

Quick Links:
- Bridge Script: {{urls__bridge_script}}
- GitHub Actions: {{urls__github_actions}}
- Netlify Dashboard: {{urls__netlify_dashboard}}

Action Required: Please investigate and resolve the issues.
```

---

### 2. Slack Notification

**Trigger:** Webhook (Catch Hook)  
**Action:** Slack (Send Channel Message)

**Message Template:**

```
:rotating_light: *Durable Bridge Alert*

*Type:* {{alert_type}}
*Severity:* {{severity}}
*Message:* {{message}}

*System Info:*
• Repository: {{system__repository}}
• Branch: {{system__branch}}
• Commit: {{system__commit}}

*Status:*
• Issues: {{bridge_status__issues_found}}
• Fixed: {{bridge_status__fixes_applied}}
• Tests: {{test_report__passed}}/{{test_report__total_tests}} passed

*Links:*
• <{{urls__github_actions}}|GitHub Actions>
• <{{urls__bridge_script}}|Bridge Script>
• <{{urls__netlify_dashboard}}|Netlify Dashboard>
```

---

### 3. SMS via Twilio

**Trigger:** Webhook (Catch Hook)  
**Filter:** Only if severity is "critical"  
**Action:** Twilio (Send SMS)

**SMS Template:**

```
🚨 CRITICAL: Durable Bridge {{alert_type}}
{{message}}
Check: {{urls__github_actions}}
```

---

### 4. Create Jira Ticket

**Trigger:** Webhook (Catch Hook)  
**Action:** Jira (Create Issue)

**Issue Template:**

```
Summary: Durable Bridge Alert: {{alert_type}}

Description:
Severity: {{severity}}
Message: {{message}}
Timestamp: {{timestamp}}

System:
- Repository: {{system__repository}}
- Branch: {{system__branch}}
- Commit: {{system__commit}}

Status:
- Issues Found: {{bridge_status__issues_found}}
- Fixes Applied: {{bridge_status__fixes_applied}}
- Test Success Rate: {{test_report__success_rate}}%

Links:
- GitHub Actions: {{urls__github_actions}}
- Bridge Script: {{urls__bridge_script}}
- Netlify Dashboard: {{urls__netlify_dashboard}}

Priority: High
Labels: autopilot, durable-bridge, automated-alert
```

---

## 🔧 Manual Alert Sending

You can manually send alerts for testing or custom scenarios:

```bash
# Basic alert
./scripts/zapier-alert.sh "custom_alert" "Your message here" "medium"

# Test failure alert
./scripts/zapier-alert.sh "test_failure" "Manual test failed" "high"

# Health check alert
./scripts/zapier-alert.sh "health_check_failed" "Manual health check" "low"
```

**Parameters:**

1. Alert type (string)
2. Message (string)
3. Severity (low/medium/high/critical)

---

## 🔍 Troubleshooting

### Alert Not Received

**Check webhook URL:**

```bash
echo $ZAPIER_WEBHOOK_URL
```

**Test manually:**

```bash
curl -X POST "$ZAPIER_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"test": "manual test"}'
```

**Check Zapier dashboard:**

- Go to Zap history
- Look for recent webhook catches
- Check for errors

### Webhook URL Not Set

If you see:

```
⚠️  ZAPIER_WEBHOOK_URL not configured
```

Set it in `.env`:

```bash
echo "ZAPIER_WEBHOOK_URL=your-webhook-url" >> .env
```

Or as environment variable:

```bash
export ZAPIER_WEBHOOK_URL="your-webhook-url"
```

---

## 📊 Alert Frequency

### Automated Alerts

**Health Check:** Every 30 minutes (if issues found)  
**Test Failures:** On every test run  
**Auto-Heal Failures:** Immediately when auto-heal fails  
**Deployment Failures:** On every failed deployment

### Rate Limiting

To avoid alert spam, the system:

- Only sends alerts when issues can't be auto-fixed
- Logs all alerts to `logs/zapier-alerts.log`
- Includes full context to reduce follow-up alerts

---

## 🎓 Best Practices

### 1. Use Filters in Zapier

Only alert on critical issues:

```
Filter: severity equals "critical" OR severity equals "high"
```

### 2. Set Up Multiple Actions

**For High Severity:**

- Send email
- Post to Slack
- Create ticket

**For Low Severity:**

- Just log to spreadsheet

### 3. Include Context

Always include:

- Links to GitHub Actions
- Links to logs
- System information
- Timestamp

### 4. Test Regularly

```bash
# Weekly test
./scripts/zapier-alert.sh "test" "Weekly Zapier test" "low"
```

---

## 🔐 Security

### Webhook URL Security

- ✅ Keep webhook URL secret
- ✅ Don't commit to git
- ✅ Use environment variables
- ✅ Rotate periodically

### Data Privacy

The alert payload includes:

- ✅ System information (safe)
- ✅ Public URLs (safe)
- ✅ Test results (safe)
- ❌ No secrets or credentials
- ❌ No sensitive data

---

## 📈 Monitoring

### View Alert Log

```bash
# Recent alerts
tail -20 logs/zapier-alerts.log

# All alerts today
grep "$(date +%Y-%m-%d)" logs/zapier-alerts.log

# Count alerts
wc -l logs/zapier-alerts.log
```

### Alert Statistics

```bash
# Count by type
grep -o "Alert sent: [^-]*" logs/zapier-alerts.log | sort | uniq -c

# Recent failures
grep "test_failure\|health_check_failed" logs/zapier-alerts.log | tail -10
```

---

## 🎯 Example Scenarios

### Scenario 1: Test Fails

1. Automated test runs via GitHub Actions
2. 2 out of 10 tests fail
3. Zapier alert sent with details
4. You receive email/Slack notification
5. Click GitHub Actions link
6. Review logs and fix issue

### Scenario 2: Health Check Degraded

1. Health check runs every 30 minutes
2. Bridge script returns 404
3. Auto-heal attempts to redeploy
4. Auto-heal fails
5. Zapier alert sent
6. You receive notification
7. Manual investigation needed

### Scenario 3: All Good

1. Health check runs
2. All checks pass
3. No alert sent
4. System continues monitoring
5. You stay focused on other work

---

## 📞 Support

### Documentation

- This guide: `ZAPIER_INTEGRATION.md`
- Autopilot guide: `DURABLE_BRIDGE_AUTOPILOT.md`
- System cheat sheet: `SYSTEM_CHEAT_SHEET.md`

### Zapier Resources

- Zapier Help: https://help.zapier.com
- Webhook Documentation: https://zapier.com/apps/webhook/help

### Testing

```bash
# Test alert script
./scripts/zapier-alert.sh "test" "Testing" "low"

# Test health check
./scripts/durable-bridge-health-check.sh

# Test functionality
./scripts/test-durable-bridge.sh
```

---

## 🎉 Summary

**Zapier Integration Provides:**

✅ **Instant Alerts** - Know immediately when something breaks  
✅ **Rich Context** - Full details in every alert  
✅ **Flexible Actions** - Email, Slack, SMS, tickets, etc.  
✅ **Smart Filtering** - Only alert on real issues  
✅ **Complete Audit** - All alerts logged  
✅ **Easy Setup** - Just add webhook URL

**Result:** Never miss a critical issue, stay informed without alert fatigue!

---

**Status:** ✅ READY TO USE  
**Setup Time:** 5 minutes  
**Cost:** Free (Zapier free tier supports 100 tasks/month)  
**Maintenance:** Zero
