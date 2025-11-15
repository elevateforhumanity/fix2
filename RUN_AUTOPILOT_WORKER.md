# 🤖 RUN AUTOPILOT WORKER - 1 Command

## This worker will automatically:

1. ✅ Fetch your Vercel Organization ID
2. ✅ Fetch your Vercel Project ID
3. ✅ Set all 7 environment variables in Vercel
4. ✅ Trigger a new deployment
5. ✅ Save configuration for GitHub Secrets

---

## ✅ Run This One Command:

```bash
node scripts/autopilot-get-vercel-ids.mjs CatFXMsC0PPzwulHl0CrRtfI
```

That's it! The worker will do everything automatically.

---

## 📊 What It Does:

### Step 1: Fetches Your Vercel Info

- Gets your Organization/Team ID
- Finds your fix2 project
- Gets the Project ID

### Step 2: Configures Environment Variables

Sets these 7 variables in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NODE_ENV`

### Step 3: Triggers Deployment

- Automatically triggers a new Vercel deployment
- Your site will be live in 2-3 minutes

### Step 4: Saves Configuration

- Creates `.vercel-autopilot-config.json`
- Shows you the IDs for GitHub Secrets (optional)

---

## 🎯 Expected Output:

```
🤖 Autopilot Worker: Fetching Vercel Configuration

📋 Step 1: Fetching Vercel account info...
✅ Logged in as: your-username
✅ User ID: user_xxxxx

📋 Step 2: Fetching Vercel projects...
✅ Found 1 project(s)
✅ Found project: fix2-1c7w
✅ Project ID: prj_xxxxx

📋 Step 3: Preparing environment variables...
✅ Prepared 7 environment variables

📋 Step 4: Setting environment variables in Vercel...
✅ Set NEXT_PUBLIC_SUPABASE_URL
✅ Set NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ Set SUPABASE_SERVICE_ROLE_KEY
✅ Set NEXT_PUBLIC_APP_URL
✅ Set NEXT_PUBLIC_SITE_URL
✅ Set NEXT_PUBLIC_BASE_URL
✅ Set NODE_ENV

📋 Step 5: Triggering Vercel deployment...
✅ Deployment triggered

📋 Step 6: Saving configuration...
✅ Configuration saved

🎉 AUTOPILOT CONFIGURATION COMPLETE

Your site should be live in 2-3 minutes!
```

---

## 🔗 After It Completes:

1. **Wait 2-3 minutes** for Vercel to build and deploy

2. **Visit your site**: [https://elevateconnectsdirectory.org](https://elevateconnectsdirectory.org)

3. **Check Vercel dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)

4. **(Optional) Add GitHub Secrets**: The worker will show you the exact values to add

---

## 🆘 If It Fails:

**"Vercel API error: 401"**

- Token is invalid or expired
- Generate a new token at: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)

**"No projects found"**

- Token doesn't have access to the project
- Check you're logged into the correct Vercel account

**"Failed to set environment variable"**

- Token needs "Full Account" permissions
- Regenerate token with correct scope

---

## 🚀 Ready to Run?

Just copy and paste this command:

```bash
node scripts/autopilot-get-vercel-ids.mjs CatFXMsC0PPzwulHl0CrRtfI
```

The worker will handle everything else! 🤖
