# Environment Variables Audit

**Last Updated:** November 19, 2025

---

## 🔑 Required Variables (MUST BE SET)

These variables are **required** for the application to function:

### Core Application
```bash
# Supabase Database (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration (REQUIRED)
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# Authentication (REQUIRED)
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=https://www.elevateforhumanity.org
```

---

## ⚙️ Optional Variables (Recommended)

These enable additional features but are not required:

### Payment Processing
```bash
# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email Notifications
```bash
# Resend (recommended - simple API)
RESEND_API_KEY=re_...

# OR SendGrid (alternative)
SENDGRID_API_KEY=SG...
SENDGRID_FROM=noreply@elevateforhumanity.org

# OR SMTP (any provider)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
SMTP_FROM_NAME=Elevate for Humanity
```

### Analytics
```bash
# Google Analytics (free)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel (optional)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789
```

### Error Tracking
```bash
# Sentry (optional but recommended)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_ENVIRONMENT=production
```

---

## 🚫 NOT NEEDED (Already Removed)

These were removed and are **no longer required**:

```bash
# ❌ Twilio - REMOVED (using free phone system)
# TWILIO_SID
# TWILIO_TOKEN
# TWILIO_FROM
# TWILIO_TO

# ❌ Vercel Analytics - REMOVED (using self-hosted)
# No env vars needed - removed package

# ❌ LDAP - REMOVED (deprecated package)
# LDAP_URL
# LDAP_BIND_DN
# LDAP_BIND_PASSWORD
```

---

## 🔧 Enterprise Features (Optional)

Only needed if using enterprise features:

### SSO Authentication
```bash
# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_OAUTH_ENABLED=true

# Microsoft Azure AD
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
AZURE_AD_ENABLED=true

# Okta
OKTA_CLIENT_ID=...
OKTA_CLIENT_SECRET=...
OKTA_ISSUER=https://your-domain.okta.com
OKTA_ENABLED=true

# SAML
SAML_ENTRY_POINT=...
SAML_ISSUER=...
SAML_CERT=...
SAML_ENABLED=true
```

### HR Integrations
```bash
# BambooHR
BAMBOOHR_API_KEY=...
BAMBOOHR_SUBDOMAIN=your-company

# Workday
WORKDAY_TENANT=...
WORKDAY_CLIENT_ID=...
WORKDAY_CLIENT_SECRET=...

# Salesforce
SALESFORCE_CLIENT_ID=...
SALESFORCE_CLIENT_SECRET=...
SALESFORCE_INSTANCE_URL=...
```

### LMS Integrations
```bash
# SCORM Cloud
SCORM_APP_ID=...
SCORM_SECRET_KEY=...

# xAPI/LRS
NEXT_PUBLIC_XAPI_ENDPOINT=...
XAPI_USERNAME=...
XAPI_PASSWORD=...

# Zoom
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
ZOOM_ACCOUNT_ID=...
```

### Support/Chat
```bash
# Intercom
NEXT_PUBLIC_INTERCOM_APP_ID=...

# Zendesk
ZENDESK_SUBDOMAIN=...
ZENDESK_EMAIL=...
ZENDESK_API_TOKEN=...
NEXT_PUBLIC_ZENDESK_KEY=...
```

---

## 📊 Current Status in Vercel

### ✅ Already Configured
Based on your Vercel dashboard, these are set:
- `STRIPE_SECRET_KEY` ✅
- `RESEND_API_KEY` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅
- `SUPABASE_SERVICE_ROLE_KEY` ✅

### ⚠️ May Need to Add
- `NEXT_PUBLIC_SUPABASE_URL` - Check if set
- `NEXT_PUBLIC_SITE_URL` - Should be `https://www.elevateforhumanity.org`
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Should be `https://www.elevateforhumanity.org`

---

## 🎯 Minimal Setup (Just to Get Started)

If you want the **absolute minimum** to get the site working:

```bash
# These 4 variables are ALL you need:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

Everything else is optional and can be added later as needed.

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use Vercel Environment Variables** - Set in dashboard
3. **Rotate secrets regularly** - Especially API keys
4. **Use different keys for dev/prod** - Separate environments
5. **Enable "Sensitive" flag** - In Vercel for secret values

---

## 📝 How to Add Variables in Vercel

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables
2. Click "Add New"
3. Enter variable name (e.g., `NEXTAUTH_SECRET`)
4. Enter value
5. Select environments: Production, Preview, Development
6. Check "Sensitive" if it's a secret
7. Click "Save"
8. Redeploy for changes to take effect

---

## 🧪 Testing Variables Locally

Create `.env.local` in project root:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
nano .env.local

# Test locally
npm run dev
```

---

## 🚀 Variables by Feature

### Want Payments?
Add: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Want Email Notifications?
Add: `RESEND_API_KEY` (easiest) or `SENDGRID_API_KEY` or SMTP settings

### Want Analytics?
Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Google Analytics is free)

### Want Error Tracking?
Add: `NEXT_PUBLIC_SENTRY_DSN` (Sentry free tier is generous)

### Want SSO Login?
Add: Google, Azure, or Okta credentials

---

## ✅ Summary

**Currently Required:** 4 variables (Supabase + Site URL)
**Currently Set in Vercel:** 4 variables (Stripe, Resend, Supabase)
**Missing Critical:** Possibly `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
**Optional Features:** 80+ variables for enterprise features

**Action Items:**
1. ✅ Verify Supabase variables are set
2. ⚠️ Add `NEXTAUTH_SECRET` if not set
3. ⚠️ Add `NEXTAUTH_URL` if not set
4. ✅ Everything else is optional

The site will work with just the core 4-6 variables. Add others as you need features.
