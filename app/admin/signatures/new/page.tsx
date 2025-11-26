'use client';

import { useState } from 'react';
import { FileSignature, Copy, Check } from 'lucide-react';

export default function NewSignatureDocumentPage() {
  const [type, setType] = useState<'mou' | 'letter_of_support' | 'other'>('mou');
  const [title, setTitle] = useState('Memorandum of Understanding');
  const [createdForOrg, setCreatedForOrg] = useState('');
  const [body, setBody] = useState('');
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSignUrl(null);

    try {
      const res = await fetch('/api/signature/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, body, createdForOrg }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error creating document');
        return;
      }

      setSignUrl(data.signUrl);
    } catch (error) {
      console.error('Failed to create document:', error);
      alert('Failed to create document');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (signUrl) {
      const fullUrl = `${window.location.origin}${signUrl}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <FileSignature className="w-8 h-8 text-brandPrimary" />
          Create Signable Document
        </h1>
        <p className="text-gray-600">
          Create MOUs or Letters of Support and generate shareable signature links for partners or boards.
        </p>
      </div>

      <form onSubmit={handleCreate} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Memorandum of Understanding"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'mou' | 'letter_of_support' | 'other')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mou">MOU</option>
              <option value="letter_of_support">Letter of Support</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization (optional)
          </label>
          <input
            type="text"
            value={createdForOrg}
            onChange={(e) => setCreatedForOrg(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Kenny's Barber Academy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={16}
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your MOU or letter text here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create & Get Signature Link'}
        </button>

        {signUrl && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-2">
              ✓ Document created successfully!
            </p>
            <p className="text-xs text-green-700 mb-2">
              Share this link with partners or boards to sign:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-white border rounded text-xs font-mono text-brandPrimary overflow-x-auto">
                {window.location.origin}{signUrl}
              </code>
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-3 py-2 bg-brandPrimary text-white rounded hover:bg-brandPrimaryDark transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
