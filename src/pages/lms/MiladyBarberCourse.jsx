import React from 'react';
import { Award, Clock, BookOpen, CheckCircle, Download, ExternalLink } from 'lucide-react';
import miladyBarberCourse from '../../data/miladyBarberCourse';

/**
 * Milady Barber Course Detail Page
 * Full curriculum breakdown with modules and lessons
 */

const MiladyBarberCourse = () => {
  const course = miladyBarberCourse;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-4">
                Powered by {course.provider} - Industry Standard Curriculum
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {course.duration}
                </span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  <Award className="w-4 h-4 inline mr-2" />
                  {course.certification}
                </span>
                {course.dolRegistered && (
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                    DOL Registered
                  </span>
                )}
                {course.etplApproved && (
                  <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                    ETPL Approved
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Format</h3>
              <p className="text-gray-700">{course.format}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Total Modules</h3>
              <p className="text-gray-700">{course.modules.length} Comprehensive Modules</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Cost</h3>
              <p className="text-gray-700">{course.funding.description}</p>
            </div>
          </div>
        </div>

        {/* Curriculum Modules */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Complete Curriculum</h2>
          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                      <p className="text-blue-100">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{module.hours}</div>
                      <div className="text-sm">Hours</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-lg mb-4">Lessons:</h4>
                  <div className="space-y-4">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-lg">{lesson.title}</h5>
                          <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                            {lesson.duration}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {lesson.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessments */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Program Assessments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.assessments.map((assessment) => (
              <div key={assessment.id} className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">{assessment.title}</h3>
                <p className="text-gray-700 mb-4">{assessment.description}</p>
                <div className="bg-green-50 p-3 rounded">
                  <span className="font-semibold">Passing Score: </span>
                  <span className="text-green-700 font-bold">{assessment.passingScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Certifications Earned</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {course.certifications.map((cert, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-blue-100 mb-3">Issued by: {cert.issuer}</p>
                <p className="text-sm">{cert.requirements}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Information */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-green-900">Funding Available</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">WIOA Eligible</h3>
              <p className="text-gray-700">
                This program is approved for Workforce Innovation and Opportunity Act (WIOA) funding.
                Eligible participants can receive full tuition coverage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Workforce Ready Grant</h3>
              <p className="text-gray-700">
                Indiana residents may qualify for the Workforce Ready Grant (WRG), covering all
                program costs including materials and licensing fees.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-green-900">
              Program Cost: ${course.funding.cost} with approved funding
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Barbering Career?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Enroll in our DOL-registered apprenticeship with Milady's industry-leading curriculum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lms/milady-barber-apprenticeship"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
            >
              Apply Now
            </a>
            <a
              href="/MILADY_BARBER_DOL_ETPL.md"
              target="_blank"
              className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-300 transition flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Program Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiladyBarberCourse;
