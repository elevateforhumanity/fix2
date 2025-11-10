import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  err?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { err: undefined };

  static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    return { err };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  }

  render() {
    if (this.state.err) {
      return (
        <main className="mx-auto max-w-3xl px-4 lg:px-6 py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-slate-700">
              We encountered an unexpected error. Please try refreshing the page or contact support if this continues.
            </p>
            <details className="mt-4 rounded border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-slate-900 mb-2">
                Error Details
              </summary>
              <pre className="text-xs text-slate-500 overflow-auto whitespace-pre-wrap break-words">
                {this.state.err.message}
                {'\n\n'}
                {this.state.err.stack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Refresh page
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
