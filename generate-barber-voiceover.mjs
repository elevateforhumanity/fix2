#!/usr/bin/env node
/**
 * Generate voiceover for Barber Program Hero Banner
 * Uses the repository's TTS service
 */

import { generateAndSaveAudio } from './server/tts-service.ts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Barber program hero banner script
const SCRIPT = `At Elevate for Humanity, we believe becoming a barber should be more than just learning how to cut hair. It should lead to a real career. Our Barber Apprenticeship combines hands-on training, classroom instruction, and paid learning opportunities to help you earn while you learn. You'll build skills, gain experience in real shop environments, and work toward licensure with structured support every step of the way. If you're ready to turn your passion into a profession, this is your pathway. Welcome to Elevate for Humanity.`;

async function main() {
  console.log('🎙️  Generating voiceover for Barber Program Hero Banner\n');
  console.log('Script:');
  console.log('─'.repeat(70));
  console.log(SCRIPT);
  console.log('─'.repeat(70));
  console.log('\n');

  try {
    const outputPath = path.join(__dirname, 'public', 'videos', 'barber-voiceover.mp3');
    
    console.log('Generating audio with espeak-ng...\n');
    
    await generateAndSaveAudio(SCRIPT, outputPath, {
      voice: 'nova', // Female voice
      speed: 1.0
    });
    
    console.log('\n✅ Barber voiceover generated successfully!');
    console.log(`\nFile saved to: ${outputPath}`);
    console.log('\nThe voiceover will automatically play with the barber program hero video.');
    
  } catch (error) {
    console.error('\n❌ Error generating voiceover:', error.message);
    console.error('\nMake sure espeak-ng and ffmpeg are installed:');
    console.error('  sudo apt-get install espeak-ng ffmpeg');
    process.exit(1);
  }
}

main();
