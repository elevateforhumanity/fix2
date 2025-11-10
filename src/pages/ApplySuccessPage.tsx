import { Section, Button } from '../components/ds';

export default function ApplySuccessPage() {
  return (
    <main className="bg-white">
      <Section spacing="lg">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Application received</h1>
          <p className="mt-4 text-lg text-slate-700">
            Thanks for applying! We'll review your details and contact you soon with funding options and placement steps.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            We typically respond within 1–2 business days.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/?applied=1">
              <Button variant="primary">Back to home</Button>
            </a>
            <a href="/programs">
              <Button variant="secondary">View programs</Button>
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
