#!/bin/bash

###############################################################################
# CLOUDFLARE WORKER DEPLOYMENT - AUTONOMOUS
#
# This script deploys the enrollment injector worker to Cloudflare.
# The worker intercepts ALL traffic at the DNS/CDN level and injects
# enrollment programs into the HTML before it reaches the user.
#
# HOW IT WORKS:
# 1. DNS points elevateforhumanity.org to Cloudflare
# 2. Cloudflare routes ALL requests through this worker
# 3. Worker fetches HTML from Durable.co
# 4. Worker injects enrollment section
# 5. Worker returns modified HTML to user
#
# RESULT: Enrollment programs appear on EVERY page load, automatically.
###############################################################################

set -e

echo "🚀 Cloudflare Worker Deployment - Enrollment Injector"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Check if logged in
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "⚠️  Not logged in to Cloudflare"
    echo ""
    echo "Please run: wrangler login"
    echo "Or set CLOUDFLARE_API_TOKEN environment variable"
    exit 1
fi

echo "✅ Authenticated with Cloudflare"
echo ""

# Deploy the worker
echo "📤 Deploying enrollment injector worker..."
wrangler deploy --config wrangler-enrollment.toml

echo ""
echo "✅ WORKER DEPLOYED!"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "🎯 WHAT HAPPENS NOW:"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "1. ALL traffic to elevateforhumanity.org goes through Cloudflare"
echo "2. Cloudflare Worker intercepts EVERY request"
echo "3. Worker fetches HTML from Durable.co"
echo "4. Worker injects enrollment programs section"
echo "5. User sees modified HTML with enrollment programs"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "🔍 VERIFICATION:"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Visit: https://www.elevateforhumanity.org"
echo ""
echo "You should see enrollment programs section with:"
echo "  - Barber Apprenticeship"
echo "  - Building Services Technician"
echo "  - Certified Nursing Assistant"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "⚙️  WORKER CONFIGURATION:"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Worker Name: enrollment-injector"
echo "Routes: elevateforhumanity.org/*"
echo "        www.elevateforhumanity.org/*"
echo ""
echo "To view worker logs:"
echo "  wrangler tail --config wrangler-enrollment.toml"
echo ""
echo "To update worker:"
echo "  ./deploy-cloudflare-worker.sh"
echo ""
echo "To disable worker:"
echo "  wrangler delete --config wrangler-enrollment.toml"
echo ""
echo "═══════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo "═══════════════════════════════════════════════════════"
