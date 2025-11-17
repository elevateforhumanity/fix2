#!/usr/bin/env node
/**
 * Generate InVideo AI Prompts for Program Videos
 * 
 * This script reads your video scripts and creates ready-to-use
 * prompts for InVideo AI's text-to-video generator.
 * 
 * Usage: node generate-invideo-prompts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const programs = [
  {
    name: 'Barber Apprenticeship',
    scriptFile: 'content/video-scripts/ecd-courses/barber-apprenticeship-video.md',
    duration: '45-60 seconds',
    style: 'professional, modern barbershop, diverse professionals',
  },
  {
    name: 'Medical Assistant',
    scriptFile: 'content/video-scripts/ecd-courses/medical-assistant-video.md',
    duration: '45-60 seconds',
    style: 'healthcare, medical setting, professional, caring',
  },
  {
    name: 'HVAC Technician',
    scriptFile: 'content/video-scripts/ecd-courses/hvac-technician-video.md',
    duration: '45-60 seconds',
    style: 'skilled trades, HVAC equipment, professional training',
  },
];

console.log('🎬 InVideo AI Video Generation Guide');
console.log('=====================================\n');

programs.forEach((program, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`VIDEO ${index + 1}: ${program.name}`);
  console.log('='.repeat(60));

  // Read script
  const scriptPath = path.join(__dirname, program.scriptFile);
  let script = '';
  
  try {
    script = fs.readFileSync(scriptPath, 'utf8');
    // Remove markdown headers and clean up
    script = script
      .replace(/^#.*$/gm, '') // Remove headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\n\n+/g, '\n\n') // Clean up extra newlines
      .trim();
  } catch (error) {
    console.log(`❌ Could not read script: ${program.scriptFile}`);
    return;
  }

  console.log('\n📝 SCRIPT:');
  console.log('-'.repeat(60));
  console.log(script);
  console.log('-'.repeat(60));

  console.log('\n🎨 INVIDEO AI PROMPT:');
  console.log('-'.repeat(60));
  
  const prompt = `Create a ${program.duration} professional video about ${program.name} for workforce training.

Style: ${program.style}, modern, educational, high-quality

Script:
${script}

Include:
- Professional voiceover (clear, encouraging tone)
- Relevant B-roll footage (${program.style})
- Text overlays for key points
- Upbeat background music
- Call-to-action at end
- Elevate for Humanity branding`;

  console.log(prompt);
  console.log('-'.repeat(60));

  console.log('\n📋 STEPS TO CREATE IN INVIDEO AI:');
  console.log('1. Go to: https://ai.invideo.io');
  console.log('2. Click "Create AI Video"');
  console.log('3. Paste the prompt above');
  console.log('4. Select template: "Professional/Educational"');
  console.log('5. Choose voice: Professional (Male or Female)');
  console.log('6. Click "Generate Video"');
  console.log('7. Wait 3-5 minutes');
  console.log('8. Review and edit if needed');
  console.log('9. Export video');
  console.log('10. Copy the share URL\n');
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`Total videos to create: ${programs.length}`);
console.log('Estimated time: 15-20 minutes total');
console.log('Cost: Free tier (4 videos/month) or $20/month unlimited');
console.log('\n💡 TIP: Create all 3 videos in one session for consistency\n');

console.log('🔗 INVIDEO AI LINKS:');
console.log('- Main site: https://ai.invideo.io');
console.log('- Pricing: https://invideo.io/pricing');
console.log('- Templates: https://invideo.io/templates');
console.log('- Help: https://invideo.io/help\n');

console.log('✅ Once you have the video URLs, run:');
console.log('   node update-homepage-videos.js [URL1] [URL2] [URL3]\n');
