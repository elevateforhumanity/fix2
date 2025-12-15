#!/bin/bash

# Cleanup Root Directory
# Moves documentation, scripts, and temporary files to organized directories

set -e

echo "🧹 Cleaning up root directory..."
echo ""

# Create archive directories if they don't exist
mkdir -p .archive/docs
mkdir -p .archive/scripts
mkdir -p .archive/sql
mkdir -p .archive/temp

# Count files before cleanup
BEFORE_MD=$(find . -maxdepth 1 -name "*.md" -type f | wc -l)
BEFORE_SQL=$(find . -maxdepth 1 -name "*.sql" -type f | wc -l)
BEFORE_SH=$(find . -maxdepth 1 -name "*.sh" -type f | wc -l)
BEFORE_UTIL=$(find . -maxdepth 1 \( -name "*.mjs" -o -name "*.cjs" \) -type f | wc -l)

echo "📊 Current state:"
echo "   Markdown files: $BEFORE_MD"
echo "   SQL files: $BEFORE_SQL"
echo "   Shell scripts: $BEFORE_SH"
echo "   Utility scripts: $BEFORE_UTIL"
echo ""

# Keep essential files in root
KEEP_FILES=(
  "README.md"
  "QUICK_START.md"
  "START_HERE.md"
  "DEPLOYMENT_CHECKLIST.md"
  "pull-vercel-env.sh"
  "setup-local.sh"
)

echo "🗂️  Moving documentation to .archive/docs..."
for file in *.md; do
  if [[ -f "$file" ]]; then
    # Check if file should be kept
    KEEP=false
    for keep_file in "${KEEP_FILES[@]}"; do
      if [[ "$file" == "$keep_file" ]]; then
        KEEP=true
        break
      fi
    done
    
    if [[ "$KEEP" == false ]]; then
      mv "$file" .archive/docs/
    fi
  fi
done

echo "📄 Moving SQL files to .archive/sql..."
for file in *.sql; do
  if [[ -f "$file" ]]; then
    mv "$file" .archive/sql/
  fi
done

echo "🔧 Moving utility scripts to .archive/scripts..."
for file in *.{mjs,cjs,js}; do
  if [[ -f "$file" ]]; then
    # Skip essential config files
    if [[ "$file" != "next.config.mjs" ]] && \
       [[ "$file" != "jest.config.js" ]] && \
       [[ "$file" != "jest.setup.js" ]] && \
       [[ "$file" != "postcss.config.js" ]] && \
       [[ "$file" != "eslint.config.js" ]] && \
       [[ "$file" != "playwright.config.ts" ]]; then
      mv "$file" .archive/scripts/
    fi
  fi
done

echo "🐚 Moving shell scripts to .archive/scripts..."
for file in *.sh; do
  if [[ -f "$file" ]]; then
    # Check if file should be kept
    KEEP=false
    for keep_file in "${KEEP_FILES[@]}"; do
      if [[ "$file" == "$keep_file" ]]; then
        KEEP=true
        break
      fi
    done
    
    if [[ "$KEEP" == false ]]; then
      mv "$file" .archive/scripts/
    fi
  fi
done

echo "🗑️  Moving temporary files to .archive/temp..."
for file in *.{txt,json,html,log}; do
  if [[ -f "$file" ]]; then
    # Skip essential config files
    if [[ "$file" != "package.json" ]] && \
       [[ "$file" != "package-lock.json" ]] && \
       [[ "$file" != "pnpm-lock.yaml" ]] && \
       [[ "$file" != "tsconfig.json" ]] && \
       [[ "$file" != "tsconfig.*.json" ]] && \
       [[ "$file" != "vercel.json" ]] && \
       [[ "$file" != "components.json" ]] && \
       [[ "$file" != "renovate.json" ]]; then
      mv "$file" .archive/temp/
    fi
  fi
done

# Count files after cleanup
AFTER_MD=$(find . -maxdepth 1 -name "*.md" -type f | wc -l)
AFTER_SQL=$(find . -maxdepth 1 -name "*.sql" -type f | wc -l)
AFTER_SH=$(find . -maxdepth 1 -name "*.sh" -type f | wc -l)
AFTER_UTIL=$(find . -maxdepth 1 \( -name "*.mjs" -o -name "*.cjs" \) -type f | wc -l)

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Results:"
echo "   Markdown files: $BEFORE_MD → $AFTER_MD"
echo "   SQL files: $BEFORE_SQL → $AFTER_SQL"
echo "   Shell scripts: $BEFORE_SH → $AFTER_SH"
echo "   Utility scripts: $BEFORE_UTIL → $AFTER_UTIL"
echo ""
echo "📁 Archived files are in:"
echo "   .archive/docs/ - Documentation"
echo "   .archive/sql/ - SQL scripts"
echo "   .archive/scripts/ - Utility scripts"
echo "   .archive/temp/ - Temporary files"
echo ""
echo "📝 Essential files kept in root:"
for file in "${KEEP_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    echo "   ✓ $file"
  fi
done
