import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Success Stories & Updates | Elevate for Humanity',
  description:
    'Read success stories, program updates, and career insights from Elevate for Humanity students and partners.',
};

// Mock blog data - replace with real data from CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'From Unemployed to HVAC Technician: Marcus\'s Journey',
    excerpt:
      'After losing his job during the pandemic, Marcus enrolled in our HVAC program. Six months later, he\'s earning $55,000/year with full benefits.',
    image: '/images/blog/hvac-success.jpg',
    category: 'Success Story',
    date: 'December 15, 2024',
    author: 'Elevate Team',
    slug: 'marcus-hvac-journey',
  },
  {
    id: 2,
    title: 'New Partnership with Indiana Career Connect',
    excerpt:
      'We\'re excited to announce our expanded partnership with Indiana Career Connect, bringing more funding opportunities to students across Indianapolis.',
    image: '/images/blog/partnership.jpg',
    category: 'News',
    date: 'December 10, 2024',
    author: 'Elevate Team',
    slug: 'indiana-career-connect-partnership',
  },
  {
    id: 4,
    title: 'Understanding WIOA Funding: A Complete Guide',
    excerpt:
      'Learn how WIOA funding works, who qualifies, and how it can cover 100% of your training costs for in-demand careers.',
    image: '/images/blog/wioa-guide.jpg',
    category: 'Resource',
    date: 'November 28, 2024',
    author: 'Elevate Team',
    slug: 'wioa-funding-guide',
  },
  {
    id: 5,
    title: 'Meet Sarah: CNA to Nursing School',
    excerpt:
      'Sarah started as a CNA through our program. Now she\'s enrolled in nursing school while working full-time, with her employer covering tuition.',
    image: '/images/blog/sarah-cna.jpg',
    category: 'Success Story',
    date: 'November 20, 2024',
    author: 'Elevate Team',
    slug: 'sarah-cna-to-nursing',
  },
  {
    id: 6,
    title: 'Employer Spotlight: Local HVAC Company Hires 8 Graduates',
    excerpt:
      'Indianapolis-based HVAC company shares why they prefer hiring our graduates and how our training aligns with industry needs.',
    image: '/images/blog/employer-spotlight.jpg',
    category: 'Employer Story',
    date: 'November 15, 2024',
    author: 'Elevate Team',
    slug: 'hvac-employer-spotlight',
  },
];

const categories = [
  'All Posts',
  'Success Stories',
  'News',
  'Program Updates',
  'Resources',
  'Employer Stories',
];

export default function BlogPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-white/90">
              Success stories, program updates, and career insights from our students and partners.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    category === 'All Posts'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-orange-600 hover:text-orange-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-lg transition">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of students who have transformed their careers through our free training programs.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 hover:bg-slate-50 rounded-lg font-bold text-lg transition shadow-lg"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
