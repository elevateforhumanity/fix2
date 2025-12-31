#!/bin/bash
# Verify Sentry is configured correctly

echo "🔍 Verifying Sentry Configuration..."
echo ""

# Check if Sentry packages are installed
echo "1. Checking Sentry packages..."
if grep -q "@sentry/nextjs" package.json; then
  echo "   ✅ @sentry/nextjs installed"
else
  echo "   ❌ @sentry/nextjs NOT installed"
  exit 1
fi

# Check if config files exist
echo ""
echo "2. Checking Sentry config files..."
for file in sentry.client.config.ts sentry.server.config.ts sentry.edge.config.ts; do
  if [ -f "$file" ]; then
    echo "   ✅ $file exists"
  else
    echo "   ❌ $file missing"
    exit 1
  fi
done

# Check if next.config.mjs has Sentry integration
echo ""
echo "3. Checking next.config.mjs integration..."
if grep -q "withSentryConfig" next.config.mjs; then
  echo "   ✅ Sentry integrated in next.config.mjs"
else
  echo "   ❌ Sentry NOT integrated in next.config.mjs"
  exit 1
fi

# Check environment variables (in templates)
echo ""
echo "4. Checking environment variable templates..."
if grep -q "NEXT_PUBLIC_SENTRY_DSN" .env.production.example; then
  echo "   ✅ SENTRY_DSN in .env.production.example"
else
  echo "   ⚠️  SENTRY_DSN not in .env.production.example"
fi

echo ""
echo "✅ Sentry Configuration Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Ensure NEXT_PUBLIC_SENTRY_DSN is set in Vercel"
echo "   2. Ensure SENTRY_AUTH_TOKEN is set in Vercel (optional)"
echo "   3. Deploy and test error tracking"
echo ""
echo "🧪 To test Sentry after deployment:"
echo "   - Visit your site"
echo "   - Trigger a test error"
echo "   - Check Sentry dashboard for the error"
echo ""
