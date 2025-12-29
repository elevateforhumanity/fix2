# Email Service Setup Guide

Complete guide to connecting the email service (Resend) to your application.

## Status: ✅ Code Ready - Just Add API Key

The email service is **fully integrated** in the codebase. You just need to add the API key.

## What's Already Done

✅ Email service code implemented (`lib/email.ts`)
✅ Functions created:
  - `sendEmail()` - Generic email sending
  - `sendWelcomeEmail()` - License activation emails
  - `sendEnrollmentEmail()` - Program enrollment emails
✅ API routes updated:
  - `/api/affirm-charge` - Sends enrollment emails
  - `/api/store/licenses/webhook` - Sends welcome emails
✅ Graceful fallback if API key not set
✅ Error handling for email failures
✅ Tests written

## Step 1: Get Resend API Key

### Option A: Use Existing Key (If You Have One)

If you already have a Resend account:
1. Go to https://resend.com/api-keys
2. Copy your API key (starts with `re_`)
3. Skip to Step 2

### Option B: Create New Account (Free)

1. Go to https://resend.com
2. Click "Sign Up" (free tier: 100 emails/day)
3. Verify your email
4. Go to **API Keys** in dashboard
5. Click "Create API Key"
6. Name it: "Elevate Production"
7. Copy the key (starts with `re_`)
8. **Save it securely** - you won't see it again

## Step 2: Add to Vercel

### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Set:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_key_here`
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your application

### Via Vercel CLI

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Add environment variable
vercel env add RESEND_API_KEY

# When prompted:
# - Enter your API key
# - Select all environments
# - Confirm

# Redeploy
vercel --prod
```

## Step 3: Verify Domain (Required for Production)

Resend requires domain verification to send emails from your domain.

### Add Domain

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `elevateforhumanity.org`
4. Click "Add"

### Add DNS Records

Resend will show you DNS records to add. Add these to your DNS provider:

**Example records** (yours will be different):
```
Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT  
Name: @
Value: [provided by Resend]
```

### Verify

1. Wait 5-10 minutes for DNS propagation
2. Click "Verify" in Resend dashboard
3. Status should change to "Verified"

**Note**: Until verified, emails will come from `onboarding@resend.dev`

## Step 4: Test Email Service

### Test in Development

```bash
# Set API key locally
echo "RESEND_API_KEY=re_your_key_here" >> .env.local

# Start dev server
npm run dev

# Test enrollment flow
# 1. Go to /apply
# 2. Fill out application
# 3. Submit
# 4. Check email inbox
```

### Test in Production

1. Go to your live site
2. Complete an enrollment or license purchase
3. Check email inbox
4. Verify email received

### Check Logs

**Vercel Logs**:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Logs**
4. Filter for "email"
5. Look for success/error messages

**Resend Logs**:
1. Go to https://resend.com/emails
2. See all sent emails
3. Check delivery status
4. View email content

## Step 5: Configure Email Settings (Optional)

### Custom From Address

After domain verification, update `lib/email.ts`:

```typescript
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@elevateforhumanity.org';
```

Add to Vercel environment variables:
```
EMAIL_FROM=noreply@elevateforhumanity.org
REPLY_TO_EMAIL=info@elevateforhumanity.org
```

### Email Templates

Email templates are in `lib/email.ts`. To customize:

1. Edit HTML in `sendWelcomeEmail()` or `sendEnrollmentEmail()`
2. Test locally
3. Deploy changes

## Troubleshooting

### Emails Not Sending

**Check 1: API Key Set**
```bash
# In Vercel dashboard
Settings → Environment Variables → RESEND_API_KEY
```

**Check 2: Logs**
```bash
# Check Vercel logs for errors
vercel logs

# Look for:
# ✅ "Email sent successfully"
# ❌ "Failed to send email"
```

**Check 3: Resend Dashboard**
- Go to https://resend.com/emails
- Check if emails appear (even if failed)
- Check error messages

### Emails Going to Spam

**Solutions**:
1. Verify domain (required)
2. Add SPF record
3. Add DKIM record (Resend provides)
4. Warm up domain (send gradually)
5. Avoid spam trigger words

### Rate Limits

**Free Tier**: 100 emails/day
**Paid Tier**: 50,000+ emails/month

If hitting limits:
1. Upgrade plan at https://resend.com/pricing
2. Or use alternative service (SendGrid, Mailgun)

### Domain Not Verifying

**Common Issues**:
1. DNS records not added correctly
2. DNS not propagated (wait 24 hours)
3. Wrong DNS provider
4. Cloudflare proxy enabled (disable for verification)

**Fix**:
1. Double-check DNS records
2. Use DNS checker: https://dnschecker.org
3. Wait for propagation
4. Contact Resend support

## Alternative Email Services

If you prefer a different service, update `lib/email.ts`:

### SendGrid

```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from },
    subject,
    content: [{ type: 'text/html', value: html }],
  }),
});
```

### Mailgun

```typescript
const response = await fetch(
  `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
  {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      from,
      to,
      subject,
      html,
    }),
  }
);
```

## Monitoring

### Email Delivery Rates

Check in Resend dashboard:
- Sent: Total emails sent
- Delivered: Successfully delivered
- Bounced: Failed delivery
- Complained: Marked as spam

### Set Up Alerts

1. Go to Resend dashboard
2. Settings → Webhooks
3. Add webhook URL: `https://your-site.com/api/webhooks/email`
4. Select events: delivered, bounced, complained
5. Handle in your app

## Cost

**Resend Pricing**:
- Free: 100 emails/day, 3,000/month
- Pro: $20/month, 50,000 emails
- Enterprise: Custom pricing

**Recommendation**: Start with free tier, upgrade as needed.

## Security

### Protect API Key

✅ Never commit API key to git
✅ Use environment variables only
✅ Rotate keys periodically
✅ Use different keys for dev/prod

### Email Content

✅ Sanitize user input in emails
✅ Don't include sensitive data
✅ Use HTTPS links only
✅ Include unsubscribe link (if marketing)

## Status Check

Run this to verify email service is ready:

```bash
# Check if API key is set
vercel env ls | grep RESEND_API_KEY

# Should show:
# RESEND_API_KEY (Production, Preview, Development)
```

## Next Steps

After email service is connected:

1. ✅ Test enrollment email
2. ✅ Test welcome email
3. ✅ Verify domain
4. ✅ Monitor delivery rates
5. ✅ Set up webhooks (optional)
6. ✅ Customize templates (optional)

---

**Current Status**: ✅ Code ready, just add `RESEND_API_KEY` to Vercel

**Time to Setup**: 5-10 minutes

**Difficulty**: Easy

**Support**: https://resend.com/docs

---

**Last Updated**: 2025-12-29
