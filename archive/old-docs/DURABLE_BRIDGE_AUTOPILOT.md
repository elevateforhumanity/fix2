# Durable Bridge Autopilot System

**Automated monitoring, testing, and self-healing for zero-downtime operation**

---

## 🤖 Overview

The Durable Bridge Autopilot ensures your Durable integration never breaks by:

- ✅ **Monitoring** - Health checks every 30 minutes
- ✅ **Testing** - Automated functionality tests
- ✅ **Self-Healing** - Automatic recovery from failures
- ✅ **Alerting** - GitHub issues for unrecoverable problems
- ✅ **Logging** - Complete audit trail

---

## 🏥 Health Monitoring

### Automated Health Checks

**Frequency:** Every 30 minutes  
**Workflow:** `.github/workflows/durable-bridge-autopilot.yml`

**What's Checked:**

1. Bridge script availability (HTTP 200)
2. Configuration file accessibility
3. JSON validity
4. Content completeness (programs, features, testimonials)
5. Script integrity (expected patterns)
6. CORS headers
7. Response time (< 2 seconds)
8. Local file sync

### Manual Health Check

```bash
./scripts/durable-bridge-health-check.sh
```

**Output:**

- ✅ Pass/fail for each check
- 🔧 Auto-heal attempts
- 📊 Summary with metrics
- 📝 Detailed logs

---

## 🧪 Automated Testing

### Functionality Tests

**Script:** `scripts/test-durable-bridge.sh`

**Tests:**

1. Script loading
2. Configuration loading
3. Hero section data
4. Programs data (≥6 programs)
5. Features data (≥6 features)
6. Testimonials data (≥4 testimonials)
7. CTA data
8. Slot injection logic
9. XSS protection
10. Error handling

### Run Tests

```bash
./scripts/test-durable-bridge.sh
```

**Output:**

- Test results (pass/fail)
- Success rate percentage
- JSON test report

---

## 🔧 Self-Healing

### Automatic Recovery

The autopilot automatically fixes common issues:

**Issue:** Bridge script not accessible  
**Fix:** Redeploy bridge files

**Issue:** Invalid JSON configuration  
**Fix:** Restore from local backup

**Issue:** Files not synced to public/  
**Fix:** Copy files and rebuild

**Issue:** Deployment failure  
**Fix:** Rebuild and redeploy to Netlify

### Auto-Heal Workflow

1. Health check detects issue
2. Autopilot attempts fix
3. Verifies recovery
4. Logs action taken
5. Creates GitHub issue if fix fails

---

## 🚨 Alerting

### GitHub Issues

**When:** Health check fails AND auto-heal unsuccessful

**Issue Contains:**

- Problem description
- Issues found count
- Fixes attempted
- Links to logs
- Action items
- Workflow run link

**Labels:** `autopilot`, `durable-bridge`, `health-check`

### Viewing Alerts

```bash
# List recent issues
gh issue list --label autopilot

# View specific issue
gh issue view <issue-number>
```

---

## 📊 Monitoring Dashboard

### GitHub Actions

View all autopilot runs:

```
https://github.com/elevateforhumanity/fix2/actions
```

**Workflows:**

- `Durable Bridge Autopilot` - Health monitoring
- `Durable Bridge Auto-Deploy` - Deployment automation

### Status Files

**Health Status:**

```bash
cat logs/durable-bridge-status.json | jq .
```

**Test Report:**

```bash
cat logs/durable-bridge-test-report.json | jq .
```

### Logs

**Health Log:**

```bash
tail -f logs/durable-bridge-health.log
```

**View Recent:**

```bash
tail -50 logs/durable-bridge-health.log
```

---

## 🔄 Workflows

### Health Check Workflow

**Trigger:** Every 30 minutes (cron)  
**File:** `.github/workflows/durable-bridge-autopilot.yml`

**Steps:**

1. Run health check script
2. Parse results
3. Create health report
4. Upload logs as artifacts
5. Create GitHub issue if degraded
6. Trigger auto-heal if needed

### Auto-Heal Workflow

**Trigger:** Health check failure  
**File:** `.github/workflows/durable-bridge-autopilot.yml` (job: auto-heal)

**Steps:**

1. Rebuild bridge files
2. Deploy to Netlify
3. Verify recovery
4. Create recovery report

---

## 📝 Logs & Reports

### Health Log

**Location:** `logs/durable-bridge-health.log`

**Contains:**

- Timestamp for each check
- Check results (SUCCESS/ERROR/WARNING)
- Auto-heal actions
- Recovery attempts

**Example:**

```
[2025-10-31 13:00:00] INFO: Checking bridge script
[2025-10-31 13:00:01] SUCCESS: Bridge script returned 200 OK
[2025-10-31 13:00:02] INFO: Checking config
[2025-10-31 13:00:03] SUCCESS: Config file returned 200 OK
```

### Status File

**Location:** `logs/durable-bridge-status.json`

**Contains:**

```json
{
  "timestamp": "2025-10-31T13:00:00Z",
  "status": "healthy",
  "issues_found": 0,
  "fixes_applied": 0,
  "bridge_url": "https://elevateforhumanityfix2.netlify.app/efh-bridge.js",
  "config_url": "https://elevateforhumanityfix2.netlify.app/api/efh-config.json",
  "programs_count": 6,
  "features_count": 6,
  "testimonials_count": 4,
  "response_time_ms": 245
}
```

### Test Report

**Location:** `logs/durable-bridge-test-report.json`

**Contains:**

```json
{
  "timestamp": "2025-10-31T13:00:00Z",
  "total_tests": 10,
  "passed": 10,
  "failed": 0,
  "success_rate": 100.0,
  "status": "passed"
}
```

---

## 🎯 Metrics

### Health Metrics

- **Bridge Availability:** HTTP 200 status
- **Response Time:** < 2 seconds
- **JSON Validity:** Valid JSON structure
- **Content Completeness:** All required fields present
- **Programs Count:** ≥ 6
- **Features Count:** ≥ 6
- **Testimonials Count:** ≥ 4

### Performance Metrics

- **Script Size:** ~8.8KB
- **Config Size:** ~4.0KB
- **Response Time:** ~200-500ms
- **Uptime:** 99.9% target

---

## 🔍 Troubleshooting

### Health Check Failing

**Check logs:**

```bash
cat logs/durable-bridge-health.log | tail -50
```

**View status:**

```bash
cat logs/durable-bridge-status.json | jq .
```

**Manual fix:**

```bash
./scripts/deploy-durable-bridge.sh
```

### Auto-Heal Not Working

**Check GitHub Actions:**

```
https://github.com/elevateforhumanity/fix2/actions
```

**Manual recovery:**

```bash
# 1. Restore files
git checkout HEAD -- bridge/

# 2. Rebuild
pnpm build

# 3. Deploy
netlify deploy --prod
```

### Tests Failing

**Run tests locally:**

```bash
./scripts/test-durable-bridge.sh
```

**Check specific test:**

```bash
# Test bridge script
curl -I https://elevateforhumanityfix2.netlify.app/efh-bridge.js

# Test config
curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json | jq .
```

---

## 🚀 Manual Operations

### Force Health Check

```bash
# Run locally
./scripts/durable-bridge-health-check.sh

# Trigger GitHub workflow
gh workflow run durable-bridge-autopilot.yml
```

### Force Auto-Heal

```bash
# Via GitHub workflow
gh workflow run durable-bridge-autopilot.yml -f force_heal=true

# Manual
./scripts/deploy-durable-bridge.sh
```

### View Workflow Status

```bash
# List recent runs
gh run list --workflow=durable-bridge-autopilot.yml --limit 10

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

---

## 📊 Monitoring Best Practices

### Daily

- ✅ Check GitHub Actions for failures
- ✅ Review health log for warnings
- ✅ Verify metrics are within range

### Weekly

- ✅ Review all autopilot issues
- ✅ Check response time trends
- ✅ Verify auto-heal success rate

### Monthly

- ✅ Review logs for patterns
- ✅ Update health check thresholds
- ✅ Optimize auto-heal strategies

---

## 🔐 Security

### What's Protected

- ✅ XSS protection via sanitization
- ✅ HTTPS only (no HTTP)
- ✅ CORS headers configured
- ✅ No eval() or dangerous functions
- ✅ Input validation on all data

### Monitoring

- ✅ Script integrity checks
- ✅ Configuration validation
- ✅ Unexpected pattern detection
- ✅ Response header verification

---

## 📈 Success Metrics

### Uptime

- **Target:** 99.9%
- **Current:** Monitored every 30 min
- **Recovery Time:** < 5 minutes

### Auto-Heal Success Rate

- **Target:** 95%
- **Tracked:** In status files
- **Reported:** In GitHub Actions

### Response Time

- **Target:** < 2 seconds
- **Monitored:** Every health check
- **Alerted:** If > 2 seconds

---

## 🎓 How It Works

### Architecture

```
┌─────────────────────────────────────────┐
│         GitHub Actions (Cron)           │
│         Every 30 minutes                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Health Check Script                │
│  - Test bridge availability             │
│  - Validate configuration               │
│  - Check content completeness           │
│  - Measure response time                │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────┴──────┐
        │   Healthy?  │
        └──────┬──────┘
               │
       ┌───────┴───────┐
       │               │
      Yes             No
       │               │
       ▼               ▼
   ✅ Log         🔧 Auto-Heal
   Success           │
                     ▼
              ┌──────────────┐
              │  Rebuild &   │
              │  Redeploy    │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │  Recovered?  │
              └──────┬───────┘
                     │
             ┌───────┴───────┐
             │               │
            Yes             No
             │               │
             ▼               ▼
        ✅ Success    🚨 Create Issue
```

### Workflow Sequence

1. **Scheduled Trigger** - Cron runs every 30 min
2. **Health Check** - Script tests all components
3. **Status Evaluation** - Determine if healthy
4. **Auto-Heal** - Fix issues automatically
5. **Verification** - Confirm recovery
6. **Reporting** - Log results and create issues
7. **Artifacts** - Upload logs for review

---

## 🔄 Continuous Improvement

### Metrics Collection

All health checks and tests generate metrics:

- Response times
- Success rates
- Issue frequencies
- Recovery times

### Optimization

Based on metrics, the autopilot:

- Adjusts thresholds
- Improves auto-heal strategies
- Identifies patterns
- Prevents recurring issues

---

## 📞 Support

### Documentation

- System Cheat Sheet: `SYSTEM_CHEAT_SHEET.md`
- Setup Guide: `DURABLE_SETUP_INSTRUCTIONS.md`
- This Guide: `DURABLE_BRIDGE_AUTOPILOT.md`

### Monitoring

- GitHub Actions: https://github.com/elevateforhumanity/fix2/actions
- Netlify Dashboard: https://app.netlify.com/sites/elevateforhumanityfix2

### Logs

- Health: `logs/durable-bridge-health.log`
- Status: `logs/durable-bridge-status.json`
- Tests: `logs/durable-bridge-test-report.json`

---

## 🎯 Summary

**The Durable Bridge Autopilot:**

✅ **Monitors** your bridge every 30 minutes  
✅ **Tests** all functionality automatically  
✅ **Heals** issues without manual intervention  
✅ **Alerts** you only when it can't fix something  
✅ **Logs** everything for audit trail  
✅ **Reports** metrics and status

**Result:** Zero-maintenance, self-healing Durable integration that never breaks!

---

**Status:** ✅ ACTIVE  
**Last Updated:** October 31, 2025  
**Version:** 1.0  
**Maintained By:** Automated Workflows
