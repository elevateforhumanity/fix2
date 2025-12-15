#!/bin/bash

# Quick script to set the service_role key

echo "🔑 Set Supabase Service Role Key"
echo "================================="
echo ""
echo "Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api"
echo ""
echo "Copy the 'service_role' key (the secret one)"
echo ""
read -p "Paste your service_role key here: " SERVICE_ROLE_KEY
echo ""

if [ -z "$SERVICE_ROLE_KEY" ]; then
    echo "❌ No key provided"
    exit 1
fi

# Validate it looks like a JWT
if [[ ! "$SERVICE_ROLE_KEY" =~ ^eyJ ]]; then
    echo "⚠️  Warning: This doesn't look like a valid JWT token"
    echo "   JWT tokens start with 'eyJ'"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update .env.local
if [ -f .env.local ]; then
    # Backup first
    cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
    
    # Replace the line
    sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY|" .env.local
    
    echo "✅ Service role key updated in .env.local"
    echo ""
    
    # Verify
    echo "🔍 Verifying..."
    if grep -q "SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY" .env.local; then
        echo "✅ Verification passed!"
        echo ""
        
        # Check all three keys
        echo "📊 Environment status:"
        if grep -q "cuxzzpsyufcewtmicszk.supabase.co" .env.local; then
            echo "  ✅ NEXT_PUBLIC_SUPABASE_URL: Set"
        else
            echo "  ❌ NEXT_PUBLIC_SUPABASE_URL: Missing"
        fi
        
        if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ" .env.local && ! grep -q "your-anon-key" .env.local; then
            echo "  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set"
        else
            echo "  ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: Missing"
        fi
        
        if grep -q "SUPABASE_SERVICE_ROLE_KEY=eyJ" .env.local && ! grep -q "GET_THIS_FROM" .env.local; then
            echo "  ✅ SUPABASE_SERVICE_ROLE_KEY: Set"
        else
            echo "  ❌ SUPABASE_SERVICE_ROLE_KEY: Missing"
        fi
        
        echo ""
        echo "🎉 All set! Your environment is ready!"
        echo ""
        echo "Next steps:"
        echo "  1. pnpm install"
        echo "  2. pnpm run dev"
        echo ""
    else
        echo "⚠️  Warning: Verification failed"
        echo "   Check .env.local manually"
    fi
else
    echo "❌ .env.local not found"
    echo "   Run: npm run env:setup"
    exit 1
fi
