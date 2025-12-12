#!/usr/bin/env python3
"""
Generate natural-sounding voiceover using Google Text-to-Speech
Requires: pip install gtts
"""

from gtts import gTTS
import os

# Read the script
script_path = 'public/videos/homepage-voiceover-natural.txt'
output_path = 'public/videos/voiceover-new.mp3'

with open(script_path, 'r') as f:
    text = f.read()

print("🎤 Generating voiceover...")
print(f"📝 Script length: {len(text)} characters")

# Create TTS object with natural settings
# Using 'en' for US English, slow=False for natural pace
tts = gTTS(text=text, lang='en', slow=False, tld='com')

# Save the audio file
tts.save(output_path)

print(f"✅ Voiceover generated: {output_path}")
print(f"📊 File size: {os.path.getsize(output_path) / 1024:.1f} KB")
print("\n🎯 Next steps:")
print("1. Listen to the file: public/videos/voiceover-new.mp3")
print("2. If you like it, replace the old one:")
print("   mv public/videos/voiceover-new.mp3 public/videos/voiceover.mp3")
print("3. Re-enable in components/WelcomeAudio.tsx")
