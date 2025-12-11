// app/apply/QuickApplyFormClient.tsx
'use client';

import { useState } from 'react';

type ProgramOption =
  | 'barber'
  | 'cna'
  | 'medical-assistant'
  | 'hvac'
  | 'cdl'
  | 'building-technician'
  | 'tax-finance'
  | 'business-startup'
  | 'other';

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  zip: string;
  program: ProgramOption | '';
  hasCaseManager: 'yes' | 'no' | '';
  caseManagerAgency: string;
  supportNeeds: string;
  preferredContact: 'call' | 'text' | 'email' | '';
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  zip: '',
  program: '',
  hasCaseManager: '',
  caseManagerAgency: '',
  supportNeeds: '',
  preferredContact: '',
};

export default function QuickApplyFormClient() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.firstName.trim()) return 'Please enter your first name.';
    if (!form.lastName.trim()) return 'Please enter your last name.';
    if (!form.phone.trim()) return 'Please enter a phone number.';
    if (!form.email.trim()) return 'Please enter an email address.';
    if (!form.city.trim()) return 'Please enter your city.';
    if (!form.zip.trim()) return 'Please enter your ZIP code.';
    if (!form.program)
      return 'Please choose the program you are most interested in.';
    if (!form.preferredContact)
      return 'Please choose how you prefer to be contacted.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Failed to submit application.');
      }

      setSuccessMessage(
        'Thank you! Your application has been received. Someone from Elevate for Humanity will contact you within 1–2 business days.'
      );
      setForm(initialState);
    } catch (err) {
      setErrorMessage(
        'Something went wrong submitting your application. Please try again, or call 317-314-3757.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {successMessage}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            First Name *
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Last Name *
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            City *
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            ZIP Code *
          </label>
          <input
            name="zip"
            value={form.zip}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Program you&apos;re most interested in *
        </label>
        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Select a program</option>
          <option value="barber">Barber Apprenticeship</option>
          <option value="cna">CNA / Healthcare</option>
          <option value="medical-assistant">Medical Assistant</option>
          <option value="hvac">HVAC / Building Trades</option>
          <option value="cdl">CDL / Transportation</option>
          <option value="building-technician">Building Technician</option>
          <option value="tax-finance">Tax &amp; Finance</option>
          <option value="business-startup">Business Startup</option>
          <option value="other">I&apos;m not sure / Other</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Do you have a case manager? *
          </label>
          <select
            name="hasCaseManager"
            value={form.hasCaseManager}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select one</option>
            <option value="yes">Yes, I have a case manager</option>
            <option value="no">No, I do not</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            If yes, what agency? (WorkOne, probation, housing, etc.)
          </label>
          <input
            name="caseManagerAgency"
            value={form.caseManagerAgency}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Anything we should know to better support you? (Optional)
        </label>
        <p className="text-[11px] text-slate-500 mb-1">
          For example: justice involvement, housing needs, childcare,
          transportation, returning home, mental health, or anything else.
        </p>
        <textarea
          name="supportNeeds"
          value={form.supportNeeds}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          How do you prefer we contact you? *
        </label>
        <div className="flex flex-wrap gap-3 mt-1">
          {['call', 'text', 'email'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  preferredContact: method as FormState['preferredContact'],
                }))
              }
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold border transition ${
                form.preferredContact === method
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {method === 'call'
                ? 'Phone Call'
                : method === 'text'
                  ? 'Text Message'
                  : 'Email'}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit My Application'}
        </button>
        <p className="mt-2 text-[11px] text-slate-500">
          By submitting, you agree that Elevate for Humanity may contact you
          about programs, funding, and support services. We do not sell your
          information.
        </p>
      </div>
    </form>
  );
}
