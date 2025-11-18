'use client';

import { useEffect, useState } from 'react';

type SectorRow = { sector: string | null; _count: { _all: number } };
type ZipRow = { zipCode: string | null; _count: { _all: number } };

type ImpactData = {
  totalStudents: number;
  totalEnrollments: number;
  completedEnrollments: number;
  completionRate: number;
  totalHours: number;
  bySector: SectorRow[];
  byZip: ZipRow[];
};

export default function ImpactDashboardPage() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/impact/summary');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to load impact data:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-sm text-slate-600">Loading impact data…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Community Impact Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          A board-friendly view of how Elevate for Humanity is serving learners
          and employers.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Students Served" value={data.totalStudents} />
          <StatCard label="Enrollments" value={data.totalEnrollments} />
          <StatCard label="Completions" value={data.completedEnrollments} />
          <StatCard
            label="Completion Rate"
            value={`${data.completionRate.toFixed(1)}%`}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Total Training Hours"
            value={data.totalHours}
            subtitle="Approximate documented hours of instruction"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Learners by Sector
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Distribution of enrollments across sectors.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              {data.bySector.map((row) => {
                const label = row.sector || 'Unspecified';
                const count = row._count._all;
                const pct =
                  data.totalEnrollments === 0
                    ? 0
                    : (count / data.totalEnrollments) * 100;
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">
                        {label}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {count} • {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {data.bySector.length === 0 && (
                <p className="text-xs text-slate-500">
                  No sector data available yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Top ZIP Codes Served
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Learners by home ZIP code (top 10).
            </p>
            <div className="mt-3 space-y-2 text-xs">
              {data.byZip.map((row) => {
                const label = row.zipCode || 'Unknown';
                const count = row._count._all;
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5"
                  >
                    <span className="font-medium text-slate-800">{label}</span>
                    <span className="text-[11px] text-slate-500">
                      {count} learner{count === 1 ? '' : 's'}
                    </span>
                  </div>
                );
              })}
              {data.byZip.length === 0 && (
                <p className="text-xs text-slate-500">
                  No ZIP data available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number | string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {subtitle && (
        <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}
