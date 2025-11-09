/**
 * Certificate Verification Page
 * Public page to verify certificate authenticity using verification code
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Verify() {
  const { code } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificate() {
      if (!supabase || !code) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('program_name, issued_at, pdf_url, program_id')
          .eq('verify_code', code)
          .maybeSingle();

        if (error || !data) {
          setNotFound(true);
        } else {
          setCertificate(data);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [code]);

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>
          {certificate
            ? `Verify Certificate - ${certificate.program_name}`
            : 'Certificate Verification'} | Elevate for Humanity
        </title>
        <meta
          name="description"
          content="Verify the authenticity of an Elevate for Humanity certificate"
        />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-2">Certificate Verification</h1>
            <p className="body-large text-text-secondary">
              Verify the authenticity of a certificate
            </p>
          </div>

          {loading ? (
            <div className="card card-spacious text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
              <p className="text-text-secondary">Verifying certificate...</p>
            </div>
          ) : notFound ? (
            <div className="card card-spacious text-center">
              <div className="py-12">
                <svg
                  className="mx-auto h-16 w-16 text-red-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h2 className="heading-3 mb-2 text-red-700">Certificate Not Found</h2>
                <p className="body-base text-text-secondary mb-6">
                  The verification code <strong>{code}</strong> is invalid or the certificate does
                  not exist.
                </p>
                <p className="text-sm text-text-secondary">
                  Please check the code and try again, or contact support if you believe this is an
                  error.
                </p>
              </div>
            </div>
          ) : certificate ? (
            <div className="card card-spacious">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="heading-2 mb-2 text-green-700">Certificate Verified</h2>
                <p className="body-base text-text-secondary mb-8">
                  This certificate is authentic and was issued by Elevate for Humanity
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-text-secondary">Program</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary">
                      {certificate.program_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary">Program ID</dt>
                    <dd className="mt-1 text-base text-text-primary">{certificate.program_id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary">Issue Date</dt>
                    <dd className="mt-1 text-base text-text-primary">
                      {new Date(certificate.issued_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-text-secondary">Verification Code</dt>
                    <dd className="mt-1 text-base font-mono text-text-primary">{code}</dd>
                  </div>
                </dl>

                {certificate.pdf_url && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                      href={certificate.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      View Certificate PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary mb-4">
              Need to verify a different certificate?
            </p>
            <Link to="/" className="text-brand hover:text-brand-primary-hover underline">
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
