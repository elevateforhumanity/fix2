/**
 * Generate Intro TTS using edge-tts
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Script for the intro video
const SCRIPT = `Welcome to Elevate for Humanity.

We're more than a training provider. We're a community-based workforce philanthropy, transforming lives through education and opportunity.

From Marion County to communities across Indiana, we connect people to 100% funded career training. No tuition. No debt. Just real pathways to meaningful careers.

Whether you're starting fresh, making a change, or getting a second chance, we're here to elevate your future.

Because when you rise, we all rise.

Elevate for Humanity. Your partner in career transformation.`;

async function generateTTS() {
  console.log('🎙️  Generating voiceover...\n');
  console.log('Script:');
  console.log('─'.repeat(60));
  console.log(SCRIPT);
  console.log('─'.repeat(60));
  console.log('\n');
  
  try {
    // Import edge-tts dynamically
    const edgeTTS = await import('edge-tts');
    
    const outputPath = path.join(process.cwd(), 'public', 'videos', 'intro-voiceover.mp3');
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Generate TTS
    // Using a professional, warm voice
    const voice = 'en-US-GuyNeural'; // Professional male voice
    
    console.log(`Voice: ${voice}`);
    console.log(`Output: ${outputPath}\n`);
    console.log('Generating audio...\n');
    
    // Create TTS instance
    const tts = new edgeTTS.default();
    
    // Generate audio
    await tts.ttsToFile(outputPath, SCRIPT, voice);
    
    console.log('✅ Audio generated successfully!\n');
    console.log(`File: ${outputPath}`);
    console.log('\nNext steps:');
    console.log('1. Add background music (optional)');
    console.log('2. Combine with logo video');
    console.log('3. Add to website homepage with autoplay');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

generateTTS().catch(console.error);
