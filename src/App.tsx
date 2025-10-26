import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ProgramsGrid from './components/ProgramsGrid';
import Testimonials from './components/Testimonials';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load pages for better performance
const Programs = lazy(() => import('./pages/Programs.tsx'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const LMSCourses = lazy(() => import('./pages/LMSCourses'));
const Dashboard = lazy(() => import('./pages/lms/Dashboard'));
const CoursePage = lazy(() => import('./pages/lms/CoursePage'));
const LessonPage = lazy(() => import('./pages/lms/LessonPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Account = lazy(() => import('./pages/auth/Account'));
const InstructorDashboard = lazy(() => import('./pages/instructor/InstructorDashboard'));
const CourseEditor = lazy(() => import('./pages/instructor/CourseEditor'));
const LessonManager = lazy(() => import('./pages/instructor/LessonManager'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const MyCertificates = lazy(() => import('./pages/MyCertificates'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentCancelled = lazy(() => import('./pages/PaymentCancelled'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProgramsGrid />
      <section className="section">
        <div className="container">
          <div className="card p-8 md:p-10 bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-bold">Ready to Change Your Life?</h3>
              <p className="mt-3 text-lg text-brand-text">
                Join over 1,200 people who've started new careers through our
                free training programs. No experience needed—we'll teach you
                everything.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/apply" className="btn text-lg px-6 py-3">
                  Apply Now (Takes 5 Minutes) →
                </a>
                <a href="/programs" className="btn-outline text-lg px-6 py-3">
                  Browse All Programs
                </a>
              </div>
              <p className="mt-4 text-sm text-brand-text-light">
                💡 Questions? Call us at (317) 555-0100 or email
                hello@elevateforhumanity.org
              </p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}

function SimplePage({ title }: { title: string }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-brand-text-muted">Content coming online.</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SiteLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramPage />} />
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          {/* LMS Routes (Protected) */}
          <Route
            path="/lms"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/lms/courses" element={<LMSCourses />} />
          <Route path="/lms/course/:courseId" element={<CoursePage />} />
          <Route
            path="/lms/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          />
          {/* Instructor Routes (Protected - Instructor Role) */}
          <Route
            path="/instructor"
            element={
              <ProtectedRoute requireRole="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:courseId/edit"
            element={
              <ProtectedRoute requireRole="instructor">
                <CourseEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:courseId/lessons"
            element={
              <ProtectedRoute requireRole="instructor">
                <LessonManager />
              </ProtectedRoute>
            }
          />
          {/* Certificate Routes */}
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <MyCertificates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate/:certificateId"
            element={<CertificatePage />}
          />
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/verify/:certNumber" element={<VerifyCertificate />} />
          {/* Payment Routes */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancelled" element={<PaymentCancelled />} />
          {/* Other Routes */}
          <Route path="/partners" element={<SimplePage title="Partners" />} />
          <Route path="/apply" element={<SimplePage title="Apply Now" />} />
          <Route path="*" element={<SimplePage title="Not Found" />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
