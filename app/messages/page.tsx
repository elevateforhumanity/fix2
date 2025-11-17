'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Send, Search, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Career Counselor - Sarah Williams',
      lastMessage: "Great! I'll send you the job posting details.",
      time: '10:30 AM',
      unread: 2,
      avatar: 'SW',
    },
    {
      id: '2',
      name: 'Instructor - Mike Johnson',
      lastMessage: 'Your assignment has been graded.',
      time: 'Yesterday',
      unread: 0,
      avatar: 'MJ',
    },
    {
      id: '3',
      name: 'Admin - Support Team',
      lastMessage: 'Your WIOA application has been approved!',
      time: '2 days ago',
      unread: 0,
      avatar: 'ST',
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'Sarah Williams',
      text: 'Hi John! I wanted to follow up on your job search. How are things going?',
      time: '10:15 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      text: "Hi Sarah! Things are going well. I'm interested in the HVAC positions you mentioned.",
      time: '10:20 AM',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'Sarah Williams',
      text: "Great! I'll send you the job posting details.",
      time: '10:30 AM',
      isOwn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600 mt-1">Connect with instructors, counselors, and support staff</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-slate-200 overflow-y-auto">
              <div className="p-4 border-b border-slate-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 border-b border-slate-200 hover:bg-slate-50 transition-colors text-left ${
                      selectedConversation === conv.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-slate-900 truncate">
                            {conv.name}
                          </div>
                          {conv.unread > 0 && (
                            <Badge variant="primary" size="sm">{conv.unread}</Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-600 truncate">
                          {conv.lastMessage}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{conv.time}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">
                    SW
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Williams</div>
                    <div className="text-sm text-slate-600">Career Counselor</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isOwn
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      {!msg.isOwn && (
                        <div className="text-xs font-semibold mb-1 opacity-75">
                          {msg.sender}
                        </div>
                      )}
                      <div className="text-sm">{msg.text}</div>
                      <div
                        className={`text-xs mt-1 ${
                          msg.isOwn ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setMessageText('');
                      }
                    }}
                  />
                  <Button variant="primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
