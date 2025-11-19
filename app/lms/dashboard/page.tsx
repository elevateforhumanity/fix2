// app/lms/dashboard/page.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

// TODO: Replace with real data from your DB
const MOCK_DASHBOARD = {
  learnerName: "Elevate Learner",
  stats: {
    inProgress: 3,
    completed: 1,
    certificates: 1,
    hours: 42,
  },
  continueCourses: [
    {
      id: "hvac-101",
      title: "HVAC Technician Fundamentals",
      programType: "HVAC • Skilled Trades",
      progress: 45,
      nextLesson: "Electrical Basics: Safety & Tools",
      rating: 4.6,
      reviews: 38,
    },
    {
      id: "barber-apprentice-1",
      title: "Barber Foundations: Shop Readiness",
      programType: "Barber Apprenticeship",
      progress: 20,
      nextLesson: "Sanitation & State Requirements",
      rating: 4.9,
      reviews: 21,
    },
    {
      id: "ma-101",
      title: "Intro to Medical Assisting",
      programType: "Healthcare • Medical Assistant",
      progress: 60,
      nextLesson: "Vital Signs Practice Lab",
      rating: 4.7,
      reviews: 17,
    },
  ],
  upcoming: [
    {
      id: 1,
      title: "HVAC Lab – Refrigeration Basics",
      date: "Tuesday, Nov 25",
      time: "6:00 PM – 8:30 PM",
      location: "Partner campus lab",
    },
    {
      id: 2,
      title: "Barber Apprenticeship Check-in",
      date: "Thursday, Nov 27",
      time: "1:00 PM",
      location: "Sponsor shop",
    },
  ],
};

export default function LmsDashboardPage() {
  const learner = MOCK_DASHBOARD;

  const handleShare = () => {
    toast.success("Share link copied! You can send this to an employer or case manager.");
  };

  return (
    <>
      <Toaster position="top-right" />
      <main>
        <Section>
          <div className="container-padded space-y-8">
            {/* Header / welcome */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
                  Elevate LMS • Student Dashboard
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  Welcome back, {learner.learnerName}.
                </h1>
                <p className="max-w-xl text-sm md:text-base text-slate-700">
                  Pick up where you left off, see your program progress, and keep moving
                  toward funded training, apprenticeships, and employment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/programs">
                  <Button size="md" variant="outline">
                    Explore other programs
                  </Button>
                </Link>
                <Button size="md" onClick={handleShare}>
                  Copy my progress link
                </Button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid gap-4 md:grid-cols-4">
              <AnimatedCard className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  In progress
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {learner.stats.inProgress}
                </p>
                <p className="text-xs text-slate-600">Active courses</p>
              </AnimatedCard>

              <AnimatedCard className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Completed
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {learner.stats.completed}
                </p>
                <p className="text-xs text-slate-600">Courses finished</p>
              </AnimatedCard>

              <AnimatedCard className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Certificates
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {learner.stats.certificates}
                </p>
                <p className="text-xs text-slate-600">
                  Download from your profile when issued
                </p>
              </AnimatedCard>

              <AnimatedCard className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Learning hours
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {learner.stats.hours}
                </p>
                <p className="text-xs text-slate-600">Approximate time on platform</p>
              </AnimatedCard>
            </div>

            {/* Continue learning + upcoming */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
              {/* Continue learning */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                    Continue learning
                  </h2>
                  <Link
                    href="/lms/courses"
                    className="text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {learner.continueCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/lms/course/${course.id}`}
                      className="block"
                    >
                      <AnimatedCard className="h-full cursor-pointer p-4 md:p-5 space-y-3">
                        <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
                          {course.programType}
                        </span>
                        <h3 className="text-sm md:text-base font-semibold text-slate-900">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                          Next up: {course.nextLesson}
                        </p>
                        <ProgressBar progress={course.progress} />
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                          <StarRating rating={course.rating} count={course.reviews} />
                          <span>{course.progress}% complete</span>
                        </div>
                      </AnimatedCard>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Upcoming */}
              <Card className="p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Upcoming labs & check-ins
                  </h2>
                  <span className="text-[11px] text-slate-500">Local time</span>
                </div>

                {learner.upcoming.length === 0 ? (
                  <p className="text-xs text-slate-600">
                    No upcoming items yet. Your navigator or program will add labs,
                    orientation, and check-ins here.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {learner.upcoming.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                      >
                        <p className="text-xs font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          {item.date} • {item.time}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.location}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full justify-center"
                >
                  View full calendar
                </Button>
              </Card>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
