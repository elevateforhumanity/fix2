'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Acknowledgement {
  id: string;
  organization_name: string;
  contact_name: string;
  title: string | null;
  email: string;
  phone: string | null;
  agreed: boolean;
  created_at: string;
}

export default function ProgramHolderAcknowledgementsPage() {
  const [acknowledgements, setAcknowledgements] = useState<Acknowledgement[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAcknowledgements();
  }, []);

  async function fetchAcknowledgements() {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/program-holder-acknowledgements');

      if (!res.ok) {
        throw new Error('Failed to fetch acknowledgements');
      }

      const data = await res.json();
      setAcknowledgements(data.acknowledgements || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load acknowledgements');
    } finally {
      setLoading(false);
    }
  }

  const filteredAcknowledgements = acknowledgements.filter((ack) => {
    const search = searchTerm.toLowerCase();
    return (
      ack.organization_name.toLowerCase().includes(search) ||
      ack.contact_name.toLowerCase().includes(search) ||
      ack.email.toLowerCase().includes(search)
    );
  });

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Program Holder Acknowledgements
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                View all site partner acknowledgements submitted through the
                portal
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Stats */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by organization, contact, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span>
              Total: <strong>{acknowledgements.length}</strong>
            </span>
            {searchTerm && (
              <span>
                Filtered: <strong>{filteredAcknowledgements.length}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
            <p className="mt-4 text-sm text-slate-600">
              Loading acknowledgements...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && acknowledgements.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-sm font-medium text-slate-900">
              No acknowledgements yet
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Acknowledgements will appear here when partners submit the form.
            </p>
            <Link
              href="/program-holders/acknowledgement"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View Acknowledgement Form
            </Link>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filteredAcknowledgements.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredAcknowledgements.map((ack) => (
                    <tr key={ack.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {ack.organization_name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {ack.contact_name}
                        </div>
                        {ack.title && (
                          <div className="text-xs text-slate-500">
                            {ack.title}
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={`mailto:${ack.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {ack.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {ack.phone || '—'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {formatDate(ack.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading &&
          !error &&
          searchTerm &&
          filteredAcknowledgements.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
              <p className="text-sm text-slate-600">
                No acknowledgements match your search for "{searchTerm}"
              </p>
            </div>
          )}
      </div>
    </main>
  );
}
