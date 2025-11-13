import React, { useRef } from 'react';
import { Award, Download, Share2, CheckCircle } from 'lucide-react';

interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: Date;
  instructorName: string;
  certificateId: string;
  programType: string;
  hours?: number;
  grade?: string;
}

interface CertificateGeneratorProps {
  data: CertificateData;
  onDownload?: () => void;
  onShare?: () => void;
}

export default function CertificateGenerator({
  data,
  onDownload,
  onShare,
}: CertificateGeneratorProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // In production, use html2canvas or similar library
    // For now, trigger print dialog
    window.print();
    onDownload?.();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.courseName} Certificate`,
        text: `I completed ${data.courseName} at Elevate for Humanity!`,
        url: window.location.href,
      });
    }
    onShare?.();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="bg-white rounded-lg shadow-2xl p-12 mb-8 border-8 border-double border-brown-300"
        style={{ aspectRatio: '1.414/1' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-brown-900 mb-2">
            Certificate of Completion
          </h1>
          <div className="w-32 h-1 bg-green-600 mx-auto" />
        </div>
        {/* Organization */}
        <div className="text-center mb-8">
          <p className="text-lg text-brown-700">This certifies that</p>
        </div>
        {/* Student Name */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-serif font-bold text-brown-900 border-b-2 border-brown-300 pb-2 inline-block px-8">
            {data.studentName}
          </h2>
        </div>
        {/* Course Details */}
        <div className="text-center mb-8">
          <p className="text-lg text-brown-700 mb-2">
            has successfully completed the
          </p>
          <h3 className="text-3xl font-bold text-brown-900 mb-4">
            {data.courseName}
          </h3>
          <p className="text-brown-600">
            {data.programType}
            {data.hours && ` • ${data.hours} Hours`}
            {data.grade && ` • Grade: ${data.grade}`}
          </p>
        </div>
        {/* Date */}
        <div className="text-center mb-8">
          <p className="text-brown-700">
            Completed on{' '}
            <span className="font-semibold">
              {formatDate(data.completionDate)}
            </span>
          </p>
        </div>
        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-t-2 border-brown-300 pt-2">
              <p className="font-semibold text-brown-900">
                {data.instructorName}
              </p>
              <p className="text-sm text-brown-600">Program Instructor</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-brown-300 pt-2">
              <p className="font-semibold text-brown-900">
                Elevate for Humanity
              </p>
              <p className="text-sm text-brown-600">
                Career & Technical Institute
              </p>
            </div>
          </div>
        </div>
        {/* Certificate ID */}
        <div className="text-center mt-8">
          <p className="text-xs text-brown-500">
            Certificate ID: {data.certificateId}
          </p>
          <p className="text-xs text-brown-500">
            Verify at: elevateforhumanity.org/verify/{data.certificateId}
          </p>
        </div>
        {/* Seal */}
        <div className="absolute bottom-12 right-12 print:block hidden">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-green-50">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-green-700">VERIFIED</p>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center print:hidden">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
        >
          <Download className="w-5 h-5" />
          Download Certificate
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-white text-brown-900 border-2 border-brown-300 rounded-lg hover:bg-beige-50 transition font-semibold"
        >
          <Share2 className="w-5 h-5" />
          Share Certificate
        </button>
      </div>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          ${
            certificateRef.current
              ? `
            #certificate-container,
            #certificate-container * {
              visibility: visible;
            }
            #certificate-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          `
              : ''
          }
        }
      `}</style>
    </div>
  );
}
