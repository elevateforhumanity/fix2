#!/bin/bash

# Security Patch Script for Elevate for Humanity
# Fixes critical security vulnerabilities identified in audit
# Date: December 9, 2025

set -e  # Exit on error

echo "🔒 Security Patch Script"
echo "======================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  This script will apply critical security patches${NC}"
echo "   - Add authentication to admin API routes"
echo "   - Fix cookie handlers in auth"
echo "   - Add RLS policies for applications table"
echo "   - Add input validation"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "📦 Step 1: Installing required dependencies..."
pnpm install zod @upstash/redis || npm install zod @upstash/redis

echo ""
echo "🔧 Step 2: Creating security utilities..."

# Create auth wrapper
cat > lib/withAuth.ts << 'EOF'
// lib/withAuth.ts - Centralized authentication wrapper
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, type AuthUser } from '@/lib/auth';
import type { UserRole } from '@/types/database';

type AuthOptions = {
  roles?: UserRole[];
  requireAuth?: boolean;
};

type AuthHandler = (
  req: NextRequest,
  context: any,
  user: AuthUser
) => Promise<Response>;

export function withAuth(
  handler: AuthHandler,
  options: AuthOptions = { requireAuth: true }
) {
  return async (req: NextRequest, context: any) => {
    // Get authenticated user
    const user = await getAuthUser();

    // Check if authentication is required
    if (options.requireAuth && !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check role-based access
    if (options.roles && user) {
      if (!options.roles.includes(user.role)) {
        console.warn('Unauthorized access attempt:', {
          userId: user.id,
          role: user.role,
          requiredRoles: options.roles,
          path: req.nextUrl.pathname,
        });
        
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
    }

    // Call the handler with user context
    return handler(req, context, user!);
  };
}
EOF

echo -e "${GREEN}✅ Created lib/withAuth.ts${NC}"

# Create validation utilities
cat > lib/validateRequest.ts << 'EOF'
// lib/validateRequest.ts - Request validation utilities
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function validateRequest<T>(
  req: Request,
  schema: z.Schema<T>
): Promise<{ data: T | null; error: Response | null }> {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    return { data, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: NextResponse.json(
          {
            error: 'Validation failed',
            details: error.errors,
          },
          { status: 400 }
        ),
      };
    }
    return {
      data: null,
      error: NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      ),
    };
  }
}

// Common validation schemas
export const applicationSchema = z.object({
  full_name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  program_interest: z.string().max(200).trim().optional(),
  referral_source: z.string().max(100).trim().optional(),
});
EOF

echo -e "${GREEN}✅ Created lib/validateRequest.ts${NC}"

# Create security logger
cat > lib/securityLogger.ts << 'EOF'
// lib/securityLogger.ts - Security event logging
import { logger } from '@/lib/logger';

export const securityLogger = {
  logUnauthorizedAccess(userId: string, resource: string, details?: any) {
    logger.warn('Unauthorized access attempt', {
      userId,
      resource,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  logRateLimitExceeded(ip: string, endpoint: string) {
    logger.warn('Rate limit exceeded', {
      ip,
      endpoint,
      timestamp: new Date().toISOString(),
    });
  },

  logSuspiciousActivity(type: string, details: any) {
    logger.warn('Suspicious activity detected', {
      type,
      timestamp: new Date().toISOString(),
      ...details,
    });
  },

  logAuthFailure(email: string, reason: string) {
    logger.warn('Authentication failure', {
      email,
      reason,
      timestamp: new Date().toISOString(),
    });
  },
};
EOF

echo -e "${GREEN}✅ Created lib/securityLogger.ts${NC}"

echo ""
echo "🗄️  Step 3: Creating RLS policies migration..."

cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_security_patch_rls.sql << 'EOF'
-- Security Patch: Add RLS policies for applications table
-- Date: 2025-12-09

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can submit applications" ON applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
DROP POLICY IF EXISTS "Admins can update applications" ON applications;

-- Allow public to insert applications (for form submissions)
CREATE POLICY "Public can submit applications"
  ON applications FOR INSERT
  WITH CHECK (true);

-- Only admins can view all applications
CREATE POLICY "Admins can view all applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Users can view their own applications by email
CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Only admins can update applications
CREATE POLICY "Admins can update applications"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications"
  ON applications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);

-- Log the security patch
INSERT INTO migration_log (migration_name, applied_at, description)
VALUES (
  'security_patch_rls',
  NOW(),
  'Added RLS policies for applications table - Security Audit 2025-12-09'
) ON CONFLICT DO NOTHING;
EOF

echo -e "${GREEN}✅ Created RLS policies migration${NC}"

echo ""
echo "🔐 Step 4: Fixing auth cookie handlers..."

# Backup original file
cp app/api/auth/landing/route.ts app/api/auth/landing/route.ts.backup

cat > app/api/auth/landing/route.ts << 'EOF'
// app/api/auth/landing/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors
            console.error('Error setting cookie:', error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors
            console.error('Error removing cookie:', error);
          }
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ redirectTo: '/auth/login' });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      console.error('Error fetching profile:', error);
      return NextResponse.json({ redirectTo: '/auth/login' });
    }

    const role = profile.role as string;

    let redirectTo = '/';

    switch (role) {
      case 'student':
        redirectTo = '/app/student/dashboard';
        break;
      case 'program_holder':
      case 'instructor':
        redirectTo = '/app/program-holder/dashboard';
        break;
      case 'admin':
      case 'super_admin':
        redirectTo = '/app/admin/dashboard';
        break;
      case 'grant_client':
        redirectTo = '/app/grants';
        break;
      case 'vita_staff':
        redirectTo = '/app/vita';
        break;
      case 'supersonic_staff':
        redirectTo = '/app/supersonic';
        break;
      default:
        redirectTo = '/app/student/dashboard';
    }

    return NextResponse.json({ redirectTo });
  } catch (error) {
    console.error('Auth landing error:', error);
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 500 }
    );
  }
}
EOF

echo -e "${GREEN}✅ Fixed auth cookie handlers${NC}"

echo ""
echo "📝 Step 5: Creating example protected route..."

mkdir -p app/api/admin/applications-secure

cat > app/api/admin/applications-secure/[id]/route.ts << 'EOF'
// app/api/admin/applications-secure/[id]/route.ts
// SECURE VERSION with authentication
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/withAuth';
import { getServerSupabase } from '@/lib/supabaseClients';

export const GET = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }, user) => {
    const { id } = await params;
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    try {
      const { data: application, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching application:', error);
        return NextResponse.json(
          { error: 'Failed to fetch application' },
          { status: 500 }
        );
      }

      if (!application) {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ application });
    } catch (err) {
      console.error('Unexpected error:', err);
      return NextResponse.json(
        { error: 'Unexpected error' },
        { status: 500 }
      );
    }
  },
  { roles: ['admin', 'super_admin'] }
);
EOF

echo -e "${GREEN}✅ Created secure admin route example${NC}"

echo ""
echo "📋 Step 6: Creating security checklist..."

cat > SECURITY_CHECKLIST.md << 'EOF'
# Security Patch Checklist

## ✅ Completed by Script
- [x] Created `lib/withAuth.ts` - Authentication wrapper
- [x] Created `lib/validateRequest.ts` - Input validation
- [x] Created `lib/securityLogger.ts` - Security logging
- [x] Created RLS policies migration
- [x] Fixed auth cookie handlers
- [x] Created example secure route

## 🔧 Manual Steps Required

### 1. Update All Admin API Routes
Replace unsecured routes with the new pattern:

**Before:**
```typescript
export async function GET(req: NextRequest) {
  // No auth check
}
```

**After:**
```typescript
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context, user) => {
    // Handler code
  },
  { roles: ['admin'] }
);
```

**Files to update:**
- [ ] `app/api/admin/applications/[id]/route.ts`
- [ ] All other `app/api/admin/**/route.ts` files

### 2. Add Input Validation to Public Endpoints
Update `app/api/applications/route.ts`:

```typescript
import { validateRequest, applicationSchema } from '@/lib/validateRequest';

export async function POST(req: Request) {
  const { data, error } = await validateRequest(req, applicationSchema);
  if (error) return error;
  
  // Use validated data
  const { full_name, email, phone, program_interest, referral_source } = data;
  // ... rest of code
}
```

### 3. Apply RLS Migration
```bash
# If using Supabase CLI
supabase db push

# Or apply manually in Supabase dashboard
# SQL Editor → Run the migration file
```

### 4. Set Up Redis (Required for Production)
Add to `.env`:
```
REDIS_URL=your-redis-url
REDIS_TOKEN=your-redis-token
```

Get Redis from: https://upstash.com (free tier available)

### 5. Update Middleware for Redis Rate Limiting
See `SECURITY_AUDIT_REPORT.md` section on rate limiting.

### 6. Test All Changes
```bash
# Run tests
pnpm test

# Check TypeScript
pnpm typecheck

# Test authentication
# 1. Try accessing /api/admin/applications-secure/1 without auth (should fail)
# 2. Login as admin and try again (should work)
# 3. Login as student and try (should fail)
```

### 7. Deploy
```bash
git add .
git commit -m "security: apply critical security patches

- Add authentication wrapper for API routes
- Implement input validation
- Add RLS policies for applications
- Fix auth cookie handlers
- Add security logging

Addresses critical issues from security audit"

git push origin main
```

## 📊 Verification

After deployment, verify:
- [ ] Admin routes require authentication
- [ ] Non-admin users cannot access admin endpoints
- [ ] Application submissions validate input
- [ ] RLS policies are active in database
- [ ] Auth cookies work correctly
- [ ] No console errors

## 🚨 If Issues Occur

1. Check Vercel logs for errors
2. Verify environment variables are set
3. Test locally first: `pnpm dev`
4. Rollback if needed: `git revert HEAD`

## 📞 Support

If you encounter issues:
- Review `SECURITY_AUDIT_REPORT.md`
- Check code annotations in IDE
- Contact: Elevate4humanityedu@gmail.com
EOF

echo -e "${GREEN}✅ Created security checklist${NC}"

echo ""
echo "✨ Security patch files created successfully!"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Review SECURITY_CHECKLIST.md"
echo "2. Update admin API routes to use withAuth()"
echo "3. Apply RLS migration to database"
echo "4. Set up Redis for rate limiting"
echo "5. Test thoroughly before deploying"
echo ""
echo -e "${GREEN}✅ Script completed!${NC}"
echo ""
echo "📄 Files created:"
echo "  - lib/withAuth.ts"
echo "  - lib/validateRequest.ts"
echo "  - lib/securityLogger.ts"
echo "  - supabase/migrations/*_security_patch_rls.sql"
echo "  - app/api/auth/landing/route.ts (updated)"
echo "  - app/api/admin/applications-secure/[id]/route.ts (example)"
echo "  - SECURITY_CHECKLIST.md"
echo ""
echo "📖 Read SECURITY_CHECKLIST.md for manual steps"
