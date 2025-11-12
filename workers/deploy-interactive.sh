#!/bin/bash

# Interactive Cloudflare Workers Deployment
# Guides you through the entire deployment process

set -e

echo "🚀 Cloudflare Workers Deployment"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if wrangler is installed
echo "Checking prerequisites..."
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found${NC}"
    echo "Install with: npm install -g wrangler"
    exit 1
fi
echo -e "${GREEN}✅ Wrangler CLI found${NC}"

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  Not logged in to Cloudflare${NC}"
    echo "Opening browser for login..."
    wrangler login
    echo -e "${GREEN}✅ Logged in successfully${NC}"
else
    echo -e "${GREEN}✅ Already logged in to Cloudflare${NC}"
fi

echo ""
echo "=================================="
echo "Step 1: Create KV Namespaces"
echo "=================================="
echo ""

# Create VIDEO_KV
echo "Creating VIDEO_KV namespace..."
VIDEO_KV_OUTPUT=$(wrangler kv:namespace create VIDEO_KV 2>&1)
VIDEO_KV_ID=$(echo "$VIDEO_KV_OUTPUT" | grep -oP 'id = "\K[^"]+' || echo "")
if [ -n "$VIDEO_KV_ID" ]; then
    echo -e "${GREEN}✅ VIDEO_KV created: $VIDEO_KV_ID${NC}"
else
    echo -e "${YELLOW}⚠️  VIDEO_KV may already exist${NC}"
    VIDEO_KV_ID="REPLACE_WITH_YOUR_ID"
fi

# Create TEMPLATES_KV
echo "Creating TEMPLATES_KV namespace..."
TEMPLATES_KV_OUTPUT=$(wrangler kv:namespace create TEMPLATES_KV 2>&1)
TEMPLATES_KV_ID=$(echo "$TEMPLATES_KV_OUTPUT" | grep -oP 'id = "\K[^"]+' || echo "")
if [ -n "$TEMPLATES_KV_ID" ]; then
    echo -e "${GREEN}✅ TEMPLATES_KV created: $TEMPLATES_KV_ID${NC}"
else
    echo -e "${YELLOW}⚠️  TEMPLATES_KV may already exist${NC}"
    TEMPLATES_KV_ID="REPLACE_WITH_YOUR_ID"
fi

# Create STOCK_MEDIA_KV
echo "Creating STOCK_MEDIA_KV namespace..."
STOCK_MEDIA_KV_OUTPUT=$(wrangler kv:namespace create STOCK_MEDIA_KV 2>&1)
STOCK_MEDIA_KV_ID=$(echo "$STOCK_MEDIA_KV_OUTPUT" | grep -oP 'id = "\K[^"]+' || echo "")
if [ -n "$STOCK_MEDIA_KV_ID" ]; then
    echo -e "${GREEN}✅ STOCK_MEDIA_KV created: $STOCK_MEDIA_KV_ID${NC}"
else
    echo -e "${YELLOW}⚠️  STOCK_MEDIA_KV may already exist${NC}"
    STOCK_MEDIA_KV_ID="REPLACE_WITH_YOUR_ID"
fi

echo ""
echo "=================================="
echo "Step 2: Create R2 Buckets"
echo "=================================="
echo ""

# Create video-temp bucket
echo "Creating video-temp bucket..."
if wrangler r2 bucket create video-temp 2>&1 | grep -q "Created"; then
    echo -e "${GREEN}✅ video-temp bucket created${NC}"
else
    echo -e "${YELLOW}⚠️  video-temp bucket may already exist${NC}"
fi

# Create video-media bucket
echo "Creating video-media bucket..."
if wrangler r2 bucket create video-media 2>&1 | grep -q "Created"; then
    echo -e "${GREEN}✅ video-media bucket created${NC}"
else
    echo -e "${YELLOW}⚠️  video-media bucket may already exist${NC}"
fi

echo ""
echo "=================================="
echo "Step 3: Create Queues"
echo "=================================="
echo ""

# Create queues
echo "Creating video-generation-queue..."
wrangler queues create video-generation-queue 2>&1 | grep -q "Created" && echo -e "${GREEN}✅ Created${NC}" || echo -e "${YELLOW}⚠️  May already exist${NC}"

echo "Creating video-generation-dlq..."
wrangler queues create video-generation-dlq 2>&1 | grep -q "Created" && echo -e "${GREEN}✅ Created${NC}" || echo -e "${YELLOW}⚠️  May already exist${NC}"

echo "Creating media-download-queue..."
wrangler queues create media-download-queue 2>&1 | grep -q "Created" && echo -e "${GREEN}✅ Created${NC}" || echo -e "${YELLOW}⚠️  May already exist${NC}"

echo "Creating media-download-dlq..."
wrangler queues create media-download-dlq 2>&1 | grep -q "Created" && echo -e "${GREEN}✅ Created${NC}" || echo -e "${YELLOW}⚠️  May already exist${NC}"

echo ""
echo "=================================="
echo "Step 4: Update Configuration"
echo "=================================="
echo ""

echo -e "${YELLOW}📝 KV Namespace IDs:${NC}"
echo "  VIDEO_KV: $VIDEO_KV_ID"
echo "  TEMPLATES_KV: $TEMPLATES_KV_ID"
echo "  STOCK_MEDIA_KV: $STOCK_MEDIA_KV_ID"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Update these IDs in your wrangler config files:${NC}"
echo "  - workers/wrangler-video.toml"
echo "  - workers/wrangler-template-sync.toml"
echo "  - workers/wrangler-media-download.toml"
echo ""
read -p "Press Enter when you've updated the config files..."

echo ""
echo "=================================="
echo "Step 5: Set Secrets"
echo "=================================="
echo ""

echo -e "${BLUE}Setting secrets for Video Generation Worker...${NC}"
echo "You'll need:"
echo "  1. OpenAI API Key (from: https://platform.openai.com/api-keys)"
echo "  2. Cloudflare Account ID (from: https://dash.cloudflare.com)"
echo "  3. Cloudflare Stream API Token (from: https://dash.cloudflare.com/profile/api-tokens)"
echo ""
read -p "Press Enter to continue..."

wrangler secret put OPENAI_API_KEY --config wrangler-video.toml
wrangler secret put CLOUDFLARE_ACCOUNT_ID --config wrangler-video.toml
wrangler secret put CLOUDFLARE_STREAM_API_TOKEN --config wrangler-video.toml

echo ""
echo -e "${BLUE}Setting secrets for Template Sync Worker...${NC}"
echo "You'll need:"
echo "  1. GitHub Token (from: https://github.com/settings/tokens)"
echo ""
read -p "Press Enter to continue..."

wrangler secret put GITHUB_TOKEN --config wrangler-template-sync.toml

echo ""
echo "=================================="
echo "Step 6: Deploy Workers"
echo "=================================="
echo ""

echo "Deploying Template Sync Worker..."
wrangler deploy --config wrangler-template-sync.toml
echo -e "${GREEN}✅ Template Sync Worker deployed${NC}"
echo ""

echo "Deploying Media Download Worker..."
wrangler deploy --config wrangler-media-download.toml
echo -e "${GREEN}✅ Media Download Worker deployed${NC}"
echo ""

echo "Deploying Video Generation Worker..."
wrangler deploy --config wrangler-video.toml
echo -e "${GREEN}✅ Video Generation Worker deployed${NC}"
echo ""

echo "=================================="
echo "🎉 Deployment Complete!"
echo "=================================="
echo ""
echo "Your workers are now live!"
echo ""
echo "Test them:"
echo "  curl https://template-sync-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo "  curl https://media-download-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo "  curl https://video-generation-worker.YOUR_SUBDOMAIN.workers.dev/health"
echo ""
echo "View logs:"
echo "  wrangler tail --config wrangler-template-sync.toml"
echo "  wrangler tail --config wrangler-media-download.toml"
echo "  wrangler tail --config wrangler-video.toml"
echo ""
echo "Next steps:"
echo "  1. Sync templates: curl -X POST https://template-sync-worker.YOUR_SUBDOMAIN.workers.dev/sync"
echo "  2. Download media: curl -X POST https://media-download-worker.YOUR_SUBDOMAIN.workers.dev/download-all"
echo "  3. Setup GitHub webhook (see DEPLOY_NOW.md)"
echo ""
