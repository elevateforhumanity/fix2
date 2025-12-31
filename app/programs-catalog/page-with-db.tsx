/**
 * Programs Catalog Page - Database Version
 * Fetches programs from Supabase instead of hardcoded data
 */

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs Catalog | Elevate for Humanity',
  description: 'Complete catalog of workforce training programs - State, Federal & Partner Programs',
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

export default async function ProgramsCatalogPage() {
  const supabase = createClient();
  
  // Fetch all active programs
  const { data: programs, error } = await supabase
    .from('programs')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Error fetching programs:', error);
  }

  // Group programs by funding source
  const groupedPrograms = {
    state: [] as Program[],
    federal: [] as Program[],
    partner: [] as Program[],
  };

  programs?.forEach((program) => {
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
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)'
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
    </main>
  );
}
