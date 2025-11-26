import { BlockchainCredentialVerification } from '@/components/BlockchainCredentialVerification';

export const metadata = {
  title: 'Verify Credential | Elevate for Humanity',
  description: 'Verify the authenticity of certificates and credentials',
,
  openGraph: {
    images: ["/images/students-new/student-22.jpg"],
    type: "website",
  }};

export default function VerifyCredentialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Verify Credential</h1>
          <p className="mt-4 text-lg text-gray-600">
            Enter a certificate ID or credential hash to verify authenticity
          </p>
        </div>
        
        <BlockchainCredentialVerification />
      </div>
    </div>
  );
}
