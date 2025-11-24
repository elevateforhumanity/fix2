import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

// ISR: Revalidate every 5 minutes to fetch fresh blog posts
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog | Elevate for Humanity',
  description: 'Latest news, success stories, and workforce development insights from Elevate for Humanity. Learn about career training, funding programs, and student success.',
  keywords: ['workforce development', 'career training blog', 'student success stories', 'healthcare careers', 'training programs'],
};

// Fetch blog posts from Durable
async function getBlogPosts() {
  try {
    // Fetch from Durable blog RSS/API
    // Replace with your actual Durable blog URL
    const durableUrl = process.env.DURABLE_BLOG_URL || 'https://elevateforhumanity.durable.co/blog';
    
    // For now, return the actual blog posts from your Durable site
    // In production, you'd fetch this via RSS or Durable API
    return [
      {
        id: 1,
        title: 'Funding and Programs at Elevate for Humanity: A Comprehensive Guide',
        excerpt: 'Learn about WIOA, WRG, JRI, and DOL funding programs that make career training 100% free...',
        date: '2024-10-21',
        slug: 'funding-programs-comprehensive-guide',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/funding-programs-comprehensive-guide`,
      },
      {
        id: 2,
        title: 'Why Hybrid Apprenticeships Are the Future of Career Development',
        excerpt: 'Discover how hybrid apprenticeships combine hands-on training with online learning...',
        date: '2024-05-13',
        slug: 'hybrid-apprenticeships-future',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/hybrid-apprenticeships-future`,
      },
      {
        id: 3,
        title: 'Skincare and Beauty Training: A Comprehensive Guide to Becoming an Esthetician',
        excerpt: 'Everything you need to know about starting your career in esthetics and skincare...',
        date: '2024-05-10',
        slug: 'esthetician-training-guide',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/esthetician-training-guide`,
      },
      {
        id: 4,
        title: 'Becoming a Premier Childcare Provider in Indiana: A Step-by-Step Guide',
        excerpt: 'Learn the requirements and steps to become a licensed childcare provider in Indiana...',
        date: '2024-05-07',
        slug: 'childcare-provider-indiana-guide',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/childcare-provider-indiana-guide`,
      },
      {
        id: 5,
        title: 'Podcast Network Creation: A Path to Digital Entrepreneurship',
        excerpt: 'Explore how creating a podcast network can launch your digital entrepreneurship journey...',
        date: '2024-05-04',
        slug: 'podcast-network-entrepreneurship',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/podcast-network-entrepreneurship`,
      },
      {
        id: 6,
        title: 'Real-World Experience in Healthcare: What to Expect from Our Programs',
        excerpt: 'Get an inside look at hands-on healthcare training and clinical rotations...',
        date: '2024-05-01',
        slug: 'healthcare-real-world-experience',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/healthcare-real-world-experience`,
      },
      {
        id: 7,
        title: 'Building a Sustainable Business: Key Practices for Success',
        excerpt: 'Essential strategies for building and maintaining a sustainable business...',
        date: '2024-04-28',
        slug: 'sustainable-business-practices',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/sustainable-business-practices`,
      },
      {
        id: 8,
        title: 'The Role of Co-Working Spaces in Career Development and Networking',
        excerpt: 'How co-working spaces facilitate professional growth and networking opportunities...',
        date: '2024-04-25',
        slug: 'coworking-spaces-career-development',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/coworking-spaces-career-development`,
      },
      {
        id: 9,
        title: 'Networking and Growth: Advantages of Co-Working Spaces',
        excerpt: 'Discover the networking benefits and growth opportunities in co-working environments...',
        date: '2024-04-22',
        slug: 'coworking-networking-advantages',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/coworking-networking-advantages`,
      },
      {
        id: 10,
        title: 'Top Hybrid Apprenticeship Programs in the USA: What Sets Us Apart',
        excerpt: 'Learn what makes Elevate for Humanity\'s hybrid apprenticeship programs unique...',
        date: '2024-04-19',
        slug: 'top-hybrid-apprenticeship-programs',
        author: 'Elizabeth Greene',
        durableUrl: `${durableUrl}/top-hybrid-apprenticeship-programs`,
      },
    ];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
              <BookOpen size={16} />
              <span>Latest Updates</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Blog & Success Stories
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Latest insights on workforce development, career training, funding programs, and inspiring success stories from our students.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-600">No blog posts available at this time.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all"
                >
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <time>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      {post.author && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>

                    {/* Read More Link */}
                    <a
                      href={post.durableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Read Full Article
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Want to Share Your Story?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            If you're a graduate or partner with a success story to share, we'd love to hear from you and feature your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-all"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
