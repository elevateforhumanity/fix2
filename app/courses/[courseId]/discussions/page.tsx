'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CourseDiscussionsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopic, setNewTopic] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewTopic, setShowNewTopic] = useState(false);

  useEffect(() => {
    loadData();
  }, [courseId]);

  async function loadData() {
    const supabase = createClient();
    
    // Load course
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();
    
    setCourse(courseData);

    // Load discussions
    const { data: discussionsData } = await supabase
      .from('course_discussions')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url
        ),
        replies:course_discussion_replies (
          count
        )
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    setDiscussions(discussionsData || []);
    setLoading(false);
  }

  async function createTopic() {
    if (!newTopic.trim() || !newMessage.trim()) return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('course_discussions').insert({
      course_id: courseId,
      user_id: user.id,
      title: newTopic,
      content: newMessage,
    });

    if (!error) {
      setNewTopic('');
      setNewMessage('');
      setShowNewTopic(false);
      loadData();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-gray-600">Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href={`/courses/${courseId}`} className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
                ← Back to Course
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
              <p className="text-gray-600 mt-1">Course Discussions</p>
            </div>
            <button
              onClick={() => setShowNewTopic(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + New Topic
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* New Topic Form */}
          {showNewTopic && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Start a New Discussion</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={createTopic}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Post Topic
                  </button>
                  <button
                    onClick={() => setShowNewTopic(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Discussions List */}
          {discussions.length > 0 ? (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  href={`/courses/${courseId}/discussions/${discussion.id}`}
                  className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {discussion.profiles?.full_name?.[0] || '?'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600">
                        {discussion.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {discussion.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{discussion.profiles?.full_name || 'Anonymous'}</span>
                        <span>•</span>
                        <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{discussion.replies?.length || 0} replies</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
              <p className="text-gray-600 mb-6">Be the first to start a discussion!</p>
              <button
                onClick={() => setShowNewTopic(true)}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
