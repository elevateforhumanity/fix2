import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certified Nursing Assistant (CNA) Career Pathway | Elevate for Humanity',
  description: 'A workforce-funded, employer-connected healthcare training program.',
};

export default function CNAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-brandPrimary text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            ⭐ CERTIFIED NURSING ASSISTANT (CNA) CAREER PATHWAY
          </h1>
          <p className="text-xl">
            A workforce-funded, employer-connected healthcare training program.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Program Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">🌟 Program Overview</h2>
          <p className="text-gray-700 mb-4">
            The Elevate For Humanity Certified Nursing Assistant (CNA) Career Pathway prepares students for entry-level healthcare roles in long-term care, hospitals, home health, clinics, and rehabilitation settings.
          </p>
          <p className="text-gray-700 mb-4">This program combines:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>State-approved CNA training through HSI/Choice Medical Institute</li>
            <li>National Drug-Free Workplace training</li>
            <li>CareerSafe Healthcare Safety Basics</li>
            <li>Job Ready Indy (JRI) Soft Skills Certificate</li>
            <li>Hands-on skills practice</li>
            <li>Direct job placement assistance</li>
            <li>Eligibility for paid Work Experience (WEX) and On-the-Job Training (OJT)</li>
          </ul>
          <p className="text-gray-700">
            Students graduate fully prepared to take the Indiana State CNA Competency Exam and transition directly into paid healthcare roles.
          </p>
        </section>

        {/* Training Components */}
        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-brandBlack mb-6">
            🧪 Training Components (Automatically Added When You Enroll)
          </h2>

          {/* HSI / Choice Medical */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-brandBlack mb-3">
              1. HSI / Choice Medical CNA Training
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>CNA theory + skills training</li>
              <li>Clinical skills preparation</li>
              <li>Infection control</li>
              <li>Activities of daily living</li>
              <li>Communication skills</li>
              <li>Ethics & patient rights</li>
              <li>Charting & documentation</li>
              <li>100% aligned with Indiana CNA exam standards</li>
            </ul>
          </div>

          {/* National Drug */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-brandBlack mb-3">
              2. National Drug Training
            </h3>
            <p className="text-gray-700 mb-2">
              Ensures students meet employer requirements for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Drug-free workplace policies</li>
              <li>Safety & compliance</li>
              <li>Healthcare professionalism</li>
            </ul>
          </div>

          {/* CareerSafe */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-brandBlack mb-3">
              3. CareerSafe Healthcare Safety Module
            </h3>
            <p className="text-gray-700 mb-2">Covers:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>OSHA basics</li>
              <li>Healthcare safety culture</li>
              <li>Bloodborne pathogens</li>
              <li>Patient interaction safety</li>
            </ul>
          </div>

          {/* JRI */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-brandBlack mb-3">
              4. Job Ready Indy Soft Skills Certificate (FREE)
            </h3>
            <p className="text-gray-700 mb-2">
              Required by most workforce programs + employers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Professional communication</li>
              <li>Self-management</li>
              <li>Workplace etiquette</li>
              <li>Teamwork</li>
              <li>Customer service mindset</li>
            </ul>
          </div>
        </section>

        {/* Tuition & Payment */}
        <section className="mb-12 bg-brandPrimary text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">💳 Tuition & Payment Options</h2>
          <p className="text-2xl font-bold mb-4">Total Tuition: $600</p>
          <p className="text-sm mb-6">(Retail value based on partner costs: $400, EFH markup 50%)</p>
          
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">✔ Pay in Full or</p>
            <p className="text-lg font-semibold mb-4">✔ Automatic Payment Plan (No credit check)</p>
            
            <p className="mb-2">You choose:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Pay In Full:</strong> $600</li>
              <li><strong>Payment Plan:</strong> 3 monthly payments (Stripe auto-charges your card)</li>
            </ul>
          </div>

          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <p className="text-sm">
              As soon as the first Stripe payment is processed, your training seats from all credential partners are automatically purchased and your CNA course unlocks instantly.
            </p>
            <p className="text-sm font-bold mt-2">
              You never wait — your program is ready immediately.
            </p>
          </div>

          <div className="flex gap-4">
            <form action="/api/checkout/program?mode=full&id=cna" method="POST" className="flex-1">
              <button
                type="submit"
                className="w-full bg-white text-brandPrimary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                🔴 Pay In Full (Start Immediately)
              </button>
            </form>
            <form action="/api/checkout/program?mode=plan&id=cna" method="POST" className="flex-1">
              <button
                type="submit"
                className="w-full bg-brandOrange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
              >
                🟠 Payment Plan (Start Immediately)
              </button>
            </form>
          </div>
        </section>

        {/* Funding Options */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            🏛 Funding Options (May Reduce Your Cost to $0)
          </h2>
          <p className="text-gray-700 mb-4">This program is approved for:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Workforce Ready Grant (WRG)</li>
            <li>WIOA Adult, Youth & Dislocated Worker</li>
            <li>Job Ready Indy (JRI) incentives</li>
            <li>Work Experience (WEX)</li>
            <li>OJT (wage reimbursement for employers)</li>
          </ul>
          <p className="text-gray-700 font-semibold">
            Most students pay $0 out-of-pocket after funding and begin earning income during WEX.
          </p>
        </section>

        {/* What Happens When You Enroll */}
        <section className="mb-12 bg-blue-50 p-6 rounded-lg border-l-4 border-brandBlue">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            🚀 What Happens When You Enroll (Seamless Automation)
          </h2>
          <p className="text-gray-700 mb-4">When you click Enroll:</p>
          <ol className="space-y-2 text-gray-700">
            <li>✔ <strong>Step 1</strong> — Stripe checks out (full or payment plan)</li>
            <li>✔ <strong>Step 2</strong> — EFH automatically purchases your CNA training seats</li>
            <li>✔ <strong>Step 3</strong> — National Drug + CareerSafe credentials unlock</li>
            <li>✔ <strong>Step 4</strong> — JRI is automatically added</li>
            <li>✔ <strong>Step 5</strong> — Your CNA dashboard activates</li>
            <li>✔ <strong>Step 6</strong> — You start training immediately</li>
          </ol>
          <div className="mt-6 bg-white p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">No waiting on staff.</p>
            <p className="text-gray-700 font-semibold">No delays.</p>
            <p className="text-gray-700 font-semibold">No manual setup.</p>
            <p className="text-gray-700 mt-2">
              Everything is automated, exactly like Coursera, Docebo, and major universities.
            </p>
          </div>
        </section>

        {/* Skills You Will Learn */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            👩‍⚕️ Skills You Will Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Patient care & safety</li>
              <li>Measuring vital signs</li>
              <li>Infection control procedures</li>
              <li>HIPAA & confidentiality</li>
              <li>Transfers & mobility</li>
            </ul>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Charting & documentation</li>
              <li>Professional communication</li>
              <li>Ethics & compliance</li>
              <li>Self-management & teamwork</li>
              <li>Occupational safety & patient interaction</li>
            </ul>
          </div>
        </section>

        {/* Credentials Earned */}
        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            🎓 Credentials Earned
          </h2>
          <p className="text-gray-700 mb-4">Students completing this pathway earn:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>HSI/Choice Certified Nursing Assistant Training Certificate</li>
            <li>National Drug Training Certificate</li>
            <li>CareerSafe Healthcare Safety Certificate</li>
            <li>Job Ready Indy Credential (Soft Skills)</li>
          </ul>
          <p className="text-gray-700">
            You will also be prepared to take the:
          </p>
          <p className="text-xl font-bold text-brandPrimary mt-2">
            Indiana State CNA Competency Exam
          </p>
        </section>

        {/* Job Placement */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            💼 Job Placement & WEX Pathway
          </h2>
          <p className="text-gray-700 mb-4">Graduates are eligible for:</p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-brandPrimary pl-4">
              <h3 className="text-xl font-semibold text-brandBlack mb-2">
                Paid Work Experience (WEX)
              </h3>
              <p className="text-gray-700">
                Work in healthcare settings earning wages funded by the workforce board.
              </p>
            </div>

            <div className="border-l-4 border-brandOrange pl-4">
              <h3 className="text-xl font-semibold text-brandBlack mb-2">
                On-the-Job Training (OJT)
              </h3>
              <p className="text-gray-700">
                Employers receive 50–75% wage reimbursement for hiring you.
              </p>
            </div>

            <div className="border-l-4 border-brandBlue pl-4">
              <h3 className="text-xl font-semibold text-brandBlack mb-2">
                Direct Hire Placement
              </h3>
              <p className="text-gray-700 mb-2">EFH partners with:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Assisted living facilities</li>
                <li>Rehab centers</li>
                <li>Hospitals</li>
                <li>Home care agencies</li>
                <li>Nursing homes</li>
                <li>Clinics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Program Length */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">🧭 Program Length</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Flexible self-paced online modules</li>
            <li>Skills labs (if required)</li>
            <li>Average completion: 2–6 weeks depending on schedule</li>
          </ul>
        </section>

        {/* Enrollment Requirements */}
        <section className="mb-12 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h2 className="text-3xl font-bold text-brandBlack mb-4">
            📅 Enrollment Requirements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Government-issued ID</li>
            <li>Background check (if required by employer)</li>
            <li>Must complete JRI before clinical placement</li>
            <li>Must complete National Drug + CareerSafe before skills exams</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="bg-brandPrimary text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">🖱 Enroll Now</h2>
          <p className="text-lg mb-6">Two routes are available:</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <form action="/api/checkout/program?mode=full&id=cna" method="POST" className="flex-1">
              <button
                type="submit"
                className="w-full bg-white text-brandPrimary px-6 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🔴 Pay In Full<br />
                <span className="text-sm">(Start Immediately)</span>
              </button>
            </form>
            <form action="/api/checkout/program?mode=plan&id=cna" method="POST" className="flex-1">
              <button
                type="submit"
                className="w-full bg-brandOrange text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
              >
                🟠 Payment Plan<br />
                <span className="text-sm">(Start Immediately)</span>
              </button>
            </form>
          </div>

          <p className="text-sm mt-6 opacity-90">
            Your first payment unlocks the program.
          </p>
        </section>

      </div>
    </div>
  );
}
