'use client';

import { useEffect, useMemo, useState } from 'react';

type Checklist = any;

function formatPct(p?: number) {
  if (typeof p !== 'number') return '0%';
  return `${p}%`;
}

export default function NextStepsPage() {
  const [data, setData] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const progress = useMemo(
    () => data?.progress || { percent: 0, done: 0, total: 8 },
    [data]
  );

  async function load() {
    setLoading(true);
    const res = await fetch('/api/next-steps', { cache: 'no-store' });
    if (!res.ok) {
      setLoading(false);
      setData(null);
      return;
    }
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  async function patch(update: Record<string, any>) {
    setSaving(true);
    const res = await fetch('/api/next-steps', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    const json = await res.json();
    setData(json);
    setSaving(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        Loading your checklist…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Your Next Steps Checklist</h1>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
          Please log in to view and update your checklist.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Your Next Steps Checklist</h1>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        Complete each step so we can move you into the correct funding and
        enrollment pathway.
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Progress</p>
            <p className="text-sm text-gray-700">
              {progress.done}/{progress.total} complete
            </p>
          </div>
          <div className="text-sm font-semibold">
            {formatPct(progress.percent)}
          </div>
        </div>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-black"
            style={{ width: `${progress.percent || 0}%` }}
          />
        </div>

        {saving && <p className="mt-3 text-xs text-gray-500">Saving…</p>}
      </div>

      <div className="mt-6 space-y-4">
        <ChecklistRow
          checked={!!data.inquiry_submitted}
          title="Step 1: Submit your Elevate for Humanity Inquiry"
          note="This tells us your goal and program interest."
          onChange={(v) =>
            patch({
              inquiry_submitted: v,
              inquiry_submitted_at: v ? new Date().toISOString() : null,
            })
          }
        />

        <div className="rounded-2xl border bg-white p-5">
          <ChecklistRow
            checked={!!data.icc_account_created}
            title="Step 2: Create or log into Indiana Career Connect"
            note="Go to indianacareerconnect.com and create/login to your account."
            onChange={(v) => patch({ icc_account_created: v })}
          />
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-700">
              Optional: ICC Username
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={data.icc_username ?? ''}
              onChange={(e) => patch({ icc_username: e.target.value })}
              placeholder="Your ICC username (optional)"
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <ChecklistRow
            checked={!!data.workone_appointment_scheduled}
            title="Step 3: Schedule a WorkOne appointment"
            note="Add the appointment details so we can track your timeline."
            onChange={(v) => patch({ workone_appointment_scheduled: v })}
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Appointment Date
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={data.workone_appointment_date ?? ''}
                onChange={(e) =>
                  patch({ workone_appointment_date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Appointment Time
              </label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={data.workone_appointment_time ?? ''}
                onChange={(e) =>
                  patch({ workone_appointment_time: e.target.value })
                }
                placeholder="e.g., 10:30 AM"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                WorkOne Location
              </label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={data.workone_location ?? ''}
                onChange={(e) => patch({ workone_location: e.target.value })}
                placeholder="City / office name"
              />
            </div>
          </div>
        </div>

        <ChecklistRow
          checked={!!data.told_advisor_efh}
          title='Step 4: Tell the advisor: "I&apos;m here for Elevate for Humanity."'
          note="This connects your appointment to the right training pathway."
          onChange={(v) => patch({ told_advisor_efh: v })}
        />

        <div className="rounded-2xl border bg-white p-5">
          <ChecklistRow
            checked={!!data.advisor_docs_uploaded}
            title="Step 5: Upload or confirm documents requested by your advisor"
            note="If they asked for anything, mark this once you've submitted it."
            onChange={(v) => patch({ advisor_docs_uploaded: v })}
          />
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-700">
              Optional notes
            </label>
            <textarea
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={data.advisor_docs_note ?? ''}
              onChange={(e) => patch({ advisor_docs_note: e.target.value })}
              placeholder="What documents did they request?"
              rows={3}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <p className="text-sm font-semibold">
            Step 6: Funding determination received
          </p>
          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
            Select what your advisor decided so we know your pathway.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Funding status
              </label>
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={data.funding_status ?? 'pending'}
                onChange={(e) => patch({ funding_status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Funding type
              </label>
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                value={data.funding_type ?? ''}
                onChange={(e) =>
                  patch({ funding_type: e.target.value || null })
                }
              >
                <option value="">Select</option>
                <option value="WIOA">WIOA</option>
                <option value="WRG">WRG</option>
                <option value="JRI">JRI</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <ChecklistRow
            checked={!!data.efh_onboarding_call_completed}
            title="Step 7: Complete your EFH onboarding call"
            note="This is where we confirm your pathway, timeline, and start steps."
            onChange={(v) => patch({ efh_onboarding_call_completed: v })}
          />
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-700">
              Onboarding call date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={data.efh_onboarding_call_date ?? ''}
              onChange={(e) =>
                patch({ efh_onboarding_call_date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <ChecklistRow
            checked={!!data.program_start_confirmed}
            title="Step 8: Program start date confirmed"
            note="Once this is checked, you are officially ready for your start timeline."
            onChange={(v) => patch({ program_start_confirmed: v })}
          />
          <div className="mt-3">
            <label className="text-xs font-semibold text-gray-700">
              Program start date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              value={data.program_start_date ?? ''}
              onChange={(e) => patch({ program_start_date: e.target.value })}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-gray-50 p-5">
          <p className="text-sm font-semibold">What happens next</p>
          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
            Once your checklist is complete, our team can move faster and ensure
            nothing falls through the cracks.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChecklistRow({
  checked,
  title,
  note,
  onChange,
}: {
  checked: boolean;
  title: string;
  note: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm text-gray-700 leading-relaxed">{note}</p>
        </div>
      </label>
    </div>
  );
}
