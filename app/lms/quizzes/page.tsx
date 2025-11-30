import Link from "next/link";

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/lms" className="text-sky-600 hover:underline text-sm">
            ← Back to LMS
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Quizzes & Assessments
        </h1>
        <p className="text-slate-600 mb-8">
          Test your knowledge and track your progress.
        </p>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Quizzes Coming Soon
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Interactive quizzes and assessments will be available once you enroll in a program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
