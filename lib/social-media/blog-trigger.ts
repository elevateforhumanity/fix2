/**
 * Blog to Social Media Auto-Post Trigger
 * Automatically posts to social media when blog is published
 */

export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  image?: string;
}

export async function triggerSocialPost(blog: BlogPost): Promise<void> {
  const platforms = ['linkedin', 'facebook', 'youtube'];
  
  for (const platform of platforms) {
    const content = formatPostForPlatform(blog, platform);
    
    await fetch('/api/social-media/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform,
        title: blog.title,
        content,
        media_url: blog.image,
      }),
    });
  }
}

function formatPostForPlatform(blog: BlogPost, platform: string): string {
  const base = `${blog.title}\n\n${blog.excerpt}\n\nRead more: ${blog.url}`;
  
  switch (platform) {
    case 'linkedin':
      return `${base}\n\n#CareerTraining #WorkforceDevelopment #FreeTraining`;
    case 'facebook':
      return `${base}\n\n🎓 Free training available!`;
    case 'youtube':
      return base;
    default:
      return base;
  }
}
