'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function EnrollmentApplicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    fundingSource: 'WIOA',
  });

  const programs = [
    'Medical Assistant',
    'CDL Truck Driving',
    'HVAC Technician',
    'Barber Apprenticeship',
    'CNA Certification',
    'Building Maintenance',
    'Welding',
    'Electrical',
    'IT Support',
    'Culinary Arts',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, create user account
      const signupRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: Math.random().toString(36).slice(-8), // Temporary password
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          role: 'student',
        }),
      });

      if (!signupRes.ok) {
        const data = await signupRes.json();
        throw new Error(data.error || 'Failed to create account');
      }

      // Redirect to success page
      router.push('/enroll/success');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Apply for Free Training</CardTitle>
            <p className="text-gray-600 mt-2">
              Complete this form to start your enrollment. All programs are 100%
              funded.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(317) 555-0100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Program *
                </label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a program...</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Funding Source *
                </label>
                <select
                  required
                  value={formData.fundingSource}
                  onChange={(e) =>
                    setFormData({ ...formData, fundingSource: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="WIOA">
                    WIOA (Workforce Innovation & Opportunity Act)
                  </option>
                  <option value="WRG">WRG (Workforce Ready Grant)</option>
                  <option value="JRI">
                    JRI (Justice Reinvestment Initiative)
                  </option>
                  <option value="Other">Other / Not Sure</option>
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>

              <p className="text-sm text-gray-600 text-center">
                By submitting, you agree to be contacted about your enrollment.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
