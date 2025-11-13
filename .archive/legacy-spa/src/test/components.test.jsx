import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AppLayout from '../layouts/AppLayout';

vi.mock('../services/auth', () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from '../services/auth';

const mockGetCurrentUser = getCurrentUser;

const renderWithProviders = (component) => {
  return render(
    <HelmetProvider>
      <MemoryRouter>{component}</MemoryRouter>
    </HelmetProvider>
  );
};

describe('Component Tests', () => {
  describe('AppLayout', () => {
    it('renders navigation links', () => {
      renderWithProviders(
        <AppLayout title="Test Page">
          <div>Content</div>
        </AppLayout>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Courses')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(
        screen.getAllByRole('link', { name: 'Support' })[0]
      ).toBeInTheDocument();
      expect(screen.getByText('Partners')).toBeInTheDocument();
    });

    it('renders footer links', () => {
      renderWithProviders(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );

      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Refund Policy')).toBeInTheDocument();
    });

    it('renders children content', () => {
      renderWithProviders(
        <AppLayout>
          <div>Test Content</div>
        </AppLayout>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('sets page title', async () => {
      renderWithProviders(
        <AppLayout title="Custom Title">
          <div>Content</div>
        </AppLayout>
      );

      await waitFor(() => {
        expect(document.title).toContain('Custom Title');
      });
    });
  });

  describe('ProtectedRoute', () => {
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

    it('renders children when authenticated', async () => {
      renderWithProviders(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      expect(await screen.findByText('Protected Content')).toBeInTheDocument();
    });

    it('renders children for admin role', async () => {
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 'admin-1',
        email: 'admin@example.com',
        role: 'admin',
      });

      renderWithProviders(
        <ProtectedRoute requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedRoute>
      );

      expect(await screen.findByText('Admin Content')).toBeInTheDocument();
    });

    it('renders children for instructor role', async () => {
      mockGetCurrentUser.mockResolvedValueOnce({
        id: 'instructor-1',
        email: 'instructor@example.com',
        role: 'instructor',
      });

      renderWithProviders(
        <ProtectedRoute requiredRole="instructor">
          <div>Instructor Content</div>
        </ProtectedRoute>
      );

      expect(await screen.findByText('Instructor Content')).toBeInTheDocument();
    });
  });
});
