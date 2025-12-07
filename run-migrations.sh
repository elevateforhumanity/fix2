#!/bin/bash

echo "🚀 Running Supabase migrations..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm i -g supabase
fi

# Run migrations
echo "📦 Pushing migrations..."
supabase db push

# Run seed data
echo "🌱 Seeding database..."
supabase db seed

echo "✅ Supabase migrations and seed complete!"
