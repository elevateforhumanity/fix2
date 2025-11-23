import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handbook - Workforce Development Platform | Elevate for Humanity",
  description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
  keywords: ["workforce development", "career training", "job placement", "WIOA"],
  openGraph: {
    title: "Handbook - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handbook - Workforce Development Platform | Elevate for Humanity",
    description: "Elevate for Humanity connects job seekers with free career training and employers with skilled talent.",
    images: ["/images/hero-banner-new.png"],
  },
};



export default function Handbook() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/onboarding" className="text-orange-400 hover:text-orange-300 text-sm">← Back</Link>
          <h1 className="mt-4 text-3xl font-bold">Universal Responsibilities & Expectations Handbook</h1>
          <p className="mt-2 text-lg text-slate-300">Elevate For Humanity™</p>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-12 prose prose-invert prose-orange max-w-none">
        <h2>1. Mission & Purpose</h2>
        <p>Elevate For Humanity™ exists to Innovate, Elevate, and Reset lives through access to training, workforce pathways, apprenticeships, supportive services, and partnerships with employers and schools.</p>
        
        <h2>2. Who This Handbook Applies To</h2>
        <ul>
          <li>Elevate Staff & Independent Contractors</li>
          <li>Training Providers / Program Holders</li>
          <li>Schools & Skill Centers</li>
          <li>Apprenticeship Hosts</li>
          <li>Employer Partners</li>
          <li>Community Organizations</li>
          <li>Referral Partners (WorkOne, Re-Entry, etc.)</li>
          <li>Participants / Learners</li>
        </ul>

        <h2 id="code-of-conduct">3. Code of Conduct (Applies to EVERYONE)</h2>
        <p>All individuals connected with Elevate must:</p>
        <ul>
          <li>Treat others with dignity and respect</li>
          <li>Communicate professionally</li>
          <li>Maintain a safe and inclusive environment</li>
          <li>Avoid discrimination, harassment, or retaliation</li>
          <li>Protect privacy and sensitive information</li>
          <li>Follow safety rules and site-specific policies</li>
          <li>Address conflicts in a respectful, solutions-based manner</li>
        </ul>

        <h2>4. Staff & Contractor Responsibilities</h2>
        <ul>
          <li>Provide accurate information to learners and partners</li>
          <li>Follow Elevate training and coaching standards</li>
          <li>Document attendance, progress, coaching notes, and concerns</li>
          <li>Maintain professional boundaries</li>
          <li>Communicate schedule changes quickly</li>
          <li>Report safety, behavioral, or compliance issues immediately</li>
          <li>Represent Elevate professionally in all settings</li>
          <li>Protect learner data, records, and documents</li>
        </ul>

        <h2>5. Training Provider / Program Site Responsibilities</h2>
        <ul>
          <li>Maintain clean, safe, appropriate learning environments</li>
          <li>Provide Elevate with updated schedules, calendars, and requirements</li>
          <li>Notify Elevate of attendance issues promptly</li>
          <li>Follow state, training provider, and Elevate guidelines</li>
          <li>Allow Elevate staff to conduct check-ins or site visits</li>
          <li>Communicate expectations clearly during orientation</li>
          <li>Provide objective feedback about learner performance</li>
        </ul>

        <h2>6. Employer Responsibilities</h2>
        <ul>
          <li>Provide safe, legally compliant workplaces</li>
          <li>Treat Elevate learners fairly and without bias</li>
          <li>Communicate job expectations clearly</li>
          <li>Notify Elevate when a learner is hired, leaves, or has performance concerns</li>
          <li>Offer honest performance feedback</li>
          <li>Follow workplace harassment and safety policies</li>
          <li>Provide required personal protective equipment (PPE) where needed</li>
        </ul>

        <h2>7. Participant / Learner Responsibilities</h2>
        <ul>
          <li>Attend scheduled classes, labs, coaching sessions, and interviews</li>
          <li>Communicate absences in advance</li>
          <li>Complete training assignments and requirements</li>
          <li>Follow site rules at training and work locations</li>
          <li>Treat staff, peers, instructors, and employers respectfully</li>
          <li>Ask for help early when challenges arise</li>
          <li>Participate in check-ins and progress reviews</li>
          <li>Represent themselves professionally during employer interactions</li>
        </ul>

        <h2>8. Safety Standards</h2>
        <p>Elevate requires:</p>
        <ul>
          <li>Safe learning and work environments</li>
          <li>Zero tolerance for harassment or violence</li>
          <li>Reporting of unsafe conditions, injuries, threats, violence, discrimination, and major behavioral incidents</li>
          <li>Immediate communication for emergencies</li>
        </ul>

        <h2>9. Privacy & Confidentiality</h2>
        <p>All parties must:</p>
        <ul>
          <li>Keep learner information secure</li>
          <li>Share only what is necessary for services or placement</li>
          <li>Avoid distributing documents without permission</li>
          <li>Avoid posting learner images online without written consent</li>
          <li>Follow Elevate's privacy and FERPA-style protections</li>
        </ul>

        <h2>10. Conflict Resolution & Accountability</h2>
        <p>Steps when issues arise:</p>
        <ol>
          <li>Speak privately with the involved party (if safe)</li>
          <li>Notify Elevate staff/leadership</li>
          <li>Document what happened</li>
          <li>Elevate leadership reviews facts</li>
          <li>A resolution plan is created</li>
        </ol>

        <div className="mt-12 p-6 rounded-2xl border border-orange-400/40 bg-slate-900">
          <h3 className="text-xl font-bold mb-4">Acknowledgment</h3>
          <p>By completing onboarding, you acknowledge that you have read, understood, and agree to follow this handbook.</p>
        </div>
      </section>
    </main>
  );
}
