import Link from 'next/link';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jri - Financial Aid & Funding Options | Elevate for Humanity",
  description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
  keywords: ["financial aid", "WIOA funding", "workforce grants", "free training"],
  openGraph: {
    title: "Jri - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jri - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
  },
};



export default function JRIFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            JRI Funding
          </h1>
          <p className="text-xl text-purple-100">
            Justice Reinvestment Initiative - Second Chance Career Training
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is JRI?</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Justice Reinvestment Initiative (JRI) is a state-funded program that provides career training, support services, and job placement assistance to individuals re-entering the workforce after incarceration.
          </p>
          <p className="text-lg text-gray-700">
            We believe everyone deserves a second chance. JRI funding helps remove barriers and provides the training and support needed to build a successful career.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Qualifies?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Individuals currently on probation or parole</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Recently released from incarceration (within 2 years)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Referred by community corrections or re-entry programs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Committed to completing training and finding employment</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Does JRI Cover?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Training Costs</h3>
              <p className="text-gray-700">100% free tuition, books, supplies, and certification exams</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Support Services</h3>
              <p className="text-gray-700">Transportation, work clothing, tools, and equipment</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Case Management</h3>
              <p className="text-gray-700">One-on-one support, coaching, and barrier removal</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Job Placement</h3>
              <p className="text-gray-700">Connections to second-chance employers and ongoing support</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Second Chances</h2>
          <p className="text-lg text-gray-700 mb-4">
            Elevate for Humanity specializes in working with re-entry participants. We understand the unique challenges you face and have built relationships with employers who believe in second chances.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ No judgment - we focus on your future, not your past</li>
            <li>✓ Flexible scheduling to work around probation/parole requirements</li>
            <li>✓ Direct connections to second-chance employers</li>
            <li>✓ Ongoing support even after you're employed</li>
          </ul>
        </section>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-12">
          <h3 className="font-bold text-lg mb-2">Ready to Start Fresh?</h3>
          <p className="text-gray-700 mb-4">
            Contact us to learn more about JRI funding and how we can help you build a new career.
          </p>
          <div className="flex gap-4">
            <Link href="/apply" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700">
              Apply Now
            </Link>
            <Link href="/contact" className="inline-block bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
