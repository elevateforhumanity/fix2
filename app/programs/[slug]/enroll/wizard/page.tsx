import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EnrollmentWizard from '@/components/enrollment/EnrollmentWizard';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { data: program } = await supabase
    .from('programs')
    .select('name')
    .eq('slug', params.slug)
    .single();

  return {
    title: `Enroll in ${program?.name || 'Program'} | Elevate For Humanity`,
    description: `Complete your enrollment for ${program?.name || 'this program'}`,
  };
}

export default async function EnrollmentWizardPage({ params }: PageProps) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect(`/login?next=/programs/${params.slug}/enroll/wizard`);
  }

  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!program) {
    redirect('/programs');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <EnrollmentWizard
        programId={program.id}
        programName={program.name}
        programSlug={program.slug}
        price={program.tuition || 0}
      />
    </div>
  );
}
