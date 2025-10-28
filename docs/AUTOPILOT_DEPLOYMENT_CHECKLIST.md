# Autopilot System - Deployment Checklist

Use this checklist to ensure all components are properly configured and deployed.

## 📋 Pre-Deployment

### Prerequisites

- [ ] Supabase project created
- [ ] Netlify site deployed
- [ ] GitHub repository with Actions enabled
- [ ] Slack workspace (optional but recommended)
- [ ] PostgreSQL client installed (`psql`)
- [ ] Supabase CLI installed (`npm install -g supabase`)
- [ ] Node.js 18+ installed

### Access Verification

- [ ] Can access Supabase Dashboard
- [ ] Can access Netlify Dashboard
- [ ] Can access GitHub repository settings
- [ ] Can access Slack workspace settings (if using)
- [ ] Have admin access to database

## 🔐 Step 1: Generate Secrets

- [ ] Run `./scripts/generate-secrets.sh`
- [ ] Save `AUTOPILOT_SECRET` to password manager
- [ ] Note down all required secret names
- [ ] Create `.env.local` file (DO NOT COMMIT)

**Generated Secrets:**

```
AUTOPILOT_SECRET: ________________________________
```

## 🗄️ Step 2: Database Setup

### Apply Migrations

- [ ] Apply Phase 2 logging schema:

  ```bash
  psql $SUPABASE_DB_URL < supabase/migrations/20250127000000_autopilot_logging.sql
  ```

- [ ] Apply Phase 4 dashboard schema:

  ```bash
  psql $SUPABASE_DB_URL < supabase/migrations/20250127000001_autopilot_phase4_dashboard.sql
  ```

- [ ] Verify tables created:
  ```sql
  \dt automation.*
  ```

### Add Admin Users

- [ ] Get your auth user ID:

  ```sql
  SELECT id, email FROM auth.users;
  ```

- [ ] Add yourself as superadmin:

  ```sql
  INSERT INTO automation.admin_users (user_id, email, role)
  VALUES ('YOUR_USER_ID', 'your-email@example.com', 'superadmin');
  ```

- [ ] Add additional admins (if needed)

- [ ] Verify admin users:
  ```sql
  SELECT * FROM automation.admin_users;
  ```

## ☁️ Step 3: Supabase Functions

### Deploy Functions

- [ ] Login to Supabase CLI:

  ```bash
  supabase login
  ```

- [ ] Deploy autopilot-db-worker:

  ```bash
  supabase functions deploy autopilot-db-worker --project-ref $SUPABASE_PROJECT_REF --no-verify-jwt
  ```

- [ ] Deploy autopilot-ai-worker:

  ```bash
  supabase functions deploy autopilot-ai-worker --project-ref $SUPABASE_PROJECT_REF --no-verify-jwt
  ```

- [ ] Deploy autopilot-health-worker:

  ```bash
  supabase functions deploy autopilot-health-worker --project-ref $SUPABASE_PROJECT_REF --no-verify-jwt
  ```

- [ ] Deploy health-logger:
  ```bash
  supabase functions deploy health-logger --project-ref $SUPABASE_PROJECT_REF --no-verify-jwt
  ```

### Configure Function Environment Variables

For each function, go to **Supabase Dashboard → Functions → [function-name] → Settings → Environment Variables**

**autopilot-db-worker:**

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `AUTOPILOT_SECRET`

**autopilot-ai-worker:**

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `AUTOPILOT_SECRET`
- [ ] `OPENAI_API_KEY` (if using AI features)

**autopilot-health-worker:**

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `AUTOPILOT_SECRET`
- [ ] `NETLIFY_BUILD_HOOK`

**health-logger:**

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `AUTOPILOT_SECRET`

### Note Function URLs

```
autopilot-db-worker: https://__________.supabase.co/functions/v1/autopilot-db-worker
autopilot-ai-worker: https://__________.supabase.co/functions/v1/autopilot-ai-worker
autopilot-health-worker: https://__________.supabase.co/functions/v1/autopilot-health-worker
health-logger: https://__________.supabase.co/functions/v1/health-logger
```

## 🌐 Step 4: Netlify Setup

### Create Build Hook

- [ ] Go to Netlify Dashboard
- [ ] Select your site
- [ ] Navigate to **Site settings → Build & deploy → Build hooks**
- [ ] Click **Add build hook**
- [ ] Name: "Autopilot Deploy"
- [ ] Branch: "main"
- [ ] Copy the webhook URL

**Build Hook URL:**

```
https://api.netlify.com/build_hooks/__________
```

## 💬 Step 5: Slack Setup (Optional)

### Create Incoming Webhook

- [ ] Go to https://api.slack.com/apps
- [ ] Click **Create New App** → **From scratch**
- [ ] Name: "Autopilot Alerts"
- [ ] Select your workspace
- [ ] Click **Incoming Webhooks** → Toggle **On**
- [ ] Click **Add New Webhook to Workspace**
- [ ] Select channel: `#autopilot-alerts` (create if needed)
- [ ] Copy webhook URL

**Slack Webhook URL:**

```
https://hooks.slack.com/services/__________
```

### Test Webhook

- [ ] Test with curl:

  ```bash
  curl -X POST "YOUR_WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d '{"text":"🧪 Test from Autopilot"}'
  ```

- [ ] Verify message appears in Slack channel

## 🔑 Step 6: GitHub Secrets

Go to **Repository → Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets

- [ ] `SUPABASE_DB_URL`
  - Value: PostgreSQL connection string from Supabase
  - Format: `postgresql://postgres:[password]@[host]:5432/postgres`

- [ ] `SUPABASE_PROJECT_REF`
  - Value: Project reference ID from Supabase Dashboard URL
  - Example: `cuxzzpsyufcewtmicszk`

- [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - Value: Service role key from Supabase → Settings → API
  - Starts with: `eyJ...`

- [ ] `AUTOPILOT_SECRET`
  - Value: Generated in Step 1
  - 64-character hex string

- [ ] `NETLIFY_BUILD_HOOK`
  - Value: Build hook URL from Step 4

- [ ] `SUPABASE_HEALTH_LOGGER_URL`
  - Value: health-logger function URL from Step 3
  - Example: `https://[ref].supabase.co/functions/v1/health-logger`

### Optional Secrets

- [ ] `SLACK_WEBHOOK_URL`
  - Value: Slack webhook URL from Step 5

- [ ] `WORKER_ENDPOINT` (if using Cloudflare Worker)
  - Value: Cloudflare Worker URL

### Verify All Secrets

- [ ] All required secrets are set
- [ ] No typos in secret names
- [ ] No extra spaces in secret values
- [ ] Secrets match across all services

## 🧪 Step 7: Testing

### Test Health Logger

- [ ] Test POST endpoint:

  ```bash
  curl -X POST "https://[ref].supabase.co/functions/v1/health-logger" \
    -H "x-autopilot-sign: YOUR_AUTOPILOT_SECRET" \
    -H "Content-Type: application/json" \
    -d '{"source":"manual","kind":"site","status":"ok","detail":"test"}'
  ```

- [ ] Expected response: `{"ok":true,"log_id":1,"message":"Health event logged successfully"}`

- [ ] Test GET endpoint:

  ```bash
  curl "https://[ref].supabase.co/functions/v1/health-logger"
  ```

- [ ] Expected response: `{"ok":true,"timestamp":"...","database":"connected"}`

### Verify Database Logging

- [ ] Check health log:

  ```sql
  SELECT * FROM automation.health_log ORDER BY checked_at DESC LIMIT 5;
  ```

- [ ] Should see test event from previous step

### Test Dashboard Access

- [ ] Sign in to your app
- [ ] Navigate to `/admin/health`
- [ ] Verify dashboard loads without errors
- [ ] Check that test event appears in dashboard

### Test Migration Workflow

- [ ] Create test migration:

  ```bash
  echo "-- Test autopilot $(date +%s)" >> supabase/migrations/test_autopilot.sql
  ```

- [ ] Commit and push:

  ```bash
  git add supabase/migrations/test_autopilot.sql
  git commit -m "test: autopilot migration"
  git push origin main
  ```

- [ ] Watch GitHub Actions:
  - [ ] Workflow starts automatically
  - [ ] Backup is created
  - [ ] Migration is applied
  - [ ] Netlify build is triggered
  - [ ] Slack notification is sent (if configured)

- [ ] Check dashboard for migration log

### Test Self-Heal Workflow

- [ ] Trigger manual health check:
  - Go to **Actions → Autopilot Phase 3**
  - Click **Run workflow**
  - Click **Run workflow** button

- [ ] Verify workflow completes:
  - [ ] Site health check passes
  - [ ] Database health check passes
  - [ ] Health event is logged
  - [ ] Slack notification is sent (if configured)

- [ ] Check dashboard for health check log

## 📊 Step 8: Monitoring Setup

### Enable Workflows

- [ ] Verify Phase 2 workflow is enabled:
  - Go to **Actions → Autopilot Phase 2**
  - Check "This workflow has a workflow_dispatch event trigger"

- [ ] Verify Phase 3 workflow is enabled:
  - Go to **Actions → Autopilot Phase 3**
  - Check cron schedule is active

### Set Up Alerts

- [ ] Join `#autopilot-alerts` Slack channel
- [ ] Enable notifications for the channel
- [ ] Test alert by triggering a workflow

### Create Dashboard Bookmark

- [ ] Bookmark `/admin/health` in your browser
- [ ] Add to team documentation
- [ ] Share with other admins

## 🎯 Step 9: Production Readiness

### Security Review

- [ ] All secrets are stored in GitHub Secrets (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] RLS policies are enabled on all tables
- [ ] Only authorized users are in `admin_users` table
- [ ] Service role key is not exposed in logs
- [ ] Branch protection is enabled on `main`

### Documentation Review

- [ ] Team knows how to access dashboard
- [ ] Team knows how to trigger manual rollback
- [ ] Team knows how to add new admin users
- [ ] Runbook created for common issues
- [ ] Contact information documented

### Backup Verification

- [ ] Backups are being created before migrations
- [ ] Backups are stored as GitHub Actions artifacts
- [ ] Backup retention is set to 30 days
- [ ] Team knows how to download backups
- [ ] Team knows how to restore from backup

### Performance Baseline

- [ ] Record current uptime percentage
- [ ] Record average response times
- [ ] Record migration success rate
- [ ] Set up weekly review of metrics

## ✅ Step 10: Go Live

### Final Checks

- [ ] All tests passing
- [ ] All workflows enabled
- [ ] All secrets configured
- [ ] All team members notified
- [ ] Monitoring dashboard accessible
- [ ] Slack alerts working

### Launch

- [ ] Announce to team that autopilot is live
- [ ] Monitor for first 24 hours
- [ ] Review first week of metrics
- [ ] Adjust alert thresholds if needed

### Post-Launch

- [ ] Schedule weekly dashboard review
- [ ] Set up monthly secret rotation reminder
- [ ] Document any issues encountered
- [ ] Update runbook with lessons learned

## 📝 Notes

### Troubleshooting Contacts

- **Supabase Issues:** ****\*\*\*\*****\_\_\_****\*\*\*\*****
- **Netlify Issues:** ****\*\*\*\*****\_\_\_****\*\*\*\*****
- **GitHub Actions Issues:** ****\*\*\*\*****\_\_\_****\*\*\*\*****
- **Slack Issues:** ****\*\*\*\*****\_\_\_****\*\*\*\*****

### Important URLs

- **Supabase Dashboard:** https://supabase.com/dashboard/project/[ref]
- **Netlify Dashboard:** https://app.netlify.com/sites/[site-name]
- **GitHub Actions:** https://github.com/[org]/[repo]/actions
- **Health Dashboard:** https://[your-domain]/admin/health
- **Slack Channel:** https://[workspace].slack.com/archives/[channel-id]

### Maintenance Schedule

- **Daily:** Monitor Slack alerts
- **Weekly:** Review health dashboard metrics
- **Monthly:** Review and clean up old backups
- **Quarterly:** Rotate `AUTOPILOT_SECRET`
- **Annually:** Review and update documentation

## 🎉 Completion

- [ ] All checklist items completed
- [ ] System is operational
- [ ] Team is trained
- [ ] Documentation is up to date
- [ ] Monitoring is active

**Deployment Date:** **\*\***\_\_\_**\*\***  
**Deployed By:** **\*\***\_\_\_**\*\***  
**Verified By:** **\*\***\_\_\_**\*\***

---

**Congratulations!** Your Autopilot system is now fully operational and ready for production use.

For ongoing support, refer to:

- [Complete Guide](./AUTOPILOT_COMPLETE_GUIDE.md)
- [Deployment Guide](./AUTOPILOT_DEPLOYMENT.md)
- [Phase 4 Dashboard](./AUTOPILOT_PHASE4_DASHBOARD.md)
- [Troubleshooting Section](./AUTOPILOT_README.md#-troubleshooting)
