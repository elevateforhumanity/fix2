import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { supabaseServer } from '@/lib/supabaseServer';

type Params = Promise<{ slug: string }>;

export const revalidate = 3600; // Cache 1 hour

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = supabaseServer();
  
  const { data } = await supabase
    .from('programs')
    .select('name, excerpt')
    .eq('slug', slug)
    .single();

  return {
    title: `${data?.name || slug} Program | Elevate For Humanity`,
    description: data?.excerpt || `Access your ${slug} program modules and resources.`,
  };
}

export default async function StudentProgramPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('programs')
    .select('name, excerpt, cover_image_url, cover_image_alt')
    .eq('slug', slug)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={data.name}
        excerpt={data.excerpt}
        imageUrl={data.cover_image_url}
        imageAlt={data.cover_image_alt}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Program Modules */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Program Modules</h2>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <Link
                  href={`/student/programs/${slug}/modules/1`}
                  className="block"
                >
                  <h3 className="font-semibold text-lg mb-2">Module 1</h3>
                  <p className="text-gray-600 text-sm">
                    Start your learning journey with the first module
                  </p>
                  <div className="mt-3">
                    <span className="text-brand-blue-600 text-sm font-medium">
                      Start Module →
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border rounded-lg p-4 opacity-60">
                <h3 className="font-semibold text-lg mb-2">
                  Additional Modules
                </h3>
                <p className="text-gray-600 text-sm">
                  More modules will appear as you progress through the program
                </p>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6">
            <Link
              href="/student/dashboard"
              className="text-brand-blue-600 hover:text-brand-blue-700"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
