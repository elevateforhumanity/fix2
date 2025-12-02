# Environment Variables Documentation

Complete guide to all environment variables used in Elevate for Humanity LMS.

## Table of Contents

- [Required Variables](#required-variables)
- [Recommended Variables](#recommended-variables)
- [Optional Integrations](#optional-integrations)
  - [Authentication & SSO](#authentication--sso)
  - [Email Services](#email-services)
  - [Video Hosting](#video-hosting)
  - [CRM Systems](#crm-systems)
  - [Analytics](#analytics)
  - [Storage](#storage)
  - [Communication](#communication)
  - [Payment Processing](#payment-processing)
  - [HR Systems](#hr-systems)
- [Feature Flags](#feature-flags)
- [Development](#development)

---

## Required Variables

These variables are essential for the application to function.

### Supabase Configuration

```bash
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Public anonymous key (safe to expose in client)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Service role key (server-side only, never expose)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. Copy URL and keys

### Site Configuration

```bash
# Your production site URL (no trailing slash)
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

---

## Recommended Variables

These variables enable core features and should be configured for production.

### Authentication

```bash
# NextAuth secret for session encryption
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-nextauth-secret-here

# NextAuth URL (same as NEXT_PUBLIC_SITE_URL)
NEXTAUTH_URL=https://www.elevateforhumanity.org
```

### Stripe Payment Processing

```bash
# Stripe public key (safe to expose)
STRIPE_PUBLIC_KEY=pk_live_...

# Stripe secret key (server-side only)
STRIPE_SECRET_KEY=sk_live_...

# Webhook secret for signature verification
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Where to find:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Developers → API keys
3. For webhook secret: Developers → Webhooks → Add endpoint
4. Endpoint URL: `https://your-domain.com/api/stripe/webhook`

### Error Tracking (Sentry)

```bash
# Sentry DSN for error tracking
SENTRY_DSN=https://...@sentry.io/...

# Environment name
SENTRY_ENVIRONMENT=production

# Organization and project slugs
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

**Where to find:**
1. Go to [Sentry Dashboard](https://sentry.io)
2. Settings → Projects → Your Project
3. Client Keys (DSN)

### OpenAI Integration

```bash
# OpenAI API key for AI features
OPENAI_API_KEY=sk-...
```

**Where to find:**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. API keys → Create new secret key

### Slack Notifications

```bash
# Slack webhook URL for notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

**Where to find:**
1. Go to [Slack API](https://api.slack.com/apps)
2. Create New App → Incoming Webhooks
3. Activate and add to workspace

### Email Service (Choose One)

```bash
# Option 1: Resend (Recommended)
RESEND_API_KEY=re_...

# Option 2: SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM=noreply@elevateforhumanity.org
```

**Resend:**
1. Go to [Resend Dashboard](https://resend.com)
2. API Keys → Create API Key

**SendGrid:**
1. Go to [SendGrid Dashboard](https://app.sendgrid.com)
2. Settings → API Keys → Create API Key

### Caching (Redis)

```bash
# Redis connection URL (optional but recommended)
REDIS_URL=redis://localhost:6379
# Or for cloud: redis://user:pass@host:port
```

**Options:**
- [Upstash Redis](https://upstash.com) (Serverless)
- [Redis Cloud](https://redis.com/cloud)
- Self-hosted

---

## Optional Integrations

### Authentication & SSO

#### Google OAuth

```bash
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

**Setup:**
1. [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`

#### Microsoft OAuth / Azure AD

```bash
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
```

**Setup:**
1. [Azure Portal](https://portal.azure.com)
2. Azure Active Directory → App registrations
3. New registration
4. Redirect URI: `https://your-domain.com/api/auth/callback/microsoft`

#### GitHub OAuth

```bash
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

**Setup:**
1. [GitHub Settings](https://github.com/settings/developers)
2. OAuth Apps → New OAuth App
3. Callback URL: `https://your-domain.com/api/auth/callback/github`

#### Okta SSO

```bash
OKTA_CLIENT_ID=...
OKTA_CLIENT_SECRET=...
OKTA_ISSUER=https://your-domain.okta.com
```

**Setup:**
1. [Okta Admin Console](https://your-domain-admin.okta.com)
2. Applications → Create App Integration
3. Sign-in redirect URIs: `https://your-domain.com/api/auth/callback/okta`

#### Auth0 SSO

```bash
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_AUDIENCE=https://your-api-identifier
```

**Setup:**
1. [Auth0 Dashboard](https://manage.auth0.com)
2. Applications → Create Application
3. Allowed Callback URLs: `https://your-domain.com/api/auth/callback/auth0`

#### SAML SSO

```bash
SAML_ENTRY_POINT=https://idp.example.com/sso
SAML_ISSUER=https://your-domain.com
SAML_CERT=-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----
SAML_IDENTIFIER_FORMAT=urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
```

**Setup:** Contact your identity provider for configuration details.

---

### Email Services

#### SMTP (Generic)

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
SMTP_FROM_NAME=Elevate for Humanity
```

---

### Video Hosting

#### Vimeo

```bash
VIMEO_ACCESS_TOKEN=...
VIMEO_CLIENT_ID=...
VIMEO_CLIENT_SECRET=...
NEXT_PUBLIC_VIMEO_BASE_URL=https://player.vimeo.com/video
```

**Setup:**
1. [Vimeo Developer](https://developer.vimeo.com)
2. My Apps → Create App
3. Generate access token with upload scope

#### Wistia

```bash
WISTIA_API_TOKEN=...
```

**Setup:**
1. [Wistia Account](https://app.wistia.com)
2. Account → Settings → API Access
3. Generate new token

#### YouTube

```bash
YOUTUBE_API_KEY=...
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
```

**Setup:**
1. [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Credentials → Create API Key

---

### CRM Systems

#### Salesforce

```bash
SALESFORCE_CLIENT_ID=...
SALESFORCE_CLIENT_SECRET=...
SALESFORCE_INSTANCE_URL=https://your-instance.salesforce.com
```

**Setup:**
1. [Salesforce Setup](https://login.salesforce.com)
2. Apps → App Manager → New Connected App
3. Enable OAuth Settings

#### HubSpot

```bash
HUBSPOT_API_KEY=...
```

**Setup:**
1. [HubSpot Settings](https://app.hubspot.com)
2. Integrations → API Key
3. Generate key

#### Workday

```bash
WORKDAY_TENANT=your-tenant
WORKDAY_CLIENT_ID=...
WORKDAY_CLIENT_SECRET=...
WORKDAY_REFRESH_TOKEN=...
```

**Setup:** Contact Workday administrator for API credentials.

---

### Analytics

#### Google Analytics

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

**Setup:**
1. [Google Analytics](https://analytics.google.com)
2. Admin → Data Streams
3. Copy Measurement ID

#### Mixpanel

```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=...
```

**Setup:**
1. [Mixpanel Dashboard](https://mixpanel.com)
2. Project Settings
3. Copy Project Token

#### Segment

```bash
SEGMENT_WRITE_KEY=...
```

**Setup:**
1. [Segment Dashboard](https://app.segment.com)
2. Sources → Add Source
3. Copy Write Key

#### Amplitude

```bash
AMPLITUDE_API_KEY=...
```

**Setup:**
1. [Amplitude Dashboard](https://analytics.amplitude.com)
2. Settings → Projects
3. Copy API Key

---

### Storage

#### AWS S3

```bash
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

**Setup:**
1. [AWS Console](https://console.aws.amazon.com)
2. IAM → Users → Create User
3. Attach policy: AmazonS3FullAccess
4. Create access key

#### Cloudinary

```bash
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

**Setup:**
1. [Cloudinary Console](https://cloudinary.com/console)
2. Dashboard → Account Details
3. Copy credentials

---

### Communication

#### Microsoft Teams

```bash
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/...
```

**Setup:**
1. Teams → Channel → Connectors
2. Incoming Webhook → Configure
3. Copy webhook URL

#### Discord

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**Setup:**
1. Discord Server → Channel Settings
2. Integrations → Webhooks
3. Create webhook

#### Twilio (SMS)

```bash
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
```

**Setup:**
1. [Twilio Console](https://console.twilio.com)
2. Account → API Keys & Tokens
3. Phone Numbers → Buy a number

---

### Payment Processing

#### PayPal

```bash
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox # or 'live'
```

**Setup:**
1. [PayPal Developer](https://developer.paypal.com)
2. My Apps & Credentials
3. Create App

#### Square

```bash
SQUARE_ACCESS_TOKEN=...
SQUARE_LOCATION_ID=...
SQUARE_ENVIRONMENT=sandbox # or 'production'
```

**Setup:**
1. [Square Developer](https://developer.squareup.com)
2. Applications → Create Application
3. Credentials → Access Token

#### Authorize.Net

```bash
AUTHORIZE_NET_API_LOGIN_ID=...
AUTHORIZE_NET_TRANSACTION_KEY=...
AUTHORIZE_NET_ENVIRONMENT=sandbox # or 'production'
```

**Setup:**
1. [Authorize.Net Merchant Interface](https://account.authorize.net)
2. Account → API Credentials & Keys
3. Generate new key

---

### HR Systems

#### BambooHR

```bash
BAMBOOHR_SUBDOMAIN=your-company
BAMBOOHR_API_KEY=...
```

**Setup:**
1. BambooHR → Settings → API Keys
2. Generate new key

---

## Feature Flags

Enable or disable features without code changes.

```bash
# Enable/disable features (true/false)
FEATURE_MARKETING_AUTOMATION=true
FEATURE_EVENTS_MANAGEMENT=true
FEATURE_SSO=true
FEATURE_2FA=true
FEATURE_HR_SYSTEM=true
FEATURE_PAYROLL=true
```

---

## Development

Variables for development and debugging.

```bash
# Node environment
NODE_ENV=development # or 'production'

# Enable debug logging
DEBUG=false

# Skip email sending in development
SKIP_EMAIL_SEND=true

# Rate limiting configuration
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_SECONDS=60

# Session timeout in minutes
SESSION_MAX_AGE_MINUTES=60

# IP whitelist for admin access (comma-separated)
ADMIN_IP_WHITELIST=127.0.0.1,::1

# CDN URL for static assets
NEXT_PUBLIC_CDN_URL=

# Capacitor mobile server URL
CAPACITOR_SERVER_URL=https://www.elevateforhumanity.org
```

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different keys** for development and production
3. **Rotate secrets regularly** (every 90 days recommended)
4. **Use environment-specific values** in Vercel/deployment platform
5. **Restrict API key permissions** to minimum required
6. **Enable IP whitelisting** where possible
7. **Monitor API usage** for unusual activity
8. **Use webhook signature verification** for all webhooks

---

## Deployment Checklist

Before deploying to production:

- [ ] All required variables configured
- [ ] Stripe keys are live (not test)
- [ ] NEXT_PUBLIC_SITE_URL points to production domain
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Sentry environment set to 'production'
- [ ] Email service configured and tested
- [ ] Webhook endpoints configured in external services
- [ ] Rate limiting enabled
- [ ] Redis configured for caching
- [ ] All secrets rotated from development values

---

## Troubleshooting

### "Integration not configured" warnings

These warnings appear when optional integrations are not set up. They're safe to ignore if you don't need that integration.

### Webhook signature verification failures

1. Verify webhook secret matches the one in external service
2. Check that endpoint URL is correct
3. Ensure HTTPS is enabled in production

### Email not sending

1. Check email service API key is valid
2. Verify sender email is verified in email service
3. Check SKIP_EMAIL_SEND is false in production
4. Review email service logs for errors

### Authentication issues

1. Verify NEXTAUTH_SECRET is set
2. Check OAuth redirect URIs match exactly
3. Ensure NEXTAUTH_URL matches NEXT_PUBLIC_SITE_URL
4. Review OAuth provider settings

---

## Support

For additional help:
- Documentation: `/docs`
- GitHub Issues: [elevateforhumanity/fix2](https://github.com/elevateforhumanity/fix2/issues)
- Email: support@elevateforhumanity.org

---

**Last Updated:** December 2024  
**Version:** 1.0.0
