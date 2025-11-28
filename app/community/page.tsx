import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { ForumList } from "@/components/forums/ForumList";
import { MessageSquare, Users, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Community Forums | Elevate For Humanity",
  description: "Connect with fellow learners, ask questions, and share knowledge",
};

export default async function CommunityPage() {
  let categories = [];
  let threadsWithAuthors = [];

  try {
    const supabase = getSupabaseServerClient();

    const { data: categoriesData } = await supabase
      .from("forum_categories")
      .select("*")
      .eq("is_active", true)
      .order("order_index");

    const { data: threads } = await supabase
      .from("forum_threads")
      .select(`
        id,
        title,
        content,
        user_id,
        reply_count,
        view_count,
        is_pinned,
        last_reply_at,
        created_at
      `)
      .order("is_pinned", { ascending: false })
      .order("last_reply_at", { ascending: false })
      .limit(20);

    categories = categoriesData || [];
    threadsWithAuthors = threads?.map(thread => ({
      ...thread,
      author_name: "Student",
    })) || [];
  } catch (error) {
    console.error("Error loading community data:", error);
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Community Forums
              </h1>
              <p className="text-xl text-slate-300">
                Connect, learn, and grow together
              </p>
            </div>
            <Link
              href="/community/new"
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Discussion
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-orange-400" />
                <span className="text-2xl font-bold text-white">
                  {threadsWithAuthors?.length || 0}
                </span>
              </div>
              <p className="text-slate-400">Active Discussions</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-2xl font-bold text-white">500+</span>
              </div>
              <p className="text-slate-400">Community Members</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="text-2xl font-bold text-white">95%</span>
              </div>
              <p className="text-slate-400">Questions Answered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/community/category/${category.id}`}
              className="bg-slate-800 hover:bg-slate-750 rounded-lg p-4 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">{category.name}</h3>
              <p className="text-sm text-slate-400">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* Thread List */}
        <ForumList threads={threadsWithAuthors} />
      </section>
    </main>
  );
}
