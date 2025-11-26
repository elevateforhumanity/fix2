// app/admin/applications/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, User, Mail, Phone, Calendar, FileText } from "lucide-react";

type Application = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  program: string | null;
  notes: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
};

type Program = {
  id: string;
  title: string;
};

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");
  const [fundingType, setFundingType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load application + programs
  useEffect(() => {
    async function load() {
      try {
        const [appRes, progRes] = await Promise.all([
          fetch(`/api/admin/applications/${params.id}`),
          fetch("/api/admin/programs"),
        ]);

        const appJson = await appRes.json();
        const progJson = await progRes.json();

        if (!appRes.ok) {
          throw new Error(appJson?.error || "Failed to load application");
        }
        if (!progRes.ok) {
          throw new Error(progJson?.error || "Failed to load programs");
        }

        setApplication(appJson.application);
        setPrograms(progJson.programs ?? []);

        // Try to auto-match program by title text
        if (appJson.application?.program && progJson.programs) {
          const match = progJson.programs.find(
            (p: Program) =>
              p.title.toLowerCase() ===
              appJson.application.program.toLowerCase()
          );
          if (match) setSelectedProgramId(match.id);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  async function handleApprove() {
    if (!selectedProgramId) {
      setError("Please select a program to enroll this applicant into.");
      return;
    }
    setSaving(true);
    setMessage(null);
    setError(null);
    
    try {
      const res = await fetch(
        `/api/admin/applications/${params.id}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            program_id: selectedProgramId,
            funding_type: fundingType || null,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to approve application");
      }
      setMessage("✅ Approved and enrolled successfully!");
      
      // Go back to list after short delay
      setTimeout(() => {
        router.push("/admin/applications");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error approving application");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application Details
          </h1>
          <p className="text-sm text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Application Details
          </h1>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error || "Application not found."}
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push("/admin/applications")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Applications
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.first_name} {application.last_name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Submitted {new Date(application.created_at).toLocaleString()} •{" "}
              <span className={`font-medium ${
                application.status === 'converted' ? 'text-green-600' :
                application.status === 'rejected' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {application.status || "submitted"}
              </span>
            </p>
          </div>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {message}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Applicant Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Applicant Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900">
                    {application.first_name} {application.last_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{application.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{application.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Program of Interest</p>
                  <p className="text-sm text-gray-900">
                    {application.program || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">Source</p>
                  <p className="text-sm text-gray-900">
                    {application.source || "marketing_site"}
                  </p>
                </div>
              </div>

              {application.notes && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700">{application.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Approve & Enroll */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Approve & Enroll
            </h2>

            {application.status === 'converted' ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <p className="font-medium">✅ Already Approved</p>
                <p className="text-sm mt-1">This application has been converted to an enrollment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enroll into Program *
                  </label>
                  <select
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    disabled={saving}
                  >
                    <option value="">Select a program</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Funding Type (Optional)
                  </label>
                  <select
                    value={fundingType}
                    onChange={(e) => setFundingType(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    disabled={saving}
                  >
                    <option value="">Select funding type</option>
                    <option value="WIOA">WIOA</option>
                    <option value="WRG">WRG</option>
                    <option value="JRI">JRI</option>
                    <option value="OJT">OJT</option>
                    <option value="WEX">WEX</option>
                    <option value="Self-pay">Self-pay</option>
                    <option value="Employer">Employer-paid</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleApprove}
                    disabled={saving || !selectedProgramId}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:from-red-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12"
r="10" stroke="currentColor" strokeWidth="4"
fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Approving...
                      </span>
                    ) : (
                      "Approve & Enroll Student"
                    )}
                  </button>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Creates Supabase Auth user if needed</p>
                  <p>• Enrolls student in selected program</p>
                  <p>• Updates application status to "converted"</p>
                  <p>• Student can log in to portal immediately</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
