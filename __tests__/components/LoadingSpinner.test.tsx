import { render, screen } from '@testing-library/react';
import { LoadingSpinner, LoadingPage, LoadingCard } from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-4', 'h-4');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('has accessible label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});

describe('LoadingPage', () => {
  it('renders full page loading state', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('LoadingCard', () => {
  it('renders card loading state', () => {
    render(<LoadingCard />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
