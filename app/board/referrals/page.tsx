'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Phone, Mail, Calendar, Plus } from 'lucide-react';

interface Referral {
  id: string;
  participant_name: string;
  participant_email: string | null;
  participant_phone: string | null;
  program_name: string | null;
  status: string;
  created_at: string;
  notes: string | null;
}

export default function BoardReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');
  const [programName, setProgramName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchReferrals();
  }, []);

  async function fetchReferrals() {
    setLoading(true);
    try {
      const res = await fetch('/api/board/referrals');
      const data = await res.json();
      if (data.referrals) {
        setReferrals(data.referrals);
      }
    } catch (error) {
      console.error('Failed to fetch referrals:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/board/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantName,
          participantEmail: participantEmail || null,
          participantPhone: participantPhone || null,
          programName: programName || null,
          notes: notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to create referral');
        return;
      }

      // Reset form
      setParticipantName('');
      setParticipantEmail('');
      setParticipantPhone('');
      setProgramName('');
      setNotes('');
      setShowForm(false);

      // Refresh list
      fetchReferrals();
    } catch (error) {
      console.error('Failed to create referral:', error);
      alert('Failed to create referral');
    } finally {
      setSubmitting(false);
    }
  }

  const statusColors: Record<string, string> = {
    referred: 'bg-blue-100 text-blue-800',
    enrolled: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    not_eligible: 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Referrals</h1>
          <p className="text-gray-600">
            Track participants referred to Elevate for Humanity programs
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Referral
        </button>
      </div>

      {/* New Referral Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Referral</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Participant Name *
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program Name
                </label>
                <input
                  type="text"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Barber Apprenticeship"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={participantPhone}
                  onChange={(e) => setParticipantPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional information about this referral..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Referral'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Referrals List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {referrals.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No referrals yet. Create your first referral to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {referral.participant_name}
                          </div>
                          {referral.notes && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {referral.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {referral.program_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        {referral.participant_email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="text-xs">
                              {referral.participant_email}
                            </span>
                          </div>
                        )}
                        {referral.participant_phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span className="text-xs">
                              {referral.participant_phone}
                            </span>
                          </div>
                        )}
                        {!referral.participant_email &&
                          !referral.participant_phone &&
                          '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          statusColors[referral.status] ||
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {referral.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(referral.created_at).toLocaleDateString()}
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
