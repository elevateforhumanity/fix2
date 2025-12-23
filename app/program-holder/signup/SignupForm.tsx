'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function ProgramHolderSignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organizationName: '',
  });
  const [documents, setDocuments] = useState<{
    id?: File;
    socialSecurityCard?: File;
    syllabus?: File;
    credentials?: File;
  }>({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Step 1: Create auth user with role
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              full_name: `${formData.firstName} ${formData.lastName}`,
              role: 'program_holder',
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/program-holder/dashboard`,
          },
        }
      );

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error('User creation failed');
      }

      // Step 2: Create profile with program_holder role
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: authData.user.id,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: 'program_holder',
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // Step 3: Create program_holder record
      const { error: holderError } = await supabase
        .from('program_holders')
        .insert({
          user_id: authData.user.id,
          organization_name: formData.organizationName || null,
          status: 'verified_no_students',
          created_at: new Date().toISOString(),
        });

      if (holderError) {
        console.error('Program holder record error:', holderError);
      }

      // Step 4: Upload documents if provided
      if (Object.keys(documents).length > 0) {
        setUploadProgress('Uploading documents...');

        const uploadPromises = Object.entries(documents).map(
          async ([docType, file]) => {
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${authData.user.id}/${docType}_${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from('program-holder-documents')
              .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
              });

            if (uploadError) {
              console.error(`Upload error for ${docType}:`, uploadError);
            }

            // Store document reference in database
            await supabase.from('program_holder_documents').insert({
              program_holder_id: authData.user.id,
              document_type: docType,
              file_path: fileName,
              file_name: file.name,
              uploaded_at: new Date().toISOString(),
            });
          }
        );

        await Promise.all(uploadPromises);
      }

      setSuccess(true);

      // Redirect if session exists
      if (authData.session) {
        setTimeout(() => {
          router.push('/program-holder/dashboard');
          router.refresh();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-green-800">
        <h3 className="font-semibold">Account created successfully!</h3>
        <p className="mt-2 text-sm">
          Your program holder account has been created. Check your email to
          confirm your address, then you can access your dashboard.
        </p>
        <p className="mt-2 text-sm">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="organizationName"
          className="block text-sm font-medium text-gray-700"
        >
          Organization Name (Optional)
        </label>
        <input
          type="text"
          id="organizationName"
          value={formData.organizationName}
          onChange={(e) =>
            setFormData({ ...formData, organizationName: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password *
        </label>
        <input
          type="password"
          id="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Upload Documents (Optional)
        </h3>
        <p className="text-sm text-gray-600">
          Upload your credentials, ID, and program materials. You can also
          upload these later from your dashboard.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo ID
            </label>
            <input
              type="file"
              id="id"
              accept="image/*,.pdf"
              onChange={(e) =>
                setDocuments({ ...documents, id: e.target.files?.[0] })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="socialSecurityCard"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Social Security Card
            </label>
            <input
              type="file"
              id="socialSecurityCard"
              accept="image/*,.pdf"
              onChange={(e) =>
                setDocuments({
                  ...documents,
                  socialSecurityCard: e.target.files?.[0],
                })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="credentials"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teaching Credentials
            </label>
            <input
              type="file"
              id="credentials"
              accept="image/*,.pdf"
              onChange={(e) =>
                setDocuments({ ...documents, credentials: e.target.files?.[0] })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="syllabus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Syllabus
            </label>
            <input
              type="file"
              id="syllabus"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setDocuments({ ...documents, syllabus: e.target.files?.[0] })
              }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <strong>Automatic Access:</strong> Your program holder account will be
        created immediately. After confirming your email, you'll have full
        access to the portal.
      </div>

      {uploadProgress && (
        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          {uploadProgress}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-3 text-white font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating account...' : 'Create Program Holder Account'}
      </button>
    </form>
  );
}
