# Complete Video Generation System Guide

## Overview

The AI Video Builder now has a complete backend video generation system with:
- ✅ FFmpeg video rendering
- ✅ OpenAI text-to-speech integration
- ✅ Scene composition and timeline processing
- ✅ Multiple storage options (Local, Cloudflare Stream, Cloudflare R2)
- ✅ REST API for video generation
- ✅ 7 professional templates with free stock media

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Video Builder (Frontend)               │
│  - Template selection                                        │
│  - Scene editing                                             │
│  - Free stock media browser                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP REST API
┌──────────────────────▼──────────────────────────────────────┐
│                  Video Generation API (Backend)              │
│  - Request validation                                        │
│  - Job management                                            │
│  - Status tracking                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
│ TTS Service  │ │ Renderer │ │  Storage   │
│ (OpenAI)     │ │ (FFmpeg) │ │ (CF/Local) │
└──────────────┘ └──────────┘ └────────────┘
```

## Components

### 1. Video Generator (`server/video-generator-v2.ts`)
Main orchestrator that:
- Processes video generation requests
- Coordinates TTS, rendering, and storage
- Manages temporary files
- Handles errors and cleanup

### 2. TTS Service (`server/tts-service.ts`)
Text-to-speech using OpenAI:
- 6 voice options (alloy, echo, fable, onyx, nova, shimmer)
- Speed control (0.25x to 4.0x)
- Audio duration estimation
- Batch generation support

### 3. Video Renderer (`server/video-renderer.ts`)
FFmpeg-based rendering:
- Scene rendering with text overlays
- Multiple formats (16:9, 9:16, 1:1)
- Quality settings (low, medium, high, ultra)
- Video concatenation
- Background music mixing

### 4. Storage Services (`server/video-storage.ts`)
Three storage options:
- **Local**: Filesystem storage
- **Cloudflare Stream**: Professional video hosting with HLS streaming
- **Cloudflare R2**: S3-compatible object storage

### 5. Cloudflare Stream Integration (`server/cloudflare-stream.ts`)
Full Cloudflare Stream API integration:
- Video upload and management
- HLS streaming
- Thumbnail generation
- Embed code generation
- Analytics
- Signed URLs for private videos

### 6. Video API (`server/video-api.ts`)
REST API endpoints:
- `POST /api/video/generate` - Generate video
- `POST /api/video/tts` - Generate TTS audio
- `GET /api/video/status/:jobId` - Check status
- `GET /api/video/download/:jobId` - Download video
- `GET /api/video/videos` - List videos
- `DELETE /api/video/videos/:jobId` - Delete video

## Setup Instructions

### 1. Install Dependencies

Already installed:
```bash
pnpm add fluent-ffmpeg @ffmpeg-installer/ffmpeg @ffprobe-installer/ffprobe canvas
pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner form-data
pnpm add -D @types/fluent-ffmpeg
```

### 2. Configure Environment Variables

Create `.env` file:

```env
# Storage Type
STORAGE_TYPE=cloudflare-stream  # or 'local' or 'cloudflare-r2'

# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Cloudflare Stream (Recommended)
CLOUDFLARE_STREAM_API_TOKEN=your_stream_token

# Cloudflare R2 (Alternative)
CLOUDFLARE_R2_BUCKET=your_bucket
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key

# OpenAI (for TTS)
OPENAI_API_KEY=your_openai_key

# Server Port
VIDEO_API_PORT=3001
```

### 3. Get Cloudflare Credentials

#### Cloudflare Stream (Recommended)
1. Go to https://dash.cloudflare.com/
2. Select your account
3. Navigate to "Stream" in the sidebar
4. Click "API Tokens" → "Create Token"
5. Select "Stream" permissions
6. Copy the token

#### Cloudflare R2 (Alternative)
1. Go to https://dash.cloudflare.com/
2. Navigate to "R2" in the sidebar
3. Create a bucket
4. Go to "Manage R2 API Tokens"
5. Create API token with R2 permissions
6. Copy Access Key ID and Secret Access Key

### 4. Get OpenAI API Key
1. Go to https://platform.openai.com/
2. Navigate to API Keys
3. Create new secret key
4. Copy the key

### 5. Start the Video API Server

```bash
# Development
cd server
ts-node index.ts

# Production
npm run build
node dist/server/index.js
```

## Usage

### Generate Video via API

```javascript
const response = await fetch('http://localhost:3001/api/video/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My Video',
    scenes: [
      {
        id: 'scene-1',
        type: 'title',
        duration: 5,
        script: 'Welcome to WIOA Training',
        voiceOver: true,
        background: '#2563EB',
        textPosition: 'center',
        animation: 'fade',
        textStyle: {
          fontSize: 72,
          color: '#FFFFFF',
          fontWeight: 'bold'
        }
      },
      {
        id: 'scene-2',
        type: 'content',
        duration: 10,
        script: 'Learn new skills for your career',
        voiceOver: true,
        background: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
        textPosition: 'bottom',
        animation: 'slide'
      }
    ],
    settings: {
      format: '16:9',
      resolution: '1080p',
      voiceOver: true,
      backgroundMusic: false,
      voice: 'alloy'
    },
    userId: 'user123'
  })
});

const result = await response.json();
console.log(result);
// {
//   jobId: 'video-1234567890-abc123',
//   status: 'completed',
//   videoPath: '/output/video-1234567890-abc123.mp4',
//   duration: 15,
//   progress: 100
// }
```

### Generate TTS Audio

```javascript
const response = await fetch('http://localhost:3001/api/video/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Hello, this is a test of text to speech',
    voice: 'alloy',
    speed: 1.0
  })
});

const audioBlob = await response.blob();
// Save or play the audio
```

### List Videos

```javascript
const response = await fetch('http://localhost:3001/api/video/videos?userId=user123');
const data = await response.json();
console.log(data);
// {
//   videos: [...],
//   total: 10,
//   page: 1,
//   pageSize: 10,
//   totalPages: 1
// }
```

### Download Video

```javascript
const response = await fetch('http://localhost:3001/api/video/download/video-123');
const videoBlob = await response.blob();
// Save the video file
```

## Storage Options Comparison

### Local Storage
**Pros:**
- No external dependencies
- No API costs
- Fast for development
- Full control

**Cons:**
- Limited scalability
- No CDN
- Manual backups
- Server storage limits

**Best for:** Development, testing, small deployments

### Cloudflare Stream (Recommended)
**Pros:**
- Professional video hosting
- HLS adaptive streaming
- Global CDN
- Automatic transcoding
- Built-in player
- Analytics
- Thumbnails
- No bandwidth costs

**Cons:**
- Costs $1/1000 minutes stored + $1/1000 minutes delivered
- Requires Cloudflare account

**Best for:** Production, public videos, professional deployments

**Pricing:**
- Storage: $5/1000 minutes/month
- Delivery: $1/1000 minutes delivered
- Free tier: First 1000 minutes free

### Cloudflare R2
**Pros:**
- S3-compatible
- No egress fees
- Cheap storage ($0.015/GB/month)
- Good for large files

**Cons:**
- No built-in streaming
- No transcoding
- Requires custom player
- More complex setup

**Best for:** Backup storage, downloadable videos, archival

## Video Formats

### Aspect Ratios
- **16:9** (1920x1080) - YouTube, websites, presentations
- **9:16** (1080x1920) - Instagram Stories, TikTok, Reels
- **1:1** (1080x1080) - Instagram feed, Facebook

### Quality Settings
- **Low** (CRF 28, veryfast) - Quick preview, small files
- **Medium** (CRF 23, fast) - Good balance
- **High** (CRF 18, medium) - Production quality
- **Ultra** (CRF 15, slow) - Maximum quality, large files

### Resolutions
- **720p** - 1280x720 (HD)
- **1080p** - 1920x1080 (Full HD)
- **4K** - 3840x2160 (Ultra HD)

## Voice Options

### Available Voices
1. **Alloy** - Neutral, balanced (default)
2. **Echo** - Male, clear
3. **Fable** - British male
4. **Onyx** - Deep male
5. **Nova** - Female, energetic
6. **Shimmer** - Soft female

### Speed Control
- 0.25x - Very slow
- 0.5x - Slow
- 1.0x - Normal (default)
- 1.5x - Fast
- 2.0x - Very fast
- 4.0x - Maximum

## Performance

### Generation Time Estimates
- **Simple video** (3 scenes, 30s): ~60-90 seconds
- **Medium video** (5 scenes, 60s): ~2-3 minutes
- **Complex video** (10 scenes, 120s): ~5-7 minutes

Factors affecting speed:
- Number of scenes
- Video duration
- Resolution/quality
- TTS generation
- Server resources

### Resource Requirements
- **CPU**: Multi-core recommended for FFmpeg
- **RAM**: 2GB minimum, 4GB+ recommended
- **Disk**: 10GB+ for temporary files
- **Network**: Fast upload for Cloudflare Stream

## Limitations

### Current Limits
- Maximum video duration: 10 minutes (600 seconds)
- Maximum scene duration: 5 minutes (300 seconds)
- Maximum scenes per video: 50
- Supported formats: MP4 only
- Supported codecs: H.264 + AAC

### Cloudflare Stream Limits
- Maximum file size: 30GB
- Maximum duration: 6 hours
- Supported formats: MP4, MOV, MKV, AVI, FLV, MPEG-2 TS, MPEG-2 PS, MXF, LXF, GXF, 3GP, WebM, MPG, QuickTime

## Troubleshooting

### FFmpeg Not Found
```bash
# Check FFmpeg installation
ffmpeg -version

# If not found, install:
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Or use the bundled version (already installed via npm)
```

### TTS Generation Fails
- Check OpenAI API key is valid
- Verify API key has credits
- Check text length (max 4096 characters)
- Ensure internet connection

### Video Upload to Cloudflare Fails
- Verify Cloudflare credentials
- Check account has Stream enabled
- Verify API token permissions
- Check file size limits

### Out of Memory
- Reduce video resolution
- Lower quality settings
- Process fewer scenes at once
- Increase server RAM

### Slow Generation
- Use lower quality settings for testing
- Reduce resolution
- Use faster FFmpeg presets
- Upgrade server CPU

## Best Practices

### Development
1. Use local storage for testing
2. Start with low quality settings
3. Test with short videos first
4. Enable verbose logging

### Production
1. Use Cloudflare Stream for hosting
2. Use high quality settings
3. Implement job queues for async processing
4. Set up monitoring and alerts
5. Regular cleanup of old videos
6. Backup important videos

### Performance
1. Cache TTS audio for reused scripts
2. Reuse rendered scenes when possible
3. Use CDN for static assets
4. Implement rate limiting
5. Queue long-running jobs

### Security
1. Validate all user inputs
2. Sanitize file paths
3. Limit file sizes
4. Implement authentication
5. Use signed URLs for private videos
6. Rate limit API endpoints

## API Reference

### POST /api/video/generate
Generate a video from scenes.

**Request:**
```json
{
  "title": "string",
  "scenes": [
    {
      "id": "string",
      "type": "title|content|image|video|split",
      "duration": number,
      "script": "string",
      "voiceOver": boolean,
      "background": "string",
      "textPosition": "center|top|bottom",
      "animation": "fade|slide|zoom|none",
      "image": "string (optional)",
      "textStyle": {
        "fontSize": number,
        "color": "string",
        "fontWeight": "string"
      }
    }
  ],
  "settings": {
    "format": "16:9|9:16|1:1",
    "resolution": "720p|1080p|4K",
    "voiceOver": boolean,
    "backgroundMusic": boolean,
    "voice": "alloy|echo|fable|onyx|nova|shimmer",
    "musicPath": "string (optional)",
    "musicVolume": number (optional)
  },
  "userId": "string (optional)"
}
```

**Response:**
```json
{
  "jobId": "string",
  "status": "processing|completed|failed",
  "videoPath": "string",
  "duration": number,
  "progress": number,
  "error": "string (if failed)"
}
```

### POST /api/video/tts
Generate text-to-speech audio.

**Request:**
```json
{
  "text": "string",
  "voice": "alloy|echo|fable|onyx|nova|shimmer",
  "speed": number (0.25-4.0)
}
```

**Response:** Audio file (audio/mpeg)

### GET /api/video/status/:jobId
Get video generation status.

**Response:**
```json
{
  "jobId": "string",
  "status": "pending|processing|completed|failed",
  "progress": number,
  "videoUrl": "string",
  "createdAt": "string",
  "completedAt": "string"
}
```

### GET /api/video/download/:jobId
Download generated video.

**Response:** Video file (video/mp4)

### GET /api/video/videos
List user's videos.

**Query Parameters:**
- `userId` (optional): Filter by user
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)

**Response:**
```json
{
  "videos": [
    {
      "jobId": "string",
      "title": "string",
      "duration": number,
      "format": "string",
      "resolution": "string",
      "fileSize": number,
      "createdAt": "string",
      "userId": "string",
      "thumbnailUrl": "string"
    }
  ],
  "total": number,
  "page": number,
  "pageSize": number,
  "totalPages": number
}
```

### DELETE /api/video/videos/:jobId
Delete a video.

**Response:**
```json
{
  "success": boolean,
  "message": "string",
  "jobId": "string"
}
```

## Next Steps

### Immediate
1. Test video generation locally
2. Configure Cloudflare Stream
3. Test with templates
4. Verify TTS generation

### Short-term
1. Add job queue (Bull, BullMQ)
2. Implement webhooks for completion
3. Add video preview generation
4. Create admin dashboard

### Long-term
1. Add more video effects
2. Support more formats (WebM, MOV)
3. Add transitions between scenes
4. Implement video editing features
5. Add collaborative editing
6. Mobile app integration

## Support

For issues or questions:
- Check this documentation
- Review error logs
- Test with simple examples
- Contact support team

---

**Status:** ✅ Complete and ready for testing  
**Last Updated:** January 2025  
**Version:** 1.0
