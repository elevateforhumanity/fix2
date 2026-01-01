import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  Users,
  FileText,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Holder Portal | Elevate For Humanity',
  description: 'Manage training programs, compliance, and student outcomes.',
};

export default function ProgramHolderPortalPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="brightness-0 invert"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5" />
              <span className="text-sm font-bold">For Program Holders</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Program Holder Portal
              <br />
              <span className="text-green-300">Manage Programs</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
              Manage training programs, track compliance, monitor student
              outcomes, and access reporting tools.
            </p>
            <Link
              href="/program-holder/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl"
            >
              Access Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Portal Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Program Management',
                description: 'Create and manage training programs and courses',
              },
              {
                icon: Users,
                title: 'Student Tracking',
                description: 'Monitor enrollment, progress, and completion',
              },
              {
                icon: FileText,
                title: 'Compliance Tools',
                description: 'Track WIOA, DOL, and state requirements',
              },
              {
                icon: BarChart3,
                title: 'Outcome Reporting',
                description: 'Generate performance and outcome reports',
              },
              {
                icon: Shield,
                title: 'Quality Assurance',
                description: 'Maintain program quality and accreditation',
              },
              {
                icon: CheckCircle,
                title: 'Certification',
                description: 'Issue certificates and credentials',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6"
                >
                  <Icon className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-black">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Manage Your Programs?
          </h2>
          <p className="text-xl mb-8">
            Access the program holder portal to oversee your training programs
          </p>
          <Link
            href="/program-holder/dashboard"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-10 py-5 rounded-xl text-lg font-black hover:bg-gray-100 transition"
          >
            Access Program Holder Portal
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}
