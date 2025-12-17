'use client';

import { useEffect, useMemo, useState } from 'react';

type Row = any;

export default function AdminNextStepsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [needs, setNeeds] = useState('');

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (status) p.set('status', status);
    if (needs) p.set('needs', needs);
    return p.toString();
  }, [q, status, needs]);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/next-steps?${queryString}`, {
      cache: 'no-store',
    });
    const json = await res.json();

    if (!res.ok) {
      setRows([]);
      setSummary(null);
      setLoading(false);
      return;
    }

    setRows(json.rows || []);
    setSummary(json.summary || null);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">WorkOne / ICC Progress Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        Track who completed the inquiry, scheduled their appointment, received
        funding status, and finished onboarding.
      </p>

      <div className="mt-6 grid gap-3 rounded-2xl border bg-white p-5 sm:grid-cols-4">
        <div>
          <label className="text-xs font-semibold text-gray-700">Search</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="Name, email, program…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">
            Funding status
          </label>
          <select
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">
            Needs attention
          </label>
          <select
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
          >
            <option value="">All</option>
            <option value="appt">Missing appointment</option>
            <option value="docs">Missing docs</option>
            <option value="onboarding">Missing onboarding</option>
            <option value="start">Missing start date</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={load}
            className="w-full rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
          >
            Refresh
          </button>
        </div>
      </div>

      {summary && (
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Stat label="Total" value={summary.total} />
          <Stat label="Pending" value={summary.funding_pending} />
          <Stat label="Approved" value={summary.funding_approved} />
          <Stat label="Denied" value={summary.funding_denied} />
          <Stat label="Missing Appt" value={summary.appt_missing} />
          <Stat label="Missing Start" value={summary.start_missing} />
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
        <div className="border-b px-5 py-3 text-sm font-semibold">
          Students ({rows.length})
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-gray-700">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="px-5 py-6 text-sm text-gray-700">No results.</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-700">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Appointment</th>
                  <th className="px-4 py-3">Funding</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{r.student_name}</div>
                      <div className="text-xs text-gray-600">
                        {r.student_email}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold">
                        {r.program_name || '—'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {r.program_slug || ''}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold">
                        {r.progress?.percent ?? 0}%
                      </div>
                      <div className="text-xs text-gray-600">
                        {r.progress?.done ?? 0}/{r.progress?.total ?? 8}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {r.workone_appointment_scheduled ? (
                        <div>
                          <div className="font-semibold">
                            {r.workone_appointment_date || 'Scheduled'}
                          </div>
                          <div className="text-xs text-gray-600">
                            {r.workone_appointment_time || ''}{' '}
                            {r.workone_location
                              ? `• ${r.workone_location}`
                              : ''}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-red-700">
                          Missing
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold capitalize">
                        {r.funding_status}
                      </div>
                      <div className="text-xs text-gray-600">
                        {r.funding_type || '—'}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">
                        {r.updated_at
                          ? new Date(r.updated_at).toLocaleString()
                          : '—'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs font-semibold text-gray-600">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value ?? 0}</div>
    </div>
  );
}
