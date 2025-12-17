# Incident Response Runbook

## Severity Levels

| Level  | Description         | Response Time | Examples                                |
| ------ | ------------------- | ------------- | --------------------------------------- |
| **P0** | Critical outage     | Immediate     | Complete site down, data breach         |
| **P1** | Major degradation   | < 1 hour      | Login broken, payment failures          |
| **P2** | Partial degradation | < 4 hours     | Single feature broken, slow performance |
| **P3** | Minor issue         | < 24 hours    | UI glitch, non-critical bug             |

## Incident Response Process

### 1. Detection

- Monitor health endpoint: `/api/health`
- Check system_errors table for spikes
- User reports via support channels
- Automated alerts (if configured)

### 2. Triage

```bash
# Check system health
curl https://YOUR_DOMAIN/api/health | jq

# Check recent errors
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres -c \
  "SELECT error_type, COUNT(*) FROM system_errors
   WHERE created_at > NOW() - INTERVAL '1 hour'
   GROUP BY error_type ORDER BY COUNT(*) DESC;"

# Check Vercel deployment status
vercel ls --prod

# Check Supabase status
curl https://status.supabase.com/api/v2/status.json
```

### 3. Communication

- **P0/P1**: Notify all stakeholders immediately
- **P2/P3**: Update status page, notify affected users
- Use incident tracking system (GitHub Issues, Linear, etc.)

### 4. Investigation

- Review logs in Vercel dashboard
- Check system_errors table for stack traces
- Review recent deployments
- Check third-party service status (Stripe, Resend, Supabase)

### 5. Mitigation

- Apply hotfix if available
- Rollback to last known good deployment
- Enable maintenance mode if necessary
- Scale resources if performance issue

### 6. Resolution

- Deploy fix to production
- Verify resolution with health checks
- Monitor for 30 minutes post-fix
- Close incident ticket

### 7. Post-Mortem

- Document root cause
- Identify preventive measures
- Update runbooks
- Share learnings with team

## Common Incidents

### Site Down (P0)

**Symptoms**: 500 errors, health endpoint unreachable

**Diagnosis**:

```bash
# Check Vercel deployment
vercel ls --prod

# Check build logs
vercel logs YOUR_DEPLOYMENT_URL

# Check Supabase connectivity
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/
```

**Resolution**:

1. Rollback to previous deployment:
   ```bash
   vercel rollback YOUR_DEPLOYMENT_URL
   ```
2. If Supabase issue, check status.supabase.com
3. If DNS issue, verify domain configuration

### Login Failures (P1)

**Symptoms**: Users cannot authenticate

**Diagnosis**:

```bash
# Check Supabase auth status
curl https://YOUR_PROJECT_REF.supabase.co/auth/v1/health

# Check auth errors
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres -c \
  "SELECT * FROM system_errors WHERE error_type LIKE '%auth%'
   ORDER BY created_at DESC LIMIT 10;"
```

**Resolution**:

1. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
2. Check RLS policies on auth.users
3. Verify email service (Resend) is operational
4. Check for rate limiting on auth endpoints

### Payment Failures (P1)

**Symptoms**: Stripe webhooks failing, billing errors

**Diagnosis**:

```bash
# Check Stripe webhook logs
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check recent payment errors
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres -c \
  "SELECT * FROM system_errors WHERE error_type = 'stripe_webhook_error'
   ORDER BY created_at DESC LIMIT 10;"
```

**Resolution**:

1. Verify `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
2. Check webhook endpoint is publicly accessible
3. Verify webhook signature validation
4. Manually retry failed webhooks in Stripe dashboard

### Database Performance (P2)

**Symptoms**: Slow queries, timeouts

**Diagnosis**:

```sql
-- Check slow queries
SELECT query, calls, mean_exec_time, max_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check active connections
SELECT COUNT(*) FROM pg_stat_activity;

-- Check table sizes
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

**Resolution**:

1. Add missing indexes
2. Optimize slow queries
3. Upgrade Supabase plan if resource-constrained
4. Implement query caching

### Email Delivery Failures (P2)

**Symptoms**: Invites not received, notifications missing

**Diagnosis**:

```bash
# Check Resend API status
curl https://api.resend.com/health

# Check email errors
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres -c \
  "SELECT * FROM system_errors WHERE error_type LIKE '%email%'
   ORDER BY created_at DESC LIMIT 10;"
```

**Resolution**:

1. Verify `RESEND_API_KEY` is valid
2. Check domain verification in Resend dashboard
3. Verify email templates are correct
4. Check for rate limiting

### Memory Leaks (P2)

**Symptoms**: Increasing memory usage, eventual crashes

**Diagnosis**:

- Check Vercel function logs for memory warnings
- Review recent code changes for unclosed connections
- Check for large object accumulation

**Resolution**:

1. Identify leaking component (use heap snapshots)
2. Deploy hotfix
3. Restart affected functions
4. Monitor memory usage post-fix

## Rollback Procedures

### Vercel Deployment Rollback

```bash
# List recent deployments
vercel ls --prod

# Rollback to specific deployment
vercel rollback DEPLOYMENT_URL

# Verify rollback
curl https://YOUR_DOMAIN/api/health
```

### Database Migration Rollback

```bash
# Restore from backup (see BACKUP_RESTORE.md)
psql -h db.PROJECT_REF.supabase.co -U postgres -d postgres \
  -f backup_YYYYMMDD_HHMMSS.sql

# Or use Supabase PITR
# Navigate to Supabase dashboard → Database → Backups → Point in Time Recovery
```

## Maintenance Mode

If immediate fix is not available, enable maintenance mode:

1. Create `public/maintenance.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Maintenance</title>
  </head>
  <body>
    <h1>Scheduled Maintenance</h1>
    <p>We'll be back shortly. Expected completion: [TIME]</p>
  </body>
</html>
```

2. Update `vercel.json`:

```json
{
  "routes": [{ "src": "/(.*)", "dest": "/maintenance.html" }]
}
```

3. Deploy maintenance page:

```bash
vercel --prod
```

## Escalation Contacts

- **Supabase Support**: support@supabase.com (Pro/Team plans)
- **Vercel Support**: support@vercel.com (Pro/Enterprise plans)
- **Stripe Support**: https://support.stripe.com
- **Resend Support**: support@resend.com

## Monitoring Checklist

### Real-Time

- [ ] Health endpoint responding (200 OK)
- [ ] No error spikes in system_errors table
- [ ] Vercel functions executing normally
- [ ] Supabase connection pool healthy

### Hourly

- [ ] Check system_errors for new error types
- [ ] Verify critical flows (login, signup, payments)
- [ ] Check third-party service status pages

### Daily

- [ ] Review system_errors summary
- [ ] Check Vercel analytics for anomalies
- [ ] Verify backup completion
- [ ] Review performance metrics

## Post-Incident Template

```markdown
# Incident Post-Mortem: [TITLE]

**Date**: YYYY-MM-DD
**Severity**: P0/P1/P2/P3
**Duration**: X hours Y minutes
**Impact**: [Number of users affected, features impacted]

## Timeline

- HH:MM - Incident detected
- HH:MM - Investigation started
- HH:MM - Root cause identified
- HH:MM - Fix deployed
- HH:MM - Incident resolved

## Root Cause

[Technical explanation of what went wrong]

## Resolution

[What was done to fix it]

## Preventive Measures

1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

## Lessons Learned

[Key takeaways for future incidents]
```
