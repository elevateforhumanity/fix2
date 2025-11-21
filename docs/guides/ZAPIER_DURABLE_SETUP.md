# Zapier → Durable Enrollment Injection Setup

## Strategic Solution: Use Your Existing Zapier

Since you have Zapier set up, we'll use it to trigger the Durable injection worker.

## 🎯 How It Works

```
Zapier Schedule (every 6 hours)
    ↓
Triggers Webhook
    ↓
Calls Cloudflare Worker
    ↓
Worker calls Netlify Function
    ↓
Puppeteer injects enrollment script
    ↓
✅ Enrollment programs live on Durable
```

## 📋 Setup Steps

### Step 1: Get Your Zapier Webhook URL

1. Go to: https://zapier.com/app/zaps
2. Click "Create Zap"
3. **Trigger:** Schedule by Zapier
   - Frequency: Every 6 hours
4. **Action:** Webhooks by Zapier
   - Event: POST
   - URL: `https://durable-injection-worker.YOUR-SUBDOMAIN.workers.dev
   - Payload Type: JSON
   - Data:
     ```json
     {
       "action": "inject_enrollment",
       "timestamp": "{{zap_meta_human_now}}"
     }
     ```
5. **Add Header:**
   - Key: `Authorization`
   - Value: `Bearer YOUR_AUTOPILOT_TOKEN`

### Step 2: Configure Worker Secrets

The Cloudflare Worker needs your Durable credentials:

```bash
# Already set:
✅ DURABLE_PASSWORD

# Still need:
wrangler secret put DURABLE_EMAIL --config wrangler-durable-injection.toml
# Enter: Elevateforhumanity@gmail.com

wrangler secret put AUTOPILOT_TOKEN --config wrangler-durable-injection.toml
# Enter: 7b9645cd105ae8c8ec81d9b05a52ffd46c5832dec703689e37ba295b60f09c77
```

### Step 3: Test the Flow

**Manual Test:**

```bash
curl -X POST https://durable-injection-worker.YOUR-SUBDOMAIN.workers.dev \
  -H "Authorization: Bearer 7b9645cd105ae8c8ec81d9b05a52ffd46c5832dec703689e37ba295b60f09c77" \
  -H "Content-Type: application/json" \
  -d '{"action":"inject_enrollment"}'
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Enrollment script injected successfully",
  "timestamp": "2025-11-03T00:55:00Z"
}
```

## 🔄 Automated Flow

Once Zapier is configured:

1. **Every 6 hours:** Zapier triggers webhook
2. **Worker checks:** Is enrollment script present on www.elevateforhumanity.org?
3. **If missing:** Worker triggers Netlify function
4. **Puppeteer runs:** Logs into Durable, injects script
5. **Script published:** Enrollment programs appear
6. **If present:** Worker does nothing (already injected)

## 📊 Monitoring

**Check if script is present:**

```bash
curl -s https://www.elevateforhumanity.org | grep -q "enrollment-injector.js" && echo "✅ Present" || echo "❌ Missing"
```

**Check worker health:**

```bash
curl https://durable-injection-worker.YOUR-SUBDOMAIN.workers.dev/health
```

## 🎯 Alternative: One-Time Manual Trigger

If you want to trigger it once manually instead of scheduling:

**Zapier Zap:**

1. **Trigger:** Webhook (Catch Hook)
2. **Action:** Webhooks by Zapier (POST to worker)

Then trigger via:

```bash
curl -X POST https://hooks.zapier.com/hooks/catch/YOURWEBHOOKID/
```

## 📝 What You Need to Provide

1. **Your Zapier webhook URL** (after creating the Zap)
2. **Or:** Just tell me to set up the worker secrets and I'll configure everything

## 🚀 Current Status

- ✅ Cloudflare Worker deployed: `durable-injection-worker`
- ✅ Worker code ready
- ✅ Netlify function ready: `durable-inject`
- ✅ Enrollment script ready on Netlify
- ⏳ Need: Zapier webhook configured
- ⏳ Need: Worker secrets set (DURABLE_EMAIL, AUTOPILOT_TOKEN)

## 💡 Why This Works

- **Zero manual work** after initial setup
- **Self-healing** - checks every 6 hours
- **Reliable** - uses your existing Zapier
- **Monitored** - logs all attempts
- **Automated** - runs forever without intervention

---

**Ready to set this up? Just give me your Zapier webhook URL or tell me to configure the worker secrets!**
