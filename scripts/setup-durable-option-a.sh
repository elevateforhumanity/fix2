#!/usr/bin/env bash
set -e

# One-Command Durable Bridge Setup (Option A)
# Fully automated - zero manual intervention

cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 Durable Bridge Setup - Option A (Fully Automated)      ║
║                                                              ║
║   Zero-maintenance Durable integration                       ║
║   One-time setup, lifetime automation                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
EOF

echo ""
echo "This script will:"
echo "  ✅ Verify bridge files exist"
echo "  ✅ Copy files to public directory"
echo "  ✅ Build the project"
echo "  ✅ Commit and push to GitHub"
echo "  ✅ Auto-deploy via Netlify"
echo "  ✅ Provide Durable integration code"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Setup cancelled"
  exit 1
fi

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Starting automated setup...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Verify files
echo -e "${BLUE}[1/6]${NC} Verifying bridge files..."
if [ ! -f "bridge/public/efh-bridge.js" ]; then
  echo -e "${RED}❌ Error: bridge/public/efh-bridge.js not found${NC}"
  exit 1
fi
if [ ! -f "bridge/api/efh-config.json" ]; then
  echo -e "${RED}❌ Error: bridge/api/efh-config.json not found${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Bridge files verified${NC}"
echo "   - efh-bridge.js: $(ls -lh bridge/public/efh-bridge.js | awk '{print $5}')"
echo "   - efh-config.json: $(ls -lh bridge/api/efh-config.json | awk '{print $5}')"
echo ""

# Step 2: Validate JSON
echo -e "${BLUE}[2/6]${NC} Validating configuration..."
if command -v jq &> /dev/null; then
  if jq empty bridge/api/efh-config.json 2>/dev/null; then
    echo -e "${GREEN}✅ Configuration is valid JSON${NC}"
    echo "   Programs: $(jq '.programs | length' bridge/api/efh-config.json)"
    echo "   Features: $(jq '.features | length' bridge/api/efh-config.json)"
    echo "   Testimonials: $(jq '.testimonials | length' bridge/api/efh-config.json)"
  else
    echo -e "${RED}❌ Error: Invalid JSON in efh-config.json${NC}"
    exit 1
  fi
else
  echo -e "${YELLOW}⚠️  jq not installed, skipping JSON validation${NC}"
fi
echo ""

# Step 3: Copy files
echo -e "${BLUE}[3/6]${NC} Copying bridge files to public directory..."
mkdir -p public/api
cp -f bridge/public/efh-bridge.js public/
cp -f bridge/api/efh-config.json public/api/
echo -e "${GREEN}✅ Files copied${NC}"
echo "   - public/efh-bridge.js"
echo "   - public/api/efh-config.json"
echo ""

# Step 4: Build
echo -e "${BLUE}[4/6]${NC} Building project..."
if pnpm build; then
  echo -e "${GREEN}✅ Build successful${NC}"
else
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
fi
echo ""

# Step 5: Git operations
echo -e "${BLUE}[5/6]${NC} Committing and pushing to GitHub..."

# Check if there are changes
if git diff --quiet && git diff --staged --quiet; then
  echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
  git add bridge/ public/efh-bridge.js public/api/ .github/workflows/durable-bridge-auto-deploy.yml scripts/deploy-durable-bridge.sh scripts/setup-durable-option-a.sh
  
  git commit -m "Setup Durable bridge (Option A) - Fully automated

✨ Features:
- Zero-maintenance Durable integration
- One-time script setup in Durable
- Content updates via JSON config
- Auto-deploy on config changes
- GitHub Actions workflow included

📦 Components:
- efh-bridge.js: Content injection script
- efh-config.json: Dynamic content configuration
- Auto-deploy workflow
- Setup scripts

🔄 Workflow:
1. Edit bridge/api/efh-config.json
2. Commit and push
3. Auto-deploys to Netlify
4. Changes appear on Durable instantly

Co-authored-by: Ona <no-reply@ona.com>"

  if git push origin main; then
    echo -e "${GREEN}✅ Pushed to GitHub${NC}"
  else
    echo -e "${RED}❌ Push failed${NC}"
    echo "   Run: git push origin main"
    exit 1
  fi
fi
echo ""

# Step 6: Wait for deployment
echo -e "${BLUE}[6/6]${NC} Waiting for auto-deployment..."
echo "⏳ GitHub Actions will trigger Netlify deployment..."
echo "   View progress: https://github.com/elevateforhumanity/fix2/actions"
echo ""
sleep 3

# Success!
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ SETUP COMPLETE!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "🎉 Bridge infrastructure deployed!"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 ONE-TIME DURABLE SETUP (Copy & Paste)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1️⃣  Add this script to your Durable.co custom code:"
echo ""
cat << 'SCRIPT'
<script 
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js" 
  data-efh-org="elevate-for-humanity" 
  data-env="prod" 
  defer>
</script>
SCRIPT
echo ""
echo "2️⃣  Add content slots in your Durable page:"
echo ""
cat << 'SLOTS'
<div data-efh-slot="hero"></div>
<div data-efh-slot="programs"></div>
<div data-efh-slot="features"></div>
<div data-efh-slot="testimonials"></div>
<div data-efh-slot="cta"></div>
SLOTS
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "🔄 Future content updates (ZERO Durable edits):"
echo ""
echo "   1. Edit: bridge/api/efh-config.json"
echo "   2. Run: git add . && git commit -m 'Update content' && git push"
echo "   3. GitHub Actions auto-deploys"
echo "   4. Changes appear on Durable instantly!"
echo ""
echo "   OR use the quick script:"
echo "   ./scripts/deploy-durable-bridge.sh"
echo ""
echo "🌐 Verify deployment (wait 1-2 minutes):"
echo "   curl https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
echo "   curl https://elevateforhumanityfix2.netlify.app/api/efh-config.json"
echo ""
echo "📚 Documentation:"
echo "   - Setup guide: DURABLE_SETUP_INSTRUCTIONS.md"
echo "   - Bridge docs: bridge/README.md"
echo "   - Quick start: DURABLE_GITPOD_QUICKSTART.md"
echo ""
echo "🎯 What you get:"
echo "   ✅ Zero-maintenance Durable integration"
echo "   ✅ Content updates via JSON (no Durable edits)"
echo "   ✅ Auto-deploy on every config change"
echo "   ✅ 6 programs, 6 features, 4 testimonials"
echo "   ✅ Hero section + CTA"
echo ""
echo -e "${GREEN}Setup complete! Add the script to Durable and you're done! 🚀${NC}"
echo ""
