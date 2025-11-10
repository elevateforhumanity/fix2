#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Netlify Deployment Script"
echo "============================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this from the project root."
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist/ directory not found after build."
    exit 1
fi

# Verify critical files
echo "🔍 Verifying build artifacts..."
MISSING=0

check_file() {
    if [ -f "$1" ]; then
        echo "  ✅ $1"
    else
        echo "  ❌ $1 MISSING"
        MISSING=$((MISSING + 1))
    fi
}

check_file "dist/index.html"
check_file "dist/logo.svg"
check_file "dist/images/hero-training.jpg"
check_file "dist/images/og-cover.jpg"
check_file "dist/favicon.ico"

echo ""

if [ $MISSING -gt 0 ]; then
    echo "❌ Missing $MISSING critical files. Build may be incomplete."
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found."
    echo ""
    echo "Install options:"
    echo "  1. npm install -g netlify-cli"
    echo "  2. Use Netlify dashboard: https://app.netlify.com"
    echo "  3. Use drag-and-drop: https://app.netlify.com/drop"
    echo ""
    read -p "Install Netlify CLI now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g netlify-cli
    else
        echo ""
        echo "📦 Build complete! Deploy manually:"
        echo "  1. Go to https://app.netlify.com/drop"
        echo "  2. Drag and drop the 'dist' folder"
        echo ""
        echo "Or install Netlify CLI:"
        echo "  npm install -g netlify-cli"
        echo "  netlify deploy --prod --dir=dist"
        exit 0
    fi
fi

# Check authentication
echo "🔐 Checking Netlify authentication..."
if ! netlify status &> /dev/null; then
    echo "⚠️  Not logged in to Netlify."
    echo ""
    netlify login
fi

echo ""
echo "🚀 Deploying to Netlify..."
echo ""

# Deploy
netlify deploy --prod --dir=dist

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔗 Your site is live!"
    echo "   Check: https://app.netlify.com"
    echo ""
else
    echo ""
    echo "❌ Deployment failed."
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check Netlify dashboard: https://app.netlify.com"
    echo "  2. Review build logs"
    echo "  3. Try manual deploy: https://app.netlify.com/drop"
    echo "  4. See NETLIFY_FIX_GUIDE.md for more options"
    exit 1
fi
