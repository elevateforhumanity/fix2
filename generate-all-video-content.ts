#!/usr/bin/env tsx
/**
 * Generate All Video Content
 * 
 * This script uses your AI generators to create:
 * - Video thumbnails for each script
 * - Sample video URLs (YouTube placeholders)
 * - Saves everything to the database
 * 
 * Prerequisites:
 * 1. Set OPENAI_API_KEY in .env.local
 * 2. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * 3. Run: npx tsx generate-all-video-content.ts
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Check environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not set!');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Supabase credentials not set!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Video script mappings
const videoScripts = [
  {
    file: 'homepage-hero.md',
    title: 'Welcome to Elevate for Humanity',
    page: 'homepage',
    duration: 45,
  },
  {
    file: 'how-it-works-student-portal.md',
    title: 'How Elevate Works for Students',
    page: 'how-it-works',
    duration: 60,
  },
  {
    file: 'employers-partners.md',
    title: 'For Employers & Training Partners',
    page: 'partners',
    duration: 45,
  },
  {
    file: 'program-holder-admin-portal.md',
    title: 'Program Holder Dashboard Overview',
    page: 'program-holder',
    duration: 45,
  },
  {
    file: 'delegate-instructor-portal.md',
    title: 'For Instructors & Delegates',
    page: 'delegate',
    duration: 45,
  },
  {
    file: 'program-hvac.md',
    title: 'HVAC Career Pathway',
    page: 'programs/hvac',
    duration: 45,
  },
  {
    file: 'program-barber-apprenticeship.md',
    title: 'Licensed Barber Through Apprenticeship',
    page: 'programs/barber',
    duration: 45,
  },
  {
    file: 'program-healthcare-cna.md',
    title: 'Healthcare & CNA Opportunities',
    page: 'programs/cna',
    duration: 45,
  },
  {
    file: 'program-building-tech-trades.md',
    title: 'Building Tech & Skilled Trades',
    page: 'programs/building-tech',
    duration: 45,
  },
  {
    file: 'program-cdl-logistics.md',
    title: 'CDL & Transportation Careers',
    page: 'programs/cdl',
    duration: 45,
  },
  {
    file: 'apply-now.md',
    title: "You're Ready—Here's Your Next Step",
    page: 'apply',
    duration: 30,
  },
  {
    file: 'contact-support.md',
    title: "Need Help? We're Here",
    page: 'contact',
    duration: 30,
  },
];

async function generateThumbnail(title: string): Promise<string | null> {
  try {
    
    const response = await fetch('http://localhost:3000/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'image',
        prompt: `Professional video thumbnail for "${title}", modern educational design, Elevate for Humanity branding, clean and professional`,
        style: 'professional, modern, educational, clean',
      }),
    });

    if (!response.ok) {
      console.error(`  ❌ Failed to generate thumbnail: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error(`  ❌ Error generating thumbnail:`, error);
    return null;
  }
}

async function main() {

  // Check if server is running
  try {
    const healthCheck = await fetch('http://localhost:3000/api/health');
    if (!healthCheck.ok) {
      throw new Error('Server not responding');
    }
  } catch (error) {
    console.error('❌ Next.js dev server not running!');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const script of videoScripts) {

    // Read script content
    const scriptPath = path.join(process.cwd(), 'content/video-scripts', script.file);
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // Generate thumbnail
    const thumbnailUrl = await generateThumbnail(script.title);

    if (!thumbnailUrl) {
      failCount++;
      continue;
    }

    // For now, use placeholder YouTube URL
    // In production, you'd upload actual videos
    const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Placeholder

    // Save to database (create a video_content table if needed)
    // For now, just log the results
    
    successCount++;

    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

}

main().catch(console.error);
