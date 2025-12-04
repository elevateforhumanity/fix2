'use client';

import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Pin, Flag, Search, Filter, Plus, X, Send, TrendingUp, Clock, Users, Award } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  timestamp: string;
  replies: number;
  views: number;
  upvotes: number;
  downvotes: number;
  isPinned: boolean;
  isSolved: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
}

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      title: 'How to implement authentication in React?',
      content: 'I\'m working on a React project and need help implementing user authentication. What\'s the best approach?',
      author: 'John Doe',
      authorAvatar: 'JD',
      category: 'Web Development',
      timestamp: '2024-12-04T10:30:00',
      replies: 12,
      views: 145,
      upvotes: 24,
      downvotes: 2,
      isPinned: true,
      isSolved: true,
    },
    {
      id: '2',
      title: 'Best practices for database design',
      content: 'What are the key principles I should follow when designing a database schema?',
      author: 'Jane Smith',
      authorAvatar: 'JS',
      category: 'Database',
      timestamp: '2024-12-04T09:15:00',
      replies: 8,
      views: 98,
      upvotes: 15,
      downvotes: 1,
      isPinned: false,
      isSolved: false,
    },
  ]);

  const [replies] = useState<Reply[]>([
    {
      id: '1',
      content: 'You should use JWT tokens for authentication. Here\'s a step-by-step guide...',
      author: 'Mike Johnson',
      authorAvatar: 'MJ',
      timestamp: '2024-12-04T10:45:00',
      upvotes: 18,
      downvotes: 0,
      isAccepted: true,
    },
    {
      id: '2',
      content: 'I recommend using a library like Auth0 or Firebase Authentication for easier implementation.',
      author: 'Sarah Williams',
      authorAvatar: 'SW',
      timestamp: '2024-12-04T11:00:00',
      upvotes: 12,
      downvotes: 1,
      isAccepted: false,
    },
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredDiscussions = discussions
    .filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || d.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortBy === 'popular') return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      if (sortBy === 'replies') return b.replies - a.replies;
      return 0;
    });

  const totalDiscussions = discussions.length;
  const totalReplies = discussions.reduce((sum, d) => sum + d.replies, 0);
  const solvedDiscussions = discussions.filter(d => d.isSolved).length;

  const handleVote = (id: string, type: 'up' | 'down') => {
    setDiscussions(prev => prev.map(d => 
      d.id === id ? {
        ...d,
        upvotes: type === 'up' ? d.upvotes + 1 : d.upvotes,
        downvotes: type === 'down' ? d.downvotes + 1 : d.downvotes,
      } : d
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Discussions</h1>
            <p className="text-gray-600 mt-1">Connect with peers and get help</p>
          </div>
          <button
            onClick={() => setShowNewDiscussion(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            New Discussion
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <MessageSquare className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalDiscussions}</p>
            <p className="text-sm text-gray-600">Total Discussions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Reply className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalReplies}</p>
            <p className="text-sm text-gray-600">Total Replies</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{solvedDiscussions}</p>
            <p className="text-sm text-gray-600">Solved</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Users className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Active Members</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Database">Database</option>
                <option value="Programming">Programming</option>
                <option value="General">General</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="replies">Most Replies</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            {filteredDiscussions.length > 0 ? (
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition cursor-pointer"
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(discussion.id, 'up');
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ThumbsUp size={16} className="text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold">
                          {discussion.upvotes - discussion.downvotes}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(discussion.id, 'down');
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ThumbsDown size={16} className="text-gray-600" />
                        </button>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {discussion.isPinned && (
                                <Pin size={16} className="text-blue-600" />
                              )}
                              <h3 className="font-semibold text-lg">{discussion.title}</h3>
                              {discussion.isSolved && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  Solved
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{discussion.content}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                              {discussion.authorAvatar}
                            </div>
                            <span>{discussion.author}</span>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {discussion.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Reply size={14} />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(discussion.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Discussions Found</h3>
                <p className="text-gray-600 mb-6">Start a new discussion or adjust your filters</p>
                <button
                  onClick={() => setShowNewDiscussion(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Start Discussion
                </button>
              </div>
            )}
          </div>
        </div>

        {showNewDiscussion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">New Discussion</h3>
                <button onClick={() => setShowNewDiscussion(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="What's your question?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Database">Database</option>
                    <option value="Programming">Programming</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea required className="w-full px-4 py-2 border rounded-lg" rows={6} placeholder="Provide details about your question..." />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Post Discussion
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewDiscussion(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedDiscussion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedDiscussion.title}</h3>
                <button onClick={() => setSelectedDiscussion(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {selectedDiscussion.authorAvatar}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedDiscussion.author}</p>
                    <p className="text-sm text-gray-600">{new Date(selectedDiscussion.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-700">{selectedDiscussion.content}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-4">{replies.length} Replies</h4>
                <div className="space-y-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <ThumbsUp size={14} className="text-gray-600" />
                          </button>
                          <span className="text-xs font-semibold">{reply.upvotes - reply.downvotes}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <ThumbsDown size={14} className="text-gray-600" />
                          </button>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                              {reply.authorAvatar}
                            </div>
                            <span className="font-semibold">{reply.author}</span>
                            <span className="text-sm text-gray-600">{new Date(reply.timestamp).toLocaleString()}</span>
                            {reply.isAccepted && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                ✓ Accepted Answer
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Your Reply</h4>
                <textarea className="w-full px-4 py-2 border rounded-lg mb-3" rows={4} placeholder="Write your reply..." />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send size={16} className="inline mr-2" />
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
