# Production Setup Guide

This document explains how to configure and use the production-ready features implemented in this repository.

## 🚀 Features Implemented

### 1. CI/CD Pipeline (GitHub Actions)
- **File**: `.github/workflows/ci-cd.yml`
- **Triggers**: Push to main/master, Pull Requests
- **Steps**:
  - Lint, type check, test, build
  - Run Supabase migrations
  - Deploy to Vercel

### 2. Automated Database Backups
- **File**: `.github/workflows/db-backup.yml`
- **Schedule**: Daily at 06:00 UTC
- **Storage**: AWS S3
- **Notifications**: Slack alerts on success/failure

### 3. Error Monitoring (Sentry)
- **Files**: `sentry.*.config.ts`, `instrumentation.ts`
- **Features**: Error tracking, performance monitoring, session replay
- **Coverage**: Client-side, server-side, and edge runtime

### 4. Slack/Teams Notifications
- **File**: `lib/notifySlack.ts`
- **Functions**: `notifySlack()`, `notifyTeams()`
- **Severities**: info, warning, error, critical

### 5. Help Center
- **File**: `app/help/page.tsx`
- **Sections**: Students, Instructors, Administrators
- **Features**: Search, categorized articles, contact support

---

## 📋 Required GitHub Secrets

### For CI/CD Pipeline
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ACCESS_TOKEN
SUPABASE_PROJECT_REF
SUPABASE_DB_PASSWORD
VERCELACESSTOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### For Database Backups
```
SUPABASE_DB_URL          # Full PostgreSQL connection string
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION       # e.g., us-east-1
S3_BACKUP_BUCKET         # e.g., efh-production-backups
SLACK_WEBHOOK_URL        # For backup notifications
```

### For Monitoring
```
SENTRY_DSN
SENTRY_AUTH_TOKEN        # For source maps upload
SENTRY_ORG
SENTRY_PROJECT
```

---

## 🔧 Environment Variables

Add these to your `.env.local` and Vercel:

```bash
# Sentry
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ENVIRONMENT=production

# Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Teams Notifications (optional)
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/YOUR/WEBHOOK/URL

# Database Backups (for GitHub Actions)
SUPABASE_DB_URL=postgresql://user:pass@host:5432/database
S3_BACKUP_BUCKET=your-backup-bucket-name
```

---

## 📖 Usage Examples

### Slack Notifications

```typescript
import { notifySlack } from '@/lib/notifySlack';

// In an API route
export async function POST(request: Request) {
  try {
    // Your logic here
    await notifySlack('User registration completed', {
      severity: 'info',
      context: { userId: '123', email: 'user@example.com' }
    });
  } catch (error: any) {
    await notifySlack('Registration failed', {
      severity: 'error',
      context: {
        message: error.message,
        stack: error.stack
      }
    });
  }
}
```

### Teams Notifications

```typescript
import { notifyTeams } from '@/lib/notifySlack';

await notifyTeams('Critical system alert', {
  severity: 'critical',
  context: {
    service: 'payment-processor',
    error: 'Connection timeout'
  }
});
```

### Sentry Error Tracking

Sentry is automatically configured. Errors are captured automatically, but you can also manually capture:

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Your code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'payment',
      userId: user.id
    }
  });
}
```

---

## 🔐 Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret from the list above

### Quick Setup Script

```bash
# Set Vercel secrets
gh secret set VERCELACESSTOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID

# Set Supabase secrets
gh secret set NEXT_PUBLIC_SUPABASE_URL
gh secret set NEXT_PUBLIC_SUPABASE_ANON_KEY
gh secret set SUPABASE_SERVICE_ROLE_KEY
gh secret set SUPABASE_ACCESS_TOKEN
gh secret set SUPABASE_PROJECT_REF
gh secret set SUPABASE_DB_URL

# Set AWS secrets for backups
gh secret set AWS_ACCESS_KEY_ID
gh secret set AWS_SECRET_ACCESS_KEY
gh secret set AWS_DEFAULT_REGION
gh secret set S3_BACKUP_BUCKET

# Set monitoring secrets
gh secret set SENTRY_DSN
gh secret set SLACK_WEBHOOK_URL
```

---

## 🧪 Testing the Setup

### Test CI/CD Pipeline
```bash
# Push to main branch
git push origin main

# Check GitHub Actions tab for workflow status
```

### Test Database Backup
```bash
# Manually trigger the workflow
gh workflow run db-backup.yml

# Or wait for the scheduled run at 06:00 UTC
```

### Test Slack Notifications
```bash
# Create a test API route
curl -X POST https://your-domain.com/api/test-slack
```

### Test Sentry
```bash
# Trigger an error in your app
# Check Sentry dashboard for the error
```

---

## 📊 Monitoring Dashboard

### Sentry Dashboard
- **URL**: https://sentry.io/organizations/your-org/projects/
- **Metrics**: Error rate, performance, user sessions
- **Alerts**: Configure alerts for error spikes

### GitHub Actions
- **URL**: https://github.com/your-org/your-repo/actions
- **Workflows**: CI/CD, Database Backups
- **Logs**: View detailed logs for each run

### Vercel Dashboard
- **URL**: https://vercel.com/your-team/your-project
- **Deployments**: View deployment history
- **Analytics**: Performance metrics

---

## 🔄 Maintenance

### Daily
- ✅ Automated database backups (06:00 UTC)
- ✅ Automated deployments on push to main

### Weekly
- Review Sentry error reports
- Check GitHub Actions success rate
- Verify backup integrity

### Monthly
- Review and rotate API keys
- Update dependencies
- Test disaster recovery procedures

---

## 🆘 Troubleshooting

### CI/CD Pipeline Fails
1. Check GitHub Actions logs
2. Verify all secrets are set correctly
3. Ensure Vercel project is linked
4. Check Supabase migrations are valid

### Database Backup Fails
1. Verify `SUPABASE_DB_URL` is correct
2. Check AWS credentials and S3 bucket permissions
3. Review GitHub Actions logs
4. Check Slack for failure notification

### Sentry Not Capturing Errors
1. Verify `SENTRY_DSN` is set in environment
2. Check `instrumentation.ts` is present
3. Ensure `experimental.instrumentationHook` is enabled in `next.config.mjs`
4. Rebuild and redeploy

### Slack Notifications Not Working
1. Verify `SLACK_WEBHOOK_URL` is correct
2. Test webhook with curl:
   ```bash
   curl -X POST $SLACK_WEBHOOK_URL \
     -H 'Content-Type: application/json' \
     -d '{"text":"Test message"}'
   ```
3. Check Slack app permissions

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

---

## 🎯 Next Steps

1. **Set up all GitHub secrets** (see list above)
2. **Configure Sentry project** and get DSN
3. **Create Slack webhook** for notifications
4. **Set up S3 bucket** for database backups
5. **Test each workflow** manually
6. **Monitor for 1 week** to ensure stability
7. **Document any custom configurations**

---

**Last Updated**: November 18, 2025
**Version**: 1.0.0
**Status**: Production Ready
