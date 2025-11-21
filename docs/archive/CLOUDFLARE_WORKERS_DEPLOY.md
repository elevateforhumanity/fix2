# ☁️ Cloudflare Workers Deployment Guide

## Overview

Complete serverless video generation system running on Cloudflare Workers:

1. **Video Generation Worker** - Generates videos with TTS and uploads to Stream
2. **Template Sync Worker** - Syncs templates from GitHub to KV
3. **Media Download Worker** - Downloads stock media to R2

All workers run automatically on schedules or can be triggered manually.

---

## 🚀 Quick Deploy

```bash
# 1. Install Wrangler
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Deploy all workers
cd workers
./deploy-all.sh
```

---

## 📋 Prerequisites

### 1. Cloudflare Account

- Sign up at [dash.cloudflare.com](https://dash.cloudflare.com)
- Free tier includes:
  - 100,000 requests/day
  - 10 GB R2 storage
  - Unlimited KV reads (1,000 writes/day)

### 2. API Keys

- **OpenAI API Key:** [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **GitHub Token:** [github.com/settings/tokens](https://github.com/settings/tokens)
- **Cloudflare Stream Token:** [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

### 3. Wrangler CLI

```bash
npm install -g wrangler
wrangler --version
```

---

## 🔧 Step-by-Step Setup

### Step 1: Create KV Namespaces

```bash
# Video jobs storage
wrangler kv:namespace create VIDEO_KV
# Note the ID: abc123...

# Templates storage
wrangler kv:namespace create TEMPLATES_KV
# Note the ID: def456...

# Stock media metadata
wrangler kv:namespace create STOCK_MEDIA_KV
# Note the ID: ghi789...
```

**Update wrangler configs with IDs:**

- `wrangler-video.toml` → VIDEO_KV and TEMPLATES_KV
- `wrangler-template-sync.toml` → TEMPLATES_KV and STOCK_MEDIA_KV
- `wrangler-media-download.toml` → STOCK_MEDIA_KV

### Step 2: Create R2 Buckets

```bash
# Temporary video storage
wrangler r2 bucket create video-temp

# Media storage
wrangler r2 bucket create video-media
```

### Step 3: Create Queues

```bash
# Video generation queue
wrangler queues create video-generation-queue
wrangler queues create video-generation-dlq

# Media download queue
wrangler queues create media-download-queue
wrangler queues create media-download-dlq
```

### Step 4: Set Secrets

```bash
# For video-generation-worker
cd workers
wrangler secret put OPENAI_API_KEY --config wrangler-video.toml
wrangler secret put CLOUDFLARE_ACCOUNT_ID --config wrangler-video.toml
wrangler secret put CLOUDFLARE_STREAM_API_TOKEN --config wrangler-video.toml

# For template-sync-worker
wrangler secret put GITHUB_TOKEN --config wrangler-template-sync.toml

# Verify secrets
wrangler secret list --config wrangler-video.toml
```

### Step 5: Deploy Workers

```bash
# Deploy video generation worker
wrangler deploy --config wrangler-video.toml

# Deploy template sync worker
wrangler deploy --config wrangler-template-sync.toml

# Deploy media download worker
wrangler deploy --config wrangler-media-download.toml
```

### Step 6: Test Deployments

```bash
# Test video worker
curl https://video-generation-worker.your-subdomain.workers.dev/health

# Test template sync worker
curl https://template-sync-worker.your-subdomain.workers.dev/health

# Test media download worker
curl https://media-download-worker.your-subdomain.workers.dev/health
```

---

## 🎯 Worker Functions

### 1. Video Generation Worker

**Endpoints:**

```bash
# Health check
GET /health

# Generate video
POST /api/video/generate
{
  "title": "My Video",
  "scenes": [...],
  "settings": {...}
}

# Check status
GET /api/video/status/:jobId

# List jobs
GET /api/video/jobs?userId=USER_ID
```

**Scheduled Task:**

- Runs weekly on Sundays at 2 AM UTC
- Generates videos for all templates
- Uploads to Cloudflare Stream

**Manual Trigger:**

```bash
# Trigger scheduled task manually
wrangler deploy --config wrangler-video.toml --test-scheduled
```

### 2. Template Sync Worker

**Endpoints:**

```bash
# Health check
GET /health

# Sync templates from GitHub
POST /sync

# Get templates
GET /templates

# Get stock media
GET /stock-media

# GitHub webhook
POST /webhook
```

**Scheduled Task:**

- Runs daily at 3 AM UTC
- Syncs templates from GitHub
- Updates KV storage

**Manual Sync:**

```bash
curl -X POST https://template-sync-worker.your-subdomain.workers.dev/sync
```

### 3. Media Download Worker

**Endpoints:**

```bash
# Health check
GET /health

# Download all media
POST /download-all

# Get media file
GET /media/:filename

# List media
GET /media?prefix=images/&limit=100

# Get stats
GET /stats
```

**Scheduled Task:**

- Runs monthly on 1st at 4 AM UTC
- Downloads all stock media to R2
- Caches for faster access

**Manual Download:**

```bash
curl -X POST https://media-download-worker.your-subdomain.workers.dev/download-all
```

---

## 🔄 Workflow

### Automatic Flow

1. **Daily (3 AM UTC):**
   - Template Sync Worker syncs from GitHub
   - Updates templates and media metadata in KV

2. **Weekly (Sunday 2 AM UTC):**
   - Video Generation Worker reads templates from KV
   - Generates videos for all templates
   - Uploads to Cloudflare Stream

3. **Monthly (1st at 4 AM UTC):**
   - Media Download Worker downloads all stock media
   - Stores in R2 for faster access

### Manual Triggers

**Generate video on-demand:**

```bash
curl -X POST https://video-generation-worker.your-subdomain.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Video",
    "scenes": [...],
    "settings": {...}
  }'
```

**Sync templates immediately:**

```bash
curl -X POST https://template-sync-worker.your-subdomain.workers.dev/sync
```

**Download media immediately:**

```bash
curl -X POST https://media-download-worker.your-subdomain.workers.dev/download-all
```

---

## 📊 Monitoring

### View Logs

```bash
# Tail logs in real-time
wrangler tail --config wrangler-video.toml
wrangler tail --config wrangler-template-sync.toml
wrangler tail --config wrangler-media-download.toml

# View in dashboard
# https://dash.cloudflare.com → Workers → [worker-name] → Logs
```

### Check Queue Status

```bash
# List queues
wrangler queues list

# Get queue details
wrangler queues get video-generation-queue
```

### Check KV Storage

```bash
# List keys
wrangler kv:key list --binding=VIDEO_KV --config wrangler-video.toml

# Get value
wrangler kv:key get "job:JOB_ID" --binding=VIDEO_KV --config wrangler-video.toml
```

### Check R2 Storage

```bash
# List objects
wrangler r2 object list video-temp
wrangler r2 object list video-media

# Get object info
wrangler r2 object get video-media/images/img-business-1.jpg
```

---

## 🔗 GitHub Integration

### Setup Webhook

1. Go to GitHub repository → Settings → Webhooks
2. Add webhook:
   - **Payload URL:** `https://template-sync-worker.your-subdomain.workers.dev/webhook
   - **Content type:** `application/json`
   - **Events:** Push events
3. Save webhook

**What it does:**

- Automatically syncs templates when you push changes
- Updates KV storage immediately
- No manual sync needed

### Test Webhook

```bash
# Push changes to templates
git add src/data/video-templates.ts
git commit -m "Update templates"
git push

# Worker automatically syncs within seconds
# Check logs:
wrangler tail --config wrangler-template-sync.toml
```

---

## 💰 Cost Estimates

### Cloudflare Workers

- **Free tier:** 100,000 requests/day
- **Paid:** $5/month for 10M requests
- **Estimated:** Free for most use cases

### KV Storage

- **Free tier:** 100,000 reads/day, 1,000 writes/day
- **Paid:** $0.50/million reads, $5/million writes
- **Estimated:** Free for most use cases

### R2 Storage

- **Free tier:** 10 GB storage
- **Paid:** $0.015/GB/month
- **Estimated:** $0-1/month for media

### Queues

- **Free tier:** 1,000,000 operations/month
- **Paid:** $0.40/million operations
- **Estimated:** Free for most use cases

### Total Monthly Cost

- **Small usage:** $0 (within free tiers)
- **Medium usage:** $5-10 (OpenAI TTS)
- **Large usage:** $20-30 (OpenAI + Cloudflare)

---

## 🐛 Troubleshooting

### Worker Deployment Fails

**"KV namespace not found"**

```bash
# Create namespace
wrangler kv:namespace create VIDEO_KV

# Update wrangler.toml with ID
# Redeploy
wrangler deploy --config wrangler-video.toml
```

**"R2 bucket not found"**

```bash
# Create bucket
wrangler r2 bucket create video-temp

# Verify
wrangler r2 bucket list
```

**"Queue not found"**

```bash
# Create queue
wrangler queues create video-generation-queue

# Verify
wrangler queues list
```

### Secrets Not Working

```bash
# List secrets
wrangler secret list --config wrangler-video.toml

# Delete and recreate
wrangler secret delete OPENAI_API_KEY --config wrangler-video.toml
wrangler secret put OPENAI_API_KEY --config wrangler-video.toml
```

### Worker Not Responding

```bash
# Check deployment status
wrangler deployments list --config wrangler-video.toml

# View logs
wrangler tail --config wrangler-video.toml

# Redeploy
wrangler deploy --config wrangler-video.toml --force
```

### Queue Jobs Stuck

```bash
# Check queue status
wrangler queues get video-generation-queue

# Check dead letter queue
wrangler queues get video-generation-dlq

# Purge queue (if needed)
wrangler queues purge video-generation-queue
```

---

## 🔒 Security

### Best Practices

1. **Use Secrets for API Keys**
   - Never hardcode keys in code
   - Use `wrangler secret put`
   - Rotate keys regularly

2. **Limit Worker Permissions**
   - Use minimal KV/R2 permissions
   - Separate workers by function
   - Use different API tokens

3. **Validate Inputs**
   - Check all user inputs
   - Sanitize file paths
   - Limit request sizes

4. **Monitor Usage**
   - Set up alerts for high usage
   - Monitor queue depths
   - Track error rates

### API Token Permissions

**For Video Worker:**

- Stream: Read, Edit
- R2: Read, Write (video-temp bucket)
- KV: Read, Write (VIDEO_KV, TEMPLATES_KV)

**For Template Sync:**

- KV: Read, Write (TEMPLATES_KV, STOCK_MEDIA_KV)

**For Media Download:**

- R2: Read, Write (video-media bucket)
- KV: Read (STOCK_MEDIA_KV)

---

## 📚 Additional Resources

### Cloudflare Docs

- [Workers](https://developers.cloudflare.com/workers/)
- [KV Storage](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [R2 Storage](https://developers.cloudflare.com/r2/)
- [Queues](https://developers.cloudflare.com/queues/)
- [Stream](https://developers.cloudflare.com/stream/)

### Wrangler CLI

- [Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Commands](https://developers.cloudflare.com/workers/wrangler/commands/)
- [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)

---

## ✅ Deployment Checklist

- [ ] Install Wrangler CLI
- [ ] Login to Cloudflare
- [ ] Create KV namespaces (3)
- [ ] Create R2 buckets (2)
- [ ] Create queues (4)
- [ ] Update wrangler configs with IDs
- [ ] Set all secrets
- [ ] Deploy video worker
- [ ] Deploy template sync worker
- [ ] Deploy media download worker
- [ ] Test all endpoints
- [ ] Setup GitHub webhook
- [ ] Verify scheduled tasks
- [ ] Monitor logs

---

## 🎉 You're Done!

Your video generation system is now running on Cloudflare Workers!

**Test it:**

```bash
# Generate a video
curl -X POST https://video-generation-worker.your-subdomain.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d @test-video.json

# Check status
curl https://video-generation-worker.your-subdomain.workers.dev/api/video/status/JOBID
```

**Monitor it:**

```bash
wrangler tail --config wrangler-video.toml
```

---

**Status:** ✅ Ready to deploy  
**Last Updated:** January 2025
