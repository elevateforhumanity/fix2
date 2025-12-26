import DocumentUpload from '@/components/tax/DocumentUpload';

export const metadata = {
  title: 'Upload Tax Documents | VITA',
  description: 'Securely upload your tax documents for VITA preparation',
};

export default function VITAUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Upload Your Tax Documents</h1>
        <p className="text-lg text-gray-600 mb-8">
          Securely upload W-2s, 1099s, and other tax documents.
        </p>
        <DocumentUpload />
      </div>
    </div>
  );
}
