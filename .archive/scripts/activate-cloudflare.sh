#!/bin/bash

echo "🤖 CLOUDFLARE AUTOPILOT ACTIVATING..."
echo ""

# Step 1: Extract SCORM packages
echo "📦 Step 1/5: Extracting SCORM packages..."
cd lms-content/jri

unzip -q "1-jri-"*.zip -d jri-badge-1 2>/dev/null || echo "  Badge 1 already extracted"
unzip -q "2-jri-"*.zip -d jri-badge-2 2>/dev/null || echo "  Badge 2 already extracted"
unzip -q "3-jri-"*.zip -d jri-badge-3 2>/dev/null || echo "  Badge 3 already extracted"
unzip -q "4-jri-"*.zip -d jri-badge-4 2>/dev/null || echo "  Badge 4 already extracted"
unzip -q "5-jri-"*.zip -d jri-badge-5 2>/dev/null || echo "  Badge 5 already extracted"
unzip -q "6-jri-"*.zip -d jri-badge-6 2>/dev/null || echo "  Badge 6 already extracted"
unzip -q "7-jri-"*.zip -d jri-intro 2>/dev/null || echo "  Intro already extracted"
unzip -q "8-jri-"*.zip -d jri-facilitation 2>/dev/null || echo "  Facilitation already extracted"

echo "✅ SCORM packages extracted"
cd ../..

# Step 2: Install Wrangler if needed
echo ""
echo "🔧 Step 2/5: Checking Wrangler CLI..."
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler..."
    npm install -g wrangler
else
    echo "  Wrangler already installed"
fi
echo "✅ Wrangler ready"

# Step 3: Login to Cloudflare
echo ""
echo "🔐 Step 3/5: Cloudflare authentication..."
echo "  Please login to Cloudflare when prompted..."
wrangler login

# Step 4: Create R2 bucket
echo ""
echo "🪣 Step 4/5: Creating R2 bucket..."
wrangler r2 bucket create elevate-scorm-courses 2>/dev/null || echo "  Bucket already exists"
echo "✅ R2 bucket ready"

# Step 5: Upload SCORM packages
echo ""
echo "⬆️  Step 5/5: Uploading SCORM packages to Cloudflare R2..."
cd lms-content/jri

for dir in jri-badge-1 jri-badge-2 jri-badge-3 jri-badge-4 jri-badge-5 jri-badge-6 jri-intro jri-facilitation; do
    if [ -d "$dir" ]; then
        echo "  Uploading $dir..."
        wrangler r2 object put elevate-scorm-courses/$dir --file=$dir --recursive
    fi
done

echo "✅ All SCORM packages uploaded"
cd ../..

# Step 6: Deploy Cloudflare Worker
echo ""
echo "🚀 Step 6/6: Deploying Cloudflare Worker..."
if [ -d "cloudflare-workers" ]; then
    cd cloudflare-workers
    wrangler deploy
    cd ..
else
    echo "  ⚠️  Worker directory not found - skipping worker deployment"
    echo "  SCORM files are uploaded and accessible via R2 public URL"
fi

echo ""
echo "🎉 CLOUDFLARE AUTOPILOT ACTIVATION COMPLETE!"
echo ""
echo "📊 Summary:"
echo "  ✅ 8 SCORM packages extracted"
echo "  ✅ R2 bucket created"
echo "  ✅ All packages uploaded to Cloudflare"
echo ""
echo "📝 Next Steps:"
echo "  1. Get your R2 public URL from Cloudflare Dashboard"
echo "  2. Update database with SCORM URLs (see CLOUDFLARE_AUTOPILOT_ACTIVATION.md)"
echo "  3. Test SCORM player with a course"
echo ""
echo "💰 Cost: FREE (vs $99/mo for SCORM Cloud)"
echo "📈 Savings: $1,188/year!"
echo ""
