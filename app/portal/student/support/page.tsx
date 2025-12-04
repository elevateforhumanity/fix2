import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HelpCircle, MessageCircle, Book, Video, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Support & Help | Student Portal',
};

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const openTickets = tickets?.filter(t => t.status === 'open').length || 0;
  const resolvedTickets = tickets?.filter(t => t.status === 'resolved').length || 0;

  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to Settings > Security > Change Password' },
    { q: 'How do I enroll in a course?', a: 'Browse Programs and click Enroll on any course' },
    { q: 'Where can I view my certificates?', a: 'Navigate to Certificates in the student portal' },
    { q: 'How do I contact my instructor?', a: 'Use the Messages feature to send direct messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Support & Help Center</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <MessageCircle className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{tickets?.length || 0}</p>
            <p className="text-sm text-gray-600">Total Tickets</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{openTickets}</p>
            <p className="text-sm text-gray-600">Open Tickets</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <CheckCircle className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{resolvedTickets}</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <HelpCircle className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-sm text-gray-600">Support Available</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left">
            <MessageCircle className="text-blue-600 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm">Chat with support team instantly</p>
          </button>
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left">
            <Mail className="text-green-600 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm">Send us an email, we'll respond within 24h</p>
          </button>
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-left">
            <Phone className="text-purple-600 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm">Call us: 1-800-SUPPORT</p>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            </div>
            <div className="p-6 space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">My Support Tickets</h2>
            </div>
            <div className="p-6">
              {tickets && tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket: any) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium \${
                          ticket.status === 'open' ? 'bg-orange-100 text-orange-700' :
                          ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto text-gray-400 mb-3" size={48} />
                  <p className="text-gray-600">No support tickets yet</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Ticket
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
