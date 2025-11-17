import Link from 'next/link';

export default function MOU() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/onboarding"
            className="text-orange-400 hover:text-orange-300 text-sm"
          >
            ← Back
          </Link>
          <h1 className="mt-4 text-3xl font-bold">
            Memorandum of Understanding (MOU)
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            Partnership Agreement Template
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-12 prose prose-invert prose-orange max-w-none">
        <p className="text-lg">
          Between Elevate For Humanity™ and Partner Organization
        </p>

        <h2>1. Purpose</h2>
        <p>
          This MOU outlines expectations for collaboration in workforce
          training, education, apprenticeship, and employment pathways.
        </p>

        <h2>2. Elevate For Humanity™ Responsibilities</h2>
        <ul>
          <li>Provide accurate program information to learners and partners</li>
          <li>
            Support learners through coaching, case management, and navigation
          </li>
          <li>Maintain clear communication with all partners</li>
          <li>Follow privacy laws and protect learner information</li>
          <li>Document progress and outcomes for reporting purposes</li>
          <li>Coordinate with partners to ensure smooth learner transitions</li>
        </ul>

        <h2>3. Partner Responsibilities</h2>
        <ul>
          <li>Provide safe, appropriate learning or work environments</li>
          <li>Notify Elevate of any issues affecting learner progress</li>
          <li>Respect confidentiality and privacy requirements</li>
          <li>Communicate schedule changes or program updates promptly</li>
          <li>Provide honest feedback about learner performance</li>
          <li>Follow all applicable state and federal regulations</li>
        </ul>

        <h2>4. Communication Standards</h2>
        <ul>
          <li>Both parties agree to respond within 1-2 business days</li>
          <li>Document important agreements in writing</li>
          <li>Escalate urgent issues immediately</li>
          <li>Maintain professional communication at all times</li>
        </ul>

        <h2>5. Data Sharing & Privacy</h2>
        <ul>
          <li>Share only necessary information for services or placement</li>
          <li>Protect learner data according to FERPA and privacy laws</li>
          <li>Obtain written consent before sharing sensitive information</li>
          <li>Use secure methods for transmitting documents</li>
        </ul>

        <h2>6. Term & Termination</h2>
        <p>
          This MOU is effective upon signature and remains in effect until
          terminated by either party with 30 days written notice.
        </p>

        <h2>7. Modification</h2>
        <p>
          This MOU may be modified by mutual written agreement of both parties.
        </p>

        <div className="mt-12 p-6 rounded-2xl border border-orange-400/40 bg-slate-900">
          <h3 className="text-xl font-bold mb-6">Signatures</h3>
          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-2">Elevate For Humanity™</p>
              <p className="text-sm text-slate-400">
                Signature: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Name: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Title: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Date: ____________________
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Partner Organization</p>
              <p className="text-sm text-slate-400">
                Signature: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Name: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Title: ____________________
              </p>
              <p className="text-sm text-slate-400">
                Date: ____________________
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-slate-900 border border-white/10">
          <p className="text-sm text-slate-400">
            <strong>Note:</strong> This is a template. Please download,
            customize for your specific partnership, and have both parties sign
            before beginning collaboration.
          </p>
        </div>
      </section>
    </main>
  );
}
