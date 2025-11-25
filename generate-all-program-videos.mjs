#!/usr/bin/env node
/**
 * Generate Videos for All 27 Programs
 * Uses OpenAI DALL-E to create video thumbnails/stills
 */

import OpenAI from 'openai';
import fs from 'fs';
import https from 'https';
import path from 'path';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log('🎬 Generating Videos for All 27 Programs');
console.log('==========================================\n');

const programs = [
  // Healthcare Programs (14)
  { name: 'medical-assistant', prompt: 'Professional medical assistant in scrubs helping patient in modern clinic, realistic medical photography, natural lighting, professional healthcare setting' },
  { name: 'cna-training', prompt: 'Certified nursing assistant providing patient care in hospital, realistic healthcare photography, professional medical environment' },
  { name: 'phlebotomy-technician', prompt: 'Phlebotomist drawing blood sample in medical lab, realistic healthcare photography, professional clinical setting' },
  { name: 'dental-assistant', prompt: 'Dental assistant helping dentist with patient in modern dental office, realistic dental photography, professional clinic setting' },
  { name: 'ekg-technician', prompt: 'EKG technician operating cardiac monitoring equipment in hospital, realistic medical photography, professional healthcare setting' },
  { name: 'pharmacy-technician', prompt: 'Pharmacy technician organizing medications in modern pharmacy, realistic pharmaceutical photography, professional retail setting' },
  { name: 'patient-care-technician', prompt: 'Patient care technician assisting elderly patient in healthcare facility, realistic medical photography, compassionate care setting' },
  { name: 'professional-esthetician', prompt: 'Professional esthetician performing facial treatment in upscale spa, realistic beauty photography, modern wellness center' },
  { name: 'sterile-processing', prompt: 'Sterile processing technician sterilizing medical instruments in hospital, realistic medical photography, professional clinical setting' },
  { name: 'healthcare-administration', prompt: 'Healthcare administrator working at desk in modern medical office, realistic business photography, professional healthcare setting' },
  { name: 'cpr-certification', prompt: 'CPR training instructor teaching students on mannequin in classroom, realistic training photography, professional education setting' },
  { name: 'emergency-health-safety', prompt: 'Emergency medical technician in ambulance with medical equipment, realistic emergency photography, professional EMS setting' },
  { name: 'peer-recovery-coach', prompt: 'Peer recovery coach in supportive counseling session, realistic counseling photography, professional support setting' },
  { name: 'peer-support-professional', prompt: 'Peer support professional leading group therapy session, realistic counseling photography, supportive community setting' },
  
  // Skilled Trades (7)
  { name: 'barber-apprenticeship', prompt: 'Professional barber cutting client hair in upscale barbershop, realistic barbering photography, modern shop interior' },
  { name: 'hvac-technician', prompt: 'HVAC technician working on commercial air conditioning unit, realistic industrial photography, professional trade setting' },
  { name: 'building-maintenance', prompt: 'Building maintenance technician repairing facility systems, realistic industrial photography, professional maintenance setting' },
  { name: 'cdl-training', prompt: 'Professional truck driver in modern semi truck cab, realistic automotive photography, commercial vehicle interior' },
  { name: 'electrical-apprenticeship', prompt: 'Electrician working on electrical panel in commercial building, realistic industrial photography, professional trade setting' },
  { name: 'plumbing-apprenticeship', prompt: 'Plumber installing pipes in commercial building, realistic industrial photography, professional trade setting' },
  { name: 'welding-fabrication', prompt: 'Welder working with welding torch in fabrication shop, realistic industrial photography, professional workshop setting' },
  
  // Other Programs (6)
  { name: 'workforce-readiness', prompt: 'Job training instructor teaching resume writing in modern classroom, realistic education photography, professional training setting' },
  { name: 'business-startup-marketing', prompt: 'Business entrepreneur presenting marketing plan in modern office, realistic business photography, professional startup setting' },
  { name: 'tax-prep-financial-services', prompt: 'Tax preparer helping client with tax documents in professional office, realistic business photography, financial services setting' },
  { name: 'beauty-career-educator', prompt: 'Beauty instructor teaching cosmetology students in modern salon, realistic education photography, professional beauty school' },
  { name: 'culinary-arts', prompt: 'Professional chef teaching culinary students in commercial kitchen, realistic culinary photography, professional cooking school' },
  { name: 'it-support-apprenticeship', prompt: 'IT technician working on computer systems in modern office, realistic technology photography, professional IT setting' },
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function generateProgramVideo(program) {
  try {
    console.log(`\n📸 Generating: ${program.name}`);
    
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: program.prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
    });

    const imageUrl = response.data[0].url;
    const outputPath = `public/media/programs/${program.name}-video-thumbnail.jpg`;
    
    await downloadImage(imageUrl, outputPath);
    
    console.log(`✅ Created: ${outputPath}`);
    
    // Wait 1 second between requests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
    
  } catch (error) {
    console.log(`❌ Failed: ${program.name}`, error.message);
  }
}

// Generate all videos
console.log(`Generating ${programs.length} program video thumbnails...\n`);

for (const program of programs) {
  await generateProgramVideo(program);
}

console.log('\n✅ All program video thumbnails generated!');
console.log('📁 Files created in public/media/programs/');
console.log('\n💡 Next steps:');
console.log('1. Review generated images');
console.log('2. Use these as video thumbnails');
console.log('3. Create actual videos using video editing software');
