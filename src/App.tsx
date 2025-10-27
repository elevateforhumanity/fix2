import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';

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

// Lazy load all 145 pages
const AITutor = lazy(() => import('./pages/AITutor'));
const About = lazy(() => import('./pages/About'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const AccessibilitySettings = lazy(
  () => import('./pages/AccessibilitySettings')
);
const Account = lazy(() => import('./pages/Account'));
const AdminConsole = lazy(() => import('./pages/AdminConsole'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const AnalyticsDashboardRUM = lazy(
  () => import('./pages/AnalyticsDashboardRUM')
);
const Assignment = lazy(() => import('./pages/Assignment'));
const AutopilotAdmin = lazy(() => import('./pages/AutopilotAdmin'));
const BingSiteVerification = lazy(() => import('./pages/BingSiteVerification'));
const Branding = lazy(() => import('./pages/Branding'));
const BusinessHub = lazy(() => import('./pages/BusinessHub'));
const Calendar = lazy(() => import('./pages/Calendar'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const Certificates = lazy(() => import('./pages/Certificates'));
const CloneLanding = lazy(() => import('./pages/CloneLanding'));
const Community = lazy(() => import('./pages/Community'));
const CommunityHub = lazy(() => import('./pages/CommunityHub'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Connect = lazy(() => import('./pages/Connect'));
const Course = lazy(() => import('./pages/Course'));
const CourseBuilder = lazy(() => import('./pages/CourseBuilder'));
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseLibrary = lazy(() => import('./pages/CourseLibrary'));
const CurriculumUpload = lazy(() => import('./pages/CurriculumUpload'));
const Docs = lazy(() => import('./pages/Docs'));
const Donate = lazy(() => import('./pages/Donate'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const DurableAI = lazy(() => import('./pages/DurableAI'));
const DurableFeatures = lazy(() => import('./pages/DurableFeatures'));
const DurableLanding = lazy(() => import('./pages/DurableLanding'));
const DurablePricing = lazy(() => import('./pages/DurablePricing'));
const DurableTemplates = lazy(() => import('./pages/DurableTemplates'));
const EFHLanding = lazy(() => import('./pages/EFHLanding'));
const Ecommerce = lazy(() => import('./pages/Ecommerce'));
const Ecosystem = lazy(() => import('./pages/Ecosystem'));
const EducatorHub = lazy(() => import('./pages/EducatorHub'));
const ElevateBrain = lazy(() => import('./pages/ElevateBrain'));
const Email = lazy(() => import('./pages/Email'));
const FileManager = lazy(() => import('./pages/FileManager'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Forms = lazy(() => import('./pages/Forms'));
const FullSailLanding = lazy(() => import('./pages/FullSailLanding'));
const FundingImpact = lazy(() => import('./pages/FundingImpact'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const GoogleAnalyticsSetup = lazy(() => import('./pages/GoogleAnalyticsSetup'));
const GoogleSiteVerification = lazy(
  () => import('./pages/GoogleSiteVerification')
);
const Government = lazy(() => import('./pages/Government'));
const GradeBook = lazy(() => import('./pages/GradeBook'));
const Groups = lazy(() => import('./pages/Groups'));
const Home = lazy(() => import('./pages/Home'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Hub = lazy(() => import('./pages/Hub'));
const Instructor = lazy(() => import('./pages/Instructor'));
const InstructorCourseCreate = lazy(
  () => import('./pages/InstructorCourseCreate')
);
const InstructorEdit = lazy(() => import('./pages/InstructorEdit'));
const InstructorNew = lazy(() => import('./pages/InstructorNew'));
const Integrations = lazy(() => import('./pages/Integrations'));
const KingdomKonnect = lazy(() => import('./pages/KingdomKonnect'));
const LMS = lazy(() => import('./pages/LMS'));
const LMSCourses = lazy(() => import('./pages/LMSCourses'));
const LMSDashboard = lazy(() => import('./pages/LMSDashboard'));
const LMSLanding = lazy(() => import('./pages/LMSLanding'));
const LiveClassRoom = lazy(() => import('./pages/LiveClassRoom'));
const LiveClassSchedule = lazy(() => import('./pages/LiveClassSchedule'));
const Login = lazy(() => import('./pages/Login'));
const MainLanding = lazy(() => import('./pages/MainLanding'));
const MobileApp = lazy(() => import('./pages/MobileApp'));
const MyCertificates = lazy(() => import('./pages/MyCertificates'));
const NotFound = lazy(() => import('./pages/NotFound'));
const NotebookLM = lazy(() => import('./pages/NotebookLM'));
const NotificationCenter = lazy(() => import('./pages/NotificationCenter'));
const NotificationSettings = lazy(() => import('./pages/NotificationSettings'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Partners = lazy(() => import('./pages/Partners'));
const Pay = lazy(() => import('./pages/Pay'));
const PaymentCancelled = lazy(() => import('./pages/PaymentCancelled'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const Philanthropy = lazy(() => import('./pages/Philanthropy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ProfessionalHome = lazy(() => import('./pages/ProfessionalHome'));
const ProfessionalSite = lazy(() => import('./pages/ProfessionalSite'));
const Profile = lazy(() => import('./pages/Profile'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramsDurable = lazy(() => import('./pages/ProgramsDurable'));
const ProgramsIndex = lazy(() => import('./pages/ProgramsIndex'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const Quiz = lazy(() => import('./pages/Quiz'));
const QuizBuilder = lazy(() => import('./pages/QuizBuilder'));
const QuizResults = lazy(() => import('./pages/QuizResults'));
const QuizTake = lazy(() => import('./pages/QuizTake'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const SereneComfortCare = lazy(() => import('./pages/SereneComfortCare'));
const Settings = lazy(() => import('./pages/Settings'));
const Sheets = lazy(() => import('./pages/Sheets'));
const Signup = lazy(() => import('./pages/Signup'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Sites = lazy(() => import('./pages/Sites'));
const Slides = lazy(() => import('./pages/Slides'));
const SocialMediaManager = lazy(() => import('./pages/SocialMediaManager'));
const Student = lazy(() => import('./pages/Student'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const StudentGrades = lazy(() => import('./pages/StudentGrades'));
const StudentHandbook = lazy(() => import('./pages/StudentHandbook'));
const StudentHub = lazy(() => import('./pages/StudentHub'));
const StudentPortalLMS = lazy(() => import('./pages/StudentPortalLMS'));
const Support = lazy(() => import('./pages/Support'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const UrbanBuildCrew = lazy(() => import('./pages/UrbanBuildCrew'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const VideoMeeting = lazy(() => import('./pages/VideoMeeting'));
const Vids = lazy(() => import('./pages/Vids'));
const auth_Account = lazy(() => import('./pages/auth/Account'));
const auth_ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const auth_Login = lazy(() => import('./pages/auth/Login'));
const auth_Signup = lazy(() => import('./pages/auth/Signup'));
const instructor_CourseEditor = lazy(
  () => import('./pages/instructor/CourseEditor')
);
const instructor_InstructorDashboard = lazy(
  () => import('./pages/instructor/InstructorDashboard')
);
const instructor_LessonManager = lazy(
  () => import('./pages/instructor/LessonManager')
);
const lms_CoursePage = lazy(() => import('./pages/lms/CoursePage'));
const lms_CoursesIndex = lazy(() => import('./pages/lms/CoursesIndex'));
const lms_Dashboard = lazy(() => import('./pages/lms/Dashboard'));
const lms_LessonPage = lazy(() => import('./pages/lms/LessonPage'));
const lms_QuizBlock = lazy(() => import('./pages/lms/QuizBlock'));
const sisters_MentorDirectory = lazy(
  () => import('./pages/sisters/MentorDirectory')
);
const sisters_MentorSignup = lazy(() => import('./pages/sisters/MentorSignup'));
const sisters_Mentorship = lazy(() => import('./pages/sisters/Mentorship'));
const sisters_PeerSupport = lazy(() => import('./pages/sisters/PeerSupport'));
const sisters_Volunteer = lazy(() => import('./pages/sisters/Volunteer'));
const sisters_VolunteerOpportunities = lazy(
  () => import('./pages/sisters/VolunteerOpportunities')
);
const sisters_VolunteerStories = lazy(
  () => import('./pages/sisters/VolunteerStories')
);
const sisters_Wellness = lazy(() => import('./pages/sisters/Wellness'));
const sisters_WellnessResources = lazy(
  () => import('./pages/sisters/WellnessResources')
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SiteLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<EFHLanding />} />
              {/* All 145 Pages */}
              <Route path="/aitutor" element={<AITutor />} />
              <Route path="/about" element={<About />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route
                path="/accessibilitysettings"
                element={<AccessibilitySettings />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/adminconsole" element={<AdminConsole />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route
                path="/analyticsdashboard"
                element={<AnalyticsDashboard />}
              />
              <Route
                path="/analyticsdashboardrum"
                element={<AnalyticsDashboardRUM />}
              />
              <Route path="/assignment" element={<Assignment />} />
              <Route path="/autopilotadmin" element={<AutopilotAdmin />} />
              <Route
                path="/bingsiteverification"
                element={<BingSiteVerification />}
              />
              <Route path="/branding" element={<Branding />} />
              <Route path="/businesshub" element={<BusinessHub />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/certificatepage" element={<CertificatePage />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/clonelanding" element={<CloneLanding />} />
              <Route path="/community" element={<Community />} />
              <Route path="/communityhub" element={<CommunityHub />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/course" element={<Course />} />
              <Route path="/coursebuilder" element={<CourseBuilder />} />
              <Route path="/coursecatalog" element={<CourseCatalog />} />
              <Route path="/coursedetail" element={<CourseDetail />} />
              <Route path="/courselibrary" element={<CourseLibrary />} />
              <Route path="/curriculumupload" element={<CurriculumUpload />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donatepage" element={<DonatePage />} />
              <Route path="/durableai" element={<DurableAI />} />
              <Route path="/durablefeatures" element={<DurableFeatures />} />
              <Route path="/durablelanding" element={<DurableLanding />} />
              <Route path="/durablepricing" element={<DurablePricing />} />
              <Route path="/durabletemplates" element={<DurableTemplates />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              <Route path="/educatorhub" element={<EducatorHub />} />
              <Route path="/elevatebrain" element={<ElevateBrain />} />
              <Route path="/email" element={<Email />} />
              <Route path="/filemanager" element={<FileManager />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/fullsaillanding" element={<FullSailLanding />} />
              <Route path="/fundingimpact" element={<FundingImpact />} />
              <Route path="/getstarted" element={<GetStarted />} />
              <Route
                path="/googleanalyticssetup"
                element={<GoogleAnalyticsSetup />}
              />
              <Route
                path="/googlesiteverification"
                element={<GoogleSiteVerification />}
              />
              <Route path="/government" element={<Government />} />
              <Route path="/gradebook" element={<GradeBook />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/home" element={<Home />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/instructor" element={<Instructor />} />
              <Route
                path="/instructorcoursecreate"
                element={<InstructorCourseCreate />}
              />
              <Route path="/instructoredit" element={<InstructorEdit />} />
              <Route path="/instructornew" element={<InstructorNew />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/kingdomkonnect" element={<KingdomKonnect />} />
              <Route path="/lms" element={<LMS />} />
              <Route path="/lmscourses" element={<LMSCourses />} />
              <Route path="/lmsdashboard" element={<LMSDashboard />} />
              <Route path="/lmslanding" element={<LMSLanding />} />
              <Route path="/liveclassroom" element={<LiveClassRoom />} />
              <Route
                path="/liveclassschedule"
                element={<LiveClassSchedule />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/mainlanding" element={<MainLanding />} />
              <Route path="/mobileapp" element={<MobileApp />} />
              <Route path="/mycertificates" element={<MyCertificates />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/notebooklm" element={<NotebookLM />} />
              <Route
                path="/notificationcenter"
                element={<NotificationCenter />}
              />
              <Route
                path="/notificationsettings"
                element={<NotificationSettings />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/pay" element={<Pay />} />
              <Route path="/paymentcancelled" element={<PaymentCancelled />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/philanthropy" element={<Philanthropy />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/professionalhome" element={<ProfessionalHome />} />
              <Route path="/professionalsite" element={<ProfessionalSite />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/programdetail" element={<ProgramDetail />} />
              <Route path="/programpage" element={<ProgramPage />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programsdurable" element={<ProgramsDurable />} />
              <Route path="/programsindex" element={<ProgramsIndex />} />
              <Route path="/programspage" element={<ProgramsPage />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quizbuilder" element={<QuizBuilder />} />
              <Route path="/quizresults" element={<QuizResults />} />
              <Route path="/quiztake" element={<QuizTake />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/searchresults" element={<SearchResults />} />
              <Route
                path="/serenecomfortcare"
                element={<SereneComfortCare />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/sheets" element={<Sheets />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/slides" element={<Slides />} />
              <Route
                path="/socialmediamanager"
                element={<SocialMediaManager />}
              />
              <Route path="/student" element={<Student />} />
              <Route path="/studentdashboard" element={<StudentDashboard />} />
              <Route path="/studentgrades" element={<StudentGrades />} />
              <Route path="/studenthandbook" element={<StudentHandbook />} />
              <Route path="/studenthub" element={<StudentHub />} />
              <Route path="/studentportallms" element={<StudentPortalLMS />} />
              <Route path="/support" element={<Support />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/testpage" element={<TestPage />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/urbanbuildcrew" element={<UrbanBuildCrew />} />
              <Route path="/usermanagement" element={<UserManagement />} />
              <Route
                path="/verifycertificate"
                element={<VerifyCertificate />}
              />
              <Route path="/verifyemail" element={<VerifyEmail />} />
              <Route path="/videomeeting" element={<VideoMeeting />} />
              <Route path="/vids" element={<Vids />} />
              <Route path="/auth/account" element={<auth_Account />} />
              <Route
                path="/auth/forgotpassword"
                element={<auth_ForgotPassword />}
              />
              <Route path="/auth/login" element={<auth_Login />} />
              <Route path="/auth/signup" element={<auth_Signup />} />
              <Route
                path="/instructor/courseeditor"
                element={<instructor_CourseEditor />}
              />
              <Route
                path="/instructor/instructordashboard"
                element={<instructor_InstructorDashboard />}
              />
              <Route
                path="/instructor/lessonmanager"
                element={<instructor_LessonManager />}
              />
              <Route path="/lms/coursepage" element={<lms_CoursePage />} />
              <Route path="/lms/coursesindex" element={<lms_CoursesIndex />} />
              <Route path="/lms/dashboard" element={<lms_Dashboard />} />
              <Route path="/lms/lessonpage" element={<lms_LessonPage />} />
              <Route path="/lms/quizblock" element={<lms_QuizBlock />} />
              <Route
                path="/sisters/mentordirectory"
                element={<sisters_MentorDirectory />}
              />
              <Route
                path="/sisters/mentorsignup"
                element={<sisters_MentorSignup />}
              />
              <Route
                path="/sisters/mentorship"
                element={<sisters_Mentorship />}
              />
              <Route
                path="/sisters/peersupport"
                element={<sisters_PeerSupport />}
              />
              <Route
                path="/sisters/volunteer"
                element={<sisters_Volunteer />}
              />
              <Route
                path="/sisters/volunteeropportunities"
                element={<sisters_VolunteerOpportunities />}
              />
              <Route
                path="/sisters/volunteerstories"
                element={<sisters_VolunteerStories />}
              />
              <Route path="/sisters/wellness" element={<sisters_Wellness />} />
              <Route
                path="/sisters/wellnessresources"
                element={<sisters_WellnessResources />}
              />
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
