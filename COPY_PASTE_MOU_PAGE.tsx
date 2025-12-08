// UNIVERSAL MOU SIGNING PAGE
// Copy to: /workspaces/fix2/app/mou/[userType]/page.tsx
// This handles: students, staff, employers, partners, program_holders

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function MOUSigningPage({ params }: { params: { userType: string } }) {
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const supabase = createClient();
  const userType = params.userType;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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
        .select('full_name, email')
        .eq('id', currentUser.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || '');
        setEmail(profile.email || currentUser.email || '');
      }

      // Get MOU template
      const { data: templateData, error: templateError } = await supabase
        .from('mou_templates')
        .select('*')
        .eq('user_type', userType)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (templateError) throw templateError;
      setTemplate(templateData);

      // Check if already signed
      const { data: existingSignature } = await supabase
        .from('mou_signatures')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('template_id', templateData.id)
        .eq('is_valid', true)
        .single();

      if (existingSignature) {
        setSigned(true);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading MOU:', err);
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleSign() {
    if (!agreed) {
      setError('You must agree to the terms before signing');
      return;
    }

    if (!fullName || !email) {
      setError('Please provide your full name and email');
      return;
    }

    setSigning(true);
    setError('');

    try {
      const { error: signError } = await supabase
        .from('mou_signatures')
        .insert({
          user_id: user.id,
          template_id: template.id,
          user_type: userType,
          full_name: fullName,
          email: email,
          organization_name: organizationName || null,
          signature_data: fullName, // Typed signature
          agreed_at: new Date().toISOString()
        });

      if (signError) throw signError;

      setSigned(true);
      
      // Redirect based on user type
      setTimeout(() => {
        if (userType === 'student') {
          router.push('/portal/student/dashboard');
        } else if (userType === 'program_holder') {
          router.push('/program-holder/dashboard');
        } else if (userType === 'staff') {
          router.push('/staff/dashboard');
        } else {
          router.push('/dashboard');
        }
      }, 2000);
    } catch (err: any) {
      console.error('Error signing MOU:', err);
      setError(err.message);
    } finally {
      setSigning(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4" />
          <p className="text-slate-600">Loading agreement...</p>
        </div>
      </div>
    );
  }

  if (error && !template) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md text-center">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Agreement</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md text-center">
          <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Agreement Signed!</h2>
          <p className="text-slate-600 mb-4">
            Thank you for signing the agreement. You will be redirected to your dashboard.
          </p>
          <div className="animate-pulse text-sm text-slate-500">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-white">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Agreement"
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
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-700" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">
              {template?.name || 'Agreement'}
            </h1>
          </div>
          <p className="text-slate-600">
            Please review and sign this agreement to continue.
          </p>
        </div>
      </section>

      {/* Agreement Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: template?.content.replace(/\n/g, '<br>').replace(/###/g, '<h3>').replace(/##/g, '<h2>').replace(/#/g, '<h1>') 
              }}
            />
          </div>

          {/* Signature Form */}
          <div className="bg-slate-50 rounded-lg border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign Agreement</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-red-600" size={20} />
                  <p className="text-red-800 font-semibold">Error</p>
                </div>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full legal name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {(userType === 'program_holder' || userType === 'employer' || userType === 'partner') && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your organization name"
                    required
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border p-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-700 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">
                  I have read and agree to the terms and conditions outlined in this agreement. 
                  By typing my name above, I acknowledge that this constitutes a legal electronic signature.
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSign}
                disabled={!agreed || signing || !fullName || !email}
                className="flex-1 px-6 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
              >
                {signing ? 'Signing...' : 'Sign Agreement'}
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-4 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Signed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
