import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Error Boundary
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
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================
// LAZY LOAD ALL PAGES
// ============================================

// Public Pages
const EFHLanding = lazy(() => import('./pages/EFHLanding'));
const About = lazy(() => import('./pages/About'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const Contact = lazy(() => import('./pages/Connect'));
const Support = lazy(() => import('./pages/Support'));
const Partners = lazy(() => import('./pages/Partners'));

// Programs
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));

// Auth
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Account = lazy(() => import('./pages/auth/Account'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// LMS - Student
const Dashboard = lazy(() => import('./pages/lms/Dashboard'));
const LMSCourses = lazy(() => import('./pages/LMSCourses'));
const CoursePage = lazy(() => import('./pages/lms/CoursePage'));
const LessonPage = lazy(() => import('./pages/lms/LessonPage'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const StudentHandbook = lazy(() => import('./pages/StudentHandbook'));
const StudentHub = lazy(() => import('./pages/StudentHub'));

// LMS - Instructor
const InstructorDashboard = lazy(() => import('./pages/instructor/InstructorDashboard'));
const CourseEditor = lazy(() => import('./pages/instructor/CourseEditor'));
const LessonManager = lazy(() => import('./pages/instructor/LessonManager'));
const InstructorCourseCreate = lazy(() => import('./pages/InstructorCourseCreate'));
const GradeBook = lazy(() => import('./pages/GradeBook'));
const CurriculumUpload = lazy(() => import('./pages/CurriculumUpload'));

// Certificates
const MyCertificates = lazy(() => import('./pages/MyCertificates'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));

// Courses & Learning
const CourseLibrary = lazy(() => import('./pages/CourseLibrary'));
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseBuilder = lazy(() => import('./pages/CourseBuilder'));
const Assignment = lazy(() => import('./pages/Assignment'));
const Quiz = lazy(() => import('./pages/Quiz'));
const QuizResults = lazy(() => import('./pages/QuizResults'));
const QuizBuilder = lazy(() => import('./pages/QuizBuilder'));

// Community & Social
const Community = lazy(() => import('./pages/Community'));
const CommunityHub = lazy(() => import('./pages/CommunityHub'));
const Hub = lazy(() => import('./pages/Hub'));
const Groups = lazy(() => import('./pages/Groups'));
const Connect = lazy(() => import('./pages/Connect'));

// AI & Advanced Features
const AITutor = lazy(() => import('./pages/AITutor'));
const ElevateBrain = lazy(() => import('./pages/ElevateBrain'));
const NotebookLM = lazy(() => import('./pages/NotebookLM'));

// Live Learning
const LiveClassRoom = lazy(() => import('./pages/LiveClassRoom'));
const LiveClassSchedule = lazy(() => import('./pages/LiveClassSchedule'));
const VideoMeeting = lazy(() => import('./pages/VideoMeeting'));

// Admin & Management
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminConsole = lazy(() => import('./pages/AdminConsole'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const Analytics = lazy(() => import('./pages/Analytics'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Branding = lazy(() => import('./pages/Branding'));
const AutopilotAdmin = lazy(() => import('./pages/AutopilotAdmin'));

// Resources & Info
const FundingImpact = lazy(() => import('./pages/FundingImpact'));
const Government = lazy(() => import('./pages/Government'));
const Philanthropy = lazy(() => import('./pages/Philanthropy'));
const BusinessHub = lazy(() => import('./pages/BusinessHub'));
const EducatorHub = lazy(() => import('./pages/EducatorHub'));

// Utilities
const Calendar = lazy(() => import('./pages/Calendar'));
const Notifications = lazy(() => import('./pages/Notifications'));
const NotificationCenter = lazy(() => import('./pages/NotificationCenter'));
const FileManager = lazy(() => import('./pages/FileManager'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

// Payment
const Pay = lazy(() => import('./pages/Pay'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentCancelled = lazy(() => import('./pages/PaymentCancelled'));
const Donate = lazy(() => import('./pages/Donate'));

// Other
const GetStarted = lazy(() => import('./pages/GetStarted'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Component
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

// Simple Page Component for placeholders
function SimplePage({ title }: { title: string }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-brand-text-muted">Content coming soon.</p>
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
              {/* ============================================ */}
              {/* PUBLIC PAGES */}
              {/* ============================================ */}
              <Route path="/" element={<EFHLanding />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/thank-you" element={<ThankYou />} />
              
              {/* Legal */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/accessibility" element={<Accessibility />} />
              
              {/* Sitemap */}
              <Route path="/sitemap" element={<Sitemap />} />

              {/* ============================================ */}
              {/* PROGRAMS */}
              {/* ============================================ */}
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/apply" element={<SimplePage title="Apply Now" />} />

              {/* ============================================ */}
              {/* AUTHENTICATION */}
              {/* ============================================ */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* LMS - STUDENT PORTAL */}
              {/* ============================================ */}
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
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-handbook"
                element={
                  <ProtectedRoute>
                    <StudentHandbook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student-hub"
                element={
                  <ProtectedRoute>
                    <StudentHub />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* COURSES & LEARNING */}
              {/* ============================================ */}
              <Route
                path="/course-library"
                element={
                  <ProtectedRoute>
                    <CourseLibrary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course-catalog"
                element={
                  <ProtectedRoute>
                    <CourseCatalog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assignment/:assignmentId"
                element={
                  <ProtectedRoute>
                    <Assignment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/:quizId"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz/:quizId/results"
                element={
                  <ProtectedRoute>
                    <QuizResults />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* INSTRUCTOR PORTAL */}
              {/* ============================================ */}
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
              <Route
                path="/instructor/course/create"
                element={
                  <ProtectedRoute requireRole="instructor">
                    <InstructorCourseCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course-builder"
                element={
                  <ProtectedRoute requireRole="instructor">
                    <CourseBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz-builder"
                element={
                  <ProtectedRoute requireRole="instructor">
                    <QuizBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gradebook"
                element={
                  <ProtectedRoute requireRole="instructor">
                    <GradeBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/curriculum-upload"
                element={
                  <ProtectedRoute requireRole="instructor">
                    <CurriculumUpload />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* CERTIFICATES */}
              {/* ============================================ */}
              <Route
                path="/certificates"
                element={
                  <ProtectedRoute>
                    <MyCertificates />
                  </ProtectedRoute>
                }
              />
              <Route path="/certificate/:certificateId" element={<CertificatePage />} />
              <Route path="/verify" element={<VerifyCertificate />} />
              <Route path="/verify/:certNumber" element={<VerifyCertificate />} />

              {/* ============================================ */}
              {/* COMMUNITY & SOCIAL */}
              {/* ============================================ */}
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community-hub"
                element={
                  <ProtectedRoute>
                    <CommunityHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hub"
                element={
                  <ProtectedRoute>
                    <Hub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/groups"
                element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connect"
                element={
                  <ProtectedRoute>
                    <Connect />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* AI & ADVANCED FEATURES */}
              {/* ============================================ */}
              <Route
                path="/ai-tutor"
                element={
                  <ProtectedRoute>
                    <AITutor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/elevate-brain"
                element={
                  <ProtectedRoute>
                    <ElevateBrain />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notebook-lm"
                element={
                  <ProtectedRoute>
                    <NotebookLM />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* LIVE LEARNING */}
              {/* ============================================ */}
              <Route
                path="/live-classroom"
                element={
                  <ProtectedRoute>
                    <LiveClassRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/live-schedule"
                element={
                  <ProtectedRoute>
                    <LiveClassSchedule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/video-meeting/:meetingId"
                element={
                  <ProtectedRoute>
                    <VideoMeeting />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* ADMIN & MANAGEMENT */}
              {/* ============================================ */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/console"
                element={
                  <ProtectedRoute requireRole="admin">
                    <AdminConsole />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requireRole="admin">
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute requireRole="admin">
                    <AnalyticsDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/compliance"
                element={
                  <ProtectedRoute requireRole="admin">
                    <Compliance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/branding"
                element={
                  <ProtectedRoute requireRole="admin">
                    <Branding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/autopilot"
                element={
                  <ProtectedRoute requireRole="admin">
                    <AutopilotAdmin />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* RESOURCES & INFO */}
              {/* ============================================ */}
              <Route path="/funding-impact" element={<FundingImpact />} />
              <Route path="/government" element={<Government />} />
              <Route path="/philanthropy" element={<Philanthropy />} />
              <Route path="/business-hub" element={<BusinessHub />} />
              <Route path="/educator-hub" element={<EducatorHub />} />

              {/* ============================================ */}
              {/* UTILITIES */}
              {/* ============================================ */}
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notification-center"
                element={
                  <ProtectedRoute>
                    <NotificationCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/file-manager"
                element={
                  <ProtectedRoute>
                    <FileManager />
                  </ProtectedRoute>
                }
              />

              {/* ============================================ */}
              {/* PAYMENT & DONATIONS */}
              {/* ============================================ */}
              <Route path="/pay" element={<Pay />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancelled" element={<PaymentCancelled />} />
              <Route path="/donate" element={<Donate />} />

              {/* ============================================ */}
              {/* 404 NOT FOUND */}
              {/* ============================================ */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
