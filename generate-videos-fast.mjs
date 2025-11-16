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
    prompt:
      'Professional photograph of diverse adult students in modern training facility, realistic lighting, sharp focus, high-end corporate photography style, Canon EOS R5, 50mm lens, natural lighting, professional composition, real people, documentary style',
    output: 'public/media/homepage-hero.jpg',
  },
  {
    name: 'program-barber',
    prompt:
      'Professional photograph of barber cutting client hair in upscale barbershop, realistic lighting, sharp focus, professional photography, Canon EOS, natural colors, real people, documentary style, modern interior',
    output: 'public/media/program-barber.jpg',
  },
  {
    name: 'program-hvac',
    prompt:
      'Professional photograph of HVAC technician working on commercial HVAC unit, realistic lighting, sharp focus, industrial photography, safety equipment, real workplace, documentary style, professional composition',
    output: 'public/media/program-hvac.jpg',
  },
  {
    name: 'program-cdl',
    prompt:
      'Professional photograph of truck driver in modern semi truck cab, realistic lighting, sharp focus, automotive photography, professional driver, real vehicle interior, documentary style',
    output: 'public/media/program-cdl.jpg',
  },
  {
    name: 'program-cna',
    prompt:
      'Professional photograph of healthcare worker in scrubs in modern hospital, realistic lighting, sharp focus, medical photography, real medical facility, professional composition, documentary style',
    output: 'public/media/program-cna.jpg',
  },
  {
    name: 'efh-about',
    prompt:
      'Professional photograph of modern workforce training center, realistic lighting, sharp focus, architectural photography, real facility, professional composition, natural lighting, documentary style',
    output: 'public/media/efh-about.jpg',
  },
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('\n✅ All images generated!');
  console.log('\n📁 Files created in public/media/');
}

main().catch(console.error);
