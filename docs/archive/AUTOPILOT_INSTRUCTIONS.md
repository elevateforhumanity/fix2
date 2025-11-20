# AUTOPILOT SETUP INSTRUCTIONS

**Purpose:** Let autopilot finish the Netlify domain setup
**Status:** Ready to run

---

## 🤖 AUTOPILOT WILL DO:

1. ✅ Install Netlify CLI (if needed)
2. ✅ Add elevateforhumanity.org to Netlify
3. ✅ Add elevateforhumanity.org to Netlify
4. ✅ Set elevateforhumanity.org as primary domain
5. ✅ Monitor SSL certificate provisioning
6. ✅ Report when complete

---

## 🚀 RUN AUTOPILOT

### Step 1: Login to Netlify CLI (One-time)

```bash
netlify login
```

This will:

- Open browser
- Ask you to authorize Netlify CLI
- Save credentials

**Do this once, then you're set forever**

### Step 2: Run Autopilot

```bash
./AUTOPILOT_NETLIFY_DOMAIN_SETUP.sh
```

Autopilot will:

- Add both domains
- Set primary domain
- Monitor SSL provisioning
- Report status every 30 seconds

---

## ⏱️ TIMELINE

```
Step 1: netlify login          (1 minute)
Step 2: Run autopilot          (2 minutes)
        Add domains            (automatic)
        Monitor SSL            (5-10 minutes)
---
Total:                         ~10-15 minutes
```

---

## 📋 WHAT AUTOPILOT DOES

### Phase 1: Setup (2 minutes)

```
🔐 Check Netlify authentication
📦 Install Netlify CLI (if needed)
🌐 Add elevateforhumanity.org
🌐 Add elevateforhumanity.org
🎯 Set elevateforhumanity.org as primary
```

### Phase 2: Monitor (5-10 minutes)

```
⏳ Wait for SSL provisioning
📊 Check status every 30 seconds
✅ Report when SSL is active
```

### Phase 3: Complete

```
✅ Both domains configured
✅ SSL certificates active
✅ Ready to test
```

---

## 🔍 MONITORING

### While Autopilot Runs:

You'll see updates like:

```
Checking SSL status... (30s elapsed)
Checking SSL status... (60s elapsed)
Checking SSL status... (90s elapsed)
...
```

### When Complete:

```
✅ DOMAIN SETUP COMPLETE

Domains added:
  ✅ elevateforhumanity.org (primary)
  ✅ elevateforhumanity.org

Next steps:
  1. Visit: https://elevateforhumanity.org
  2. Visit: https://www.elevateforhumanity.org
```

---

## 🆘 IF AUTOPILOT CAN'T RUN

### Manual Alternative:

If you prefer to do it manually or autopilot has issues:

**Go to:** https://app.netlify.com/sites/elevateproduction/settings/domain

**Manually:**

1. Click "Add custom domain"
2. Enter: elevateforhumanity.org
3. Click "Verify"
4. Click "Add custom domain" again
5. Enter: elevateforhumanity.org
6. Click "Verify"
7. Set elevateforhumanity.org as primary
8. Wait 5-10 minutes for SSL

---

## ✅ VERIFICATION

### After Autopilot Completes:

**Test domains:**

```bash
curl -I https://elevateforhumanity.org
curl -I https://www.elevateforhumanity.org
```

**Should show:**

```
HTTP/2 200
...
```

**Or visit in browser:**

- https://elevateforhumanity.org (should work with 🔒)
- https://www.elevateforhumanity.org (should work with 🔒)

---

## 📊 EXPECTED OUTPUT

### Successful Run:

```
🤖 AUTOPILOT: NETLIFY DOMAIN SETUP
====================================

✅ Authenticated with Netlify

🌐 Adding domains to Netlify...

Adding: elevateforhumanity.org
✅ Domain added

Adding: elevateforhumanity.org
✅ Domain added

🎯 Setting primary domain...
✅ Primary domain set

⏳ Waiting for SSL certificates to provision...

📊 Monitoring SSL status...
Checking SSL status... (30s elapsed)
Checking SSL status... (60s elapsed)
...

====================================
✅ DOMAIN SETUP COMPLETE
====================================
```

---

## 🎯 QUICK START

### Two Commands:

```bash
# 1. Login (one-time)
netlify login

# 2. Run autopilot
./AUTOPILOT_NETLIFY_DOMAIN_SETUP.sh
```

**That's it! Autopilot handles the rest.**

---

## 📞 SUPPORT

### If Netlify CLI Issues:

```bash
# Reinstall Netlify CLI
npm uninstall -g netlify-cli
npm install -g netlify-cli

# Login again
netlify login

# Run autopilot
./AUTOPILOT_NETLIFY_DOMAIN_SETUP.sh
```

### If Authentication Issues:

```bash
# Logout and login again
netlify logout
netlify login
```

### If Domain Already Added:

Autopilot will detect and skip, no problem!

---

**READY TO RUN:**

```bash
netlify login
./AUTOPILOT_NETLIFY_DOMAIN_SETUP.sh
```

---

_Autopilot will handle everything from here!_
