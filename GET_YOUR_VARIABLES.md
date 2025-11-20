# 🔑 Get Your Environment Variables - Step by Step

**Complete guide with links and explanations**

---

## 🎯 REQUIRED VARIABLES (Must Have)

### 1. Supabase (Database) - FREE

**What it does:** Powers your entire database, user authentication, and data storage

**Get it here:** 

👉 **[CLICK HERE: Create Supabase Account](https://supabase.com/dashboard)**

**Steps:**
1. Click the link above → https://supabase.com/dashboard
2. Sign in with GitHub (free account)
3. Click "New Project"
4. Choose organization and name your project (e.g., "elevate-lms")
5. Set a strong database password (save it!)
6. Choose region closest to you
7. Click "Create new project" (takes 2 minutes)

**Once created, get your keys:**
1. Click "Settings" (gear icon) in left sidebar
2. Click "API" 
3. Copy these 3 values:

```bash
# Copy "Project URL"
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Copy "anon public" key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Copy "service_role" key (keep this SECRET!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**What happens when you add these:**
- ✅ Database works
- ✅ User login/signup works
- ✅ All data storage works
- ✅ Programs and courses load
- ✅ Student dashboard works

---

### 2. NextAuth Secret (Authentication)

**What it does:** Secures user sessions and login tokens

**Get it:** Generate it yourself (free, takes 5 seconds)

👉 **[CLICK HERE: Generate Secret Online](https://generate-secret.vercel.app/32)**

**Steps:**
1. Click the link above → https://generate-secret.vercel.app/32
2. Copy the generated secret
3. Paste it into Vercel as `NEXTAUTH_SECRET`

**OR use terminal:**
1. Open terminal or command prompt
2. Run this command:
   ```bash
   openssl rand -base64 32
   ```
3. Copy the output (looks like: `Xk7mP9qR2sT4uV6wY8zA1bC3dE5fG7hI9jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8=`)

```bash
NEXTAUTH_SECRET=paste-your-generated-secret-here
NEXTAUTH_URL=https://www.elevateforhumanity.org
```

**What happens when you add these:**
- ✅ User sessions stay logged in
- ✅ Login/logout works securely
- ✅ Password resets work
- ✅ Session cookies are encrypted

---

### 3. Site URL

**What it does:** Tells the app what domain it's running on

**Get it:** You already have it!

```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

**What happens when you add this:**
- ✅ Links work correctly
- ✅ Redirects work
- ✅ Email links point to right domain
- ✅ OAuth callbacks work

---

## 💳 OPTIONAL: Payment Processing

### Stripe (Accept Payments) - FREE to start

**What it does:** Lets you charge for courses, accept donations, process payments

👉 **[CLICK HERE: Create Stripe Account](https://dashboard.stripe.com/register)**

**Steps:**
1. Click the link above → https://dashboard.stripe.com/register
2. Sign up (free account)
3. Complete business verification (can skip for testing)
4. Go to API Keys → https://dashboard.stripe.com/apikeys
5. Copy your keys:

```bash
# Copy "Publishable key" (starts with pk_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Copy "Secret key" (starts with sk_) - keep SECRET!
STRIPE_SECRET_KEY=sk_live_...
```

**For webhooks (optional but recommended):**

👉 **[CLICK HERE: Setup Stripe Webhooks](https://dashboard.stripe.com/webhooks)**

1. Click the link above → https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter: `https://www.elevateforhumanity.org/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy "Signing secret" (starts with whsec_)

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

**What happens when you add these:**
- ✅ "Enroll Now" buttons work
- ✅ Can charge for premium courses
- ✅ Donation page works
- ✅ Payment history tracked
- ✅ Automatic receipts sent

**Cost:** Free to set up, 2.9% + 30¢ per transaction

---

## 📧 OPTIONAL: Email Notifications

### Option A: Resend (Recommended - Easiest) - FREE

**What it does:** Sends welcome emails, password resets, course notifications

👉 **[CLICK HERE: Create Resend Account](https://resend.com/signup)**

**Steps:**
1. Click the link above → https://resend.com/signup
2. Sign up with GitHub (free)
3. Verify your email
4. Go to API Keys → https://resend.com/api-keys
5. Click "Create API Key"
6. Name it "Production"
7. Copy the key (starts with re_)

```bash
RESEND_API_KEY=re_...
```

**What happens when you add this:**
- ✅ Welcome emails sent to new users
- ✅ Password reset emails work
- ✅ Course enrollment confirmations
- ✅ Assignment reminders
- ✅ Certificate delivery emails

**Cost:** Free for 3,000 emails/month, then $20/month for 50,000

---

### Option B: SendGrid (Alternative) - FREE

👉 **[CLICK HERE: Create SendGrid Account](https://signup.sendgrid.com/)**

**Steps:**
1. Click the link above → https://signup.sendgrid.com/
2. Sign up (free account)
3. Verify email and complete setup
4. Go to API Keys → https://app.sendgrid.com/settings/api_keys
5. Click "Create API Key"
6. Choose "Full Access"
7. Copy the key (starts with SG.)

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM=noreply@elevateforhumanity.org
```

**Cost:** Free for 100 emails/day

---

### Option C: Gmail SMTP (Free but Limited)

**What it does:** Uses your Gmail to send emails

👉 **[CLICK HERE: Google Security Settings](https://myaccount.google.com/security)**

**Steps:**
1. Click the link above → https://myaccount.google.com/security
2. Enable "2-Step Verification" (required)
3. Go to App Passwords → https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Name it "Elevate LMS"
6. Copy the 16-character password

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Elevate for Humanity
```

**Cost:** Free, but limited to 500 emails/day

---

## 📊 OPTIONAL: Analytics

### Google Analytics - FREE

**What it does:** Tracks visitors, page views, user behavior

👉 **[CLICK HERE: Setup Google Analytics](https://analytics.google.com/)**

**Steps:**
1. Click the link above → https://analytics.google.com/
2. Sign in with Google account
3. Click "Start measuring"
4. Enter account name: "Elevate for Humanity"
5. Click "Next"
6. Enter property name: "Elevate LMS"
7. Select timezone and currency
8. Click "Next"
9. Select "Education" as business category
10. Click "Create"
11. Accept terms
12. Choose "Web" platform
13. Enter website URL: `https://www.elevateforhumanity.org`
14. Enter stream name: "Production"
15. Click "Create stream"
16. Copy your "Measurement ID" (starts with G-)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**What happens when you add this:**
- ✅ See how many visitors you have
- ✅ Track which pages are popular
- ✅ See where users come from
- ✅ Monitor conversion rates
- ✅ Real-time visitor tracking

**Cost:** Completely free forever

---

## 🐛 OPTIONAL: Error Tracking

### Sentry - FREE

**What it does:** Catches errors, shows you what broke and why

👉 **[CLICK HERE: Create Sentry Account](https://sentry.io/signup/)**

**Steps:**
1. Click the link above → https://sentry.io/signup/
2. Sign up with GitHub (free)
3. Create organization: "Elevate for Humanity"
4. Create project:
   - Platform: "Next.js"
   - Project name: "elevate-lms"
5. Copy your DSN (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_ORG=elevate-for-humanity
SENTRY_PROJECT=elevate-lms
SENTRY_ENVIRONMENT=production
```

**What happens when you add this:**
- ✅ Get notified when errors occur
- ✅ See exactly what caused the error
- ✅ Track error frequency
- ✅ Monitor performance issues
- ✅ Debug production problems

**Cost:** Free for 5,000 errors/month

---

## 🔐 OPTIONAL: SSO Login (Enterprise)

### Google OAuth - FREE

**What it does:** "Sign in with Google" button

👉 **[CLICK HERE: Google Cloud Console](https://console.cloud.google.com/)**

**Steps:**
1. Click the link above → https://console.cloud.google.com/
2. Create new project: "Elevate LMS"
3. Go to "APIs & Services" → "OAuth consent screen"
4. Choose "External"
5. Fill in app name: "Elevate for Humanity"
6. Add your email
7. Add authorized domain: `elevateforhumanity.org`
8. Save
9. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
10. Choose "Web application"
11. Name: "Production"
12. Add authorized redirect URI: `https://www.elevateforhumanity.org/api/auth/callback/google`
13. Click "Create"
14. Copy Client ID and Client Secret

```bash
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

**What happens when you add these:**
- ✅ "Sign in with Google" button appears
- ✅ Users can login with Google account
- ✅ No password needed
- ✅ Faster signup process

**Cost:** Free

---

## 📝 How to Add Variables to Vercel

**Once you have your keys:**

👉 **[CLICK HERE: Vercel Environment Variables](https://vercel.com/elevate-48e460c9/fix2-gpql/settings/environment-variables)**

1. Click the link above to go directly to your Vercel environment variables page

2. For each variable:
   - Click "Add New"
   - Enter variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Paste the value
   - Select all environments: ✅ Production ✅ Preview ✅ Development
   - Check "Sensitive" if it's a secret (anything with SECRET, KEY, PASSWORD)
   - Click "Save"

3. After adding all variables:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Wait 2-3 minutes

---

## ✅ Quick Start Checklist

**Minimum to get site working (15 minutes):**

- [ ] Create Supabase account → Get 3 keys
- [ ] Generate NextAuth secret → 1 key
- [ ] Add site URL → 1 key
- [ ] Add all 5 to Vercel
- [ ] Redeploy
- [ ] ✅ Site works!

**Add later for full features:**

- [ ] Stripe → Enable payments
- [ ] Resend → Enable emails
- [ ] Google Analytics → Track visitors
- [ ] Sentry → Track errors

---

## 🆘 Need Help?

**Supabase Issues:**
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com/

**Stripe Issues:**
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com/

**Resend Issues:**
- Docs: https://resend.com/docs
- Support: support@resend.com

**General Issues:**
- Check `ENVIRONMENT_VARIABLES_AUDIT.md` for full list
- Check `.env.example` for format examples

---

## 🎯 What Each Service Costs

| Service | Free Tier | Paid Tier | What You Get |
|---------|-----------|-----------|--------------|
| **Supabase** | 500MB DB, 2GB bandwidth | $25/mo for 8GB | Database, auth, storage |
| **Stripe** | Free setup | 2.9% + 30¢ per transaction | Payment processing |
| **Resend** | 3,000 emails/mo | $20/mo for 50k | Email delivery |
| **SendGrid** | 100 emails/day | $20/mo for 50k | Email delivery |
| **Google Analytics** | Unlimited | Free forever | Website analytics |
| **Sentry** | 5,000 errors/mo | $26/mo for 50k | Error tracking |
| **Google OAuth** | Unlimited | Free forever | Social login |

**Total minimum cost:** $0/month (using free tiers)
**Recommended setup:** $25/month (Supabase Pro + free tiers for everything else)

---

## 🚀 Priority Order

**Do these first (required):**
1. ✅ Supabase (database)
2. ✅ NextAuth Secret (security)
3. ✅ Site URL (configuration)

**Do these next (highly recommended):**
4. 📧 Resend or SendGrid (emails)
5. 💳 Stripe (if you need payments)

**Do these when ready (nice to have):**
6. 📊 Google Analytics (tracking)
7. 🐛 Sentry (error monitoring)
8. 🔐 Google OAuth (social login)

---

## 📋 Copy-Paste Template

Once you have all your values, copy this template and fill it in:

```bash
# REQUIRED
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# OPTIONAL - Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OPTIONAL - Email
RESEND_API_KEY=

# OPTIONAL - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# OPTIONAL - Error Tracking
NEXT_PUBLIC_SENTRY_DSN=
```

Then add each line to Vercel environment variables!
