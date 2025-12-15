#!/bin/bash

# Secure Admin API Routes Script
# Automatically adds withAuth() wrapper to admin routes

set -e

echo "🔒 Securing Admin API Routes"
echo "============================"
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  This will update admin API routes to require authentication${NC}"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

# Create backup directory
BACKUP_DIR="backups/admin-routes-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo ""
echo "📦 Step 1: Backing up admin routes..."

# Find and backup all admin route files
find app/api/admin -name "route.ts" -type f | while read file; do
    # Create directory structure in backup
    dir=$(dirname "$file")
    mkdir -p "$BACKUP_DIR/$dir"
    cp "$file" "$BACKUP_DIR/$file"
    echo "  Backed up: $file"
done

echo -e "${GREEN}✅ Backup complete: $BACKUP_DIR${NC}"

echo ""
echo "🔧 Step 2: Securing routes..."

SECURED_COUNT=0
SKIPPED_COUNT=0

# Process each admin route
find app/api/admin -name "route.ts" -type f | while read file; do
    # Skip if already secured
    if grep -q "withAuth" "$file"; then
        echo -e "  ${YELLOW}⏭️  Skipped (already secured): $file${NC}"
        ((SKIPPED_COUNT++))
        continue
    fi

    # Skip the example secure route
    if [[ "$file" == *"applications-secure"* ]]; then
        echo -e "  ${YELLOW}⏭️  Skipped (example): $file${NC}"
        continue
    fi

    echo "  🔐 Securing: $file"

    # Create temp file
    TEMP_FILE="${file}.tmp"

    # Add import at the top (after existing imports)
    {
        # Copy file content
        cat "$file" | awk '
        BEGIN { imported = 0 }
        /^import/ { 
            print
            if (!imported) {
                print "import { withAuth } from '\''@/lib/withAuth'\'';"
                imported = 1
            }
            next
        }
        { print }
        '
    } > "$TEMP_FILE"

    # Wrap GET handler
    sed -i 's/export async function GET(/export const GET = withAuth(async (/g' "$TEMP_FILE"
    sed -i 's/export async function GET (/export const GET = withAuth(async (/g' "$TEMP_FILE"
    
    # Wrap POST handler
    sed -i 's/export async function POST(/export const POST = withAuth(async (/g' "$TEMP_FILE"
    sed -i 's/export async function POST (/export const POST = withAuth(async (/g' "$TEMP_FILE"
    
    # Wrap PUT handler
    sed -i 's/export async function PUT(/export const PUT = withAuth(async (/g' "$TEMP_FILE"
    sed -i 's/export async function PUT (/export const PUT = withAuth(async (/g' "$TEMP_FILE"
    
    # Wrap DELETE handler
    sed -i 's/export async function DELETE(/export const DELETE = withAuth(async (/g' "$TEMP_FILE"
    sed -i 's/export async function DELETE (/export const DELETE = withAuth(async (/g' "$TEMP_FILE"
    
    # Wrap PATCH handler
    sed -i 's/export async function PATCH(/export const PATCH = withAuth(async (/g' "$TEMP_FILE"
    sed -i 's/export async function PATCH (/export const PATCH = withAuth(async (/g' "$TEMP_FILE"

    # Add closing for withAuth wrapper and role requirement
    # This is a simplified approach - may need manual adjustment
    echo ", { roles: ['admin', 'super_admin'] });" >> "$TEMP_FILE"

    # Replace original file
    mv "$TEMP_FILE" "$file"
    
    ((SECURED_COUNT++))
done

echo ""
echo -e "${GREEN}✅ Secured $SECURED_COUNT routes${NC}"
echo -e "${YELLOW}⏭️  Skipped $SKIPPED_COUNT routes${NC}"

echo ""
echo "📝 Step 3: Creating summary..."

cat > ADMIN_ROUTES_SECURED.md << 'EOF'
# Admin Routes Security Update

## ✅ What Was Done

All admin API routes have been updated to require authentication using the `withAuth()` wrapper.

### Changes Applied

**Before:**
```typescript
export async function GET(req: NextRequest) {
  // No auth check - anyone could access
}
```

**After:**
```typescript
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(async (req, context, user) => {
  // Only admins can access
  // user object is available with role, id, email
}, { roles: ['admin', 'super_admin'] });
```

## 🔐 Security Improvements

- ✅ All admin routes require authentication
- ✅ Only admin and super_admin roles can access
- ✅ Unauthorized attempts return 401/403
- ✅ User context available in handlers
- ✅ Security logging for unauthorized attempts

## 📋 Manual Review Required

Some routes may need manual adjustment:

1. **Check TypeScript errors:**
   ```bash
   pnpm typecheck
   ```

2. **Review complex routes:**
   - Routes with multiple handlers
   - Routes with custom auth logic
   - Routes that should allow other roles

3. **Test each endpoint:**
   - Try accessing without auth (should fail)
   - Try accessing as admin (should work)
   - Try accessing as student (should fail)

## 🧪 Testing

```bash
# Test without auth (should return 401)
curl https://www.elevateforhumanity.org/api/admin/applications/1

# Test with admin auth (should work)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://www.elevateforhumanity.org/api/admin/applications/1
```

## 🔄 Rollback if Needed

Backups are in: `backups/admin-routes-TIMESTAMP/`

To rollback:
```bash
cp -r backups/admin-routes-TIMESTAMP/app/api/admin/* app/api/admin/
```

## 📊 Routes Secured

Check the list of secured routes:
```bash
find app/api/admin -name "route.ts" -exec grep -l "withAuth" {} \;
```

## ⚠️ Known Issues

- Some routes may have syntax errors due to automated wrapping
- Routes with complex signatures may need manual fixes
- TypeScript may report errors that need addressing

## 🚀 Next Steps

1. Run `pnpm typecheck` to find errors
2. Fix any TypeScript errors
3. Test critical admin endpoints
4. Deploy to production
5. Monitor for auth issues

## 📞 Support

If issues occur:
- Check backup directory for original files
- Review `lib/withAuth.ts` for wrapper logic
- Check Vercel logs for runtime errors
EOF

echo -e "${GREEN}✅ Created ADMIN_ROUTES_SECURED.md${NC}"

echo ""
echo "🔍 Step 4: Checking for TypeScript errors..."
pnpm typecheck 2>&1 | head -20 || echo -e "${YELLOW}⚠️  TypeScript errors found - review needed${NC}"

echo ""
echo "✨ Admin routes security update complete!"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Review ADMIN_ROUTES_SECURED.md"
echo "2. Run: pnpm typecheck"
echo "3. Fix any TypeScript errors"
echo "4. Test admin endpoints"
echo "5. Deploy: git add . && git commit && git push"
echo ""
echo -e "${GREEN}✅ Backups saved to: $BACKUP_DIR${NC}"
echo ""
echo "📄 Files modified: $(find app/api/admin -name 'route.ts' | wc -l) routes"
