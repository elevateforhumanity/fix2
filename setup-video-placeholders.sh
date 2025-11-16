#!/usr/bin/env bash
set -euo pipefail

echo "=== Setting up Elevate video placeholder content & components ==="

# Ensure base folders
mkdir -p content/video-scripts
mkdir -p components

############################################
# 1. VIDEO SCRIPTS (for AI generation / VO)
############################################

echo "-> Writing video script files into content/video-scripts"

# Homepage Hero
cat > content/video-scripts/homepage-hero.md << 'FILEEOF'
# Homepage Hero Video (30–45 seconds)
**Title:** Welcome to Elevate Connects Directory

Hi, I'm from Elevate for Humanity, and welcome to Elevate Connects Directory.  

This is your one-stop hub for **career training, apprenticeships, and workforce programs** that actually lead to jobs.  

Whether you're interested in **HVAC, barbering, healthcare, CDL, or building tech**, we connect you to training, funding options, and real employers who are hiring.  

Browse programs, check your eligibility for **WIOA and Workforce Readiness grants**, and apply in just a few clicks.  

When you're ready, hit **"Apply Now"** and let us help you move from *looking for opportunity* to **working in opportunity**.
FILEEOF

# How It Works / Student Portal Intro
cat > content/video-scripts/how-it-works-student-portal.md << 'FILEEOF'
# How It Works / Student Portal (45–60 seconds)
**Title:** How Elevate Works for Students

Not sure where to start? Let me walk you through it.  

Step 1: **Create your account** and tell us a little about your goals—are you looking for a new career, a second chance, or a better job?  

Step 2: Explore programs like **HVAC, Barber Apprenticeship, CNA, CDL, and more**. Each listing clearly shows cost, schedule, and which **grants or funding** may cover tuition.  

Step 3: Apply online. Our team and partners help with **paperwork, case management, and next steps** so you're not doing this alone.  

Log in to your **Student Portal** to track your classes, assignments, and certificates—all in one place.
FILEEOF

# Employer / Partner
cat > content/video-scripts/employers-partners.md << 'FILEEOF'
# Employer & Partner Video (45 seconds)
**Title:** For Employers & Training Partners

Are you an employer, school, or training provider? Elevate Connects Directory was built with you in mind.  

We help you **fill seats, fill jobs, and stay compliant** with workforce and WIOA requirements.  

Through our platform, you can list your programs, sign **digital MOUs**, manage referrals, and track student progress from enrollment to completion.  

You also gain access to a pipeline of **pre-screened, supported participants**—not just names on a list.  

If you're ready to grow your impact and your talent pool, click **"Become a Partner"** and let's get you onboarded.
FILEEOF

# Program Holder / Admin portal
cat > content/video-scripts/program-holder-admin-portal.md << 'FILEEOF'
# Program Holder / Admin Portal (30–45 seconds)
**Title:** Program Holder Dashboard Overview

Welcome to the **Program Holder Portal** inside Elevate Connects Directory.  

Here you can manage **program listings, cohorts, attendance, and outcomes** in one secure place.  

Update your schedules, track student progress, upload documents, and view who's funded under **WorkOne, WRG, WIOA, or local grants**.  

Our goal is to make your job easier—less spreadsheets, more real-time data and compliance-ready reporting.  

When you're logged in, start by checking your **current cohorts** and adding any upcoming classes or seats.
FILEEOF

# Delegate / Instructor portal
cat > content/video-scripts/delegate-instructor-portal.md << 'FILEEOF'
# Delegate / Instructor Portal (30–45 seconds)
**Title:** For Instructors & Delegates

If you teach, coach, or support learners, this part is for you.  

Inside the **Delegate Portal**, you can view your students, mark attendance, upload grades, and leave notes for case managers—all from one place.  

No more chasing emails or sticky notes. Everyone on the team sees the same information, so students don't fall through the cracks.  

Log in, go to **"My Students"**, and start with today's roster.
FILEEOF

# HVAC program
cat > content/video-scripts/program-hvac.md << 'FILEEOF'
# HVAC Program Video (30–45 seconds)
**Title:** HVAC Career Pathway

Interested in working with your hands and earning a solid income?  

Our **HVAC training pathway** helps you learn heating, cooling, and refrigeration skills that are in demand year-round.  

Through our partners, you'll get **hands-on training, safety, troubleshooting, and certifications** that employers look for.  

Many students qualify for **grant funding** so tuition can be reduced or even fully covered.  

Click on the **HVAC Program** page to see requirements, schedule, and how to apply.
FILEEOF

# Barber Apprenticeship
cat > content/video-scripts/program-barber-apprenticeship.md << 'FILEEOF'
# Barber Apprenticeship Video (30–45 seconds)
**Title:** Licensed Barber Through Apprenticeship

If you've ever dreamed of becoming a **licensed barber**, we can help you do it the apprenticeship way.  

Elevate for Humanity is a **registered apprenticeship sponsor**, which means you can **earn and learn** in a real barbershop while working toward your license.  

Our platform lets you connect with approved shops, track your hours, and stay on top of what's required for the state board.  

Visit the **Barber Apprenticeship** page to see how to get started and what funding options may be available.
FILEEOF

# Healthcare / CNA
cat > content/video-scripts/program-healthcare-cna.md << 'FILEEOF'
# Healthcare & CNA Program Video (30–45 seconds)
**Title:** Healthcare & CNA Opportunities

If you love helping people and want a stable career, **healthcare and CNA training** might be for you.  

Through our partners, you can train for **CNA, medical assisting, and other entry-level healthcare roles** that are always in demand.  

On Elevate Connects Directory, you can see which programs are **state-approved, ETPL-listed, and grant-eligible**.  

Check the **Healthcare Programs** page to compare options and apply online.
FILEEOF

# Building Tech / Skilled Trades
cat > content/video-scripts/program-building-tech-trades.md << 'FILEEOF'
# Building Tech & Skilled Trades Video (30–45 seconds)
**Title:** Building Tech & Skilled Trades

Skilled trades keep our communities running—and they pay well.  

Our **Building Technician and related skilled trades programs** help you learn maintenance, basic electrical, plumbing, and facilities skills.  

These roles show up in **apartments, schools, hospitals, and commercial buildings** everywhere.  

Visit the **Building Tech Programs** section to explore upcoming cohorts and funding options.
FILEEOF

# CDL / Logistics
cat > content/video-scripts/program-cdl-logistics.md << 'FILEEOF'
# CDL & Transportation Careers Video (30–45 seconds)
**Title:** CDL & Transportation Careers

Ready to move freight and move your income up at the same time?  

Our **CDL and transportation partners** offer training that prepares you for commercial driving roles with strong earning potential.  

Inside Elevate Connects Directory, you can view which CDL programs are **grant-eligible** and what requirements you need to meet.  

Go to the **CDL Programs** page to see start dates and how to apply.
FILEEOF

# Apply Now / Application page
cat > content/video-scripts/apply-now.md << 'FILEEOF'
# Apply Now Video (30 seconds)
**Title:** You're Ready—Here's Your Next Step

If you're watching this, you're closer than you think.  

The next step is simple: **fill out the online application** so we can match you with the right program and funding.  

Answer a few questions, tell us your interests, and our team or partners will follow up with your options.  

Click **"Apply Now"**, complete the form, and let Elevate help you move from interest to enrollment.
FILEEOF

# Contact / Support
cat > content/video-scripts/contact-support.md << 'FILEEOF'
# Contact & Support Video (20–30 seconds)
**Title:** Need Help? We're Here.

Have questions about programs, funding, or eligibility?  

Use the **Contact form, call, or email us**, and someone from the Elevate team or our partners will follow up.  

We know applications and forms can feel overwhelming. You don't have to figure it out alone.  

Reach out, and we'll walk you through the process step by step.
FILEEOF

############################################
# 2. README FOR VIDEO SCRIPTS
############################################
cat > content/video-scripts/README.md << 'FILEEOF'
# Elevate Connects Directory – Video Scripts

This folder contains **ready-to-use video scripts** for AI avatars, voiceovers, or live recording.

Each `.md` file corresponds to a section/page on https://elevateconnectsdirectory.org, for use as placeholders or final content.

You can:
- Paste these into tools like HeyGen / Synthesia / Pictory
- Use them for voiceover when recording real footage
- Update wording as programs and branding evolve
FILEEOF

############################################
# 3. React VideoPlaceholder component
############################################

echo "-> Writing components/VideoPlaceholder.tsx"

cat > components/VideoPlaceholder.tsx << 'FILEEOF'
'use client';

import { Play } from 'lucide-react';
import React from 'react';

type VideoPlaceholderProps = {
  title: string;
  description?: string;
  durationLabel?: string; // e.g., "30–45 sec"
  page?: string; // optional: for analytics/tagging
};

export function VideoPlaceholder({
  title,
  description,
  durationLabel = 'Video coming soon',
}: VideoPlaceholderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
          <Play className="h-6 w-6 text-slate-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          )}
          <p className="mt-2 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 border border-slate-200">
            {durationLabel}
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-100/40 via-transparent to-slate-200/60" />
    </div>
  );
}

export default VideoPlaceholder;
FILEEOF

echo "=== Done. Video scripts + VideoPlaceholder component created. ==="
echo "Files created in: content/video-scripts and components/VideoPlaceholder.tsx"
