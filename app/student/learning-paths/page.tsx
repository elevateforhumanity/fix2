'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Lock, TrendingUp, Award, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function LearningPathsPage() {
  const [selectedPath, setSelectedPath] = useState<number>(1);

  const learningPaths = [
    {
      id: 1,
      title: 'HVAC Technician Certification',
      description: 'Complete pathway to become a certified HVAC technician',
      duration: '6 months',
      level: 'Beginner to Advanced',
      enrolled: true,
      progress: 67,
      courses: [
        { id: 1, title: 'HVAC Fundamentals', status: 'completed', progress: 100, duration: '4 weeks' },
        { id: 2, title: 'Safety & Compliance', status: 'completed', progress: 100, duration: '2 weeks' },
        { id: 3, title: 'HVAC Systems Installation', status: 'in-progress', progress: 75, duration: '8 weeks' },
        { id: 4, title: 'Electrical Fundamentals', status: 'in-progress', progress: 60, duration: '6 weeks' },
        { id: 5, title: 'Advanced Installation Techniques', status: 'locked', progress: 0, duration: '6 weeks' },
        { id: 6, title: 'Troubleshooting & Repair', status: 'locked', progress: 0, duration: '4 weeks' },
        { id: 7, title: 'EPA Certification Prep', status: 'locked', progress: 0, duration: '2 weeks' },
      ],
      skills: ['HVAC Installation', 'System Maintenance', 'Electrical Work', 'Troubleshooting', 'EPA Compliance'],
      outcomes: [
        'Install and maintain HVAC systems',
        'Diagnose and repair system issues',
        'Pass EPA 608 certification',
        'Work independently as a technician',
      ],
    },
    {
      id: 2,
      title: 'Electrical Systems Specialist',
      description: 'Master electrical systems for HVAC and building automation',
      duration: '4 months',
      level: 'Intermediate',
      enrolled: false,
      progress: 0,
      courses: [
        { id: 8, title: 'Electrical Fundamentals', status: 'available', progress: 0, duration: '6 weeks' },
        { id: 9, title: 'Circuit Design & Analysis', status: 'locked', progress: 0, duration: '4 weeks' },
        { id: 10, title: 'Control Systems', status: 'locked', progress: 0, duration: '6 weeks' },
        { id: 11, title: 'Building Automation', status: 'locked', progress: 0, duration: '4 weeks' },
      ],
      skills: ['Circuit Design', 'Control Systems', 'Automation', 'Troubleshooting'],
      outcomes: [
        'Design electrical circuits',
        'Program control systems',
        'Install automation systems',
        'Troubleshoot electrical issues',
      ],
    },
    {
      id: 3,
      title: 'Commercial HVAC Specialist',
      description: 'Specialize in large-scale commercial HVAC systems',
      duration: '5 months',
      level: 'Advanced',
      enrolled: false,
      progress: 0,
      courses: [
        { id: 12, title: 'Commercial Systems Overview', status: 'locked', progress: 0, duration: '3 weeks' },
        { id: 13, title: 'Chiller Systems', status: 'locked', progress: 0, duration: '6 weeks' },
        { id: 14, title: 'Boiler Systems', status: 'locked', progress: 0, duration: '6 weeks' },
        { id: 15, title: 'Building Management Systems', status: 'locked', progress: 0, duration: '4 weeks' },
        { id: 16, title: 'Energy Efficiency', status: 'locked', progress: 0, duration: '3 weeks' },
      ],
      skills: ['Commercial Systems', 'Chillers', 'Boilers', 'BMS', 'Energy Management'],
      outcomes: [
        'Service commercial HVAC systems',
        'Manage large-scale installations',
        'Optimize energy efficiency',
        'Work with building management systems',
      ],
    },
  ];

  const currentPath = learningPaths.find(p => p.id === selectedPath);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/student/dashboard" className="text-sm text-brandPrimary hover:text-brandPrimary mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Learning Paths</h1>
          <p className="text-gray-600 mt-2">Structured pathways to achieve your career goals</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Path Selection */}
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Available Paths</h2>
            {learningPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedPath === path.id
                    ? 'border-brandPrimary bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{path.title}</h3>
                  {path.enrolled && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Enrolled
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-3">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {path.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {path.courses.length} courses
                  </div>
                </div>
                {path.enrolled && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium text-brandPrimary">{path.progress}%</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-brandPrimary rounded-full h-2 transition-all"
                        style={{ width: `${path.progress}%` }}
                       />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Path Details */}
          {currentPath && (
            <div className="lg:col-span-2 space-y-6">
              {/* Path Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{currentPath.title}</h2>
                      <p className="text-slate-600 mt-2">{currentPath.description}</p>
                    </div>
                    {!currentPath.enrolled && (
                      <button className="px-6 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors whitespace-nowrap">
                        Enroll Now
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-brandPrimary" />
                      <div>
                        <p className="text-sm text-slate-600">Duration</p>
                        <p className="font-medium text-slate-900">{currentPath.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-slate-600">Level</p>
                        <p className="font-medium text-slate-900">{currentPath.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-slate-600">Courses</p>
                        <p className="font-medium text-slate-900">{currentPath.courses.length}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Progression */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-6">Course Progression</h3>
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200" />
                    {currentPath.enrolled && (
                      <div 
                        className="absolute left-6 top-8 w-0.5 bg-brandPrimary transition-all duration-500"
                        style={{ height: `${(currentPath.progress / 100) * 85}%` }}
                       />
                    )}

                    <div className="space-y-6">
                      {currentPath.courses.map((course, index) => {
                        const isLocked = course.status === 'locked';
                        const isCompleted = course.status === 'completed';
                        const isInProgress = course.status === 'in-progress';
                        const isAvailable = course.status === 'available';

                        return (
                          <div key={course.id} className="relative flex items-start gap-4">
                            {/* Step Indicator */}
                            <div className={`
                              relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                              ${isCompleted ? 'bg-green-600 text-white' : ''}
                              ${isInProgress ? 'bg-brandPrimary text-white' : ''}
                              ${isAvailable ? 'bg-orange-500 text-white' : ''}
                              ${isLocked ? 'bg-slate-200 text-slate-400' : ''}
                            `}>
                              {isCompleted ? '✓' : index + 1}
                            </div>

                            {/* Course Content */}
                            <div className="flex-1 pt-2">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className={`font-semibold ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                                  {course.title}
                                </h4>
                                <span className="text-sm text-slate-600">{course.duration}</span>
                              </div>
                              
                              {!isLocked && (
                                <div className="bg-slate-200 rounded-full h-2 mb-2">
                                  <div
                                    className={`h-2 rounded-full transition-all ${
                                      isCompleted ? 'bg-green-600' : 'bg-brandPrimary'
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                   />
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                {isCompleted && (
                                  <span className="text-sm text-green-600 font-medium">Completed</span>
                                )}
                                {isInProgress && (
                                  <Link
                                    href={`/student/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-sm text-brandPrimary hover:text-brandPrimary font-medium"
                                  >
                                    Continue Learning →
                                  </Link>
                                )}
                                {isAvailable && (
                                  <Link
                                    href={`/student/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                  >
                                    Start Course →
                                  </Link>
                                )}
                                {isLocked && (
                                  <span className="text-sm text-slate-500 flex items-center gap-1">
                                    <Lock className="h-3 w-3" />
                                    Complete previous courses to unlock
                                  </span>
                                )}
                                {!isLocked && (
                                  <span className="text-sm font-medium text-slate-700">{course.progress}%</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Outcomes */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Skills You'll Gain</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPath.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-brandPrimary text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Career Outcomes</h3>
                    <div className="space-y-2">
                      {currentPath.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
