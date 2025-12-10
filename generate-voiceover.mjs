#!/usr/bin/env node
/**
 * Generate voiceover for Elevate for Humanity video
 * Uses the repository's TTS service
 */

import { generateAndSaveAudio } from './server/tts-service.ts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Natural, human script from Elizabeth Greene
const SCRIPT = `Hey there. I'm Elizabeth Greene, and I started Elevate For Humanity because I believe everyone deserves a real shot at a better life.

Maybe you've been turned down for jobs. Maybe you're working two jobs and still can't pay rent. Maybe you're coming home from incarceration and nobody will give you a chance.

I see you. Not your mistakes. Not your struggles. Your potential.

We offer free career training in barbering, healthcare, HVAC, and more. If you qualify for government funding, it costs you nothing. Zero debt. Real credentials. Real jobs waiting.

Don't qualify? No problem. We have payment plans that work.

This isn't charity. This is justice. This is what happens when someone actually believes in you.

Your past doesn't define your future. Let's build it together.

Visit ElevateForHumanity.org or call 317-314-3757.`;

async function main() {
  console.log('🎙️  Generating voiceover for Elevate for Humanity\n');
  console.log('Script:');
  console.log('─'.repeat(70));
  console.log(SCRIPT);
  console.log('─'.repeat(70));
  console.log('\n');

  try {
    const outputPath = path.join(__dirname, 'public', 'videos', 'voiceover.mp3');
    
    console.log('Generating audio with espeak-ng...\n');
    
    await generateAndSaveAudio(SCRIPT, outputPath, {
      voice: 'nova', // Female voice
      speed: 1.0
    });
    
    console.log('\n✅ Voiceover generated successfully!');
    console.log(`\nFile saved to: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Combine voiceover with video using FFmpeg');
    console.log('2. Add background music (optional)');
    console.log('3. Replace the video on the website');
    
  } catch (error) {
    console.error('\n❌ Error generating voiceover:', error.message);
    console.error('\nMake sure espeak-ng and ffmpeg are installed:');
    console.error('  sudo apt-get install espeak-ng ffmpeg');
    process.exit(1);
  }
}

main();
