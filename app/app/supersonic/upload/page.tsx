'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DocumentUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);
    
    // Add files to formData
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    start {
      const response = await fetch('/api/supersonic-fast-cash/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error uploading your documents. Please call us at 317-314-3757.');
      }
    } catch (error) {
      alert('There was an error uploading your documents. Please call us at 317-314-3757.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Documents Uploaded Successfully!</h1>
          <p className="text-lg text-slate-700 mb-6">
            Thank you! We've received your tax documents. Our team will review them and contact you within 24 hours.
          </p>
          <p className="text-slate-600 mb-8">
            Need immediate assistance? Call us at{' '}
            <a href="tel:3173143757" className="text-blue-600 font-bold hover:underline">
              317-314-3757
            </a>
          </p>
          <Link
            href="/supersonic-fast-cash"
            className="inline-block px-8 py-4 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/supersonic-fast-cash" className="inline-block mb-6">
            <h1 className="text-5xl font-black text-white mb-2">
              SUPERSONIC <span className="text-yellow-400">FAST CASH</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-4">Upload Your Tax Documents</h2>
          <p className="text-xl text-white/90">
            Securely upload your W-2s, 1099s, and other tax documents
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-slate-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-slate-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ssn" className="block text-sm font-bold text-slate-900 mb-2">
                Last 4 Digits of SSN *
              </label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                maxLength={4}
                pattern="[0-9]{4}"
                required
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="1234"
              />
            </div>

            {/* Document Upload */}
            <div>
              <label htmlFor="documents" className="block text-sm font-bold text-slate-900 mb-2">
                Upload Tax Documents *
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-600 transition">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                <label htmlFor="documents" className="cursor-pointer">
                  <span className="text-blue-600 font-bold hover:underline">Click to upload</span>
                  <span className="text-slate-600"> or drag and drop</span>
                </label>
                <p className="text-sm text-slate-500 mt-2">
                  PDF, JPG, PNG, DOC up to 10MB each
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-900 mb-2">Selected Files:</p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-slate-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Document Checklist */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-3">Documents to Upload:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>W-2 forms from all employers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>1099 forms (interest, dividends, self-employment)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Prior year tax return (if available)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Photo ID (driver's license or state ID)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Social Security cards for all family members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Bank account information for direct deposit</span>
                </li>
              </ul>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-bold text-slate-900 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Any special circumstances or questions..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full px-8 py-4 bg-yellow-400 text-blue-900 font-black rounded-full hover:bg-yellow-300 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'UPLOADING...' : 'UPLOAD DOCUMENTS'}
              </button>
            </div>

            <p className="text-xs text-slate-600 text-center">
              Your documents are encrypted and securely transmitted. We never share your information with third parties.
            </p>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white mb-4">
            Need help? Call us at{' '}
            <a href="tel:3173143757" className="text-yellow-400 font-bold hover:underline">
              317-314-3757
            </a>
          </p>
          <Link href="/supersonic-fast-cash" className="text-white/80 hover:text-white underline">
            ← Back to Supersonic Fast Cash
          </Link>
        </div>
      </div>
    </main>
  );
}
