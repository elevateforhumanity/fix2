# 🚀 Vercel Deployment Guide

## Complete Setup Instructions

### Step 1: Copy Environment Variables to Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Copy and paste these variables (replace with your actual values):

```bash
# ===== DATABASE (REQUIRED) =====
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===== STRIPE PAYMENTS (REQUIRED) =====
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51...
STRIPE_SECRET_KEY=sk_live_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# ===== PAYPAL (REQUIRED) =====
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYour_PayPal_Client_ID
PAYPAL_CLIENT_SECRET=EYour_PayPal_Secret

# ===== AFFIRM (REQUIRED) =====
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=YOUR_AFFIRM_PUBLIC_KEY
AFFIRM_PRIVATE_KEY=YOUR_AFFIRM_PRIVATE_KEY

# ===== OPENAI (REQUIRED FOR AI CHAT) =====
OPENAI_API_KEY=sk-proj-...

# ===== EMAIL (REQUIRED) =====
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=noreply@elevateforhumanity.org

# ===== SMS (OPTIONAL) =====
TWILIO_ACCOUNT_SID=ACyour_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

# ===== ANALYTICS (RECOMMENDED) =====
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id

# ===== SITE CONFIG (REQUIRED) =====
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
NEXT_PUBLIC_APP_NAME=Elevate for Humanity

# ===== SECURITY (REQUIRED) =====
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://elevateforhumanity.org
SESSION_SECRET=generate_with_openssl_rand_base64_32

# ===== FEATURE FLAGS (OPTIONAL) =====
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_MOBILE_APP=true
NEXT_PUBLIC_ENABLE_FORUMS=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
```

### Step 2: Generate Secrets

Run these commands to generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate SESSION_SECRET
openssl rand -base64 32
```

### Step 3: Set Environment for Each Variable

For EACH variable above:
1. Click "Add New" in Vercel
2. Enter the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
3. Enter the **Value** (your actual value)
4. Select environments: **Production**, **Preview**, **Development**
5. Click "Save"

### Step 4: Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://elevateforhumanity.org/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook secret
6. Add to Vercel as `STRIPE_WEBHOOK_SECRET`

### Step 5: Configure PayPal Webhook

1. Go to PayPal Developer Dashboard → My Apps & Credentials
2. Select your app
3. Scroll to "Webhooks"
4. Add webhook URL: `https://elevateforhumanity.org/api/webhooks/paypal`
5. Select events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `CHECKOUT.ORDER.APPROVED`

### Step 6: Run Database Migration

```bash
# Connect to your Supabase database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# Or use Supabase SQL Editor and paste the migration file
```

Copy and paste the contents of:
`supabase/migrations/20241212_complete_production_setup.sql`

### Step 7: Verify Build

1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on latest deployment
3. Watch build logs for errors
4. Build should complete successfully

### Step 8: Test Production Site

Visit your site and test:

✅ Homepage loads
✅ Programs page loads
✅ Course enrollment works
✅ Payment processing works
✅ AI chat widget appears
✅ Forums accessible
✅ Mobile responsive

### Step 9: Configure Domain (if not done)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain: `elevateforhumanity.org`
3. Add www subdomain: `www.elevateforhumanity.org`
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### Step 10: Enable Analytics

1. Go to Vercel Dashboard → Analytics
2. Enable Web Analytics
3. Enable Speed Insights
4. View real-time data

---

## Quick Copy-Paste Commands

### Generate All Secrets at Once

```bash
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "SESSION_SECRET=$(openssl rand -base64 32)"
```

### Test Environment Variables Locally

```bash
# Create .env.local file
cp .env.production.example .env.local

# Edit with your values
nano .env.local

# Test build
npm run build

# Test production mode
npm start
```

### Verify Stripe Integration

```bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test payment
stripe trigger payment_intent.succeeded
```

---

## Troubleshooting

### Build Fails

**Error:** "Missing environment variable"
**Solution:** Add the variable in Vercel dashboard

**Error:** "Module not found"
**Solution:** Clear build cache and redeploy

**Error:** "Database connection failed"
**Solution:** Check Supabase URL and keys

### Payments Not Working

**Error:** "Stripe not configured"
**Solution:** Verify all Stripe keys are set

**Error:** "Webhook signature invalid"
**Solution:** Update `STRIPE_WEBHOOK_SECRET`

### AI Chat Not Working

**Error:** "OpenAI API error"
**Solution:** Verify `OPENAI_API_KEY` is set

**Error:** "Rate limit exceeded"
**Solution:** Upgrade OpenAI plan or implement caching

---

## Security Checklist

- [ ] All secrets are set in Vercel (not in code)
- [ ] NEXTAUTH_SECRET is random and secure
- [ ] SESSION_SECRET is random and secure
- [ ] Stripe webhook secret is configured
- [ ] PayPal credentials are production keys
- [ ] OpenAI API key has usage limits set
- [ ] Database has Row Level Security enabled
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] SSL certificate is active

---

## Performance Optimization

### Enable Caching

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Enable Compression

Vercel automatically enables:
- Gzip compression
- Brotli compression
- Image optimization

### Monitor Performance

1. Go to Vercel Dashboard → Speed Insights
2. Check Core Web Vitals
3. Optimize slow pages

---

## Monitoring & Alerts

### Set Up Alerts

1. Go to Vercel Dashboard → Settings → Notifications
2. Enable:
   - Deployment failed
   - Build errors
   - Performance degradation
   - Uptime monitoring

### View Logs

```bash
# Install Vercel CLI
npm i -g vercel

# View logs
vercel logs

# View specific deployment
vercel logs [deployment-url]
```

---

## Backup & Recovery

### Database Backups

Supabase automatically backs up daily. To restore:

1. Go to Supabase Dashboard → Database → Backups
2. Select backup date
3. Click "Restore"

### Code Backups

All code is in Git. To rollback:

```bash
# View deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

---

## Support

If you encounter issues:

1. Check Vercel build logs
2. Check Supabase logs
3. Check browser console
4. Contact support: support@elevateforhumanity.org

---

**Last Updated:** December 2024
**Status:** Production Ready ✅
