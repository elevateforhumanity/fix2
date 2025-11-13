import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Send } from 'lucide-react';

interface ForumPost {
  id: string;
  author: string;
  authorRole: 'student' | 'instructor' | 'admin';
  content: string;
  timestamp: Date;
  likes: number;
  replies: ForumReply[];
  isLiked?: boolean;
}

interface ForumReply {
  id: string;
  author: string;
  authorRole: 'student' | 'instructor' | 'admin';
  content: string;
  timestamp: Date;
}

interface DiscussionForumProps {
  courseId: string;
  lessonId?: string;
}

export default function DiscussionForum({
  courseId,
  lessonId,
}: DiscussionForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'John Doe',
      authorRole: 'student',
      content:
        "Can someone explain the difference between clippers and trimmers? I'm still a bit confused.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: 'Master Barber Smith',
          authorRole: 'instructor',
          content:
            'Great question! Clippers are used for bulk hair removal and creating fades, while trimmers are for detailing and edging. Clippers have larger blades and more power.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: '1-2',
          author: 'Jane Smith',
          authorRole: 'student',
          content: 'Thanks for explaining! That makes much more sense now.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ],
    },
    {
      id: '2',
      author: 'Mike Johnson',
      authorRole: 'student',
      content:
        "What's the best way to practice fades at home? Any tips for beginners?",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 3,
      isLiked: true,
      replies: [],
    },
  ]);

  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      author: 'Current User',
      authorRole: 'student',
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent.trim()) return;

    const reply: ForumReply = {
      id: `${postId}-${Date.now()}`,
      author: 'Current User',
      authorRole: 'student',
      content: replyContent,
      timestamp: new Date(),
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, reply] }
          : post
      )
    );

    setReplyContent('');
    setReplyingTo(null);
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      instructor: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      student: 'bg-blue-100 text-blue-800',
    };
    return badges[role as keyof typeof badges] || badges.student;
  };

  return (
    <div className="space-y-6">
      {/* New Post Form */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-brown-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Start a Discussion
        </h3>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Ask a question or share your thoughts..."
            className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!newPost.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </form>
      </div>
      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card p-6">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-brown-900">
                      {post.author}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadge(post.authorRole)}`}
                    >
                      {post.authorRole}
                    </span>
                  </div>
                  <span className="text-sm text-brown-500">
                    {formatTimestamp(post.timestamp)}
                  </span>
                </div>
              </div>
            </div>
            {/* Post Content */}
            <p className="text-brown-700 mb-4">{post.content}</p>
            {/* Post Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-brown-200">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-sm transition ${
                  post.isLiked
                    ? 'text-green-600 font-semibold'
                    : 'text-brown-600 hover:text-green-600'
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`}
                />
                {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
              </button>
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === post.id ? null : post.id)
                }
                className="flex items-center gap-2 text-sm text-brown-600 hover:text-green-600 transition"
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
              {post.replies.length > 0 && (
                <span className="text-sm text-brown-500">
                  {post.replies.length}{' '}
                  {post.replies.length === 1 ? 'Reply' : 'Replies'}
                </span>
              )}
            </div>
            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="mt-4 pl-6 border-l-2 border-brown-200 space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="bg-beige-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                        {reply.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-brown-900 text-sm">
                            {reply.author}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadge(reply.authorRole)}`}
                          >
                            {reply.authorRole}
                          </span>
                        </div>
                        <span className="text-xs text-brown-500">
                          {formatTimestamp(reply.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-brown-700 text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
            {/* Reply Form */}
            {replyingTo === post.id && (
              <div className="mt-4 pl-6 border-l-2 border-green-600">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="mt-2 flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="btn-outline text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReplySubmit(post.id)}
                    disabled={!replyContent.trim()}
                    className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3 h-3" />
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {posts.length === 0 && (
        <div className="card p-12 text-center">
          <MessageCircle className="w-12 h-12 text-brown-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brown-900 mb-2">
            No discussions yet
          </h3>
          <p className="text-brown-600">
            Be the first to start a conversation!
          </p>
        </div>
      )}
    </div>
  );
}
