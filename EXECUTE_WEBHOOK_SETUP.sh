#!/bin/bash

# ============================================================================
# WEBHOOK CONFIGURATION EXECUTION SCRIPT
# ============================================================================

set -e  # Exit on error

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║              WEBHOOK ENDPOINT CONFIGURATION - EXECUTION SCRIPT               ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================================================
# STEP 1: Generate Webhook Secret
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 1: Generate Webhook Secret${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -z "$PARTNER_WEBHOOK_SECRET" ]; then
    echo -e "${YELLOW}Generating new webhook secret...${NC}"
    WEBHOOK_SECRET=$(openssl rand -base64 32)
    echo -e "${GREEN}✓ Generated webhook secret${NC}"
    echo ""
    echo -e "${YELLOW}Your webhook secret:${NC}"
    echo -e "${GREEN}$WEBHOOK_SECRET${NC}"
    echo ""
    echo -e "${YELLOW}IMPORTANT: Save this secret! You'll need it for:${NC}"
    echo "  1. Vercel environment variables"
    echo "  2. Partner portal configurations"
    echo "  3. Local .env.local file"
    echo ""
else
    WEBHOOK_SECRET=$PARTNER_WEBHOOK_SECRET
    echo -e "${GREEN}✓ Using existing PARTNER_WEBHOOK_SECRET${NC}"
    echo ""
fi

# ============================================================================
# STEP 2: Update Local Environment
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 2: Update Local Environment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    touch .env.local
fi

if grep -q "PARTNER_WEBHOOK_SECRET" .env.local; then
    echo -e "${YELLOW}Updating PARTNER_WEBHOOK_SECRET in .env.local...${NC}"
    sed -i.bak "s|PARTNER_WEBHOOK_SECRET=.*|PARTNER_WEBHOOK_SECRET=$WEBHOOK_SECRET|" .env.local
else
    echo -e "${YELLOW}Adding PARTNER_WEBHOOK_SECRET to .env.local...${NC}"
    echo "PARTNER_WEBHOOK_SECRET=$WEBHOOK_SECRET" >> .env.local
fi

echo -e "${GREEN}✓ Local environment updated${NC}"
echo ""

# ============================================================================
# STEP 3: Display Webhook Endpoints
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 3: Webhook Endpoints${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

BASE_URL="https://www.elevateforhumanity.org"

echo -e "${YELLOW}Configure these endpoints with each partner:${NC}"
echo ""
echo -e "${GREEN}HSI:${NC}        $BASE_URL/api/webhooks/partners/hsi"
echo -e "${GREEN}Certiport:${NC}  $BASE_URL/api/webhooks/partners/certiport"
echo -e "${GREEN}CareerSafe:${NC} $BASE_URL/api/webhooks/partners/careersafe"
echo -e "${GREEN}JRI:${NC}        $BASE_URL/api/webhooks/partners/jri"
echo -e "${GREEN}Milady:${NC}     $BASE_URL/api/webhooks/partners/milady"
echo ""

# ============================================================================
# STEP 4: Test Endpoints
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 4: Test Webhook Endpoints${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

read -p "Do you want to test the webhook endpoints now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}Testing webhook endpoints...${NC}"
    echo ""
    
    # Test HSI
    echo -e "${BLUE}Testing HSI endpoint...${NC}"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/partners/hsi" \
      -H "Content-Type: application/json" \
      -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
      -d '{"event":"course.completed","student_id":"test","course_id":"test"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ HSI endpoint working${NC}"
    else
        echo -e "${RED}✗ HSI endpoint failed (HTTP $HTTP_CODE)${NC}"
        echo "  Response: $BODY"
    fi
    echo ""
    
    # Test Certiport
    echo -e "${BLUE}Testing Certiport endpoint...${NC}"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/partners/certiport" \
      -H "Content-Type: application/json" \
      -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
      -d '{"event":"exam.completed","student_id":"test","exam_id":"test"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ Certiport endpoint working${NC}"
    else
        echo -e "${RED}✗ Certiport endpoint failed (HTTP $HTTP_CODE)${NC}"
    fi
    echo ""
    
    # Test CareerSafe
    echo -e "${BLUE}Testing CareerSafe endpoint...${NC}"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/partners/careersafe" \
      -H "Content-Type: application/json" \
      -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
      -d '{"event":"training.completed","student_id":"test","training_id":"test"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ CareerSafe endpoint working${NC}"
    else
        echo -e "${RED}✗ CareerSafe endpoint failed (HTTP $HTTP_CODE)${NC}"
    fi
    echo ""
    
    # Test JRI
    echo -e "${BLUE}Testing JRI endpoint...${NC}"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/partners/jri" \
      -H "Content-Type: application/json" \
      -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
      -d '{"event":"module.completed","student_id":"test","module_id":"test"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ JRI endpoint working${NC}"
    else
        echo -e "${RED}✗ JRI endpoint failed (HTTP $HTTP_CODE)${NC}"
    fi
    echo ""
    
    # Test Milady
    echo -e "${BLUE}Testing Milady endpoint...${NC}"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/webhooks/partners/milady" \
      -H "Content-Type: application/json" \
      -H "X-Webhook-Secret: $WEBHOOK_SECRET" \
      -d '{"event":"course.completed","student_id":"test","course_id":"test"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ Milady endpoint working${NC}"
    else
        echo -e "${RED}✗ Milady endpoint failed (HTTP $HTTP_CODE)${NC}"
    fi
    echo ""
fi

# ============================================================================
# STEP 5: Generate Configuration Instructions
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 5: Partner Configuration Instructions${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

cat > PARTNER_WEBHOOK_CONFIG.txt << EOF
╔══════════════════════════════════════════════════════════════════════════════╗
║                    PARTNER WEBHOOK CONFIGURATION                             ║
╚══════════════════════════════════════════════════════════════════════════════╝

🔐 WEBHOOK SECRET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$WEBHOOK_SECRET

📋 WEBHOOK ENDPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HSI:        $BASE_URL/api/webhooks/partners/hsi
Certiport:  $BASE_URL/api/webhooks/partners/certiport
CareerSafe: $BASE_URL/api/webhooks/partners/careersafe
JRI:        $BASE_URL/api/webhooks/partners/jri
Milady:     $BASE_URL/api/webhooks/partners/milady

📝 CONFIGURATION STEPS FOR EACH PARTNER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Login to partner portal
2. Navigate to Webhooks/Integrations settings
3. Add new webhook:
   - URL: (see endpoint above)
   - Secret: $WEBHOOK_SECRET
   - Events: course.completed, certificate.issued, enrollment.created
4. Save and test

✅ EVENTS TO ENABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ course.completed / training.completed / exam.completed
✓ certificate.issued
✓ enrollment.created
✓ progress.updated (optional)

🧪 TEST COMMAND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
curl -X POST $BASE_URL/api/webhooks/partners/hsi \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: $WEBHOOK_SECRET" \\
  -d '{"event":"course.completed","student_id":"test","course_id":"test"}'

📊 MONITORING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admin Dashboard: $BASE_URL/admin/dashboard
Student Progress: $BASE_URL/student/progress

⏱️  TIME ESTIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
~30 minutes per partner = ~2.5 hours total

📚 FULL DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
See: WEBHOOK_CONFIGURATION.md
EOF

echo -e "${GREEN}✓ Configuration file created: PARTNER_WEBHOOK_CONFIG.txt${NC}"
echo ""

# ============================================================================
# STEP 6: Vercel Environment Variable Instructions
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 6: Add to Vercel Environment Variables${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}Add this environment variable to Vercel:${NC}"
echo ""
echo -e "${GREEN}Name:${NC}  PARTNER_WEBHOOK_SECRET"
echo -e "${GREEN}Value:${NC} $WEBHOOK_SECRET"
echo ""
echo -e "${YELLOW}Steps:${NC}"
echo "1. Go to: https://vercel.com/your-project/settings/environment-variables"
echo "2. Click 'Add New'"
echo "3. Name: PARTNER_WEBHOOK_SECRET"
echo "4. Value: (paste the secret above)"
echo "5. Select: Production, Preview, Development"
echo "6. Click 'Save'"
echo ""

# ============================================================================
# SUMMARY
# ============================================================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SUMMARY${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}✓ Webhook secret generated${NC}"
echo -e "${GREEN}✓ Local .env.local updated${NC}"
echo -e "${GREEN}✓ Configuration file created${NC}"
echo ""

echo -e "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "1. Add PARTNER_WEBHOOK_SECRET to Vercel (see instructions above)"
echo "2. Configure each partner portal with webhook endpoints"
echo "3. Use PARTNER_WEBHOOK_CONFIG.txt for reference"
echo "4. Test each webhook after configuration"
echo "5. Monitor admin dashboard for webhook activity"
echo ""

echo -e "${GREEN}Files created:${NC}"
echo "  - .env.local (updated)"
echo "  - PARTNER_WEBHOOK_CONFIG.txt (new)"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Webhook setup script complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
