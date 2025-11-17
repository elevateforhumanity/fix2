'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LearnerOnboarding() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
    emergency_name: '',
    emergency_phone: '',
    program: '',
    employment_status: '',
    support_needs: [] as string[],
    goals: '',
    attendance_commitment: false,
    handbook_read: false,
    privacy_understood: false,
    signature: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to Supabase or API
    console.log('Form submitted:', formData);
    alert("Application submitted! We'll contact you within 1-2 business days.");
  };

  const toggleSupport = (support: string) => {
    setFormData((prev) => ({
      ...prev,
      support_needs: prev.support_needs.includes(support)
        ? prev.support_needs.filter((s) => s !== support)
        : [...prev.support_needs, support],
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm"
          >
            ← Back to Onboarding Hub
          </Link>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold">
            Learner Onboarding Form
          </h1>
          <p className="mt-2 text-slate-300">
            Start your journey with Elevate For Humanity
          </p>
        </div>
      </header>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PERSONAL INFO */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EMERGENCY CONTACT */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Emergency Contact</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.emergency_name}
                  onChange={(e) =>
                    setFormData({ ...formData, emergency_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.emergency_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergency_phone: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* PROGRAM SELECTION */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Program Interest</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Program of Interest *
                </label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                >
                  <option value="">Select a program...</option>
                  <option value="medical-assistant">Medical Assistant</option>
                  <option value="barber">Barber Apprenticeship</option>
                  <option value="hvac">HVAC Technician</option>
                  <option value="building-tech">
                    Building Maintenance Technician
                  </option>
                  <option value="workforce-readiness">
                    Workforce Readiness & Re-Entry
                  </option>
                  <option value="undecided">Undecided / Need Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Employment Status *
                </label>
                <select
                  required
                  value={formData.employment_status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employment_status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                >
                  <option value="">Select status...</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="underemployed">Underemployed</option>
                  <option value="part-time">Part-Time</option>
                  <option value="full-time">Full-Time</option>
                  <option value="re-entry">Re-entry</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUPPORT NEEDS */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Support Needed</h2>
            <p className="text-sm text-slate-400 mb-4">
              Select any barriers we can help you navigate:
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Transportation',
                'Childcare',
                'Housing',
                'Career Direction',
                'Technology Device',
                'GED/Testing Help',
                'Background Support',
              ].map((support) => (
                <label
                  key={support}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.support_needs.includes(support)}
                    onChange={() => toggleSupport(support)}
                    className="w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm">{support}</span>
                </label>
              ))}
            </div>
          </div>

          {/* GOALS */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold mb-4">Your Goals</h2>

            <div>
              <label className="block text-sm font-semibold mb-2">
                What are you hoping to achieve? *
              </label>
              <textarea
                required
                value={formData.goals}
                onChange={(e) =>
                  setFormData({ ...formData, goals: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
                placeholder="Tell us about your career goals, what you hope to learn, and how this program fits into your plans..."
              />
            </div>
          </div>

          {/* ACKNOWLEDGMENTS */}
          <div className="rounded-2xl border border-orange-400/40 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
            <h2 className="text-xl font-bold mb-4">Acknowledgments</h2>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.handbook_read}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      handbook_read: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500 focus:ring-orange-400"
                />
                <span className="text-sm">
                  I have read the{' '}
                  <Link
                    href="/onboarding/handbook"
                    className="text-orange-400 hover:underline"
                  >
                    Universal Responsibilities Handbook
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacy_understood}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      privacy_understood: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500 focus:ring-orange-400"
                />
                <span className="text-sm">
                  I understand Elevate's privacy expectations and professional
                  communication standards
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.attendance_commitment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendance_commitment: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500 focus:ring-orange-400"
                />
                <span className="text-sm">
                  I understand attendance is required and I will communicate
                  absences in advance
                </span>
              </label>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">
                Digital Signature *
              </label>
              <input
                type="text"
                required
                value={formData.signature}
                onChange={(e) =>
                  setFormData({ ...formData, signature: e.target.value })
                }
                placeholder="Type your full name"
                className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-2 text-white focus:border-orange-400 focus:outline-none"
              />
              <p className="mt-2 text-xs text-slate-400">
                By typing your name, you agree to the terms and conditions
                outlined above.
              </p>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/40 hover:bg-orange-400 transition"
            >
              Submit Application
            </button>
            <Link
              href="/onboarding"
              className="rounded-full border-2 border-white/20 px-8 py-4 text-base font-semibold hover:bg-white/10 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
