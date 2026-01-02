/**
 * Programs Catalog Page - Public Version
 * Uses static program data for public access
 */

import { programs } from '@/app/data/programs';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs Catalog | Elevate for Humanity',
  description:
    'Complete catalog of workforce training programs - State, Federal & Partner Programs',
};

interface Program {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  duration: string | null;
  delivery: string | null;
  credential: string | null;
  etpl_approved: boolean;
  active: boolean;
  metadata?: {
    funding?: string[];
    cip_code?: string;
    provider?: string;
  };
}

export default function ProgramsCatalogPage() {
  // Use static programs data - convert to catalog format
  const catalogPrograms: Program[] = programs.map((program, index) => ({
    id: (index + 1).toString(),
    slug: program.slug,
    name: program.name,
    description: program.shortDescription,
    duration: program.duration,
    delivery: program.delivery,
    credential: program.credential,
    etpl_approved: program.approvals?.includes('ETPL') || false,
    active: true,
    metadata: {
      funding: program.fundingOptions,
      cip_code: program.etplProgramId,
      provider: 'Elevate for Humanity',
    },
  }));

  // Additional fallback programs if needed
  const additionalPrograms: Program[] = [
    {
      id: '1',
      slug: 'healthcare',
      name: 'Certified Nursing Assistant (CNA)',
      description:
        'Train to become a Certified Nursing Assistant in healthcare facilities',
      duration: '4-6 weeks',
      delivery: 'In-person',
      credential: 'State CNA Certification',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], cip_code: '51.3902' },
    },
    {
      id: '2',
      slug: 'skilled-trades',
      name: 'HVAC Technician',
      description: 'Learn heating, ventilation, and air conditioning systems',
      duration: '6-12 months',
      delivery: 'In-person',
      credential: 'EPA 608 Certification',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], cip_code: '47.0201' },
    },
    {
      id: '3',
      slug: 'cdl-transportation',
      name: 'Commercial Driver License (CDL)',
      description: 'Get your CDL Class A license for truck driving',
      duration: '3-4 weeks',
      delivery: 'In-person',
      credential: 'CDL Class A',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], cip_code: '49.0205' },
    },
    {
      id: '4',
      slug: 'barber-apprenticeship',
      name: 'Barber Apprenticeship',
      description:
        'Earn while you learn in a registered apprenticeship program',
      duration: '12-18 months',
      delivery: 'Apprenticeship',
      credential: 'State Barber License',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['DOL', 'WRG'], cip_code: '12.0402' },
    },
    {
      id: '5',
      slug: 'medical-assistant',
      name: 'Medical Assistant',
      description: 'Train for administrative and clinical duties in healthcare',
      duration: '8-12 weeks',
      delivery: 'Hybrid',
      credential: 'Certified Medical Assistant',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA'], cip_code: '51.0801' },
    },
    {
      id: '6',
      slug: 'welding',
      name: 'Welding Technology',
      description: 'Learn various welding techniques and safety procedures',
      duration: '12-16 weeks',
      delivery: 'In-person',
      credential: 'AWS Certification',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], cip_code: '48.0508' },
    },
    {
      id: '7',
      slug: 'it-support',
      name: 'IT Support Specialist',
      description: 'CompTIA A+ certification and IT fundamentals',
      duration: '8-10 weeks',
      delivery: 'Online',
      credential: 'CompTIA A+',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA'], cip_code: '11.0901' },
    },
    {
      id: '8',
      slug: 'phlebotomy',
      name: 'Phlebotomy Technician',
      description: 'Train to draw blood and collect specimens',
      duration: '4-6 weeks',
      delivery: 'In-person',
      credential: 'Certified Phlebotomy Technician',
      etpl_approved: true,
      active: true,
      metadata: { funding: ['WIOA', 'WRG'], cip_code: '51.1009' },
    },
  ];

  // Combine catalog programs with additional programs
  const allPrograms = [...catalogPrograms, ...additionalPrograms];

  // Group all programs by funding source
  const groupedPrograms = {
    state: [] as Program[],
    federal: [] as Program[],
    partner: [] as Program[],
  };

  allPrograms?.forEach((program) => {
    const funding = program.metadata?.funding || [];

    if (funding.includes('WRG') || funding.includes('DWD')) {
      groupedPrograms.state.push(program);
    }
    if (funding.includes('WIOA') || funding.includes('DOL')) {
      groupedPrograms.federal.push(program);
    }
    if (funding.includes('Partner') || funding.length === 0) {
      groupedPrograms.partner.push(program);
    }
  });

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white uppercase tracking-wide">
              COMPLETE PROGRAMS CATALOG
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              {programs?.length || 0} Training Programs Available
            </p>
          </div>
        </div>
      </section>

      {/* Programs Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Note:</strong> Unable to load programs from database.
                Please ensure Supabase credentials are configured in .env.local
              </p>
            </div>
          )}

          {/* STATE PROGRAMS */}
          {groupedPrograms.state.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">
                State Programs ({groupedPrograms.state.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPrograms.state.map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    {program.duration && (
                      <p className="text-sm text-gray-600 mb-2">
                        Duration: {program.duration}
                      </p>
                    )}
                    {program.credential && (
                      <p className="text-sm text-gray-600 mb-2">
                        Credential: {program.credential}
                      </p>
                    )}
                    {program.etpl_approved && (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        ETPL Approved
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FEDERAL PROGRAMS */}
          {groupedPrograms.federal.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">
                Federal Programs ({groupedPrograms.federal.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPrograms.federal.map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    {program.duration && (
                      <p className="text-sm text-gray-600 mb-2">
                        Duration: {program.duration}
                      </p>
                    )}
                    {program.credential && (
                      <p className="text-sm text-gray-600 mb-2">
                        Credential: {program.credential}
                      </p>
                    )}
                    <p className="text-green-600 font-bold text-sm">
                      100% FREE with WIOA
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* PARTNER PROGRAMS */}
          {groupedPrograms.partner.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">
                Partner Programs ({groupedPrograms.partner.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPrograms.partner.map((program) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug}`}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    {program.duration && (
                      <p className="text-sm text-gray-600 mb-2">
                        Duration: {program.duration}
                      </p>
                    )}
                    {program.metadata?.provider && (
                      <p className="text-sm text-gray-600 mb-2">
                        Provider: {program.metadata.provider}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No programs found */}
          {!error && programs && programs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No programs found in the database.
              </p>
              <p className="text-gray-500">
                Run database migrations to populate the programs table.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
