# 🔐 Environment Setup Guide
**Status:** ⚠️ CRITICAL - API Keys Required

---

## 🚨 CURRENT STATUS

Your environment file exists but has **placeholder values** that need to be replaced with real API keys.

### What's Missing:

#### **CRITICAL (Blocks Build):**
- ❌ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Says "GET_FROM_SUPABASE_DASHBOARD"
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Says "GET_FROM_SUPABASE_DASHBOARD"

#### **IMPORTANT (Blocks Features):**
- ❌ `NEXTAUTH_SECRET` - Has shell command instead of value
- ❌ `RESEND_API_KEY` - Empty (email notifications won't work)
- ❌ `STRIPE_SECRET_KEY` - Empty (payments won't work)
- ❌ `OPENAI_API_KEY` - Empty (AI features won't work)
- ❌ `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Empty (analytics won't work)

---

## ✅ STEP-BY-STEP FIX

### Step 1: Get Supabase Keys (CRITICAL)

1. **Go to Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
   ```

2. **Copy these two keys:**
   - **anon/public key** (starts with `eyJhbGc...`)
   - **service_role key** (starts with `eyJhbGc...`)

3. **Update .env.local:**
   ```bash
   nano .env.local
   ```
   
   Replace:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=GET_FROM_SUPABASE_DASHBOARD
   SUPABASE_SERVICE_ROLE_KEY=GET_FROM_SUPABASE_DASHBOARD
   ```
   
   With:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (your actual key)
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (your actual key)
   ```

### Step 2: Generate NEXTAUTH_SECRET (CRITICAL)

```bash
# Generate a secure random string
openssl rand -base64 32
```

Copy the output and update .env.local:
```bash
NEXTAUTH_SECRET=<paste the generated string here>
```

### Step 3: Get Resend API Key (For Emails)

1. **Go to Resend:**
   ```
   https://resend.com/api-keys
   ```

2. **Create API Key:**
   - Click "Create API Key"
   - Name it "Elevate Production"
   - Copy the key

3. **Update .env.local:**
   ```bash
   RESEND_API_KEY=re_... (your actual key)
   ```

### Step 4: Get Stripe Keys (For Payments)

1. **Go to Stripe Dashboard:**
   ```
   https://dashboard.stripe.com/apikeys
   ```

2. **Copy Secret Key:**
   - Use "Secret key" (starts with `sk_live_` or `sk_test_`)

3. **Update .env.local:**
   ```bash
   STRIPE_SECRET_KEY=sk_... (your actual key)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_... (your actual key)
   ```

### Step 5: Get OpenAI API Key (For AI Features)

1. **Go to OpenAI:**
   ```
   https://platform.openai.com/api-keys
   ```

2. **Create API Key:**
   - Click "Create new secret key"
   - Name it "Elevate Production"
   - Copy the key

3. **Update .env.local:**
   ```bash
   OPENAI_API_KEY=sk-... (your actual key)
   ```

### Step 6: Get Google Analytics ID (For Tracking)

1. **Go to Google Analytics:**
   ```
   https://analytics.google.com/
   ```

2. **Get Measurement ID:**
   - Go to Admin → Data Streams
   - Click your web stream
   - Copy "Measurement ID" (starts with `G-`)

3. **Update .env.local:**
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX (your actual ID)
   ```

---

## 🔧 AUTOMATED FIX SCRIPT

Run this to automatically fix what we can:

```bash
# Fix NEXTAUTH_SECRET automatically
SECRET=$(openssl rand -base64 32)
sed -i "s|NEXTAUTH_SECRET=\$(openssl rand -base64 32)|NEXTAUTH_SECRET=$SECRET|g" .env.local

echo "✅ NEXTAUTH_SECRET generated and set"
```

---

## ✅ VERIFY YOUR SETUP

After updating all keys, run:

```bash
bash scripts/check-env-status.sh
```

You should see:
```
✅ ALL VARIABLES CONFIGURED
```

---

## 🚀 THEN BUILD

Once all keys are set:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start production server
pnpm start
```

---

## 📋 QUICK CHECKLIST

- [ ] Get Supabase anon key
- [ ] Get Supabase service role key
- [ ] Generate NEXTAUTH_SECRET
- [ ] Get Resend API key (optional but recommended)
- [ ] Get Stripe keys (optional but recommended)
- [ ] Get OpenAI key (optional)
- [ ] Get Google Analytics ID (optional)
- [ ] Run `bash scripts/check-env-status.sh`
- [ ] See all ✅ green checkmarks
- [ ] Run `pnpm build`
- [ ] Deploy!

---

## 🆘 TROUBLESHOOTING

### "Build fails with Supabase error"
→ Supabase keys are still placeholders. Follow Step 1.

### "Email notifications don't work"
→ RESEND_API_KEY is not set. Follow Step 3.

### "Payments don't work"
→ STRIPE_SECRET_KEY is not set. Follow Step 4.

### "Can't find my Supabase project"
→ Your project ID is: `cuxzzpsyufcewtmicszk`
→ Direct link: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk

---

## 💡 PRO TIPS

1. **Never commit .env.local** - It's already in .gitignore
2. **Use different keys for dev/prod** - Keep test keys separate
3. **Rotate keys regularly** - Update every 90 days
4. **Store keys securely** - Use a password manager
5. **Test after each key** - Verify functionality incrementally

---

## 📞 NEED HELP?

If you don't have access to these services:

1. **Supabase:** Contact your team admin or create new project
2. **Resend:** Sign up at resend.com (free tier available)
3. **Stripe:** Sign up at stripe.com (test mode is free)
4. **OpenAI:** Sign up at platform.openai.com (pay as you go)
5. **Google Analytics:** Sign up at analytics.google.com (free)

---

**Current Status:** ⚠️ Waiting for API keys  
**Next Step:** Follow Step 1 above  
**Time Required:** ~15 minutes to get all keys
