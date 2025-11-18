'use client';

import { useState, useEffect } from 'react';
import { FileSignature, CheckCircle, User } from 'lucide-react';

interface Signature {
  id: string;
  signer_name: string;
  signer_email: string;
  role: string | null;
  signed_at: string;
}

interface Document {
  id: string;
  title: string;
  body: string;
  type: string;
  created_for_org: string | null;
  signatures: Signature[];
}

export default function SignDocumentPage({
  params,
}: {
  params: { documentId: string };
}) {
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function fetchDocument() {
    try {
      const res = await fetch(`/api/signature/documents/${params.documentId}`);
      const data = await res.json();

      if (data.document) {
        setDoc(data.document);
      }
    } catch (error) {
      console.error('Failed to fetch document:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!agreed) {
      alert('You must confirm that you have reviewed and agree to this document.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/signature/documents/${params.documentId}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signerName, signerEmail, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Unable to submit signature.');
        return;
      }

      setDone(true);
      fetchDocument(); // Refresh to show new signature
    } catch (error) {
      console.error('Failed to submit signature:', error);
      alert('Failed to submit signature');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading document...</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FileSignature className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Document not found or no longer available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileSignature className="w-8 h-8 text-blue-600" />
            {doc.title}
          </h1>
          {doc.created_for_org && (
            <p className="mt-2 text-sm text-slate-600">For: {doc.created_for_org}</p>
          )}
          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {doc.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Document Body */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
            {doc.body}
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signature Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Sign this document
            </h2>

            {done ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <p className="text-green-600 font-medium">
                  Thank you. Your signature has been recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name (as it should appear) *
                  </label>
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title / Role (optional)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Executive Director"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <span className="text-xs text-slate-700">
                    I confirm that I have read and agree to the terms of this document.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Sign Document'}
                </button>
              </form>
            )}
          </div>

          {/* Existing Signatures */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Signatures ({doc.signatures.length})
            </h2>

            {doc.signatures.length === 0 ? (
              <p className="text-sm text-slate-500">No signatures yet.</p>
            ) : (
              <div className="space-y-3">
                {doc.signatures.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-slate-400 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{sig.signer_name}</p>
                        <p className="text-xs text-slate-600">{sig.signer_email}</p>
                        {sig.role && (
                          <p className="text-xs text-slate-500 mt-1">{sig.role}</p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          Signed {new Date(sig.signed_at).toLocaleString()}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
