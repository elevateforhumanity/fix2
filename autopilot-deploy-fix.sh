#!/bin/bash

# Autopilot Deployment Fix Script
# Loops until successful Netlify deployment
# Diagnoses and fixes issues systematically

set -e

LOG_FILE="autopilot-deploy-$(date +%Y%m%d-%H%M%S).log"
MAX_ATTEMPTS=10
ATTEMPT=0

echo "🚀 Autopilot Deployment Fix - Starting..." | tee -a "$LOG_FILE"
echo "📝 Log file: $LOG_FILE" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check if build succeeded
check_build_success() {
    if [ -d "dist" ] && [ -f "dist/index.html" ]; then
        log "✅ Build artifacts found"
        return 0
    else
        log "❌ Build artifacts missing"
        return 1
    fi
}

# Function to diagnose build errors
diagnose_build_errors() {
    log "🔍 Diagnosing build errors..."
    
    # Check Node version
    NODE_VERSION=$(node --version)
    log "Node version: $NODE_VERSION"
    
    # Check pnpm version
    PNPM_VERSION=$(pnpm --version)
    log "pnpm version: $PNPM_VERSION"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        log "⚠️  node_modules missing - will install"
        return 1
    fi
    
    # Check for package.json
    if [ ! -f "package.json" ]; then
        log "❌ package.json missing - CRITICAL"
        return 1
    fi
    
    # Check for vite.config.js
    if [ ! -f "vite.config.js" ]; then
        log "❌ vite.config.js missing - CRITICAL"
        return 1
    fi
    
    log "✅ Basic configuration files present"
    return 0
}

# Function to fix common issues
fix_common_issues() {
    log "🔧 Fixing common issues..."
    
    # Clean dist directory
    if [ -d "dist" ]; then
        log "Cleaning dist directory..."
        rm -rf dist
    fi
    
    # Clean Vite cache
    if [ -d "node_modules/.vite" ]; then
        log "Cleaning Vite cache..."
        rm -rf node_modules/.vite
    fi
    
    # Ensure all required directories exist
    mkdir -p dist
    mkdir -p netlify/functions
    
    log "✅ Common issues fixed"
}

# Function to install dependencies
install_dependencies() {
    log "📦 Installing dependencies..."
    
    if pnpm install --frozen-lockfile 2>&1 | tee -a "$LOG_FILE"; then
        log "✅ Dependencies installed successfully"
        return 0
    else
        log "⚠️  Frozen lockfile failed, trying without..."
        if pnpm install 2>&1 | tee -a "$LOG_FILE"; then
            log "✅ Dependencies installed successfully (without frozen lockfile)"
            return 0
        else
            log "❌ Dependency installation failed"
            return 1
        fi
    fi
}

# Function to run build
run_build() {
    log "🏗️  Running build..."
    
    # Set environment variables
    export NODE_ENV=production
    export CI=true
    export GENERATE_SOURCEMAP=false
    
    # Check if env vars are set
    if [ -z "$VITE_SUPABASE_URL" ]; then
        log "⚠️  VITE_SUPABASE_URL not set, using default from netlify.toml"
        export VITE_SUPABASE_URL="https://cuxzzpsyufcewtmicszk.supabase.co"
    fi
    
    if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
        log "⚠️  VITE_SUPABASE_ANON_KEY not set, using default from netlify.toml"
        export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA"
    fi
    
    if pnpm run build 2>&1 | tee -a "$LOG_FILE"; then
        log "✅ Build completed successfully"
        return 0
    else
        log "❌ Build failed"
        return 1
    fi
}

# Function to deploy to Netlify
deploy_to_netlify() {
    log "🚀 Deploying to Netlify..."
    
    # Check if netlify CLI is available
    if ! command -v netlify &> /dev/null; then
        log "⚠️  Netlify CLI not found, installing..."
        pnpm add -g netlify-cli
    fi
    
    # Try to deploy
    if netlify deploy --prod --dir=dist 2>&1 | tee -a "$LOG_FILE"; then
        log "✅ Deployment successful!"
        return 0
    else
        log "❌ Deployment failed"
        return 1
    fi
}

# Function to verify deployment
verify_deployment() {
    log "🔍 Verifying deployment..."
    
    # Check if dist directory has content
    if [ ! -d "dist" ]; then
        log "❌ dist directory missing"
        return 1
    fi
    
    FILE_COUNT=$(find dist -type f | wc -l)
    log "📊 Files in dist: $FILE_COUNT"
    
    if [ "$FILE_COUNT" -lt 10 ]; then
        log "⚠️  Too few files in dist directory"
        return 1
    fi
    
    # Check for index.html
    if [ ! -f "dist/index.html" ]; then
        log "❌ index.html missing from dist"
        return 1
    fi
    
    # Check index.html size
    INDEX_SIZE=$(stat -f%z "dist/index.html" 2>/dev/null || stat -c%s "dist/index.html" 2>/dev/null)
    log "📄 index.html size: $INDEX_SIZE bytes"
    
    if [ "$INDEX_SIZE" -lt 100 ]; then
        log "⚠️  index.html seems too small"
        return 1
    fi
    
    log "✅ Deployment verification passed"
    return 0
}

# Main deployment loop
main() {
    log "🎯 Starting autopilot deployment loop..."
    log "Maximum attempts: $MAX_ATTEMPTS"
    echo ""
    
    while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
        ATTEMPT=$((ATTEMPT + 1))
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log "🔄 ATTEMPT $ATTEMPT of $MAX_ATTEMPTS"
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        
        # Step 1: Diagnose
        log "Step 1: Diagnosing..."
        if ! diagnose_build_errors; then
            log "⚠️  Issues found, attempting fixes..."
        fi
        echo ""
        
        # Step 2: Fix common issues
        log "Step 2: Fixing common issues..."
        fix_common_issues
        echo ""
        
        # Step 3: Install dependencies
        log "Step 3: Installing dependencies..."
        if ! install_dependencies; then
            log "❌ Dependency installation failed, retrying in 5 seconds..."
            sleep 5
            continue
        fi
        echo ""
        
        # Step 4: Run build
        log "Step 4: Running build..."
        if ! run_build; then
            log "❌ Build failed, analyzing errors..."
            
            # Check for specific error patterns
            if grep -q "out of memory" "$LOG_FILE"; then
                log "🔧 Detected: Out of memory error"
                log "Fix: Increasing Node memory limit..."
                export NODE_OPTIONS="--max_old_space_size=8192"
            elif grep -q "ENOSPC" "$LOG_FILE"; then
                log "🔧 Detected: No space left on device"
                log "Fix: Cleaning up..."
                rm -rf node_modules/.cache
                rm -rf dist
            elif grep -q "Cannot find module" "$LOG_FILE"; then
                log "🔧 Detected: Missing module"
                log "Fix: Reinstalling dependencies..."
                rm -rf node_modules
            fi
            
            log "Retrying in 5 seconds..."
            sleep 5
            continue
        fi
        echo ""
        
        # Step 5: Verify build
        log "Step 5: Verifying build..."
        if ! check_build_success; then
            log "❌ Build verification failed, retrying..."
            sleep 5
            continue
        fi
        echo ""
        
        # Step 6: Verify deployment artifacts
        log "Step 6: Verifying deployment artifacts..."
        if ! verify_deployment; then
            log "❌ Deployment verification failed, retrying..."
            sleep 5
            continue
        fi
        echo ""
        
        # Success!
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log "🎉 SUCCESS! Build completed successfully!"
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log ""
        log "📊 Build Statistics:"
        log "   • Attempts: $ATTEMPT"
        log "   • Files generated: $(find dist -type f | wc -l)"
        log "   • Total size: $(du -sh dist | cut -f1)"
        log "   • Log file: $LOG_FILE"
        log ""
        log "✅ Build artifacts ready in ./dist directory"
        log "🚀 Ready for Netlify deployment"
        log ""
        log "To deploy manually, run:"
        log "   netlify deploy --prod --dir=dist"
        log ""
        
        # Create success marker
        echo "SUCCESS" > .autopilot-deploy-success
        echo "$ATTEMPT" >> .autopilot-deploy-success
        date >> .autopilot-deploy-success
        
        return 0
    done
    
    # Max attempts reached
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log "❌ FAILED: Maximum attempts ($MAX_ATTEMPTS) reached"
    log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log ""
    log "📋 Troubleshooting steps:"
    log "   1. Check the log file: $LOG_FILE"
    log "   2. Review error messages above"
    log "   3. Verify environment variables are set"
    log "   4. Check Netlify dashboard for deployment status"
    log "   5. Try manual deployment: netlify deploy --prod --dir=dist"
    log ""
    
    return 1
}

# Run main function
main

# Exit with appropriate code
if [ -f ".autopilot-deploy-success" ]; then
    exit 0
else
    exit 1
fi
