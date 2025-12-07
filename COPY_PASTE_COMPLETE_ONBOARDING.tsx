// COMPLETE ONBOARDING PACKAGE PAGE
// Copy to: /workspaces/fix2/app/onboarding/complete/page.tsx
// Shows all required documents, tracks progress, requires signatures

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FileText, CheckCircle, Clock, AlertCircle, Download, Eye } from 'lucide-react';

export default function CompleteOnboardingPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState('');
  const [onboardingPackage, setOnboardingPackage] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [signatures, setSignatures] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadOnboarding();
  }, []);

  async function loadOnboarding() {
    try {
      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      const role = profile?.role || 'student';
      setUserType(role);

      // Get onboarding package for user type
      const { data: packageData } = await supabase
        .from('onboarding_packages')
        .select('*')
        .eq('user_type', role)
        .eq('is_active', true)
        .single();

      if (!packageData) {
        setError('No onboarding package found for your user type');
        setLoading(false);
        return;
      }
      setOnboardingPackage(packageData);

      // Get documents in package
      const { data: packageDocs } = await supabase
        .from('package_documents')
        .select(`
          *,
          hr_documents (*)
        `)
        .eq('package_id', packageData.id)
        .order('order_number');

      const docs = packageDocs?.map(pd => ({
        ...pd.hr_documents,
        is_required: pd.is_required,
        order_number: pd.order_number
      })) || [];
      setDocuments(docs);

      // Get existing signatures
      const { data: sigs } = await supabase
        .from('document_signatures')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('is_valid', true);

      setSignatures(sigs || []);

      // Get or create progress record
      let { data: progressData } = await supabase
        .from('user_onboarding_progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('package_id', packageData.id)
        .single();

      if (!progressData) {
        const { data: newProgress } = await supabase
          .from('user_onboarding_progress')
          .insert({
            user_id: currentUser.id,
            package_id: packageData.id,
            total_steps: docs.length
          })
          .select()
          .single();
        progressData = newProgress;
      }
      setProgress(progressData);

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading onboarding:', err);
      setError(err.message);
      setLoading(false);
    }
  }

  function isDocumentSigned(documentId: string) {
    return signatures.some(sig => sig.document_id === documentId);
  }

  function getCompletionPercentage() {
    if (!documents.length) return 0;
    const signed = documents.filter(doc => isDocumentSigned(doc.id)).length;
    return Math.round((signed / documents.length) * 100);
  }

  async function handleViewDocument(doc: any) {
    router.push(`/onboarding/document/${doc.id}`);
  }

  async function handleSignDocument(doc: any) {
    router.push(`/onboarding/sign/${doc.id}`);
  }

  async function completeOnboarding() {
    try {
      await supabase
        .from('user_onboarding_progress')
        .update({
          completed_at: new Date().toISOString(),
          is_complete: true
        })
        .eq('id', progress.id);

      // Redirect based on user type
      if (userType === 'student') {
        router.push('/portal/student/dashboard');
      } else if (userType === 'program_holder') {
        router.push('/program-holder/dashboard');
      } else if (userType === 'staff') {
        router.push('/staff/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading onboarding...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md text-center">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const allSigned = documents.every(doc => !doc.requires_signature || isDocumentSigned(doc.id));
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-white">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Complete Onboarding"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Title */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {onboardingPackage?.name || 'Complete Onboarding'}
          </h1>
          <p className="text-slate-600">
            {onboardingPackage?.description || 'Complete all required documents to finish onboarding'}
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 bg-slate-50 border-b">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
            <span className="text-sm font-semibold text-slate-700">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-blue-700 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            {documents.filter(doc => isDocumentSigned(doc.id)).length} of {documents.length} documents completed
          </p>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h2>
          
          <div className="space-y-4">
            {documents.map((doc, index) => {
              const isSigned = isDocumentSigned(doc.id);
              
              return (
                <div 
                  key={doc.id}
                  className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all ${
                    isSigned ? 'border-green-500' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSigned ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      {isSigned ? (
                        <CheckCircle className="text-green-700" size={24} />
                      ) : (
                        <FileText className="text-slate-600" size={24} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{doc.title}</h3>
                          {doc.is_required && (
                            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded mt-1">
                              Required
                            </span>
                          )}
                        </div>
                        {isSigned && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                            <CheckCircle size={16} />
                            Signed
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 text-sm mb-4">
                        Version {doc.version} • {doc.requires_signature ? 'Signature Required' : 'Review Only'}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-all text-sm"
                        >
                          <Eye size={16} />
                          View Document
                        </button>

                        {doc.requires_signature && !isSigned && (
                          <button
                            onClick={() => handleSignDocument(doc)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                          >
                            <FileText size={16} />
                            Sign Now
                          </button>
                        )}

                        {doc.pdf_url && (
                          <a
                            href={doc.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-all text-sm"
                          >
                            <Download size={16} />
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complete Button */}
          {allSigned && (
            <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
              <CheckCircle className="text-green-700 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">All Documents Completed!</h3>
              <p className="text-slate-600 mb-6">
                You have signed all required documents. Click below to complete onboarding and access your dashboard.
              </p>
              <button
                onClick={completeOnboarding}
                className="px-8 py-4 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-all text-lg"
              >
                Complete Onboarding & Continue
              </button>
            </div>
          )}

          {!allSigned && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Clock className="text-blue-700 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Complete All Documents</h4>
                  <p className="text-sm text-slate-600">
                    Please review and sign all required documents above to complete your onboarding process.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h3>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-slate-600 mb-4">
              If you have questions about any of these documents or need assistance completing your onboarding:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> <a href="mailto:support@elevateforhumanity.org" className="text-blue-700 hover:underline">support@elevateforhumanity.org</a></p>
              <p><strong>Phone:</strong> <a href="tel:3173143757" className="text-blue-700 hover:underline">317-314-3757</a></p>
              <p><strong>Hours:</strong> Monday-Friday, 9am-5pm EST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
