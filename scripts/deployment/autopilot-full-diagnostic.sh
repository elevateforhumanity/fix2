#!/bin/bash

# Autopilot Full Diagnostic and Deployment Script
# Tests all methods and provides detailed diagnostics

set +e  # Don't exit on error, we want to try all methods

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DIAGNOSTIC_LOG="autopilot-diagnostic-$(date +%Y%m%d-%H%M%S).log"

log() {
    echo -e "$1" | tee -a "$DIAGNOSTIC_LOG"
}

log "${BLUE}=========================================${NC}"
log "${BLUE}  🤖 AUTOPILOT FULL DIAGNOSTIC${NC}"
log "${BLUE}=========================================${NC}"
log ""

# Load environment
export $(grep -v '^#' .env | grep -v '^$' | xargs 2>/dev/null)
PROJECT_REF=$(echo $SUPABASE_URL | sed 's|https://||' | cut -d'.' -f1)

log "Project: $PROJECT_REF"
log "Time: $(date)"
log ""

# Track what works
DEPLOYMENT_METHOD="none"
DEPLOYMENT_SUCCESS=false

# ============================================
# DIAGNOSTIC 1: Check Prerequisites
# ============================================

log "${YELLOW}DIAGNOSTIC 1: Checking Prerequisites${NC}"
log "--------------------------------------------"

# Check required files
REQUIRED_FILES=(
    "deployment-ready/00-prerequisites-fixed.sql"
    "deployment-ready/01-all-migrations-fixed.sql"
    "deployment-ready/02-email-dispatch.ts"
    "deployment-ready/03-webhook-dispatch.ts"
    "deployment-ready/04-ai-course-create.ts"
    "deployment-ready/05-grade-ai.ts"
)

FILES_OK=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        log "  ✅ $file"
    else
        log "  ❌ $file MISSING"
        FILES_OK=false
    fi
done

if [ "$FILES_OK" = true ]; then
    log "${GREEN}✅ All deployment files present${NC}"
else
    log "${RED}❌ Some deployment files missing${NC}"
    exit 1
fi

log ""

# ============================================
# DIAGNOSTIC 2: Check API Keys
# ============================================

log "${YELLOW}DIAGNOSTIC 2: Checking API Keys${NC}"
log "--------------------------------------------"

KEYS_STATUS=()

check_key() {
    local key_name=$1
    local required=$2
    
    if [ -n "${!key_name}" ]; then
        log "  ✅ $key_name"
        KEYS_STATUS+=("$key_name:present")
        return 0
    else
        if [ "$required" = "required" ]; then
            log "  ❌ $key_name (REQUIRED)"
            KEYS_STATUS+=("$key_name:missing:required")
        else
            log "  ⚠️  $key_name (optional)"
            KEYS_STATUS+=("$key_name:missing:optional")
        fi
        return 1
    fi
}

check_key "SUPABASE_URL" "required"
check_key "SUPABASE_ANON_KEY" "required"
check_key "SUPABASE_SERVICE_KEY" "required"
check_key "SUPABASE_DB_PASSWORD" "required"
check_key "SUPABASE_ACCESS_TOKEN" "optional"
check_key "OPENAI_API_KEY" "optional"
check_key "SENDGRID_API_KEY" "optional"
check_key "RESEND_API_KEY" "optional"
check_key "ANTHROPIC_API_KEY" "optional"

log ""

# ============================================
# DIAGNOSTIC 3: Test Network Connectivity
# ============================================

log "${YELLOW}DIAGNOSTIC 3: Testing Network Connectivity${NC}"
log "--------------------------------------------"

# Test Supabase API
log "Testing Supabase REST API..."
REST_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/rest/v1/" -H "apikey: $SUPABASE_ANON_KEY" 2>&1)
if [ "$REST_CODE" = "200" ]; then
    log "  ✅ REST API accessible (HTTP $REST_CODE)"
else
    log "  ❌ REST API not accessible (HTTP $REST_CODE)"
fi

# Test Auth API
log "Testing Supabase Auth API..."
AUTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/auth/v1/health" 2>&1)
if [ "$AUTH_CODE" = "200" ]; then
    log "  ✅ Auth API accessible (HTTP $AUTH_CODE)"
else
    log "  ❌ Auth API not accessible (HTTP $AUTH_CODE)"
fi

# Test Database Connection
log "Testing Database Connection..."
DB_HOST="db.${PROJECT_REF}.supabase.co"

if command -v psql &> /dev/null; then
    PGPASSWORD="$SUPABASE_DB_PASSWORD" timeout 5 psql -h "$DB_HOST" -p 5432 -U postgres -d postgres -c "SELECT 1;" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        log "  ✅ Database connection successful"
        DB_ACCESSIBLE=true
    else
        log "  ❌ Database connection failed (network/firewall block)"
        DB_ACCESSIBLE=false
    fi
else
    log "  ⚠️  psql not available"
    DB_ACCESSIBLE=false
fi

log ""

# ============================================
# DIAGNOSTIC 4: Test Deployment Methods
# ============================================

log "${YELLOW}DIAGNOSTIC 4: Testing Deployment Methods${NC}"
log "--------------------------------------------"

# Method 1: Direct Database (psql)
log "Method 1: Direct Database Connection"
if [ "$DB_ACCESSIBLE" = true ]; then
    log "  ✅ Method available"
    log "  Attempting deployment..."
    
    # Try to deploy prerequisites
    PGPASSWORD="$SUPABASE_DB_PASSWORD" psql -h "$DB_HOST" -p 5432 -U postgres -d postgres -f deployment-ready/00-prerequisites-fixed.sql > /tmp/psql-prereq.log 2>&1
    PREREQ_EXIT=$?
    
    if [ $PREREQ_EXIT -eq 0 ]; then
        log "  ✅ Prerequisites deployed"
        
        # Try to deploy main migrations
        PGPASSWORD="$SUPABASE_DB_PASSWORD" psql -h "$DB_HOST" -p 5432 -U postgres -d postgres -f deployment-ready/01-all-migrations-fixed.sql > /tmp/psql-main.log 2>&1
        MAIN_EXIT=$?
        
        if [ $MAIN_EXIT -eq 0 ]; then
            log "  ${GREEN}✅✅✅ SQL DEPLOYED SUCCESSFULLY VIA PSQL${NC}"
            DEPLOYMENT_METHOD="psql"
            DEPLOYMENT_SUCCESS=true
        else
            log "  ❌ Main migrations failed"
            log "  Error: $(tail -5 /tmp/psql-main.log)"
        fi
    else
        log "  ❌ Prerequisites deployment failed"
        log "  Error: $(tail -5 /tmp/psql-prereq.log)"
    fi
else
    log "  ❌ Method not available (database not accessible)"
fi

log ""

# Method 2: Supabase CLI
if [ "$DEPLOYMENT_SUCCESS" = false ]; then
    log "Method 2: Supabase CLI"
    
    if [ -n "$SUPABASE_ACCESS_TOKEN" ]; then
        log "  ✅ Access token available"
        
        # Test CLI authentication
        if npx supabase projects list > /dev/null 2>&1; then
            log "  ✅ CLI authenticated"
            
            # Try to link project
            npx supabase link --project-ref "$PROJECT_REF" > /dev/null 2>&1
            
            # Copy migrations
            mkdir -p supabase/migrations
            cp deployment-ready/00-prerequisites-fixed.sql supabase/migrations/00000000000000_prerequisites.sql
            cp deployment-ready/01-all-migrations-fixed.sql supabase/migrations/00000000000001_admin_features.sql
            
            # Try to push
            if npx supabase db push > /tmp/cli-push.log 2>&1; then
                log "  ${GREEN}✅✅✅ SQL DEPLOYED SUCCESSFULLY VIA CLI${NC}"
                DEPLOYMENT_METHOD="cli"
                DEPLOYMENT_SUCCESS=true
            else
                log "  ❌ CLI push failed"
                log "  Error: $(tail -5 /tmp/cli-push.log)"
            fi
        else
            log "  ❌ CLI authentication failed"
        fi
    else
        log "  ❌ No access token available"
    fi
fi

log ""

# ============================================
# DIAGNOSTIC 5: Verify Deployment
# ============================================

if [ "$DEPLOYMENT_SUCCESS" = true ]; then
    log "${YELLOW}DIAGNOSTIC 5: Verifying Deployment${NC}"
    log "--------------------------------------------"
    
    # Test if tables exist
    log "Checking if tables were created..."
    
    TABLES_TO_CHECK=("organizations" "profiles" "email_queue" "webhooks" "campaigns")
    TABLES_FOUND=0
    
    for table in "${TABLES_TO_CHECK[@]}"; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
            "$SUPABASE_URL/rest/v1/$table?limit=1" \
            -H "apikey: $SUPABASE_ANON_KEY" 2>&1)
        
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "403" ]; then
            log "  ✅ Table exists: $table"
            TABLES_FOUND=$((TABLES_FOUND + 1))
        else
            log "  ❌ Table not found: $table (HTTP $HTTP_CODE)"
        fi
    done
    
    if [ $TABLES_FOUND -eq ${#TABLES_TO_CHECK[@]} ]; then
        log "${GREEN}✅ All test tables verified${NC}"
    else
        log "${YELLOW}⚠️  Only $TABLES_FOUND/${#TABLES_TO_CHECK[@]} tables verified${NC}"
    fi
    
    log ""
fi

# ============================================
# DIAGNOSTIC 6: Edge Functions Status
# ============================================

log "${YELLOW}DIAGNOSTIC 6: Checking Edge Functions${NC}"
log "--------------------------------------------"

FUNCTIONS=("email-dispatch" "webhook-dispatch" "ai-course-create" "grade-ai")
FUNCTIONS_DEPLOYED=0

for func in "${FUNCTIONS[@]}"; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
        "$SUPABASE_URL/functions/v1/$func" \
        -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
        -X POST -d '{}' 2>&1)
    
    if [ "$HTTP_CODE" != "404" ]; then
        log "  ✅ $func (HTTP $HTTP_CODE)"
        FUNCTIONS_DEPLOYED=$((FUNCTIONS_DEPLOYED + 1))
    else
        log "  ❌ $func not deployed"
    fi
done

log ""
log "Edge Functions: $FUNCTIONS_DEPLOYED/${#FUNCTIONS[@]} deployed"

log ""

# ============================================
# FINAL SUMMARY
# ============================================

log "${BLUE}=========================================${NC}"
log "${BLUE}  DIAGNOSTIC SUMMARY${NC}"
log "${BLUE}=========================================${NC}"
log ""

if [ "$DEPLOYMENT_SUCCESS" = true ]; then
    log "${GREEN}✅ SQL DEPLOYMENT: SUCCESS${NC}"
    log "   Method: $DEPLOYMENT_METHOD"
    log "   Tables: $TABLES_FOUND/${#TABLES_TO_CHECK[@]} verified"
else
    log "${RED}❌ SQL DEPLOYMENT: FAILED${NC}"
    log "   All automated methods failed"
    log "   Manual deployment required"
fi

log ""
log "Edge Functions: $FUNCTIONS_DEPLOYED/${#FUNCTIONS[@]} deployed"

if [ $FUNCTIONS_DEPLOYED -lt ${#FUNCTIONS[@]} ]; then
    log "${YELLOW}⚠️  Edge Functions need manual deployment${NC}"
fi

log ""
log "Diagnostic log saved to: $DIAGNOSTIC_LOG"
log ""

if [ "$DEPLOYMENT_SUCCESS" = false ]; then
    log "${YELLOW}NEXT STEPS:${NC}"
    log "1. Get Supabase access token:"
    log "   https://supabase.com/dashboard/account/tokens"
    log ""
    log "2. Add to .env:"
    log "   SUPABASE_ACCESS_TOKEN=sbp_your_token_here"
    log ""
    log "3. Re-run this script"
    log ""
    log "OR deploy manually (2 minutes):"
    log "   https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
    exit 1
else
    log "${GREEN}✅ DEPLOYMENT COMPLETE${NC}"
    log ""
    log "Next: Deploy Edge Functions"
    log "   bash scripts/deployment/deploy-edge-functions.sh"
    exit 0
fi
