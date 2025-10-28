# Autopilot System - Complete Setup Guide

## 🎯 Overview

Your complete "Puppet Master Autopilot" system is now installed. Control your entire platform through simple commands in GitHub comments or Slack.

**Architecture:**
- **Command Bridge** - Parses `/commands` from GitHub/Slack
- **Task Queue** - Supabase-based queue with DAG support
- **Workers** - Supabase Edge Functions + GitHub Actions
- **Admin UI** - React dashboard for task management
- **Monitoring** - Health logs + Slack notifications

---

## 📋 What's Included

### Database Schema (`007_autopilot_system.sql`)
- ✅ `automation.tasks` - Main task queue
- ✅ `automation.task_edges` - DAG dependencies (parent → child)
- ✅ `automation.health_log` - Monitoring and alerts
- ✅ `automation.admin_users` - Approval permissions
- ✅ Views: `ready_children`, `task_stats`, `health_log_rollup`
- ✅ RLS policies for security

### Supabase Edge Functions
- ✅ `autopilot-worker` - Main task processor
- ✅ `autopilot-bridge` - Command parser

### GitHub Actions Workflows
- ✅ `autopilot-comment-bridge.yml` - Comment → Command
- ✅ `autopilot-master.yml` - Scheduled processing

### Admin UI
- ✅ `src/pages/admin/AutopilotTasks.tsx` - Task management dashboard

---

## 🚀 Setup Instructions

### Step 1: Apply Database Schema

```bash
# Connect to your Supabase project
psql "$SUPABASE_DB_URL" -f supabase/migrations/007_autopilot_system.sql

# Or via Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Paste contents of 007_autopilot_system.sql
# 3. Run
```

### Step 2: Add Yourself as Admin

```sql
-- Replace with your actual user_id from auth.users
insert into automation.admin_users (user_id, email)
values ('YOUR_USER_ID_HERE', 'your-email@example.com');
```

### Step 3: Deploy Supabase Functions

```bash
# Install Supabase CLI if needed
npm install -g supabase

# Login
supabase login

# Deploy autopilot-worker
supabase functions deploy autopilot-worker \
  --project-ref YOUR_PROJECT_REF \
  --no-verify-jwt

# Deploy autopilot-bridge
supabase functions deploy autopilot-bridge \
  --project-ref YOUR_PROJECT_REF \
  --no-verify-jwt
```

### Step 4: Set Environment Variables

**In Supabase Function Settings:**

For `autopilot-worker`:
```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AUTOPILOT_SECRET=generate_a_strong_secret_here
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/YOUR_HOOK_ID
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

For `autopilot-bridge`:
```
AUTOPILOT_SECRET=same_secret_as_worker
AUTOPILOT_URL=https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker
```

### Step 5: Set GitHub Secrets

Go to: `Settings → Secrets and variables → Actions`

Add these secrets:
```
AUTOPILOT_WORKER_URL=https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker
AUTOPILOT_BRIDGE_URL=https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-bridge
AUTOPILOT_SECRET=same_secret_as_functions
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/YOUR_HOOK_ID
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Step 6: Configure Frontend Environment

Add to `.env` or Netlify environment variables:
```
VITE_AUTOPILOT_WORKER_URL=https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker
VITE_AUTOPILOT_SECRET=same_secret_as_functions
```

---

## 🎮 How to Use

### Via GitHub Comments

Comment on any issue or PR:

```bash
# Enqueue a task
/enqueue axe_a11y_scan url=https://elevateforhumanity.org

# Approve a task
/approve 123

# Retry a failed task
/retry 123

# Cancel a task
/cancel 123

# Check status
/status limit=20

# Self-heal sequence
/heal

# Trigger deploy
/deploy
```

### Via Admin UI

1. Navigate to `/admin/autopilot-tasks`
2. View all tasks with real-time updates
3. Approve, retry, or cancel tasks with one click
4. View task payloads and error messages

### Via Direct API

```bash
# Enqueue a task
curl -X POST "https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker" \
  -H "Content-Type: application/json" \
  -H "x-autopilot-sign: YOUR_SECRET" \
  -d '{
    "task": "enqueue",
    "kind": "axe_a11y_scan",
    "payload": {"url": "https://elevateforhumanity.org"}
  }'

# Process queue
curl -X POST "https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker" \
  -H "Content-Type: application/json" \
  -H "x-autopilot-sign: YOUR_SECRET" \
  -d '{"task": "loop"}'
```

---

## 📊 Available Task Types

### Infrastructure
- `db_migrate` - Run database migrations
- `db_rls_fix` - Fix RLS policies
- `redeploy` - Trigger Netlify rebuild
- `cache_purge` - Clear CDN cache

### Accessibility & Media
- `axe_a11y_scan` - Run accessibility audit
- `caption_vod` - Generate video captions
- `transcript_audio` - Generate audio transcripts

### Mobile
- `mobile_publish` - Publish to app stores (requires approval)

### Realtime & Collaboration
- `realtime_collab_boot` - Initialize realtime features

### Internationalization
- `i18n_build` - Build translation files

### AI/ML
- `ai_features_boot` - Initialize AI features

### Communications & Auth (require approval)
- `email_connect` - Connect email service
- `sms_connect` - Connect SMS service
- `oauth_connect` - Configure OAuth providers

### Payments (requires approval)
- `payments_expand` - Expand payment options

### Security & Compliance
- `security_audit` - Run security checks
- `compliance_report` - Generate compliance report
- `gdpr_tools` - GDPR data export/delete tools
- `ferpa_tools` - FERPA student data controls
- `soc2_prep` - SOC2 preparation checklist

---

## 🔗 DAG Support (Task Dependencies)

Create parent → child relationships:

```sql
-- Task 10 must complete before task 12 runs
insert into automation.task_edges (parent_id, child_id)
values (10, 12);

-- Multiple parents (both must succeed)
insert into automation.task_edges (parent_id, child_id)
values (10, 12), (11, 12);
```

**Example Workflow:**
1. Enqueue `db_migrate` (id=10) and `db_rls_fix` (id=11)
2. Enqueue `redeploy` (id=12)
3. Create edges: 10→12 and 11→12
4. When both 10 and 11 succeed, 12 automatically moves to `queued`

---

## 📈 Monitoring

### Health Log

```sql
-- Recent activity
select * from automation.health_log
order by at desc
limit 50;

-- Rollup by hour
select * from automation.health_log_rollup
limit 100;
```

### Task Statistics

```sql
-- Task stats (last 7 days)
select * from automation.task_stats;
```

### Slack Notifications

All task events are automatically posted to Slack:
- ✅ Task succeeded
- ❌ Task failed
- 🟡 Task needs approval
- 🔄 Task retrying

---

## 🔒 Security

### RLS Policies
- Only admin users can view/manage tasks
- Service role required for task creation
- All actions logged to health_log

### Secrets Management
- Never commit `AUTOPILOT_SECRET` to git
- Use environment variables only
- Rotate secrets periodically

### Approval Gates
Risky tasks automatically require approval:
- OAuth connections
- Payment integrations
- Email/SMS services
- Mobile publishing
- Security audits
- Compliance reports

---

## 🐛 Troubleshooting

### Tasks Not Processing

1. Check worker is deployed:
   ```bash
   curl https://YOUR_PROJECT.supabase.co/functions/v1/autopilot-worker \
     -H "x-autopilot-sign: YOUR_SECRET" \
     -d '{"task":"status","limit":5}'
   ```

2. Check GitHub Actions logs
3. Verify environment variables are set
4. Check Supabase function logs

### Tasks Stuck in "needs_approval"

1. Go to Admin UI: `/admin/autopilot-tasks`
2. Click "Approve" button
3. Or use command: `/approve TASK_ID`

### Slack Notifications Not Working

1. Verify `SLACK_WEBHOOK_URL` is set
2. Test webhook:
   ```bash
   curl -X POST YOUR_SLACK_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"text":"Test message"}'
   ```

---

## 📚 Examples

### Example 1: Deploy with Accessibility Scan

```bash
# Via GitHub comment
/enqueue redeploy
/enqueue axe_a11y_scan url=https://elevateforhumanity.org
```

### Example 2: Multi-Language Build

```bash
/enqueue i18n_build locales=en,es,fr,de
```

### Example 3: Self-Heal Sequence

```bash
/heal
# This automatically enqueues: db_rls_fix → redeploy
```

### Example 4: Chained Workflow (via SQL)

```sql
-- Enqueue tasks
insert into automation.tasks (kind, payload) values
  ('db_migrate', '{"sql":"..."}'),  -- id=100
  ('db_rls_fix', '{}'),             -- id=101
  ('redeploy', '{}'),               -- id=102
  ('axe_a11y_scan', '{"url":"https://elevateforhumanity.org"}'); -- id=103

-- Create dependencies
insert into automation.task_edges (parent_id, child_id) values
  (100, 102),  -- migrate → redeploy
  (101, 102),  -- rls_fix → redeploy
  (102, 103);  -- redeploy → a11y_scan
```

---

## 🎯 Next Steps

1. **Test the system**: Comment `/status` on any GitHub issue
2. **Monitor tasks**: Visit `/admin/autopilot-tasks`
3. **Set up Slack**: Add webhook URL for notifications
4. **Add integrations**: Configure email/SMS services as needed
5. **Create workflows**: Build custom task chains with edges

---

## 📞 Support

- **Documentation**: This file
- **Admin UI**: `/admin/autopilot-tasks`
- **Health Logs**: Query `automation.health_log`
- **GitHub Actions**: Check workflow runs

---

## ✅ Verification Checklist

- [ ] Database schema applied
- [ ] Admin user added
- [ ] Supabase functions deployed
- [ ] Environment variables set
- [ ] GitHub secrets configured
- [ ] Frontend environment configured
- [ ] Test command executed successfully
- [ ] Admin UI accessible
- [ ] Slack notifications working
- [ ] First task completed

---

**Your Autopilot system is ready! 🚀**

Start with: `/status` in any GitHub issue or PR comment.
