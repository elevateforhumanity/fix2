'use client';
import { useState } from 'react';
import { FileText, Download } from 'lucide-react';

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FileText className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
          <p className="text-xl text-purple-50">Create a professional resume in minutes</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="John Doe" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="(317) 555-0100" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Summary</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Brief summary of your experience and goals..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Work Experience</label>
              <textarea rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="List your work experience..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Education & Certifications</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="List your education and certifications..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Skills</label>
              <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="List your key skills..." />
            </div>
            <button type="button" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">
              <Download size={20} />
              Download Resume
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
