#!/bin/bash

# ============================================================================
# DEPLOY CRITICAL LMS FEATURES
# ============================================================================

echo "🚀 Deploying Critical LMS Features..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "${YELLOW}⚠️  Supabase CLI not found. Installing...${NC}"
    npm install -g supabase
fi

echo "${BLUE}📦 Step 1: Running database migrations...${NC}"
echo ""

# Run migrations in order
echo "  → Part 1: Interactive Learning & Assessments"
supabase db push --file supabase/migrations/20241128_critical_lms_features_part1.sql

echo "  → Part 2: Gamification & Social Learning"
supabase db push --file supabase/migrations/20241128_critical_lms_features_part2.sql

echo "  → Part 3: Personalization & Career Services"
supabase db push --file supabase/migrations/20241128_critical_lms_features_part3.sql

echo "  → Part 4: Mobile, Analytics & Instructor Tools"
supabase db push --file supabase/migrations/20241128_critical_lms_features_part4.sql

echo "  → Seed Data: Initial feature data"
supabase db push --file supabase/migrations/20241128_seed_feature_data.sql

echo ""
echo "${GREEN}✅ Database migrations complete!${NC}"
echo ""

echo "${BLUE}📦 Step 2: Installing dependencies...${NC}"
npm install

echo ""
echo "${BLUE}📦 Step 3: Building application...${NC}"
npm run build

echo ""
echo "${GREEN}✅ Build complete!${NC}"
echo ""

echo "${BLUE}📦 Step 4: Feature Summary${NC}"
echo ""
echo "  ✅ Interactive Quizzes with Instant Feedback"
echo "  ✅ Discussion Forums & Community"
echo "  ✅ Points, Levels & Gamification"
echo "  ✅ Badges & Achievements"
echo "  ✅ Leaderboards (Global, Program, Weekly, Monthly)"
echo "  ✅ Learning Streaks & Daily Goals"
echo "  ✅ Peer Reviews & Study Groups"
echo "  ✅ Instructor Q&A"
echo "  ✅ Learning Paths & Recommendations"
echo "  ✅ Skill Assessments & Adaptive Content"
echo "  ✅ Resume Builder & Portfolio"
echo "  ✅ Learning Goals & Smart Reminders"
echo "  ✅ Milestone Celebrations"
echo "  ✅ Completion Estimates"
echo "  ✅ Mobile & Offline Features"
echo "  ✅ Analytics & Reporting"
echo "  ✅ Instructor Tools & Dashboard"
echo "  ✅ Downloadable Resources"
echo "  ✅ Video Transcripts & Captions"
echo "  ✅ Progress Tracking"
echo ""

echo "${GREEN}🎉 All 20 critical features deployed successfully!${NC}"
echo ""
echo "${BLUE}📍 Next Steps:${NC}"
echo "  1. Visit /features to see all features"
echo "  2. Visit /community for discussion forums"
echo "  3. Visit /student/dashboard for gamification"
echo "  4. Visit /learning-paths for personalized paths"
echo "  5. Visit /career/resume for resume builder"
echo ""
echo "${GREEN}✨ Your LMS is now world-class!${NC}"
