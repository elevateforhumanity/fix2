import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Award, Users, Briefcase, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Courses | Elevate For Humanity',
  description: 'Access industry-recognized training from our trusted partners: HSI, Job Ready Indy, NRF RISE Up, and CareerSafe OSHA.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/partners',
  },
};

export default function PartnersPage() {
  const partners = [
    {
      id: 'hsi',
      name: 'Health & Safety Institute',
      description: 'CPR, AED, First Aid, and Emergency Medical Responder Training',
      icon: Shield,
      color: 'red'
    },
    {
      id: 'jri',
      name: 'Job Ready Indy',
      description: 'Employability Skills and Workforce Readiness Training',
      icon: Briefcase,
      color: 'blue'
    },
    {
      id: 'nrf',
      name: 'NRF Foundation RISE Up',
      description: 'Retail Industry Skills and Employability Training',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'careersafe',
      name: 'CareerSafe OSHA',
      description: 'OSHA 10 & OSHA 30 Safety Certification',
      icon: Award,
      color: 'orange'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partner Courses
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto">
            Access industry-recognized training from our trusted partners
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <Link
                  key={partner.id}
                  href={`/partners/${partner.id}`}
                  className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className={`w-16 h-16 bg-${partner.color}-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 text-${partner.color}-600`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {partner.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    View Courses
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Apply to Elevate for Humanity and get access to all partner courses
          </p>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
          >
            Apply Now - It's Free
          </Link>
        </div>
      </section>
    </main>
  );
}
