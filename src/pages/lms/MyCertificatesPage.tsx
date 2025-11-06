import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserCertificates } from '../../services/certificates';
import { useAuth } from '../../contexts/AuthContext';

export default function MyCertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserCertificates(user.id)
      .then(setCertificates)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-brown-600">Loading certificates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brown-900 mb-2">
            My Certificates
          </h1>
          <p className="text-lg text-brown-600">
            View and download all your earned certificates
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-semibold text-brown-900 mb-2">
              No Certificates Yet
            </h2>
            <p className="text-brown-600 mb-6">
              Complete a course to earn your first certificate!
            </p>
            <Link to="/lms/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => {
              const issueDate = new Date(cert.issued_at).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              );

              return (
                <div
                  key={cert.id}
                  className="card hover:shadow-lg transition-shadow"
                >
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-green-50 to-beige-50 p-6 border-b-4 border-green-600">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏆</div>
                      <h3 className="text-lg font-semibold text-brown-900 mb-1">
                        Certificate of Completion
                      </h3>
                      <p className="text-sm text-brown-600">
                        {cert.courses?.title || 'Course'}
                      </p>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="text-xs font-semibold text-brown-500 uppercase mb-1">
                          Issued
                        </div>
                        <div className="text-sm text-brown-900">
                          {issueDate}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-brown-500 uppercase mb-1">
                          Certificate ID
                        </div>
                        <div className="text-sm text-brown-900 font-mono">
                          {cert.certificate_number}
                        </div>
                      </div>

                      {cert.grade && (
                        <div>
                          <div className="text-xs font-semibold text-brown-500 uppercase mb-1">
                            Grade
                          </div>
                          <div className="text-sm text-brown-900 font-semibold">
                            {cert.grade}
                          </div>
                        </div>
                      )}

                      {cert.courses?.total_hours && (
                        <div>
                          <div className="text-xs font-semibold text-brown-500 uppercase mb-1">
                            Hours
                          </div>
                          <div className="text-sm text-brown-900">
                            {cert.courses.total_hours} hours
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/certificate/${cert.id}`}
                        className="btn-primary flex-1 text-center text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/verify/${cert.certificate_number}`;
                          navigator.clipboard.writeText(url);
                          alert('Verification link copied!');
                        }}
                        className="btn-outline text-sm"
                        title="Copy verification link"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        {certificates.length > 0 && (
          <div className="card p-6 mt-8 bg-beige-50">
            <h3 className="text-lg font-semibold text-brown-900 mb-3">
              About Your Certificates
            </h3>
            <ul className="space-y-2 text-sm text-brown-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  All certificates are digitally verified and permanently stored
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Share your verification link with employers or institutions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Download and print certificates for your records</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Certificates are issued by an ETPL-approved provider
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
