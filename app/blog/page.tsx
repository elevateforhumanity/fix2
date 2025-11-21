import Link from 'next/link';

// ISR: Revalidate every 5 minutes to fetch fresh blog posts
export const revalidate = 300;

export const metadata = {
  title: 'Blog | Elevate for Humanity',
  description: 'Latest news, success stories, and workforce development insights from Elevate for Humanity',
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-blue-100">
            Latest insights on workforce development, career training, and success stories
          </p>
        </div>
      </section>

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.author && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                    <a
                      href={post.durableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Want to Share Your Story?
            </h3>
            <p className="text-gray-700 mb-6">
              If you're a graduate or partner with a success story to share, we'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
