import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import SkillsGapAnalysis from '@/components/SkillsGapAnalysis';

export const metadata = {
  title: 'Skills Gap Analysis | Student Portal',
  description: 'Identify skill gaps and get personalized learning recommendations',
,
  openGraph: {
    images: ["/images/team-new/team-12.jpg"],
    type: "website",
  }};

export default async function SkillsGapPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/skills-gap');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skills Gap Analysis</h1>
          <p className="mt-2 text-gray-600">
            Identify your skill gaps and get personalized recommendations
          </p>
        </div>
        
        <SkillsGapAnalysis />
      </div>
    </div>
  );
}
