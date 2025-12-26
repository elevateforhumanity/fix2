'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';


export const dynamic = 'force-dynamic';

// Barber-specific skills to track
const BARBER_SKILLS = [
  {
    id: 'basic-clipper',
    name: 'Basic Clipper Techniques',
    category: 'Fundamentals',
  },
  {
    id: 'scissor-over-comb',
    name: 'Scissor Over Comb',
    category: 'Fundamentals',
  },
  { id: 'low-fade', name: 'Low Fade', category: 'Fades' },
  { id: 'mid-fade', name: 'Mid Fade', category: 'Fades' },
  { id: 'high-fade', name: 'High Fade', category: 'Fades' },
  { id: 'skin-fade', name: 'Skin Fade', category: 'Fades' },
  { id: 'taper-fade', name: 'Taper Fade', category: 'Fades' },
  { id: 'drop-fade', name: 'Drop Fade', category: 'Fades' },
  { id: 'burst-fade', name: 'Burst Fade', category: 'Fades' },
  { id: 'temple-fade', name: 'Temple Fade', category: 'Fades' },
  { id: 'classic-taper', name: 'Classic Taper', category: 'Classic Cuts' },
  { id: 'crew-cut', name: 'Crew Cut', category: 'Classic Cuts' },
  { id: 'flat-top', name: 'Flat Top', category: 'Classic Cuts' },
  { id: 'pompadour', name: 'Pompadour', category: 'Modern Styles' },
  { id: 'undercut', name: 'Undercut', category: 'Modern Styles' },
  { id: 'quiff', name: 'Quiff', category: 'Modern Styles' },
  { id: 'textured-crop', name: 'Textured Crop', category: 'Modern Styles' },
  { id: 'beard-shape', name: 'Beard Shaping', category: 'Facial Hair' },
  { id: 'beard-fade', name: 'Beard Fade', category: 'Facial Hair' },
  {
    id: 'straight-razor',
    name: 'Straight Razor Shave',
    category: 'Facial Hair',
  },
  { id: 'hot-towel', name: 'Hot Towel Treatment', category: 'Facial Hair' },
  { id: 'line-work', name: 'Line Work & Edge Ups', category: 'Finishing' },
  { id: 'neck-cleanup', name: 'Neck Cleanup', category: 'Finishing' },
];

interface SkillLog {
  id: string;
  student_id: string;
  skill_id: string;
  skill_name: string;
  date: string;
  quality_rating: number;
  notes: string;
  instructor_id: string;
  approved: boolean;
  created_at: string;
}

export default function SkillsTrackingPage() {
  const supabase = createClient();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [qualityRating, setQualityRating] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [skillLogs, setSkillLogs] = useState<SkillLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
    if (selectedStudent) {
      loadSkillLogs(selectedStudent);
    }
  }, [selectedStudent]);

  async function loadStudents() {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('role', 'student')
      .order('full_name');

    setStudents(data || []);
  }

  async function loadSkillLogs(studentId: string) {
    const { data } = await supabase
      .from('skill_logs')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false });

    setSkillLogs(data || []);
  }

  async function logSkill() {
    if (!selectedStudent || !selectedSkill) {
      alert('Please select a student and skill');
      return;
    }

    setLoading(true);

    const skill = BARBER_SKILLS.find((s) => s.id === selectedSkill);

    const { error } = await supabase.from('skill_logs').insert({
      student_id: selectedStudent,
      skill_id: selectedSkill,
      skill_name: skill?.name,
      date: new Date().toISOString().split('T')[0],
      quality_rating: qualityRating,
      notes: notes,
      approved: true,
    });

    if (error) {
      alert('Error logging skill: ' + error.message);
    } else {
      alert('Skill logged successfully!');
      setSelectedSkill('');
      setNotes('');
      setQualityRating(3);
      loadSkillLogs(selectedStudent);
    }

    setLoading(false);
  }

  const skillsByCategory = BARBER_SKILLS.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof BARBER_SKILLS>
  );

  const studentSkillCounts = skillLogs.reduce(
    (acc, log) => {
      acc[log.skill_id] = (acc[log.skill_id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Skills Tracking"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Skills Tracking
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Skills Tracking - Barber Program
          </h1>
          <p className="text-gray-600 mt-2">
            Track student progress on specific cuts, fades, and techniques
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Log New Skill */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Log Student Skill
            </h2>

            {/* Student Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(
                  e: React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Selection by Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Skill
              </label>
              <select
                value={selectedSkill}
                onChange={(
                  e: React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={!selectedStudent}
              >
                <option value="">Choose a skill...</option>
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <optgroup key={category} label={category}>
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}{' '}
                        {studentSkillCounts[skill.id]
                          ? `(${studentSkillCounts[skill.id]} logged)`
                          : ''}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Quality Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality Rating
              </label>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setQualityRating(rating)}
                    className={`w-12 h-12 rounded-full font-bold transition-all ${
                      qualityRating === rating
                        ? 'bg-brand-orange-600 text-white scale-110'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                1 = Needs Work | 3 = Proficient | 5 = Master Level
              </p>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(
                  e: React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                Content="Add any observations, tips, or areas for improvement..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={logSkill}
              disabled={loading || !selectedStudent || !selectedSkill}
              className="w-full bg-brand-orange-600 text-white py-3 rounded-lg font-bold hover:bg-brand-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Logging...' : 'Log Skill'}
            </button>
          </div>

          {/* Right Column - Student Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {selectedStudent ? 'Student Progress' : 'Select a Student'}
            </h2>

            {selectedStudent ? (
              <>
                {/* Progress Overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-brand-blue-600">
                      {skillLogs.length}
                    </div>
                    <div className="text-xs text-gray-600">
                      Total Skills Logged
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-brand-green-600">
                      {Object.keys(studentSkillCounts).length}
                    </div>
                    <div className="text-xs text-gray-600">Unique Skills</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {skillLogs.length > 0
                        ? (
                            skillLogs.reduce(
                              (sum, log) => sum + log.quality_rating,
                              0
                            ) / skillLogs.length
                          ).toFixed(1)
                        : '0'}
                    </div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                </div>

                {/* Skills by Category */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(skillsByCategory).map(
                    ([category, skills]) => (
                      <div key={category} className="border-b pb-4">
                        <h3 className="font-bold text-gray-900 mb-2">
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {skills.map((skill) => {
                            const count = studentSkillCounts[skill.id] || 0;
                            // @ts-expect-error TS2448: Block-scoped variable 'skillLogs' used before its declaration.
                            const skillLogs = skillLogs.filter(
                              (log) => log.skill_id === skill.id
                            );
                            const avgRating =
                              skillLogs.length > 0
                                ? skillLogs.reduce(
                                    (sum, log) => sum + log.quality_rating,
                                    0
                                  ) / skillLogs.length
                                : 0;

                            return (
                              <div
                                key={skill.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <span
                                  className={
                                    count > 0
                                      ? 'text-gray-900'
                                      : 'text-gray-400'
                                  }
                                >
                                  {skill.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  {count > 0 && (
                                    <>
                                      <span className="text-xs text-gray-500">
                                        {count}x
                                      </span>
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <svg
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < Math.round(avgRating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  {count === 0 && (
                                    <span className="text-xs text-gray-400">
                                      Not logged
                                    </span>
                                  )}

                                  {/* CTA Section */}
                                  <section className="py-16    text-white">
                                    <div className="container mx-auto px-4">
                                      <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6">
                                          Ready to Transform Your Career?
                                        </h2>
                                        <p className="text-base md:text-lg mb-8 text-blue-100">
                                          Join thousands who have launched
                                          successful careers through our free
                                          training programs.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                          <Link
                                            href="/contact"
                                            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
                                          >
                                            Apply Now - It's Free
                                          </Link>
                                          <Link
                                            href="/programs"
                                            className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 border-2 border-white text-lg shadow-2xl transition-all"
                                          >
                                            Browse All Programs
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Recent Logs */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {skillLogs.slice(0, 10).map((log) => (
                      <div
                        key={log.id}
                        className="text-sm bg-gray-50 p-3 rounded"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{log.skill_name}</span>
                          <span className="text-xs text-gray-500">
                            {log.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${
                                  i < log.quality_rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {log.notes && (
                            <span className="text-xs text-gray-600">
                              - {log.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p>Select a student to view their progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
