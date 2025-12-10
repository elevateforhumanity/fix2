// app/apply/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TOTAL_STEPS = 5;

interface FormData {
  // Step 1: Eligibility
  age18Plus: boolean;
  legalToWork: boolean;
  marionCounty: boolean;
  employmentStatus: string;
  
  // Step 2: Personal Info
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  zip: string;
  
  // Step 3: Program Selection
  program: string;
  timeline: string;
  goals: string;
  
  // Step 4: Support Needs
  transportation: string;
  childcare: boolean;
  supportNotes: string;
  
  // Step 5: Contact Preferences
  contactMethod: string;
  contactTime: string;
  referralSource: string;
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age18Plus: false,
    legalToWork: false,
    marionCounty: false,
    employmentStatus: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    zip: "",
    program: "",
    timeline: "",
    goals: "",
    transportation: "",
    childcare: false,
    supportNotes: "",
    contactMethod: "phone",
    contactTime: "",
    referralSource: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Auto-save to localStorage (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem('applicationDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || formData);
        setCurrentStep(parsed.currentStep || 1);
      } catch (e) {
        console.error('Failed to load saved application');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('applicationDraft', JSON.stringify({ formData, currentStep }));
  }, [formData, currentStep]);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setCity("");
      setZip("");
      setProgram("Barber Apprenticeship");
      setSupportNotes("");
      setContactMethod("phone");
      setMathAnswer("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your application. Please try again or call 317-314-3757.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero / Intro */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
            Your journey starts here
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Apply for Free Career Training
          </h1>
          <p className="text-slate-700 max-w-2xl mb-4">
            You&apos;re taking the first step toward a better future. This application helps us 
            understand your goals, interests, and any support you might need. There&apos;s no cost, 
            no commitment—just an opportunity to explore what&apos;s possible.
          </p>
          <p className="text-sm text-slate-700 mb-2">
            After you submit, a real person (not a bot!) will reach out within 1–2 business days
            to discuss programs, funding options, and answer your questions.
          </p>
          <p className="text-sm text-slate-800 font-semibold">
            Need help right now? Call us at{" "}
            <a href="tel:13173143757" className="underline">
              317-314-3757
            </a>{" "}
            — we&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
        {/* Application Form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Quick Application
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Tell us a little about yourself. It takes about 2–3 minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setZip(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Program You&apos;re Most Interested In
              </label>
              <select
                value={program}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setProgram(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Barber Apprenticeship">Barber Apprenticeship</option>
                <option value="CNA / Healthcare">CNA / Healthcare</option>
                <option value="Skilled Trades / Building Technician">
                  Skilled Trades / Building Technician
                </option>
                <option value="Transportation / CDL">Transportation / CDL</option>
                <option value="Open to any opportunity">Open to any opportunity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Anything we should know to better support you?
                <span className="text-slate-400 font-normal"> (Optional)</span>
              </label>
              <p className="text-xs text-slate-500 mb-1">
                For example: justice involvement, housing needs, childcare, transportation, 
                technology access, or anything else you&apos;re comfortable sharing.
              </p>
              <textarea
                value={supportNotes}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setSupportNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-slate-700 mb-1">
                Best way to contact you
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={contactMethod === "phone"}
                    onChange={() => setContactMethod("phone")}
                  />
                  <span>Phone Call</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="text"
                    checked={contactMethod === "text"}
                    onChange={() => setContactMethod("text")}
                  />
                  <span>Text Message</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={contactMethod === "email"}
                    onChange={() => setContactMethod("email")}
                  />
                  <span>Email</span>
                </label>
              </div>
            </div>

            {/* Simple math verification */}
            <div className="border border-amber-300 bg-amber-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                <span role="img" aria-label="shield">
                  🔒
                </span>
                Complete verification to submit
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-700">6 + 7 =</span>
                <input
                  type="number"
                  value={mathAnswer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setMathAnswer(e.target.value)}
                  className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                <span className="text-xs text-slate-500">Anti-spam check</span>
              </div>
              <p className="text-[11px] text-slate-500">
                By submitting this form, you are giving Elevate for Humanity permission to contact you 
                about training, funding, and support services. This is not a credit application and will 
                not impact your credit score.
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-emerald-600">
                Thank you! Your application has been received. Our team will contact you within 1–2 business days.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>

            <p className="text-xs text-slate-500">
              Questions? Call us at{" "}
              <a href="tel:13173143757" className="underline">
                317-314-3757
              </a>
              .
            </p>
          </form>
        </div>

        {/* How to Enroll / Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              How to Enroll – Step by Step
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Follow these simple steps to start your free training through Indiana Career Connect.
            </p>

            <ol className="space-y-4 text-sm text-slate-700">
              <li>
                <span className="font-semibold">1. Visit Indiana Career Connect</span>
                <p>
                  Go to{" "}
                  <a
                    href="https://www.indianacareerconnect.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 underline"
                  >
                    www.indianacareerconnect.com
                  </a>{" "}
                  and create your free account. This is the official portal for all WIOA-funded training programs in Indiana.
                </p>
              </li>
              <li>
                <span className="font-semibold">2. Complete Your Profile</span>
                <p>
                  Fill out your profile with your work history, education, and career goals. This helps us match you with 
                  the right training program and funding options.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  What you&apos;ll need: Social Security Number, proof of residency, income documentation (if applicable), 
                  and high school diploma or GED.
                </p>
              </li>
              <li>
                <span className="font-semibold">3. Schedule Your Appointment</span>
                <p>
                  Book an appointment with a career advisor through the Indiana Career Connect portal. They will review 
                  your eligibility for WIOA funding and help you choose the right program.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <strong>In-Person:</strong> Visit a WorkOne center near you. <br />
                  <strong>Virtual:</strong> Schedule a video call appointment.
                </p>
              </li>
              <li>
                <span className="font-semibold">4. Meet with Your Advisor</span>
                <p>
                  Your career advisor will verify your eligibility, explain funding options, and help you select Elevate 
                  for Humanity as your training provider. They&apos;ll also discuss supportive services like transportation 
                  and childcare assistance.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Tip: Mention you want to train with Elevate for Humanity. We&apos;re an approved WIOA provider in Marion County.
                </p>
              </li>
              <li>
                <span className="font-semibold">5. Get Approved & Enroll</span>
                <p>
                  Once approved for WIOA funding, your advisor will issue a training voucher. Bring this to Elevate for 
                  Humanity to complete your enrollment. We&apos;ll handle all the paperwork and get you started!
                </p>
              </li>
            </ol>
          </div>

          <div className="bg-slate-900 text-slate-50 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold">Need Help with the Process?</h3>
            <p className="text-xs text-slate-200">
              Our team can guide you through every step of the Indiana Career Connect process. We&apos;re here to make enrollment 
              as easy as possible.
            </p>
            <div className="space-y-2 text-xs">
              <p>
                📞 Call{" "}
                <a href="tel:13173143757" className="underline">
                  317-314-3757
                </a>
              </p>
              <p>✉️ Email Us</p>
              <p>📅 Schedule Advising Call</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
