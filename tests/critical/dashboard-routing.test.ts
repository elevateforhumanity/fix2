import { describe, it, expect } from 'vitest';

const ROLE_DASHBOARD_MAP = {
  student: '/lms/dashboard',
  admin: '/admin/dashboard',
  program_holder: '/program-holder/dashboard',
  employer: '/employer/dashboard',
  staff: '/staff-portal/dashboard',
  instructor: '/instructor/dashboard',
};

describe('Dashboard Routing', () => {
  it('should have dashboard routes for all roles', () => {
    const roles = ['student', 'admin', 'program_holder', 'employer', 'staff', 'instructor'];
    
    roles.forEach(role => {
      expect(ROLE_DASHBOARD_MAP[role as keyof typeof ROLE_DASHBOARD_MAP]).toBeDefined();
      expect(ROLE_DASHBOARD_MAP[role as keyof typeof ROLE_DASHBOARD_MAP]).toContain('dashboard');
    });
  });

  it('should have unique dashboard routes', () => {
    const routes = Object.values(ROLE_DASHBOARD_MAP);
    const uniqueRoutes = new Set(routes);
    expect(routes.length).toBe(uniqueRoutes.size);
  });

  it('should map all roles correctly', () => {
    expect(ROLE_DASHBOARD_MAP.student).toBe('/lms/dashboard');
    expect(ROLE_DASHBOARD_MAP.admin).toBe('/admin/dashboard');
    expect(ROLE_DASHBOARD_MAP.program_holder).toBe('/program-holder/dashboard');
    expect(ROLE_DASHBOARD_MAP.employer).toBe('/employer/dashboard');
    expect(ROLE_DASHBOARD_MAP.staff).toBe('/staff-portal/dashboard');
    expect(ROLE_DASHBOARD_MAP.instructor).toBe('/instructor/dashboard');
  });
});
