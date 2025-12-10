import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { fetchDurableBlogPosts, getDurableBlogPostUrl } from '@/lib/durable-blog';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/blog",
  },
  title: 'Blog | Elevate For Humanity',
  description: 'Latest news, success stories, and workforce development insights from Elevate For Humanity.',
};

export const dynamic = 'force-dynamic'; // Uses cookies, can't be static
export const revalidate = 300; // Revalidate every 5 minutes

async function getDurableBlogPosts() {
  try {
    // Fetch from Durable blog via RSS feed or API
    return await fetchDurableBlogPosts();
  } catch (error) {
    console.error('Error fetching Durable blog posts:', error);
    return [];
  }
}

async function getBlogPosts() {
  try {
    
    const { data: supabasePosts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(12);
    
    // Fetch from Durable blog
    const durablePosts = await getDurableBlogPosts();
    
    // Combine both sources
    const allPosts = [
      ...(supabasePosts || []),
      ...durablePosts
    ];
    
    // Sort by date
    return allPosts.sort((a, b) => 
      new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getSocialPosts() {
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from('social_media_posts')
      .select('*')
      .order('posted_at', { ascending: false })
      .limit(6);
    return posts || [];
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return [];
  }
}

export default async function Page() {
  const blogPosts = await getBlogPosts();
  const socialPosts = await getSocialPosts();

  return (
    <main className="bg-white">
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/media-backup-20251128-043832/hero/hero-blog-post-7.jpg"
          alt="Blog and news"
          fill
          className="object-cover brightness-75"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0     z-[1]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
              News & Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg mb-8">
              Stay updated with the latest workforce development news, student success stories, and career insights
            </p>
            
            {/* Hero Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all shadow-2xl text-lg"
              >
                Apply Now - It's Free
              </Link>
              <a 
                href="https://elevateforhumanity.durable.co/blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg"
              >
                Visit Our Blog →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-center">Latest Articles</h2>
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: any) => {
                // Determine if post is from Durable or Supabase
                const isDurable = post.source === 'durable';
                const postUrl = isDurable ? getDurableBlogPostUrl(post.slug) : `/blog/${post.slug}`;
                const LinkComponent = isDurable ? 'a' : Link;
                const linkProps = isDurable ? { 
                  href: postUrl, 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                } : { 
                  href: postUrl 
                };

                return (
                  <LinkComponent key={post.id} {...linkProps} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                    {post.featured_image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={post.featured_image} alt={post.title} fill
className="object-cover group-hover:scale-110 transition-transform duration-300" quality={100} sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {post.category && <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">{post.category}</span>}
                        {isDurable && <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">External</span>}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{post.title}</h3>
                      {post.excerpt && <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>}
                    </div>
                  </LinkComponent>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">More Content Available</h3>
              <p className="text-xl text-slate-600 mb-8">Read the latest workforce development insights, success stories, and career tips.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://elevateforhumanity.durable.co/blog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg"
                >
                  Visit Our Blog →
                </a>
                <Link href="/success-stories" className="inline-block px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg">
                  Success Stories
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-6">
                Blog posts from both our platform and Durable will appear here
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4 text-center">Follow Us on Social Media</h2>
          <p className="text-xl text-slate-600 text-center mb-12">Stay connected with our community</p>
          {socialPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialPosts.map((post: any) => (
                <a key={post.id} href={post.post_url || '#'} target="_blank"
rel="noopener noreferrer" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10    rounded-full flex items-center justify-center text-white font-bold">{post.platform.charAt(0).toUpperCase()}</div>
                    <div><div className="font-semibold capitalize">{post.platform}</div><div className="text-sm text-slate-500">{new Date(post.posted_at).toLocaleDateString()}</div></div>
                  </div>
                  {post.image_url && <div className="relative h-48 rounded-lg overflow-hidden mb-4"><Image src={post.image_url} alt="Social post" fill
className="object-cover" quality={100} sizes="(max-width: 768px) 100vw, 33vw" /></div>}
                  <p className="text-slate-700 mb-4 line-clamp-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500"><span>❤️ {post.likes}</span><span>💬 {post.comments}</span></div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 mb-6">Connect with us on social media!</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://www.facebook.com/elevateforhumanity" target="_blank" rel="noopener noreferrer"
className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all">Facebook</a>
                <a href="https://www.instagram.com/elevateforhumanity" target="_blank" rel="noopener noreferrer"
className="px-6 py-3    text-white font-semibold rounded-full hover: hover: transition-all">Instagram</a>
                <a href="https://www.linkedin.com/company/elevate-for-humanity" target="_blank" rel="noopener noreferrer"
className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-all">LinkedIn</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Start Your Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands who transformed their lives through free workforce training.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-10 py-5 bg-white text-orange-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg">Apply Now - It's Free</Link>
            <Link href="/programs" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg">View Programs</Link>
          </div>
          <p className="text-white/80 mt-8 text-sm">Questions? Call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> or email <a href="mailto:info@elevateforhumanity.org" className="underline font-semibold">info@elevateforhumanity.org</a></p>
        </div>
      </section>
    </main>
  );
}
