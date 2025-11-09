/**
 * My Certificates Page
 * Displays all certificates earned by the authenticated user
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MyCertificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCertificates() {
      if (!user || !supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issued_at', { ascending: false });

        if (error) throw error;
        setCertificates(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCertificates();
  }, [user]);

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>My Certificates | Elevate for Humanity</title>
        <meta name="description" content="View and download your earned certificates" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="heading-1 mb-2">My Certificates</h1>
            <p className="body-large text-text-secondary">
              View and share your earned certificates
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading certificates...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          ) : certificates.length === 0 ? (
            <div className="card card-spacious text-center">
              <div className="py-12">
                <svg
                  className="mx-auto h-16 w-16 text-neutral-mid mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="heading-3 mb-2">No certificates yet</h2>
                <p className="body-base text-text-secondary mb-6">
                  Complete courses to earn certificates
                </p>
                <Link to="/student-portal" className="btn btn-primary">
                  Browse Courses
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="card hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="heading-4 mb-1">{cert.program_name}</h3>
                        <p className="text-sm text-text-secondary">
                          Issued {new Date(cert.issued_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <svg
                        className="h-8 w-8 text-brand flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>

                    <div className="space-y-3">
                      {cert.pdf_url && (
                        <a
                          href={cert.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline w-full"
                        >
                          Download PDF
                        </a>
                      )}
                      <Link
                        to={`/verify/${cert.verify_code}`}
                        className="block text-center text-sm text-brand hover:text-brand-primary-hover underline"
                      >
                        Verify: {cert.verify_code}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
