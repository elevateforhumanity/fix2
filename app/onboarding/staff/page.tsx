"use client";

import Link from "next/link";
import { useState } from "react";

export default function StaffOnboarding() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    role: "",
    resume: null as File | null,
    certifications: null as File | null,
    id_upload: null as File | null,
    professional_boundaries: false,
    communication_standards: false,
    document_progress: false,
    report_incidents: false,
    signature: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Staff onboarding submitted:", formData);
    alert("Application submitted! HR will contact you within 2-3 business days.");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/onboarding" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm">
            ← Back to Onboarding Hub
          </Link>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold">Staff Onboarding Form</h1>
          <p className="mt-2 text-slate-300">Join the Elevate For Humanity team</p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input type="text" required value={formData.full_name}
onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input type="tel" required value={formData.phone}
onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input type="email" required value={formData.email}
onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Role *</label>
                <select required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none">
                  <option value="">Select role...</option>
                  <option value="instructor">Instructor</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                  <option value="outreach">Outreach</option>
                  <option value="case-manager">Case Manager</option>
                  <option value="digital-support">Digital Support</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Resume *</label>
                <input type="file" required accept=".pdf,.doc,.docx"
onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})} className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">ID Upload *</label>
                <input type="file" required accept=".pdf,.jpg,.jpeg,.png"
onChange={(e) => setFormData({...formData, id_upload: e.target.files?.[0] || null})} className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Certifications (if applicable)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFormData({...formData, certifications: e.target.files?.[0] || null})}
className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/40 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
            <h2 className="text-xl font-bold mb-4">Staff Acknowledgments</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={formData.professional_boundaries}
onChange={(e) => setFormData({...formData, professional_boundaries: e.target.checked})} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500" />
                <span className="text-sm">I will maintain professional boundaries with learners and partners</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={formData.communication_standards}
onChange={(e) => setFormData({...formData, communication_standards: e.target.checked})} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500" />
                <span className="text-sm">I will follow Elevate communication standards</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={formData.document_progress}
onChange={(e) => setFormData({...formData, document_progress: e.target.checked})} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500" />
                <span className="text-sm">I will document attendance, progress, and coaching notes</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={formData.report_incidents}
onChange={(e) => setFormData({...formData, report_incidents: e.target.checked})} className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500" />
                <span className="text-sm">I will report safety, behavioral, or compliance issues immediately</span>
              </label>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Digital Signature *</label>
              <input type="text" required value={formData.signature}
onChange={(e) => setFormData({...formData, signature: e.target.value})} placeholder="Type your full name" className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none" />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/40 hover:bg-orange-400 transition">Submit Application</button>
            <Link href="/onboarding" className="rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold hover:bg-white/10 transition">Cancel</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
