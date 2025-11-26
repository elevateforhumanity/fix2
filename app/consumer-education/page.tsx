// Consumer Education Marketplace
import Link from 'next/link';
import { ShoppingCart, DollarSign, CreditCard, TrendingUp, Shield, BookOpen, Award, Users } from 'lucide-react';

export const metadata = {
  title: 'Consumer Education | Elevate For Humanity',
  description: 'Learn essential financial literacy and consumer skills',
,
  openGraph: {
    images: ["/images/students-new/student-10.jpg"],
    type: "website",
  }};

export default function ConsumerEducationPage() {
  const courses = [
    {
      title: 'Financial Literacy Basics',
      description: 'Master budgeting, saving, and money management',
      duration: '4 weeks',
      level: 'Beginner',
      students: 1247,
      rating: 4.8,
      topics: ['Budgeting', 'Saving', 'Banking', 'Credit'],
      icon: '💰',
    },
    {
      title: 'Credit & Debt Management',
      description: 'Build credit, manage debt, and improve your credit score',
      duration: '3 weeks',
      level: 'Beginner',
      students: 892,
      rating: 4.7,
      topics: ['Credit Scores', 'Debt Reduction', 'Credit Cards', 'Loans'],
      icon: '💳',
    },
    {
      title: 'Smart Shopping & Consumer Rights',
      description: 'Make informed purchases and know your consumer rights',
      duration: '2 weeks',
      level: 'Beginner',
      students: 654,
      rating: 4.6,
      topics: ['Comparison Shopping', 'Consumer Protection', 'Returns', 'Warranties'],
      icon: '🛒',
    },
    {
      title: 'Investment Basics',
      description: 'Introduction to stocks, bonds, and retirement planning',
      duration: '6 weeks',
      level: 'Intermediate',
      students: 1089,
      rating: 4.9,
      topics: ['Stocks', 'Bonds', '401k', 'IRA', 'Diversification'],
      icon: '📈',
    },
    {
      title: 'Home Buying 101',
      description: 'Navigate the home buying process with confidence',
      duration: '4 weeks',
      level: 'Intermediate',
      students: 567,
      rating: 4.8,
      topics: ['Mortgages', 'Down Payments', 'Home Inspection', 'Closing'],
      icon: '🏠',
    },
    {
      title: 'Identity Theft Protection',
      description: 'Protect yourself from fraud and identity theft',
      duration: '2 weeks',
      level: 'Beginner',
      students: 423,
      rating: 4.7,
      topics: ['Online Security', 'Fraud Prevention', 'Credit Monitoring', 'Recovery'],
      icon: '🔒',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-semibold">Consumer Education</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Master Your Money & Consumer Skills
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Free courses on financial literacy, smart shopping, credit management, and consumer rights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#courses" className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition">
                Browse Courses
              </Link>
              <Link href="/apply" className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold hover:bg-green-400 transition border-2 border-white">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">6</div>
              <div className="text-sm text-slate-600">Courses Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4,872</div>
              <div className="text-sm text-slate-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">4.8★</div>
              <div className="text-sm text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Consumer Education */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Consumer Education Matters</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Build financial confidence and make informed decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Save Money</h3>
              <p className="text-slate-600">
                Learn to budget effectively, avoid unnecessary fees, and make smart purchasing decisions
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Protect Yourself</h3>
              <p className="text-slate-600">
                Understand your rights, avoid scams, and protect yourself from identity theft
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Build Wealth</h3>
              <p className="text-slate-600">
                Start investing, plan for retirement, and create long-term financial security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Courses</h2>
            <p className="text-lg text-slate-600">All courses are 100% free and self-paced</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="text-4xl mb-4">{course.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-slate-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/consumer-education/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-center"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of students learning essential money management skills
          </p>
          <Link 
            href="/apply"
            className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition"
          >
            Enroll in Consumer Education
          </Link>
        </div>
      </section>
    </div>
  );
}
