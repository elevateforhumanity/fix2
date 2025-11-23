#!/bin/bash

# Pull Environment Variables from Vercel
# This script automatically pulls production environment variables from Vercel

set -e

echo "🔄 Pull Environment Variables from Vercel"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo ""
    echo "📦 Install it with:"
    echo "   npm install -g vercel"
    echo ""
    echo "Or use the manual setup script:"
    echo "   ./setup-local-env.sh"
    echo ""
    exit 1
fi

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel!"
    echo ""
    echo "🔑 Please login first:"
    echo "   vercel login"
    echo ""
    exit 1
fi

VERCEL_USER=$(vercel whoami)
echo "✅ Logged in as: $VERCEL_USER"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Pull cancelled."
        exit 1
    fi
    echo "📝 Backing up existing .env.local to .env.local.backup"
    cp .env.local .env.local.backup
fi

echo "📥 Pulling environment variables from Vercel..."
echo ""

# Pull environment variables
if vercel env pull .env.local; then
    echo ""
    echo "✅ Environment variables pulled successfully!"
    echo ""
    echo "📄 Created: .env.local"
    echo ""
    echo "🔍 Variables pulled:"
    grep -E "^[A-Z_]+" .env.local | cut -d= -f1 | while read var; do
        echo "   ✅ $var"
    done
    echo ""
    echo "🔒 Security Notes:"
    echo "   - .env.local is in .gitignore (won't be committed)"
    echo "   - These are production values - use with caution"
    echo "   - Consider using test keys for local development"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Review your .env.local file"
    echo "   2. Run: npm run dev"
    echo "   3. Test login at http://localhost:3000/login"
    echo ""
else
    echo ""
    echo "❌ Failed to pull environment variables!"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   1. Make sure you're in the correct project directory"
    echo "   2. Run: vercel link (to link this directory to your Vercel project)"
    echo "   3. Try again: ./pull-env-from-vercel.sh"
    echo ""
    echo "Or use the manual setup:"
    echo "   ./setup-local-env.sh"
    echo ""
    exit 1
fi
