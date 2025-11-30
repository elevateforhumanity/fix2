import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Employer Directory | Elevate For Humanity",
  description: "Browse our network of employer partners who hire graduates from Elevate For Humanity workforce training programs.",
};

export default function DirectoryPage() {
  return (
    <main>
      {/* Hero Banner */}
      <div 
        className="relative bg-slate-900 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/90 px-3 py-1 text-[11px] font-semibold text-white border border-orange-400 uppercase tracking-wide mb-4">
            Employer Directory
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Our Employer Partners
          </h1>
          
          <p className="text-xl sm:text-2xl text-orange-300 font-semibold mb-4">
            Companies Committed to Workforce Development
          </p>
          
          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mb-8">
            Browse our network of employer partners who provide internships, on-the-job training, and career opportunities to graduates of Elevate For Humanity programs.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#directory"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-700 transition-colors"
            >
              Browse Directory
            </a>
            <a
              href="#become-partner"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 mb-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="uppercase tracking-wide">
            ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Filter/Search Section */}
        <section className="mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Filter by Industry
            </h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold">
                All Industries
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Technology
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Healthcare
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Manufacturing
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Finance
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Hospitality
              </button>
              <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200">
                Energy
              </button>
            </div>
          </div>
        </section>

        {/* Employer Directory Grid */}
        <section id="directory" className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Featured Employer Partners
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Tech Innovators Inc.</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Technology</p>
                <p className="text-sm text-slate-700 mb-3">
                  Leading technology company specializing in software development and IT solutions. Actively hiring graduates for entry-level and internship positions.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Software Development, IT Support, Data Analysis
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Healthcare Solutions</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Healthcare</p>
                <p className="text-sm text-slate-700 mb-3">
                  Regional healthcare provider offering comprehensive medical services. Committed to hiring and training certified medical assistants and support staff.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Medical Assistant, Admin Support, Patient Care
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Green Energy Corp</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Renewable Energy</p>
                <p className="text-sm text-slate-700 mb-3">
                  Renewable energy company focused on sustainable solutions. Offers OJT programs for engineering and project management roles.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Engineering, Project Management, Installation
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Financial Services Group</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Finance</p>
                <p className="text-sm text-slate-700 mb-3">
                  Full-service financial institution providing banking and investment services. Hiring for accounting and financial analysis positions.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Accounting, Financial Analysis, Customer Service
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Manufacturing Excellence</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Manufacturing</p>
                <p className="text-sm text-slate-700 mb-3">
                  Advanced manufacturing facility producing industrial equipment. Offers apprenticeships and OJT for production and quality control roles.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Production, Quality Control, Maintenance
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Hospitality Leaders</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Hospitality</p>
                <p className="text-sm text-slate-700 mb-3">
                  Premier hospitality group operating hotels and restaurants. Provides training opportunities in hotel management and culinary arts.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Hotel Management, Culinary Arts, Guest Services
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Logistics Solutions Inc.</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Transportation & Logistics</p>
                <p className="text-sm text-slate-700 mb-3">
                  National logistics company specializing in supply chain management. Hiring CDL drivers and warehouse personnel.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> CDL Drivers, Warehouse, Dispatch
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Construction Partners LLC</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Construction</p>
                <p className="text-sm text-slate-700 mb-3">
                  Commercial construction company building the future. Offers apprenticeships in electrical, plumbing, and carpentry trades.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Electrical, Plumbing, Carpentry
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop')`
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Retail Excellence Group</h3>
                <p className="text-orange-600 font-semibold text-sm mb-2">Retail</p>
                <p className="text-sm text-slate-700 mb-3">
                  Multi-location retail chain committed to workforce development. Provides management training and career advancement opportunities.
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Open Positions:</span> Store Management, Sales, Inventory
                </p>
                <Link
                  href="/contact"
                  className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-flex items-center"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section id="become-partner" className="mb-10">
          <div className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-white p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Become an Employer Partner
            </h2>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Join our network of employers committed to workforce development. Access pre-screened, trained talent and benefit from OJT funding opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/employers"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-700 transition-colors"
              >
                Learn About Partnership
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-orange-600 bg-white px-8 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              Partnership Impact
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
                <p className="text-sm text-slate-700">Employer Partners</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2,500+</div>
                <p className="text-sm text-slate-700">Successful Placements</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">85%</div>
                <p className="text-sm text-slate-700">Retention Rate</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
