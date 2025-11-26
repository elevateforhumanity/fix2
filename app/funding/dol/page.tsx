import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dol - Financial Aid & Funding Options | Elevate for Humanity",
  description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
  keywords: ["financial aid", "WIOA funding", "workforce grants", "free training"],
  openGraph: {
    title: "Dol - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dol - Financial Aid & Funding Options | Elevate for Humanity",
    description: "Learn about WIOA, workforce grants, JRI, and other funding sources that make career training free for eligible participants.",
    images: ["/images/homepage/funding-navigation.png"],
  },
};



export default function DOLFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/funding/funding-dol-v2-hd.jpg"
            alt="DOL Apprenticeships"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            DOL Apprenticeships
          </h1>
          <p className="text-xl text-orange-100">
            U.S. Department of Labor Registered Apprenticeships - Earn While You Learn
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What are DOL Apprenticeships?</h2>
          <p className="text-lg text-gray-700 mb-4">
            DOL Registered Apprenticeships are employer-driven, "earn while you learn" programs that combine on-the-job training with classroom instruction. Apprentices receive wages from day one while learning a skilled trade.
          </p>
          <p className="text-lg text-gray-700">
            These programs are registered with the U.S. Department of Labor and lead to nationally recognized credentials.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Apprenticeships</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-600 bg-orange-50 p-6">
              <h3 className="font-bold text-xl mb-2">Barber Apprenticeship</h3>
              <p className="text-gray-700 mb-2">12-18 months | Earn wages while building hours toward Indiana barber license</p>
              <Link href="/programs/barber-apprenticeship" className="text-orange-600 font-bold hover:underline">
                Learn More →
              </Link>
            </div>
            <div className="border-l-4 border-brandPrimary bg-blue-50 p-6">
              <h3 className="font-bold text-xl mb-2">HVAC Technician Apprenticeship</h3>
              <p className="text-gray-700 mb-2">4-9 months | On-the-job training with HVAC companies</p>
              <Link href="/programs/hvac-technician" className="text-brandPrimary font-bold hover:underline">
                Learn More →
              </Link>
            </div>
            <div className="border-l-4 border-green-600 bg-green-50 p-6">
              <h3 className="font-bold text-xl mb-2">Building Maintenance Apprenticeship</h3>
              <p className="text-gray-700 mb-2">4-9 months | Learn building systems and property maintenance</p>
              <Link href="/programs/building-maintenance" className="text-green-600 font-bold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Apprenticeships</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">💰 Earn While You Learn</h3>
              <p className="text-gray-700">Get paid from day one - no student loans or debt</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">🎓 Nationally Recognized Credential</h3>
              <p className="text-gray-700">DOL-registered credentials accepted nationwide</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">👔 Job Guaranteed</h3>
              <p className="text-gray-700">Employers hire apprentices with intent to keep them</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">📈 Career Advancement</h3>
              <p className="text-gray-700">Clear path to journeyman status and higher wages</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Qualifies?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">✓</span>
              <span>18 years or older (16+ for some programs)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">✓</span>
              <span>High school diploma or GED (or working toward it)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">✓</span>
              <span>Physically able to perform the work</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">✓</span>
              <span>Committed to completing the program</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Apply & Interview</h3>
                <p className="text-gray-700">Submit your application and interview with employer partners</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Get Hired</h3>
                <p className="text-gray-700">Start earning wages on day one as an apprentice</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Train & Learn</h3>
                <p className="text-gray-700">Combine on-the-job training with classroom instruction</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Earn Credential</h3>
                <p className="text-gray-700">Complete program and receive DOL-registered credential</p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-12">
          <h3 className="font-bold text-lg mb-2">Ready to Start Your Apprenticeship?</h3>
          <p className="text-gray-700 mb-4">
            Contact us to learn about available apprenticeship opportunities and start earning while you learn.
          </p>
          <div className="flex gap-4">
            <Link href="/apply" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
              Apply Now
            </Link>
            <Link href="/programs" className="inline-block bg-white border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50">
              View Programs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
