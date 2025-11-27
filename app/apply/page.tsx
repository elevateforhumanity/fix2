"use client";

import { useState } from "react";
import { getProgramsWithEnrollmentMeta } from "@/lms-data/enrollment";
import type { ProgramEnrollmentConfig } from "@/lms-data/enrollment";
import { EligibilityBadges } from "@/components/enrollment/EligibilityBadges";

const programsWithEnrollment = getProgramsWithEnrollmentMeta();

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  zipCode: string;
  preferredProgramId: string;
  hasWorkOneCaseManager: string;
  currentlyEmployed: string;
  householdIncomeRange: string;
  interestedInEarnWhileLearn: string;
  fundingNotes: string;
  howDidYouHear: string;
  anythingElse: string;
}

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  zipCode: "",
  preferredProgramId: "",
  hasWorkOneCaseManager: "",
  currentlyEmployed: "",
  householdIncomeRange: "",
  interestedInEarnWhileLearn: "",
  fundingNotes: "",
  howDidYouHear: "",
  anythingElse: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedConfig: ProgramEnrollmentConfig | undefined =
    programsWithEnrollment.find((p) => p.program.id === form.preferredProgramId)
      ?.enrollment;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.firstName || !form.lastName || !form.email || !form.preferredProgramId) {
      setError("Please fill in your name, email, and choose a program.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/enroll/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Application could not be submitted.");
      }

      setSubmitted(true);
      setForm(initialFormState);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Something went wrong submitting your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Start Here
          </p>
          <h1 className="mt-1 text-2xl font-bold">Apply to Elevate Programs</h1>
          <p className="mt-2 text-xs text-slate-300">
            Answer a few questions so we can match you to the right program and
            funding path. After you submit, a team member will follow up with
            next steps, including any JRI, WRG, WEX, OJT, apprenticeship, or
            state/federal funding options you may qualify for.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            This form does not lock you into one program forever. It starts the
            conversation and helps us understand your goals.
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="grid gap-6 md:grid-cols-[1.6fr,1.1fr]">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              {submitted && (
                <div className="mb-3 rounded-md border border-green-500/60 bg-green-900/20 px-3 py-2 text-[11px] text-green-200">
                  Thank you! Your application was submitted. A member of the
                  Elevate team will review it and follow up with you about next
                  steps, funding, and start dates.
                </div>
              )}

              {error && (
                <div className="mb-3 rounded-md border border-red-500/60 bg-red-900/30 px-3 py-2 text-[11px] text-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) =>
                        updateField("dateOfBirth", e.target.value)
                      }
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={form.zipCode}
                      onChange={(e) => updateField("zipCode", e.target.value)}
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-100">
                    Which program are you MOST interested in right now? *
                  </label>
                  <select
                    value={form.preferredProgramId}
                    onChange={(e) =>
                      updateField("preferredProgramId", e.target.value)
                    }
                    className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                  >
                    <option value="">Select a program</option>
                    {programsWithEnrollment.map(({ program, enrollment }) => (
                      <option key={program.id} value={program.id}>
                        {enrollment?.label || program.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Do you currently have a WorkOne / workforce case manager?
                    </label>
                    <select
                      value={form.hasWorkOneCaseManager}
                      onChange={(e) =>
                        updateField("hasWorkOneCaseManager", e.target.value)
                      }
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Are you currently working?
                    </label>
                    <select
                      value={form.currentlyEmployed}
                      onChange={(e) =>
                        updateField("currentlyEmployed", e.target.value)
                      }
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    >
                      <option value="">Select</option>
                      <option value="full-time">Yes, full-time</option>
                      <option value="part-time">Yes, part-time</option>
                      <option value="not-working">No, not currently working</option>
                      <option value="gig">Gig / side work only</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      About what is your household income per year?
                    </label>
                    <select
                      value={form.householdIncomeRange}
                      onChange={(e) =>
                        updateField("householdIncomeRange", e.target.value)
                      }
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="under-20k">Under $20,000</option>
                      <option value="20-40k">$20,000 – $40,000</option>
                      <option value="40-60k">$40,000 – $60,000</option>
                      <option value="60plus">Above $60,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Are you interested in earn-while-you-learn options?
                    </label>
                    <select
                      value={form.interestedInEarnWhileLearn}
                      onChange={(e) =>
                        updateField("interestedInEarnWhileLearn", e.target.value)
                      }
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes, definitely</option>
                      <option value="maybe">Maybe / tell me more</option>
                      <option value="no">Not at this time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-100">
                    Do you receive SNAP, TANF, SSI/SSDI, or other benefits?
                  </label>
                  <textarea
                    value={form.fundingNotes}
                    onChange={(e) =>
                      updateField("fundingNotes", e.target.value)
                    }
                    placeholder="Only share what you're comfortable sharing. This helps us understand grant eligibility."
                    className="mt-1 min-h-[60px] w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-100"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      How did you hear about Elevate?
                    </label>
                    <input
                      type="text"
                      value={form.howDidYouHear}
                      onChange={(e) =>
                        updateField("howDidYouHear", e.target.value)
                      }
                      placeholder="Friend, social media, WorkOne, employer, etc."
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-100">
                      Anything else you want us to know?
                    </label>
                    <input
                      type="text"
                      value={form.anythingElse}
                      onChange={(e) =>
                        updateField("anythingElse", e.target.value)
                      }
                      placeholder="Barriers, goals, timelines, etc."
                      className="mt-1 h-8 w-full rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>

                <p className="mt-2 text-[10px] text-slate-500">
                  By submitting, you agree to be contacted by Elevate for
                  Humanity about programs and funding options. This is not a
                  credit application or a guarantee of funding.
                </p>
              </form>
            </div>

            <aside className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px]">
                <p className="text-[11px] font-semibold text-slate-100">
                  Program Snapshot
                </p>
                {selectedConfig ? (
                  <>
                    <p className="mt-1 text-slate-200">
                      {selectedConfig.label}
                    </p>
                    <p className="mt-1 text-slate-300">
                      {selectedConfig.shortDescription}
                    </p>
                    {selectedConfig.tuitionRange && (
                      <p className="mt-1 text-slate-200">
                        Tuition (estimated):{" "}
                        <span className="text-slate-100">
                          {selectedConfig.tuitionRange}
                        </span>
                      </p>
                    )}
                    {(selectedConfig.typicalDurationWeeks ||
                      selectedConfig.typicalHoursPerWeek) && (
                      <p className="mt-1 text-slate-200">
                        Typical schedule:
                        <span className="ml-1 text-slate-100">
                          {selectedConfig.typicalHoursPerWeek
                            ? `${selectedConfig.typicalHoursPerWeek} hrs/week`
                            : ""}
                          {selectedConfig.typicalDurationWeeks
                            ? ` for ${selectedConfig.typicalDurationWeeks} weeks`
                            : ""}
                        </span>
                      </p>
                    )}
                    <EligibilityBadges config={selectedConfig} />
                    <p className="mt-2 text-[10px] text-slate-500">
                      Final funding will be confirmed after an intake
                      conversation and review of eligibility with workforce
                      partners (like WorkOne, EmployIndy, or others).
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-slate-300">
                    Choose a program on the left to see a snapshot of tuition,
                    schedule, and potential funding options.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px]">
                <p className="text-[11px] font-semibold text-slate-100">
                  Funding & "Earn While You Learn"
                </p>
                <p className="mt-1 text-slate-300">
                  Elevate works with JRI, WRG, WEX, OJT, apprenticeships,
                  employers, and philanthropy to reduce or remove out-of-pocket
                  costs where possible. Answering funding questions honestly
                  helps us match you to the best option.
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-300">
                  <li>Some programs may be fully grant-funded.</li>
                  <li>
                    Some use WEX, OJT, or apprenticeship so you earn while you
                    train.
                  </li>
                  <li>
                    Some allow self-pay or payment plans when grants are not
                    available.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
