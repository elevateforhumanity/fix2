#!/usr/bin/env node
/**
 * 🤖 AUTOPILOT VIDEO GENERATION
 * 
 * This script uses your AI toolkit to generate all program videos automatically.
 * 
 * Usage: node generate-videos-autopilot.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Video configurations
const videos = [
  {
    filename: 'hero-elevate-home.mp4',
    title: 'Elevate For Humanity - Homepage Hero',
    duration: 45,
    script: `Elevate For Humanity™
Free & Funded Workforce Training
Apprenticeships • Credentials • Real Jobs

We connect adults, youth, and re-entry talent with state-approved training, apprenticeships, and employer partners so you can elevate your income, your family, and your community.

Indiana Workforce • WRG • WIOA
State-Approved Barber Apprenticeship
Medical Assistant • HVAC • Building Tech

Apply Today at ElevateForHumanity.org`,
    style: 'cinematic, professional, inspiring, diverse people, modern office, training facilities',
    aspectRatio: '16:9',
  },
  {
    filename: 'program-medical-assistant.mp4',
    title: 'Medical Assistant Program',
    duration: 45,
    scriptFile: 'content/video-scripts/ecd-courses/medical-assistant-video.md',
    style: 'healthcare, medical setting, professional, caring, clinical environment',
    aspectRatio: '16:9',
  },
  {
    filename: 'program-barber-apprenticeship.mp4',
    title: 'Barber Apprenticeship Program',
    duration: 45,
    scriptFile: 'content/video-scripts/ecd-courses/barber-apprenticeship-video.md',
    style: 'barbershop, professional grooming, diverse barbers, modern shop, clippers',
    aspectRatio: '16:9',
  },
  {
    filename: 'program-hvac.mp4',
    title: 'HVAC Technician Program',
    duration: 45,
    scriptFile: 'content/video-scripts/ecd-courses/hvac-technician-video.md',
    style: 'skilled trades, HVAC equipment, technician working, tools, professional',
    aspectRatio: '16:9',
  },
  {
    filename: 'program-building-tech.mp4',
    title: 'Building Maintenance Technician',
    duration: 45,
    script: `Want a stable career in the skilled trades? Building Maintenance Technician training at Elevate For Humanity prepares you for in-demand facility maintenance roles.

Learn electrical, plumbing, HVAC basics, carpentry, and general repairs through hands-on training.

Work in property management, commercial buildings, schools, hospitals, or industrial facilities.

Visit ElevateForHumanity.org to explore this pathway.`,
    style: 'facility maintenance, building systems, tools, professional technician, diverse workers',
    aspectRatio: '16:9',
  },
  {
    filename: 'program-workforce-readiness.mp4',
    title: 'Workforce Readiness & Re-Entry',
    duration: 45,
    script: `Need a fresh start? The Workforce Readiness program at Elevate For Humanity helps you rebuild, reset, and re-enter the workforce with confidence.

We provide coaching, skills training, and real employment connections for adults, youth, and re-entry citizens.

Whether you're starting over, changing careers, or just need support, we'll help you navigate barriers and find your path forward.

Visit ElevateForHumanity.org to start your journey.`,
    style: 'coaching, supportive, diverse people, office training, hopeful, professional',
    aspectRatio: '16:9',
  },
  {
    filename: 'reel-elevate-enroll-today.mp4',
    title: 'Social Reel - Enroll Today',
    duration: 30,
    script: `Need a real career… not just another job?

At Elevate For Humanity, we connect you to Medical Assistant, Barber Apprenticeship, HVAC, Building Tech, and more.

Many learners qualify for free or funded training through workforce grants, apprenticeships, or employer partners.

You don't have to figure it out alone. Our team helps you apply, choose a program, and navigate barriers.

From interest, to training, to employment… we walk with you step by step.

Ready to elevate your future? Apply at ElevateForHumanity.org`,
    style: 'fast-paced, inspiring, diverse students, training montage, success stories',
    aspectRatio: '9:16',
  },
  {
    filename: 'reel-barber-apprenticeship.mp4',
    title: 'Social Reel - Barber Apprenticeship',
    duration: 30,
    script: `Love cutting hair?

It's time to turn that skill into a licensed career.

Elevate For Humanity connects you to a state-approved barber apprenticeship where you train in real barbershops, with real clients, earning hours toward your license.

You'll learn cuts, fades, shaves, sanitation, and business basics so you can earn, learn, and build your own brand.

Spots are limited and shop seats fill fast.

Apply at ElevateForHumanity.org`,
    style: 'barbershop energy, clippers, fades, professional barbers, urban, authentic',
    aspectRatio: '9:16',
  },
];

console.log('🎬 AUTOPILOT VIDEO GENERATION');
console.log('================================\n');

// Read script files
videos.forEach(video => {
  if (video.scriptFile) {
    try {
      const scriptPath = path.join(__dirname, video.scriptFile);
      const content = fs.readFileSync(scriptPath, 'utf8');
      // Remove markdown headers and clean up
      video.script = content
        .replace(/^#.*$/gm, '')
        .replace(/\*\*/g, '')
        .replace(/\n\n+/g, '\n\n')
        .trim();
    } catch (error) {
      console.log(`⚠️  Could not read ${video.scriptFile}`);
    }
  }
});

// Output configuration for your AI toolkit
console.log('📋 VIDEO GENERATION CONFIGURATION\n');
console.log('Copy this JSON to your AI video generation toolkit:\n');

const config = {
  project: 'Elevate For Humanity',
  brand: {
    name: 'Elevate For Humanity™',
    tagline: 'Innovate. Elevate. Reset.™',
    colors: ['#f97316', '#ea580c', '#000000', '#0f172a'],
    website: 'ElevateForHumanity.org',
  },
  videos: videos.map(v => ({
    filename: v.filename,
    title: v.title,
    duration: v.duration,
    script: v.script,
    style: v.style,
    aspectRatio: v.aspectRatio,
    voiceSettings: {
      voice: 'professional-male' || 'professional-female',
      speed: 'normal',
      tone: 'encouraging, clear, confident',
    },
    visualSettings: {
      captions: true,
      music: 'upbeat-motivational',
      transitions: 'smooth',
      branding: 'Elevate For Humanity logo',
    },
  })),
};

console.log(JSON.stringify(config, null, 2));

console.log('\n\n📁 OUTPUT DIRECTORY');
console.log('Save generated videos to: public/videos/\n');

console.log('✅ CHECKLIST');
videos.forEach((video, i) => {
  console.log(`${i + 1}. [ ] ${video.filename}`);
});

console.log('\n\n🤖 NEXT STEPS:');
console.log('1. Copy the JSON configuration above');
console.log('2. Paste into your AI video generation toolkit');
console.log('3. Generate all videos');
console.log('4. Download and save to public/videos/');
console.log('5. Run: git add public/videos/*.mp4');
console.log('6. Run: git commit -m "Add generated videos"');
console.log('7. Run: git push origin main');
console.log('\n✨ Your site will automatically use the videos!\n');
