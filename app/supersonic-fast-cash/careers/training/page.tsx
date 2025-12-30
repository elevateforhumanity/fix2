"use client";

import React, { useState } from 'react';
import { Play, CheckCircle, Lock, Clock, Award, BookOpen } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  price: number;
  drakePrice: number;
  topics: string[];
  certification: string;
  prerequisite?: string;
}

const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'drake-fundamentals',
    title: 'Drake Tax Fundamentals',
    description: 'Master the fundamentals of Drake Tax software. Learn navigation, data entry, e-filing, and basic tax return preparation.',
    duration: '16 hours (2 days)',
    lessons: 12,
    price: 309,
    drakePrice: 299,
    topics: [
      'Drake Tax interface and navigation',
      'Client data entry and management',
      'Form completion and calculations',
      'E-file procedures and troubleshooting',
      'Basic tax return preparation',
      'Reports and printing',
      'Software updates and maintenance'
    ],
    certification: 'Drake Tax Fundamentals Certificate'
  },
  {
    id: 'advanced-drake',
    title: 'Advanced Drake Tax Features',
    description: 'Deep dive into advanced Drake Tax features including complex returns, multi-state filing, and business returns.',
    duration: '16 hours (2 days)',
    lessons: 15,
    price: 409,
    drakePrice: 399,
    prerequisite: 'drake-fundamentals',
    topics: [
      'Complex individual returns (Schedule C, D, E)',
      'Multi-state tax returns',
      'Business returns (1120, 1120S, 1065)',
      'Advanced e-file features',
      'Bank products and refund transfers',
      'Office management tools',
      'Customization and efficiency tips'
    ],
    certification: 'Advanced Drake Tax Certificate'
  },
  {
    id: 'drake-efile',
    title: 'Drake E-File Mastery',
    description: 'Master electronic filing with Drake Tax. Learn IRS e-file requirements, bank products, and troubleshooting.',
    duration: '8 hours (1 day)',
    lessons: 8,
    price: 259,
    drakePrice: 249,
    prerequisite: 'drake-fundamentals',
    topics: [
      'IRS e-file requirements and regulations',
      'EFIN setup and management',
      'Bank product configuration (EPS Financial)',
      'Refund advances and prepaid cards',
      'E-file transmission and acknowledgments',
      'Rejection troubleshooting',
      'State e-file procedures'
    ],
    certification: 'Drake E-File Specialist Certificate'
  },
  {
    id: 'tax-basics',
    title: 'Tax Preparation Basics',
    description: 'Essential tax knowledge for new preparers. Filing status, income types, deductions, and credits.',
    duration: '12 hours',
    lessons: 10,
    price: 199,
    drakePrice: 0,
    topics: [
      'Filing status determination',
      'Income types (W-2, 1099, Schedule C)',
      'Standard vs itemized deductions',
      'Common tax credits (EITC, CTC, AOTC)',
      'Tax calculations and withholding',
      'IRS forms and schedules',
      'Ethics and due diligence'
    ],
    certification: 'Tax Preparation Basics Certificate'
  },
  {
    id: 'irs-regulations',
    title: 'IRS Regulations & Ethics',
    description: 'Understand IRS regulations, preparer responsibilities, and ethical standards.',
    duration: '6 hours',
    lessons: 6,
    price: 149,
    drakePrice: 0,
    topics: [
      'IRS Circular 230',
      'Preparer penalties and sanctions',
      'Due diligence requirements',
      'Client confidentiality (IRC 7216)',
      'PTIN requirements',
      'Continuing education',
      'Professional conduct'
    ],
    certification: 'IRS Ethics Certificate'
  },
  {
    id: 'refund-advances',
    title: 'Refund Advance Products',
    description: 'Learn to offer and process refund advances through EPS Financial and Pathward Bank.',
    duration: '4 hours',
    lessons: 5,
    price: 99,
    drakePrice: 0,
    topics: [
      'Refund advance overview',
      'EPS Financial integration',
      'Pathward Bank products',
      'Application process',
      'Compliance and disclosures',
      'Fee structures',
      'Customer service'
    ],
    certification: 'Refund Advance Specialist Certificate'
  }
];

export default function TrainingPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [enrolledModules, setEnrolledModules] = useState<string[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const handleEnroll = async (moduleId: string) => {
    // In production, this would call the API
    setEnrolledModules([...enrolledModules, moduleId]);
    alert('Enrollment successful! You will receive access details via email.');
  };

  const isPrerequisiteMet = (module: TrainingModule) => {
    if (!module.prerequisite) return true;
    return completedModules.includes(module.prerequisite);
  };

  const selectedModuleData = selectedModule 
    ? TRAINING_MODULES.find(m => m.id === selectedModule)
    : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tax Preparer Training</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional training powered by Drake Software. Get certified and start preparing tax returns.
          </p>
        </div>

        {/* Training Bundles */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Training Bundles - Save Money!</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Complete Professional</h3>
              <p className="text-sm mb-3 opacity-90">
                Drake Fundamentals + Advanced + E-File + Office Management
              </p>
              <div className="text-3xl font-bold mb-2">$1,099</div>
              <div className="text-sm opacity-75 line-through">Regular: $1,286</div>
              <div className="text-sm font-semibold">Save $187</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Starter Package</h3>
              <p className="text-sm mb-3 opacity-90">
                Tax Basics + Drake Fundamentals + IRS Ethics
              </p>
              <div className="text-3xl font-bold mb-2">$599</div>
              <div className="text-sm opacity-75 line-through">Regular: $657</div>
              <div className="text-sm font-semibold">Save $58</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Refund Advance Specialist</h3>
              <p className="text-sm mb-3 opacity-90">
                Drake Fundamentals + E-File + Refund Advances
              </p>
              <div className="text-3xl font-bold mb-2">$599</div>
              <div className="text-sm opacity-75 line-through">Regular: $667</div>
              <div className="text-sm font-semibold">Save $68</div>
            </div>
          </div>
        </div>

        {/* Training Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TRAINING_MODULES.map((module) => {
            const isEnrolled = enrolledModules.includes(module.id);
            const isCompleted = completedModules.includes(module.id);
            const prerequisiteMet = isPrerequisiteMet(module);

            return (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  !prerequisiteMet ? 'opacity-60' : ''
                }`}
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg">{module.title}</h3>
                    {isCompleted && <CheckCircle className="w-6 h-6" />}
                    {!prerequisiteMet && <Lock className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {module.lessons} lessons
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                  {module.prerequisite && !prerequisiteMet && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">
                      <strong>Prerequisite:</strong> Complete{' '}
                      {TRAINING_MODULES.find(m => m.id === module.prerequisite)?.title} first
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-sm">Certification:</span>
                    </div>
                    <p className="text-sm text-gray-600">{module.certification}</p>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="text-3xl font-bold text-green-600">${module.price}</span>
                        {module.drakePrice > 0 && (
                          <span className="text-sm text-gray-500 ml-2 line-through">
                            Drake: ${module.drakePrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => setSelectedModule(module.id)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => prerequisiteMet && handleEnroll(module.id)}
                      disabled={!prerequisiteMet}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {prerequisiteMet ? 'Enroll Now' : 'Locked'}
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedModule(module.id)}
                    className="w-full mt-2 text-blue-600 py-2 text-sm font-semibold hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Module Details Modal */}
        {selectedModuleData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">{selectedModuleData.title}</h2>
                <p className="text-lg opacity-90">{selectedModuleData.description}</p>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="font-bold">{selectedModuleData.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="font-bold">{selectedModuleData.lessons} Lessons</div>
                    <div className="text-sm text-gray-600">Content</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="font-bold">Certificate</div>
                    <div className="text-sm text-gray-600">Upon Completion</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Topics Covered:</h3>
                  <ul className="space-y-2">
                    {selectedModuleData.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <strong>Certification:</strong>
                  </div>
                  <p className="text-sm">{selectedModuleData.certification}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleEnroll(selectedModuleData.id);
                      setSelectedModule(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                  >
                    Enroll for ${selectedModuleData.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Training Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">What's Included:</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Live instruction from certified Drake trainers</li>
                <li>✓ Digital course materials and workbook</li>
                <li>✓ Practice tax returns and scenarios</li>
                <li>✓ Drake software access (training version)</li>
                <li>✓ Certificate of completion</li>
                <li>✓ 30 days post-training email support</li>
                <li>✓ Access to recorded sessions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Certification Requirements:</h3>
              <ul className="space-y-2 text-sm">
                <li>1. Complete all required lessons</li>
                <li>2. Pass final exam (80% or higher)</li>
                <li>3. Complete hands-on practicum</li>
                <li>4. Submit sample tax return</li>
              </ul>

              <div className="mt-6">
                <h3 className="font-bold text-lg mb-3">Payment Options:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Credit/Debit card</li>
                  <li>• Affirm financing (0% APR for 3 months)</li>
                  <li>• Company purchase order</li>
                  <li>• Payment plans available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
