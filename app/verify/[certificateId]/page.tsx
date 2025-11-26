// app/verify/[certificateId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, XCircle, Shield, Calendar, User, BookOpen, ExternalLink } from "lucide-react";

type CertificateData = {
  valid: boolean;
  certificate?: {
    id: string;
    certificateNumber: string;
    verificationCode: string;
    issuedAt: string;
    recipientName: string;
    recipientEmail: string | null;
    courseName: string;
    courseDescription: string | null;
    issuer: string;
    issuerWebsite: string;
  };
  error?: string;
};

export default function CertificateVerificationPage() {
  const params = useParams<{ certificateId: string }>();
  const certificateId = params.certificateId;

  const [data, setData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!certificateId) return;

    (async () => {
      try {
        const res = await fetch(`/api/verify/certificate/${certificateId}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Failed to verify certificate", e);
        setData({ valid: false, error: "Failed to verify certificate" });
      } finally {
        setLoading(false);
      }
    })();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-sm text-slate-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.valid || !data.certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Valid</h1>
          <p className="text-sm text-slate-600 mb-6">
            {data?.error || "This certificate could not be verified or has been revoked."}
          </p>
          <a
            href="https://www.elevateforhumanity.org"
            className="inline-block rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Visit Elevate For Humanity
          </a>
        </div>
      </div>
    );
  }

  const cert = data.certificate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Verification Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Verified Certificate</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Certificate Verification</h1>
          <p className="text-sm text-slate-600">
            This certificate has been verified and is authentic
          </p>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">{cert.issuer}</h2>
                <p className="text-sm text-blue-100">Workforce Development Platform</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Recipient */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <User className="w-4 h-4" />
                Certificate Holder
              </div>
              <p className="text-2xl font-bold text-slate-900">{cert.recipientName}</p>
              {cert.recipientEmail && (
                <p className="text-sm text-slate-600 mt-1">{cert.recipientEmail}</p>
              )}
            </div>

            {/* Course */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <BookOpen className="w-4 h-4" />
                Program Completed
              </div>
              <p className="text-xl font-bold text-slate-900">{cert.courseName}</p>
              {cert.courseDescription && (
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {cert.courseDescription}
                </p>
              )}
            </div>

            {/* Issue Date */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <Calendar className="w-4 h-4" />
                Issue Date
              </div>
              <p className="text-lg font-semibold text-slate-900">
                {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Certificate Number
                </p>
                <p className="text-sm font-mono text-slate-900">{cert.certificateNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Verification Code
                </p>
                <p className="text-sm font-mono text-slate-900">{cert.verificationCode}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Issued by {cert.issuer}</span>
              <a
                href={cert.issuerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
          <Shield className="w-8 h-8 mx-auto mb-3 text-green-600" />
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            How to Verify This Certificate
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            This certificate can be verified at any time by visiting{" "}
            <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">
              elevateforhumanity.org/verify/{cert.id}
            </span>
            {" "}or by scanning the QR code on the original certificate.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://www.elevateforhumanity.org"
            className="rounded-lg border-2 border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Learn More
          </a>
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Print Verification
          </button>
        </div>
      </div>
    </div>
  );
}
