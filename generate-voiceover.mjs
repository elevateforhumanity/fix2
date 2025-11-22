#!/usr/bin/env node
/**
 * Generate voiceover for Elevate for Humanity video
 * Uses the repository's TTS service
 */

import { generateAndSaveAudio } from './server/tts-service.ts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Compelling script about Elevate for Humanity
const SCRIPT = `Welcome to Elevate for Humanity.

We're more than a training provider. We're a community-based workforce philanthropy, transforming lives through education and opportunity.

From Marion County to communities across Indiana, we connect people to 100% funded career training. No tuition. No debt. Just real pathways to meaningful careers.

Whether you're starting fresh, making a change, or getting a second chance, we're here to elevate your future.

Because when you rise, we all rise.

Elevate for Humanity. Your partner in career transformation.`;

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
