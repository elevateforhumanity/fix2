'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, PlayCircle, FileText, CheckCircle, Lock, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function CourseStructurePage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const courseData = {
    title: 'HVAC Systems Installation',
    description: 'Master the fundamentals of HVAC system installation, maintenance, and troubleshooting',
    instructor: 'John Smith',
    duration: '8 weeks',
    level: 'Intermediate',
    progress: 75,
    prerequisites: [
      { id: 1, title: 'HVAC Fundamentals', completed: true },
      { id: 2, title: 'Safety & Compliance', completed: true },
    ],
    conditions: {
      minAttendance: 80,
      minGrade: 70,
      requiredAssignments: ['Lab: Component Identification', 'Project: Design a Duct System'],
    },
    sections: [
      {
        id: 1,
        title: 'Introduction to HVAC Systems',
        duration: '2 hours',
        completed: true,
        modules: [
          { id: 1, title: 'Welcome to the Course', type: 'video', duration: '5 min', completed: true },
          { id: 2, title: 'HVAC Basics Overview', type: 'video', duration: '15 min', completed: true },
          { id: 3, title: 'Reading: Course Syllabus', type: 'reading', duration: '10 min', completed: true },
          { id: 4, title: 'Quiz: Introduction', type: 'quiz', duration: '10 min', completed: true },
        ],
      },
      {
        id: 2,
        title: 'System Components',
        duration: '3 hours',
        completed: true,
        modules: [
          { id: 5, title: 'Compressors and Condensers', type: 'video', duration: '20 min', completed: true },
          { id: 6, title: 'Evaporators and Expansion Valves', type: 'video', duration: '20 min', completed: true },
          { id: 7, title: 'Air Handlers and Ductwork', type: 'video', duration: '25 min', completed: true },
          { id: 8, title: 'Lab: Component Identification', type: 'assignment', duration: '45 min', completed: true },
          { id: 9, title: 'Quiz: System Components', type: 'quiz', duration: '15 min', completed: true },
        ],
      },
      {
        id: 3,
        title: 'Ductwork Design',
        duration: '4 hours',
        completed: false,
        modules: [
          { id: 10, title: 'Duct Sizing Principles', type: 'video', duration: '25 min', completed: true },
          { id: 11, title: 'Layout Planning', type: 'video', duration: '30 min', completed: true },
          { id: 12, title: 'Material Selection', type: 'reading', duration: '15 min', completed: false },
          { id: 13, title: 'Installation Best Practices', type: 'video', duration: '35 min', completed: false },
          { id: 14, title: 'Project: Design a Duct System', type: 'assignment', duration: '60 min', completed: false },
          { id: 15, title: 'Quiz: Ductwork Design', type: 'quiz', duration: '20 min', completed: false },
        ],
      },
      {
        id: 4,
        title: 'Electrical Systems',
        duration: '3 hours',
        completed: false,
        locked: false,
        modules: [
          { id: 16, title: 'Electrical Fundamentals', type: 'video', duration: '20 min', completed: false },
          { id: 17, title: 'Wiring Diagrams', type: 'video', duration: '25 min', completed: false },
          { id: 18, title: 'Safety Procedures', type: 'reading', duration: '15 min', completed: false },
          { id: 19, title: 'Lab: Circuit Testing', type: 'assignment', duration: '45 min', completed: false },
          { id: 20, title: 'Quiz: Electrical Systems', type: 'quiz', duration: '15 min', completed: false },
        ],
      },
      {
        id: 5,
        title: 'Installation Procedures',
        duration: '5 hours',
        completed: false,
        locked: true,
        prerequisite: 'Complete Section 4: Electrical Systems',
        modules: [
          { id: 21, title: 'Site Preparation', type: 'video', duration: '20 min', completed: false },
          { id: 22, title: 'Equipment Installation', type: 'video', duration: '40 min', completed: false },
          { id: 23, title: 'System Testing', type: 'video', duration: '30 min', completed: false },
          { id: 24, title: 'Final Project: Complete Installation', type: 'assignment', duration: '120 min', completed: false },
        ],
      },
      {
        id: 6,
        title: 'Troubleshooting and Maintenance',
        duration: '4 hours',
        completed: false,
        locked: true,
        prerequisite: 'Complete Section 5: Installation Procedures',
        modules: [
          { id: 25, title: 'Common Issues', type: 'video', duration: '25 min', completed: false },
          { id: 26, title: 'Diagnostic Tools', type: 'video', duration: '20 min', completed: false },
          { id: 27, title: 'Preventive Maintenance', type: 'reading', duration: '15 min', completed: false },
          { id: 28, title: 'Final Exam', type: 'quiz', duration: '60 min', completed: false },
        ],
      },
    ],
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'reading':
        return <FileText className="h-5 w-5" />;
      case 'quiz':
      case 'assignment':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link href="/student/dashboard" className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{courseData.title}</h1>
              <p className="text-gray-600 mt-2">{courseData.description}</p>
              <div className="flex items-center gap-6 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{courseData.level}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{courseData.progress}%</div>
              <p className="text-sm text-slate-600 mt-1">Complete</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-slate-200 rounded-full h-3">
            <div
              className="bg-blue-600 rounded-full h-3 transition-all"
              style={{ width: `${courseData.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Course Sections */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Course Content</h2>
                <div className="space-y-4">
                  {courseData.sections.map((section, index) => (
                    <div key={section.id} className="border rounded-lg overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => !section.locked && toggleSection(index)}
                        className={`w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          section.locked ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                        disabled={section.locked}
                      >
                        <div className="flex items-center gap-3">
                          {section.locked ? (
                            <Lock className="h-5 w-5 text-slate-400" />
                          ) : expandedSections.includes(index) ? (
                            <ChevronDown className="h-5 w-5 text-slate-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-600" />
                          )}
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900">
                              Section {section.id}: {section.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-0.5">
                              {section.modules.length} modules • {section.duration}
                            </p>
                            {section.locked && 'prerequisite' in section && (
                              <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                <Lock className="h-3 w-3" />
                                {section.prerequisite}
                              </p>
                            )}
                          </div>
                        </div>
                        {section.completed && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                      </button>

                      {/* Section Modules */}
                      {expandedSections.includes(index) && !section.locked && (
                        <div className="border-t bg-slate-50">
                          {section.modules.map((module) => (
                            <Link
                              key={module.id}
                              href={`/student/courses/hvac-systems/module/${module.id}`}
                              className="flex items-center gap-3 p-4 border-b last:border-b-0 hover:bg-white transition-colors"
                            >
                              <div className={`${module.completed ? 'text-green-600' : 'text-slate-400'}`}>
                                {module.completed ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  getModuleIcon(module.type)
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900 text-sm">{module.title}</h4>
                                <p className="text-xs text-slate-600 mt-0.5 capitalize">
                                  {module.type} • {module.duration}
                                </p>
                              </div>
                              {module.completed && (
                                <span className="text-xs font-medium text-green-600">Completed</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prerequisites */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Prerequisites</h3>
                <div className="space-y-2">
                  {courseData.prerequisites.map((prereq) => (
                    <div key={prereq.id} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${prereq.completed ? 'text-green-600' : 'text-slate-300'}`} />
                      <span className={`text-sm ${prereq.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                        {prereq.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Completion Requirements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Completion Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-600">Minimum Attendance</p>
                    <p className="font-medium text-slate-900">{courseData.conditions.minAttendance}%</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Minimum Grade</p>
                    <p className="font-medium text-slate-900">{courseData.conditions.minGrade}%</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-2">Required Assignments</p>
                    <div className="space-y-1">
                      {courseData.conditions.requiredAssignments.map((assignment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                          <span className="text-slate-700">{assignment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Course Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-600">Instructor</p>
                    <p className="font-medium text-slate-900">{courseData.instructor}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Duration</p>
                    <p className="font-medium text-slate-900">{courseData.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Level</p>
                    <p className="font-medium text-slate-900">{courseData.level}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Sections</p>
                    <p className="font-medium text-slate-900">{courseData.sections.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Course Resources</h3>
                <div className="space-y-2">
                  <Link
                    href="/student/courses/hvac-systems/syllabus"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                    Course Syllabus
                  </Link>
                  <Link
                    href="/student/courses/hvac-systems/materials"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                    Downloadable Materials
                  </Link>
                  <Link
                    href="/student/courses/hvac-systems/discussions"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                    Discussion Forum
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Completed</span>
                    <span className="font-medium text-green-600">
                      {courseData.sections.filter(s => s.completed).length} / {courseData.sections.length} sections
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">In Progress</span>
                    <span className="font-medium text-blue-600">
                      {courseData.sections.filter(s => !s.completed && !s.locked).length} sections
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Locked</span>
                    <span className="font-medium text-slate-600">
                      {courseData.sections.filter(s => s.locked).length} sections
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
