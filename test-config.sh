#!/bin/bash
# Test Configuration Script
# Tests all configured services to verify they're working

echo "🧪 Testing Configuration"
echo "========================"
echo ""

# Load environment variables
source .env.local 2>/dev/null || { echo "❌ .env.local not found"; exit 1; }

# Test 1: Supabase URL
echo "1. Testing Supabase URL..."
if curl -s -I "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/" | grep -q "HTTP"; then
    echo "   ✅ Supabase instance is accessible"
else
    echo "   ❌ Supabase instance not accessible"
fi
echo ""

# Test 2: Supabase Anon Key (check if it's complete)
echo "2. Checking Supabase Anon Key..."
if [[ ${#NEXT_PUBLIC_SUPABASE_ANON_KEY} -gt 100 ]]; then
    echo "   ✅ Anon key appears complete (${#NEXT_PUBLIC_SUPABASE_ANON_KEY} chars)"
else
    echo "   ⚠️  Anon key appears truncated (${#NEXT_PUBLIC_SUPABASE_ANON_KEY} chars)"
fi
echo ""

# Test 3: Stripe Keys
echo "3. Checking Stripe Keys..."
if [[ ${#STRIPE_SECRET_KEY} -gt 50 ]]; then
    echo "   ✅ Stripe secret key appears complete"
else
    echo "   ⚠️  Stripe secret key appears truncated"
fi
echo ""

# Test 4: Resend API Key
echo "4. Testing Resend API Key..."
if [[ -n "$RESEND_API_KEY" ]]; then
    RESEND_TEST=$(curl -s -X POST https://api.resend.com/emails \
      -H "Authorization: Bearer $RESEND_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"from":"test@test.com","to":"test@test.com","subject":"Test","html":"Test"}' \
      2>&1)
    
    if echo "$RESEND_TEST" | grep -q "error"; then
        echo "   ⚠️  Resend API key may be invalid"
        echo "   Response: $(echo $RESEND_TEST | head -c 100)"
    else
        echo "   ✅ Resend API key appears valid"
    fi
else
    echo "   ❌ Resend API key not set"
fi
echo ""

# Test 5: OpenAI Key
echo "5. Checking OpenAI Key..."
if [[ ${#OPENAI_API_KEY} -gt 40 ]]; then
    echo "   ✅ OpenAI key appears complete (${#OPENAI_API_KEY} chars)"
else
    echo "   ⚠️  OpenAI key appears truncated (${#OPENAI_API_KEY} chars)"
fi
echo ""

# Test 6: NextAuth Secret
echo "6. Checking NextAuth Secret..."
if [[ ${#NEXTAUTH_SECRET} -gt 20 ]]; then
    echo "   ✅ NextAuth secret is set"
else
    echo "   ⚠️  NextAuth secret appears short or missing"
fi
echo ""

# Test 7: Site URLs
echo "7. Checking Site URLs..."
if [[ -n "$NEXT_PUBLIC_SITE_URL" ]]; then
    echo "   ✅ Site URL: $NEXT_PUBLIC_SITE_URL"
else
    echo "   ❌ Site URL not set"
fi
echo ""

# Summary
echo "========================"
echo "Configuration Test Complete"
echo ""
echo "Next steps:"
echo "1. Get complete Supabase keys from dashboard"
echo "2. Get complete Stripe keys from dashboard"
echo "3. Get complete OpenAI key from platform"
echo "4. Restart dev server: pnpm dev"
echo ""
