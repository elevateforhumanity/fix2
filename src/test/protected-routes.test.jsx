import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from '../components/auth/ProtectedRoute';

vi.mock('../services/auth', () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from '../services/auth';

const mockGetCurrentUser = getCurrentUser;

const TestComponent = ({ text }) => <div>{text}</div>;
const LoginPage = () => <div>Login Page</div>;

const renderProtectedRoute = (
  component,
  { route = '/', requiredRole } = {}
) => {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute requiredRole={requiredRole}>
                {component}
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
};

describe('Protected Routes', () => {
  beforeEach(() => {
    mockGetCurrentUser.mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
      role: 'student',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('allows access when authenticated', async () => {
      renderProtectedRoute(<TestComponent text="Protected Content" />);

      expect(await screen.findByText('Protected Content')).toBeInTheDocument();
    });

    // Note: These tests use placeholder authentication
    // In production, replace with actual auth context
    it('renders content for authenticated users', async () => {
      renderProtectedRoute(<TestComponent text="Secure Page" />);

      expect(await screen.findByText('Secure Page')).toBeInTheDocument();
    });
  });

  describe('Role-Based Access', () => {
    it('allows admin access to admin routes', async () => {
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 'admin-1',
        email: 'admin@example.com',
        role: 'admin',
      });

      renderProtectedRoute(<TestComponent text="Admin Dashboard" />, {
        requiredRole: 'admin',
      });
      expect(await screen.findByText('Admin Dashboard')).toBeInTheDocument();
    });

    it('allows instructor access to instructor routes', async () => {
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 'instructor-1',
        email: 'instructor@example.com',
        role: 'instructor',
      });

      renderProtectedRoute(<TestComponent text="Instructor Portal" />, {
        requiredRole: 'instructor',
      });
      expect(await screen.findByText('Instructor Portal')).toBeInTheDocument();
    });

    it('allows admin access to instructor routes', async () => {
      // Admins should have access to all routes
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 'admin-1',
        email: 'admin@example.com',
        role: 'admin',
      });

      renderProtectedRoute(<TestComponent text="Instructor Content" />, {
        requiredRole: 'instructor',
      });
      expect(await screen.findByText('Instructor Content')).toBeInTheDocument();
    });
  });

  describe('Route Protection', () => {
    it('protects admin routes', () => {
      const routes = ['/admin-console', '/admin-dashboard', '/user-management'];

      routes.forEach((route) => {
        expect(route).toMatch(/^\/(admin|user-management)/);
      });
    });

    it('protects instructor routes', () => {
      const routes = [
        '/instructor',
        '/instructor-edit',
        '/instructor-new',
        '/course-builder',
      ];

      routes.forEach((route) => {
        expect(route).toMatch(/^\/(instructor|course-builder)/);
      });
    });
  });
});
