# Production Setup Guide

## Step 1: Run Database Migrations

### Via Supabase Dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to SQL Editor
4. Run each migration file in order:

```sql
-- 1. Funding Verification
-- Copy contents of: supabase/migrations/20251222_add_funding_verification.sql

-- 2. Lesson Time Tracking
-- Copy contents of: supabase/migrations/20251222_add_lesson_time_tracking.sql

-- 3. Certificate Revocation
-- Copy contents of: supabase/migrations/20251222_add_certificate_revocation.sql

-- 4. Forum Moderation
-- Copy contents of: supabase/migrations/20251222_add_forum_moderation.sql

-- 5. Follow-up Tracking
-- Copy contents of: supabase/migrations/20251222_add_followup_tracking.sql
```

### Via Supabase CLI (Alternative):

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

---

## Step 2: Configure Resend API for Email Alerts

### Get Resend API Key:

1. Go to https://resend.com
2. Sign up or log in
3. Navigate to API Keys
4. Create new API key
5. Copy the key (starts with `re_`)

### Add to Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_api_key_here`
   - **Environments:** Production, Preview, Development

### Verify Domain (Required for production):

1. In Resend dashboard, go to Domains
2. Add domain: `elevateforhumanity.org`
3. Add DNS records provided by Resend:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
4. Wait for verification (usually 5-10 minutes)

### Test Email Alerts:

```bash
# Test via API route
curl -X POST https://elevateforhumanity.org/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

---

## Step 3: Configure Cloudflare Turnstile

### Get Turnstile Keys:

1. Go to https://dash.cloudflare.com
2. Select your account
3. Navigate to Turnstile
4. Create new site:
   - **Domain:** `elevateforhumanity.org`
   - **Widget Mode:** Managed (recommended)
5. Copy Site Key and Secret Key

### Add to Vercel:

1. Go to Vercel project settings
2. Environment Variables
3. Add two variables:
   - **Name:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Value:** Your site key
   - **Environments:** Production, Preview, Development
   - **Name:** `TURNSTILE_SECRET_KEY`
   - **Value:** Your secret key
   - **Environments:** Production, Preview, Development

### Add Turnstile Widget to Forms:

Already implemented in:

- Application form (`/app/apply/ApplyFormClient.tsx`)
- Contact form (via spam-protection.ts)

Widget will automatically appear when keys are configured.

---

## Step 4: Set Up Vercel Cron for SAM.gov Sync

### Create Cron Secret:

1. Generate a random secret:

```bash
openssl rand -base64 32
```

2. Add to Vercel Environment Variables:
   - **Name:** `CRON_SECRET`
   - **Value:** Your generated secret
   - **Environments:** Production

### Configure Vercel Cron:

Create `vercel.json` in project root:

```json
{
  "crons": [
    {
      "path": "/api/sam-gov/sync",
      "schedule": "0 6 * * *"
    }
  ]
}
```

This runs daily at 6 AM EST.

### Verify Cron Setup:

1. Deploy to Vercel
2. Go to Vercel Dashboard → Cron Jobs
3. Verify job is listed
4. Check logs after first run

### Manual Trigger (for testing):

```bash
curl -X GET https://elevateforhumanity.org/api/sam-gov/sync \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## Environment Variables Summary

Add these to Vercel:

```env
# Email Alerts
RESEND_API_KEY=re_your_key_here

# Spam Protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# Cron Jobs
CRON_SECRET=your_random_secret_here

# Already configured (verify these exist):
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Verification Checklist

After completing steps 1-4:

### Database Migrations:

- [ ] All 5 migrations applied successfully
- [ ] No errors in Supabase logs
- [ ] New tables visible in database

### Email Alerts:

- [ ] Resend API key added to Vercel
- [ ] Domain verified in Resend
- [ ] Test email sent successfully
- [ ] Emails arriving in inbox (not spam)

### Spam Protection:

- [ ] Turnstile keys added to Vercel
- [ ] Widget appears on forms
- [ ] Form submission works with verification
- [ ] Bot submissions blocked

### Cron Jobs:

- [ ] Cron secret added to Vercel
- [ ] vercel.json configured
- [ ] Cron job listed in Vercel dashboard
- [ ] SAM.gov sync running daily
- [ ] New opportunities appearing in database

---

## Troubleshooting

### Migrations Fail:

- Check for existing columns/tables
- Run migrations one at a time
- Check Supabase logs for specific errors

### Emails Not Sending:

- Verify API key is correct
- Check domain verification status
- Look for errors in Vercel logs
- Check Resend dashboard for delivery status

### Turnstile Not Appearing:

- Verify site key is public (NEXT*PUBLIC*)
- Check browser console for errors
- Ensure domain matches Turnstile configuration

### Cron Not Running:

- Verify cron secret matches
- Check Vercel cron logs
- Ensure route returns 200 status
- Verify schedule syntax

---

## Next Steps After Configuration

1. **Test All Features:**
   - Submit application (verify email alert)
   - Create forum post (verify moderation)
   - Complete lesson (verify time tracking)
   - Check SAM.gov sync (verify daily updates)

2. **Train Staff:**
   - Show audit dashboards
   - Explain review cadences
   - Demonstrate moderation queue
   - Review enforcement tools

3. **Monitor:**
   - Check email delivery rates
   - Review spam protection effectiveness
   - Monitor cron job success
   - Watch database performance

4. **Iterate:**
   - Adjust SLAs based on actual performance
   - Refine spam protection rules
   - Update policies as needed
   - Improve based on feedback

---

**Status:** Ready to configure production environment
**Estimated Time:** 30-45 minutes
**Difficulty:** Intermediate (requires API keys and DNS configuration)
