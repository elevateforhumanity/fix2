// app/advising/page.tsx
import Link from "next/link";

export default function AdvisingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-slate-900">
          Talk With an Advisor
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          Our advisors help you navigate funding options, program selection, and enrollment. 
          Schedule a call or visit us to discuss your career goals.
        </p>
        
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
          <p className="text-sm text-slate-700 mb-2">
            <strong>Phone:</strong> <a href="tel:317-314-3757" className="text-red-600 hover:underline">317-314-3757</a>
          </p>
          <p className="text-sm text-slate-700 mb-2">
            <strong>Email:</strong> <a href="mailto:elevateforhumanity.edu@gmail.com" className="text-red-600 hover:underline">elevateforhumanity.edu@gmail.com</a>
          </p>
          <p className="text-sm text-slate-700 mb-4">
            <strong>Location:</strong> 8888 Keystone Crossing, Suite 1400, Indianapolis, IN 46240
          </p>
          
          <div className="flex gap-3 mt-6">
            <Link 
              href="/apply" 
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 transition"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-slate-300 text-slate-800 bg-white hover:bg-slate-50 transition"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
