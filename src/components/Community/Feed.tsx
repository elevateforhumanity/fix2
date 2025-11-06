import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface FeedProps {
  courseId?: string;
}

export default function Feed({ courseId }: FeedProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('community')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'community_posts' },
        load
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseId]);

  async function load() {
    let query = supabase
      .from('community_posts')
      .select('id, content, created_at, profiles(full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data } = await query;
    setPosts(data || []);
  }

  async function submit() {
    if (loading) return;
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId || !text.trim()) {
      setLoading(false);
      return;
    }

    await supabase.from('community_posts').insert({
      user_id: userId,
      course_id: courseId || null,
      content: text.trim(),
    });

    setText('');
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a win, ask a question, or connect with fellow learners..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={submit}
            disabled={loading || !text.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              {p.profiles?.avatar_url ? (
                <img
                  src={p.profiles.avatar_url}
                  alt={p.profiles.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  {(p.profiles?.full_name || 'L')[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {p.profiles?.full_name || 'Learner'}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(p.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{p.content}</p>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
