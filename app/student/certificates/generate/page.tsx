import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import CertificateGenerator from '@/components/CertificateGenerator';

export const metadata = {
  title: 'Generate Certificate | Student Portal',
  description: 'Generate your program completion certificate',
};

export default async function GenerateCertificatePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/certificates/generate');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Certificate Generator</h1>
          <p className="mt-2 text-gray-600">
            Generate and download your program completion certificate
          </p>
        </div>
        
        <CertificateGenerator />
      </div>
    </div>
  );
}
