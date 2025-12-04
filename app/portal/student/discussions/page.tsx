`import { Metadata } from 'next';
`import { createClient } from '@/lib/supabase/server';
`import { redirect } from 'next/navigation';
`import { MessageSquare, ThumbsUp, MessageCircle, Plus, Search, TrendingUp, Clock } from 'lucide-react';
`
`export const metadata: Metadata = {
`  title: 'Discussions | Student Portal',
`};
`
`export default async function DiscussionsPage() {
`  const supabase = await createClient();
`  const { data: { user } } = await supabase.auth.getUser();
`  if (!user) redirect('/login');
`
`  const { data: threads } = await supabase
`    .from('discussion_threads')
`    .select(`
`      *,
`      author:profiles!discussion_threads_author_id_fkey(full_name),
`      replies:discussion_replies(count)
`    `)
`    .order('created_at', { ascending: false })
`    .limit(20);
`
`  const { data: myThreads } = await supabase
`    .from('discussion_threads')
`    .select('*')
`    .eq('author_id', user.id);
`
`  const totalThreads = threads?.length || 0;
`  const myThreadsCount = myThreads?.length || 0;
`  const totalReplies = threads?.reduce((sum, t) => sum + (t.replies?.[0]?.count || 0), 0) || 0;
`
`  return (
`    <div className="min-h-screen bg-gray-50">
`      <div className="container mx-auto px-4 py-8">
`        <div className="flex items-center justify-between mb-6">
`          <div>
`            <h1 className="text-3xl font-bold">Discussions</h1>
`            <p className="text-gray-600 mt-1">Join the conversation with fellow students</p>
`          </div>
`          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
`            <Plus size={20} />
`            New Thread
`          </button>
`        </div>
`
`        <div className="grid md:grid-cols-4 gap-6 mb-8">
`          <div className="bg-white p-6 rounded-lg shadow">
`            <MessageSquare className="text-blue-600 mb-3" size={32} />
`            <p className="text-2xl font-bold">{totalThreads}</p>
`            <p className="text-sm text-gray-600">Total Threads</p>
`          </div>
`          <div className="bg-white p-6 rounded-lg shadow">
`            <MessageCircle className="text-green-600 mb-3" size={32} />
`            <p className="text-2xl font-bold">{totalReplies}</p>
`            <p className="text-sm text-gray-600">Total Replies</p>
`          </div>
`          <div className="bg-white p-6 rounded-lg shadow">
`            <TrendingUp className="text-purple-600 mb-3" size={32} />
`            <p className="text-2xl font-bold">{myThreadsCount}</p>
`            <p className="text-sm text-gray-600">My Threads</p>
`          </div>
`          <div className="bg-white p-6 rounded-lg shadow">
`            <ThumbsUp className="text-orange-600 mb-3" size={32} />
`            <p className="text-2xl font-bold">0</p>
`            <p className="text-sm text-gray-600">Upvotes Received</p>
`          </div>
`        </div>
`
`        <div className="grid lg:grid-cols-4 gap-6">
`          <div className="lg:col-span-3">
`            <div className="bg-white rounded-lg shadow mb-4">
`              <div className="p-4 border-b flex items-center gap-3">
`                <Search className="text-gray-400" size={20} />
`                <input
`                  type="text"
`                  placeholder="Search discussions..."
`                  className="flex-1 outline-none"
`                />
`              </div>
`            </div>
`
`            <div className="bg-white rounded-lg shadow">
`              <div className="p-6 border-b">
`                <h2 className="text-xl font-semibold">Recent Discussions</h2>
`              </div>
`              <div className="divide-y">
`                {threads && threads.length > 0 ? (
`                  threads.map((thread: any) => (
`                    <div key={thread.id} className="p-6 hover:bg-gray-50 transition cursor-pointer">
`                      <div className="flex gap-4">
`                        <div className="flex-shrink-0">
`                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
`                            <MessageSquare size={24} className="text-white" />
`                          </div>
`                        </div>
`                        <div className="flex-1 min-w-0">
`                          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">
`                            {thread.title}
`                          </h3>
`                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
`                            {thread.content}
`                          </p>
`                          <div className="flex items-center gap-4 text-sm text-gray-500">
`                            <span className="flex items-center gap-1">
`                              <MessageCircle size={16} />
`                              {thread.replies?.[0]?.count || 0} replies
`                            </span>
`                            <span className="flex items-center gap-1">
`                              <ThumbsUp size={16} />
`                              {thread.upvotes || 0} upvotes
`                            </span>
`                            <span className="flex items-center gap-1">
`                              <Clock size={16} />
`                              {new Date(thread.created_at).toLocaleDateString()}
`                            </span>
`                            <span>by {thread.author?.full_name || 'Anonymous'}</span>
`                          </div>
`                        </div>
`                      </div>
`                    </div>
`                  ))
`                ) : (
`                  <div className="p-12 text-center">
`                    <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
`                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
`                    <p className="text-gray-600 mb-4">Be the first to start a conversation!</p>
`                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
`                      Start Discussion
`                    </button>
`                  </div>
`                )}
`              </div>
`            </div>
`          </div>
`
`          <div className="lg:col-span-1">
`            <div className="bg-white rounded-lg shadow p-6 mb-6">
`              <h3 className="font-semibold mb-4">Categories</h3>
`              <div className="space-y-2">
`                <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
`                  All Discussions
`                </button>
`                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
`                  General
`                </button>
`                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
`                  Course Help
`                </button>
`                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
`                  Study Tips
`                </button>
`                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
`                  Career Advice
`                </button>
`              </div>
`            </div>
`
`            <div className="bg-white rounded-lg shadow p-6">
`              <h3 className="font-semibold mb-4">Discussion Guidelines</h3>
`              <ul className="space-y-2 text-sm text-gray-600">
`                <li>• Be respectful and courteous</li>
`                <li>• Stay on topic</li>
`                <li>• No spam or self-promotion</li>
`                <li>• Help others learn</li>
`                <li>• Report inappropriate content</li>
`              </ul>
`            </div>
`          </div>
`        </div>
`      </div>
`    </div>
`  );
`}
