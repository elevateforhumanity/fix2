import { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Messages | Delegate Dashboard',
  description: 'Communicate with students and staff',
};

export default function DelegateMessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/delegate/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-red-600" />
            Messages
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold text-slate-900 mb-4">Conversations</h2>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer border border-slate-200"
                >
                  <div className="font-medium text-slate-900">Student {i}</div>
                  <div className="text-sm text-slate-500 truncate">
                    Last message preview...
                  </div>
                  <div className="text-xs text-slate-400 mt-1">2 hours ago</div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="border-b border-slate-200 pb-4 mb-4">
              <h3 className="font-semibold text-slate-900">Student 1</h3>
              <p className="text-sm text-slate-500">student1@example.com</p>
            </div>

            <div className="space-y-4 mb-6 h-96 overflow-y-auto">
              <div className="flex gap-3">
                <div className="bg-slate-100 rounded-lg p-3 max-w-md">
                  <p className="text-slate-700">
                    Hi, I have a question about the assignment.
                  </p>
                  <span className="text-xs text-slate-500">10:30 AM</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-red-600 text-white rounded-lg p-3 max-w-md">
                  <p>Sure, what would you like to know?</p>
                  <span className="text-xs text-red-200">10:32 AM</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
