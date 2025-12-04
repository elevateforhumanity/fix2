'use client';

import { useState } from 'react';
import { Award, TrendingUp, Target, CheckCircle, Clock, Star, Plus, X, Eye, Download, Filter, Search, BarChart3, BookOpen, Zap } from 'lucide-react';

interface Competency {
  id: string;
  name: string;
  category: string;
  level: number;
  targetLevel: number;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
  lastAssessed: string;
  endorsements: number;
}

interface Assessment {
  id: string;
  competencyName: string;
  score: number;
  maxScore: number;
  date: string;
  assessor: string;
  feedback: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
  icon: string;
}

export default function CompetenciesPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([
    {
      id: '1',
      name: 'React Development',
      category: 'Frontend',
      level: 4,
      targetLevel: 5,
      progress: 80,
      status: 'in-progress',
      lastAssessed: '2024-11-15',
      endorsements: 12,
    },
    {
      id: '2',
      name: 'API Design',
      category: 'Backend',
      level: 3,
      targetLevel: 4,
      progress: 75,
      status: 'in-progress',
      lastAssessed: '2024-11-20',
      endorsements: 8,
    },
    {
      id: '3',
      name: 'Database Management',
      category: 'Backend',
      level: 5,
      targetLevel: 5,
      progress: 100,
      status: 'mastered',
      lastAssessed: '2024-11-10',
      endorsements: 15,
    },
  ]);

  const [assessments] = useState<Assessment[]>([
    {
      id: '1',
      competencyName: 'React Development',
      score: 85,
      maxScore: 100,
      date: '2024-11-15',
      assessor: 'Dr. Sarah Johnson',
      feedback: 'Strong understanding of hooks and state management. Continue practicing performance optimization.',
    },
    {
      id: '2',
      competencyName: 'API Design',
      score: 78,
      maxScore: 100,
      date: '2024-11-20',
      assessor: 'Prof. Michael Chen',
      feedback: 'Good RESTful design principles. Work on error handling and documentation.',
    },
  ]);

  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Full Stack Master',
      description: 'Achieved mastery in both frontend and backend development',
      earnedDate: '2024-11-01',
      icon: '🏆',
    },
    {
      id: '2',
      name: 'Quick Learner',
      description: 'Completed 5 competencies in one month',
      earnedDate: '2024-10-15',
      icon: '⚡',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompetencies = competencies.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || comp.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || comp.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCompetencies = competencies.length;
  const masteredCompetencies = competencies.filter(c => c.status === 'mastered').length;
  const inProgressCompetencies = competencies.filter(c => c.status === 'in-progress').length;
  const avgProgress = competencies.reduce((sum, c) => sum + c.progress, 0) / competencies.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Competencies</h1>
            <p className="text-gray-600 mt-1">Track your skills and professional development</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Competency
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalCompetencies}</p>
            <p className="text-sm text-gray-600">Total Competencies</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <CheckCircle className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{masteredCompetencies}</p>
            <p className="text-sm text-gray-600">Mastered</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{inProgressCompetencies}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <TrendingUp className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{avgProgress.toFixed(0)}%</p>
            <p className="text-sm text-gray-600">Avg Progress</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">My Competencies</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Design">Design</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="mastered">Mastered</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                {filteredCompetencies.length > 0 ? (
                  <div className="space-y-4">
                    {filteredCompetencies.map((comp) => (
                      <div key={comp.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{comp.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comp.status)}`}>
                                {comp.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{comp.category}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < comp.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress to Target</span>
                            <span className="font-semibold">{comp.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${comp.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span>Last assessed: {new Date(comp.lastAssessed).toLocaleDateString()}</span>
                          <span>{comp.endorsements} endorsements</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCompetency(comp);
                              setShowAssessmentModal(true);
                            }}
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Request Assessment
                          </button>
                          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Competencies Found</h3>
                    <p className="text-gray-600 mb-6">Start tracking your skills and competencies</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Your First Competency
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Badges Earned</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(badge.earnedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Assessments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{assessment.competencyName}</h3>
                        <span className="text-sm font-bold text-blue-600">
                          {assessment.score}/{assessment.maxScore}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{assessment.feedback}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{assessment.assessor}</span>
                        <span>{new Date(assessment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Add Competency</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Competency Name</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., React Development" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Design">Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Level (1-5)</label>
                  <input type="number" min="1" max="5" required className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Level (1-5)</label>
                  <input type="number" min="1" max="5" required className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Competency
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAssessmentModal && selectedCompetency && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Request Assessment</h3>
                <button onClick={() => {
                  setShowAssessmentModal(false);
                  setSelectedCompetency(null);
                }} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">{selectedCompetency.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-700">
                  <span>Category: {selectedCompetency.category}</span>
                  <span>Current Level: {selectedCompetency.level}/5</span>
                  <span>Target: {selectedCompetency.targetLevel}/5</span>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Type</label>
                  <select required className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select type</option>
                    <option value="self">Self Assessment</option>
                    <option value="peer">Peer Assessment</option>
                    <option value="instructor">Instructor Assessment</option>
                    <option value="project">Project-Based Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Assessor (Optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Name or email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    placeholder="Any specific areas you'd like to focus on..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssessmentModal(false);
                      setSelectedCompetency(null);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
