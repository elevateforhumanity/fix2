'use client';

import { useState } from 'react';
import { Star, TrendingUp, Award, Clock, CheckCircle } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillLog {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  date: string;
  rating: number;
  notes: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Manicure Fundamentals',
    skills: [
      { id: 'basic-manicure', name: 'Basic Manicure' },
      { id: 'spa-manicure', name: 'Spa Manicure' },
      { id: 'french-manicure', name: 'French Manicure' },
      { id: 'paraffin-treatment', name: 'Paraffin Wax Treatment' },
      { id: 'hand-massage', name: 'Hand Massage Techniques' }
    ]
  },
  {
    name: 'Pedicure Services',
    skills: [
      { id: 'basic-pedicure', name: 'Basic Pedicure' },
      { id: 'spa-pedicure', name: 'Spa Pedicure' },
      { id: 'callus-removal', name: 'Callus Removal' },
      { id: 'foot-massage', name: 'Foot Massage Techniques' },
      { id: 'hot-stone-pedicure', name: 'Hot Stone Pedicure' }
    ]
  },
  {
    name: 'Nail Enhancements',
    skills: [
      { id: 'acrylic-application', name: 'Acrylic Application' },
      { id: 'acrylic-fills', name: 'Acrylic Fills' },
      { id: 'gel-application', name: 'Gel Application' },
      { id: 'gel-removal', name: 'Gel Removal' },
      { id: 'dip-powder', name: 'Dip Powder System' },
      { id: 'nail-tips', name: 'Nail Tips Application' },
      { id: 'silk-wraps', name: 'Silk Wraps' }
    ]
  },
  {
    name: 'Nail Art & Design',
    skills: [
      { id: 'hand-painting', name: 'Hand-Painted Nail Art' },
      { id: 'stamping', name: 'Nail Stamping' },
      { id: 'ombre-nails', name: 'Ombré Nails' },
      { id: 'chrome-nails', name: 'Chrome/Mirror Nails' },
      { id: 'rhinestone-application', name: 'Rhinestone Application' },
      { id: '3d-nail-art', name: '3D Nail Art' }
    ]
  },
  {
    name: 'Nail Health & Repair',
    skills: [
      { id: 'cuticle-care', name: 'Cuticle Care' },
      { id: 'nail-shaping', name: 'Nail Shaping' },
      { id: 'nail-repair', name: 'Nail Repair' },
      { id: 'fungal-recognition', name: 'Fungal Infection Recognition' },
      { id: 'nail-strengthening', name: 'Nail Strengthening Treatments' }
    ]
  },
  {
    name: 'Sanitation & Safety',
    skills: [
      { id: 'tool-sterilization', name: 'Tool Sterilization' },
      { id: 'workspace-sanitation', name: 'Workspace Sanitation' },
      { id: 'infection-control', name: 'Infection Control Protocols' },
      { id: 'chemical-safety', name: 'Chemical Safety' },
      { id: 'client-consultation', name: 'Client Consultation' }
    ]
  }
];

export default function NailSkillsTrackingPage() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [skillLogs, setSkillLogs] = useState<SkillLog[]>([]);

  const students = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Maria Garcia' },
    { id: '3', name: 'Ashley Williams' },
    { id: '4', name: 'Jennifer Brown' }
  ];

  const handleLogSkill = () => {
    if (!selectedStudent || !selectedSkill || !rating) {
      alert('Please select a student, skill, and rating');
      return;
    }

    const skill = skillCategories
      .flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.name })))
      .find(s => s.id === selectedSkill);

    if (!skill) return;

    const newLog: SkillLog = {
      id: Date.now().toString(),
      skillId: skill.id,
      skillName: skill.name,
      category: skill.category,
      date: new Date().toISOString().split('T')[0],
      rating,
      notes
    };

    setSkillLogs([newLog, ...skillLogs]);
    setSelectedSkill('');
    setRating(0);
    setNotes('');
    setSelectedCategory('');
  };

  const getStudentProgress = () => {
    if (!selectedStudent) return null;

    const studentLogs = skillLogs.filter(log => selectedStudent);
    const totalSkills = studentLogs.length;
    const uniqueSkills = new Set(studentLogs.map(log => log.skillId)).size;
    const avgRating = totalSkills > 0
      ? studentLogs.reduce((sum, log) => sum + log.rating, 0) / totalSkills
      : 0;

    const skillsByCategory = skillCategories.map(category => ({
      name: category.name,
      count: studentLogs.filter(log => log.category === category.name).length
    }));

    return {
      totalSkills,
      uniqueSkills,
      avgRating: avgRating.toFixed(1),
      skillsByCategory
    };
  };

  const progress = getStudentProgress();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nail Technician Skills Tracking</h1>
          <p className="mt-2 text-gray-600">Log and monitor student progress on nail techniques</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Logging Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Select Student</h2>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>

            {/* Skill Logging */}
            {selectedStudent && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Log Skill Practice</h2>
                
                <div className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSkill('');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category...</option>
                      {skillCategories.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Skill Selection */}
                  {selectedCategory && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skill
                      </label>
                      <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select skill...</option>
                        {skillCategories
                          .find(cat => cat.name === selectedCategory)
                          ?.skills.map(skill => (
                            <option key={skill.id} value={skill.id}>
                              {skill.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* Quality Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quality Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {rating === 1 && '1 - Needs Significant Work'}
                      {rating === 2 && '2 - Needs Improvement'}
                      {rating === 3 && '3 - Proficient'}
                      {rating === 4 && '4 - Advanced'}
                      {rating === 5 && '5 - Master Level'}
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add observations, areas for improvement, or positive feedback..."
                    />
                  </div>

                  <button
                    onClick={handleLogSkill}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Log Skill Practice
                  </button>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {selectedStudent && skillLogs.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {skillLogs.slice(0, 10).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{log.skillName}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < log.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{log.category}</p>
                        {log.notes && (
                          <p className="text-sm text-gray-600 mt-1">{log.notes}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Progress Overview */}
          {selectedStudent && progress && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{progress.totalSkills}</p>
                      <p className="text-sm text-gray-600">Total Skills Logged</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{progress.uniqueSkills}</p>
                      <p className="text-sm text-gray-600">Unique Skills Practiced</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{progress.avgRating}</p>
                      <p className="text-sm text-gray-600">Average Quality Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills by Category */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Skills by Category</h2>
                <div className="space-y-3">
                  {progress.skillsByCategory.map((category) => (
                    <div key={category.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-600">{category.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min((category.count / 10) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Skills Checklist */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">All Skills</h2>
                <div className="space-y-4">
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <h3 className="font-medium text-gray-900 mb-2">{category.name}</h3>
                      <div className="space-y-1">
                        {category.skills.map((skill) => {
                          const skillLog = skillLogs.find(log => log.skillId === skill.id);
                          return (
                            <div
                              key={skill.id}
                              className="flex items-center justify-between text-sm py-1"
                            >
                              <span className={skillLog ? 'text-gray-900' : 'text-gray-500'}>
                                {skill.name}
                              </span>
                              {skillLog && (
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < skillLog.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
