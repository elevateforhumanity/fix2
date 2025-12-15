#!/bin/bash

# Deploy Environment Setup Autopilot to Cloudflare Workers
# This worker runs independently and automatically manages environment variables

set -e

echo "🤖 Deploying Environment Setup Autopilot"
echo "========================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo "✅ Wrangler CLI found"
echo ""

# Check if logged in to Cloudflare
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare"
    echo ""
    echo "Please login to Cloudflare:"
    echo "  wrangler login"
    echo ""
    exit 1
fi

echo "✅ Authenticated with Cloudflare"
echo ""

# Deploy the worker
echo "🚀 Deploying worker..."
cd workers
wrangler deploy --config wrangler-env-setup.toml

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Worker deployed successfully!"
    echo ""
    
    # Set secrets
    echo "🔐 Setting up secrets..."
    echo ""
    echo "You need to set these secrets:"
    echo "  1. VERCEL_TOKEN"
    echo "  2. SUPABASE_ANON_KEY"
    echo "  3. SUPABASE_SERVICE_ROLE_KEY"
    echo "  4. GITHUB_TOKEN"
    echo ""
    
    read -p "Do you want to set secrets now? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "Setting VERCEL_TOKEN..."
        wrangler secret put VERCEL_TOKEN --config wrangler-env-setup.toml
        
        echo ""
        echo "Setting SUPABASE_ANON_KEY..."
        wrangler secret put SUPABASE_ANON_KEY --config wrangler-env-setup.toml
        
        echo ""
        echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
        wrangler secret put SUPABASE_SERVICE_ROLE_KEY --config wrangler-env-setup.toml
        
        echo ""
        echo "Setting GITHUB_TOKEN..."
        wrangler secret put GITHUB_TOKEN --config wrangler-env-setup.toml
        
        echo ""
        echo "✅ All secrets set!"
    else
        echo ""
        echo "⚠️  Secrets not set. Set them later with:"
        echo "  wrangler secret put SECRET_NAME --config workers/wrangler-env-setup.toml"
    fi
    
    echo ""
    echo "🎉 Deployment Complete!"
    echo ""
    echo "📊 Worker Details:"
    echo "  Name: env-setup-autopilot"
    echo "  URL: https://env-setup-autopilot.workers.dev"
    echo ""
    echo "📡 Available Endpoints:"
    echo "  GET  /status  - Check worker status"
    echo "  POST /pull    - Pull variables from Vercel"
    echo "  POST /setup   - Setup .env.local"
    echo "  POST /verify  - Verify environment"
    echo "  POST /commit  - Commit to GitHub"
    echo ""
    echo "🔄 Scheduled Tasks:"
    echo "  Runs every hour to verify environment"
    echo ""
    echo "🧪 Test the worker:"
    echo "  curl https://env-setup-autopilot.workers.dev/status"
    echo ""
    echo "🚀 Use the worker:"
    echo "  curl -X POST https://env-setup-autopilot.workers.dev/setup"
    echo ""
else
    echo ""
    echo "❌ Deployment failed"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check you're logged in: wrangler whoami"
    echo "  2. Check wrangler.toml is valid"
    echo "  3. Check TypeScript compiles: tsc workers/env-setup-autopilot.ts"
    echo ""
    exit 1
fi

cd ..
