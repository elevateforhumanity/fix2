import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCertificate } from '../services/certificates';
import CertificateDownload from '../components/CertificateDownload';

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

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="section">
        <div className="container">Loading...</div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="section">
        <div className="container">
          <div className="card p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600">
              Certificate Not Found
            </h2>
            <p className="mt-2 text-brand-text-muted">
              This certificate does not exist or has been revoked.
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
    <div className="min-h-screen bg-brand-surface py-12">
      <div className="container max-w-4xl">
        <div className="mb-6 flex gap-3 justify-end print:hidden">
          <button onClick={handlePrint} className="btn-outline">
            🖨️ Print Certificate
          </button>
        </div>
        {/* SVG Download Option */}
        <div className="mb-6 print:hidden">
          <CertificateDownload
            student={
              cert.profiles?.full_name || cert.profiles?.email || 'Student'
            }
            program={cert.courses?.title || 'Course'}
            date={issueDate}
          />
        </div>
        {/* Certificate */}
        <div className="bg-white border-8 border-brand-600 p-12 shadow-2xl">
          <div className="text-center">
            {/* Header */}
            <div className="text-brand-600 text-6xl font-bold mb-4">
              Elevate for Humanity
            </div>
            <div className="text-2xl text-brand-text-muted mb-8">
              Certificate of Completion
            </div>
            {/* Divider */}
            <div className="w-32 h-1 bg-brand-600 mx-auto mb-8" />
            {/* Body */}
            <div className="text-lg text-brand-text mb-6">
              This certifies that
            </div>
            <div className="text-4xl font-bold text-brand-text mb-6">
              {cert.profiles?.email || 'Student'}
            </div>
            <div className="text-lg text-brand-text mb-6">
              has successfully completed
            </div>
            <div className="text-3xl font-semibold text-brand-700 mb-8">
              {cert.courses?.title}
            </div>
            {/* Footer */}
            <div className="mt-12 grid grid-cols-2 gap-8 text-sm text-brand-text-muted">
              <div>
                <div className="font-semibold">Issue Date</div>
                <div>{issueDate}</div>
              </div>
              <div>
                <div className="font-semibold">Certificate Number</div>
                <div className="font-mono">{cert.certificate_number}</div>
              </div>
            </div>
            {/* Signature Line */}
            <div className="mt-12 pt-8 border-t-2 border-brand-border-dark">
              <div className="text-sm text-brand-text-muted">
                Authorized by Elevate for Humanity
              </div>
              <div className="mt-2 text-xs text-brand-text-light">
                Indianapolis, IN • ETPL Provider • DOL Apprenticeship Sponsor
              </div>
            </div>
          </div>
        </div>
        {/* Verification */}
        <div className="mt-6 text-center text-sm text-brand-text-muted print:hidden">
          <p>
            Verify this certificate at:{' '}
            <span className="font-mono">
              {window.location.origin}/verify/{cert.certificate_number}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
