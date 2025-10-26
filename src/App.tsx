import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
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
        <div className="min-h-screen flex items-center justify-center bg-brand-surface">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-brand-text mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-brand-text-muted mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-info text-white px-6 py-2 rounded-lg hover:bg-brand-info-hover transition-colors"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-brand-text-light hover:text-brand-text">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-brand-surface-dark p-2 rounded overflow-auto">
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
const EFHLanding = lazy(() => import('./pages/EFHLanding'));
const Programs = lazy(() => import('./pages/Programs.tsx'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const LMSCourses = lazy(() => import('./pages/LMSCourses'));
const Dashboard = lazy(() => import('./pages/lms/Dashboard'));
const CoursePage = lazy(() => import('./pages/lms/CoursePage'));
const LessonPage = lazy(() => import('./pages/lms/LessonPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Account = lazy(() => import('./pages/auth/Account'));
const InstructorDashboard = lazy(
  () => import('./pages/instructor/InstructorDashboard')
);
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
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
        <p className="mt-2 text-brand-text-muted">Loading...</p>
      </div>
    </div>
  );
}

// HomePage component removed - using EFHLanding instead
// See routes for current implementation

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
  // Toggle between landing pages:
  // <Route path="/" element={<HomePage />} /> - Original with Hero/TrustStrip
  // <Route path="/" element={<EFHLanding />} /> - New professional landing

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SiteLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<EFHLanding />} />
              {/* New data-driven programs */}
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              {/* Legacy routes - keep for backwards compatibility */}
              <Route path="/programs-old" element={<Programs />} />
              <Route path="/program/:slug" element={<ProgramPage />} />
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
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
              <Route
                path="/lms/courses"
                element={
                  <ProtectedRoute>
                    <LMSCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lms/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CoursePage />
                  </ProtectedRoute>
                }
              />
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
              <Route
                path="/verify/:certNumber"
                element={<VerifyCertificate />}
              />
              {/* Payment Routes */}
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancelled" element={<PaymentCancelled />} />
              {/* Other Routes */}
              <Route
                path="/partners"
                element={<SimplePage title="Partners" />}
              />
              <Route path="/apply" element={<SimplePage title="Apply Now" />} />
              <Route path="*" element={<SimplePage title="Not Found" />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
