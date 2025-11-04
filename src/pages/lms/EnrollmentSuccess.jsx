import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Mail, ArrowRight, Phone } from 'lucide-react';

const EnrollmentSuccess = () => {
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enrollment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Welcome to your professional certification journey. Your payment has been processed successfully.
          </p>

          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-sm font-mono text-gray-700">{sessionId}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600">
                  You'll receive a confirmation email with your login credentials and course access instructions within the next few minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Access Your Courses</h3>
                <p className="text-gray-600">
                  Log in to the learning platform using the credentials sent to your email. All three certification courses are immediately available.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Complete & Certify</h3>
                <p className="text-gray-600">
                  Complete all three courses at your own pace. Upon completion, you'll receive your professional certification valid for 2 years.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Access */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Certification Courses</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Infection Control & Safety</h3>
              <p className="text-sm text-gray-600">Essential protocols for maintaining a safe, hygienic environment</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Domestic Violence Awareness</h3>
              <p className="text-sm text-gray-600">Recognition, response, and resource guidance</p>
            </div>
            
            <div className="border-l-4 border-pink-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Human Trafficking Awareness</h3>
              <p className="text-sm text-gray-600">Identification and intervention strategies</p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          
          <p className="text-gray-600 mb-4">
            Our support team is here to assist you with any questions about your enrollment or course access.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:elevateforhumanity@gmail.com"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </a>
            
            <a
              href="tel:+13173143757"
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              (317) 314-3757
            </a>
            
            <a
              href="/contact"
              className="flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Return Home */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
