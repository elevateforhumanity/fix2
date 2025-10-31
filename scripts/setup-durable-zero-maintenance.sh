#!/bin/bash

# Zero-Maintenance Durable Setup Script
# Automatically configures all Durable pages with iframe embeds

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║        ZERO-MAINTENANCE DURABLE SETUP                          ║${NC}"
echo -e "${BLUE}║        Automatic iframe configuration                          ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Prompt for Durable URL
echo -e "${YELLOW}Enter your Durable site URL (without https://):${NC}"
echo -e "${YELLOW}Example: elevateforhumanity.durable.co${NC}"
read -p "Durable URL: " DURABLE_URL

if [ -z "$DURABLE_URL" ]; then
    echo -e "${YELLOW}No URL provided. Using placeholder: YOUR-SITE.durable.co${NC}"
    DURABLE_URL="YOUR-SITE.durable.co"
fi

echo ""
echo -e "${GREEN}Setting up zero-maintenance Durable iframes...${NC}"
echo -e "${GREEN}Durable URL: https://${DURABLE_URL}${NC}"
echo ""

# Create iframe component template
create_iframe_page() {
    local filename=$1
    local page_path=$2
    local title=$3
    
    cat > "src/pages/${filename}" << EOL
/**
 * ${title}
 * 
 * Zero-maintenance page - all content managed in Durable
 * Updates automatically, no code changes needed
 * 
 * Durable URL: https://${DURABLE_URL}${page_path}
 */
export default function ${filename%.jsx}() {
  return (
    <iframe 
      src="https://${DURABLE_URL}${page_path}"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="${title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy"
    />
  );
}
EOL
    
    echo -e "${GREEN}✅ Created ${filename}${NC}"
}

# Create all Durable pages
create_iframe_page "DurableLanding.jsx" "" "Elevate for Humanity"
create_iframe_page "DurableFeatures.jsx" "/features" "Features"
create_iframe_page "DurablePricing.jsx" "/pricing" "Pricing"
create_iframe_page "DurableTemplates.jsx" "/templates" "Templates"
create_iframe_page "DurableAI.jsx" "/ai" "AI Features"
create_iframe_page "ProgramsDurable.jsx" "/programs" "Programs"

echo ""
echo -e "${GREEN}✅ All Durable pages configured with iframes${NC}"
echo -e "${GREEN}✅ Zero maintenance setup complete${NC}"
echo ""

# Create documentation
cat > DURABLE_SETUP_COMPLETE.md << EOF
# Durable Zero-Maintenance Setup - Complete

**Setup Date:** $(date)  
**Durable URL:** https://${DURABLE_URL}

## What Was Configured

All Durable pages now use iframe embeds for zero-maintenance operation:

1. ✅ DurableLanding.jsx → https://${DURABLE_URL}
2. ✅ DurableFeatures.jsx → https://${DURABLE_URL}/features
3. ✅ DurablePricing.jsx → https://${DURABLE_URL}/pricing
4. ✅ DurableTemplates.jsx → https://${DURABLE_URL}/templates
5. ✅ DurableAI.jsx → https://${DURABLE_URL}/ai
6. ✅ ProgramsDurable.jsx → https://${DURABLE_URL}/programs

## How It Works

- **You edit content in Durable** → Changes appear instantly
- **You update styling in Durable** → Styling updates instantly
- **No code changes needed** → Ever
- **No deployments needed** → For content updates
- **No maintenance** → Fully automatic

## Your Workflow Now

1. Log into Durable
2. Edit your content
3. Save
4. Done! (Changes live immediately)

## Routes Available

Visit these URLs on your site:
- /durable-landing
- /durable-features
- /durable-pricing
- /durable-templates
- /durable-ai
- /programs-durable

## Next Steps

1. Build: \`npm run build\`
2. Test locally: \`npm run preview\`
3. Deploy: \`git push\`
4. Edit content in Durable anytime!

## Troubleshooting

**If iframe doesn't load:**
- Check Durable allows embedding
- Contact Durable support to whitelist: elevateforhumanity.org
- Verify your Durable URL is correct

**To change Durable URL:**
Run this script again with the new URL

---

**Status:** ✅ ZERO-MAINTENANCE ACTIVE  
**Maintenance Required:** None  
**Content Updates:** Edit in Durable only
EOF

echo -e "${GREEN}✅ Documentation created: DURABLE_SETUP_COMPLETE.md${NC}"
echo ""

# Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║                    SETUP COMPLETE ✅                           ║${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Your Durable URL: https://${DURABLE_URL}${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. npm run build"
echo "2. npm run preview  (test locally)"
echo "3. git add ."
echo "4. git commit -m 'Setup zero-maintenance Durable iframes'"
echo "5. git push"
echo ""
echo -e "${GREEN}After deployment:${NC}"
echo "- Edit content in Durable"
echo "- Changes appear instantly"
echo "- No code updates needed ever!"
echo ""
echo -e "${BLUE}Documentation: DURABLE_SETUP_COMPLETE.md${NC}"
echo ""
