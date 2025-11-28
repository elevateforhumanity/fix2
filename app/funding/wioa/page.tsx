import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wioa - Financial Aid & Funding Options | Elevate for Humanity",
  description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
  keywords: ["financial aid", "WIOA funding", "workforce grants", "free training"],
  openGraph: {
    title: "Wioa - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wioa - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
  },
};



export default function WIOAFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative bg-gradient-to-r from-red-600 to-indigo-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/funding/funding-dol-v2-hd.jpg"
            alt="Department of Labor - WIOA Funding"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            WIOA Funding
          </h1>
          <p className="text-xl text-blue-100">
            Workforce Innovation & Opportunity Act - Free Career Training for Eligible Adults
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is WIOA?</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Workforce Innovation and Opportunity Act (WIOA) is a federal program that provides funding for job training and employment services to help Americans get good jobs and stay employed.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Qualifies?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-brandPrimary font-bold">✓</span>
              <span>Dislocated workers who lost their job through no fault of their own</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brandPrimary font-bold">✓</span>
              <span>Low-income adults seeking career advancement</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brandPrimary font-bold">✓</span>
              <span>Youth ages 16-24 who face barriers to employment</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Does WIOA Cover?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Training Costs</h3>
              <p className="text-gray-700">Tuition, books, supplies, and certification exams</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Support Services</h3>
              <p className="text-gray-700">Transportation, childcare, work clothing</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply for WIOA Funding</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
            <div className="relative w-full h-auto">
              <Image
                src="/media/funding/infographics/funding-wioa-process.png"
                alt="WIOA Funding Application Process - 5 Steps: Visit WorkOne, Eligibility Assessment, Application, Approval, Training Begins"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Follow these 5 simple steps to get your training fully funded through WIOA
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">🔗 Indiana Career Connect</h3>
              <p className="text-gray-700 mb-4">
                Indiana's official workforce development portal. Check WIOA eligibility, find WorkOne locations, and access career resources.
              </p>
              <a
                href="https://www.in.gov/dwd/indiana-career-connect/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Visit Indiana Career Connect →
              </a>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">📍 WorkOne Indianapolis</h3>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 3901 Meadows Dr, Indianapolis, IN 46205
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> (317) 684-2400
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM
              </p>
              <a
                href="https://www.in.gov/dwd/workone-centers/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Find Your WorkOne Center →
              </a>
            </div>
          </div>
        </section>

        <div className="bg-blue-50 border-l-4 border-brandPrimary p-6 mb-12">
          <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
          <p className="text-gray-700 mb-4">
            Contact us to see if you qualify for WIOA funding and start your career training today. We'll help you navigate the entire process.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/apply" className="inline-block bg-brandPrimary text-white px-6 py-3 rounded-lg font-bold hover:bg-brandPrimaryDark">
              Apply Now
            </Link>
            <Link href="/contact" className="inline-block bg-white text-brandPrimary border-2 border-brandPrimary px-6 py-3 rounded-lg font-bold hover:bg-gray-50">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
