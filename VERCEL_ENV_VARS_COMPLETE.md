# Vercel Environment Variables - Complete List

**Last Updated:** December 29, 2025  
**Total Variables:** 66 (minimum) to 215 (complete)

---

## 🚨 CRITICAL - Must Have (15 variables)

These are **absolutely required** for the application to function:

### Database & Authentication
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Site Configuration
```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXTAUTH_SECRET=your-secret-here-min-32-chars
NEXTAUTH_URL=https://www.elevateforhumanity.org
NODE_ENV=production
```

### Payments (Stripe)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email (Resend)
```bash
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@elevateforhumanity.org
```

### AI Services
```bash
OPENAI_API_KEY=sk-proj-...
```

### Monitoring
```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

---

## ⚠️ HIGH PRIORITY - Should Have (20 variables)

These enable key features:

### Redis (Caching)
```bash
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

### Additional Payment Options
```bash
AFFIRM_PUBLIC_KEY=...
AFFIRM_PRIVATE_KEY=...
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=...
```

### Email Alternatives
```bash
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=noreply@elevateforhumanity.org
```

### SMTP (Backup Email)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=Elevate for Humanity <noreply@elevateforhumanity.org>
```

### Notifications
```bash
NOTIFY_EMAIL_TO=admin@elevateforhumanity.org
ALERT_EMAIL=admin@elevateforhumanity.org
```

### Vercel Integration
```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=your-project-id
```

---

## 📊 MEDIUM PRIORITY - Nice to Have (31 variables)

These enable additional features:

### SSO Options
```bash
# Azure AD
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
AZURE_AD_ENABLED=false

# Auth0
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_ISSUER_BASE_URL=...

# Clerk
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
```

### Additional Payment Gateways
```bash
# Authorize.NET
AUTHORIZE_NET_API_LOGIN_ID=...
AUTHORIZE_NET_TRANSACTION_KEY=...
AUTHORIZE_NET_ENVIRONMENT=production

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=live
```

### Additional AI Services
```bash
ANTHROPIC_API_KEY=...
ELEVENLABS_API_KEY=...
REPLICATE_API_TOKEN=...
```

### Email Services
```bash
MAILGUN_API_KEY=...
MAILGUN_DOMAIN=...
```

### Analytics & Tracking
```bash
GOOGLE_ANALYTICS_ID=G-...
FACEBOOK_PIXEL_ID=...
GOOGLE_TAG_MANAGER_ID=GTM-...
```

### Social Media
```bash
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
```

---

## 🔧 OPTIONAL - Partner Integrations (150+ variables)

These are for specific partner integrations. Only add if you're using these services:

### Education Partners
```bash
# CareerSafe (OSHA Training)
CAREERSAFE_API_KEY=...
CAREERSAFE_ORGANIZATION_ID=...

# Certiport (Testing)
CERTIPORT_API_KEY=...
CERTIPORT_SITE_ID=...

# HSI (Health & Safety)
HSI_API_KEY=...
HSI_ACCOUNT_ID=...

# Milady (Beauty Industry)
MILADY_API_KEY=...
MILADY_SCHOOL_ID=...

# NRF (Retail)
NRF_API_KEY=...
NRF_MEMBER_ID=...

# Pearson (Testing)
PEARSON_API_KEY=...
PEARSON_CLIENT_ID=...
```

### Financial Services
```bash
# Drake Tax Software
DRAKE_API_KEY=...
DRAKE_FIRM_ID=...

# EOS Financial
EOS_API_KEY=...
EOS_PARTNER_ID=...

# EPS Financial
EPS_API_KEY=...
EPS_MERCHANT_ID=...
```

### Workforce Partners
```bash
# WorkOne Indiana
WORKONE_API_KEY=...
WORKONE_REGION_ID=...

# FSSA (Family & Social Services)
FSSA_API_KEY=...
FSSA_PROVIDER_ID=...

# DWD (Department of Workforce Development)
DWD_API_KEY=...
DWD_PROVIDER_NUMBER=...
```

---

## 📋 How to Add to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. For each variable:
   - Click **Add New**
   - Name: `VARIABLE_NAME`
   - Value: `your-value-here`
   - Select environments: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add variables one by one
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste value when prompted
# Select: Production, Preview, Development

# Or add from file
vercel env pull .env.local
# Edit .env.local
vercel env push .env.local
```

### Method 3: Bulk Import

```bash
# Create a file: vercel-env.txt
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
# ... etc

# Import (requires Vercel CLI)
cat vercel-env.txt | while read line; do
  if [[ $line =~ ^([^=]+)=(.+)$ ]]; then
    name="${BASH_REMATCH[1]}"
    value="${BASH_REMATCH[2]}"
    echo "$value" | vercel env add "$name" production preview development
  fi
done
```

---

## ✅ Verification Checklist

### After Adding Variables

```bash
# 1. Check Vercel dashboard
# Settings → Environment Variables
# Should see all variables listed

# 2. Redeploy
vercel --prod

# 3. Test health endpoint
curl https://www.elevateforhumanity.org/api/health

# 4. Check response
# Should return 200 (healthy) not 503 (degraded)
```

### Common Issues

**Variables not working?**
- ✅ Check spelling (case-sensitive)
- ✅ Verify `NEXT_PUBLIC_` prefix for client-side vars
- ✅ Redeploy after adding variables
- ✅ Check environment selection (Production/Preview/Development)

---

## 🎯 Quick Start Guide

### Minimum Viable Configuration (15 variables)

```bash
# 1. Database (3 variables)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 2. Site (3 variables)
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://www.elevateforhumanity.org

# 3. Payments (3 variables)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# 4. Email (2 variables)
RESEND_API_KEY=
EMAIL_FROM=noreply@elevateforhumanity.org

# 5. AI (1 variable)
OPENAI_API_KEY=

# 6. Monitoring (1 variable)
NEXT_PUBLIC_SENTRY_DSN=

# 7. Environment (2 variables)
NODE_ENV=production
VERCEL_ENV=production
```

---

## 🔐 Security Best Practices

### DO ✅
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep secrets in Vercel (never commit)
- Use different keys for dev/staging/production
- Rotate keys regularly
- Use environment-specific values

### DON'T ❌
- Commit `.env.local` to git
- Share secrets in Slack/email
- Use production keys in development
- Hardcode secrets in code
- Expose service role keys to client

---

## 📊 Variable Categories

### By Priority

| Priority | Count | Time to Configure |
|----------|-------|-------------------|
| Critical | 15 | 15 minutes |
| High | 20 | 20 minutes |
| Medium | 31 | 30 minutes |
| Optional | 150+ | As needed |

### By Feature

| Feature | Variables | Required? |
|---------|-----------|-----------|
| Database | 3 | ✅ Yes |
| Authentication | 3 | ✅ Yes |
| Payments | 3-10 | ✅ Yes |
| Email | 2-8 | ✅ Yes |
| AI | 1-4 | ⚠️ Recommended |
| Monitoring | 1-3 | ⚠️ Recommended |
| SSO | 0-12 | ❌ Optional |
| Partners | 0-150+ | ❌ Optional |

---

## 🚀 Deployment Impact

### With Minimum Variables (15)
- ✅ Site loads
- ✅ Database works
- ✅ Auth works
- ✅ Payments work
- ✅ Email works
- ⚠️ Some features limited

### With Recommended Variables (35)
- ✅ All core features
- ✅ Monitoring active
- ✅ Caching enabled
- ✅ Multiple payment options
- ✅ Email redundancy
- ✅ Production-ready

### With All Variables (215)
- ✅ All features enabled
- ✅ All partners integrated
- ✅ Maximum functionality
- ⚠️ Complex to maintain

---

## 📝 Template Files

### For Local Development
```bash
# Copy template
cp .env.example .env.local

# Or use complete template
cp .env.template.complete .env.local

# Fill in values
nano .env.local
```

### For Vercel
```bash
# Pull from Vercel
vercel env pull .env.local

# Push to Vercel
vercel env push .env.local
```

---

## 🎓 Learning Resources

### Where to Get Values

**Supabase:**
- Dashboard → Project Settings → API
- Copy URL and keys

**Stripe:**
- Dashboard → Developers → API keys
- Copy publishable and secret keys
- Webhooks → Add endpoint → Copy secret

**Resend:**
- Dashboard → API Keys
- Create new key

**OpenAI:**
- Platform → API keys
- Create new secret key

**Sentry:**
- Project Settings → Client Keys (DSN)
- Copy DSN

---

## ⚡ Quick Commands

```bash
# List all variables in Vercel
vercel env ls

# Pull variables to local
vercel env pull .env.local

# Add a variable
vercel env add VARIABLE_NAME

# Remove a variable
vercel env rm VARIABLE_NAME

# Check which variables are set
grep -v '^#' .env.local | grep -v '^$' | wc -l
```

---

## 🎯 Recommended Setup Order

1. **Database** (5 min)
   - Supabase URL and keys

2. **Site Config** (2 min)
   - Site URL, NextAuth secret

3. **Payments** (5 min)
   - Stripe keys and webhook

4. **Email** (3 min)
   - Resend API key

5. **Monitoring** (5 min)
   - Sentry DSN

6. **AI** (2 min)
   - OpenAI key

7. **Redis** (3 min)
   - Upstash URL and token

**Total: 25 minutes for production-ready setup**

---

## 📞 Support

**Need Help?**
- Check `.env.example` for variable names
- Check `.env.template.complete` for all variables
- Read service documentation for getting keys
- Contact support if stuck

---

## ✅ Final Checklist

- [ ] All critical variables added (15)
- [ ] All high priority variables added (20)
- [ ] Variables added to all environments
- [ ] Redeployed after adding variables
- [ ] Health endpoint returns 200
- [ ] Site loads without errors
- [ ] Payments work
- [ ] Email works
- [ ] Monitoring active

---

**Status:** Ready to configure  
**Time Required:** 25-45 minutes  
**Difficulty:** Easy  
**Impact:** Critical - Site won't work without these

**Start here:** Add the 15 critical variables first, then test!
