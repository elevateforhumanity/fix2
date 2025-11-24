'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  ChevronLeft, ChevronRight, CheckCircle, Circle, Lock,
  BookOpen, FileText, MessageSquare, Award, Download,
  ThumbsUp, Flag, Share2, Clock, Users, Star
} from 'lucide-react';

export default function CourseLearnPage({ params }: { params: { courseId: string } }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const course = courseData[params.courseId] || courseData['vita-tax-prep'];
  const lesson = course.lessons[currentLesson];

  const handleNextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setIsPlaying(false);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setIsPlaying(false);
    }
  };

  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progressPercent = Math.round((completedLessons / course.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/courses/catalog"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <div>
                <h1 className="text-white font-bold">{course.title}</h1>
                <p className="text-sm text-slate-400">
                  Lesson {currentLesson + 1} of {course.lessons.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Progress */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-sm text-slate-400">Progress:</div>
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-sm font-semibold text-white">{progressPercent}%</div>
              </div>

              {/* Actions */}
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                {/* Video Placeholder */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause size={32} className="text-white" />
                    ) : (
                      <Play size={32} className="text-white ml-1" />
                    )}
                  </div>
                  <p className="text-white text-lg font-semibold">{lesson.title}</p>
                  <p className="text-slate-400 text-sm mt-2">{lesson.duration}</p>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-red-500 transition-colors"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-red-500 transition-colors"
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <div className="flex-1 h-1 bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 w-1/3" />
                    </div>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="bg-slate-800 text-white text-sm px-2 py-1 rounded border border-slate-600"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                    <button className="text-white hover:text-red-500 transition-colors">
                      <Maximize size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Navigation */}
            <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">
              <button
                onClick={handlePreviousLesson}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="text-center">
                <p className="text-white font-semibold">{lesson.title}</p>
                <p className="text-sm text-slate-400">
                  {currentLesson + 1} of {course.lessons.length}
                </p>
              </div>

              <button
                onClick={handleNextLesson}
                disabled={currentLesson === course.lessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Tabs: Overview, Transcript, Notes, Q&A */}
            <div className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-700">
                <button className="px-6 py-3 text-white font-semibold border-b-2 border-red-600">
                  Overview
                </button>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                >
                  Transcript
                </button>
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                >
                  Notes
                </button>
                <button className="px-6 py-3 text-slate-400 hover:text-white transition-colors">
                  Q&A
                </button>
              </div>

              <div className="p-6">
                {/* Overview Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                    <p className="text-slate-300">{lesson.description}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {lesson.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  {lesson.resources && lesson.resources.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-white mb-3">Resources:</h4>
                      <div className="space-y-2">
                        {lesson.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                          >
                            <Download size={20} className="text-red-500" />
                            <div className="flex-1">
                              <p className="text-white font-medium">{resource.name}</p>
                              <p className="text-sm text-slate-400">{resource.type}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                      <ThumbsUp size={18} />
                      Helpful
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                      <Flag size={18} />
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="bg-slate-800 rounded-xl overflow-hidden h-fit sticky top-6">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-white font-bold mb-2">Course Content</h3>
              <p className="text-sm text-slate-400">
                {completedLessons} of {course.lessons.length} lessons completed
              </p>
            </div>

            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {course.lessons.map((lessonItem, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLesson(index)}
                  className={`w-full text-left p-4 border-b border-slate-700 hover:bg-slate-700 transition-colors ${
                    index === currentLesson ? 'bg-slate-700' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {lessonItem.completed ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : lessonItem.locked ? (
                        <Lock size={20} className="text-slate-500" />
                      ) : (
                        <Circle size={20} className="text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${
                        lessonItem.locked ? 'text-slate-500' : 'text-white'
                      }`}>
                        {index + 1}. {lessonItem.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Play size={12} />
                          {lessonItem.duration}
                        </span>
                        {lessonItem.quiz && (
                          <span className="flex items-center gap-1">
                            <FileText size={12} />
                            Quiz
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Course Actions */}
            <div className="p-4 border-t border-slate-700 space-y-3">
              <Link
                href={`/courses/${params.courseId}/discussions`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                <MessageSquare size={18} />
                Discussions
              </Link>
              <Link
                href={`/courses/${params.courseId}/certificate`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Award size={18} />
                Get Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Data
const courseData: Record<string, any> = {
  'vita-tax-prep': {
    title: 'VITA Tax Preparation Certification',
    lessons: [
      {
        title: 'Introduction to VITA Program',
        duration: '12:34',
        description: 'Learn about the Volunteer Income Tax Assistance program and how it helps communities.',
        completed: true,
        locked: false,
        objectives: [
          'Understand the VITA program mission and goals',
          'Learn about IRS certification requirements',
          'Explore volunteer opportunities and benefits',
        ],
        resources: [
          { name: 'VITA Program Overview.pdf', type: 'PDF Document', url: '#' },
          { name: 'IRS Publication 4012', type: 'PDF Document', url: '#' },
        ],
      },
      {
        title: 'Tax Law Fundamentals',
        duration: '18:45',
        description: 'Master the basics of federal tax law and filing requirements.',
        completed: true,
        locked: false,
        quiz: true,
        objectives: [
          'Understand filing status and exemptions',
          'Learn about standard vs itemized deductions',
          'Master tax credit calculations',
        ],
        resources: [
          { name: 'Tax Law Cheat Sheet.pdf', type: 'PDF Document', url: '#' },
        ],
      },
      {
        title: 'Form 1040 Walkthrough',
        duration: '25:12',
        description: 'Step-by-step guide to completing Form 1040 accurately.',
        completed: false,
        locked: false,
        quiz: true,
        objectives: [
          'Navigate Form 1040 sections',
          'Calculate adjusted gross income',
          'Determine tax liability',
        ],
        resources: [],
      },
      {
        title: 'Earned Income Tax Credit (EITC)',
        duration: '15:30',
        description: 'Learn how to determine EITC eligibility and calculate credits.',
        completed: false,
        locked: false,
        objectives: [
          'Understand EITC eligibility requirements',
          'Calculate EITC amounts',
          'Avoid common EITC errors',
        ],
        resources: [],
      },
      {
        title: 'Child Tax Credit and Dependents',
        duration: '14:20',
        description: 'Master dependent claiming rules and child tax credit calculations.',
        completed: false,
        locked: false,
        objectives: [
          'Determine dependent eligibility',
          'Calculate child tax credit',
          'Understand additional child tax credit',
        ],
        resources: [],
      },
      {
        title: 'Practice Tax Returns',
        duration: '30:00',
        description: 'Complete practice returns to prepare for certification exam.',
        completed: false,
        locked: true,
        quiz: true,
        objectives: [
          'Apply tax law knowledge to real scenarios',
          'Complete returns accurately and efficiently',
          'Identify and correct common errors',
        ],
        resources: [
          { name: 'Practice Return Scenarios.pdf', type: 'PDF Document', url: '#' },
        ],
      },
    ],
  },
};
