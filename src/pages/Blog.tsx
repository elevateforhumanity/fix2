export default function Blog() {
  const blogPosts = [
    {
      title:
        'Funding and Programs at Elevate for Humanity: A Comprehensive Guide',
      slug: 'funding-and-programs-at-elevate-for-humanity--a-comprehensive-guide',
      excerpt:
        'Learn about our funding opportunities and comprehensive training programs designed to elevate your career.',
    },
    {
      title:
        'How to Navigate Your Path to a Career in Healthcare with Apprenticeships',
      slug: 'how-to-navigate-your-path-to-a-career-in-healthcare-with-apprenticeships',
      excerpt:
        'Discover how apprenticeships can fast-track your healthcare career with hands-on training and industry connections.',
    },
    {
      title: 'Why Hybrid Apprenticeships Are the Future of Career Development',
      slug: 'why-hybrid-apprenticeships-are-the-future-of-career-development',
      excerpt:
        'Explore the benefits of hybrid learning models that combine online education with practical experience.',
    },
    {
      title:
        'Skincare and Beauty Training: A Comprehensive Guide to Becoming an Esthetician',
      slug: 'skincare-and-beauty-training--a-comprehensive-guide-to-becoming-an-esthetician',
      excerpt:
        'Start your journey in the beauty industry with our comprehensive esthetician training program.',
    },
    {
      title:
        'Becoming a Premier Childcare Provider in Indiana: A Step-by-Step Guide',
      slug: 'becoming-a-premier-childcare-provider-in-indiana--a-step-by-step-guide',
      excerpt:
        'Learn the requirements and steps to become a licensed childcare provider in Indiana.',
    },
    {
      title: 'Podcast Network Creation: A Path to Digital Entrepreneurship',
      slug: 'podcast-network-creation--a-path-to-digital-entrepreneurship',
      excerpt:
        'Discover how to build and monetize your own podcast network in the digital age.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12 px-4">
        <h1 className="text-4xl font-bold text-brown-900 mb-8">Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="card hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-brown-900 mb-3">
                {post.title}
              </h2>
              <p className="text-brown-600 mb-4">{post.excerpt}</p>
              <a
                href={`/blog/${post.slug}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
