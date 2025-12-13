#!/usr/bin/env python3
"""
Generate barber program voiceover using Google Text-to-Speech
Requires: pip install gtts
"""

from gtts import gTTS
import os

# Barber program hero banner script
text = """At Elevate for Humanity, we believe becoming a barber should be more than just learning how to cut hair. It should lead to a real career. Our Barber Apprenticeship combines hands-on training, classroom instruction, and paid learning opportunities to help you earn while you learn. You'll build skills, gain experience in real shop environments, and work toward licensure with structured support every step of the way. If you're ready to turn your passion into a profession, this is your pathway. Welcome to Elevate for Humanity."""

output_path = 'public/videos/barber-voiceover.mp3'

print("🎤 Generating barber program voiceover...")
print(f"📝 Script length: {len(text)} characters")

# Create TTS object with natural settings
# Using 'en' for US English, slow=False for natural pace
tts = gTTS(text=text, lang='en', slow=False, tld='com')

# Save the audio file
tts.save(output_path)

print(f"✅ Voiceover generated: {output_path}")
print(f"📊 File size: {os.path.getsize(output_path) / 1024:.1f} KB")
print("\n🎯 The voiceover will automatically play with the barber program hero video.")
