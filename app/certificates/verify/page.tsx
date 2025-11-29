'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle, Search } from 'lucide-react';

interface CertificateVerification {
  valid: boolean;
  studentName?: string;
  courseName?: string;
  issuedDate?: string;
  issuer?: string;
  type?: string;
  error?: string;
}

export default function VerifyCertificatePage() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateVerification | null>(null);

  const handleVerify = async () => {
    if (!certificateNumber.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api/certificates/verify?number=${encodeURIComponent(certificateNumber)}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        valid: false,
        error: 'Failed to verify certificate'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Verify Certificate</CardTitle>
          <CardDescription>
            Enter a certificate number to verify its authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Enter certificate number (e.g., MOD-1234567890-ABC123)"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button onClick={handleVerify} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </div>

          {result && (
            <div className={`border-2 rounded-lg p-4 ${result.valid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <div className="flex items-start gap-3">
                {result.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  {result.valid ? (
                    <div className="space-y-2">
                      <p className="font-semibold text-green-700">
                        ✓ Valid Certificate
                      </p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Student:</span>{' '}
                          {result.studentName}
                        </p>
                        <p>
                          <span className="font-medium">Course:</span>{' '}
                          {result.courseName}
                        </p>
                        <p>
                          <span className="font-medium">Issued:</span>{' '}
                          {new Date(result.issuedDate!).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Issuer:</span>{' '}
                          {result.issuer}
                        </p>
                        <p>
                          <span className="font-medium">Type:</span>{' '}
                          {result.type === 'module' ? 'Module Certificate' : 'Program Certificate'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-700">
                      {result.error || 'Certificate not found or invalid'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">About Certificate Verification</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Module certificates are issued by partner organizations</li>
              <li>Program certificates are issued by Elevate for Humanity</li>
              <li>All certificates are digitally verified and tamper-proof</li>
              <li>Certificate numbers are unique and cannot be duplicated</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
