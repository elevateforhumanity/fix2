# Let's Configure Everything Now

I'll configure what I can access, and you provide what I need.

---

## Step 1: Supabase Migrations (YOU DO THIS - 15 min)

**I can't run these without service_role key, so you need to:**

1. Go to: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/editor
2. Click "SQL Editor" → "New Query"
3. Copy-paste each migration file and click "Run"

**Migration 1: Automation Tables**

```sql
-- Copy entire contents from: supabase/migrations/20250127_create_automation_tables.sql
-- Creates: students, enrollments, job_placements, activity_log, reports
```

**Migration 2: Stripe Split Tables**

```sql
-- Copy entire contents from: supabase/migrations/20250127_create_stripe_split_tables.sql
-- Creates: instructors, split_payouts, instructor_programs
```

**Migration 3: Generated Content**

```sql
-- Copy entire contents from: supabase/migrations/20250127_create_generated_content.sql
-- Creates: generated_content
```

**Migration 4: Scholarship Applications**

```sql
-- Copy entire contents from: supabase/migrations/20250127_create_scholarship_applications.sql
-- Creates: scholarship_applications, documents storage bucket
```

**Tell me when done!**

---

## Step 2: Get API Keys (YOU PROVIDE - 10 min)

**I need you to get these and paste them here:**

### Stripe (Required)

Go to: https://dashboard.stripe.com/test/apikeys

```
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Then go to: https://dashboard.stripe.com/test/webhooks

- Create endpoint: `https://www.elevateforhumanity.org/.netlify/functions/stripe-webhook`
- Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

### OpenAI (Required for content generation)

Go to: https://platform.openai.com/api-keys

```
OPENAI_API_KEY=sk-proj-...
```

### Sentry (Required for monitoring)

Go to: https://sentry.io/organizations/YOUR_ORG/projects/

```
SENTRY_DSN=https://...@sentry.io/...
VITE_SENTRY_DSN=https://...@sentry.io/...
```

### Slack (Required for alerts)

Go to: https://api.slack.com/apps

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

### Social Media (Optional - can add later)

**Facebook:**

```
FACEBOOK_PAGE_ID=...
FACEBOOK_PAGE_ACCESS_TOKEN=...
```

**Instagram:**

```
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
INSTAGRAM_ACCESS_TOKEN=...
```

**LinkedIn:**

```
LINKEDIN_COMPANY_ID=...
LINKEDIN_ACCESS_TOKEN=...
```

---

## Step 3: I'll Add to Netlify (I DO THIS - 5 min)

Once you provide the keys above, I'll:

1. Add them to Netlify environment variables
2. Trigger a redeploy
3. Test all functions

---

## Step 4: Test Everything (WE DO TOGETHER - 30 min)

I'll test each function and show you the results.

---

## Quick Start Option

**If you want to start with just the essentials:**

1. Run Supabase migrations (you)
2. Provide Stripe keys (you)
3. I add to Netlify (me)
4. Test payments (we test)

**Everything else can be added later!**

---

## What Do You Want to Do?

**Option A:** Give me all the keys now (full configuration)
**Option B:** Just Stripe for now (minimum viable)
**Option C:** Give me dashboard access (I'll get the keys)

**Which option?**
