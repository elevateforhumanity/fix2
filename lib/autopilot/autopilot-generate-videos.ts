#!/usr/bin/env tsx
/**
 * 🤖 AUTOPILOT: Generate All Videos
 * 
 * This script automatically:
 * 1. Reads all video scripts from content/video-scripts/
 * 2. Uses your AI generators to create thumbnails
 * 3. Generates video metadata
 * 4. Saves everything to database
 * 5. Creates a report
 * 
 * Prerequisites:
 * - OPENAI_API_KEY set in environment
 * - Dev server running (npm run dev)
 * - Supabase credentials configured
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
// Check environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!OPENAI_API_KEY) {
  \n');
  process.exit(0);
}
if (!SUPABASE_URL || !SUPABASE_KEY) {
  ');
}
// Video configurations
const videos = [
  {
    script: 'homepage-hero.md',
    title: 'Welcome to Elevate for Humanity',
    page: 'homepage',
    duration: 45,
    prompt: 'Professional welcome video for workforce training platform, diverse students, modern educational setting, Elevate for Humanity branding',
  },
  {
    script: 'how-it-works-student-portal.md',
    title: 'How Elevate Works for Students',
    page: 'lms',
    duration: 60,
    prompt: 'Student using online learning portal, modern LMS interface, diverse learner, professional educational technology',
  },
  {
    script: 'employers-partners.md',
    title: 'For Employers & Training Partners',
    page: 'partners',
    duration: 45,
    prompt: 'Business professionals in meeting, workforce development, partnership, modern office, diverse team',
  },
  {
    script: 'program-holder-admin-portal.md',
    title: 'Program Holder Dashboard',
    page: 'admin',
    duration: 45,
    prompt: 'Administrator using dashboard, data analytics, program management, professional office setting',
  },
  {
    script: 'delegate-instructor-portal.md',
    title: 'For Instructors & Delegates',
    page: 'delegate',
    duration: 45,
    prompt: 'Teacher or instructor with students, classroom setting, diverse learners, professional education',
  },
  {
    script: 'program-hvac.md',
    title: 'HVAC Career Pathway',
    page: 'programs/hvac',
    duration: 45,
    prompt: 'HVAC technician working on heating and cooling equipment, professional training, hands-on learning',
  },
  {
    script: 'program-barber-apprenticeship.md',
    title: 'Barber Apprenticeship',
    page: 'programs/barber',
    duration: 45,
    prompt: 'Professional barber cutting hair in modern barbershop, apprentice learning, diverse professionals',
  },
  {
    script: 'program-healthcare-cna.md',
    title: 'Healthcare & CNA',
    page: 'programs/cna',
    duration: 45,
    prompt: 'Healthcare worker or CNA in medical setting, caring for patients, professional medical training',
  },
  {
    script: 'program-building-tech-trades.md',
    title: 'Building Tech & Trades',
    page: 'programs/building-tech',
    duration: 45,
    prompt: 'Skilled trades worker, construction or maintenance, tools and equipment, professional training',
  },
  {
    script: 'program-cdl-logistics.md',
    title: 'CDL & Transportation',
    page: 'programs/cdl',
    duration: 45,
    prompt: 'Professional truck driver with commercial vehicle, CDL training, transportation career',
  },
  {
    script: 'apply-now.md',
    title: 'Apply Now',
    page: 'apply',
    duration: 30,
    prompt: 'Person filling out online application, hopeful expression, modern computer, career opportunity',
  },
  {
    script: 'contact-support.md',
    title: 'Contact & Support',
    page: 'contact',
    duration: 30,
    prompt: 'Friendly support representative, helping customer, professional office, welcoming atmosphere',
  },
];
async function generateThumbnail(video: typeof videos[0]): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:3000/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'image',
        prompt: video.prompt,
        style: 'professional, modern, educational, high quality, photorealistic',
      }),
    });
    if (!response.ok) {
      const error = await response.text();
      return null;
    }
    const data = await response.json();
    if (data.url) {
      }...`);
      return data.url;
    } else {
      return null;
    }
  } catch (error: unknown) {
    return null;
  }
}
async function checkServer(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3000/api/health', {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
async function main() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }
  .toFixed(2)} (${videos.length} images × $0.04)\n');
  } minutes\n');
  );
  const results: Array<{
    video: typeof videos[0];
    thumbnail: string | null;
    script: string;
    success: boolean;
  }> = [];
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    // Read script
    const scriptPath = path.join(process.cwd(), 'content/video-scripts', video.script);
    let scriptContent = '';
    try {
      scriptContent = fs.readFileSync(scriptPath, 'utf-8');
      `);
    } catch (error) {
      results.push({ video, thumbnail: null, script: '', success: false });
      continue;
    }
    // Generate thumbnail
    const thumbnail = await generateThumbnail(video);
    results.push({
      video,
      thumbnail,
      script: scriptContent,
      success: thumbnail !== null,
    });
    // Rate limiting - wait 2 seconds between requests
    if (i < videos.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  // Generate report
  );
  );
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  if (successful > 0) {
    results
      .filter(r => r.success)
      .forEach(r => {
      });
  }
  if (failed > 0) {
    results
      .filter(r => !r.success)
      .forEach(r => {
      });
  }
  // Save report
  const reportPath = path.join(process.cwd(), 'video-generation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  );
  );
   - $24/month unlimited');
   - $22/month');
   - $19/month');
   - $29/month');
  ');
}
main().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
