import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(),
      })),
    })),
  })),
};

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`REDIRECT: ${url}`);
  }),
}));

import {
  authGuard,
  requireAuth,
  requireAdmin,
  requireInstructor,
  requireStudent,
  hasPermission,
  canAccessCourse,
  canEditCourse,
  canAccessStudentData,
} from '@/lib/authGuards';

describe('Authentication Guards', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authGuard', () => {
    it('should allow authenticated user with correct role', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' };
      const mockProfile = { id: 'user-1', role: 'admin' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const result = await authGuard({
        requireAuth: true,
        allowedRoles: ['admin'],
      });

      expect(result.isAuthenticated).toBe(true);
      expect(result.isAuthorized).toBe(true);
      expect(result.role).toBe('admin');
    });

    it('should redirect unauthenticated user', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: new Error('Not authenticated'),
      });

      await expect(
        authGuard({
          requireAuth: true,
          redirectTo: '/login',
        })
      ).rejects.toThrow('REDIRECT: /login');
    });

    it('should redirect user with insufficient permissions', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' };
      const mockProfile = { id: 'user-1', role: 'student' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      await expect(
        authGuard({
          requireAuth: true,
          allowedRoles: ['admin'],
        })
      ).rejects.toThrow('REDIRECT: /unauthorized');
    });

    it('should allow access when no roles specified', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' };
      const mockProfile = { id: 'user-1', role: 'student' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const result = await authGuard({
        requireAuth: true,
        allowedRoles: [],
      });

      expect(result.isAuthenticated).toBe(true);
      expect(result.isAuthorized).toBe(true);
    });
  });

  describe('requireAuth', () => {
    it('should return user when authenticated', async () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const user = await requireAuth();
      expect(user).toEqual(mockUser);
    });

    it('should redirect when not authenticated', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: new Error('Not authenticated'),
      });

      await expect(requireAuth()).rejects.toThrow('REDIRECT: /login');
    });
  });

  describe('requireAdmin', () => {
    it('should allow admin user', async () => {
      const mockUser = { id: 'user-1', email: 'admin@example.com' };
      const mockProfile = { id: 'user-1', role: 'admin' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const user = await requireAdmin();
      expect(user).toEqual(mockUser);
    });

    it('should reject non-admin user', async () => {
      const mockUser = { id: 'user-1', email: 'student@example.com' };
      const mockProfile = { id: 'user-1', role: 'student' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      await expect(requireAdmin()).rejects.toThrow('REDIRECT: /unauthorized');
    });
  });

  describe('hasPermission', () => {
    it('should grant all permissions to admin', async () => {
      const mockUser = { id: 'user-1', email: 'admin@example.com' };
      const mockProfile = { id: 'user-1', role: 'admin' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const canGrade = await hasPermission('grade_assignments');
      expect(canGrade).toBe(true);
    });

    it('should grant specific permissions to instructor', async () => {
      const mockUser = { id: 'user-1', email: 'instructor@example.com' };
      const mockProfile = { id: 'user-1', role: 'instructor' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const canGrade = await hasPermission('grade_assignments');
      expect(canGrade).toBe(true);

      const canManagePrograms = await hasPermission('manage_programs');
      expect(canManagePrograms).toBe(false);
    });

    it('should deny permissions to student', async () => {
      const mockUser = { id: 'user-1', email: 'student@example.com' };
      const mockProfile = { id: 'user-1', role: 'student' };

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      });

      const canGrade = await hasPermission('grade_assignments');
      expect(canGrade).toBe(false);
    });
  });

  describe('Resource-level guards', () => {
    describe('canAccessCourse', () => {
      it('should allow admin to access any course', async () => {
        const mockUser = { id: 'user-1', email: 'admin@example.com' };
        const mockProfile = { id: 'user-1', role: 'admin' };

        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: { user: mockUser },
          error: null,
        });

        mockSupabaseClient.from.mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: mockProfile,
                error: null,
              }),
            }),
          }),
        });

        const hasAccess = await canAccessCourse('course-1');
        expect(hasAccess).toBe(true);
      });

      it('should allow enrolled student to access course', async () => {
        const mockUser = { id: 'user-1', email: 'student@example.com' };
        const mockProfile = { id: 'user-1', role: 'student' };
        const mockEnrollment = { id: 'enrollment-1', user_id: 'user-1', course_id: 'course-1' };

        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: { user: mockUser },
          error: null,
        });

        let callCount = 0;
        mockSupabaseClient.from.mockImplementation(() => ({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockImplementation(() => {
              callCount++;
              if (callCount === 1) {
                // First call for profile
                return {
                  single: jest.fn().mockResolvedValue({
                    data: mockProfile,
                    error: null,
                  }),
                };
              } else if (callCount === 2) {
                // Second call for enrollment
                return {
                  eq: jest.fn().mockReturnValue({
                    single: jest.fn().mockResolvedValue({
                      data: mockEnrollment,
                      error: null,
                    }),
                  }),
                };
              }
            }),
          }),
        }));

        const hasAccess = await canAccessCourse('course-1');
        expect(hasAccess).toBe(true);
      });
    });

    describe('canEditCourse', () => {
      it('should allow course instructor to edit', async () => {
        const mockUser = { id: 'user-1', email: 'instructor@example.com' };
        const mockProfile = { id: 'user-1', role: 'instructor' };
        const mockCourse = { id: 'course-1', instructor_id: 'user-1' };

        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: { user: mockUser },
          error: null,
        });

        let callCount = 0;
        mockSupabaseClient.from.mockImplementation(() => ({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockImplementation(() => {
              callCount++;
              if (callCount === 1) {
                // First call for profile
                return {
                  single: jest.fn().mockResolvedValue({
                    data: mockProfile,
                    error: null,
                  }),
                };
              } else {
                // Second call for course
                return {
                  single: jest.fn().mockResolvedValue({
                    data: mockCourse,
                    error: null,
                  }),
                };
              }
            }),
          }),
        }));

        const canEdit = await canEditCourse('course-1');
        expect(canEdit).toBe(true);
      });

      it('should deny non-instructor from editing', async () => {
        const mockUser = { id: 'user-2', email: 'student@example.com' };
        const mockProfile = { id: 'user-2', role: 'student' };
        const mockCourse = { id: 'course-1', instructor_id: 'user-1' };

        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: { user: mockUser },
          error: null,
        });

        let callCount = 0;
        mockSupabaseClient.from.mockImplementation(() => ({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockImplementation(() => {
              callCount++;
              if (callCount === 1) {
                return {
                  single: jest.fn().mockResolvedValue({
                    data: mockProfile,
                    error: null,
                  }),
                };
              } else {
                return {
                  single: jest.fn().mockResolvedValue({
                    data: mockCourse,
                    error: null,
                  }),
                };
              }
            }),
          }),
        }));

        const canEdit = await canEditCourse('course-1');
        expect(canEdit).toBe(false);
      });
    });
  });
});
