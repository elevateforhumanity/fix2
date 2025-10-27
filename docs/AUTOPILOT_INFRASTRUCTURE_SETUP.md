# Elevate for Humanity

## Autopilot Infrastructure Setup Guide

### Self-Maintaining Ecosystem Configuration

**Version:** 1.0  
**Date:** January 2025  
**Status:** Implementation Ready

---

## Overview

This document outlines the complete autopilot infrastructure for Elevate for Humanity, enabling a self-maintaining ecosystem across deployment, monitoring, content generation, and revenue management.

**Core Modules:**

1. Cloudflare DNS & SSL Automation
2. Supabase Edge Functions & Database Sync
3. Stripe Split Payouts & Revenue Sharing
4. AI Content Generation
5. Monitoring & Error Tracking
6. Repository Maintenance

---

## Module 1: Cloudflare Automation

### Purpose

Automate DNS management, SSL certificates, and CDN configuration across all EFH domains.

### Configuration

**File:** `autopilot/cloudflare-setup.mjs`

```javascript
// Cloudflare API Configuration
const CLOUDFLARE_CONFIG = {
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  zoneId: process.env.CLOUDFLARE_ZONE_ID,
  domains: ['elevateforhumanity.org', 'selfishinc.org', 'washingtonhub.org'],
};

// Auto-configure DNS records
async function setupDNS() {
  for (const domain of CLOUDFLARE_CONFIG.domains) {
    await createRecord(domain, 'A', netlifyIP);
    await createRecord(domain, 'CNAME', 'www', domain);
    await enableSSL(domain);
    await configureCDN(domain);
  }
}

// Auto-renew SSL certificates
async function renewSSL() {
  // Runs monthly via GitHub Actions
  for (const domain of CLOUDFLARE_CONFIG.domains) {
    await checkSSLExpiry(domain);
    if (expiresIn30Days) {
      await renewCertificate(domain);
    }
  }
}
```

**GitHub Action:** `.github/workflows/cloudflare-autopilot.yml`

```yaml
name: Cloudflare Autopilot
on:
  schedule:
    - cron: '0 0 1 * *' # Monthly
  workflow_dispatch:

jobs:
  cloudflare-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
      - name: Run Cloudflare Autopilot
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: node autopilot/cloudflare-setup.mjs
```

### Environment Variables

```bash
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ZONE_ID=your_zone_id
```

---

## Module 2: Supabase Edge Functions

### Purpose

Automate database operations, authentication, and real-time sync across the platform.

### Edge Functions

**1. Student Enrollment Sync**

**File:** `supabase/functions/sync-enrollment/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Sync enrollment from external systems (WIOA, WRG)
  const enrollments = await fetchExternalEnrollments();

  for (const enrollment of enrollments) {
    await supabase.from('students').upsert({
      id: enrollment.id,
      name: enrollment.name,
      program: enrollment.program,
      funding_source: enrollment.funding,
      status: 'active',
      synced_at: new Date(),
    });
  }

  return new Response(JSON.stringify({ synced: enrollments.length }));
});
```

**2. Job Placement Tracking**

**File:** `supabase/functions/track-placement/index.ts`

```typescript
// Auto-track job placements and update metrics
serve(async (req) => {
  const { studentId, employerId, salary, startDate } = await req.json();

  await supabase.from('placements').insert({
    student_id: studentId,
    employer_id: employerId,
    salary,
    start_date: startDate,
    placed_at: new Date(),
  });

  // Update student status
  await supabase
    .from('students')
    .update({ status: 'placed', placement_date: startDate })
    .eq('id', studentId);

  // Trigger success email
  await sendPlacementEmail(studentId);

  return new Response('Placement tracked');
});
```

**3. Automated Reporting**

**File:** `supabase/functions/generate-reports/index.ts`

```typescript
// Generate weekly/monthly reports automatically
serve(async (req) => {
  const { period } = await req.json(); // 'weekly' or 'monthly'

  const metrics = await supabase.rpc('calculate_metrics', { period });

  const report = {
    enrollments: metrics.enrollments,
    placements: metrics.placements,
    placement_rate: metrics.placement_rate,
    avg_salary: metrics.avg_salary,
    revenue: metrics.revenue,
  };

  // Send to stakeholders
  await emailReport(report);

  // Store in database
  await supabase.from('reports').insert(report);

  return new Response(JSON.stringify(report));
});
```

### Deployment

```bash
# Deploy all edge functions
supabase functions deploy sync-enrollment
supabase functions deploy track-placement
supabase functions deploy generate-reports

# Set up cron jobs
supabase functions schedule sync-enrollment --cron "0 */6 * * *" # Every 6 hours
supabase functions schedule generate-reports --cron "0 9 * * 1" # Monday 9am
```

---

## Module 3: Stripe Split Payouts

### Purpose

Automate revenue sharing between EFH, instructors, and partner organizations.

### Configuration

**File:** `autopilot/stripe-split-payouts.mjs`

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Revenue split configuration
const SPLIT_CONFIG = {
  efh: 0.6, // 60% to EFH operations
  instructor: 0.25, // 25% to instructor
  selfish_inc: 0.1, // 10% to Selfish Inc Foundation
  platform: 0.05, // 5% platform fee
};

async function processSplitPayout(enrollmentId, amount) {
  const enrollment = await getEnrollment(enrollmentId);

  // Create transfers
  await stripe.transfers.create({
    amount: Math.round(amount * SPLIT_CONFIG.instructor),
    currency: 'usd',
    destination: enrollment.instructor_stripe_account,
    description: `Instructor payout for ${enrollment.program}`,
  });

  await stripe.transfers.create({
    amount: Math.round(amount * SPLIT_CONFIG.selfish_inc),
    currency: 'usd',
    destination: process.env.SELFISH_INC_STRIPE_ACCOUNT,
    description: 'Scholarship fund contribution',
  });

  // Log transaction
  await logPayout(enrollmentId, amount, SPLIT_CONFIG);
}

// Auto-process payouts weekly
async function weeklyPayoutRun() {
  const completedEnrollments = await getCompletedEnrollments();

  for (const enrollment of completedEnrollments) {
    await processSplitPayout(enrollment.id, enrollment.tuition);
  }
}
```

**GitHub Action:** `.github/workflows/stripe-payouts.yml`

```yaml
name: Stripe Payouts
on:
  schedule:
    - cron: '0 10 * * 5' # Friday 10am
  workflow_dispatch:

jobs:
  process-payouts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Process Payouts
        env:
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
        run: node autopilot/stripe-split-payouts.mjs
```

---

## Module 4: AI Content Generation

### Purpose

Automatically generate marketing content, social media posts, and email campaigns.

### Configuration

**File:** `autopilot/ai-content-generator.mjs`

```javascript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate daily social media posts
async function generateDailyPosts() {
  const programs = ['Tax Business', 'Barber', 'Building Tech', 'Healthcare'];
  const posts = [];

  for (const program of programs) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a social media expert for workforce development programs.',
        },
        {
          role: 'user',
          content: `Generate 3 engaging TikTok captions for ${program} program. 
                  Include: FREE training, job placement, salary info.
                  Tone: Motivational, urgent. 
                  Hashtags: #ElevateForHumanity #${program.replace(' ', '')} #FreeTraining`,
        },
      ],
    });

    posts.push({
      program,
      captions: completion.choices[0].message.content.split('\n\n'),
      generated_at: new Date(),
    });
  }

  // Save to database for scheduling
  await savePosts(posts);

  return posts;
}

// Generate weekly email newsletter
async function generateNewsletter() {
  const metrics = await getWeeklyMetrics();
  const successStories = await getRecentSuccessStories();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `Create a weekly newsletter for Elevate for Humanity.
                Include: ${metrics.enrollments} new students, ${metrics.placements} job placements.
                Feature success story: ${successStories[0].name} - ${successStories[0].outcome}.
                CTA: Enroll for next cohort.
                Tone: Professional, inspiring.`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
```

**Cron Schedule:**

```bash
# Daily content generation at 6am
0 6 * * * node autopilot/ai-content-generator.mjs --daily

# Weekly newsletter on Sunday 8am
0 8 * * 0 node autopilot/ai-content-generator.mjs --newsletter
```

---

## Module 5: Monitoring & Error Tracking

### Purpose

Automated monitoring, error detection, and alerting across all systems.

### Configuration

**File:** `autopilot/monitoring-guard.mjs`

```javascript
import Sentry from '@sentry/node';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Monitor deployment health
async function healthCheck() {
  const checks = {
    website: await checkWebsite('https://elevateforhumanity.org'),
    api: await checkAPI('https://api.elevateforhumanity.org/health'),
    database: await checkDatabase(),
    stripe: await checkStripe(),
    supabase: await checkSupabase(),
  };

  const failures = Object.entries(checks).filter(([_, status]) => !status);

  if (failures.length > 0) {
    await sendAlert({
      level: 'critical',
      message: `Health check failures: ${failures.map(([name]) => name).join(', ')}`,
      checks,
    });
  }

  return checks;
}

// Monitor Lighthouse scores
async function lighthouseCheck() {
  const scores = await runLighthouse('https://elevateforhumanity.org');

  if (scores.performance < 90 || scores.accessibility < 95) {
    await sendAlert({
      level: 'warning',
      message: 'Lighthouse scores below threshold',
      scores,
    });
  }

  return scores;
}

// Monitor error rates
async function errorRateCheck() {
  const errors = await Sentry.getErrorRate('24h');

  if (errors > 100) {
    await sendAlert({
      level: 'critical',
      message: `High error rate: ${errors} errors in 24h`,
    });
  }
}

// Send alerts to Slack/Email
async function sendAlert(alert) {
  // Slack webhook
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `🚨 ${alert.level.toUpperCase()}: ${alert.message}`,
      attachments: [{ text: JSON.stringify(alert, null, 2) }],
    }),
  });

  // Email to admins
  await sendEmail({
    to: 'admin@elevateforhumanity.org',
    subject: `Autopilot Alert: ${alert.message}`,
    body: JSON.stringify(alert, null, 2),
  });
}
```

**GitHub Action:** `.github/workflows/monitoring.yml`

```yaml
name: Monitoring
on:
  schedule:
    - cron: '*/15 * * * *' # Every 15 minutes
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Health Checks
        env:
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        run: node autopilot/monitoring-guard.mjs
```

---

## Module 6: Repository Maintenance

### Purpose

Automated cleanup, dependency updates, and code quality checks.

### Configuration

**File:** `.github/workflows/autopilot-cleanup.yml`

```yaml
name: Autopilot Cleanup
on:
  schedule:
    - cron: '0 2 * * 0' # Sunday 2am
  workflow_dispatch:

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Delete Stale Branches
        run: |
          git fetch --prune
          git branch -r --merged main | grep -v main | sed 's/origin\///' | xargs -r git push origin --delete

      - name: Update Dependencies
        run: |
          npm update
          npm audit fix
          git add package*.json
          git commit -m "chore: update dependencies" || true
          git push

      - name: Clear Cache
        run: |
          rm -rf node_modules/.cache
          rm -rf .vite
          rm -rf dist

      - name: Generate Reports
        run: |
          npm run build
          npm test
          npm run lighthouse
```

---

## Environment Variables (Complete List)

### Cloudflare

```bash
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ZONE_ID=your_zone_id
```

### Supabase

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Stripe

```bash
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
SELFISH_INC_STRIPE_ACCOUNT=acct_your_account
```

### OpenAI

```bash
OPENAI_API_KEY=sk-your_key
```

### Monitoring

```bash
SENTRY_DSN=https://your_sentry_dsn
SLACK_WEBHOOK_URL=https://hooks.slack.com/your_webhook
```

### Email

```bash
SENDGRID_API_KEY=your_key
ADMIN_EMAIL=admin@elevateforhumanity.org
```

---

## Deployment Checklist

### Initial Setup

- [ ] Set all environment variables in GitHub Secrets
- [ ] Set all environment variables in Netlify
- [ ] Deploy Supabase edge functions
- [ ] Configure Cloudflare DNS
- [ ] Set up Stripe Connect accounts
- [ ] Initialize Sentry project
- [ ] Configure Slack webhooks

### Testing

- [ ] Run health checks manually
- [ ] Test Stripe payouts in test mode
- [ ] Verify Supabase functions
- [ ] Test AI content generation
- [ ] Verify monitoring alerts

### Activation

- [ ] Enable all GitHub Actions
- [ ] Set up cron schedules
- [ ] Monitor first week closely
- [ ] Adjust thresholds as needed

---

## Monitoring Dashboard

### Key Metrics to Track

1. **Uptime:** 99.9% target
2. **Response Time:** <500ms average
3. **Error Rate:** <0.1%
4. **Lighthouse Scores:** Performance >90, Accessibility >95
5. **Deployment Success Rate:** 100%
6. **Payout Processing:** 100% success rate

### Weekly Review

- Review error logs
- Check payout accuracy
- Verify content generation quality
- Assess monitoring alert frequency
- Optimize thresholds

---

## Troubleshooting

### Common Issues

**Issue:** Cloudflare API rate limit
**Solution:** Reduce cron frequency or batch requests

**Issue:** Supabase function timeout
**Solution:** Optimize queries, add pagination

**Issue:** Stripe payout failures
**Solution:** Verify account status, check balance

**Issue:** AI content quality issues
**Solution:** Refine prompts, add examples

**Issue:** False positive alerts
**Solution:** Adjust monitoring thresholds

---

## Future Enhancements

### Phase 2 (Q2 2025)

- [ ] Predictive analytics for enrollment
- [ ] Automated A/B testing for marketing
- [ ] AI-powered student support chatbot
- [ ] Automated curriculum updates
- [ ] Real-time dashboard for stakeholders

### Phase 3 (Q3 2025)

- [ ] Multi-state expansion automation
- [ ] Employer portal automation
- [ ] Automated compliance reporting
- [ ] AI-driven career matching
- [ ] Blockchain credentials

---

**Document Owner:** DevOps Team  
**Last Updated:** January 2025  
**Next Review:** April 2025
