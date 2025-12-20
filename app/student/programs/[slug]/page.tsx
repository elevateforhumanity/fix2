import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';


type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${title} Program | Elevate For Humanity`,
    description: `Access your ${title} program modules and resources.`,
  };
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function StudentProgramPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">
              Welcome to your program. Access your modules and track your
              progress below.
            </p>
          </div>

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
