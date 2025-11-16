import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'Workforce Partners | Elevate for Humanity',
  description:
    'WIOA, WRG, JRI, Apprenticeship, and SEAL-aligned training programs for workforce development partners.',
};

const fundingTypes = [
  { name: 'WIOA', color: 'bg-blue-600' },
  { name: 'WRG-Style', color: 'bg-orange-600' },
  { name: 'JRI', color: 'bg-green-600' },
  { name: 'Apprenticeship', color: 'bg-purple-600' },
  { name: 'SEAL', color: 'bg-indigo-600' },
  { name: 'Reentry', color: 'bg-teal-600' },
];

const alignments = [
  'WIOA Adult/Dislocated Worker',
  'WIOA Youth (in-school & out-of-school)',
  'WRG-Style Training Programs',
  'WorkOne / EmployIndy',
  'JRI (Justice Reinvestment Initiatives)',
  'Reentry workforce transition',
  'State Earn & Learn (SEAL)',
  'Registered Apprenticeship (DOL)',
  'TANF / SNAP Employment & Training',
  'On-The-Job Training (OJT)',
  'Work Experience (WEX)',
];

const deliverables = [
  'Printable enrollment confirmations',
  'LMS progress tracking',
  'Completion certificates',
  'Program codes (CIP/SOC)',
  'Employer connections',
  'Case manager dashboard access',
];

export default async function WorkforcePartnersPage() {
  const supabase = await createClient();

  // Fetch all published programs with CIP/SOC codes
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('status', 'published')
    .order('title');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002F6C] to-[#004B8D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Workforce & Apprenticeship-Aligned Training Provider
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Serving Youth · Adults · Dislocated Workers · Reentry · TANF ·
              SNAP · WIOA
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {fundingTypes.map((type) => (
                <span
                  key={type.name}
                  className={`${type.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0f0f14] mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Elevate for Humanity provides accessible, high-impact career
              training programs that accelerate employability, support community
              uplift, and meet the needs of employers across Indiana and the
              United States. Our programs align with WIOA, WRG-style funding,
              Job Ready Indy, JRI, WorkOne, EmployIndy, Reentry, Apprenticeship,
              and SEAL pathways.
            </p>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 bg-[#f9e5d4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#0f0f14] mb-12">
            All Programs Include
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Career exploration',
              'Employability skills',
              'Digital literacy',
              'Financial literacy',
              'Industry certification prep',
              'Hands-on skills development',
              'LMS access + tracking',
              'Case manager receipts',
            ].map((feature) => (
              <div key={feature} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <span className="text-[#ef7c2a] text-2xl mr-3">✓</span>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs with CIP/SOC Codes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0f0f14] mb-4">
              CIP/SOC Workforce Crosswalk
            </h2>
            <p className="text-lg text-gray-600">
              All {programs?.length || 16} programs are ETPL-approved with
              official CIP and SOC codes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programs?.map((program) => (
              <div
                key={program.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#ef7c2a] transition-colors"
              >
                <h3 className="text-xl font-bold text-[#0f0f14] mb-3">
                  {program.title}
                </h3>

                {program.cip_code && (
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-[#004B8D]">
                      CIP Code:
                    </span>{' '}
                    <span className="text-sm text-gray-700">
                      {program.cip_code}
                    </span>
                  </div>
                )}

                {program.soc_code && (
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-[#004B8D]">
                      SOC Code:
                    </span>{' '}
                    <span className="text-sm text-gray-700">
                      {program.soc_code}
                    </span>
                  </div>
                )}

                {program.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                )}

                <Link
                  href={`/lms/programs/${program.id}`}
                  className="inline-block text-sm font-semibold text-[#ef7c2a] hover:text-[#004B8D] transition-colors"
                >
                  View Program Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alignment Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#0f0f14] mb-12">
            We Align To
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {alignments.map((alignment) => (
              <div
                key={alignment}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <span className="text-[#ef7c2a] text-xl mr-3">✓</span>
                <span className="text-gray-800 text-sm font-medium">
                  {alignment}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Manager Deliverables */}
      <section className="py-16 bg-[#f9e5d4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#0f0f14] mb-12">
            Case Manager–Ready Deliverables
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {deliverables.map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <span className="text-[#004B8D] font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0f0f14] mb-6">
            Download Partner Packet
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the complete workforce partner packet with all program details,
            CIP/SOC codes, and funding alignment information.
          </p>
          <a
            href="/workforce-partner-packet.md"
            download
            className="inline-block bg-[#ef7c2a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004B8D] transition-colors"
          >
            Download Partner Packet
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#002F6C] to-[#004B8D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
          <p className="text-xl mb-8 text-blue-100">
            Ready to connect your workforce clients with career-ready training?
          </p>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> 317-314-3757
            </p>
            <p className="text-lg">
              <span className="font-semibold">Location:</span> Indianapolis, IN
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 bg-[#ef7c2a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#004B8D] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
