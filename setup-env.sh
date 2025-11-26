#!/bin/bash
set -e

echo "🚀 Setting up environment variables from Vercel..."
echo ""

# Install Vercel CLI if needed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login and link
vercel login
vercel link

# Pull environment variables
vercel env pull .env.local

echo ""
echo "✅ Done! Environment variables are now in .env.local"
echo "Run 'npm run dev' to start development"
