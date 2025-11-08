import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCertificateByNumber } from '../services/certificates';

export default function VerifyCertificatePage() {
  const { certificateNumber } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!certificateNumber) {
      setError('No certificate number provided');
      setLoading(false);
      return;
    }

    getCertificateByNumber(certificateNumber)
      .then((data) => {
        if (data) {
          setCert(data);
        } else {
          setError('Certificate not found');
        }
      })
      .catch(() => {
        setError('Failed to verify certificate');
      })
      .finally(() => setLoading(false));
  }, [certificateNumber]);

  if (loading) {
    return (
      <div className="section">
        <div className="container max-w-2xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
            <p className="mt-4 text-brown-600">Verifying certificate...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="section">
        <div className="container max-w-2xl">
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold text-brown-900 mb-2">
              Certificate Not Valid
            </h2>
            <p className="text-brown-600 mb-6">
              {error || 'This certificate could not be verified.'}
            </p>
            <p className="text-sm text-brown-500">
              Certificate Number:{' '}
              <code className="font-mono">{certificateNumber}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const issueDate = new Date(cert.issued_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="section">
      <div className="container max-w-3xl">
        {/* Verification Success */}
        <div className="card p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Certificate Verified
            </h1>
            <p className="text-brown-600">
              This is a valid certificate issued by Elevate for Humanity
            </p>
          </div>
          {/* Certificate Details */}
          <div className="border-t border-brown-200 pt-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                  Student Name
                </h3>
                <p className="text-lg text-brown-900">
                  {cert.profiles?.full_name ||
                    cert.profiles?.email ||
                    'Student'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                  Course Name
                </h3>
                <p className="text-lg text-brown-900">
                  {cert.courses?.title || 'Course'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                  Issue Date
                </h3>
                <p className="text-lg text-brown-900">{issueDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                  Certificate Number
                </h3>
                <p className="text-lg text-brown-900 font-mono">
                  {cert.certificate_number}
                </p>
              </div>
              {cert.courses?.program_type && (
                <div>
                  <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                    Program Type
                  </h3>
                  <p className="text-lg text-brown-900">
                    {cert.courses.program_type}
                  </p>
                </div>
              )}
              {cert.courses?.total_hours && (
                <div>
                  <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                    Total Hours
                  </h3>
                  <p className="text-lg text-brown-900">
                    {cert.courses.total_hours} hours
                  </p>
                </div>
              )}
              {cert.grade && (
                <div>
                  <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                    Grade
                  </h3>
                  <p className="text-lg text-brown-900">{cert.grade}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-brown-500 uppercase mb-1">
                  Status
                </h3>
                <p className="text-lg text-green-600 font-semibold">Valid</p>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="border-t border-brown-200 pt-6 mt-6 flex gap-4 justify-center">
            <Link to={`/certificate/${cert.id}`} className="btn-primary">
              View Full Certificate
            </Link>
          </div>
        </div>
        {/* Additional Info */}
        <div className="card p-6 bg-beige-50">
          <h3 className="text-lg font-semibold text-brown-900 mb-3">
            About This Certificate
          </h3>
          <p className="text-sm text-brown-600 mb-4">
            This certificate was issued by Elevate for Humanity, an
            ETPL-approved provider and DOL Registered Apprenticeship Sponsor.
            All certificates are digitally verified and permanently stored.
          </p>
          <div className="flex items-center gap-2 text-sm text-brown-500">
            <span>🔒</span>
            <span>Verified on {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
