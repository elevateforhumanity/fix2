# Media Quality Standards

**Status:** Enforced  
**Date:** December 26, 2025  
**Purpose:** Ensure all images, videos, and audio are professional quality

---

## Core Principle

> Only professional-quality media. No placeholders. No low-resolution. No robotic voices.

---

## Image Standards

### Minimum Requirements
- **Resolution:** 1920x1080 minimum for hero images
- **Resolution:** 1200x800 minimum for content images
- **Resolution:** 800x600 minimum for thumbnails
- **Format:** WebP preferred, JPEG acceptable, PNG for transparency
- **Compression:** Optimized but not degraded (quality 85+)
- **File Size:** <500KB for hero, <200KB for content, <100KB for thumbnails

### Quality Checklist
- [ ] Sharp focus (no blur)
- [ ] Proper lighting (not too dark/bright)
- [ ] Professional composition
- [ ] Consistent style across pages
- [ ] Real people/environments (no generic stock)
- [ ] Appropriate aspect ratio (16:9 for hero, 4:3 for content)

### Current Issues Found
**Low Resolution Images (< 800x600):**
- Team photos: 528x444 (need 1200x800)
- Portfolio pieces: 400x400 (need 800x800)
- Tax office: 768x768 (acceptable for square format)

**Action Required:**
- Replace team photos with higher resolution versions
- Upscale or replace portfolio pieces
- Verify all hero images are 1920x1080+

---

## Video Standards

### Minimum Requirements
- **Resolution:** 1920x1080 (Full HD) minimum
- **Format:** MP4 (H.264 codec)
- **Frame Rate:** 30fps minimum, 60fps preferred
- **Bitrate:** 5-10 Mbps for streaming quality
- **Audio:** 192kbps AAC minimum (if audio present)
- **Length:** Optimized for purpose (15-30s for hero, longer for content)

### Quality Checklist
- [ ] Sharp, clear footage
- [ ] Stable (no shaky camera)
- [ ] Professional lighting
- [ ] Proper color grading
- [ ] Smooth playback
- [ ] Optimized file size

### Video Behavior Rules
- **Hero Videos:** Muted, looping, autoplay (ambient background)
- **Content Videos:** NOT muted, NOT looping, user-triggered
- **Voiceover Videos:** Professional audio only, user-triggered

---

## Audio/Voiceover Standards

### CRITICAL RULE
**NO ROBOTIC VOICES. ONLY PROFESSIONAL CUSTOM VOICEOVERS.**

### Professional Voiceover Requirements
- **Format:** MP3, 192kbps minimum
- **Quality:** Studio-recorded, professional voice talent
- **Clarity:** Clear enunciation, no background noise
- **Tone:** Warm, human, conversational (not corporate)
- **Pacing:** Natural speaking pace (not rushed)
- **Length:** Appropriate for content (30s-2min typical)

### Available Professional Voiceovers
```
/public/videos/voiceover.mp3 (57KB) - Default homepage
/public/videos/barber-voiceover.mp3 (283KB) - Barber program
/public/videos/voiceover-old.mp3 (517KB) - Archive
/public/videos/voiceover-previous.mp3 (57KB) - Archive
```

### Voiceover Scripts
```
/public/videos/homepage-voiceover-script.txt
/public/videos/homepage-voiceover-natural.txt
/public/videos/barber-voiceover-script.txt
```

### Audio Behavior Rules
- **NO autoplay** (blocked by browsers)
- **NO muting** (defeats purpose)
- **NO looping** (plays once)
- **User-triggered** (Play button required)
- **Ready on load** (preload metadata)
- **Stop button** (user control)

### Fallback Policy
**DO NOT use browser speechSynthesis as fallback.**
- Browser TTS is robotic and unprofessional
- If custom voiceover fails, show error message
- Require professional voiceover file to be added

---

## Repository Structure

### Images
```
/public/images/
  heroes/          - Hero images (1920x1080+)
  programs/        - Program images (1200x800+)
  team/            - Team photos (1200x800+)
  portfolio/       - Portfolio pieces (800x800+)
  icons/           - Icons and logos (SVG preferred)
```

### Videos
```
/public/videos/
  *.mp4            - Video files (1920x1080, H.264)
  *.mp3            - Professional voiceovers only
  *-script.txt     - Voiceover scripts
```

---

## Quality Validation Process

### Before Adding Media
1. **Check resolution** - meets minimum requirements
2. **Check file size** - optimized but not degraded
3. **Check quality** - sharp, clear, professional
4. **Check format** - correct format for purpose
5. **Test playback** - works across devices

### Before Committing
1. **Run image audit** - verify all images meet standards
2. **Test videos** - play on multiple devices
3. **Test audio** - verify voiceovers work
4. **Check file sizes** - no bloated files
5. **Verify paths** - all media accessible

### Audit Commands
```bash
# Check image resolutions
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -exec identify -format "%f: %wx%h\n" {} \;

# Check image file sizes
find public/images -type f -exec ls -lh {} \; | awk '{print $5, $9}'

# Check video files
ls -lh public/videos/*.mp4

# Check audio files
ls -lh public/videos/*.mp3
```

---

## Component Usage

### VoiceoverPlayer Component
```tsx
// Homepage with default voiceover
<VoiceoverPlayer 
  text="Welcome to Elevate for Humanity"
  voiceoverFile="/videos/voiceover.mp3"
/>

// Barber page with custom voiceover
<VoiceoverPlayer 
  text="Barber Apprenticeship Program"
  voiceoverFile="/videos/barber-voiceover.mp3"
/>
```

### Key Props
- `text` - Text content (for accessibility)
- `voiceoverFile` - Path to professional MP3
- `autoPlay` - Default false (user must click)

### Behavior
- Loads ready on page load
- Requires user click to play
- NOT muted (professional audio)
- NOT looping (plays once)
- Stop button available
- Cleanup on unmount

---

## Enforcement

### Code Review Checklist
- [ ] No robotic TTS fallbacks
- [ ] No low-resolution images
- [ ] No autoplay with sound
- [ ] No looping voiceovers
- [ ] Professional quality only
- [ ] Proper file paths
- [ ] Optimized file sizes

### Automated Checks
- Image resolution validation
- File size limits
- Format verification
- Broken link detection

---

## Current Status

### ✅ Fixed
- VoiceoverPlayer component enforces professional audio only
- Removed robotic speechSynthesis fallback
- Enforced no-autoplay, no-loop, no-mute
- Professional voiceover files present in repository

### ⚠️ Needs Attention
- Team photos need higher resolution (528x444 → 1200x800)
- Portfolio pieces need upscaling (400x400 → 800x800)
- Verify all hero images are 1920x1080+

### 📋 Action Items
1. Replace low-resolution team photos
2. Upscale or replace portfolio pieces
3. Audit all hero images for resolution
4. Compress large files without quality loss
5. Add more professional voiceovers for other pages

---

## Resources

### Image Optimization Tools
- **ImageOptim** - Lossless compression
- **Squoosh** - Web-based optimizer
- **Sharp** - Node.js image processing

### Video Optimization Tools
- **HandBrake** - Video compression
- **FFmpeg** - Video processing
- **Cloudinary** - CDN with optimization

### Audio Tools
- **Audacity** - Audio editing
- **ElevenLabs** - Professional AI voices (if needed)
- **Descript** - Audio editing and transcription

---

**Last Updated:** December 26, 2025  
**Maintained By:** Engineering Team  
**Review Frequency:** Monthly
