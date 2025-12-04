import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bot, Send, Sparkles, BookOpen, HelpCircle, Lightbulb, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Tutor | Student Portal',
};

export default async function AiTutorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: chatHistory } = await supabase
    .from('ai_chat_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, programs(name)')
    .eq('user_id', user.id);

  const totalChats = chatHistory?.length || 0;
  const todayChats = chatHistory?.filter(c => {
    const chatDate = new Date(c.created_at);
    const today = new Date();
    return chatDate.toDateString() === today.toDateString();
  }).length || 0;

  const quickPrompts = [
    { icon: BookOpen, text: 'Explain this concept', category: 'Learning' },
    { icon: HelpCircle, text: 'Help with homework', category: 'Homework' },
    { icon: Lightbulb, text: 'Study tips', category: 'Tips' },
    { icon: MessageSquare, text: 'Practice questions', category: 'Practice' },
  ];

  const recentTopics = [
    'JavaScript Fundamentals',
    'Data Structures',
    'Web Development',
    'Python Basics',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bot className="text-purple-600" size={36} />
            AI Tutor
          </h1>
          <p className="text-gray-600 mt-1">Your 24/7 learning assistant powered by AI</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <MessageSquare className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalChats}</p>
            <p className="text-sm text-gray-600">Total Conversations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{todayChats}</p>
            <p className="text-sm text-gray-600">Today's Chats</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Sparkles className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-sm text-gray-600">Always Available</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Lightbulb className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{enrollments?.length || 0}</p>
            <p className="text-sm text-gray-600">Active Courses</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
              <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">AI Learning Assistant</h2>
                    <p className="text-sm text-purple-100">Ask me anything about your courses</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                {chatHistory && chatHistory.length > 0 ? (
                  <div className="space-y-4">
                    {chatHistory.slice(0, 10).map((chat: any) => (
                      <div key={chat.id}>
                        <div className="flex justify-end mb-2">
                          <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                            {chat.user_message}
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-[80%]">
                            {chat.ai_response}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Bot className="mx-auto text-gray-400 mb-4" size={64} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Hi! I'm your AI Tutor
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Ask me anything about your courses, homework, or study tips!
                      </p>
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        {quickPrompts.map((prompt, index) => {
                          const Icon = prompt.icon;
                          return (
                            <button
                              key={index}
                              className="flex items-center gap-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-left"
                            >
                              <Icon size={20} className="text-purple-600" />
                              <div>
                                <p className="text-sm font-medium">{prompt.text}</p>
                                <p className="text-xs text-gray-500">{prompt.category}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                    <Send size={20} />
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI responses are generated and may not always be accurate. Always verify important information.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                Quick Prompts
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition flex items-center gap-3"
                    >
                      <Icon size={18} className="text-purple-600" />
                      <span className="text-sm font-medium">{prompt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Recent Topics</h3>
              <div className="space-y-2">
                {recentTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-2">Pro Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>• Be specific with your questions</li>
                <li>• Mention your course name</li>
                <li>• Ask for examples</li>
                <li>• Request step-by-step explanations</li>
              </ul>
            </div>

            {enrollments && enrollments.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">Your Courses</h3>
                <div className="space-y-2">
                  {enrollments.slice(0, 5).map((enrollment: any) => (
                    <div key={enrollment.id} className="text-sm p-2 bg-gray-50 rounded">
                      {enrollment.programs?.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
