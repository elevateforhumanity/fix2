'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase';
import Link from 'next/link';
import AIInstructor from '@/app/components/AIInstructor';

interface Lesson {
  id: string;
  title: string;
  lesson_type: string;
  video_url: string | null;
  content_url: string | null;
  duration_minutes: number | null;
  description: string | null;
  order_index: number;
  module_id: string;
  module_title: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [progress, setProgress] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [aiInstructor, setAiInstructor] = useState<any>(null);
  const [aiMessage, setAiMessage] = useState('');
  const [showAiInstructor, setShowAiInstructor] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadCourse();
  }, [params.programId]);

  const loadCourse = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Get program
    const { data: programData } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', params.programId)
      .single();

    if (!programData) {
      router.push('/programs');
      return;
    }

    setProgram(programData);

    // Get AI Instructor
    const { data: instructorData } = await supabase
      .from('ai_instructors')
      .select('*')
      .eq('program_id', programData.id)
      .eq('is_active', true)
      .single();

    if (instructorData) {
      setAiInstructor(instructorData);
      setAiMessage(instructorData.welcome_message);
    }

    // Get enrollment
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('program_id', programData.id)
      .single();

    if (!enrollmentData) {
      router.push(`/programs/${params.programId}`);
      return;
    }

    setEnrollment(enrollmentData);

    // Get modules and lessons
    const { data: modulesData } = await supabase
      .from('modules')
      .select(`
        id,
        title,
        order_index,
        lessons (
          id,
          title,
          lesson_type,
          video_url,
          content_url,
          duration_minutes,
          description,
          order_index
        )
      `)
      .eq('program_id', programData.id)
      .order('order_index', { ascending: true });

    if (modulesData) {
      const formattedModules = modulesData.map((mod: any) => ({
        id: mod.id,
        title: mod.title,
        lessons: (mod.lessons || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((lesson: any) => ({
            ...lesson,
            module_id: mod.id,
            module_title: mod.title,
          })),
      }));

      setModules(formattedModules);

      // Set first lesson as current
      if (formattedModules.length > 0 && formattedModules[0].lessons.length > 0) {
        const firstLesson = formattedModules[0].lessons[0];
        setCurrentLesson(firstLesson);
        
        // AI Instructor introduces the lesson
        if (aiInstructor) {
          setAiMessage(`Great! Let's start with "${firstLesson.title}". This lesson will teach you the fundamentals. Pay close attention and take notes if needed. You've got this!`);
        }
      }
    }

    // Get progress
    const { data: progressData } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('enrollment_id', enrollmentData.id);

    const progressMap: any = {};
    progressData?.forEach((p: any) => {
      progressMap[p.lesson_id] = p;
    });
    setProgress(progressMap);

    setLoading(false);
  };

  const markAsComplete = async () => {
    if (!currentLesson || !enrollment) return;

    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        enrollment_id: enrollment.id,
        lesson_id: currentLesson.id,
        status: 'completed',
        completed_at: new Date().toISOString(),
        last_viewed_at: new Date().toISOString(),
      });

    if (!error) {
      setProgress({
        ...progress,
        [currentLesson.id]: {
          ...progress[currentLesson.id],
          status: 'completed',
          completed_at: new Date().toISOString(),
        },
      });

      // Move to next lesson
      goToNextLesson();
    }
  };

  const goToNextLesson = () => {
    if (!currentLesson) return;

    let found = false;
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (found) {
          setCurrentLesson(lesson);
          return;
        }
        if (lesson.id === currentLesson.id) {
          found = true;
        }
      }
    }
  };

  const goToPreviousLesson = () => {
    if (!currentLesson) return;

    let prevLesson: Lesson | null = null;
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLesson.id) {
          if (prevLesson) {
            setCurrentLesson(prevLesson);
          }
          return;
        }
        prevLesson = lesson;
      }
    }
  };

  const saveNotes = async () => {
    if (!currentLesson || !notes.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('lesson_notes')
      .insert({
        user_id: user.id,
        lesson_id: currentLesson.id,
        content: notes,
      });

    alert('Notes saved!');
    setNotes('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - Lesson List */}
      <div className="w-80 bg-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <Link
            href={`/programs/${params.programId}`}
            className="text-gray-400 hover:text-white text-sm flex items-center"
          >
            ← Back to Program
          </Link>
          <h2 className="text-white font-bold text-lg mt-2">{program?.title}</h2>
        </div>

        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-700">
            <div className="p-4 bg-gray-750">
              <h3 className="text-white font-semibold">{module.title}</h3>
            </div>
            {module.lessons.map((lesson) => {
              const isCompleted = progress[lesson.id]?.status === 'completed';
              const isCurrent = currentLesson?.id === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full text-left p-4 hover:bg-gray-700 transition-colors ${
                    isCurrent ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isCurrent ? 'text-white font-medium' : 'text-gray-300'}`}>
                        {lesson.title}
                      </p>
                      {lesson.duration_minutes && (
                        <p className="text-xs text-gray-500 mt-1">
                          {lesson.duration_minutes} min
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col">
        {currentLesson ? (
          <>
            {/* Video/Content Area */}
            <div className="flex-1 bg-black flex items-center justify-center">
              {currentLesson.lesson_type === 'video' && currentLesson.video_url ? (
                <div className="w-full h-full">
                  {currentLesson.video_url.includes('youtube.com') || currentLesson.video_url.includes('youtu.be') ? (
                    <iframe
                      src={currentLesson.video_url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : currentLesson.video_url.includes('vimeo.com') ? (
                    <iframe
                      src={currentLesson.video_url.replace('vimeo.com/', 'player.vimeo.com/video/')}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={currentLesson.video_url}
                      controls
                      className="w-full h-full"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg mb-2">Video Coming Soon</p>
                  <p className="text-gray-500 text-sm">
                    This lesson video will be available shortly
                  </p>
                </div>
              )}
            </div>

            {/* AI Instructor */}
            {showAiInstructor && aiInstructor && aiMessage && (
              <div className="bg-gray-800 border-t border-gray-700 p-6">
                <AIInstructor
                  instructorName={aiInstructor.instructor_name}
                  avatarUrl={aiInstructor.instructor_avatar_url}
                  message={aiMessage}
                  autoPlay={false}
                />
              </div>
            )}

            {/* Lesson Info and Controls */}
            <div className="bg-gray-800 border-t border-gray-700">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {currentLesson.title}
                </h1>
                {currentLesson.description && (
                  <p className="text-gray-400 mb-4">{currentLesson.description}</p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={goToPreviousLesson}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ← Previous
                  </button>
                  
                  {progress[currentLesson.id]?.status === 'completed' ? (
                    <button
                      onClick={goToNextLesson}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Next Lesson →
                    </button>
                  ) : (
                    <button
                      onClick={markAsComplete}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Mark as Complete
                    </button>
                  )}

                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    📝 Notes
                  </button>
                </div>

                {/* Notes Section */}
                {showNotes && (
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">Lesson Notes</h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes about this lesson..."
                      className="w-full h-32 bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={saveNotes}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Notes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">Select a lesson to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
