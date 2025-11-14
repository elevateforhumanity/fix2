# ⚡ QUICK START - Fix Supabase Keys Error

## 🚨 ERROR YOU'RE SEEING

```
project's URL and Key are required to create a Supabase client!
```

---

## ✅ SOLUTION (Choose One)

### 🤖 Option 1: Autopilot (Recommended)

```bash
# Run the automated setup
bash scripts/add-github-secrets.sh
```

This will:
1. Prompt you for Supabase keys
2. Add them to GitHub Secrets
3. Trigger autopilot workflow
4. Create `.env.local` automatically

### 🔧 Option 2: Manual (2 Minutes)

1. **Get your keys**:
   - Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
   - Copy the **anon public** key
   - Copy the **service_role** key

2. **Create `.env.local`**:
   ```bash
   cat > .env.local << 'EOF'
   NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=paste_your_service_role_key_here
   NEXT_PUBLIC_SITE_URL=https://www.elevateconnectsdirectory.org
   EOF
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

### 🌐 Option 3: GitHub Actions

1. Add secrets to GitHub:
   - Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
   - Add `SUPABASE_ANON_KEY`
   - Add `SUPABASE_SERVICE_ROLE_KEY`

2. Run workflow:
   - Go to: https://github.com/elevateforhumanity/fix2/actions/workflows/setup-supabase-keys.yml
   - Click "Run workflow"

---

## 📍 PROJECT INFO

**Supabase URL**: https://cuxzzpsyufcewtmicszk.supabase.co  
**Project Reference**: cuxzzpsyufcewtmicszk  
**Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk  
**API Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

---

## 🧪 VERIFY IT WORKS

```bash
# Start the app
npm run dev

# Visit http://localhost:3000
# Should NOT see the error anymore
```

---

## 📚 DETAILED GUIDES

- **Autopilot Guide**: [AUTOPILOT_SUPABASE_SETUP.md](./AUTOPILOT_SUPABASE_SETUP.md)
- **Setup Guide**: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
- **All Links**: [ALL_PAGES_LINKS.md](./ALL_PAGES_LINKS.md)

---

## 📞 NEED HELP?

**Phone**: (317) 314-3757  
**Contact**: https://www.elevateconnectsdirectory.org/contact

---

**That's it! Choose your method and you'll be running in 2 minutes.** ⚡
