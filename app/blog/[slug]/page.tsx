import { notFound } from "next/navigation";
import { blogPosts } from "../../../lms-data/blogPosts";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return {
    title: post
      ? `${post.title} | Elevate Stories`
      : "Elevate Stories | Elevate for Humanity",
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const date = new Date(post.publishedDate).toLocaleDateString();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Stories &amp; Updates
          </p>
          <h1 className="mt-2 text-2xl font-bold">{post.title}</h1>
          <p className="mt-2 text-[10px] text-slate-400">
            {date} • {post.category}
          </p>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-6 text-[11px]">
          <article className="prose prose-invert max-w-none text-[11px]">
            {post.body.split("\n").map((para, idx) => {
              const trimmed = para.trim();
              if (!trimmed) return null;
              return (
                <p key={idx} className="mb-3">
                  {trimmed}
                </p>
              );
            })}
          </article>
        </div>
      </section>
    </main>
  );
}
