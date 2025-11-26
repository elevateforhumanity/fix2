'use client';

import { useState } from 'react';
import { CheckSquare, Square, Upload, Download, Copy, Trash2, Archive, Users, Mail, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function BulkOperationsPage() {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const courses = [
    { id: 1, title: 'HVAC Systems Installation', students: 45, status: 'active', category: 'Technical' },
    { id: 2, title: 'Electrical Fundamentals', students: 38, status: 'active', category: 'Technical' },
    { id: 3, title: 'Safety & Compliance', students: 52, status: 'active', category: 'Compliance' },
    { id: 4, title: 'Workforce Readiness', students: 28, status: 'draft', category: 'Professional Development' },
    { id: 5, title: 'Advanced HVAC Techniques', students: 15, status: 'active', category: 'Technical' },
    { id: 6, title: 'Building Automation', students: 22, status: 'archived', category: 'Technical' },
    { id: 7, title: 'Customer Service Skills', students: 31, status: 'active', category: 'Professional Development' },
    { id: 8, title: 'EPA Certification Prep', students: 40, status: 'active', category: 'Certification' },
  ];

  const toggleCourse = (id: number) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(courses.map(c => c.id));
    }
    setSelectAll(!selectAll);
  };

  const bulkOperations = [
    { id: 'enroll', label: 'Bulk Enroll Students', icon: Users, color: 'blue' },
    { id: 'email', label: 'Send Email to Students', icon: Mail, color: 'purple' },
    { id: 'export', label: 'Export Course Data', icon: Download, color: 'green' },
    { id: 'duplicate', label: 'Duplicate Courses', icon: Copy, color: 'orange' },
    { id: 'archive', label: 'Archive Courses', icon: Archive, color: 'slate' },
    { id: 'delete', label: 'Delete Courses', icon: Trash2, color: 'red' },
    { id: 'settings', label: 'Update Settings', icon: Settings, color: 'indigo' },
    { id: 'import', label: 'Import Content', icon: Upload, color: 'teal' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 text-brandPrimary border-blue-200 hover:bg-blue-100',
      purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      orange: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
      slate: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
      red: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      teal: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Bulk Operations</h1>
          <p className="text-gray-600 mt-2">Manage multiple courses at once</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Select Courses</h2>
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center gap-2 text-sm text-brandPrimary hover:text-brandPrimary font-medium"
                  >
                    {selectAll ? (
                      <>
                        <CheckSquare className="h-4 w-4" />
                        Deselect All
                      </>
                    ) : (
                      <>
                        <Square className="h-4 w-4" />
                        Select All
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => toggleCourse(course.id)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedCourses.includes(course.id)
                          ? 'border-brandPrimary bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {selectedCourses.includes(course.id) ? (
                          <CheckSquare className="h-6 w-6 text-brandPrimary" />
                        ) : (
                          <Square className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <span>{course.students} students</span>
                          <span>•</span>
                          <span className="capitalize">{course.category}</span>
                          <span>•</span>
                          <span className={`
                            px-2 py-0.5 rounded text-xs font-medium
                            ${course.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                            ${course.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${course.status === 'archived' ? 'bg-slate-100 text-slate-700' : ''}
                          `}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operations Panel */}
          <div className="space-y-6">
            {/* Selection Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Selection Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Selected Courses</span>
                    <span className="font-semibold text-slate-900">{selectedCourses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Students</span>
                    <span className="font-semibold text-slate-900">
                      {courses
                        .filter(c => selectedCourses.includes(c.id))
                        .reduce((sum, c) => sum + c.students, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Operations */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Available Operations</h3>
                {selectedCourses.length === 0 ? (
                  <p className="text-sm text-slate-600 text-center py-4">
                    Select courses to enable bulk operations
                  </p>
                ) : (
                  <div className="space-y-2">
                    {bulkOperations.map((operation) => {
                      const Icon = operation.icon;
                      return (
                        <button
                          key={operation.id}
                          className={`w-full flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${getColorClasses(operation.color)}`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium text-sm">{operation.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Filters</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const activeCourses = courses.filter(c => c.status === 'active').map(c => c.id);
                      setSelectedCourses(activeCourses);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Select Active Courses
                  </button>
                  <button
                    onClick={() => {
                      const technicalCourses = courses.filter(c => c.category === 'Technical').map(c => c.id);
                      setSelectedCourses(technicalCourses);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Select Technical Courses
                  </button>
                  <button
                    onClick={() => {
                      const draftCourses = courses.filter(c => c.status === 'draft').map(c => c.id);
                      setSelectedCourses(draftCourses);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Select Draft Courses
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Operation Modals would go here */}
        {selectedCourses.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Recent Bulk Operations</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-brandPrimary" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Enrolled 45 students</p>
                      <p className="text-xs text-slate-600">3 courses • 2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Sent course update email</p>
                      <p className="text-xs text-slate-600">5 courses • Yesterday</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Exported course data</p>
                      <p className="text-xs text-slate-600">8 courses • 2 days ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600">Completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
