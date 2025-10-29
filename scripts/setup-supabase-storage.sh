#!/bin/bash

# =============================================
# Supabase Storage Buckets Setup Script
# Autonomous Autopilot v7.0
# =============================================

set -e

echo "🚀 Supabase Storage Buckets Setup"
echo "=================================="
echo ""

# Check if required environment variables are set
if [ -z "$SUPABASE_PROJECT_REF" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: Required environment variables not set"
    echo ""
    echo "Please set:"
    echo "  export SUPABASE_PROJECT_REF=your_project_ref"
    echo "  export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
    echo ""
    echo "Get these from: https://supabase.com/dashboard → Settings → API"
    echo "Project ref is the subdomain: https://[PROJECT_REF].supabase.co"
    exit 1
fi

SUPABASE_URL="https://${SUPABASE_PROJECT_REF}.supabase.co"
API_URL="${SUPABASE_URL}/storage/v1/bucket"

echo "📍 Supabase URL: $SUPABASE_URL"
echo ""

# Function to create bucket
create_bucket() {
    local bucket_name=$1
    local is_public=$2
    local file_size_limit=$3
    local allowed_mime_types=$4
    
    echo "Creating bucket: $bucket_name..."
    
    # Build JSON payload
    local payload=$(cat <<EOF
{
  "id": "$bucket_name",
  "name": "$bucket_name",
  "public": $is_public,
  "file_size_limit": $file_size_limit,
  "allowed_mime_types": $allowed_mime_types
}
EOF
)
    
    # Create bucket
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
        -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo "✅ Bucket '$bucket_name' created successfully"
    elif [ "$http_code" = "409" ]; then
        echo "⚠️  Bucket '$bucket_name' already exists (skipping)"
    else
        echo "❌ Failed to create bucket '$bucket_name' (HTTP $http_code)"
        echo "Response: $body"
    fi
    echo ""
}

# Create buckets
echo "Creating storage buckets..."
echo ""

# Bucket 1: course-materials
create_bucket \
    "course-materials" \
    "true" \
    "52428800" \
    '["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","video/mp4","video/webm","image/jpeg","image/png","image/gif","image/webp"]'

# Bucket 2: certificates
create_bucket \
    "certificates" \
    "true" \
    "10485760" \
    '["application/pdf","image/png","image/jpeg"]'

# Bucket 3: profile-avatars
create_bucket \
    "profile-avatars" \
    "true" \
    "5242880" \
    '["image/png","image/jpeg","image/gif","image/webp"]'

# Bucket 4: program-covers
create_bucket \
    "program-covers" \
    "true" \
    "10485760" \
    '["image/png","image/jpeg","image/webp"]'

echo "=================================="
echo "✅ Storage setup complete!"
echo ""
echo "Buckets created:"
echo "  1. course-materials (50 MB, public)"
echo "  2. certificates (10 MB, public)"
echo "  3. profile-avatars (5 MB, public)"
echo "  4. program-covers (10 MB, public)"
echo ""
echo "View buckets: ${SUPABASE_URL}/storage/buckets"
echo "=================================="
