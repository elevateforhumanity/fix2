# Autopilot System Architecture

## Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AUTOPILOT SYSTEM v4.0                              │
│                     Zero-Touch Database Operations                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              TRIGGER LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Git Push   │  │  Cron Every  │  │   Manual     │  │   External   │  │
│  │   to main    │  │  5 Minutes   │  │   Trigger    │  │   Webhook    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │                 │            │
└─────────┼─────────────────┼─────────────────┼─────────────────┼────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GITHUB ACTIONS LAYER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Phase 2: Migrations with Rollback                                    │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │ │
│  │  │  Backup  │→ │ Migrate  │→ │ Success? │→ │  Deploy  │             │ │
│  │  │ Database │  │   SQL    │  │   Yes    │  │ Netlify  │             │ │
│  │  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘             │ │
│  │                                    │                                   │ │
│  │                                    │ No                                │ │
│  │                                    ▼                                   │ │
│  │                              ┌──────────┐                              │ │
│  │                              │ Rollback │                              │ │
│  │                              │  Auto    │                              │ │
│  │                              └──────────┘                              │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Phase 3: Self-Heal Monitor                                           │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │ │
│  │  │  Check   │→ │ Healthy? │→ │ Redeploy │→ │  Verify  │             │ │
│  │  │  Health  │  │   No     │  │ + Repair │  │ Recovery │             │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘             │ │
│  │                                                   │                    │ │
│  │                                                   │ Still Failing      │ │
│  │                                                   ▼                    │ │
│  │                                             ┌──────────┐               │ │
│  │                                             │  Create  │               │ │
│  │                                             │  Issue   │               │ │
│  │                                             └──────────┘               │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
          │                                                    │
          │ Log Events                                         │ Log Events
          ▼                                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE EDGE FUNCTIONS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │  health-logger   │  │ autopilot-db-    │  │ autopilot-health-│        │
│  │                  │  │     worker       │  │     worker       │        │
│  │  • Log events    │  │  • Migrations    │  │  • Health checks │        │
│  │  • Validate auth │  │  • Transactions  │  │  • DB status     │        │
│  │  • RPC insert    │  │  • Rollback      │  │  • Monitoring    │        │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘        │
│           │                     │                     │                    │
└───────────┼─────────────────────┼─────────────────────┼────────────────────┘
            │                     │                     │
            │ INSERT              │ EXECUTE SQL         │ SELECT
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          POSTGRESQL DATABASE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  automation schema (RLS Protected)                                    │ │
│  │                                                                        │ │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │ │
│  │  │  admin_users     │  │  health_log      │  │  migration_log   │   │ │
│  │  │                  │  │                  │  │                  │   │ │
│  │  │  • user_id       │  │  • source        │  │  • commit_sha    │   │ │
│  │  │  • email         │  │  • kind          │  │  • status        │   │ │
│  │  │  • role          │  │  • status        │  │  • backup_file   │   │ │
│  │  │  • added_at      │  │  • http_code     │  │  • duration_ms   │   │ │
│  │  └──────────────────┘  │  • response_time │  │  • error_msg     │   │ │
│  │                        │  • detail        │  └──────────────────┘   │ │
│  │  ┌──────────────────┐  │  • metadata      │                         │ │
│  │  │ deployment_log   │  │  • checked_at    │  ┌──────────────────┐   │ │
│  │  │                  │  └──────────────────┘  │  Views:          │   │ │
│  │  │  • platform      │                        │  • rollup        │   │ │
│  │  │  • deploy_id     │                        │  • daily         │   │ │
│  │  │  • status        │                        │  • incidents     │   │ │
│  │  │  • url           │                        │  • summary       │   │ │
│  │  │  • notes         │                        │  • activity      │   │ │
│  │  └──────────────────┘                        └──────────────────┘   │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
            │                                                    │
            │ SELECT (admin only)                                │ Trigger
            ▼                                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Health Dashboard (React)                                             │ │
│  │                                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │ │
│  │  │   System     │  │   7-Day      │  │   Recent     │               │ │
│  │  │   Health     │  │   Summary    │  │   Incidents  │               │ │
│  │  │   Cards      │  │   Charts     │  │   Table      │               │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────┐    │ │
│  │  │  Hourly Activity Log                                         │    │ │
│  │  │  • Timestamp  • Kind  • Status  • Count  • Response Time    │    │ │
│  │  └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │  Auto-refresh: 30 seconds                                             │ │
│  │  Access: Admin users only (RLS)                                       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
            │
            │ Notifications
            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NOTIFICATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐        │
│  │  Slack Alerts    │  │  GitHub Issues   │  │  Netlify Build   │        │
│  │                  │  │                  │  │                  │        │
│  │  • Success ✅    │  │  • Critical ❌   │  │  • Trigger hook  │        │
│  │  • Warning ⚠️    │  │  • Escalation    │  │  • Deploy site   │        │
│  │  • Error ❌      │  │  • Auto-assign   │  │  • Verify build  │        │
│  │  • Rollback 🔄   │  │  • Labels        │  │                  │        │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Phase 2: Migration Flow

```
1. Developer pushes to main
   ↓
2. GitHub Actions detects migration changes
   ↓
3. Create backup: pg_dump → backup_TIMESTAMP.sql.gz
   ↓
4. Upload backup as artifact (30-day retention)
   ↓
5. Apply migrations in transaction
   ↓
6. Success? → Trigger Netlify build → Log success → Slack ✅
   ↓
7. Failure? → Rollback from backup → Log rollback → Slack 🚨
```

### Phase 3: Self-Heal Flow

```
1. Cron triggers every 5 minutes
   ↓
2. Check site health (HTTP status)
   ↓
3. Check database health (Supabase function)
   ↓
4. Healthy? → Log OK → Slack ✅ (hourly)
   ↓
5. Unhealthy? → Log error → Slack ⚠️
   ↓
6. Trigger Netlify redeploy
   ↓
7. Run database repair
   ↓
8. Wait 90 seconds
   ↓
9. Verify recovery
   ↓
10. Success? → Log recovery → Slack ✅
    ↓
11. Failure? → Create GitHub issue → Slack ❌
```

### Phase 4: Logging Flow

```
1. Event occurs (migration, health check, etc.)
   ↓
2. GitHub Actions calls health-logger function
   ↓
3. Function validates AUTOPILOT_SECRET
   ↓
4. Function calls log_health_event() RPC
   ↓
5. RPC inserts into automation.health_log
   ↓
6. Dashboard queries views (RLS protected)
   ↓
7. Admin sees real-time metrics
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1: GitHub Secrets                                        │
│  • AUTOPILOT_SECRET                                             │
│  • SUPABASE_SERVICE_ROLE_KEY                                    │
│  • All sensitive credentials                                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: HMAC Authentication                                   │
│  • x-autopilot-sign header                                      │
│  • Validates AUTOPILOT_SECRET                                   │
│  • Prevents unauthorized access                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3: Service Role                                          │
│  • Supabase service_role key                                    │
│  • Bypasses RLS for edge functions                              │
│  • Never exposed to clients                                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4: Row Level Security (RLS)                              │
│  • Enabled on all tables                                        │
│  • Admin users only                                             │
│  • Checks automation.admin_users                                │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer 5: Application Auth                                      │
│  • Supabase Auth                                                │
│  • User must be signed in                                       │
│  • Dashboard checks auth.uid()                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Monitoring Points

```
┌──────────────────────────────────────────────────────────────────┐
│  What We Monitor                                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Site Health                                                  │
│     • HTTP status code                                           │
│     • Response time                                              │
│     • Every 5 minutes                                            │
│                                                                  │
│  2. Database Health                                              │
│     • Connection status                                          │
│     • Query performance                                          │
│     • Table counts                                               │
│                                                                  │
│  3. Migration Status                                             │
│     • Success/failure rate                                       │
│     • Duration                                                   │
│     • Rollback frequency                                         │
│                                                                  │
│  4. Deployment Status                                            │
│     • Build triggers                                             │
│     • Build success rate                                         │
│     • Deploy time                                                │
│                                                                  │
│  5. System Uptime                                                │
│     • 24-hour percentage                                         │
│     • 7-day percentage                                           │
│     • 30-day percentage                                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Failure Recovery

```
┌──────────────────────────────────────────────────────────────────┐
│  Failure Type          │  Recovery Action                        │
├────────────────────────┼─────────────────────────────────────────┤
│  Migration fails       │  Auto-rollback from backup              │
│  Site returns 500      │  Trigger Netlify redeploy               │
│  Database unreachable  │  Run repair + redeploy                  │
│  Health check timeout  │  Retry 3x then escalate                 │
│  Persistent failure    │  Create GitHub issue + Slack alert      │
│  Backup fails          │  Abort migration + alert                │
│  Rollback fails        │  Manual intervention required           │
└──────────────────────────────────────────────────────────────────┘
```

## Performance Metrics

```
┌──────────────────────────────────────────────────────────────────┐
│  Operation             │  Expected Time                          │
├────────────────────────┼─────────────────────────────────────────┤
│  Backup creation       │  10-60 seconds                          │
│  Migration execution   │  5-30 seconds                           │
│  Rollback              │  30-90 seconds                          │
│  Health check          │  < 5 seconds                            │
│  Auto-heal recovery    │  90-120 seconds                         │
│  Netlify build         │  2-5 minutes                            │
│  Dashboard load        │  < 2 seconds                            │
│  Log query             │  < 500ms                                │
└──────────────────────────────────────────────────────────────────┘
```

## Cost Breakdown

```
┌──────────────────────────────────────────────────────────────────┐
│  Service               │  Free Tier    │  Usage      │  Cost     │
├────────────────────────┼───────────────┼─────────────┼───────────┤
│  Supabase Functions    │  500K/month   │  ~15K/month │  $0       │
│  GitHub Actions        │  2,000 min/mo │  ~300 min   │  $0       │
│  Netlify Builds        │  300 min/mo   │  ~50 min    │  $0       │
│  PostgreSQL Storage    │  500 MB       │  ~50 MB     │  $0       │
│  Artifacts Storage     │  500 MB       │  ~100 MB    │  $0       │
│  Slack (optional)      │  Free         │  Unlimited  │  $0       │
├────────────────────────┴───────────────┴─────────────┼───────────┤
│  TOTAL                                                │  $0/month │
└───────────────────────────────────────────────────────┴───────────┘
```

---

**Last Updated:** January 27, 2025
**Version:** 4.0
**Status:** Production Ready
