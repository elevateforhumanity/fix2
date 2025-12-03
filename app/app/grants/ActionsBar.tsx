// app/dashboard/grants/ActionsBar.tsx
'use client';

import { useState } from 'react';

export default function ActionsBar() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function call(path: string, label: string) {
    try {
      setLoading(label);
      setMessage(null);
      const res = await fetch(path, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || `Error running ${label}`);
      } else {
        setMessage(`${label} completed: ${JSON.stringify(data)}`);
      }
    } catch (e: any) {
      setMessage(`Error: ${e?.message ?? 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-800 mb-2">
        Grant Autopilot Controls
      </p>
      <div className="flex flex-wrap gap-3 mb-3">
        <button
          onClick={() => call('/api/grants/sync', 'Sync grants')}
          disabled={loading !== null}
          className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading === 'Sync grants' ? 'Syncing…' : 'Sync Demo Grants'}
        </button>
        <button
          onClick={() => call('/api/grants/match', 'Match grants')}
          disabled={loading !== null}
          className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {loading === 'Match grants' ? 'Matching…' : 'Run Matcher'}
        </button>
      </div>
      {message && (
        <p className="text-xs text-slate-600 whitespace-pre-wrap">{message}</p>
      )}
      <p className="mt-2 text-[11px] text-slate-400">
        1) Sync demo grants, 2) run matcher, then refresh this page to see
        updated counts and matches.
      </p>
    </div>
  );
}
