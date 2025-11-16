import { useRouteError, useNavigate } from 'react-router-dom';

export default function RouteBoundary() {
  const error = useRouteError() as
    | Error
    | { statusText?: string; message?: string };
  const navigate = useNavigate();

  const errorMessage =
    error instanceof Error
      ? error.message
      : (error as any)?.statusText ||
        (error as any)?.message ||
        'Unknown error';

  return (
    <main className="mx-auto max-w-3xl px-4 lg:px-6 py-16">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Page Error</h1>
        <p className="mt-2 text-slate-700">
          This page encountered an error. Please try again or return to the
          homepage.
        </p>
        <pre className="mt-4 text-xs text-slate-500 overflow-auto p-4 bg-white rounded border border-slate-200">
          {errorMessage}
        </pre>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Try again
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}
