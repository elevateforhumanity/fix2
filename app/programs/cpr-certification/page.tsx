import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CPR, AED & First Aid Certification | Elevate For Humanity',
  description: 'Get CPR certified in just 1 day. $575 total cost. Industry-recognized certification that opens doors.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/cpr-certification',
  },
};

export default function CPRCertificationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CPR, AED & First Aid Certification
          </h1>
          <p className="text-xl">Get certified in 1 day. Start saving lives.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Every job application asks: "Do you have CPR certification?" This one-day course gives you 
            the answer employers want to hear: Yes.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Whether you're applying for healthcare jobs, childcare positions, fitness centers, or security work—CPR 
            certification shows you're prepared, responsible, and ready to help in an emergency.
          </p>
          <p className="text-lg text-slate-600">
            One day. Industry-recognized certification. Opens doors to dozens of careers.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Program Details</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1 Day</div>
              <div className="text-slate-600">Complete in one session</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$575</div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">CPR</div>
              <div className="text-slate-600">Industry-Recognized</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>CPR for adults, children, and infants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>AED (Automated External Defibrillator) use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>First aid for choking, bleeding, and shock</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Emergency response procedures</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
          <p className="text-xl mb-8">One day. One certification. Dozens of job opportunities.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg"
          >
            Contact Us to Enroll
          </Link>
          <p className="mt-6 text-white/90">
            Questions? Call <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}
