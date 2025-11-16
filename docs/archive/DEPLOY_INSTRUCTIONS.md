# 🚀 Deploy Your Video Generation System

## ⚠️ Important: Manual Steps Required

The deployment requires browser-based authentication with Cloudflare. Follow these steps:

---

## 🎯 Quick Deploy (5 Minutes)

### Step 1: Open Terminal

In your local terminal or Gitpod terminal, run:

```bash
cd /workspaces/fix2/workers
wrangler login
```

This will open your browser to login to Cloudflare.

### Step 2: Run Interactive Deployment

```bash
./deploy-interactive.sh
```

This script will:

- ✅ Create all KV namespaces
- ✅ Create R2 buckets
- ✅ Create queues
- ✅ Prompt for API keys
- ✅ Deploy all 3 workers

**Time: ~10-15 minutes**

---

## 📋 What You'll Need

Have these ready before starting:

1. **OpenAI API Key**
   - Get: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

2. **Cloudflare Account ID**
   - Get: [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - Look in right sidebar for "Account ID"
   - Copy the ID

3. **Cloudflare Stream API Token** (Optional but recommended)
   - Get: [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use "Edit Cloudflare Stream" template
   - Copy the token

4. **GitHub Token** (Optional, for auto-sync)
   - Get: [https://github.com/settings/tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Copy the token

---

## 🚀 Deployment Commands

If you prefer manual deployment:

```bash
# 1. Login
wrangler login

# 2. Create KV Namespaces
wrangler kv:namespace create VIDEO_KV
wrangler kv:namespace create TEMPLATES_KV
wrangler kv:namespace create STOCK_MEDIA_KV

# 3. Create R2 Buckets
wrangler r2 bucket create video-temp
wrangler r2 bucket create video-media

# 4. Create Queues
wrangler queues create video-generation-queue
wrangler queues create video-generation-dlq
wrangler queues create media-download-queue
wrangler queues create media-download-dlq

# 5. Update config files with the IDs from step 2
# Edit: wrangler-video.toml, wrangler-template-sync.toml, wrangler-media-download.toml

# 6. Set secrets
wrangler secret put OPENAI_API_KEY --config wrangler-video.toml
wrangler secret put CLOUDFLARE_ACCOUNT_ID --config wrangler-video.toml
wrangler secret put CLOUDFLARE_STREAM_API_TOKEN --config wrangler-video.toml
wrangler secret put GITHUB_TOKEN --config wrangler-template-sync.toml

# 7. Deploy all workers
./deploy-all.sh
```

---

## ✅ After Deployment

### Test Your Workers

```bash
# Get your worker URLs from deployment output, then:

# Test template sync
curl https://template-sync-worker.YOUR_SUBDOMAIN.workers.dev/health

# Test media download
curl https://media-download-worker.YOUR_SUBDOMAIN.workers.dev/health

# Test video generation
curl https://video-generation-worker.YOUR_SUBDOMAIN.workers.dev/health
```

### Initial Sync

```bash
# Sync templates from GitHub
curl -X POST https://template-sync-worker.YOUR_SUBDOMAIN.workers.dev/sync

# Download stock media
curl -X POST https://media-download-worker.YOUR_SUBDOMAIN.workers.dev/download-all
```

### Generate Your First Video

```bash
curl -X POST https://video-generation-worker.YOUR_SUBDOMAIN.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Video",
    "scenes": [
      {
        "id": "scene-1",
        "type": "title",
        "duration": 5,
        "script": "Welcome to AI Video Generation",
        "voiceOver": true,
        "background": "#2563EB",
        "textPosition": "center",
        "animation": "fade"
      }
    ],
    "settings": {
      "format": "16:9",
      "resolution": "1080p",
      "voiceOver": true,
      "voice": "alloy"
    }
  }'
```

---

## 📊 What Gets Deployed

### 3 Cloudflare Workers:

1. **Template Sync Worker**
   - Syncs templates from GitHub
   - Runs daily at 3 AM UTC
   - Webhook for instant updates

2. **Media Download Worker**
   - Downloads stock media to R2
   - Runs monthly on 1st at 4 AM UTC
   - Caches for faster access

3. **Video Generation Worker**
   - Generates videos with TTS
   - Runs weekly on Sundays at 2 AM UTC
   - Queue-based processing

### Resources Created:

- ✅ 3 KV Namespaces (key-value storage)
- ✅ 2 R2 Buckets (object storage)
- ✅ 4 Queues (job processing)
- ✅ Scheduled cron jobs
- ✅ Global CDN deployment

---

## 💰 Cost Breakdown

### Cloudflare (Free Tier):

- Workers: 100,000 requests/day ✅ FREE
- KV: 100,000 reads/day ✅ FREE
- R2: 10 GB storage ✅ FREE
- Queues: 1M operations/month ✅ FREE

### OpenAI TTS:

- $15 per 1M characters
- ~$0.04 per video
- **~$1-5/month**

### Total: ~$1-5/month 🎉

---

## 🔄 Automatic Schedules

After deployment, these run automatically:

**Daily (3 AM UTC):**

```
Template Sync Worker → Syncs from GitHub
```

**Weekly (Sunday 2 AM UTC):**

```
Video Generation Worker → Generates all template videos
```

**Monthly (1st at 4 AM UTC):**

```
Media Download Worker → Downloads stock media
```

---

## 🐛 Troubleshooting

### "Not authenticated"

```bash
wrangler logout
wrangler login
```

### "KV namespace not found"

```bash
# List existing namespaces
wrangler kv:namespace list

# Create if missing
wrangler kv:namespace create VIDEO_KV
```

### "Deployment failed"

```bash
# Check logs
wrangler tail --config wrangler-video.toml

# Force redeploy
wrangler deploy --config wrangler-video.toml --force
```

### "Secret not set"

```bash
# List secrets
wrangler secret list --config wrangler-video.toml

# Set missing secret
wrangler secret put OPENAI_API_KEY --config wrangler-video.toml
```

---

## 📚 Documentation

- **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Detailed step-by-step guide
- **[CLOUDFLARE_WORKERS_DEPLOY.md](CLOUDFLARE_WORKERS_DEPLOY.md)** - Complete reference
- **[GET_API_KEYS.md](GET_API_KEYS.md)** - How to get API keys
- **[VIDEO_SYSTEM_README.md](VIDEO_SYSTEM_README.md)** - System overview

---

## 🎯 Quick Start

**Easiest way to deploy:**

```bash
cd /workspaces/fix2/workers
wrangler login
./deploy-interactive.sh
```

**That's it!** The script handles everything else.

---

## ✅ Deployment Checklist

- [ ] Have OpenAI API key ready
- [ ] Have Cloudflare account
- [ ] Run `wrangler login`
- [ ] Run `./deploy-interactive.sh`
- [ ] Test worker endpoints
- [ ] Sync templates
- [ ] Download media
- [ ] Generate first video
- [ ] Setup GitHub webhook (optional)
- [ ] Monitor logs

---

## 🆘 Need Help?

**Cloudflare Dashboard:**

- Workers: https://dash.cloudflare.com/workers
- KV: https://dash.cloudflare.com/kv
- R2: https://dash.cloudflare.com/r2
- Stream: https://dash.cloudflare.com/stream

**Documentation:**

- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

**Support:**

- Cloudflare Community: https://community.cloudflare.com/
- GitHub Issues: https://github.com/elevateforhumanity/fix2/issues

---

## 🎉 You're Ready!

Everything is prepared and ready to deploy. Just run:

```bash
cd /workspaces/fix2/workers
wrangler login
./deploy-interactive.sh
```

**Time to deploy: ~15 minutes**

**Result: Fully automated video generation system running on Cloudflare's global network!**

---

**Status:** ✅ All code ready  
**Next Step:** Run `wrangler login` to start deployment  
**Support:** Check documentation above if you need help
