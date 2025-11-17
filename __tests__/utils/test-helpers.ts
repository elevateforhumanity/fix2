import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function with providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

// Mock data generators
export const mockCourse = (overrides = {}) => ({
  id: '1',
  title: 'Test Course',
  category: 'Healthcare',
  duration: '6 weeks',
  price: 0,
  rating: 4.8,
  students: 100,
  ...overrides,
});

export const mockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'student',
  ...overrides,
});

export const mockEnrollment = (overrides = {}) => ({
  id: '1',
  userId: '1',
  courseId: '1',
  progress: 50,
  status: 'in-progress',
  ...overrides,
});
