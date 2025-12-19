import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Users, 
  Building2, 
  Laptop, 
  ArrowRight,
  FileText,
  Shield,
  BarChart,
  CheckCircle,
  DollarSign
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/resources',
  },
  title: 'Resources & Tools | Elevate For Humanity',
  description: 'Guides, tools, and platform access for students, partners, workforce agencies, and organizations building career pathways.',
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Resources"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Resources & Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Guides, tools, and platform access for students, partners, workforce agencies, and organizations building career pathways.
          </p>
        </div>
      </section>

      {/* Section 1: For Students */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Student Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/programs"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <FileText className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Pathways Guide</h3>
              <p className="text-sm text-gray-600 mb-4">
                Understand available programs, funding options, and outcomes.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/funding"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <DollarSign className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Funding & Eligibility Help</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn about WIOA, WRG, JRI, and workforce support.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/apply"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <CheckCircle className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Enrollment & Next Steps</h3>
              <p className="text-sm text-gray-600 mb-4">
                What happens after you apply and how advising works.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/support"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                <Users className="w-6 h-6 text-orange-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Support Services</h3>
              <p className="text-sm text-gray-600 mb-4">
                Transportation, documentation, justice navigation, and more.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: For Program Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Partner Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/partners/onboarding"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <BookOpen className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Program Holder Onboarding</h3>
              <p className="text-sm text-gray-600 mb-4">
                Roles, responsibilities, reporting expectations.
              </p>
              <div className="flex items-center text-green-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/partners/compliance"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <Shield className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance & Reporting</h3>
              <p className="text-sm text-gray-600 mb-4">
                What's required for workforce-aligned programs.
              </p>
              <div className="flex items-center text-green-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/partners/curriculum"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <FileText className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Curriculum & Verification</h3>
              <p className="text-sm text-gray-600 mb-4">
                How partner-hosted courses are tracked and verified.
              </p>
              <div className="flex items-center text-green-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/program-holder/portal"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Agreements & Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">
                MOUs, uploads, credentials, and audits.
              </p>
              <div className="flex items-center text-green-600 font-semibold text-sm">
                Partner Portal <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: For Workforce Boards & Agencies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Workforce & Agency Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/workforce/outcomes"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <BarChart className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Outcome Reporting Overview</h3>
              <p className="text-sm text-gray-600 mb-4">
                How we track and report student outcomes.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/workforce/compliance"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Shield className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Audit & Compliance Readiness</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our approach to compliance and transparency.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/workforce/funding"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <DollarSign className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Funding Alignment</h3>
              <p className="text-sm text-gray-600 mb-4">
                WIOA, JRI, WRG integration and reporting.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                View Resource <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <FileText className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data & Transparency</h3>
              <p className="text-sm text-gray-600 mb-4">
                Request information about our data practices.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm">
                Request Information <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Platform & Technology */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Laptop className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Platform Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/platform"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Laptop className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Platform Overview</h3>
              <p className="text-sm text-gray-600 mb-4">
                How the Elevate system supports programs, compliance, and outcomes.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/platform/licensing"
              className="bg-white p-6 rounded-lg border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Building2 className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Technology Licensing</h3>
              <p className="text-sm text-gray-600 mb-4">
                Launch your own workforce or training hub using the Elevate platform.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                View Licensing <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/platform/who-its-for"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Users className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Who the Platform Is For</h3>
              <p className="text-sm text-gray-600 mb-4">
                Nonprofits, schools, employers, workforce orgs, agencies.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <CheckCircle className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Request a Demo</h3>
              <p className="text-sm text-gray-600 mb-4">
                See the platform in action and discuss your needs.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Right Resource?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our team is here to guide you to the right information and support.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
