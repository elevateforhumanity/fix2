import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Users,
  TrendingUp,
} from 'lucide-react';
import { jobReadyIndyCourses } from '../data/jobReadyIndyCourses';

/**
 * Job Ready Indy (JRI) Integration Page
 * Elevate for Humanity Career and Training Institute
 * Facilitator: Elizabeth Greene
 */

const JobReadyIndy = () => {
  const jriData = jobReadyIndyCourses;
  const jriRegistrationLink = jriData.registrationLink;
  const jriPortal = jriData.portalLink;
  const learningHub = jriData.learningHubLink;

  const iconMap = {
    'professional-skills': Users,
    communication: BookOpen,
    'problem-solving': TrendingUp,
    teamwork: Users,
    'digital-literacy': BookOpen,
    'career-planning': Award,
  };

  const badges = jriData.badges.map((badge) => ({
    ...badge,
    icon: iconMap[badge.id] || BookOpen,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Job Ready Indy</h1>
            <p className="text-2xl mb-6">{jriData.organization}</p>
            <p className="text-lg mb-4 text-blue-100">
              Facilitator: {jriData.facilitator}
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Build essential workplace skills through EmployIndy's Job Ready
              Indy program. Earn digital badges recognized by employers across
              Indianapolis.
            </p>
            <a
              href={jriRegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
            >
              Register for JRI
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
      {/* Program Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What is Job Ready Indy?
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Job Ready Indy (JRI) is a free, online program that helps you
            develop the essential skills employers are looking for. Complete six
            badge courses to demonstrate your workplace readiness and stand out
            to employers.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">6 Badge Courses</h3>
              <p className="text-gray-600">
                Complete all six courses to earn your digital badges
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Credentials</h3>
              <p className="text-gray-600">
                Earn recognized badges to share with employers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Facilitator Support</h3>
              <p className="text-gray-600">
                Get guidance from our certified JRI facilitator
              </p>
            </div>
          </div>
        </div>
        {/* Six Badge Courses */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Six Badge Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">{badge.title}</h3>
                  </div>
                  <p className="text-gray-700">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* How It Works */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Register</h3>
              <p className="text-gray-700">
                Use our custom registration link to sign up
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Complete Courses</h3>
              <p className="text-gray-700">
                Work through all six badge courses at your own pace
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Earn Badges</h3>
              <p className="text-gray-700">
                Receive digital badges for each completed course
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Share & Apply</h3>
              <p className="text-gray-700">
                Add badges to your resume and LinkedIn profile
              </p>
            </div>
          </div>
        </div>
        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Program Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Free Training</h3>
                <p className="text-gray-700">
                  All courses are completely free with no hidden costs
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Self-Paced Learning</h3>
                <p className="text-gray-700">
                  Complete courses on your schedule, at your own pace
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Employer Recognition</h3>
                <p className="text-gray-700">
                  Badges are recognized by employers across Indianapolis
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Career Advancement</h3>
                <p className="text-gray-700">
                  Build skills that help you get hired and advance in your
                  career
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Facilitator Support</h3>
                <p className="text-gray-700">
                  Get help and guidance from our certified JRI facilitator
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Digital Credentials</h3>
                <p className="text-gray-700">
                  Share your badges on social media and job applications
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Access Links */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Get Started Today
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={jriRegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-6 rounded-lg hover:bg-gray-100 transition text-center"
            >
              <h3 className="font-bold text-xl mb-2">Register</h3>
              <p className="text-sm text-gray-700 mb-4">
                Sign up for Job Ready Indy
              </p>
              <ExternalLink className="w-6 h-6 mx-auto" />
            </a>
            <a
              href={jriPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-6 rounded-lg hover:bg-gray-100 transition text-center"
            >
              <h3 className="font-bold text-xl mb-2">Access Portal</h3>
              <p className="text-sm text-gray-700 mb-4">Login to JRI courses</p>
              <ExternalLink className="w-6 h-6 mx-auto" />
            </a>
            <a
              href={learningHub}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 p-6 rounded-lg hover:bg-gray-100 transition text-center"
            >
              <h3 className="font-bold text-xl mb-2">Learning Hub</h3>
              <p className="text-sm text-gray-700 mb-4">Access all resources</p>
              <ExternalLink className="w-6 h-6 mx-auto" />
            </a>
          </div>
        </div>
        {/* Facilitator Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our certified Job Ready Indy facilitator is here to support you
            through the program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:elevateforhumanity@gmail.com"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact Facilitator
            </a>
            <a
              href="tel:+13173143757"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobReadyIndy;
