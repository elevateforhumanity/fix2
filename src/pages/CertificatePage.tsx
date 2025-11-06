import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCertificate } from '../services/certificates';
import CertificateGenerator from '../components/CertificateGenerator';

export default function CertificatePage() {
  const { certificateId } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!certificateId) return;
    getCertificate(certificateId)
      .then(setCert)
      .finally(() => setLoading(false));
  }, [certificateId]);

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-brown-600">Loading certificate...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="section">
        <div className="container max-w-2xl">
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold text-brown-900 mb-2">
              Certificate Not Found
            </h2>
            <p className="text-brown-600">
              This certificate does not exist or has been revoked.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const certificateData = {
    studentName: cert.profiles?.full_name || cert.profiles?.email || 'Student',
    courseName: cert.courses?.title || 'Course',
    completionDate: new Date(cert.issued_at),
    instructorName: cert.courses?.instructor_name || 'Elevate for Humanity',
    certificateId: cert.certificate_number,
    programType: cert.courses?.program_type || 'Professional Development',
    hours: cert.courses?.total_hours || 0,
    grade: cert.grade || 'Pass',
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/verify/${cert.certificate_number}`;
    if (navigator.share) {
      navigator
        .share({
          title: `Certificate: ${certificateData.courseName}`,
          text: `I completed ${certificateData.courseName} at Elevate for Humanity!`,
          url: url,
        })
        .catch(() => {
          // Fallback to clipboard
          navigator.clipboard.writeText(url);
          alert('Certificate link copied to clipboard!');
        });
    } else {
      navigator.clipboard.writeText(url);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container max-w-4xl">
        <CertificateGenerator
          data={certificateData}
          onDownload={handleDownload}
          onShare={handleShare}
        />

        {/* Verification Info */}
        <div className="mt-8 text-center print:hidden">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-brown-900 mb-2">
              Certificate Verification
            </h3>
            <p className="text-sm text-brown-600 mb-3">
              Anyone can verify this certificate at:
            </p>
            <code className="block bg-beige-100 px-4 py-2 rounded text-sm text-brown-900">
              {window.location.origin}/verify/{cert.certificate_number}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
