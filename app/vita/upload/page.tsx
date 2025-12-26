import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.elevateforhumanity.org/vita/upload' },
  title: 'Upload Tax Documents | Elevate For Humanity',
  description: 'Securely upload your tax documents for preparation.',
};

export default async function VITAUploadPage() {
  const { user } = await requireRole(['student', 'admin', 'super_admin']);
  const supabase = await createClient();

  const { data: documents } = await supabase
    .from('tax_documents')
    .select('*')
    .eq('user_id', user.id)
    .order('upload_date', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Upload Tax Documents
              </h1>
              <p className="text-slate-600 mt-2">
                Securely upload your tax forms
              </p>
            </div>
            <Link
              href="/vita"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to VITA
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
          <div className="text-center mb-6">
            <Upload className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Upload Your Documents
            </h2>
            <p className="text-slate-600">
              Drag and drop files here or click to browse
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <input type="file" className="hidden" id="file-upload" multiple />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-700 font-medium mb-1">Click to upload</p>
              <p className="text-slate-500 text-sm">PDF, JPG, PNG up to 10MB</p>
            </label>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Accepted Documents:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• W-2 forms</li>
              <li>• 1099 forms</li>
              <li>• Photo ID</li>
              <li>• Social Security card</li>
              <li>• Bank statements</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Your Uploaded Documents
          </h2>

          {!documents || documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">
                        {doc.file_name}
                      </p>
                      <p className="text-sm text-slate-500">
                        Uploaded{' '}
                        {new Date(doc.upload_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.virus_scan_status === 'clean' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : doc.virus_scan_status === 'pending' ? (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <button className="text-sm text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
