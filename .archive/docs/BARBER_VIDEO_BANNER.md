# Barber Program Video Banner

## Overview
Professional video banner for the Barber Apprenticeship program page with voiceover script and caption overlay.

## Current Implementation

### Video File
- **Location**: `/public/videos/barber-hero-new.mp4`
- **Source**: Artlist.io (https://imgur.com/5SgoW2G)
- **Size**: 11 MB
- **Format**: MP4
- **Features**: Auto-play, loop, muted, responsive

### Script File
- **Location**: `/public/videos/barber-voiceover-script.txt`
- **Duration**: 60-90 seconds
- **Tone**: Energetic, motivational, direct
- **Scenes**: 7 scenes with transitions

## Voiceover Script

### Full Script with Scene Directions

```
[Scene 1 – Clean barbershop visuals | Slow pan | Soft upbeat music]
At Elevate for Humanity, you can become a licensed barber in months, not years.
This is a state-approved, WIOA-funded, apprenticeship-backed program designed to launch your career fast.

[Scene 2 – Students practicing fades, lineups, shaves]
You'll learn real barbering skills:
fades, tapers, line-ups, beard sculpting, razor work, sanitation, client consultations—
everything you need to feel confident behind the chair.

[Scene 3 – Classroom + hands-on training]
Training is hands-on, modern, and supported by a real school with real instructors.
You also get access to online training modules, practice tests, and step-by-step guidance so you can learn anywhere.

[Scene 4 – Apprenticeship highlight]
This program includes a Registered Barber Apprenticeship approved through DOL RAPIDS.
That means you can earn while you learn, build real hours, and graduate with experience—not just a certificate.

[Scene 5 – Funding options]
Most students qualify for free tuition through WorkOne and WIOA,
plus additional support through WRG, JRI, and apprenticeship pathways.
If you don't qualify, we offer Stripe Pay Now, Klarna, Affirm, and other flexible options.

[Scene 6 – Career outcome visuals]
Barbers make $45,000–$100,000+ per year,
and many go on to open their own shop, studio suite, or mobile grooming business.
Your license gives you freedom, income, and a skill no one can take away.

[Scene 7 – Final Call to Action]
If you're ready to start a real career fast,
apply now at ElevateForHumanity.org.
Classes are small. Seats fill fast.
Your future as a professional barber starts today.
```

### Condensed Caption (Currently Displayed)
```
Become a licensed barber in months, not years. State-approved, WIOA-funded, 
apprenticeship-backed program. Learn fades, tapers, line-ups, beard sculpting, 
and more. Earn while you learn through DOL RAPIDS Registered Apprenticeship. 
Apply now at ElevateForHumanity.org
```

## Key Messages

### 1. Speed to Career
- "Months, not years"
- Fast-track to licensure
- Quick career launch

### 2. Legitimacy
- State-approved
- WIOA-funded
- DOL RAPIDS registered
- Real school, real instructors

### 3. Skills Taught
- Fades, tapers, line-ups
- Beard sculpting
- Razor work
- Sanitation
- Client consultations

### 4. Earn While Learning
- Registered Apprenticeship
- Build real hours
- Graduate with experience
- Not just a certificate

### 5. Funding Options
- **Free**: WorkOne, WIOA, WRG, JRI
- **Paid**: Stripe, Klarna, Affirm
- Multiple pathways

### 6. Income Potential
- $45,000–$100,000+ per year
- Own shop/studio
- Mobile grooming business
- Freedom and security

### 7. Call to Action
- Apply at ElevateForHumanity.org
- Classes are small
- Seats fill fast
- Start today

## Video Banner Features

### Current Display
- ✅ Auto-play on page load
- ✅ Looping video
- ✅ Muted by default
- ✅ Responsive sizing (max 600px height)
- ✅ Caption overlay at bottom
- ✅ Gradient background for readability
- ✅ Orange CTA text highlight

### Technical Specs
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="w-full h-auto"
  style={{ maxHeight: '600px' }}
>
  <source src="/videos/barber-hero-new.mp4" type="video/mp4" />
</video>
```

### Caption Overlay
```tsx
<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
  <p className="text-white text-sm md:text-base leading-relaxed max-w-4xl">
    {/* Caption text */}
  </p>
</div>
```

## Creating Voiceover Audio

### Option 1: Use Repository Tool
```bash
# Create new script in generate-voiceover.mjs
node generate-voiceover.mjs
```

### Option 2: Professional TTS Services

#### ElevenLabs (Recommended)
```bash
# Install
npm install elevenlabs

# Generate
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "YOUR_SCRIPT_HERE",
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75
    }
  }' \
  --output barber-voiceover.mp3
```

**Recommended Voices**:
- **Adam** - Deep, authoritative (male)
- **Bella** - Warm, friendly (female)
- **Antoni** - Clear, professional (male)
- **Elli** - Energetic, young (female)

#### Google Cloud TTS
```bash
# Install
npm install @google-cloud/text-to-speech

# Generate
gcloud auth login
gcloud text-to-speech synthesize-speech \
  --text-file=barber-voiceover-script.txt \
  --output-file=barber-voiceover.mp3 \
  --voice-name=en-US-Neural2-J \
  --speaking-rate=1.0
```

#### Edge TTS (Free)
```bash
# Install
pip install edge-tts

# Generate
edge-tts --voice en-US-GuyNeural \
  --text "$(cat barber-voiceover-script.txt)" \
  --write-media barber-voiceover.mp3
```

### Option 3: Professional Recording
- Hire voice actor from Fiverr, Upwork, or Voices.com
- Cost: $50-$200 for 60-90 seconds
- Best quality and authenticity

## Adding Audio to Video

### Using FFmpeg
```bash
# Combine video with voiceover
ffmpeg -i barber-hero-new.mp4 \
  -i barber-voiceover.mp3 \
  -c:v copy \
  -c:a aac \
  -map 0:v:0 \
  -map 1:a:0 \
  barber-hero-with-audio.mp4

# Add background music (lower volume)
ffmpeg -i barber-hero-new.mp4 \
  -i barber-voiceover.mp3 \
  -i background-music.mp3 \
  -filter_complex "[1:a]volume=1.0[voice];[2:a]volume=0.2[music];[voice][music]amix=inputs=2[audio]" \
  -map 0:v \
  -map "[audio]" \
  -c:v copy \
  -c:a aac \
  barber-hero-final.mp4
```

### Using Online Tools
1. **Kapwing** - kapwing.com
2. **Clideo** - clideo.com
3. **VEED.io** - veed.io

## Video Variations

### 30-Second Version (Quick)
```
At Elevate for Humanity, become a licensed barber in months through our 
state-approved, WIOA-funded apprenticeship. Learn real skills, earn while 
you learn, and launch a career making $45,000–$100,000+ per year. 
Most students qualify for free tuition. Apply now at ElevateForHumanity.org.
```

### 60-Second Version (Standard)
Current full script (7 scenes)

### 90-Second Version (Detailed)
Add testimonials, facility tour, instructor introductions

## Alternative Banner Options

### Option 1: Silent Video with Captions
- ✅ Currently implemented
- No audio needed
- Accessible
- Works on mute

### Option 2: Video with Voiceover
- Add audio track
- Unmute button
- Auto-play with sound (if allowed)
- Better engagement

### Option 3: Video with Background Music
- Soft upbeat music
- No voiceover
- Captions only
- Professional feel

### Option 4: Interactive Video
- Play/pause controls
- Volume control
- Fullscreen option
- Progress bar

## Implementation Checklist

### Current Status
- [x] Video downloaded and optimized
- [x] Script created and saved
- [x] Caption overlay added
- [x] Responsive design implemented
- [x] Auto-play configured
- [ ] Voiceover audio generated
- [ ] Audio added to video
- [ ] Background music added
- [ ] Multiple versions created

### Next Steps
1. **Generate voiceover audio**
   - Choose voice (ElevenLabs recommended)
   - Generate MP3 file
   - Test audio quality

2. **Combine audio with video**
   - Use FFmpeg or online tool
   - Add background music (optional)
   - Export final video

3. **Create variations**
   - 30-second version
   - 60-second version
   - 90-second version

4. **Test and optimize**
   - Test on mobile devices
   - Check loading speed
   - Verify accessibility
   - A/B test with/without audio

## Best Practices

### Video
- Keep under 15 MB for fast loading
- Use H.264 codec for compatibility
- Optimize for web (720p or 1080p)
- Add poster image for loading state

### Audio
- Use 64-128 kbps for voice
- Normalize audio levels
- Remove background noise
- Add subtle fade in/out

### Captions
- Keep text concise
- Use high contrast colors
- Add background for readability
- Highlight CTAs in different color

### Accessibility
- Provide text transcript
- Add closed captions
- Allow video controls
- Ensure keyboard navigation

## Performance Optimization

### Current File Sizes
- Video: 11 MB (could be optimized)
- Script: 2 KB

### Optimization Tips
```bash
# Compress video (reduce file size)
ffmpeg -i barber-hero-new.mp4 \
  -vcodec h264 \
  -crf 28 \
  -preset slow \
  barber-hero-optimized.mp4

# Create poster image
ffmpeg -i barber-hero-new.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  barber-hero-poster.jpg
```

### Lazy Loading
```tsx
<video
  loading="lazy"
  poster="/images/barber-hero-poster.jpg"
  // ... other props
>
```

## Analytics & Testing

### Track Engagement
- Video play rate
- Watch time
- Completion rate
- CTA click rate

### A/B Testing Ideas
- With vs without audio
- Different caption styles
- Various video lengths
- Different CTAs

## Summary

✅ **Implemented**:
- Professional video banner
- Comprehensive script (7 scenes)
- Caption overlay with CTA
- Responsive design
- Auto-play functionality

🎯 **Next Steps**:
- Generate professional voiceover
- Add audio to video
- Create multiple versions
- Test and optimize

📄 **Files**:
- Video: `/public/videos/barber-hero-new.mp4`
- Script: `/public/videos/barber-voiceover-script.txt`
- Component: `/components/programs/ProgramHero.tsx`

🔗 **View Live**:
Visit: `/programs/barber-apprenticeship`
