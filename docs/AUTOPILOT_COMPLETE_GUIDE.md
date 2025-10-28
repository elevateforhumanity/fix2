# Autopilot System - Complete Guide (All Phases)

## 🎯 Overview

The Autopilot system provides **zero-manual-intervention** database migrations, deployments, monitoring, and self-healing for the Elevate for Humanity LMS platform.

### System Capabilities

- ✅ **Automatic database migrations** on every push to main
- ✅ **Pre-migration backups** with one-click rollback
- ✅ **Slack notifications** for all events
- ✅ **Self-healing monitoring** every 5 minutes
- ✅ **Auto-redeploy** on site failures
- ✅ **GitHub issue creation** on critical failures
- ✅ **Complete audit trail** in database

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Phase 1    │  │   Phase 2    │  │   Phase 3    │     │
│  │  Migrations  │  │   Rollback   │  │  Self-Heal   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌─────────────────────────────────────────────────┐
    │         Supabase Edge Functions                 │
    │  • autopilot-db-worker (migrations)             │
    │  • autopilot-health-worker (monitoring)         │
    │  • autopilot-ai-worker (content generation)     │
    └─────────────────┬───────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │   PostgreSQL  │
              │   Database    │
              └───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ Netlify Build │
              │     Hook      │
              └───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  Slack Alerts │
              └───────────────┘
```

## 🚀 Phase 1: Automated Migrations

### What It Does

1. Detects changes to `supabase/migrations/*.sql`
2. Concatenates all migrations into `ALL_IN_ONE__paste.sql`
3. Applies migrations to database
4. Triggers Netlify build on success
5. Sends Slack notifications

### Workflow File

`.github/workflows/autopilot.yml` (existing)

### Triggers

- Push to `main` branch with migration changes
- Manual workflow dispatch

### Slack Messages

- 🚀 **Migration started**
- ✅ **Migration success** → Netlify build triggered
- ❌ **Migration failed** → Check logs

## 🔄 Phase 2: Rollback Automation

### What It Does

1. **Before migration:** Creates compressed database backup
2. **During migration:** Applies changes in transaction
3. **On failure:** Automatically restores from backup
4. **After migration:** Logs result to `automation.migration_log`
5. **Artifact storage:** Keeps backups for 30 days

### Workflow File

`.github/workflows/autopilot-phase2-rollback.yml`

### Key Features

#### Automatic Backups

```bash
# Creates: supabase/backups/backup_YYYYMMDD_HHMMSS.sql.gz
./scripts/autopilot_backup.sh $SUPABASE_DB_URL
```

#### Automatic Rollback

```bash
# Restores from most recent backup
./scripts/autopilot_rollback.sh $SUPABASE_DB_URL
```

#### Manual Rollback

Trigger via GitHub Actions:

1. Go to **Actions → Autopilot Phase 2**
2. Click **Run workflow**
3. Set `rollback_only: true`
4. Click **Run workflow**

### Database Schema

```sql
-- Migration tracking
CREATE TABLE automation.migration_log (
  id BIGSERIAL PRIMARY KEY,
  ran_at TIMESTAMPTZ DEFAULT NOW(),
  commit_sha TEXT,
  status TEXT CHECK (status IN ('success', 'failure', 'rollback', 'pending')),
  notes TEXT,
  backup_file TEXT,
  duration_ms INTEGER,
  error_message TEXT,
  triggered_by TEXT DEFAULT 'github_actions'
);

-- Health monitoring
CREATE TABLE automation.health_log (
  id BIGSERIAL PRIMARY KEY,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('healthy', 'degraded', 'unhealthy')),
  response_time_ms INTEGER,
  checks JSONB,
  notes TEXT
);

-- Deployment tracking
CREATE TABLE automation.deployment_log (
  id BIGSERIAL PRIMARY KEY,
  deployed_at TIMESTAMPTZ DEFAULT NOW(),
  platform TEXT,
  deploy_id TEXT,
  status TEXT CHECK (status IN ('triggered', 'building', 'success', 'failed')),
  url TEXT,
  notes TEXT,
  migration_log_id BIGINT REFERENCES automation.migration_log(id)
);
```

### Slack Messages

- 🚀 **Backup created** → Migration starting
- ✅ **Migration success** → Backup retained
- 🚨 **Rollback executed** → Database restored from backup
- ❌ **Rollback failed** → Manual intervention required

## 🩺 Phase 3: Self-Heal Monitor

### What It Does

1. **Every 5 minutes:** Checks site and database health
2. **On failure:** Triggers Netlify redeploy + DB repair
3. **Waits 90 seconds:** Verifies recovery
4. **On persistent failure:** Creates GitHub issue + Slack alert

### Workflow File

`.github/workflows/autopilot-phase3-selfheal.yml`

### Health Checks

#### Site Health

- Main site: `https://elevateforhumanity.org`
- Health API: `https://elevateforhumanity.org/api/health`
- Threshold: HTTP 500+ or timeout = unhealthy

#### Database Health

- Supabase function: `autopilot-health-worker`
- Checks: Connection, query performance, table counts
- Threshold: HTTP 500+ or timeout = unhealthy

### Auto-Heal Actions

1. **Trigger Netlify redeploy** (fixes frontend issues)
2. **Run database repair** (re-applies migrations if needed)
3. **Wait 90 seconds** for recovery
4. **Verify recovery** with second health check

### Escalation

If auto-heal fails after 90 seconds:

1. Creates GitHub issue with `urgent` + `incident` labels
2. Sends Slack alert with failure details
3. Logs event to `automation.health_log`

### Slack Messages

- ✅ **System healthy** (hourly summary)
- ⚠️ **System degraded** → Auto-heal triggered
- ✅ **Auto-heal successful** → System restored
- ❌ **Auto-heal failed** → Manual intervention required

## 🔧 Setup Instructions

### Prerequisites

- [ ] Supabase project with service role key
- [ ] Netlify site with build hook
- [ ] GitHub repository with Actions enabled
- [ ] Slack workspace with incoming webhook (optional)

### Step 1: Generate Secrets

```bash
./scripts/generate-secrets.sh
```

This creates:

- `AUTOPILOT_SECRET` (64-char hex)
- `.env.local` template

### Step 2: Add GitHub Secrets

**Repository → Settings → Secrets and variables → Actions**

| Secret Name                 | Description                      | Where to Get                                             |
| --------------------------- | -------------------------------- | -------------------------------------------------------- |
| `SUPABASE_DB_URL`           | PostgreSQL connection string     | Supabase → Settings → Database → Connection string (URI) |
| `SUPABASE_PROJECT_REF`      | Project reference ID             | Supabase Dashboard URL                                   |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key                 | Supabase → Settings → API → service_role                 |
| `AUTOPILOT_SECRET`          | Generated secret                 | Output from Step 1                                       |
| `NETLIFY_BUILD_HOOK`        | Build hook URL                   | Netlify → Site settings → Build hooks                    |
| `SLACK_WEBHOOK_URL`         | Slack webhook URL                | See [Slack Setup](#slack-setup)                          |
| `WORKER_ENDPOINT`           | Cloudflare Worker URL (optional) | Cloudflare Dashboard                                     |

### Step 3: Deploy Supabase Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Deploy all functions
./scripts/deploy-all-workers.sh
```

### Step 4: Apply Logging Schema

```bash
# Apply the autopilot logging migration
psql $SUPABASE_DB_URL < supabase/migrations/20250127000000_autopilot_logging.sql
```

### Step 5: Test the System

#### Test Phase 1 (Migrations)

```bash
# Make a change to any migration file
echo "-- Test comment" >> supabase/migrations/test.sql

# Commit and push
git add supabase/migrations/test.sql
git commit -m "test: autopilot migration"
git push origin main

# Watch GitHub Actions
```

#### Test Phase 2 (Rollback)

```bash
# Trigger manual rollback
# Go to: Actions → Autopilot Phase 2 → Run workflow
# Set: rollback_only = true
```

#### Test Phase 3 (Self-Heal)

```bash
# Trigger manual health check
# Go to: Actions → Autopilot Phase 3 → Run workflow
# Set: force_heal = true (optional)
```

## 📱 Slack Setup

### Create Incoming Webhook

1. Go to https://api.slack.com/apps
2. Click **Create New App** → **From scratch**
3. Name: "Autopilot Alerts"
4. Select your workspace
5. Click **Incoming Webhooks** → Toggle **On**
6. Click **Add New Webhook to Workspace**
7. Select channel: `#autopilot-alerts`
8. Copy webhook URL

### Add to GitHub Secrets

```bash
# Repository → Settings → Secrets → New repository secret
# Name: SLACK_WEBHOOK_URL
# Value: https://hooks.slack.com/services/T00000000/B00000000/XXXX...
```

### Test Webhook

```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "🧪 Test message from Autopilot",
    "blocks": [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Test Successful*\nAutopilot is configured correctly!"
      }
    }]
  }'
```

## 📊 Monitoring & Dashboards

### View Recent Activity

```sql
-- All recent autopilot events
SELECT * FROM automation.recent_activity LIMIT 20;

-- Migration history
SELECT
  ran_at,
  commit_sha,
  status,
  duration_ms,
  notes
FROM automation.migration_log
ORDER BY ran_at DESC
LIMIT 10;

-- Health check history
SELECT
  checked_at,
  status,
  response_time_ms,
  checks->>'site_status' as site_status,
  checks->>'db_status' as db_status
FROM automation.health_log
ORDER BY checked_at DESC
LIMIT 20;

-- Deployment history
SELECT
  deployed_at,
  platform,
  status,
  notes
FROM automation.deployment_log
ORDER BY deployed_at DESC
LIMIT 10;
```

### Uptime Metrics

```sql
-- Calculate uptime percentage (last 24 hours)
SELECT
  COUNT(*) FILTER (WHERE status = 'healthy') * 100.0 / COUNT(*) as uptime_percentage,
  COUNT(*) FILTER (WHERE status = 'healthy') as healthy_checks,
  COUNT(*) FILTER (WHERE status = 'unhealthy') as unhealthy_checks,
  AVG(response_time_ms) as avg_response_time
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '24 hours';

-- Failed migrations (last 7 days)
SELECT
  COUNT(*) FILTER (WHERE status = 'failure') as failed_migrations,
  COUNT(*) FILTER (WHERE status = 'rollback') as rollbacks,
  COUNT(*) FILTER (WHERE status = 'success') as successful_migrations
FROM automation.migration_log
WHERE ran_at > NOW() - INTERVAL '7 days';
```

### Create Dashboard View

```sql
-- Create a dashboard-friendly view
CREATE OR REPLACE VIEW automation.dashboard_stats AS
SELECT
  -- Uptime (last 24h)
  (SELECT COUNT(*) FILTER (WHERE status = 'healthy') * 100.0 / NULLIF(COUNT(*), 0)
   FROM automation.health_log
   WHERE checked_at > NOW() - INTERVAL '24 hours') as uptime_24h,

  -- Average response time (last 24h)
  (SELECT AVG(response_time_ms)
   FROM automation.health_log
   WHERE checked_at > NOW() - INTERVAL '24 hours') as avg_response_time_24h,

  -- Migrations (last 7 days)
  (SELECT COUNT(*) FROM automation.migration_log
   WHERE ran_at > NOW() - INTERVAL '7 days') as migrations_7d,

  -- Failed migrations (last 7 days)
  (SELECT COUNT(*) FROM automation.migration_log
   WHERE ran_at > NOW() - INTERVAL '7 days' AND status = 'failure') as failed_migrations_7d,

  -- Rollbacks (last 7 days)
  (SELECT COUNT(*) FROM automation.migration_log
   WHERE ran_at > NOW() - INTERVAL '7 days' AND status = 'rollback') as rollbacks_7d,

  -- Last health check
  (SELECT checked_at FROM automation.health_log
   ORDER BY checked_at DESC LIMIT 1) as last_health_check,

  -- Last migration
  (SELECT ran_at FROM automation.migration_log
   ORDER BY ran_at DESC LIMIT 1) as last_migration;

-- Query the dashboard
SELECT * FROM automation.dashboard_stats;
```

## 🔍 Troubleshooting

### Migration Failed

**Symptoms:** GitHub Actions shows red X, Slack alert "Migration failed"

**Steps:**

1. Check GitHub Actions logs for SQL errors
2. Review migration file syntax
3. Check database connectivity
4. Verify service role key is valid
5. If needed, trigger manual rollback

**Common Issues:**

- Syntax errors in SQL
- Missing table/column references
- Permission issues (check RLS policies)
- Database connection timeout

### Rollback Failed

**Symptoms:** Slack alert "Rollback failed", database in unknown state

**Steps:**

1. Download backup artifact from GitHub Actions
2. Manually restore: `gunzip -c backup.sql.gz | psql $SUPABASE_DB_URL`
3. Verify restoration: `SELECT * FROM automation.migration_log ORDER BY ran_at DESC LIMIT 5;`
4. Create incident issue in GitHub

### Self-Heal Not Working

**Symptoms:** Site down but no auto-heal triggered

**Steps:**

1. Check GitHub Actions cron is running (every 5 min)
2. Verify `NETLIFY_BUILD_HOOK` is correct
3. Test health endpoint manually: `curl https://elevateforhumanity.org/api/health`
4. Check Supabase function logs
5. Verify `AUTOPILOT_SECRET` matches across all services

### Slack Notifications Not Sending

**Symptoms:** No Slack messages despite workflow running

**Steps:**

1. Verify `SLACK_WEBHOOK_URL` is set in GitHub Secrets
2. Test webhook manually (see [Slack Setup](#slack-setup))
3. Check webhook URL is not expired
4. Verify Slack app is not suspended
5. Check channel still exists

## 🔐 Security Best Practices

### Secrets Management

- ✅ **DO:** Store all secrets in GitHub Secrets
- ✅ **DO:** Use different secrets for staging/production
- ✅ **DO:** Rotate `AUTOPILOT_SECRET` every 90 days
- ✅ **DO:** Use service role key only in secure environments
- ❌ **DON'T:** Commit `.env.local` to git
- ❌ **DON'T:** Log secrets in Actions or worker code
- ❌ **DON'T:** Share service role key in Slack/email

### Access Control

- Enable branch protection on `main`
- Require PR reviews for migration changes
- Limit who can trigger manual workflows
- Monitor Supabase audit logs
- Use RLS policies for all tables

### Backup Security

- Backups stored as GitHub Actions artifacts (encrypted at rest)
- 30-day retention (configurable)
- Only accessible to repository admins
- Consider encrypting backups with GPG for long-term storage

## 💰 Cost Estimate

| Service                       | Free Tier              | Estimated Usage    | Cost         |
| ----------------------------- | ---------------------- | ------------------ | ------------ |
| Supabase Edge Functions       | 500K invocations/month | ~15K/month         | $0           |
| GitHub Actions                | 2,000 minutes/month    | ~300 minutes/month | $0           |
| Netlify Builds                | 300 minutes/month      | ~50 minutes/month  | $0           |
| Cloudflare Workers (optional) | 100K requests/day      | ~10K/day           | $0           |
| **Total**                     |                        |                    | **$0/month** |

All services stay within free tiers for typical LMS usage.

## 📈 Performance Metrics

### Expected Performance

- **Migration time:** 5-30 seconds (depends on SQL complexity)
- **Backup time:** 10-60 seconds (depends on database size)
- **Rollback time:** 30-90 seconds
- **Health check:** < 5 seconds
- **Auto-heal recovery:** 90-120 seconds
- **Netlify build:** 2-5 minutes

### Optimization Tips

1. **Split large migrations** into smaller files
2. **Use indexes** for frequently queried columns
3. **Batch inserts** instead of individual INSERTs
4. **Vacuum database** regularly
5. **Monitor query performance** with `EXPLAIN ANALYZE`

## 🎓 Advanced Usage

### Custom Health Checks

Add custom checks to `autopilot-health-worker`:

```typescript
// supabase/functions/autopilot-health-worker/index.ts
async function customHealthCheck() {
  // Check critical tables
  const { count: userCount } = await supabase
    .from('lms.users')
    .select('*', { count: 'exact', head: true });

  if (userCount === 0) {
    throw new Error('No users found - database may be corrupted');
  }

  // Check recent activity
  const { data: recentActivity } = await supabase
    .from('lms.activity_log')
    .select('*')
    .gte('created_at', new Date(Date.now() - 3600000).toISOString())
    .limit(1);

  if (!recentActivity || recentActivity.length === 0) {
    console.warn('No recent activity - site may be stale');
  }

  return { healthy: true, userCount, hasRecentActivity: !!recentActivity };
}
```

### Staged Rollouts

For high-risk migrations, use a staging environment:

```yaml
# .github/workflows/autopilot-staging.yml
on:
  push:
    branches: [staging]

jobs:
  migrate-staging:
    # ... same as production but with staging secrets
    env:
      SUPABASE_DB_URL: ${{ secrets.SUPABASE_DB_URL_STAGING }}
```

### Blue-Green Deployments

Combine with Netlify branch deploys:

```yaml
- name: Deploy to preview
  run: |
    # Deploy to preview URL first
    curl -X POST "$NETLIFY_PREVIEW_HOOK"

    # Wait and test
    sleep 60
    curl https://preview--elevateforhumanity.netlify.app/api/health

    # If healthy, deploy to production
    curl -X POST "$NETLIFY_BUILD_HOOK"
```

## 📚 Additional Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [PostgreSQL Backup Best Practices](https://www.postgresql.org/docs/current/backup.html)

## 🆘 Support

- **GitHub Issues:** Create issue with `autopilot` label
- **Slack Alerts:** Monitor `#autopilot-alerts` channel
- **Documentation:** See `docs/` folder
- **Logs:** Check GitHub Actions, Supabase Functions, Netlify

## 🗺️ Roadmap

### Phase 4 (Optional): Advanced Monitoring

- [ ] Grafana dashboard for metrics visualization
- [ ] PagerDuty integration for critical alerts
- [ ] Performance profiling for slow queries
- [ ] Cost tracking and optimization
- [ ] Multi-region health checks

### Phase 5 (Optional): AI-Powered Operations

- [ ] AI-generated migration suggestions
- [ ] Automatic performance optimization
- [ ] Predictive failure detection
- [ ] Smart rollback decisions
- [ ] Natural language query interface

---

**Last Updated:** January 27, 2025  
**Version:** 3.0 (All Phases Complete)  
**Maintained by:** Elevate for Humanity Engineering Team
