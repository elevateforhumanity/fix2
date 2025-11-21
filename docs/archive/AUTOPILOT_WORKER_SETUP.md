# 🤖 AUTOPILOT WORKER SETUP - STEP BY STEP

## What This Will Do

The autopilot worker will:

1. ✅ Add `elevateforhumanity.org` to Netlify automatically
2. ✅ Provision SSL certificate
3. ✅ Trigger cache-clearing rebuild
4. ✅ Fix the SSL error completely

**Time**: 10-15 minutes setup, then 2-10 minutes for SSL

---

## STEP 1: Login to Cloudflare

```bash
cd /workspaces/fix2/workers
wrangler login
```

This will:

- Open a browser window
- Ask you to authorize Wrangler
- Save your credentials

**If browser doesn't open:**

- Copy the URL from terminal
- Paste in browser
- Authorize
- Return to terminal

---

## STEP 2: Deploy the Worker

```bash
wrangler deploy
```

This will:

- Build the worker
- Deploy to Cloudflare
- Give you a worker URL

**Expected output:**

```
✨ Built successfully
🌎 Deploying...
✨ Deployed autopilot-deploy
   https://autopilot-deploy.YOURSUBDOMAIN.workers.dev
```

**Save this URL!** You'll need it.

---

## STEP 3: Get Netlify API Token

1. Go to: https://app.netlify.com/user/applications
2. Click **"New access token"**
3. Name it: **"Autopilot Worker"**
4. Click **"Generate token"**
5. **Copy the token** (you'll only see it once!)

---

## STEP 4: Set Worker Secrets

Now set the secrets the worker needs:

### 4a. Netlify Token

```bash
wrangler secret put NETLIFY_TOKEN
```

Paste the token from Step 3

### 4b. Netlify Site ID

```bash
wrangler secret put NETLIFY_SITE_ID
```

Enter: `12f120ab-3f63-419b-bc49-430f043415c1`

### 4c. Autopilot Token

```bash
wrangler secret put AUTOPILOT_TOKEN
```

Enter a secure token (make one up, like: `autopilot-secure-token-12345`)

### 4d. Supabase URL

```bash
wrangler secret put SUPABASE_URL
```

Enter: `https://cuxzzpsyufcewtmicszk.supabase.co

---

## STEP 5: Trigger the Worker

Now trigger the worker to add the domain:

```bash
cd /workspaces/fix2
export AUTOPILOT_TOKEN='the-token-you-created-in-4c'
bash scripts/trigger-autopilot-worker.sh
```

**Expected output:**

```
🤖 TRIGGERING AUTOPILOT WORKER
================================

Target: elevateforhumanity.org
Worker: https://autopilot-deploy.YOURSUBDOMAIN.workers.dev

Sending request to autopilot worker...
Response:
{
  "ok": true,
  "result": {
    "steps": [
      {
        "step": "add_domain",
        "status": "success",
        "result": {
          "status": "added",
          "domain": "elevateforhumanity.org",
          "message": "Domain added successfully, SSL provisioning started"
        }
      },
      {
        "step": "check_ssl",
        "status": "success"
      },
      {
        "step": "trigger_deploy",
        "status": "success"
      }
    ],
    "status": "complete",
    "message": "Domain elevateforhumanity.org configuration complete. SSL certificate will be ready in 2-10 minutes."
  }
}

✅ Autopilot worker executed successfully!
```

---

## STEP 6: Wait for SSL

The worker has added the domain. Now wait for SSL:

```bash
# Check SSL status every minute
bash scripts/autopilot-check-ssl.sh
```

**When SSL is ready, you'll see:**

```
✅ Valid SSL for elevateforhumanity.org
```

---

## STEP 7: Test the Site

Once SSL is ready:

1. **Clear browser cache**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Visit**: https://www.elevateforhumanity.org
3. **Verify**:
   - ✅ No SSL errors
   - ✅ Site loads correctly
   - ✅ All styling visible
   - ✅ All images loading

---

## TROUBLESHOOTING

### "You are not authenticated"

```bash
wrangler login
```

Follow the browser prompts

### "Failed to add domain"

Check the error message. Common issues:

- Domain already added (that's OK!)
- Invalid Netlify token
- Wrong site ID

### "Worker not found"

Make sure you deployed:

```bash
cd /workspaces/fix2/workers
wrangler deploy
```

### "Unauthorized"

Check your AUTOPILOT_TOKEN matches what you set:

```bash
export AUTOPILOT_TOKEN='your-token-here'
```

---

## ALTERNATIVE: Manual Fallback

If the worker doesn't work, you can still add the domain manually:

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/domain
2. Click "Add domain alias"
3. Enter: `elevateforhumanity.org`
4. Click "Add domain"
5. Wait 2-10 minutes for SSL

---

## WHAT HAPPENS BEHIND THE SCENES

When you trigger the worker:

1. **Worker receives request** with domain name
2. **Calls Netlify API** to add custom domain
3. **Netlify provisions SSL** (Let's Encrypt certificate)
4. **Worker triggers rebuild** to clear cache
5. **Returns status** to you

All automatic! 🎉

---

## VERIFICATION COMMANDS

### Check worker is deployed:

```bash
curl https://autopilot-deploy.YOURSUBDOMAIN.workers.dev
```

### Check domain was added:

```bash
curl -H "Authorization: Bearer YOUR_NETLIFY_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1
```

### Check SSL certificate:

```bash
curl -Ivk https://www.elevateforhumanity.org 2>&1 | grep "subject:"
```

---

## SUMMARY

**Setup Steps:**

1. ✅ Login to Cloudflare (`wrangler login`)
2. ✅ Deploy worker (`wrangler deploy`)
3. ✅ Get Netlify token
4. ✅ Set worker secrets (4 secrets)
5. ✅ Trigger worker
6. ✅ Wait for SSL (2-10 min)
7. ✅ Test site

**Total Time:**

- Setup: 10-15 minutes (one time)
- SSL wait: 2-10 minutes
- Total: 15-25 minutes

**Result:**

- ✅ Domain added to Netlify
- ✅ SSL certificate provisioned
- ✅ Site accessible at https://www.elevateforhumanity.org
- ✅ No more SSL errors!

---

## READY TO START?

Run these commands in order:

```bash
# 1. Login
cd /workspaces/fix2/workers
wrangler login

# 2. Deploy
wrangler deploy

# 3. Set secrets (you'll be prompted for each)
wrangler secret put NETLIFY_TOKEN
wrangler secret put NETLIFY_SITE_ID
wrangler secret put AUTOPILOT_TOKEN
wrangler secret put SUPABASE_URL

# 4. Trigger
cd /workspaces/fix2
export AUTOPILOT_TOKEN='your-token'
bash scripts/trigger-autopilot-worker.sh

# 5. Monitor
bash scripts/autopilot-check-ssl.sh
```

**Let's do this!** 🚀
