# Voiceover Assets in Repository

## Available Audio Files

### Main Voiceover
- **File**: `/public/videos/voiceover.mp3`
- **Size**: 504 KB
- **Format**: MP3, 56 kbps, 22.05 kHz, Mono
- **Script**: `homepage-voiceover-natural.txt`
- **Voice**: Female (Nova)
- **Speaker**: Elizabeth Greene (Founder)

## Voiceover Scripts

### 1. Natural/Personal Script
**File**: `/public/videos/homepage-voiceover-natural.txt`

```
Hey there. I'm Elizabeth Greene, and I started Elevate For Humanity because I believe everyone deserves a real shot at a better life.

Maybe you've been turned down for jobs. Maybe you're working two jobs and still can't pay rent. Maybe you're coming home from incarceration and nobody will give you a chance.

I see you. Not your mistakes. Not your struggles. Your potential.

We offer free career training in barbering, healthcare, HVAC, and more. If you qualify for government funding, it costs you nothing. Zero debt. Real credentials. Real jobs waiting.

Don't qualify? No problem. We have payment plans that work.

This isn't charity. This is justice. This is what happens when someone actually believes in you.

Your past doesn't define your future. Let's build it together.

Visit ElevateForHumanity.org or call 317-314-3757.
```

**Tone**: Personal, empathetic, direct
**Duration**: ~60 seconds
**Use Case**: Homepage hero, about page, mission statement

### 2. Professional/Formal Script
**File**: `/public/videos/homepage-voiceover-script.txt`

```
Welcome to Elevate For Humanity—where opportunity, training, and community come together to change lives. Step into a modern, inspiring environment built for growth, learning, and real career advancement. Experience hands-on training, supportive instructors, and a pathway to meaningful careers in barbering, healthcare, trades, and beyond. Approved for WIOA, WRG, Registered Apprenticeship, and industry-recognized credentials, we prepare you for the future with purpose and professionalism. Whether you're starting fresh, leveling up, or reinventing your path, Elevate For Humanity is where your journey begins. Empower your potential. Build your skills. Transform your life. Enroll today at ElevateForHumanity.org.
```

**Tone**: Professional, inspiring, informative
**Duration**: ~45 seconds
**Use Case**: Program pages, promotional videos, presentations

## Videos with Narration

All located in `/public/videos/`:

1. **about-section-video-with-narration.mp4** (63 KB)
2. **apply-section-video-with-narration.mp4** (62 KB)
3. **barber-spotlight-with-narration.mp4** (73 KB)
4. **directory-hero-video-with-narration.mp4** (1.7 MB)
5. **elevate-overview-with-narration.mp4** (106 KB)
6. **employer-pipeline-with-narration.mp4** (66 KB)
7. **employer-section-video-with-narration.mp4** (1.3 MB)
8. **faq-section-video-with-narration.mp4** (2.7 MB)
9. **hero-video-segment-with-narration.mp4** (61 KB)
10. **programs-overview-video-with-narration.mp4** (66 KB)
11. **success-stories-video-with-narration.mp4** (64 KB)
12. **testimonials-video-with-narration.mp4** (1.6 MB)
13. **training-providers-video-with-narration.mp4** (1.2 MB)

## Current Implementation

### VoiceoverPlayer Component
**File**: `/components/VoiceoverPlayer.tsx`

Currently configured to:
- ✅ Use pre-recorded voiceover: `/videos/voiceover.mp3`
- ✅ Auto-play on page load (1 second delay)
- ✅ Mute/unmute controls
- ✅ Replay functionality
- ✅ Fallback to browser speech synthesis if audio fails

### Homepage Integration
**File**: `/app/page.tsx`

```tsx
<VoiceoverPlayer text={HOMEPAGE_VOICEOVER} autoPlay={true} />
```

Uses the natural/personal script from Elizabeth Greene.

## Voice Generation Tool

### Script: `generate-voiceover.mjs`

Generates voiceover using:
- **TTS Engine**: espeak-ng
- **Voice**: Nova (female)
- **Speed**: 1.0 (normal)
- **Output**: MP3 format

**Usage**:
```bash
node generate-voiceover.mjs
```

**Requirements**:
- espeak-ng
- ffmpeg

**Install**:
```bash
sudo apt-get install espeak-ng ffmpeg
```

## Recommended Usage by Page

### Homepage
- **Audio**: `/videos/voiceover.mp3`
- **Script**: Natural/Personal (Elizabeth Greene)
- **Auto-play**: Yes (with mute option)

### Program Pages
- **Audio**: Generate from professional script
- **Script**: Professional/Formal
- **Auto-play**: Optional

### About Page
- **Audio**: `/videos/voiceover.mp3`
- **Script**: Natural/Personal
- **Auto-play**: Optional

### Video Sections
- Use corresponding `-with-narration.mp4` files
- No separate audio player needed

## Creating New Voiceovers

### Option 1: Use Existing Tool
```bash
# Edit generate-voiceover.mjs with new script
node generate-voiceover.mjs
```

### Option 2: Use Professional Service
1. **ElevenLabs** (Premium)
   - API Key required
   - High-quality voices
   - Cost: ~$0.30 per 1000 characters

2. **Google Cloud TTS** (Good Quality)
   - API Key required
   - Neural voices available
   - Cost: ~$4 per 1M characters

3. **Edge TTS** (Free)
   - No API key needed
   - Good quality
   - Multiple voices

### Option 3: Record Professionally
- Hire voice actor
- Record in studio
- Best quality
- Most expensive

## Voice Options

### Current Voice: Nova (Female)
- Natural sounding
- Clear pronunciation
- Professional tone

### Alternative Voices (espeak-ng)
- `en-us` - American English (male)
- `en-gb` - British English (male)
- `en-us+f1` - American English (female 1)
- `en-us+f2` - American English (female 2)

### Premium Voices (ElevenLabs)
- Bella - Warm, friendly
- Rachel - Professional, clear
- Domi - Energetic, young
- Elli - Calm, soothing

## Best Practices

### Script Writing
1. **Keep it conversational** - Write how people speak
2. **Short sentences** - Easier to understand
3. **Clear pronunciation** - Avoid complex words
4. **Emotional connection** - Tell a story
5. **Call to action** - End with next steps

### Audio Quality
1. **Format**: MP3 or AAC
2. **Bitrate**: 64-128 kbps (voice)
3. **Sample Rate**: 22.05 kHz or 44.1 kHz
4. **Channels**: Mono (smaller file size)

### User Experience
1. **Auto-play**: Use sparingly (homepage only)
2. **Mute option**: Always provide
3. **Replay**: Allow users to replay
4. **Transcript**: Provide text version
5. **Accessibility**: Add captions to videos

## File Organization

```
public/videos/
├── voiceover.mp3                              # Main homepage voiceover
├── homepage-voiceover-natural.txt             # Personal script
├── homepage-voiceover-script.txt              # Professional script
├── about-section-video-with-narration.mp4     # About section
├── apply-section-video-with-narration.mp4     # Application process
├── barber-spotlight-with-narration.mp4        # Barber program
├── elevate-overview-with-narration.mp4        # Platform overview
└── [other narrated videos...]
```

## Future Enhancements

### Planned
- [ ] Add voiceover to all program pages
- [ ] Create multi-language versions
- [ ] Add background music option
- [ ] Generate captions automatically
- [ ] A/B test different voices

### Ideas
- [ ] Interactive voice assistant
- [ ] Voice-guided tours
- [ ] Audio testimonials
- [ ] Podcast integration
- [ ] Voice search

## Testing

### Audio Playback
```javascript
// Test in browser console
const audio = new Audio('/videos/voiceover.mp3');
audio.play();
```

### Component Test
Visit: `/test-affirm` or homepage to test VoiceoverPlayer

### Browser Compatibility
- ✅ Chrome/Edge - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ✅ Mobile browsers - Full support

## Troubleshooting

### Audio doesn't play
1. Check file exists: `/videos/voiceover.mp3`
2. Check browser console for errors
3. Verify audio format is supported
4. Check user hasn't blocked autoplay

### Quality issues
1. Re-generate with higher bitrate
2. Use professional TTS service
3. Record with better equipment
4. Apply audio processing (normalize, compress)

### File size too large
1. Reduce bitrate (64 kbps for voice)
2. Convert to mono
3. Lower sample rate (22.05 kHz)
4. Use AAC instead of MP3

## Summary

✅ **Current Status**:
- Professional voiceover available (`voiceover.mp3`)
- Two scripts available (natural and professional)
- VoiceoverPlayer component implemented
- Auto-plays on homepage with controls
- 13 videos with narration available

🎯 **Recommended**:
- Use natural/personal script for homepage
- Use professional script for program pages
- Provide mute/replay controls
- Add transcripts for accessibility
- Consider multi-language support

📞 **Contact**:
For professional voice recording or custom scripts, contact Elizabeth Greene.
