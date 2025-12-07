// app/apprenticeships/page.tsx
import Link from "next/link";

export default function ApprenticeshipsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold text-slate-900">
          Registered Apprenticeships
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          Elevate for Humanity is a U.S. Department of Labor Registered Apprenticeship sponsor 
          with programs listed on RAPIDS. Earn while you learn through federally aligned apprenticeships.
        </p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Barber Apprenticeship</h2>
            <p className="text-sm text-slate-700 mb-4">
              State-approved, federally aligned program. 1,500 hours of training leading to 
              Indiana barber licensure. WIOA, WRG, and JRI fundable.
            </p>
            <Link 
              href="/programs/barber-apprenticeship" 
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Discover more →
            </Link>
          </div>
          
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">More Programs Coming</h2>
            <p className="text-sm text-slate-700 mb-4">
              We're expanding our apprenticeship offerings in healthcare, skilled trades, 
              and other high-demand fields. Contact us to learn about upcoming programs.
            </p>
            <Link 
              href="/contact" 
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Contact us →
            </Link>
          </div>
        </div>
        
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Federal Alignment</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
              U.S. Department of Labor Registered Apprenticeship Sponsor
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
              Programs listed on RAPIDS (Registered Apprenticeship Partners Information Data System)
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
              Eligible for WIOA, Workforce Ready Grant, and JRI funding where applicable
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
              Structured on-the-job training combined with classroom instruction
            </li>
          </ul>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Link 
            href="/apply" 
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 transition"
          >
            Apply for Apprenticeship Programs
          </Link>
        </div>
      </div>
    </main>
  );
}
