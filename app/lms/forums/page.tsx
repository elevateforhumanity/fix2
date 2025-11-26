'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Pin, Lock, Eye, ThumbsUp, Clock } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

interface Forum {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  is_locked: boolean;
  post_count: number;
  last_post_at: Date | null;
}

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadForums();
  }, []);

  async function loadForums() {
    try {
      setLoading(true);
      setError(null);

      // Get user's enrolled courses
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Please log in to view forums');
        return;
      }

      // Get forums from enrolled courses
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      if (!enrollments || enrollments.length === 0) {
        setForums([]);
        return;
      }

      const courseIds = enrollments.map(e => e.course_id);

      // Get forums
      const { data: forumsData, error: forumsError } = await supabase
        .from('forums')
        .select(`
          id,
          course_id,
          title,
          description,
          order_index,
          is_locked,
          courses (
            title
          )
        `)
        .in('course_id', courseIds)
        .order('order_index');

      if (forumsError) throw forumsError;

      // Get post counts for each forum
      const forumsWithCounts = await Promise.all(
        (forumsData || []).map(async (forum) => {
          const { count } = await supabase
            .from('forum_posts')
            .select('*', { count: 'exact', head: true })
            .eq('forum_id', forum.id)
            .is('parent_id', null);

          const { data: lastPost } = await supabase
            .from('forum_posts')
            .select('created_at')
            .eq('forum_id', forum.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...forum,
            post_count: count || 0,
            last_post_at: lastPost?.created_at ? new Date(lastPost.created_at) : null
          };
        })
      );

      setForums(forumsWithCounts);
    } catch (err: any) {
      console.error('Error loading forums:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading forums...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discussion Forums</h1>
          <p className="text-slate-600">
            Connect with instructors and fellow students
          </p>
        </div>

        {/* Forums List */}
        {forums.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Forums Available
            </h3>
            <p className="text-slate-600">
              Enroll in a course to access discussion forums
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {forums.map((forum) => (
              <Link
                key={forum.id}
                href={`/lms/forums/${forum.id}`}
                className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-emerald-500 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        {forum.title}
                      </h3>
                      {forum.is_locked && (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {forum.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {forum.post_count} {forum.post_count === 1 ? 'post' : 'posts'}
                      </span>
                      {forum.last_post_at && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last post {formatRelativeTime(forum.last_post_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
