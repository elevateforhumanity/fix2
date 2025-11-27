"use client";

import { useEffect, useState } from "react";

type FundingProgram = {
  id: string;
  name: string;
  category: string;
  description: string;
  eligibility?: string;
  fundingAmount?: string;
};

export default function FundingPage() {
  const [programTitle, setProgramTitle] = useState("HVAC Technician Program");
  const [targetPopulation, setTargetPopulation] = useState<string[]>(["adult"]);
  const [hasApprenticeship, setHasApprenticeship] = useState(false);
  const [sector, setSector] = useState("construction");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<FundingProgram[]>([]);
  const [narrative, setNarrative] = useState<string>("");

  async function run() {
    setLoading(true);
    try {
      const res = await fetch("/api/funding/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programTitle,
          targetPopulation,
          hasApprenticeship,
          sector,
        }),
      });
      const data = await res.json();
      setMatches(data.matches || []);
      setNarrative(data.narrative || "");
    } catch (error) {
      console.error("Failed to get funding recommendations:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Run once on load with default
    run();
     
  }, []);

  function togglePopulation(value: string) {
    setTargetPopulation((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Funding & Grants Recommender
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Explore which funding streams align with your programs and how to
          position Elevate for Humanity as the provider.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
          <div className="md:col-span-1 space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Program title
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                value={programTitle}
                onChange={(e) => setProgramTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700">
                Sector
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Select sector</option>
                <option value="healthcare">Healthcare</option>
                <option value="construction">Construction</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology/IT</option>
                <option value="hospitality">Hospitality</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-700">
                Target population
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {["youth", "adult", "reentry", "low-income", "dislocated"].map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePopulation(p)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        targetPopulation.includes(p)
                          ? "bg-orange-400 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="apprenticeship"
                type="checkbox"
                checked={hasApprenticeship}
                onChange={(e) => setHasApprenticeship(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-orange-500"
              />
              <label
                htmlFor="apprenticeship"
                className="text-xs text-slate-700"
              >
                This program has a registered or pre-apprenticeship pathway
              </label>
            </div>

            <button
              onClick={run}
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-orange-400 text-white px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-60"
            >
              {loading ? "Analyzing…" : "Find funding matches"}
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Recommended Funding Programs ({matches.length})
              </h2>
              <div className="mt-3 space-y-3">
                {matches.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {m.name}
                        </p>
                        <p className="text-[10px] uppercase text-slate-500">
                          {m.category}
                        </p>
                      </div>
                      {m.fundingAmount && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                          {m.fundingAmount}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-slate-600">{m.description}</p>
                    {m.eligibility && (
                      <p className="mt-2 text-[11px] text-slate-500">
                        <strong>Eligibility:</strong> {m.eligibility}
                      </p>
                    )}
                  </div>
                ))}
                {matches.length === 0 && (
                  <p className="text-xs text-slate-500">
                    No matches yet. Try adjusting the program details.
                  </p>
                )}
              </div>
            </div>

            {narrative && (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
                <h2 className="mb-2 text-sm font-semibold text-slate-900">
                  Positioning & Strategy
                </h2>
                <div className="whitespace-pre-line text-slate-700">
                  {narrative}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
