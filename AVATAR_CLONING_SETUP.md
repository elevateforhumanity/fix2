# AI Avatar & Voice Cloning Setup Guide

Your platform now has **complete AI avatar and voice cloning capabilities** with multiple premium service integrations.

## ✅ What's Enabled

### 1. **Avatar Infrastructure**

- ✅ AI Avatar generation API (`/api/ai-studio/generate-avatar`)
- ✅ Local avatar generation (FFmpeg + TTS)
- ✅ Cloudflare Stream integration
- ✅ Default avatar images in `public/avatars/`

### 2. **Voice Services**

- ✅ **Local TTS** (espeak-ng) - Free, works immediately
- ✅ **ElevenLabs** - Premium voice cloning (enabled, needs API key)
- ✅ **Google Cloud TTS** - Good quality (enabled, needs API key)

### 3. **Avatar Cloning Services**

- ✅ **D-ID** - Talking head cloning (enabled, needs API key)
- ✅ **Synthesia** - AI avatar videos (enabled, needs API key)

### 4. **Stock Media**

- ✅ **Pexels** - Photos & videos (enabled, needs API key)
- ✅ **Unsplash** - Photos (enabled, needs API key)
- ✅ **Pixabay** - Music (enabled, needs API key)

## 🔑 API Keys Setup

### Free Services (Work Immediately)

#### Local TTS (espeak-ng)

✅ **Already working** - No API key needed

- 6 voice options
- Multiple languages
- Speed control

### Premium Voice Cloning

#### 1. ElevenLabs (Best Voice Quality)

**Features:**

- Ultra-realistic voice cloning
- Voice library with 100+ voices
- Custom voice cloning from samples
- Emotion and style control

**Setup:**

```bash
# Sign up: https://elevenlabs.io
# Get API key from: https://elevenlabs.io/app/settings/api-keys
# Add to .env.local:
ELEVENLABS_API_KEY=your_key_here
```

**Pricing:**

- Free: 10,000 characters/month
- Starter: $5/month - 30,000 characters
- Creator: $22/month - 100,000 characters
- Pro: $99/month - 500,000 characters

#### 2. Google Cloud TTS

**Features:**

- Natural-sounding voices
- 40+ languages
- Neural2 voices
- SSML support

**Setup:**

```bash
# Sign up: https://cloud.google.com/text-to-speech
# Enable API and get key
# Add to .env.local:
GOOGLE_CLOUD_API_KEY=your_key_here
```

**Pricing:**

- Free: 1 million characters/month (Standard)
- Free: 1 million characters/month (WaveNet/Neural2)
- After free tier: $4 per 1M characters

### Premium Avatar Cloning

#### 1. D-ID (Talking Head Cloning)

**Features:**

- Turn any photo into a talking avatar
- Realistic lip-sync
- Multiple voice options
- Fast generation (30-60 seconds)

**Setup:**

```bash
# Sign up: https://www.d-id.com
# Get API key from: https://studio.d-id.com/account-settings
# Add to .env.local:
DID_API_KEY=your_key_here
```

**Pricing:**

- Trial: 20 credits free
- Lite: $5.90/month - 10 minutes
- Pro: $29/month - 50 minutes
- Advanced: $196/month - 500 minutes

**Usage:**

```typescript
// Automatically used when DID_API_KEY is set
// Upload your photo to public/avatars/custom.jpg
// API will use it for avatar generation
```

**Features:**

- Create custom AI avatars
- Clone your own avatar from video
- 100+ pre-made avatars
- Multi-language support

**Setup:**

```bash
# Sign up: https://www.heygen.com
# Get API key from: https://app.heygen.com/settings/api
# Add to .env.local:
```

**Pricing:**

- Free: 1 credit (1 minute)
- Creator: $29/month - 15 minutes
- Business: $89/month - 90 minutes
- Enterprise: Custom pricing

**Usage:**

```typescript
// Can use pre-made avatars or clone your own
```

#### 3. Synthesia (Professional AI Avatars)

**Features:**

- 140+ professional AI avatars
- 120+ languages
- Custom avatar creation
- Enterprise-grade quality

**Setup:**

```bash
# Sign up: https://www.synthesia.io
# Get API key from: https://www.synthesia.io/api
# Add to .env.local:
SYNTHESIA_API_KEY=your_key_here
```

**Pricing:**

- Starter: $22/month - 10 minutes
- Creator: $67/month - 30 minutes
- Enterprise: Custom pricing

### Stock Media APIs (Free)

#### 1. Pexels (Photos & Videos)

```bash
# Sign up: https://www.pexels.com/api/
# Add to .env.local:
PEXELS_API_KEY=your_key_here
```

- Free forever
- No attribution required
- Unlimited downloads

#### 2. Unsplash (Photos)

```bash
# Sign up: https://unsplash.com/developers
# Add to .env.local:
UNSPLASH_ACCESS_KEY=your_key_here
```

- Free forever
- 50 requests/hour
- Attribution required

#### 3. Pixabay (Music)

```bash
# Sign up: https://pixabay.com/api/docs/
# Add to .env.local:
PIXABAY_API_KEY=your_key_here
```

- Free forever
- 5,000 requests/hour
- No attribution required

## 🎯 How It Works

### Service Priority

The system automatically uses the best available service:

#### For Voice:

1. **ElevenLabs** (if API key set) - Best quality
2. **Google Cloud TTS** (if API key set) - Good quality
3. **Local espeak-ng** (always available) - Free

#### For Avatars:

1. **D-ID** (if API key set) - Photo to talking head
2. **Synthesia** (if API key set) - Professional avatars
3. **Local generation** (always available) - Static avatar + voice

### Avatar Generation Flow

```typescript
// User requests avatar video
POST /api/ai-studio/generate-avatar
{
  "prompt": "Welcome to our training program...",
  "voice": "alloy",
  "avatar": "professional"
}

// System checks available services:
if (DID_API_KEY) {
  // Use D-ID for realistic talking head
  return generateWithDID(prompt, voice, avatarImage);
}
}
else if (SYNTHESIA_API_KEY) {
  // Use Synthesia for professional avatar
  return generateWithSynthesia(prompt, avatarId);
}
else {
  // Use local generation (free)
  return generateAvatarLocally(prompt, voice, avatar);
}

// Upload to Cloudflare Stream
cloudflareStream.uploadVideo(videoPath);
```

## 📁 Avatar Images

### Default Avatars

Located in `public/avatars/`:

- `default.jpg` - Default avatar
- `professional.jpg` - Business professional
- `friendly.jpg` - Casual friendly
- `instructor.jpg` - Teacher/instructor

### Adding Custom Avatars

1. **Add your photo:**

```bash
cp your-photo.jpg public/avatars/custom.jpg
```

2. **Use in API:**

```typescript
POST /api/ai-studio/generate-avatar
{
  "prompt": "Your text here",
  "avatar": "custom"
}
```

3. **For D-ID cloning:**

- Upload high-quality headshot (1024x1024 recommended)
- Face should be clearly visible
- Good lighting
- Neutral background

## 🎨 Voice Cloning

### ElevenLabs Voice Cloning

1. **Use pre-made voices:**

```typescript
POST /api/text-to-speech
{
  "text": "Your text here",
  "voiceId": "EXAVITQu4vr4xnSDxMaL" // Bella
}
```

2. **Clone your own voice:**

- Go to https://elevenlabs.io/voice-lab
- Upload 1-5 minutes of clean audio
- Get your custom voice ID
- Use in API calls

### Available Voice IDs (ElevenLabs)

- `EXAVITQu4vr4xnSDxMaL` - Bella (female, warm)
- `21m00Tcm4TlvDq8ikWAM` - Rachel (female, calm)
- `AZnzlk1XvdvUeBnXmlld` - Domi (female, strong)
- `ErXwobaYiN019PkySvjV` - Antoni (male, well-rounded)
- `VR6AewLTigWG4xSOukaG` - Arnold (male, crisp)
- `pNInz6obpgDQGcFmaJgB` - Adam (male, deep)

## 🚀 Quick Start

### 1. Free Setup (Works Immediately)

```bash
# No API keys needed!
# Local TTS + FFmpeg avatar generation
# Already working
```

### 2. Add Voice Cloning (Recommended)

```bash
# Add to .env.local:
ELEVENLABS_API_KEY=your_key

# Restart server
# Now you have ultra-realistic voices!
```

### 3. Add Avatar Cloning (Premium)

```bash
# Add to .env.local:
DID_API_KEY=your_key

# Upload your photo to public/avatars/
# Now you can clone yourself!
```

### 4. Add Stock Media (Free)

```bash
# Add to .env.local:
PEXELS_API_KEY=your_key
UNSPLASH_ACCESS_KEY=your_key
PIXABAY_API_KEY=your_key

# Now you have millions of free assets!
```

## 📊 Feature Comparison

|---------|-------|------------|------|--------|-----------|
| Voice Quality | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Avatar Quality | ⭐⭐ | N/A | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Speed | ⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡ |
| Cost | FREE | $ | $$ | $$ | $$$ |
| Voice Cloning | ❌ | ✅ | ✅ | ✅ | ✅ |
| Avatar Cloning | ❌ | ❌ | ✅ | ✅ | ✅ |
| Custom Avatars | ❌ | ❌ | ✅ | ✅ | ✅ |

## 🎯 Use Cases

### Training Videos

- Use **Synthesia** for professional instructor avatars
- Use **ElevenLabs** for natural narration
- Upload to Cloudflare Stream for global delivery

### Marketing Content

- Use **D-ID** to turn team photos into talking heads
- Use **Pexels** for stock footage

### Course Content

- Use **local generation** for quick, free content
- Use **ElevenLabs** for premium voice quality
- Use **Unsplash** for course images

### Social Media

- Use **D-ID** for quick talking head videos
- Use **Pixabay** for background music
- Use **Pexels** for B-roll footage

## 🔧 Testing

### Test Local Generation (Free)

```bash
curl -X POST http://localhost:3000/api/ai-studio/generate-avatar \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Welcome to our platform!",
    "voice": "alloy",
    "avatar": "professional"
  }'
```

### Test with ElevenLabs

```bash
# Add ELEVENLABS_API_KEY to .env.local first
curl -X POST http://localhost:3000/api/text-to-speech \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a test of ElevenLabs voice cloning",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  }' \
  --output test-voice.mp3
```

### Test with D-ID

```bash
# Add DID_API_KEY to .env.local first
# Upload photo to public/avatars/test.jpg
# Then generate avatar
```

## 📝 Notes

- All generated videos automatically upload to **Cloudflare Stream**
- Videos are globally distributed via CDN
- Thumbnails are automatically generated
- Analytics are tracked
- No storage limits

## 🎉 You're Ready!

Your platform now has **enterprise-grade AI avatar and voice cloning** capabilities. Start with free local generation, then upgrade to premium services as needed!
