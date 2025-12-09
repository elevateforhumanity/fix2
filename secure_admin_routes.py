#!/usr/bin/env python3
"""
Secure Admin API Routes Script
Automatically adds withAuth() wrapper to all admin routes
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

# Colors for output
GREEN = '\033[0;32m'
YELLOW = '\033[1;33m'
RED = '\033[0;31m'
NC = '\033[0m'

def find_admin_routes():
    """Find all admin route files"""
    routes = []
    admin_dir = Path('app/api/admin')
    
    if not admin_dir.exists():
        print(f"{RED}❌ Error: app/api/admin directory not found{NC}")
        return routes
    
    for route_file in admin_dir.rglob('route.ts'):
        # Skip the example secure route
        if 'applications-secure' not in str(route_file):
            routes.append(route_file)
    
    return routes

def backup_routes(routes):
    """Create backup of all routes"""
    timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    backup_dir = Path(f'backups/admin-routes-{timestamp}')
    
    print(f"\n📦 Creating backups...")
    
    for route in routes:
        backup_path = backup_dir / route
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(route, backup_path)
        print(f"  Backed up: {route}")
    
    print(f"{GREEN}✅ Backup complete: {backup_dir}{NC}")
    return backup_dir

def is_already_secured(content):
    """Check if route is already secured"""
    return 'withAuth' in content

def secure_route(route_path):
    """Secure a single route file"""
    with open(route_path, 'r') as f:
        content = f.read()
    
    # Check if already secured
    if is_already_secured(content):
        return False, "Already secured"
    
    # Add import if not present
    if "import { withAuth }" not in content:
        # Find the last import statement
        import_pattern = r'(import .+ from ["\'].+["\'];?\n)'
        imports = list(re.finditer(import_pattern, content))
        
        if imports:
            last_import = imports[-1]
            insert_pos = last_import.end()
            content = (
                content[:insert_pos] +
                "import { withAuth } from '@/lib/withAuth';\n" +
                content[insert_pos:]
            )
    
    # Pattern to match export async function handlers
    handler_pattern = r'export async function (GET|POST|PUT|DELETE|PATCH)\s*\('
    
    # Find all handlers
    handlers = list(re.finditer(handler_pattern, content))
    
    if not handlers:
        return False, "No handlers found"
    
    # Process each handler (in reverse to maintain positions)
    for match in reversed(handlers):
        method = match.group(1)
        start = match.start()
        
        # Find the end of the function (closing brace)
        # This is a simplified approach - looks for the last closing brace
        func_start = content.find('{', start)
        if func_start == -1:
            continue
        
        # Count braces to find matching closing brace
        brace_count = 0
        func_end = func_start
        for i in range(func_start, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    func_end = i + 1
                    break
        
        # Replace the handler
        old_handler = content[start:func_end]
        
        # Extract function signature and body
        sig_match = re.search(
            r'export async function ' + method + r'\s*\((.*?)\)\s*{',
            old_handler,
            re.DOTALL
        )
        
        if not sig_match:
            continue
        
        params = sig_match.group(1)
        body = old_handler[sig_match.end():-1]  # Remove closing brace
        
        # Create new secured handler
        new_handler = f'''export const {method} = withAuth(
  async ({params}, user) => {{
{body}
  }},
  {{ roles: ['admin', 'super_admin'] }}
);'''
        
        content = content[:start] + new_handler + content[func_end:]
    
    # Write back
    with open(route_path, 'w') as f:
        f.write(content)
    
    return True, "Secured"

def main():
    print("🔒 Securing Admin API Routes")
    print("=" * 50)
    
    # Check if in correct directory
    if not Path('package.json').exists():
        print(f"{RED}❌ Error: Must run from project root{NC}")
        return
    
    # Find all admin routes
    routes = find_admin_routes()
    print(f"\n📋 Found {len(routes)} admin routes")
    
    if not routes:
        print(f"{YELLOW}⚠️  No routes found to secure{NC}")
        return
    
    # Confirm
    response = input(f"\n{YELLOW}⚠️  Secure all {len(routes)} routes? (y/n): {NC}")
    if response.lower() != 'y':
        print("Aborted.")
        return
    
    # Backup
    backup_dir = backup_routes(routes)
    
    # Secure each route
    print(f"\n🔧 Securing routes...")
    secured_count = 0
    skipped_count = 0
    error_count = 0
    
    for route in routes:
        try:
            success, message = secure_route(route)
            if success:
                print(f"  {GREEN}✅ Secured: {route}{NC}")
                secured_count += 1
            else:
                print(f"  {YELLOW}⏭️  Skipped ({message}): {route}{NC}")
                skipped_count += 1
        except Exception as e:
            print(f"  {RED}❌ Error ({route}): {e}{NC}")
            error_count += 1
    
    # Summary
    print(f"\n{'=' * 50}")
    print(f"{GREEN}✅ Secured: {secured_count} routes{NC}")
    print(f"{YELLOW}⏭️  Skipped: {skipped_count} routes{NC}")
    if error_count > 0:
        print(f"{RED}❌ Errors: {error_count} routes{NC}")
    
    print(f"\n📁 Backups saved to: {backup_dir}")
    
    # Create summary file
    with open('ADMIN_ROUTES_SECURED.md', 'w') as f:
        f.write(f"""# Admin Routes Security Update

## Summary

- **Secured:** {secured_count} routes
- **Skipped:** {skipped_count} routes  
- **Errors:** {error_count} routes
- **Backup:** {backup_dir}

## What Was Done

All admin API routes have been updated to require authentication using `withAuth()`.

### Changes Applied

**Before:**
```typescript
export async function GET(req: NextRequest) {{
  // No auth check
}}
```

**After:**
```typescript
import {{ withAuth }} from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context, user) => {{
    // Only admins can access
  }},
  {{ roles: ['admin', 'super_admin'] }}
);
```

## Next Steps

1. **Check TypeScript:**
   ```bash
   pnpm typecheck
   ```

2. **Fix any errors** in routes that need manual adjustment

3. **Test endpoints:**
   - Without auth (should return 401)
   - With admin auth (should work)
   - With student auth (should return 403)

4. **Deploy:**
   ```bash
   git add .
   git commit -m "security: add authentication to all admin API routes"
   git push origin main
   ```

## Rollback if Needed

```bash
cp -r {backup_dir}/app/api/admin/* app/api/admin/
```

## Testing

```bash
# Should fail (401)
curl https://www.elevateforhumanity.org/api/admin/applications/1

# Should work with admin token
curl -H "Authorization: Bearer ADMIN_TOKEN" \\
  https://www.elevateforhumanity.org/api/admin/applications/1
```
""")
    
    print(f"\n{GREEN}✅ Created ADMIN_ROUTES_SECURED.md{NC}")
    
    print(f"\n{YELLOW}📋 Next Steps:{NC}")
    print("1. Run: pnpm typecheck")
    print("2. Fix any TypeScript errors")
    print("3. Test admin endpoints")
    print("4. Deploy: git add . && git commit && git push")
    print()

if __name__ == '__main__':
    main()
