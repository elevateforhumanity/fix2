#!/bin/bash
set -e

DEST="/workspaces/elevate-lms-clean"

echo "🚀 TRANSFERRING SANITIZED CODE"
echo "=============================="
echo ""
echo "Source: /workspaces/fix2"
echo "Destination: $DEST"
echo ""

# Core Next.js directories
echo "1️⃣  Copying core Next.js code..."
cp -r app "$DEST/"
cp -r components "$DEST/"
cp -r lib "$DEST/"
echo "   ✅ Copied app/, components/, lib/"
echo ""

# Configuration files
echo "2️⃣  Copying configuration files..."
cp package.json "$DEST/"
cp tsconfig.json "$DEST/"
cp next.config.mjs "$DEST/" 2>/dev/null || cp next.config.ts "$DEST/" 2>/dev/null || cp next.config.js "$DEST/" 2>/dev/null || true
cp tailwind.config.ts "$DEST/" 2>/dev/null || cp tailwind.config.js "$DEST/" 2>/dev/null || true
cp postcss.config.mjs "$DEST/" 2>/dev/null || cp postcss.config.js "$DEST/" 2>/dev/null || true
cp components.json "$DEST/" 2>/dev/null || true
cp .eslintrc.json "$DEST/" 2>/dev/null || true
cp .prettierrc.json "$DEST/" 2>/dev/null || true
echo "   ✅ Copied config files"
echo ""

# Environment and Git files
echo "3️⃣  Copying environment templates..."
cp .env.example "$DEST/"
cp .gitignore "$DEST/"
echo "   ✅ Copied .env.example and .gitignore"
echo ""

# Public assets
echo "4️⃣  Copying public assets..."
mkdir -p "$DEST/public"
cp -r public/images "$DEST/public/" 2>/dev/null || true
cp -r public/fonts "$DEST/public/" 2>/dev/null || true
cp -r public/icons "$DEST/public/" 2>/dev/null || true
cp -r public/videos "$DEST/public/" 2>/dev/null || true
cp public/favicon.ico "$DEST/public/" 2>/dev/null || true
cp public/manifest.json "$DEST/public/" 2>/dev/null || true
cp public/robots.txt "$DEST/public/" 2>/dev/null || true
cp public/sitemap.xml "$DEST/public/" 2>/dev/null || true
echo "   ✅ Copied public assets"
echo ""

# Supabase
echo "5️⃣  Copying Supabase migrations..."
cp -r supabase "$DEST/"
echo "   ✅ Copied supabase/"
echo ""

# GitHub workflows
echo "6️⃣  Copying GitHub workflows..."
cp -r .github "$DEST/"
echo "   ✅ Copied .github/"
echo ""

# Documentation
echo "7️⃣  Creating documentation..."
cat > "$DEST/DEPLOYMENT.md" << 'EOF'
# Deployment Guide

## Quick Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `elevateforhumanity/elevate-lms-clean`
3. Add environment variables (see SECRETS_SETUP.md)
4. Deploy

## Environment Variables

See `.env.example` for required variables.

## Build Settings

- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
EOF

cat > "$DEST/SECRETS_SETUP.md" << 'EOF'
# Secrets Setup

## Required Environment Variables

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`

### Stripe
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Auth
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Email
- `RESEND_API_KEY`

### AI (Optional)
- `OPENAI_API_KEY`

### Analytics (Optional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

See `.env.example` for complete list.
EOF

echo "   ✅ Created documentation"
echo ""

# Statistics
echo "📊 TRANSFER COMPLETE"
echo "===================="
echo ""
echo "Transferred:"
echo "  - TypeScript files: $(find "$DEST/app" "$DEST/components" "$DEST/lib" -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)"
echo "  - Total files:      $(find "$DEST" -type f ! -path "*/.git/*" 2>/dev/null | wc -l)"
echo "  - Images:           $(find "$DEST/public/images" -type f 2>/dev/null | wc -l)"
echo "  - Migrations:       $(find "$DEST/supabase/migrations" -name "*.sql" 2>/dev/null | wc -l)"
echo ""
echo "✅ CLEAN CODE TRANSFERRED!"
echo ""
echo "Next steps:"
echo "  1. cd $DEST"
echo "  2. git add -A"
echo "  3. git commit -m 'Clean sanitized production code'"
echo "  4. git push origin main"
