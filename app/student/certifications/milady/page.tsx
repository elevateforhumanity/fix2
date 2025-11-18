'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, ExternalLink } from 'lucide-react';

export default function MiladyRISEPage() {
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch('/api/milady-rise/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setEnrollmentData(data);
      setEnrolled(true);
    } catch (error: any) {
      alert(error.message);
    }
    setEnrolling(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl">
                Milady RISE Certification
              </CardTitle>
              <Badge variant="success">Partner Program</Badge>
            </div>
            <p className="text-gray-600 mt-2">
              Professional beauty education certification through Milady RISE
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">
                  Program Benefits
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Industry-recognized Milady certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>100% scholarship available through partner code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Online learning platform access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Career placement assistance</span>
                  </li>
                </ul>
              </div>

              {!enrolled ? (
                <div>
                  <h3 className="font-bold text-lg mb-3">Ready to Enroll?</h3>
                  <p className="text-gray-600 mb-4">
                    Click below to activate your Milady RISE certification
                    enrollment. You'll receive your unique promo code and
                    enrollment instructions.
                  </p>
                  <Button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    size="lg"
                    className="w-full"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll in Milady RISE'}
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Enrollment Successful!
                  </h3>
                  {enrollmentData?.next_steps && (
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-green-900 mb-2">
                          Your Promo Code:
                        </p>
                        <div className="bg-white p-3 rounded border border-green-300 font-mono text-lg">
                          {enrollmentData.next_steps.promo_code}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-green-900 mb-2">
                          Next Steps:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-green-800">
                          <li>Visit the Milady RISE enrollment portal</li>
                          <li>Enter your promo code during registration</li>
                          <li>Complete your profile and course selection</li>
                          <li>Begin your certification journey</li>
                        </ol>
                      </div>
                      <Button asChild size="lg" className="w-full">
                        <a
                          href={enrollmentData.next_steps.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Go to Milady RISE Portal
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-3">About Milady RISE</h3>
                <p className="text-gray-600 text-sm">
                  Milady RISE is the beauty industry's leading professional
                  development program. Through our partnership, Elevate for
                  Humanity students receive exclusive access to
                  industry-recognized certifications at no cost.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
