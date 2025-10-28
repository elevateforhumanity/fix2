# Autopilot Phase 4: Health-Log Dashboard

## 🎯 Overview

Phase 4 adds a comprehensive health monitoring dashboard to your autopilot system, providing:

- **Real-time health metrics** for all system components
- **Uptime tracking** with percentage calculations
- **Incident logging** with detailed error information
- **Admin-only access** with RLS security
- **Auto-refresh** every 30 seconds
- **7-day historical data** with hourly rollups

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions / Cron Jobs                 │
│  (Phase 1, 2, 3 workflows)                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ POST health events
                     ▼
          ┌──────────────────────┐
          │  health-logger       │
          │  Edge Function       │
          │  (Service Role)      │
          └──────────┬───────────┘
                     │
                     │ INSERT via RPC
                     ▼
          ┌──────────────────────┐
          │  automation.         │
          │  health_log          │
          │  (RLS Protected)     │
          └──────────┬───────────┘
                     │
                     │ SELECT (admin only)
                     ▼
          ┌──────────────────────┐
          │  Health Dashboard    │
          │  React Component     │
          │  (Admin UI)          │
          └──────────────────────┘
```

## 📦 Components

### 1. Database Schema

**Tables:**

- `automation.admin_users` - Admin access control
- `automation.health_log` - All health events
- `automation.migration_log` - Migration history (from Phase 2)
- `automation.deployment_log` - Deployment tracking (from Phase 2)

**Views:**

- `automation.health_log_rollup` - Hourly aggregates for charts
- `automation.health_log_daily` - Daily summaries with uptime %
- `automation.recent_incidents` - Errors/warnings in last 24h
- `automation.system_health_summary` - Current status by component

**Functions:**

- `automation.log_health_event()` - Secure logging RPC

### 2. Edge Function

**Location:** `supabase/functions/health-logger/index.ts`

**Endpoints:**

- `POST /` - Log health event (requires `x-autopilot-sign` header)
- `GET /` - Health pulse for external monitors

**Authentication:** HMAC with `AUTOPILOT_SECRET`

### 3. React Dashboard

**Location:** `src/admin/HealthDashboard.tsx`

**Features:**

- System health summary cards
- 7-day event totals
- Recent incidents table
- Hourly activity log
- Auto-refresh every 30 seconds
- RLS-protected (admin users only)

## 🚀 Setup Instructions

### Step 1: Apply Database Migration

```bash
# Apply the Phase 4 schema
psql $SUPABASE_DB_URL < supabase/migrations/20250127000001_autopilot_phase4_dashboard.sql
```

### Step 2: Add Admin Users

```sql
-- Get your user ID
SELECT id, email FROM auth.users;

-- Add yourself as admin
INSERT INTO automation.admin_users (user_id, email, role)
VALUES (
  'YOUR_USER_ID_HERE',
  'your-email@example.com',
  'superadmin'
);

-- Add additional admins (optional)
INSERT INTO automation.admin_users (user_id, email, role)
VALUES (
  'ANOTHER_USER_ID',
  'admin@example.com',
  'admin'
);
```

**Roles:**

- `viewer` - Can view dashboard only
- `admin` - Can view dashboard and manage settings
- `superadmin` - Can add/remove other admins

### Step 3: Deploy Health Logger Function

```bash
# Deploy the edge function
supabase functions deploy health-logger \
  --project-ref $SUPABASE_PROJECT_REF \
  --no-verify-jwt

# Set environment variables in Supabase Dashboard
# Functions → health-logger → Settings → Environment Variables:
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - AUTOPILOT_SECRET
```

### Step 4: Add GitHub Secret

```bash
# Get the function URL
FUNCTION_URL="https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/health-logger"

# Add to GitHub Secrets:
# Repository → Settings → Secrets → New repository secret
# Name: SUPABASE_HEALTH_LOGGER_URL
# Value: <function_url>
```

### Step 5: Test Health Logger

```bash
# Test POST (log event)
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/health-logger" \
  -H "x-autopilot-sign: YOUR_AUTOPILOT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "manual",
    "kind": "site",
    "status": "ok",
    "http_code": 200,
    "response_time_ms": 150,
    "detail": "Test health check"
  }'

# Expected response:
# {"ok":true,"log_id":1,"message":"Health event logged successfully"}

# Test GET (health pulse)
curl "https://YOUR_PROJECT_REF.supabase.co/functions/v1/health-logger"

# Expected response:
# {"ok":true,"timestamp":"2025-01-27T12:00:00.000Z","database":"connected"}
```

### Step 6: Verify Database Logging

```sql
-- Check if event was logged
SELECT * FROM automation.health_log ORDER BY checked_at DESC LIMIT 5;

-- Check rollup view
SELECT * FROM automation.health_log_rollup ORDER BY hour DESC LIMIT 10;

-- Check system health summary
SELECT * FROM automation.system_health_summary;
```

### Step 7: Add Dashboard to Your App

```typescript
// src/App.tsx or your router configuration
import HealthDashboard from './admin/HealthDashboard';

// Add route (example with React Router)
<Route path="/admin/health" element={<HealthDashboard />} />

// Or with Next.js:
// pages/admin/health.tsx
export { default } from '../src/admin/HealthDashboard';
```

### Step 8: Test Dashboard Access

1. Sign in to your app with an admin account
2. Navigate to `/admin/health`
3. Verify you can see the dashboard
4. Try signing in with a non-admin account - should see "Access Denied"

## 📊 Dashboard Features

### System Health Summary Cards

Shows current status for each component:

- **Site** - Main website health
- **DB** - Database connectivity
- **Deploy** - Deployment status
- **Migration** - Migration history
- **Rollback** - Rollback events

Each card displays:

- Current status (✅ ok, ⚠️ warn, ❌ error)
- 24-hour uptime percentage
- Last check timestamp
- Event counts (ok/warn/error)

### 7-Day Summary

Aggregated totals for the past 7 days:

- Total OK events
- Total warnings
- Total errors
- Per-component breakdown

### Recent Incidents (24h)

Table showing all errors and warnings in the last 24 hours:

- Timestamp
- Source (self-heal, autopilot, cron, etc.)
- Kind (site, db, deploy, etc.)
- Status
- HTTP code (if applicable)
- Details

### Hourly Activity Log

Detailed log of all health checks:

- Hour timestamp
- Component kind
- Status
- Event count
- Average response time

## 🔐 Security

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

### Authentication Flow

1. **Client requests dashboard** → Checks if user is in `admin_users` table
2. **If not admin** → Shows "Access Denied" message
3. **If admin** → Loads health data via RLS-protected queries
4. **Edge function logs events** → Uses service role to bypass RLS

### Best Practices

- ✅ **DO:** Add only trusted users to `admin_users` table
- ✅ **DO:** Use `superadmin` role sparingly
- ✅ **DO:** Rotate `AUTOPILOT_SECRET` every 90 days
- ✅ **DO:** Monitor `admin_users.last_access` for suspicious activity
- ❌ **DON'T:** Expose health logger URL publicly
- ❌ **DON'T:** Log sensitive data in `detail` field
- ❌ **DON'T:** Grant direct INSERT permissions to authenticated users

## 📈 Monitoring & Alerts

### Query Examples

**Calculate uptime percentage:**

```sql
SELECT
  kind,
  COUNT(*) FILTER (WHERE status = 'ok') * 100.0 / COUNT(*) as uptime_pct,
  COUNT(*) as total_checks
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '24 hours'
GROUP BY kind;
```

**Find recent failures:**

```sql
SELECT
  checked_at,
  source,
  kind,
  status,
  detail
FROM automation.health_log
WHERE status IN ('error', 'warn')
  AND checked_at > NOW() - INTERVAL '1 hour'
ORDER BY checked_at DESC;
```

**Average response times:**

```sql
SELECT
  kind,
  AVG(response_time_ms) as avg_ms,
  MIN(response_time_ms) as min_ms,
  MAX(response_time_ms) as max_ms
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '24 hours'
  AND response_time_ms IS NOT NULL
GROUP BY kind;
```

**Incident frequency:**

```sql
SELECT
  DATE_TRUNC('day', checked_at) as day,
  COUNT(*) FILTER (WHERE status = 'error') as errors,
  COUNT(*) FILTER (WHERE status = 'warn') as warnings
FROM automation.health_log
WHERE checked_at > NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day DESC;
```

### Set Up Alerts

**Option 1: Supabase Database Webhooks**

```sql
-- Create webhook for critical errors
-- (Configure in Supabase Dashboard → Database → Webhooks)
CREATE OR REPLACE FUNCTION automation.notify_critical_error()
RETURNS TRIGGER AS $$
BEGIN
  -- Webhook will fire automatically
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER critical_error_webhook
AFTER INSERT ON automation.health_log
FOR EACH ROW
WHEN (NEW.status = 'error' AND NEW.kind IN ('db', 'migration'))
EXECUTE FUNCTION automation.notify_critical_error();
```

**Option 2: Scheduled Query (via GitHub Actions)**

```yaml
# .github/workflows/health-alerts.yml
name: Health Alerts

on:
  schedule:
    - cron: '*/15 * * * *' # Every 15 minutes

jobs:
  check-health:
    runs-on: ubuntu-latest
    steps:
      - name: Check for recent errors
        run: |
          ERRORS=$(psql "$SUPABASE_DB_URL" -t -c "
            SELECT COUNT(*) FROM automation.health_log
            WHERE status = 'error'
            AND checked_at > NOW() - INTERVAL '15 minutes'
          ")

          if [ "$ERRORS" -gt 5 ]; then
            curl -X POST "$SLACK_WEBHOOK_URL" \
              -H 'Content-Type: application/json' \
              -d "{\"text\":\"🚨 High error rate: $ERRORS errors in last 15 minutes\"}"
          fi
        env:
          SUPABASE_DB_URL: ${{ secrets.SUPABASE_DB_URL }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 🎨 Customization

### Add Custom Health Checks

```typescript
// In your edge function or API route
async function customHealthCheck() {
  // Check critical business logic
  const activeUsers = await getActiveUserCount();
  const pendingOrders = await getPendingOrderCount();

  // Log to health dashboard
  await fetch(HEALTH_LOGGER_URL, {
    method: 'POST',
    headers: {
      'x-autopilot-sign': AUTOPILOT_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: 'api',
      kind: 'site',
      status: activeUsers > 0 ? 'ok' : 'warn',
      detail: `Active users: ${activeUsers}, Pending orders: ${pendingOrders}`,
      metadata: { activeUsers, pendingOrders },
    }),
  });
}
```

### Add Custom Dashboard Widgets

```typescript
// src/admin/HealthDashboard.tsx

// Add a custom widget
function CustomMetricsWidget() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function loadMetrics() {
      const { data } = await supabase
        .from('automation.health_log')
        .select('metadata')
        .not('metadata', 'is', null)
        .order('checked_at', { ascending: false })
        .limit(100);

      // Process metadata for custom charts
      setMetrics(processMetadata(data));
    }
    loadMetrics();
  }, []);

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-4">Custom Metrics</h3>
      {/* Your custom visualization */}
    </div>
  );
}
```

### Export Data

```typescript
// Add export button to dashboard
async function exportHealthData() {
  const { data } = await supabase
    .from('automation.health_log')
    .select('*')
    .gte(
      'checked_at',
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    )
    .order('checked_at', { ascending: false });

  // Convert to CSV
  const csv = convertToCSV(data);

  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `health-log-${new Date().toISOString()}.csv`;
  a.click();
}
```

## 🐛 Troubleshooting

### Dashboard Shows "Access Denied"

**Problem:** User is not in `admin_users` table

**Solution:**

```sql
-- Check if user exists
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Add user to admin_users
INSERT INTO automation.admin_users (user_id, email, role)
VALUES ('USER_ID_FROM_ABOVE', 'your-email@example.com', 'admin');
```

### Health Logger Returns 401

**Problem:** Invalid `AUTOPILOT_SECRET`

**Solution:**

```bash
# Verify secret in edge function
# Supabase Dashboard → Functions → health-logger → Settings → Environment Variables

# Verify secret in GitHub Actions
# Repository → Settings → Secrets → AUTOPILOT_SECRET

# They must match exactly
```

### No Data in Dashboard

**Problem:** Health events not being logged

**Solution:**

```bash
# Test health logger manually
curl -X POST "YOUR_HEALTH_LOGGER_URL" \
  -H "x-autopilot-sign: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"source":"manual","kind":"site","status":"ok","detail":"test"}'

# Check if workflows are running
# GitHub → Actions → Check recent runs

# Verify SUPABASE_HEALTH_LOGGER_URL is set in GitHub Secrets
```

### RLS Policy Errors

**Problem:** "permission denied for table health_log"

**Solution:**

```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'automation';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'health_log';

-- Recreate policies if needed
DROP POLICY IF EXISTS "admin_read_health_log" ON automation.health_log;
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
```

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [React Query for Data Fetching](https://tanstack.com/query/latest)
- [Recharts for Visualizations](https://recharts.org/)

## 🗺️ Next Steps

### Phase 5 (Optional): Advanced Analytics

- [ ] Grafana integration for advanced charts
- [ ] Prometheus metrics export
- [ ] Custom alerting rules
- [ ] Performance profiling
- [ ] Cost tracking

### Phase 6 (Optional): AI-Powered Insights

- [ ] Anomaly detection
- [ ] Predictive failure analysis
- [ ] Auto-optimization suggestions
- [ ] Natural language queries
- [ ] Automated incident reports

---

**Last Updated:** January 27, 2025  
**Version:** 4.0  
**Status:** Production Ready
