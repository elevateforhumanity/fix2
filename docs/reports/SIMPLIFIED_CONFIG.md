# Simplified Configuration - Using Zapier

Since you have Zapier set up, we can skip the complex social media API configuration!

---

## What We'll Use

### Social Media: Zapier Webhooks ✅

- **Already set up:** Zapier Zaps for Facebook, LinkedIn, YouTube
- **No API tokens needed:** Zapier handles authentication
- **Simpler:** Just webhook URLs

### Direct APIs: Skip for Now ❌

- Facebook API tokens - **NOT NEEDED** (using Zapier)
- Instagram API tokens - **NOT NEEDED** (using Zapier)
- LinkedIn API tokens - **NOT NEEDED** (using Zapier)

---

## Required Configuration (Reduced to 4 items!)

### 1. Supabase Migrations (YOU - 15 min)

Run 4 SQL migrations in Supabase dashboard

### 2. Stripe (YOU - 10 min)

Get test API keys and webhook secret

### 3. Zapier Webhooks (YOU - 5 min)

Provide your actual Zapier webhook URLs

### 4. Optional but Recommended:

- OpenAI (for AI content generation)
- Sentry (for error monitoring)
- Slack (for alerts)

---

## Step-by-Step

### Step 1: Run Supabase Migrations

Go to: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/editor

Click "SQL Editor" → "New Query"

**Run these 4 migrations (copy-paste each one):**

1. `supabase/migrations/20250127_create_automation_tables.sql`
2. `supabase/migrations/20250127_create_stripe_split_tables.sql`
3. `supabase/migrations/20250127_create_generated_content.sql`
4. `supabase/migrations/20250127_create_scholarship_applications.sql`

---

### Step 2: Get Stripe Keys

Go to: https://dashboard.stripe.com/test/apikeys

**Copy these:**

```
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Go to: https://dashboard.stripe.com/test/webhooks

**Create webhook:**

- URL: `https://www.elevateforhumanity.org/.netlify/functions/stripe-webhook`
- Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

**Copy this:**

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### Step 3: Get Zapier Webhook URLs

Go to: https://zapier.com/app/zaps

**Find your Zaps and copy webhook URLs:**

```
VITE_ZAPIER_FACEBOOK_WEBHOOK=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY
VITE_ZAPIER_LINKEDIN_WEBHOOK=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY
VITE_ZAPIER_YOUTUBE_WEBHOOK=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY
```

---

### Step 4: Optional - Get These Too

**OpenAI (for AI content):**

- Go to: https://platform.openai.com/api-keys
- `OPENAI_API_KEY=sk-proj-...`

**Sentry (for monitoring):**

- Go to: https://sentry.io
- `SENTRY_DSN=https://...@sentry.io/...`
- `VITE_SENTRY_DSN=https://...@sentry.io/...`

**Slack (for alerts):**

- Go to: https://api.slack.com/apps
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...`

---

## Paste Your Keys Here

**Once you have them, paste them in this format:**

```bash
# REQUIRED
STRIPE_SECRET_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# ZAPIER (if you have them)
VITE_ZAPIER_FACEBOOK_WEBHOOK=
VITE_ZAPIER_LINKEDIN_WEBHOOK=
VITE_ZAPIER_YOUTUBE_WEBHOOK=

# OPTIONAL
OPENAI_API_KEY=
SENTRY_DSN=
VITE_SENTRY_DSN=
SLACK_WEBHOOK_URL=
```

**I'll add them to Netlify and test everything!**

---

## What This Enables

### With Just Stripe:

- ✅ Payment processing
- ✅ Donation pages
- ✅ Revenue splits (50% EFH / 50% Partners)
- ✅ Enrollment tracking
- ✅ Scholarship applications

### With Zapier Added:

- ✅ Social media posting via Zapier
- ✅ Automated content distribution

### With OpenAI Added:

- ✅ AI-generated social media content
- ✅ Automated content calendar

### With Sentry + Slack Added:

- ✅ Error monitoring
- ✅ Real-time alerts
- ✅ System health checks

---

## Ready?

**Tell me:**

1. Have you run the Supabase migrations?
2. Can you paste your Stripe keys?
3. Can you paste your Zapier webhook URLs?

**Then I'll configure everything!**
