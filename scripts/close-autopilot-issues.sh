#!/usr/bin/env bash
set -euo pipefail

# Close Autopilot Issues Script
# This script helps bulk-close autopilot-related issues
# Runs in dry-run mode by default - pass --execute to actually close issues

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly DRY_RUN_FILE="${SCRIPT_DIR}/../AUTOPILOT_SYSTEM/issue-closure-plan.md"

# Color codes
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ${NC} $*"
}

log_success() {
    echo -e "${GREEN}✅${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}⚠️${NC}  $*"
}

log_error() {
    echo -e "${RED}❌${NC} $*"
}

# Check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI (gh) is not installed"
        echo "Please install it from: https://cli.github.com/"
        exit 1
    fi
    
    # Check authentication
    if ! gh auth status &> /dev/null; then
        log_error "GitHub CLI is not authenticated"
        echo "Please run: gh auth login"
        exit 1
    fi
    
    log_success "GitHub CLI is installed and authenticated"
}

# Get repository information
get_repo_info() {
    local origin_url
    origin_url=$(git remote get-url origin 2>/dev/null || echo "")
    
    if [[ -z "$origin_url" ]]; then
        log_error "Could not determine repository from git remote"
        exit 1
    fi
    
    # Extract owner/repo from URL
    REPO=$(echo "$origin_url" | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | sed 's/\.git$//')
    
    if [[ -z "$REPO" ]]; then
        log_error "Could not parse repository from: $origin_url"
        exit 1
    fi
    
    log_info "Repository: $REPO"
}

# Fetch autopilot-related issues
fetch_issues() {
    log_info "Fetching autopilot-related issues..."
    
    local labels=("autopilot" "auto-heal-failed" "auto-push" "autopilot-created")
    local all_issues=()
    
    for label in "${labels[@]}"; do
        log_info "Checking label: $label"
        
        # Fetch open issues with this label
        local issues
        issues=$(gh issue list \
            --repo "$REPO" \
            --label "$label" \
            --state open \
            --limit 1000 \
            --json number,title,labels,createdAt,url 2>/dev/null || echo "[]")
        
        if [[ "$issues" != "[]" && -n "$issues" ]]; then
            all_issues+=("$issues")
        fi
    done
    
    # Combine and deduplicate issues
    if [[ ${#all_issues[@]} -eq 0 ]]; then
        log_info "No autopilot issues found"
        echo "[]"
        return
    fi
    
    # Use jq to merge and deduplicate by issue number
    echo "${all_issues[@]}" | jq -s 'add | unique_by(.number) | sort_by(.number)'
}

# Generate dry-run report
generate_report() {
    local issues=$1
    local issue_count
    issue_count=$(echo "$issues" | jq 'length')
    
    if [[ "$issue_count" -eq 0 ]]; then
        log_info "No issues to close"
        return 0
    fi
    
    log_info "Generating closure plan for $issue_count issues..."
    
    mkdir -p "$(dirname "$DRY_RUN_FILE")"
    
    cat > "$DRY_RUN_FILE" <<EOF
# Autopilot Issue Closure Plan

**Generated:** $(date -Iseconds)
**Repository:** $REPO
**Total Issues:** $issue_count

## Summary

This report lists all autopilot-related issues that can be bulk-closed.
These issues were likely created by automated systems and may be duplicates
or no longer relevant.

## Issues to Close

EOF
    
    # Group issues by title for deduplication summary
    local titles
    titles=$(echo "$issues" | jq -r '.[] | .title' | sort | uniq -c | sort -rn)
    
    echo "### Duplicate Titles" >> "$DRY_RUN_FILE"
    echo "" >> "$DRY_RUN_FILE"
    echo '```' >> "$DRY_RUN_FILE"
    echo "$titles" >> "$DRY_RUN_FILE"
    echo '```' >> "$DRY_RUN_FILE"
    echo "" >> "$DRY_RUN_FILE"
    
    echo "### Full Issue List" >> "$DRY_RUN_FILE"
    echo "" >> "$DRY_RUN_FILE"
    
    echo "$issues" | jq -r '.[] | "- #\(.number) - \(.title)\n  Created: \(.createdAt)\n  URL: \(.url)\n"' >> "$DRY_RUN_FILE"
    
    echo "" >> "$DRY_RUN_FILE"
    echo "## Execution" >> "$DRY_RUN_FILE"
    echo "" >> "$DRY_RUN_FILE"
    echo "To close these issues, run:" >> "$DRY_RUN_FILE"
    echo '```bash' >> "$DRY_RUN_FILE"
    echo "./scripts/close-autopilot-issues.sh --execute" >> "$DRY_RUN_FILE"
    echo '```' >> "$DRY_RUN_FILE"
    echo "" >> "$DRY_RUN_FILE"
    echo "Or manually close with:" >> "$DRY_RUN_FILE"
    echo '```bash' >> "$DRY_RUN_FILE"
    
    echo "$issues" | jq -r '.[] | "gh issue close \(.number) --repo '$REPO' --comment \"Closing autopilot-generated issue as part of cleanup\""' >> "$DRY_RUN_FILE"
    
    echo '```' >> "$DRY_RUN_FILE"
    
    log_success "Closure plan written to: $DRY_RUN_FILE"
    
    # Also output to console
    echo ""
    echo "============================================"
    echo "AUTOPILOT ISSUE CLOSURE PLAN"
    echo "============================================"
    echo ""
    echo "Total issues: $issue_count"
    echo ""
    echo "Top duplicate titles:"
    echo "$titles" | head -10
    echo ""
    echo "Full report: $DRY_RUN_FILE"
    echo ""
}

# Close issues (execute mode)
close_issues() {
    local issues=$1
    local issue_count
    issue_count=$(echo "$issues" | jq 'length')
    
    if [[ "$issue_count" -eq 0 ]]; then
        log_info "No issues to close"
        return 0
    fi
    
    log_warning "About to close $issue_count issues"
    echo ""
    read -p "Are you sure you want to proceed? (yes/no): " confirm
    
    if [[ "$confirm" != "yes" ]]; then
        log_info "Cancelled by user"
        exit 0
    fi
    
    log_info "Closing issues..."
    
    local closed_count=0
    local failed_count=0
    
    while IFS= read -r issue_number; do
        log_info "Closing issue #$issue_number..."
        
        if gh issue close "$issue_number" \
            --repo "$REPO" \
            --comment "Closing autopilot-generated issue as part of repository cleanup. These automated issues have been consolidated into improved monitoring systems." 2>&1; then
            ((closed_count++))
            log_success "Closed #$issue_number"
        else
            ((failed_count++))
            log_error "Failed to close #$issue_number"
        fi
        
        # Rate limiting - wait a bit between closures
        sleep 0.5
    done < <(echo "$issues" | jq -r '.[].number')
    
    log_success "Closed $closed_count issues"
    if [[ $failed_count -gt 0 ]]; then
        log_warning "Failed to close $failed_count issues"
    fi
}

# Main execution
main() {
    local execute_mode=false
    
    # Parse arguments
    for arg in "$@"; do
        case $arg in
            --execute)
                execute_mode=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [--execute]"
                echo ""
                echo "Options:"
                echo "  --execute    Actually close the issues (default: dry-run)"
                echo "  --help       Show this help message"
                exit 0
                ;;
        esac
    done
    
    echo "🔍 Autopilot Issue Closure Tool"
    echo "================================"
    echo ""
    
    if [[ "$execute_mode" == false ]]; then
        log_info "Running in DRY-RUN mode"
        log_info "Pass --execute to actually close issues"
        echo ""
    else
        log_warning "Running in EXECUTE mode - will close issues!"
        echo ""
    fi
    
    # Check prerequisites
    check_gh_cli
    get_repo_info
    
    # Fetch issues
    local issues
    issues=$(fetch_issues)
    
    # Generate report or close issues
    if [[ "$execute_mode" == false ]]; then
        generate_report "$issues"
    else
        close_issues "$issues"
    fi
    
    log_success "Done!"
}

# Run main
main "$@"
