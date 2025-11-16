#!/usr/bin/env bash
set -euo pipefail

echo "=== Setting up course cover prompts + AI instructor scripts for Elevate Connects Directory ==="

mkdir -p content/image-prompts/courses
mkdir -p content/video-scripts/courses

########################################
# 1) COURSE COVER IMAGE PROMPTS
########################################

# HVAC
cat > content/image-prompts/courses/hvac-course-cover.md << 'FILEEOF'
# HVAC Technician – Course Cover (1:1)

Create a square (1:1) course cover image for "HVAC Technician Training".
Scene: young adult wearing a technician uniform, kneeling next to a rooftop HVAC unit with tools and gauges visible.
Background: training workshop with faint silhouettes of equipment.
Color palette: cool steel blues, light grays, accent orange tool handles.
Style: realistic but clean, modern photo-style, no logos or text.
Mood: confident, upward mobility, hands-on skilled trade.
FILEEOF

# Barber Apprenticeship
cat > content/image-prompts/courses/barber-course-cover.md << 'FILEEOF'
# Barber Apprenticeship – Course Cover (1:1)

Create a square (1:1) course cover image for "Barber Apprenticeship".
Scene: a diverse young person (man or woman) using clippers on a client in a modern barbershop; mentor barber visible in background.
Background: barbershop chairs, mirrors, warm lighting.
Color palette: warm neutrals (beige, tan), deep auburn accent, clean chrome details.
Style: photo-realistic, professional yet friendly, no text.
Mood: craft, community, mentorship, new career start.
FILEEOF

# CNA / Healthcare
cat > content/image-prompts/courses/cna-course-cover.md << 'FILEEOF'
# CNA & Healthcare Careers – Course Cover (1:1)

Create a square (1:1) course cover image for "CNA & Healthcare Careers".
Scene: a trainee in scrubs helping a simulated patient (mannequin or elder) in a clinical lab or training room; instructor observing.
Background: medical equipment, soft daylight through a window.
Color palette: soft teal, white, light gray, gentle skin tones.
Style: realistic, bright and clean, no branding.
Mood: compassionate care, professional training pathway.
FILEEOF

# CDL
cat > content/image-prompts/courses/cdl-course-cover.md << 'FILEEOF'
# CDL & Transportation Training – Course Cover (1:1)

Create a square (1:1) course cover image for "CDL & Transportation Training".
Scene: a student driver standing by a large semi-truck in a training lot; instructor pointing at the truck with a tablet.
Background: open yard, training cones, daytime sky.
Color palette: strong blue, metallic gray, road black.
Style: photo-realistic, crisp, no company logos on the truck.
Mood: high-earning path, opportunity, logistics.
FILEEOF

# Building Tech / Skilled Trades
cat > content/image-prompts/courses/building-tech-course-cover.md << 'FILEEOF'
# Building Technician & Skilled Trades – Course Cover (1:1)

Create a square (1:1) course cover image for "Building Technician & Skilled Trades".
Scene: a person in work shirt with safety glasses and wrench, standing in a mechanical or maintenance room; HVAC ductwork and control panels behind them.
Background: neutral industrial interior, soft lighting.
Color palette: orange accent, steel gray, navy blue.
Style: modern photo-realistic, no logos or text.
Mood: skilled, technical, stable career path.
FILEEOF

########################################
# 2) AI VIDEO / VOICE SCRIPTS
########################################

# Master homepage AI instructor – About Elevate for Humanity
cat > content/video-scripts/courses/about-elevate-for-humanity.md << 'FILEEOF'
# Meet Elevate for Humanity – AI Instructor Script (~90 seconds)

Hello and welcome to Elevate for Humanity.
I'm your virtual guide, and I'm excited to walk you through the training programs that help individuals launch meaningful careers — with support from federal and state funding.

At Elevate, we partner with grant-funding streams like WIOA, state workforce boards, and community training providers to remove tuition barriers and connect you to real job opportunities.

Our portfolio includes hands-on programs in HVAC maintenance, barber apprenticeship, entry-level healthcare including CNA training, CDL truck driving, and building technician or skilled trades roles. Each program is designed to provide you with the skills employers need, plus the support you need to succeed.

When you enroll, you'll gain:
• Industry-aligned curriculum and certifications
• Case management and tuition support through our funding partners
• Access to employer networks and job placement assistance

Whether you're looking to start a new career, change paths, or build skills for advancement, we're here to help.
Visit our program directory, choose your pathway, and apply online.

Elevate for Humanity: where training meets opportunity, and your future starts now.
FILEEOF

# HVAC program video
cat > content/video-scripts/courses/hvac-program-video.md << 'FILEEOF'
# HVAC Technician Career Pathway – AI Script (~45 seconds)

Welcome to our HVAC Technician training program.
I'm your AI instructor, and here's why this pathway might be your perfect next step.

You'll gain hands-on experience working with heating, ventilation, and air-conditioning systems — from installation to diagnostics and repair. This training is designed for high-demand roles with strong earning potential.

Because we're partnered with state and federal workforce funds, eligible students may receive full or partial tuition support under programs like WIOA and other state grants.

By the end of the program, you'll earn industry-recognized credentials, build a job-ready skill set, and connect with employers seeking skilled technicians.
To get started, visit the HVAC program page, review the schedule and requirements, and submit your application.
FILEEOF

# Barber Apprenticeship program video
cat > content/video-scripts/courses/barber-program-video.md << 'FILEEOF'
# Barber Apprenticeship – AI Script (~45 seconds)

Do you dream of becoming a licensed barber or owning your own shop?
Our Barber Apprenticeship program lets you earn while you learn.

You'll train in a real barbershop environment, work alongside a licensed mentor, and track the hours you need for state licensure. You'll learn hair cutting, sanitation, customer service, and business fundamentals that prepare you for long-term success.

Thanks to our workforce funding partnerships, eligible candidates can apply at little to no out-of-pocket cost and still earn income while training.

Visit the Barber Apprenticeship page to see start dates, eligibility, and how to sign up.
Your next career move starts here.
FILEEOF

# Healthcare / CNA program video
cat > content/video-scripts/courses/healthcare-cna-program-video.md << 'FILEEOF'
# Healthcare & CNA Careers – AI Script (~45 seconds)

Are you ready to help others and build a stable, fulfilling career?
Our Healthcare & CNA training pathway is a powerful place to start.

You'll train for certified nursing assistant roles — gaining clinical skills, patient-care experience, and communication techniques that healthcare employers value. We also connect you with partner clinics and long-term care facilities for real-world exposure.

With our state and federal funding support, many students qualify for reduced or zero tuition under programs like WIOA and local workforce grants.

Explore the Healthcare & CNA programs page, review your options, and begin your journey into caring careers today.
FILEEOF

# CDL / Transportation program video
cat > content/video-scripts/courses/cdl-program-video.md << 'FILEEOF'
# CDL & Transportation Careers – AI Script (~45 seconds)

Looking for a career with freedom, good pay, and growth potential?
Our CDL & Transportation Training program might be your entry point.

You'll train behind the wheel of commercial trucks, learn safety regulations, and master routing and logistics basics so you're ready for real-world driving jobs. Partner employers are actively hiring drivers.

Because we work with workforce funding mechanisms, eligible students can access tuition support and job-placement assistance through state and federal programs like WIOA.

Head over to the CDL program page, check start dates and prerequisites, and apply to get moving toward your new career.
FILEEOF

# Building Tech / Skilled Trades program video
cat > content/video-scripts/courses/building-tech-program-video.md << 'FILEEOF'
# Building Technician & Skilled Trades – AI Script (~45 seconds)

If you're hands-on, technically curious, and ready for a career that keeps you in demand, our Building Technician & Skilled Trades pathway is for you.

You'll learn maintenance, basic electrical, plumbing, controls, HVAC systems, and more — skills needed in apartments, schools, hospitals, and commercial buildings.

Our workforce-funded model means eligible students may receive full or partial tuition support via state or federal grants. We also connect you to employer networks for placement once you complete training.

Visit the Building Tech programs page to view the schedule, program outline, and how to apply.
Let's get started on your skilled trades career.
FILEEOF

echo "=== Done. Course cover prompts and AI instructor scripts created. ==="
echo "Image prompts in:   content/image-prompts/courses/"
echo "Video scripts in:   content/video-scripts/courses/"
