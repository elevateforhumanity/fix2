'use client';

import { useState } from 'react';
import { Copy, Plus, Edit, Trash2, Eye, FileText, Video, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function CourseTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const templates = [
    {
      id: 1,
      name: 'Standard Technical Course',
      description: 'Template for technical training courses with hands-on labs',
      category: 'Technical',
      sections: 6,
      modules: 24,
      lastUsed: '2 days ago',
      timesUsed: 15,
      structure: [
        { type: 'section', title: 'Introduction', modules: ['Welcome Video', 'Course Overview', 'Prerequisites Quiz'] },
        { type: 'section', title: 'Core Concepts', modules: ['Theory Lessons', 'Reading Materials', 'Practice Exercises'] },
        { type: 'section', title: 'Hands-on Practice', modules: ['Lab Setup', 'Guided Lab', 'Independent Practice'] },
        { type: 'section', title: 'Assessment', modules: ['Knowledge Check', 'Practical Exam', 'Peer Review'] },
        { type: 'section', title: 'Advanced Topics', modules: ['Advanced Techniques', 'Case Studies', 'Project Work'] },
        { type: 'section', title: 'Certification', modules: ['Final Exam', 'Certificate Generation'] },
      ],
    },
    {
      id: 2,
      name: 'Compliance Training',
      description: 'Template for safety and compliance courses',
      category: 'Compliance',
      sections: 4,
      modules: 12,
      lastUsed: '1 week ago',
      timesUsed: 8,
      structure: [
        { type: 'section', title: 'Regulations Overview', modules: ['Legal Requirements', 'Industry Standards'] },
        { type: 'section', title: 'Safety Procedures', modules: ['Safety Protocols', 'Emergency Procedures'] },
        { type: 'section', title: 'Practical Application', modules: ['Scenario Training', 'Role Play'] },
        { type: 'section', title: 'Certification', modules: ['Final Assessment', 'Certificate'] },
      ],
    },
    {
      id: 3,
      name: 'Soft Skills Workshop',
      description: 'Template for professional development and soft skills',
      category: 'Professional Development',
      sections: 5,
      modules: 15,
      lastUsed: '3 days ago',
      timesUsed: 12,
      structure: [
        { type: 'section', title: 'Self-Assessment', modules: ['Skills Inventory', 'Goal Setting'] },
        { type: 'section', title: 'Core Skills', modules: ['Communication', 'Teamwork', 'Problem Solving'] },
        { type: 'section', title: 'Practice Activities', modules: ['Group Exercises', 'Simulations'] },
        { type: 'section', title: 'Feedback & Reflection', modules: ['Peer Feedback', 'Self-Reflection'] },
        { type: 'section', title: 'Action Plan', modules: ['Development Plan', 'Follow-up'] },
      ],
    },
    {
      id: 4,
      name: 'Certification Prep',
      description: 'Template for exam preparation courses',
      category: 'Certification',
      sections: 8,
      modules: 32,
      lastUsed: '5 days ago',
      timesUsed: 20,
      structure: [
        { type: 'section', title: 'Exam Overview', modules: ['Exam Format', 'Study Strategy'] },
        { type: 'section', title: 'Content Review', modules: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'] },
        { type: 'section', title: 'Practice Questions', modules: ['Question Bank', 'Timed Quizzes'] },
        { type: 'section', title: 'Mock Exams', modules: ['Practice Exam 1', 'Practice Exam 2'] },
        { type: 'section', title: 'Review & Analysis', modules: ['Performance Review', 'Weak Areas'] },
        { type: 'section', title: 'Final Preparation', modules: ['Last-Minute Tips', 'Exam Day Checklist'] },
        { type: 'section', title: 'Post-Exam', modules: ['Results Analysis', 'Next Steps'] },
        { type: 'section', title: 'Resources', modules: ['Study Materials', 'Reference Links'] },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Templates</h1>
              <p className="text-gray-600 mt-2">Create and manage reusable course structures</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors">
              <Plus className="h-5 w-5" />
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-brandPrimary text-xs font-medium rounded">
                          {template.category}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-slate-600">Sections</p>
                        <p className="font-semibold text-slate-900">{template.sections}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Modules</p>
                        <p className="font-semibold text-slate-900">{template.modules}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Times Used</p>
                        <p className="font-semibold text-slate-900">{template.timesUsed}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Last Used</p>
                        <p className="font-semibold text-slate-900">{template.lastUsed}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTemplate(template.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-brandPrimary transition-colors">
                        <Copy className="h-4 w-4" />
                        Use
                      </button>
                      <button className="p-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-brandPrimary transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 border-2 border-red-300 text-red-600 rounded-lg hover:border-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Template Details Sidebar */}
          <div>
            {selectedTemplate ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Template Structure</h3>
                  {templates.find(t => t.id === selectedTemplate)?.structure.map((section, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-medium text-slate-900 mb-2">{section.title}</h4>
                      <div className="space-y-1 ml-4">
                        {section.modules.map((module, mIndex) => (
                          <div key={mIndex} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="h-1.5 w-1.5 rounded-full bg-brandPrimary" />
                            <span>{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">Select a template to view its structure</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Template Statistics</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Templates</span>
                    <span className="font-semibold text-slate-900">{templates.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Most Used</span>
                    <span className="font-semibold text-slate-900">Certification Prep</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Categories</span>
                    <span className="font-semibold text-slate-900">4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Builder Guide */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Template Best Practices</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Start with clear learning objectives</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Include varied content types</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Add assessments throughout</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Plan for hands-on practice</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Include certification path</span>
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
