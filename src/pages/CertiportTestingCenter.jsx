import React from 'react';
import {
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  BookOpen,
  ExternalLink,
  Phone,
  Mail,
} from 'lucide-react';

/**
 * Certiport Authorized Testing Center
 * Elevate for Humanity Career and Training Institute
 * Microsoft Office Specialist, IC3, Adobe, Autodesk, and more
 */

const CertiportTestingCenter = () => {
  const certifications = [
    {
      name: 'Microsoft Office Specialist (MOS)',
      description:
        'Industry-recognized certification for Microsoft Office proficiency',
      exams: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'Access'],
      icon: '💼',
      color: 'blue',
    },
    {
      name: 'IC3 Digital Literacy',
      description: 'Global standard for digital literacy certification',
      exams: ['Computing Fundamentals', 'Key Applications', 'Living Online'],
      icon: '💻',
      color: 'green',
    },
    {
      name: 'Adobe Certified Professional',
      description: 'Validate skills in Adobe Creative Cloud applications',
      exams: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro'],
      icon: '🎨',
      color: 'purple',
    },
    {
      name: 'Autodesk Certified User',
      description: 'Professional certification for Autodesk design software',
      exams: ['AutoCAD', 'Revit', 'Fusion 360', 'Maya'],
      icon: '🏗️',
      color: 'orange',
    },
    {
      name: 'Entrepreneurship and Small Business (ESB)',
      description: 'Certification for entrepreneurial and business skills',
      exams: ['ESB Certification Exam'],
      icon: '🚀',
      color: 'pink',
    },
    {
      name: 'IT Specialist',
      description: 'Entry-level IT certification for technical skills',
      exams: [
        'Software Development',
        'Networking',
        'Cybersecurity',
        'Cloud Computing',
      ],
      icon: '🔧',
      color: 'indigo',
    },
  ];

  const benefits = [
    {
      title: 'Industry-Recognized Credentials',
      description: 'Earn certifications recognized by employers worldwide',
      icon: Award,
    },
    {
      title: 'Flexible Scheduling',
      description: 'Schedule your exam at a time that works for you',
      icon: Clock,
    },
    {
      title: 'Immediate Results',
      description: 'Get your exam results immediately upon completion',
      icon: CheckCircle,
    },
    {
      title: 'Professional Environment',
      description: 'Take exams in a secure, proctored testing environment',
      icon: Users,
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
      orange: 'bg-orange-100 text-orange-800 border-orange-300',
      pink: 'bg-pink-100 text-pink-800 border-pink-300',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Award className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Certiport Authorized Testing Center
            </h1>
            <p className="text-2xl mb-6">
              Elevate for Humanity Career and Training Institute
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Take industry-recognized certification exams at our authorized
              testing center. Microsoft, Adobe, Autodesk, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#schedule"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
              >
                Schedule an Exam
              </a>
              <a
                href="https://www.certiport.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition flex items-center"
              >
                Visit Certiport
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            About Our Testing Center
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            As a Certiport Authorized Testing Center (CATC), we provide a
            professional, secure environment for taking industry-recognized
            certification exams. Our facility meets all Certiport standards for
            testing security and candidate experience.
          </p>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Available Certifications */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Available Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 ${getColorClasses(cert.color)}`}
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold mb-3">{cert.name}</h3>
                <p className="text-sm mb-4">{cert.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Available Exams:</p>
                  <ul className="space-y-1">
                    {cert.exams.map((exam, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* How It Works */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How to Take an Exam
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Choose Your Exam</h3>
              <p className="text-gray-700 text-sm">
                Select the certification exam you want to take
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Schedule Your Test</h3>
              <p className="text-gray-700 text-sm">
                Contact us to schedule your exam date and time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Take Your Exam</h3>
              <p className="text-gray-700 text-sm">
                Arrive at our testing center and complete your exam
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Get Certified</h3>
              <p className="text-gray-700 text-sm">
                Receive your results immediately and earn your certification
              </p>
            </div>
          </div>
        </div>
        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Exam Pricing</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Standard Exams</h3>
                <p className="text-gray-700 mb-4">
                  Microsoft Office Specialist, IC3, IT Specialist
                </p>
                <p className="text-3xl font-bold text-blue-600">$100</p>
                <p className="text-sm text-gray-600">per exam</p>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Professional Exams</h3>
                <p className="text-gray-700 mb-4">
                  Adobe Certified Professional, Autodesk Certified User
                </p>
                <p className="text-3xl font-bold text-purple-600">$150</p>
                <p className="text-sm text-gray-600">per exam</p>
              </div>
            </div>
            <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <p className="font-bold text-lg mb-2">
                Training Program Participants
              </p>
              <p className="text-gray-700">
                Exam fees may be covered by WIOA/WRG funding for eligible
                participants in our training programs
              </p>
            </div>
          </div>
        </div>
        {/* Testing Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Testing Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">What to Bring</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Valid government-issued photo ID</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Certiport exam voucher (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Payment for exam fee (if not pre-paid)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Testing Rules</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Arrive 15 minutes before scheduled time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>No personal items allowed in testing area</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <span>Testing is proctored and monitored</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Schedule Section */}
        <div
          id="schedule"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-center">
            Ready to Get Certified?
          </h2>
          <p className="text-xl mb-8 text-center">
            Schedule your certification exam at our authorized testing center
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com?subject=Certiport Exam Scheduling"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition text-center flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email to Schedule
            </a>
            <a
              href="tel:+13173143757"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition text-center flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (317) 314-3757
            </a>
          </div>
        </div>
        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Testing Center Information
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-6">
              <strong>
                Elevate for Humanity Career and Training Institute
              </strong>
              <br />
              Certiport Authorized Testing Center
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  Email: elevateforhumanity@gmail.com
                  <br />
                  Phone: (317) 314-3757
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Testing Hours</h3>
                <p className="text-gray-700">
                  By Appointment Only
                  <br />
                  Monday - Friday: 9 AM - 5 PM
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                For Certiport customer support: 1-888-999-9830 (Option 2)
                <br />
                Or email: customerservices@certiport.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertiportTestingCenter;
