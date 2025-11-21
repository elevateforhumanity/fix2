# Grafana Integration Setup

## Overview

Integrate Grafana with your Autopilot system to visualize metrics, create custom dashboards, and set up advanced alerting.

## Prerequisites

- Grafana Cloud account (free tier) or self-hosted Grafana
- Autopilot Phase 4 deployed
- `metrics-exporter` edge function deployed

## Step 1: Deploy Metrics Exporter

```bash
# Deploy the metrics exporter function
supabase functions deploy metrics-exporter \
  --project-ref $SUPABASE_PROJECT_REF \
  --no-verify-jwt

# Set environment variables in Supabase Dashboard
# Functions → metrics-exporter → Settings → Environment Variables:
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - AUTOPILOT_SECRET
```

## Step 2: Test Metrics Endpoint

```bash
# Test the metrics endpoint
curl "https://YOURPROJECTREF.supabase.co/functions/v1/metrics-exporter" \
  -H "x-autopilot-sign: YOUR_AUTOPILOT_SECRET"

# Expected output (Prometheus format):
# HELP autopilot_uptime_percentage System uptime percentage (last 24h)
# TYPE autopilot_uptime_percentage gauge
# autopilot_uptime_percentage{kind="site",period="24h"} 99.5
# ...
```

## Step 3: Set Up Grafana Cloud (Free Tier)

1. Go to https://grafana.com/auth/sign-up/create-user
2. Create free account
3. Create a new stack (free tier includes 10K metrics)
4. Note your Grafana URL: `https://YOURSTACK.grafana.net

## Step 4: Configure Prometheus Data Source

### Option A: Direct Scraping (Recommended)

1. In Grafana, go to **Configuration → Data Sources**
2. Click **Add data source**
3. Select **Prometheus**
4. Configure:
   - **Name:** Autopilot Metrics
   - **URL:** `https://YOURPROJECTREF.supabase.co/functions/v1/metrics-exporter
   - **Custom HTTP Headers:**
     - Header: `x-autopilot-sign`
     - Value: `YOUR_AUTOPILOT_SECRET`
   - **Scrape interval:** 30s
5. Click **Save & Test**

### Option B: Prometheus Server (Advanced)

If you want to use a Prometheus server:

```yaml
# prometheus.yml
global:
  scrape_interval: 30s

scrape_configs:
  - job_name: 'autopilot'
    static_configs:
      - targets: ['YOUR_PROJECT_REF.supabase.co']
    metrics_path: '/functions/v1/metrics-exporter'
    scheme: https
    params:
      headers:
        - 'x-autopilot-sign: YOUR_AUTOPILOT_SECRET'
```

## Step 5: Import Dashboard

### Pre-built Dashboard JSON

Save this as `autopilot-dashboard.json`:

```json
{
  "dashboard": {
    "title": "Autopilot System Health",
    "tags": ["autopilot", "health", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "System Health Score",
        "type": "gauge",
        "targets": [
          {
            "expr": "autopilot_health_score",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "min": 0,
            "max": 100,
            "thresholds": {
              "steps": [
                { "value": 0, "color": "red" },
                { "value": 70, "color": "yellow" },
                { "value": 90, "color": "green" }
              ]
            }
          }
        }
      },
      {
        "id": 2,
        "title": "Uptime (24h)",
        "type": "stat",
        "targets": [
          {
            "expr": "autopilot_uptime_percentage{period=\"24h\"}",
            "refId": "A",
            "legendFormat": "{{kind}}"
          }
        ]
      },
      {
        "id": 3,
        "title": "Response Time (p95)",
        "type": "graph",
        "targets": [
          {
            "expr": "autopilot_response_time_ms{stat=\"p95\"}",
            "refId": "A",
            "legendFormat": "{{kind}}"
          }
        ]
      },
      {
        "id": 4,
        "title": "Migration Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "autopilot_migrations_success_rate",
            "refId": "A"
          }
        ]
      },
      {
        "id": 5,
        "title": "Errors (24h)",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(autopilot_errors_total{period=\"24h\"}[5m])",
            "refId": "A",
            "legendFormat": "{{kind}}"
          }
        ]
      },
      {
        "id": 6,
        "title": "Rollbacks (7d)",
        "type": "stat",
        "targets": [
          {
            "expr": "autopilot_rollbacks_total{period=\"7d\"}",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "thresholds": {
              "steps": [
                { "value": 0, "color": "green" },
                { "value": 1, "color": "yellow" },
                { "value": 3, "color": "red" }
              ]
            }
          }
        }
      }
    ]
  }
}
```

### Import to Grafana

1. In Grafana, go to **Dashboards → Import**
2. Upload `autopilot-dashboard.json`
3. Select **Autopilot Metrics** as data source
4. Click **Import**

## Step 6: Set Up Alerts

### Alert Rule: High Error Rate

1. Go to **Alerting → Alert rules**
2. Click **New alert rule**
3. Configure:
   - **Name:** High Error Rate
   - **Query:** `rate(autopilot_errors_total[5m]) > 0.1`
   - **Condition:** Alert when above 0.1 errors/second
   - **For:** 5 minutes
   - **Annotations:**
     - Summary: "High error rate detected"
     - Description: "Error rate is {{ $value }} errors/second"

### Alert Rule: Low Uptime

1. Create new alert rule
2. Configure:
   - **Name:** Low Uptime
   - **Query:** `autopilot_uptime_percentage < 95`
   - **Condition:** Alert when below 95%
   - **For:** 10 minutes

### Alert Rule: Migration Failure

1. Create new alert rule
2. Configure:
   - **Name:** Migration Failure
   - **Query:** `autopilot_migrations_success_rate < 100`
   - **Condition:** Alert when below 100%
   - **For:** 1 minute

## Step 7: Configure Notification Channels

### Slack Integration

1. Go to **Alerting → Contact points**
2. Click **New contact point**
3. Select **Slack**
4. Configure:
   - **Name:** Autopilot Alerts
   - **Webhook URL:** Your Slack webhook URL
   - **Channel:** #autopilot-alerts
5. Test and save

### Email Integration

1. Create new contact point
2. Select **Email**
3. Configure:
   - **Addresses:** your-team@example.com
   - **Subject:** Autopilot Alert: {{ .CommonLabels.alertname }}

## Available Metrics

### Uptime Metrics

- `autopilot_uptime_percentage{kind, period}` - Uptime percentage by component
- `autopilot_health_checks_total{kind, period}` - Total health checks
- `autopilot_errors_total{kind, period}` - Total errors detected

### Performance Metrics

- `autopilot_response_time_ms{kind, stat}` - Response times (avg, p95, p99)

### Migration Metrics

- `autopilot_migrations_total{period}` - Total migrations
- `autopilot_migrations_success_rate{period}` - Success rate percentage
- `autopilot_rollbacks_total{period}` - Total rollbacks
- `autopilot_migration_duration_ms{stat}` - Migration duration

### Deployment Metrics

- `autopilot_deployments_total{platform, period}` - Total deployments
- `autopilot_deployment_success_rate{platform, period}` - Success rate

### Health Score

- `autopilot_health_score` - Composite health score (0-100)

## Example Queries

### Average Uptime Across All Components

```promql
avg(autopilot_uptime_percentage{period="24h"})
```

### Error Rate (per minute)

```promql
rate(autopilot_errors_total[1m])
```

### 95th Percentile Response Time

```promql
autopilot_response_time_ms{stat="p95"}
```

### Migration Success Rate Trend

```promql
autopilot_migrations_success_rate{period="7d"}
```

### Deployments Per Day

```promql
increase(autopilot_deployments_total[1d])
```

## Advanced Dashboards

### SLA Dashboard

Create a dashboard showing:

- Monthly uptime percentage
- MTTR (Mean Time To Recovery)
- MTBF (Mean Time Between Failures)
- SLA compliance (99.9% target)

### Performance Dashboard

Create a dashboard showing:

- Response time trends
- Latency heatmaps
- Throughput metrics
- Resource utilization

### Operations Dashboard

Create a dashboard showing:

- Migration frequency
- Rollback rate
- Deployment success rate
- Time to deploy

## Troubleshooting

### Metrics Not Appearing

1. Check metrics exporter is deployed:

   ```bash
   curl "https://YOURPROJECTREF.supabase.co/functions/v1/metrics-exporter" \
     -H "x-autopilot-sign: YOUR_SECRET"
   ```

2. Verify Grafana data source configuration
3. Check `x-autopilot-sign` header is correct
4. Verify Supabase function logs for errors

### Alerts Not Firing

1. Check alert rule query returns data
2. Verify notification channel is configured
3. Test notification channel manually
4. Check alert rule evaluation interval

### Dashboard Not Loading

1. Verify data source is selected
2. Check time range is appropriate
3. Verify metrics exist for selected time range
4. Check browser console for errors

## Cost

**Grafana Cloud Free Tier:**

- 10,000 series metrics
- 14-day retention
- 3 users
- Unlimited dashboards

**Your usage:**

- ~50 metrics series
- Well within free tier
- **Cost: $0/month**

## Next Steps

1. Create custom dashboards for your team
2. Set up additional alert rules
3. Configure on-call rotations
4. Export dashboards to version control
5. Share dashboards with stakeholders

---

**Last Updated:** January 28, 2025
**Version:** 5.0
**Status:** Production Ready
