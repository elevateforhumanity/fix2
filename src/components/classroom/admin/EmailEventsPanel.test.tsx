import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmailEventsPanel from './EmailEventsPanel';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(() =>
        Promise.resolve({
          data: { user: { id: 'test-user-id' } },
          error: null,
        })
      ),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          limit: vi.fn(() =>
            Promise.resolve({
              data: [],
              error: null,
            })
          ),
        })),
      })),
    })),
    rpc: vi.fn((funcName) => {
      if (funcName === 'is_admin') {
        return Promise.resolve({ data: true, error: null });
      }
      if (funcName === 'get_email_stats') {
        return Promise.resolve({ data: [], error: null });
      }
      return Promise.resolve({ data: null, error: null });
    }),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn(),
      })),
    })),
  },
}));

describe('EmailEventsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<EmailEventsPanel />);
    expect(screen.getByText('Email Events Dashboard')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<EmailEventsPanel />);
    expect(screen.getByText(/Loading email events/i)).toBeInTheDocument();
  });

  it('has filter and search controls', async () => {
    render(<EmailEventsPanel />);

    // Wait for loading to complete
    await screen.findByText('Recent Email Events');

    expect(screen.getByText('Filter by Status')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search by recipient or subject/i)
    ).toBeInTheDocument();
  });
});
