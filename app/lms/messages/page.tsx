'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  MessageSquare,
  Send,
  Search,
  Reply,
  Trash2,
  User,
  Clock
} from 'lucide-react';

// Mock messages data
const messages = [
  {
    id: 1,
    from: 'Sarah Johnson',
    fromRole: 'Instructor',
    subject: 'Great work on your assignment!',
    preview: 'I wanted to commend you on your excellent work on the patient care assignment...',
    body: 'I wanted to commend you on your excellent work on the patient care assignment. Your analysis was thorough and showed deep understanding of the concepts. Keep up the great work!',
    time: '2 hours ago',
    read: false,
    courseId: 2,
    courseName: 'CNA Certification Prep',
  },
  {
    id: 2,
    from: 'Michael Chen',
    fromRole: 'Instructor',
    subject: 'Question about Module 3',
    preview: 'Hi, I noticed you had a question during the live session about infection control...',
    body: 'Hi, I noticed you had a question during the live session about infection control procedures. I wanted to follow up and provide some additional resources that might help clarify the topic. Please let me know if you need any further assistance.',
    time: '1 day ago',
    read: true,
    courseId: 2,
    courseName: 'CNA Certification Prep',
  },
  {
    id: 3,
    from: 'David Martinez',
    fromRole: 'Instructor',
    subject: 'Upcoming Live Session Reminder',
    preview: 'Just a reminder that we have a live session scheduled for tomorrow...',
    body: 'Just a reminder that we have a live session scheduled for tomorrow at 2 PM EST. We will be covering HVAC safety procedures. Please make sure to review the pre-session materials.',
    time: '2 days ago',
    read: true,
    courseId: 3,
    courseName: 'HVAC Technician Training',
  },
];

const sentMessages = [
  {
    id: 4,
    to: 'Sarah Johnson',
    toRole: 'Instructor',
    subject: 'Question about final exam',
    preview: 'Hi Professor Johnson, I have a question about the format of the final exam...',
    body: 'Hi Professor Johnson, I have a question about the format of the final exam. Will it be multiple choice or essay format? Also, what topics should I focus on most?',
    time: '3 days ago',
    courseId: 2,
    courseName: 'CNA Certification Prep',
  },
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  
  // Compose form state
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const unreadCount = messages.filter(m => !m.read).length;

  const handleSendReply = () => {
    alert('Reply sent!');
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleSendMessage = () => {
    alert('Message sent!');
    setShowCompose(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
  };

  const filteredMessages = messages.filter(m => 
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Messages</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button onClick={() => setShowCompose(true)}>
              <Send className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
          <p className="text-muted-foreground">
            Communicate with your instructors and classmates
          </p>
        </div>

        {/* Compose Message Modal */}
        {showCompose && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">New Message</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>
                  Cancel
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Instructor name or email"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Message</Label>
                  <Textarea
                    id="body"
                    rows={6}
                    placeholder="Type your message here..."
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendMessage} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inbox" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inbox">
              Inbox ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({sentMessages.length})
            </TabsTrigger>
          </TabsList>

          {/* Inbox Tab */}
          <TabsContent value="inbox">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Message List */}
              <div className="lg:col-span-1 space-y-2">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <Card
                      key={message.id}
                      className={`cursor-pointer transition-all ${
                        !message.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                      } ${selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${!message.read ? 'font-bold' : ''}`}>
                                {message.from}
                              </p>
                              <p className="text-xs text-muted-foreground">{message.fromRole}</p>
                            </div>
                          </div>
                          {!message.read && (
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className={`text-sm mb-1 ${!message.read ? 'font-semibold' : ''}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {message.preview}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{message.courseName}</span>
                          <span>{message.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No messages found</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {/* Message Header */}
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-semibold">{selectedMessage.from}</p>
                                <p className="text-sm text-muted-foreground">{selectedMessage.fromRole}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {selectedMessage.time}
                            </span>
                            <span>{selectedMessage.courseName}</span>
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="p-4 bg-secondary rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{selectedMessage.body}</p>
                        </div>

                        {/* Reply Section */}
                        <div className="space-y-4">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Reply className="h-4 w-4" />
                            Reply
                          </h3>
                          <Textarea
                            rows={4}
                            placeholder="Type your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-24 text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Select a message to read</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Sent Tab */}
          <TabsContent value="sent">
            <div className="space-y-2">
              {sentMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">To: {message.to}</p>
                          <p className="text-xs text-muted-foreground">{message.toRole}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold mb-1">{message.subject}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {message.preview}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{message.courseName}</span>
                      <span>{message.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
