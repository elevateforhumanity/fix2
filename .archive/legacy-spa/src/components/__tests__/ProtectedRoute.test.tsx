import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute, RoleRoute } from '../ProtectedRoute';
import * as AuthContext from '../../contexts/AuthContext';

vi.mock('../../contexts/AuthContext');

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProtectedRoute', () => {
  it('shows loading state while checking auth', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: null,
      loading: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('redirects to login when not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: null,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.queryByText('Protected Content')).toBeNull();
  });

  it('renders children when authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeDefined();
  });
});

describe('RoleRoute', () => {
  it('shows loading state while checking auth', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: null,
      loading: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <RoleRoute allowedRoles={['admin']}>
        <div>Admin Content</div>
      </RoleRoute>
    );

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('redirects to login when not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: null,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <RoleRoute allowedRoles={['admin']}>
        <div>Admin Content</div>
      </RoleRoute>
    );

    expect(screen.queryByText('Admin Content')).toBeNull();
  });

  it('redirects to not-authorized when role not allowed', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { id: '123', email: 'test@example.com', role: 'user' },
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <RoleRoute allowedRoles={['admin']}>
        <div>Admin Content</div>
      </RoleRoute>
    );

    expect(screen.queryByText('Admin Content')).toBeNull();
  });

  it('renders children when role is allowed', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { id: '123', email: 'test@example.com', role: 'admin' },
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <RoleRoute allowedRoles={['admin', 'staff']}>
        <div>Admin Content</div>
      </RoleRoute>
    );

    expect(screen.getByText('Admin Content')).toBeDefined();
  });

  it('allows multiple roles', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { id: '123', email: 'test@example.com', role: 'staff' },
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: vi.fn(),
    });

    renderWithRouter(
      <RoleRoute allowedRoles={['admin', 'staff']}>
        <div>Staff Content</div>
      </RoleRoute>
    );

    expect(screen.getByText('Staff Content')).toBeDefined();
  });
});
