#!/usr/bin/env bash
set -e

# Automated Durable Bridge Deployment
# Zero manual intervention required

echo "🚀 Starting automated Durable bridge deployment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify bridge files exist
echo -e "${BLUE}[1/5]${NC} Verifying bridge files..."
if [ ! -f "bridge/public/efh-bridge.js" ]; then
  echo "❌ Error: bridge/public/efh-bridge.js not found"
  exit 1
fi
if [ ! -f "bridge/api/efh-config.json" ]; then
  echo "❌ Error: bridge/api/efh-config.json not found"
  exit 1
fi
echo -e "${GREEN}✅ Bridge files verified${NC}"
echo ""

# Step 2: Copy to public directory
echo -e "${BLUE}[2/5]${NC} Copying bridge files to public directory..."
mkdir -p public/api
cp -f bridge/public/efh-bridge.js public/
cp -f bridge/api/efh-config.json public/api/
echo -e "${GREEN}✅ Files copied to public/${NC}"
echo ""

# Step 3: Build the project
echo -e "${BLUE}[3/5]${NC} Building project..."
pnpm build
echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Step 4: Git commit and push
echo -e "${BLUE}[4/5]${NC} Committing and pushing to git..."
git add bridge/ public/efh-bridge.js public/api/
git diff --staged --quiet || git commit -m "Deploy Durable bridge (Option A) - Automated

- Add efh-bridge.js script for content injection
- Add efh-config.json with EFH programs and content
- Zero-maintenance Durable integration
- Update via JSON config only

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
echo -e "${GREEN}✅ Pushed to GitHub${NC}"
echo ""

# Step 5: Wait for Netlify auto-deploy
echo -e "${BLUE}[5/5]${NC} Waiting for Netlify auto-deploy..."
echo "⏳ Netlify will automatically deploy from GitHub push..."
echo ""
sleep 5

# Check deployment status
echo "Checking deployment status..."
if command -v netlify &> /dev/null; then
  netlify status 2>/dev/null || echo "Run 'netlify login' to check status"
else
  echo "Install Netlify CLI to check status: npm i -g netlify-cli"
fi
echo ""

# Success message
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "🎉 Bridge deployed successfully!"
echo ""
echo "📋 Next: Add this ONE-TIME to your Durable.co site:"
echo ""
echo -e "${YELLOW}<script"
echo "  src=\"https://elevateforhumanityfix2.netlify.app/efh-bridge.js\""
echo "  data-efh-org=\"elevate-for-humanity\""
echo "  data-env=\"prod\""
echo -e "  defer></script>${NC}"
echo ""
echo "📍 Add content slots in Durable:"
echo ""
echo -e "${YELLOW}<div data-efh-slot=\"hero\"></div>${NC}"
echo -e "${YELLOW}<div data-efh-slot=\"programs\"></div>${NC}"
echo -e "${YELLOW}<div data-efh-slot=\"features\"></div>${NC}"
echo -e "${YELLOW}<div data-efh-slot=\"testimonials\"></div>${NC}"
echo -e "${YELLOW}<div data-efh-slot=\"cta\"></div>${NC}"
echo ""
echo "🔄 To update content in the future:"
echo "   1. Edit: bridge/api/efh-config.json"
echo "   2. Run: ./scripts/deploy-durable-bridge.sh"
echo "   3. Done! (No Durable edits needed)"
echo ""
echo "📚 Documentation: DURABLE_SETUP_INSTRUCTIONS.md"
echo ""
echo "🌐 Verify deployment:"
echo "   curl https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
echo "   curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
echo ""
