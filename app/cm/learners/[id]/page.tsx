// app/cm/learners/[id]/page.tsx - Learner Detail & Progress
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Calendar, Award, TrendingUp, FileText, Plus } from "lucide-react";

type LearnerDetail = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  enrollments: EnrollmentDetail[];
  notes: CaseNote[];
};

type EnrollmentDetail = {
  id: string;
  program_title: string;
  program_slug: string;
  status: string;
  funding_type: string | null;
  started_at: string | null;
  completed_at: string | null;
  percent_complete: number;
  certificate_url: string | null;
};

type CaseNote = {
  id: string;
  note_type: string;
  note: string;
  created_at: string;
  case_manager_name: string;
};

export default function LearnerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [learner, setLearner] = useState<LearnerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("check_in");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/cm/learners/${params.id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load learner");
        setLearner(json.learner);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading learner");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  async function handleAddNote() {
    if (!newNote.trim()) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/cm/learners/${params.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note_type: noteType,
          note: newNote,
        }),
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to add note");
      
      // Reload learner data
      const reloadRes = await fetch(`/api/cm/learners/${params.id}`);
      const reloadJson = await reloadRes.json();
      if (reloadRes.ok) {
        setLearner(reloadJson.learner);
      }
      
      setNewNote("");
      setShowNoteForm(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to add note");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Learner Details</h1>
          <p className="text-sm text-gray-600 mt-1">Loading…</p>
        </div>
      </div>
    );
  }

  if (error || !learner) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Learner Details</h1>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error || "Learner not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => router.push("/cm")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {learner.first_name} {learner.last_name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Use this page to track this learner's pathway, funding, and completion progress
          </p>
        </div>

        {/* Learner Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Learner Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500">Full Name</p>
                <p className="text-sm text-gray-900">
                  {learner.first_name} {learner.last_name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{learner.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">{learner.phone || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollments */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Program Enrollments
          </h2>
          {learner.enrollments.length === 0 ? (
            <p className="text-sm text-gray-500">No enrollments found.</p>
          ) : (
            <div className="space-y-4">
              {learner.enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {enrollment.program_title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {enrollment.program_slug}
                      </p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        enrollment.status === "active"
                          ? "bg-green-100 text-green-700"
                          : enrollment.status === "completed"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Funding Type</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {enrollment.funding_type || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Started</p>
                      <p className="text-sm text-gray-900">
                        {enrollment.started_at
                          ? new Date(enrollment.started_at).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Completed</p>
                      <p className="text-sm text-gray-900">
                        {enrollment.completed_at
                          ? new Date(enrollment.completed_at).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-gray-500">Progress</p>
                      <p className="text-xs font-semibold text-gray-900">
                        {enrollment.percent_complete}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${enrollment.percent_complete}%` }}
                      />
                    </div>
                  </div>

                  {enrollment.certificate_url && (
                    <div className="pt-3 border-t border-gray-200">
                      <a
                        href={enrollment.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Award className="w-4 h-4" />
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Case Notes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Case Notes & Coordination
            </h2>
            <button
              onClick={() => setShowNoteForm(!showNoteForm)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>

          {showNoteForm && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note Type
                  </label>
                  <select
                    value={noteType}
                    onChange={(e) => setNoteType(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    <option value="check_in">Check-in</option>
                    <option value="barrier">Barrier</option>
                    <option value="win">Win</option>
                    <option value="coordination">Coordination</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Enter your note here..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNote}
                    disabled={saving || !newNote.trim()}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                  <button
                    onClick={() => {
                      setShowNoteForm(false);
                      setNewNote("");
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {learner.notes.length === 0 ? (
            <p className="text-sm text-gray-500">No notes yet. Add your first note above.</p>
          ) : (
            <div className="space-y-3">
              {learner.notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        note.note_type === "barrier"
                          ? "bg-red-100 text-red-700"
                          : note.note_type === "win"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {note.note_type.replace("_", " ")}
                    </span>
                    <div className="text-xs text-gray-500">
                      {new Date(note.created_at).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-900">{note.note}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By: {note.case_manager_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
