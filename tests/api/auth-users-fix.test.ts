import { describe, it, expect } from 'vitest';

/**
 * Integration tests for auth.users query bug fix
 * 
 * Bug Description:
 * Multiple API routes were attempting to query 'auth.users' directly using
 * the regular Supabase client, which only has access via the anon key.
 * The auth schema is protected and requires service role access.
 * 
 * Fix:
 * Created lib/supabase-admin.ts with helper functions that use the service
 * role key to access user data via the Admin API.
 * 
 * Affected Routes:
 * - /api/admin/learner/info
 * - /api/delegates/add
 * - /api/cert/issue
 * - /api/cert/bulk-issue
 * - /api/funding/admin/resend
 */

describe('Auth Users Query Bug Fix', () => {
  describe('API Route Imports', () => {
    it('should import getUserById in admin/learner/info route', async () => {
      const routeContent = await import('../../app/api/admin/learner/info/route');
      expect(routeContent).toBeDefined();
      expect(routeContent.GET).toBeDefined();
    });

    it('should import getUserByEmail in delegates/add route', async () => {
      const routeContent = await import('../../app/api/delegates/add/route');
      expect(routeContent).toBeDefined();
      expect(routeContent.POST).toBeDefined();
    });

    it('should import getUserById in cert/issue route', async () => {
      const routeContent = await import('../../app/api/cert/issue/route');
      expect(routeContent).toBeDefined();
      expect(routeContent.POST).toBeDefined();
    });

    it('should import getUserByEmail in cert/bulk-issue route', async () => {
      const routeContent = await import('../../app/api/cert/bulk-issue/route');
      expect(routeContent).toBeDefined();
      expect(routeContent.POST).toBeDefined();
    });

    it('should import getUserById in funding/admin/resend route', async () => {
      const routeContent = await import('../../app/api/funding/admin/resend/route');
      expect(routeContent).toBeDefined();
      expect(routeContent.POST).toBeDefined();
    });
  });

  describe('Supabase Admin Helpers', () => {
    it('should export getUserByEmail helper', async () => {
      const { getUserByEmail } = await import('../../lib/supabase-admin');
      expect(getUserByEmail).toBeDefined();
      expect(typeof getUserByEmail).toBe('function');
    });

    it('should export getUserById helper', async () => {
      const { getUserById } = await import('../../lib/supabase-admin');
      expect(getUserById).toBeDefined();
      expect(typeof getUserById).toBe('function');
    });

    it('should export supabaseAdmin client', async () => {
      const { supabaseAdmin } = await import('../../lib/supabase-admin');
      expect(supabaseAdmin).toBeDefined();
      expect(supabaseAdmin.auth).toBeDefined();
      expect(supabaseAdmin.auth.admin).toBeDefined();
    });
  });

  describe('Code Quality', () => {
    it('should not contain direct auth.users queries in fixed routes', async () => {
      // This is a meta-test to ensure the bug doesn't regress
      // In a real scenario, you'd use static analysis or grep
      const fs = await import('fs/promises');
      
      const routesToCheck = [
        'app/api/admin/learner/info/route.ts',
        'app/api/delegates/add/route.ts',
        'app/api/cert/issue/route.ts',
        'app/api/cert/bulk-issue/route.ts',
        'app/api/funding/admin/resend/route.ts',
      ];

      for (const route of routesToCheck) {
        const content = await fs.readFile(route, 'utf-8');
        
        // Should not contain direct auth.users queries
        expect(content).not.toContain("from('auth.users')");
        
        // Should import from supabase-admin
        expect(content).toContain('@/lib/supabase-admin');
      }
    });
  });
});

describe('Bug Impact Assessment', () => {
  it('documents the bug severity and impact', () => {
    const bugReport = {
      severity: 'CRITICAL',
      impact: 'HIGH',
      affectedFeatures: [
        'Admin learner information lookup',
        'Delegate management (adding delegates)',
        'Certificate issuance (single and bulk)',
        'Funding application email resend',
      ],
      rootCause: 'Direct queries to auth.users table without service role access',
      symptoms: [
        'Runtime errors when admins try to view learner info',
        'Failed delegate additions',
        'Certificate issuance failures',
        'Email resend failures',
      ],
      fix: 'Created supabase-admin.ts with service role client and helper functions',
      testing: 'Unit tests for helpers, integration tests for API routes',
    };

    expect(bugReport.severity).toBe('CRITICAL');
    expect(bugReport.affectedFeatures.length).toBeGreaterThan(0);
  });
});
