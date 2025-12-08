import { getLicense } from "@/lib/license";
import { requireAdmin } from '@/lib/authGuards';

export const dynamic = "force-dynamic";

export default function LicensePage() {
  await requireAdmin();

  const license = getLicense();

  const statusColor = {
    active: "bg-green-50 text-green-700 ring-green-600/20",
    suspended: "bg-red-50 text-red-700 ring-red-600/20",
    expired: "bg-orange-50 text-orange-700 ring-orange-600/20",
  }[license.status] || "bg-slate-50 text-slate-700 ring-slate-600/20";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-2xl font-bold text-slate-900">License Information</h1>
          <p className="mt-2 text-sm text-slate-700">
            This installation includes a unique Elevate For Humanity license.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License Holder
              </label>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {license.licenseHolder}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License ID
              </label>
              <p className="mt-1 font-mono text-sm text-slate-900">
                {license.licenseId}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License Type
              </label>
              <p className="mt-1 text-sm capitalize text-slate-900">
                {license.licenseType.replace("-", " ")}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Issued Date
              </label>
              <p className="mt-1 text-sm text-slate-900">{license.issuedAt}</p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </label>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusColor}`}
                >
                  {license.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Authorized Domains
              </label>
              <div className="mt-1 space-y-1">
                {license.validDomains.map((domain) => (
                  <p key={domain} className="font-mono text-xs text-slate-700">
                    {domain}
                  </p>
                ))}
              </div>
            </div>

            {license.notes && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Notes
                </label>
                <p className="mt-1 text-sm text-slate-700">{license.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-600">
            <strong>License Protection:</strong> This installation of the Elevate Workforce
            Platform includes a unique license fingerprint. Unauthorized redistribution,
            resale, or use outside the licensed scope is prohibited and may result in
            license termination.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Questions about your license?{" "}
            <a
              href="mailto:licensing@elevateforhumanity.org"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              Contact EFH Licensing
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
