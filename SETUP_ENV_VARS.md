# 🔐 CRITICAL: Environment Variables Setup

## ⚠️ CURRENT STATUS: 6 CRITICAL VARIABLES MISSING

The application **CANNOT function properly** without these environment variables.

---

## 📋 Required Variables

### 1. Supabase Configuration (Database & Auth)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to get these:**
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Stripe Configuration (Payments)

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
```

**Where to get these:**
1. Go to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

**⚠️ Use test keys for development, live keys for production**

### 3. Site URL

```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

**For development:**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Quick Setup

### Option 1: Create .env.local (Recommended)

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your actual values
nano .env.local  # or use your preferred editor
```

### Option 2: Use the template below

Create a file named `.env.local` in the project root:

```bash
# =============================================================================
# CRITICAL ENVIRONMENT VARIABLES
# =============================================================================

# Supabase (Database & Authentication)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe (Payment Processing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
STRIPE_SECRET_KEY=sk_test_your-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# =============================================================================
# OPTIONAL BUT RECOMMENDED
# =============================================================================

# Session Management
SESSION_MAX_AGE_MINUTES=60

# NextAuth
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
```

---

## ✅ Verify Setup

After creating `.env.local`, run:

```bash
bash check-env-vars.sh
```

You should see:
```
✅ All critical environment variables are set!
```

---

## 🔒 Security Notes

1. **NEVER commit `.env.local` to git** (already in .gitignore)
2. **Use test keys in development** (pk_test_*, sk_test_*)
3. **Use live keys only in production** (pk_live_*, sk_live_*)
4. **Rotate keys if exposed**
5. **Keep service_role key secret** (has admin access)

---

## 🐛 Troubleshooting

### Build fails with "environment variables not set"

**Solution:** The app has fallback placeholders for builds, but you need real values for functionality.

### Stripe checkout doesn't work

**Solution:** Check that both Stripe keys are set and match (both test or both live).

### Database queries fail

**Solution:** Verify Supabase URL and keys are correct. Test connection in Supabase dashboard.

### "Unauthorized" errors

**Solution:** Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly.

---

## 📞 Need Help?

If you don't have access to these credentials:

1. **Supabase:** Contact the project admin or create a new Supabase project
2. **Stripe:** Contact the project admin or create a Stripe account
3. **Emergency:** The app will build but features will be limited

---

## 🎯 Next Steps After Setup

1. ✅ Run `bash check-env-vars.sh` to verify
2. ✅ Run `npm run build` to test build
3. ✅ Run `npm run dev` to start development server
4. ✅ Test authentication at `/login`
5. ✅ Test checkout at `/programs/[any-program]`

---

**Last Updated:** 2025-12-08  
**Status:** 🔴 CRITICAL - Setup Required
