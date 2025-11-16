#!/usr/bin/env bash
set -euo pipefail

echo "🤖 AUTOPILOT: Video Setup & Component Injection"
echo "================================================"
echo ""

# Check if VideoPlaceholder exists
if [ ! -f "components/VideoPlaceholder.tsx" ]; then
  echo "❌ VideoPlaceholder.tsx not found. Run setup-video-placeholders.sh first!"
  exit 1
fi

echo "✅ VideoPlaceholder component found"
echo ""

# Function to inject VideoPlaceholder into a page
inject_video_placeholder() {
  local file=$1
  local title=$2
  local description=$3
  local duration=$4
  
  if [ ! -f "$file" ]; then
    echo "⚠️  File not found: $file (skipping)"
    return
  fi
  
  # Check if already has VideoPlaceholder
  if grep -q "VideoPlaceholder" "$file"; then
    echo "✓ Already has VideoPlaceholder: $file"
    return
  fi
  
  echo "📝 Injecting into: $file"
  
  # Add import at top if not present
  if ! grep -q "import VideoPlaceholder" "$file"; then
    # Find the first import line and add after it
    sed -i "1a import VideoPlaceholder from '@/components/VideoPlaceholder';" "$file"
  fi
  
  # Create the VideoPlaceholder JSX
  local placeholder="
      <section className=\"my-8\">
        <VideoPlaceholder
          title=\"$title\"
          description=\"$description\"
          durationLabel=\"$duration\"
        />
      </section>"
  
  # Try to inject after the first <main or <div className="container"
  if grep -q "<main" "$file"; then
    # Insert after opening main tag
    sed -i "/<main/a\\$placeholder" "$file"
  elif grep -q "return (" "$file"; then
    # Insert after return statement
    sed -i "/return (/a\\$placeholder" "$file"
  fi
  
  echo "✅ Injected VideoPlaceholder"
}

echo "🎬 Injecting VideoPlaceholder components into pages..."
echo ""

# Homepage
inject_video_placeholder \
  "app/page.tsx" \
  "Welcome to Elevate Connects Directory" \
  "Your one-stop hub for career training, apprenticeships, and workforce programs that lead to jobs." \
  "30–45 sec · Video coming soon"

# LMS Landing
inject_video_placeholder \
  "app/lms/page.tsx" \
  "How Elevate Works for Students" \
  "Learn how to create your account, explore programs, and track your progress in the student portal." \
  "45–60 sec · Video coming soon"

# LMS Dashboard
inject_video_placeholder \
  "app/lms/dashboard/page.tsx" \
  "Welcome to Your Student Dashboard" \
  "Quick walkthrough of your courses, assignments, grades, and certificates." \
  "30 sec · Video coming soon"

# Partners/Employers
if [ -f "app/partners/page.tsx" ]; then
  inject_video_placeholder \
    "app/partners/page.tsx" \
    "For Employers & Training Partners" \
    "Learn how Elevate helps you fill seats, fill jobs, and stay compliant with workforce requirements." \
    "45 sec · Video coming soon"
fi

# Admin/Program Holder
inject_video_placeholder \
  "app/admin/page.tsx" \
  "Program Holder Dashboard Overview" \
  "Manage program listings, cohorts, attendance, and compliance-ready reporting in one place." \
  "30–45 sec · Video coming soon"

# Delegate Portal
inject_video_placeholder \
  "app/delegate/page.tsx" \
  "For Instructors & Delegates" \
  "View students, mark attendance, upload grades, and leave notes for case managers." \
  "30–45 sec · Video coming soon"

# Programs Overview
inject_video_placeholder \
  "app/programs/page.tsx" \
  "Explore Elevate Programs" \
  "Overview of HVAC, barber, healthcare, CDL, and building tech pathways with funding options." \
  "30–45 sec · Video coming soon"

# HVAC Program
inject_video_placeholder \
  "app/programs/hvac/page.tsx" \
  "HVAC Career Pathway" \
  "Learn about hands-on HVAC training, certifications, and grant funding opportunities." \
  "30–45 sec · Video coming soon"

# Barber Program
inject_video_placeholder \
  "app/programs/barber/page.tsx" \
  "Licensed Barber Through Apprenticeship" \
  "Earn and learn in a real barbershop while working toward your barber license." \
  "30–45 sec · Video coming soon"

# Healthcare/CNA
if [ -f "app/programs/healthcare/page.tsx" ]; then
  inject_video_placeholder \
    "app/programs/healthcare/page.tsx" \
    "Healthcare & CNA Opportunities" \
    "Train for CNA and entry-level healthcare roles that are always in demand." \
    "30–45 sec · Video coming soon"
fi

# CNA (alternative path)
inject_video_placeholder \
  "app/programs/cna/page.tsx" \
  "Healthcare & CNA Opportunities" \
  "Train for CNA and entry-level healthcare roles that are always in demand." \
  "30–45 sec · Video coming soon"

# Building Tech
if [ -f "app/programs/building-tech/page.tsx" ]; then
  inject_video_placeholder \
    "app/programs/building-tech/page.tsx" \
    "Building Tech & Skilled Trades" \
    "Learn maintenance, electrical, plumbing, and facilities skills for in-demand jobs." \
    "30–45 sec · Video coming soon"
fi

# CDL/Truck Driving
inject_video_placeholder \
  "app/programs/truck-driving/page.tsx" \
  "CDL & Transportation Careers" \
  "Commercial driver training with strong earning potential and grant eligibility." \
  "30–45 sec · Video coming soon"

# Apply Page
inject_video_placeholder \
  "app/apply/page.tsx" \
  "You're Ready—Here's Your Next Step" \
  "Complete the online application and let Elevate match you with the right program and funding." \
  "30 sec · Video coming soon"

# Contact Page
inject_video_placeholder \
  "app/contact/page.tsx" \
  "Need Help? We're Here" \
  "Have questions? Our team is ready to help you with programs, funding, and eligibility." \
  "20–30 sec · Video coming soon"

echo ""
echo "================================================"
echo "✅ AUTOPILOT COMPLETE"
echo "================================================"
echo ""
echo "📊 Summary:"
echo "  - VideoPlaceholder components injected"
echo "  - Import statements added"
echo "  - Ready to commit and deploy"
echo ""
echo "🎬 Next Steps:"
echo "  1. Review the changes: git diff"
echo "  2. Test locally: npm run dev"
echo "  3. Commit: git add -A && git commit -m 'Add video placeholders'"
echo "  4. Deploy: git push origin main"
echo ""
echo "💡 To generate actual videos:"
echo "  - See: AI_VIDEO_GENERATION_GUIDE.md"
echo "  - Use: HeyGen, Synthesia, Pictory, or D-ID"
echo "  - Scripts ready in: content/video-scripts/"
echo ""
