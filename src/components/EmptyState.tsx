import { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  icon?: ReactNode;
}

export default function EmptyState({ 
  title = 'Nothing to show',
  message = "We couldn't load this content. Try again in a moment.",
  actionLabel = 'Reload',
  onAction,
  href,
  icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-slate-200 bg-slate-50 p-10 my-6">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 max-w-md">{message}</p>
      {onAction ? (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      ) : href ? (
        <a
          href={href}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
