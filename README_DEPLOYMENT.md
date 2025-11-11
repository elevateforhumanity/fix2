# DEPLOYMENT GUIDE
**Your Domain:** elevateconnectsdirectory.org (at Durable.co)
**Hosting:** Netlify
**Status:** ✅ Ready to Deploy

---

## 🚀 3-STEP SETUP

### Step 1: Configure DNS in Durable.co (5 min)

1. Login: https://durable.co/login
2. Go to: Domain Settings for elevateconnectsdirectory.org
3. Add these records:

```
A      @    75.2.60.5
AAAA   @    2600:1f18:2148:bc00:e87f:535d:9c1:b5c
CNAME  www  elevateproduction.netlify.app
```

### Step 2: Add Domain in Netlify (2 min)

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click: "Add custom domain"
3. Enter: elevateconnectsdirectory.org
4. Click: "Verify"

### Step 3: Wait & Test (10 min)

1. Wait: 10-15 minutes for SSL
2. Visit: https://elevateconnectsdirectory.org
3. Done!

---

## 📚 DETAILED GUIDES

- **DURABLE_DOMAIN_SETUP.md** - Complete Durable DNS setup
- **FINAL_STANDALONE_ARCHITECTURE.md** - Architecture overview
- **START_HERE_FINAL.md** - Full deployment guide

---

## 💰 COST

```
Durable Domain: $0 (already included)
Netlify: FREE
Supabase: FREE
Total: $0/month
```

---

**Start with Step 1 above!**
