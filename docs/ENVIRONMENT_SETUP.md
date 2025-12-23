# Environment Setup - Quick Fix

**Error:** `Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Cause:** No environment variables configured in this Gitpod workspace

**Solution:** Configure Supabase credentials

---

## Option 1: Quick Manual Setup (5 minutes)

Create `.env.local` file:

```bash
cd /workspaces/fix2
cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
```

**Where to find these values:**

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

**Then restart dev server:**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## Option 2: Use Existing Setup Script (Recommended)

If you have Vercel configured:

```bash
cd /workspaces/fix2
./setup-env.sh
```

This will pull all environment variables from Vercel.

---

## Option 3: Use Gitpod Environment Variables

Set variables in Gitpod dashboard (persists across workspaces):

```bash
# In Gitpod, go to: https://gitpod.io/user/variables
# Add these variables with scope: elevateforhumanity/fix2

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Then restart workspace or run:

```bash
eval $(gp env -e)
npm run dev
```

---

## Verification

After setting environment variables, verify they're loaded:

```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Should print your Supabase URL and key (not empty).

---

## Security Notes

**DO NOT:**
- ❌ Commit `.env.local` to git
- ❌ Share service role key publicly
- ❌ Use production keys in development

**DO:**
- ✅ Use `.env.local` for local development
- ✅ Use Gitpod variables for persistent config
- ✅ Use Vercel for production deployment
- ✅ Keep service role key secret

---

## After Configuration

Once environment variables are set:

1. Restart dev server: `npm run dev`
2. Refresh browser
3. Error should be gone
4. Portal should load

**Then you can test:**
- Login as program_holder
- Visit `/program-holder/dashboard`
- Test all navigation links
- Report any remaining errors

---

## Common Issues

### Issue: Variables not loading

**Solution:** Restart dev server completely

```bash
# Kill all node processes
pkill -f "next dev"

# Start fresh
npm run dev
```

### Issue: Still getting error after setting variables

**Check:**
```bash
# Are variables in environment?
env | grep SUPABASE

# Are variables in .env.local?
cat .env.local | grep SUPABASE
```

### Issue: Wrong Supabase project

**Verify:** Check that URL matches your project:
- URL should be: `https://[project-ref].supabase.co`
- Not: `https://supabase.com` or other domains

---

## Next Steps After Environment Setup

1. ✅ Configure environment variables (this document)
2. ⏳ Restart dev server
3. ⏳ Test program-holder portal
4. ⏳ Report any database errors
5. ⏳ Verify all pages load

**Time estimate:** 5-10 minutes

---

**Prepared by:** Ona  
**Issue:** Missing environment variables  
**Priority:** CRITICAL (blocks all testing)  
**Status:** Waiting for Lizzy to configure
