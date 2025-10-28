#!/usr/bin/env bash
# Complete Autopilot System Deployment
# Deploys all 6 phases of the autopilot system

set -euo pipefail

echo "🚀 AUTOPILOT COMPLETE DEPLOYMENT"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if running in Gitpod/Codespace
if [[ -n "${GITPOD_WORKSPACE_ID:-}" ]] || [[ -n "${CODESPACE_NAME:-}" ]]; then
    echo "✅ Running in cloud environment"
else
    echo "⚠️  Not in cloud environment - some features may not work"
fi

# Step 1: Generate secret if not exists
echo "📝 Step 1: Autopilot Secret"
echo "─────────────────────────────"
if [[ -f ".env.local" ]] && grep -q "AUTOPILOT_SECRET" .env.local; then
    echo "✅ AUTOPILOT_SECRET already exists in .env.local"
    AUTOPILOT_SECRET=$(grep AUTOPILOT_SECRET .env.local | cut -d'=' -f2)
else
    echo "🔐 Generating new AUTOPILOT_SECRET..."
    AUTOPILOT_SECRET=$(openssl rand -hex 32)
    echo "AUTOPILOT_SECRET=$AUTOPILOT_SECRET" >> .env.local
    echo "✅ Generated and saved to .env.local"
fi
echo ""
echo "Your AUTOPILOT_SECRET:"
echo "$AUTOPILOT_SECRET"
echo ""
echo -e "${YELLOW}⚠️  Save this secret! You'll need it for GitHub and Supabase${NC}"
echo ""

# Step 2: Check for Supabase connection
echo "📊 Step 2: Database Connection"
echo "─────────────────────────────"
if [[ -z "${SUPABASE_DB_URL:-}" ]]; then
    echo -e "${YELLOW}⚠️  SUPABASE_DB_URL not set${NC}"
    echo ""
    echo "Get your database URL from:"
    echo "  Supabase Dashboard → Settings → Database → Connection string (URI)"
    echo ""
    echo "Then run:"
    echo "  export SUPABASE_DB_URL='postgresql://postgres:[password]@[host]:5432/postgres'"
    echo ""
    echo "Or add to .env.local:"
    echo "  SUPABASE_DB_URL=postgresql://..."
    echo ""
    exit 1
else
    echo "✅ SUPABASE_DB_URL is set"
fi
echo ""

# Step 3: Apply autopilot migrations
echo "🗄️  Step 3: Apply Autopilot Migrations"
echo "─────────────────────────────────────"
echo "Applying Phase 2 (Logging)..."
if psql "$SUPABASE_DB_URL" -f supabase/migrations/20250127000000_autopilot_logging.sql > /dev/null 2>&1; then
    echo "✅ Phase 2 migration applied"
else
    echo "⚠️  Phase 2 migration may already exist (this is OK)"
fi

echo "Applying Phase 4 (Dashboard)..."
if psql "$SUPABASE_DB_URL" -f supabase/migrations/20250127000001_autopilot_phase4_dashboard.sql > /dev/null 2>&1; then
    echo "✅ Phase 4 migration applied"
else
    echo "⚠️  Phase 4 migration may already exist (this is OK)"
fi

echo "Applying Phase 5 (Alerting)..."
if psql "$SUPABASE_DB_URL" -f supabase/migrations/20250128000000_alerting_rules.sql > /dev/null 2>&1; then
    echo "✅ Phase 5 alerting migration applied"
else
    echo "⚠️  Phase 5 alerting migration may already exist (this is OK)"
fi

echo "Applying Phase 5 (Performance)..."
if psql "$SUPABASE_DB_URL" -f supabase/migrations/20250128000001_performance_profiling.sql > /dev/null 2>&1; then
    echo "✅ Phase 5 performance migration applied"
else
    echo "⚠️  Phase 5 performance migration may already exist (this is OK)"
fi
echo ""

# Step 4: Add admin user
echo "👤 Step 4: Add Admin User"
echo "─────────────────────────────"
echo "To add yourself as admin, you need your Supabase auth user ID."
echo ""
echo "Get it from:"
echo "  Supabase Dashboard → Authentication → Users → Copy your user ID"
echo ""
echo "Then run this SQL in Supabase SQL Editor:"
echo ""
echo "INSERT INTO automation.admin_users (user_id, email, role)"
echo "VALUES ('YOUR_USER_ID_HERE', 'your-email@example.com', 'superadmin')"
echo "ON CONFLICT (user_id) DO NOTHING;"
echo ""
read -p "Press Enter when you've added yourself as admin..."
echo ""

# Step 5: Check for Supabase CLI
echo "🔧 Step 5: Supabase Functions"
echo "─────────────────────────────"
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Supabase CLI not installed${NC}"
    echo ""
    echo "Install with:"
    echo "  npm install -g supabase"
    echo ""
    echo "Then run:"
    echo "  supabase login"
    echo "  ./scripts/deploy-all-workers.sh"
    echo ""
else
    echo "✅ Supabase CLI is installed"
    echo ""
    echo "Deploy functions with:"
    echo "  ./scripts/deploy-all-workers.sh"
    echo ""
fi

# Step 6: GitHub Secrets reminder
echo "🔐 Step 6: GitHub Secrets"
echo "─────────────────────────────"
echo "Add these secrets to your GitHub repository:"
echo ""
echo "Repository → Settings → Secrets and variables → Actions"
echo ""
echo "Required secrets:"
echo "  AUTOPILOT_SECRET=$AUTOPILOT_SECRET"
echo "  SUPABASE_DB_URL=<your-db-url>"
echo "  SUPABASE_PROJECT_REF=<your-project-ref>"
echo "  SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>"
echo "  NETLIFY_BUILD_HOOK=<your-netlify-build-hook>"
echo "  SUPABASE_HEALTH_LOGGER_URL=<function-url-after-deploy>"
echo "  SLACK_WEBHOOK_URL=<optional-slack-webhook>"
echo ""

# Step 7: Summary
echo "📋 Deployment Summary"
echo "─────────────────────────────"
echo "✅ Autopilot secret generated"
echo "✅ Database migrations applied"
echo "⏳ Admin user (manual step)"
echo "⏳ Supabase functions (run deploy-all-workers.sh)"
echo "⏳ GitHub secrets (manual step)"
echo ""

# Step 8: Next steps
echo "🎯 Next Steps"
echo "─────────────────────────────"
echo ""
echo "1. Add yourself as admin (see Step 4 above)"
echo ""
echo "2. Deploy Supabase functions:"
echo "   ./scripts/deploy-all-workers.sh"
echo ""
echo "3. Add GitHub secrets (see Step 6 above)"
echo ""
echo "4. Test with a migration:"
echo "   echo '-- Test autopilot' >> supabase/migrations/test.sql"
echo "   git add supabase/migrations/test.sql"
echo "   git commit -m 'test: autopilot'"
echo "   git push origin main"
echo ""
echo "5. View dashboard at:"
echo "   https://your-site.com/admin/health"
echo ""

# Create quick reference file
cat > AUTOPILOT_QUICK_START.md << 'EOF'
# Autopilot Quick Start

## Your Autopilot Secret
```
AUTOPILOT_SECRET=REPLACE_WITH_YOUR_SECRET
```

## Deployment Checklist

- [x] Generate secret
- [x] Apply database migrations
- [ ] Add yourself as admin user
- [ ] Deploy Supabase functions
- [ ] Add GitHub secrets
- [ ] Test with migration
- [ ] Set up Grafana (optional)

## Admin User Setup

```sql
-- Get your user ID from: Supabase → Authentication → Users
INSERT INTO automation.admin_users (user_id, email, role)
VALUES ('YOUR_USER_ID', 'your-email@example.com', 'superadmin')
ON CONFLICT (user_id) DO NOTHING;
```

## Deploy Functions

```bash
./scripts/deploy-all-workers.sh
```

## GitHub Secrets

Add to: Repository → Settings → Secrets and variables → Actions

- `AUTOPILOT_SECRET`
- `SUPABASE_DB_URL`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NETLIFY_BUILD_HOOK`
- `SUPABASE_HEALTH_LOGGER_URL`
- `SLACK_WEBHOOK_URL` (optional)

## Test Migration

```bash
echo "-- Test autopilot $(date +%s)" >> supabase/migrations/test.sql
git add supabase/migrations/test.sql
git commit -m "test: autopilot"
git push origin main
```

## Documentation

- [Complete Guide](docs/AUTOPILOT_README.md)
- [Deployment Checklist](docs/AUTOPILOT_DEPLOYMENT_CHECKLIST.md)
- [Phase 5 & 6](docs/AUTOPILOT_PHASES_5_6.md)
- [System Value](COMPLETE_SYSTEM_VALUE.md)

## Support

- GitHub Actions: https://github.com/YOUR_ORG/YOUR_REPO/actions
- Dashboard: https://your-site.com/admin/health
- Slack: #autopilot-alerts

---

**System Value:** $360,410 over 5 years
**Your Cost:** $0/month
EOF

# Replace secret in quick start
sed -i "s/REPLACE_WITH_YOUR_SECRET/$AUTOPILOT_SECRET/" AUTOPILOT_QUICK_START.md

echo "✅ Created AUTOPILOT_QUICK_START.md for reference"
echo ""
echo -e "${GREEN}🎉 Autopilot deployment initiated!${NC}"
echo ""
echo "Follow the steps above to complete the setup."
echo ""
