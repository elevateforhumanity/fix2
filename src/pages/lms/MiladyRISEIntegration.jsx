import React, { useState } from 'react';
import {
  ExternalLink,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  BookOpen,
} from 'lucide-react';

/**
 * Milady RISE Integration Component
 * Mirrors Milady's structure and provides seamless enrollment
 */
const MiladyRISEIntegration = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);

  const courses = [
    {
      id: 'infection-control',
      title: 'Infection Control',
      duration: '2 hours',
      description:
        "Deep dive into infection control standards in the age of COVID-19. Ensure you're providing a safe, germ-free space for clients and staff.",
      image: '/assets/images/infection-control.jpg',
      topics: [
        'COVID-19 safety protocols',
        'Sterilization procedures',
        'Disinfection best practices',
        'Personal protective equipment',
        'Client safety standards',
      ],
      exam: {
        questions: 25,
        passingScore: 70,
      },
    },
    {
      id: 'domestic-violence',
      title: 'Domestic Violence Awareness',
      duration: '1 hour',
      description:
        '1 in 4 women and 1 in 7 men experience Intimate Partner Violence. Learn to recognize signs and provide appropriate support.',
      image: '/assets/images/domestic-violence.jpg',
      topics: [
        'Recognizing signs of abuse',
        'Safe intervention strategies',
        'Resource referrals',
        'Creating safe spaces',
        'Legal considerations',
      ],
      exam: {
        questions: 10,
        passingScore: 70,
      },
    },
    {
      id: 'human-trafficking',
      title: 'Human Trafficking Awareness',
      duration: '30+ minutes',
      description:
        '18,000-20,000 victims trafficked into the US annually. Learn indicators and how to respond appropriately.',
      image: '/assets/images/human-trafficking.jpg',
      topics: [
        'Trafficking indicators',
        'Victim identification',
        'Appropriate responses',
        'Reporting procedures',
        'Community resources',
      ],
      exam: {
        questions: 5,
        passingScore: 70,
      },
    },
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: 'Be an Ally',
      description:
        "You're in a unique position to recognize signs of domestic violence or human trafficking. Learn how to safely help clients in crisis.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Make a Difference',
      description:
        "Don't just meet your goals—make a difference that goes well beyond beauty.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: 'Inspire Others',
      description:
        'Inspire those around you to make an impact—while also inspiring loyalty among your clients.',
    },
  ];

  const handleEnroll = () => {
    // Direct enrollment through Elevate for Humanity's white-label portal
    // This goes through our school's system, not directly to Milady
    window.location.href = '/lms/enroll/milady-rise';
  };

  const handleEnrollWithCode = () => {
    // Show internal enrollment process
    setShowEnrollment(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Milady RISE Certification in Client Well-Being & Safety
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Protect public health AND learn to recognize when a client might
              be at risk.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">
                  FREE with code: efhcti-rise295
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>3.5 hours total</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>$500 Scholarship Eligible</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleEnrollWithCode}
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Enroll Now - FREE
              </button>
              <a
                href="/contact"
                className="bg-indigo-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-900 transition inline-flex items-center gap-2"
              >
                Questions? Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Enrollment Instructions Modal */}
      {showEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold mb-4">
              Enroll Through Elevate for Humanity
            </h2>
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <p className="text-indigo-900 font-semibold">
                ✨ As an Elevate for Humanity student, you get FREE access to
                this certification through our partnership with Milady!
              </p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Complete Enrollment Form</h3>
                  <p className="text-gray-600">
                    Fill out your information in our system
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Automatic Registration</h3>
                  <p className="text-gray-600">
                    We'll register you with Milady using our school code
                  </p>
                  <div className="bg-gray-100 p-2 rounded mt-2 text-sm">
                    <strong>School Code:</strong> efhcti-rise295 (automatically
                    applied)
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Receive Access Credentials</h3>
                  <p className="text-gray-600">
                    You'll get login details via email within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Start Learning</h3>
                  <p className="text-gray-600">
                    Access courses through your student portal or directly
                    through Milady
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This certification is managed through our
                partnership with Milady. Questions? Contact our program
                coordinator or Jessica Boyd at Milady
                (jessica.boyd@cengage.com).
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowEnrollment(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
              <button
                onClick={handleEnroll}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Continue to Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Courses Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            You're just 3.5 hours away from your Milady RISE Certification
          </h2>
          <p className="text-center text-gray-600 mb-12">
            This bundle includes:
          </p>
          <div className="space-y-12">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="md:w-1/3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder-course.jpg';
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-2xl font-bold">{course.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Topics Covered:</h4>
                    <ul className="space-y-1">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Final Exam:</strong> {course.exam.questions}{' '}
                      questions | {course.exam.passingScore}% passing score
                      required
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Scholarship Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Milady RISE Scholarship</h2>
          <p className="text-xl mb-6">
            Once you're certified in Client Well-Being & Safety, you'll be
            eligible to apply for one of ten $500 scholarships given out twice
            per year!
          </p>
          <div className="bg-white text-gray-800 p-6 rounded-lg inline-block">
            <p className="text-2xl font-bold text-orange-600">
              $500 Scholarship
            </p>
            <p className="text-sm">10 recipients per period | Spring & Fall</p>
          </div>
        </div>
      </div>
      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              Why should I take the Milady RISE Certification?
            </summary>
            <p className="mt-4 text-gray-700">
              As a beauty professional, you're in a unique position to protect
              public health and recognize signs of domestic violence and human
              trafficking. With 1 in 4 women and 1 in 7 men experiencing
              intimate partner violence, you can make a real difference.
            </p>
          </details>
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              How much does this certification cost?
            </summary>
            <p className="mt-4 text-gray-700">
              Normally $29.95, but{' '}
              <strong>FREE for Elevate for Humanity students</strong> using
              promo code:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                efhcti-rise295
              </code>
            </p>
          </details>
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              How long does it take to complete?
            </summary>
            <p className="mt-4 text-gray-700">
              Approximately 3.5 hours total: Infection Control (2 hours),
              Domestic Violence Awareness (1 hour), Human Trafficking Awareness
              (30 minutes). You have 60 days to complete all courses.
            </p>
          </details>
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              Does this certification expire?
            </summary>
            <p className="mt-4 text-gray-700">
              Yes, the certification expires after two years to ensure you stay
              current with evolving standards and information.
            </p>
          </details>
          <details className="bg-white p-6 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">
              Where do the proceeds go?
            </summary>
            <p className="mt-4 text-gray-700">
              One-third goes to the Polaris Project (Human Trafficking Hotline)
              and PBA's CUT IT OUT® program. The rest supports the RISE Partner
              School program and RISE Scholarship fund.
            </p>
          </details>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Certified?</h2>
          <p className="text-xl mb-8">
            Join thousands of beauty professionals making a difference in their
            communities
          </p>
          <button
            onClick={handleEnrollWithCode}
            className="bg-white text-indigo-600 px-12 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
          >
            YES. Enroll Me Now - FREE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiladyRISEIntegration;
