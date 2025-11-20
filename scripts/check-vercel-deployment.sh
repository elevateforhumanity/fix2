#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Vercel Deployment Verification"
echo "=================================="
echo ""

# URLs to check
PROJECT_BASE="https://fix2-gpql.vercel.app"
PRODUCTION="https://www.elevateforhumanity.org"

echo "📡 Checking deployment status..."
echo ""

# Function to check a URL
check_url() {
  local url=$1
  local name=$2
  
  echo "Checking: $name"
  echo "URL: $url"
  
  # Get headers
  response=$(curl -sI "$url" 2>&1 || echo "ERROR")
  
  if [[ "$response" == *"ERROR"* ]] || [[ "$response" == *"Could not resolve"* ]]; then
    echo "  ❌ Failed to connect"
  else
    # Extract status code
    status=$(echo "$response" | grep -i "HTTP/" | head -1 | awk '{print $2}')
    
    # Extract cache control
    cache=$(echo "$response" | grep -i "cache-control:" | head -1 | cut -d: -f2- | xargs)
    
    # Extract build time if present
    build_time=$(echo "$response" | grep -i "x-build-time:" | head -1 | cut -d: -f2- | xargs)
    
    echo "  Status: $status"
    echo "  Cache-Control: ${cache:-not set}"
    
    if [ -n "$build_time" ]; then
      echo "  Build Time: $build_time"
    fi
    
    # Check for build marker in HTML
    html=$(curl -s "$url" 2>&1 || echo "")
    if [[ "$html" == *"BUILD:"* ]]; then
      marker=$(echo "$html" | grep -o "BUILD: [0-9-:]*" | head -1)
      echo "  ✅ Build Marker Found: $marker"
    else
      echo "  ⚠️  No build marker found in HTML"
    fi
  fi
  
  echo ""
}

# Check both URLs
check_url "$PROJECT_BASE" "Project Base URL"
check_url "$PRODUCTION" "Production Domain"

echo "=================================="
echo ""
echo "💡 Tips:"
echo "  • Always check the Project Base URL for latest code"
echo "  • Hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)"
echo "  • Look for the BUILD marker in the bottom-right corner"
echo "  • Old hash URLs (like ...qfpvev81v...) never update"
echo ""
