// app/programs/[slug]/enroll/page.tsx - Enroll in a program
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function EnrollPage({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchCourse();
  }, [params.slug]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/portal/student?redirect=/programs/${params.slug}/enroll`);
      return;
    }

    setEnrolling(true);
    setError("");

    try {
      const response = await fetch("/api/enrollments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/portal/student/dashboard?enrolled=true");
      } else {
        setError(data.error || "Failed to enroll");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Link href="/programs" className="text-emerald-600 hover:text-emerald-700">
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href={`/programs/${params.slug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition"
        >
          <ArrowLeft size={16} />
          Back to Program
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Enroll in {course.title}
            </h1>
            <p className="text-slate-600">
              Start your learning journey today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Full access to all course materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Track your progress and earn certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>Support from instructors and staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={16} />
                  <span>100% free with approved funding</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-700">
                <strong>Note:</strong> By enrolling, you confirm that you meet the eligibility requirements
                and agree to complete the program requirements.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/programs/${params.slug}`}
              className="flex-1 py-3 px-6 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold text-center hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="flex-1 py-3 px-6 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {enrolling ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Enrolling...
                </>
              ) : (
                "Confirm Enrollment"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
