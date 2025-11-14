# 🎬 Set Up AI Video Builder with Cloudflare Workers

## Quick Start (One Command)

```bash
./setup-video-workers.sh
```

This interactive script will guide you through the entire setup process.

---

## What You Need

1. **Cloudflare Account** (free)
   - Sign up: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

2. **API Token** (takes 2 minutes)
   - Get it: [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

3. **Account ID** (visible in dashboard)
   - Find it: [https://dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages

---

## Step-by-Step Instructions

### Option 1: Automated Setup (Recommended)

```bash
./setup-video-workers.sh
```

The script will:
1. ✅ Ask for your API token
2. ✅ Ask for your Account ID
3. ✅ Save credentials to .env
4. ✅ Install wrangler CLI
5. ✅ Authenticate with Cloudflare
6. ✅ Deploy all 3 workers
7. ✅ Test the system
8. ✅ Provide access URLs

**Time:** 15-20 minutes (mostly waiting for deployments)

### Option 2: Manual Setup

If you prefer to do it manually:

#### 1. Get API Token

```bash
# Open this URL:
https://dash.cloudflare.com/profile/api-tokens

# Click "Create Token"
# Use "Edit Cloudflare Workers" template
# Add permissions:
#   - Workers R2 Storage (Edit)
#   - Workers Scripts (Edit)
# Create and copy the token
```

#### 2. Get Account ID

```bash
# Open this URL:
https://dash.cloudflare.com

# Click "Workers & Pages" in sidebar
# Copy the "Account ID" from the right side
```

#### 3. Save Credentials

```bash
# Add to .env file
echo "CLOUDFLARE_API_TOKEN=your_token_here" >> .env
echo "CLOUDFLARE_ACCOUNT_ID=your_account_id_here" >> .env
```

#### 4. Install and Login

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

#### 5. Deploy Workers

```bash
# Deploy all workers
cd workers
./deploy-all.sh
```

#### 6. Test System

```bash
# Test video generation
cd ../server
npx tsx test-video-generation.ts
```

---

## What Gets Deployed

### 3 Cloudflare Workers:

1. **Video Worker** (`video-worker.ts`)
   - Handles video generation requests
   - Processes scenes and timelines
   - Manages video queue

2. **Template Sync Worker** (`template-sync-worker.ts`)
   - Syncs video templates daily
   - Updates template library
   - Runs on schedule (cron)

3. **Media Download Worker** (`media-download-worker.ts`)
   - Downloads stock media monthly
   - Updates media library
   - Runs on schedule (cron)

---

## Troubleshooting

### Issue: Cloudflare is down (403 error)

**Solution:** Wait a few hours and try again. Cloudflare may be experiencing issues.

### Issue: "wrangler: command not found"

**Solution:**
```bash
npm install -g wrangler
```

### Issue: Authentication fails

**Solution:**
```bash
# Use API token directly
wrangler login --api-token YOUR_TOKEN_HERE
```

### Issue: Worker deployment fails

**Solution:**
```bash
# Check your Account ID is correct
wrangler whoami

# Verify wrangler.toml files
cd workers
cat wrangler-video.toml
```

### Issue: Backend won't start

**Solution:**
```bash
# Kill any process on port 3001
lsof -ti:3001 | xargs kill -9

# Start backend
cd server
npx tsx index.ts
```

---

## System Status

### ✅ What's Working Now

- **Free TTS**: espeak-ng (no API key required)
- **Video Templates**: 7 professional templates
- **Stock Media**: 20+ images, 7+ videos, 4 music tracks
- **Frontend UI**: Complete AI Video Builder interface
- **Backend API**: Video generation endpoints
- **FFmpeg**: Video rendering engine
- **Local Storage**: Videos saved to `server/output/`

### 🔄 What Needs Setup

- **Cloudflare Workers**: Optional serverless deployment
- **R2 Storage**: Optional cloud storage (alternative to local)
- **Stream**: Optional video hosting (alternative to local)

---

## Access Your System

### Local Development

```bash
# Start backend
cd server
npx tsx index.ts

# Start frontend (in another terminal)
pnpm run dev

# Access at:
http://localhost:5173/staff/aivideo-builder
```

### Production

Once deployed to Netlify:
```
https://www.elevateconnectsdirectory.org/staff/aivideo-builder
```

---

## Documentation

- **VIDEO_SYSTEM_COMPLETE.md** - Complete system overview
- **VIDEO_QUICK_START.md** - Quick command reference
- **DEPLOY_INSTRUCTIONS.md** - Deployment guide
- **CLOUDFLARE_WORKERS_DEPLOY.md** - Cloudflare Workers guide
- **GET_API_KEYS.md** - API key instructions
- **AUTOPILOT_VIDEO_WORKERS_TASK.json** - Autopilot task definition

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the documentation files
3. Check logs in `server/output/` and `logs/`
4. Verify environment variables in `.env`

---

## Summary

**To set up Cloudflare Workers:**

```bash
./setup-video-workers.sh
```

**To run locally without Cloudflare:**

```bash
# Backend
cd server && npx tsx index.ts

# Frontend
pnpm run dev
```

**To access:**
- Local: [http://localhost:5173/staff/aivideo-builder](http://localhost:5173/staff/aivideo-builder)
- Production: [https://www.elevateconnectsdirectory.org/staff/aivideo-builder](https://www.elevateconnectsdirectory.org/staff/aivideo-builder)

---

**Created:** 2025-11-12  
**Status:** ✅ Ready to Use  
**Time:** 15-20 minutes for full setup  
**Cost:** $0 (everything is free)
