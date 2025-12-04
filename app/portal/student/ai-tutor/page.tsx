'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, HelpCircle, Lightbulb, MessageSquare, Clock, Trash2, Download, Upload, Copy, Check, X, Settings, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI tutor. I can help you with coursework, explain concepts, answer questions, and provide study guidance. How can I assist you today?',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      lastMessage: 'Can you explain closures?',
      timestamp: '2024-12-03T14:30:00',
      messageCount: 12,
    },
    {
      id: '2',
      title: 'Data Structures Help',
      lastMessage: 'How do binary trees work?',
      timestamp: '2024-12-02T10:15:00',
      messageCount: 8,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const quickPrompts = [
    { icon: BookOpen, text: 'Explain this concept', category: 'Learning' },
    { icon: HelpCircle, text: 'Help with homework', category: 'Homework' },
    { icon: Lightbulb, text: 'Study tips', category: 'Tips' },
    { icon: MessageSquare, text: 'Practice questions', category: 'Practice' },
    { icon: Zap, text: 'Quick review', category: 'Review' },
    { icon: BookOpen, text: 'Summarize topic', category: 'Summary' },
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I understand your question. Let me help you with that...',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-tutor-chat-${Date.now()}.txt`;
    a.click();
  };

  const totalChats = conversations.length;
  const todayChats = conversations.filter(c => {
    const chatDate = new Date(c.timestamp);
    const today = new Date();
    return chatDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Tutor</h1>
          <p className="text-gray-600 mt-1">Get instant help with your studies</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Bot className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{messages.length}</p>
            <p className="text-sm text-gray-600">Messages Today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <MessageSquare className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalChats}</p>
            <p className="text-sm text-gray-600">Total Conversations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{todayChats}</p>
            <p className="text-sm text-gray-600">Chats Today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Sparkles className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-sm text-gray-600">Always Available</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow flex flex-col" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Tutor</h3>
                    <p className="text-xs text-green-600">● Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportChat}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Export chat"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Settings"
                  >
                    <Settings size={18} />
                  </button>
                  <button
                    onClick={() => setMessages([messages[0]])}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Clear chat"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-2">
                        <p className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Quick Prompts</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {quickPrompts.map((prompt, idx) => {
                    const Icon = prompt.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickPrompt(prompt.text)}
                        className="w-full flex items-center gap-3 p-3 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                      >
                        <Icon size={18} className="text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{prompt.text}</p>
                          <p className="text-xs text-gray-500">{prompt.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Conversations</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <p className="text-sm font-medium mb-1">{conv.title}</p>
                      <p className="text-xs text-gray-600 mb-2 truncate">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{conv.messageCount} messages</span>
                        <span>{new Date(conv.timestamp).toLocaleDateString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Sparkles size={18} />
                AI Tutor Features
              </h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• 24/7 availability</li>
                <li>• Instant responses</li>
                <li>• Multi-subject support</li>
                <li>• Step-by-step explanations</li>
                <li>• Practice problems</li>
                <li>• Study guidance</li>
              </ul>
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">AI Tutor Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Response Style</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Detailed explanations</option>
                    <option>Concise answers</option>
                    <option>Step-by-step guidance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language Level</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="text-sm">Include examples</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="text-sm">Show sources</span>
                  <input type="checkbox" className="rounded" />
                </label>
                <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="text-sm">Save chat history</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
