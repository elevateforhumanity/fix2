#!/bin/bash

# Apply Program Holder Verification Migration
# This creates tables for identity verification, documents, and banking

echo "🚀 Applying Program Holder Verification Migration..."
echo ""

# Check if Supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first."
    echo "   npm install -g supabase"
    exit 1
fi

# Apply the migration
echo "📝 Running migration: 20241223_program_holder_verification.sql"
supabase db push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration applied successfully!"
    echo ""
    echo "📋 Created:"
    echo "   - program_holder_documents table"
    echo "   - program_holder_banking table"
    echo "   - program_holder_verification table"
    echo "   - program-holder-documents storage bucket"
    echo "   - RLS policies for all tables"
    echo ""
    echo "🔐 Security:"
    echo "   - Row Level Security enabled"
    echo "   - Program holders can only access their own data"
    echo "   - Admins can access all data"
    echo ""
    echo "📚 Next steps:"
    echo "   1. Configure Stripe Identity webhook"
    echo "   2. Set STRIPE_SECRET_KEY in environment"
    echo "   3. Set STRIPE_IDENTITY_WEBHOOK_SECRET"
    echo "   4. Test signup → onboarding → verification flow"
else
    echo ""
    echo "❌ Migration failed. Check the error above."
    exit 1
fi
