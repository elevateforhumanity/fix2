'use client';

import { useState } from 'react';

type Opportunity = {
  noticeId: string;
  title: string;
  department: string;
  postedDate: string;
  responseDeadLine: string;
  naicsCode: string;
  description: string;
  uiLink: string;
};

export default function ContractsPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchContracts() {
    start {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/sam-gov/search?type=workforce&state=IN');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }
      
      setOpportunities(data.opportunities || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Federal Contracts & Opportunities
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Search SAM.gov for workforce development contracts and opportunities in Indiana
        </p>

        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <button
            onClick={searchContracts}
            disabled={loading}
            className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Searching SAM.gov...' : 'Search Workforce Opportunities'}
          </button>
          
          {error && (
            <p className="mt-3 text-sm text-red-600">Error: {error}</p>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Found {opportunities.length} Opportunities
          </h2>
          
          {opportunities.length === 0 && !loading && (
            <p className="text-sm text-slate-500">
              Click the button above to search for opportunities
            </p>
          )}

          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div
                key={opp.noticeId}
                className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {opp.title}
                </h3>
                <div className="text-xs text-slate-600 space-y-1 mb-3">
                  <p><strong>Department:</strong> {opp.department}</p>
                  <p><strong>NAICS:</strong> {opp.naicsCode}</p>
                  <p><strong>Posted:</strong> {new Date(opp.postedDate).toLocaleDateString()}</p>
                  <p><strong>Deadline:</strong> {new Date(opp.responseDeadLine).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-slate-700 mb-3 line-clamp-3">
                  {opp.description}
                </p>
                <a
                  href={opp.uiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View on SAM.gov →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
