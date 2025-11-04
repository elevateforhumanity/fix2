import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * White-Label Milady RISE Enrollment
 * Students enroll through Elevate for Humanity
 * We handle registration with Milady using our school code
 */
const MiladyRISEEnrollment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    program: '',
    agreeToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      // Submit to our backend which will:
      // 1. Register student in our LMS
      // 2. Send registration to Milady with our school code
      // 3. Track enrollment for reporting
      const response = await fetch('/api/milady-rise/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          schoolCode: 'efhcti-rise295',
          schoolName: 'Elevate for Humanity Career & Technical Institute',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Enrollment failed. Please try again or contact support.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enrollment Successful!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for enrolling in the Milady RISE Certification program
              through Elevate for Humanity.
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-bold text-lg mb-3">What Happens Next:</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <span>
                    <strong>Email Confirmation:</strong> You'll receive a
                    confirmation email within 15 minutes with your enrollment
                    details.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>
                    <strong>Milady Access:</strong> Within 24 hours, you'll
                    receive login credentials for Milady Training platform.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>
                    <strong>Start Learning:</strong> Access your courses and
                    begin working toward certification.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <span>
                    <strong>Scholarship Eligibility:</strong> Upon completion,
                    you'll be eligible for the $500 RISE Scholarship.
                  </span>
                </li>
              </ol>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Check your spam folder if you don't
                see the confirmation email. Add noreply@elevateforhumanity.org
                to your contacts.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/lms"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
              >
                Go to Student Portal
              </a>
              <a
                href="/lms/milady-rise"
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Enroll in Milady RISE Certification
            </h1>
            <p className="text-gray-600">
              Through Elevate for Humanity Career & Technical Institute
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">
                  FREE for EFH Students
                </p>
                <p className="text-sm text-green-800">
                  This $29.95 certification is completely free for Elevate for
                  Humanity students through our partnership with Milady.
                </p>
              </div>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="your.email@example.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                Your Milady login credentials will be sent to this email
              </p>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Student ID (if applicable)
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="EFH-12345"
              />
            </div>
            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Program *
              </label>
              <select
                id="program"
                name="program"
                required
                value={formData.program}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="">Select your program</option>
                <option value="barbering">Barbering</option>
                <option value="cosmetology">Cosmetology</option>
                <option value="esthetics">Esthetics</option>
                <option value="nail-technology">Nail Technology</option>
                <option value="instructor-training">Instructor Training</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                What You'll Receive:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Free access to all three certification courses (normally
                    $29.95)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Client Well-Being & Safety Certification upon completion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Eligibility for $500 RISE Scholarship (10 awards per period)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Digital certificates for each completed course</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>60 days of access to complete all courses</span>
                </li>
              </ul>
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                I agree to the terms and conditions of the Milady RISE program
                and understand that my information will be shared with Milady (a
                Cengage company) for course access. I also understand that this
                certification expires after 2 years. *
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Complete Enrollment
              </button>
            </div>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Questions about enrollment? Contact us at{' '}
              <a
                href="mailto:support@elevateforhumanity.org"
                className="text-indigo-600 hover:underline"
              >
                support@elevateforhumanity.org
              </a>{' '}
              or call (317) 555-0123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiladyRISEEnrollment;
