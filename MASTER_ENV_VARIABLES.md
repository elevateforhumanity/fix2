# 🔑 MASTER ENVIRONMENT VARIABLES

## Copy-Paste Ready for Vercel

### Core Supabase Variables

```bash
# Supabase Connection
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE

# Database Connection (Pooler - IPv4 Compatible)
DATABASE_URL=postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08%24%24%24@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Redis (Upstash)

```bash
UPSTASH_REDIS_REST_URL=https://feasible-seahorse-5573.upstash.io
UPSTASH_REDIS_REST_TOKEN=ARXFAAImcDEzYWY2YzJiMTFjMDk0NWYzODM4MjNjNWMwMzFkNmE3M3AxNTU3Mw
```

### Stripe (Payment Processing)

```bash
# Get these from: https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### NextAuth

```bash
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://elevateforhumanity.org
```

### Email (SendGrid or Resend)

```bash
# SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_key_here
EMAIL_FROM=noreply@elevateforhumanity.org

# OR Resend
RESEND_API_KEY=re_your_resend_key_here
```

### SMS (Optional - Twilio)

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### GitHub OAuth (Optional)

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_OAUTH_ENABLED=true
```

### Google OAuth (Optional)

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## How to Add to Vercel

### Option 1: Vercel Dashboard

1. Go to: https://vercel.com/elevateforhumanitys-projects/fix2/settings/environment-variables
2. Click "Add New"
3. Paste each variable name and value
4. Select: Production, Preview, Development
5. Click "Save"

### Option 2: Vercel CLI

```bash
# Set each variable
echo "value_here" | vercel env add VARIABLE_NAME production
```

### Option 3: Bulk Import

Create a `.env.production` file with all variables, then:

```bash
vercel env pull .env.production
```

---

## ⚠️ IMPORTANT NOTES

### Database URL

- **Must use pooler** (port 6543, not 5432)
- **Password must be URL-encoded**: `$$$` becomes `%24%24%24`
- **No trailing newlines or spaces**

### Redis URLs

- **No quotes needed** in Vercel
- **No trailing newlines**
- Code now has `.trim()` to handle this

### Stripe Keys

- Use **test keys** for development
- Use **live keys** for production
- Set webhook endpoint in Stripe dashboard

---

## Current Status

### ✅ Already Set in Vercel

- DATABASE_URL (with pooler)
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### ⚠️ Need to Add

- STRIPE_SECRET_KEY (for license purchases)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (for checkout)
- NEXTAUTH_SECRET (for authentication)
- EMAIL_FROM (for notifications)
- SENDGRID_API_KEY or RESEND_API_KEY (for emails)

---

## Quick Setup Commands

```bash
# Set Stripe keys
echo "sk_test_your_key" | vercel env add STRIPE_SECRET_KEY production
echo "pk_test_your_key" | vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production

# Set NextAuth
echo "$(openssl rand -base64 32)" | vercel env add NEXTAUTH_SECRET production
echo "https://elevateforhumanity.org" | vercel env add NEXTAUTH_URL production

# Set Email
echo "noreply@elevateforhumanity.org" | vercel env add EMAIL_FROM production
echo "your_sendgrid_key" | vercel env add SENDGRID_API_KEY production
```

---

## Verification

After setting all variables, verify with:

```bash
vercel env ls production
```

Should show all variables listed above.
