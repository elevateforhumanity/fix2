import { supa } from './supa';

export type Program = {
  id: string;
  slug: string;
  title: string;
  track: string;
  blurb: string | null;
  hours: string | null;
  cover_url: string | null;
  created_at: string;
};

export async function listPrograms() {
  try {
    const { data, error } = await supa
      .from('programs')
      .select('id, slug, title, track, blurb, hours, cover_url')
      .order('title');
    if (error) throw error;
    return data as Program[];
  } catch (err) {
    // Return mock data if Supabase is not configured
    console.warn('Supabase not configured, returning mock data');
    return getMockPrograms();
  }
}

function getMockPrograms(): Program[] {
  return [
    {
      id: '1',
      slug: 'cna-hha',
      title: 'CNA / HHA',
      track: 'Healthcare',
      blurb: 'Become a Certified Nursing Assistant or Home Health Aide. Get real clinical experience and start helping people right away.',
      hours: '4–8 weeks',
      cover_url: '/programs/cna.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'welding-aws',
      title: 'Welding (AWS SENSE)',
      track: 'Construction',
      blurb: 'Learn professional welding in our hands-on lab. Earn your AWS SENSE certification and start a high-paying career.',
      hours: '6–10 weeks',
      cover_url: '/programs/welding.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'nail-tech',
      title: 'Nail Technology',
      track: 'Beauty',
      blurb: 'Master nail art, sanitation, and salon skills. Get ready for your state board exam and start your own business or work in top salons.',
      hours: '8–12 weeks',
      cover_url: '/programs/nail-tech.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      slug: 'cdl',
      title: 'CDL (A/B) Prep',
      track: 'Business',
      blurb: 'Get your Commercial Driver\'s License and access high-demand trucking jobs. Includes permit prep and simulator training.',
      hours: '3–6 weeks',
      cover_url: '/programs/cdl.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      slug: 'office-tech',
      title: 'Office Tech & AI',
      track: 'Tech',
      blurb: 'Learn modern office software, AI tools, and digital workflows. Perfect for administrative and remote work careers.',
      hours: '4–6 weeks',
      cover_url: '/programs/office-tech.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      slug: 'osha10',
      title: 'OSHA-10 + CPR',
      track: 'Construction',
      blurb: 'Get essential safety certifications for construction work. Learn life-saving CPR/AED skills and workplace safety basics.',
      hours: '1–2 weeks',
      cover_url: '/programs/osha.jpg',
      created_at: new Date().toISOString()
    }
  ];
}

export async function getProgramBySlug(slug: string) {
  try {
    const { data, error } = await supa
      .from('programs')
      .select('id, slug, title, track, blurb, hours, cover_url')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data as Program;
  } catch (err) {
    // Return mock data if Supabase is not configured
    console.warn('Supabase not configured, returning mock data for slug:', slug);
    const programs = getMockPrograms();
    const program = programs.find(p => p.slug === slug);
    if (!program) throw new Error('Program not found');
    return program;
  }
}
