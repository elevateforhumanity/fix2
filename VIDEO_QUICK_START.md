# 🎬 AI Video Builder - Quick Start

## What You Have

✅ **Complete video generation system** with:

- 7 professional templates
- Free stock media (20+ images, 7+ videos, 4 music tracks)
- OpenAI text-to-speech (6 voices)
- FFmpeg video rendering
- Cloudflare Stream/R2 integration
- REST API

## Quick Commands

### 1. Download Stock Media (Optional)

Download free images/videos for offline use:

```bash
pnpm video:download-media
```

- Downloads 20+ images (~100MB)
- Downloads 7+ videos (~400MB)
- Takes 10-20 minutes
- Creates local copies in `public/media/`

### 2. Start Video API Server

```bash
pnpm video:server
```

Server runs on `http://localhost:3001

### 3. Test the System

```bash
pnpm video:test
```

Generates a test video to verify everything works.

### 4. Generate Sample Videos from Templates

```bash
pnpm video:generate-samples
```

- Generates videos for all 7 templates
- Takes 30-60 minutes
- Saves to `./samples/` directory
- Costs ~$0.30 in OpenAI TTS

## Environment Setup

### Get API Keys

**📖 [Complete Guide: GET_API_KEYS.md](GET_API_KEYS.md)**

**Quick Links:**

- **OpenAI API Key:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Cloudflare Stream:** [https://dash.cloudflare.com/stream](https://dash.cloudflare.com/stream)

Create `.env` file:

```env
# Required for TTS
OPENAI_API_KEY=sk-your-key-here

# Optional: Cloudflare (for production)
STORAGE_TYPE=cloudflare-stream
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_STREAM_API_TOKEN=your_token
```

## Using the Frontend

1. Navigate to `/staff/aivideo-builder`
2. Click "Templates" tab
3. Choose a template
4. Customize scenes
5. Click "Generate Video"

## How It Works

### Without Downloaded Media (Default)

- Templates use URLs to free stock sites (Unsplash, Pexels)
- Videos generated on-demand when users click "Generate"
- No local storage needed
- Always uses latest stock media

### With Downloaded Media (Optional)

- Run `pnpm video:download-media` first
- Media stored locally in `public/media/`
- Faster generation (no external downloads)
- Works offline
- Use `import { localStockImages } from './stock-media-local'`

## What Gets Generated

Each video includes:

- ✅ Text-to-speech voice-over
- ✅ Text overlays with animations
- ✅ Background images/videos
- ✅ Scene transitions
- ✅ Professional formatting
- ✅ Multiple formats (16:9, 9:16, 1:1)

## Costs

### OpenAI TTS

- $15 per 1 million characters
- ~500 words = ~2,500 chars = $0.04 per video
- 100 videos/month = ~$4

### Cloudflare Stream (Optional)

- $5 per 1,000 minutes storage
- $1 per 1,000 minutes delivered
- 100 videos × 1 min = $0.50/month

### Total: ~$5-10/month for 100 videos

## Documentation

- [Complete System Guide](docs/VIDEO_GENERATION_COMPLETE_GUIDE.md)
- [Template Guide](docs/VIDEO_TEMPLATES_GUIDE.md)
- [Full Summary](VIDEO_SETUP_COMPLETE.md)

## Support

Questions? Check the documentation or run:

```bash
pnpm video:test  # Test if everything works
```

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0
