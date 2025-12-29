# API Keys and Configuration Needed

## Status: READY FOR CONFIGURATION

All features are built. Add these API keys to `.env.local` to activate everything.

---

## 🔑 Required API Keys

### 1. GitHub Integration (Code Editor)

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

**How to Get:**

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `workflow`, `write:packages`
4. For OAuth: https://github.com/settings/developers

**Used For:**

- Admin code editor
- Commit/push from dashboard
- Repository management

---

### 2. HubSpot CRM (Optional - CRM works without it)

```bash
HUBSPOT_API_KEY=your_api_key
HUBSPOT_PORTAL_ID=your_portal_id
```

**How to Get:**

1. Go to https://app.hubspot.com/
2. Settings → Integrations → API Key
3. Copy Portal ID from URL

**Used For:**

- CRM sync with HubSpot
- Contact import/export
- Campaign management

**Note:** CRM works standalone without HubSpot integration

---

### 3. Social Media Automation

#### Facebook/Instagram

```bash
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_ACCESS_TOKEN=your_access_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_account_id
```

**How to Get:**

1. Go to https://developers.facebook.com/
2. Create app → Business type
3. Add Instagram Graph API
4. Get long-lived access token

#### TikTok

```bash
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
```

**How to Get:**

1. Go to https://developers.tiktok.com/
2. Create app
3. Apply for Content Posting API

#### YouTube

```bash
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
```

**How to Get:**

1. Go to https://console.cloud.google.com/
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials

#### Twitter/X

```bash
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
TWITTER_BEARER_TOKEN=your_bearer_token
```

**How to Get:**

1. Go to https://developer.twitter.com/
2. Create project and app
3. Generate keys under "Keys and tokens"

#### LinkedIn

```bash
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_ACCESS_TOKEN=your_access_token
```

**How to Get:**

1. Go to https://www.linkedin.com/developers/
2. Create app
3. Request access to Share on LinkedIn API

**Used For:**

- Automated posting 3x daily
- Cross-platform content distribution
- Social media scheduling

---

### 4. IRS/Tax Services

```bash
IRS_EFIN=your_efin_number
TAX_SOFTWARE_LICENSE=your_license_key
VITA_SITE_ID=your_site_id
```

**How to Get:**

1. EFIN: Apply at https://www.irs.gov/e-file-providers
2. VITA Site ID: Register at https://www.irs.gov/individuals/irs-tax-volunteers
3. Tax software license: From your tax software provider

**Used For:**

- VITA program operations
- E-filing tax returns
- IRS compliance tracking

---

### 5. EPS Financial (Banking Partner)

```bash
EPS_API_KEY=your_api_key
EPS_PARTNER_ID=your_partner_id
EPS_ENVIRONMENT=sandbox # or production
```

**How to Get:**

1. Contact EPS Financial representative
2. Request API credentials
3. Get partner ID from Drake Software integration

**Used For:**

- Refund advance products
- Banking services integration
- Payment processing

---

### 6. Email/Notifications (Already Partially Configured)

```bash
RESEND_API_KEY=re_your_key_here
SENDGRID_API_KEY=SG.your_key_here
```

**How to Get:**

- Resend: https://resend.com/api-keys
- SendGrid: https://app.sendgrid.com/settings/api_keys

**Used For:**

- Email notifications
- Appointment confirmations
- Status updates

---

### 7. Stripe (Payment Processing - Already Configured)

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_your_key
STRIPE_SECRET_KEY=sk_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

**Status:** ✅ Already configured
**Used For:**

- Payment processing
- Subscription management
- Checkout flows

---

### 8. Supabase (Database - Already Configured)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Status:** ✅ Already configured
**Used For:**

- Database operations
- Authentication
- File storage

---

## 📝 Configuration Priority

### Tier 1 - Critical (Activate First)

1. ✅ Supabase - Already configured
2. ✅ Stripe - Already configured
3. 🔄 Email (Resend/SendGrid) - Partially configured
4. 🔄 GitHub - For code editor

### Tier 2 - Important (Activate Soon)

5. Social Media APIs - For automation
6. IRS/VITA credentials - For tax services
7. EPS Financial - For banking integration

### Tier 3 - Optional (Enhance Later)

8. HubSpot - CRM works without it
9. Additional integrations

---

## 🚀 Quick Start

### Option 1: Manual Configuration

1. Copy `.env.example` to `.env.local`
2. Add API keys one by one
3. Test each feature as you add keys

### Option 2: Vercel Integration (Recommended)

```bash
# Pull environment variables from Vercel
vercel env pull .env.local
```

### Option 3: Use Existing Script

```bash
# If VERCEL_TOKEN is set
./setup-env.sh
```

---

## ✅ Testing Checklist

After adding API keys, test:

- [ ] GitHub integration - Try editing a file in admin
- [ ] Social media - Test posting to one platform
- [ ] Email - Send test notification
- [ ] VITA - Test document upload
- [ ] CRM - Create test contact
- [ ] Grants - Submit test application
- [ ] Community - Post test message
- [ ] Tax software - Start test return

---

## 🔒 Security Notes

1. **Never commit API keys to git**
2. Use `.env.local` (already in .gitignore)
3. Rotate keys regularly
4. Use environment-specific keys (dev/staging/prod)
5. Store production keys in Vercel dashboard

---

## 📞 Support

If you need help getting any API keys:

1. Check provider documentation links above
2. Contact provider support
3. For Drake/EPS integration, contact your Drake rep

---

**Last Updated:** 2025-12-29 23:06 UTC
**Status:** Ready for API key configuration
