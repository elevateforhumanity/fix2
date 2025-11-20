# Enterprise Features - Setup Guide

## Quick Start

This guide walks you through setting up all enterprise features added in Batches 1 and 2.

---

## 1. Database Setup

### Run Migrations

Execute the SQL migrations in your Supabase SQL Editor or via CLI:

```bash
# Option 1: Via Supabase CLI
supabase db push

# Option 2: Via psql
psql $DATABASE_URL -f migrations/20251118_advanced_assessments.sql
psql $DATABASE_URL -f migrations/20251118_billing_and_wioa.sql
psql $DATABASE_URL -f migrations/20251118_lti_and_help.sql
```

### Verify Tables Created

Check that these tables exist:
- `question_banks`
- `questions`
- `exams`
- `exam_attempts`
- `exam_attempt_questions`
- `tenant_billing`
- `tenant_usage`
- `wioa_participant_records`
- `lti_platforms`
- `lti_deployments`
- `help_articles`

---

## 2. Environment Variables

### Required Variables

Add to `.env.local` (development) and Vercel/production:

```bash
# Supabase (should already exist)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe Billing
STRIPE_SECRET_KEY=sk_test_...
INTERNAL_CRON_TOKEN=generate-a-secure-random-token-here

# LTI 1.3 Integration
LTI_TOOL_URL=https://elevateforhumanity.org
LTI_PUBLIC_KEY_N=base64url-encoded-rsa-modulus

# Zendesk Support
ZENDESK_SUBDOMAIN=your_subdomain
ZENDESK_EMAIL=support@elevateforhumanity.org
ZENDESK_API_TOKEN=your_api_token

# Proctoring (Optional)
PROCTORIO_LAUNCH_BASE_URL=https://proctor-somewhere.com/launch
RESPONDUS_LAUNCH_BASE_URL=https://respondus-somewhere.com/launch
```

### Generate Secure Tokens

```bash
# Generate INTERNAL_CRON_TOKEN
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → API Keys
3. Copy your Secret Key (starts with `sk_test_` or `sk_live_`)

### Get Zendesk Credentials

1. Go to Zendesk Admin Center
2. Navigate to Apps and integrations → APIs → Zendesk API
3. Enable Token Access
4. Create a new API token
5. Note your subdomain (e.g., `yourcompany` from `yourcompany.zendesk.com`)

---

## 3. Dependencies

All required dependencies are already installed:
- ✅ `stripe` (v19.1.0)
- ✅ `jsonwebtoken` (v9.0.2)
- ✅ `@stripe/stripe-js` (v8.1.0)

If you need to reinstall:
```bash
pnpm install
```

---

## 4. Feature Integration

### A. Service Worker Registration

Add to your root layout (`app/layout.tsx`):

```tsx
import { ServiceWorkerRegister } from '@/components/offline/ServiceWorkerRegister';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
```

### B. Support Ticket Form

Add to your help widget or create a support page:

```tsx
// In HelpWidget or app/support/page.tsx
import { SupportTicketForm } from '@/components/support/SupportTicketForm';

export function HelpWidget() {
  return (
    <div className="help-widget">
      <h3>Need Help?</h3>
      <SupportTicketForm />
    </div>
  );
}
```

### C. Help Center Search

Update your help page (`app/help/page.tsx`):

```tsx
import { HelpSearchBox } from '@/components/help/HelpSearchBox';

export default function HelpCenterPage() {
  return (
    <main>
      <h1>Help Center</h1>
      <HelpSearchBox />
      {/* Rest of your help content */}
    </main>
  );
}
```

---

## 5. Seed Initial Data

### Help Articles

```sql
INSERT INTO help_articles (slug, title, category, audience, body) VALUES
('getting-started', 'Getting Started with Elevate', 'Getting Started', 'student', 
 'Welcome to Elevate for Humanity! This guide will help you get started with your learning journey...'),
 
('how-to-enroll', 'How to Enroll in a Course', 'Courses', 'student',
 'To enroll in a course, navigate to the course catalog and click the Enroll button...'),
 
('attendance-tracking', 'Tracking Student Attendance', 'Instructors', 'instructor',
 'Instructors can track attendance by navigating to the course dashboard...'),
 
('wioa-reporting', 'WIOA Reporting Guide', 'Compliance', 'admin',
 'To generate WIOA reports, navigate to Reports → WIOA and select your date range...');
```

### Sample Question Bank

```sql
-- Create a question bank
INSERT INTO question_banks (id, title, description, created_by)
VALUES (
  gen_random_uuid(),
  'Barber Apprenticeship - Safety',
  'Safety and sanitation questions for barber apprentices',
  'admin-user-id'
);

-- Add questions
INSERT INTO questions (bank_id, type, difficulty, prompt, choices, correct_answer)
VALUES (
  'bank-id-from-above',
  'multiple_choice',
  'easy',
  'What is the proper way to sanitize scissors?',
  '[{"id":"A","text":"Wipe with a towel"},{"id":"B","text":"Use EPA-registered disinfectant"},{"id":"C","text":"Rinse with water"},{"id":"D","text":"Leave in sunlight"}]'::jsonb,
  '"B"'::jsonb
);
```

---

## 6. Set Up CRON Jobs

### Usage Reporting (Stripe)

Create a GitHub Action or external CRON to call the usage reporting endpoint:

```yaml
# .github/workflows/report-usage.yml
name: Report Usage to Stripe
on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM UTC
  workflow_dispatch:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - name: Report Usage
        run: |
          curl -X POST https://elevateforhumanity.org/api/billing/report-usage \
            -H "x-internal-token: ${{ secrets.INTERNAL_CRON_TOKEN }}" \
            -H "Content-Type: application/json"
```

Add `INTERNAL_CRON_TOKEN` to GitHub Secrets.

---

## 7. Testing

### Test Advanced Assessments

1. Create a question bank via Supabase
2. Add questions with different difficulty levels
3. Create an exam linked to the bank
4. Start an exam: `POST /api/exams/start`
5. Submit answers: `POST /api/exams/submit`
6. Verify score calculation

### Test Proctoring

1. Set `proctoring_required=true` on an exam
2. Set `proctoring_provider='proctorio'`
3. Start exam and verify `proctoringUrl` in response

### Test Billing

1. Create a tenant billing record with Stripe IDs
2. Insert usage records
3. Call `/api/billing/report-usage` with valid token
4. Check Stripe dashboard for usage records

### Test WIOA Reporting

1. Insert sample WIOA participant records
2. Call `/api/reports/wioa?start=2025-01-01&end=2025-12-31`
3. Verify CSV download

### Test LTI Integration

1. Access `/api/lti/config` - verify JSON response
2. Register tool in Canvas/Moodle test instance
3. Initiate LTI launch from external LMS
4. Verify user/course mapping

### Test Offline Mode

1. Load a course page
2. Open DevTools → Application → Service Workers
3. Verify service worker is registered
4. Disconnect network
5. Navigate to cached pages
6. Verify offline page shows when needed

### Test Zendesk Integration

1. Configure Zendesk credentials
2. Submit test ticket via form
3. Check Zendesk dashboard for new ticket
4. Verify email and tags

### Test Help Search

1. Seed help articles (see above)
2. Navigate to `/help`
3. Search for "enroll"
4. Verify results display
5. Click result to view article

---

## 8. Production Deployment

### Vercel Setup

1. Add all environment variables to Vercel project settings
2. Deploy: `vercel --prod`
3. Verify deployment health

### Database Migrations

```bash
# Run migrations on production database
psql $PRODUCTION_DATABASE_URL -f migrations/20251118_advanced_assessments.sql
psql $PRODUCTION_DATABASE_URL -f migrations/20251118_billing_and_wioa.sql
psql $PRODUCTION_DATABASE_URL -f migrations/20251118_lti_and_help.sql
```

### Verify Services

- [ ] Stripe webhook configured
- [ ] Zendesk API accessible
- [ ] Service worker registered
- [ ] Help search functional
- [ ] LTI endpoints accessible

---

## 9. Monitoring

### Set Up Alerts

Monitor these endpoints:
- `/api/exams/start` - Exam launches
- `/api/exams/submit` - Exam submissions
- `/api/billing/report-usage` - Usage reporting
- `/api/reports/wioa` - Compliance exports
- `/api/support/ticket` - Support tickets

### Key Metrics

Track:
- Exam completion rate
- Average exam scores
- Support ticket volume
- WIOA report downloads
- LTI launch success rate
- Offline mode usage

---

## 10. Documentation

### Update Admin Guides

Document for admins:
- How to create question banks
- How to configure exams
- How to generate WIOA reports
- How to register LTI platforms
- How to monitor usage billing

### Update User Guides

Document for users:
- How to take exams
- How to use offline mode
- How to submit support tickets
- How to search help articles

---

## Troubleshooting

### Exams Not Starting

- Check question bank has questions
- Verify exam configuration (time limit, max attempts)
- Check user hasn't exceeded max attempts

### Proctoring URL Not Returned

- Verify `proctoring_required=true` on exam
- Check `PROCTORIO_LAUNCH_BASE_URL` or `RESPONDUS_LAUNCH_BASE_URL` is set
- Verify `proctoring_provider` is set correctly

### Billing Not Reporting

- Check `STRIPE_SECRET_KEY` is valid
- Verify `INTERNAL_CRON_TOKEN` matches
- Check tenant has `stripe_subscription_id` and `price_id`
- Verify usage records exist with `reported_to_stripe=false`

### WIOA Export Empty

- Check date range includes participant records
- Verify `reporting_period_start` and `reporting_period_end` are set
- Check admin authentication

### LTI Launch Failing

- Verify platform is registered in `lti_platforms`
- Check `LTI_TOOL_URL` matches your domain
- Verify JWKS endpoint is accessible
- Check JWT token format (use jwt.io to decode)

### Zendesk Tickets Not Creating

- Verify `ZENDESK_SUBDOMAIN`, `ZENDESK_EMAIL`, `ZENDESK_API_TOKEN` are set
- Test API token with curl:
  ```bash
  curl https://your_subdomain.zendesk.com/api/v2/tickets.json \
    -u your_email/token:your_api_token
  ```

### Help Search Not Working

- Check `help_articles` table has data
- Verify search query is not empty
- Check Supabase connection

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the detailed documentation:
   - `ADVANCED_FEATURES_BATCH_1.md`
   - `ADVANCED_FEATURES_BATCH_2.md`
   - `ENTERPRISE_FEATURES_COMPLETE.md`
3. Submit a support ticket via the in-app form
4. Contact: support@elevateforhumanity.org

---

## Next Steps

After setup is complete:
1. ✅ Test all features in staging
2. ✅ Train admin users
3. ✅ Create user documentation
4. ✅ Deploy to production
5. ✅ Monitor for issues
6. ✅ Gather user feedback
7. ✅ Plan next enhancements

**Setup Date**: 2025-11-18  
**Version**: 2.0.0
