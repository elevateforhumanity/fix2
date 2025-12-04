import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Send, Search, Paperclip, MoreVertical, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Messages | Student Portal',
  description: 'Send and receive messages',
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch conversations
  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      *,
      messages (
        id,
        content,
        created_at,
        sender:profiles!messages_sender_id_fkey (
          id,
          full_name,
          avatar_url
        )
      )
    `)
    .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
    .order('updated_at', { ascending: false });

  // Fetch unread count
  const { count: unreadCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', user.id)
    .eq('read', false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <MessageSquare size={20} />
            New Message
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {conversations && conversations.length > 0 ? (
                  conversations.map((conversation: any) => {
                    const lastMessage = conversation.messages?.[0];
                    const otherParticipant = conversation.participant1_id === user.id 
                      ? conversation.participant2 
                      : conversation.participant1;

                    return (
                      <Link
                        key={conversation.id}
                        href={`/portal/student/messages/${conversation.id}`}
                        className="block p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User size={24} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {otherParticipant?.full_name || 'Unknown User'}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {lastMessage?.created_at 
                                  ? new Date(lastMessage.created_at).toLocaleDateString()
                                  : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {lastMessage?.content || 'No messages yet'}
                            </p>
                          </div>
                          {conversation.unread_count > 0 && (
                            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {conversation.unread_count}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <MessageSquare className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-600">No conversations yet</p>
                    <p className="text-sm text-gray-500 mt-1">Start a new conversation to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Select a conversation</h3>
                    <p className="text-sm text-gray-500">Choose a conversation to view messages</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="mx-auto text-gray-400 mb-3" size={64} />
                    <p className="text-gray-600 font-medium">No conversation selected</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Select a conversation from the list or start a new one
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Paperclip size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2" disabled>
                    <Send size={20} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
