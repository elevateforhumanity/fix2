'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Calendar, Phone, Download, ArrowRight, Home, MessageCircle } from 'lucide-react';
import { ConfettiCannon } from '@/components/Confetti';
import Link from 'next/link';

export default function ApplicationSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [applicationId] = useState(() => 
    'ONA-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  useEffect(() => {
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen     py-12 px-4">
      {/* Confetti Effect */}
      <ConfettiCannon active={showConfetti} duration={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="flex justify-center mb-8"
        >
          <div className="w-32 h-32    rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Congratulations! You've taken the first step toward a better future.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold">
            <span>Application ID:</span>
            <span className="font-mono">{applicationId}</span>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Happens Next?
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Check Your Email
                </h3>
                <p className="text-gray-600">
                  You'll receive a confirmation email within the next 15 minutes with your application details 
                  and next steps. Please check your spam folder if you don't see it.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2. Admissions Call
                </h3>
                <p className="text-gray-600">
                  An admissions advisor will call you within 24-48 hours to discuss your program, 
                  answer questions, and schedule your orientation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3. Schedule Orientation
                </h3>
                <p className="text-gray-600">
                  Attend a brief orientation session (virtual or in-person) to complete enrollment, 
                  meet your instructors, and get your class schedule.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  4. Start Your Journey
                </h3>
                <p className="text-gray-600">
                  Begin classes and start building the skills you need for your new career. 
                  Most students start within 2-4 weeks of applying!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Contact Info */}
          <div className="   rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Need Help?
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+13175551234" 
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>(317) 555-1234</span>
              </a>
              <a 
                href="mailto:admissions@ona.com" 
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>admissions@ona.com</span>
              </a>
              <a 
                href="/chat" 
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Live Chat Support</span>
              </a>
            </div>
          </div>

          {/* Download Info */}
          <div className="   rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Prepare for Success
            </h3>
            <div className="space-y-3">
              <a 
                href="/downloads/student-handbook.pdf" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Student Handbook</span>
              </a>
              <a 
                href="/downloads/program-guide.pdf" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Program Guide</span>
              </a>
              <a 
                href="/downloads/financial-aid.pdf" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Financial Aid Information</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="   rounded-2xl p-8 text-white mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            You're Joining a Community of Success
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-white/80">Graduates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">94%</div>
              <div className="text-white/80">Employment Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$15K+</div>
              <div className="text-white/80">Avg. Salary Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-white/80">Student Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg text-lg"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4    text-white rounded-lg font-semibold hover: hover: transition-all shadow-lg text-lg"
          >
            Explore Programs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Join our community and stay connected:
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://facebook.com/ona" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <span className="text-2xl">📘</span>
            </a>
            <a 
              href="https://instagram.com/ona" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <span className="text-2xl">📷</span>
            </a>
            <a 
              href="https://linkedin.com/company/ona" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <span className="text-2xl">💼</span>
            </a>
            <a 
              href="https://twitter.com/ona" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <span className="text-2xl">🐦</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
