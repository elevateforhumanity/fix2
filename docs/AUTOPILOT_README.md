# Autopilot System - Complete Implementation

## 🎯 Executive Summary

The Autopilot system provides **fully automated, zero-touch** database migrations, deployments, monitoring, and self-healing for the Elevate for Humanity LMS platform. Once configured, it requires **no manual intervention** for routine operations.

### What It Does

✅ **Automatically applies database migrations** when you push to `main`  
✅ **Creates backups before every migration** with one-click rollback  
✅ **Monitors system health** every 5 minutes  
✅ **Auto-heals failures** by redeploying and repairing  
✅ **Sends Slack alerts** for all events  
✅ **Logs everything** to a secure admin dashboard  
✅ **Creates GitHub issues** for critical failures

### Cost

**$0/month** - All services stay within free tiers

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOPILOT SYSTEM                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 1: Automated Migrations                                  │
│  ├─ Detects migration changes                                   │
│  ├─ Applies to database                                         │
│  └─ Triggers Netlify build                                      │
│                                                                 │
│  Phase 2: Rollback Automation                                   │
│  ├─ Creates backup before migration                             │
│  ├─ Applies changes in transaction                              │
│  ├─ Auto-rollback on failure                                    │
│  └─ Stores backups for 30 days                                  │
│                                                                 │
│  Phase 3: Self-Heal Monitor                                     │
│  ├─ Checks health every 5 minutes                               │
│  ├─ Auto-redeploys on failure                                   │
│  ├─ Repairs database issues                                     │
│  └─ Escalates persistent failures                               │
│                                                                 │
│  Phase 4: Health Dashboard                                      │
│  ├─ Real-time system metrics                                    │
│  ├─ Uptime tracking                                             │
│  ├─ Incident logging                                            │
│  └─ Admin-only access                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start (5 Minutes)

### Prerequisites

- Supabase project
- Netlify site
- GitHub repository
- Slack workspace (optional)

### 1. Generate Secrets

```bash
./scripts/generate-secrets.sh
```

Save the `AUTOPILOT_SECRET` - you'll need it for all services.

### 2. Add GitHub Secrets

Go to **Repository → Settings → Secrets and variables → Actions**

Add these secrets:

- `SUPABASE_DB_URL`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTOPILOT_SECRET`
- `NETLIFY_BUILD_HOOK`
- `SLACK_WEBHOOK_URL` (optional)
- `SUPABASE_HEALTH_LOGGER_URL` (after Step 4)

### 3. Apply Database Migrations

```bash
# Apply Phase 2 logging schema
psql $SUPABASE_DB_URL < supabase/migrations/20250127000000_autopilot_logging.sql

# Apply Phase 4 dashboard schema
psql $SUPABASE_DB_URL < supabase/migrations/20250127000001_autopilot_phase4_dashboard.sql

# Add yourself as admin
psql $SUPABASE_DB_URL <<SQL
INSERT INTO automation.admin_users (user_id, email, role)
VALUES ('YOUR_AUTH_USER_ID', 'your-email@example.com', 'superadmin');
SQL
```

### 4. Deploy Supabase Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Deploy all functions
./scripts/deploy-all-workers.sh
```

### 5. Test the System

```bash
# Test health logger
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/health-logger" \
  -H "x-autopilot-sign: YOUR_AUTOPILOT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"source":"manual","kind":"site","status":"ok","detail":"test"}'

# Expected: {"ok":true,"log_id":1,"message":"Health event logged successfully"}
```

### 6. Trigger First Migration

```bash
# Make a change to any migration file
echo "-- Test autopilot" >> supabase/migrations/test.sql

# Commit and push
git add supabase/migrations/test.sql
git commit -m "test: autopilot migration"
git push origin main

# Watch GitHub Actions
# You should receive Slack notifications at each step
```

## 📁 File Structure

```
fix2/
├── .github/workflows/
│   ├── autopilot.yml                      # Phase 1: Basic migrations
│   ├── autopilot-phase2-rollback.yml      # Phase 2: Backup & rollback
│   ├── autopilot-phase3-selfheal.yml      # Phase 3: Self-healing
│   └── autopilot-workers-cron.yml         # Worker health checks
│
├── supabase/
│   ├── migrations/
│   │   ├── 20250127000000_autopilot_logging.sql      # Phase 2 schema
│   │   └── 20250127000001_autopilot_phase4_dashboard.sql  # Phase 4 schema
│   │
│   └── functions/
│       ├── autopilot-db-worker/           # Database operations
│       ├── autopilot-ai-worker/           # Content generation
│       ├── autopilot-health-worker/       # Health monitoring
│       └── health-logger/                 # Phase 4 logging
│
├── scripts/
│   ├── autopilot_backup.sh                # Create database backup
│   ├── autopilot_rollback.sh              # Restore from backup
│   ├── generate-secrets.sh                # Generate AUTOPILOT_SECRET
│   ├── deploy-all-workers.sh              # Deploy all Supabase functions
│   ├── deploy-supabase-functions.sh       # Deploy Supabase functions
│   └── deploy-cloudflare-worker.sh        # Deploy Cloudflare worker (optional)
│
├── src/admin/
│   └── HealthDashboard.tsx                # Phase 4 admin UI
│
├── docs/
│   ├── AUTOPILOT_README.md                # This file
│   ├── AUTOPILOT_COMPLETE_GUIDE.md        # Comprehensive guide (all phases)
│   ├── AUTOPILOT_DEPLOYMENT.md            # Deployment instructions
│   ├── AUTOPILOT_PHASE4_DASHBOARD.md      # Phase 4 specific docs
│   └── SLACK_SETUP.md                     # Slack integration guide
│
└── cloudflare/
    ├── wrangler.toml                      # Cloudflare Worker config (optional)
    └── workers/
        └── autopilot-deploy-worker.ts     # Deployment orchestration (optional)
```

## 🔄 Workflow Triggers

### Phase 1 & 2: Migrations with Rollback

**Triggers:**

- Push to `main` with changes to `supabase/migrations/*.sql`
- Manual workflow dispatch

**What Happens:**

1. Creates database backup
2. Applies migrations in transaction
3. On success: Triggers Netlify build
4. On failure: Auto-rollback + Slack alert
5. Logs everything to database

**Workflow:** `.github/workflows/autopilot-phase2-rollback.yml`

### Phase 3: Self-Heal Monitor

**Triggers:**

- Cron: Every 5 minutes
- Manual workflow dispatch

**What Happens:**

1. Checks site health (HTTP status)
2. Checks database health (Supabase function)
3. If unhealthy: Triggers Netlify redeploy + DB repair
4. Waits 90 seconds and verifies recovery
5. If still failing: Creates GitHub issue + Slack alert

**Workflow:** `.github/workflows/autopilot-phase3-selfheal.yml`

### Phase 4: Health Logging

**Triggers:**

- Called by Phase 2 & 3 workflows
- Can be called from any service via API

**What Happens:**

1. Receives health event via POST
2. Validates AUTOPILOT_SECRET
3. Logs to `automation.health_log` table
4. Returns success/failure

**Edge Function:** `supabase/functions/health-logger/index.ts`

## 📊 Database Schema

### Core Tables

```sql
-- Admin access control
automation.admin_users (
  user_id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  role TEXT,  -- 'viewer', 'admin', 'superadmin'
  added_at TIMESTAMPTZ
)

-- Health event log
automation.health_log (
  id BIGSERIAL PRIMARY KEY,
  source TEXT,  -- 'self-heal', 'autopilot', 'worker', 'manual', 'cron', 'api'
  kind TEXT,    -- 'site', 'db', 'deploy', 'migration', 'rollback', 'health-check', 'backup'
  status TEXT,  -- 'ok', 'warn', 'error', 'pending'
  http_code INTEGER,
  response_time_ms INTEGER,
  detail TEXT,
  metadata JSONB,
  checked_at TIMESTAMPTZ
)

-- Migration tracking
automation.migration_log (
  id BIGSERIAL PRIMARY KEY,
  ran_at TIMESTAMPTZ,
  commit_sha TEXT,
  status TEXT,  -- 'success', 'failure', 'rollback', 'pending'
  notes TEXT,
  backup_file TEXT,
  duration_ms INTEGER,
  error_message TEXT,
  triggered_by TEXT
)

-- Deployment tracking
automation.deployment_log (
  id BIGSERIAL PRIMARY KEY,
  deployed_at TIMESTAMPTZ,
  platform TEXT,  -- 'netlify', 'vercel', etc.
  deploy_id TEXT,
  status TEXT,  -- 'triggered', 'building', 'success', 'failed'
  url TEXT,
  notes TEXT,
  migration_log_id BIGINT
)
```

### Useful Views

```sql
-- Hourly rollup for charts
automation.health_log_rollup

-- Daily summary with uptime %
automation.health_log_daily

-- Recent errors/warnings
automation.recent_incidents

-- Current system status
automation.system_health_summary

-- All recent activity
automation.recent_activity
```

## 🔐 Security

### Authentication

- **GitHub Actions:** Uses GitHub Secrets
- **Supabase Functions:** Uses service role key
- **Health Logger:** HMAC with `AUTOPILOT_SECRET`
- **Dashboard:** RLS with `admin_users` table

### Row Level Security (RLS)

All tables have RLS enabled:

```sql
-- Only admins can read health logs
CREATE POLICY "admin_read_health_log"
ON automation.health_log
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM automation.admin_users a
    WHERE a.user_id = auth.uid()
  )
);

-- Service role can do anything (for edge functions)
CREATE POLICY "service_role_all_health_log"
ON automation.health_log
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

### Best Practices

✅ **DO:**

- Store all secrets in GitHub Secrets
- Use different secrets for staging/production
- Rotate `AUTOPILOT_SECRET` every 90 days
- Monitor `admin_users.last_access` for suspicious activity
- Enable branch protection on `main`
- Require PR reviews for migration changes

❌ **DON'T:**

- Commit `.env.local` to git
- Log secrets in Actions or worker code
- Share service role key in Slack/email
- Grant direct INSERT permissions to authenticated users
- Expose health logger URL publicly

## 📱 Slack Notifications

### Message Types

**Migration Started:**

```
🚀 Autopilot Starting
Creating backup and applying migrations for commit abc123
```

**Migration Success:**

```
✅ Autopilot Success
Supabase migrations completed successfully
Triggering Netlify build...
```

**Migration Failed + Rollback:**

```
🚨 Autopilot Rollback Executed
Migration failed and database was restored from backup_20250127_120000.sql.gz
Commit: abc123
Logs: [GitHub Actions link]
```

**System Healthy (hourly):**

```
✅ Self-Heal Check — All systems healthy
• Site: 200 (150ms)
• Health API: 200
• Database: 200 (50ms)
```

**System Degraded:**

```
⚠️ Self-Heal Alert — System degraded, initiating auto-heal
• Site: 500
• Health API: 503
• Database: 200
• Action: Triggering redeploy + DB repair
```

**Auto-Heal Success:**

```
✅ Auto-Heal Successful — System restored
• Site: 200
• Health API: 200
• Actions: Redeploy + DB repair completed
• Recovery time: ~90 seconds
```

**Auto-Heal Failed:**

```
❌ Auto-Heal Failed — Manual intervention required
• Site: 500
• Health API: 503
• Actions taken: Redeploy + DB repair
• Status: Still unhealthy after 90s
• Logs: [GitHub Actions link]
```

## 📈 Monitoring

### View Dashboard

1. Sign in to your app with an admin account
2. Navigate to `/admin/health`
3. View real-time metrics:
   - System health summary
   - 7-day event totals
   - Recent incidents
   - Hourly activity log

### Query Health Data

```sql
-- Calculate uptime (last 24h)
SELECT
  kind,
  COUNT(*) FILTER (WHERE status = 'ok') * 100.0 / COUNT(*) as uptime_pct
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '24 hours'
GROUP BY kind;

-- Find recent failures
SELECT * FROM automation.recent_incidents LIMIT 20;

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

-- Average response times
SELECT
  kind,
  AVG(response_time_ms) as avg_ms
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '24 hours'
  AND response_time_ms IS NOT NULL
GROUP BY kind;
```

## 🐛 Troubleshooting

### Migration Failed

**Symptoms:** Red X in GitHub Actions, Slack alert

**Steps:**

1. Check GitHub Actions logs for SQL errors
2. Review migration file syntax
3. Verify database connectivity
4. If needed, trigger manual rollback:
   - Go to Actions → Autopilot Phase 2
   - Run workflow with `rollback_only: true`

### Self-Heal Not Working

**Symptoms:** Site down but no auto-heal triggered

**Steps:**

1. Check GitHub Actions cron is running
2. Verify `NETLIFY_BUILD_HOOK` is correct
3. Test health endpoint: `curl https://elevateforhumanity.org/api/health`
4. Check Supabase function logs

### Dashboard Shows "Access Denied"

**Symptoms:** User can't access `/admin/health`

**Steps:**

```sql
-- Check if user exists
SELECT id, email FROM auth.users WHERE email = 'user@example.com';

-- Add to admin_users
INSERT INTO automation.admin_users (user_id, email, role)
VALUES ('USER_ID', 'user@example.com', 'admin');
```

### Health Logger Returns 401

**Symptoms:** "unauthorized" error

**Steps:**

1. Verify `AUTOPILOT_SECRET` matches in:
   - GitHub Secrets
   - Supabase Function env vars
   - Cloudflare Worker secrets (if using)
2. Check `x-autopilot-sign` header is set correctly

## 📚 Documentation

- **[Complete Guide](./AUTOPILOT_COMPLETE_GUIDE.md)** - Comprehensive documentation for all phases
- **[Deployment Guide](./AUTOPILOT_DEPLOYMENT.md)** - Step-by-step deployment instructions
- **[Phase 4 Dashboard](./AUTOPILOT_PHASE4_DASHBOARD.md)** - Health dashboard setup and usage
- **[Slack Setup](./SLACK_SETUP.md)** - Slack webhook configuration

## 🎓 Advanced Usage

### Custom Health Checks

Add custom checks to your edge functions:

```typescript
// Log custom health event
await fetch(HEALTH_LOGGER_URL, {
  method: 'POST',
  headers: {
    'x-autopilot-sign': AUTOPILOT_SECRET,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source: 'api',
    kind: 'site',
    status: 'ok',
    detail: 'Custom check passed',
    metadata: { customMetric: 123 },
  }),
});
```

### Staged Rollouts

Use a staging environment for high-risk migrations:

```yaml
# .github/workflows/autopilot-staging.yml
on:
  push:
    branches: [staging]

jobs:
  migrate-staging:
    # Same as production but with staging secrets
    env:
      SUPABASE_DB_URL: ${{ secrets.SUPABASE_DB_URL_STAGING }}
```

### Export Health Data

```bash
# Export last 7 days to CSV
psql $SUPABASE_DB_URL -c "
COPY (
  SELECT * FROM automation.health_log
  WHERE checked_at > NOW() - INTERVAL '7 days'
  ORDER BY checked_at DESC
) TO STDOUT WITH CSV HEADER
" > health-log-export.csv
```

## 💰 Cost Breakdown

| Service                       | Free Tier              | Usage              | Cost         |
| ----------------------------- | ---------------------- | ------------------ | ------------ |
| Supabase Edge Functions       | 500K invocations/month | ~15K/month         | $0           |
| GitHub Actions                | 2,000 minutes/month    | ~300 minutes/month | $0           |
| Netlify Builds                | 300 minutes/month      | ~50 minutes/month  | $0           |
| Cloudflare Workers (optional) | 100K requests/day      | ~10K/day           | $0           |
| **Total**                     |                        |                    | **$0/month** |

## 🗺️ Roadmap

### Completed ✅

- [x] Phase 1: Automated Migrations
- [x] Phase 2: Rollback Automation
- [x] Phase 3: Self-Heal Monitor
- [x] Phase 4: Health Dashboard

### Future Enhancements 🚀

- [ ] Phase 5: Advanced Analytics
  - Grafana integration
  - Prometheus metrics
  - Custom alerting rules
  - Performance profiling

- [ ] Phase 6: AI-Powered Operations
  - Anomaly detection
  - Predictive failure analysis
  - Auto-optimization suggestions
  - Natural language queries

## 🆘 Support

- **GitHub Issues:** Create issue with `autopilot` label
- **Slack Alerts:** Monitor `#autopilot-alerts` channel
- **Documentation:** See `docs/` folder
- **Logs:** Check GitHub Actions, Supabase Functions, Netlify

## 📄 License

MIT License - See LICENSE file for details

---

**Last Updated:** January 27, 2025  
**Version:** 4.0 (All Phases Complete)  
**Status:** Production Ready  
**Maintained by:** Elevate for Humanity Engineering Team
