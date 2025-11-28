import Link from "next/link";
import {
  MessageSquare,
  Trophy,
  TrendingUp,
  Sparkles,
  FileText,
  Users,
  Target,
  Flame,
  Award,
  BookOpen,
  BarChart3,
  Smartphone,
  Globe,
  Zap,
  CheckCircle,
  Star,
  Calendar,
  Download,
  Eye,
  Bell,
} from "lucide-react";

export const metadata = {
  title: "Platform Features | Elevate For Humanity",
  description: "Discover all the powerful features that make our learning platform world-class",
};

export default async function FeaturesPage() {
  const features = [
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description: "Connect with peers, ask questions, and share knowledge in our active community forums",
    link: "/community",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Trophy,
    title: "Points & Levels",
    description: "Earn points for every activity and level up as you progress through your learning journey",
    link: "/student/dashboard",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Award,
    title: "Badges & Achievements",
    description: "Unlock badges and achievements as you master new skills and complete milestones",
    link: "/student/achievements",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Leaderboards",
    description: "Compete with fellow learners and see where you rank on global and program leaderboards",
    link: "/leaderboard",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Flame,
    title: "Learning Streaks",
    description: "Build daily learning habits and maintain your streak to stay motivated",
    link: "/student/dashboard",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "Get AI-powered course recommendations based on your progress and interests",
    link: "/learning-paths",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Follow curated learning paths designed to take you from beginner to expert",
    link: "/learning-paths",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: CheckCircle,
    title: "Interactive Quizzes",
    description: "Test your knowledge with interactive quizzes featuring instant feedback and explanations",
    link: "/programs",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Users,
    title: "Peer Reviews",
    description: "Submit projects and receive constructive feedback from your peers",
    link: "/student/peer-reviews",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Join or create study groups to learn together with other students",
    link: "/study-groups",
    color: "text-lime-400",
    bgColor: "bg-lime-500/10",
  },
  {
    icon: Target,
    title: "Learning Goals",
    description: "Set daily, weekly, or monthly learning goals and track your progress",
    link: "/student/goals",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with our easy-to-use builder and templates",
    link: "/career/resume",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Eye,
    title: "Portfolio Builder",
    description: "Showcase your projects and skills with a beautiful online portfolio",
    link: "/career/portfolio",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Download,
    title: "Downloadable Resources",
    description: "Access PDFs, templates, checklists, and other resources for offline learning",
    link: "/programs",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Video Transcripts",
    description: "Read along with video transcripts in multiple languages for better accessibility",
    link: "/programs",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Download lessons for offline viewing and learn on-the-go with our mobile app",
    link: "/mobile",
    color: "text-fuchsia-400",
    bgColor: "bg-fuchsia-500/10",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning progress with detailed analytics and insights",
    link: "/student/analytics",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Get personalized reminders via email, SMS, or push notifications",
    link: "/student/settings",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Star,
    title: "Skill Assessments",
    description: "Take pre-tests to assess your skills and get placed in the right level",
    link: "/assessments",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate feedback on quizzes and exercises to learn faster",
    link: "/programs",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
];

return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              World-Class Learning Platform
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover all the powerful features designed to help you succeed in your learning journey
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-white mb-2">20+</p>
              <p className="text-sm text-slate-400">Premium Features</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-white mb-2">100%</p>
              <p className="text-sm text-slate-400">Free Access</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-white mb-2">24/7</p>
              <p className="text-sm text-slate-400">Available</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-white mb-2">Mobile</p>
              <p className="text-sm text-slate-400">Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.link}
                className="bg-slate-800 hover:bg-slate-750 rounded-lg p-6 transition-all hover:scale-[1.02] group"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 border-t border-orange-500">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of students already using these features to achieve their goals
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/programs"
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-colors"
            >
              Browse Programs
            </Link>
            <Link
              href="/apply"
              className="px-8 py-4 bg-orange-800 text-white rounded-lg font-bold hover:bg-orange-900 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
