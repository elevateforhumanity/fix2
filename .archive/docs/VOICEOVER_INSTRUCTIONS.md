# How to Create Natural-Sounding Voiceover

## Current Status
❌ **VOICEOVER DISABLED** - The robot voiceover has been temporarily disabled in `/components/WelcomeAudio.tsx`

## Current Issue
The current voiceover (`/public/videos/voiceover.mp3`) sounds robotic and generic.

## New Script
A more personal, human script is ready at: `/public/videos/homepage-voiceover-natural.txt`

## Option 1: ElevenLabs (RECOMMENDED - Most Natural)

1. Go to: https://elevenlabs.io
2. Sign up for free account (10,000 characters/month free)
3. Click "Speech Synthesis"
4. Paste the script from `homepage-voiceover-natural.txt`
5. Choose voice:
   - **Rachel** (warm, professional female)
   - **Adam** (confident male)
   - **Bella** (friendly, conversational female)
6. Adjust settings:
   - Stability: 50-60% (more natural variation)
   - Clarity: 70-80%
   - Style: 30-40% (adds emotion)
7. Click "Generate"
8. Download MP3
9. Replace `/public/videos/voiceover.mp3` with new file

## Option 2: Google Cloud Text-to-Speech (Good Quality)

1. Go to: https://cloud.google.com/text-to-speech
2. Try demo with script
3. Choose "WaveNet" voices (most natural):
   - `en-US-Wavenet-F` (female, warm)
   - `en-US-Wavenet-D` (male, deep)
   - `en-US-Neural2-F` (female, conversational)
4. Download and replace file

## Option 3: Record Your Own Voice (MOST AUTHENTIC)

**This is the BEST option** - your own voice telling your story.

1. Use your phone's voice recorder
2. Find a quiet room
3. Read the script naturally (don't rush)
4. Speak like you're talking to a friend
5. Transfer file to computer
6. Convert to MP3 if needed (use https://cloudconvert.com)
7. Replace `/public/videos/voiceover.mp3`

## Option 4: Use Edge TTS (Free, Better than Current)

Run this command in the terminal:

```bash
cd /workspaces/fix2
npx edge-tts --voice en-US-JennyNeural --file public/videos/homepage-voiceover-natural.txt --write-media public/videos/voiceover-new.mp3
```

Then replace the old file:
```bash
mv public/videos/voiceover-new.mp3 public/videos/voiceover.mp3
```

## Recommended Voice Settings

**For Elizabeth (your voice):**
- Tone: Warm, authentic, passionate
- Pace: Moderate (not too fast)
- Emotion: Empathetic but strong
- Style: Conversational, like talking to someone you care about

**Key Points:**
- Pause after "I see you."
- Emphasize "Your potential"
- Slow down on "This isn't charity. This is justice."
- End with confidence on the phone number

## After Generating

1. Replace `/public/videos/voiceover.mp3` with new file
2. Test it: Open homepage and listen
3. Commit and deploy:
   ```bash
   git add public/videos/voiceover.mp3
   git commit -m "Replace robotic voiceover with natural human voice"
   git push origin main
   ```

## My Recommendation

**Record it yourself.** Your story, your voice, your passion. That's what will connect with people. The script is written for you to read naturally. Just be yourself.
