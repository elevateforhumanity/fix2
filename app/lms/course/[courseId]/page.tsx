// app/lms/course/[courseId]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StarRating } from "@/components/ui/StarRating";
import { Toaster, toast } from "react-hot-toast";
import InteractiveVideoPlayer from "@/components/lms/InteractiveVideoPlayer";

// ---- Mock course data: swap with real DB/API later ----
type Lesson = {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "reading";
};

type Course = {
  id: string;
  title: string;
  badge: string;
  description: string;
  rating: number;
  reviews: number;
  lastUpdated: string;
  level: string;
  duration: string;
  videoUrl: string;
  lessons: Lesson[];
};

const MOCK_COURSES: Record<string, Course> = {
  "hvac-101": {
    id: "hvac-101",
    title: "HVAC Technician Fundamentals",
    badge: "HVAC • Skilled Trades",
    description:
      "Start here to build your foundation in safety, tools, and core HVAC concepts before you step into labs and fieldwork.",
    rating: 4.7,
    reviews: 38,
    lastUpdated: "Nov 2025",
    level: "Beginner friendly",
    duration: "8–10 hours of content",
    videoUrl: "/sample/hvac-intro.mp4", // TODO: Replace with your actual asset
    lessons: [
      {
        id: "lesson-1",
        title: "Welcome & Program Overview",
        duration: "4 min",
        type: "video",
      },
      {
        id: "lesson-2",
        title: "Safety First: PPE & Environment",
        duration: "9 min",
        type: "video",
      },
      {
        id: "lesson-3",
        title: "Tools You'll Use Every Day",
        duration: "13 min",
        type: "video",
      },
      {
        id: "lesson-4",
        title: "Intro to Electricity (HVAC)",
        duration: "18 min",
        type: "video",
      },
      {
        id: "quiz-1",
        title: "Check Your Knowledge: Safety & Tools",
        duration: "10 questions",
        type: "quiz",
      },
    ],
  },
  "barber-apprentice-1": {
    id: "barber-apprentice-1",
    title: "Barber Foundations: Shop Readiness",
    badge: "Barber Apprenticeship",
    description:
      "Learn shop expectations, sanitation, and customer service basics so you show up like a pro from day one in your sponsor shop.",
    rating: 4.9,
    reviews: 21,
    lastUpdated: "Oct 2025",
    level: "Beginner",
    duration: "5–6 hours of content",
    videoUrl: "/sample/barber-intro.mp4",
    lessons: [
      {
        id: "lesson-1",
        title: "Welcome to Apprenticeship",
        duration: "5 min",
        type: "video",
      },
      {
        id: "lesson-2",
        title: "Shop Etiquette & First Impressions",
        duration: "11 min",
        type: "video",
      },
      {
        id: "lesson-3",
        title: "Sanitation & State Requirements",
        duration: "16 min",
        type: "video",
      },
      {
        id: "quiz-1",
        title: "Sanitation Checkpoint",
        duration: "8 questions",
        type: "quiz",
      },
    ],
  },
  "ma-101": {
    id: "ma-101",
    title: "Intro to Medical Assisting",
    badge: "Healthcare • Medical Assistant",
    description:
      "Build your foundation in patient care, vital signs, and clinical procedures for medical assistant roles.",
    rating: 4.7,
    reviews: 17,
    lastUpdated: "Nov 2025",
    level: "Beginner",
    duration: "12 hours of content",
    videoUrl: "/sample/ma-intro.mp4",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Medical Assisting",
        duration: "6 min",
        type: "video",
      },
      {
        id: "lesson-2",
        title: "Patient Communication Basics",
        duration: "12 min",
        type: "video",
      },
      {
        id: "lesson-3",
        title: "Vital Signs Practice Lab",
        duration: "20 min",
        type: "video",
      },
    ],
  },
};

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const course: Course = MOCK_COURSES[courseId] ?? MOCK_COURSES["hvac-101"];

  const [currentLessonId, setCurrentLessonId] = useState(
    course.lessons[0]?.id ?? ""
  );
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [playbackRate, setPlaybackRate] = useState(1);

  const currentLesson = useMemo(
    () => course.lessons.find((l) => l.id === currentLessonId) ?? course.lessons[0],
    [course.lessons, currentLessonId]
  );

  const progress = useMemo(() => {
    if (!course.lessons.length) return 0;
    const done = completedIds.length;
    return Math.round((done / course.lessons.length) * 100);
  }, [completedIds, course.lessons.length]);

  const handleMarkComplete = () => {
    if (!completedIds.includes(currentLesson.id)) {
      setCompletedIds([...completedIds, currentLesson.id]);
      toast.success("Lesson marked complete.");
    }
    // Move to next lesson if exists
    const index = course.lessons.findIndex((l) => l.id === currentLesson.id);
    const next = course.lessons[index + 1];
    if (next) {
      setCurrentLessonId(next.id);
    } else {
      toast.success("Course section complete—great job!");
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    toast(`Playback speed set to ${rate}x`, { icon: "🎧" });
  };

  return (
    <>
      <Toaster position="top-right" />
      <main>
        <Section>
          <div className="container-padded space-y-5 md:space-y-6">
            {/* Top meta */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
                  {course.badge}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  {course.title}
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-slate-700">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-600">
                  <StarRating rating={course.rating} count={course.reviews} />
                  <span>Last updated {course.lastUpdated}</span>
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="w-full max-w-xs rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
                <ProgressBar progress={progress} />
                <p className="mt-2 text-[11px] text-slate-600">
                  Lessons completed: {completedIds.length} of {course.lessons.length}
                </p>
                <Button
                  className="mt-3 w-full justify-center"
                  size="sm"
                  onClick={handleMarkComplete}
                >
                  Mark lesson complete &amp; go next
                </Button>
              </div>
            </div>

            {/* Player + curriculum layout */}
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.7fr),minmax(0,1.1fr)] items-start">
              {/* LEFT: video + notes */}
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full bg-slate-900">
                    {currentLesson.type === "video" ? (
                      <InteractiveVideoPlayer
                        videoUrl={
                          (currentLesson as any).videoUrl ??
                          "https://www.youtube.com/embed/dQw4w9WgXcQ"
                        }
                        title={currentLesson.title}
                        quizzes={[
                          {
                            id: "q1",
                            timestamp: 30,
                            question: "What is the most important safety equipment?",
                            options: [
                              "Hard hat",
                              "Safety glasses",
                              "Steel-toe boots",
                              "All of the above",
                            ],
                            correctAnswer: 3,
                            explanation:
                              "All safety equipment works together to protect you on the job.",
                          },
                        ]}
                        transcript={[
                          {
                            start: 0,
                            end: 10,
                            text: `Welcome to this lesson on ${currentLesson.title}.`,
                          },
                          {
                            start: 10,
                            end: 20,
                            text: "In this video, we'll cover the fundamentals you need to know to stay safe and job-ready.",
                          },
                        ]}
                        onProgress={(progress) => {
                          // Simple front-end progress tracking.
                          // If you already store this in Supabase, you can call your mutation here.
                          // Example: if 80% watched, auto-mark complete once.
                          if (progress >= 0.8 && !completedIds.includes(currentLesson.id)) {
                            handleMarkComplete();
                            toast.success("Lesson marked complete based on video progress.");
                          }
                        }}
                        onComplete={() => {
                          // Called when the video hits 100% in the player
                          if (!completedIds.includes(currentLesson.id)) {
                            handleMarkComplete();
                            toast.success("Great job! You've completed this video lesson.");
                          }
                        }}
                      />
                    ) : (
                      // Fallback for non-video lessons (PDF, text, etc.)
                      <video
                        key={currentLesson.id}
                        controls
                        className="h-full w-full"
                        controlsList="nodownload"
                        playsInline
                      >
                        {(currentLesson as any).mediaUrl && (
                          <source src={(currentLesson as any).mediaUrl} />
                        )}
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-[11px] text-slate-600">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">
                        {currentLesson.title}
                      </p>
                      <p>{currentLesson.duration}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span>Speed</span>
                        <select
                          className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700"
                          value={playbackRate}
                          onChange={(e) =>
                            handlePlaybackRateChange(Number(e.target.value))
                          }
                        >
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                        {currentLesson.type === "quiz"
                          ? "Checkpoint"
                          : "Video lesson"}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Simple notes area (later you can persist this) */}
                <Card className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900">
                      Notes for this lesson
                    </h2>
                    <span className="text-[11px] text-slate-500">
                      Private to you
                    </span>
                  </div>
                  <textarea
                    className="mt-1 h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                    placeholder="Write down key terms, reminders, and things you want to revisit…"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toast("In a real build, this would save your notes.", {
                          icon: "💾",
                        })
                      }
                    >
                      Save notes
                    </Button>
                  </div>
                </Card>
              </div>

              {/* RIGHT: curriculum sidebar */}
              <Card className="p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm md:text-base font-semibold text-slate-900">
                    Course curriculum
                  </h2>
                  <span className="text-[11px] text-slate-500">
                    {course.lessons.length} items
                  </span>
                </div>

                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  {course.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id;
                    const isCompleted = completedIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={[
                          "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-xs md:text-[13px] transition-all duration-200",
                          isActive
                            ? "border-red-600 bg-red-50/30 text-slate-900"
                            : "border-slate-100 bg-slate-50 hover:bg-slate-100/80",
                        ].join(" ")}
                      >
                        <div className="flex flex-1 flex-col">
                          <span className="font-semibold">
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 text-[11px] text-slate-600">
                            {lesson.type === "quiz" ? "Quiz • " : "Lesson • "}
                            {lesson.duration}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                              <span>✓</span> Done
                            </span>
                          ) : isActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 text-[10px] font-semibold text-white px-2 py-0.5">
                              Now
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500">
                              {lesson.type === "quiz" ? "Checkpoint" : "Watch"}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-dashed border-slate-200 text-[11px] text-slate-600">
                  <p>
                    Your case manager, employer, or sponsor can view your completion
                    status from their Elevate portal once you're fully connected.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
