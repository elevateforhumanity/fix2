#!/usr/bin/env node
/**
 * FAST Video Generation - No Dev Server Required
 * Generates videos directly using OpenAI DALL-E for thumbnails
 * and creates video metadata
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log('🎬 FAST Video Generation');
console.log('========================\n');

const videos = [
  {
    name: 'homepage-hero',
    prompt: 'Professional diverse group of adult students in modern training facility learning technical skills, bright classroom, hopeful atmosphere, photorealistic, 16:9 landscape',
    output: 'public/media/homepage-hero.jpg'
  },
  {
    name: 'program-barber',
    prompt: 'Professional barber cutting hair in modern barbershop, apprentice learning, diverse professionals, clean environment, 16:9 landscape, photorealistic',
    output: 'public/media/program-barber.jpg'
  },
  {
    name: 'program-hvac',
    prompt: 'HVAC technician working on heating system, professional training environment, modern equipment, safety gear, 16:9 landscape, photorealistic',
    output: 'public/media/program-hvac.jpg'
  },
  {
    name: 'program-cdl',
    prompt: 'Professional truck driver in modern semi truck, CDL training, highway background, diverse professional, 16:9 landscape, photorealistic',
    output: 'public/media/program-cdl.jpg'
  },
  {
    name: 'program-cna',
    prompt: 'Healthcare worker in scrubs helping patient in modern medical facility, caring atmosphere, professional medical setting, 16:9 landscape, photorealistic',
    output: 'public/media/program-cna.jpg'
  },
  {
    name: 'efh-about',
    prompt: 'Modern workforce development center, diverse group of professionals and students, collaborative learning environment, Elevate for Humanity branding, 16:9 landscape, photorealistic',
    output: 'public/media/efh-about.jpg'
  }
];

async function generateImage(video) {
  console.log(`\n📸 Generating: ${video.name}`);
  
  try {
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: video.prompt,
      n: 1,
      size: '1792x1024', // 16:9 aspect ratio
    });
    
    const url = response.data[0].url;
    const img = await fetch(url);
    const buffer = await img.arrayBuffer();
    
    // Ensure directory exists
    const dir = path.dirname(video.output);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(video.output, Buffer.from(buffer));
    console.log(`✅ Saved: ${video.output}`);
    
  } catch (error) {
    console.error(`❌ Failed: ${video.name}`, error.message);
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set');
    process.exit(1);
  }
  
  console.log(`Generating ${videos.length} images...\n`);
  
  for (const video of videos) {
    await generateImage(video);
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ All images generated!');
  console.log('\n📁 Files created in public/media/');
}

main().catch(console.error);
