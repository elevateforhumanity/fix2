'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';


export default function PartnerWithUsPage() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    relationshipType: '',
    resources: '',
    seeking: '',
    writtenAgreement: '',
    additionalInfo: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Thank you for your inquiry.
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            All partnership requests are reviewed internally.
          </p>
          <p className="text-slate-600 mb-8">
            Submission does not guarantee approval or access.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-brand-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Partner With Elevate for Humanity
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            Elevate for Humanity operates a proprietary workforce training and
            apprenticeship platform. Partnership discussions are structured to
            protect our systems, participants, and institutional relationships.
          </p>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            We welcome aligned partners who bring value, resources, or placement
            opportunities into our ecosystem. Access to internal systems,
            workflows, or operational details is limited and governed by
            agreement.
          </p>
        </div>

        {/* IP Acknowledgment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Intellectual Property & Confidentiality Notice
          </h2>
          <p className="text-slate-700 mb-6">
            To proceed, please review and acknowledge our Intellectual Property
            & Confidentiality Notice before submitting a partnership inquiry.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              <strong>Elevate for Humanity ("EFH")</strong> owns and operates
              proprietary workforce training systems, instructional platforms,
              automation, program structures, compliance frameworks, and related
              intellectual property.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              All websites, dashboards, student portals, administrative systems,
              integrations, program structures, and instructional workflows are
              proprietary to EFH unless otherwise stated in a written agreement
              executed by EFH.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Viewing, discussing, or participating in conversations regarding
              EFH programs or platforms does not grant ownership, licensing
              rights, replication rights, or authorization to use EFH systems,
              workflows, or intellectual property.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 w-5 h-5 text-brand-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-slate-700">
              I acknowledge that Elevate for Humanity owns its platform,
              systems, workflows, and instructional infrastructure, and I agree
              not to copy, reproduce, or represent these as my own.
            </span>
          </label>
        </div>

        {/* Partnership Inquiry Form */}
        {acknowledged ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Partnership Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Organization (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Intent Screening */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  What type of relationship are you seeking? *
                </label>
                <select
                  required
                  value={formData.relationshipType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relationshipType: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select one...</option>
                  <option value="strategic-partner">Strategic Partner</option>
                  <option value="licensed-operator">Licensed Operator</option>
                  <option value="employer-partner">Employer Partner</option>
                  <option value="training-provider">Training Provider</option>
                  <option value="funding-resource">
                    Funding / Resource Partner
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  What resources or value would you bring? *
                </label>
                <p className="text-sm text-slate-600 mb-2">
                  Examples: capital, instructors, facilities, students,
                  placements, credentials, funding
                </p>
                <textarea
                  required
                  rows={4}
                  value={formData.resources}
                  onChange={(e) =>
                    setFormData({ ...formData, resources: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Are you seeking: *
                </label>
                <select
                  required
                  value={formData.seeking}
                  onChange={(e) =>
                    setFormData({ ...formData, seeking: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select one...</option>
                  <option value="access">Access to EFH systems</option>
                  <option value="outcomes">Outcomes delivered by EFH</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Are you willing to enter into a written agreement defining IP
                  ownership and responsibilities? *
                </label>
                <select
                  required
                  value={formData.writtenAgreement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      writtenAgreement: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select one...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Anything else EFH should know?
                </label>
                <textarea
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalInfo: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">
                    Something went wrong. Please try again or contact us
                    directly at info@elevateforhumanity.org
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading'
                  ? 'Submitting...'
                  : 'Request Partnership Review'}
              </button>

              <p className="text-sm text-slate-600 text-center">
                Submission does not guarantee approval or access to EFH systems.
              </p>
            </form>
          </div>
        ) : (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-8 text-center">
            <p className="text-slate-600">
              Please acknowledge the IP & Confidentiality Notice above to
              continue.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
