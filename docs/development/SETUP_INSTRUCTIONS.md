# 🚀 Quick Setup Instructions for Developers

**Get started in 5 minutes!**

---

## ⚡ FASTEST WAY (Recommended)

If you have access to Vercel:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link to project
vercel link

# 4. Pull environment variables automatically
./pull-env-from-vercel.sh

# 5. Start development
npm run dev
```

**Done!** Open http://localhost:3000

---

## 🔧 MANUAL SETUP

If you don't have Vercel access:

```bash
# 1. Run interactive setup
./setup-local-env.sh

# 2. Follow the prompts to enter:
#    - Supabase URL
#    - Supabase keys
#    - Other credentials

# 3. Start development
npm run dev
```

---

## 📋 WHAT YOU NEED

### Required Credentials

1. **Supabase** (Required for login/database)
   - URL: `https://xxxxx.supabase.co`
   - Anonymous Key: `eyJhbGci...`
   - Service Role Key: `eyJhbGci...`
   
   **Get from**: https://supabase.com/dashboard → Your Project → Settings → API

2. **Site URL** (Auto-set to localhost:3000)

### Optional Credentials

3. **Stripe** (For payment features)
   - Publishable Key: `pk_test_...`
   - Secret Key: `sk_test_...`
   
   **Get from**: https://dashboard.stripe.com → Developers → API keys

4. **Resend** (For email features)
   - API Key: `re_...`
   
   **Get from**: https://resend.com/dashboard → API Keys

---

## ✅ VERIFY IT WORKS

```bash
# Test Supabase connection
node test-supabase-connection.mjs

# Should show:
# ✅ NEXT_PUBLIC_SUPABASE_URL: Set
# ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
# ✅ SUPABASE_SERVICE_ROLE_KEY: Set
# ✅ Supabase connection successful!
```

---

## 🐛 TROUBLESHOOTING

### "Supabase is not configured"
- Make sure `.env.local` exists in project root
- Restart dev server: `npm run dev`

### "Invalid API key"
- Double-check keys from Supabase dashboard
- Make sure you copied the complete key

### Variables not loading
- File must be named exactly `.env.local`
- Must be in project root (same folder as package.json)
- Restart dev server after creating file

---

## 📚 FULL DOCUMENTATION

For detailed setup, troubleshooting, and best practices:

**Read**: [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md)

---

## 🆘 NEED HELP?

1. Check [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md) for detailed troubleshooting
2. Verify Supabase project is active
3. Ask team lead for credentials if needed

---

**Quick Links:**
- 📖 Full Guide: [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md)
- 🔐 Supabase Verification: [SUPABASE_VERIFICATION.md](./SUPABASE_VERIFICATION.md)
- 🌐 Portal Access: [PORTAL_ACCESS_GUIDE.md](./PORTAL_ACCESS_GUIDE.md)
