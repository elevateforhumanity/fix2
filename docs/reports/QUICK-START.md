# 🚀 Quick Start - Autopilot with Durable Objects

## One Command to Rule Them All

```bash
./scripts/full-autopilot-setup.sh
```

## What It Does

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOPILOT SETUP                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 🤖 Puppeteer logs into Cloudflare                      │
│  2. 🔑 Creates API token automatically                     │
│  3. ☁️  Deploys Durable Object worker                      │
│  4. 🔐 Sets GitHub secrets                                 │
│  5. ✅ Tests complete data flow                            │
│  6. 📊 Generates configuration summary                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## What You Need

- Cloudflare email
- Cloudflare password
- 2 minutes

## What You Get

✅ **Automatic monitoring** on every push
✅ **Historical data** stored in Durable Objects
✅ **Metrics API** with real-time data
✅ **Smart alerting** on critical issues
✅ **Self-healing** on degraded status
✅ **Zero maintenance** required

## Data Flow

```
GitHub Push → Inline Checks → Durable Object → Metrics API
     ↓              ↓               ↓              ↓
  Automatic    8 Checks      Persistent      Public Read
   Trigger     Execute        Storage        Available
```

## API Endpoints

After setup, access your metrics:

```bash
# Summary
curl https://efh-autopilot-metrics.workers.dev/summary

# Recent checks
curl https://efh-autopilot-metrics.workers.dev/recent?limit=10

# 24-hour history
curl https://efh-autopilot-metrics.workers.dev/history?hours=24

# Trends
curl https://efh-autopilot-metrics.workers.dev/trends?hours=24

# Alerts
curl https://efh-autopilot-metrics.workers.dev/alerts
```

## Success = This

```json
{
  "totalChecks": 42,
  "healthyCount": 40,
  "degradedCount": 2,
  "criticalCount": 0,
  "averageSuccessRate": 98.5,
  "uptimePercentage": 95.2,
  "mtbf": 24.5,
  "mttr": 0.5
}
```

## That's It!

Run the script, provide credentials, done. 🎉

**Everything else is automatic.**

---

📖 Full docs: [AUTOPILOT-COMPLETE.md](AUTOPILOT-COMPLETE.md)
🧪 Testing: [TEST-AUTOPILOT.md](TEST-AUTOPILOT.md)
📚 Setup guide: [AUTOPILOT-SETUP.md](AUTOPILOT_SETUP_GUIDE.md)
