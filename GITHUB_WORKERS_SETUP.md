# 🤖 GitHub Actions & Cloudflare Workers Setup

## Overview

Automated video generation system with:
- ✅ GitHub Actions for CI/CD
- ✅ Cloudflare Workers for serverless processing
- ✅ Automatic media downloads
- ✅ Scheduled video generation
- ✅ Queue-based job processing

---

## 🚀 GitHub Actions Setup

### 1. Add GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions

**Required Secrets:**
```
OPENAI_API_KEY=sk-your-openai-key
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_STREAM_API_TOKEN=your-stream-token
```

**How to add:**
1. Click "New repository secret"
2. Name: `OPENAI_API_KEY`
3. Value: Your OpenAI API key
4. Click "Add secret"
5. Repeat for other secrets

### 2. GitHub Workflows Created

#### **Video Generation Workflow** (`.github/workflows/video-generation.yml`)
**Triggers:**
- Manual: Click "Run workflow" in Actions tab
- Schedule: Weekly on Sundays at 2 AM UTC
- Push: When templates are updated

**What it does:**
1. Downloads stock media
2. Generates videos from all templates
3. Uploads to Cloudflare Stream
4. Creates GitHub release with videos
5. Stores artifacts for 30 days

**Run manually:**
1. Go to Actions tab
2. Select "Video Generation Worker"
3. Click "Run workflow"
4. Choose options:
   - Generate all templates: Yes/No
   - Template ID: (optional, specific template)

#### **Download Media Workflow** (`.github/workflows/download-media.yml`)
**Triggers:**
- Manual: Click "Run workflow"
- Schedule: Monthly on the 1st at 3 AM UTC

**What it does:**
1. Downloads all stock images and videos
2. Commits to repository
3. Updates local media paths
4. Stores artifacts for 90 days

#### **Test Video System Workflow** (`.github/workflows/test-video-system.yml`)
**Triggers:**
- Push to main/develop
- Pull requests
- Manual

**What it does:**
1. Runs TypeScript checks
2. Runs linter
3. Builds project
4. Tests video generation
5. Comments on PRs with results

### 3. Enable GitHub Actions

1. Go to repository → Settings → Actions → General
2. Under "Actions permissions", select:
   - ✅ Allow all actions and reusable workflows
3. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests
4. Click "Save"

### 4. Run Your First Workflow

```bash
# Option 1: Via GitHub UI
# 1. Go to Actions tab
# 2. Select "Video Generation Worker"
# 3. Click "Run workflow"

# Option 2: Via GitHub CLI
gh workflow run video-generation.yml

# Option 3: Via API
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/OWNER/REPO/actions/workflows/video-generation.yml/dispatches \
  -d '{"ref":"main"}'
```

---

## ☁️ Cloudflare Workers Setup

### 1. Install Wrangler CLI

```bash
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

### 2. Create KV Namespace

```bash
# Create production KV namespace
wrangler kv:namespace create VIDEO_KV

# Note the ID, update wrangler-video.toml
```

### 3. Create Queue

```bash
# Create video generation queue
wrangler queues create video-generation-queue

# Create dead letter queue
wrangler queues create video-generation-dlq
```

### 4. Set Secrets

```bash
# Set OpenAI API key
wrangler secret put OPENAI_API_KEY

# Set Cloudflare Account ID
wrangler secret put CLOUDFLARE_ACCOUNT_ID

# Set Cloudflare Stream API token
wrangler secret put CLOUDFLARE_STREAM_API_TOKEN
```

### 5. Update wrangler-video.toml

```toml
# Update with your KV namespace ID
[[kv_namespaces]]
binding = "VIDEO_KV"
id = "your_actual_kv_namespace_id"  # From step 2

# Update with your domain
routes = [
  { pattern = "video-api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

### 6. Deploy Worker

```bash
# Deploy to Cloudflare
cd workers
wrangler deploy --config wrangler-video.toml

# Test the worker
curl https://video-generation-worker.your-subdomain.workers.dev/health
```

### 7. Test Worker Endpoints

```bash
# Health check
curl https://your-worker-url/health

# Generate video
curl -X POST https://your-worker-url/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Video",
    "scenes": [...],
    "settings": {...}
  }'

# Check status
curl https://your-worker-url/api/video/status/JOB_ID

# List jobs
curl https://your-worker-url/api/video/jobs?userId=USER_ID
```

---

## 🔄 Workflow Integration

### Automatic Video Generation

**When templates are updated:**
1. Push changes to `src/data/video-templates.ts`
2. GitHub Action automatically triggers
3. Downloads latest stock media
4. Generates videos for updated templates
5. Uploads to Cloudflare Stream
6. Creates release with videos

**Weekly scheduled generation:**
1. Every Sunday at 2 AM UTC
2. Regenerates all template videos
3. Ensures fresh content
4. Updates Cloudflare Stream

### Manual Triggers

**Generate specific template:**
```bash
# Via GitHub CLI
gh workflow run video-generation.yml \
  -f template_id=wioa-program-overview

# Via GitHub UI
# Actions → Video Generation Worker → Run workflow
# Enter template ID: wioa-program-overview
```

**Generate all templates:**
```bash
gh workflow run video-generation.yml \
  -f generate_all=true
```

**Download media only:**
```bash
gh workflow run download-media.yml
```

---

## 📊 Monitoring & Logs

### GitHub Actions Logs

1. Go to Actions tab
2. Click on workflow run
3. View logs for each step
4. Download artifacts (videos, media)

### Cloudflare Worker Logs

```bash
# Tail logs in real-time
wrangler tail --config wrangler-video.toml

# View logs in dashboard
# https://dash.cloudflare.com → Workers → video-generation-worker → Logs
```

### Check Job Status

```bash
# Via worker API
curl https://your-worker-url/api/video/status/JOB_ID

# Via Cloudflare KV
wrangler kv:key get --binding=VIDEO_KV "job:JOB_ID"
```

---

## 💰 Cost Estimates

### GitHub Actions
- **Free tier:** 2,000 minutes/month
- **Video generation:** ~30-60 min/run
- **Estimated:** 30-60 runs/month free

### Cloudflare Workers
- **Free tier:** 100,000 requests/day
- **KV:** 100,000 reads/day, 1,000 writes/day
- **Queues:** 1,000,000 operations/month
- **Estimated:** Free for most use cases

### Total Monthly Cost
- **Small usage:** $0 (within free tiers)
- **Medium usage:** $5-10 (OpenAI TTS)
- **Large usage:** $20-50 (OpenAI + Cloudflare)

---

## 🔧 Configuration

### Environment Variables

**GitHub Actions:**
```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  CLOUDFLARE_STREAM_API_TOKEN: ${{ secrets.CLOUDFLARE_STREAM_API_TOKEN }}
  STORAGE_TYPE: cloudflare-stream
```

**Cloudflare Worker:**
```toml
[vars]
ENVIRONMENT = "production"
STORAGE_TYPE = "cloudflare-stream"
```

### Cron Schedules

**Video Generation (Weekly):**
```yaml
schedule:
  - cron: '0 2 * * 0'  # Sundays at 2 AM UTC
```

**Media Download (Monthly):**
```yaml
schedule:
  - cron: '0 3 1 * *'  # 1st of month at 3 AM UTC
```

**Custom schedules:**
```
'0 0 * * *'    # Daily at midnight
'0 */6 * * *'  # Every 6 hours
'0 0 * * 1'    # Every Monday
'0 0 1 * *'    # First day of month
```

---

## 🐛 Troubleshooting

### GitHub Actions Fails

**"OpenAI API key not configured"**
- Check secrets are set correctly
- Verify secret name matches workflow
- Ensure no extra spaces in secret value

**"FFmpeg not found"**
- Already installed in workflow
- Check Ubuntu version compatibility
- Verify installation step runs

**"Out of memory"**
- Reduce video resolution in workflow
- Generate fewer videos at once
- Use GitHub's larger runners (paid)

### Cloudflare Worker Issues

**"KV namespace not found"**
- Create KV namespace: `wrangler kv:namespace create VIDEO_KV`
- Update ID in wrangler-video.toml
- Redeploy worker

**"Queue not found"**
- Create queue: `wrangler queues create video-generation-queue`
- Update wrangler-video.toml
- Redeploy worker

**"Secrets not set"**
- Set secrets: `wrangler secret put SECRET_NAME`
- Verify in Cloudflare dashboard
- Redeploy worker

### Worker Deployment Fails

```bash
# Check configuration
wrangler deploy --config wrangler-video.toml --dry-run

# View detailed logs
wrangler deploy --config wrangler-video.toml --verbose

# Check worker status
wrangler deployments list --config wrangler-video.toml
```

---

## 📚 Additional Resources

### GitHub Actions
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub CLI](https://cli.github.com/)

### Cloudflare Workers
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [KV Storage](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Queues](https://developers.cloudflare.com/queues/)

### Video Generation
- [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech)
- [Cloudflare Stream](https://developers.cloudflare.com/stream/)
- [FFmpeg](https://ffmpeg.org/documentation.html)

---

## ✅ Quick Start Checklist

- [ ] Add GitHub secrets (OpenAI, Cloudflare)
- [ ] Enable GitHub Actions in repository settings
- [ ] Install Wrangler CLI
- [ ] Login to Cloudflare
- [ ] Create KV namespace
- [ ] Create queues
- [ ] Set worker secrets
- [ ] Update wrangler-video.toml
- [ ] Deploy worker
- [ ] Test worker endpoints
- [ ] Run first GitHub Action
- [ ] Verify videos generated
- [ ] Check Cloudflare Stream

---

**Status:** ✅ Ready to deploy  
**Last Updated:** January 2025
