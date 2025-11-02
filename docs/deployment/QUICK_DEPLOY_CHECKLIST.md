# ✅ Quick Deploy Checklist

**You have**: Stripe, Facebook, LinkedIn, Cloudflare keys  
**Time needed**: 10 minutes

---

## 📋 Deployment Checklist

### Step 1: Add Keys to Netlify (5 minutes)

Go to: https://app.netlify.com → elevateforhumanityfix2 → Site settings → Environment variables

Add these 10 keys:

- [ ] `STRIPE_SECRET_KEY` = sk*test*...
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` = pk*test*...
- [ ] `STRIPE_WEBHOOK_SECRET` = whsec\_...
- [ ] `FACEBOOK_PAGE_ID` = your_page_id
- [ ] `FACEBOOK_PAGE_ACCESS_TOKEN` = your_token
- [ ] `LINKEDIN_ACCESS_TOKEN` = your_token
- [ ] `LINKEDIN_ORGANIZATION_ID` = your_org_id
- [ ] `CLOUDFLARE_ACCOUNT_ID` = your_account_id
- [ ] `CLOUDFLARE_API_TOKEN` = your_token
- [ ] `SUPABASE_SERVICE_KEY` = your_service_key

Click **Save** → Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

### Step 2: Deploy Cloudflare Worker (3 minutes)

```bash
# Set your Cloudflare credentials
export CLOUDFLARE_API_TOKEN=your_token
export CLOUDFLARE_ACCOUNT_ID=your_account_id

# Update wrangler.toml
nano wrangler.toml
# Change: # account_id = "your-cloudflare-account-id"
# To: account_id = "YOUR_ACTUAL_ACCOUNT_ID"

# Deploy
npx wrangler deploy
```

---

### Step 3: Add Cloudflare Keys to GitHub (2 minutes)

Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

Add these 2 secrets:

- [ ] `CLOUDFLARE_API_TOKEN` = your_token
- [ ] `CLOUDFLARE_ACCOUNT_ID` = your_account_id

---

### Step 4: Verify Everything Works

- [ ] Check Netlify deploy: https://app.netlify.com
- [ ] Visit site: https://elevateforhumanityfix2.netlify.app
- [ ] Test payment with card: 4242 4242 4242 4242
- [ ] Check Cloudflare worker: `npx wrangler deployments list`

---

## 🎉 Done!

Once deployed:

- ✅ Autopilot monitors every 30 minutes
- ✅ Auto-fixes errors automatically
- ✅ Creates GitHub issues for failures
- ✅ Zero manual intervention required

---

## 📞 Need Help?

See detailed guides:

- `DEPLOY_WITH_YOUR_KEYS.md` - Full deployment guide
- `STRIPE_SETUP_GUIDE.md` - Stripe configuration
- `CLOUDFLARE_SETUP_GUIDE.md` - Cloudflare Workers

---

**Total Time**: 10 minutes  
**Keys Needed**: 10 total  
**Result**: 95% functionality + autonomous operation
