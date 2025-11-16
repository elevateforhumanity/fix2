#!/usr/bin/env bash
set -euo pipefail

echo "=== Generating Course Content (Image Prompts + Video Scripts) ==="

# Ensure directories exist
mkdir -p content/image-prompts
mkdir -p content/video-scripts

#######################################################
# PART 1: IMAGE PROMPTS FOR COURSE COVERS
#######################################################

echo "-> Creating image prompts..."

# 1) HVAC Technician
cat > content/image-prompts/course-hvac-cover.md << 'EOF'
Create a square (1:1) course cover image for "HVAC Technician Training".
Scene: young adult wearing a technician uniform, kneeling next to a rooftop HVAC unit with tools and gauges visible.
Background: training workshop with faint silhouettes of equipment.
Color palette: cool steel blues, light grays, accent orange tool handles.
Style: realistic but clean, modern photo-style, no logos or text.
Mood: confident, upward mobility, hands-on skilled trade.
EOF

# 2) Barber Apprenticeship
cat > content/image-prompts/course-barber-cover.md << 'EOF'
Create a square (1:1) course cover image for "Barber Apprenticeship".
Scene: a diverse young person (could be woman or man) using clippers on a client in a modern barbershop; another mentor barber in background.
Background: barbershop chairs, mirrors, warm lighting.
Color palette: warm neutrals (beige, tan), deep auburn accent, clean chrome details.
Style: photo-realistic, professional yet friendly, no text.
Mood: craft, community, mentorship, new career start.
EOF

# 3) CNA / Healthcare Entry Level
cat > content/image-prompts/course-healthcare-cover.md << 'EOF'
Create a square (1:1) course cover image for "CNA & Healthcare Careers".
Scene: a trainee in scrubs helping a simulated patient (mannequin or elder) in a clinical lab or training room; instructor observing.
Background: medical equipment, soft daylight through window.
Color palette: soft teal, white, light gray, gentle flesh-tones.
Style: realistic, bright and clean, no branding.
Mood: compassionate care, professional training pathway.
EOF

# 4) CDL Truck Driving
cat > content/image-prompts/course-cdl-cover.md << 'EOF'
Create a square (1:1) course cover image for "CDL & Transportation Training".
Scene: a student driver standing by a large semi-truck in a training lot; instructor pointing at truck with tablet.
Background: open yard, training cones, daylight.
Color palette: strong blue, metallic gray, road black.
Style: photo-realistic, crisp, no logos on truck.
Mood: high-earning path, opportunity, logistics.
EOF

# 5) Building Technician / Skilled Trades
cat > content/image-prompts/course-building-cover.md << 'EOF'
Create a square (1:1) course cover image for "Building Technician & Skilled Trades".
Scene: a person in work shirt with safety glasses and wrench, standing in a mechanical room or maintenance setting; HVAC ductwork, control panels in background.
Background: neutral industrial interior, soft lighting.
Color palette: orange accent, steel gray, navy blue.
Style: modern photo-realistic, no logos or text.
Mood: skilled, technical, stable career path.
EOF

echo "✅ Created 5 course cover image prompts"

#######################################################
# PART 2: VIDEO SCRIPTS FOR COURSES + MASTER VIDEO
#######################################################

echo "-> Creating video scripts..."

# A) Master "About Elevate for Humanity"
cat > content/video-scripts/about-elevate-master.md << 'EOF'
# Meet Elevate for Humanity

**Length:** ~90 seconds

Hello and welcome to Elevate for Humanity.

I'm your AI instructor, and I'm excited to walk you through the training programs that help individuals launch meaningful careers — with support from federal and state funding.

At Elevate, we partner with grant-funding streams like WIOA (Workforce Innovation & Opportunity Act), state workforce boards, and community training providers to remove tuition barriers and connect you to real job opportunities.

Our portfolio includes hands-on programs in HVAC maintenance, barber apprenticeship, entry-level healthcare – including CNA training, CDL truck driving, and building technician or skilled trades roles. Each program is designed to provide you with the skills employers need, plus the support you need to succeed.

When you enroll, you'll gain:
• Industry-aligned curriculum and certifications
• Case management and tuition support through our funding partners
• Access to employer networks and job placement assistance

Whether you're looking to start a new career, change paths, or build skills for advancement, we'd love to work with you. Visit our program directory, pick your pathway, and apply online.

Elevate for Humanity: Where training meets opportunity, and your future starts now.
EOF

# B) HVAC Technician Program Video
cat > content/video-scripts/course-hvac-program.md << 'EOF'
# HVAC Technician Career Pathway

**Length:** ~45 seconds

Welcome to our HVAC Technician training program.

I'm your AI instructor, and here's why this pathway might be your perfect next step.

You'll gain hands-on experience working with heating, ventilation, and air-conditioning systems — from installation to diagnostics and repair. This training is designed for high-demand roles with great earning potential.

Because we're partnered with state and federal workforce funds, eligible students may receive full or partial tuition support under programs like WIOA and state income deferral grants.

By the end of the program, you'll earn industry-recognized certifications, build a job-ready portfolio, and connect with employers seeking skilled technicians.

If you're ready to get started, check the HVAC program page, review the schedule and requirements, and apply today.
EOF

# C) Barber Apprenticeship Program Video
cat > content/video-scripts/course-barber-program.md << 'EOF'
# Become a Licensed Barber Through Apprenticeship

**Length:** ~45 seconds

Do you dream of owning your own barbershop or becoming a master stylist? Our Barber Apprenticeship program gives you exactly the skills — while you get paid and learn.

In this apprenticeship you'll train in a real barbershop environment, work alongside a licensed mentor, and track the hours you need for licensure. You'll learn hair cutting, sanitation, customer service, and business fundamentals.

Thanks to our workforce funding partnerships, eligible candidates can apply at little to no cost and still earn while learning.

Visit the Barber Apprenticeship page to see start dates, eligibility, and how to sign up. Your next career move starts here.
EOF

# D) CNA & Healthcare Careers Program Video
cat > content/video-scripts/course-healthcare-program.md << 'EOF'
# Healthcare & CNA Entry-Level Careers

**Length:** ~45 seconds

Are you ready to help others and build a stable, fulfilling career? Our Healthcare & CNA training pathway is a perfect fit.

You'll train for certified nursing assistant roles — gaining clinical skills, patient-care experience, and communication techniques that healthcare employers value. We also connect you with partner clinics and long-term care facilities for real-world exposure.

With our state and federal funding support, many students qualify for reduced or zero tuition under programs like WIOA and local workforce grants.

Explore the Healthcare programs page, review your options, and begin your journey into caring careers today.
EOF

# E) CDL & Transportation Program Video
cat > content/video-scripts/course-cdl-program.md << 'EOF'
# Launch Your CDL Truck Driving Career

**Length:** ~45 seconds

Looking for a career with freedom, good pay, and growth potential? Our CDL & Transportation Training program might be your entry point.

You'll train behind the wheel of big-rig trucks, learn safety regulations, master routing and logistics basics, and be ready for commercial driver opportunities. Partner employers are actively hiring drivers today.

Because we work with workforce funding mechanisms, eligible students can often access tuition support and job-placement assistance through state and federal programs like WIOA.

Head over to the CDL Programs page, check start dates and prerequisites, and apply to get moving toward your new career.
EOF

# F) Building Technician & Skilled Trades Program Video
cat > content/video-scripts/course-building-program.md << 'EOF'
# Building Tech & Skilled Trades Pathway

**Length:** ~45 seconds

If you're hands-on, technically curious, and ready for a career that keeps you busy and valued, our Building Technician & Skilled Trades pathway is for you.

You'll learn maintenance, basic electrical, plumbing, controls, HVAC systems, and more — skills needed in apartments, schools, hospitals, and commercial buildings.

Our workforce-funded model means eligible students may receive full or partial tuition support via state or federal grants. We also connect you to employer networks for placements once you complete training.

Visit the Building Tech Programs page to view schedule, program outline, and how to apply. Let's get started.
EOF

echo "✅ Created 6 video scripts (1 master + 5 course-specific)"

#######################################################
# SUMMARY
#######################################################

echo ""
echo "=== Content Generation Complete ==="
echo ""
echo "📁 Image Prompts (5 files):"
echo "   content/image-prompts/course-hvac-cover.md"
echo "   content/image-prompts/course-barber-cover.md"
echo "   content/image-prompts/course-healthcare-cover.md"
echo "   content/image-prompts/course-cdl-cover.md"
echo "   content/image-prompts/course-building-cover.md"
echo ""
echo "🎬 Video Scripts (6 files):"
echo "   content/video-scripts/about-elevate-master.md"
echo "   content/video-scripts/course-hvac-program.md"
echo "   content/video-scripts/course-barber-program.md"
echo "   content/video-scripts/course-healthcare-program.md"
echo "   content/video-scripts/course-cdl-program.md"
echo "   content/video-scripts/course-building-program.md"
echo ""
echo "🚀 Next Steps:"
echo "   1. Set OPENAI_API_KEY environment variable"
echo "   2. Run: node scripts/generate-images.mjs"
echo "   3. Run: node scripts/prepare-video-jobs.mjs"
echo "   4. Check public/generated-images/ for course covers"
echo "   5. Check content/video-jobs.json for video generation queue"
echo ""
