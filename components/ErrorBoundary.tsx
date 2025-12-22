'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Error logged
    
    // Log to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full bg-white rounded-lg border border-red-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-brand-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6">
                <summary className="cursor-pointer text-sm text-slate-500 mb-2">
                  Error details
                </summary>
                <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-orange-600 text-white rounded-lg hover:bg-brand-orange-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorMessage({ 
  title = 'Error', 
  message = 'Something went wrong',
  onRetry 
}: { 
  title?: string; 
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-brand-orange-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm text-brand-orange-600 hover:text-red-700 font-medium"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
