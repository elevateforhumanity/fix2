import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/schedule',
  },
  title: 'Schedule an Appointment | Elevate for Humanity',
  description:
    'Book an appointment with Elevate for Humanity. We are appointment-based for information and advising.',
};

export default function SchedulePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Schedule an Appointment
        </h1>

        <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
          We are <span className="font-semibold">appointment-based</span> for
          information and advising. Start by completing the Inquiry Form, then
          book your WorkOne appointment, and schedule your Elevate for Humanity
          appointment below.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-gray-900 text-white hover:opacity-90"
          >
            Start Inquiry Form
          </Link>

          <a
            href="https://www.indianacareerconnect.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-gray-300 hover:bg-gray-50"
          >
            Book WorkOne Appointment
          </a>

          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border border-gray-300 hover:bg-gray-50"
          >
            Book EFH Appointment
          </a>
        </div>

        <div className="mt-6 rounded-2xl border bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900">
            What to tell WorkOne
          </p>
          <p className="mt-1 text-sm text-gray-700">
            When you schedule, tell them you're there for{' '}
            <span className="font-semibold">"Elevate for Humanity"</span>{' '}
            training/funding support.
          </p>
        </div>

        <div id="book" className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Book your EFH appointment
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Choose a time that works for you. If you don't see availability,
            submit the inquiry form and we'll follow up.
          </p>

          <div className="mt-4 rounded-2xl border bg-white overflow-hidden">
            <CalendlyEmbed />
          </div>

          <p className="mt-3 text-xs text-gray-600">
            If the calendar does not load, use this link:{' '}
            <a
              className="underline"
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
              target="_blank"
              rel="noreferrer"
            >
              Open Calendly
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!url) {
    return (
      <div className="p-4">
        <p className="text-sm text-red-700 font-semibold">
          Calendly is not configured.
        </p>
        <p className="text-sm text-gray-700 mt-1">
          Add <span className="font-mono">NEXT_PUBLIC_CALENDLY_URL</span> in
          Vercel → Environment Variables.
        </p>
      </div>
    );
  }

  return (
    <iframe
      title="Calendly Scheduling"
      src={`${url}?hide_gdpr_banner=1`}
      className="w-full"
      style={{ height: 820 }}
      frameBorder="0"
      scrolling="no"
      allow="camera; microphone; fullscreen"
    />
  );
}
