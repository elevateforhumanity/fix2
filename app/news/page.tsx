import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News & Updates | Elevate for Humanity',
  description:
    'Latest news, program updates, success stories, and community impact from Elevate for Humanity.',
};

const newsArticles = [
  {
    id: 1,
    title: 'New Medical Assistant Program Launches January 2025',
    slug: 'medical-assistant-program-launch',
    excerpt:
      "We're excited to announce our newest program: Medical Assistant training. This 10-week program prepares students for careers in healthcare with 100% funding available.",
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-1.jpg',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-12-10',
    featured: true,
  },
  {
    id: 2,
    title: 'Celebrating 1,000 Graduates: A Major Milestone',
    slug: '1000-graduates-milestone',
    excerpt:
      "This month we celebrated our 1,000th graduate! Since opening, we've helped over 1,000 individuals launch new careers with an 87% employment rate.",
    content: 'Full article content here...',
    image: '/images/learners/reentry-coaching.jpg',
    category: 'Community Impact',
    author: 'Sarah Johnson',
    date: '2024-12-05',
    featured: true,
  },
  {
    id: 3,
    title: 'Partnership Announcement: Community Health Network',
    slug: 'community-health-partnership',
    excerpt:
      "We're proud to announce a new partnership with Community Health Network, creating direct hiring pathways for our CNA and Medical Assistant graduates.",
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-2.jpg',
    category: 'Partner Spotlights',
    author: 'Elevate Team',
    date: '2024-11-28',
    featured: false,
  },
  {
    id: 4,
    title: "Student Spotlight: Marcus Thompson's Journey",
    slug: 'marcus-thompson-success-story',
    excerpt:
      'From incarceration to career success: How Marcus transformed his life through our Public Safety & Reentry Specialist program and now helps others do the same.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-3.jpg',
    category: 'Success Stories',
    author: 'Maria Garcia',
    date: '2024-11-20',
    featured: false,
  },
  {
    id: 5,
    title: 'JRI Program Expansion: Serving More Justice-Involved Individuals',
    slug: 'jri-program-expansion',
    excerpt:
      "Thanks to increased funding, we're expanding our Justice Reinvestment Initiative programs to serve 50% more students in 2025.",
    content: 'Full article content here...',
    image: '/images/funding/funding-jri-program-v2.jpg',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-11-15',
    featured: false,
  },
  {
    id: 6,
    title: 'Hiring Event Success: 50 Jobs Filled in One Day',
    slug: 'hiring-event-november-2024',
    excerpt:
      'Our November hiring event connected 50 graduates with employers. Over 20 companies participated, offering positions in healthcare, transportation, and skilled trades.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-4.jpg',
    category: 'Community Impact',
    author: 'David Chen',
    date: '2024-11-10',
    featured: false,
  },
  {
    id: 7,
    title: 'New Funding Opportunities Available for 2025',
    slug: 'new-funding-2025',
    excerpt:
      'Additional WIOA and WRG funding secured for 2025, meaning more students can access 100% free training. Apply now to secure your spot.',
    content: 'Full article content here...',
    image: '/images/general/workforce-development.png',
    category: 'Program Updates',
    author: 'Elevate Team',
    date: '2024-11-01',
    featured: false,
  },
  {
    id: 8,
    title: 'CDL Program Achieves 95% Pass Rate',
    slug: 'cdl-program-success',
    excerpt:
      'Our CDL training program maintains a 95% first-time pass rate on state licensing exams, well above the national average of 70%.',
    content: 'Full article content here...',
    image: '/images/heroes/workforce-partner-5.jpg',
    category: 'Program Updates',
    author: 'Tom Williams',
    date: '2024-10-25',
    featured: false,
  },
  {
    id: 9,
    title: 'Community Impact Report: 2024 Year in Review',
    slug: 'community-impact-2024',
    excerpt:
      'Our 2024 impact: 1,200+ students served, 87% employment rate, $42K average starting salary, and 150+ employer partnerships.',
    content: 'Full article content here...',
    image: '/images/homepage/workforce-pathway-ecosystem.png',
    category: 'Community Impact',
    author: 'Elevate Team',
    date: '2024-10-15',
    featured: false,
  },
  {
    id: 10,
    title: 'Holiday Schedule & Upcoming Classes',
    slug: 'holiday-schedule-2024',
    excerpt:
      'Our holiday schedule and January 2025 class start dates. New cohorts starting in CNA, CDL, HVAC, and Medical Assistant programs.',
    content: 'Full article content here...',
    image: '/images/facilities-new/facility-1.jpg',
    category: 'Announcements',
    author: 'Elevate Team',
    date: '2024-10-10',
    featured: false,
  },
];

const categories = [
  'All',
  'Program Updates',
  'Success Stories',
  'Community Impact',
  'Partner Spotlights',
  'Announcements',
];

export default function NewsPage() {
  const featuredArticles = newsArticles.filter((article) => article.featured);
  const recentArticles = newsArticles.filter((article) => !article.featured);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Stay informed about program updates, success stories, and
              community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                  >
                    <div className="relative h-64">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition font-semibold text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for the latest news, program updates,
              and success stories.
            </p>
            <Link
              href="#newsletter"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
